// src/lib/triage/action-planner.ts — Unified Civic & Legal Action Planner
import { resolvePinAuthority, PinRoutingResolution } from "@/lib/routing/pin-router";

export type CivicLegalDomain =
  | "CIVIC_RTI"
  | "CONSUMER"
  | "TENANT"
  | "WORKPLACE"
  | "WELFARE"
  | "UNKNOWN";

export type DocumentType =
  | "CIVIC_GRIEVANCE"
  | "RTI_APPLICATION"
  | "CONSUMER_REPRESENTATION"
  | "TENANT_REPRESENTATION"
  | "WORKPLACE_REPRESENTATION"
  | "SCHEME_APPLICATION";

export interface ActionPlanAuthority {
  name: string;
  designation: string;
  department?: string;
  sourceId?: string;
  portalUrl?: string;
  verified: boolean;
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
}

export interface ActionPlanDeadline {
  days: number;
  basis: string;
  plainLanguageMeaning: string;
  nextAction: string;
}

export interface ActionPlan {
  domain: CivicLegalDomain;
  problemUnderstood: string;
  recommendedAction: string;
  whyThisAction: string[];
  whyNotOtherRoutes?: string;
  authority: ActionPlanAuthority;
  evidenceRequired: string[];
  statutoryDeadline: ActionPlanDeadline;
  nextSteps: string[];
  escalation: {
    route: string;
    triggerCondition: string;
    targetAuthority: string;
  };
  availableDocumentType: DocumentType;
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  sourceReferences: string[];
  pinResolution?: PinRoutingResolution;
}

/**
 * Deterministically classifies citizen problem into a verified civic or legal domain
 */
export function classifyCivicLegalDomain(text: string): CivicLegalDomain {
  const lower = text.toLowerCase();

  // 1. Tenant Keywords
  const tenantRegex = /\b(landlord|tenant|tenancy|security deposit|rental|rent|evict|eviction|lease agreement|house owner|flat owner|vacat(ed|ing)|broker)\b/i;
  if (tenantRegex.test(lower) && !lower.includes("pothole") && !lower.includes("tender")) {
    return "TENANT";
  }

  // 2. Consumer Keywords
  const consumerRegex = /\b(defective|warranty|seller|refund|amazon|flipkart|courier|ecommerce|e-commerce|consumer|expired|damaged product|overcharg(ed|ing)|flight cancel|airline)\b/i;
  if (consumerRegex.test(lower)) {
    return "CONSUMER";
  }

  // 3. Workplace Keywords
  const workplaceRegex = /\b(salary|unpaid wage|wages|employer|overtime|gratuity|provident fund|pf withdrawal|wrongful termination|workplace harassment|labour officer|resignation letter|relieving letter)\b/i;
  if (workplaceRegex.test(lower)) {
    return "WORKPLACE";
  }

  // 4. Welfare Keywords
  const welfareRegex = /\b(scholarship|scheme|ration card|pm-kisan|pmay|ayushman|widow pension|disability pension|pension scheme|bpl card|subsidy)\b/i;
  if (welfareRegex.test(lower)) {
    return "WELFARE";
  }

  // 5. Civic & RTI Keywords
  const civicRegex = /\b(pothole|road|drain|drainage|sewage|water supply|pipeline|streetlight|street light|garbage|sanitation|municipal|corporation|panchayat|ward|councillor|tender|contractor|measurement book|mb records|sanctioned estimate|rti|right to information)\b/i;
  if (civicRegex.test(lower)) {
    return "CIVIC_RTI";
  }

  // Fallback if generic grievance text exists
  if (lower.trim().length > 15) {
    return "CIVIC_RTI";
  }

  return "UNKNOWN";
}

/**
 * Plans a unified, actionable legal roadmap based on the problem and location
 */
export function planCitizenAction(
  problemDescription: string,
  pinCode?: string,
  _state: string = "Tamil Nadu"
): ActionPlan {
  const domain = classifyCivicLegalDomain(problemDescription);
  const pinResolution = pinCode && pinCode.length === 6 ? resolvePinAuthority(pinCode, problemDescription) : undefined;

  switch (domain) {
    case "TENANT": {
      return {
        domain: "TENANT",
        problemUnderstood: "Dispute regarding residential tenancy, security deposit refund, or maintenance withholding.",
        recommendedAction: "Issue Formal Legal Representation & Demand Notice under TNRRRLT Act 2017.",
        whyThisAction: [
          "Security deposit refund is governed strictly under Section 11 of the TNRRRLT Act 2017.",
          "Landlord is statutorily required to refund deposit within 1 month after deduction of legitimate dues.",
          "Formal representation is the mandatory prerequisite before petitioning the Rent Authority.",
        ],
        whyNotOtherRoutes: "RTI Act applies exclusively to Public Authorities and cannot compel private landlords to return funds.",
        authority: {
          name: "Office of the Rent Authority / Revenue Divisional Officer (RDO)",
          designation: "Rent Authority & Tahsildar",
          department: "Revenue and Disaster Management Department, Government of Tamil Nadu",
          sourceId: "SRC-TEN-2F-TN",
          portalUrl: "https://www.tenancy.tn.gov.in",
          verified: true,
          confidence: "HIGH",
        },
        evidenceRequired: [
          "Tenancy Agreement (registered on tenancy.tn.gov.in or executed copy)",
          "Rent payment receipts / Bank account statement showing regular payments",
          "Written communication / WhatsApp / Email demanding deposit return",
          "Handover acknowledgement / Key return proof",
        ],
        statutoryDeadline: {
          days: 30,
          basis: "Section 11, Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017",
          plainLanguageMeaning: "The landlord has a statutory period of 1 month (30 days) to refund the security deposit after you vacate.",
          nextAction: "File an application before the Rent Authority (RDO) under Section 11/30 if no refund is made.",
        },
        nextSteps: [
          "Generate and deliver the formal Security Deposit Representation Notice.",
          "Send via Registered Post with Acknowledgement Due (RPAD) or Speed Post.",
          "Record the dispatch date in InfoRight Tracker to monitor the 30-day window.",
        ],
        escalation: {
          route: "Rent Court Petition under Section 32",
          triggerCondition: "Non-compliance by landlord after 30-day notice expiry",
          targetAuthority: "Competent Rent Court (District / Taluk Court)",
        },
        availableDocumentType: "TENANT_REPRESENTATION",
        confidence: "HIGH",
        sourceReferences: ["SRC-TEN-2F-TN"],
        pinResolution,
      };
    }

    case "CONSUMER": {
      return {
        domain: "CONSUMER",
        problemUnderstood: "Consumer dispute regarding defective product, deficient service, or refusal of legitimate refund.",
        recommendedAction: "Serve Pre-Litigation Consumer Notice & Lodge National Consumer Helpline (NCH) Grievance.",
        whyThisAction: [
          "Consumer Protection Act 2019 protects against unfair trade practices and product deficiency.",
          "NCH 1915 provides expedited alternate dispute resolution (ADR) before formal District Commission filing.",
          "Formal notice gives the seller 15-30 days to resolve before punitive damages are claimed.",
        ],
        whyNotOtherRoutes: "RTI is not applicable against private commercial corporations or online sellers.",
        authority: {
          name: "National Consumer Dispute Redressal Portal (e-Jagriti) / National Consumer Helpline",
          designation: "Consumer Grievance Redressal Officer",
          department: "Department of Consumer Affairs, Government of India",
          sourceId: "SRC-CONS-2A-CENTRAL",
          portalUrl: "https://consumerhelpline.gov.in",
          verified: true,
          confidence: "HIGH",
        },
        evidenceRequired: [
          "Tax Invoice / Purchase receipt / Order confirmation number",
          "Photographs / Video evidence of defect or broken item",
          "Customer service chat logs / Email correspondence with company",
          "Courier delivery / Return attempt acknowledgement",
        ],
        statutoryDeadline: {
          days: 45,
          basis: "Consumer Protection Act, 2019 (Dispute Mediation Window)",
          plainLanguageMeaning: "Companies are normally given 15 to 45 days to resolve complaints through NCH mediation.",
          nextAction: "File formal e-Daakhil / e-Jagriti consumer complaint before District Consumer Disputes Redressal Commission.",
        },
        nextSteps: [
          "Generate Consumer Grievance Representation Notice.",
          "Email notice to seller grievance officer and register complaint at NCH 1915.",
          "Track 45-day statutory resolution timeline in InfoRight.",
        ],
        escalation: {
          route: "e-Daakhil Consumer Commission Filing",
          triggerCondition: "Rejection or non-resolution via NCH within 45 days",
          targetAuthority: "District Consumer Disputes Redressal Commission (DCDRC)",
        },
        availableDocumentType: "CONSUMER_REPRESENTATION",
        confidence: "HIGH",
        sourceReferences: ["SRC-CONS-2A-CENTRAL"],
        pinResolution,
      };
    }

    case "WORKPLACE": {
      return {
        domain: "WORKPLACE",
        problemUnderstood: "Employment dispute regarding unpaid wages, gratuity withholding, or wrongful severance.",
        recommendedAction: "Submit Formal Wage Demand Notice & Labour Conciliation Grievance.",
        whyThisAction: [
          "Payment of Wages Act and Industrial Relations Code mandate timely payment of earned remuneration.",
          "Statutory representation establishes proof of demand for conciliation before Labour Commissioner.",
        ],
        whyNotOtherRoutes: "RTI cannot be used against private commercial employers for internal payroll records.",
        authority: {
          name: "Office of the Deputy Commissioner of Labour / SAMADHAN Portal",
          designation: "Labour Conciliation Officer",
          department: "Ministry of Labour & Employment / State Labour Department",
          sourceId: "SRC-LAB-2A-CENTRAL",
          portalUrl: "https://samadhan.labour.gov.in",
          verified: true,
          confidence: "HIGH",
        },
        evidenceRequired: [
          "Employment Offer Letter / Appointment Order / Contract",
          "Salary slips / Bank account statements showing past salary credits",
          "Timesheet records / Email correspondence proving work rendered",
          "Resignation / Relieving letter / Termination notice",
        ],
        statutoryDeadline: {
          days: 30,
          basis: "Payment of Wages Act / Labour Dispute Redressal Regulations",
          plainLanguageMeaning: "Employers are required to respond to formal wage demands within 15 to 30 days.",
          nextAction: "File online conciliation petition on SAMADHAN 2.0 portal before the Labour Officer.",
        },
        nextSteps: [
          "Generate Formal Workplace Wage Demand Representation.",
          "Serve via official company email and Registered Speed Post.",
          "Track 30-day response period in InfoRight.",
        ],
        escalation: {
          route: "SAMADHAN 2.0 Conciliation Proceeding",
          triggerCondition: "Non-payment after 30-day demand notice",
          targetAuthority: "Labour Court / Industrial Tribunal",
        },
        availableDocumentType: "WORKPLACE_REPRESENTATION",
        confidence: "HIGH",
        sourceReferences: ["SRC-LAB-2A-CENTRAL"],
        pinResolution,
      };
    }

    case "WELFARE": {
      return {
        domain: "WELFARE",
        problemUnderstood: "Inquiry into government welfare scheme eligibility and statutory benefit entitlement.",
        recommendedAction: "Run Deterministic Eligibility Check & Assemble Mandatory Enclosure Checklist.",
        whyThisAction: [
          "Scheme eligibility is governed strictly by notified income, age, category, and domicile criteria.",
          "Deterministic evaluation eliminates false claims and identifies exact missing documentation.",
        ],
        authority: {
          name: "National Welfare Portal & State Welfare Departments",
          designation: "Welfare Officer / Scheme Nodal Officer",
          sourceId: "SRC-SCHEME-PMS-SC",
          portalUrl: "https://scholarships.gov.in",
          verified: true,
          confidence: "HIGH",
        },
        evidenceRequired: [
          "Aadhaar Card / Domicile Certificate",
          "Income Certificate issued by Revenue Authority",
          "Community / Caste Certificate (if applicable)",
          "Bank Passbook linked with Aadhaar (DBT enabled)",
        ],
        statutoryDeadline: {
          days: 60,
          basis: "Direct Benefit Transfer (DBT) Citizen Charter Guidelines",
          plainLanguageMeaning: "Scheme applications are typically processed within 30 to 60 days of verification.",
          nextAction: "Submit formal online application via official National Scholarship or state welfare portal.",
        },
        nextSteps: [
          "Verify profile in InfoRight Scheme Matcher.",
          "Check itemized criteria (Eligible vs Needs Information).",
          "Download required document checklist and proceed to official government portal.",
        ],
        escalation: {
          route: "District Welfare Officer / CPGRAMS Portal",
          triggerCondition: "Delay in disbursement exceeding published citizen charter timeline",
          targetAuthority: "Public Grievance Officer, District Collectorate",
        },
        availableDocumentType: "SCHEME_APPLICATION",
        confidence: "HIGH",
        sourceReferences: ["SRC-SCHEME-PMS-SC", "SRC-SCHEME-PMAY-U"],
        pinResolution,
      };
    }

    case "CIVIC_RTI":
    default: {
      const authName = pinResolution?.responsibleAuthority || "Coimbatore City Municipal Corporation";
      const pioTitle = pinResolution?.rtiAuthority || "Public Information Officer";
      const isRoadOrPothole = problemDescription.toLowerCase().includes("pothole") || problemDescription.toLowerCase().includes("road");

      return {
        domain: "CIVIC_RTI",
        problemUnderstood: "Civic infrastructure failure, road damage, water supply, or municipal governance records.",
        recommendedAction: isRoadOrPothole
          ? "Step 1: Lodge Municipal Grievance Representation; Step 2: File Section 6(1) RTI for Inspection & Measurement Records."
          : "File Section 6(1) Right to Information (RTI) Application for certified public records.",
        whyThisAction: [
          "RTI Act 2005 compels public bodies to disclose sanctioned estimates, contractor defect liability, and expenditure.",
          "Certified records provide statutory legal accountability under Section 6(1).",
          "If the authority failed to repair within civic charter timelines, RTI creates immutable paper trail.",
        ],
        whyNotOtherRoutes: "Civil courts and consumer forums require prior municipal record discovery; RTI provides verified legal proof.",
        authority: {
          name: authName,
          designation: pioTitle,
          department: pinResolution?.departmentName || "Engineering Department (Roads & Infrastructure)",
          sourceId: pinResolution?.jurisdictionSourceId || "SRC-TN-CCMC-JURISDICTION",
          portalUrl: "https://www.ccmc.gov.in",
          verified: Boolean(pinResolution?.resolved),
          confidence: pinResolution && pinResolution.resolved ? (pinResolution.confidence || "HIGH") : "VERIFICATION_REQUIRED",
        },
        evidenceRequired: [
          "Photographs showing damage / unpaved trenches with date timestamp",
          "Exact street name, landmark, and ward details",
          "Previous complaint reference / grievance acknowledgement (if any)",
        ],
        statutoryDeadline: {
          days: 30,
          basis: "Section 7(1) of the Right to Information Act, 2005",
          plainLanguageMeaning: "The Public Information Officer is legally obligated to respond within 30 calendar days.",
          nextAction: "File a First Appeal under Section 19(1) if no response is received after 30 days.",
        },
        nextSteps: [
          "Generate Official Section 6(1) RTI Application Draft.",
          "Pay statutory fee (₹10 Court Fee Stamp or Indian Postal Order).",
          "Record submission date in InfoRight Case Tracker to begin the 30-day countdown.",
        ],
        escalation: {
          route: "First Appeal under Section 19(1)",
          triggerCondition: "Deemed Refusal under Section 7(2) upon expiry of 30 days without PIO response",
          targetAuthority: "The First Appellate Authority / Joint Commissioner",
        },
        availableDocumentType: "RTI_APPLICATION",
        confidence: pinResolution && pinResolution.resolved ? (pinResolution.confidence || "HIGH") : (pinCode ? "VERIFICATION_REQUIRED" : "HIGH"),
        sourceReferences: [
          pinResolution?.postalSourceId || "SRC-POST-IN-PIN",
          pinResolution?.jurisdictionSourceId || "SRC-TN-CCMC-JURISDICTION",
          "SRC-RTI-CENTRAL-2005",
        ],
        pinResolution,
      };
    }
  }
}
