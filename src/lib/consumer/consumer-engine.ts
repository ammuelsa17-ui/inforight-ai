// src/lib/consumer/consumer-engine.ts — Pan-India Real-Time Consumer Protection Engine
import { IndiaLocationContext, resolveLocationContext } from "@/lib/location/location-context";

export type ConsumerIssueType =
  | "DEFECTIVE_GOODS"
  | "DEFICIENT_SERVICE"
  | "REFUND_REPLACEMENT_DISPUTE"
  | "OVERCHARGING"
  | "E_COMMERCE"
  | "MISLEADING_ADVERTISEMENT"
  | "UNFAIR_TRADE_PRACTICE"
  | "PRODUCT_SAFETY"
  | "WARRANTY_DISPUTE"
  | "BANKING_SERVICE"
  | "INSURANCE_SERVICE"
  | "TELECOM_SERVICE"
  | "TRAVEL_SERVICE"
  | "EDUCATION_SERVICE"
  | "HEALTHCARE_SERVICE"
  | "OTHER_CONSUMER";

export type ConsumerReliefRequested =
  | "REFUND"
  | "REPLACEMENT"
  | "REPAIR"
  | "COMPENSATION"
  | "SERVICE_COMPLETION"
  | "OTHER";

export type ConsumerCommissionTier =
  | "DISTRICT_COMMISSION"
  | "STATE_COMMISSION"
  | "NATIONAL_COMMISSION"
  | "VERIFICATION_REQUIRED";

export interface ConsumerInterviewData {
  state?: string;
  district?: string;
  pinCode?: string;
  city?: string;
  productOrService: string;
  sellerOrProvider: string;
  sellerLocation?: string;
  purchaseDate?: string;
  amountPaid?: number;
  paymentMethod?: string;
  issueType: ConsumerIssueType;
  issueDescription: string;
  invoiceAvailable: boolean;
  warrantyAvailable: boolean;
  communicationsAvailable: boolean;
  priorComplaintMade: boolean;
  priorComplaintDate?: string;
  responseReceived?: string;
  reliefRequested: ConsumerReliefRequested;
  complainantName?: string;
  complainantAddress?: string;
}

export interface ConsumerActionPlan {
  domain: "CONSUMER";
  problemUnderstood: string;
  statutoryBasis: string[];
  actionLadder: Array<{
    stepNumber: number;
    title: string;
    description: string;
    authorityOrChannel: string;
    timelineDays: number;
  }>;
  nchDetails: {
    portalName: string;
    portalUrl: string;
    helplineNumber: string;
    smsNumber: string;
    appAvailable: boolean;
  };
  commissionJurisdiction: {
    tier: ConsumerCommissionTier;
    tierName: string;
    pecuniaryLimitBasis: string;
    territorialJurisdiction: string;
    filingPortalName: string;
    filingPortalUrl: string;
    confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
    missingFacts?: string[];
  };
  evidenceChecklist: string[];
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  sourceReferences: string[];
  location: IndiaLocationContext;
}

/**
 * Calculates Consumer Commission Pecuniary Jurisdiction under Consumer Protection Act, 2019
 * (as notified in 2021 Rules: District Commission <= ₹50 Lakhs; State Commission ₹50 Lakhs to ₹2 Crores; National Commission > ₹2 Crores)
 */
export function calculateConsumerJurisdiction(
  amountPaid: number | undefined,
  location: IndiaLocationContext
): ConsumerActionPlan["commissionJurisdiction"] {
  const missing: string[] = [];
  if (!location.district) {
    missing.push("Exact District name required for territorial filing registry.");
  }
  if (amountPaid === undefined || isNaN(amountPaid)) {
    missing.push("Transaction / Claim amount required for pecuniary jurisdiction determination.");
    return {
      tier: "VERIFICATION_REQUIRED",
      tierName: "District Consumer Disputes Redressal Commission (DCDRC)",
      pecuniaryLimitBasis: "Pecuniary jurisdiction requires consideration amount (CPA 2019)",
      territorialJurisdiction: location.district ? `${location.district}, ${location.stateName}` : `${location.stateName}`,
      filingPortalName: "e-Daakhil / e-Jagriti Online Consumer Filing Portal",
      filingPortalUrl: "https://edaakhil.nic.in",
      confidence: "MEDIUM",
      missingFacts: missing,
    };
  }

  let tier: ConsumerCommissionTier = "DISTRICT_COMMISSION";
  let tierName = `District Consumer Disputes Redressal Commission (DCDRC), ${location.district || location.stateName}`;
  let limitBasis = "Value of goods/services paid does not exceed ₹50,00,000 (Section 34, CPA 2019 / 2021 Rules).";

  if (amountPaid > 20000000) {
    tier = "NATIONAL_COMMISSION";
    tierName = "National Consumer Disputes Redressal Commission (NCDRC), New Delhi";
    limitBasis = "Value of goods/services paid exceeds ₹2,00,00,000 (Section 58, CPA 2019 / 2021 Rules).";
  } else if (amountPaid > 5000000) {
    tier = "STATE_COMMISSION";
    tierName = `State Consumer Disputes Redressal Commission (SCDRC), ${location.stateName}`;
    limitBasis = "Value of goods/services paid is between ₹50,00,000 and ₹2,00,00,000 (Section 47, CPA 2019 / 2021 Rules).";
  }

  return {
    tier,
    tierName,
    pecuniaryLimitBasis: limitBasis,
    territorialJurisdiction: location.district
      ? `${location.district} District Jurisdiction (${location.stateName})`
      : `${location.stateName} State Jurisdiction`,
    filingPortalName: "e-Daakhil / e-Jagriti (National Consumer Portal)",
    filingPortalUrl: "https://edaakhil.nic.in",
    confidence: location.district ? "HIGH" : "MEDIUM",
    missingFacts: missing.length > 0 ? missing : undefined,
  };
}

/**
 * Plans complete nationwide consumer action roadmap
 */
export function planConsumerAction(interview: ConsumerInterviewData): ConsumerActionPlan {
  const loc = resolveLocationContext({
    state: interview.state,
    district: interview.district,
    pinCode: interview.pinCode,
    city: interview.city,
  });

  const jurisdiction = calculateConsumerJurisdiction(interview.amountPaid, loc);

  const actionLadder = [
    {
      stepNumber: 1,
      title: "Direct Pre-Litigation Notice to Seller / Service Provider",
      description: "Issue a formal written notice with transaction details and evidence, granting a 15-day statutory resolution period.",
      authorityOrChannel: "Grievance Officer / Nodal Officer of Seller or Company",
      timelineDays: 15,
    },
    {
      stepNumber: 2,
      title: "Lodge Grievance on National Consumer Helpline (NCH 1915)",
      description: "Register ticket on the Government of India integrated grievance portal for pre-litigation mediation and docket tracking.",
      authorityOrChannel: "National Consumer Helpline (NCH) / Department of Consumer Affairs",
      timelineDays: 45,
    },
    {
      stepNumber: 3,
      title: "Sector Regulator / Ombudsman Escalation (if applicable)",
      description: "For specialized banking, insurance, or telecom disputes, escalate to the RBI Ombudsman, IRDAI Bima Bharosa, or DoT portal.",
      authorityOrChannel: "Statutory Sectoral Ombudsman",
      timelineDays: 30,
    },
    {
      stepNumber: 4,
      title: "Formal Consumer Commission Petition via e-Daakhil",
      description: `If unresolved after pre-litigation steps, file a formal consumer complaint before ${jurisdiction.tierName}.`,
      authorityOrChannel: jurisdiction.tierName,
      timelineDays: 90,
    },
  ];

  const evidenceChecklist = [
    "Tax Invoice / Purchase Order / Payment Receipt proving consideration paid",
    "Product warranty card / Service Level Agreement (if applicable)",
    "Photographs / Video evidence / Diagnostic report showing defect or service deficiency",
    "Copies of written customer care tickets, emails, and WhatsApp correspondence",
    "Proof of dispatch / delivery tracking / return attempt acknowledgement",
  ];

  return {
    domain: "CONSUMER",
    problemUnderstood: `Consumer dispute regarding ${interview.productOrService} with ${interview.sellerOrProvider} in ${loc.stateName}.`,
    statutoryBasis: [
      "Consumer Protection Act, 2019 (Act No. 35 of 2019)",
      "Consumer Protection (Consumer Commission Procedure) Regulations",
      "Consumer Protection (E-Commerce) Rules, 2020",
    ],
    actionLadder,
    nchDetails: {
      portalName: "National Consumer Helpline (NCH) Portal",
      portalUrl: "https://consumerhelpline.gov.in",
      helplineNumber: "1915 (Toll-Free National Helpline)",
      smsNumber: "8800001915",
      appAvailable: true,
    },
    commissionJurisdiction: jurisdiction,
    evidenceChecklist,
    confidence: jurisdiction.confidence,
    sourceReferences: ["SRC-CONS-2A-CENTRAL"],
    location: loc,
  };
}
