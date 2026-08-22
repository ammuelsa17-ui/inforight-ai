import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 3: RTI Access Core Framework Verified Source Records (3A, 3B, 3C, 3D, 3E)
 * Grounded in Right to Information Act 2005 (Act No. 22 of 2005), DoPT Rules 2012,
 * Central Information Commission (CIC) guidelines, and statutory judicial rulings.
 */
export const RTI_CORE_SOURCES: VerifiedSourceRecord[] = [
  // =========================================================================
  // 3A — BASIC RTI RIGHTS, PUBLIC AUTHORITIES & EXEMPTIONS
  // =========================================================================
  {
    id: "SRC-RTI-3A-001",
    title: "Right to Information Act, 2005 (Act No. 22 of 2005 As Amended)",
    domain: "RTI_ACCESS",
    subdomain: "3A_BASIC_RTI_RIGHTS",
    summary: "National legislation securing citizen access to information held by public authorities. Defines 'information' under Section 2(f) as any material in any form (records, documents, memos, emails, contracts, reports, data), 'public authority' under Section 2(h), and gives citizens the right under Section 2(j) to inspect work, documents, and records, take notes/extracts, obtain certified copies, and obtain certified samples of materials.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Department of Personnel and Training (DoPT), Ministry of Personnel, Public Grievances and Pensions",
      official_source_url: "https://dopt.gov.in/rti-act-2005",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Department of Personnel and Training / Central Information Commission (CIC)",
      effective_from: "2005-10-12",
      source_updated_date: "2019-10-24",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Right to Information Act, 2005, Sections 2(f), 2(h), 2(i), 2(j), 3, 4, 6, 7, 8, 9, 11, 18, 19, and 20"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "rti_drafting",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Central Public Information Officer (CPIO) / State Public Information Officer (SPIO)",
      organization: "Central & State Public Authorities across India",
      portal_url: "https://dopt.gov.in",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 30, // 30 days standard under Section 7(1); 48 hours for life or liberty
      statutory_fees: "₹10 for Central Public Authorities (exempt for Below Poverty Line applicants)",
      required_documents: [
        "Formal RTI application seeking certified copies of existing records",
        "Proof of application fee payment (IPO, Court fee stamp, DD, or online payment slip)",
        "BPL Card copy (if fee waiver is claimed under Section 7(5))"
      ],
      prohibited_actions: [
        "Demanding reasons from citizen for seeking information (Section 6(2) explicitly bars asking reasons)",
        "Asking PIO to create new opinions, interpretations, or explanations not present in existing records",
        "Refusing receipt of application on grounds of jurisdiction (must transfer under Section 6(3))"
      ],
      escalation_route: [
        "Step 1: File Section 6(1) request to CPIO / SPIO [30 days response deadline]",
        "Step 2: File Section 19(1) First Appeal to First Appellate Authority (FAA) [within 30 days of PIO default]",
        "Step 3: File Section 19(3) Second Appeal to Information Commission (CIC/SIC) [within 90 days of FAA default]",
        "Alternative: File Section 18 direct Complaint to Information Commission if PIO refused application"
      ]
    },
    keywords: [
      "rti act 2005",
      "section 2(f) information",
      "section 2(j) right to inspect certified copies",
      "section 3 citizen rights",
      "section 6(1) rti application",
      "bpl fee exemption"
    ]
  },
  {
    id: "SRC-RTI-3A-002",
    title: "Statutory Exemptions from Disclosure (RTI Act 2005 Sections 8 & 9)",
    domain: "RTI_ACCESS",
    subdomain: "3A_BASIC_RTI_RIGHTS",
    summary: "Exhaustive statutory list of non-disclosable information categories under Section 8(1): (a) Sovereignty and security of India; (b) Expressly forbidden by court of law or contempt of court; (c) Parliamentary / legislative privilege; (d) Commercial confidence, trade secrets, intellectual property; (e) Fiduciary relationship; (f) Information received in confidence from foreign government; (g) Endangerment of life / physical safety or identity of confidential informant; (h) Impediment to investigation or prosecution; (i) Cabinet papers prior to council decision; (j) Unwarranted invasion of personal privacy without public interest. Section 9 exempts infringement of non-state copyright. Note: Under Section 8(2), disclosable if public interest in disclosure outweighs the harm to protected interests.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Central Information Commission (CIC) & DoPT",
      official_source_url: "https://cic.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Central Information Commission / State Information Commissions",
      effective_from: "2005-10-12",
      source_updated_date: "2023-08-11",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Right to Information Act, 2005, Section 8(1)(a) to (j), Section 8(2), and Section 9"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "rti_drafting",
      "citation_provenance"
    ],
    authority_details: {
      designation: "First Appellate Authority / Information Commissioner",
      organization: "Central Information Commission / State Information Commissions",
      portal_url: "https://cic.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      prohibited_actions: [
        "PIO rejecting request under Section 8 without citing specific sub-clause and giving reasoned speaking order",
        "Claiming blanket exemption for entire departments when only specific clauses apply (Section 10 Severability principle mandates releasing non-exempt portions)",
        "Withholding information older than 20 years (Section 8(3) mandates disclosure of records older than 20 years except under clauses (a), (c), and (i))"
      ],
      escalation_route: [
        "Scrutinize PIO rejection order for specific Section 8(1) sub-clause invocation",
        "First Appeal to FAA challenging misapplication of Section 8 or invoking Section 8(2) Public Interest Override",
        "Second Appeal to CIC / SIC demonstrating that requested record is standard administrative/public work data"
      ]
    },
    keywords: [
      "section 8 exemptions rti",
      "section 8(1)(j) personal privacy",
      "section 8(1)(d) commercial confidence",
      "section 8(2) public interest override",
      "section 10 severability non exempt portions",
      "20 year rule section 8(3)"
    ]
  },

  // =========================================================================
  // 3B — RTI DRAFTING & OBJECTIVE RECORD FORMULATION
  // =========================================================================
  {
    id: "SRC-RTI-3B-001",
    title: "Objective Record-Based RTI Drafting Standard & Supreme Court Guidance",
    domain: "RTI_ACCESS",
    subdomain: "3B_RTI_DRAFTING_FILING",
    summary: "Binding administrative and judicial principle established by the Supreme Court in *CBSE v. Aditya Bandopadhyay (2011)* and *Khanapuram Gandaiah v. Administrative Officer (2010)*: RTI Act authorizes access strictly to information available and existing in material record form. A PIO is not required to create new information, solve grievances, answer hypothetical questions ('why/how'), or give legal opinions. Civic complaints must be converted into objective requests for certified sanction orders, measurement books (MB), work orders, inspection logs, and expenditure accounts.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Supreme Court of India Judgments & Central Information Commission Guidelines",
      official_source_url: "https://cic.gov.in/guidelines-for-rti-applicants",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Central Information Commission / DoPT",
      effective_from: "2011-08-09",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Supreme Court Ruling in *CBSE v. Aditya Bandopadhyay* (2011) 8 SCC 497 & Section 2(f) RTI Act 2005"
    },
    supported_use_cases: [
      "problem_understanding",
      "rti_drafting",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Central / State Public Information Officer",
      organization: "Target Public Authority",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      required_documents: [
        "Numbered questions (3 to 5 clear, concise, objective requests)",
        "Specific geographic / asset identification (Road name, Ward number, Survey number, Project title)",
        "Defined date range (e.g., FY 2024-25 or past 12 months)",
        "Preferred delivery mode: Certified hard copies by speed post or inspection of original records under Section 2(j)(i)"
      ],
      prohibited_actions: [
        "Drafting interrogative questions starting with 'Why', 'Who is responsible', 'Under what justification'",
        "Asking the PIO to take executive action or repair the civic asset directly through the RTI form",
        "Vague, infinite queries (e.g., 'Provide all documents since 1947')"
      ]
    },
    keywords: [
      "record based rti drafting",
      "aditya bandopadhyay supreme court",
      "no opinion creation pio",
      "certified copy administrative sanction",
      "measurement book entry",
      "work order tender records"
    ]
  },

  // =========================================================================
  // 3C — CENTRAL PUBLIC AUTHORITIES & CENTRAL RTI PORTAL
  // =========================================================================
  {
    id: "SRC-RTI-3C-CENTRAL",
    title: "Central RTI Online Portal (rtionline.gov.in) for Central Government Ministries",
    domain: "RTI_ACCESS",
    subdomain: "3C_DEPARTMENT_PIO_ROUTING",
    summary: "Official Central Government portal for electronically submitting RTI applications and First Appeals EXCLUSIVELY to Central Ministries, Central Departments, Central PSUs (e.g., Railways, NHAI, BSNL, SBI, EPFO, ESIC), and Union Territory administrations directly under Central Ministries. State Government departments (e.g., State Police, Municipal Corporations, District Collectors) CANNOT be filed through this portal.",
    jurisdiction: {
      country: "IN",
      state_ut: "National (Central Ministries & Central PSUs Only)",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Department of Personnel and Training (DoPT) & National Informatics Centre (NIC)",
      official_source_url: "https://rtionline.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "Department of Personnel and Training, Government of India",
      effective_from: "2013-04-22",
      source_updated_date: "2026-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 4,
      legal_basis: "Right to Information Rules, 2012 (Notification G.S.R. 603(E))"
    },
    supported_use_cases: [
      "jurisdiction_routing",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Central Public Information Officer (CPIO)",
      organization: "Central Ministries, Departments, and Central Public Sector Undertakings",
      portal_url: "https://rtionline.gov.in",
      portal_type: "ONLINE_APPLICATION_PORTAL",
      initial_application_portal: "https://rtionline.gov.in",
      first_appeal_portal: "https://rtionline.gov.in",
      second_appeal_portal: null,
      information_commission_website: "https://cic.gov.in",
      filing_modes: ["ONLINE"]
    },
    rules_or_criteria: {
      statutory_fees: "₹10 via Internet Banking, UPI, Debit/Credit Card (Zero fee for BPL applicants with uploaded card)",
      application_fee_amount: 10,
      first_appeal_fee_amount: 0,
      second_appeal_fee_amount: 0,
      first_appeal_filing_deadline_days: 30,
      first_appeal_delay_condonation: true,
      first_appeal_disposal_normal_days: 30,
      first_appeal_disposal_max_days: 45,
      second_appeal_filing_deadline_days: 90,
      second_appeal_delay_condonation: true,
      time_limits_days: 30,
      prohibited_actions: [
        "Routing State Government or Municipal RTI queries to rtionline.gov.in (will be rejected or delayed in transfer)"
      ]
    },
    keywords: [
      "rtionline gov in central",
      "central pio cpio",
      "central ministries rti",
      "nhai railways epfo rti",
      "dopt rti rules 2012"
    ]
  },

  // =========================================================================
  // 3D — PROCEDURAL RULES: TIMELINES, FEES, TRANSFER & THIRD PARTY
  // =========================================================================
  {
    id: "SRC-RTI-3D-001",
    title: "Timelines, Section 6(3) Transfer, Third Party & Fee Rules (Right to Information Rules, 2012)",
    domain: "RTI_ACCESS",
    subdomain: "3D_TIMELINES_FEES_EXEMPTIONS",
    summary: "Statutory procedural rules governing RTI administration: (1) Standard 30-day response timeline (48 hours where life or liberty is involved); (2) Section 6(3) mandatory transfer within 5 days if subject matter belongs to another public authority; (3) Proviso to Section 7(6) — Information MUST be provided FREE OF COST if PIO fails to respond within the statutory 30-day timeline; (4) Section 11 third-party procedure with 5-day notice and 10-day representation window (max 40 days total); (5) Copying fee of ₹2 per page for A4/A3 size paper.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "The Gazette of India (Extraordinary), Department of Personnel and Training",
      official_source_url: "https://dopt.gov.in/rti-rules-2012",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Department of Personnel and Training (DoPT)",
      effective_from: "2012-07-31",
      source_updated_date: "2019-10-24",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Right to Information Rules, 2012 (G.S.R. 603(E)) & Sections 5(2), 6(3), 7(1), 7(5), 7(6), 11 RTI Act 2005"
    },
    supported_use_cases: [
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "CPIO / SPIO / Nodal Officer",
      organization: "Public Authority",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 30,
      statutory_fees: "₹10 application fee; ₹2 per page copying fee. FREE if 30 days elapsed without response under Section 7(6)",
      prohibited_actions: [
        "Charging copying fees after 30-day statutory timeline has expired (Section 7(6) mandates free supply)",
        "Demanding unreasonable inspection fees (first hour of inspection is free under Rule 4(f))",
        "Failing to intimate applicant when transferring under Section 6(3)"
      ],
      escalation_route: [
        "Day 1 to 30: Await PIO response",
        "Day 31: If no response received, PIO is in deemed refusal. Section 7(6) applies (right to free information)",
        "Day 31 to 60: File First Appeal under Section 19(1) for deemed refusal and direction for free supply of records",
        "If PIO demands exorbitant fees: First Appeal to FAA challenging calculation under Rule 4"
      ]
    },
    keywords: [
      "section 7(6) free information delay",
      "section 6(3) transfer 5 days",
      "life liberty 48 hours rti",
      "third party section 11 rti",
      "dopt rti rules 2012 fees",
      "deemed refusal 30 days"
    ]
  },

  // =========================================================================
  // 3E — APPEALS, COMPLAINTS & PENALTIES (CIC / SIC)
  // =========================================================================
  {
    id: "SRC-RTI-3E-001",
    title: "Appeals, Complaints & Penalties Framework (RTI Act 2005 Sections 18, 19, 20)",
    domain: "RTI_ACCESS",
    subdomain: "3E_APPEALS_COMPLAINTS",
    summary: "Statutory two-tier appeal and complaint machinery: (1) First Appeal under Section 19(1) to First Appellate Authority (FAA) within 30 days of PIO order or expiry of 30-day limit (FAA must decide within 30 to max 45 days); (2) Second Appeal under Section 19(3) to Central/State Information Commission within 90 days of FAA order; (3) Direct Complaint under Section 18 to Commission for refusal to accept application, obstruction, or misleading info; (4) Section 20(1) penalty of ₹250 per day (up to ₹25,000 max) on defaulting PIO and Section 20(2) disciplinary action recommendation.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "APPELLATE"
    },
    provenance: {
      official_source_name: "Central Information Commission (CIC), The Gazette of India",
      official_source_url: "https://cic.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Central Information Commission (CIC) / State Information Commissions (SICs)",
      effective_from: "2005-10-12",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Right to Information Act, 2005, Sections 18, 19(1), 19(3), 19(6), 19(7), 20(1), and 20(2)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Chief Information Commissioner / Information Commissioners",
      organization: "Central Information Commission (CIC), Baba Gangnath Marg, Munirka, New Delhi",
      portal_url: "https://cic.gov.in",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 90, // 30 days for First Appeal; 90 days for Second Appeal
      statutory_fees: "Zero appeal fee for Central First and Second Appeals",
      required_documents: [
        "Copy of original Section 6(1) RTI application with proof of fee payment",
        "Copy of PIO reply / rejection order (if any) or postal tracking proof proving delivery date",
        "Copy of Section 19(1) First Appeal petition",
        "Copy of FAA decision order (if any)",
        "Chronological index of events and grounds of appeal / complaint"
      ],
      escalation_route: [
        "First Appeal to First Appellate Authority (FAA) within 30 days",
        "FAA conducts hearing and passes reasoned written order within 30–45 days",
        "If FAA fails to decide or upholds wrongful denial: Second Appeal to CIC / SIC within 90 days",
        "Commission conducts video-conference / physical hearing and issues binding order under Section 19(7)",
        "Commission may issue show-cause notice to PIO for ₹25,000 penalty under Section 20"
      ]
    },
    keywords: [
      "first appeal section 19(1)",
      "second appeal section 19(3)",
      "central information commission cic",
      "section 20 penalty 25000",
      "section 18 complaint",
      "first appellate authority faa 45 days"
    ]
  },

  // =========================================================================
  // 3F — PIN CODE & JURISDICTION GROUNDING SOURCES
  // =========================================================================
  {
    id: "SRC-POST-IN-PIN",
    title: "India Post National PIN Code Directory & Postal Circle Registry",
    domain: "RTI_ACCESS",
    subdomain: "3A_BASIC_RTI_RIGHTS",
    summary: "Official postal circle mapping establishing geographic PIN code bounds, post office designations, and state/district associations across India.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Department of Posts, Ministry of Communications",
      official_source_url: "https://www.indiapost.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "India Post",
      effective_from: "1972-08-15",
      source_updated_date: "2026-01-01",
      last_verified: "2026-08-22",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Indian Post Office Act, 1898 & Postal Circle Directory"
    },
    supported_use_cases: ["jurisdiction_routing", "authority_identification"],
    authority_details: {
      designation: "Director General of Postal Services",
      organization: "Department of Posts, Dak Bhawan, New Delhi",
      portal_url: "https://www.indiapost.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 0,
      statutory_fees: "N/A",
      required_documents: [],
      escalation_route: []
    },
    keywords: ["india post pin code", "postal circle directory", "pincode mapping"]
  },
  {
    id: "SRC-TN-CCMC-JURISDICTION",
    title: "Coimbatore City Municipal Corporation (CCMC) Know Your Zone Directory",
    domain: "RTI_ACCESS",
    subdomain: "3A_BASIC_RTI_RIGHTS",
    summary: "Official CCMC zonal boundary allocations establishing West, Central, East, South, and North administrative zones and ward boundaries for Coimbatore municipality.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      government_level: "LOCAL",
      jurisdiction_type: "MUNICIPAL"
    },
    provenance: {
      official_source_name: "Coimbatore City Municipal Corporation",
      official_source_url: "https://www.ccmc.gov.in/index.php/mainadministration/zonal-assistant-commissioners",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "CCMC Zonal Assistant Commissioners",
      effective_from: "1981-05-01",
      source_updated_date: "2026-01-01",
      last_verified: "2026-08-22",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Coimbatore City Municipal Corporation Act, 1981 (TN Act 25 of 1981)"
    },
    supported_use_cases: ["jurisdiction_routing", "authority_identification"],
    authority_details: {
      designation: "Zonal Assistant Commissioner",
      organization: "Coimbatore City Municipal Corporation",
      portal_url: "https://www.ccmc.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 0,
      statutory_fees: "N/A",
      required_documents: [],
      escalation_route: []
    },
    keywords: ["ccmc zonal assistant commissioner", "coimbatore municipal corporation zones", "ccmc wards"]
  },
  {
    id: "SRC-TN-CCMC-DEPARTMENTS",
    title: "CCMC Zonal Engineering, Health & Water Supply Department Allocation Charter",
    domain: "RTI_ACCESS",
    subdomain: "3A_BASIC_RTI_RIGHTS",
    summary: "Official CCMC civic departmental allocations establishing engineering (roads/drains), public health (sanitation/SWM), electrical (lighting), and water supply operational jurisdictions.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      government_level: "LOCAL",
      jurisdiction_type: "MUNICIPAL"
    },
    provenance: {
      official_source_name: "CCMC Municipal Engineering & Health Inspectorate",
      official_source_url: "https://www.ccmc.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "CCMC City Engineer & City Health Officer",
      effective_from: "1981-05-01",
      source_updated_date: "2026-01-01",
      last_verified: "2026-08-22",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "CCMC Municipal Engineering & Public Health By-Laws"
    },
    supported_use_cases: ["authority_identification", "rights_navigation"],
    authority_details: {
      designation: "City Engineer / City Health Officer",
      organization: "Coimbatore City Municipal Corporation",
      portal_url: "https://www.ccmc.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 0,
      statutory_fees: "N/A",
      required_documents: [],
      escalation_route: []
    },
    keywords: ["ccmc engineering cell", "ccmc health inspectorate", "ccmc water supply division"]
  },
  {
    id: "SRC-TN-CCMC-RTI-PIO",
    title: "CCMC Zonal Public Information Officer (PIO) Statutory Roster",
    domain: "RTI_ACCESS",
    subdomain: "3A_BASIC_RTI_RIGHTS",
    summary: "Official designation roster of Public Information Officers (PIOs) across CCMC Zonal offices under Section 5(1) of the RTI Act 2005.",
    jurisdiction: {
      country: "IN",
      state_ut: "Tamil Nadu",
      government_level: "LOCAL",
      jurisdiction_type: "MUNICIPAL"
    },
    provenance: {
      official_source_name: "Coimbatore City Municipal Corporation RTI Cell",
      official_source_url: "https://www.ccmc.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "Public Information Officers, CCMC",
      effective_from: "2005-10-12",
      source_updated_date: "2026-01-01",
      last_verified: "2026-08-22",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "RTI Act 2005 Section 5(1) PIO Notifications"
    },
    supported_use_cases: ["authority_identification", "citation_provenance"],
    authority_details: {
      designation: "Public Information Officer",
      organization: "Coimbatore City Municipal Corporation Zonal Offices",
      portal_url: "https://www.ccmc.gov.in",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 30,
      statutory_fees: "₹10 RTI Application Fee",
      required_documents: ["RTI Application Form"],
      escalation_route: ["First Appeal to Appellate Authority within 30 days"]
    },
    keywords: ["ccmc rti pio", "coimbatore pio designation", "ccmc rti roster"]
  }
];
