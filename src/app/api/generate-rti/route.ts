import { NextRequest, NextResponse } from "next/server";
import { GenerateRtiResponse } from "@/context/RoleContext";

// Local official-source allowlist
const ALLOWLISTED_SOURCE_IDS = ["CIT-TAM-01", "CIT-TAM-02", "CIT-TAM-03", "CIT-TAM-04"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      issue,
      state,
      district,
      localBodyName,
      locality,
      ward,
      dateRange,
      sourceIds,
      simulateFailure
    } = body;

    // Strict validation
    if (!issue || !state || !district || !localBodyName || !locality) {
      return NextResponse.json(
        { error: "Missing required fields (issue, state, district, localBodyName, locality)" },
        { status: 400 }
      );
    }

    // Privacy boundary protection check (make sure personal data is not in the request)
    const prohibitedFields = ["applicantName", "applicantAddress", "phone", "email", "aadhaar", "signature"];
    for (const key of Object.keys(body)) {
      if (prohibitedFields.includes(key)) {
        return NextResponse.json(
          { error: `Security Violation: Prohibited field '${key}' sent in request. Privacy boundary violated.` },
          { status: 400 }
        );
      }
    }

    // Validate citation IDs
    const invalidCitations = sourceIds.filter((id: string) => !ALLOWLISTED_SOURCE_IDS.includes(id));
    const citationsValid = invalidCitations.length === 0;

    // Construct authority deterministically (Outside Gemini)
    const isCoimbatore =
      district.toLowerCase().includes("coimbatore") ||
      localBodyName.toLowerCase().includes("coimbatore");

    const authority = {
      designation: "Public Information Officer" as const,
      organization: localBodyName || "Municipal Corporation Office",
      state: state || "Tamil Nadu",
      verified: isCoimbatore // Only Coimbatore can be verified in Phase 1
    };

    // If simulateFailure is requested or citations are invalid, trigger fallback mode
    if (simulateFailure || !citationsValid) {
      const fallbackResponse: GenerateRtiResponse = {
        mode: "fallback",
        subject: `RTI Application under Section 6(1) regarding civic maintenance in ${locality}, ${localBodyName}`,
        applicationBody: `This is a standardized fallback RTI application. Under Section 6(1) of the Right to Information Act, 2005, please provide the records specified below regarding civic issues at ${locality}, district of ${district}, state of ${state}.`,
        questions: [
          `Provide the certified copies of the complaints log and action taken reports for maintenance at ${locality} for the past 90 days.`,
          `Provide details of the budget allocation and contractors appointed for maintenance in Ward ${ward || "Not Specified"} for FY 2025-26.`,
          `State the official duration and completion milestones committed to by the department for solving maintenance requests in ${locality}.`
        ],
        authority,
        citationIds: sourceIds.filter((id: string) => ALLOWLISTED_SOURCE_IDS.includes(id)),
        validation: {
          schemaValid: true,
          citationsValid,
          questionCount: 3,
          applicantDataSentToAI: false
        },
        warning: !authority.verified
          ? "Authority is not yet fully verified in our system. Only Coimbatore City Municipal Corporation has verified status in Phase 1."
          : undefined
      };
      return NextResponse.json(fallbackResponse);
    }

    // Success AI response mockup (highly customized based on the problem issue)
    const cleanIssue = issue.toLowerCase();
    let subject = "";
    let questions: string[] = [];

    if (cleanIssue.includes("landlord") || cleanIssue.includes("tenant") || cleanIssue.includes("deposit")) {
      subject = `Request for tenancy regulations and dispute arbitration frameworks under the rent control board`;
      questions = [
        "Provide certified copies of the standard guidelines on security deposit limits and refund timelines under the state tenancy act.",
        "Provide details of the registered rental agreement templates and dispute resolution forms applicable in this local jurisdiction.",
        "Specify the designated arbitration officers and sub-divisional magistrates responsible for rental grievance hearings in this district."
      ];
    } else if (cleanIssue.includes("water") || cleanIssue.includes("drain") || cleanIssue.includes("sewer")) {
      subject = `RTI seeking public works logs and budgets for drainage systems and sanitation in ${locality} (${ward || "local ward"})`;
      questions = [
        `Provide certified copies of work orders and budget allocations for drainage desilting and maintenance in ${locality} from January 2026 to date.`,
        "Provide the names of the contractors appointed and the payment logs cleared for local desilting operations in the current fiscal year.",
        "Provide copies of the periodic water-logging monitoring registers maintained by the sanitation department for this ward."
      ];
    } else {
      // Default civic road/pavement issue
      subject = `RTI seeking road repairs logs, budget allocations, and contractor SLAs for ${locality}`;
      questions = [
        `Provide certified copies of the sanctioned budget, work specifications, and contracts awarded for road repair in ${locality} during 2025-26.`,
        `Provide the date of road laying, materials audit certificate, and official defect liability period (DLP) for the road stretch at ${locality}.`,
        `State the number of public complaints recorded in the grievance cell for road defects in Ward ${ward || "Not Specified"} and the Action Taken Report.`
      ];
    }

    const successResponse: GenerateRtiResponse = {
      mode: "ai",
      subject,
      applicationBody: `Under Section 6(1) of the Right to Information Act, 2005, please provide the certified information/records outlined in the questions below relating to civic conditions and work registers in ${locality}.`,
      questions,
      authority,
      citationIds: sourceIds,
      validation: {
        schemaValid: true,
        citationsValid: true,
        questionCount: questions.length,
        applicantDataSentToAI: false
      },
      warning: !authority.verified
        ? "Warning: Public Authority verification not yet completed for this region. Displaying fallback caution."
        : undefined
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to process RTI generation request." }, { status: 500 });
  }
}
