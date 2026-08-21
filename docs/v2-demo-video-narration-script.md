# InfoRight AI — 3-to-5 Minute Demo Video Narration Script (v2.0)

**Target Duration**: 3:30 to 4:30 Minutes  
**Target URL**: [https://inforight-ai.vercel.app/](https://inforight-ai.vercel.app/)  
**Presenter**: Harsha / Team Lead  

---

## Video Scene-by-Scene Script & Action Sequence

### Scene 1: Introduction & Problem Statement (0:00 – 0:45)
* **Screen**: InfoRight AI Landing Page (`https://inforight-ai.vercel.app/`)
* **Voiceover**:
  > "Hello everyone! Welcome to **InfoRight AI** — a source-grounded legal rights, RTI drafting, and welfare scheme eligibility platform built to empower Indian citizens.  
  > Millions of citizens face severe bureaucratic friction when attempting to exercise their constitutional rights. Whether it's drafting a Right to Information application for a broken road, resolving a consumer refund dispute, recovering a withheld tenant security deposit, or finding eligible government schemes — citizens are hindered by legal jargon, complex portals, and fear of privacy leaks.  
  > InfoRight AI solves this with a unified, privacy-first platform that converts citizen problems into actionable legal drafts and verified administrative remedies."

---

### Scene 2: Unified Citizen Triage (`/ask`) (0:45 – 1:30)
* **Screen**: `/ask` Route
* **Action**: Type: *"Broken road and deep potholes along DB Road in Coimbatore causing accidents."* Click **Analyze & Triage**.
* **Voiceover**:
  > "Let's start with our **Unified Smart Problem Entry**. A citizen describes their grievance once in plain language.  
  > InfoRight AI automatically analyzes the issue and classifies it into the correct administrative pathway — in this case, a Right to Information application directed to the Public Information Officer of Coimbatore Corporation.  
  > Notice how the system guides the citizen to request certified copies of existing work orders and measurement books under Section 6(1) of the RTI Act, rather than asking subjective questions."

---

### Scene 3: RTI Generation & Zero-Trust Privacy Guardrail (1:30 – 2:30)
* **Screen**: RTI Generation Page & Developer Tools Network Inspection
* **Action**:
  1. Fill location details: District: *Coimbatore*, Local Body: *Coimbatore Corporation*, Locality: *R.S. Puram*.
  2. Fill Applicant Details: *K. Harsha*, *42 DB Road, Coimbatore*.
  3. Open DevTools Network Tab and click **Generate RTI Application Draft**.
* **Voiceover**:
  > "Next, we enter applicant details. Here is our critical security innovation: **Zero-Trust Privacy Isolation**.  
  > Watch our Network inspection. The `applicantName` and `applicantAddress` fields are strictly isolated to the browser client side. They are **never** sent to external AI APIs or backend route handlers.  
  > The server returns a structured, legal-compliant RTI application requesting 4 specific public records. The applicant's identity is merged locally in the browser memory for print and PDF generation."

---

### Scene 4: Rights Navigator & Deterministic Scheme Eligibility (2:30 – 3:30)
* **Screen**: `/rights/consumer`, `/rights/tenant`, `/schemes`
* **Action**:
  1. Navigate to `/rights/consumer`: Show National Consumer Helpline 1915 and e-Jagriti portal citation.
  2. Navigate to `/rights/tenant`: Show State Rent Authority guidance and Tamil Nadu jurisdiction warning.
  3. Navigate to `/schemes`: Filter low-income student profile (Income: ₹1,50,000, Student). Show matched scheme rationale for Post-Matric Scholarship.
* **Voiceover**:
  > "InfoRight AI also features the **Rights Navigator** and **Scheme Eligibility Engine**.  
  > For consumer laptop disputes, it provides immediate escalation to National Consumer Helpline 1915 and the e-Jagriti portal. For tenancy disputes, it enforces state-specific jurisdiction warnings linking to official Rent Authorities.  
  > In our Welfare Scheme matcher, eligibility evaluation is 100% deterministic — evaluating exact income caps (e.g. ₹2.5 Lakhs) against curated official registries like myScheme. Every match provides an explicit explanation of why the citizen qualifies."

---

### Scene 5: Bharat Language Access & Conclusion (3:30 – 4:15)
* **Screen**: Navbar Language Selector (English, Hindi, Tamil, Urdu RTL) & Print Preview
* **Action**:
  1. Switch language selector to Hindi and Tamil (show UI dictionaries) and Urdu (show `dir="rtl"` layout).
  2. Click **Print / Save as PDF** on the generated draft.
* **Voiceover**:
  > "Finally, InfoRight AI includes multilingual access infrastructure for 22 Scheduled Indian languages with full LTR and RTL direction support, backed by MeitY BHASHINI 2-step pipeline protocols and fail-safe English reference fallbacks.  
  > With 62 automated safety tests, zero console errors, and full mobile responsiveness, InfoRight AI is production-ready for Indian citizens. Thank you!"

---

### End of Video Recording Checklist
- [x] Recorded in 1080p Full HD
- [x] Clear audio narration
- [x] Network Tab PII inspection demonstrated
- [x] Print / Save as PDF dialog shown
- [x] Live URL displayed: `https://inforight-ai.vercel.app/`
