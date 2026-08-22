import { MasterDomain, VerificationStatus } from "./source-data";

export type LocationConfidence =
  | "EXACT_VERIFIED"
  | "DISTRICT_VERIFIED"
  | "STATE_LEVEL_VERIFIED"
  | "MULTIPLE_JURISDICTIONS"
  | "OFFICE_LOCATION_REQUIRES_VERIFICATION"
  | "UNKNOWN";

export type LocalBodyType =
  | "MUNICIPAL_CORPORATION"
  | "MUNICIPALITY"
  | "TOWN_PANCHAYAT"
  | "GRAM_PANCHAYAT"
  | "CANTONMENT_BOARD"
  | "TALUK_REVENUE"
  | "DISTRICT_COLLECTORATE";

export interface PincodeLocation {
  pincode: string;
  post_office_name: string;
  locality: string;
  taluk_tehsil: string;
  district: string;
  state_ut: string;
  postal_circle?: string;
  division?: string;
  local_body_type?: LocalBodyType;
  local_body_name?: string;
  verified_source: string;
}

export interface PincodeResolutionResult {
  pincode: string;
  isValid: boolean;
  errorMessage?: string;
  confidence: LocationConfidence;
  primaryLocation?: PincodeLocation;
  candidateLocalities: PincodeLocation[];
  state_ut?: string;
  district?: string;
  requiresDisambiguation: boolean;
}

export interface CompetentAuthority {
  authority_id: string;
  name: string;
  authority_type: string;
  domain: MasterDomain;
  state_ut: string;
  district?: string;
  local_body?: string;
  jurisdiction_scope: "CENTRAL" | "STATE" | "DISTRICT" | "LOCAL_BODY";
  office_address?: string;
  pincode?: string;
  helpline_phone?: string;
  official_email?: string;
  official_website?: string;
  filing_portal?: string;
  filing_modes: Array<"ONLINE" | "PHYSICAL_COUNTER" | "POSTAL" | "EMAIL">;
  legal_basis: string;
  source_record_ids: string[];
  verification_status: VerificationStatus;
  location_confidence: LocationConfidence;
  latitude?: number;
  longitude?: number;
  last_verified: string;
  pre_litigation_help?: {
    name: string;
    helpline: string;
    note: string;
  };
  notes?: string;
  suggested_form_id?: string;
}

export interface AuthorityResolutionQuery {
  pincode: string;
  domain: MasterDomain;
  selectedLocality?: string;
  selectedLocalBody?: string;
  // Domain-specific progressive clarifications
  rti_sphere?: "CENTRAL_PUBLIC_AUTHORITY" | "STATE_PUBLIC_AUTHORITY" | "LOCAL_CIVIC_BODY";
  workplace_sphere?: "CENTRAL_SPHERE_ESTABLISHMENT" | "STATE_PRIVATE_ESTABLISHMENT";
  workplace_issue_type?: "WAGES" | "TERMINATION_DISPUTE" | "GRATUITY" | "GENERAL";
  scheme_id?: string;
}

export interface AuthorityResolutionResult {
  query: AuthorityResolutionQuery;
  resolvedLocation?: PincodeLocation;
  competentAuthority: CompetentAuthority;
  confidence: LocationConfidence;
  disclaimer: string;
  suggestedActions: {
    canStartForm: boolean;
    formId?: string;
    formTitle?: string;
    portalUrl?: string;
    canAddToTracker: boolean;
    deadlineRuleId?: string;
  };
}
