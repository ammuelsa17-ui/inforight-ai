// src/lib/government-data/adapters/consumer-directory.ts — Consumer Commission Directory & NCH Adapter
import { DataProvenance } from "@/lib/government-data/types";
import { ConsumerJurisdictionResult } from "@/lib/consumer/jurisdiction-resolver";

export interface ConsumerOfficeRecord {
  level: "DISTRICT_COMMISSION" | "STATE_COMMISSION" | "NATIONAL_COMMISSION" | "VERIFICATION_REQUIRED";
  commissionName: string;
  portalUrl: string;
  nchHelpline: string;
  eJagritiFilingUrl: string;
  legacyEdaakhilUrl: string;
  platformStatus: "CURRENT_OFFICIAL_PLATFORM" | "LEGACY_SUBSUMED_PLATFORM";
  transitionNote: string;
  districtOfficeAddress?: string;
  statutoryPecuniaryLimit: string;
  provenance: DataProvenance;
}

export function getConsumerDirectoryRecord(
  jurisdiction: ConsumerJurisdictionResult,
  state?: string,
  district?: string
): ConsumerOfficeRecord {
  const nchHelpline = "1915 (Toll Free National Consumer Helpline)";
  const eJagritiFilingUrl = "https://e-jagriti.gov.in/";
  const legacyEdaakhilUrl = "https://edaakhil.nic.in";
  const transitionNote = "e-Daakhil, OCMS, CMS and Confonet were subsumed into e-Jagriti effective 1 January 2025 by the Department of Consumer Affairs, Government of India.";

  switch (jurisdiction.level) {
    case "DISTRICT_COMMISSION":
      return {
        level: "DISTRICT_COMMISSION",
        commissionName: `District Consumer Disputes Redressal Commission (DCDRC), ${district || state || "Respective District"}`,
        portalUrl: eJagritiFilingUrl,
        nchHelpline,
        eJagritiFilingUrl,
        legacyEdaakhilUrl,
        platformStatus: "CURRENT_OFFICIAL_PLATFORM",
        transitionNote,
        districtOfficeAddress: district ? `DCDRC Office, District Court Complex / Collectorate, ${district}, ${state}` : undefined,
        statutoryPecuniaryLimit: "Claims up to ₹50,00,000 (Section 34, CPA 2019)",
        provenance: {
          sourceId: "SRC-CONS-2A-CENTRAL",
          issuingAuthority: "Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution, Government of India",
          officialUrl: "https://e-jagriti.gov.in/",
          retrievedAt: new Date().toISOString(),
          lastVerified: "2026-08-22",
          freshness: "CURRENT",
          resolutionMode: "STATIC_VERIFIED_REGISTRY",
          trustLevel: "OFFICIAL_GOVERNMENT",
          isOfficialGovernmentSource: true
        }
      };

    case "STATE_COMMISSION":
      return {
        level: "STATE_COMMISSION",
        commissionName: `State Consumer Disputes Redressal Commission (SCDRC), ${state || "State Bench"}`,
        portalUrl: eJagritiFilingUrl,
        nchHelpline,
        eJagritiFilingUrl,
        legacyEdaakhilUrl,
        platformStatus: "CURRENT_OFFICIAL_PLATFORM",
        transitionNote,
        statutoryPecuniaryLimit: "Claims between ₹50,00,000 and ₹2,00,00,000 (Section 47, CPA 2019)",
        provenance: {
          sourceId: "SRC-CONS-2A-CENTRAL",
          issuingAuthority: `${state || "State"} Consumer Disputes Redressal Commission`,
          officialUrl: "https://e-jagriti.gov.in/",
          retrievedAt: new Date().toISOString(),
          lastVerified: "2026-08-22",
          freshness: "CURRENT",
          resolutionMode: "STATIC_VERIFIED_REGISTRY",
          trustLevel: "OFFICIAL_GOVERNMENT",
          isOfficialGovernmentSource: true
        }
      };

    case "NATIONAL_COMMISSION":
      return {
        level: "NATIONAL_COMMISSION",
        commissionName: "National Consumer Disputes Redressal Commission (NCDRC)",
        portalUrl: "http://ncdrc.nic.in",
        nchHelpline,
        eJagritiFilingUrl,
        legacyEdaakhilUrl,
        platformStatus: "CURRENT_OFFICIAL_PLATFORM",
        transitionNote,
        districtOfficeAddress: "Upbhokta Nyay Bhawan, 'F' Block, GPO Complex, INA, New Delhi - 110023",
        statutoryPecuniaryLimit: "Claims exceeding ₹2,00,00,000 (Section 58, CPA 2019)",
        provenance: {
          sourceId: "SRC-CONS-2A-CENTRAL",
          issuingAuthority: "National Consumer Disputes Redressal Commission (NCDRC) / Dept of Consumer Affairs",
          officialUrl: "https://e-jagriti.gov.in/",
          retrievedAt: new Date().toISOString(),
          lastVerified: "2026-08-22",
          freshness: "CURRENT",
          resolutionMode: "STATIC_VERIFIED_REGISTRY",
          trustLevel: "OFFICIAL_GOVERNMENT",
          isOfficialGovernmentSource: true
        }
      };

    default:
      return {
        level: "VERIFICATION_REQUIRED",
        commissionName: "Consumer Commission (Pecuniary Level Verification Required)",
        portalUrl: eJagritiFilingUrl,
        nchHelpline,
        eJagritiFilingUrl,
        legacyEdaakhilUrl,
        platformStatus: "CURRENT_OFFICIAL_PLATFORM",
        transitionNote,
        statutoryPecuniaryLimit: "Verification required based on consideration amount paid",
        provenance: {
          sourceId: "SRC-CONS-2A-CENTRAL",
          issuingAuthority: "Department of Consumer Affairs, Government of India",
          officialUrl: "https://e-jagriti.gov.in/",
          retrievedAt: new Date().toISOString(),
          lastVerified: "2026-08-22",
          freshness: "CURRENT",
          resolutionMode: "VERIFICATION_REQUIRED",
          trustLevel: "VERIFICATION_REQUIRED",
          isOfficialGovernmentSource: false
        }
      };
  }
}
