import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 3F: State/UT-Specific RTI Layer Directory
 * Grounded in State RTI Rules, State Information Commissions (SICs),
 * and official State Online RTI Portals.
 * 
 * CRITICAL RULE: State Government RTIs must NEVER be directed to the
 * Central portal (rtionline.gov.in). They must route to respective State portals
 * or physical/postal SPIOs.
 */
export const RTI_STATE_SOURCES: VerifiedSourceRecord[] = [
  // =========================================================================
  // 1. TAMIL NADU (Preserving CCMC & TNIC Architecture)
  // =========================================================================
  {
    id: "SRC-RTI-3F-TN",
    title: "Tamil Nadu Right to Information Rules & State Information Commission (TNIC)",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "State RTI administration in Tamil Nadu: (1) Application fee of ₹10 payable via Court Fee Stamp, Treasury Chalan (Head of Account: 0070-00-501-AA-0000), Demand Draft, or Online Net Banking; (2) Copying charges of ₹2 per page; (3) First Appeal to designated departmental FAA; (4) Second Appeal / Complaint to the Tamil Nadu Information Commission (TNIC), No. 19, Government Farm Village, Pernambut Road, Nandanam, Chennai - 600035.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Tamil Nadu State Information Commission & Personnel and Administrative Reforms Department",
      official_source_url: "https://www.nsic.tn.gov.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Tamil Nadu Information Commission (TNIC)",
      effective_from: "2005-10-07",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Tamil Nadu Right to Information Rules, 2005 (G.O. Ms. No. 988, Public (Estt.I & Leg.) Dept.)"
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
      designation: "State Chief Information Commissioner / Registrar",
      organization: "Tamil Nadu Information Commission (TNIC)",
      office_address: "No. 19, Government Farm Village, Pernambut Road, Nandanam, Chennai - 600035",
      portal_url: "https://www.nsic.tn.gov.in",
      helpline_number: "044-24357580",
      filing_modes: ["POSTAL", "PHYSICAL_COUNTER", "ONLINE"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 (Court Fee Stamp affixed to paper, Treasury Chalan, or Online Payment)",
      time_limits_days: 30,
      escalation_route: [
        "SPIO of Tamil Nadu Government Department / Local Body / District Collectorate",
        "First Appellate Authority (FAA) of the respective Department within 30 days",
        "Second Appeal to Tamil Nadu Information Commission (TNIC), Chennai within 90 days"
      ]
    },
    keywords: [
      "tamil nadu information commission tnic",
      "nsic tn gov in",
      "tamil nadu rti court fee stamp 10 rupees",
      "treasury chalan head 0070",
      "nandanam chennai tnic"
    ]
  },
  {
    id: "SRC-RTI-TN-001", // Alias: "CIT-TAM-04"
    title: "Tamil Nadu RTI Online Filing Portal (rtionline.tn.gov.in)",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "State Government digital gateway enabling citizens to file online RTI applications and First Appeals directly to Secretariat Departments, Heads of Departments, District Collectorates, and Municipal Corporations across Tamil Nadu.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Human Resources Management Department, Government of Tamil Nadu",
      official_source_url: "https://rtionline.tn.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "Government of Tamil Nadu / Tamil Nadu Information Commission",
      effective_from: "2022-11-01",
      source_updated_date: "2026-01-10",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 4,
      legal_basis: "Tamil Nadu Right to Information Rules & Digital Governance Directives"
    },
    supported_use_cases: [
      "jurisdiction_routing",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      organization: "Tamil Nadu RTI Online Portal Cell",
      portal_url: "https://rtionline.tn.gov.in",
      filing_modes: ["ONLINE"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 via Net Banking / UPI / Debit Card",
      time_limits_days: 30
    },
    keywords: [
      "rtionline tn gov in",
      "tamil nadu rti portal",
      "chennai coimbatore online rti",
      "tn first appeal online"
    ]
  },
  {
    id: "CCMC_RTI_AUTHORITY", // Alias: "CIT-TAM-02", "SRC-RTI-CCMC-001"
    title: "Coimbatore City Municipal Corporation (CCMC) RTI Public Authority Directory",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "Curated official municipal authority directory identifying designated SPIOs and First Appellate Authorities across all 5 administrative zones (East, West, North, South, Central) of Coimbatore City Municipal Corporation.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      district_if_relevant: "Coimbatore",
      local_body_if_relevant: "Coimbatore City Municipal Corporation",
      government_level: "LOCAL",
      jurisdiction_type: "MUNICIPAL"
    },
    provenance: {
      official_source_name: "Coimbatore Corporation Official Portal, Municipal Administration and Water Supply Department",
      official_source_url: "https://www.ccmc.gov.in",
      source_type: "MINISTRY_DEPT_WEBSITE",
      administering_authority: "Coimbatore City Municipal Corporation, Government of Tamil Nadu",
      effective_from: "2005-10-12",
      source_updated_date: "2026-02-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 2,
      legal_basis: "Section 4(1)(b) Proactive Disclosures, RTI Act 2005 & Tamil Nadu Urban Local Bodies Act 1998"
    },
    supported_use_cases: [
      "jurisdiction_routing",
      "authority_identification",
      "rti_drafting",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Public Information Officer",
      department: "Administration / Central Grievance Cell",
      organization: "Coimbatore City Municipal Corporation",
      office_address: "Main Office, Big Bazaar Street, Town Hall, Coimbatore - 641001",
      portal_url: "https://www.ccmc.gov.in",
      helpline_number: "1800-425-4900 / 0422-2302323",
      filing_modes: ["POSTAL", "PHYSICAL_COUNTER", "ONLINE"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 via Court Fee Stamp / Treasury Chalan (Head: 0070-00-501-AA-0000)",
      time_limits_days: 30,
      escalation_route: [
        "SPIO: Zone Assistant Commissioner / Central Office PIO, Town Hall",
        "First Appellate Authority: Deputy Commissioner / Commissioner, CCMC",
        "Second Appeal: Tamil Nadu Information Commission (TNIC), Chennai"
      ]
    },
    keywords: [
      "ccmc rti directory",
      "coimbatore corporation pio",
      "town hall coimbatore rti",
      "coimbatore municipal records",
      "coimbatore first appeal"
    ]
  },
  {
    id: "CCMC_ENGINEERING_ROADS", // Alias: "CIT-TAM-03", "SRC-RTI-CCMC-002"
    title: "CCMC Engineering & Works Department Road Maintenance Guidelines & Defect Liability Records",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "Technical division records governing municipal road laying, asphalt quality certificates, Measurement Book (MB) recordings, contractor agreements, and Defect Liability Periods (DLP) for all 100 municipal wards in Coimbatore.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      district_if_relevant: "Coimbatore",
      local_body_if_relevant: "Coimbatore City Municipal Corporation",
      government_level: "LOCAL",
      jurisdiction_type: "MUNICIPAL"
    },
    provenance: {
      official_source_name: "Engineering Department, Coimbatore City Municipal Corporation",
      official_source_url: "https://www.ccmc.gov.in/ccmc/index.php/departments/engineering",
      source_type: "MINISTRY_DEPT_WEBSITE",
      administering_authority: "City Engineer, Engineering Wing, Coimbatore City Municipal Corporation",
      effective_from: "2015-01-01",
      source_updated_date: "2025-08-10",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 2,
      legal_basis: "Tamil Nadu Urban Local Bodies Act, 1998 and CCMC Engineering Works Regulations"
    },
    supported_use_cases: [
      "problem_understanding",
      "rti_drafting",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Executive Engineer (Roads & Works) / Assistant Executive Engineer",
      department: "Engineering Wing",
      organization: "Coimbatore City Municipal Corporation",
      portal_url: "https://www.ccmc.gov.in",
      filing_modes: ["POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 30,
      required_documents: [
        "RTI Application specifying road stretch, ward number, and survey landmarks"
      ]
    },
    keywords: [
      "ccmc road works rti",
      "measurement book entry coimbatore",
      "defect liability period dlp ccmc",
      "pothole repair expenditure coimbatore",
      "road contractor tender agreement"
    ]
  },

  // =========================================================================
  // 2. MAHARASHTRA
  // =========================================================================
  {
    id: "SRC-RTI-3F-MH",
    title: "Maharashtra Right to Information Rules & State Information Commission (SIC Maharashtra)",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "State RTI administration in Maharashtra: (1) Application fee of ₹10 payable via Court fee stamp, Indian Postal Order, Demand Draft, or online on the Maharashtra RTI Online Portal (rtionline.maharashtra.gov.in); (2) Copying fee of ₹2 per page; (3) Second Appeal / Complaint to State Information Commission Maharashtra (benches at Mumbai, Pune, Nagpur, Nashik, Amravati, Aurangabad, Konkan).",
    jurisdiction: {
      country: "IN",
      state_ut: "Maharashtra",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "General Administration Department, Government of Maharashtra & SIC Maharashtra",
      official_source_url: "https://sic.maharashtra.gov.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "State Information Commission, Maharashtra / General Administration Department",
      effective_from: "2005-10-11",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Maharashtra Right to Information Rules, 2005 (Notification No. RTI. 2005/C.R. 315/05/5)"
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
      designation: "State Chief Information Commissioner / Secretary",
      organization: "State Information Commission, Maharashtra",
      office_address: "13th Floor, New Administrative Building, Madam Cama Road, Mantralaya, Mumbai - 400032",
      portal_url: "https://rtionline.maharashtra.gov.in",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 via Court Fee Stamp, IPO, DD, or online gateway on rtionline.maharashtra.gov.in",
      time_limits_days: 30,
      escalation_route: [
        "SPIO of Maharashtra Department / Municipal Corporation (BMC/PMC/PCMC)",
        "First Appellate Authority (FAA) within 30 days",
        "Second Appeal to State Information Commission (SIC), Mantralaya, Mumbai within 90 days"
      ]
    },
    keywords: [
      "maharashtra rti online",
      "rtionline maharashtra gov in",
      "sic maharashtra mantralaya mumbai",
      "bmc rti pio",
      "pune corporation rti"
    ]
  },

  // =========================================================================
  // 3. KARNATAKA
  // =========================================================================
  {
    id: "SRC-RTI-3F-KA",
    title: "Karnataka Right to Information Rules & Karnataka Information Commission (KIC)",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "State RTI administration in Karnataka: (1) Application fee of ₹10 payable via Court fee stamp, IPO, DD, or online on the Karnataka RTI Online portal (rtionline.karnataka.gov.in); (2) Copying fee of ₹2 per page; (3) Second Appeal / Complaint to Karnataka Information Commission (KIC), Mahithi Soudha, Devraj Urs Road, Bengaluru - 560001.",
    jurisdiction: {
      country: "IN",
      state_ut: "Karnataka",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Department of Personnel and Administrative Reforms (DPAR), Government of Karnataka & KIC",
      official_source_url: "https://kic.karnataka.gov.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Karnataka Information Commission (KIC)",
      effective_from: "2005-10-12",
      source_updated_date: "2023-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Karnataka Right to Information Rules, 2005 (Notification No. DPAR 13 RTI 2005)"
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
      designation: "State Chief Information Commissioner / Secretary",
      organization: "Karnataka Information Commission (KIC)",
      office_address: "Mahithi Soudha, Devraj Urs Road, Opp. Vidhana Soudha, Bengaluru - 560001",
      portal_url: "https://rtionline.karnataka.gov.in",
      helpline_number: "080-22370000",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 via IPO, DD, or Online Payment on rtionline.karnataka.gov.in",
      time_limits_days: 30,
      escalation_route: [
        "SPIO of Karnataka Department / BBMP / District Administration",
        "First Appellate Authority within 30 days",
        "Second Appeal to Karnataka Information Commission (KIC), Bengaluru within 90 days"
      ]
    },
    keywords: [
      "karnataka information commission kic",
      "rtionline karnataka gov in",
      "bbmp rti pio",
      "mahithi soudha bengaluru rti",
      "dpar karnataka rti rules"
    ]
  },

  // =========================================================================
  // 4. UTTAR PRADESH
  // =========================================================================
  {
    id: "SRC-RTI-3F-UP",
    title: "Uttar Pradesh Right to Information Rules & UP State Information Commission (UPSIC)",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "State RTI administration in Uttar Pradesh: (1) Application fee of ₹10 payable via Non-Judicial Stamp Paper, IPO, Treasury Chalan, or online on the UP RTI Online portal (rtionline.up.gov.in); (2) Copying fee of ₹2 per page; (3) Second Appeal / Complaint to UP State Information Commission (UPSIC), 7/7 A, Vikalp Khand, Gomti Nagar, Lucknow - 226010.",
    jurisdiction: {
      country: "IN",
      state_ut: "Uttar Pradesh",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Administrative Reforms Department, Government of Uttar Pradesh & UPSIC",
      official_source_url: "https://upsic.up.gov.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Uttar Pradesh State Information Commission (UPSIC)",
      effective_from: "2005-12-07",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Uttar Pradesh Right to Information Rules, 2015 (Notification No. 8/2015/334/Forty-Three-2015-1(3)/2009)"
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
      designation: "State Chief Information Commissioner / Registrar",
      organization: "Uttar Pradesh State Information Commission (UPSIC)",
      office_address: "7/7 A, Vikalp Khand, Gomti Nagar, Lucknow - 226010",
      portal_url: "https://rtionline.up.gov.in",
      helpline_number: "0522-2720050",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 via Non-judicial stamp paper, IPO, or online gateway on rtionline.up.gov.in",
      time_limits_days: 30,
      escalation_route: [
        "SPIO of UP Department / Nagar Nigam / Development Authority (e.g. LDA/NOIDA)",
        "First Appellate Authority within 30 days",
        "Second Appeal to UP State Information Commission (UPSIC), Lucknow within 90 days"
      ]
    },
    keywords: [
      "uttar pradesh rti online",
      "rtionline up gov in",
      "upsic gomti nagar lucknow",
      "noida authority rti pio",
      "up rti non judicial stamp 10"
    ]
  },

  // =========================================================================
  // 5. DELHI (NCT OF DELHI)
  // =========================================================================
  {
    id: "SRC-RTI-3F-DL",
    title: "Delhi Right to Information Rules & Delhi e-RTI Portal (rtionline.delhi.gov.in)",
    domain: "RTI_ACCESS",
    subdomain: "3F_STATE_SPECIFIC_RTI",
    summary: "RTI administration for the Government of NCT of Delhi: (1) Application fee of ₹10 payable via Court fee stamp, IPO, or online on the Delhi e-RTI Portal (rtionline.delhi.gov.in); (2) Covers Delhi Government Departments, Municipal Corporation of Delhi (MCD), Delhi Jal Board (DJB), DDA, and DTC; (3) Note on Appellate Jurisdiction: Second Appeals and Complaints concerning GNCTD bodies lie before the Central Information Commission (CIC) under Section 19(3).",
    jurisdiction: {
      country: "IN",
      state_ut: "Delhi",
      government_level: "UT",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Administrative Reforms Department, Government of NCT of Delhi & Central Information Commission",
      official_source_url: "https://rtionline.delhi.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "Government of NCT of Delhi / Central Information Commission",
      effective_from: "2017-07-10",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 4,
      legal_basis: "Delhi Right to Information Rules, 2005 & GNCTD Administrative Directives"
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
      designation: "SPIO / FAA & Central Information Commissioner",
      organization: "Government of NCT of Delhi / Central Information Commission (CIC)",
      portal_url: "https://rtionline.delhi.gov.in",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 via Court fee stamp, IPO, or online gateway on rtionline.delhi.gov.in",
      time_limits_days: 30,
      escalation_route: [
        "SPIO of GNCTD Department / MCD Zone / Delhi Jal Board",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), Baba Gangnath Marg, Munirka, New Delhi within 90 days"
      ]
    },
    keywords: [
      "delhi rti online",
      "rtionline delhi gov in",
      "mcd pio rti",
      "delhi jal board rti",
      "cic second appeal delhi govt"
    ]
  }
];
