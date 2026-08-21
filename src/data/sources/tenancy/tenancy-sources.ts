import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 2: Tenant Rights Core Framework Verified Source Records (2A, 2B, 2C, 2D, 2E)
 * Sourced from official legislative enactments, Model Tenancy Act 2021 (MoHUA),
 * and statutory Rent Authority frameworks.
 */
export const TENANCY_CORE_SOURCES: VerifiedSourceRecord[] = [
  // =========================================================================
  // 2A — BASIC TENANT RIGHTS & STATUTORY FRAMEWORK
  // =========================================================================
  {
    id: "SRC-TEN-2A-001",
    title: "Model Tenancy Act, 2021 (MoHUA National Guidance Framework)",
    domain: "TENANT_RIGHTS",
    subdomain: "2A_BASIC_RIGHTS_FRAMEWORK",
    summary: "National model benchmark approved by the Union Cabinet on 2 June 2021 for states to adapt or enact. Mandates executed written tenancy agreements, registration before designated Rent Authority, caps security deposit to max 2 months for residential premises (1 month for commercial), guarantees uninterrupted essential utilities, and establishes specialized three-tier rent dispute machinery (Rent Authority, Rent Court, Rent Tribunal).",
    jurisdiction: {
      country: "IN",
      state_ut: "National (Model Framework - State Adoption Required)",
      government_level: "CENTRAL",
      jurisdiction_type: "CONCURRENT"
    },
    provenance: {
      official_source_name: "Ministry of Housing and Urban Affairs (MoHUA), Government of India",
      official_source_url: "https://mohua.gov.in/cms/model-tenancy-act.php",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Ministry of Housing and Urban Affairs / State Urban Development Departments",
      effective_from: "2021-06-02",
      source_updated_date: "2021-06-02",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Model Tenancy Act, 2021 (Circulated for State Legislative Enactment under Entry 18, List II)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Rent Authority (Deputy Collector / SDM)",
      organization: "District Rent Authority",
      portal_url: "https://mohua.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 60,
      eligibility_conditions: [
        "Premises let out for residential or commercial use under executed tenancy contract",
        "Exclusions: Premises owned by Central/State Government, Union Territory, statutory bodies, Cantonment Boards, or registered religious/charitable trusts"
      ],
      required_documents: [
        "Written Tenancy Agreement",
        "Joint agreement registration application",
        "PAN / Aadhaar of Landlord and Tenant"
      ],
      escalation_route: [
        "Joint intimation to Rent Authority within 2 months of agreement execution",
        "Dispute filing before Rent Authority for interim directions (utility restoration / rent fixation)",
        "Petition before Rent Court (headed by Civil Judge / Sub-Divisional Officer)",
        "Appeal before Rent Tribunal (headed by District Judge) within 30 days"
      ]
    },
    keywords: [
      "model tenancy act 2021",
      "mohua tenancy",
      "written tenancy agreement mandatory",
      "rent authority sdm",
      "rent court rent tribunal",
      "state list tenancy entry 18"
    ]
  },
  {
    id: "SRC-TEN-2A-002",
    title: "Transfer of Property Act, 1882 (Chapter V — Leases of Immovable Property)",
    domain: "TENANT_RIGHTS",
    subdomain: "2A_BASIC_RIGHTS_FRAMEWORK",
    summary: "General statutory law governing leases of immovable property across India where state-specific rent control acts do not apply or on matters not covered by state acts. Defines rights and liabilities of lessor and lessee (Section 108), determination of lease (Section 111), and mandatory 15-day statutory notice for month-to-month leases (Section 106).",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "CONCURRENT"
    },
    provenance: {
      official_source_name: "Ministry of Law and Justice, Legislative Department",
      official_source_url: "https://legislative.gov.in/actsofparliamentfromtheyear/transfer-property-act-1882",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Civil Courts of Competent Jurisdiction",
      effective_from: "1882-07-01",
      source_updated_date: "2023-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Transfer of Property Act, 1882 (Act No. 4 of 1882), Sections 105 to 116"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Civil Judge (Junior/Senior Division)",
      organization: "District Civil Judiciary",
      filing_modes: ["PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 15, // Minimum 15-day notice period to terminate month-to-month lease under Section 106
      required_documents: [
        "Lease deed / Rental agreement",
        "Statutory notice of termination under Section 106",
        "Postal acknowledgment receipt / proof of service"
      ],
      escalation_route: [
        "Formal written notice of termination under Section 106",
        "Suit for ejectment and mesne profits before the competent Civil Court",
        "Regular civil appeal before District Court / High Court"
      ]
    },
    keywords: [
      "transfer of property act 1882",
      "section 106 notice 15 days",
      "section 108 lessor lessee rights",
      "month to month lease",
      "civil suit for possession"
    ]
  },

  // =========================================================================
  // 2B — RENT, DEPOSIT, RECEIPTS & RENT INCREASE
  // =========================================================================
  {
    id: "SRC-TEN-2B-001",
    title: "Statutory Standards on Security Deposit, Rent Receipts & Rent Revision",
    domain: "TENANT_RIGHTS",
    subdomain: "2B_RENT_DEPOSIT_RECEIPTS",
    summary: "Core statutory standards across modern Indian tenancy frameworks: (1) Mandatory issuance of written/electronic rent receipts upon payment; (2) Security deposit refund upon handover minus agreed reasonable deductions for damages (fair wear and tear excluded); (3) Protection against arbitrary mid-term rent hikes without agreed contractual escalation or mandatory 90-day statutory notice; (4) Right of tenant to deposit rent with Rent Authority if landlord refuses acceptance.",
    jurisdiction: {
      country: "IN",
      state_ut: "National Framework (Applied via State Acts)",
      government_level: "STATE",
      jurisdiction_type: "CONCURRENT"
    },
    provenance: {
      official_source_name: "Ministry of Housing and Urban Affairs & State Urban Legislations",
      official_source_url: "https://mohua.gov.in/cms/model-tenancy-act.php",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "State Rent Authorities / Rent Courts",
      effective_from: "2021-06-02",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Model Tenancy Act 2021 (Sections 9, 10, 11, 13, 14) and State Tenancy Legislations"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Rent Authority / Sub-Divisional Magistrate",
      organization: "Office of the Rent Authority",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 90, // Notice for rent enhancement must be given 90 days before revision date under modern acts
      required_documents: [
        "Bank transaction statement / UPI debit confirmation proving rent transfers",
        "Security deposit receipt or bank transfer UTR proof",
        "Copies of requested/refused rent receipts",
        "Written notice of rent revision from landlord"
      ],
      prohibited_actions: [
        "Refusing to issue a rent receipt upon receiving payment",
        "Arbitrary deduction from security deposit for normal wear and tear / repainting without contractual sanction",
        "Refusing to accept rent with intent to manufacture default grounds"
      ],
      escalation_route: [
        "Send rent via electronic bank transfer (NEFT/UPI) to establish timestamped payment proof",
        "If landlord refuses payment, submit application to Rent Authority to deposit rent into statutory account",
        "Issue formal notice demanding deposit refund within 30 days of vacant possession handover",
        "File petition before Rent Authority / Rent Court for recovery of wrongfully withheld deposit"
      ]
    },
    keywords: [
      "security deposit refund",
      "rent receipt mandatory",
      "wear and tear deduction illegal",
      "rent increase 90 days notice",
      "deposit rent with rent authority"
    ]
  },

  // =========================================================================
  // 2C — REPAIRS, UTILITIES & PRIVACY
  // =========================================================================
  {
    id: "SRC-TEN-2C-001",
    title: "Essential Services Protection, Repair Responsibilities & Privacy Rights",
    domain: "TENANT_RIGHTS",
    subdomain: "2C_REPAIRS_UTILITIES_PRIVACY",
    summary: "Statutory guarantees protecting tenant habitability: (1) Absolute prohibition on landlord cutting off or withholding essential supplies (water, electricity, sanitary services, elevator access, passage); (2) Landlord entry into rented premises is restricted to daytime hours and requires mandatory prior notice (minimum 24 hours in writing or electronic mode); (3) Clear division of repair obligations (landlord responsible for structural safety, major plumbing, external walls; tenant responsible for internal day-to-day fixtures).",
    jurisdiction: {
      country: "IN",
      state_ut: "National Framework (Applied via State Acts)",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Ministry of Housing and Urban Affairs & State Rent Acts",
      official_source_url: "https://mohua.gov.in/cms/model-tenancy-act.php",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Rent Authority / Sub-Divisional Magistrate / Local Police",
      effective_from: "2021-06-02",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Model Tenancy Act 2021 (Sections 15, 16, 17, 20) and State Tenancy Enactments"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Rent Authority (SDM / RDO) / Police Station House Officer",
      organization: "Office of the Rent Authority / Local Police Station",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 1, // Rent Authority empowered to pass immediate interim orders for essential service restoration within 24-48 hours
      required_documents: [
        "Tenancy agreement / proof of lawful occupation",
        "Utility bills / EB service connection number",
        "Photographs / video proof of severed water/power line or locked gate",
        "Copy of written intimation sent to landlord requesting repair / restoration"
      ],
      prohibited_actions: [
        "Cutting off, severing, or withholding water or electricity supplies to force tenant eviction",
        "Entering rented premises unannounced without minimum 24-hour notice (except in emergencies)",
        "Locking main gate or obstructing tenant access to premises"
      ],
      escalation_route: [
        "Immediate Step 1: Lodge formal police complaint (CSR/FIR) for unlawful obstruction and harassment",
        "Immediate Step 2: Emergency petition before Rent Authority for interim restoration order",
        "Step 3: Rent Authority conducts summary inquiry and directs DISCOM / Municipal body to restore supply at landlord cost",
        "Step 4: Rent Authority may award compensation and impose heavy penalty on defaulting landlord"
      ]
    },
    keywords: [
      "water cut off landlord illegal",
      "electricity disconnect tenant",
      "essential services section 20",
      "landlord entry 24 hour notice",
      "landlord repair obligations",
      "tenant privacy protection"
    ]
  },

  // =========================================================================
  // 2D — EVICTION & DUE PROCESS PROTECTIONS
  // =========================================================================
  {
    id: "SRC-TEN-2D-001",
    title: "Eviction Grounds, Notice Periods & Protection Against Forced Dispossession",
    domain: "TENANT_RIGHTS",
    subdomain: "2D_EVICTION_NOTICE_LOCKOUT",
    summary: "Fundamental rule of law protections in tenancy: (1) A landlord cannot forcibly evict, lock out, or throw out a tenant's belongings without a formal decree or order from the designated Rent Court / Competent Court; (2) Eviction is permitted strictly on specified statutory grounds (continuous rent default for 2+ months, unauthorized subletting, misuse causing substantial damage, bona fide owner requirement, structural reconstruction); (3) Mandatory statutory notice must precede any court eviction petition.",
    jurisdiction: {
      country: "IN",
      state_ut: "National Framework (Enforced via State Rent Courts)",
      government_level: "STATE",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Supreme Court of India Case Law & State Tenancy Acts",
      official_source_url: "https://main.sci.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Rent Courts / Civil Judiciary / Local Police",
      effective_from: "2020-01-01",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Supreme Court Ruling in *Bishandas v. State of Punjab* and State Rent Control/Tenancy Enactments"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Presiding Officer, Rent Court (Civil Judge / Sub-Judge)",
      organization: "Rent Court / District Judiciary",
      filing_modes: ["PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      required_documents: [
        "Rental agreement and registration proof",
        "Rent payment receipts proving non-default",
        "Eviction notice received from landlord",
        "Evidence of threat or attempt of forceful lockout"
      ],
      prohibited_actions: [
        "Self-help eviction, changing door locks, or throwing tenant belongings onto street",
        "Employing bouncers or muscle power to intimidate tenant",
        "Dispossessing tenant without formal Rent Court warrant of possession"
      ],
      escalation_route: [
        "If facing imminent lockout threat: Dial Emergency Helpline 112 / Lodge immediate police complaint",
        "File police petition for protection of possession under lawful lease",
        "File suit for permanent injunction / petition before Rent Court to restrain landlord from illegal dispossession",
        "If evicted unlawfully: File summary application before Rent Court for immediate restoration of possession"
      ]
    },
    keywords: [
      "illegal eviction lockout",
      "landlord forced eviction illegal",
      "rent court eviction order mandatory",
      "injunction against landlord lockout",
      "due process of law eviction",
      "bouncers threat police 112"
    ]
  },

  // =========================================================================
  // 2E — COMPLAINTS, EVIDENCE & REMEDIES
  // =========================================================================
  {
    id: "SRC-TEN-2E-001",
    title: "Tenancy Evidence Preservation, Notice Formats & Redressal Procedures",
    domain: "TENANT_RIGHTS",
    subdomain: "2E_COMPLAINTS_REMEDIES",
    summary: "Standard procedural checklist and evidentiary requirements for tenant disputes: covers written notice drafting, rent deposit documentation, preservation of digital payment trails (UPI/NEFT/IMPS), utility disconnection evidence, and step-by-step petition filing before Rent Authorities and Rent Courts.",
    jurisdiction: {
      country: "IN",
      state_ut: "National Framework",
      government_level: "STATE",
      jurisdiction_type: "CONCURRENT"
    },
    provenance: {
      official_source_name: "State Rent Control and Tenancy Procedures",
      official_source_url: "https://mohua.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Rent Authorities & Rent Courts",
      effective_from: "2021-06-02",
      source_updated_date: "2025-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "State Tenancy Rules and Evidence Act Provisions"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Rent Authority / Rent Court",
      organization: "Office of the Rent Authority / District Court Complex",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      required_documents: [
        "Executed and registered Tenancy Agreement",
        "Tenancy Registration Certificate / Portal Acknowledgment",
        "Bank transaction statement / UPI debit records showing rent and deposit payment",
        "Formal written notices exchanged between parties via Registered Post / Email / WhatsApp",
        "Photographs / video recordings with timestamp of disputed repairs or damaged amenities",
        "Electricity / water bills showing consumer number and active connection status"
      ],
      escalation_route: [
        "Issue formal written notice citing relevant statutory sections",
        "Lodge complaint on State Tenancy Portal (where active, e.g., tenancy.tn.gov.in)",
        "Petition before Rent Authority (RDO / SDM) for utility / deposit / rent issues",
        "Petition before Rent Court (Sub-Judge / Small Causes) for eviction defense / mesne profits",
        "Appeal before Rent Tribunal (District Judge) within 30 days of Rent Court order"
      ]
    },
    keywords: [
      "tenancy evidence checklist",
      "rent dispute notice template",
      "registered post notice to landlord",
      "rent court appeal 30 days",
      "deposit recovery petition"
    ]
  }
];
