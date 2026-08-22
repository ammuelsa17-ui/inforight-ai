// src/lib/location/location-cache.ts — Runtime Location Cache Abstraction
import { GovernmentDataCache } from "@/lib/government-data/cache";

export interface CachedLocationEntry<T> {
  data: T;
  sourceUrl?: string;
  sourceId: string;
  sourceType: "OFFICIAL_GOVERNMENT" | "THIRD_PARTY_LIVE" | "GEOCODER_SUGGESTION" | "VERIFIED_CACHE";
  cachedAt: string;
  expiresAt: string;
  version?: string;
}

export class LocationCacheManager {
  private static TTL_PIN_MS = 14 * 24 * 60 * 60 * 1000; // 14 days for postal PIN data
  private static TTL_REVERSE_GEO_MS = 7 * 24 * 60 * 60 * 1000; // 7 days for reverse geocode

  /**
   * Safe rounded key for coordinates (approx 100m grid)
   */
  static getCoordKey(lat: number, lng: number): string {
    return `geo_${lat.toFixed(3)}_${lng.toFixed(3)}`;
  }

  static getPinKey(pinCode: string): string {
    return `loc_pin_${pinCode.trim()}`;
  }

  static get<T>(key: string): { hit: boolean; data?: T; isStale: boolean; entry?: CachedLocationEntry<T> } {
    const res = GovernmentDataCache.get<CachedLocationEntry<T>>(key);
    if (!res.hit || !res.data) {
      return { hit: false, isStale: true };
    }
    return {
      hit: true,
      data: res.data.data,
      isStale: res.isStale,
      entry: res.data
    };
  }

  static set<T>(
    key: string,
    data: T,
    sourceId: string,
    sourceType: CachedLocationEntry<T>["sourceType"],
    sourceUrl?: string,
    customTtlMs?: number
  ): void {
    const ttl = customTtlMs || (key.startsWith("loc_pin_") ? this.TTL_PIN_MS : this.TTL_REVERSE_GEO_MS);
    const entry: CachedLocationEntry<T> = {
      data,
      sourceId,
      sourceType,
      sourceUrl,
      cachedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + ttl).toISOString()
    };
    GovernmentDataCache.set(key, entry, ttl);
  }
}
