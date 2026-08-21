import { GovernmentLevel } from "./source-data";

/**
 * Workplace & Labour Rights Navigator Data Model
 * 
 * Provides evidence-grounded, zero-hallucination assistance for
 * wage disputes, unlawful deductions, maternity rights, wrongful termination,
 * EPFO/ESIC disputes, and gig worker grievances under Indian Labour Law.
 */

export type WorkerEmploymentCategory =
  | "FORMAL_PRIVATE_SALARIED"
  | "INFORMAL_UNORGANISED_WORKER"
  | "GIG_PLATFORM_WORKER"
  | "BOCW_CONSTRUCTION_WORKER"
  | "CONTRACTUAL_OUTSOURCED_WORKER"
  | "FACTORY_WORKMAN"
  | "SHOPS_ESTABLISHMENT_STAFF"
  | "DOMESTIC_WORKER"
  | "APPRENTICE_TRAINEE";

export type WorkplaceDisputeCategory =
  | "UNPAID_OR_DELAYED_SALARY"
  | "ILLEGAL_SALARY_DEDUCTIONS"
  | "MINIMUM_WAGE_VIOLATION"
  | "UNPAID_OVERTIME_WORK"
  | "MATERNITY_LEAVE_DENIAL_OR_DISMISSAL"
  | "WRONGFUL_TERMINATION_OR_RETRENCHMENT"
  | "WITHHELD_GRATUITY_PAYMENT"
  | "EPF_DEDUCTED_BUT_NOT_DEPOSITED"
  | "ESIC_BENEFIT_DENIAL"
  | "GIG_WORKER_ARBITRARY_DEPLATFORMING"
  | "UNSAFE_HAZARDOUS_WORKING_CONDITIONS"
  | "WORKPLACE_SEXUAL_HARASSMENT_POSH";

export interface WorkplaceJurisdiction {
  country: "IN";
  state_ut: string;
  appropriate_government: "CENTRAL_SPHERE" | "STATE_SPHERE";
  administering_commissionerate: string;
}

export interface WorkplaceNavigatorOutput {
  /** The identified category of workplace dispute */
  issue: WorkplaceDisputeCategory;
  
  /** The worker's classification under applicable labour statutes */
  worker_or_employment_category: WorkerEmploymentCategory;
  
  /** Jurisdiction routing (Central Sphere for Railways/Mines/Banks vs State Sphere for factories/shops) */
  jurisdiction: WorkplaceJurisdiction;
  
  /** The specific statutory rights and protections invoked */
  potentially_applicable_right: {
    statutoryAct: string;
    sectionReference: string;
    rightSummary: string;
  };
  
  /** Plain-language, objective legal explanation of the worker's rights */
  plain_language_explanation: string;
  
  /** Checklists of concrete evidence to preserve */
  evidence_to_preserve: string[];
  
  /** Internal employer complaint / demand notice step */
  internal_complaint_step_if_appropriate: {
    targetEntity: string;
    noticeFormat: string;
    recommendedWaitingPeriodDays: number;
  };
  
  /** Designated statutory labour authority */
  labour_authority: {
    authorityDesignation: string;
    officeName: string;
    portalUrl?: string;
    helpline?: string;
  };
  
  /** Official multi-tier statutory grievance route */
  statutory_grievance_route: Array<{
    stepNumber: number;
    stage: string;
    authority: string;
    actionRequired: string;
    statutoryTimelineDays?: number;
  }>;
  
  /** Tiered escalation pathway */
  escalation: string[];
  
  /** Verified official government sources backing this guidance */
  official_source: Array<{
    id: string;
    title: string;
    authority: string;
    url: string;
    verificationStatus: string;
  }>;
  
  /** Statutory limitations, time bars & caveats */
  limitations: {
    claimLimitationPeriodMonths: number;
    managerialExclusionCaveat: string;
    unorganisedBoardRequirement?: string;
  };
  
  /** Mandatory statutory disclaimer */
  legal_disclaimer: string;
}

export const MANDATORY_WORKPLACE_DISCLAIMER =
  "This workplace guidance is provided for educational and informational purposes based on official Indian labour legislations, Central Labour Codes, and administrative dispute portals (SAMADHAN, EPFiGMS, ESIC). InfoRight AI does not provide formal trade union representation, legal counsel, or guarantee dispute outcomes before Labour Courts or Industrial Tribunals. In case of urgent labour violations, file a grievance on samadhan.labour.gov.in or consult an authorized legal advisor.";
