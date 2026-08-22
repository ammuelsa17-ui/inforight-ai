# InfoRight AI — Hackathon Demonstration Script (3-5 Minutes)

**Objective**: Guide evaluators through the complete end-to-end civic and legal empowerment workflow, highlighting AI interpretation, deterministic law, real-time government data, and closed-loop civic rectification.

---

## Act 1: The Citizen Voice & Problem Intake (0:00 - 1:00)
1. **Homepage Introduction**:
   - *Presenter*: "InfoRight AI empowers Indian citizens to turn plain-language grievances into enforceable statutory actions—with zero legal hallucination."
   - Click **"Ask for Help"** (`/ask`).
2. **Multilingual Voice Input**:
   - Click the language selector at the top (Select **தமிழ் (Tamil)** or **हिन्दी (Hindi)**).
   - Click **"Voice: Tamil"** beside the input box.
   - *Presenter*: "We support 23 Scheduled Indian languages, dynamically binding to regional BCP-47 locales with server-side Sarvam STT fallback."
   - Select issue: *"Pothole on DB Road, RS Puram, Coimbatore"* (or speak into the mic).
   - Enter PIN Code: `641002`.

---

## Act 2: Pan-India Authority & Source-Grounded Resolution (1:00 - 2:00)
1. **Intelligent Triage & Routing**:
   - Click **"Analyze My Problem"**.
   - System automatically resolves:
     - **Location**: Tamil Nadu → Coimbatore District.
     - **Competent Local Body**: Coimbatore City Municipal Corporation (CCMC).
     - **Department**: Engineering & Roads Division.
     - **RTI Public Authority**: Assistant Executive Engineer / CPIO, CCMC.
2. **Zero Legal Hallucination Provenance**:
   - Show the **Source Badge**: Shows exact provenance (`SRC-CCMC-PORTAL-01`, Section 6(1) RTI Act 2005).
   - *Presenter*: "Notice that AI drafts the request, but all statutory fees (₹10 Central/State) and 30-day timelines are deterministic and source-grounded."

---

## Act 3: Closed-Loop Civic Rectification Workflow (2:00 - 3:30)
1. **Citizen Case Creation with Before-Evidence**:
   - Attach a geo-tagged "Before" photo of the pothole.
   - Click **"Create Tracked Case"** → redirects to Citizen Dashboard (`/dashboard`).
   - Status: `SUBMITTED`.
2. **Officer Role Transition**:
   - Click the top navigation switch: Toggle to **"Municipal Officer Mode"** (`/official`).
   - Open the case in the Officer queue → Change status to `IN_PROGRESS`.
   - Officer uploads the "After" repair photo with location metadata.
   - Click **"Submit Rectification Proof"**.
   - Status updates strictly to: `RECTIFIED_PENDING_CITIZEN_CONFIRMATION`.
   - *Presenter*: "Notice the system blocks the officer from unilaterally closing the case. Closure belongs strictly to the citizen."
3. **Location Consistency & Deterministic Haversine Comparison**:
   - Show the **Haversine Distance Comparison**: Confirms repair was executed within 25 meters (`CONSISTENT`).
4. **Citizen Confirmation**:
   - Switch back to **Citizen Mode** (`/dashboard/cases/[id]`).
   - Review side-by-side Before/After evidence cards.
   - Citizen clicks **"Confirm Rectification & Close Case"** (or demonstrates "Reopen Cycle" if work is incomplete).
   - Download the official **Rectification Evidence Record (PDF)** with SHA-256 integrity checksum.

---

## Act 4: Pan-India Rights & Scheme Matcher (3:30 - 4:30)
1. **Consumer & Tenancy Rights Navigator**:
   - Navigate to `/rights/consumer` → Enter ₹45,000 laptop refund claim.
   - Evaluates pecuniary jurisdiction under CPA 2019: routes to **District Commission (DCDRC)** and **e-Jagriti** (`https://e-jagriti.gov.in/`).
   - Navigate to `/rights/tenant` → Select **Tamil Nadu** vs. **Maharashtra** to show state-specific tenancy law adaptation (TNRRRLT Act 2017 vs. MRCA 1999).
2. **Welfare Scheme Eligibility Reader**:
   - Navigate to `/schemes` → Filter by female student in Tamil Nadu.
   - Evaluates criteria against **Pudhumai Penn Scheme** and **myScheme** with direct government links.

---

## Act 5: Conclusion (4:30 - 5:00)
- *Presenter*: "InfoRight AI combines multilingual AI accessibility with deterministic legal accuracy and closed-loop civic accountability for all 1.4 billion citizens across India."
