import { StatutoryTimelineResult, TimelineEvent } from "./types";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function calculateStatutoryTimeline(
  filingDateInput: string = new Date().toISOString().split("T")[0],
  isLifeAndLiberty: boolean = false,
  scenario: "no_response" | "decision_received" = "no_response",
  decisionDateInput?: string
): StatutoryTimelineResult {
  const fileDate = new Date(filingDateInput);
  const baseFilingStr = formatDate(fileDate);

  // Section 7(1) Response Deadlines
  const standardResponseDate = addDays(fileDate, 30);
  const standardResponseStr = formatDate(standardResponseDate);

  const lifeLibertyDate = addDays(fileDate, 2); // 48 Hours = 2 Days
  const lifeLibertyStr = formatDate(lifeLibertyDate);

  // Section 6(3) Transfer Deadline (5 Days Max)
  const transferDate = addDays(fileDate, 5);
  const transferStr = formatDate(transferDate);

  // Section 19(1) First Appeal Deadline Calculation
  let firstAppealDeadlineDate: Date;
  let timelineBasisText = "";

  if (scenario === "decision_received" && decisionDateInput) {
    const decDate = new Date(decisionDateInput);
    firstAppealDeadlineDate = addDays(decDate, 30);
    timelineBasisText = `Scenario B (Decision Received): First Appeal filing window is within 30 calendar days from receipt of PIO decision (${decisionDateInput}) under Section 19(1).`;
  } else {
    // Scenario A: No Response (Expiry of Section 7 response period)
    const effectiveExpiryDate = isLifeAndLiberty ? lifeLibertyDate : standardResponseDate;
    firstAppealDeadlineDate = addDays(effectiveExpiryDate, 30);
    timelineBasisText = `Scenario A (No Response): First Appeal filing window is within 30 calendar days from expiry of the ${
      isLifeAndLiberty ? "48-hour emergency" : "30-day statutory"
    } response period under Section 19(1).`;
  }

  const firstAppealStr = formatDate(firstAppealDeadlineDate);

  const events: TimelineEvent[] = [
    {
      id: "evt-filing",
      title: "RTI Application Filed",
      dateStr: baseFilingStr,
      sectionReference: "Section 6(1)",
      description: "Application submitted to Public Information Officer (PIO).",
    },
    {
      id: "evt-transfer",
      title: "Max Statutory Transfer Deadline",
      dateStr: transferStr,
      sectionReference: "Section 6(3)",
      description: "If information held by another authority, transfer required within 5 days.",
      isWarning: true,
    },
  ];

  if (isLifeAndLiberty) {
    events.push({
      id: "evt-life-liberty",
      title: "Life & Liberty Response Deadline (48 Hours)",
      dateStr: lifeLibertyStr,
      sectionReference: "Section 7(1) Proviso",
      description: "Mandatory 48-hour response deadline for matters concerning life or liberty.",
      isUrgent: true,
    });
  } else {
    events.push({
      id: "evt-standard-response",
      title: "Standard Statutory PIO Response Deadline",
      dateStr: standardResponseStr,
      sectionReference: "Section 7(1)",
      description: "Standard 30 calendar days PIO response window.",
    });
  }

  events.push({
    id: "evt-first-appeal",
    title: "First Appeal Filing Deadline",
    dateStr: firstAppealStr,
    sectionReference: "Section 19(1)",
    description: timelineBasisText,
    isWarning: true,
  });

  return {
    filingDate: baseFilingStr,
    isLifeAndLiberty,
    scenario,
    decisionDate: decisionDateInput,
    transferDeadline: transferStr,
    standardResponseDeadline: standardResponseStr,
    lifeLibertyDeadline: isLifeAndLiberty ? lifeLibertyStr : undefined,
    firstAppealFilingDeadline: firstAppealStr,
    timelineBasis: timelineBasisText,
    sectionReferences: ["Section 6(1)", "Section 6(3)", "Section 7(1)", "Section 19(1)"],
    nuanceFlags: [
      "Transfer under Section 6(3) may affect the practical response timeline — verify the receiving authority's receipt date.",
      "Section 19(1) proviso permits delayed first appeals to be admitted by the First Appellate Authority if sufficient cause is shown (without guaranteed acceptance).",
    ],
    events,
  };
}
