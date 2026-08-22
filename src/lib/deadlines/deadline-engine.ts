import {
  CitizenMatter,
  DeadlineCalculationResult,
  StatutoryDeadlineRule,
  TimelineMilestone,
  MatterStatus
} from "@/types/deadlines";
import {
  STATUTORY_DEADLINE_RULES,
  getDeadlineRuleById
} from "@/data/deadlines/deadline-registry";

/**
 * Pure, Timezone-Safe Calendar Date Arithmetic
 * Operates strictly on UTC date components to prevent browser timezone shifts.
 */

export function parseIsoDateComponents(isoDateStr: string): {
  year: number;
  month: number; // 1-indexed (1 to 12)
  day: number;
} {
  const clean = isoDateStr.split("T")[0].trim();
  const parts = clean.split("-").map((p) => parseInt(p, 10));
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    throw new Error(`Invalid ISO date format: '${isoDateStr}'. Expected 'YYYY-MM-DD'.`);
  }
  return { year: parts[0], month: parts[1], day: parts[2] };
}

export function formatUtcIsoDate(year: number, month: number, day: number): string {
  const y = year.toString().padStart(4, "0");
  const m = month.toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDaysSafe(isoDateStr: string, days: number): string {
  const { year, month, day } = parseIsoDateComponents(isoDateStr);
  const utcDate = new Date(Date.UTC(year, month - 1, day + days));
  return formatUtcIsoDate(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate()
  );
}

export function addMonthsSafe(isoDateStr: string, months: number): string {
  const { year, month, day } = parseIsoDateComponents(isoDateStr);
  const utcDate = new Date(Date.UTC(year, month - 1 + months, day));
  return formatUtcIsoDate(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate()
  );
}

export function addHoursSafe(isoDateStr: string, hours: number): string {
  const days = Math.ceil(hours / 24);
  return addDaysSafe(isoDateStr, days);
}

export function getTodayUtcIso(): string {
  const now = new Date();
  return formatUtcIsoDate(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate());
}

/**
 * Calculates whole calendar days difference between targetDate and referenceDate (target - ref).
 */
export function getCalendarDaysDiff(targetIsoDate: string, refIsoDate: string = getTodayUtcIso()): number {
  const t = parseIsoDateComponents(targetIsoDate);
  const r = parseIsoDateComponents(refIsoDate);

  const tUtc = Date.UTC(t.year, t.month - 1, t.day);
  const rUtc = Date.UTC(r.year, r.month - 1, r.day);

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((tUtc - rUtc) / msPerDay);
}

export function formatFriendlyDate(isoDateStr: string): string {
  try {
    const { year, month, day } = parseIsoDateComponents(isoDateStr);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC"
    });
  } catch {
    return isoDateStr;
  }
}

/**
 * Deterministically evaluates the statutory deadline, timeline, and next legal actions for a citizen matter.
 */
export function calculateMatterDeadline(
  matter: CitizenMatter,
  currentDateIso: string = getTodayUtcIso()
): DeadlineCalculationResult {
  const rule = getDeadlineRuleById(matter.trigger_rule_id);

  // If no verified statutory rule exists, return DEADLINE_UNKNOWN without guessing
  if (!rule) {
    return {
      matterId: matter.id,
      ruleId: matter.trigger_rule_id || "UNKNOWN_RULE",
      filingDate: matter.filing_date,
      deadlineDate: matter.filing_date,
      formattedDeadlineDate: "Unknown / Unverified",
      daysRemaining: 0,
      isOverdue: false,
      isDueToday: false,
      status: "DEADLINE_UNKNOWN",
      statusLabel: "Deadline Requires Verification",
      countdownText: "Statutory deadline cannot be established from verified source data.",
      legalBasis: "Unverified / Non-Standard Procedure",
      sourceRecordId: "N/A",
      verificationStatus: "NEEDS_REVERIFICATION",
      condonationAvailable: false,
      nextAction: {
        title: "Verify Specific Limitation with Legal Authority",
        description: "No verified statutory timeline entry exists for this specific state or matter type."
      },
      timeline: []
    };
  }

  // Calculate the target statutory deadline date
  let calculatedDeadlineDate = matter.filing_date;
  switch (rule.duration_unit) {
    case "HOURS":
      calculatedDeadlineDate = addHoursSafe(matter.filing_date, rule.duration);
      break;
    case "MONTHS":
      calculatedDeadlineDate = addMonthsSafe(matter.filing_date, rule.duration);
      break;
    case "CALENDAR_DAYS":
    case "WORKING_DAYS":
    default:
      calculatedDeadlineDate = addDaysSafe(matter.filing_date, rule.duration);
      break;
  }

  const daysRemaining = getCalendarDaysDiff(calculatedDeadlineDate, currentDateIso);
  const isDueToday = daysRemaining === 0;
  const isOverdue = daysRemaining < 0;

  // Determine user-facing matter status
  let status: MatterStatus = "AWAITING_RESPONSE";
  let statusLabel = "Awaiting Response";
  let countdownText = "";

  if (matter.status === "COMPLETED") {
    status = "COMPLETED";
    statusLabel = "Completed";
    countdownText = "Matter marked as concluded.";
  } else if (isDueToday) {
    status = "DUE_TODAY";
    statusLabel = "Due Today";
    countdownText = "Statutory deadline expires today.";
  } else if (isOverdue) {
    const overdueDays = Math.abs(daysRemaining);
    if (rule.domain === "RTI_ACCESS" && rule.deadline_id.includes("SEC_7_1")) {
      status = "APPEAL_AVAILABLE";
      statusLabel = "First Appeal Available";
      countdownText = `Response period expired ${overdueDays} day${overdueDays > 1 ? "s" : ""} ago. First Appeal is now available.`;
    } else {
      status = "OVERDUE";
      statusLabel = "Period Expired";
      countdownText = `Statutory period expired ${overdueDays} day${overdueDays > 1 ? "s" : ""} ago.`;
    }
  } else {
    status = "AWAITING_RESPONSE";
    statusLabel = "Awaiting Response";
    countdownText = `${daysRemaining} day${daysRemaining > 1 ? "s" : ""} remaining`;
  }

  // Construct Chronological Timeline Milestones
  const timeline: TimelineMilestone[] = [
    {
      milestoneId: "m1_filing",
      title: rule.trigger_event,
      targetDate: matter.filing_date,
      durationDaysFromTrigger: 0,
      legalBasis: rule.legal_basis,
      sectionOrRule: rule.section_or_rule,
      description: `Matter initiated on ${formatFriendlyDate(matter.filing_date)}.`,
      status: "COMPLETED"
    },
    {
      milestoneId: "m2_deadline",
      title: `${rule.duration} ${rule.duration_unit.replace("_", " ").toLowerCase()} Statutory Disposal Deadline`,
      targetDate: calculatedDeadlineDate,
      durationDaysFromTrigger: rule.duration,
      legalBasis: rule.legal_basis,
      sectionOrRule: rule.section_or_rule,
      description: rule.next_action_description,
      isWarning: isOverdue || isDueToday,
      isUrgent: rule.duration_unit === "HOURS",
      status: isOverdue ? "OVERDUE" : isDueToday ? "ACTIVE" : "PENDING"
    }
  ];

  // If RTI Section 7(1), add First Appeal and FAA Disposal milestones to complete the lifecycle
  if (rule.deadline_id === "RTI_SEC_7_1_NORMAL" || rule.deadline_id === "RTI_SEC_7_1_LIFE_LIBERTY") {
    const firstAppealDeadline = addDaysSafe(calculatedDeadlineDate, 30);
    const faaDisposalDeadline = addDaysSafe(firstAppealDeadline, 30);
    const faaMaxDisposalDeadline = addDaysSafe(firstAppealDeadline, 45);
    const secondAppealDeadline = addDaysSafe(faaMaxDisposalDeadline, 90);

    timeline.push(
      {
        milestoneId: "m3_first_appeal",
        title: "First Appeal Filing Window (Section 19(1))",
        targetDate: firstAppealDeadline,
        durationDaysFromTrigger: 60,
        legalBasis: "RTI Act 2005",
        sectionOrRule: "Section 19(1)",
        description:
          "30-day window to file First Appeal before FAA. (Delay condonable under Section 19(1) proviso upon showing sufficient cause).",
        isCondonable: true,
        status: isOverdue ? "ACTIVE" : "PENDING"
      },
      {
        milestoneId: "m4_faa_disposal",
        title: "FAA Appeal Disposal Window (Section 19(6))",
        targetDate: faaDisposalDeadline,
        durationDaysFromTrigger: 90,
        legalBasis: "RTI Act 2005",
        sectionOrRule: "Section 19(6)",
        description: "FAA must dispose First Appeal within 30 days (max 45 days for recorded reasons).",
        status: "PENDING"
      },
      {
        milestoneId: "m5_second_appeal",
        title: "Second Appeal Window before Information Commission (Section 19(3))",
        targetDate: secondAppealDeadline,
        durationDaysFromTrigger: 180,
        legalBasis: "RTI Act 2005",
        sectionOrRule: "Section 19(3)",
        description: "90-day window to file Second Appeal before CIC/SIC. (Delay condonable under Section 19(3) proviso).",
        isCondonable: true,
        status: "PENDING"
      }
    );
  }

  return {
    matterId: matter.id,
    ruleId: rule.deadline_id,
    filingDate: matter.filing_date,
    deadlineDate: calculatedDeadlineDate,
    formattedDeadlineDate: formatFriendlyDate(calculatedDeadlineDate),
    daysRemaining,
    isOverdue,
    isDueToday,
    status,
    statusLabel,
    countdownText,
    legalBasis: `${rule.legal_basis} — ${rule.section_or_rule}`,
    sourceRecordId: rule.source_record_id,
    verificationStatus: rule.verification_status,
    condonationAvailable: rule.condonation_available,
    condonationMessage: rule.condonation_notes,
    nextAction: {
      title: rule.next_action_title,
      description: rule.next_action_description,
      relatedFormId: rule.related_form_id,
      portalUrl: rule.official_portal
    },
    timeline
  };
}
