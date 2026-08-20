import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 2F: State/UT-Specific Tenancy Law Directory
 * Grounded strictly in official State Gazettes, State Tenancy Portals,
 * and State Rent Control Enactments.
 */
export const TENANCY_STATE_SOURCES: VerifiedSourceRecord[] = [
  // =========================================================================
  // 1. TAMIL NADU
  // =========================================================================
  {
    id: "SRC-TEN-2F-TN", // Alias: "SRC-TEN-TN-001"
    title: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act)",
    domain: "TENANT_RIGHTS",
    subdomain: "2F_STATE_SPECIFIC_LAW",
    summary: "State legislation governing tenancy in Tamil Nadu: (1) Mandates that every tenancy agreement must be in writing and registered on the official portal (tenancy.tn.gov.in) within 90 days of execution; (2) Caps security deposit to a maximum of three months' rent for residential premises (one month for non-residential) under Section 19; (3) Mandatory rent receipts under Section 14; (4) Strict prohibition under Section 20 against cutting or withholding essential supplies (water/electricity); (5) Landlord entry requires 24 hours prior written/electronic notice under Section 16; (6) 3-tier dispute machinery: Rent Authority (RDO/Tahsildar), Rent Court, and Rent Tribunal.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Tamil Nadu Government Gazette (Extraordinary), Housing and Urban Development Department",
      official_source_url: "https://www.tenancy.tn.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Housing and Urban Development Department, Government of Tamil Nadu",
      effective_from: "2019-02-22",
      source_updated_date: "2024-03-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Tamil Nadu Act No. 42 of 2017, Sections 4, 14, 16, 19, 20, 21, 30, 32, and 38",
      gazette_notification_ref: "T.N. Govt. Gaz. Ex., Pt. IV-Sec. 2, dt. 04-08-2017; Rules dt. 22-02-2019"
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
      designation: "Rent Authority (Revenue Divisional Officer / Tahsildar)",
      department: "Revenue and Disaster Management / Housing Department",
      organization: "Office of the Rent Authority, District Collectorate",
      portal_url: "https://www.tenancy.tn.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 90, // Registration within 90 days; Appeals to Rent Tribunal within 30 days
      required_documents: [
        "Tenancy Registration Number (TNRRRLT portal generated)",
        "Original / copy of executed written tenancy agreement",
        "Rent payment receipts / Bank transaction statement",
        "Notice copy served on opposite party"
      ],
      prohibited_actions: [
        "Cutting off or withholding essential supplies (water, electricity, passage) under Section 20",
        "Demanding or receiving security deposit exceeding 3 months rent for residential premises under Section 19",
        "Dispossessing tenant without an eviction order from the Rent Court under Section 21",
        "Unannounced entry without 24 hours prior notice under Section 16"
      ],
      escalation_route: [
        "Emergency application to Rent Authority under Section 20(2) for immediate restoration of essential supply (decided within 24-48 hours)",
        "Application to Rent Authority under Section 15 to deposit rent if landlord refuses acceptance",
        "Application to Rent Authority under Section 19 for recovery of wrongfully withheld deposit",
        "Petition before Rent Court under Section 21 for determination of tenancy or recovery of possession",
        "Appeal before Rent Tribunal (District Judge) under Section 38 within 30 days of Rent Court order"
      ]
    },
    keywords: [
      "tamil nadu tenancy act 2017",
      "tnrrrlt act",
      "tenancy tn gov in portal",
      "section 20 water electricity disconnection",
      "3 months deposit cap tamil nadu",
      "rdo rent authority rent court",
      "section 38 rent tribunal appeal"
    ]
  },

  // =========================================================================
  // 2. MAHARASHTRA
  // =========================================================================
  {
    id: "SRC-TEN-2F-MH",
    title: "Maharashtra Rent Control Act, 1999 & Leave and License Framework",
    domain: "TENANT_RIGHTS",
    subdomain: "2F_STATE_SPECIFIC_LAW",
    summary: "State legislation governing tenancies and leave and license arrangements in Maharashtra: (1) Mandates compulsory registration of all tenancy/leave-and-license agreements under Section 55 on the IGR Maharashtra e-Registration portal; (2) Landlord/licensor is statutorily responsible for registration; (3) Prohibits cutting off essential utilities under Section 29; (4) Summary eviction proceedings for licensees under Section 24 before the Competent Authority (Rent Control Act); (5) Eviction of statutory tenants under Section 16 before the Court of Small Causes (Mumbai) or Civil Judge.",
    jurisdiction: {
      country: "IN",
      state_ut: "Maharashtra",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Maharashtra Government Gazette, Law and Judiciary Department & Inspector General of Registration (IGR)",
      official_source_url: "https://igrmaharashtra.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Competent Authority (Rent Control) / Court of Small Causes, Mumbai / IGR Maharashtra",
      effective_from: "2000-03-31",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Maharashtra Rent Control Act, 1999 (Maharashtra Act No. XVIII of 2000), Sections 16, 24, 29, 33, 42, 44, and 55",
      gazette_notification_ref: "Maharashtra Act No. 18 of 2000"
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
      designation: "Competent Authority (Rent Control) / Chief Judge, Small Causes Court",
      organization: "Office of the Competent Authority, Konkan/Pune Division & Court of Small Causes",
      portal_url: "https://igrmaharashtra.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 30, // Revision against Competent Authority order within 30 days under Section 44
      required_documents: [
        "Registered Leave and License Agreement (e-Registration index-II from IGR portal)",
        "License fee payment records / bank statement",
        "Security deposit payment receipt",
        "Statutory notice of termination / revocation of license"
      ],
      prohibited_actions: [
        "Cutting off or withholding water or electricity supply without just cause under Section 29 (punishable with imprisonment up to 3 months or fine)",
        "Entering premises or locking out licensee without order of the Competent Authority under Section 24"
      ],
      escalation_route: [
        "Application to Court of Small Causes / Civil Judge under Section 29 for immediate restoration of essential supply",
        "Summary application by Licensor before Competent Authority under Section 24 for vacant possession upon expiry of license",
        "Revision application under Section 44 before the Additional Commissioner against Competent Authority order",
        "Writ Petition before Bombay High Court"
      ]
    },
    keywords: [
      "maharashtra rent control act 1999",
      "leave and license registration section 55",
      "section 24 competent authority eviction",
      "section 29 essential supply disconnection",
      "small causes court mumbai",
      "igr maharashtra rent agreement"
    ]
  },

  // =========================================================================
  // 3. DELHI (NCT OF DELHI)
  // =========================================================================
  {
    id: "SRC-TEN-2F-DL",
    title: "Delhi Rent Control Act, 1958 & NCT Tenancy Framework",
    domain: "TENANT_RIGHTS",
    subdomain: "2F_STATE_SPECIFIC_LAW",
    summary: "Governing tenancy framework in the National Capital Territory of Delhi: (1) The Delhi Rent Control Act, 1958 applies exclusively to premises where monthly rent does not exceed ₹3,500 under Section 3(c); (2) Premises with monthly rent exceeding ₹3,500 are exempt from the Rent Control Act and are governed strictly by the general contract terms and the Transfer of Property Act 1882; (3) For covered tenancies, protection against eviction is provided under Section 14 and essential supply cutoffs are prohibited under Section 45 before the Rent Controller.",
    jurisdiction: {
      country: "IN",
      state_ut: "Delhi",
      government_level: "UT",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Ministry of Law and Justice & Delhi District Courts",
      official_source_url: "https://delhidistrictcourts.nic.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Rent Controllers / Additional Rent Controllers, Delhi District Courts",
      effective_from: "1959-02-09",
      source_updated_date: "2023-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Delhi Rent Control Act, 1958 (Act No. 59 of 1958), Sections 3(c), 14, 14(1)(e), 25B, 38, and 45"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Rent Controller / Additional Rent Controller (ARC)",
      organization: "District Courts Complex (Tis Hazari, Saket, Karkardooma, Rohini, Patiala House, Dwarka)",
      portal_url: "https://delhidistrictcourts.nic.in",
      filing_modes: ["PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 30, // Appeal under Section 38 to Rent Control Tribunal within 30 days
      required_documents: [
        "Lease deed / Rent Agreement",
        "Rent payment receipts / Bank statements proving monthly rent amount",
        "Notice served under Section 106 Transfer of Property Act (for rent >₹3,500/month)",
        "Petition under Section 45 for restoration of electricity/water"
      ],
      prohibited_actions: [
        "Cutting off or withholding water or electricity supply under Section 45",
        "Evicting covered tenant without an order from the Rent Controller under Section 14"
      ],
      escalation_route: [
        "If rent <= ₹3,500/month: Petition before Additional Rent Controller (ARC) for Section 45 relief (utilities) or Section 14 (eviction defense)",
        "If rent > ₹3,500/month: Civil suit for possession and recovery of arrears before Civil Court under general law / Section 106 TPA",
        "Appeal under Section 38 before Rent Control Tribunal (for DRC Act cases) or Regular Civil Appeal (for general civil suits)"
      ]
    },
    keywords: [
      "delhi rent control act 1958",
      "section 3(c) 3500 rupees ceiling",
      "additional rent controller delhi",
      "section 45 electricity water cutting",
      "tis hazari saket rent court",
      "section 14(1)(e) bona fide requirement"
    ]
  },

  // =========================================================================
  // 4. KARNATAKA
  // =========================================================================
  {
    id: "SRC-TEN-2F-KA",
    title: "Karnataka Rent Act, 1999 (Karnataka Act No. 34 of 2001)",
    domain: "TENANT_RIGHTS",
    subdomain: "2F_STATE_SPECIFIC_LAW",
    summary: "State legislation governing tenancy in Karnataka: (1) Applies to premises in urban areas with exemption for premises whose monthly rent exceeds ₹3,500 in Bengaluru (₹2,000 elsewhere) or plinth area exceeding 14 sq meters (commercial) / residential premises under Section 2(3); (2) Mandates written agreement and registration with Rent Controller; (3) Prohibits cutting off essential amenities under Section 37; (4) Governs eviction petitions under Section 27 and 31 before the Court of Small Causes / Civil Judge.",
    jurisdiction: {
      country: "IN",
      state_ut: "Karnataka",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Karnataka Government Gazette, Department of Parliamentary Affairs and Legislation",
      official_source_url: "https://dpal.karnataka.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Court of Small Causes, Bengaluru / Rent Controllers / Civil Judiciary",
      effective_from: "2001-12-31",
      source_updated_date: "2023-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Karnataka Rent Act, 1999 (Act No. 34 of 2001), Sections 2(3), 27, 31, 37, 42, and 46"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Chief Judge / Judge, Court of Small Causes & Rent Controller",
      organization: "Court of Small Causes, Bengaluru / District Court Complex",
      filing_modes: ["PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 30, // Revision petition under Section 46 to District Judge / High Court within 30 days
      required_documents: [
        "Rental Agreement",
        "Bank transaction statement proving rent and advance/deposit payment",
        "Electricity / BESCOM bill and BWSSB water bill",
        "Notice issued under Section 106 TPA or Karnataka Rent Act"
      ],
      prohibited_actions: [
        "Cutting off or withholding water or electricity supply under Section 37",
        "Evicting tenant without order of the Court under Section 27"
      ],
      escalation_route: [
        "Application before Court of Small Causes under Section 37 for urgent restoration of water/electricity",
        "Eviction petition by landlord under Section 27 / 31 before Court of Small Causes",
        "Revision petition under Section 46 before the High Court of Karnataka (for Bengaluru) or District Court"
      ]
    },
    keywords: [
      "karnataka rent act 1999",
      "court of small causes bengaluru",
      "section 37 essential services karnataka",
      "bengaluru rent deposit dispute",
      "section 27 eviction grounds",
      "bescom bwssb tenant disconnection"
    ]
  },

  // =========================================================================
  // 5. UTTAR PRADESH
  // =========================================================================
  {
    id: "SRC-TEN-2F-UP",
    title: "Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021 (UP Act No. 16 of 2021)",
    domain: "TENANT_RIGHTS",
    subdomain: "2F_STATE_SPECIFIC_LAW",
    summary: "State legislation in Uttar Pradesh enacted in line with the Model Tenancy Act: (1) Mandates written tenancy agreement and upload on the UP Tenancy Portal (uprentauthority.in); (2) Caps security deposit to a maximum of two months' rent for residential premises (six months for non-residential); (3) Annual rent increase capped at 5% for residential (7% for commercial) unless agreed otherwise; (4) Strict prohibition against disconnecting electricity/water; (5) Establishes Rent Authority (SDM/ADM level) and Rent Tribunal (District Judge level).",
    jurisdiction: {
      country: "IN",
      state_ut: "Uttar Pradesh",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Uttar Pradesh Government Gazette (Extraordinary), Housing and Urban Planning Department",
      official_source_url: "https://awas.up.nic.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Housing and Urban Planning Department, Government of Uttar Pradesh / District Magistrates",
      effective_from: "2021-01-11",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021 (U.P. Act No. 16 of 2021), Sections 4, 9, 10, 11, 20, 21, 30, and 35"
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
      designation: "Rent Authority (Additional District Magistrate / Sub-Divisional Magistrate)",
      organization: "Office of the Rent Authority, District Collectorate",
      portal_url: "https://awas.up.nic.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 60,
      required_documents: [
        "Tenancy registration slip from UP Tenancy portal",
        "Original tenancy agreement",
        "Rent payment receipts / bank records",
        "Notice served on opposite party"
      ],
      prohibited_actions: [
        "Cutting off or withholding water or electricity supply under Section 20",
        "Demanding security deposit exceeding 2 months rent for residential premises",
        "Dispossessing tenant without formal order from Rent Authority / Rent Tribunal"
      ],
      escalation_route: [
        "Application to Rent Authority under Section 20 for immediate order to restore water/electricity within 24 hours",
        "Application to Rent Authority for eviction / recovery of possession under Section 21",
        "Appeal before Rent Tribunal (headed by District Judge) within 30 days under Section 35"
      ]
    },
    keywords: [
      "uttar pradesh tenancy act 2021",
      "up rent authority",
      "up 2 months security deposit cap",
      "section 20 essential services up",
      "rent tribunal district judge up",
      "noida lucknow rent dispute"
    ]
  }
];
