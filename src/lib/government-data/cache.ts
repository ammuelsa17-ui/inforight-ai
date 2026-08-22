// src/lib/government-data/cache.ts — In-Memory / Stale-While-Revalidate Server Cache

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  ttlMs: number;
  staleTtlMs: number;
  eTag?: string;
}

const memoryStore = new Map<string, CacheEntry<any>>();

export class GovernmentDataCache {
  /**
   * Set cache entry with standard TTL and stale retention TTL
   */
  static set<T>(key: string, data: T, ttlMs: number = 24 * 60 * 60 * 1000, eTag?: string): void {
    const now = Date.now();
    memoryStore.set(key, {
      data,
      cachedAt: now,
      ttlMs,
      staleTtlMs: ttlMs * 3, // Allow serving stale for 3x TTL if offline
      eTag,
    });
  }

  /**
   * Get cached item returning status whether fresh, stale, or miss
   */
  static get<T>(key: string): {
    hit: boolean;
    data: T | null;
    isStale: boolean;
    eTag?: string;
  } {
    const entry = memoryStore.get(key);
    if (!entry) {
      return { hit: false, data: null, isStale: false };
    }

    const now = Date.now();
    const age = now - entry.cachedAt;

    if (age <= entry.ttlMs) {
      return { hit: true, data: entry.data as T, isStale: false, eTag: entry.eTag };
    }

    if (age <= entry.staleTtlMs) {
      return { hit: true, data: entry.data as T, isStale: true, eTag: entry.eTag };
    }

    // Completely expired
    memoryStore.delete(key);
    return { hit: false, data: null, isStale: false };
  }

  /**
   * Clear all or specific cache key
   */
  static clear(key?: string): void {
    if (key) {
      memoryStore.delete(key);
    } else {
      memoryStore.clear();
    }
  }
}
