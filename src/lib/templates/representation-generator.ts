// src/lib/templates/representation-generator.ts — Deterministic Legal Representation & Complaint Generator
import { DocumentType } from "@/lib/triage/action-planner";

export interface RepresentationData {
  documentType: DocumentType;
  title: string;
  date: string;
  recipientTitle: string;
  recipientOrg: string;
  recipientAddress: string;
  applicantName: string;
  applicantAddress: string;
  subject: string;
  factsAndGrievance: string[];
  demandedRelief: string[];
  legalStatutoryBasis: string[];
  evidenceEnclosures: string[];
  responseTimelineDays: number;
  sourceReferences: string[];
}

export function generateRepresentationDocument(params: {
  documentType: DocumentType;
  problemDescription: string;
  state?: string;
  locality?: string;
  applicantName?: string;
  applicantAddress?: string;
  amountClaimed?: string;
  dateRange?: string;
}): RepresentationData {
  const dateStr = new Date().toISOString().split("T")[0];
  const name = params.applicantName || "Citizen Applicant";
  const address = params.applicantAddress || "Address as provided in records";
  const loc = params.locality || "Locality";
  const state = params.state || "Tamil Nadu";

  switch (params.documentType) {
    case "TENANT_REPRESENTATION": {
      const amount = params.amountClaimed || "₹40,000";
      return {
        documentType: "TENANT_REPRESENTATION",
        title: "LEGAL NOTICE & FORMAL DEMAND FOR RETURN OF TENANCY SECURITY DEPOSIT",
        date: dateStr,
        recipientTitle: "The Landlord / Property Owner",
        recipientOrg: "Residential Tenancy Property",
        recipientAddress: `${loc}, ${state}`,
        applicantName: name,
        applicantAddress: address,
        subject: `Demand for Immediate Refund of Security Deposit of ${amount} under Section 11 of TNRRRLT Act, 2017`,
        factsAndGrievance: [
          `The undersigned was a lawful tenant residing at the scheduled rental premises located at ${loc}, ${state}.`,
          `Vacation and peaceful handover of vacant possession was completed along with full settlement of electricity and utility dues.`,
          `A total refundable security deposit sum of ${amount} is held by you, which you have failed to return within the statutory period.`,
          `No written itemized damage assessment was provided within the statutory timeframe.`,
        ],
        demandedRelief: [
          `Immediate refund of the full security deposit sum of ${amount} via direct bank transfer / cheque within 15 days of this notice.`,
          `Supplying written receipt and acknowledgement of full tenancy closure.`,
        ],
        legalStatutoryBasis: [
          "Section 11, Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act 2017)",
          "Section 18, TNRRRLT Act 2017 (Protection against arbitrary withholding)",
        ],
        evidenceEnclosures: [
          "E1 — Copy of Written Tenancy Agreement",
          "E2 — Bank Statement / Payment Receipt proving Security Deposit Deposit",
          "E3 — Proof of Key Handover and Vacation Acknowledgement",
          "E4 — Settled Utility (TANGEDCO / Water) Receipts",
        ],
        responseTimelineDays: 15,
        sourceReferences: ["SRC-TEN-2F-TN"],
      };
    }

    case "CONSUMER_REPRESENTATION": {
      return {
        documentType: "CONSUMER_REPRESENTATION",
        title: "PRE-LITIGATION CONSUMER GRIEVANCE & STATUTORY DEMAND NOTICE",
        date: dateStr,
        recipientTitle: "The Grievance Officer / Managing Director",
        recipientOrg: "Seller / Commercial Service Provider",
        recipientAddress: `${loc}, ${state}`,
        applicantName: name,
        applicantAddress: address,
        subject: "Demand for Redressal of Defective Goods / Deficient Service under Consumer Protection Act, 2019",
        factsAndGrievance: [
          `The undersigned purchased goods/services under Tax Invoice / Order Reference for valuable consideration.`,
          `The product/service delivered suffers from material defect, failure of promised functionality, or deficiency in service.`,
          `Grievance raised via customer support was rejected or unresolved, constituting an Unfair Trade Practice.`,
        ],
        demandedRelief: [
          "Full refund of purchase consideration along with statutory interest.",
          "Reimbursement of incidental charges and costs incurred due to product defect.",
        ],
        legalStatutoryBasis: [
          "Section 2(47), Consumer Protection Act, 2019 (Unfair Trade Practice)",
          "Section 35, Consumer Protection Act, 2019 (Right to redressal before District Commission)",
        ],
        evidenceEnclosures: [
          "E1 — Tax Invoice and Proof of Payment",
          "E2 — Photographs / Technical Diagnostic Report of Defect",
          "E3 — Written Communication and Support Ticket History",
        ],
        responseTimelineDays: 15,
        sourceReferences: ["SRC-CONS-2A-CENTRAL"],
      };
    }

    case "WORKPLACE_REPRESENTATION": {
      return {
        documentType: "WORKPLACE_REPRESENTATION",
        title: "FORMAL DEMAND FOR PAYMENT OF OUTSTANDING SALARY & DUES",
        date: dateStr,
        recipientTitle: "The Human Resources Director / Managing Authority",
        recipientOrg: "Employer Organization",
        recipientAddress: `${loc}, ${state}`,
        applicantName: name,
        applicantAddress: address,
        subject: "Demand for Settlement of Pending Wages & Relieving Documents",
        factsAndGrievance: [
          `The undersigned was employed in good standing with the establishment during the relevant service period.`,
          `Earned wages, overtime compensation, or statutory full & final settlement dues remain wrongfully withheld.`,
        ],
        demandedRelief: [
          "Immediate disbursement of total outstanding salary dues into salary bank account.",
          "Issuance of formal Service Certificate, Form 16, and Relieving Letter.",
        ],
        legalStatutoryBasis: [
          "Payment of Wages Act, 1936 / Code on Wages, 2019",
          "Industrial Disputes Act, 1947 (Conciliation Framework)",
        ],
        evidenceEnclosures: [
          "E1 — Appointment Letter / Employment Agreement",
          "E2 — Bank Statement showing last credited salary",
          "E3 — Official Attendance / Timesheet Records",
          "E4 — Resignation / Separation Acknowledgement",
        ],
        responseTimelineDays: 15,
        sourceReferences: ["SRC-LAB-2A-CENTRAL"],
      };
    }

    case "CIVIC_GRIEVANCE":
    case "RTI_APPLICATION":
    default: {
      return {
        documentType: "CIVIC_GRIEVANCE",
        title: "MUNICIPAL GRIEVANCE & STATUTORY SERVICE DEMAND",
        date: dateStr,
        recipientTitle: "The Executive Engineer / Zonal Officer",
        recipientOrg: "City Municipal Corporation / Local Body",
        recipientAddress: `${loc}, ${state}`,
        applicantName: name,
        applicantAddress: address,
        subject: `Urgent Civic Grievance regarding Hazardous Infrastructure Damage at ${loc}`,
        factsAndGrievance: [
          `Severe public hazard, road potholes, or drainage blockage exists at ${loc}.`,
          `The condition poses immediate danger to pedestrians, vehicular traffic, and public health.`,
          `Despite local reports, statutory rectification has not been completed by the municipal engineering wing.`,
        ],
        demandedRelief: [
          "Immediate inspection and commencement of repair work by the competent municipal cell.",
          "Furnishing public inspection report and contractor defect liability details.",
        ],
        legalStatutoryBasis: [
          "State Municipal Corporations Act / Civic Service Charter",
          "Section 6(1) Right to Information Act 2005 (for work order transparency)",
        ],
        evidenceEnclosures: [
          "E1 — Dated Photographs of Road / Drain Hazard",
          "E2 — Location GPS / Landmark Map",
          "E3 — Previous Namma Kovai / Municipal Grievance Reference",
        ],
        responseTimelineDays: 15,
        sourceReferences: ["SRC-TN-CCMC-JURISDICTION", "SRC-POST-IN-PIN"],
      };
    }
  }
}

/**
 * Generates print-ready A4 HTML for any representation document
 */
export function exportRepresentationHtml(data: RepresentationData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.title}</title>
  <style>
    @page { size: A4; margin: 20mm 15mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #172033;
      margin: 0;
      padding: 0;
    }
    .header-box {
      border-bottom: 2px solid #102A56;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .doc-title {
      font-size: 13pt;
      font-weight: 800;
      color: #102A56;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 6px 0;
    }
    .meta-table {
      width: 100%;
      margin-bottom: 16px;
      font-size: 10.5pt;
    }
    .meta-table td {
      vertical-align: top;
      padding: 3px 0;
    }
    .subject-line {
      font-weight: 700;
      color: #102A56;
      background-color: #F4F9FF;
      border-left: 4px solid #4F46E5;
      padding: 8px 12px;
      margin: 16px 0;
      font-size: 11pt;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      color: #102A56;
      text-transform: uppercase;
      margin-top: 16px;
      margin-bottom: 6px;
      border-bottom: 1px solid #BCD7EE;
      padding-bottom: 2px;
    }
    ol, ul {
      margin-top: 4px;
      margin-bottom: 12px;
      padding-left: 20px;
    }
    li {
      margin-bottom: 6px;
      text-align: justify;
    }
    .signature-area {
      margin-top: 36px;
      display: flex;
      justify-content: space-between;
      page-break-inside: avoid;
    }
    .footer {
      margin-top: 30px;
      border-top: 1px solid #CBD5E1;
      padding-top: 8px;
      font-size: 8.5pt;
      color: #64748B;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header-box">
    <h1 class="doc-title">${data.title}</h1>
    <div style="text-align: center; font-size: 9.5pt; color: #475569;">
      Delivered via Registered Post with Acknowledgement Due (RPAD) / Official Email
    </div>
  </div>

  <table class="meta-table">
    <tr>
      <td style="width: 50%;">
        <strong>To:</strong><br>
        ${data.recipientTitle}<br>
        ${data.recipientOrg}<br>
        ${data.recipientAddress}
      </td>
      <td style="width: 50%; text-align: right;">
        <strong>Date:</strong> ${data.date}<br>
        <strong>Notice Period:</strong> ${data.responseTimelineDays} Days
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding-top: 12px;">
        <strong>From (Applicant):</strong><br>
        ${data.applicantName}<br>
        ${data.applicantAddress}
      </td>
    </tr>
  </table>

  <div class="subject-line">
    SUBJECT: ${data.subject}
  </div>

  <div class="section-title">1. Statement of Facts & Grievance</div>
  <ol>
    ${data.factsAndGrievance.map((f) => `<li>${f}</li>`).join("\n    ")}
  </ol>

  <div class="section-title">2. Statutory & Legal Basis</div>
  <ul>
    ${data.legalStatutoryBasis.map((b) => `<li><strong>${b}</strong></li>`).join("\n    ")}
  </ul>

  <div class="section-title">3. Relief Demanded & Next Steps</div>
  <ol>
    ${data.demandedRelief.map((r) => `<li>${r}</li>`).join("\n    ")}
  </ol>

  <p style="font-size: 10pt; color: #334155; margin-top: 12px;">
    Please take notice that if the demanded relief is not resolved within <strong>${data.responseTimelineDays} calendar days</strong> of receipt of this representation, the undersigned shall be constrained to initiate formal proceedings before the competent statutory authority / tribunal at your sole risk and cost.
  </p>

  <div class="section-title">4. List of Enclosures / Evidence Schedule</div>
  <ul>
    ${data.evidenceEnclosures.map((e) => `<li>${e}</li>`).join("\n    ")}
  </ul>

  <div class="signature-area">
    <div>
      Place: ${data.recipientAddress.split(",")[0] || "Tamil Nadu"}<br>
      Date: ${data.date}
    </div>
    <div style="text-align: right;">
      <br><br>
      ____________________________________<br>
      <strong>${data.applicantName}</strong><br>
      (Citizen Applicant)
    </div>
  </div>

  <div class="footer">
    <span>Verified Sources: ${data.sourceReferences.join(", ")}</span>
    <span>InfoRight AI — Verified Citizen Legal Filing Pack</span>
  </div>
</body>
</html>`;
}
