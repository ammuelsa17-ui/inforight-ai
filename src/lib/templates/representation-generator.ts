// src/lib/templates/representation-generator.ts — Deterministic Legal Representation & Demand Document Generator
import { DocumentType } from "@/lib/triage/action-planner";
import { getStateTenancyRecord } from "@/data/tenancy/state-tenancy-registry";

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
  locality?: string;
  state?: string;
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
      const stateRecord = getStateTenancyRecord(state);
      const isTN = stateRecord.stateCode === "TN";
      const isUP = stateRecord.stateCode === "UP";

      const statutoryBases = isTN
        ? [
            "Section 11, Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act 2017)",
            "Section 18, TNRRRLT Act 2017 (Protection against arbitrary withholding)",
          ]
        : isUP
        ? [
            "Section 11, Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021",
            "Section 19, UP Tenancy Act 2021 (Essential Services Protection)",
          ]
        : [
            stateRecord.primaryActTitle,
            "Transfer of Property Act, 1882 (Section 108 — Rights and Liabilities of Lessor/Lessee)",
          ];

      return {
        documentType: "TENANT_REPRESENTATION",
        title: "LEGAL NOTICE & FORMAL DEMAND FOR RETURN OF TENANCY SECURITY DEPOSIT",
        date: dateStr,
        recipientTitle: "The Landlord / Property Owner",
        recipientOrg: "Residential Tenancy Premises",
        recipientAddress: `${loc}, ${state}`,
        applicantName: name,
        applicantAddress: address,
        subject: isTN
          ? `Demand for Immediate Refund of Security Deposit of ${amount} under Section 11 of TNRRRLT Act, 2017`
          : `Demand for Immediate Refund of Tenancy Security Deposit of ${amount} (${stateRecord.primaryActTitle})`,
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
        legalStatutoryBasis: statutoryBases,
        evidenceEnclosures: [
          "E1 — Copy of Written Tenancy Agreement",
          "E2 — Bank Statement / Payment Receipt proving Security Deposit Payment",
          "E3 — Proof of Key Handover and Vacation Acknowledgement",
          "E4 — Settled Electricity and Utility Receipts",
        ],
        responseTimelineDays: 15,
        sourceReferences: [stateRecord.primaryActSourceId],
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
        title: "FORMAL CIVIC GRIEVANCE & STATUTORY SERVICE DEMAND REPRESENTATION",
        date: dateStr,
        recipientTitle: "The Commissioner / Executive Officer",
        recipientOrg: "Local Municipal Corporation / Civic Body",
        recipientAddress: `${loc}, ${state}`,
        applicantName: name,
        applicantAddress: address,
        subject: "Representation Regarding Urgent Civic Infrastructure Repair & Public Service Failure",
        factsAndGrievance: [
          `The scheduled locality (${loc}) has been suffering from persistent civic infrastructure deficiency (road potholes / uncleaned drainage / water disruption).`,
          `The civic defect presents an immediate safety risk to residents, pedestrians, and vehicular traffic.`,
          `Public authorities have a mandatory duty under Municipal Corporation Acts to maintain public streets and public health infrastructure.`,
        ],
        demandedRelief: [
          "Immediate on-site inspection and emergency repair within 7 days of this notice.",
          "Disclosure of sanctioned work orders and contractor defect liability period.",
        ],
        legalStatutoryBasis: [
          "Statutory Municipal Corporation Act (Obligatory Duties of Local Authorities)",
          "Section 6(1), Right to Information Act, 2005 (Right to inspect works and certified records)",
        ],
        evidenceEnclosures: [
          "E1 — Date-stamped Photographs showing infrastructure damage",
          "E2 — Street Landmark and Ward Location Map",
          "E3 — Prior Grievance Reference Acknowledgements (if any)",
        ],
        responseTimelineDays: 15,
        sourceReferences: ["SRC-TN-CCMC-JURISDICTION"],
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
      font-weight: bold;
      text-transform: uppercase;
      color: #102A56;
      text-align: center;
      margin-bottom: 8px;
    }
    .doc-meta {
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      color: #4A5568;
    }
    .section {
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 10pt;
      font-weight: bold;
      text-transform: uppercase;
      color: #102A56;
      border-bottom: 1px solid #CBD5E1;
      padding-bottom: 3px;
      margin-bottom: 6px;
    }
    .parties-table {
      width: 100%;
      margin-bottom: 15px;
      border-collapse: collapse;
    }
    .parties-table td {
      width: 50%;
      vertical-align: top;
      padding: 4px;
    }
    .bullet-list {
      margin: 0;
      padding-left: 20px;
    }
    .bullet-list li {
      margin-bottom: 4px;
    }
    .schedule-box {
      background-color: #F8FAFC;
      border: 1px solid #E2E8F0;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
    }
    .footer-sign {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header-box">
    <div class="doc-title">${data.title}</div>
    <div class="doc-meta">
      <span>Date of Notice: <strong>${data.date}</strong></span>
      <span>Statutory Resolution Window: <strong>${data.responseTimelineDays} Days</strong></span>
    </div>
  </div>

  <table class="parties-table">
    <tr>
      <td>
        <div class="section-title">TO (OPPOSITE PARTY):</div>
        <div><strong>${data.recipientTitle}</strong></div>
        <div>${data.recipientOrg}</div>
        <div>${data.recipientAddress}</div>
      </td>
      <td>
        <div class="section-title">FROM (CITIZEN APPLICANT):</div>
        <div><strong>${data.applicantName}</strong></div>
        <div>${data.applicantAddress}</div>
      </td>
    </tr>
  </table>

  <div class="section">
    <div class="section-title">SUBJECT:</div>
    <p><strong>${data.subject}</strong></p>
  </div>

  <div class="section">
    <div class="section-title">STATEMENT OF FACTS & GRIEVANCE:</div>
    <ol class="bullet-list">
      ${data.factsAndGrievance.map((fact) => `<li>${fact}</li>`).join("")}
    </ol>
  </div>

  <div class="section">
    <div class="section-title">STATUTORY & LEGAL BASIS:</div>
    <ul class="bullet-list">
      ${data.legalStatutoryBasis.map((basis) => `<li>${basis}</li>`).join("")}
    </ul>
  </div>

  <div class="section">
    <div class="section-title">DEMANDED RELIEF & RECTIFICATION:</div>
    <ol class="bullet-list">
      ${data.demandedRelief.map((relief) => `<li><strong>${relief}</strong></li>`).join("")}
    </ol>
  </div>

  <div class="section">
    <div class="section-title">SCHEDULE OF EVIDENCE ENCLOSURES:</div>
    <div class="schedule-box">
      <ul class="bullet-list">
        ${data.evidenceEnclosures.map((enc) => `<li>${enc}</li>`).join("")}
      </ul>
    </div>
  </div>

  <div class="footer-sign">
    <div>
      <p style="font-size: 9pt; color: #64748B;">Dispatched via Speed Post / Registered Email</p>
    </div>
    <div style="text-align: right;">
      <p style="margin-bottom: 40px;">Respectfully submitted,</p>
      <p><strong>(${data.applicantName})</strong></p>
      <p style="font-size: 9pt; color: #64748B;">Citizen / Complainant</p>
    </div>
  </div>
</body>
</html>`;
}
