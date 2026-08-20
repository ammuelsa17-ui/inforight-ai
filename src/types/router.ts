import { MasterDomain, VerifiedSourceRecord, GovernmentLevel } from "./source-data";
import { OfficialFormDefinition } from "./form-filler";
import { EligibilityEvaluationState } from "./scheme-navigator";

export type UserIntent =
  | "RIGHTS_NAVIGATION"
  | "RTI_DRAFTING"
  | "SCHEME_ELIGIBILITY"
  | "FORM_FILLING"
  | "AUTHORITY_LOOKUP"
  | "GRIEVANCE_ESCALATION"
  | "GENERAL_INQUIRY";

export interface ResolvedJurisdiction {
  country: "IN";
  state_ut?: string;
  district?: string;
  local_body?: string;
  government_level: GovernmentLevel;
  is_state_identified: boolean;
}

export interface ExtractedFactProfile {
  age?: number;
  gender?: string;
  community?: string;
  annual_family_income?: number;
  education_level?: string;
  is_student?: boolean;
  institution_type?: string;
  occupation?: string;
  is_farmer?: boolean;
  is_unorganised_worker?: boolean;
  is_pregnant_or_lactating?: boolean;
  is_pwd?: boolean;
  dispute_amount?: number;
  transaction_date?: string;
  rent_amount?: number;
  deposit_amount?: number;
  has_written_agreement?: boolean;
  is_registered_tenancy?: boolean;
  utility_disconnected?: boolean;
  facing_lockout?: boolean;
  is_bpl?: boolean;
  raw_entities: Record<string, any>;
}

export interface StructuredActionStep {
  step_number: number;
  action_title: string;
  action_type: "MANDATORY_REQUIREMENT" | "RECOMMENDED_FIRST_STEP" | "ESCALATION_STEP" | "EVIDENCE_PRESERVATION";
  target_authority?: string;
  portal_url?: string;
  helpline?: string;
  description: string;
  time_limit_days?: number;
}

export interface UnifiedRouterRequest {
  user_query: string;
  current_state_ut?: string;
  current_district?: string;
  user_profile?: Partial<ExtractedFactProfile>;
  conversation_history?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface UnifiedRouterResponse {
  intent: UserIntent;
  primary_domain: MasterDomain | "FORM_FILLING";
  subdomain?: string;
  jurisdiction: ResolvedJurisdiction;
  
  /** Fact audit: what is known vs what is still missing */
  fact_analysis: {
    known_facts: Partial<ExtractedFactProfile>;
    missing_critical_facts: string[];
    is_sufficient_for_resolution: boolean;
  };
  
  /** Conversational follow-up: asked only when critical facts are missing */
  progressive_question_to_ask?: string;
  
  /** Core response payload */
  response: {
    plain_language_explanation: string;
    
    /** Distinct categorization for maximum response safety */
    verified_statutory_facts: string[];
    mandatory_legal_requirements: string[];
    possible_remedies: string[];
    recommendations: string[];
    unknown_or_unverified_aspects: string[];
    
    action_plan: StructuredActionStep[];
    
    /** Matched official authority & portal */
    designated_authority: {
      name: string;
      designation?: string;
      portal_url?: string;
      helpline?: string;
      address?: string;
    };
    
    /** Draft application or form mapping if applicable */
    suggested_form?: {
      form_id: string;
      form_name: string;
      portal_url?: string;
      submission_mode: string;
    };
    
    /** Welfare eligibility state (if domain is WELFARE_SCHEMES) */
    scheme_eligibility_state?: EligibilityEvaluationState;
    
    /** Tiered escalation path */
    escalation_pathway: string[];
  };
  
  /** Provenance: Verified Official Source Records */
  official_sources: Array<{
    id: string;
    title: string;
    authority: string;
    url: string;
    source_type: string;
    verification_status: string;
    source_priority: number;
  }>;
  
  /** Mandatory safety disclaimer */
  legal_disclaimer: string;
}
