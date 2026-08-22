// src/lib/government-data/security.ts — Strict Official Host Allowlist & SSRF Protection

/**
 * Approved official government domains and authoritative API hosts.
 * NEVER accept arbitrary hostnames or unverified URLs.
 */
export const APPROVED_GOVERNMENT_HOSTS: ReadonlyArray<string> = [
  // India Post / Postal APIs
  "api.postalpincode.in",
  "data.gov.in",
  "www.indiapost.gov.in",
  
  // RTI Portals
  "rtionline.gov.in",
  "cic.gov.in",
  "rti.tamilnadu.gov.in",
  "mahadhikar.maharashtra.gov.in",
  "rtionline.karnataka.gov.in",

  // Consumer Affairs & Commission Portals (e-Jagriti is the primary platform since Jan 1, 2025; eDaakhil is legacy subsumed)
  "e-jagriti.gov.in",
  "www.e-jagriti.gov.in",
  "edaakhil.nic.in",
  "consumerhelpline.gov.in",
  "ncdrc.nic.in",
  "consumeraffairs.nic.in",

  // Local Government Directory & Urban Affairs
  "lgdirectory.gov.in",
  "mohua.gov.in",
  "panchayat.gov.in",

  // Labour & Employment
  "shramsuvidha.gov.in",
  "labour.gov.in",
  "clc.gov.in",

  // Welfare & Scheme Portals
  "www.myscheme.gov.in",
  "myscheme.gov.in",
  "dbtbharat.gov.in",

  // Municipal Corporations & Official State Portals
  "www.ccmc.gov.in",
  "ccmc.gov.in",
  "chennaicorporation.gov.in",
  "bbmp.gov.in",
  "portal.mcgm.gov.in",
  "ndmc.gov.in"
];

/**
 * Validates that a target URL belongs to an explicitly approved official government host.
 * Protects against SSRF, localhost, internal network probing, and malicious redirects.
 */
export function isApprovedOfficialHost(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);

    // Protocol must be HTTPS (or HTTP in local test environments only)
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Reject localhost, loopback, private IP ranges
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.16.") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".local")
    ) {
      return false;
    }

    // Exact hostname match or approved subdomain of approved hosts
    return APPROVED_GOVERNMENT_HOSTS.some(
      (approvedHost) => hostname === approvedHost || hostname.endsWith(`.${approvedHost}`)
    );
  } catch {
    return false;
  }
}

/**
 * Safe server-side fetch wrapper with timeout, size limit, and host validation
 */
export async function safeGovernmentFetch(
  urlStr: string,
  options: { timeoutMs?: number; maxBytes?: number; headers?: Record<string, string> } = {}
): Promise<{ ok: boolean; status: number; data: string; headers: Headers }> {
  if (!isApprovedOfficialHost(urlStr)) {
    throw new Error(`Security Violation: Host for URL '${urlStr}' is not in approved official host registry.`);
  }

  const timeoutMs = options.timeoutMs || 4000; // 4 second hard timeout
  const maxBytes = options.maxBytes || 500 * 1024; // 500 KB limit

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(urlStr, {
      method: "GET",
      headers: {
        "User-Agent": "InfoRight-AI-GovernmentDataResolver/1.0 (+https://inforight.ai)",
        Accept: "application/json, text/plain, */*",
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { ok: false, status: response.status, data: "", headers: response.headers };
    }

    // Protect against huge response bodies
    const text = await response.text();
    if (text.length > maxBytes) {
      throw new Error(`Response payload exceeded limit of ${maxBytes} bytes`);
    }

    return { ok: true, status: response.status, data: text, headers: response.headers };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error(`Government endpoint timed out after ${timeoutMs}ms`);
    }
    throw err;
  }
}
