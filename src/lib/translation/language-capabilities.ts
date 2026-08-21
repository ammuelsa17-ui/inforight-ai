import { VALID_LANGUAGE_CODES } from "@/i18n/languages";

// Explicit BHASHINI host allowlist
const EXACT_ALLOWED_HOSTS = [
  "dhruva-api.bhashini.gov.in",
  "meity-auth.ulcacontrib.org",
  "auth.ulcacontrib.org",
  "bhashini.gov.in",
  "ulcacontrib.org",
];

// Forbidden header names for dynamic auth header validation
const FORBIDDEN_HEADERS = new Set([
  "host",
  "cookie",
  "set-cookie",
  "content-length",
  "transfer-encoding",
  "connection",
  "proxy-authorization",
  "proxy-authenticate",
]);

export function isAllowedCallbackUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    if (url.protocol !== "https:") return false;
    const hostname = url.hostname.toLowerCase();
    return EXACT_ALLOWED_HOSTS.some(
      (allowed) => hostname === allowed || hostname.endsWith("." + allowed)
    );
  } catch {
    return false;
  }
}

export function isValidAuthHeaderName(headerName: string): boolean {
  if (!headerName || typeof headerName !== "string") return false;
  const name = headerName.trim().toLowerCase();
  if (FORBIDDEN_HEADERS.has(name)) return false;
  // Reject CR/LF, whitespace, or invalid non-ASCII characters
  return /^[a-zA-Z0-9\-_]+$/.test(name);
}

export function isValidAuthHeaderValue(headerValue: string): boolean {
  if (!headerValue || typeof headerValue !== "string") return false;
  // Reject CR/LF characters to prevent header injection
  return !/[\r\n]/.test(headerValue) && headerValue.trim().length > 0;
}

export function isSupportedLanguageCode(code: string): boolean {
  return VALID_LANGUAGE_CODES.has(code);
}
