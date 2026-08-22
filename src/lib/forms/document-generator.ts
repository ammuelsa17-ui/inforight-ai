import { OfficialFormDefinition } from "@/types/form-filler";

export interface FormattedDocumentOutput {
  documentId: string;
  formId: string;
  formName: string;
  formCode?: string;
  formCategory: "OFFICIAL_PRESCRIBED_FORM" | "FILING_READY_DRAFT";
  categoryBadge: string;
  authority: string;
  subject: string;
  title: string;
  plainText: string;
  htmlContent: string;
  submissionInstructions: string[];
  statutoryFeeText: string;
  filingPortal?: string;
  isPrivateLocalOnly: boolean;
}

/**
 * Formats citizen form answers into a legal-grade formal document suitable for
 * print, PDF export, or online government portal submission.
 */
export function generateFilingDocument(
  form: OfficialFormDefinition,
  answers: Record<string, any>,
  uploadedDocIds: string[] = []
): FormattedDocumentOutput {
  const isOfficialPrescribed = form.form_category === "OFFICIAL_PRESCRIBED_FORM";
  const categoryBadge = isOfficialPrescribed
    ? "OFFICIAL PRESCRIBED FORM"
    : "FILING-READY DRAFT PETITION";

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const applicantName =
    answers.applicant_name ||
    answers.appellant_name ||
    answers.complainant_name ||
    answers.tenant_name ||
    answers.workman_name ||
    answers.employee_name ||
    "[Applicant Name]";

  const applicantAddress =
    answers.applicant_address ||
    answers.appellant_address ||
    answers.complainant_address ||
    answers.premises_address ||
    answers.establishment_address ||
    "[Address for Communication]";

  let subject = `Application regarding ${form.form_name}`;
  let specificBody = "";
  let legalDeclaration = "";
  let recipientAuthorityBlock = `TO,\nTHE COMPETENT AUTHORITY\n${form.authority}\n${form.jurisdiction.state_ut}, INDIA`;

  switch (form.form_id) {
    case "FORM-RTI-6-1": {
      subject = `APPLICATION FOR SEEKING INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005`;
      recipientAuthorityBlock = `TO,\nTHE PUBLIC INFORMATION OFFICER (CPIO / SPIO)\n${answers.public_authority_name || "[Name of Public Authority / Department]"}\n${answers.department_location || form.jurisdiction.state_ut}, INDIA`;

      const reqDetails = answers.information_requested || "[Specific information requested]";
      const bplClause = answers.is_bpl === true || answers.is_bpl === "true"
        ? `Note: The applicant belongs to Below Poverty Line (BPL) category (BPL Card No: ${answers.bpl_card_number || "Attached"}). Hence, application fee is exempted under Section 7(5) proviso.`
        : `Statutory Fee: Enclosed herewith application fee of ₹10 via ${answers.fee_payment_mode || "Court Fee Stamp / IPO / Online Receipt"}.`;

      specificBody = `
1. PARTICULARS OF THE APPLICANT:
   a) Name: ${applicantName}
   b) Address: ${applicantAddress}
   c) Citizenship: Citizen of India

2. PARTICULARS OF THE INFORMATION SOUGHT:
   a) Subject Matter of Information: ${answers.subject_of_request || "Public records and official details"}
   b) Relevant Time Period: ${answers.period_of_information || "Current / Past 3 Years"}
   c) Specific Information / Certified Records Required:
${reqDetails.split("\n").map((line: string, i: number) => `      (${i + 1}) ${line}`).join("\n")}
   d) Preferred Mode of Access: Certified Physical Copies / Electronic Delivery by Speed Post / Email

3. STATUTORY FEE DETAILS:
   ${bplClause}

4. JURISDICTION & SCOPE:
   The information sought does not fall within any of the exemptions specified under Section 8 or Section 9 of the RTI Act, 2005. To the best of my knowledge, it pertains to your office. In case any part pertains to another public authority, kindly transfer this application within 5 days under Section 6(3) of the Act.
      `.trim();

      legalDeclaration = `I hereby declare that I am a Citizen of India and that the particulars stated above are true and correct to the best of my knowledge and belief.`;
      break;
    }

    case "FORM-RTI-19-1": {
      subject = `FIRST APPEAL UNDER SECTION 19(1) OF THE RIGHT TO INFORMATION ACT, 2005`;
      recipientAuthorityBlock = `TO,\nTHE FIRST APPELLATE AUTHORITY (FAA)\n${answers.pio_name_designation || "Office of the First Appellate Authority"}\n${form.jurisdiction.state_ut}, INDIA`;

      const groundsMap: Record<string, string> = {
        DEEMED_REFUSAL_NO_RESPONSE: "Non-receipt of any response or decision from the PIO within the mandatory 30-day statutory period under Section 7(1) (Deemed Refusal).",
        WRONGFUL_EXEMPTION_CLAIMED: "Wrongful rejection or denial of requested information under an inapplicable exemption clause of Section 8(1).",
        INCOMPLETE_OR_FALSE_INFO: "Supply of incomplete, misleading, evasive, or uncertified information by the PIO.",
        EXCESSIVE_FEES_DEMANDED: "Demand of unreasonable or exorbitant additional copying fee calculations in violation of prescribed rules."
      };

      const appealGroundText = groundsMap[answers.appeal_ground] || answers.appeal_ground || "Aggrieved by the decision/omission of the PIO.";

      specificBody = `
1. PARTICULARS OF THE APPELLANT:
   a) Name of Appellant: ${applicantName}
   b) Address for Correspondence: ${applicantAddress}

2. PARTICULARS OF THE PIO / ORIGINAL APPLICATION:
   a) Name & Office of the CPIO/SPIO: ${answers.pio_name_designation || "[Designated PIO]"}
   b) Original RTI Application Number: ${answers.original_registration_number || "[Ref/Speed Post Number]"}
   c) Date of Filing Original RTI: ${answers.original_rti_date || "[Date of Filing]"}
   d) Date of PIO's Reply (if any): ${answers.pio_reply_date || "No response received"}

3. GROUNDS FOR FIRST APPEAL:
   ${appealGroundText}

4. BRIEF FACTS AND CHRONOLOGY:
   The Appellant submitted a formal RTI application under Section 6(1) on ${answers.original_rti_date || "the date mentioned"}. Despite expiry of the statutory timeline, the Public Information Officer has failed to discharge their statutory duty.

5. PRAYER / RELIEF SOUGHT:
   ${answers.prayer_relief_sought || "It is respectfully prayed that the First Appellate Authority direct the PIO to immediately supply all requested certified records free of cost under Section 7(6) of the RTI Act, 2005."}
      `.trim();

      legalDeclaration = `I hereby verify that the facts stated in this Memorandum of Appeal are true to my personal knowledge and belief, and no material information has been concealed.`;
      break;
    }

    case "FORM-CONS-EJAGRITI": {
      subject = `CONSUMER COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019 FOR DEFICIENCY IN SERVICE / DEFECTIVE GOODS`;
      recipientAuthorityBlock = `BEFORE THE HON'BLE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION (DCDRC)\nDISTRICT JURISDICTION: ${answers.district || "JURISDICTIONAL DISTRICT"}\n${form.jurisdiction.state_ut}, INDIA`;

      specificBody = `
IN THE MATTER OF:
${applicantName}
R/o: ${applicantAddress}
... COMPLAINANT

VERSUS

${answers.opposite_party_name || "[Opposite Party Merchant / Brand]"}
Regd. Office: ${answers.opposite_party_address || "[Opposite Party Address]"}
... OPPOSITE PARTY

1. JURISDICTION & STATUS:
   The Complainant is a 'Consumer' within the meaning of Section 2(7) of the Consumer Protection Act, 2019. The total consideration paid (₹${Number(answers.total_amount_paid || 0).toLocaleString("en-IN")}) is within the pecuniary jurisdiction (<= ₹50 Lakhs) of this Hon'ble District Commission.

2. DETAILS OF TRANSACTION:
   a) Date of Purchase / Booking: ${answers.transaction_date || "[Date]"}
   b) Total Amount Paid: ₹${Number(answers.total_amount_paid || 0).toLocaleString("en-IN")}
   c) Nature of Dispute: ${answers.dispute_type || "Defective Goods / Service Deficiency"}

3. FACTS OF THE CASE:
   ${answers.brief_facts || "The Complainant purchased goods/services from the Opposite Party as per the enclosed invoice. Upon delivery, the goods/services were found to be defective and deficient. Despite repeated requests and pre-litigation grievance notices, the Opposite Party failed to rectify the defect or refund the amount."}

4. CAUSE OF ACTION:
   The cause of action arose on ${answers.transaction_date || "the date of transaction"} and continues to subsist, being well within the 2-year limitation period prescribed under Section 69 of the Act.

5. PRAYER / RELIEF SOUGHT:
   It is most respectfully prayed that this Hon'ble Commission may be pleased to direct the Opposite Party to:
   a) Refund the sum of ₹${Number(answers.total_amount_paid || 0).toLocaleString("en-IN")} along with applicable interest;
   b) Pay compensation of ₹${Number(answers.compensation_claimed || 0).toLocaleString("en-IN")} towards harassment, mental agony, and financial loss;
   c) Award litigation costs to the Complainant.
      `.trim();

      legalDeclaration = `I, ${applicantName}, the Complainant above named, do hereby verify that the contents of paragraphs 1 to 5 are true to my personal knowledge and belief and nothing material has been concealed therefrom.`;
      break;
    }

    case "FORM-TEN-TN-REG": {
      subject = `APPLICATION FOR REGISTRATION OF TENANCY AGREEMENT UNDER SECTION 4(1) OF THE TNRRRLT ACT, 2017 (FORM I)`;
      recipientAuthorityBlock = `BEFORE THE RENT AUTHORITY\nREVENUE DIVISIONAL OFFICER / TAHSILDAR\n${form.jurisdiction.state_ut}, INDIA`;

      specificBody = `
1. PARTICULARS OF PARTIES:
   a) Name of Landlord: ${answers.landlord_name || "[Landlord Name]"}
   b) Name of Tenant: ${answers.tenant_name || applicantName}

2. PARTICULARS OF TENANCY PREMISES:
   a) Full Address of Rented Property: ${answers.premises_address || "[Full Rented Property Address]"}
   b) Nature of Tenancy: ${answers.tenancy_type || "Residential Premises"}
   c) Tenancy Period: ${answers.tenancy_period_months || "11"} Months

3. FINANCIAL TERMS (COMPLIANT WITH TN STATUTORY CAPS):
   a) Agreed Monthly Rent: ₹${Number(answers.monthly_rent || 0).toLocaleString("en-IN")}
   b) Security Deposit Paid: ₹${Number(answers.security_deposit_paid || 0).toLocaleString("en-IN")}
   c) Statutory Compliance Note: The security deposit conforms to the maximum 3 months' rent limit under Section 11 of the Tamil Nadu Act 42 of 2017.

4. ENCLOSURES:
   The original signed Tenancy Agreement executed between the landlord and tenant is submitted herewith along with identity proofs for formal registration and issuance of Tenancy Registration Number (T.R.N.).
      `.trim();

      legalDeclaration = `We, the Landlord and Tenant, do hereby solemnly declare that the tenancy terms recorded herein and in the enclosed agreement are true and agreed upon mutually.`;
      break;
    }

    case "FORM-WRK-SAMADHAN": {
      subject = `APPLICATION FOR CONCILIATION & DISPUTE RESOLUTION UNDER SECTION 4 / SECTION 70 OF THE INDUSTRIAL RELATIONS CODE, 2020`;
      recipientAuthorityBlock = `BEFORE THE ASSISTANT LABOUR COMMISSIONER (CENTRAL) / CONCILIATION OFFICER\nMINISTRY OF LABOUR & EMPLOYMENT\n${form.jurisdiction.state_ut}, INDIA`;

      specificBody = `
1. PARTICULARS OF THE WORKMAN:
   a) Name: ${applicantName}
   b) Designation / Role: ${answers.designation_role || "Workman / Employee"}
   c) Address for Communication: ${applicantAddress}

2. PARTICULARS OF THE EMPLOYER:
   a) Name of Establishment / Management: ${answers.employer_name || "[Employer Name]"}
   b) Address of Establishment / Worksite: ${answers.establishment_address || "[Workplace Address]"}

3. EMPLOYMENT CHRONOLOGY:
   a) Date of Appointment / Joining: ${answers.date_of_appointment || "[Date of Joining]"}
   b) Last Drawn Monthly Salary: ₹${Number(answers.last_drawn_salary || 0).toLocaleString("en-IN")}
   c) Date of Termination / Unlawful Refusal of Work: ${answers.date_of_termination || "[Date of Termination]"}

4. STATEMENT OF DISPUTE:
   ${answers.statement_of_claims || "The workman was employed continuously with the employer. The employer terminated/withheld wages without compliance with statutory notice, retrenchment compensation under Section 70, or due process of law."}

5. PRAYER:
   The Workman prays that the Conciliation Officer admit this dispute, initiate conciliation proceedings, and direct the management to resolve all wage arrears and statutory dues.
      `.trim();

      legalDeclaration = `I, ${applicantName}, do hereby verify that the facts stated in this application are true and correct to the best of my knowledge.`;
      break;
    }

    case "FORM-WRK-GRATUITY-N": {
      subject = `APPLICATION FOR DIRECTION TO PAY GRATUITY UNDER RULE 10(1) OF THE PAYMENT OF GRATUITY (CENTRAL) RULES, 1972 (FORM N)`;
      recipientAuthorityBlock = `BEFORE THE CONTROLLING AUTHORITY UNDER THE PAYMENT OF GRATUITY ACT, 1972\nOFFICE OF THE ASSISTANT LABOUR COMMISSIONER\n${form.jurisdiction.state_ut}, INDIA`;

      specificBody = `
1. PARTICULARS OF APPLICANT EMPLOYEE:
   a) Name: ${applicantName}
   b) Full Address: ${applicantAddress}

2. PARTICULARS OF EMPLOYER:
   a) Name of Employer / Establishment: ${answers.employer_name || "[Employer Name]"}

3. GRATUITY ENTITLEMENT COMPUTATION:
   a) Completed Years of Service: ${answers.total_years_service || "5"} Years (Eligible >= 5 Years continuous service)
   b) Last Drawn Basic Pay + DA (per month): ₹${Number(answers.last_drawn_basic_da || 0).toLocaleString("en-IN")}
   c) Gratuity Amount Claimed: ₹${Number(answers.gratuity_amount_claimed || 0).toLocaleString("en-IN")}
   d) Statutory Formula: (15 × Last Drawn Basic+DA × Completed Years of Service) ÷ 26

4. CAUSE OF APPLICATION:
   The applicant served the formal Form I notice upon the employer. However, the employer has failed / refused to disburse the statutory gratuity within the 30-day window mandated under Section 7(3).

5. PRAYER:
   It is prayed that the Controlling Authority issue directions to the employer to pay ₹${Number(answers.gratuity_amount_claimed || 0).toLocaleString("en-IN")} along with compound interest under Section 7(3A) from the date it became due.
      `.trim();

      legalDeclaration = `I, ${applicantName}, do hereby verify that the particulars stated above are true to the best of my knowledge and belief.`;
      break;
    }

    default: {
      specificBody = Object.entries(answers)
        .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
        .join("\n");
      legalDeclaration = `I hereby verify that all statements made herein are true and correct.`;
    }
  }

  // Document checklist
  const docList = form.documents_required.map((doc, idx) => {
    const isAttached = uploadedDocIds.includes(doc.doc_id);
    return `${idx + 1}. [${isAttached ? "✓ ATTACHED" : "ENCLOSED IN HARDCOPY"}] ${doc.document_name} (${doc.mandatory ? "Mandatory" : "Optional"})`;
  });

  const plainText = `
================================================================================
${isOfficialPrescribed ? "OFFICIAL PRESCRIBED FORM" : "FILING-READY STATUTORY DRAFT"}
${form.form_name.toUpperCase()}
Form Reference: ${form.form_code || form.form_id} | Jurisdiction: ${form.jurisdiction.state_ut}
================================================================================

${recipientAuthorityBlock}

SUBJECT: ${subject}

--------------------------------------------------------------------------------
DETAILS & STATEMENTS:
--------------------------------------------------------------------------------
${specificBody}

--------------------------------------------------------------------------------
VERIFICATION & DECLARATION:
--------------------------------------------------------------------------------
${legalDeclaration}

Date: ${currentDate}
Place: ${answers.place || "[City / District]"}

Signature / Thumb Impression of Applicant: ___________________________
Name: ${applicantName}

--------------------------------------------------------------------------------
LIST OF ENCLOSURES / ANNEXURES:
--------------------------------------------------------------------------------
${docList.join("\n")}

================================================================================
FILING & SUBMISSION GUIDE:
================================================================================
Target Authority: ${form.authority}
Statutory Fee   : ${form.submission.statutory_fee || "Nil"}
Payment Mode    : ${form.submission.fee_payment_mode || "Online / Physical Demand Draft"}
Online Portal   : ${form.submission.portal || "N/A (Physical Filing only)"}
Physical Office : ${form.submission.office || form.authority}
Verification    : ${form.last_verified} (${form.verification_status})
================================================================================
`.trim();

  // Clean HTML version for print & A4 PDF generation
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${form.form_name}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
    }
    body {
      font-family: "Times New Roman", Times, Georgia, serif;
      font-size: 11pt;
      line-height: 1.45;
      color: #111827;
      margin: 0;
      padding: 24px;
      background: #ffffff;
    }
    .doc-header {
      text-align: center;
      border-bottom: 2px solid #1e293b;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }
    .category-badge {
      display: inline-block;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 6px;
      text-transform: uppercase;
      background: ${isOfficialPrescribed ? "#e0e7ff" : "#fef3c7"};
      color: ${isOfficialPrescribed ? "#3730a3" : "#92400e"};
      border: 1px solid ${isOfficialPrescribed ? "#c7d2fe" : "#fde68a"};
    }
    h1 {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      margin: 4px 0;
      letter-spacing: 0.02em;
    }
    .ref-code {
      font-size: 9.5pt;
      color: #4b5563;
      font-style: italic;
    }
    .recipient-box {
      margin: 16px 0;
      white-space: pre-line;
      font-weight: 600;
    }
    .subject-line {
      font-weight: bold;
      margin: 14px 0;
      text-decoration: underline;
      text-align: justify;
    }
    .body-content {
      white-space: pre-wrap;
      text-align: justify;
      margin: 14px 0;
    }
    .declaration-box {
      margin-top: 20px;
      padding: 10px 14px;
      border-left: 3px solid #1e293b;
      font-style: italic;
      background: #f8fafc;
    }
    .signature-grid {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 36px;
      page-break-inside: avoid;
    }
    .enclosures-box {
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px dashed #94a3b8;
      font-size: 10pt;
    }
    .filing-guide-box {
      margin-top: 28px;
      padding: 12px 16px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 9pt;
      page-break-inside: avoid;
    }
    .filing-guide-box h4 {
      margin: 0 0 6px 0;
      font-size: 10pt;
      color: #0f172a;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
      .filing-guide-box {
        border-color: #94a3b8;
      }
    }
  </style>
</head>
<body>
  <div class="doc-header">
    <div class="category-badge">${categoryBadge}</div>
    <h1>${form.form_name}</h1>
    <div class="ref-code">Form Reference: ${form.form_code || form.form_id} | Jurisdiction: ${form.jurisdiction.state_ut}</div>
  </div>

  <div class="recipient-box">${recipientAuthorityBlock.replace(/\n/g, "<br/>")}</div>

  <div class="subject-line">SUBJECT: ${subject}</div>

  <div class="body-content">${escapeHtml(specificBody)}</div>

  <div class="declaration-box">
    <strong>VERIFICATION &amp; DECLARATION:</strong><br/>
    ${escapeHtml(legalDeclaration)}
  </div>

  <div class="signature-grid">
    <div>
      Date: ${currentDate}<br/>
      Place: ${escapeHtml(answers.place || "[City / District]")}
    </div>
    <div style="text-align: right;">
      <div style="margin-bottom: 24px;">___________________________________</div>
      <strong>Signature / Thumb Impression</strong><br/>
      Name: ${escapeHtml(applicantName)}
    </div>
  </div>

  <div class="enclosures-box">
    <strong>LIST OF ENCLOSURES / ANNEXURES:</strong>
    <ol style="margin-top: 6px; padding-left: 20px;">
      ${form.documents_required
        .map(
          (doc) =>
            `<li><strong>${escapeHtml(doc.document_name)}</strong> (${doc.mandatory ? "Mandatory" : "Optional"}) — <em>${uploadedDocIds.includes(doc.doc_id) ? "Attached" : "To be enclosed physically"}</em></li>`
        )
        .join("")}
    </ol>
  </div>

  <div class="filing-guide-box">
    <h4>📋 Step-by-Step Filing Instructions</h4>
    <p style="margin: 2px 0;"><strong>Recipient Authority:</strong> ${escapeHtml(form.authority)}</p>
    <p style="margin: 2px 0;"><strong>Statutory Fee:</strong> ${escapeHtml(form.submission.statutory_fee || "Nil")}</p>
    <p style="margin: 2px 0;"><strong>Payment Method:</strong> ${escapeHtml(form.submission.fee_payment_mode || "Online gateway / Court Fee Stamp / IPO")}</p>
    ${form.submission.portal ? `<p style="margin: 2px 0;"><strong>Official Online Portal:</strong> <a href="${form.submission.portal}" target="_blank" rel="noopener">${form.submission.portal}</a></p>` : ""}
    ${form.submission.office ? `<p style="margin: 2px 0;"><strong>Physical Submission Office:</strong> ${escapeHtml(form.submission.office)}</p>` : ""}
    <p style="margin: 4px 0 0 0; color: #475569; font-size: 8pt;">Privacy Guaranteed: This document was compiled locally on your device without sending your personal identifying details to third-party AI models.</p>
  </div>
</body>
</html>
`.trim();

  const instructions: string[] = [
    `1. Review all answers and verify that names, dates, and amounts match your physical records.`,
    `2. Print this document or export it as a PDF on standard A4 paper.`,
    `3. Sign in ink above your printed name and date the document.`,
    `4. Attach physical or scanned copies of all mandatory enclosures listed above.`,
    form.submission.online && form.submission.portal
      ? `5. Upload or file directly on the official government portal: ${form.submission.portal}`
      : `5. Submit at the designated physical counter: ${form.submission.office || form.authority}`,
    `6. Obtain and preserve the stamped postal tracking receipt or official acknowledgment number for deadline tracking.`
  ];

  return {
    documentId: `DOC-${form.form_id}-${Date.now()}`,
    formId: form.form_id,
    formName: form.form_name,
    formCode: form.form_code,
    formCategory: isOfficialPrescribed ? "OFFICIAL_PRESCRIBED_FORM" : "FILING_READY_DRAFT",
    categoryBadge,
    authority: form.authority,
    subject,
    title: form.form_name,
    plainText,
    htmlContent,
    submissionInstructions: instructions,
    statutoryFeeText: form.submission.statutory_fee || "Nil",
    filingPortal: form.submission.portal,
    isPrivateLocalOnly: true
  };
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
