import { VerifiedSourceRecord } from "@/types/source-data";
import { RTI_CORE_SOURCES } from "./rti-sources";
import { RTI_STATE_SOURCES } from "./state-rti-directory";

/**
 * Unified Domain 3: RTI Access Sources
 * Combines Core Principles (3A–3E) and State RTI Layer (3F).
 */
export const RTI_SOURCES: VerifiedSourceRecord[] = [
  ...RTI_CORE_SOURCES,
  ...RTI_STATE_SOURCES
];

export { RTI_CORE_SOURCES, RTI_STATE_SOURCES };
