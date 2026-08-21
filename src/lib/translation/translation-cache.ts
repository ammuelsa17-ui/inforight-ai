interface CachedPipelineConfig {
  callbackUrl: string;
  authHeaderName: string;
  authHeaderValue: string;
  serviceId: string;
  expiresAt: number;
}

const configCache = new Map<string, CachedPipelineConfig>();
const inFlightRequests = new Map<string, Promise<unknown>>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 Hour TTL

export function getCachedPipelineConfig(
  pipelineId: string,
  sourceLang: string,
  targetLang: string
): CachedPipelineConfig | null {
  const key = `${pipelineId}_${sourceLang}_${targetLang}`;
  const cached = configCache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiresAt) {
    configCache.delete(key);
    return null;
  }
  return cached;
}

export function setCachedPipelineConfig(
  pipelineId: string,
  sourceLang: string,
  targetLang: string,
  config: Omit<CachedPipelineConfig, "expiresAt">
): void {
  const key = `${pipelineId}_${sourceLang}_${targetLang}`;
  configCache.set(key, {
    ...config,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

// Single-Flight Request Deduplication
export async function deduplicateConfigFetch<T>(
  pipelineId: string,
  sourceLang: string,
  targetLang: string,
  fetcher: () => Promise<T | null>
): Promise<T | null> {
  const key = `${pipelineId}_${sourceLang}_${targetLang}`;
  const existing = inFlightRequests.get(key) as Promise<T | null> | undefined;
  if (existing) {
    return existing;
  }

  const promise = fetcher().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, promise);
  return promise;
}

export function clearConfigCache(): void {
  configCache.clear();
  inFlightRequests.clear();
}
