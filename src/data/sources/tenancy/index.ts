import { VerifiedSourceRecord } from "@/types/source-data";
import { TENANCY_CORE_SOURCES } from "./tenancy-sources";
import { TENANCY_STATE_SOURCES } from "./state-directory";

/**
 * Unified Domain 2: Tenant Rights Sources
 * Combines Core Principles (2A–2E) and State Directory (2F).
 */
export const TENANCY_SOURCES: VerifiedSourceRecord[] = [
  ...TENANCY_CORE_SOURCES,
  ...TENANCY_STATE_SOURCES
];

export { TENANCY_CORE_SOURCES, TENANCY_STATE_SOURCES };
