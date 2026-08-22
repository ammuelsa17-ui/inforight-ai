/**
 * Source Data Architecture Types & Provenance Models
 * 
 * Supports India-wide civic/legal assistance across:
 * 1. Consumer Protection (1A - 1F)
 * 2. Tenant Rights (2A - 2F)
 * 3. RTI Access (3A - 3F)
 * 4. Welfare Schemes (4A - 4O)
 * 5. Workplace Rights & Labour Welfare
 */

// ==========================================
// 1. JURISDICTION MODEL
// ==========================================

export type GovernmentLevel =
  | "CENTRAL"
  | "STATE"
  | "UT"
  | "DISTRICT"
  | "LOCAL";

export type JurisdictionType =
  | "EXCLUSIVE"
  | "CONCURRENT"
  | "APPELLATE"
  | "TERRITORIAL"
  | "MUNICIPAL"
  | "STATUTORY_TRIBUNAL"
  | "QUASI_JUDICIAL"
  | "CONSTITUTIONAL"
  | "CENTRAL_SECTOR"
  | "CENTRALLY_SPONSORED"
  | "STATE_SECTOR";

export interface JurisdictionModel {
  country: "IN";
  state_ut?: string; // e.g., "Tamil Nadu", "Karnataka", "Delhi", "National"
  district_if_relevant?: string;
  local_body_if_relevant?: string;
  government_level: GovernmentLevel;
  jurisdiction_type: JurisdictionType;
}

// ==========================================
// 2. SOURCE PROVENANCE & PRIORITY HIERARCHY
// ==========================================

export type SourceType =
  | "ACT_GAZETTE_RULES"       // Priority 1: Act / Gazette / Statutory Rules / Official Notification
  | "MINISTRY_DEPT_WEBSITE"    // Priority 2: Ministry or Department Website
  | "STATUTORY_REGULATOR"      // Priority 3: Statutory Regulator / Commission (e.g., CIC, CCPA, NALSA, TRAI)
  | "OFFICIAL_GOVT_PORTAL"     // Priority 4: Official Portal (e-Jagriti, NCH, RTI Online, myScheme, e-Shram)
  | "DISCOVERY_REFERENCE";     // Priority 5: Reference for discovery only (never final legal authority)

export type SourcePriority = 1 | 2 | 3 | 4 | 5;

export type VerificationStatus =
  | "CURRENT"
  | "NEEDS_REVERIFICATION"
  | "ARCHIVED"
  | "UNVERIFIED";

export interface SourceProvenance {
  official_source_name: string;
  official_source_url: string;
  source_type: SourceType;
  administering_authority: string;
  effective_from?: string; // Date (YYYY-MM-DD) or statutory year
  source_updated_date?: string; // Date (YYYY-MM-DD)
  last_verified: string; // ISO date (YYYY-MM-DD)
  verification_status: VerificationStatus;
  source_priority: SourcePriority;
  legal_basis?: string; // e.g., "Section 6(1), Right to Information Act, 2005"
  gazette_notification_ref?: string;
}

// ==========================================
// 3. MASTER DOMAINS & SUBDOMAINS
// ==========================================

export type MasterDomain =
  | "CONSUMER_PROTECTION"
  | "TENANT_RIGHTS"
  | "RTI_ACCESS"
  | "WELFARE_SCHEMES"
  | "WORKPLACE_RIGHTS";

// Domain 1: Consumer Protection Subdomains
export type ConsumerSubdomain =
  | "1A_BASIC_RIGHTS_FRAMEWORK"
  | "1B_DEFECTIVE_PRODUCTS_REFUND"
  | "1C_DEFICIENCY_IN_SERVICES"
  | "1D_ECOMMERCE_ONLINE_SHOPPING"
  | "1E_MISLEADING_ADS_DARK_PATTERNS"
  | "1F_SECTOR_SPECIFIC_DISPUTES";

// Domain 2: Tenant Rights Subdomains
export type TenantSubdomain =
  | "2A_BASIC_RIGHTS_FRAMEWORK"
  | "2B_RENT_DEPOSIT_RECEIPTS"
  | "2C_REPAIRS_UTILITIES_PRIVACY"
  | "2D_EVICTION_NOTICE_LOCKOUT"
  | "2E_COMPLAINTS_REMEDIES"
  | "2F_STATE_SPECIFIC_LAW";

// Domain 3: RTI Access Subdomains
export type RtiSubdomain =
  | "3A_BASIC_RTI_RIGHTS"
  | "3B_RTI_DRAFTING_FILING"
  | "3C_DEPARTMENT_PIO_ROUTING"
  | "3D_TIMELINES_FEES_EXEMPTIONS"
  | "3E_APPEALS_COMPLAINTS"
  | "3F_STATE_SPECIFIC_RTI";

// Domain 4: Welfare Schemes Subdomains
export type WelfareSubdomain =
  | "4A_WOMEN_CHILDREN_FAMILY"
  | "4B_STUDENTS_SCHOLARSHIPS"
  | "4C_SC_WELFARE"
  | "4D_ST_PVTG_WELFARE"
  | "4E_OBC_MINORITY_WELFARE"
  | "4E_OBC_BC_MBC_MINORITY"
  | "4F_PERSONS_WITH_DISABILITIES"
  | "4F_DISABILITY_WELFARE"
  | "4G_SENIOR_CITIZENS_PENSIONS"
  | "4G_SENIOR_CITIZENS_PENSION"
  | "4H_FARMERS_AGRICULTURE"
  | "4I_WORKERS_EMPLOYMENT_SKILLS"
  | "4J_ENTREPRENEURSHIP_SELF_EMPLOYMENT"
  | "4J_ENTREPRENEURSHIP_MSME"
  | "4K_HOUSING_BASIC_NEEDS"
  | "4L_HEALTH_MEDICAL_WELFARE"
  | "4L_HEALTH_MEDICAL"
  | "4M_FISHERFOLK_OCCUPATION_SPECIFIC"
  | "4M_FISHERFOLK_WELFARE"
  | "4N_RURAL_DEVELOPMENT"
  | "4N_RURAL_LIVELIHOODS"
  | "4O_FINANCIAL_INCLUSION_INSURANCE"
  | "4O_FINANCIAL_INCLUSION";

// Workplace Knowledge Area Subdomains
export type WorkplaceSubdomain =
  | "WP_WAGES_AND_MINIMUM_RATES"
  | "WP_DELAYED_NON_PAYMENT"
  | "WP_UNAUTHORIZED_DEDUCTIONS"
  | "WP_EMPLOYMENT_CONDITIONS"
  | "WP_OCCUPATIONAL_SAFETY_HEALTH"
  | "WP_SOCIAL_SECURITY_EPF_ESI"
  | "WP_INDUSTRIAL_DISPUTES"
  | "WP_TERMINATION_AND_RETRENCHMENT"
  | "WP_MATERNITY_PROTECTIONS"
  | "WP_GRIEVANCE_ROUTING"
  | "WP_GIG_PLATFORM_WORKERS"
  | "WP_UNORGANISED_WORKERS"
  | "WP_STATE_SPECIFIC_RULES"
  | "WORKPLACE_WAGES_CONDITIONS"
  | "WORKPLACE_MATERNITY_PROTECTION"
  | "WORKPLACE_DISPUTES_TERMINATION"
  | "WORKPLACE_SOCIAL_SECURITY"
  | "WORKPLACE_GIG_UNORGANISED_WORKERS"
  | "WORKPLACE_OSH_HEALTH_SAFETY";

export type AnySubdomain =
  | ConsumerSubdomain
  | TenantSubdomain
  | RtiSubdomain
  | WelfareSubdomain
  | WorkplaceSubdomain;

// ==========================================
// 4. USE CASE CAPABILITIES
// ==========================================

export type SupportedUseCase =
  | "problem_understanding"
  | "rights_navigation"
  | "jurisdiction_routing"
  | "scheme_eligibility"
  | "authority_identification"
  | "rti_drafting"
  | "form_filling"
  | "citation_provenance";

// ==========================================
// 5. CANONICAL VERIFIED SOURCE RECORD
// ==========================================

export interface AuthorityContact {
  designation?: string;
  department?: string;
  organization: string;
  office_address?: string;
  portal_url?: string;
  portal_type?: "ONLINE_APPLICATION_PORTAL" | "FIRST_APPEAL_PORTAL" | "SECOND_APPEAL_PORTAL" | "INFORMATION_COMMISSION_WEBSITE" | "INFORMATION_PAGE_ONLY" | "OFFLINE_ONLY";
  initial_application_portal?: string | null;
  first_appeal_portal?: string | null;
  second_appeal_portal?: string | null;
  information_commission_website?: string;
  helpline_number?: string;
  filing_modes?: Array<"ONLINE" | "POSTAL" | "PHYSICAL_COUNTER" | "EMAIL">;
}

export interface StatutoryRulesCriteria {
  eligibility_conditions?: string[];
  exclusions?: string[];
  time_limits_days?: number;
  statutory_fees?: string;
  application_fee_amount?: number;
  first_appeal_fee_amount?: number;
  second_appeal_fee_amount?: number;
  first_appeal_filing_deadline_days?: number;
  first_appeal_delay_condonation?: boolean;
  first_appeal_disposal_normal_days?: number;
  first_appeal_disposal_max_days?: number;
  second_appeal_filing_deadline_days?: number;
  second_appeal_delay_condonation?: boolean;
  required_documents?: string[];
  escalation_route?: string[];
  prohibited_actions?: string[];
  min_age?: number;
  max_age?: number;
  annual_income_limit?: number;
  benefit_amount_or_details?: string;
  target_beneficiary_group?: string;
}

export interface VerifiedSourceRecord {
  /** Unique stable citation identifier (e.g., 'SRC-RTI-NAT-001') */
  id: string;
  /** Human-readable title of the legal provision, scheme, or authority */
  title: string;
  /** Primary Master Domain */
  domain: MasterDomain;
  /** Specific Subdomain Code */
  subdomain: AnySubdomain;
  /** Concise, objective legal/administrative summary */
  summary: string;
  /** Geographical and administrative jurisdiction */
  jurisdiction: JurisdictionModel;
  /** Full official source provenance and verification metadata */
  provenance: SourceProvenance;
  /** AI & Application use cases supported by this record */
  supported_use_cases: SupportedUseCase[];
  /** Official administrative authority / filing point contact */
  authority_details?: AuthorityContact;
  /** Procedural rules, timelines, fees, eligibility criteria */
  rules_or_criteria?: StatutoryRulesCriteria;
  /** Tag keywords for problem understanding and vectorless discovery */
  keywords: string[];
}

// ==========================================
// 6. VALIDATION & QUERY RESULTS
// ==========================================

export interface SourceValidationIssue {
  field: string;
  message: string;
  severity: "ERROR" | "WARNING";
}

export interface SourceValidationResult {
  isValid: boolean;
  recordId: string;
  issues: SourceValidationIssue[];
}

export interface SourceRegistrySummary {
  totalRecords: number;
  byDomain: Record<MasterDomain, number>;
  byVerificationStatus: Record<VerificationStatus, number>;
  byGovernmentLevel: Record<GovernmentLevel, number>;
  verifiedAllowlistCount: number;
}
