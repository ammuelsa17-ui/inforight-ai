import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 1F: Sector-Specific Consumer Dispute Routing Records
 * Grounded in statutory sector regulators, ombudsman schemes, and verified portals.
 */
export const CONSUMER_SECTOR_ROUTES: VerifiedSourceRecord[] = [
  // 1. Banking & Financial Services
  {
    id: "SRC-CONS-1F-BANK",
    title: "Reserve Bank of India — Integrated Ombudsman Scheme (RB-IOS, 2021)",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Integrated statutory dispute mechanism under RBI for deficiency in banking, NBFC, and payment system services (ATM failures, failed UPI/NEFT debits, unauthorized digital transactions, loan overcharging, harassment by recovery agents). Requires prior 30-day internal bank grievance escalation before approaching the Banking Ombudsman.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Reserve Bank of India (RBI), Gazette of India (Extraordinary)",
      official_source_url: "https://cms.rbi.org.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Reserve Bank of India / Centralised Receipt and Processing Centre (CRPC)",
      effective_from: "2021-11-12",
      source_updated_date: "2025-06-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Section 35A Banking Regulation Act 1949, Section 45L RBI Act 1934, Section 18 Payment and Settlement Systems Act 2007"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Banking Ombudsman / CRPC Officer",
      organization: "Reserve Bank - Integrated Ombudsman / CRPC, Chandigarh",
      portal_url: "https://cms.rbi.org.in",
      helpline_number: "14448",
      filing_modes: ["ONLINE", "POSTAL", "EMAIL"]
    },
    rules_or_criteria: {
      time_limits_days: 365, // 1 year after receiving bank reply or 1 year + 30 days if no reply
      statutory_fees: "Free of cost",
      required_documents: [
        "Copy of original written complaint submitted to Bank/NBFC",
        "Bank acknowledgment / token number / rejection reply",
        "Bank account statement / UPI transaction reference (UTR) / SMS logs",
        "Representation explaining deficiency in service and relief sought"
      ],
      escalation_route: [
        "Tier 1: Branch Manager / Bank Customer Care",
        "Tier 2: Bank Principal Nodal Officer (PNO) / Internal Ombudsman (Wait 30 days)",
        "Tier 3: RBI Integrated Ombudsman (via cms.rbi.org.in or 14448)",
        "Alternative: District Consumer Commission via e-Jagriti (ejagriti.gov.in) if banking deficiency remains unresolved"
      ]
    },
    keywords: [
      "banking ombudsman rbi",
      "cms rbi org in 14448",
      "failed upi transaction debit",
      "atm cash not dispensed",
      "unauthorized netbanking fraud",
      "recovery agent harassment"
    ]
  },

  // 2. Insurance Services
  {
    id: "SRC-CONS-1F-INS",
    title: "Insurance Ombudsman Scheme & IRDAI Bima Bharosa Framework",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Statutory redressal framework for policyholders against life and general insurance companies for wrongful claim repudiation, delayed claim settlement, partial settlement, and premium disputes. Authorizes 17 Insurance Ombudsman offices across India to award binding compensation up to ₹50 Lakhs.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Executive Council of Insurers / Council for Insurance Ombudsmen (CIO) & IRDAI",
      official_source_url: "https://www.cioins.co.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Insurance Regulatory and Development Authority of India (IRDAI) / Council for Insurance Ombudsmen",
      effective_from: "2017-04-25",
      source_updated_date: "2023-11-10",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Insurance Ombudsman Rules, 2017 (As Amended 2021) under Section 114A Insurance Act 1938",
      gazette_notification_ref: "Notification G.S.R. 413(E)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Insurance Ombudsman (Regional Office)",
      organization: "Council for Insurance Ombudsmen (CIO) / IRDAI",
      portal_url: "https://www.cioins.co.in",
      helpline_number: "155255 / 1800-4254-732",
      filing_modes: ["ONLINE", "EMAIL", "POSTAL"]
    },
    rules_or_criteria: {
      time_limits_days: 365, // Within 1 year of insurer rejection or 30 days after unresponded grievance
      statutory_fees: "Free of cost",
      required_documents: [
        "Policy document and schedules",
        "Claim form and claim rejection / repudiation letter from insurer",
        "Hospital discharge summary and medical bills (for health insurance claims)",
        "Copy of representation sent to Grievance Redressal Officer (GRO) of the insurer"
      ],
      escalation_route: [
        "Tier 1: Grievance Redressal Officer (GRO) of the Insurance Company",
        "Tier 2: IRDAI Bima Bharosa Portal (bimabharosa.irdai.gov.in / 155255)",
        "Tier 3: Regional Insurance Ombudsman (cioins.co.in) [Award binding on insurer]",
        "Alternative: Consumer Disputes Redressal Commission (District/State) via e-Jagriti (ejagriti.gov.in)"
      ]
    },
    keywords: [
      "insurance ombudsman cioins",
      "health insurance claim rejected",
      "bima bharosa irdai",
      "mediclaim dispute",
      "motor insurance claim delay",
      "life insurance death claim"
    ]
  },

  // 3. Telecom Services
  {
    id: "SRC-CONS-1F-TEL",
    title: "Telecom Consumer Protection Regulations & Redressal Framework (TRAI / DoT)",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Redressal structure for telecom subscribers regarding billing errors, SIM porting (MNP) delays, unsolicited commercial communications (DND violations), and wrongful service deactivation. Enforces two-tier mandatory internal resolution (Call Centre + Appellate Authority) followed by DoT PGPORTAL / Consumer Commission escalation.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Telecom Regulatory Authority of India (TRAI), Department of Telecommunications",
      official_source_url: "https://www.trai.gov.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Telecom Regulatory Authority of India / Department of Telecommunications",
      effective_from: "2012-01-06",
      source_updated_date: "2024-08-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Telecom Consumers Protection Regulations, 2012 & Telecom Commercial Communications Customer Preference Regulations, 2018"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Appellate Authority of Telecom Service Provider / DoT Grievance Cell",
      organization: "Telecom Service Provider / Department of Telecommunications",
      portal_url: "https://pgportal.gov.in",
      helpline_number: "198 (Toll-Free Complaint) / 1915 (NCH)",
      filing_modes: ["ONLINE", "EMAIL"]
    },
    rules_or_criteria: {
      time_limits_days: 90, // File appeal with Appellate Authority within 3 months of complaint docket
      required_documents: [
        "Unique Complaint Docket Number from 198 Call Centre",
        "Mobile bill showing incorrect tariff / VAS deduction",
        "DND screenshot and spam call/SMS reporting log"
      ],
      escalation_route: [
        "Tier 1: Customer Care Call Centre (198) — Obtain Docket Number",
        "Tier 2: Internal Appellate Authority of the Telecom Service Provider (Airtel/Jio/Vi/BSNL)",
        "Tier 3: National Consumer Helpline (1915) / DoT PGPortal (pgportal.gov.in)",
        "Tier 4: District Consumer Commission (Supreme Court ruling in *Vodafone Idea v. Ajay Parihar* confirms consumer court jurisdiction)"
      ]
    },
    keywords: [
      "telecom complaint 198",
      "trai dnd spam sms",
      "mnp porting delay",
      "wrongful mobile deduction",
      "telecom appellate authority",
      "broadband speed dispute"
    ]
  },

  // 4. Food Safety & Standards
  {
    id: "SRC-CONS-1F-FOOD",
    title: "Food Safety and Standards Grievance Redressal (FSSAI FoSCoS Framework)",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Statutory enforcement framework under the Food Safety and Standards Act 2006 for sub-standard, adulterated, misbranded, expired, or contaminated food products and restaurant hygiene violations through FSSAI FoSCoS Consumer Grievance Portal.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Food Safety and Standards Authority of India (FSSAI), Ministry of Health and Family Welfare",
      official_source_url: "https://foscos.fssai.gov.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Food Safety and Standards Authority of India / State Commissioners of Food Safety",
      effective_from: "2011-08-05",
      source_updated_date: "2025-01-10",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Food Safety and Standards Act, 2006 (Act No. 34 of 2006), Sections 26, 50 to 59"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Designated Officer / Food Safety Officer",
      organization: "FSSAI / State Food Safety Commissionerate",
      portal_url: "https://foscos.fssai.gov.in",
      helpline_number: "1800-112-100",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      required_documents: [
        "Food purchase receipt / restaurant bill",
        "Photographs / video showing foreign matter, insect contamination, or expired date label",
        "Preserved unconsumed food sample / original packaging with batch number",
        "Medical records / doctor prescription in case of food poisoning"
      ],
      escalation_route: [
        "FSSAI Food Safety Connect App / FoSCoS Consumer Grievance Portal (foscos.fssai.gov.in)",
        "Complaint to District Food Safety Officer (FSO) for sample inspection and lab testing",
        "National Consumer Helpline (NCH 1915)",
        "Consumer Commission petition for product liability compensation under CPA 2019 Section 84"
      ]
    },
    keywords: [
      "fssai food complaint",
      "food adulteration complaint",
      "expired food item sold",
      "restaurant hygiene violation",
      "food poisoning compensation",
      "foscos grievance"
    ]
  },

  // 5. Electricity & Power Utilities
  {
    id: "SRC-CONS-1F-ELEC",
    title: "Electricity Consumer Grievance Redressal Forum (CGRF) & Ombudsman Framework",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Statutory multi-tier dispute machinery under Electricity Act 2003 and Electricity (Rights of Consumers) Rules 2020: covers billing disputes, faulty meters, unannounced load shedding, delayed new connections, and low voltage supply via Internal Grievance, CGRF, and Electricity Ombudsman.",
    jurisdiction: {
      country: "IN",
      state_ut: "State-specific (National Framework)",
      government_level: "STATE",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Ministry of Power, The Gazette of India (Extraordinary)",
      official_source_url: "https://powermin.gov.in/en/content/electricity-rights-consumers-rules-2020",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "State Electricity Regulatory Commissions (SERCs) / State Distribution Companies (DISCOMs)",
      effective_from: "2020-12-31",
      source_updated_date: "2024-03-14",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Electricity Act 2003, Section 42(5), Section 42(6) & Electricity (Rights of Consumers) Rules 2020",
      gazette_notification_ref: "Notification G.S.R. 818(E)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Chairperson, Consumer Grievance Redressal Forum / Electricity Ombudsman",
      organization: "Consumer Grievance Redressal Forum (CGRF) / State Electricity Regulatory Commission",
      portal_url: "https://powermin.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 60, // CGRF must decide grievances within 60 days
      statutory_fees: "Free of cost",
      required_documents: [
        "Electricity Consumer Number / Service Connection Number (SC No.)",
        "Disputed electricity bill copies and proof of regular payment history",
        "Meter test report / photo of meter display readings",
        "Copy of initial complaint lodged with Assistant Executive Engineer (AEE)"
      ],
      escalation_route: [
        "Tier 1: Section Officer / Assistant Executive Engineer (AEE) of local DISCOM",
        "Tier 2: Consumer Grievance Redressal Forum (CGRF) at Circle / Division level",
        "Tier 3: Electricity Ombudsman appointed by State Electricity Regulatory Commission (within 30 days of CGRF order)",
        "Alternative: District Consumer Commission (Supreme Court confirmed concurrent consumer jurisdiction for billing deficiency)"
      ]
    },
    keywords: [
      "cgrf electricity ombudsman",
      "faulty electricity meter bill",
      "power cut compensation rules",
      "inflated power bill dispute",
      "discom consumer grievance"
    ]
  },

  // 6. Civil Aviation & Passenger Rights
  {
    id: "SRC-CONS-1F-AVIA",
    title: "AirSewa Portal & DGCA Passenger Charter Rights",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Ministry of Civil Aviation & DGCA Passenger Charter governing passenger rights: mandatory compensation for flight cancellations (up to ₹10,000 or full ticket refund), flight delay refreshments and hotel accommodation (delays over 4-6 hours), lost/damaged baggage compensation (up to ₹20,000 per bag or international Montreal Convention limits), and AirSewa portal escalation.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Directorate General of Civil Aviation (DGCA) & Ministry of Civil Aviation",
      official_source_url: "https://airsewa.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "Directorate General of Civil Aviation (DGCA) / Ministry of Civil Aviation",
      effective_from: "2019-02-27",
      source_updated_date: "2024-07-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 4,
      legal_basis: "Civil Aviation Requirements (CAR) Section 3, Series M, Part IV (Facilities to be provided to passengers by airlines due to denied boarding, cancellation and delays)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "AirSewa Nodal Officer / DGCA Grievance Cell",
      organization: "Ministry of Civil Aviation / AirSewa",
      portal_url: "https://airsewa.gov.in",
      helpline_number: "AirSewa App / 1915 (NCH)",
      filing_modes: ["ONLINE"]
    },
    rules_or_criteria: {
      time_limits_days: 30,
      required_documents: [
        "Flight ticket (PNR) and Boarding Pass",
        "Property Irregularity Report (PIR) for damaged or lost baggage",
        "Airline cancellation / delay notification SMS or email",
        "Receipts of out-of-pocket food and hotel expenses incurred during delay"
      ],
      escalation_route: [
        "Tier 1: Airline Grievance Officer / Customer Support Desk",
        "Tier 2: AirSewa Portal (airsewa.gov.in / Ministry of Civil Aviation)",
        "Tier 3: National Consumer Helpline (NCH 1915)",
        "Tier 4: District / State Consumer Commission for deficiency in travel service"
      ]
    },
    keywords: [
      "airsewa flight complaint",
      "dgca passenger charter",
      "flight delay compensation",
      "cancelled flight refund",
      "lost baggage pir claim",
      "airline consumer dispute"
    ]
  },

  // 7. Housing & Real Estate
  {
    id: "SRC-CONS-1F-RERA",
    title: "Real Estate (Regulation and Development) Act, 2016 (RERA) & Consumer Forum Concurrent Remedies",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Statutory real estate regulatory framework: mandates registration of projects with RERA, 70% fund escrow requirement, delayed possession interest/compensation, and structural defect rectification within 5 years. Note: Supreme Court judgment in *Imperia Structures Ltd. v. Anil Patni (2020)* affirmed that homebuyers have concurrent rights to file before either RERA or Consumer Commissions (NCDRC/State Commission).",
    jurisdiction: {
      country: "IN",
      state_ut: "State-specific (National Act)",
      government_level: "STATE",
      jurisdiction_type: "CONCURRENT"
    },
    provenance: {
      official_source_name: "Ministry of Housing and Urban Affairs, The Gazette of India (Extraordinary)",
      official_source_url: "https://mohua.gov.in/cms/real-estate-act-2016.php",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "State Real Estate Regulatory Authorities (e.g., TNRERA, MahaRERA, HRERA, UP-RERA)",
      effective_from: "2017-05-01",
      source_updated_date: "2024-01-15",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Real Estate (Regulation and Development) Act, 2016 (Act No. 16 of 2016), Sections 14, 18, 19, 31, and 71"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Adjudicating Officer / Bench",
      organization: "State Real Estate Regulatory Authority (RERA) / State Consumer Disputes Redressal Commission",
      portal_url: "https://mohua.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      required_documents: [
        "Builder-Buyer Agreement (Allotment Letter / Agreement for Sale)",
        "Payment receipts and bank statement showing full/partial installments paid",
        "RERA Project Registration Number",
        "Correspondence regarding delayed handover or unauthorized alteration of layout"
      ],
      escalation_route: [
        "Tier 1: Formal legal notice to developer demanding interest for delay under Section 18",
        "Option A: State RERA Authority (Online filing via State RERA portal for possession/interest/refund)",
        "Option B: Consumer Disputes Redressal Commission via e-Jagriti (ejagriti.gov.in) (Pecuniary: District up to ₹50L, State ₹50L–₹2Cr, National >₹2Cr)",
        "Note: Homebuyer can choose RERA or Consumer Court based on relief sought (*Imperia Structures* ruling)"
      ]
    },
    keywords: [
      "rera homebuyer delay",
      "builder possession delay compensation",
      "section 18 rera interest",
      "imperia structures concurrent remedy",
      "ncdrc flat delay complaint"
    ]
  },

  // 8. Digital Services & Online Cyber Financial Disputes
  {
    id: "SRC-CONS-1F-DIGI",
    title: "Digital Financial Consumer Protection & National Cyber Crime Redressal (1930 / cybercrime.gov.in)",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1F_SECTOR_SPECIFIC_DISPUTES",
    summary: "Integrated cyber financial fraud and digital consumer dispute route: Citizen Financial Cyber Fraud Reporting System (Helpline 1930 / cybercrime.gov.in) enables immediate bank freeze of defrauded amounts within the 'golden hour', complemented by RBI Zero-Liability framework (RBI/2017-18/15) for unauthorized third-party digital banking transactions reported within 3 days.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs & Reserve Bank of India",
      official_source_url: "https://cybercrime.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "Ministry of Home Affairs / Reserve Bank of India",
      effective_from: "2019-08-30",
      source_updated_date: "2026-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 4,
      legal_basis: "Information Technology Act 2000 & RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18 (Customer Protection – Limiting Liability of Customers in Unauthorised Electronic Banking Transactions)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      organization: "National Cyber Crime Reporting Portal / I4C",
      portal_url: "https://cybercrime.gov.in",
      helpline_number: "1930 (National Cyber Financial Fraud Helpline)",
      filing_modes: ["ONLINE"]
    },
    rules_or_criteria: {
      time_limits_days: 3, // Golden period: report within 3 working days to bank for ZERO customer liability
      statutory_fees: "Free of cost",
      required_documents: [
        "Bank transaction statement / UPI reference number (UTR)",
        "Screenshots of fraudulent phishing link, fake website, or unauthorized debit SMS",
        "Copy of immediate written/email intimations sent to bank"
      ],
      escalation_route: [
        "Immediate Step 1: Call National Cyber Crime Helpline 1930 to freeze transiting funds",
        "Immediate Step 2: Notify Bank / Block card & UPI within 3 days for RBI Zero Liability protection",
        "Step 3: Register formal cyber FIR on cybercrime.gov.in",
        "Step 4: If bank fails to credit amount within 10 days, escalate to RBI Ombudsman (cms.rbi.org.in)",
        "Step 5: District Consumer Commission for deficiency in bank security systems"
      ]
    },
    keywords: [
      "cyber crime helpline 1930",
      "rbi zero liability 3 days",
      "unauthorized upi debit fraud",
      "phishing scam complaint",
      "cybercrime gov in acknowledgment"
    ]
  }
];
