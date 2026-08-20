# InfoRight AI — Version 2.0 Demonstration Test Cases

This document details the five mandatory demonstration use cases for InfoRight AI Version 2.0.

---

## Scenario 1: RTI Drafting Agent (Civic Road Repair)

* **Input Issue**: *"Deep potholes and broken pavement along DB Road near R.S. Puram, Coimbatore, causing severe traffic congestion and accidents."*
* **Location**: State: *Tamil Nadu*, District: *Coimbatore*, Local Body: *Coimbatore Corporation*, Locality: *R.S. Puram*, Ward: *Ward 23*.
* **Expected Route**: `/ask` → `POST /api/rti/generate`
* **Expected Result**: 3 to 5 objective requests for certified copies of existing government records under Section 6(1) of RTI Act 2005.
* **Citation IDs**: `RTI_ACT_2005_AMENDED`, `CCMC_RTI_AUTHORITY`, `CCMC_ENGINEERING_ROADS`.
* **Authority**: Public Information Officer, Coimbatore City Municipal Corporation (Verified CCMC Authority).
* **Jurisdiction Warning**: None (Coimbatore authority verified against curated registry).
* **Generated Document**: Formatted RTI Application draft requesting certified copies of road work estimates, Measurement Book (MB) entries, completion certificates, and expenditure statements.
* **Copy Result**: Subject and body copied cleanly to clipboard without markup.
* **Print / PDF Result**: Clean `@media print` layout hiding navbar, background gradients, and action buttons.
* **Status**: **PASS (Verified via `npm run test:api`)**

---

## Scenario 2: Consumer Dispute Navigator (Online Laptop Refund Denial)

* **Input Issue**: *"Purchased an electronics laptop online 2 weeks ago; item delivered with broken screen display. E-commerce seller and customer care refused refund, closing ticket arbitrarily."*
* **Location**: State: *Tamil Nadu*.
* **Expected Route**: `/rights/consumer` → `POST /api/rights/navigate`
* **Expected Result**: Simple-language rights summary under Consumer Protection Act 2019 & E-Commerce Rules 2020, statutory escalation pathways.
* **Citation IDs**: `CONSUMER_PROTECTION_ACT_2019`, `NATIONAL_CONSUMER_HELPLINE`, `E_JAGRITI_PORTAL`.
* **Statutory Escalation**: National Consumer Helpline (Call 1915) & **e-Jagriti** Consumer Portal (`https://consumerhelpline.gov.in/`).
* **Jurisdiction Warning**: None (National Consumer Protection Act applies across India).
* **Generated Document**: Generated Draft Consumer Representation Letter addressed to Customer Grievance Redressal Officer.
* **Copy Result**: Representation letter copied cleanly to clipboard.
* **Print / PDF Result**: Print layout renders formal representation letter on clean white background.
* **Status**: **PASS (Verified via `npm run test:api`)**

---

## Scenario 3: Tenant Rights Navigator (Security Deposit Withholding)

* **Input Issue**: *"Vacated rental apartment in Chennai 3 weeks ago after full key handover and utility bill settlement. Landlord refuses to return ₹50,000 security deposit without repair bills."*
* **Location**: State: *Tamil Nadu*.
* **Expected Route**: `/rights/tenant` → `POST /api/rights/navigate`
* **Expected Result**: Rights breakdown under Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act 2017.
* **Citation IDs**: `TN_RENT_ACT_2017`, `STATE_RENT_AUTHORITY`.
* **Statutory Escalation**: State Rent Authority & Rent Court (`https://www.tn.gov.in/`).
* **Jurisdiction Warning**: *"Tenancy regulations in Tamil Nadu are governed strictly by state rent control acts. Verify local rent court jurisdiction before filing."*
* **Generated Document**: Generated Draft Tenant Security Deposit Notice Letter addressed to Landlord/Property Manager.
* **Copy Result**: Tenant notice letter copied cleanly to clipboard.
* **Print / PDF Result**: Formal notice letter formatted cleanly for PDF saving.
* **Status**: **PASS (Verified via `npm run test:api`)**

---

## Scenario 4: Workplace Rights Navigator (Unpaid Salary Dues)

* **Input Issue**: *"Resigned 2 months ago post 30-day notice handover. Employer withholding final salary payment for 2 months and full and final settlement dues."*
* **Location**: State: *Tamil Nadu*.
* **Expected Route**: `/rights/workplace` → `POST /api/rights/navigate`
* **Expected Result**: Statutory rights summary under Payment of Wages Act 1936 and Industrial Disputes Act 1947.
* **Citation IDs**: `INDUSTRIAL_DISPUTES_ACT_1947`, `SAMADHAN_2_PORTAL`.
* **Statutory Escalation**: **SAMADHAN 2.0** Conciliation Portal (`https://betasamadhaan.labour.gov.in/`) & District Labour Commissioner.
* **Jurisdiction Warning**: None (Payment of Wages Act applies nationally).
* **Generated Document**: Generated Draft Employer Grievance Letter addressed to HR Head / Managing Director.
* **Copy Result**: Grievance letter copied cleanly to clipboard.
* **Print / PDF Result**: Formal employer grievance letter renders cleanly in print preview.
* **Status**: **PASS (Verified via `npm run test:api`)**

---

## Scenario 5: Scheme Eligibility Reader (Low-Income Tamil Nadu Student)

* **Input Profile**: State: *Tamil Nadu*, Age: *20*, Annual Income: *₹1,50,000*, Occupation: *Student*, Active Student: *True*, Area: *Urban*.
* **Expected Route**: `/schemes` → `POST /api/schemes/match`
* **Expected Result**: Rule-based matching against verified welfare scheme rules (myScheme reference framework).
* **Matched Schemes**:
  1. `TN_POST_MATRIC_SCHOLARSHIP` (Tamil Nadu Post-Matric Scholarship Scheme)
  2. `TN_MOOVALUR_RAMAMIRTHAM_PUDHUMAI_PENN` (Pudhumai Penn Scheme)
* **Citation IDs**: `MYSCHEME_PLATFORM`, `TN_DBCWP_DEPT`.
* **Match Reasons**: Domicile matches Tamil Nadu; income (₹1.5L) below ₹2.5L threshold; confirmed active student status.
* **Official Apply Link**: **myScheme** National Portal (`https://www.myscheme.gov.in/`).
* **Department Disclaimer**: *"Final eligibility is determined strictly by the respective government department."*
* **Copy / Print Result**: Matched scheme cards and required document checklist render formatted on screen.
* **Status**: **PASS (Verified via `npm run test:api`)**
