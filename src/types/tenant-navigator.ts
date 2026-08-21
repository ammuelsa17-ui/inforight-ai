/**
 * Tenant Rights Navigator Data Model
 * 
 * Provides state-aware, zero-hallucination tenancy assistance
 * strictly grounded in State Rent Acts and Tenancy Portals.
 */

export type TenancyPremisesType = "RESIDENTIAL" | "COMMERCIAL";

export type TenancyRegistrationStatus =
  | "REGISTERED_ON_STATE_PORTAL"
  | "REGISTERED_SUB_REGISTRAR"
  | "NOTARIZED_ONLY"
  | "UNREGISTERED_WRITTEN"
  | "ORAL_AGREEMENT";

export type TenantDisputeType =
  | "SECURITY_DEPOSIT_REFUND_WITHHELD"
  | "UNLAWFUL_UTILITY_DISCONNECTION_WATER_POWER"
  | "ILLEGAL_LOCKOUT_THREAT_OF_FORCED_EVICTION"
  | "UNREASONABLE_ARBITRARY_RENT_HIKE"
  | "LANDLORD_ENTRY_HARASSMENT_PRIVACY_BREACH"
  | "MAJOR_STRUCTURAL_REPAIR_FAILURE"
  | "REFUSAL_TO_ISSUE_RENT_RECEIPTS"
  | "NOTICE_OF_TERMINATION_DISPUTE"
  | "RENT_PAYMENT_REFUSAL_BY_LANDLORD";

export interface TenantNavigatorInput {
  /** Mandatory State/UT jurisdiction selector */
  state_ut: string;
  
  /** District / City of the rented premises */
  district_city: string;
  
  /** Premises nature: Residential or Commercial */
  residential_or_commercial: TenancyPremisesType;
  
  /** Whether a written tenancy agreement exists */
  written_agreement: boolean;
  
  /** Agreement registration status */
  registration_status: TenancyRegistrationStatus;
  
  /** Agreed monthly rent in INR */
  rent: number;
  
  /** Total security deposit / advance paid in INR */
  deposit: number;
  
  /** Primary category of dispute */
  dispute_type: TenantDisputeType;
  
  /** Whether formal notice has been received or served */
  notice_received: boolean;
  
  /** Rent arrears amount in INR if any */
  rent_arrears_if_any?: number;
  
  /** Specific utilities issue details (water/electricity disconnection) */
  utilities_issue?: {
    isDisconnected: boolean;
    utilityType: "WATER" | "ELECTRICITY" | "SEWERAGE" | "PASSAGE_ELEVATOR" | "MULTIPLE";
    disconnectionDate?: string;
  };
  
  /** Specific eviction issue details */
  eviction_issue?: {
    isThreateningForcedEviction: boolean;
    isLockoutAttempted: boolean;
    hasCourtOrderBeenServed: boolean;
  };
}

export interface TenancyComplaintStep {
  stepNumber: number;
  stageName: string;
  targetAuthority: string;
  portalUrl?: string;
  actionRequired: string;
  statutorySection?: string;
  timeLimitDays?: number;
}

export interface TenantRightsNavigatorOutput {
  /** Applicable State/UT Tenancy Legal Framework */
  governing_act: {
    actName: string;
    stateUt: string;
    isModelTenancyActAdopted: boolean;
    statutoryPortalUrl?: string;
  };
  
  /** Analysis of Tenancy Validity & Statutory Standing */
  tenancy_standing: {
    isWrittenAgreementMandatory: boolean;
    isRegistrationMandatory: boolean;
    currentAgreementStatus: string;
    legalImplications: string;
  };
  
  /** Deposit & Rent Assessment */
  deposit_assessment: {
    stateDepositCapMonths: number;
    maximumPermissibleDeposit: number;
    depositPaid: number;
    excessDepositCollected: number;
    deductionRules: string;
  };
  
  /** Plain-language explanation of tenant rights in this dispute */
  plain_language_explanation: string;
  
  /** Evidence checklist to preserve */
  evidence_to_preserve: string[];
  
  /** Immediate recommended first step */
  recommended_first_step: string;
  
  /** Tiered official complaint and legal remedy route */
  official_complaint_route: TenancyComplaintStep[];
  
  /** Escalation route */
  escalation_route: string[];
  
  /** Possible statutory remedies */
  possible_remedies: string[];
  
  /** Statutory limitations & caveats */
  limitations: {
    evictionProtectionNotes: string;
    appealTimeLimitDays: number;
  };
  
  /** Official verified state sources backing this guidance */
  official_sources: Array<{
    id: string;
    title: string;
    authority: string;
    url: string;
    verificationStatus: string;
  }>;
  
  /** Mandatory statutory non-guarantee disclaimer */
  legal_disclaimer: string;
}

export const MANDATORY_TENANT_DISCLAIMER =
  "This guidance is provided for educational and informational purposes based on official state-specific tenancy legislations and Rent Authority rules. Tenancy law varies strictly by State/UT. InfoRight AI does not provide formal legal representation or guarantee court outcomes. In cases of unlawful lockout or imminent dispossession, contact the emergency helpline (112) or consult qualified legal counsel.";
