import { GovernmentLevel, VerificationStatus } from "./source-data";

/**
 * Benefit classification type — clearly distinguishes non-repayable grants/pensions from loans!
 */
export type WelfareBenefitType =
  | "GRANT"
  | "SUBSIDY"
  | "PENSION"
  | "INSURANCE"
  | "SCHOLARSHIP"
  | "TRAINING"
  | "LOAN"
  | "CREDIT"
  | "IN_KIND_FOOD"
  | "IN_KIND_ASSET";

export type WelfareTargetGroup =
  | "WOMEN"
  | "GIRL_CHILD"
  | "CHILDREN"
  | "STUDENTS"
  | "SC_COMMUNITY"
  | "ST_COMMUNITY"
  | "PVTG_COMMUNITY"
  | "OBC_COMMUNITY"
  | "MINORITY_COMMUNITY"
  | "PERSONS_WITH_DISABILITIES"
  | "SENIOR_CITIZENS"
  | "FARMERS"
  | "AGRICULTURAL_LABOURERS"
  | "UNORGANISED_WORKERS"
  | "CONSTRUCTION_WORKERS"
  | "ARTISANS_CRAFTSPERSONS"
  | "STREET_VENDORS"
  | "ENTREPRENEURS"
  | "FISHERFOLK"
  | "RURAL_HOUSEHOLDS"
  | "URBAN_POOR"
  | "BPL_HOUSEHOLDS";

export type EligibilityEvaluationState =
  | "ELIGIBLE"              // All known mandatory requirements match
  | "POTENTIALLY_ELIGIBLE"  // Known information matches, additional confirmation needed
  | "NOT_ELIGIBLE"          // A mandatory requirement clearly fails
  | "UNKNOWN";              // Official information ambiguous or insufficient

export interface SchemeEligibilityCriteria {
  age_min?: number;
  age_max?: number;
  gender?: "ALL" | "FEMALE_ONLY" | "MALE_ONLY" | "TRANSGENDER_INCLUDED";
  annual_family_income_max?: number; // In INR (e.g. 250000 for ₹2.5 Lakhs)
  personal_income_max?: number;
  community?: string[]; // e.g. ["SC", "ST", "OBC", "MBC", "DNC", "GENERAL", "EWS"]
  caste_category?: string[];
  minority_status?: boolean;
  disability_type?: string[];
  disability_percentage_min?: number; // e.g. 40 for standard PwD, 80 for severe
  disability_certificate_required?: boolean;
  education_level?: string[]; // e.g. ["PRE_MATRIC", "POST_MATRIC", "UG", "PG", "DIPLOMA", "DOCTORATE"]
  course?: string[];
  institution_type?: "GOVERNMENT_ONLY" | "GOVERNMENT_AIDED" | "PRIVATE_RECOGNIZED" | "ALL_RECOGNIZED";
  student_status?: "ENROLLED_REGULAR" | "DISTANCE_EDUCATION" | "DROPOUT" | "ANY";
  employment_status?: "UNEMPLOYED" | "SELF_EMPLOYED" | "INFORMAL_WAGE_WORKER" | "ANY";
  occupation?: string[];
  worker_category?: "UNORGANISED" | "BOCW_CONSTRUCTION" | "GIG_PLATFORM" | "DOMESTIC" | "AGRICULTURAL" | "ANY";
  welfare_board_membership_required?: boolean;
  farmer_status?: "LANDOWNER" | "TENANT_FARMER" | "SHARECROPPER" | "ANY";
  landholding_hectares_max?: number; // E.g. 2 hectares for small/marginal farmer
  crop?: string[];
  marital_status?: "UNMARRIED" | "MARRIED" | "WIDOW" | "DESERTED_DIVORCED" | "ANY";
  family_status?: "BPL" | "EWS" | "ANY";
  pregnancy_maternity?: "PREGNANT_WOMAN" | "LACTATING_MOTHER" | "NOT_APPLICABLE";
  rural_urban?: "RURAL_ONLY" | "URBAN_ONLY" | "ALL_AREAS";
  residence_requirement?: string;
  housing_status?: "KUTCHA_HOUSE" | "HOUSETLESS" | "LAND_OWNER" | "ANY";
  other_conditions?: string[];
}

export interface SchemeBenefitDetails {
  type: WelfareBenefitType;
  amount_inr?: number;
  frequency: "ONE_TIME" | "MONTHLY" | "QUARTERLY" | "ANNUAL" | "EVENT_BASED" | "CREDIT_LINKED";
  description: string;
}

export interface SchemeApplicationDetails {
  online_offline: "ONLINE_ONLY" | "OFFLINE_ONLY" | "HYBRID_BOTH";
  application_portal?: string;
  office: string;
  responsible_authority: string;
  form?: string;
  application_open: boolean;
  deadline?: string;
  renewal_required: boolean;
}

export interface DetailedWelfareSchemeRecord {
  scheme_id: string;
  scheme_name: string;
  aliases: string[];
  status: "ACTIVE" | "DISCONTINUED" | "UNDER_REVISION";
  
  category: string; // 4A to 4O
  government_level: GovernmentLevel;
  state_ut: string; // "National" or specific State/UT
  ministry: string;
  department: string;
  
  target_groups: WelfareTargetGroup[];
  eligibility: SchemeEligibilityCriteria;
  exclusions: string[];
  
  benefits: SchemeBenefitDetails;
  documents_required: string[];
  application: SchemeApplicationDetails;
  
  grievance_authority: string;
  official_source: string;
  guidelines_source?: string;
  effective_date: string;
  source_updated_date: string;
  last_verified: string;
  verification_status: VerificationStatus;
}

export interface UserEligibilityProfile {
  age?: number;
  gender?: "MALE" | "FEMALE" | "TRANSGENDER" | "OTHER";
  state_ut?: string;
  district?: string;
  rural_urban?: "RURAL" | "URBAN";
  annual_family_income?: number;
  community?: "SC" | "ST" | "OBC" | "MBC" | "DNC" | "GENERAL" | "EWS";
  is_minority?: boolean;
  is_pwd?: boolean;
  disability_percentage?: number;
  has_disability_certificate?: boolean;
  education_level?: string;
  current_student?: boolean;
  institution_type?: "GOVERNMENT" | "GOVERNMENT_AIDED" | "PRIVATE";
  occupation_or_vocation?: string;
  is_farmer?: boolean;
  landholding_hectares?: number;
  is_unorganised_worker?: boolean;
  has_eshram?: boolean;
  is_bpl?: boolean;
  marital_status?: "UNMARRIED" | "MARRIED" | "WIDOW" | "DIVORCED_DESERTED";
  is_pregnant_or_lactating?: boolean;
  studied_tn_govt_school_class_6_12?: boolean;
}

export interface SchemeEvaluationResult {
  scheme_id: string;
  scheme_name: string;
  evaluation_state: EligibilityEvaluationState;
  benefit_summary: string;
  benefit_type: WelfareBenefitType;
  match_reasons: string[];
  missing_information_to_confirm: string[];
  disqualification_reasons: string[];
  documents_required: string[];
  where_to_apply: {
    portal_url?: string;
    office_name: string;
    mode: string;
  };
  official_source_url: string;
}

export interface SchemeEligibilityReaderOutput {
  candidate_schemes_evaluated: number;
  eligible_schemes: SchemeEvaluationResult[];
  potentially_eligible_schemes: SchemeEvaluationResult[];
  progressive_questions_to_ask_user: string[];
  summary_disclaimer: string;
}

export const MANDATORY_SCHEME_DISCLAIMER =
  "Eligibility evaluation is generated based on official Ministry guidelines and portal rules (myScheme, NSP, administering departments). InfoRight AI does not sanction benefits or guarantee application acceptance. Final eligibility determination and disbursement are subject to statutory scrutiny by the respective administering department.";
