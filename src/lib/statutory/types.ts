export interface RtiFeeStructure {
  jurisdiction: "Central" | "State" | "Unknown";
  stateName?: string;
  applicationFeeAmount: number;
  currency: "INR";
  permittedPaymentModes: string[];
  isBplExempt: boolean;
  bplExemptionNotice: string;
  reproductionFeeNotice?: string;
  sourceCitation: string;
  sourceUrl: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  dateStr: string;
  sectionReference: string;
  description: string;
  isWarning?: boolean;
  isUrgent?: boolean;
}

export interface StatutoryTimelineResult {
  filingDate: string;
  isLifeAndLiberty: boolean;
  scenario: "no_response" | "decision_received";
  decisionDate?: string;
  transferDeadline?: string;
  standardResponseDeadline: string;
  lifeLibertyDeadline?: string;
  firstAppealFilingDeadline: string;
  timelineBasis: string;
  sectionReferences: string[];
  nuanceFlags: string[];
  events: TimelineEvent[];
}

export interface FirstAppealData {
  originalRtiRefId: string;
  filingDate: string;
  targetAuthority: string;
  firstAppellateAuthorityDesignation: string;
  applicantName: string;
  applicantAddress: string;
  responseStatus: "no_response" | "refused" | "incomplete_info" | "excessive_fee";
  groundsForAppeal: string;
  requestedRelief: string;
  statutoryReference: "Section 19(1) of RTI Act 2005";
}

export interface EvidenceCompletenessItem {
  id: string;
  label: string;
  weight: number;
  isCompleted: boolean;
  missingNotice?: string;
}

export interface EvidenceCompletenessResult {
  scorePercentage: number;
  items: EvidenceCompletenessItem[];
  missingItemsList: string[];
}

export interface EvidenceFileItem {
  id: string;
  name: string;
  type: string;
  sizeBytes: number;
  category: "Photograph" | "Complaint acknowledgement" | "Government letter/order" | "Receipt" | "Notice" | "Supporting document" | "Other";
  objectUrl: string;
}
