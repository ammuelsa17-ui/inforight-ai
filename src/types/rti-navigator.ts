import { GovernmentLevel } from "./source-data";

/**
 * RTI Drafting & Routing Navigator Data Model
 * 
 * Supports transforming plain-language civic grievances into
 * properly formatted, record-based RTI applications (Section 6(1)),
 * First Appeals (Section 19(1)), and Second Appeals (Section 19(3)).
 */

export interface RtiApplicantDetails {
  /** Note: Applicant personal data is merged locally in browser memory only */
  applicantName: string;
  applicantAddress: string;
  contactNumber?: string;
  email?: string;
  isBpl: boolean;
  bplCardNumber?: string;
}

export interface RtiJurisdictionRouting {
  country: "IN";
  state_ut: string;
  government_level: GovernmentLevel;
  ministry_or_department: string;
  public_authority: string;
  office_level: "CENTRAL_HEADQUARTERS" | "STATE_SECRETARIAT" | "DISTRICT_COLLECTORATE" | "MUNICIPAL_ZONE" | "PANCHAYAT_TALUK";
  geographic_jurisdiction: string;
  pio_designation: "Central Public Information Officer (CPIO)" | "State Public Information Officer (SPIO)" | "Public Information Officer (PIO)";
  first_appellate_authority: {
    designation: string;
    organization: string;
  };
  information_commission: {
    commissionName: string; // E.g., "Central Information Commission (CIC)" or "Tamil Nadu Information Commission (TNIC)"
    portalUrl?: string;
    officeAddress?: string;
  };
  official_filing_method: "ONLINE_PORTAL" | "POSTAL_SPEED_POST" | "PHYSICAL_COUNTER";
  portal_url?: string;
}

export interface RtiRecordRequestItem {
  itemNumber: number;
  recordTitle: string;
  recordDescription: string;
  statutoryCategory: "ADMINISTRATIVE_SANCTION" | "WORK_ORDER" | "MEASUREMENT_BOOK_ENTRY" | "INSPECTION_REPORT" | "PAYMENT_VOUCHERS" | "CONTRACTOR_TENDER_AGREEMENT" | "DUTY_LOGBOOK" | "FILE_NOTINGS" | "CORRESPONDENCE_RECORDS" | "OTHER_EXISTING_RECORD";
}

export interface DraftedRtiApplication {
  subject: string;
  applicationBody: string;
  numberedRecordRequests: string[];
  preferredFormat: "CERTIFIED_PHOTOCOPIES" | "INSPECTION_OF_RECORDS" | "ELECTRONIC_COPY_CD_EMAIL";
  feePaymentClause: string;
  dateAndPlacePlaceholder: {
    date: string;
    place: string;
  };
  enclosuresList: string[];
}

export interface RtiProceduralTimelines {
  pioResponseDays: number; // 30 days (48 hours for life/liberty)
  lifeAndLibertyClauseApplicable: boolean;
  section6TransferDays: number; // 5 days
  thirdPartyProcedureDays?: number; // 40 days max
  section7DeemedRefusalFreeSupplyRule: string; // Information must be free if delayed beyond 30 days
  firstAppealWindowDays: number; // Within 30 days of PIO order or 30-day default
  faaDecisionWindowDays: number; // 30 to 45 days
  secondAppealWindowDays: number; // Within 90 days of FAA order
}

export interface RtiFeeStructure {
  applicationFeeInr: number;
  paymentModesAllowed: string[];
  headOfAccountIfChalan?: string;
  copyingFeePerPageInr: number;
  inspectionFeeRules: string;
  bplExemptionTerms: string;
}

export interface RtiAppealPlaybook {
  firstAppealGuidance: {
    targetAuthority: string;
    filingTimeline: string;
    statutorySection: "Section 19(1) of RTI Act 2005";
    feeApplicable: string;
    grounds: string[];
  };
  secondAppealGuidance: {
    targetCommission: string;
    filingTimeline: string;
    statutorySection: "Section 19(3) of RTI Act 2005";
    requiredAttachments: string[];
  };
  complaintGuidance: {
    targetCommission: string;
    statutorySection: "Section 18 of RTI Act 2005";
    penaltyProvisions: string; // ₹250/day up to ₹25,000 under Section 20(1)
  };
}

export interface RtiDraftingAgentOutput {
  user_civic_problem: string;
  identified_records_to_request: RtiRecordRequestItem[];
  jurisdiction_routing: RtiJurisdictionRouting;
  drafted_application: DraftedRtiApplication;
  fee_structure: RtiFeeStructure;
  procedural_timelines: RtiProceduralTimelines;
  appeal_playbook: RtiAppealPlaybook;
  official_sources: Array<{
    id: string;
    title: string;
    authority: string;
    url: string;
    verificationStatus: string;
  }>;
  legal_disclaimer: string;
}

export const MANDATORY_RTI_DISCLAIMER =
  "RTI applications must request existing material records held by the public authority under Section 2(f) and Section 2(j) of the RTI Act, 2005. Under Supreme Court rulings (CBSE v. Aditya Bandopadhyay), PIOs are not required to generate explanations, answer hypothetical questions, or solve grievances directly. InfoRight AI drafts structured record requests but does not guarantee government disclosure or administrative outcomes.";
