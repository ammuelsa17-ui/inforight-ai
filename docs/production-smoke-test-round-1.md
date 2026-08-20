# InfoRight AI — Production Smoke Test Report (Round 1)

> **Target Environment**: Production Deployment (`https://inforight-ai.vercel.app/`)
> **Date**: 2026-08-20
> **Tester**: Harsha (`ammuelsa17-ui`)

---

## 1. Route-by-Route Verification Matrix

| Route | Page Loads | Mobile Layout (390px) | Empty Input Handling | Valid Submission | Result Displayed | Official Links Open | Console Errors | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`/`** (Home Landing) | ✓ Yes | ✓ Clean flex layout | N/A | N/A | N/A | ✓ Yes | 0 Errors | **PASS** |
| **`/ask`** (RTI Drafting) | ✓ Yes | ✓ Responsive form | ✓ Disables submit | ✓ Generates RTI | ✓ 3–5 Questions | ✓ HTTPS | 0 Errors | **PASS** |
| **`/rights`** (Rights Overview) | ✓ Yes | ✓ 1-col card grid | N/A | N/A | N/A | ✓ HTTPS | 0 Errors | **PASS** |
| **`/rights/consumer`** | ✓ Yes | ✓ Form wraps clean | ✓ Form validation | ✓ Returns guidance | ✓ Escalation card | ✓ e-Jagriti & 1915 | 0 Errors | **PASS** |
| **`/rights/tenant`** | ✓ Yes | ✓ Form wraps clean | ✓ Form validation | ✓ Returns guidance | ✓ Rent court warning | ✓ Rent Authority | 0 Errors | **PASS** |
| **`/rights/workplace`** | ✓ Yes | ✓ Form wraps clean | ✓ Form validation | ✓ Returns guidance | ✓ SAMADHAN 2.0 | ✓ SAMADHAN 2.0 | 0 Errors | **PASS** |
| **`/schemes`** (Scheme Matcher) | ✓ Yes | ✓ Questionnaire wraps | ✓ Validates age/income | ✓ Rule match | ✓ Matched schemes | ✓ myScheme | 0 Errors | **PASS** |
| **`/sources`** (Registry) | ✓ Yes | ✓ 1-col source grid | N/A | N/A | N/A | ✓ All HTTPS links | 0 Errors | **PASS** |

---

## 2. Five Mandatory Scenario Smoke Tests

### Scenario 1: Coimbatore Road Repair RTI
* **Input**: Potholes and broken pavement along DB Road near R.S. Puram, Coimbatore.
* **Network Inspection**: Opened Chrome DevTools → Network tab → `POST /api/rti/generate`. `applicantName` and `applicantAddress` were **100% ABSENT** from the request payload. `applicantDataSentToAI === false` returned in response.
* **Result**: Generated 4 objective record requests for work order estimates, Measurement Book (MB) entries, completion certificates, and expenditure statements.
* **Actions**: Copy to clipboard copied plain text. **Print / Save as PDF** rendered clean print view hiding header/footer controls.
* **Status**: **PASS**

### Scenario 2: Laptop Refund Denial (Consumer)
* **Input**: E-commerce seller refused refund for laptop with broken screen display on delivery.
* **Result**: Simple-language summary of rights under Consumer Protection Act 2019. Displays **National Consumer Helpline (1915)** toll-free helpline & **e-Jagriti** Consumer Portal link (`https://consumerhelpline.gov.in/`).
* **Generated Draft**: Formal Consumer Representation Letter generated. Copy and Print work cleanly.
* **Status**: **PASS**

### Scenario 3: Security Deposit Withholding (Tenant)
* **Input**: Chennai landlord refusing to refund ₹50,000 security deposit post handover.
* **Result**: Rights summary under Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act 2017.
* **Jurisdiction Warning**: *"Tenancy regulations in Tamil Nadu are governed strictly by state rent control acts. Verify local rent court jurisdiction before filing."* displayed prominently in yellow alert block.
* **Status**: **PASS**

### Scenario 4: Unpaid Salary Recovery (Workplace)
* **Input**: Employer withholding 2 months' salary and final exit settlement post 30-day notice handover.
* **Result**: Statutory rights summary under Payment of Wages Act 1936 / Industrial Disputes Act 1947. Direct link to **SAMADHAN 2.0** Conciliation Portal (`https://betasamadhaan.labour.gov.in/`).
* **Jurisdiction Warning**: Central vs. State enterprise classification warning displayed.
* **Status**: **PASS**

### Scenario 5: Low-Income Female Student Scholarship (Schemes)
* **Input**: Female resident, Tamil Nadu, Age 20, Annual Income ₹1,50,000, Urban, Active Student, Class 6–12 TN Govt Schooling: Yes.
* **Result**: Matched 2 eligible schemes:
  1. `TN_POST_MATRIC_SCHOLARSHIP` (Post-Matric Scholarship for BC/MBC/DNC & SC/ST Students)
  2. `TN_MOOVALUR_RAMAMIRTHAM_PUDHUMAI_PENN` (Pudhumai Penn Scheme)
* **Match Explanation**: Lists exact reasons why profile matched (Income ₹1.5L < ₹2.5L threshold, confirmed TN government schooling).
* **Official Apply Link**: Opens **myScheme** portal (`https://www.myscheme.gov.in/`).
* **Status**: **PASS**

---

## 3. System Safeguards & Production Checks

| Safeguard Check | Verification Result | Status |
| :--- | :--- | :---: |
| **Submit Button Loading State** | Button text changes to *"Generating..."* / *"Navigating..."* and disables during API request. | ✓ **PASS** |
| **Double-Click Protection** | Disabled button state prevents duplicate concurrent fetch calls. | ✓ **PASS** |
| **PII Network Payload Exclusion** | DevTools Network payload contains zero applicant identity fields (`applicantName`, `applicantAddress`). | ✓ **PASS** |
| **Copy to Clipboard** | Copies subject and letter body text cleanly without HTML tags. | ✓ **PASS** |
| **Print / Save as PDF** | `@media print` CSS rules hide navbar, background gradients, and action buttons. | ✓ **PASS** |
| **Official HTTPS Links** | All external links (`https://consumerhelpline.gov.in/`, `https://betasamadhaan.labour.gov.in/`, `https://www.myscheme.gov.in/`) use secure HTTPS protocols. | ✓ **PASS** |
| **Browser Console Health** | 0 red runtime errors or unhandled promise rejections. | ✓ **PASS** |
