# InfoRight AI — Runtime All-India Location Resolution Architecture

**Date**: 2026-08-22  
**Branch**: `feat/runtime-all-india-location`

---

## 🗺️ Architectural Flow

InfoRight AI resolves administrative context across India using an official-data-first, multi-tier resolution pipeline:

```
+-------------------------------------------------------------+
| 1. Citizen Input (PIN / GPS / Map Click)                    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| 2. Runtime Postal & Spatial Geocoding (Server-Side)         |
|    - India Post PIN Directory (api.postalpincode.in)        |
|    - OpenStreetMap Nominatim (Reverse Geocoding Suggestion) |
|    - LocationCacheManager (14-day postal, 7-day geo TTL)    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| 3. Official Administrative Verification Layer               |
|    - Grounded against 36 States & 700+ Verified Districts   |
|    - State-specific sub-district labeling:                  |
|      * TN/KL/KA -> Taluk                                    |
|      * UP/MP/RJ/MH/DL -> Tehsil                             |
|      * TS/AP -> Mandal                                      |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| 4. User Confirmation & Provenance Details                   |
|    - Interactive Street & Satellite Imagery Layers          |
|    - Collapsible Administrative Hierarchy Table             |
|    - Explicit Provenance Badges:                            |
|      * Verified (Government Grounded)                       |
|      * Suggested (Map/Postal Approximation)                 |
|      * Citizen Confirmed (Manual / GPS)                     |
|      * Verification Required (Unmapped Fields)              |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| 5. Deterministic Statutory Authority Resolver               |
|    - Grounded Competent Authorities (CPIOs, DCDRCs, CLC)    |
|    - Zero AI/LLM Guessing for Legal Jurisdiction Facts      |
+-------------------------------------------------------------+
```

---

## 🛡️ Truthful Labeling & Fallback Invariants
- **No Hardcoded Production Dependency**: Centroid dictionaries remain strictly test/demo fixtures; production runtime calls dynamic resolver APIs.
- **Graceful Failure Mode**: When a PIN or location is unresolvable or network is offline, the system safely renders a neutral Pan-India overview without fabricating false street coordinates or defaulting to demo cities.
- **Zero LLM Hallucination**: Large Language Models are strictly prohibited from inventing administrative, boundary, or legal routing facts.
