import { VerifiedSourceRecord } from "./source-data";

/**
 * Consumer Rights Navigator Output Data Model
 * Provides structured, zero-hallucination guidance for consumer disputes.
 */

export type ConsumerProblemCategory =
  | "DEFECTIVE_PRODUCT"
  | "DAMAGED_DELIVERY"
  | "WRONG_PRODUCT_DELIVERED"
  | "WARRANTY_REPAIR_FAILURE"
  | "DEFICIENCY_IN_PAID_SERVICE"
  | "UNREASONABLE_SERVICE_DELAY"
  | "ECOMMERCE_RETURN_REFUND_DISPUTE"
  | "UNAUTHORIZED_CANCELLATION_CHARGE"
  | "MISLEADING_ADVERTISEMENT"
  | "DARK_PATTERNS_DRIP_PRICING"
  | "OVERCHARGING_ABOVE_MRP"
  | "MANDATORY_SERVICE_CHARGE"
  | "BANKING_DIGITAL_PAYMENT_FAILURE"
  | "INSURANCE_CLAIM_REPUDIATION"
  | "TELECOM_BILLING_SPAM_DISPUTE"
  | "FOOD_ADULTERATION_HYGIENE"
  | "ELECTRICITY_BILLING_METER_DEFECT"
  | "AIRLINE_FLIGHT_DELAY_CANCELLATION"
  | "REAL_ESTATE_POSSESSION_DELAY"
  | "CYBER_FINANCIAL_FRAUD";

export interface ConsumerStatusEvaluation {
  isConsumerUnderAct: boolean;
  explanation: string;
  isCommercialExclusionApplicable: boolean;
}

export interface ComplaintRouteStep {
  stepNumber: number;
  stageName: string;
  targetAuthority: string;
  portalUrl?: string;
  helpline?: string;
  actionRequired: string;
  timeLimitDays?: number;
  statutoryFee?: string;
}

export interface ConsumerRightsNavigatorOutput {
  /** High-level classification of the consumer issue */
  problem_type: ConsumerProblemCategory;
  
  /** Statutory consumer eligibility check under Section 2(7) CPA 2019 */
  consumer_status: ConsumerStatusEvaluation;
  
  /** Relevant statutory consumer rights invoked (e.g., Right to Redressal, Right to Safety) */
  applicable_rights: string[];
  
  /** Clear, simple-language explanation of the citizen's legal position */
  plain_language_explanation: string;
  
  /** Checklists of required evidence and documentation to preserve */
  evidence_to_preserve: string[];
  
  /** Immediate actionable next step */
  recommended_first_step: string;
  
  /** Multi-tier official complaint procedure (pre-litigation -> ombudsman/regulator -> commission) */
  official_complaint_route: ComplaintRouteStep[];
  
  /** Tiered escalation pathway if initial attempts are ignored or rejected */
  escalation_route: string[];
  
  /** Possible statutory reliefs under Section 39 CPA 2019 (repair, replacement, refund, compensation) */
  possible_remedies: string[];
  
  /** Statutory constraints, exclusions, and limitation periods */
  limitations: {
    limitationPeriodMonths: number; // 24 months (2 years) from cause of action
    pecuniaryJurisdiction: {
      districtLimit: string; // Up to ₹50 Lakhs (2021 Rules)
      stateLimit: string;    // ₹50 Lakhs to ₹2 Crores
      nationalLimit: string; // Exceeding ₹2 Crores
    };
    commercialUseExclusion: string;
  };
  
  /** Official allowlisted statutory sources and gazettes backing this guidance */
  official_sources: Array<{
    id: string;
    title: string;
    authority: string;
    url: string;
    sourceType: string;
    verificationStatus: string;
  }>;
  
  /** Mandatory statutory disclaimer */
  legal_disclaimer: string;
}

export const MANDATORY_CONSUMER_DISCLAIMER =
  "This guidance is provided for educational and informational purposes based on official statutory regulations (Consumer Protection Act 2019 and sector ombudsman frameworks). InfoRight AI does not provide legal advice or guarantee specific legal outcomes or compensation awards. Consult qualified legal counsel or the National Consumer Helpline (1915) before filing formal petitions.";
