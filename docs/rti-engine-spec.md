# RTI Engine Specification & Preparation Plan

This document outlines the AI engine architecture, prompt requirements, validation guardrails, and deterministic fallback template for the `feature/rti-engine` module.

---

## 1. Privacy Boundary Guardrails

The engine enforces a strict multi-layer privacy boundary prior to invoking the Gemini API:

* **Strict Schema Parsing**: Parse incoming requests using the frozen `GenerateRtiRequest` schema. Reject any request containing unknown or unexpected fields.
* **Prohibited Request Fields**: `applicantName`, `applicantAddress`, `phoneNumber`, `email`, `aadhaar`, `signature`.
* **Explicit Payload Construction**: Construct the payload sent to Gemini strictly by picking permitted sanitized fields:
  * `sanitizedIssue`
  * `state`
  * `district`
  * `localBodyName`
  * `locality`
  * `ward`
  * `dateRange`
  * `validatedSourceIds`

  > **Crucial Rule**: Raw client-provided `sourceIds` must **never** be sent directly to Gemini. **Never spread** (`...req`) the raw request object.
* **In-text PII Detection & Redaction**: Automatically scan the `issue` string for phone numbers, email addresses, and 12-digit Aadhaar-like numbers. Redact detected patterns to produce `sanitizedIssue`.
* **Civic Asset Location Context**: Treat `locality`, `ward`, and road location strictly as civic asset/public infrastructure locations—never as applicant residential address data.
* **Fail-Safe Fallback Trigger**: If suspected personal data is detected and cannot be safely removed, the engine aborts the Gemini API call and immediately activates deterministic fallback mode.
* **Validation Indicator**: `validation.applicantDataSentToAI` is explicitly set to `false` only after all privacy pre-checks and redactions pass cleanly.

---

## 2. Citation Allowlist & Untrusted Source Validation

* **Untrusted Client Inputs**: Client-provided `sourceIds` in the request are treated as untrusted data.
* **Server-side Allowlist Intersection**: Prior to calling Gemini, the server intersects client-provided `sourceIds` against the local curated official source allowlist to produce `validatedSourceIds`. Only verified, allowlisted citation IDs are passed to Gemini.

---

## 3. Gemini System Prompt Constraints

Gemini is strictly constrained to generate only structured text content:

### Allowed Output Fields:
1. `subject`: Concise title for the RTI application (e.g., "Request for official records regarding road repair and maintenance").
2. `applicationBody`: Short, objective description of the road civic issue.
3. `questions`: Array of **3 to 5 record-based requests** for existing government records.
4. `citationIds`: Array of citation IDs selected strictly from `validatedSourceIds`.

### Prohibited AI Decisions:
* Gemini must **never** determine the Public Authority or PIO details.
* Gemini must **never** determine RTI fees, legal sections, official URLs, or verification status.
* Gemini must **never** include applicant personal information.
* Gemini must **never** generate subjective questions (e.g., "Why was the road not repaired?" or "Who is responsible?").

---

## 4. Structured-Output Validation Plan

The engine runs a two-stage validation pipeline on Gemini response:

```ts
interface ValidationPipelineResult {
  schemaValid: boolean;     // All required fields present with correct types
  citationsValid: boolean;  // Every citationId exists in allowlisted sources
  questionCount: number;    // Must be between 3 and 5
  applicantDataSentToAI: false;
}
```

* If `schemaValid` is `false`, `citationsValid` is `false`, or `questionCount` is outside `[3, 5]`, the response is rejected and **fallback mode** is automatically activated.

---

## 5. Deterministic Authority Construction & Fallback Engine Template

### Authority Verification Logic:
```ts
const isVerifiedCoimbatoreAuthority =
  normalizedLocalBodyName === "coimbatore city municipal corporation" &&
  normalizedState === "tamil nadu" &&
  sourceRegistry.has("CCMC_RTI_AUTHORITY") &&
  sourceRegistry.has("CCMC_ENGINEERING_ROADS");

// Normalization is case-insensitive and removes redundant
// whitespace and surrounding punctuation.

const fallbackCitationIds = isVerifiedCoimbatoreAuthority
  ? [
      "RTI_ACT_2005_AMENDED",
      "CCMC_RTI_AUTHORITY",
      "CCMC_ENGINEERING_ROADS",
    ]
  : ["RTI_ACT_2005_AMENDED"];
```

### Deterministic Fallback Template:
Fallback activates when Gemini fails, output validation fails, citations are invalid, or suspected personal information cannot be safely removed. Successfully redacted input may proceed to Gemini.

```ts
{
  mode: "fallback",
  subject: "Request for information regarding road maintenance, budget allocation, and inspection records",
  applicationBody: "Application filed under the Right to Information Act seeking official records and inspection reports for road work at the specified location.",
  questions: [
    "Certified copies of sanctioned estimates and administrative/technical approvals.",
    "Certified copies of tender documents, work orders and contractor agreements.",
    "Certified copies of Measurement Book entries, inspection reports and quality-control reports.",
    "Records showing funds sanctioned, released and spent, including expenditure statements.",
    "Copies of complaint-register entries, action-taken records and official duty-allocation or completion-schedule records."
  ],
  authority: {
    designation: "Public Information Officer",
    organization: normalizedLocalBodyName,
    state: normalizedState,
    verified: isVerifiedCoimbatoreAuthority
  },
  citationIds: fallbackCitationIds,
  validation: {
    schemaValid: true,
    citationsValid: true,
    questionCount: 5,
    applicantDataSentToAI: false
  },
  warning: isVerifiedCoimbatoreAuthority
    ? "AI generation unavailable. Verified standard record-based RTI template activated."
    : "AI generation unavailable. Standard record-based RTI template activated. The entered public authority has not been independently verified; confirm it before filing."
}
```

---

## 6. Local Environment Configuration

* The Gemini API key value is stored only in the ignored `.env.local` file and is never documented or printed.
* `.env.local` is currently ignored and untracked.
* Secret scanning must still be performed before every commit and deployment.
