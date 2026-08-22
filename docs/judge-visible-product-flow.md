# InfoRight AI — Judge-Visible Product Flow

This document details the end-to-end user journey across both Citizen and Official perspectives for seamless evaluation and live presentation.

---

## 🧭 End-to-End Civic & Legal Journey Matrix

| Step | User Role | Screen Route | User Intent | Primary Action / CTA | System Output | Next Screen |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Overview & Intake** | Citizen | `/` (Home) | Understand product in 30 seconds | **"Get Help (Describe Problem)"** | Clear 3-step value proposition & Two-Sided Civic Loop summary | `/ask` |
| **2. Problem Formulation** | Citizen | `/ask` | State civic road problem in plain Tamil/Hindi/English | **"Analyze Problem"** / **"Generate Document"** | Multilingual voice STT, postal PIN `641002` → Coimbatore City Municipal Corp (CCMC) | `/ask` (Action Plan) |
| **3. Evidence & Case Filing** | Citizen | `/ask` | Attach "Before" photo & establish case | **"Save & Track Case"** | Case `RTI-2026-CURRENT` created with `SUBMITTED` status & local storage privacy | `/dashboard` |
| **4. Case Monitoring** | Citizen | `/dashboard` | Track statutory countdowns & cases | Click Case Card | Visual 4-step progress tracker: `Issue Reported` ✓ → `Officer Action` (Current) | `/dashboard/cases/[id]` |
| **5. Officer Dispatch & Review** | Municipal Official | `/official` | Inspect assigned road complaints | **"Review Case"** → **"Start Work"** | Status updates to `IN_PROGRESS`; department crew dispatched | `/official/cases/[id]` |
| **6. Uploading Rectification** | Municipal Official | `/official/cases/[id]` | Submit repair evidence with GPS coordinates | **"Submit Rectification Proof"** | Haversine distance validated (<25m); Status updates to `RECTIFIED_PENDING_CITIZEN_CONFIRMATION` | `/official/cases/[id]` |
| **7. Citizen Verification** | Citizen | `/dashboard/cases/[id]` | Inspect side-by-side Before/After repair photos | **"Confirm Resolved"** or **"Reopen Case"** | If confirmed: Case closes permanently. If reopened: Cycle increments and returns to Officer. | `/dashboard/cases/[id]` |
| **8. Audit & Legal Record** | Citizen / Official | `/dashboard/cases/[id]` | Export legal record of repair | **"Print Evidence Pack"** | Printable official A4 evidence package with SHA-256 tamper-evident checksums | PDF Export |

---

## ⚖️ Key Invariant Checkpoints for Judges
1. **The Non-Delegation Principle**: AI interprets language and structures the draft, but all statutory fees (₹10), response deadlines (30 days), and authority routing are deterministic.
2. **Citizen-Governed Closure**: Municipal officers cannot unilaterally mark a civic grievance as "Closed". Only the citizen can confirm resolution or reopen the cycle.
3. **Mathematical Geo-Validation**: Repair coordinates are verified against the original complaint using the Haversine formula with strict precision thresholds.
