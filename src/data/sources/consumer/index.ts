import { VerifiedSourceRecord } from "@/types/source-data";
import { CONSUMER_CORE_SOURCES } from "./consumer-sources";
import { CONSUMER_SECTOR_ROUTES } from "./sector-routes";

/**
 * Unified Domain 1: Consumer Protection Sources
 * Combines Core Framework (1A–1E) and Sector Routing (1F).
 */
export const CONSUMER_SOURCES: VerifiedSourceRecord[] = [
  ...CONSUMER_CORE_SOURCES,
  ...CONSUMER_SECTOR_ROUTES
];

export { CONSUMER_CORE_SOURCES, CONSUMER_SECTOR_ROUTES };
