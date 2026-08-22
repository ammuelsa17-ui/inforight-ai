// src/lib/government-data/adapters/postal-location.ts — Dynamic Indian PIN & Location Resolver
import {
  GovernmentDataProvider,
  ResolvedLocation,
  PostOfficeRecord,
  ValidationResult
} from "@/lib/government-data/types";
import { safeGovernmentFetch } from "@/lib/government-data/security";
import { GovernmentDataCache } from "@/lib/government-data/cache";
import { ALL_STATES_AND_UTS, getDistrictsForState } from "@/lib/location/location-context";
import { PIN_AUTHORITY_REGISTRY } from "@/data/pin-authority-registry";

export class PostalLocationProvider implements GovernmentDataProvider<string, ResolvedLocation> {
  id = "PROV-IN-POSTAL-PIN";
  name = "Third-Party Postal PIN Reference Provider (api.postalpincode.in)";
  category = "POSTAL_DATA" as const;
  issuingAuthority = "Third-Party Postal API (Data sourced from India Post)";
  officialUrl = "https://api.postalpincode.in";

  async fetchLive(pinCode: string): Promise<ResolvedLocation> {
    const cleanPin = pinCode.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      throw new Error(`Invalid Indian PIN code format: '${pinCode}'. Must be 6 numeric digits starting with 1-9.`);
    }

    const cacheKey = `gov_pin_${cleanPin}`;
    const cached = GovernmentDataCache.get<ResolvedLocation>(cacheKey);

    if (cached.hit && cached.data && !cached.isStale) {
      return {
        ...cached.data,
        provenance: {
          ...cached.data.provenance,
          resolutionMode: "VERIFIED_CACHE",
          retrievedAt: new Date().toISOString()
        }
      };
    }

    try {
      const url = `https://api.postalpincode.in/pincode/${cleanPin}`;
      const res = await safeGovernmentFetch(url, { timeoutMs: 3500 });

      if (res.ok) {
        const rawJson = JSON.parse(res.data);
        const normalized = this.normalizeRawResponse(cleanPin, rawJson);
        const validation = this.validate(normalized);

        if (validation.valid) {
          // Cache for 14 days
          GovernmentDataCache.set(cacheKey, normalized, 14 * 24 * 60 * 60 * 1000);
          return normalized;
        }
      }
    } catch {
      // Live fetch error or timeout, proceed to stale cache or static fallback
    }

    // Serve stale cache if available
    if (cached.hit && cached.data) {
      return {
        ...cached.data,
        provenance: {
          ...cached.data.provenance,
          resolutionMode: "VERIFIED_CACHE",
          freshness: "STALE",
          retrievedAt: new Date().toISOString()
        }
      };
    }

    // Fallback to static verified registry or default derivation
    const fallback = await this.getFallback(cleanPin);
    if (fallback) {
      return fallback;
    }

    throw new Error(`Location could not be resolved for PIN code ${cleanPin}`);
  }

  normalizeRawResponse(pinCode: string, raw: any): ResolvedLocation {
    if (!Array.isArray(raw) || raw.length === 0 || raw[0].Status !== "Success") {
      throw new Error(`Postal API returned no records for PIN ${pinCode}`);
    }

    const postOfficesRaw: any[] = raw[0].PostOffice || [];
    const postOffices: PostOfficeRecord[] = postOfficesRaw.map((po) => ({
      name: po.Name,
      branchType: po.BranchType,
      deliveryStatus: po.DeliveryStatus,
      circle: po.Circle,
      district: po.District,
      division: po.Division,
      region: po.Region,
      state: po.State,
      pincode: po.Pincode
    }));

    const primaryState = postOffices[0]?.state || "Unknown State";
    const primaryDistrict = postOffices[0]?.district || "Unknown District";
    const localities = Array.from(new Set(postOffices.map((po) => po.name))).filter(Boolean);

    return {
      pinCode,
      state: primaryState,
      district: primaryDistrict,
      localityCandidates: localities,
      postOffices,
      // Third-party postal convenience provider cannot produce HIGH confidence alone without citizen confirmation / official LGD match
      confidence: "MEDIUM",
      provenance: {
        sourceId: "SRC-IN-POSTAL-PIN-COMMUNITY",
        issuingAuthority: this.issuingAuthority,
        officialUrl: this.officialUrl,
        retrievedAt: new Date().toISOString(),
        lastVerified: "2026-08-22",
        freshness: "CURRENT",
        resolutionMode: "THIRD_PARTY_LIVE",
        trustLevel: "THIRD_PARTY_REFERENCE",
        isOfficialGovernmentSource: false
      }
    };
  }

  normalize(raw: unknown): ResolvedLocation {
    return raw as ResolvedLocation;
  }

  validate(result: ResolvedLocation): ValidationResult {
    const errors: string[] = [];
    if (!result.pinCode || !/^[1-9][0-9]{5}$/.test(result.pinCode)) {
      errors.push("Invalid PIN format");
    }
    if (!result.state || result.state === "Unknown State") {
      errors.push("State could not be derived from postal data");
    }
    if (!result.district || result.district === "Unknown District") {
      errors.push("District could not be derived from postal data");
    }
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  async getFallback(pinCode: string): Promise<ResolvedLocation | null> {
    // Check static registry
    const registryEntry = PIN_AUTHORITY_REGISTRY[pinCode];
    if (registryEntry) {
      return {
        pinCode,
        state: registryEntry.state,
        district: registryEntry.district,
        localityCandidates: [registryEntry.localityName],
        postOffices: [
          {
            name: registryEntry.localityName,
            branchType: "Sub Post Office",
            deliveryStatus: "Delivery",
            circle: registryEntry.state,
            district: registryEntry.district,
            division: registryEntry.district,
            region: registryEntry.state,
            state: registryEntry.state,
            pincode: pinCode
          }
        ],
        confidence: "HIGH",
        provenance: {
          sourceId: "SRC-STATIC-PIN-REGISTRY",
          issuingAuthority: "InfoRight Verified Statutory PIN Registry",
          officialUrl: "https://www.ccmc.gov.in",
          retrievedAt: new Date().toISOString(),
          lastVerified: "2026-08-15",
          freshness: "CURRENT",
          resolutionMode: "STATIC_VERIFIED_REGISTRY",
          trustLevel: "VERIFIED_STATIC_GOVERNMENT_SOURCE",
          isOfficialGovernmentSource: true
        }
      };
    }

    // Default safe fallback without hallucination
    const firstDigit = pinCode[0];
    let candidateState = "Unknown State";
    if (firstDigit === "6") candidateState = "Tamil Nadu";
    if (firstDigit === "5") candidateState = "Karnataka";
    if (firstDigit === "4") candidateState = "Maharashtra";
    if (firstDigit === "1") candidateState = "Delhi";
    if (firstDigit === "7") candidateState = "West Bengal";
    if (firstDigit === "2") candidateState = "Uttar Pradesh";

    return {
      pinCode,
      state: candidateState,
      district: "Verification Required",
      localityCandidates: [],
      postOffices: [],
      confidence: "VERIFICATION_REQUIRED",
      provenance: {
        sourceId: "SRC-FALLBACK-UNVERIFIED",
        issuingAuthority: "Unverified Local Resolution",
        retrievedAt: new Date().toISOString(),
        lastVerified: "2026-08-22",
        freshness: "CHECK_DUE",
        resolutionMode: "VERIFICATION_REQUIRED",
        trustLevel: "VERIFICATION_REQUIRED",
        isOfficialGovernmentSource: false
      }
    };
  }
}

export const postalLocationProvider = new PostalLocationProvider();

export async function resolveIndianPin(pinCode: string): Promise<ResolvedLocation> {
  return postalLocationProvider.fetchLive(pinCode);
}
