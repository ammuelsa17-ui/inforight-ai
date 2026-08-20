export interface RepresentationTemplate {
  category: "consumer" | "tenant" | "workplace";
  issueType: string;
  recipientTitle: string;
  defaultSubject: string;
  defaultBody: string;
  requiredEvidence: string[];
  escalationPortal: string;
  escalationUrl: string;
}

export const DRAFT_FORM_TEMPLATES: Record<string, RepresentationTemplate> = {
  CONSUMER_REFUND_DENIAL: {
    category: "consumer",
    issueType: "Defective Product / Refund Denial",
    recipientTitle: "Customer Grievance Redressal Officer / Nodal Officer",
    defaultSubject: "Formal Representation regarding Defective Product and Unlawful Refund Denial",
    defaultBody: "I am writing to formally raise a consumer grievance regarding the purchase of a product which was delivered in defective condition. Despite multiple written communications and proof of defect within the return window, refund has been unlawfully denied in violation of Consumer Protection (E-Commerce) Rules, 2020.",
    requiredEvidence: [
      "Tax invoice / Order confirmation email",
      "Unboxing video or photographs of defective item",
      "Written email communications denying refund",
      "Payment transaction receipt",
    ],
    escalationPortal: "e-Jagriti Consumer Portal & NCH (1915)",
    escalationUrl: "https://consumerhelpline.gov.in/",
  },
  TENANT_DEPOSIT_WITHHOLDING: {
    category: "tenant",
    issueType: "Security Deposit Withholding / Tenancy Dispute",
    recipientTitle: "Landlord / Property Manager",
    defaultSubject: "Legal Representation for Immediate Refund of Rental Security Deposit",
    defaultBody: "I am writing to demand the immediate return of my security deposit paid for tenancy. Vacating inspection was completed with zero structural damage, key handover was acknowledged, and all utility bills have been cleared in full.",
    requiredEvidence: [
      "Signed Lease / Rental Agreement",
      "Security Deposit Bank Payment Receipt",
      "Handover Acknowledgment / Keys Return Record",
      "Final Electricity & Utility Clearance Receipts",
    ],
    escalationPortal: "State Rent Authority & Rent Court",
    escalationUrl: "https://www.tn.gov.in/",
  },
  WORKPLACE_UNPAID_SALARY: {
    category: "workplace",
    issueType: "Unpaid Salary / Wages Recovery",
    recipientTitle: "Head of Human Resources / Managing Director",
    defaultSubject: "Formal Grievance Representation regarding Unpaid Monthly Salary & Final Settlement",
    defaultBody: "I am writing to formally demand the disbursement of earned salary and full and final settlement dues for my service period. Despite completing formal handover and exit requirements, salary disbursement remains unlawfully delayed.",
    requiredEvidence: [
      "Employment Offer Letter / Appointment Contract",
      "Monthly Salary Slips & Bank Statements",
      "Resignation Email & Handover Sign-off",
      "Formal Demand Letter Copy",
    ],
    escalationPortal: "SAMADHAN 2.0 (Chief Labour Commissioner Central)",
    escalationUrl: "https://betasamadhaan.labour.gov.in/",
  },
};
