// src/lib/tenancy/tenancy-engine.ts — Pan-India State-Aware Real-Time Tenancy Rights Engine
import { IndiaLocationContext, resolveLocationContext } from "@/lib/location/location-context";
import { getStateTenancyRecord, StateTenancyRecord } from "@/data/tenancy/state-tenancy-registry";

export type TenantIssueType =
  | "SECURITY_DEPOSIT"
  | "EVICTION"
  | "RENT_INCREASE"
  | "RENT_RECEIPT"
  | "AGREEMENT"
  | "MAINTENANCE"
  | "ESSENTIAL_SERVICES"
  | "LOCKOUT"
  | "PROPERTY_DAMAGE"
  | "TENANT_HARASSMENT"
  | "LANDLORD_ACCESS"
  | "OTHER_TENANCY";

export interface TenantInterviewData {
  state?: string;
  district?: string;
  pinCode?: string;
  city?: string;
  propertyType: "RESIDENTIAL" | "COMMERCIAL" | "OTHER";
  agreementAvailable: boolean;
  agreementRegistered: boolean;
  agreementRegistrationNumber?: string;
  monthlyRent?: number;
  securityDepositPaid?: number;
  issueType: TenantIssueType;
  issueDescription: string;
  noticeReceived: boolean;
  noticeDate?: string;
  moveOutDate?: string;
  handoverProofAvailable: boolean;
  communicationsAvailable: boolean;
  tenantName?: string;
  tenantAddress?: string;
  landlordName?: string;
  landlordAddress?: string;
}

export interface TenantActionPlan {
  domain: "TENANT";
  stateRecord: StateTenancyRecord;
  problemUnderstood: string;
  applicableLaw: {
    actTitle: string;
    sourceId: string;
    sourceUrl?: string;
    isModelActDisclaimer: boolean;
    isStateSpecific: boolean;
  };
  authorityResolution: {
    rentAuthorityName: string;
    rentCourtName: string;
    appellateName: string;
    registrationPortal?: string;
    confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
    jurisdictionNote: string;
    missingJurisdictionFacts?: string[];
  };
  statutoryRule: {
    summary: string;
    depositRefundWindowDays?: number;
    statutorySection?: string;
    essentialServicesProtected: boolean;
  };
  evidenceChecklist: string[];
  actionSteps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    authorityOrChannel: string;
    timelineDays: number;
  }>;
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  sourceReferences: string[];
  location: IndiaLocationContext;
}

export function planTenantAction(interview: TenantInterviewData): TenantActionPlan {
  const loc = resolveLocationContext({
    state: interview.state,
    district: interview.district,
    pinCode: interview.pinCode,
    city: interview.city,
  });

  const stateRecord = getStateTenancyRecord(loc.stateCode);

  const missingFacts: string[] = [];
  if (!interview.agreementRegistered && stateRecord.mandatoryAgreementRegistration) {
    missingFacts.push(`Tenancy agreement registration on ${stateRecord.registrationPortalUrl || "State Tenancy Portal"} is required for formal Rent Authority proceedings.`);
  }
  if (!interview.handoverProofAvailable && interview.issueType === "SECURITY_DEPOSIT") {
    missingFacts.push("Proof of key handover / vacant possession return is required to establish deposit refund claim.");
  }
  if (!loc.district) {
    missingFacts.push("District / Taluk jurisdiction required to identify exact territorial Rent Authority bench.");
  }

  // Calculate Authority Confidence
  let authorityConfidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED" = "HIGH";
  if (stateRecord.verificationTier === "VERIFICATION_REQUIRED") {
    authorityConfidence = "VERIFICATION_REQUIRED";
  } else if (stateRecord.verificationTier === "PARTIAL" || missingFacts.length > 0) {
    authorityConfidence = "MEDIUM";
  }

  // Determine Statutory Rule per Issue
  let statutorySummary = "Tenancy rights are governed under the applicable State Rent Control / Tenancy legislation.";
  let statutorySection = stateRecord.depositRefundSection;

  if (interview.issueType === "SECURITY_DEPOSIT") {
    if (stateRecord.stateCode === "TN") {
      statutorySummary = `Under Section 11 of TNRRRLT Act 2017, residential deposit is capped at 3 months rent and must be refunded within 1 month (30 days) after vacating.`;
      statutorySection = "Section 11, TNRRRLT Act 2017";
    } else if (stateRecord.stateCode === "UP") {
      statutorySummary = `Under Section 11 of UP Tenancy Act 2021, residential deposit is capped at 2 months and must be refunded within 30 days of handover.`;
      statutorySection = "Section 11, UP Tenancy Act 2021";
    } else {
      statutorySummary = `Under ${stateRecord.primaryActTitle}, landlord must refund security deposit upon vacant handover after legitimate adjustment of utility/arrear dues.`;
    }
  } else if (interview.issueType === "ESSENTIAL_SERVICES" || interview.issueType === "LOCKOUT") {
    statutorySummary = `Landlords are strictly prohibited from cutting off or withholding essential services (water, electricity, access) under ${stateRecord.essentialServicesProtectionSection || "State Rent Law"}.`;
    statutorySection = stateRecord.essentialServicesProtectionSection;
  } else if (interview.issueType === "EVICTION") {
    statutorySummary = `Eviction can only be sought under specific statutory grounds (arrears, subletting, personal requirement) through due process before the ${stateRecord.rentCourtTitle}.`;
    statutorySection = stateRecord.evictionGroundsSection;
  }

  const actionSteps = [
    {
      stepNumber: 1,
      title: "Serve Formal Legal Demand Representation",
      description: `Deliver written notice citing ${statutorySection || stateRecord.primaryActTitle} via Speed Post / RPAD, granting a 15-day resolution period.`,
      authorityOrChannel: "Landlord / Property Owner",
      timelineDays: 15,
    },
    {
      stepNumber: 2,
      title: "Collect and Organize Tenancy Evidence Schedule",
      description: "Assemble tenancy agreement, rent receipts, bank transfer statements, and key return acknowledgement.",
      authorityOrChannel: "InfoRight Evidence Organizer",
      timelineDays: 5,
    },
    {
      stepNumber: 3,
      title: `Petition ${stateRecord.rentAuthorityTitle}`,
      description: `If unresolved after 15 days, file formal application before ${stateRecord.rentAuthorityTitle} in ${loc.district || loc.stateName}.`,
      authorityOrChannel: stateRecord.rentAuthorityTitle,
      timelineDays: 30,
    },
    {
      stepNumber: 4,
      title: `Escalate to ${stateRecord.rentCourtTitle}`,
      description: `Appeal or seek enforcement before the ${stateRecord.rentCourtTitle} if landlord refuses statutory compliance.`,
      authorityOrChannel: stateRecord.rentCourtTitle,
      timelineDays: 60,
    },
  ];

  const evidenceChecklist = [
    "Written Tenancy Agreement / Lease Deed",
    "Rent payment receipts / Bank account statement proving regular payment",
    "Proof of security deposit payment (bank transaction / receipt)",
    "Electricity / Water / Maintenance clearance receipts",
    "Proof of key handover / written move-out communication (WhatsApp/Email/Letter)",
  ];

  return {
    domain: "TENANT",
    stateRecord,
    problemUnderstood: `Tenancy dispute (${interview.issueType.replace(/_/g, " ")}) in ${loc.city || loc.district || loc.stateName}, ${loc.stateName}.`,
    applicableLaw: {
      actTitle: stateRecord.primaryActTitle,
      sourceId: stateRecord.primaryActSourceId,
      sourceUrl: stateRecord.sourceUrl,
      isModelActDisclaimer: false,
      isStateSpecific: stateRecord.legalStatus === "VERIFIED_STATE_ACT" || stateRecord.legalStatus === "VERIFIED_RENT_CONTROL_LAW",
    },
    authorityResolution: {
      rentAuthorityName: `${stateRecord.rentAuthorityTitle} (${loc.district || loc.stateName})`,
      rentCourtName: `${stateRecord.rentCourtTitle} (${loc.district || loc.stateName})`,
      appellateName: stateRecord.appellateAuthorityTitle,
      registrationPortal: stateRecord.registrationPortalUrl,
      confidence: authorityConfidence,
      jurisdictionNote: stateRecord.notes,
      missingJurisdictionFacts: missingFacts.length > 0 ? missingFacts : undefined,
    },
    statutoryRule: {
      summary: statutorySummary,
      depositRefundWindowDays: stateRecord.statutoryDepositRefundWindowDays || 30,
      statutorySection,
      essentialServicesProtected: Boolean(stateRecord.essentialServicesProtectionSection),
    },
    evidenceChecklist,
    actionSteps,
    confidence: authorityConfidence,
    sourceReferences: [stateRecord.primaryActSourceId],
    location: loc,
  };
}
