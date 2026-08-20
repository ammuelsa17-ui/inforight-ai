# InfoRight AI — P0/P1 Product Requirements & Positioning

## Strong Project Positioning

> **InfoRight AI** is a privacy-conscious RTI drafting agent that converts an ordinary civic complaint into precise requests for existing government records, recommends the responsible authority using deterministic rules, validates citations against official sources, and preserves document generation through a safe fallback when AI fails.

---

## P0 — Core Product Requirements (Required)

### 1. RTI Suitability Check
Before generating an application, the system evaluates if the user's input seeks existing government records or subjective opinions:
* **Explanatory Banner**: For inputs like *"Why was my road not repaired?"*, display:
  > *"RTI generally requests existing records rather than explanations or opinions. We converted your concern into requests for work orders, estimates, inspection reports and expenditure records."*

---

### 2. Guided Form-Filling Workflow
Conversational and step-by-step guided form structure:
1. Describe the civic problem.
2. Select state and district.
3. Enter local body name.
4. Enter locality, road, and ward details.
5. Choose relevant date range.
6. Review generated record-based requests.
7. Add applicant details locally (browser-only memory).
8. Export application (copy, print, PDF).

---

### 3. Clear Action Path & Guidance After Generation
The generated output includes:
* **Recommended Public Information Officer (PIO)**
* **Verified / Unverified Authority Status Badge**
* **Complete Formatted RTI Application Document**
* **Filing Checklist**: Steps to print, sign, attach IPO/court fee stamp, and post/hand-deliver.
* **Official Source Links**: Direct references to official government portals.
* **Verification Warning**: Display *"Verify authority before filing"* when authority is unverified.
* **Document Actions**: Inline Edit, Copy to Clipboard, Print, and PDF Download.

---

### 4. Unsupported-Request Handling
The engine handles non-RTI or invalid inputs gracefully:
* Private-company complaints
* Criminal emergencies (redirects to emergency services)
* Pure opinion/why requests
* Unrelated or nonsensical queries
* Missing required location details
* Incoming requests containing personal sensitive data (redirects to client-side input or fallback)

---

### 5. Source Transparency Cards
Each citation source card displays:
* **Source Title**
* **Responsible Public Authority**
* **Official Government Domain**
* **Verification Status** (`Verified` / `Unverified`)
* **Last Verification Date**
* **Supported Recommendation / Record Type**

---

### 6. Visible Trust Panel
Display a visible trust indicator with 6 verification checks:
```text
✓ Applicant identity stayed in the browser
✓ Civic input was checked for sensitive data
✓ Authority was selected deterministically
✓ AI response structure was validated
✓ Citation IDs were verified
✓ Safe fallback is available
```

---

## P1 — Strong Differentiator Features

* **Before-and-After Transformation Display**: Shows subjective complaint vs transformed objective record requests.
* **Internal Demo Failure Toggle**: Failure simulation mode for testing fallback reliability during live demos.
* **Editable Generated Questions**: Inline text editing for generated questions before export.
* **Downloadable PDF Document**: Client-side PDF generation formatted for official filing.
* **Mobile Responsiveness & Keyboard Accessibility**: Fully accessible across touch and keyboard navigation.
* **Simple-Language Step Explanations**: Plain English guidance for citizens at each step.
* **Three Prefilled Demo Scenarios**:
  1. Coimbatore R.S. Puram road potholes.
  2. Peelamedu unpaved trench & storm drain damage.
  3. Gandhipuram road re-tarring inspection records.
* **Citizen Feedback**: Helpful / Not Helpful rating buttons.

---

## Explicit Phase 1 Exclusions (Do Not Implement)

* Consumer-rights navigator
* Scheme eligibility reader
* Live image upload and geotagging
* User authentication or application history
* Nationwide PIO database
* General RAG / vector database
* Automatic government-portal submission
* Voice or multilingual support before P0 works
