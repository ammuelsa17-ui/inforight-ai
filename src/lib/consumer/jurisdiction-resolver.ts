// src/lib/consumer/jurisdiction-resolver.ts — Deterministic Consumer Commission Pecuniary & Territorial Jurisdiction Resolver
import { IndiaLocationContext } from "@/lib/location/location-context";

export type ConsumerCommissionLevel =
  | "DISTRICT_COMMISSION"
  | "STATE_COMMISSION"
  | "NATIONAL_COMMISSION"
  | "VERIFICATION_REQUIRED";

export interface ConsumerJurisdictionInput {
  considerationAmount?: number;
  state?: string;
  district?: string;
  complainantLocation?: string;
  oppositePartyLocation?: string;
  causeOfActionLocation?: string;
  locationContext?: IndiaLocationContext;
}

export interface ConsumerJurisdictionResult {
  level: ConsumerCommissionLevel;
  levelName: string;
  territorialBasis: string;
  ruleApplied: string;
  sourceIds: string[];
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  missingFacts: string[];
  officialPortalUrl: string;
  officialPortalName: string;
}

/**
 * Resolves Consumer Commission Pecuniary & Territorial Jurisdiction under the Consumer Protection Act, 2019
 * (Notified Jurisdiction Rules: District Commission <= ₹50 Lakhs; State Commission ₹50 Lakhs to ₹2 Crores; National Commission > ₹2 Crores)
 * Section 34 / 35 / 47 / 58 of CPA 2019.
 */
export function resolveConsumerCommissionJurisdiction(
  input: ConsumerJurisdictionInput
): ConsumerJurisdictionResult {
  const missing: string[] = [];
  const state = input.state || input.locationContext?.stateName || "Tamil Nadu";
  const district = input.district || input.locationContext?.district;

  if (!district) {
    missing.push("Exact District name required for territorial filing before District Commission (Section 34, CPA 2019).");
  }

  const amount = input.considerationAmount;

  if (amount === undefined || isNaN(amount) || amount === null) {
    missing.push("Consideration amount paid required to calculate statutory pecuniary jurisdiction tier.");
    return {
      level: "VERIFICATION_REQUIRED",
      levelName: district ? `District Consumer Disputes Redressal Commission (DCDRC), ${district}` : "District Consumer Commission",
      territorialBasis: district ? `${district} District Jurisdiction (${state})` : `${state} State Jurisdiction`,
      ruleApplied: "Section 34 / 35, Consumer Protection Act, 2019 (Pecuniary Threshold Verification Pending)",
      sourceIds: ["SRC-CONS-2A-CENTRAL", "SRC-CONS-EDAAKHIL"],
      confidence: "MEDIUM",
      missingFacts: missing,
      officialPortalUrl: "https://edaakhil.nic.in",
      officialPortalName: "e-Daakhil / e-Jagriti Online Consumer Filing System",
    };
  }

  // Pecuniary thresholds under CPA 2019 (2021 notified rules)
  if (amount > 20000000) {
    // > ₹2 Crore -> National Commission (NCDRC)
    return {
      level: "NATIONAL_COMMISSION",
      levelName: "National Consumer Disputes Redressal Commission (NCDRC), New Delhi",
      territorialBasis: "Pan-India Jurisdiction (Upendra Complex, New Delhi)",
      ruleApplied: "Section 58(1)(a)(i), Consumer Protection Act, 2019 (Consideration paid exceeds ₹2,00,00,000)",
      sourceIds: ["SRC-CONS-2A-CENTRAL", "SRC-CONS-EDAAKHIL"],
      confidence: "HIGH",
      missingFacts: missing,
      officialPortalUrl: "https://edaakhil.nic.in",
      officialPortalName: "e-Daakhil / e-Jagriti (NCDRC Filing)",
    };
  }

  if (amount > 5000000) {
    // ₹50 Lakh to ₹2 Crore -> State Commission (SCDRC)
    return {
      level: "STATE_COMMISSION",
      levelName: `State Consumer Disputes Redressal Commission (SCDRC), ${state}`,
      territorialBasis: `${state} State Territorial Jurisdiction (Section 47, CPA 2019)`,
      ruleApplied: "Section 47(1)(a)(i), Consumer Protection Act, 2019 (Consideration paid between ₹50 Lakhs and ₹2 Crores)",
      sourceIds: ["SRC-CONS-2A-CENTRAL", "SRC-CONS-EDAAKHIL"],
      confidence: "HIGH",
      missingFacts: missing,
      officialPortalUrl: "https://edaakhil.nic.in",
      officialPortalName: "e-Daakhil State Commission Portal",
    };
  }

  // <= ₹50 Lakh -> District Commission (DCDRC)
  return {
    level: "DISTRICT_COMMISSION",
    levelName: district
      ? `District Consumer Disputes Redressal Commission (DCDRC), ${district}`
      : `District Consumer Disputes Redressal Commission (DCDRC), ${state}`,
    territorialBasis: district
      ? `${district} District Jurisdiction (${state}) under Section 34(2)(d) CPA 2019 (Complainant Residence / Place of Business)`
      : `${state} District Jurisdiction`,
    ruleApplied: "Section 34(1), Consumer Protection Act, 2019 (Consideration paid does not exceed ₹50,00,000)",
    sourceIds: ["SRC-CONS-2A-CENTRAL", "SRC-CONS-EDAAKHIL"],
    confidence: district ? "HIGH" : "MEDIUM",
    missingFacts: missing,
    officialPortalUrl: "https://edaakhil.nic.in",
    officialPortalName: "e-Daakhil District Commission Portal",
  };
}
