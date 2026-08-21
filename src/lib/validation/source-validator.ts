import {
  VerifiedSourceRecord,
  SourceValidationResult,
  SourceValidationIssue,
  SourceType,
  VerificationStatus,
  GovernmentLevel,
  JurisdictionType,
  MasterDomain
} from "@/types/source-data";
import { ALL_SOURCES, isAllowlistedSourceId, getSourceById } from "@/data/sources";

const VALID_DOMAINS: MasterDomain[] = [
  "CONSUMER_PROTECTION",
  "TENANT_RIGHTS",
  "RTI_ACCESS",
  "WELFARE_SCHEMES",
  "WORKPLACE_RIGHTS"
];

const VALID_GOVERNMENT_LEVELS: GovernmentLevel[] = [
  "CENTRAL",
  "STATE",
  "UT",
  "DISTRICT",
  "LOCAL"
];

const VALID_JURISDICTION_TYPES: JurisdictionType[] = [
  "EXCLUSIVE",
  "CONCURRENT",
  "APPELLATE",
  "TERRITORIAL",
  "MUNICIPAL",
  "STATUTORY_TRIBUNAL",
  "QUASI_JUDICIAL",
  "CONSTITUTIONAL"
];

const VALID_SOURCE_TYPES: SourceType[] = [
  "ACT_GAZETTE_RULES",
  "MINISTRY_DEPT_WEBSITE",
  "STATUTORY_REGULATOR",
  "OFFICIAL_GOVT_PORTAL",
  "DISCOVERY_REFERENCE"
];

const VALID_VERIFICATION_STATUSES: VerificationStatus[] = [
  "CURRENT",
  "NEEDS_REVERIFICATION",
  "ARCHIVED",
  "UNVERIFIED"
];

/**
 * Validate a single Source Record for adherence to Provenance & Jurisdiction rules
 */
export function validateSourceRecord(record: VerifiedSourceRecord): SourceValidationResult {
  const issues: SourceValidationIssue[] = [];

  // 1. Identity & Domain Checks
  if (!record.id || typeof record.id !== "string" || record.id.trim() === "") {
    issues.push({ field: "id", message: "Source ID is required and must be non-empty", severity: "ERROR" });
  }

  if (!record.title || typeof record.title !== "string" || record.title.trim() === "") {
    issues.push({ field: "title", message: "Title is required and must be non-empty", severity: "ERROR" });
  }

  if (!VALID_DOMAINS.includes(record.domain)) {
    issues.push({ field: "domain", message: `Invalid master domain: ${record.domain}`, severity: "ERROR" });
  }

  if (!record.subdomain || typeof record.subdomain !== "string") {
    issues.push({ field: "subdomain", message: "Subdomain code is required", severity: "ERROR" });
  }

  if (!record.summary || record.summary.trim().length < 20) {
    issues.push({ field: "summary", message: "Summary must be at least 20 characters long", severity: "ERROR" });
  }

  // 2. Jurisdiction Checks
  if (!record.jurisdiction) {
    issues.push({ field: "jurisdiction", message: "Jurisdiction block is required", severity: "ERROR" });
  } else {
    if (record.jurisdiction.country !== "IN") {
      issues.push({ field: "jurisdiction.country", message: "Jurisdiction country must be 'IN'", severity: "ERROR" });
    }
    if (!VALID_GOVERNMENT_LEVELS.includes(record.jurisdiction.government_level)) {
      issues.push({
        field: "jurisdiction.government_level",
        message: `Invalid government level: ${record.jurisdiction.government_level}`,
        severity: "ERROR"
      });
    }
    if (!VALID_JURISDICTION_TYPES.includes(record.jurisdiction.jurisdiction_type)) {
      issues.push({
        field: "jurisdiction.jurisdiction_type",
        message: `Invalid jurisdiction type: ${record.jurisdiction.jurisdiction_type}`,
        severity: "ERROR"
      });
    }
  }

  // 3. Provenance Checks (Strictly Enforced)
  if (!record.provenance) {
    issues.push({ field: "provenance", message: "Provenance block is mandatory. No claims without provenance.", severity: "ERROR" });
  } else {
    const p = record.provenance;

    if (!p.official_source_name || p.official_source_name.trim() === "") {
      issues.push({ field: "provenance.official_source_name", message: "Official source name is required", severity: "ERROR" });
    }

    if (!p.official_source_url || !p.official_source_url.startsWith("http")) {
      issues.push({
        field: "provenance.official_source_url",
        message: `Invalid official source URL: ${p.official_source_url}. Must be valid http/https URL.`,
        severity: "ERROR"
      });
    }

    if (!VALID_SOURCE_TYPES.includes(p.source_type)) {
      issues.push({ field: "provenance.source_type", message: `Invalid source type: ${p.source_type}`, severity: "ERROR" });
    }

    if (!p.administering_authority || p.administering_authority.trim() === "") {
      issues.push({ field: "provenance.administering_authority", message: "Administering authority is required", severity: "ERROR" });
    }

    if (!p.last_verified || isNaN(Date.parse(p.last_verified))) {
      issues.push({ field: "provenance.last_verified", message: `Invalid last_verified date: ${p.last_verified}`, severity: "ERROR" });
    }

    if (!VALID_VERIFICATION_STATUSES.includes(p.verification_status)) {
      issues.push({ field: "provenance.verification_status", message: `Invalid verification status: ${p.verification_status}`, severity: "ERROR" });
    }

    if (![1, 2, 3, 4, 5].includes(p.source_priority)) {
      issues.push({ field: "provenance.source_priority", message: `Source priority must be 1, 2, 3, 4, or 5`, severity: "ERROR" });
    }

    // Priority 1 and 2 sources must have legal_basis defined
    if ((p.source_priority === 1 || p.source_priority === 2) && (!p.legal_basis || p.legal_basis.trim() === "")) {
      issues.push({
        field: "provenance.legal_basis",
        message: "Priority 1 and 2 sources must specify a legal basis or statutory section reference",
        severity: "WARNING"
      });
    }
  }

  // 4. Use Cases and Keywords
  if (!Array.isArray(record.supported_use_cases) || record.supported_use_cases.length === 0) {
    issues.push({ field: "supported_use_cases", message: "Must declare at least one supported use case", severity: "ERROR" });
  }

  if (!Array.isArray(record.keywords) || record.keywords.length === 0) {
    issues.push({ field: "keywords", message: "Keywords array is required for discovery indexing", severity: "WARNING" });
  }

  return {
    isValid: issues.filter((i) => i.severity === "ERROR").length === 0,
    recordId: record.id || "UNKNOWN",
    issues
  };
}

/**
 * Validate the entire unified source registry
 */
export function validateFullSourceRegistry(): {
  totalRecords: number;
  validCount: number;
  invalidCount: number;
  results: SourceValidationResult[];
} {
  const results: SourceValidationResult[] = [];
  const seenIds = new Set<string>();

  for (const record of ALL_SOURCES) {
    const res = validateSourceRecord(record);

    if (seenIds.has(record.id)) {
      res.isValid = false;
      res.issues.push({
        field: "id",
        message: `Duplicate Source ID detected: '${record.id}'`,
        severity: "ERROR"
      });
    } else {
      seenIds.add(record.id);
    }

    results.push(res);
  }

  const validCount = results.filter((r) => r.isValid).length;
  const invalidCount = results.length - validCount;

  return {
    totalRecords: results.length,
    validCount,
    invalidCount,
    results
  };
}

/**
 * Validate an array of client-supplied citation IDs
 */
export function validateCitationIds(citationIds: string[]): {
  valid: boolean;
  validIds: string[];
  invalidIds: string[];
} {
  const validIds: string[] = [];
  const invalidIds: string[] = [];

  for (const id of citationIds) {
    if (isAllowlistedSourceId(id)) {
      const canonical = getSourceById(id);
      if (canonical) validIds.push(canonical.id);
    } else {
      invalidIds.push(id);
    }
  }

  return {
    valid: invalidIds.length === 0,
    validIds,
    invalidIds
  };
}
