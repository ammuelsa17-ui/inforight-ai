# InfoRight AI — Capability & Verification Matrix

| Capability | Implemented | Automated Verified | Live Source / API Verified | Browser Verified | Limitation / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Citizen Problem Triage & AI Drafting** | YES | YES (333 tests) | YES (Gemini API) | NOT TESTED | AI assists drafting; deterministic engines govern law |
| **RTI Statutory Request Generator** | YES | YES (333 tests) | YES (RTI Online / SICs) | NOT TESTED | Section 6(1) record requests; 30-day & 48-hr timelines |
| **Pan-India Consumer Protection Engine** | YES | YES (333 tests) | YES (e-Jagriti / NCH) | NOT TESTED | CPA 2019 pecuniary limits; e-Jagriti primary platform |
| **State-Aware Tenancy Engine** | YES | YES (333 tests) | YES (State Gazettes) | NOT TESTED | Applies enacted state laws (TNRRRLT, MRCA, UP Act) |
| **Workplace & Labour Dispute Router** | YES | YES (333 tests) | YES (Shram Suvidha/CLC)| NOT TESTED | Distinguishes Central Sphere vs State Sphere |
| **Welfare Scheme Eligibility Reader** | YES | YES (333 tests) | YES (myScheme) | NOT TESTED | Deterministic evaluation against 12 verified scheme rules |
| **Indian Location & PIN Resolver** | YES | YES (333 tests) | YES (LGD / India Post) | NOT TESTED | 36 States/UTs, 700+ Districts, verified PIN registry |
| **Multilingual Voice STT/TTS** | YES | YES (333 tests) | YES (Sarvam `saaras:v3`)| NOT TESTED | 23 Indian languages mapped to BCP-47 & Sarvam STT |
| **Closed-Loop Civic Rectification** | YES | YES (333 tests) | YES (Haversine/SHA-256)| NOT TESTED | Citizen-only closure invariant; multi-cycle history |
| **IndexedDB Evidence Persistence** | YES | YES (333 tests) | N/A (Client Storage) | NOT TESTED | Browser-local multi-role simulation for prototype |
| **Government Host Security & SSRF Guard** | YES | YES (333 tests) | YES (Host Allowlist) | NOT TESTED | Blocks unapproved domains, localhost, and private IPs |
| **PDF & Evidence Export** | YES | YES (333 tests) | N/A (Client Renderer) | NOT TESTED | Formatted HTML/PDF export with SHA-256 checksums |
| **Source Freshness & Transparency** | YES | YES (333 tests) | YES (Source Metadata) | NOT TESTED | Strict provenance tracking & source-freshness badges |
