import { MasterDomain, VerificationStatus } from "./source-data";

export type DeadlineDurationUnit = "CALENDAR_DAYS" | "WORKING_DAYS" | "HOURS" | "MONTHS";

export type MatterStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "AWAITING_RESPONSE"
  | "ACTION_DUE"
  | "DUE_TODAY"
  | "OVERDUE"
  | "APPEAL_AVAILABLE"
  | "COMPLETED"
  | "DEADLINE_UNKNOWN";

export interface StatutoryDeadlineRule {
  deadline_id: string;
  domain: MasterDomain;
  jurisdiction: {
    country: "IN";
    state_ut: string; // "National" or specific State/UT
  };
  event_type: string;
  trigger_event: string;
  trigger_date_label: string;
  duration: number;
  duration_unit: DeadlineDurationUnit;
  legal_basis: string;
  section_or_rule: string;
  source_record_id: string;
  next_action_title: string;
  next_action_description: string;
  related_form_id?: string;
  official_portal?: string;
  condonation_available: boolean;
  condonation_notes?: string;
  notes?: string;
  verification_status: VerificationStatus;
}

export interface TimelineMilestone {
  milestoneId: string;
  title: string;
  targetDate: string;
  durationDaysFromTrigger: number;
  legalBasis: string;
  sectionOrRule: string;
  description: string;
  isWarning?: boolean;
  isUrgent?: boolean;
  isCondonable?: boolean;
  status: "COMPLETED" | "ACTIVE" | "PENDING" | "OVERDUE";
}

export interface CitizenMatter {
  id: string;
  title: string;
  domain: MasterDomain;
  state_ut: string;
  authority: string;
  reference_number?: string;
  trigger_rule_id: string;
  filing_date: string; // ISO format "YYYY-MM-DD"
  is_life_and_liberty?: boolean;
  decision_date?: string;
  status: MatterStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface DeadlineCalculationResult {
  matterId: string;
  ruleId: string;
  filingDate: string;
  deadlineDate: string;
  formattedDeadlineDate: string;
  daysRemaining: number;
  isOverdue: boolean;
  isDueToday: boolean;
  status: MatterStatus;
  statusLabel: string;
  countdownText: string;
  legalBasis: string;
  sourceRecordId: string;
  verificationStatus: VerificationStatus;
  condonationAvailable: boolean;
  condonationMessage?: string;
  nextAction: {
    title: string;
    description: string;
    relatedFormId?: string;
    portalUrl?: string;
  };
  timeline: TimelineMilestone[];
}
