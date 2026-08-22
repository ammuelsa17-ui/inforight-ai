// src/lib/tenancy/tenant-rights-resolver.ts — Deterministic State-Aware Tenancy Legal & Jurisdiction Resolver
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
  | "LANDLORD_ACCESS"
  | "PROPERTY_DAMAGE"
  | "OTHER_TENANCY";

export interface TenantResolverInput {
  state?: string;
  district?: string;
  pinCode?: string;
  city?: string;
  locality?: string;
  propertyType?: "RESIDENTIAL" | "COMMERCIAL" | "OTHER";
  agreementAvailable?: boolean;
  agreementRegistered?: boolean;
  registrationNumber?: string;
  tenancyStartDate?: string;
  monthlyRent?: number;
  securityDeposit?: number;
  issueType: TenantIssueType;
  issueDescription: string;
  moveOutDate?: string;
  handoverProof?: boolean;
  noticeReceived?: boolean;
  noticeDate?: string;
  rentPaymentProof?: boolean;
  communicationsAvailable?: boolean;
  tenantName?: string;
  tenantAddress?: string;
  landlordName?: string;
  landlordAddress?: string;
}

export interface TenantLegalResolution {
  domain: "TENANT";
  location: IndiaLocationContext;
  stateRecord: StateTenancyRecord;
  applicableLaw: string;
  legalBasis: string[];
  plainLanguageExplanation: string;
  isModelActBinding: false; // Invariant: Model Tenancy Act is NEVER binding law by default
  isStateSpecificVerified: boolean;
  authority?: {
    name: string;
    type: string;
    districtJurisdiction?: string;
    registrationPortal?: string;
    sourceIds: string[];
    confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
    lastVerified: string;
  };
  authorityConfidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  firstAction: {
    title: string;
    description: string;
    statutoryNoticeDays: number;
    channel: string;
  };
  evidenceRequired: string[];
  escalation: {
    forum: string;
    condition: string;
    timelineDays: number;
  };
  missingFacts: string[];
  sourceIds: string[];
}

/**
 * Resolves State/UT specific tenancy law and authority in strict compliance with verified official source records.
 * Model Tenancy Act is NEVER returned as binding enacted law.
 * Unverified States fail-safe to Transfer of Property Act / General Contract with VERIFICATION_REQUIRED.
 */
export function resolveTenantRights(input: TenantResolverInput): TenantLegalResolution {
  const location = resolveLocationContext({
    state: input.state,
    district: input.district,
    pinCode: input.pinCode,
    city: input.city,
    locality: input.locality,
  });

  const stateRecord = getStateTenancyRecord(location.stateCode);
  const missingFacts: string[] = [];

  // Check state and location facts
  if (!location.district) {
    missingFacts.push("Exact District / Taluk name required for territorial Rent Authority determination.");
  }
  if (stateRecord.mandatoryAgreementRegistration && !input.agreementRegistered) {
    missingFacts.push(`Tenancy agreement registration on ${stateRecord.registrationPortalUrl || "State Portal"} is required for statutory Rent Authority petitions.`);
  }
  if (input.issueType === "SECURITY_DEPOSIT" && !input.handoverProof) {
    missingFacts.push("Proof of key handover / vacant possession return is required to substantiate deposit refund.");
  }

  const isVerifiedState = stateRecord.verificationTier === "FULL" || stateRecord.verificationTier === "PARTIAL";

  // Calculate Authority Confidence
  let authorityConfidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED" = "HIGH";
  if (!isVerifiedState) {
    authorityConfidence = "VERIFICATION_REQUIRED";
  } else if (stateRecord.verificationTier === "PARTIAL" || missingFacts.length > 0) {
    authorityConfidence = "MEDIUM";
  }

  // Issue specific plain-language and statutory basis calculation
  let explanation = "";
  const legalBasis: string[] = [];

  if (stateRecord.stateCode === "TN") {
    // Tamil Nadu: TNRRRLT Act 2017
    legalBasis.push(
      "Section 11, Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act 2017)",
      "Section 18, TNRRRLT Act 2017 (Protection against arbitrary withholding of essential services and deposits)"
    );
    explanation = "Under Tamil Nadu law (TNRRRLT Act 2017), residential security deposit is capped at 3 months rent and must be refunded within 1 month (30 days) of vacant handover.";
  } else if (stateRecord.stateCode === "UP") {
    // Uttar Pradesh: UP Tenancy Act 2021
    legalBasis.push(
      "Section 11, Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021",
      "Section 19, UP Tenancy Act 2021"
    );
    explanation = "Under UP Tenancy Act 2021, residential security deposit is capped at 2 months rent and must be refunded within 30 days of handover.";
  } else if (stateRecord.stateCode === "KA") {
    // Karnataka: Karnataka Rent Act 1999
    legalBasis.push(
      "Karnataka Rent Act, 1999 (Act No. 34 of 2001)",
      "Section 18 & Section 36, Karnataka Rent Act, 1999"
    );
    explanation = "Under the Karnataka Rent Act 1999, standard rent and security deposit refund upon vacant possession are adjudicated before the Court of Small Causes.";
  } else if (stateRecord.stateCode === "MH") {
    // Maharashtra: Maharashtra Rent Control Act 1999
    legalBasis.push(
      "Maharashtra Rent Control Act, 1999 (Act No. 18 of 2000)",
      "Section 15 & Section 29, Maharashtra Rent Control Act, 1999"
    );
    explanation = "Under Maharashtra law, Leave and License agreements are regulated under Section 55 of the Rent Control Act with proceedings before the Competent Authority.";
  } else if (stateRecord.stateCode === "DL") {
    // Delhi: Delhi Rent Control Act 1958
    legalBasis.push(
      "Delhi Rent Control Act, 1958 (Act No. 59 of 1958)",
      "Section 13 & Section 45, Delhi Rent Control Act, 1958"
    );
    explanation = "Under Delhi law, premises with rent up to ₹3,500/month are governed by DRC Act 1958; above ₹3,500/month, general Transfer of Property Act principles apply.";
  } else if (stateRecord.stateCode === "KL") {
    // Kerala: Kerala Buildings Act 1965
    legalBasis.push(
      "Kerala Buildings (Lease and Rent Control) Act, 1965",
      "Section 8 & Section 13, Kerala Buildings Act 1965"
    );
    explanation = "Under Kerala Buildings Act 1965, rent disputes and essential service restorations are heard before the Munsiff-level Rent Control Court.";
  } else {
    // Unverified State / UT: Safe fallback
    legalBasis.push(
      "Transfer of Property Act, 1882 (Section 108 — Rights & Liabilities of Lessor/Lessee)",
      "Indian Contract Act, 1872 (Tenancy Agreement Terms)"
    );
    explanation = `Specific state tenancy legislation for ${location.stateName} is not yet fully indexed in our verified registry. General Transfer of Property principles apply.`;
  }

  // Evidence Checklist
  const evidenceRequired = [
    "Written Tenancy Agreement / Lease Deed",
    "Rent payment receipts / Bank account statement proving regular payments",
    "Proof of security deposit payment (bank transaction / receipt)",
    "Electricity / Water / Maintenance clearance receipts",
    "Proof of key handover / written move-out communication (WhatsApp/Email/Letter)",
  ];

  // Authority object (only when verified, undefined/null for unverified states)
  const authority = isVerifiedState
    ? {
        name: `${stateRecord.rentAuthorityTitle} (${location.district || location.stateName})`,
        type: stateRecord.legalStatus,
        districtJurisdiction: location.district ? `${location.district} District Jurisdiction` : undefined,
        registrationPortal: stateRecord.registrationPortalUrl,
        sourceIds: [stateRecord.primaryActSourceId],
        confidence: authorityConfidence,
        lastVerified: stateRecord.lastVerified,
      }
    : undefined;

  return {
    domain: "TENANT",
    location,
    stateRecord,
    applicableLaw: stateRecord.primaryActTitle,
    legalBasis,
    plainLanguageExplanation: explanation,
    isModelActBinding: false, // Strictly false
    isStateSpecificVerified: isVerifiedState,
    authority,
    authorityConfidence,
    firstAction: {
      title: `Serve Formal Legal Notice under ${stateRecord.primaryActTitle}`,
      description: `Issue written demand notice via Speed Post / RPAD, granting a 15-day resolution window before formal court filing.`,
      statutoryNoticeDays: 15,
      channel: "Speed Post / Registered Post with Acknowledgement Due (RPAD)",
    },
    evidenceRequired,
    escalation: {
      forum: isVerifiedState ? `${stateRecord.rentCourtTitle}` : "Competent Civil Court",
      condition: "Failure of landlord to comply after 15-day statutory notice expiry",
      timelineDays: 30,
    },
    missingFacts,
    sourceIds: [stateRecord.primaryActSourceId],
  };
}
