# RTI Engine Test Cases & Verification Suite

This document defines the automated and manual verification suite for the InfoRight AI RTI Engine (`feature/rti-engine`).

---

## 1. Core Verification Test Cases

### Case 1: Valid Coimbatore Road-Maintenance Request
* **Input**:
  ```json
  {
    "issue": "Potholes and broken asphalt on Mettupalayam Road near R.S. Puram junction causing traffic hazard.",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "localBodyName": "Coimbatore City Municipal Corporation",
    "locality": "R.S. Puram",
    "ward": "Ward 23",
    "dateRange": "2025-01-01 to 2026-02-01",
    "sourceIds": ["CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]
  }
  ```
* **Expected Mode**: `"ai"`
* **Expected Authority**:
  ```json
  {
    "designation": "Public Information Officer",
    "organization": "Coimbatore City Municipal Corporation",
    "state": "Tamil Nadu",
    "verified": true
  }
  ```
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]`
* **Expected Privacy Result**: `applicantDataSentToAI: false`. Payload contains zero personal data.
* **Pass Condition**: Output schema is valid, mode is `"ai"`, authority is marked `verified: true`, question count is between 3 and 5, and citation IDs match the allowlist.

---

### Case 2: Vague "Why wasn't the road repaired?" Complaint
* **Input**:
  ```json
  {
    "issue": "Why wasn't the road repaired in Ward 12? Who is responsible for this delay and negligence?",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "localBodyName": "Coimbatore City Municipal Corporation",
    "locality": "Gandhipuram",
    "sourceIds": ["CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]
  }
  ```
* **Expected Mode**: `"ai"` (or `"fallback"` if AI fails)
* **Expected Authority**: `organization: "Coimbatore City Municipal Corporation"`, `verified: true`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]`
* **Expected Privacy Result**: `applicantDataSentToAI: false`
* **Pass Condition**: The subjective complaint ("Why wasn't...", "Who is responsible...") is converted into 3–5 objective, record-based requests (e.g. certified copies of sanctioned estimates, tender documents, inspection reports, MB entries, and expenditure statements). Zero subjective questions are present in output.

---

### Case 3: Phone Number Removed Before Gemini
* **Input**:
  ```json
  {
    "issue": "Deep potholes near Cross Cut Road. Call me at 9876543210 or 0422-2345678 for details.",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "localBodyName": "Coimbatore City Municipal Corporation",
    "locality": "Gandhipuram",
    "sourceIds": ["CCMC_RTI_AUTHORITY"]
  }
  ```
* **Expected Mode**: `"ai"`
* **Expected Authority**: `organization: "Coimbatore City Municipal Corporation"`, `verified: true`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY"]`
* **Expected Privacy Result**: In-text phone numbers (`9876543210`, `0422-2345678`) are detected and redacted to `[REDACTED_PHONE]` before constructing the Gemini payload. `applicantDataSentToAI: false`.
* **Pass Condition**: `sanitizedIssue` sent to Gemini contains no digits resembling phone numbers. Output validation passes.

---

### Case 4: Email Removed Before Gemini
* **Input**:
  ```json
  {
    "issue": "Road re-tarring incomplete. Contact citizen.tester@example.com for site photos.",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "localBodyName": "Coimbatore City Municipal Corporation",
    "locality": "Peelamedu",
    "sourceIds": ["CCMC_RTI_AUTHORITY"]
  }
  ```
* **Expected Mode**: `"ai"`
* **Expected Authority**: `organization: "Coimbatore City Municipal Corporation"`, `verified: true`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY"]`
* **Expected Privacy Result**: Email address (`citizen.tester@example.com`) is redacted to `[REDACTED_EMAIL]`. `applicantDataSentToAI: false`.
* **Pass Condition**: `sanitizedIssue` sent to Gemini contains no email pattern. Output validation passes.

---

### Case 5: Aadhaar-like Number Removed Before Gemini
* **Input**:
  ```json
  {
    "issue": "Damaged storm drain along Avinashi Road. Reference ID 5489 1234 9876 attached.",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "localBodyName": "Coimbatore City Municipal Corporation",
    "locality": "Peelamedu",
    "sourceIds": ["CCMC_RTI_AUTHORITY"]
  }
  ```
* **Expected Mode**: `"ai"`
* **Expected Authority**: `organization: "Coimbatore City Municipal Corporation"`, `verified: true`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY"]`
* **Expected Privacy Result**: 12-digit Aadhaar pattern (`5489 1234 9876`) is redacted to `[REDACTED_ID]`. `applicantDataSentToAI: false`.
* **Pass Condition**: `sanitizedIssue` sent to Gemini contains no 12-digit identity pattern. Output validation passes.

---

### Case 6: `applicantName` or `applicantAddress` Field Rejected
* **Input**:
  ```json
  {
    "issue": "Potholes on Trichy Road.",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "localBodyName": "Coimbatore City Municipal Corporation",
    "locality": "Singanallur",
    "sourceIds": ["CCMC_RTI_AUTHORITY"],
    "applicantName": "John Doe",
    "applicantAddress": "123 Main Street"
  }
  ```
* **Expected Mode**: `"rejected"` (or immediate deterministic `"fallback"` abort)
* **Expected Authority**: N/A (Request rejected by schema validation)
* **Expected Citation IDs**: N/A
* **Expected Privacy Result**: Schema validator rejects incoming payload due to prohibited personal data fields (`applicantName`, `applicantAddress`). Gemini API is **never invoked**.
* **Pass Condition**: Request fails schema validation before API call. HTTP 400 Bad Request or immediate fallback returned with `applicantDataSentToAI: false`.

---

### Case 7: Invalid Citation ID Activates Fallback
* **Input**:
  ```json
  {
    "issue": "Road cave-in near Ukkadam bus stand.",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "localBodyName": "Coimbatore City Municipal Corporation",
    "locality": "Ukkadam",
    "sourceIds": ["INVALID_UNTRUSTED_SOURCE_999"]
  }
  ```
* **Expected Mode**: `"fallback"`
* **Expected Authority**: `organization: "Coimbatore City Municipal Corporation"`, `verified: true`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]`
* **Expected Privacy Result**: `applicantDataSentToAI: false`
* **Pass Condition**: Server allowlist intersection filters out `INVALID_UNTRUSTED_SOURCE_999`. Fallback mode activates, returning deterministic fallback citation IDs and warning.

---

### Case 8: Malformed Gemini JSON Activates Fallback
* **Input**: Valid Coimbatore request payload, but Gemini returns truncated or invalid JSON string (e.g. `{ "subject": "Road repair", "questions": [`).
* **Expected Mode**: `"fallback"`
* **Expected Authority**: `organization: "Coimbatore City Municipal Corporation"`, `verified: true`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]`
* **Expected Privacy Result**: `applicantDataSentToAI: false`
* **Pass Condition**: JSON parse failure triggers safe fallback mode without throwing unhandled exceptions.

---

### Case 9: Gemini Request Exceeding Configured Server Timeout Activates Fallback
* **Input**: Valid Coimbatore request payload, but Gemini request exceeding the configured server timeout or returning HTTP 503/429.
* **Expected Mode**: `"fallback"`
* **Expected Authority**: `organization: "Coimbatore City Municipal Corporation"`, `verified: true`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]`
* **Expected Privacy Result**: `applicantDataSentToAI: false`
* **Pass Condition**: Server timeout signal triggers fallback engine immediately within response SLA.

---

### Case 10: Non-Coimbatore Authority Marked Unverified
* **Input**:
  ```json
  {
    "issue": "Road repair pending near Madurai Railway Station.",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "localBodyName": "Madurai Municipal Corporation",
    "locality": "Town Hall",
    "sourceIds": ["RTI_ACT_2005_AMENDED"]
  }
  ```
* **Expected Mode**: `"fallback"` (or `"ai"` if valid national citation)
* **Expected Authority**:
  ```json
  {
    "designation": "Public Information Officer",
    "organization": "Madurai Municipal Corporation",
    "state": "Tamil Nadu",
    "verified": false
  }
  ```
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED"]`
* **Expected Privacy Result**: `applicantDataSentToAI: false`
* **Pass Condition**: Authority `verified` flag is set to `false`. Warning states that the public authority has not been independently verified. Citation IDs include only national RTI Act reference.

---

### Case 11: Empty Validated Citation Allowlist Activates Safe National Fallback
* **Input**: Valid location request, but server allowlist intersection yields zero matching regional citation IDs.
* **Expected Mode**: `"fallback"`
* **Expected Authority**: `organization: normalizedLocalBodyName`, `verified: isVerifiedCoimbatoreAuthority`
* **Expected Citation IDs**: `["RTI_ACT_2005_AMENDED"]`
* **Expected Privacy Result**: `applicantDataSentToAI: false`
* **Pass Condition**: Fallback activates using only the safe national RTI source citation (`RTI_ACT_2005_AMENDED`).

---

### Case 12: Gemini Returns Subjective Questions Activates Fallback
* **Input**: Valid request, but Gemini generates subjective questions (e.g. "Why was the road not repaired?" or "Who is responsible for the delay?").
* **Expected Mode**: `"fallback"`
* **Expected Authority**: `organization: normalizedLocalBodyName`, `verified: isVerifiedCoimbatoreAuthority`
* **Expected Citation IDs**: `fallbackCitationIds`
* **Expected Privacy Result**: `applicantDataSentToAI: false`
* **Pass Condition**: Output validator detects non-record/subjective questions, rejects the AI output, and activates deterministic fallback mode with objective record-based requests.

---

## 2. Main Demo Scenario & Narration Plan

### Demo Scenario Setup:
* **Locality**: R.S. Puram, Coimbatore City Municipal Corporation, Ward 23.
* **Problem**: Severe road surface degradation, unpaved trenches, and missing inspection records.
* **Date Range**: Previous 12 months (2025-01-01 to 2026-02-01).
* **Expected Record Requests Generated**:
  1. Sanctioned work order and administrative approval estimates.
  2. Contractor agreement and tender documents.
  3. Measurement Book (MB) entries and quality control inspection reports.
  4. Disbursed funds and expenditure statement.
  5. Complaint register entries and duty allocation records for Ward 23 inspecting engineer.

### 3-Minute Demo Narration Plan:
1. **0:00 - 0:45 (Problem Statement & Privacy Guarantee)**: Show citizen entering road problem in R.S. Puram. Emphasize that personal details (Name, Address) stay strictly in browser memory and are never sent to AI.
2. **0:45 - 1:45 (Deterministic Authority & AI Generation)**: Show instant deterministic PIO resolution for Coimbatore City Municipal Corporation (`verified: true`). Show structured RTI question generation with official citation cards.
3. **1:45 - 2:30 (Reliability & Fallback Demonstration)**: Activate the internal demo failure toggle to simulate Gemini timeout. Show instant fallback template activation with zero downtime.
4. **2:30 - 3:00 (Export & Privacy Summary)**: Show editable document preview, copy to clipboard, and PDF export with client-side applicant details filled locally.

---

## 3. Vercel Deployment & Secret Safety Checklist

* [ ] `GEMINI_API_KEY` set in Vercel Environment Variables (Production & Preview).
* [ ] `.env.local` remains uncommitted and ignored in `.gitignore`.
* [ ] `npm run lint` passes clean with zero errors.
* [ ] `npm run build` succeeds clean with zero build warnings.
* [ ] Privacy boundary verified: Zero PII logged in Vercel server logs.

---

## 4. Architecture & Limitations Summary

### Architecture Highlights:
* **Client-Side Privacy**: Applicant name, address, and signature handled in browser state.
* **Deterministic Core**: Authority resolution, citation allowlisting, and fallback templates execute deterministically without AI dependency.
* **AI Guardrails**: Gemini restricted strictly to objective, record-based question generation.

### Limitations:
* Phase 1 official verification is curated specifically for Coimbatore City Municipal Corporation. Other municipal authorities display an unverified status warning.
* Phase 1 does not submit applications automatically to government portals (applicant prints or downloads PDF for manual submission).
