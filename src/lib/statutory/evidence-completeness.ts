import { EvidenceCompletenessResult, EvidenceCompletenessItem } from "./types";

export function calculateEvidenceCompletenessScore(data: {
  issueDescription: string;
  locationAndAuthority: string;
  dateRange?: string;
  priorComplaintRef?: string;
  hasSupportingDocuments?: boolean;
  hasSpecificQuestions?: boolean;
}): EvidenceCompletenessResult {
  const items: EvidenceCompletenessItem[] = [
    {
      id: "desc",
      label: "Clear Issue Description (>20 characters)",
      weight: 20,
      isCompleted: Boolean(data.issueDescription && data.issueDescription.trim().length >= 20),
      missingNotice: "Add a detailed description of the problem or civic grievance.",
    },
    {
      id: "loc_auth",
      label: "Locality & Target Authority Identified",
      weight: 20,
      isCompleted: Boolean(data.locationAndAuthority && data.locationAndAuthority.trim().length > 0),
      missingNotice: "Specify the exact locality, road name, or public authority.",
    },
    {
      id: "dates",
      label: "Relevant Date or Date Range",
      weight: 15,
      isCompleted: Boolean(data.dateRange && data.dateRange.trim().length > 0),
      missingNotice: "Include relevant dates or financial year period.",
    },
    {
      id: "prior_ref",
      label: "Prior Complaint or Reference Number",
      weight: 15,
      isCompleted: Boolean(data.priorComplaintRef && data.priorComplaintRef.trim().length > 0),
      missingNotice: "Provide prior grievance acknowledgment or grievance reference number if available.",
    },
    {
      id: "docs",
      label: "Supporting Document / Photo Attached",
      weight: 15,
      isCompleted: Boolean(data.hasSupportingDocuments),
      missingNotice: "Attach photo evidence, receipt, or official correspondence.",
    },
    {
      id: "questions",
      label: "Specific Record Requests / Questions Identified",
      weight: 15,
      isCompleted: Boolean(data.hasSpecificQuestions),
      missingNotice: "Ensure 3–5 specific public record requests are listed.",
    },
  ];

  let totalScore = 0;
  const missingItemsList: string[] = [];

  items.forEach((item) => {
    if (item.isCompleted) {
      totalScore += item.weight;
    } else if (item.missingNotice) {
      missingItemsList.push(item.missingNotice);
    }
  });

  return {
    scorePercentage: Math.min(100, totalScore),
    items,
    missingItemsList,
  };
}
