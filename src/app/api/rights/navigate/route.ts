import { NextRequest, NextResponse } from "next/server";
import { RightsNavigateRequest, RightsNavigateResponse } from "@/types/api";
import { DRAFT_FORM_TEMPLATES } from "@/data/forms/form-registry";
import { OFFICIAL_SOURCES_REGISTRY } from "@/data/source-registry";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as RightsNavigateRequest | null;

    if (!body || !body.category || !body.description || !body.state) {
      return NextResponse.json(
        { error: "Missing required fields: category, description, state are required." },
        { status: 400 }
      );
    }

    const { category, issueType, description, state, simulateFailure } = body;

    // Check for simulated failure toggle
    if (simulateFailure) {
      const fallbackResponse: RightsNavigateResponse = {
        category,
        jurisdiction: state,
        issueTitle: issueType || `${category.toUpperCase()} Dispute Navigation`,
        summary: `Standard procedural guidance loaded for ${category} dispute in ${state}.`,
        actions: [
          "Collate all transaction documents and written communications.",
          "Issue a formal written representation notice giving 15 days for resolution.",
          "Escalate to the official statutory dispute portal if unresolved.",
        ],
        evidenceChecklist: [
          "Payment proof or bank statement",
          "Written agreement or purchase invoice",
          "Correspondence logs / Email records",
        ],
        escalationSteps: [
          "Step 1: Serve formal representation letter to the opposing party.",
          "Step 2: File online grievance on the official statutory portal.",
          "Step 3: Escalate to statutory court / commission.",
        ],
        escalationPathway: {
          portalName: "Statutory Dispute Redressal Portal",
          portalUrl: "https://www.tn.gov.in/",
          authorityName: "Statutory Grievance Authority",
          helplinePhone: "1915",
        },
        representationLetter: {
          recipientTitle: "Grievance Redressal Officer / Opposite Party",
          subject: `Formal Representation regarding ${category} dispute`,
          body: `I am writing to formally raise a grievance regarding ${description}. Please take immediate notice and provide resolution within 15 days.`,
        },
        bureaucracyTranslation: {
          whatThisMeans: "You have statutory rights under applicable state and central acts.",
          whatYouShouldDoNow: "Send the formal representation draft to the opposite party via registered post or email.",
          documentsToCollect: ["Invoice / Agreement", "Payment Receipt", "Written Email Record"],
          whereToSubmit: "Official portal or statutory commission office.",
          whatIfNoResponse: "File an online dispute on the official statutory portal after 15 days.",
        },
        jurisdictionWarning: category === "tenant" ? `Tenancy regulations in ${state} are governed by state-specific rent acts. Verify local rent court jurisdiction before filing.` : undefined,
        citationIds: category === "consumer" ? ["CONSUMER_PROTECTION_ACT_2019", "NATIONAL_CONSUMER_HELPLINE", "E_JAGRITI_PORTAL"] : category === "tenant" ? ["TN_RENT_ACT_2017", "STATE_RENT_AUTHORITY"] : ["INDUSTRIAL_DISPUTES_ACT_1947", "SAMADHAN_2_PORTAL"],
        verificationRequired: false,
        warning: "Internal failure simulation toggled. Displaying fallback procedural guidance.",
      };
      return NextResponse.json(fallbackResponse, { status: 200 });
    }

    // Consumer Dispute Resolution
    if (category === "consumer") {
      const template = DRAFT_FORM_TEMPLATES.CONSUMER_REFUND_DENIAL;
      const response: RightsNavigateResponse = {
        category: "consumer",
        jurisdiction: "National (Consumer Protection Act 2019)",
        issueTitle: "Defective Product & Refund Denial Dispute",
        summary: "Under the Consumer Protection Act 2019 and E-Commerce Rules 2020, sellers are legally obligated to replace defective items or issue a full refund within statutory timelines.",
        actions: [
          "Send the generated draft representation letter to the seller / company nodal officer.",
          "If no response within 7 days, register a free pre-litigation complaint on NCH (Call 1915 or website).",
          "File an official online consumer case on e-Jagriti portal if unresolved.",
        ],
        evidenceChecklist: template.requiredEvidence,
        escalationSteps: [
          "Step 1: Serve Formal Representation Letter (15-day notice).",
          "Step 2: Register NCH Grievance (Call 1915 / NCH App).",
          "Step 3: File Online Case on e-Jagriti Portal (National Consumer Commission).",
        ],
        escalationPathway: {
          portalName: "e-Jagriti Consumer Portal & National Consumer Helpline (1915)",
          portalUrl: OFFICIAL_SOURCES_REGISTRY.E_JAGRITI_PORTAL.officialUrl,
          authorityName: "District / State Consumer Disputes Redressal Commission",
          helplinePhone: "1915",
        },
        representationLetter: {
          recipientTitle: template.recipientTitle,
          subject: template.defaultSubject,
          body: `${template.defaultBody}\n\nIncident Details: ${description}\n\nState Jurisdiction: ${state}`,
        },
        bureaucracyTranslation: {
          whatThisMeans: "E-commerce platforms and sellers cannot refuse refunds for defective items delivered to consumers.",
          whatYouShouldDoNow: "Copy or print the generated representation letter and email it to the company nodal officer.",
          documentsToCollect: template.requiredEvidence,
          whereToSubmit: "Email to company grievance officer or e-Jagriti Portal.",
          whatIfNoResponse: "Call 1915 (National Consumer Helpline) or file on e-Jagriti.",
        },
        citationIds: ["CONSUMER_PROTECTION_ACT_2019", "NATIONAL_CONSUMER_HELPLINE", "E_JAGRITI_PORTAL"],
        verificationRequired: false,
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Tenant Dispute Resolution
    if (category === "tenant") {
      const template = DRAFT_FORM_TEMPLATES.TENANT_DEPOSIT_WITHHOLDING;
      const response: RightsNavigateResponse = {
        category: "tenant",
        jurisdiction: `${state} Tenancy Jurisdiction`,
        issueTitle: "Rental Security Deposit Recovery & Repairs",
        summary: `Under ${state} rental laws (e.g. TN Regulation of Rights and Responsibilities of Landlords and Tenants Act 2017), security deposit must be refunded upon key handover minus mutually agreed repairs.`,
        actions: [
          "Serve formal written notice giving 15 days to return the security deposit.",
          "Attach key handover receipt and utility bill clearance receipts.",
          "File an application before the Rent Authority / Rent Court if unpaid.",
        ],
        evidenceChecklist: template.requiredEvidence,
        escalationSteps: [
          "Step 1: Deliver Formal Tenant Representation Letter by Registered Post / Email.",
          "Step 2: Submit Dispute Application to the local Rent Authority / Revenue Officer.",
          "Step 3: Initiate summary recovery proceedings in Rent Court.",
        ],
        escalationPathway: {
          portalName: "State Rent Authority Portal",
          portalUrl: OFFICIAL_SOURCES_REGISTRY.STATE_RENT_AUTHORITY.officialUrl,
          authorityName: "Rent Authority & Rent Court",
        },
        representationLetter: {
          recipientTitle: template.recipientTitle,
          subject: template.defaultSubject,
          body: `${template.defaultBody}\n\nTenancy Issue Context: ${description}\n\nProperty State: ${state}`,
        },
        bureaucracyTranslation: {
          whatThisMeans: "Landlords cannot arbitrarily withhold security deposits without valid, documented repair receipts.",
          whatYouShouldDoNow: "Send the formal notice by email and registered post.",
          documentsToCollect: template.requiredEvidence,
          whereToSubmit: "Directly to landlord or District Rent Authority office.",
          whatIfNoResponse: "File a petition with the District Rent Court.",
        },
        jurisdictionWarning: `Tenancy regulations in ${state} are governed strictly by state rent control acts. Verify local rent court jurisdiction before filing.`,
        citationIds: ["TN_RENT_ACT_2017", "STATE_RENT_AUTHORITY"],
        verificationRequired: false,
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Workplace Dispute Resolution
    const template = DRAFT_FORM_TEMPLATES.WORKPLACE_UNPAID_SALARY;
    const response: RightsNavigateResponse = {
      category: "workplace",
      jurisdiction: "Industrial Disputes Act 1947 & Payment of Wages Act 1936",
      issueTitle: "Unpaid Salary Dues & Final Settlement Recovery",
      summary: "Under the Payment of Wages Act 1936, earned salary must be disbursed by the 7th/10th of every month. Exit settlement dues must be cleared post-handover.",
      actions: [
        "Send the generated grievance representation letter to HR and Managing Director.",
        "File an online conciliation dispute on SAMADHAN 2.0 portal (Chief Labour Commissioner Central).",
        "Submit a formal complaint to the District Labour Commissioner office.",
      ],
      evidenceChecklist: template.requiredEvidence,
      escalationSteps: [
        "Step 1: Send Formal Employer Grievance Notice (7-day resolution window).",
        "Step 2: File Online Dispute on SAMADHAN 2.0 Conciliation Portal.",
        "Step 3: Conciliation proceedings before Assistant Labour Commissioner.",
      ],
      escalationPathway: {
        portalName: "SAMADHAN 2.0 Industrial Dispute Portal",
        portalUrl: OFFICIAL_SOURCES_REGISTRY.SAMADHAN_2_PORTAL.officialUrl,
        authorityName: "Chief Labour Commissioner (Central) / District Labour Officer",
      },
      representationLetter: {
        recipientTitle: template.recipientTitle,
        subject: template.defaultSubject,
        body: `${template.defaultBody}\n\nSalary Dispute Description: ${description}\n\nEmployment Location: ${state}`,
      },
      bureaucracyTranslation: {
        whatThisMeans: "Employers are legally prohibited from withholding earned wages or final settlement after exit handover.",
        whatYouShouldDoNow: "Email the grievance letter to HR and management.",
        documentsToCollect: template.requiredEvidence,
        whereToSubmit: "Company Management & SAMADHAN 2.0 Portal.",
        whatIfNoResponse: "Initiate conciliation on SAMADHAN 2.0.",
      },
      citationIds: ["INDUSTRIAL_DISPUTES_ACT_1947", "SAMADHAN_2_PORTAL"],
      verificationRequired: false,
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in Rights Navigation Route." },
      { status: 500 }
    );
  }
}
