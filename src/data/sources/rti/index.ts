import { VerifiedSourceRecord } from "@/types/source-data";
import { RTI_CORE_SOURCES } from "./rti-sources";
import { RTI_STATE_SOURCES } from "./state-rti-directory";

/**
 * Unified Domain 3: RTI Access Sources
 * Combines Core Principles (3A–3E) and India-Wide State/UT & Municipal Directory (3F).
 */
export const RTI_SOURCES: VerifiedSourceRecord[] = [
  ...RTI_CORE_SOURCES,
  ...RTI_STATE_SOURCES
];

export { RTI_CORE_SOURCES, RTI_STATE_SOURCES };

/**
 * Lookup State or UT RTI Framework by State/UT name
 */
export function getRtiLawByState(stateUt: string): VerifiedSourceRecord | undefined {
  const normalized = stateUt.trim().toLowerCase();

  // Exact match first
  const exact = RTI_STATE_SOURCES.find(
    s => s.jurisdiction.state_ut && s.jurisdiction.state_ut.toLowerCase() === normalized
  );
  if (exact) return exact;

  // Substring match
  return RTI_STATE_SOURCES.find(
    s => s.jurisdiction.state_ut && (
         s.jurisdiction.state_ut.toLowerCase().includes(normalized) ||
         normalized.includes(s.jurisdiction.state_ut.toLowerCase())
    )
  );
}

/**
 * Get list of all indexed State/UT names for RTI
 */
export function getAllRtiStates(): string[] {
  const stateSet = new Set<string>();
  RTI_STATE_SOURCES.forEach(s => {
    if (s.jurisdiction.state_ut && !s.jurisdiction.district_if_relevant) {
      stateSet.add(s.jurisdiction.state_ut);
    }
  });
  return Array.from(stateSet);
}

/**
 * Check whether a target entity is a Central Public Authority
 */
export function isCentralRtiAuthority(authorityOrMinistry: string): boolean {
  const lower = authorityOrMinistry.toLowerCase();
  const centralKeywords = [
    "central", "union", "ministry of", "railways", "nhai", "epfo", "esic",
    "bsnl", "sbi", "rbi", "lic", "post office", "uidai", "aadhaar",
    "cbse", "ugc", "income tax department", "customs", "central excise",
    "drdo", "isro", "iit", "iim", "nit", "central university", "cbi", "defence"
  ];
  return centralKeywords.some(kw => lower.includes(kw));
}

/**
 * Get verified statutory application fee for a State/UT
 */
export function getRtiFeeByState(stateUt: string): { fee: number; isExemptBpl: boolean; legalBasis: string } {
  const law = getRtiLawByState(stateUt);
  if (!law) {
    return { fee: 10, isExemptBpl: true, legalBasis: "Right to Information Rules, 2012 / Default State Rules" };
  }
  const amount = law.rules_or_criteria?.application_fee_amount ?? 10;
  return {
    fee: amount,
    isExemptBpl: true,
    legalBasis: law.provenance.legal_basis || law.title
  };
}

/**
 * Get verified portal and filing mode information for a State/UT
 */
export function getRtiPortalInfo(stateUt: string): {
  portalType: "ONLINE_APPLICATION_PORTAL" | "FIRST_APPEAL_PORTAL" | "SECOND_APPEAL_PORTAL" | "INFORMATION_COMMISSION_WEBSITE" | "INFORMATION_PAGE_ONLY" | "OFFLINE_ONLY";
  initialApplicationPortal: string | null;
  firstAppealPortal: string | null;
  secondAppealPortal: string | null;
  commissionWebsite: string;
  filingModes: Array<"ONLINE" | "POSTAL" | "PHYSICAL_COUNTER" | "EMAIL">;
} {
  const law = getRtiLawByState(stateUt);
  if (!law || !law.authority_details) {
    return {
      portalType: "OFFLINE_ONLY",
      initialApplicationPortal: null,
      firstAppealPortal: null,
      secondAppealPortal: null,
      commissionWebsite: "https://cic.gov.in",
      filingModes: ["POSTAL", "PHYSICAL_COUNTER"]
    };
  }

  const details = law.authority_details;
  return {
    portalType: details.portal_type || (details.portal_url?.includes("rtionline") ? "ONLINE_APPLICATION_PORTAL" : "INFORMATION_COMMISSION_WEBSITE"),
    initialApplicationPortal: details.initial_application_portal || null,
    firstAppealPortal: details.first_appeal_portal || null,
    secondAppealPortal: details.second_appeal_portal || null,
    commissionWebsite: details.information_commission_website || details.portal_url || "https://cic.gov.in",
    filingModes: details.filing_modes || ["POSTAL", "PHYSICAL_COUNTER"]
  };
}

/**
 * Get verified statutory appellate timelines and fees for a State/UT
 */
export function getRtiAppellateStructure(stateUt: string): {
  firstAppealFilingDeadlineDays: number;
  firstAppealDelayCondonation: boolean;
  firstAppealDisposalNormalDays: number;
  firstAppealDisposalMaxDays: number;
  secondAppealFilingDeadlineDays: number;
  secondAppealDelayCondonation: boolean;
  firstAppealFeeInr: number;
  secondAppealFeeInr: number;
} {
  const law = getRtiLawByState(stateUt);
  const rc = law?.rules_or_criteria;
  return {
    firstAppealFilingDeadlineDays: rc?.first_appeal_filing_deadline_days ?? 30,
    firstAppealDelayCondonation: rc?.first_appeal_delay_condonation ?? true,
    firstAppealDisposalNormalDays: rc?.first_appeal_disposal_normal_days ?? 30,
    firstAppealDisposalMaxDays: rc?.first_appeal_disposal_max_days ?? 45,
    secondAppealFilingDeadlineDays: rc?.second_appeal_filing_deadline_days ?? 90,
    secondAppealDelayCondonation: rc?.second_appeal_delay_condonation ?? true,
    firstAppealFeeInr: rc?.first_appeal_fee_amount ?? 0,
    secondAppealFeeInr: rc?.second_appeal_fee_amount ?? 0
  };
}

/**
 * Helper to convert plain-language citizen grievances into objective record requests
 */
export interface ObjectiveRecordTransform {
  originalCivicProblem: string;
  identifiedRecordRequests: Array<{
    itemNumber: number;
    recordTitle: string;
    description: string;
    category: "ADMINISTRATIVE_SANCTION" | "WORK_ORDER" | "MEASUREMENT_BOOK" | "INSPECTION_REPORT" | "PAYMENT_VOUCHERS" | "TENDER_AGREEMENT" | "FILE_NOTINGS" | "OTHER_EXISTING_RECORD";
  }>;
  suggestedQuestions: string[];
}

export function convertCivicProblemToRecordRequests(problemDescription: string): ObjectiveRecordTransform {
  const lower = problemDescription.toLowerCase();
  const requests: ObjectiveRecordTransform["identifiedRecordRequests"] = [];
  const suggested: string[] = [];

  let itemCounter = 1;

  if (lower.includes("road") || lower.includes("pothole") || lower.includes("drain") || lower.includes("street light") || lower.includes("construction") || lower.includes("panchayat")) {
    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Certified Copy of Administrative Sanction & Technical Sanction",
      description: "Certified copy of the administrative and technical sanction orders including sanctioned budget and scope of work for the stated project.",
      category: "ADMINISTRATIVE_SANCTION"
    });
    suggested.push("Provide a certified copy of the Administrative Sanction (AS) and Technical Sanction (TS) for the work.");

    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Certified Copy of Work Order & Agreement",
      description: "Certified copy of the work order, name of the executing agency/contractor, contract value, and stipulated timeline for completion.",
      category: "WORK_ORDER"
    });
    suggested.push("Provide a certified copy of the Work Order issued to the executing contractor along with stipulated completion date.");

    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Measurement Book (MB) & Inspection Entries",
      description: "Certified copies of Measurement Book (MB) recordings, stage-wise inspection reports, and material quality test certificates.",
      category: "MEASUREMENT_BOOK"
    });
    suggested.push("Provide certified copies of Measurement Book (MB) entries and quality inspection reports for the executed work.");

    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Payment Vouchers & Defect Liability Status",
      description: "Certified copies of running/final payment bills passed and the active Defect Liability Period (DLP) records.",
      category: "PAYMENT_VOUCHERS"
    });
    suggested.push("Provide copies of payment vouchers released to the contractor and recorded Defect Liability Period (DLP) expiry date.");
  } else if (lower.includes("reject") || lower.includes("pension") || lower.includes("scholarship") || lower.includes("certificate") || lower.includes("ration") || lower.includes("application")) {
    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Certified Copy of Rejection / Order Sheet",
      description: "Certified copy of the official order or endorsement sheet recording the decision/rejection regarding the application.",
      category: "FILE_NOTINGS"
    });
    suggested.push("Provide a certified copy of the official order / endorsement recording the decision taken on application reference number.");

    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Certified Copy of Complete File Notings",
      description: "Certified copies of the entire file notings, scrutinizing reports, and correspondence on the file processing the application.",
      category: "FILE_NOTINGS"
    });
    suggested.push("Provide certified copies of all file notings, dealing assistant comments, and approving officer remarks on the application file.");

    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Recorded Reasons & Applicable Eligibility Rule",
      description: "Certified extract of the rule/guideline cited on record for the rejection or deferral of the benefit.",
      category: "OTHER_EXISTING_RECORD"
    });
    suggested.push("Provide certified copy of the specific rule or policy criteria noted in the records under which the decision was arrived at.");
  } else {
    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Certified Copies of Relevant File Notings & Correspondence",
      description: "Certified copies of file notings, office correspondence, and official orders concerning the subject matter.",
      category: "FILE_NOTINGS"
    });
    suggested.push("Provide certified copies of file notings and correspondence records pertaining to the subject matter.");

    requests.push({
      itemNumber: itemCounter++,
      recordTitle: "Certified Copy of Official Action Taken Report",
      description: "Certified copy of the official action taken report or current recorded status in the department files.",
      category: "OTHER_EXISTING_RECORD"
    });
    suggested.push("Provide a certified copy of the Action Taken Report (ATR) recorded in the official registers regarding the representation.");
  }

  return {
    originalCivicProblem: problemDescription,
    identifiedRecordRequests: requests,
    suggestedQuestions: suggested
  };
}
