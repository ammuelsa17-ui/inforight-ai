/**
 * InfoRight AI — Official-Ready A4 Document & PDF Export Utility
 * Generates structured, print-safe, printable/exportable HTML documents formatted for A4.
 */

export interface RtiPdfPayload {
  applicationDate: string;
  publicAuthority: string;
  departmentName?: string;
  pioTitle?: string;
  applicantName: string;
  applicantAddress: string;
  subject: string;
  problemDescription: string;
  requestedQuestions: string[];
  periodConcerned: string;
  feeAmount: number;
  paymentMode: string;
  bplStatus: boolean;
  sourceReferences: string[];
  checksum?: string;
}

export interface EvidenceIndexPayload {
  caseId?: string;
  date: string;
  applicantName: string;
  authorityName: string;
  evidenceItems: {
    id: string;
    description: string;
    date: string;
    fileRef: string;
    purpose: string;
  }[];
  checksum?: string;
}

export interface FirstAppealPayload {
  appealDate: string;
  appellantName: string;
  appellantAddress: string;
  originalRtiDate: string;
  originalPioAuthority: string;
  firstAppellateAuthority: string;
  groundsForAppeal: string[];
  statutoryTimelineBasis: string;
  reliefSought: string;
  enclosures: string[];
  checksum?: string;
}

export function exportRtiApplicationHtml(payload: RtiPdfPayload): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RTI Application - Section 6(1)</title>
  <style>
    @page { size: A4; margin: 20mm 15mm 20mm 15mm; }
    body { font-family: 'Times New Roman', Times, serif; color: #111827; line-height: 1.5; font-size: 13pt; margin: 0; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #111827; padding-bottom: 8px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 16pt; text-transform: uppercase; letter-spacing: 0.5px; }
    .header p { margin: 4px 0 0 0; font-size: 11pt; font-weight: bold; }
    .meta-table { width: 100%; margin-bottom: 16px; font-size: 12pt; }
    .meta-table td { vertical-align: top; padding: 2px 0; }
    .section-title { font-weight: bold; margin-top: 14px; margin-bottom: 6px; text-decoration: underline; }
    .questions-list { margin: 6px 0; padding-left: 24px; }
    .questions-list li { margin-bottom: 6px; }
    .footer { margin-top: 30px; border-top: 1px solid #9CA3AF; padding-top: 10px; font-size: 9pt; color: #4B5563; }
    .sig-block { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Application for Information Under Right to Information Act, 2005</h1>
    <p>(Section 6(1) of RTI Act 2005)</p>
  </div>

  <table class="meta-table">
    <tr>
      <td style="width: 15%;"><strong>Date:</strong></td>
      <td>${payload.applicationDate}</td>
    </tr>
    <tr>
      <td><strong>To:</strong></td>
      <td>
        <strong>${payload.pioTitle || "The Public Information Officer (PIO)"}</strong><br>
        ${payload.publicAuthority}<br>
        ${payload.departmentName ? `${payload.departmentName}<br>` : ""}
      </td>
    </tr>
    <tr>
      <td><strong>Applicant:</strong></td>
      <td>
        <strong>${payload.applicantName || "Citizen Applicant"}</strong><br>
        ${payload.applicantAddress || "Address provided with original submission"}
      </td>
    </tr>
    <tr>
      <td><strong>Subject:</strong></td>
      <td><strong>${payload.subject}</strong></td>
    </tr>
  </table>

  <div class="section-title">1. Context & Grievance Background:</div>
  <p style="text-align: justify; margin-top: 4px;">${payload.problemDescription}</p>

  <div class="section-title">2. Specific Information Requested:</div>
  <ol class="questions-list">
    ${payload.requestedQuestions.map((q) => `<li>${q}</li>`).join("")}
  </ol>

  <div class="section-title">3. Period to Which Information Relates:</div>
  <p style="margin-top: 4px;">${payload.periodConcerned}</p>

  <div class="section-title">4. Statutory Application Fee:</div>
  <p style="margin-top: 4px;">
    ${
      payload.bplStatus
        ? "Exempt from statutory fee under Section 7(5) proviso (Below Poverty Line category certificate attached)."
        : `Statutory fee of ₹${payload.feeAmount} enclosed via ${payload.paymentMode || "Court Fee Stamp / Indian Postal Order / Online Portal"}.`
    }
  </p>

  <div class="sig-block">
    <div>
      <p style="margin: 0;"><strong>Place:</strong> Coimbatore, Tamil Nadu</p>
      <p style="margin: 4px 0 0 0;"><strong>Date:</strong> ${payload.applicationDate}</p>
    </div>
    <div style="text-align: center;">
      <div style="border-bottom: 1px solid #111827; width: 200px; height: 35px;"></div>
      <p style="margin: 4px 0 0 0; font-size: 11pt;"><strong>Signature of Applicant</strong></p>
    </div>
  </div>

  <div class="footer">
    <p style="margin: 0;">Generated using InfoRight AI • Verified Grounding Sources: ${payload.sourceReferences.join(", ")}</p>
    ${payload.checksum ? `<p style="margin: 2px 0 0 0; font-family: monospace;">Document SHA-256: ${payload.checksum}</p>` : ""}
    <p style="margin: 2px 0 0 0; font-style: italic;">Disclaimer: Generated for citizen empowerment under RTI Act 2005. Does not constitute a digital signature or government endorsement.</p>
  </div>
</body>
</html>`;
}

export function exportEvidenceIndexHtml(payload: EvidenceIndexPayload): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Evidence Index - InfoRight AI</title>
  <style>
    @page { size: A4; margin: 20mm 15mm 20mm 15mm; }
    body { font-family: 'Times New Roman', Times, serif; color: #111827; font-size: 12pt; line-height: 1.4; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #111827; padding-bottom: 8px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 15pt; text-transform: uppercase; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #4B5563; padding: 8px 10px; text-align: left; font-size: 11pt; }
    th { background-color: #F3F4F6; font-weight: bold; }
    .footer { margin-top: 30px; border-top: 1px solid #9CA3AF; padding-top: 8px; font-size: 9pt; color: #4B5563; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Index of Supporting Documents & Evidence</h1>
    <p style="margin: 4px 0 0 0; font-size: 10pt;">Accompanying RTI Application / Civic Representation</p>
  </div>

  <p><strong>Applicant Name:</strong> ${payload.applicantName || "Citizen Applicant"}</p>
  <p><strong>Public Authority:</strong> ${payload.authorityName}</p>
  <p><strong>Date of Compilation:</strong> ${payload.date}</p>

  <table>
    <thead>
      <tr>
        <th style="width: 12%;">Item ID</th>
        <th style="width: 38%;">Document / Evidence Description</th>
        <th style="width: 18%;">Date Recorded</th>
        <th style="width: 32%;">Statutory / Factual Purpose</th>
      </tr>
    </thead>
    <tbody>
      ${payload.evidenceItems
        .map(
          (item) => `
        <tr>
          <td><strong>${item.id}</strong></td>
          <td>${item.description}</td>
          <td>${item.date}</td>
          <td>${item.purpose}</td>
        </tr>`
        )
        .join("")}
    </tbody>
  </table>

  <div class="footer">
    <p style="margin: 0;">Generated using InfoRight AI • Evidence Integrity Index</p>
    ${payload.checksum ? `<p style="margin: 2px 0 0 0; font-family: monospace;">Record SHA-256: ${payload.checksum}</p>` : ""}
  </div>
</body>
</html>`;
}

export function exportFirstAppealHtml(payload: FirstAppealPayload): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>First Appeal Under Section 19(1) RTI Act</title>
  <style>
    @page { size: A4; margin: 20mm 15mm 20mm 15mm; }
    body { font-family: 'Times New Roman', Times, serif; color: #111827; font-size: 13pt; line-height: 1.5; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #111827; padding-bottom: 8px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 15pt; text-transform: uppercase; }
    .meta-table { width: 100%; margin-bottom: 16px; }
    .meta-table td { vertical-align: top; padding: 2px 0; }
    .section-title { font-weight: bold; margin-top: 14px; text-decoration: underline; }
    .footer { margin-top: 30px; border-top: 1px solid #9CA3AF; padding-top: 8px; font-size: 9pt; color: #4B5563; }
    .sig-block { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
  </style>
</head>
<body>
  <div class="header">
    <h1>First Appeal Under Section 19(1) of RTI Act 2005</h1>
    <p style="margin: 4px 0 0 0; font-size: 11pt;">Before the First Appellate Authority</p>
  </div>

  <table class="meta-table">
    <tr>
      <td style="width: 25%;"><strong>Date:</strong></td>
      <td>${payload.appealDate}</td>
    </tr>
    <tr>
      <td><strong>To:</strong></td>
      <td>
        <strong>The First Appellate Authority (FAA)</strong><br>
        ${payload.firstAppellateAuthority}<br>
        ${payload.originalPioAuthority}
      </td>
    </tr>
    <tr>
      <td><strong>Appellant:</strong></td>
      <td>
        <strong>${payload.appellantName || "Citizen Appellant"}</strong><br>
        ${payload.appellantAddress || "Address on record"}
      </td>
    </tr>
    <tr>
      <td><strong>Original RTI Date:</strong></td>
      <td>${payload.originalRtiDate}</td>
    </tr>
  </table>

  <div class="section-title">1. Statutory Basis & Timeline Expiry:</div>
  <p style="margin-top: 4px;">${payload.statutoryTimelineBasis}</p>

  <div class="section-title">2. Grounds for First Appeal:</div>
  <ul>
    ${payload.groundsForAppeal.map((g) => `<li>${g}</li>`).join("")}
  </ul>

  <div class="section-title">3. Relief Requested from First Appellate Authority:</div>
  <p style="margin-top: 4px;">${payload.reliefSought}</p>

  <div class="section-title">4. Enclosures:</div>
  <ul>
    ${payload.enclosures.map((e) => `<li>${e}</li>`).join("")}
  </ul>

  <div class="sig-block">
    <div>
      <p style="margin: 0;"><strong>Place:</strong> Coimbatore, Tamil Nadu</p>
      <p style="margin: 4px 0 0 0;"><strong>Date:</strong> ${payload.appealDate}</p>
    </div>
    <div style="text-align: center;">
      <div style="border-bottom: 1px solid #111827; width: 200px; height: 35px;"></div>
      <p style="margin: 4px 0 0 0;"><strong>Signature of Appellant</strong></p>
    </div>
  </div>

  <div class="footer">
    <p style="margin: 0;">Generated using InfoRight AI • First Appeal Statutory Generator</p>
    ${payload.checksum ? `<p style="margin: 2px 0 0 0; font-family: monospace;">SHA-256: ${payload.checksum}</p>` : ""}
  </div>
</body>
</html>`;
}

export function triggerPrintDocument(htmlContent: string) {
  if (typeof window === "undefined") return;
  const printWindow = window.open("", "_blank", "width=850,height=1100");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  }
}
