import { VerifiedSourceRecord } from "@/types/source-data";
import { TENANCY_CORE_SOURCES } from "./tenancy-sources";
import { TENANCY_STATE_SOURCES } from "./state-directory";

/**
 * Unified Domain 2: Tenant Rights Sources
 * Combines Core Principles (2A–2E) and State Directory (2F).
 * Covers all 28 States and 8 Union Territories (36 Jurisdictions) + 6 Core Frameworks.
 */
export const TENANCY_SOURCES: VerifiedSourceRecord[] = [
  ...TENANCY_CORE_SOURCES,
  ...TENANCY_STATE_SOURCES
];

export { TENANCY_CORE_SOURCES, TENANCY_STATE_SOURCES };

/**
 * Retrieve state/UT-specific tenancy law record by name
 */
export function getTenancyLawByState(stateUt: string): VerifiedSourceRecord | undefined {
  const normalized = stateUt.trim().toLowerCase();
  return TENANCY_STATE_SOURCES.find(s => {
    const sName = s.jurisdiction.state_ut?.toLowerCase();
    if (!sName) return false;
    return sName === normalized || sName.includes(normalized) || normalized.includes(sName);
  });
}

/**
 * Get all indexed States and Union Territories in Domain 2
 */
export function getAllTenancyStates(): string[] {
  return TENANCY_STATE_SOURCES.map(s => s.jurisdiction.state_ut).filter((s): s is string => Boolean(s));
}

/**
 * Retrieve Core Tenancy Sources by Subdomain
 */
export function getTenancyCoreSourcesBySubdomain(subdomain: string): VerifiedSourceRecord[] {
  return TENANCY_CORE_SOURCES.filter(s => s.subdomain === subdomain);
}
