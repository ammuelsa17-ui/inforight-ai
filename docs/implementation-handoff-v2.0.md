# InfoRight AI — Implementation Handoff v2.0

> **Platform Vision**: InfoRight AI understands a citizen’s problem, routes it to RTI drafting, rights navigation, or scheme eligibility matching, explains the procedure in simple language, populates the required document conversationally, grounds recommendations in verified official sources, and provides actionable exports.

---

## 1. Final Frozen Scope — Version 2.0

### 1.1 Module 1: RTI Drafting Agent (Implemented & Retained)
* Plain-language civic road issue input with RTI suitability check.
* Conversion of subjective complaints into 3–5 objective requests for certified record copies under Section 6(1) of RTI Act 2005.
* Deterministically constructed Public Information Officer (PIO) authority recommendation.
* Verified source allowlisting (`RTI_ACT_2005_AMENDED`, `CCMC_RTI_AUTHORITY`, `CCMC_ENGINEERING_ROADS`).
* Client-side applicant details merge, editable preview, copy to clipboard, print, and PDF export.
* Predetermined fallback template protection when AI generation fails.

### 1.2 Module 2: Rights Navigator
Supports three dispute categories:

| Category | Required Use Cases | Output / Deliverables |
| :--- | :--- | :--- |
| **Consumer** | Defective product, refund denied, service not delivered | Simple-language summary, evidence checklist, National Consumer Helpline (1915) & **e-Jagriti** portal escalation pathway, generated draft representation letter. |
| **Tenant** | Security deposit withholding, urgent repairs, eviction notice, rent dispute | Simple-language rights breakdown, evidence checklist, State Rent Authority escalation path, generated draft tenant representation letter. *Includes explicit state-jurisdiction variation warnings.* |
| **Workplace** | Unpaid salary, wrongful termination, grievance pathway | Applicable labor rights, evidence checklist, District Labor Commissioner / **SAMADHAN 2.0** (Central Industrial Disputes) escalation path, generated draft employer grievance letter. |

### 1.3 Module 3: Scheme Eligibility Reader (Rule-Based Matching)
Evaluates 10–15 verified National and Tamil Nadu welfare schemes using the **myScheme** platform as an official reference framework:
* **Inputs**: State, Age, Income Range, Occupation, Student Status, Rural/Urban location, Disability status (optional), Social category (optional).
* **Rule-Based Engine**: Matches schemes strictly using deterministic conditional rules returning `matched`, `notMatched`, or `verificationRequired` (Gemini explains results but does not decide eligibility).
* **Outputs**: Matching scheme list, reasons for match status, required documents checklist, official application link, last-verified date, and mandatory department disclaimer.

### 1.4 Module 4: Conversational Form-Filler (Shared Capability)
* Asks one clear question at a time across all modules.
* Auto-populates generated drafts:
  - Structured RTI Application Draft
  - Generated Draft Consumer Representation Letter
  - Generated Draft Tenant Representation Letter
  - Generated Draft Employer Grievance Letter
  - Scheme Application Checklist

### 1.5 Module 5: Bureaucracy Translator
Embedded simple-language translation block across all output pages:
```text
- What this means
- What you should do now
- Documents to collect
- Where to submit
- What to do if no response is received
```

---

## 2. Platform Architecture & Data Structures

### 2.1 Route Map
```text
/                       Service-selection landing page
/ask                    Unified problem entry & AI triage
/rti                    RTI drafting workflow
/rights                 Rights Navigator overview
/rights/consumer        Consumer dispute workflow
/rights/tenant          Tenant dispute workflow
/rights/workplace       Workplace dispute workflow
/schemes                Scheme eligibility matching workflow
/sources                Official source-transparency page
```

### 2.2 API Contract Endpoints
```text
POST /api/triage            Categorizes incoming citizen problem into service route or unsupported/emergency
POST /api/rti/generate      Frozen RTI drafting endpoint (retained from v1.0)
POST /api/rights/navigate   Generates procedural guidance & draft representation letter
POST /api/schemes/match     Rule-based welfare scheme eligibility matcher
```

### 2.3 Source Data Registry Schema (`src/types/api.ts`)
```ts
export interface SourceRecord {
  id: string;
  category: "rti" | "consumer" | "tenant" | "workplace" | "welfare";
  title: string;
  authority: string;
  officialUrl: string;
  jurisdiction: string;
  supports: string[];
  lastVerified: string;
  verificationStatus: "verified" | "partial";
}
```

---

## 3. Mandatory Demo Scenarios

1. **Coimbatore Road Potholes (RTI)**: DB Road pothole inspection and Measurement Book entries.
2. **Online Product Refund Denial (Consumer)**: E-commerce seller refusing refund; escalation to NCH (1915) & e-Jagriti.
3. **Tenant Security Deposit Withholding (Tenant)**: Landlord refusing deposit return in Chennai with Tamil Nadu Rent Act jurisdiction warning.
4. **Unpaid Salary Grievance (Workplace)**: Employer withholding 2 months' salary post-resignation; escalation via SAMADHAN 2.0 / Labor Commissioner.
5. **Low-Income Student Scholarship (Schemes)**: Post-matric scholarship matching referenced against myScheme eligibility rules.

---

## 4. Team Responsibilities

* **Harsha (AI, Backend & Integration)**: AI Triage API, Rights Navigator API, Scheme Matcher API, structured output validation, source allowlist intersection, deployment, and integration testing.
* **Abirami (Complete Frontend)**: Service landing page, unified problem entry interface, Rights Navigator forms & results, Scheme matcher form, conversational step UI, responsive sky-blue/indigo layout.
* **Mithun (Sources, Rules & Templates)**: Source registries (`src/data/sources/`), scheme rules (`src/data/schemes/`), complaint templates (`src/data/forms/`), official domain URL verification.

---

## 5. Development Order

1. Freeze Version 2.0 handoff (`docs/implementation-handoff-v2.0.md`).
2. Additive update to `docs/api-contract.md` (preserving RTI fields).
3. Mithun merges source registries and scheme rule definitions.
4. Abirami builds frontend routes & conversational step forms.
5. Harsha implements triage, rights navigation, and scheme matching APIs.
6. End-to-end integration & 5 demo scenario testing.
7. Update documentation, README, architecture, and redeploy to Vercel.
