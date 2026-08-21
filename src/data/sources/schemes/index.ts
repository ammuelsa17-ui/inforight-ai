import { VerifiedSourceRecord } from "@/types/source-data";
import { SCHEME_CORE_SOURCES } from "./scheme-sources";
import { STATE_SCHEME_SOURCES } from "./state-schemes";
import { UT_SCHEME_SOURCES } from "./ut-schemes";

/**
 * Unified Domain 4: Welfare Schemes Sources
 * Comprehensive India-wide citizen-facing welfare catalogue
 * combining Central Flagships (4A–4O), all 28 States, and all 8 Union Territories.
 */
export const WELFARE_SOURCES: VerifiedSourceRecord[] = [
  ...SCHEME_CORE_SOURCES,
  ...STATE_SCHEME_SOURCES,
  ...UT_SCHEME_SOURCES
];

export { SCHEME_CORE_SOURCES, STATE_SCHEME_SOURCES, UT_SCHEME_SOURCES };

/**
 * Look up verified welfare schemes applicable to a given State or UT (plus Central schemes).
 */
export function getSchemesByJurisdiction(stateOrUt: string): VerifiedSourceRecord[] {
  const normalized = stateOrUt.trim().toLowerCase();
  return WELFARE_SOURCES.filter(s => {
    const sState = s.jurisdiction.state_ut?.toLowerCase() || "";
    return sState === "national" || sState === normalized;
  });
}

/**
 * Look up verified welfare schemes by category subdomain (e.g. 4A_WOMEN_CHILDREN_FAMILY).
 */
export function getSchemesByCategory(subdomain: string): VerifiedSourceRecord[] {
  return WELFARE_SOURCES.filter(s => s.subdomain === subdomain);
}
