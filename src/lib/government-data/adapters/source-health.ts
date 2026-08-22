// src/lib/government-data/adapters/source-health.ts — Official Government Portal Health Checker
import { safeGovernmentFetch, isApprovedOfficialHost } from "@/lib/government-data/security";
import { GovernmentDataCache } from "@/lib/government-data/cache";

export type PortalHealthStatus = "ACTIVE" | "REDIRECTED" | "UNREACHABLE" | "REVIEW_REQUIRED";

export interface PortalHealthCheckResult {
  url: string;
  host: string;
  status: PortalHealthStatus;
  httpStatus?: number;
  checkedAt: string;
  responseDurationMs: number;
  isApprovedHost: boolean;
}

export async function checkPortalHealth(urlStr: string): Promise<PortalHealthCheckResult> {
  const start = Date.now();
  const isApproved = isApprovedOfficialHost(urlStr);

  if (!isApproved) {
    return {
      url: urlStr,
      host: "Unapproved Host",
      status: "REVIEW_REQUIRED",
      checkedAt: new Date().toISOString(),
      responseDurationMs: 0,
      isApprovedHost: false
    };
  }

  const cacheKey = `portal_health_${urlStr}`;
  const cached = GovernmentDataCache.get<PortalHealthCheckResult>(cacheKey);
  if (cached.hit && cached.data && !cached.isStale) {
    return cached.data;
  }

  try {
    const res = await safeGovernmentFetch(urlStr, { timeoutMs: 3000, maxBytes: 10 * 1024 });
    const duration = Date.now() - start;

    let status: PortalHealthStatus = "ACTIVE";
    if (res.status >= 300 && res.status < 400) status = "REDIRECTED";
    if (!res.ok) status = "REVIEW_REQUIRED";

    const result: PortalHealthCheckResult = {
      url: urlStr,
      host: new URL(urlStr).hostname,
      status,
      httpStatus: res.status,
      checkedAt: new Date().toISOString(),
      responseDurationMs: duration,
      isApprovedHost: true
    };

    // Cache health check for 1 hour
    GovernmentDataCache.set(cacheKey, result, 60 * 60 * 1000);
    return result;
  } catch {
    const duration = Date.now() - start;
    const result: PortalHealthCheckResult = {
      url: urlStr,
      host: new URL(urlStr).hostname,
      status: "UNREACHABLE",
      checkedAt: new Date().toISOString(),
      responseDurationMs: duration,
      isApprovedHost: true
    };
    GovernmentDataCache.set(cacheKey, result, 10 * 60 * 1000);
    return result;
  }
}
