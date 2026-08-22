# Forensic Static-Data Audit — Real-Time Government Data & Authority Resolution Layer

This audit documents and categorizes all manually maintained, reference, and statutory data within InfoRight AI codebase across `src/data/**`, `src/lib/**`, and `src/app/**`.

## Classification Key
- **A. PRESENTATION_CONSTANT**: UI labels, badges, display formatting.
- **B. VERSIONED_LEGAL_RULE**: Statutory limits, pecuniary jurisdictions, fee schedules, time limits from legislation.
- **C. STABLE_GOVERNMENT_REFERENCE**: Constitutional States/UTs, official district gazettes, Ministry parent bodies.
- **D. VOLATILE_GOVERNMENT_REFERENCE**: Portal URLs, designated officer roles, PIN code coverage, helpline numbers, conciliation offices.
- **E. DEMO_FIXTURE**: Example test vectors, prefill scenarios for user guidance.
- **F. USER_INPUT**: Citizen entries, problem descriptions, evidence captures.
- **G. MUST_REMAIN_STATIC_FOR_SAFETY**: Non-delegable statutory text, foundational acts, criminal/civil safety guards.

---

## Detailed Static Data Audit Matrix

| File | Value / Dataset | Classification | Current Source | Can Be Live? | Official Provider / Endpoint | Cache Strategy | Migration Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `src/lib/location/location-context.ts` | 36 States & UTs | **C. STABLE_GOVERNMENT_REFERENCE** | Survey of India / Census | No (Constitutional) | Constitution of India (1st Schedule) | Permanent Cache / Static Base | Baseline Static |
| `src/lib/location/location-context.ts` | 700+ Official Districts | **C. STABLE_GOVERNMENT_REFERENCE** | Local Government Directory (LGD) | **HYBRID** | LGD (lgdirectory.gov.in) / Data.gov.in | TTL 30 days (Stale-While-Revalidate) | **P0** |
| `src/data/pin-authority-registry.ts` | Demo PIN mappings (641001-641012) | **D. VOLATILE_GOVERNMENT_REFERENCE** | CCMC Municipal Gazettes | **HYBRID** | India Post Postal API / Data.gov.in PIN directory | TTL 14 days (Fallback to Verified Registry) | **P0** |
| `src/data/authorities/authority-registry.ts` | Public Authorities, PIOs, Departments | **D. VOLATILE_GOVERNMENT_REFERENCE** | RTI Online / State Portals | **HYBRID** | RTI Online / State Department Directories | TTL 7 days | **P0** |
| `src/data/tenancy/state-tenancy-registry.ts` | 36 State Tenancy Laws & Deposit Limits | **B. VERSIONED_LEGAL_RULE** | State Gazettes (TNRRRLT, MRC Act) | No (Legal rules must be deterministic) | Official State Legislative Portals | Versioned Rule Registry | **P0** (Versioned) |
| `src/data/sources/consumer/consumer-sources.ts` | Consumer Portals, NCH 1915, DCDRCs | **D. VOLATILE_GOVERNMENT_REFERENCE** | e-Daakhil / NCH Portal | **HYBRID** | DOCA / e-Daakhil Directory | TTL 7 days | **P1** |
| `src/lib/consumer/jurisdiction-resolver.ts` | ₹50L / ₹2Cr Pecuniary Limits | **B. VERSIONED_LEGAL_RULE** | Consumer Protection Act 2019 (Sec 34/47/58) | No (Statutory Act) | Consumer Protection Act 2019 Gazetted | Versioned Rule Registry | **P0** (Versioned) |
| `src/data/sources/rti/state-rti-directory.ts` | State RTI Portals & SIC URLs | **D. VOLATILE_GOVERNMENT_REFERENCE** | State Information Commissions | **HYBRID** | State Portal Health Checks | TTL 24 hours | **P1** |
| `src/data/sources/workplace/workplace-sources.ts` | Labour Offices, Conciliation Officers | **D. VOLATILE_GOVERNMENT_REFERENCE** | Ministry of Labour & Employment / State Labour | **HYBRID** | Shram Suvidha / State Labour Portals | TTL 14 days | **P1** |
| `src/data/schemes/schemes-registry.ts` | Central & State Welfare Schemes | **C. STABLE_GOVERNMENT_REFERENCE** | myScheme.gov.in / DBT Bharat | **HYBRID** | myScheme API / Discovery Provider | TTL 3 days (Discovery) + Verified Rules | **P1** |
| `src/data/deadlines/deadline-registry.ts` | 30-day RTI, 48-hr Life/Liberty | **B. VERSIONED_LEGAL_RULE** | RTI Act 2005 (Sec 7(1), 19(1)) | No (Statutory Timeline) | RTI Act 2005 | Versioned Rule Registry | **P0** (Versioned) |
| `src/data/sources/` | 40+ Official Legal Citations | **G. MUST_REMAIN_STATIC_FOR_SAFETY** | Official Acts & Rules | No (Ground truth) | India Code / Gazette of India | Static Ground Truth | Baseline Static |

---

## Migration Plan & Priorities
1. **P0 (Critical Foundation)**:
   - Official Provider Abstraction & Safe Host Allowlist (`official-host-registry.ts`).
   - Dynamic India Post PIN & Post Office Resolver with deterministic fallback.
   - District Provider with LGD / Data.gov.in refresh & static 36 States/UTs fallback.
   - RTI & Civic Authority Resolver with provenance, TTL cache, and fallback.
   - Versioned Legal Rules data model for statutory constants.

2. **P1 (Domain Directory Adapters)**:
   - Consumer Authority Directory Adapter (e-Daakhil, NCH, State/District Commissions).
   - Workplace / Labour Office Directory Adapter (Central vs State Sphere).
   - Tenancy Directory Adapter (Rent Authorities & Courts for verified states).
   - Welfare Scheme Live Discovery Provider with `ELIGIBILITY_RULES_NOT_VERIFIED` guard.
   - Portal Health Checker with server-safe HEAD/GET pinging.

3. **P2 (Observability & Change Detection)**:
   - ETag & content hash change detector for official source URLs.
   - Server-safe audit logging (zero PII, zero coordinates).
