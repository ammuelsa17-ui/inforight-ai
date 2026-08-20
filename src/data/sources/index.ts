import {
  VerifiedSourceRecord,
  MasterDomain,
  AnySubdomain,
  GovernmentLevel,
  SupportedUseCase,
  SourceRegistrySummary
} from "@/types/source-data";

import { CONSUMER_SOURCES } from "./consumer";
import { TENANCY_SOURCES } from "./tenancy";
import { RTI_SOURCES } from "./rti";
import { WELFARE_SOURCES } from "./schemes";
import { WORKPLACE_SOURCES } from "./workplace";

/**
 * Master Unified Source Registry
 */
export const ALL_SOURCES: VerifiedSourceRecord[] = [
  ...CONSUMER_SOURCES,
  ...TENANCY_SOURCES,
  ...RTI_SOURCES,
  ...WELFARE_SOURCES,
  ...WORKPLACE_SOURCES
];

/**
 * Backward compatibility alias mapping
 * Maps legacy IDs (e.g., 'CIT-TAM-01') to canonical source records.
 */
export const SOURCE_ID_ALIASES: Record<string, string> = {
  "CIT-TAM-01": "RTI_ACT_2005_AMENDED",
  "SRC-RTI-NAT-001": "RTI_ACT_2005_AMENDED",
  "CIT-TAM-02": "CCMC_RTI_AUTHORITY",
  "SRC-RTI-CCMC-001": "CCMC_RTI_AUTHORITY",
  "CIT-TAM-03": "CCMC_ENGINEERING_ROADS",
  "SRC-RTI-CCMC-002": "CCMC_ENGINEERING_ROADS",
  "CIT-TAM-04": "SRC-RTI-TN-001"
};

/**
 * Indexed Maps for O(1) Lookups
 */
const SOURCE_BY_ID = new Map<string, VerifiedSourceRecord>();
ALL_SOURCES.forEach((source) => {
  SOURCE_BY_ID.set(source.id, source);
});

/**
 * Retrieve a source record by its ID or Legacy Alias
 */
export function getSourceById(id: string): VerifiedSourceRecord | undefined {
  const canonicalId = SOURCE_ID_ALIASES[id] || id;
  return SOURCE_BY_ID.get(canonicalId);
}

/**
 * Check if an ID (or alias) is a valid, allowlisted official source
 */
export function isAllowlistedSourceId(id: string): boolean {
  return getSourceById(id) !== undefined;
}

/**
 * Get all allowlisted source IDs including legacy aliases
 */
export function getAllAllowlistedSourceIds(): string[] {
  const ids = ALL_SOURCES.map((s) => s.id);
  const legacyAliases = Object.keys(SOURCE_ID_ALIASES);
  return Array.from(new Set([...ids, ...legacyAliases]));
}

/**
 * Query sources filtered by Master Domain
 */
export function getSourcesByDomain(domain: MasterDomain): VerifiedSourceRecord[] {
  return ALL_SOURCES.filter((s) => s.domain === domain);
}

/**
 * Query sources filtered by Subdomain
 */
export function getSourcesBySubdomain(subdomain: AnySubdomain): VerifiedSourceRecord[] {
  return ALL_SOURCES.filter((s) => s.subdomain === subdomain);
}

/**
 * Query sources filtered by Supported Use Case
 */
export function getSourcesByUseCase(useCase: SupportedUseCase): VerifiedSourceRecord[] {
  return ALL_SOURCES.filter((s) => s.supported_use_cases.includes(useCase));
}

/**
 * Query sources filtered by Jurisdiction (Government level, State, District)
 */
export function getSourcesByJurisdiction(options: {
  governmentLevel?: GovernmentLevel;
  stateUt?: string;
  district?: string;
  localBody?: string;
}): VerifiedSourceRecord[] {
  return ALL_SOURCES.filter((s) => {
    if (options.governmentLevel && s.jurisdiction.government_level !== options.governmentLevel) {
      return false;
    }
    if (options.stateUt) {
      const normalizedState = options.stateUt.toLowerCase();
      const recordState = (s.jurisdiction.state_ut || "").toLowerCase();
      if (recordState !== "national" && recordState !== normalizedState) {
        return false;
      }
    }
    if (options.district && s.jurisdiction.district_if_relevant) {
      if (s.jurisdiction.district_if_relevant.toLowerCase() !== options.district.toLowerCase()) {
        return false;
      }
    }
    if (options.localBody && s.jurisdiction.local_body_if_relevant) {
      if (s.jurisdiction.local_body_if_relevant.toLowerCase() !== options.localBody.toLowerCase()) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Keyword-based discovery search across verified records (zero-vector requirement)
 */
export function searchSourcesByKeywords(query: string): VerifiedSourceRecord[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  return ALL_SOURCES.filter((s) => {
    const textCorpus = `${s.title} ${s.summary} ${s.keywords.join(" ")} ${s.provenance.administering_authority}`.toLowerCase();
    return tokens.some((token) => textCorpus.includes(token));
  });
}

/**
 * Generate a statistical summary of the registry
 */
export function getSourceRegistrySummary(): SourceRegistrySummary {
  const summary: SourceRegistrySummary = {
    totalRecords: ALL_SOURCES.length,
    byDomain: {
      CONSUMER_PROTECTION: 0,
      TENANT_RIGHTS: 0,
      RTI_ACCESS: 0,
      WELFARE_SCHEMES: 0,
      WORKPLACE_RIGHTS: 0
    },
    byVerificationStatus: {
      CURRENT: 0,
      NEEDS_REVERIFICATION: 0,
      ARCHIVED: 0,
      UNVERIFIED: 0
    },
    byGovernmentLevel: {
      CENTRAL: 0,
      STATE: 0,
      UT: 0,
      DISTRICT: 0,
      LOCAL: 0
    },
    verifiedAllowlistCount: getAllAllowlistedSourceIds().length
  };

  ALL_SOURCES.forEach((s) => {
    summary.byDomain[s.domain] = (summary.byDomain[s.domain] || 0) + 1;
    summary.byVerificationStatus[s.provenance.verification_status] =
      (summary.byVerificationStatus[s.provenance.verification_status] || 0) + 1;
    summary.byGovernmentLevel[s.jurisdiction.government_level] =
      (summary.byGovernmentLevel[s.jurisdiction.government_level] || 0) + 1;
  });

  return summary;
}

export {
  CONSUMER_SOURCES,
  TENANCY_SOURCES,
  RTI_SOURCES,
  WELFARE_SOURCES,
  WORKPLACE_SOURCES
};
