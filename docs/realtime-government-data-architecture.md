# Real-Time Government Data & Authority Resolution Architecture

InfoRight AI provides a pan-India, source-driven data layer that connects citizen requests to official government portals and directories with zero legal hallucination.

## Data Layer Architecture Overview

| Capability | Live Provider | Verified Cache | Static Fallback | Deterministic Engine | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **State / UT Registry** | Constitution of India | Permanent | All 36 States/UTs | `location-context.ts` | **VERIFIED_STATIC** |
| **District Directory** | LGD (lgdirectory.gov.in) | 30 Days TTL | 700+ District Gazetteer | `districts.ts` | **HYBRID** |
| **PIN Code & Locality** | India Post API (`api.postalpincode.in`) | 14 Days TTL | `pin-authority-registry.ts` | `postal-location.ts` | **HYBRID** |
| **Local Body / Municipality**| Municipal Portals (CCMC, BBMP, BMC) | 14 Days TTL | Tier-1 City Municipalities | `local-bodies.ts` | **HYBRID** |
| **RTI Authority Directory** | RTI Online (`rtionline.gov.in`) | 7 Days TTL | State RTI Directory | `rti-authority.ts` | **HYBRID** |
| **Civic Authority Resolver** | Municipal Department Directory | 7 Days TTL | Category Routing Registry | `authorities.ts` | **HYBRID** |
| **Consumer Directory** | e-Daakhil (`edaakhil.nic.in`) / NCH | 7 Days TTL | DCDRC / SCDRC / NCDRC Directory | `consumer-directory.ts` | **HYBRID** |
| **Tenant Authority Directory**| State Tenancy Portals | 14 Days TTL | Rent Authority Registry | `state-directory.ts` | **HYBRID** |
| **Workplace / Labour Offices**| Shram Suvidha / CLC (`clc.gov.in`) | 14 Days TTL | Central/State Sphere Directory| `labour-directory.ts` | **HYBRID** |
| **Welfare Scheme Discovery** | myScheme (`myscheme.gov.in`) | 3 Days TTL | `scheme-registry.ts` | `schemes.ts` | **HYBRID** |
| **Statutory Legal Rules** | Gazetted Acts & Rules | Permanent | `versioned-rules.ts` | Deterministic Calculators | **VERSIONED_STATIC** |
| **Portal Health & Status** | Live Server HEAD / GET Ping | 1 Hour TTL | Approved Host Allowlist | `source-health.ts` | **LIVE** |

---

## Strict Security & SSRF Invariant
- Direct user-input URLs are never fetched.
- Outbound requests are strictly filtered through [`official-host-registry.ts`](file:///Volumes/Disk%20D/OOSC/src/lib/government-data/security.ts) with timeout limits (3.5s) and response size limits (500KB).
- Localhost, private IPs (10.x, 192.168.x), and unapproved domains are rejected with security errors.
