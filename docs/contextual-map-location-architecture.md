# InfoRight AI — Contextual Map & Location Architecture

**Date**: 2026-08-22  
**Branch**: `feat/contextual-location-map`

---

## 🗺️ Architectural Separation of Concerns

InfoRight AI strictly enforces the boundary between **visual spatial context** and **deterministic legal jurisdiction**:

```
+-------------------------------------------------------------+
| 1. Visual/Spatial Confirmation Layer (Client-Side)          |
|    - Leaflet + OpenStreetMap (Zero Paid API Key Leak)       |
|    - Approximate PIN Centroids & Postal Circles             |
|    - Optional Device Geolocation (GPS with permission)      |
|    - Citizen/Official Map Marker Refinement                 |
+-------------------------------------------------------------+
                              |
                              v (Coordinates & PIN Context)
+-------------------------------------------------------------+
| 2. Administrative Authority Resolver (Server / Data Layer)  |
|    - India Post PIN Directory & Local Body Mapping          |
|    - Verified Competent Authority Hierarchy (CCMC, BBMP)    |
|    - Deterministic Multi-Sphere Routing (Central vs State)  |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| 3. Deterministic Legal & Rights Engine                      |
|    - RTI Act 2005 / CPA 2019 / State Tenancy Acts / CLC     |
|    - Statutory Response Deadlines & Pecuniary Limits        |
|    - Verifiable Source Citations                            |
+-------------------------------------------------------------+
```

---

## 📍 Where Maps Are Integrated
1. **`/ask` (Unified Entrypoint)**: Centered around postal PIN area after State/District entry; allows optional GPS detection or map click to confirm the problem spot.
2. **Citizen Evidence Capture (`CitizenEvidenceCapture.tsx`)**: Shows mini map preview with the device-reported before-repair photo location.
3. **Official Rectification Proof (`OfficerRectificationModal.tsx`)**: Captures after-repair photo location and compares against the citizen's initial coordinates.
4. **Before/After Rectification Comparison (`BeforeAfterComparisonPanel.tsx`)**: Visualizes two markers (*Marker A: Reported Issue*, *Marker B: Rectification Evidence*) and evaluates spatial consistency without fabricating legal conclusions.
5. **`/locator` (Administrative Jurisdiction Directory)**: Displays interactive district/locality map layer alongside resolved CPIOs, DCDRCs, and Rent Authorities.
6. **Tenant & Workplace Workflows (`/rights/tenant`, `/rights/workplace`)**: Pinpoints rental property location and workplace site for state-specific tenancy and labour conciliation.
7. **Conversational Form Filler (`CivicFormFiller.tsx`)**: Step 2 features map-assisted postal area confirmation.

---

## 🛡️ Truthful Labeling & Fallback Invariants
- **Open-Source Tech Stack**: Leaflet dynamic import (`leaflet` + `@types/leaflet`) with OpenStreetMap raster tiles (zero paid API keys, zero credential leakage).
- **Centroid Registry Scope**: Employs verified demo PIN centroids with manual/GPS refinement; uncatalogued PINs safely display a neutral pan-India overview without fabricating false street coordinates.
- **No False Verification Claims**: Labeled as *"Device-Reported Location"*, *"Approximate PIN Location"*, or *"Citizen-Confirmed Map Point"*—never *"Exact Ward Verified from GPS"*.
- **GPS Denial Safety**: If GPS permission is denied or unsupported, the citizen is never blocked; manual map selection and text inputs remain 100% functional.
- **SSRF & Privacy Protection**: Precision coordinates are never sent to external LLMs; GPS stays local to the client evidence package.
