// src/lib/triage/action-planner.ts — Unified Pan-India Civic & Legal Action Planner
import { resolvePinAuthority, PinRoutingResolution } from "@/lib/routing/pin-router";
import { resolveLocationContext, IndiaLocationContext } from "@/lib/location/location-context";
import { planConsumerAction } from "@/lib/consumer/consumer-engine";
import { planTenantAction } from "@/lib/tenancy/tenancy-engine";
import { getStateTenancyRecord } from "@/data/tenancy/state-tenancy-registry";

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
  location?: IndiaLocationContext;
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
 * Plans a unified, actionable legal roadmap based on the problem and pan-India location context
 */
export function planCitizenAction(
  problemDescription: string,
  pinCode?: string,
  state: string = "Tamil Nadu",
  district?: string
): ActionPlan {
  const domain = classifyCivicLegalDomain(problemDescription);
  const location = resolveLocationContext({ state, district, pinCode });
  const pinResolution = pinCode && pinCode.length === 6 ? resolvePinAuthority(pinCode, problemDescription) : undefined;

  switch (domain) {
    case "TENANT": {
      const tenantPlan = planTenantAction({
        state: location.stateName,
        district: location.district,
        pinCode: location.pinCode,
        propertyType: "RESIDENTIAL",
        agreementAvailable: true,
        agreementRegistered: false,
        issueType: "SECURITY_DEPOSIT",
        issueDescription: problemDescription,
        noticeReceived: false,
        handoverProofAvailable: true,
        communicationsAvailable: true,
      });

      return {
        domain: "TENANT",
        problemUnderstood: tenantPlan.problemUnderstood,
        recommendedAction: `Issue Formal Legal Representation & Demand Notice under ${tenantPlan.applicableLaw.actTitle}.`,
        whyThisAction: [
          tenantPlan.statutoryRule.summary,
          `Statutory deposit refund window is ${tenantPlan.statutoryRule.depositRefundWindowDays || 30} days upon vacant handover.`,
          "Formal representation is the mandatory prerequisite before petitioning the Rent Authority.",
        ],
        whyNotOtherRoutes: "RTI Act applies exclusively to Public Authorities and cannot compel private landlords to return funds.",
        authority: {
          name: tenantPlan.authorityResolution.rentAuthorityName,
          designation: "Rent Authority & Designated Executive Officer",
          department: `${location.stateName} State Revenue / Housing Department`,
          sourceId: tenantPlan.applicableLaw.sourceId,
          portalUrl: tenantPlan.applicableLaw.sourceUrl || "https://www.indiacode.nic.in",
          verified: tenantPlan.confidence === "HIGH",
          confidence: tenantPlan.confidence,
        },
        evidenceRequired: tenantPlan.evidenceChecklist,
        statutoryDeadline: {
          days: tenantPlan.statutoryRule.depositRefundWindowDays || 30,
          basis: tenantPlan.statutoryRule.statutorySection || tenantPlan.applicableLaw.actTitle,
          plainLanguageMeaning: `Under ${location.stateName} tenancy law, the landlord has a statutory period of ${tenantPlan.statutoryRule.depositRefundWindowDays || 30} days to refund the security deposit after you vacate.`,
          nextAction: `File an application before the ${tenantPlan.authorityResolution.rentAuthorityName} if no refund is made.`,
        },
        nextSteps: tenantPlan.actionSteps.map((s) => s.title),
        escalation: {
          route: `Petition ${tenantPlan.authorityResolution.rentCourtName}`,
          triggerCondition: "Non-compliance by landlord after statutory notice expiry",
          targetAuthority: tenantPlan.authorityResolution.rentCourtName,
        },
        availableDocumentType: "TENANT_REPRESENTATION",
        confidence: tenantPlan.confidence,
        sourceReferences: tenantPlan.sourceReferences,
        pinResolution,
        location,
      };
    }

    case "CONSUMER": {
      const consumerPlan = planConsumerAction({
        state: location.stateName,
        district: location.district,
        pinCode: location.pinCode,
        productOrService: "Consumer Goods / Service",
        sellerOrProvider: "Commercial Seller / Provider",
        issueType: "DEFECTIVE_GOODS",
        issueDescription: problemDescription,
        invoiceAvailable: true,
        warrantyAvailable: true,
        communicationsAvailable: true,
        priorComplaintMade: false,
        reliefRequested: "REFUND",
      });

      return {
        domain: "CONSUMER",
        problemUnderstood: consumerPlan.problemUnderstood,
        recommendedAction: "Serve Pre-Litigation Consumer Notice & Lodge National Consumer Helpline (NCH 1915) Grievance.",
        whyThisAction: [
          "Consumer Protection Act 2019 protects against unfair trade practices and product deficiency nationwide.",
          "NCH 1915 provides Government of India integrated dispute resolution before formal District Commission filing.",
          "Formal notice gives the seller 15 days to resolve before punitive damages and litigation costs are claimed.",
        ],
        whyNotOtherRoutes: "RTI is not applicable against private commercial corporations or online sellers.",
        authority: {
          name: consumerPlan.commissionJurisdiction.tierName,
          designation: "Consumer Disputes Redressal Commission",
          department: "Department of Consumer Affairs, Government of India",
          sourceId: "SRC-CONS-2A-CENTRAL",
          portalUrl: consumerPlan.nchDetails.portalUrl,
          verified: true,
          confidence: consumerPlan.confidence,
        },
        evidenceRequired: consumerPlan.evidenceChecklist,
        statutoryDeadline: {
          days: 45,
          basis: "Consumer Protection Act, 2019 (Dispute Mediation Window)",
          plainLanguageMeaning: "Companies are normally given 15 to 45 days to resolve complaints through NCH mediation.",
          nextAction: `File formal e-Daakhil consumer complaint before ${consumerPlan.commissionJurisdiction.tierName}.`,
        },
        nextSteps: consumerPlan.actionLadder.map((s) => s.title),
        escalation: {
          route: "e-Daakhil Online Consumer Commission Petition",
          triggerCondition: "Rejection or non-resolution via NCH within 45 days",
          targetAuthority: consumerPlan.commissionJurisdiction.tierName,
        },
        availableDocumentType: "CONSUMER_REPRESENTATION",
        confidence: consumerPlan.confidence,
        sourceReferences: ["SRC-CONS-2A-CENTRAL"],
        pinResolution,
        location,
      };
    }

    case "WORKPLACE": {
      return {
        domain: "WORKPLACE",
        problemUnderstood: `Employment dispute regarding unpaid wages or relieving records in ${location.stateName}.`,
        recommendedAction: "Submit Formal Wage Demand Notice & Labour Conciliation Grievance.",
        whyThisAction: [
          "Payment of Wages Act and Industrial Relations Code mandate timely payment of earned remuneration.",
          "Statutory representation establishes proof of demand for conciliation before Labour Commissioner.",
        ],
        whyNotOtherRoutes: "RTI cannot be used against private commercial employers for internal payroll records.",
        authority: {
          name: `Office of the Deputy Commissioner of Labour (${location.district || location.stateName}) / SAMADHAN Portal`,
          designation: "Labour Conciliation Officer",
          department: `Ministry of Labour & Employment / ${location.stateName} State Labour Department`,
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
        location,
      };
    }

    case "WELFARE": {
      return {
        domain: "WELFARE",
        problemUnderstood: `Inquiry into government welfare scheme eligibility and statutory benefit entitlement in ${location.stateName}.`,
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
        location,
      };
    }

    case "CIVIC_RTI":
    default: {
      const authName = pinResolution?.responsibleAuthority || "Coimbatore City Municipal Corporation";
      const pioTitle = pinResolution?.rtiAuthority || "Public Information Officer";
      const isRoadOrPothole = problemDescription.toLowerCase().includes("pothole") || problemDescription.toLowerCase().includes("road");

      return {
        domain: "CIVIC_RTI",
        problemUnderstood: `Civic infrastructure failure, road damage, water supply, or municipal governance records in ${location.stateName}.`,
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
        location,
      };
    }
  }
}
