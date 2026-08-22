// src/lib/location/all-india-location-resolver.ts — Runtime All-India Location & Administrative Hierarchy Resolver
import { safeGovernmentFetch } from "@/lib/government-data/security";
import { LocationCacheManager } from "@/lib/location/location-cache";
import { ALL_STATES_AND_UTS, StateUtMetadata } from "@/lib/location/location-context";
import { LocationSource } from "@/types/rectification";

export type AdministrativeConfidence = "VERIFIED" | "SUGGESTED" | "USER_CONFIRMED" | "VERIFICATION_REQUIRED";

export type LocalBodyType =
  | "GRAM_PANCHAYAT"
  | "PANCHAYAT_SAMITI"
  | "ZILLA_PANCHAYAT"
  | "TOWN_PANCHAYAT"
  | "MUNICIPALITY"
  | "MUNICIPAL_COUNCIL"
  | "MUNICIPAL_CORPORATION"
  | "CANTONMENT"
  | "OTHER";

export interface AdministrativeLevel {
  name: string | null;
  code?: string | null;
  type?: string;
  source: "VERIFIED_DIRECTORY" | "THIRD_PARTY_POSTAL" | "GEOCODER_MAP" | "CITIZEN_OVERRIDE" | "NONE";
  status: AdministrativeConfidence;
  verified: boolean;
}

export interface PostOfficeDetail {
  name: string;
  branchType: string;
  deliveryStatus: string;
  circle: string;
  district: string;
  division: string;
  region: string;
  state: string;
  pincode: string;
}

export interface NormalizedLocationResolution {
  pinCode: string | null;
  valid: boolean;
  postal: {
    state: string | null;
    district: string | null;
    localities: string[];
    postOffices: PostOfficeDetail[];
    hasMultipleLocalities: boolean;
    selectedLocality?: string;
  };
  map: {
    latitude: number | null;
    longitude: number | null;
    precision: "EXACT_POINT" | "POSTAL_AREA" | "DISTRICT_CENTROID" | "UNRESOLVED";
    source: LocationSource;
  };
  administrative: {
    state: AdministrativeLevel;
    district: AdministrativeLevel;
    subDistrict: AdministrativeLevel & { label: "Taluk" | "Tehsil" | "Mandal" | "Sub-District" };
    block: AdministrativeLevel;
    localBody: AdministrativeLevel & { localBodyType?: LocalBodyType };
    village: AdministrativeLevel;
  };
  sourceStatus: {
    postal: string;
    administrative: string;
    geocoding: string;
  };
  confidence: AdministrativeConfidence;
  conflictStatus: "NONE" | "LOCATION_CONFIRMATION_REQUIRED";
  conflictMessage?: string;
}

/**
 * Returns citizen-friendly sub-district label based on State conventions.
 */
export function getSubDistrictLabelForState(stateName?: string | null): "Taluk" | "Tehsil" | "Mandal" | "Sub-District" {
  if (!stateName) return "Sub-District";
  const lower = stateName.toLowerCase();
  if (lower.includes("tamil nadu") || lower.includes("kerala") || lower.includes("karnataka")) {
    return "Taluk";
  }
  if (lower.includes("telangana") || lower.includes("andhra pradesh")) {
    return "Mandal";
  }
  if (
    lower.includes("uttar pradesh") ||
    lower.includes("madhya pradesh") ||
    lower.includes("rajasthan") ||
    lower.includes("bihar") ||
    lower.includes("delhi") ||
    lower.includes("haryana") ||
    lower.includes("punjab") ||
    lower.includes("maharashtra")
  ) {
    return "Tehsil";
  }
  return "Sub-District";
}

/**
 * Verifies if state & district match verified administrative directory.
 */
export function verifyStateAndDistrict(stateName?: string | null, districtName?: string | null): {
  stateValid: boolean;
  districtValid: boolean;
  matchedState?: StateUtMetadata;
  matchedDistrictName?: string;
} {
  if (!stateName) return { stateValid: false, districtValid: false };

  const matchedState = ALL_STATES_AND_UTS.find(
    (s) => s.name.toLowerCase() === stateName.trim().toLowerCase()
  );

  if (!matchedState) {
    return { stateValid: false, districtValid: false };
  }

  if (!districtName) {
    return { stateValid: true, districtValid: false, matchedState };
  }

  const matchedDistrict = matchedState.districts.find(
    (d) => d.toLowerCase() === districtName.trim().toLowerCase()
  );

  return {
    stateValid: true,
    districtValid: Boolean(matchedDistrict),
    matchedState,
    matchedDistrictName: matchedDistrict || districtName.trim()
  };
}

/**
 * Resolves any Indian 6-digit PIN code via runtime postal provider + server-side geocoding suggestion.
 */
export async function resolveAllIndiaPin(
  pinCode: string,
  selectedLocality?: string
): Promise<NormalizedLocationResolution> {
  const cleanPin = (pinCode || "").trim();
  const isValidFormat = /^[1-9][0-9]{5}$/.test(cleanPin);

  if (!isValidFormat) {
    return createEmptyResolution(cleanPin, "Invalid PIN format: must be 6 numeric digits starting with 1-9.");
  }

  const cacheKey = LocationCacheManager.getPinKey(cleanPin + (selectedLocality ? `_${selectedLocality.trim()}` : ""));
  const cached = LocationCacheManager.get<NormalizedLocationResolution>(cacheKey);

  if (cached.hit && cached.data && !cached.isStale) {
    return cached.data;
  }

  // 1. Live Fetch from Postal Reference API
  try {
    const url = `https://api.postalpincode.in/pincode/${cleanPin}`;
    const res = await safeGovernmentFetch(url, { timeoutMs: 6000 });

    if (res.ok) {
      const raw = JSON.parse(res.data);
      if (Array.isArray(raw) && raw.length > 0 && raw[0].Status === "Success") {
        const postOffices: PostOfficeDetail[] = (raw[0].PostOffice || []).map((po: any) => ({
          name: po.Name,
          branchType: po.BranchType,
          deliveryStatus: po.DeliveryStatus,
          circle: po.Circle,
          district: po.District,
          division: po.Division,
          region: po.Region,
          state: po.State,
          pincode: po.Pincode,
        }));

        const rawState = postOffices[0]?.state || null;
        const rawDistrict = postOffices[0]?.district || null;
        const localities = Array.from(new Set(postOffices.map((po) => po.name))).filter(Boolean);
        const activeLocality = selectedLocality && localities.includes(selectedLocality) ? selectedLocality : localities[0];

        const { stateValid, districtValid, matchedDistrictName } = verifyStateAndDistrict(rawState, rawDistrict);
        const subDistrictLabel = getSubDistrictLabelForState(rawState);

        // 2. Server-side Geocoding Suggestion for Map Placement
        let geoLat: number | null = null;
        let geoLng: number | null = null;

        // Try primary postal query, fallback to PIN + State
        const geocodeQuery = `${cleanPin}, ${matchedDistrictName || rawDistrict || ""}, ${rawState || ""}, India`.trim();
        let geocodeCoords = await geocodeAddressSuggestion(geocodeQuery);
        if (!geocodeCoords && activeLocality) {
          geocodeCoords = await geocodeAddressSuggestion(`${activeLocality}, ${matchedDistrictName || rawDistrict || ""}, India`);
        }
        if (!geocodeCoords) {
          geocodeCoords = await geocodeAddressSuggestion(`${cleanPin}, India`);
        }

        if (geocodeCoords) {
          geoLat = geocodeCoords.lat;
          geoLng = geocodeCoords.lng;
        }

        const resolution: NormalizedLocationResolution = {
          pinCode: cleanPin,
          valid: true,
          postal: {
            state: rawState,
            district: matchedDistrictName || rawDistrict,
            localities,
            postOffices,
            hasMultipleLocalities: localities.length > 1,
            selectedLocality: activeLocality,
          },
          map: {
            latitude: geoLat,
            longitude: geoLng,
            precision: "POSTAL_AREA",
            source: "PIN_APPROXIMATE",
          },
          administrative: {
            state: {
              name: rawState,
              source: stateValid ? "VERIFIED_DIRECTORY" : "THIRD_PARTY_POSTAL",
              status: stateValid ? "VERIFIED" : "SUGGESTED",
              verified: stateValid,
            },
            district: {
              name: matchedDistrictName || rawDistrict,
              source: districtValid ? "VERIFIED_DIRECTORY" : "THIRD_PARTY_POSTAL",
              status: districtValid ? "VERIFIED" : "SUGGESTED",
              verified: districtValid,
            },
            subDistrict: {
              name: null,
              label: subDistrictLabel,
              source: "NONE",
              status: "VERIFICATION_REQUIRED",
              verified: false,
            },
            block: {
              name: null,
              source: "NONE",
              status: "VERIFICATION_REQUIRED",
              verified: false,
            },
            localBody: {
              name: null,
              source: "NONE",
              status: "VERIFICATION_REQUIRED",
              verified: false,
            },
            village: {
              name: activeLocality || null,
              source: "THIRD_PARTY_POSTAL",
              status: "SUGGESTED",
              verified: false,
            },
          },
          sourceStatus: {
            postal: "Third-party postal reference (api.postalpincode.in)",
            administrative: stateValid && districtValid ? "InfoRight Grounded State/District Directory" : "Postal Reference Only",
            geocoding: geoLat ? "OpenStreetMap Nominatim Geocoding Suggestion" : "Pending GPS / Map Selection",
          },
          confidence: stateValid && districtValid ? "VERIFIED" : "SUGGESTED",
          conflictStatus: "NONE",
        };

        // Cache valid resolution for 14 days
        LocationCacheManager.set(cacheKey, resolution, "PROV-IN-POSTAL-PIN", "THIRD_PARTY_LIVE", url);
        return resolution;
      }
    }
  } catch {
    // Graceful fallback to stale cache if available
    if (cached.hit && cached.data) {
      return {
        ...cached.data,
        sourceStatus: {
          ...cached.data.sourceStatus,
          postal: "Verified Cache (Offline / Stale Fallback)",
        },
      };
    }
  }

  // If uncatalogued / network unavailable, return clean unverified state without false demo data
  return createEmptyResolution(cleanPin, "Location could not be resolved automatically from postal reference directory. Please select on map or enter manually.");
}

/**
 * Server-side address geocoding suggestion via Nominatim
 */
async function geocodeAddressSuggestion(query: string): Promise<{ lat: number; lng: number } | null> {
  if (!query || query.length < 3) return null;
  const cacheKey = `geocode_${query.replace(/\s+/g, "_").toLowerCase()}`;
  const cached = LocationCacheManager.get<{ lat: number; lng: number }>(cacheKey);
  if (cached.hit && cached.data) {
    return cached.data;
  }

  try {
    const encoded = encodeURIComponent(query);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1&countrycodes=in`;
    const res = await safeGovernmentFetch(url, {
      timeoutMs: 3500,
      headers: { "User-Agent": "InfoRightAI-LegalPlatform/2.0" },
    });

    if (res.ok) {
      const data = JSON.parse(res.data);
      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (!isNaN(lat) && !isNaN(lng)) {
          const result = { lat, lng };
          LocationCacheManager.set(cacheKey, result, "PROV-OSM-NOMINATIM", "GEOCODER_SUGGESTION", url);
          return result;
        }
      }
    }
  } catch {
    // Geocoding failure / timeout
  }

  return null;
}

/**
 * Reverse geocodes latitude/longitude coordinates into suggested administrative context.
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lng: number
): Promise<{
  state?: string;
  district?: string;
  subDistrict?: string;
  locality?: string;
  postalCode?: string;
  displayName?: string;
  sourceStatus: "SUGGESTED" | "VERIFICATION_REQUIRED";
}> {
  if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return { sourceStatus: "VERIFICATION_REQUIRED" };
  }

  const cacheKey = LocationCacheManager.getCoordKey(lat, lng);
  const cached = LocationCacheManager.get<any>(cacheKey);
  if (cached.hit && cached.data) {
    return cached.data;
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const res = await safeGovernmentFetch(url, {
      timeoutMs: 3500,
      headers: { "User-Agent": "InfoRightAI-LegalPlatform/2.0" },
    });

    if (res.ok) {
      const data = JSON.parse(res.data);
      const addr = data.address || {};
      const result = {
        state: addr.state,
        district: addr.state_district || addr.county || addr.district,
        subDistrict: addr.subdistrict || addr.taluk || addr.tehsil,
        locality: addr.suburb || addr.neighbourhood || addr.village || addr.town || addr.city,
        postalCode: addr.postcode,
        displayName: data.display_name,
        sourceStatus: "SUGGESTED" as const,
      };

      LocationCacheManager.set(cacheKey, result, "PROV-OSM-NOMINATIM", "GEOCODER_SUGGESTION", url);
      return result;
    }
  } catch {
    // Network / timeout failure
  }

  return { sourceStatus: "VERIFICATION_REQUIRED" };
}

function createEmptyResolution(pinCode: string, message: string): NormalizedLocationResolution {
  return {
    pinCode: pinCode || null,
    valid: false,
    postal: {
      state: null,
      district: null,
      localities: [],
      postOffices: [],
      hasMultipleLocalities: false,
    },
    map: {
      latitude: null,
      longitude: null,
      precision: "UNRESOLVED",
      source: "NONE",
    },
    administrative: {
      state: { name: null, source: "NONE", status: "VERIFICATION_REQUIRED", verified: false },
      district: { name: null, source: "NONE", status: "VERIFICATION_REQUIRED", verified: false },
      subDistrict: { name: null, label: "Sub-District", source: "NONE", status: "VERIFICATION_REQUIRED", verified: false },
      block: { name: null, source: "NONE", status: "VERIFICATION_REQUIRED", verified: false },
      localBody: { name: null, source: "NONE", status: "VERIFICATION_REQUIRED", verified: false },
      village: { name: null, source: "NONE", status: "VERIFICATION_REQUIRED", verified: false },
    },
    sourceStatus: {
      postal: "Unresolved",
      administrative: "Unresolved",
      geocoding: "Unresolved",
    },
    confidence: "VERIFICATION_REQUIRED",
    conflictStatus: "NONE",
    conflictMessage: message,
  };
}
