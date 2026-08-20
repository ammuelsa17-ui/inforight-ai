import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Workplace & Labour Rights Verified Source Records
 * Grounded in current official Ministry of Labour & Employment (MoLE) gazettes,
 * statutory dispute mechanisms (SAMADHAN, EPFiGMS, ESIC), the 4 Labour Codes
 * (Code on Wages 2019, IR Code 2020, Social Security Code 2020, OSH Code 2020),
 * and existing in-force protective labour enactments.
 */
export const WORKPLACE_SOURCES: VerifiedSourceRecord[] = [
  // =========================================================================
  // 1. WAGES, DELAYED PAYMENT & UNLAWFUL DEDUCTIONS
  // =========================================================================
  {
    id: "SRC-WRK-001-WAGES",
    title: "Wage Protection, Timely Payment & Statutory Minimum Wages Framework",
    domain: "WORKPLACE_RIGHTS",
    subdomain: "WORKPLACE_WAGES_CONDITIONS",
    summary: "Statutory framework governing wages: (1) Mandates payment of wages on or before the 7th or 10th day of the wage period; (2) Strictly prohibits unauthorized deductions (only statutory deductions like PF, ESI, Professional Tax, court attachments, or recovery for willful absence permitted); (3) Mandates payment of not less than notified State/Central Minimum Wages; (4) Overtime work beyond 8/9 hours a day (or 48 hours a week) must be paid at double the ordinary rate of wages.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Ministry of Labour & Employment, The Gazette of India (Extraordinary)",
      official_source_url: "https://labour.gov.in/wage-board",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Chief Labour Commissioner (Central) / State Labour Commissioners & Authorities under Minimum Wages",
      effective_from: "2025-11-21",
      source_updated_date: "2025-11-21",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Code on Wages, 2019 (Act No. 29 of 2019), Sections 6, 7, 13, 14, 15, 17, 18, and 45 read with Central Rules 2025 (superseding Payment of Wages Act 1936 & Minimum Wages Act 1948)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Assistant Labour Commissioner (Central/State) / Authority under Section 15",
      organization: "Office of the Labour Commissioner / Labour Court",
      portal_url: "https://samadhan.labour.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 730, // Claims for unpaid wages must be filed within 2 years (or 3 years under Code on Wages Sec 45)
      required_documents: [
        "Appointment Letter / Employment Contract",
        "Salary Slips / Pay Stubs / Wage Register Extracts",
        "Bank Account Statement showing salary credits or delayed transfers",
        "Attendance Register / Biometric punch logs / Time-sheet records",
        "Written communication / emails demanding unpaid salary"
      ],
      prohibited_actions: [
        "Paying less than the statutory Floor Wage / notified Minimum Wage for the scheduled employment",
        "Withholding salary as penalty or deducting salary without statutory authorization",
        "Failing to pay overtime at double the normal wage rate for work exceeding statutory daily/weekly limits"
      ],
      escalation_route: [
        "Step 1: Formal written grievance / demand email to Employer HR / Payroll Department giving 7 days to clear arrears",
        "Step 2: File online dispute docket on the SAMADHAN Portal (samadhan.labour.gov.in) / State Labour Grievance Portal",
        "Step 3: Conciliation proceedings before the Assistant Labour Commissioner (ALC)",
        "Step 4: Claim application before the Authority under Section 15 of Payment of Wages / Section 20 Minimum Wages / Labour Court for recovery of wages plus up to 10 times compensation"
      ]
    },
    keywords: [
      "unpaid salary labour complaint",
      "delayed wages complaint",
      "illegal salary deduction",
      "minimum wages act overtime double rate",
      "code on wages 2019 section 45",
      "samadhan labour portal"
    ]
  },

  // =========================================================================
  // 2. MATERNITY-RELATED WORKPLACE PROTECTIONS
  // =========================================================================
  {
    id: "SRC-WRK-002-MATERNITY",
    title: "Maternity Benefit Act, 1961 (Amended 2017) & Workplace Protections",
    domain: "WORKPLACE_RIGHTS",
    subdomain: "WORKPLACE_MATERNITY_PROTECTION",
    summary: "Statutory protection for female employees: (1) Entitlement to 26 weeks of fully paid maternity leave for up to two surviving children (12 weeks for 3+ children or adopting/commissioning mothers); (2) Mandatory crèche facility in establishments employing 50 or more employees with 4 visits allowed daily; (3) Work-from-home option where nature of work permits; (4) Absolute statutory bar under Section 12 on dismissing, discharging, or terminating a woman during her maternity absence; (5) Mandatory medical bonus (₹3,500) if pre-natal confinement care not provided by employer.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Ministry of Labour & Employment, The Gazette of India (Extraordinary)",
      official_source_url: "https://labour.gov.in/women-labour",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Ministry of Labour & Employment / Chief Inspector of Factories / State Labour Commissioners",
      effective_from: "2017-04-01",
      source_updated_date: "2023-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Maternity Benefit Act, 1961 (Act No. 53 of 1961, as amended by Act No. 6 of 2017), Sections 5, 8, 11A, 12, 17, and 21"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Inspector (Maternity Benefit) / Deputy Chief Labour Commissioner",
      organization: "State Labour Commissionerate / Directorate of Industrial Safety & Health (DISH)",
      portal_url: "https://labour.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      eligibility_conditions: [
        "Woman employee who has worked in the establishment for a period of not less than 80 days in the 12 months immediately preceding the expected delivery date",
        "Applies to all factories, mines, plantations, shops and commercial establishments employing 10 or more persons"
      ],
      required_documents: [
        "Formal written notice of maternity leave submitted to employer under Section 6",
        "Medical Certificate from Registered Medical Practitioner confirming expected date of delivery / confinement",
        "Employment proof establishing 80 days of service in preceding 12 months",
        "Salary slips showing wage rate"
      ],
      prohibited_actions: [
        "Discharging, terminating, or giving notice of dismissal to a woman employee during pregnancy or maternity absence under Section 12",
        "Varying terms of employment to the woman's disadvantage during maternity absence",
        "Requiring pregnant employee to do arduous work or long standing hours during 10 weeks preceding delivery"
      ],
      escalation_route: [
        "Submit formal maternity notice under Section 6 with medical certificate",
        "If employer refuses leave or terminates service: File complaint under Section 17 before the Inspector (Maternity Benefit)",
        "Inspector conducts summary inquiry and directs employer to pay maternity benefit and revoke unlawful termination",
        "Criminal prosecution of employer under Section 21 (punishable with imprisonment up to 1 year and fine up to ₹5,000)"
      ]
    },
    keywords: [
      "maternity benefit 26 weeks paid leave",
      "section 12 unlawful dismissal pregnancy",
      "creche facility 50 employees",
      "maternity complaint inspector",
      "maternity benefit amendment act 2017"
    ]
  },

  // =========================================================================
  // 3. INDUSTRIAL DISPUTES, WRONGFUL TERMINATION & CONCILIATION
  // =========================================================================
  {
    id: "SRC-WRK-003-TERMINATION",
    title: "Industrial Relations Code, 2020 & Retrenchment Redressal Framework",
    domain: "WORKPLACE_RIGHTS",
    subdomain: "WORKPLACE_DISPUTES_TERMINATION",
    summary: "Statutory framework governing termination and industrial disputes under the Industrial Relations Code, 2020: (1) Worker with not less than one year of continuous service cannot be retrenched without 1 month's prior written notice (or wages in lieu) and retrenchment compensation equal to 15 days average pay for every completed year of continuous service under Section 70 (Chapter IX); (2) In industrial establishments employing 300 or more workers, prior permission of the appropriate Government is mandatory for lay-off, retrenchment, or closure under Chapter X (Sections 77–80); (3) Procedure for retrenchment follows Section 71 ('last come, first go') and re-employment preference under Section 72; (4) Digital dispute filing via the Central SAMADHAN portal leading to mandatory conciliation and reference to Industrial Tribunal / National Industrial Tribunal.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Ministry of Labour & Employment, The Gazette of India (Extraordinary)",
      official_source_url: "https://samadhan.labour.gov.in",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Chief Labour Commissioner (Central) / Industrial Tribunals & State Labour Courts",
      effective_from: "2025-11-21",
      source_updated_date: "2025-11-21",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Industrial Relations Code, 2020 (Act No. 35 of 2020), Sections 2(zh), 4, 53, 70, 71, 72, 77, 78, 79, and 80 read with Industrial Relations (Central) Rules 2025 (superseding the precursor Industrial Disputes Act, 1947)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Conciliation Officer / Presiding Officer, Industrial Tribunal",
      organization: "Office of the Regional Labour Commissioner (Central) / State Labour Department",
      portal_url: "https://samadhan.labour.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 1095, // 3-year limitation to raise dispute before Conciliation Officer
      required_documents: [
        "Termination Letter / Email / Relieving denial communication",
        "Employment Contract and Joining Letter",
        "Salary Slips proving last drawn wages",
        "Form of Industrial Dispute under Section 4 / Section 70 IR Code",
        "Charter of demands / legal notice served on employer"
      ],
      prohibited_actions: [
        "Retrenching a worker with continuous service without giving 1 month notice / pay in lieu and 15 days average pay per year retrenchment compensation under Section 70",
        "Retrenching workers or closing an establishment with 300+ workers without prior Government permission under Chapter X (Section 79/80)",
        "Unfair Labour Practices under Section 84 and Second Schedule of IR Code 2020",
        "Terminating worker during pendency of conciliation proceedings without permission"
      ],
      escalation_route: [
        "Tier 1: Issue formal legal demand notice to employer seeking reinstatement with back-wages or full severance settlement",
        "Tier 2: Register industrial dispute under Section 4 on SAMADHAN Portal (samadhan.labour.gov.in)",
        "Tier 3: Conciliation Officer summons employer for joint conciliation meetings (conciliation period)",
        "Tier 4: If conciliation fails (Failure of Conciliation Report - FOC), dispute is referred to Industrial Tribunal for adjudication",
        "Tier 5: Execution of Industrial Tribunal award / Recovery application"
      ]
    },
    keywords: [
      "industrial relations code 2020",
      "retrenchment compensation section 70",
      "chapter x prior permission 300 workers",
      "samadhan industrial dispute",
      "industrial tribunal reinstatement",
      "section 71 last come first go"
    ]
  },

  // =========================================================================
  // 4. SOCIAL SECURITY: EPFO, ESIC & PAYMENT OF GRATUITY
  // =========================================================================
  {
    id: "SRC-WRK-004-SOCIALSEC",
    title: "Social Security Administration (EPFO, ESIC & Payment of Gratuity)",
    domain: "WORKPLACE_RIGHTS",
    subdomain: "WORKPLACE_SOCIAL_SECURITY",
    summary: "Statutory social security safety net: (1) EPFO (12% employee + 12% employer contribution for establishments with 20+ employees earning up to ₹15,000 basic pay); (2) ESIC (0.75% employee + 3.25% employer contribution for establishments with 10+ employees earning up to ₹21,000/month, providing full medical care, sickness cash benefit, maternity benefit, and dependent pension); (3) Gratuity payable under Payment of Gratuity Act 1972 on completion of 5 years continuous service calculated at 15 days' salary per year of service (capped at ₹20 Lakhs).",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "STATUTORY_TRIBUNAL"
    },
    provenance: {
      official_source_name: "Employees' Provident Fund Organisation (EPFO) & Employees' State Insurance Corporation (ESIC)",
      official_source_url: "https://www.epfindia.gov.in",
      source_type: "STATUTORY_REGULATOR",
      administering_authority: "Ministry of Labour & Employment / Central Board of Trustees (EPF) / ESI Corporation",
      effective_from: "1952-03-04",
      source_updated_date: "2024-01-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 3,
      legal_basis: "Employees' Provident Funds and Miscellaneous Provisions Act, 1952, ESI Act 1948 & Payment of Gratuity Act 1972 (Act No. 39 of 1972) read with Code on Social Security 2020"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Regional P.F. Commissioner / Controlling Authority under Gratuity Act",
      organization: "EPFO Regional Office / ESIC Regional Office / Office of Labour Commissioner",
      portal_url: "https://epfigms.gov.in",
      helpline_number: "14470 (EPFO) / 1800-11-2526 (ESIC)",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      eligibility_conditions: [
        "EPFO: Mandatory for employees in establishments with 20+ workers",
        "ESIC: Mandatory for employees with monthly gross wages up to ₹21,000 (₹25,000 for PwD) in covered units",
        "Gratuity: Mandatory for all employees completing 5 years continuous service (exception: 5-year rule not required in case of death or permanent disablement)"
      ],
      required_documents: [
        "Universal Account Number (UAN) / PF Account Number",
        "ESIC Insurance Number (Pehchan Card)",
        "Service Certificate and resignation/superannuation letter",
        "Form I application for Gratuity submitted to employer"
      ],
      prohibited_actions: [
        "Employer deducting PF/ESI from employee salary but failing to deposit with EPFO/ESIC within 15 days of following month (Criminal Breach of Trust under IPC / BNS)",
        "Withholding gratuity payment beyond 30 days of it becoming payable (employer must pay simple interest at notified rates under Section 7(3A))"
      ],
      escalation_route: [
        "EPF Grievance: Lodge grievance on EPFiGMS Portal (epfigms.gov.in / 14470) for non-deposit or claim rejection",
        "ESI Grievance: Lodge complaint on ESIC Portal / CPGRAMS",
        "Gratuity Dispute: Submit Form 'N' before the Controlling Authority under Payment of Gratuity Act (Assistant Labour Commissioner) within 90 days of employer default"
      ]
    },
    keywords: [
      "epf grievance epfigms",
      "pf deduction not deposited",
      "esic medical sickness benefit",
      "gratuity claim form n",
      "payment of gratuity 5 years continuous service",
      "controlling authority gratuity alc"
    ]
  },

  // =========================================================================
  // 5. GIG & PLATFORM WORKERS & UNORGANISED LABOUR WELFARE
  // =========================================================================
  {
    id: "SRC-WRK-005-GIGWORKERS",
    title: "Gig & Platform Workers Social Security & Welfare Framework",
    domain: "WORKPLACE_RIGHTS",
    subdomain: "WORKPLACE_GIG_UNORGANISED_WORKERS",
    summary: "Statutory rights and welfare mechanisms for app-based delivery partners, cab drivers, and online platform gig workers: (1) Code on Social Security, 2020 (Sections 112–114) establishing the National Social Security Board and Aggregator Welfare Cess (1-2% of annual turnover) for health, accident insurance, and life coverage; (2) National digital registration on e-Shram Portal (eshram.gov.in); (3) State-specific enactments (e.g. Rajasthan Platform Based Gig Workers Act, 2023 / Karnataka Gig Workers welfare framework) guaranteeing grievance redressal, tracking of platform fee deductions, and accident compensation.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "CENTRAL_SECTOR"
    },
    provenance: {
      official_source_name: "Ministry of Labour & Employment, The Gazette of India (Extraordinary)",
      official_source_url: "https://labour.gov.in/social-security-code-2020",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Ministry of Labour & Employment / State Gig Worker Welfare Boards",
      effective_from: "2025-11-21",
      source_updated_date: "2025-11-21",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Code on Social Security, 2020 (Act No. 36 of 2020), Sections 2(35), 2(60), 2(61), 112, 113, and 114"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Welfare Commissioner / Aggregator Grievance Officer",
      organization: "Ministry of Labour & Employment & State Gig Worker Welfare Boards",
      portal_url: "https://eshram.gov.in",
      helpline_number: "14434 (e-Shram)",
      filing_modes: ["ONLINE"]
    },
    rules_or_criteria: {
      eligibility_conditions: [
        "Workers performing work or participating in a work arrangement and earning from such activities outside of traditional employer-employee relationship via online platform aggregators (Ride sharing, Food/Grocery delivery, Logistics, Home services)",
        "Registered on e-Shram portal with a valid UAN"
      ],
      required_documents: [
        "e-Shram UAN Card",
        "Platform Partner ID / Driver-Delivery Partner App Profile Screenshot",
        "Trip logs / earnings payment deduction summary",
        "Aadhaar Card and Bank Account details"
      ],
      prohibited_actions: [
        "Arbitrary de-platforming / blacklisting without written reasons or reasonable opportunity to be heard",
        "Unlawful deductions from delivery partner payouts without transparent rate card disclosure"
      ],
      escalation_route: [
        "Tier 1: Internal Platform Partner Grievance Desk / Ombudsman",
        "Tier 2: Lodge complaint on e-Shram Grievance Portal / National Consumer Helpline (1915)",
        "Tier 3: State Gig Workers Welfare Board / State Labour Commissioner for arbitrary termination or withheld payouts"
      ]
    },
    keywords: [
      "gig worker rights",
      "platform delivery partner social security",
      "code on social security gig workers",
      "eshram aggregator registration",
      "arbitrary deplatforming cab driver delivery"
    ]
  },

  // =========================================================================
  // 6. OCCUPATIONAL SAFETY, HEALTH & WORKING CONDITIONS
  // =========================================================================
  {
    id: "SRC-WRK-006-OSH",
    title: "Occupational Safety, Health & Working Conditions Standards (OSH Code / Factories Act)",
    domain: "WORKPLACE_RIGHTS",
    subdomain: "WORKPLACE_OSH_HEALTH_SAFETY",
    summary: "Statutory standards guaranteeing safe and humane working environments: (1) Maximum 8 hours per day / 48 hours per week work limit with mandatory rest intervals; (2) Mandatory provision of potable drinking water, clean toilets, ventilation, adequate lighting, and first-aid facilities; (3) Personal Protective Equipment (PPE) at employer expense; (4) Reporting of industrial accidents and mandatory compensation under Employee's Compensation Act 1923 for workplace injuries; (5) Prevention of Sexual Harassment (POSH Act 2013) requiring mandatory Internal Committee (IC) in all workplaces with 10+ employees.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Ministry of Labour & Employment & Ministry of Women and Child Development",
      official_source_url: "https://labour.gov.in/osh-code-2020",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Directorate General of Factory Advice Service and Labour Institutes (DGFASLI) / State Directorate of Industrial Safety & Health (DISH)",
      effective_from: "2025-11-21",
      source_updated_date: "2025-11-21",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Occupational Safety, Health and Working Conditions Code, 2020 (Act No. 37 of 2020) & Factories Act 1948, Employee's Compensation Act 1923 & POSH Act 2013"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Chief Inspector of Factories / Commissioner for Employee's Compensation / District Officer (POSH)",
      organization: "Directorate of Industrial Safety & Health (DISH) / District Administration",
      portal_url: "https://labour.gov.in",
      filing_modes: ["PHYSICAL_COUNTER", "ONLINE"]
    },
    rules_or_criteria: {
      required_documents: [
        "Employment proof and site identification",
        "Photographs / video recordings of hazardous working conditions or lack of safety gear",
        "Medical records / Hospital injury report in case of workplace accident",
        "Copy of complaint submitted to Internal Committee (for POSH matters)"
      ],
      prohibited_actions: [
        "Compelling workers to work in hazardous environments without mandatory PPE and safety gear",
        "Employing workers beyond statutory daily/weekly limits without consent and overtime pay",
        "Retaliating against an employee for reporting safety violations or filing a POSH complaint"
      ],
      escalation_route: [
        "Safety Hazard: File complaint with the Factory Inspector / DISH Inspectorate for inspection and safety audit",
        "Workplace Injury: File claim before Commissioner for Employee's Compensation for statutory compensation under Employee's Compensation Act",
        "Sexual Harassment: File formal written complaint before the Internal Committee (IC) within 3 months under POSH Act 2013 (or Local Committee - LC if establishment has <10 workers)"
      ]
    },
    keywords: [
      "workplace safety complaint",
      "factory inspector dish",
      "posh act internal committee",
      "employees compensation workplace injury",
      "osh code working hours 48 hours"
    ]
  }
];
