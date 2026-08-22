// src/lib/government-data/types.ts — Core Contracts for Government Data & Authority Resolution

export type SourceTrustLevel =
  | "OFFICIAL_GOVERNMENT"
  | "OFFICIAL_GOVERNMENT_DATASET"
  | "VERIFIED_STATIC_GOVERNMENT_SOURCE"
  | "THIRD_PARTY_REFERENCE"
  | "CITIZEN_CONFIRMED"
  | "VERIFICATION_REQUIRED";

export type ResolutionMode =
  | "LIVE"
  | "VERIFIED_CACHE"
  | "STATIC_VERIFIED_REGISTRY"
  | "THIRD_PARTY_LIVE"
  | "CITIZEN_CONFIRMED"
  | "VERIFICATION_REQUIRED";

export type SourceFreshnessStatus =
  | "CURRENT"
  | "CHECK_DUE"
  | "STALE"
  | "SOURCE_CHANGED"
  | "UNREACHABLE"
  | "SUPERSEDED";

export type SourceCategory =
  | "LEGISLATION"
  | "RULES"
  | "SCHEME_METADATA"
  | "AUTHORITY_DIRECTORY"
  | "CONTACT_DETAILS"
  | "PORTAL_URL"
  | "POSTAL_DATA"
  | "DISTRICT_DATA";

export interface DataProvenance {
  sourceId: string;
  issuingAuthority: string;
  officialUrl?: string;
  retrievedAt: string;
  lastVerified: string;
  freshness: SourceFreshnessStatus;
  resolutionMode: ResolutionMode;
  trustLevel: SourceTrustLevel;
  isOfficialGovernmentSource: boolean;
  eTag?: string;
  contentHash?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface GovernmentDataProvider<TInput, TResult> {
  id: string;
  name: string;
  category: SourceCategory;
  issuingAuthority: string;
  officialUrl: string;

  fetchLive(input: TInput): Promise<TResult>;
  normalize(raw: unknown): TResult;
  validate(result: TResult): ValidationResult;
  getFallback(input: TInput): Promise<TResult | null>;
}

// Location & Postal Types
export interface PostOfficeRecord {
  name: string;
  branchType: string;
  deliveryStatus: string;
  circle: string;
  district: string;
  division: string;
  region: string;
  state: string;
  pincode: string;
}

export interface ResolvedLocation {
  pinCode: string;
  state: string;
  stateCode?: string;
  district: string;
  districtCode?: string;
  localityCandidates: string[];
  postOffices: PostOfficeRecord[];
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  provenance: DataProvenance;
}

// Local Body Types
export type LocalBodyType =
  | "MUNICIPAL_CORPORATION"
  | "MUNICIPALITY"
  | "TOWN_PANCHAYAT"
  | "NAGAR_PANCHAYAT"
  | "GRAM_PANCHAYAT"
  | "DISTRICT_ADMINISTRATION"
  | "CANTONMENT_BOARD"
  | "OTHER";

export interface ResolvedLocalBody {
  name: string;
  type: LocalBodyType;
  jurisdiction: string;
  officialUrl?: string;
  sourceIds: string[];
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  provenance: DataProvenance;
}

// Authority Types
export interface ResolvedCivicAuthority {
  authorityId: string;
  authorityName: string;
  authorityType: string;
  department?: string;
  jurisdiction: string;
  officialUrl?: string;
  postalAddress?: string;
  contact?: string;
  filingPortal?: string;
  sourceIds: string[];
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  provenance: DataProvenance;
}

// RTI Authority Types
export interface ResolvedRtiAuthority {
  level: "CENTRAL" | "STATE" | "LOCAL_BODY";
  publicAuthorityName: string;
  pioDesignation: string;
  pioAddress?: string;
  filingPortalUrl?: string;
  applicableRtiRules: string;
  firstAppellateAuthority?: {
    designation: string;
    department?: string;
  };
  provenance: DataProvenance;
}

// Versioned Statutory Rule Types
export interface VersionedLegalRule {
  ruleId: string;
  domain: "CIVIC_RTI" | "CONSUMER" | "TENANT" | "WORKPLACE" | "WELFARE";
  jurisdiction: string; // e.g. "ALL_INDIA", "TAMIL_NADU", "MAHARASHTRA"
  parameter: string; // e.g. "RTI_RESPONSE_DAYS", "DISTRICT_COMMISSION_MAX_INR", "TENANT_DEPOSIT_MAX_MONTHS"
  value: number | string;
  unit?: string;
  statutoryBasis: string;
  effectiveFrom: string;
  effectiveTo?: string;
  sourceIds: string[];
  status: "CURRENT" | "SUPERSEDED" | "REVIEW_REQUIRED";
}
