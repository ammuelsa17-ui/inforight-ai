## Data Layer Architecture Overview

| Capability | Live Provider | Verified Cache | Static Fallback | Provenance Trust Level | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **State / UT Registry** | Constitution of India | Permanent | All 36 States/UTs | `VERIFIED_STATIC_GOVERNMENT_SOURCE` | **VERIFIED_STATIC** |
| **District Directory** | LGD (lgdirectory.gov.in / data.gov.in) | 30 Days TTL | 700+ District Gazetteer | `OFFICIAL_GOVERNMENT_DATASET` | **HYBRID** |
| **PIN Code & Locality (3rd-Party)** | api.postalpincode.in | 14 Days TTL | `pin-authority-registry.ts` | `THIRD_PARTY_REFERENCE` | **THIRD_PARTY_LIVE** |
| **Local Body / Municipality**| Municipal Portals (CCMC, BBMP, BMC) | 14 Days TTL | Tier-1 City Municipalities | `OFFICIAL_GOVERNMENT_DATASET` | **HYBRID** |
| **RTI Authority Directory** | RTI Online (`rtionline.gov.in`) | 7 Days TTL | State RTI Directory | `OFFICIAL_GOVERNMENT` | **HYBRID** |
| **Civic Authority Resolver** | Municipal Department Directory | 7 Days TTL | Category Routing Registry | `VERIFIED_STATIC_GOVERNMENT_SOURCE` | **HYBRID** |
| **Consumer Directory** | e-Daakhil (`edaakhil.nic.in`) / NCH | 7 Days TTL | DCDRC / SCDRC / NCDRC Directory | `OFFICIAL_GOVERNMENT` | **HYBRID** |
| **Tenant Authority Directory**| State Tenancy Portals | 14 Days TTL | Rent Authority Registry | `OFFICIAL_GOVERNMENT` | **HYBRID** |
| **Workplace / Labour Offices**| Shram Suvidha / CLC (`clc.gov.in`) | 14 Days TTL | Central/State Sphere Directory| `OFFICIAL_GOVERNMENT` | **HYBRID** |
| **Welfare Scheme Discovery** | myScheme (`myscheme.gov.in`) | 3 Days TTL | `scheme-registry.ts` | `OFFICIAL_GOVERNMENT_DATASET` | **HYBRID** |
| **Statutory Legal Rules** | Gazetted Acts & Rules | Permanent | `versioned-rules.ts` | `VERIFIED_STATIC_GOVERNMENT_SOURCE` | **VERSIONED_STATIC** |
| **Portal Health & Status** | Live Server HEAD / GET Ping | 1 Hour TTL | Approved Host Allowlist | `OFFICIAL_GOVERNMENT` | **LIVE** |

---

## Strict Security & SSRF Invariant
- Direct user-input URLs are never fetched.
- Outbound requests are strictly filtered through [`official-host-registry.ts`](file:///Volumes/Disk%20D/OOSC/src/lib/government-data/security.ts) with timeout limits (3.5s) and response size limits (500KB).
- Localhost, private IPs (10.x, 192.168.x), and unapproved domains are rejected with security errors.
