import { OfficialFormDefinition } from "@/types/form-filler";

/**
 * Official Government Forms Registry
 * Strictly sourced from official acts, gazettes, and verified government portals.
 */
export const OFFICIAL_FORMS_REGISTRY: OfficialFormDefinition[] = [
  // =========================================================================
  // 1. RTI ACCESS FORMS
  // =========================================================================
  {
    form_id: "FORM-RTI-6-1",
    form_name: "Application for Seeking Information under Section 6(1) of the RTI Act, 2005",
    form_code: "RTI Section 6(1)",
    domain: "RTI_ACCESS",
    authority: "Public Information Officer (CPIO / SPIO)",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL"
    },
    official_source: "Right to Information Rules, 2012 / DoPT / State RTI Rules",
    official_blank_form_url: "https://dopt.gov.in/rti-act-2005",
    submission: {
      online: true,
      offline: true,
      portal: "https://rtionline.gov.in",
      statutory_fee: "₹10 (Exempt for BPL Cardholders)",
      fee_payment_mode: "Court fee stamp, IPO, DD, Banker's Cheque, or Online Payment Gateway"
    },
    last_verified: "2026-08-20",
    verification_status: "CURRENT",
    fields: [
      {
        field_id: "applicant_name",
        official_label: "Name of the Applicant",
        plain_language_question: "What is your full legal name?",
        required: true,
        data_type: "string",
        sensitive: true,
        reusable_profile_field: "applicant_name"
      },
      {
        field_id: "applicant_address",
        official_label: "Address for Correspondence",
        plain_language_question: "What is your complete postal address with PIN code where the response should be mailed?",
        required: true,
        data_type: "text",
        sensitive: true,
        reusable_profile_field: "applicant_address"
      },
      {
        field_id: "applicant_phone",
        official_label: "Contact Telephone / Mobile Number",
        plain_language_question: "What is your 10-digit mobile number?",
        required: false,
        data_type: "phone",
        format: "phone_10_digit",
        validation: { pattern: "^[6-9]\\d{9}$", customErrorMessage: "Please enter a valid 10-digit Indian mobile number." },
        sensitive: true,
        reusable_profile_field: "applicant_phone"
      },
      {
        field_id: "public_authority_name",
        official_label: "Name of Public Authority / Department",
        plain_language_question: "Which government department or office holds the records you are looking for?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "subject_matter",
        official_label: "Subject Matter of Information Sought",
        plain_language_question: "In one brief sentence, what is the topic or project of your query?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "numbered_record_requests",
        official_label: "Particulars of Information Required (Numbered Points)",
        plain_language_question: "What specific government records or certified copies do you need?",
        help_text: "Our AI converts your plain-language problem into objective record requests (sanction orders, work orders, measurement books).",
        required: true,
        data_type: "text",
        sensitive: false
      },
      {
        field_id: "time_period_of_records",
        official_label: "Period to which the Information Relates",
        plain_language_question: "What date range or financial year should these records cover?",
        required: true,
        data_type: "string",
        placeholder: "e.g. FY 2024-25 or January 2025 to date",
        sensitive: false
      },
      {
        field_id: "preferred_format",
        official_label: "Preferred Delivery Format",
        plain_language_question: "How would you like to receive the information?",
        required: true,
        data_type: "select",
        validation: {
          allowedOptions: [
            { label: "Certified Hard Copies by Registered/Speed Post", value: "CERTIFIED_HARD_COPY" },
            { label: "Electronic Copy by Email / CD", value: "ELECTRONIC_COPY" },
            { label: "Inspection of Original Records at Office (Section 2(j)(i))", value: "INSPECTION_OF_RECORDS" }
          ]
        },
        sensitive: false
      },
      {
        field_id: "is_bpl",
        official_label: "Whether Applicant Belongs to Below Poverty Line (BPL)",
        plain_language_question: "Do you hold a Below Poverty Line (BPL) card (for ₹10 fee exemption)?",
        required: true,
        data_type: "boolean",
        sensitive: false
      },
      {
        field_id: "bpl_card_number",
        official_label: "BPL Certificate / Card Number",
        plain_language_question: "What is your BPL card or certificate number?",
        required: true,
        data_type: "string",
        conditional: { dependsOnFieldId: "is_bpl", operator: "IS_TRUE", expectedValue: true },
        sensitive: true
      }
    ],
    documents_required: [
      {
        doc_id: "DOC-FEE-PROOF",
        document_name: "Application Fee Proof / IPO / Court Fee Stamp",
        official_description: "Proof of ₹10 application fee payment or BPL card copy",
        mandatory: true,
        accepted_formats: ["PDF", "JPG", "PNG"],
        max_size_mb: 2
      }
    ]
  },
  {
    form_id: "FORM-RTI-19-1",
    form_name: "First Appeal under Section 19(1) of the Right to Information Act, 2005",
    form_code: "RTI Form 19(1)",
    domain: "RTI_ACCESS",
    authority: "First Appellate Authority (FAA)",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL"
    },
    official_source: "Right to Information Act, 2005, Section 19(1) & RTI Rules 2012",
    official_blank_form_url: "https://cic.gov.in",
    submission: {
      online: true,
      offline: true,
      portal: "https://rtionline.gov.in",
      statutory_fee: "Nil (Free of cost)"
    },
    last_verified: "2026-08-20",
    verification_status: "CURRENT",
    fields: [
      {
        field_id: "appellant_name",
        official_label: "Name of the Appellant",
        plain_language_question: "What is your full legal name?",
        required: true,
        data_type: "string",
        sensitive: true,
        reusable_profile_field: "applicant_name"
      },
      {
        field_id: "appellant_address",
        official_label: "Address for Correspondence",
        plain_language_question: "What is your full postal address?",
        required: true,
        data_type: "text",
        sensitive: true,
        reusable_profile_field: "applicant_address"
      },
      {
        field_id: "original_rti_date",
        official_label: "Date of Filing Original Section 6(1) Application",
        plain_language_question: "On what date was your original RTI application submitted or delivered?",
        required: true,
        data_type: "date",
        sensitive: false
      },
      {
        field_id: "original_registration_number",
        official_label: "RTI Application Reference / Registration Number",
        plain_language_question: "What is the RTI registration or speed post tracking number?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "pio_name_designation",
        official_label: "Name and Designation of the CPIO / SPIO",
        plain_language_question: "Who was the designated PIO (office/designation)?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "appeal_ground",
        official_label: "Grounds for First Appeal",
        plain_language_question: "Why are you filing this appeal?",
        required: true,
        data_type: "select",
        validation: {
          allowedOptions: [
            { label: "No response received within 30 days (Deemed Refusal)", value: "DEEMED_REFUSAL_NO_RESPONSE" },
            { label: "Information wrongfully rejected / denied under Section 8", value: "WRONGFUL_EXEMPTION_CLAIMED" },
            { label: "Incomplete, misleading, or false information provided", value: "INCOMPLETE_OR_FALSE_INFO" },
            { label: "Exorbitant / unreasonable copying fees demanded", value: "EXCESSIVE_FEES_DEMANDED" }
          ]
        },
        sensitive: false
      },
      {
        field_id: "prayer_relief_sought",
        official_label: "Relief Sought / Prayer",
        plain_language_question: "What order are you requesting the First Appellate Authority to issue?",
        required: true,
        data_type: "text",
        help_text: "Standard prayer: Direction to PIO to supply certified records free of cost under Section 7(6).",
        sensitive: false
      }
    ],
    documents_required: [
      {
        doc_id: "DOC-ORIG-RTI",
        document_name: "Copy of Original RTI Application",
        official_description: "Copy of original Section 6(1) application with fee proof",
        mandatory: true,
        accepted_formats: ["PDF"],
        max_size_mb: 5
      },
      {
        doc_id: "DOC-PIO-REPLY",
        document_name: "Copy of PIO Reply (if received)",
        official_description: "Rejection letter or reply received from PIO",
        mandatory: false,
        accepted_formats: ["PDF"],
        max_size_mb: 5
      }
    ]
  },

  // =========================================================================
  // 2. CONSUMER PROTECTION FORMS
  // =========================================================================
  {
    form_id: "FORM-CONS-EJAGRITI",
    form_name: "Consumer Complaint Petition before District Consumer Commission (e-Jagriti)",
    form_code: "CPA 2019 Section 35",
    domain: "CONSUMER_PROTECTION",
    authority: "District Consumer Disputes Redressal Commission (DCDRC)",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "DISTRICT"
    },
    official_source: "Consumer Protection (Consumer Commission Procedure) Regulations, 2020 & e-Jagriti Integrated Consumer Portal",
    official_blank_form_url: "https://ejagriti.gov.in",
    submission: {
      online: true,
      offline: true,
      portal: "https://ejagriti.gov.in",
      statutory_fee: "Exempt up to ₹5 Lakhs; Nominal scale for higher claims as prescribed"
    },
    last_verified: "2026-08-20",
    verification_status: "CURRENT",
    fields: [
      {
        field_id: "complainant_name",
        official_label: "Name of the Complainant",
        plain_language_question: "What is your full legal name?",
        required: true,
        data_type: "string",
        sensitive: true,
        reusable_profile_field: "applicant_name"
      },
      {
        field_id: "complainant_address",
        official_label: "Address of the Complainant",
        plain_language_question: "What is your residential / communication address?",
        required: true,
        data_type: "text",
        sensitive: true,
        reusable_profile_field: "applicant_address"
      },
      {
        field_id: "opposite_party_name",
        official_label: "Name of the Opposite Party (Seller / Manufacturer / Service Provider)",
        plain_language_question: "What is the legal name of the company or merchant you are filing against?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "opposite_party_address",
        official_label: "Registered Office / Branch Address of Opposite Party",
        plain_language_question: "What is the office address of the opposite party?",
        required: true,
        data_type: "text",
        sensitive: false
      },
      {
        field_id: "transaction_date",
        official_label: "Date of Purchase / Transaction",
        plain_language_question: "When did you buy the product or book the service?",
        required: true,
        data_type: "date",
        sensitive: false
      },
      {
        field_id: "total_consideration_paid",
        official_label: "Total Consideration Paid (in INR)",
        plain_language_question: "How much total money did you pay (in ₹)?",
        required: true,
        data_type: "currency",
        validation: { minValue: 1 },
        sensitive: false
      },
      {
        field_id: "dispute_summary",
        official_label: "Facts of the Case / Summary of Deficiency or Defect",
        plain_language_question: "Please describe what went wrong with the product or service.",
        required: true,
        data_type: "text",
        sensitive: false
      },
      {
        field_id: "compensation_claimed",
        official_label: "Compensation & Relief Claimed",
        plain_language_question: "What relief do you seek (e.g. full refund of ₹X with interest, replacement, damages)?",
        required: true,
        data_type: "text",
        sensitive: false
      }
    ],
    documents_required: [
      {
        doc_id: "DOC-TAX-INVOICE",
        document_name: "Tax Invoice / Bill of Purchase",
        official_description: "Original or clear copy of purchase invoice / cash memo",
        mandatory: true,
        accepted_formats: ["PDF", "JPG"],
        max_size_mb: 5
      },
      {
        doc_id: "DOC-PAYMENT-PROOF",
        document_name: "Payment Proof",
        official_description: "Bank statement, UPI receipt, or credit card transaction slip",
        mandatory: true,
        accepted_formats: ["PDF", "JPG"],
        max_size_mb: 5
      },
      {
        doc_id: "DOC-LEGAL-NOTICE",
        document_name: "Notice Served on Opposite Party & Reply",
        official_description: "Copy of written notice sent to merchant and postal tracking proof",
        mandatory: false,
        accepted_formats: ["PDF"],
        max_size_mb: 5
      }
    ]
  },

  // =========================================================================
  // 3. TENANT RIGHTS FORMS (TAMIL NADU SPECIFIC)
  // =========================================================================
  {
    form_id: "FORM-TEN-TN-REG",
    form_name: "Application for Registration of Tenancy Agreement (TNRRRLT Form I)",
    form_code: "TNRRRLT Form I",
    domain: "TENANT_RIGHTS",
    authority: "Rent Authority (Revenue Divisional Officer / Tahsildar)",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      government_level: "STATE"
    },
    official_source: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Rules, 2019",
    official_blank_form_url: "https://www.tenancy.tn.gov.in",
    submission: {
      online: true,
      offline: false,
      portal: "https://www.tenancy.tn.gov.in",
      statutory_fee: "₹100 portal processing fee"
    },
    last_verified: "2026-08-20",
    verification_status: "CURRENT",
    fields: [
      {
        field_id: "landlord_name",
        official_label: "Name of the Landlord",
        plain_language_question: "What is the landlord's full name?",
        required: true,
        data_type: "string",
        sensitive: true
      },
      {
        field_id: "tenant_name",
        official_label: "Name of the Tenant",
        plain_language_question: "What is the tenant's full legal name?",
        required: true,
        data_type: "string",
        sensitive: true,
        reusable_profile_field: "applicant_name"
      },
      {
        field_id: "premises_address",
        official_label: "Address of the Rented Premises",
        plain_language_question: "What is the exact door number, street, ward, and PIN code of the rented property?",
        required: true,
        data_type: "text",
        sensitive: true
      },
      {
        field_id: "tenancy_type",
        official_label: "Nature of Tenancy",
        plain_language_question: "Is this property for residential or commercial use?",
        required: true,
        data_type: "select",
        validation: {
          allowedOptions: [
            { label: "Residential Premises", value: "RESIDENTIAL" },
            { label: "Commercial / Non-Residential Premises", value: "COMMERCIAL" }
          ]
        },
        sensitive: false
      },
      {
        field_id: "monthly_rent",
        official_label: "Agreed Monthly Rent (in INR)",
        plain_language_question: "What is the agreed monthly rent amount (in ₹)?",
        required: true,
        data_type: "currency",
        validation: { minValue: 1 },
        sensitive: false
      },
      {
        field_id: "security_deposit_paid",
        official_label: "Security Deposit / Advance Paid (in INR)",
        plain_language_question: "How much security deposit or advance was paid?",
        required: true,
        data_type: "currency",
        help_text: "Under Tamil Nadu law, residential deposit is capped at a maximum of 3 months' rent.",
        sensitive: false
      },
      {
        field_id: "tenancy_period_months",
        official_label: "Tenancy Period (in Months)",
        plain_language_question: "For how many months is this agreement valid (e.g. 11 months)?",
        required: true,
        data_type: "number",
        validation: { minValue: 1, maxValue: 120 },
        sensitive: false
      }
    ],
    documents_required: [
      {
        doc_id: "DOC-RENTAL-AGREEMENT",
        document_name: "Signed Tenancy Agreement",
        official_description: "Scanned copy of executed rental agreement signed by both parties",
        mandatory: true,
        accepted_formats: ["PDF"],
        max_size_mb: 5
      },
      {
        doc_id: "DOC-ID-PROOFS",
        document_name: "Identity Proofs (Aadhaar / Voter ID / PAN)",
        official_description: "ID proofs of Landlord and Tenant",
        mandatory: true,
        accepted_formats: ["PDF", "JPG"],
        max_size_mb: 5
      }
    ]
  },

  // =========================================================================
  // 4. WORKPLACE GRIEVANCE FORMS
  // =========================================================================
  {
    form_id: "FORM-WRK-SAMADHAN",
    form_name: "Industrial Dispute Application under Industrial Relations Code, 2020 (SAMADHAN Portal)",
    form_code: "IR Code Section 4 / Section 70",
    domain: "WORKPLACE_RIGHTS",
    authority: "Assistant Labour Commissioner (Central) / Conciliation Officer",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL"
    },
    official_source: "Ministry of Labour & Employment / Industrial Relations Code, 2020 (Central Rules 2025) & SAMADHAN Portal",
    official_blank_form_url: "https://samadhan.labour.gov.in",
    submission: {
      online: true,
      offline: true,
      portal: "https://samadhan.labour.gov.in",
      statutory_fee: "Nil (Free of cost)"
    },
    last_verified: "2026-08-20",
    verification_status: "CURRENT",
    fields: [
      {
        field_id: "workman_name",
        official_label: "Name of the Workman",
        plain_language_question: "What is your full legal name?",
        required: true,
        data_type: "string",
        sensitive: true,
        reusable_profile_field: "applicant_name"
      },
      {
        field_id: "employer_name",
        official_label: "Name of the Employer / Management",
        plain_language_question: "What is the legal name of the company or employer?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "establishment_address",
        official_label: "Address of the Establishment / Work Site",
        plain_language_question: "What is the factory / establishment workplace address?",
        required: true,
        data_type: "text",
        sensitive: false
      },
      {
        field_id: "designation_role",
        official_label: "Designation / Trade / Nature of Duties",
        plain_language_question: "What was your job title and primary duties?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "date_of_appointment",
        official_label: "Date of Joining / Appointment",
        plain_language_question: "When did you start working with this employer?",
        required: true,
        data_type: "date",
        sensitive: false
      },
      {
        field_id: "last_drawn_salary",
        official_label: "Last Drawn Wages / Salary (per month)",
        plain_language_question: "What was your monthly salary (in ₹)?",
        required: true,
        data_type: "currency",
        validation: { minValue: 1 },
        sensitive: false
      },
      {
        field_id: "date_of_termination",
        official_label: "Date of Termination / Retrenchment / Refusal of Work",
        plain_language_question: "On what date were you terminated or denied work?",
        required: true,
        data_type: "date",
        sensitive: false
      },
      {
        field_id: "statement_of_claims",
        official_label: "Statement of Dispute & Relief Claimed",
        plain_language_question: "Explain why the termination was illegal and what relief (reinstatement / back wages / compensation) you seek.",
        required: true,
        data_type: "text",
        sensitive: false
      }
    ],
    documents_required: [
      {
        doc_id: "DOC-TERMINATION-LETTER",
        document_name: "Termination / Dismissal Letter or Relieving Rejection Email",
        official_description: "Copy of termination order or communication denying entry",
        mandatory: false,
        accepted_formats: ["PDF", "JPG"],
        max_size_mb: 5
      },
      {
        doc_id: "DOC-SALARY-SLIPS",
        document_name: "Last 3 Months Salary Slips & Bank Statement",
        official_description: "Proof of wage payments and employment continuity",
        mandatory: true,
        accepted_formats: ["PDF"],
        max_size_mb: 5
      }
    ]
  },
  {
    form_id: "FORM-WRK-GRATUITY-N",
    form_name: "Application for Direction to Pay Gratuity before the Controlling Authority (Form N)",
    form_code: "Payment of Gratuity Form N",
    domain: "WORKPLACE_RIGHTS",
    authority: "Controlling Authority under the Payment of Gratuity Act, 1972",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL"
    },
    official_source: "Payment of Gratuity (Central) Rules, 1972, Rule 10(1)",
    official_blank_form_url: "https://clc.gov.in",
    submission: {
      online: false,
      offline: true,
      office: "Office of the Controlling Authority / Assistant Labour Commissioner",
      statutory_fee: "Nil"
    },
    last_verified: "2026-08-20",
    verification_status: "CURRENT",
    fields: [
      {
        field_id: "employee_name",
        official_label: "Name of the Employee",
        plain_language_question: "What is your full legal name?",
        required: true,
        data_type: "string",
        sensitive: true,
        reusable_profile_field: "applicant_name"
      },
      {
        field_id: "employer_name",
        official_label: "Name of the Employer",
        plain_language_question: "What is the employer / organization name?",
        required: true,
        data_type: "string",
        sensitive: false
      },
      {
        field_id: "total_years_service",
        official_label: "Total Completed Years of Service",
        plain_language_question: "How many full years did you work at this company (must be 5+ continuous years)?",
        required: true,
        data_type: "number",
        validation: { minValue: 1 },
        sensitive: false
      },
      {
        field_id: "last_drawn_basic_da",
        official_label: "Last Drawn Basic Pay + Dearness Allowance (per month)",
        plain_language_question: "What was your last monthly Basic Pay + DA?",
        required: true,
        data_type: "currency",
        validation: { minValue: 1 },
        sensitive: false
      },
      {
        field_id: "gratuity_amount_claimed",
        official_label: "Gratuity Amount Claimed (in INR)",
        plain_language_question: "What is the calculated gratuity amount due [(15 * Last Salary * Years) / 26]?",
        required: true,
        data_type: "currency",
        validation: { minValue: 1 },
        sensitive: false
      }
    ],
    documents_required: [
      {
        doc_id: "DOC-FORM-I-COPY",
        document_name: "Copy of Form I (Original Application submitted to Employer)",
        official_description: "Copy of Form I sent to employer with postal acknowledgment",
        mandatory: true,
        accepted_formats: ["PDF"],
        max_size_mb: 5
      }
    ]
  }
];
