# InfoRight AI — Video Demonstration & Presentation Script (6–8 Minutes)

**Target Duration**: 6 to 8 minutes  
**Goal**: Deliver a crisp, compelling, and technically grounded presentation for hackathon evaluators covering Problem, AI vs Deterministic Safety, Core Citizen Journey, Closed-Loop Civic Rectification, Scheme Matching, and Technical Architecture.

---

## ⏱️ Timeline & Section Breakdown

| Timestamp | Section | Key Message / Action on Screen |
| :--- | :--- | :--- |
| **0:00 – 0:40** | **1. The Problem** | Citizens struggle because legal rights, government schemes, authorities, forms, and deadlines are scattered across hundreds of portals, gazettes, and complex statutory acts. |
| **0:40 – 1:10** | **2. The InfoRight AI Solution** | Introduce the core principle: *"InfoRight AI converts a citizen's civic or legal problem into a clear, source-grounded action path. AI interprets and communicates, while verified government sources and deterministic legal rules control legal outcomes."* |
| **1:10 – 3:30** | **3. Core Citizen Flow (`/ask`)** | Walk through the main intake: citizen describes road damage in Tamil/Hindi/English → PIN Code `641002` → automatic CCMC local body and PIO resolution → verifiable statutory fee (₹10) and 30-day timeline → print-ready petition draft. |
| **3:30 – 4:45** | **4. Closed-Loop Civic Rectification** | **Our Core Innovation Differentiator**: Citizen submits case with Before-photo → Official reviews case on `/official` → Official uploads After-photo → Haversine distance verification (<25m) → Status moves to `RECTIFIED_PENDING_CITIZEN_CONFIRMATION` (officer cannot unilaterally close) → Citizen confirms and closes (or reopens if work is incomplete) → Export SHA-256 tamper-evident PDF. |
| **4:45 – 5:40** | **5. Scheme Eligibility Engine (`/schemes`)** | Demonstrate deterministic matching against 91 Central/State schemes. Show: `ELIGIBLE`, `NOT_ELIGIBLE`, and `NEEDS_INFORMATION`. Highlight that unknown facts never hallucinate eligibility. |
| **5:40 – 6:30** | **6. Statutory Rights Navigator (`/rights`)** | Show Consumer Protection (`/rights/consumer` → CPA 2019 pecuniary limit routing to District Commission & e-Jagriti) and Pan-India Tenancy adaptation (Tamil Nadu TNRRRLT Act 2017 vs. Maharashtra Rent Control Act 1999). |
| **6:30 – 7:10** | **7. Multilingual Architecture & Accessibility** | Demonstrate 23 BCP-47 Scheduled Indian language switching, Urdu RTL alignment, and Sarvam STT speech pipeline with browser safety fallbacks. |
| **7:10 – 7:50** | **8. Technical Architecture & Safety Design** | Display architecture diagram: *"The AI is never allowed to invent the law, authority, eligibility condition, fee, or deadline."* Highlight client-side PII privacy, server-only secret isolation, and SHA-256 tamper detection. |
| **7:50 – 8:20** | **9. Scalability & Feasibility** | Pan-India 36 States/UTs coverage, pluggable government-data adapters, and zero runtime dependencies on proprietary LLMs for legal outcomes. |
| **8:20 – 8:40** | **10. Conclusion & Call to Action** | *"InfoRight AI is designed to turn complex bureaucracy into a clear sequence of actions a citizen can actually follow."* |

---

## 🎙️ Spoken Script & Step-by-Step Flow

### 1. The Problem (0:00 – 0:40)
> *"Hello evaluators. In India today, over 1.4 billion citizens regularly encounter civic breakdowns, consumer fraud, tenancy disputes, and welfare access barriers. Yet, statutory rights and government portals are fragmented across hundreds of departmental websites, gazette notifications, and complex legal jargon. Most citizens do not know which officer is responsible, what statute applies, or what specific record to demand."*

### 2. The Solution & Technical Non-Delegation Principle (0:40 – 1:10)
> *"We built **InfoRight AI** to solve this problem. InfoRight AI turns plain-language civic complaints into structured, legally grounded action paths. But unlike generic conversational chatbots, InfoRight operates on a strict **Non-Delegation Principle**: AI interprets language and structures presentation, but verified government sources and deterministic legal rule engines strictly control legal outcomes, pecuniary jurisdictions, fees, and deadlines. The AI is never allowed to hallucinate the law."*

### 3. Core Citizen Flow (`/ask`) (1:10 – 3:30)
> *(Navigate to `/ask`)*  
> *"Let us look at the primary citizen workflow. A citizen in Coimbatore reports deep potholes and damaged trenches along DB Road, R.S. Puram. They can type or speak in any of 23 Scheduled Indian languages.*  
> *When the citizen enters postal PIN `641002`, our government-data resolver deterministically maps the jurisdiction: Tamil Nadu → Coimbatore District → Coimbatore City Municipal Corporation (CCMC) → Engineering and Roads Division.*  
> *The system generates a verified RTI application seeking work orders, estimates, and Measurement Book entries under Section 6(1) of the RTI Act 2005. Notice that the ₹10 statutory fee, 30-day response countdown, and Public Information Officer designation are completely grounded in official government data."*

### 4. Closed-Loop Civic Rectification Workflow (3:30 – 4:45)
> *(Navigate to `/dashboard`, then toggle to `/official`)*  
> *"Now, let's look at our most significant innovation: **Closed-Loop Civic Rectification**.*  
> *When the citizen submits their pothole grievance, they attach a geo-tagged 'Before' photograph.*  
> *On the Municipal Officer workspace (`/official`), the authorized engineer views the assigned case and updates it to `IN_PROGRESS`. After road crews complete the repair, the officer uploads an 'After' photograph.*  
> *The system computes a mathematical Haversine distance verification to confirm the repair took place within 25 meters of the complaint.*  
> *Crucially: the officer cannot unilaterally mark the case as resolved. The status transitions to `RECTIFIED_PENDING_CITIZEN_CONFIRMATION`.*  
> *The citizen inspects the side-by-side evidence on their dashboard. If satisfied, they confirm and close the case; if the repair was incomplete, they can reopen the cycle with one click. A tamper-evident PDF with SHA-256 checksum is generated for public record."*

### 5. Welfare Scheme Eligibility Reader (`/schemes`) (4:45 – 5:40)
> *(Navigate to `/schemes`)*  
> *"Next is our Welfare Discovery Engine. Evaluating against 91 verified Central and State welfare schemes, the system checks age, income, student status, and domicile.*  
> *Notice our truthful three-state output: `ELIGIBLE`, `NOT_ELIGIBLE`, or `NEEDS_INFORMATION`. If income or caste data is missing, the system never invents eligibility—it explicitly tells the citizen which fact is required."*

### 6. Statutory Rights Navigator (`/rights`) (5:40 – 6:30)
> *(Navigate to `/rights/consumer` and `/rights/tenant`)*  
> *"In our Rights Navigator, consumer claims evaluate pecuniary jurisdiction under the Consumer Protection Act 2019, routing claims under ₹50 Lakhs directly to District Commissions (DCDRC) and linking directly to the national e-Jagriti portal.*  
> *For tenancy disputes, the engine dynamically adapts across all 36 States and UTs—citing the Tamil Nadu TNRRRLT Act 2017 with its 3-month deposit cap, or the Maharashtra Rent Control Act 1999, while falling back to verification for unverified regions."*

### 7. Multilingual Architecture & Privacy (6:30 – 7:10)
> *(Switch language selector to Tamil, Hindi, and Urdu)*  
> *"InfoRight AI supports 23 Indian languages with true BCP-47 speech binding, full RTL layout support for Urdu, and client-side speech synthesis. All personal identity details remain 100% browser-local—no citizen names or phone numbers are ever sent to external LLMs."*

### 8. Technical Architecture & Scalability (7:10 – 8:20)
> *(Show Architecture Section from README)*  
> *"Architecturally, InfoRight AI is built with Next.js 16 (Turbopack), Tailwind CSS, TypeScript, and a layered service architecture: Source Registry, Authority Router, Tenancy & Consumer Engines, and Sarvam Speech Gateway. Every route handler is protected by 335 automated contract tests ensuring zero regressions."*

### 9. Conclusion (8:20 – 8:40)
> *"InfoRight AI bridges the gap between 1.4 billion Indian citizens and the complex legal institutions designed to serve them—delivering speed, transparency, and unshakeable statutory accuracy. Thank you."*
