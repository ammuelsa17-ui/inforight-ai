import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 4: Central Welfare Schemes Core Verified Source Records (4A to 4O)
 * Grounded in official Central Ministries, myScheme (myscheme.gov.in), and NSP.
 */
export const SCHEME_CORE_SOURCES: VerifiedSourceRecord[] = [
  {
    "id": "SRC-SCH-4A-PMMVY",
    "title": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Direct Benefit Transfer (DBT) maternity benefit scheme under Mission Shakti (Ministry of Women and Child Development): Provides ₹5,000 cash incentive in 2 installments for the first live birth, and ₹6,000 in a single installment for the birth of a second girl child to encourage positive behavioral change towards the girl child.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Women and Child Development (MWCD), Government of India",
      "official_source_url": "https://pmmvy.wcd.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Women and Child Development / State Women & Child Welfare Departments",
      "effective_from": "2017-01-01",
      "source_updated_date": "2023-07-15",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "National Food Security Act, 2013, Section 4(b) (Maternity Benefit)"
    },
    "supported_use_cases": [
      "problem_understanding",
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Anganwadi Worker (AWW)",
      "department": "Mission Shakti / Women and Child Development",
      "organization": "Ministry of Women and Child Development",
      "portal_url": "https://pmmvy.wcd.gov.in",
      "helpline_number": "14408 / 1098",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Pregnant Women and Lactating Mothers (PW&LM) aged 19 years and above",
        "Targeted to socially/economically disadvantaged women (SC/ST, BPL/EWS, e-Shram cardholders, PM-JAY beneficiaries, Divyangjan)",
        "Exclusions: Regular employees of Central/State Government, PSUs, or statutory bodies"
      ],
      "required_documents": [
        "Aadhaar Card of mother and husband",
        "Mother and Child Protection (MCP) Card / RCH Portal registration ID",
        "Aadhaar-seeded bank account details",
        "Child birth registration certificate"
      ]
    },
    "keywords": [
      "pmmvy maternity scheme",
      "maternity benefit 5000",
      "second girl child 6000",
      "mission shakti mwcd",
      "anganwadi pmmvy portal"
    ]
  },
  {
    "id": "SRC-SCH-4A-IGNWPS",
    "title": "Indira Gandhi National Widow Pension Scheme (IGNWPS - NSAP)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "National Social Assistance Programme (NSAP) social security pension: Provides monthly pension support to widows living below the poverty line (BPL) aged 40–79 years (₹300/month Central contribution + State top-up, e.g. ₹1,000/month in Tamil Nadu). Transferred to IGNOAPS upon reaching 80 years of age.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Ministry of Rural Development, Government of India",
      "official_source_url": "https://nsap.nic.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Rural Development / State Social Welfare Departments",
      "effective_from": "2009-02-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "National Social Assistance Programme (NSAP) Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Tahsildar / Block Development Officer (BDO)",
      "department": "Social Welfare / Revenue Department",
      "organization": "State Social Welfare Department",
      "portal_url": "https://nsap.nic.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Widows aged between 40 and 79 years",
        "Must belong to a household Below the Poverty Line (BPL)"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Husband's Death Certificate",
        "BPL Ration Card / Income Certificate",
        "Bank Passbook seeded with Aadhaar"
      ]
    },
    "keywords": [
      "ignwps widow pension",
      "nsap widow pension",
      "widow monthly financial assistance",
      "bpl widow pension 40 years",
      "rural development widow scheme"
    ]
  },
  {
    "id": "SRC-SCH-4A-SSY",
    "title": "Sukanya Samriddhi Yojana (SSY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Government-backed small savings scheme under Beti Bachao Beti Padhao: Dedicated account opened in the name of a girl child below 10 years of age in Post Offices or authorized banks. Offers sovereign guarantee, triple tax exemption (EEE under Section 80C), high government-notified interest rate, partial withdrawal for higher education at age 18, and full maturity at age 21.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Posts & Ministry of Finance, Government of India",
      "official_source_url": "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Finance / Department of Posts / Nationalised Banks",
      "effective_from": "2015-01-22",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Government Savings Promotion Act, 1873 & Sukanya Samriddhi Account Rules, 2019"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Postmaster / Bank Branch Manager",
      "department": "Department of Posts / Banking Division",
      "organization": "India Post & Scheduled Commercial Banks",
      "portal_url": "https://www.indiapost.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Girl child who is an Indian resident",
        "Account can be opened by natural or legal guardian anytime from birth up to 10 years of age",
        "Maximum of two accounts per family (except in case of triplet/twin girls on second birth)",
        "Minimum deposit ₹250 per financial year; Maximum deposit ₹1,50,000 per financial year"
      ],
      "required_documents": [
        "Birth Certificate of the girl child",
        "Identity Proof (Aadhaar/PAN) of the Guardian",
        "Address Proof of the Guardian",
        "Photograph of the girl child and guardian"
      ]
    },
    "keywords": [
      "sukanya samriddhi yojana ssy",
      "girl child savings account",
      "beti bachao beti padhao account",
      "post office ssy scheme",
      "tax free girl child savings"
    ]
  },
  {
    "id": "SRC-SCH-4A-VATSLYA",
    "title": "Mission Vatsalya Child Protection Sponsorship Scheme",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Child welfare sponsorship scheme under Mission Vatsalya (MWCD): Provides financial assistance of ₹4,000 per child per month to vulnerable biological families (widows, divorced, abandoned parents, or children living with grandparents) and foster families to prevent institutionalization and ensure education, nutrition, and health support for children up to 18 years.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Ministry of Women and Child Development, Government of India",
      "official_source_url": "https://wcd.nic.in/schemes/mission-vatsalya",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "District Child Protection Unit (DCPU) / Child Welfare Committee (CWC)",
      "effective_from": "2022-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Juvenile Justice (Care and Protection of Children) Act, 2015 & Mission Vatsalya Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Child Protection Officer (DCPO) / Chairperson CWC",
      "department": "District Child Protection Unit (DCPU)",
      "organization": "Ministry of Women and Child Development",
      "portal_url": "https://wcd.nic.in",
      "helpline_number": "1098 (Childline)",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Children aged up to 18 years in need of care and protection",
        "Family criteria: Mother is a widow/divorced/abandoned, parents are terminally ill, or child is an orphan living with extended family",
        "Family income ceiling: Maximum ₹72,000/year for rural areas and ₹96,000/year for urban areas"
      ],
      "required_documents": [
        "Child Birth Certificate / School ID",
        "Death Certificate of parent (if applicable)",
        "Income Certificate issued by Revenue Authority",
        "Aadhaar Card of Child and Guardian",
        "Joint Bank Account Passbook"
      ]
    },
    "keywords": [
      "mission vatsalya sponsorship",
      "4000 per month child assistance",
      "dcpu child sponsorship scheme",
      "orphan destitute child financial support",
      "child welfare committee cwc"
    ]
  },
  {
    "id": "SRC-SCH-4B-NSP",
    "title": "National Scholarship Portal & PM Uchchatar Shiksha Protsahan (PM-USP) Central Sector Scheme",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "Central sector merit-cum-means scholarship administered by Department of Higher Education (MoE) via NSP: Awards ₹12,000/year for undergraduate study (first 3 years) and ₹20,000/year for postgraduate study to meritorious students above 80th percentile in Class 12 board examinations with family income up to ₹4.5 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Higher Education, Ministry of Education, Government of India",
      "official_source_url": "https://scholarships.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Education / National Scholarship Portal (NSP)",
      "effective_from": "2008-07-01",
      "source_updated_date": "2024-07-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PM-USP Central Sector Scheme of Scholarship Guidelines (Higher Education)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Nodal Officer (Scholarships) / College Principal",
      "organization": "National Scholarship Portal & Department of Higher Education",
      "portal_url": "https://scholarships.gov.in",
      "helpline_number": "0120-6619540",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Students above 80th percentile of successful candidates in the relevant stream from Class 12 board",
        "Pursuing regular full-time degree courses in recognized colleges/universities (AICTE/UGC/MCI approved)",
        "Annual gross family income must not exceed ₹4,50,000 per annum",
        "Not receiving any other Central/State scholarship or fee concession"
      ],
      "required_documents": [
        "Aadhaar Number (or Aadhaar Enrolment Slip)",
        "Class 12 Marksheet with Roll Number",
        "Income Certificate issued by competent revenue authority",
        "College Bonafide Student Certificate and Fee Receipt",
        "Bank Account details seeded with Aadhaar"
      ]
    },
    "keywords": [
      "national scholarship portal nsp",
      "pm usp central sector scholarship",
      "class 12 80th percentile scholarship",
      "ug 12000 pg 20000 scholarship",
      "higher education scholarship 4.5 lakh income"
    ]
  },
  {
    "id": "SRC-SCH-4B-PRAGATI",
    "title": "AICTE Pragati Scholarship Scheme for Girl Students",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "AICTE scholarship empowering women in technical education: Awards ₹50,000 per annum towards college fee, computer purchase, books, and equipment to eligible girl students admitted to first year (or lateral entry second year) of AICTE approved technical Degree or Diploma courses with family income up to ₹8 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "All India Council for Technical Education (AICTE), Ministry of Education",
      "official_source_url": "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "AICTE / National Scholarship Portal (NSP)",
      "effective_from": "2014-11-11",
      "source_updated_date": "2024-07-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "AICTE Pragati Scholarship Scheme Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Director (Student Development Cell)",
      "organization": "AICTE & National Scholarship Portal",
      "portal_url": "https://scholarships.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Girl student admitted to 1st year of Degree/Diploma level course OR 2nd year of Degree/Diploma through lateral entry in AICTE approved institution",
        "Maximum two girl children per family",
        "Family income must not exceed ₹8,00,000 per annum"
      ],
      "required_documents": [
        "Class 10 and 12 mark sheets",
        "Centralized Admission Process (CAP) allotment letter",
        "Annual Family Income Certificate",
        "Aadhaar Card and Aadhaar seeded Bank Account Passbook",
        "Tuition fee receipt"
      ]
    },
    "keywords": [
      "aicte pragati scholarship",
      "pragati 50000 girl student",
      "engineering diploma girl scholarship",
      "aicte technical scholarship 8 lakh income"
    ]
  },
  {
    "id": "SRC-SCH-4C-SCPM",
    "title": "Centrally Sponsored Post-Matric Scholarship for Scheduled Caste (SC) Students",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4C_SC_WELFARE",
    "summary": "Flagship Central-State matching scholarship scheme: Provides 100% compulsory non-refundable tuition fee reimbursement plus monthly maintenance allowance (up to ₹13,500/year for hostellers / ₹7,000 for day scholars in Group 1 professional courses) directly via DBT to SC students with family income up to ₹2.5 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Department of Social Justice and Empowerment, Ministry of Social Justice and Empowerment",
      "official_source_url": "https://socialjustice.gov.in/schemes/26",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Social Justice and Empowerment / State SC Welfare Departments",
      "effective_from": "2021-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Revised Post-Matric Scholarship Scheme for SC Guidelines (Cabinet Approved 60:40 Sharing)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District SC Welfare Officer",
      "organization": "State SC/ST Welfare Department & National Scholarship Portal",
      "portal_url": "https://scholarships.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Must belong to Scheduled Caste (SC) community of the domicile state",
        "Pursuing post-matriculation or post-secondary courses in recognized institutions (Class 11 to PhD)",
        "Annual family income from all sources must not exceed ₹2,50,000 per annum",
        "Enrolled in regular full-time study"
      ],
      "required_documents": [
        "Permanent Community / Caste Certificate (SC)",
        "Income Certificate issued by Revenue Authority",
        "Class 10 / Previous Qualifying Examination Marksheet",
        "College Admission Fee Receipt and Bonafide Certificate",
        "Aadhaar Number and Aadhaar-seeded Bank Account"
      ]
    },
    "keywords": [
      "sc post matric scholarship",
      "scheduled caste college fee reimbursement",
      "social justice sc scholarship 2.5 lakh",
      "dbt sc maintenance allowance",
      "nsp sc post matric"
    ]
  },
  {
    "id": "SRC-SCH-4C-SCPRE",
    "title": "Centrally Sponsored Scheme of Pre-Matric Scholarship for SC Students (Class 9 & 10)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4C_SC_WELFARE",
    "summary": "Pre-matric scholarship providing financial support to SC students studying in Class 9 and 10 in Government or Government-aided schools to minimize dropout rates: Awards ₹3,500/year for day scholars and ₹7,000/year for hostellers for family income up to ₹2.5 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Ministry of Social Justice and Empowerment, Government of India",
      "official_source_url": "https://socialjustice.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Social Justice & Empowerment / State SC Welfare Departments",
      "effective_from": "2021-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Pre-Matric Scholarship for SC Students Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Headmaster / District Welfare Officer",
      "organization": "State SC Welfare Department & School Education Department",
      "portal_url": "https://scholarships.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Student belonging to Scheduled Caste (SC)",
        "Studying in Class 9 or 10 in a recognized Government school or Government-aided school",
        "Family income must not exceed ₹2,50,000 per annum"
      ],
      "required_documents": [
        "SC Community Certificate",
        "Income Certificate",
        "School Bonafide & Previous Class Marksheet",
        "Aadhaar seeded Bank Account"
      ]
    },
    "keywords": [
      "pre matric sc scholarship",
      "class 9 10 sc student financial aid",
      "nsp pre matric sc"
    ]
  },
  {
    "id": "SRC-SCH-4D-STFELL",
    "title": "National Fellowship and Scholarship for Higher Education of ST Students",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4D_ST_PVTG_WELFARE",
    "summary": "Central Sector Scheme administered by Ministry of Tribal Affairs: (1) Fellowship Component: Awards ₹37,000/month (JRF) and ₹42,000/month (SRF) plus contingency to ST scholars pursuing regular M.Phil/Ph.D; (2) Top Class Scholarship Component: Full tuition fee reimbursement (up to ₹2 Lakhs in private / actuals in govt) plus ₹45,000 living expenses in 258 notified institutes (IITs, IIMs, AIIMS, NITs).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Tribal Affairs (MoTA), Government of India",
      "official_source_url": "https://tribal.nic.in/ScholarshiP.aspx",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Tribal Affairs / National Scholarship Portal (NSP)",
      "effective_from": "2015-04-01",
      "source_updated_date": "2024-05-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "National Fellowship and Scholarship for Higher Education of ST Students Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Deputy Secretary (Scholarships)",
      "organization": "Ministry of Tribal Affairs & National Scholarship Portal",
      "portal_url": "https://fellowship.tribal.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Must belong to a notified Scheduled Tribe (ST) community",
        "Fellowship: Qualified UGC-NET / CSIR-NET and enrolled in regular M.Phil / Ph.D in recognized university",
        "Top Class Scholarship: Admitted to notified premier institutes (IIT/IIM/NIT/NLUs) with total family income <= ₹6,00,000 per annum"
      ],
      "required_documents": [
        "ST Community / Tribe Certificate",
        "Institute Admission / Registration Letter & Fee Structure",
        "Income Certificate issued by designated Revenue Authority",
        "UGC/CSIR NET score card (for Fellowship)",
        "Aadhaar seeded bank account"
      ]
    },
    "keywords": [
      "st national fellowship",
      "tribal phd fellowship 37000",
      "top class education st students",
      "ministry of tribal affairs scholarship",
      "fellowship tribal gov in"
    ]
  },
  {
    "id": "SRC-SCH-4D-JANMAN",
    "title": "Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan (PM-JANMAN)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4D_ST_PVTG_WELFARE",
    "summary": "Comprehensive socio-economic mission targeted at 75 Particularly Vulnerable Tribal Groups (PVTGs) across 18 states and UTs: Delivers individualized citizen packages including ₹2.39 Lakhs grant for pucca housing (under PMAY-G PVTG norm), off-grid solar electricity connections, community water tanks, Ayushman Bharat health saturation, and mobile medical units.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Tribal Affairs & Ministry of Rural Development",
      "official_source_url": "https://tribal.nic.in/PMJANMAN.aspx",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Tribal Affairs / District Collectorates",
      "effective_from": "2023-11-15",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Cabinet Approval & Operational Guidelines for PM-JANMAN"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Collector / Project Officer (ITDA/ITDP)",
      "organization": "Integrated Tribal Development Agency (ITDA) & District Administration",
      "portal_url": "https://tribal.nic.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Households belonging to notified Particularly Vulnerable Tribal Groups (PVTGs) (75 communities across India)",
        "Living in unserved habitations lacking pucca housing, piped drinking water, or grid electricity"
      ],
      "required_documents": [
        "PVTG Tribe Certificate / ITDA Enumeration ID",
        "Aadhaar Card",
        "Bank Account details"
      ]
    },
    "keywords": [
      "pm janman pvtg scheme",
      "particularly vulnerable tribal group housing",
      "pvtg 2.39 lakh pucca house",
      "tribal solar connection janman"
    ]
  },
  {
    "id": "SRC-SCH-4E-YASASVI",
    "title": "PM Young Achievers Scholarship Award Scheme for Vibrant India (PM-YASASVI)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4E_OBC_BC_MBC_MINORITY",
    "summary": "Umbrella scholarship scheme by Ministry of Social Justice and Empowerment for Other Backward Classes (OBC), Economically Backward Classes (EBC), and De-Notified, Nomadic and Semi-Nomadic Tribes (DNT/SNT): Provides Pre-Matric (Class 9-10: ₹4,000/yr), Post-Matric (Class 11 to PG/Professional: ₹5,000–₹20,000/yr) and Top-Class School/College funding with family income ceiling of ₹2.5 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Department of Social Justice and Empowerment, Ministry of Social Justice and Empowerment",
      "official_source_url": "https://socialjustice.gov.in/schemes/48",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Social Justice & Empowerment / National Scholarship Portal (NSP)",
      "effective_from": "2022-04-01",
      "source_updated_date": "2024-07-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PM-YASASVI Comprehensive Scheme Guidelines (MSJE)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Backward Classes Welfare Officer (BCWO)",
      "organization": "State BC/OBC Welfare Department & National Scholarship Portal",
      "portal_url": "https://scholarships.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Belong to OBC, EBC, or DNT categories recognized in Central or respective State lists",
        "Enrolled in regular courses in recognized schools, ITIs, polytechnics, colleges, or universities",
        "Annual family income from all sources must not exceed ₹2,50,000 per annum",
        "Must have secured minimum 50% marks in previous annual examination"
      ],
      "required_documents": [
        "OBC / EBC / DNT Category Certificate issued by authorized revenue officer",
        "Annual Income Certificate (< ₹2.5 Lakhs)",
        "Previous Class Marksheet / Passing Certificate",
        "College / School Bonafide Certificate",
        "Aadhaar-seeded bank account details"
      ]
    },
    "keywords": [
      "pm yasasvi scholarship",
      "obc post matric scholarship central",
      "ebc dnt scholarship nsp",
      "yasasvi 2.5 lakh income limit",
      "backward classes scholarship scheme"
    ]
  },
  {
    "id": "SRC-SCH-4F-ADIP",
    "title": "Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances (ADIP Scheme)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4F_DISABILITY_WELFARE",
    "summary": "Ministry of Social Justice and Empowerment welfare scheme: Provides modern, durable, and sophisticated assistive aids (motorized tricycles, smart canes, wheelchairs, behind-the-ear hearing aids, daisy players, artificial limbs, cochlear implants up to ₹6 Lakhs for children) free of cost to Divyangjan having >= 40% benchmark disability with monthly income up to ₹22,500 (50% subsidy for income between ₹22,501 and ₹30,000).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Empowerment of Persons with Disabilities (DEPwD), MSJE & ALIMCO",
      "official_source_url": "https://adip.disabilityaffairs.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "DEPwD / Artificial Limbs Manufacturing Corporation of India (ALIMCO)",
      "effective_from": "2014-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "ADIP Scheme Guidelines (DEPwD) under Rights of Persons with Disabilities Act 2016"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Differently Abled Welfare Officer (DDAWO) / ALIMCO Camp Officer",
      "organization": "ALIMCO & District Disability Rehabilitation Centres (DDRC)",
      "portal_url": "https://adip.disabilityaffairs.gov.in",
      "helpline_number": "1800-180-5129",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Indian citizen of any age holding a valid Disability Certificate / UDID card with 40% or more disability",
        "Monthly family/personal income from all sources not exceeding ₹22,500 (Full 100% grant) or ₹30,000 (50% grant)",
        "Should not have received the same aid from Government in the last 3 years (last 1 year for children under 12)"
      ],
      "required_documents": [
        "Disability Certificate / Unique Disability ID (UDID) Card",
        "Income Certificate / BPL Ration Card / Salary Slip",
        "Aadhaar Card",
        "Two passport size photographs showing the disability"
      ]
    },
    "keywords": [
      "adip scheme disability aids",
      "free motorized tricycle wheelchair",
      "cochlear implant 6 lakh adip",
      "alimco free aids divyangjan",
      "udid card 40 percent disability"
    ]
  },
  {
    "id": "SRC-SCH-4G-IGNOAPS",
    "title": "Indira Gandhi National Old Age Pension Scheme (IGNOAPS - NSAP)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "Non-contributory universal monthly social security pension under NSAP for impoverished elderly citizens: Central contribution of ₹200/month for age 60–79 and ₹500/month for age 80+, enhanced by substantial State top-ups (ranging from ₹1,000/month in UP/TN to ₹2,500/month in Delhi and ₹3,000/month in AP/Haryana).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Ministry of Rural Development (MoRD), Government of India",
      "official_source_url": "https://nsap.nic.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Rural Development / State Social Welfare Departments",
      "effective_from": "2007-11-19",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "NSAP Guidelines, Article 41 of the Constitution of India"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Tahsildar / Village Administrative Officer (VAO) / BDO",
      "organization": "State Social Welfare & Revenue Department",
      "portal_url": "https://nsap.nic.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Age 60 years or above",
        "Belongs to a household living Below the Poverty Line (BPL) as per official State/Central criteria"
      ],
      "required_documents": [
        "Aadhaar Card / Age Proof document",
        "BPL Ration Card / Income Certificate",
        "Bank Passbook seeded with Aadhaar for DBT"
      ]
    },
    "keywords": [
      "ignoaps old age pension",
      "senior citizen monthly pension",
      "nsap 60 years bpl pension",
      "old age assistance dbt",
      "vridha pension national"
    ]
  },
  {
    "id": "SRC-SCH-4G-VAYOSHRI",
    "title": "Rashtriya Vayoshri Yojana (RVY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "Ministry of Social Justice and Empowerment scheme for senior citizens: Provides assisted-living devices and physical aids (walking sticks, elbow crutches, walkers, hearing aids, wheelchairs, artificial dentures, spectacles) free of cost to BPL senior citizens aged 60+ suffering from age-related disabilities or infirmities.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Social Justice and Empowerment, Ministry of Social Justice and Empowerment",
      "official_source_url": "https://socialjustice.gov.in/schemes/30",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "DEPwD / ALIMCO / District Social Welfare Officers",
      "effective_from": "2017-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Rashtriya Vayoshri Yojana Guidelines (Senior Citizens Welfare Fund)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer / ALIMCO Camp Nodal Officer",
      "organization": "ALIMCO & Ministry of Social Justice and Empowerment",
      "portal_url": "https://socialjustice.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Senior citizen aged 60 years or above",
        "Possessing BPL ration card or family income within monthly state threshold",
        "Suffering from any age-related physical impairment (mobility, hearing, vision, teeth)"
      ],
      "required_documents": [
        "Aadhaar Card / Proof of Age",
        "BPL Card / Income Certificate",
        "Medical Assessment slip from camp doctor"
      ]
    },
    "keywords": [
      "rashtriya vayoshri yojana",
      "free spectacles hearing aid senior citizen",
      "free artificial dentures wheelchair 60 years",
      "alimco senior citizen camp"
    ]
  },
  {
    "id": "SRC-SCH-4H-PMKISAN",
    "title": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4H_FARMERS_AGRICULTURE",
    "summary": "Central Sector Direct Benefit Transfer (DBT) scheme: Provides assured income support of ₹6,000 per year to all landholding farmer families across India, disbursed in three equal quarterly installments of ₹2,000 directly into Aadhaar-seeded bank accounts.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Agriculture & Farmers Welfare, Ministry of Agriculture and Farmers Welfare",
      "official_source_url": "https://pmkisan.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Agriculture and Farmers Welfare / State Agriculture Departments",
      "effective_from": "2018-12-01",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PM-KISAN Operational Guidelines (Ministry of Agriculture)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Assistant Agricultural Officer (AAO) / Village Administrative Officer (VAO)",
      "organization": "State Department of Agriculture & PM-KISAN Portal",
      "portal_url": "https://pmkisan.gov.in",
      "helpline_number": "155261 / 1800-115-526",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Farmer family owning cultivable land as per official land records (Pattadar / Chitta / RoR)",
        "Mandatory completion of e-KYC (OTP/Biometric) on PM-KISAN portal",
        "Mandatory Land Seeding in State Revenue Database",
        "Exclusions: Institutional landholders, constitutional post holders, serving/retired government employees (except Group D/MTS), income tax payees in last AY, professionals (doctors, engineers, lawyers, CAs)"
      ],
      "required_documents": [
        "Land Record Extract (Patta / Chitta / Khasra / Khatauni / Record of Rights)",
        "Aadhaar Card (seeded with bank account)",
        "Active Savings Bank Account Passbook",
        "e-KYC verification slip"
      ]
    },
    "keywords": [
      "pm kisan samman nidhi",
      "6000 rupees farmer income support",
      "pmkisan gov in ekyc",
      "landholding farmer dbt 2000",
      "patta chitta land seeding"
    ]
  },
  {
    "id": "SRC-SCH-4H-PMFBY",
    "title": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4H_FARMERS_AGRICULTURE",
    "summary": "Comprehensive crop insurance scheme providing comprehensive financial protection against yield losses and localized calamities (drought, flood, pest attack, cyclone, unseasonal rain, post-harvest losses) at nominal, heavily subsidized farmer premiums: 2.0% for Kharif food/oilseeds, 1.5% for Rabi food/oilseeds, and 5.0% for annual commercial/horticultural crops.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Department of Agriculture & Farmers Welfare, Ministry of Agriculture and Farmers Welfare",
      "official_source_url": "https://pmfby.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Agriculture / Empaneled General Insurance Companies",
      "effective_from": "2016-02-18",
      "source_updated_date": "2024-04-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PMFBY Operational Guidelines (Ministry of Agriculture)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Agriculture Officer / Primary Agricultural Credit Society (PACS) Secretary",
      "organization": "PMFBY National Crop Insurance Portal & Agriculture Insurance Companies",
      "portal_url": "https://pmfby.gov.in",
      "helpline_number": "14447 (Kisan Call Centre / PMFBY Helpline)",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 72,
      "eligibility_conditions": [
        "All farmers including loanee and non-loanee farmers, tenant farmers, and sharecroppers cultivating notified crops in notified insurance units",
        "Must have sown the insured crop or intended to sow (prevented sowing coverage)"
      ],
      "required_documents": [
        "Land Record Proof (RoR / Patta / Land Possession Certificate / Registered Tenancy Agreement)",
        "Sowing Certificate issued by Village Administrative Officer / Revenue Officer",
        "Aadhaar Card",
        "Bank Account details"
      ]
    },
    "keywords": [
      "pmfby crop insurance",
      "fasal bima yojana claim",
      "kharif 2 percent rabi 1.5 percent",
      "72 hours crop loss intimation",
      "drought flood crop compensation"
    ]
  },
  {
    "id": "SRC-SCH-4H-KISANMAAN",
    "title": "Pradhan Mantri Kisan Maandhan Yojana (PM-KMY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4H_FARMERS_AGRICULTURE",
    "summary": "Voluntary and contributory old age pension scheme for Small and Marginal Farmers (SMFs): Guarantees a minimum monthly pension of ₹3,000 upon reaching 60 years of age with 50% monthly contribution by the farmer (₹55–₹200 depending on entry age 18–40) matched 1:1 by the Central Government, managed by LIC of India.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Agriculture & Farmers Welfare, Ministry of Agriculture and Farmers Welfare",
      "official_source_url": "https://maandhan.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Agriculture / Life Insurance Corporation of India (LIC) / CSC",
      "effective_from": "2019-09-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Pradhan Mantri Kisan Maandhan Yojana Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Common Service Centre (CSC) VLE / LIC Branch Manager",
      "organization": "Life Insurance Corporation of India & Ministry of Agriculture",
      "portal_url": "https://maandhan.in",
      "helpline_number": "1800-267-6888",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Small and marginal farmers owning cultivable land up to 2 hectares (5 acres) as per state land records",
        "Entry age between 18 and 40 years",
        "Exclusions: Farmers covered under NPS, ESIC, EPFO, or PM-SYM, income tax payees"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Savings Bank Account Passbook with IFSC",
        "Landholding records (Patta / Khasra)"
      ]
    },
    "keywords": [
      "pm kisan maandhan yojana",
      "farmer pension 3000 monthly",
      "small marginal farmer pension",
      "maandhan in farmer scheme"
    ]
  },
  {
    "id": "SRC-SCH-4I-ESHRAM",
    "title": "e-Shram National Database & Unorganised Workers Social Security Welfare",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4I_WORKERS_EMPLOYMENT_SKILLS",
    "summary": "National Digital Registry under Ministry of Labour & Employment: Issues Universal Account Number (UAN) card providing accidental insurance cover of ₹2,00,000 (accidental death/permanent disability) and ₹1,00,000 (partial disability), and automatic integration for Central and State social security and disaster relief welfare transfers.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Labour & Employment (MoLE), Government of India",
      "official_source_url": "https://eshram.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Labour & Employment / State Labour Departments",
      "effective_from": "2021-08-26",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Unorganised Workers' Social Security Act, 2008 & Code on Social Security, 2020"
    },
    "supported_use_cases": [
      "problem_understanding",
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Assistant Labour Commissioner / CSC Village Level Entrepreneur (VLE)",
      "organization": "e-Shram Helpdesk & State Labour Commissionerate",
      "portal_url": "https://eshram.gov.in",
      "helpline_number": "14434 (Toll Free)",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Unorganised workers aged between 16 and 59 years (construction workers, domestic helpers, gig workers, agricultural labourers, street vendors, auto drivers)",
        "Must NOT be a member of EPFO or ESIC",
        "Must NOT be an income tax payer"
      ],
      "required_documents": [
        "Aadhaar Number",
        "Aadhaar-linked active Mobile Number",
        "Active Bank Account details"
      ]
    },
    "keywords": [
      "eshram card registration",
      "unorganised worker uan card",
      "eshram accident insurance 2 lakh",
      "eshram gov in 14434",
      "construction delivery gig worker card"
    ]
  },
  {
    "id": "SRC-SCH-4I-MGNREGA",
    "title": "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4I_WORKERS_EMPLOYMENT_SKILLS",
    "summary": "Statutory rights-based legal guarantee: Provides at least 100 days of guaranteed wage employment per financial year to every rural household whose adult members volunteer to do unskilled manual work, with mandatory statutory wages paid within 15 days directly into bank accounts, and unemployment allowance if work is not provided within 15 days of demand.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Ministry of Rural Development (MoRD), Government of India",
      "official_source_url": "https://nrega.nic.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Ministry of Rural Development / Gram Panchayats / Block Development Officers",
      "effective_from": "2006-02-02",
      "source_updated_date": "2024-04-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Mahatma Gandhi National Rural Employment Guarantee Act, 2005 (Act No. 42 of 2005)"
    },
    "supported_use_cases": [
      "problem_understanding",
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Gram Panchayat Secretary / Village Administrative Officer / BDO",
      "organization": "Gram Panchayat & District Rural Development Agency (DRDA)",
      "portal_url": "https://nrega.nic.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 15,
      "eligibility_conditions": [
        "Adult members (aged 18+) of a rural household residing in the Gram Panchayat area",
        "Willing to undertake unskilled manual labour",
        "Holder of MGNREGA Job Card (issued free of cost within 15 days of application)"
      ],
      "required_documents": [
        "Aadhaar Card of all adult household members",
        "Proof of rural residence (Ration Card / Voter ID)",
        "Aadhaar-seeded Bank / Post Office Account details"
      ]
    },
    "keywords": [
      "mgnrega 100 days guaranteed work",
      "nrega job card application",
      "rural employment guarantee act 2005",
      "nrega wage rate dbt",
      "unemployment allowance 15 days"
    ]
  },
  {
    "id": "SRC-SCH-4I-SVANIDHI",
    "title": "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4I_WORKERS_EMPLOYMENT_SKILLS",
    "summary": "Micro-credit facility by Ministry of Housing and Urban Affairs: Provides collateral-free working capital loans of ₹10,000 (1st tranche), ₹20,000 (2nd tranche), and ₹50,000 (3rd tranche) to urban/peri-urban street vendors with 7% interest subsidy per annum and cashback rewards up to ₹1,200/year for digital transactions.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Housing and Urban Affairs (MoHUA), Government of India",
      "official_source_url": "https://pmsvanidhi.mohua.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Housing and Urban Affairs / SIDBI / Urban Local Bodies",
      "effective_from": "2020-06-01",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PM SVANidhi Scheme Guidelines (MoHUA & SIDBI)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Town Vending Committee (TVC) Officer / Bank Branch Manager",
      "organization": "Urban Local Body (Municipal Corporation / Municipality) & SIDBI",
      "portal_url": "https://pmsvanidhi.mohua.gov.in",
      "helpline_number": "1800-111-979",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Street vendors vending in urban / peri-urban / rural surrounding areas",
        "Possessing Certificate of Vending / ID Card issued by Urban Local Body, or Letter of Recommendation (LoR) from Town Vending Committee"
      ],
      "required_documents": [
        "Certificate of Vending / ID Card / LoR from Municipal Body",
        "Aadhaar Card",
        "Bank Account details",
        "UPI QR Code for digital cashback"
      ]
    },
    "keywords": [
      "pm svanidhi street vendor loan",
      "10000 working capital loan vendor",
      "pmsvanidhi mohua gov in",
      "7 percent interest subsidy street vendor"
    ]
  },
  {
    "id": "SRC-SCH-4J-VISHWAKARMA",
    "title": "PM Vishwakarma Scheme (End-to-End Support for Traditional Artisans & Craftspersons)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4J_ENTREPRENEURSHIP_MSME",
    "summary": "Central Sector scheme for 18 traditional trades (Carpenters, Blacksmiths, Masons, Tailors, Cobblers, Potters, Sculptors, Fisher-net makers, etc.): Provides official PM Vishwakarma Certificate and ID Card, 5–7 days Basic Skill Training with ₹500/day stipend, ₹15,000 digital e-Voucher for modern toolkits, and collateral-free enterprise loans up to ₹3,00,000 (₹1 Lakh 1st tranche, ₹2 Lakhs 2nd tranche) at a concessional interest rate of 5% with 8% interest subvention paid by Government.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Micro, Small and Medium Enterprises (MoMSME), Government of India",
      "official_source_url": "https://pmvishwakarma.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of MSME / Ministry of Skill Development / SIDBI",
      "effective_from": "2023-09-17",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PM Vishwakarma Operational Guidelines (Cabinet Approved)"
    },
    "supported_use_cases": [
      "problem_understanding",
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "General Manager, District Industries Centre (DIC) / Gram Panchayat Pradhan",
      "organization": "District Implementation Committee & Ministry of MSME",
      "portal_url": "https://pmvishwakarma.gov.in",
      "helpline_number": "1800-267-7777 / 17923",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Artisan or craftsperson working with hands and tools in one of the 18 eligible traditional family-based trades",
        "Minimum age 18 years on the date of application",
        "Should not have availed loans under PMEGP, PM MUDRA, or PM SVANidhi in the past 5 years (except where fully repaid)",
        "Registration limited to one member per family"
      ],
      "required_documents": [
        "Aadhaar Card and active Mobile Number",
        "Bank Account details",
        "Ration Card (for family verification)"
      ]
    },
    "keywords": [
      "pm vishwakarma scheme",
      "traditional artisan 15000 toolkit voucher",
      "5 percent interest artisan loan 3 lakh",
      "pmvishwakarma gov in",
      "18 traditional trades craftsperson"
    ]
  },
  {
    "id": "SRC-SCH-4J-MUDRA",
    "title": "Pradhan Mantri MUDRA Yojana (PMMY) — Micro & Small Enterprise Credit",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4J_ENTREPRENEURSHIP_MSME",
    "summary": "National micro-enterprise credit scheme providing institutional collateral-free loans to non-corporate, non-farm small/micro enterprises across three categories: Shishu (loans up to ₹50,000), Kishore (loans ₹50,001 to ₹5,00,000), Tarun (loans ₹5,00,001 to ₹10,00,000), and Tarun Plus (up to ₹20,00,000 for previous successful Tarun borrowers under Union Budget 2024).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Financial Services (DFS), Ministry of Finance & MUDRA Ltd.",
      "official_source_url": "https://www.mudra.org.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Micro Units Development & Refinance Agency (MUDRA) / Scheduled Commercial Banks / NBFCs",
      "effective_from": "2015-04-08",
      "source_updated_date": "2024-07-23",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Pradhan Mantri MUDRA Yojana Guidelines (DFS/RBI)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Branch Manager / Credit Officer",
      "organization": "Public / Private Sector Banks, Regional Rural Banks, Small Finance Banks, NBFCs",
      "portal_url": "https://www.udyamimitra.in",
      "helpline_number": "1800-180-1111",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Any Indian citizen who has a business plan for a non-farm income generating activity (manufacturing, processing, trading, or service sector)",
        "Should NOT be a defaulter to any bank or financial institution"
      ],
      "required_documents": [
        "Proof of Identity (Aadhaar / Voter ID / PAN)",
        "Proof of Residence",
        "Business Enterprise Address Proof & Udyam Registration Certificate",
        "Bank Account Statement for last 6 months",
        "Quotation of machinery/items to be purchased (for Kishore & Tarun)"
      ]
    },
    "keywords": [
      "pm mudra yojana loan",
      "shishu kishore tarun loan",
      "collateral free business loan mudra",
      "udyamimitra in mudra",
      "small business loan up to 20 lakh"
    ]
  },
  {
    "id": "SRC-SCH-4J-PMEGP",
    "title": "Prime Minister's Employment Generation Programme (PMEGP)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4J_ENTREPRENEURSHIP_MSME",
    "summary": "Credit-linked subsidy programme by Ministry of MSME administered through KVIC: Provides margin money subsidy of 15% to 35% on bank-financed micro-enterprises with project cost up to ₹50 Lakhs for manufacturing units and ₹20 Lakhs for service units (Special category/Rural: 35% subsidy).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Khadi and Village Industries Commission (KVIC), Ministry of MSME",
      "official_source_url": "https://www.kviconline.gov.in/pmegpeportal",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "KVIC / State KVIB / District Industries Centres (DIC)",
      "effective_from": "2008-08-15",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PMEGP Scheme Guidelines (Ministry of MSME)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "General Manager DIC / State Director KVIC",
      "organization": "KVIC & District Industries Centre",
      "portal_url": "https://www.kviconline.gov.in/pmegpeportal",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Individual aged 18 years and above",
        "Minimum 8th pass for projects costing above ₹10 Lakhs in manufacturing and above ₹5 Lakhs in service",
        "Self-Help Groups, Co-operative societies and Charitable Trusts eligible"
      ],
      "required_documents": [
        "Detailed Project Report (DPR)",
        "Aadhaar Card and Caste/Category Certificate",
        "Educational Qualification Certificate (8th pass or higher)",
        "EDP Training Certificate (mandatory prior to subsidy release)"
      ]
    },
    "keywords": [
      "pmegp subsidy loan",
      "35 percent margin money subsidy",
      "kvic online pmegp portal",
      "manufacturing service unit loan 50 lakh"
    ]
  },
  {
    "id": "SRC-SCH-4K-PMAYG",
    "title": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4K_HOUSING_BASIC_NEEDS",
    "summary": "Rural housing entitlement scheme under Ministry of Rural Development: Provides financial grant assistance of ₹1,20,000 in plain areas and ₹1,30,000 in hilly/difficult/IAP areas for construction of a disaster-resilient pucca house with toilet (swachh bharat convergence ₹12,000) and 90–95 days of unskilled labour wages under MGNREGS (approx. ₹25,000).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Ministry of Rural Development (MoRD), Government of India",
      "official_source_url": "https://pmayg.nic.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Rural Development / Gram Panchayats / District Rural Development Agencies",
      "effective_from": "2016-11-20",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Framework for Implementation of PMAY-G (Ministry of Rural Development)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Block Development Officer (BDO) / Panchayat Secretary",
      "organization": "Gram Panchayat & District Rural Development Agency (DRDA)",
      "portal_url": "https://pmayg.nic.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Houseless families or households living in zero, one, or two-room kutcha houses with kutcha roof and walls as per SECC / Awaas+ list",
        "Must NOT own a motorized 3/4 wheeler, mechanized agricultural equipment, or have regular government employees in family"
      ],
      "required_documents": [
        "Aadhaar Card of all family members",
        "Aadhaar-seeded Bank Account Passbook",
        "Land possession certificate / No-objection certificate from Gram Sabha",
        "Geo-tagged photographs of existing kutcha house"
      ]
    },
    "keywords": [
      "pmayg rural housing",
      "120000 pucca house grant",
      "awaas plus list pmayg",
      "rural kutcha house assistance",
      "pmayg nic in awassoft"
    ]
  },
  {
    "id": "SRC-SCH-4K-SURYAGHAR",
    "title": "PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar Subsidy Scheme)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4K_HOUSING_BASIC_NEEDS",
    "summary": "National rooftop solar scheme by Ministry of New and Renewable Energy: Provides direct central financial subsidy of ₹30,000 for 1 kW system, ₹60,000 for 2 kW system, and ₹78,000 for 3 kW and above rooftop solar installations, enabling residential households to obtain up to 300 units of free electricity every month with collateral-free low-interest bank loans at 7%.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of New and Renewable Energy (MNRE), Government of India",
      "official_source_url": "https://pmsuryaghar.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of New and Renewable Energy / State DISCOMs / REC Ltd.",
      "effective_from": "2024-02-13",
      "source_updated_date": "2024-07-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PM Surya Ghar: Muft Bijli Yojana Operational Guidelines (MNRE)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Executive Engineer (DISCOM) / Empaneled Solar Vendor",
      "organization": "State Electricity Distribution Company (DISCOM) & National Portal for Rooftop Solar",
      "portal_url": "https://pmsuryaghar.gov.in",
      "helpline_number": "15555",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Residential household with an active electricity connection in the applicant's name",
        "Suitable roof space with unhindered solar access",
        "Installation done through empaneled vendors using Domestic Content Requirement (DCR) solar modules"
      ],
      "required_documents": [
        "Latest Electricity Bill",
        "Aadhaar Card",
        "Bank Account details / Cancelled Cheque (for DBT subsidy credit)",
        "Roof ownership document / NOC if shared roof"
      ]
    },
    "keywords": [
      "pm surya ghar muft bijli yojana",
      "rooftop solar subsidy 78000",
      "300 units free electricity solar",
      "pmsuryaghar gov in",
      "discom net metering solar"
    ]
  },
  {
    "id": "SRC-SCH-4K-UJJWALA",
    "title": "Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4K_HOUSING_BASIC_NEEDS",
    "summary": "Clean cooking fuel scheme by Ministry of Petroleum and Natural Gas: Provides deposit-free LPG connection (cylinder, regulator, hose, and domestic gas safety card) plus free first LPG refill and free gas stove to adult women from poor/deprived households, with ongoing targeted subsidy of ₹300 per 14.2kg cylinder up to 12 refills per year.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Petroleum and Natural Gas (MoPNG), Government of India",
      "official_source_url": "https://www.pmuy.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "MoPNG / Oil Marketing Companies (IOCL, BPCL, HPCL)",
      "effective_from": "2016-05-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PMUY 2.0 Guidelines (MoPNG)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "LPG Distributor / Gas Agency Manager",
      "organization": "Indane / Bharatgas / HP Gas Agency",
      "portal_url": "https://www.pmuy.gov.in",
      "helpline_number": "1906 (LPG Emergency) / 1800-266-6696",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Adult woman (aged 18+) from SC/ST, PMAY beneficiary, Forest Dwellers, MBC, Tea Garden, River Island, or Poor/SECC households",
        "No existing LPG connection in the applicant's household"
      ],
      "required_documents": [
        "Aadhaar Card of the applicant and adult family members",
        "Ration Card / Family Composition Certificate",
        "Bank Account Passbook (Aadhaar seeded for subsidy DBT)",
        "Proof of Address"
      ]
    },
    "keywords": [
      "pm ujjwala yojana 2.0",
      "free lpg gas connection women",
      "deposit free gas cylinder ujjwala",
      "300 rupees lpg subsidy dbt"
    ]
  },
  {
    "id": "SRC-SCH-4L-ABPMJAY",
    "title": "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "World's largest government-funded health assurance scheme: Provides completely cashless and paperless secondary and tertiary healthcare hospitalisation cover of up to ₹5,00,000 per family per year across 29,000+ empaneled public and private hospitals for 1,949 notified medical and surgical packages, with universal cover extended to all senior citizens aged 70+ irrespective of income under Union Cabinet approval.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "National Health Authority (NHA), Ministry of Health and Family Welfare",
      "official_source_url": "https://beneficiary.nha.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "National Health Authority (NHA) / State Health Agencies (SHA)",
      "effective_from": "2018-09-23",
      "source_updated_date": "2024-09-11",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Ayushman Bharat National Health Protection Mission Guidelines"
    },
    "supported_use_cases": [
      "problem_understanding",
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Ayushman Mitra / Medico Nodal Officer",
      "organization": "National Health Authority & Empaneled Hospital Ayushman Kiosk",
      "portal_url": "https://beneficiary.nha.gov.in",
      "helpline_number": "14555 / 1800-111-565",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Families identified in deprivation criteria of Socio-Economic Caste Census (SECC 2011) or mapped NFSA/State ration databases",
        "Universal senior citizen category: Any citizen aged 70 years and above (irrespective of income/SECC status) eligible for Ayushman Vay Vandana Card providing ₹5 Lakh shared cover"
      ],
      "required_documents": [
        "Aadhaar Card (Mandatory for e-KYC)",
        "Ration Card / PM-JAY Family ID / State Smart Card",
        "Active mobile number linked with Aadhaar"
      ]
    },
    "keywords": [
      "ayushman bharat pmjay card",
      "5 lakh cashless health insurance",
      "ayushman card 70 years senior citizens",
      "beneficiary nha gov in",
      "ayushman mitra hospital kiosk"
    ]
  },
  {
    "id": "SRC-SCH-4L-RAN",
    "title": "Rashtriya Arogya Nidhi (RAN) & Health Minister's Discretionary Grant",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Ministry of Health financial assistance scheme for indigent patients: Provides one-time financial grant up to ₹15,00,000 for BPL patients suffering from major life-threatening diseases (cancer, heart disease, kidney failure/transplant, rare diseases) receiving treatment at AIIMS or other Central Government super-speciality hospitals.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Ministry of Health and Family Welfare (MoHFW), Government of India",
      "official_source_url": "https://mohfw.gov.in/schemes-programmes/rashtriya-arogya-nidhi-ran",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Health & Family Welfare / Government Super Speciality Hospitals",
      "effective_from": "1997-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Rashtriya Arogya Nidhi Guidelines (MoHFW)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Medical Superintendent / Head of Department",
      "organization": "AIIMS / Central Government Hospital & MoHFW",
      "portal_url": "https://mohfw.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Patient living Below the Poverty Line (BPL) or suffering from rare diseases",
        "Undergoing treatment at designated Government super-speciality hospital/institute",
        "Not covered under PM-JAY or any other health insurance scheme for the same ailment"
      ],
      "required_documents": [
        "BPL Ration Card / Income Certificate",
        "Medical Report and Treatment Cost Estimate proforma signed by treating specialist",
        "Aadhaar Card"
      ]
    },
    "keywords": [
      "rashtriya arogya nidhi ran",
      "cancer kidney transplant financial assistance 15 lakh",
      "aiims bpl patient medical grant",
      "health minister discretionary grant"
    ]
  },
  {
    "id": "SRC-SCH-4M-PMMSY",
    "title": "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4M_FISHERFOLK_WELFARE",
    "summary": "Comprehensive flagship fisheries development scheme by Department of Fisheries (Ministry of Fisheries, Animal Husbandry and Dairying): Delivers subsidy support (40% for General, 60% for SC/ST/Women) for modern fishing vessels, biofloc, re-circulatory aquaculture (RAS), cold chain, fish kiosks, deep-sea fishing, and livelihood and nutritional support of ₹4,500/year (₹1,500 fisher contribution + ₹3,000 Govt) during the annual marine fishing ban period.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Department of Fisheries, Ministry of Fisheries, Animal Husbandry and Dairying",
      "official_source_url": "https://pmmsy.dof.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Fisheries / State Fisheries Departments / NFDB",
      "effective_from": "2020-09-10",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PMMSY Operational Guidelines (Department of Fisheries)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Assistant Director of Fisheries / Inspector of Fisheries",
      "organization": "State Fisheries Department & National Fisheries Development Board (NFDB)",
      "portal_url": "https://pmmsy.dof.gov.in",
      "helpline_number": "1800-423-1634",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Traditional fishers, fish farmers, fisheries self-help groups, fisheries co-operatives, and fisheries entrepreneurs",
        "Registered with State Fisheries Department / Marine Police"
      ],
      "required_documents": [
        "Fishermen Biometric ID Card / Marine Fishing License",
        "Aadhaar Card",
        "Bank Account details",
        "Land / Water body ownership or registered lease agreement (for aquaculture)"
      ]
    },
    "keywords": [
      "pmmsy fisheries scheme",
      "fishermen fishing ban relief 4500",
      "aquaculture biofloc 60 percent subsidy",
      "deep sea fishing boat subsidy",
      "dof gov in pmmsy"
    ]
  },
  {
    "id": "SRC-SCH-4N-NRLM",
    "title": "Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (DAY-NRLM)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4N_RURAL_LIVELIHOODS",
    "summary": "Poverty alleviation mission by Ministry of Rural Development: Organizes rural women into Self-Help Groups (SHGs) providing Revolving Funds (₹20,000–₹30,000 per SHG), Community Investment Support Funds (up to ₹1.5 Lakhs per SHG), and subsidized bank credit up to ₹10 Lakhs with interest subvention down to 7% (and 4% for prompt repayment) for women-led rural micro-enterprises.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRALLY_SPONSORED"
    },
    "provenance": {
      "official_source_name": "Ministry of Rural Development (MoRD), Government of India",
      "official_source_url": "https://nrlm.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Ministry of Rural Development / State Rural Livelihood Missions (SRLM)",
      "effective_from": "2011-06-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "DAY-NRLM Master Guidelines (Ministry of Rural Development)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Block Mission Manager (BMM) / Community Resource Person (CRP)",
      "organization": "State Rural Livelihoods Mission (SRLM) & Village Organization",
      "portal_url": "https://nrlm.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Rural women from poor and vulnerable households",
        "Member of an active Self-Help Group (SHG) practicing regular meetings, savings, and internal lending (Panchasutra)"
      ],
      "required_documents": [
        "Aadhaar Card",
        "SHG Member Passbook and Bank Account details",
        "Village Organization recommendation"
      ]
    },
    "keywords": [
      "day nrlm self help group",
      "women shg revolving fund",
      "livelihood interest subvention 7 percent",
      "aajeevika rural mission",
      "nrlm gov in shg credit"
    ]
  },
  {
    "id": "SRC-SCH-4O-PMJJBY",
    "title": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4O_FINANCIAL_INCLUSION_INSURANCE",
    "summary": "Government-backed renewable life insurance scheme: Offers life cover of ₹2,00,000 for death due to any reason to bank/post office account holders aged 18–50 years at a nominal premium of ₹436 per annum, auto-debited in a single installment.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Financial Services (DFS), Ministry of Finance, Government of India",
      "official_source_url": "https://financialservices.gov.in/beta/en/pmjjby",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Financial Services / LIC & Life Insurance Companies",
      "effective_from": "2015-05-09",
      "source_updated_date": "2022-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Pradhan Mantri Jeevan Jyoti Bima Yojana Rules (DFS)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Bank Branch Manager / Postmaster",
      "organization": "Public/Private Sector Banks, Regional Rural Banks & Life Insurance Companies",
      "portal_url": "https://jansuraksha.gov.in",
      "helpline_number": "1800-180-1111 / 1800-110-001",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Individual bank or post office account holders aged between 18 and 50 years",
        "Consent to join and enable auto-debit of ₹436 annual premium from savings bank account"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Active Savings Bank Account Passbook",
        "Auto-debit authorization form"
      ]
    },
    "keywords": [
      "pmjjby life insurance 436 rupees",
      "2 lakh life cover jansuraksha",
      "term life insurance bank account",
      "jansuraksha gov in pmjjby"
    ]
  },
  {
    "id": "SRC-SCH-4O-PMSBY",
    "title": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4O_FINANCIAL_INCLUSION_INSURANCE",
    "summary": "Universal accident insurance scheme: Provides ₹2,00,000 for accidental death or permanent total disability, and ₹1,00,000 for permanent partial disability to bank account holders aged 18–70 years at an annual premium of just ₹20 auto-debited from the subscriber's account.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Financial Services (DFS), Ministry of Finance",
      "official_source_url": "https://financialservices.gov.in/beta/en/pmsby",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Financial Services / General Insurance Companies",
      "effective_from": "2015-05-09",
      "source_updated_date": "2022-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Pradhan Mantri Suraksha Bima Yojana Rules (DFS)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Bank Branch Manager / Postmaster",
      "organization": "Public/Private Sector Banks & General Insurance Companies",
      "portal_url": "https://jansuraksha.gov.in",
      "helpline_number": "1800-180-1111",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Individual bank account holders aged between 18 and 70 years",
        "Consent to join and enable auto-debit of ₹20 annual premium from savings bank account"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Active Savings Bank Account Passbook",
        "Auto-debit authorization form"
      ]
    },
    "keywords": [
      "pmsby accident insurance 20 rupees",
      "2 lakh accidental death cover",
      "jansuraksha pmsby",
      "accident insurance bank account"
    ]
  },
  {
    "id": "SRC-SCH-4O-APY",
    "title": "Atal Pension Yojana (APY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4O_FINANCIAL_INCLUSION_INSURANCE",
    "summary": "Guaranteed monthly pension scheme administered by PFRDA targeted at unorganised sector workers: Offers guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 to subscribers from age 60 until death, followed by lifetime pension to spouse, and return of full accumulated pension corpus to the nominee.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Pension Fund Regulatory and Development Authority (PFRDA) & DFS, Ministry of Finance",
      "official_source_url": "https://www.npscra.nsdl.co.in/scheme-details.php",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "PFRDA / Scheduled Commercial Banks & India Post",
      "effective_from": "2015-05-09",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Atal Pension Yojana Guidelines (PFRDA Act, 2013)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Bank Branch Manager / APY Nodal Officer",
      "organization": "PFRDA & Scheduled Banks",
      "portal_url": "https://www.npscra.nsdl.co.in",
      "helpline_number": "1800-110-069",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Indian citizen aged between 18 and 40 years",
        "Having a savings bank account with Aadhaar linkage",
        "Must NOT be an income tax payer (as per rule effective Oct 1, 2022)"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Savings Bank Account Passbook",
        "APY Registration & Auto-debit authorization form"
      ]
    },
    "keywords": [
      "atal pension yojana apy",
      "guaranteed pension 5000 60 years",
      "pfrda unorganised pension",
      "jansuraksha apy"
    ]
  },
  {
    "id": "SRC-SCH-4O-PMJDY",
    "title": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4O_FINANCIAL_INCLUSION_INSURANCE",
    "summary": "National Mission for Financial Inclusion: Provides universal access to banking services with zero-balance basic savings bank deposit (BSBD) account, free RuPay debit card with ₹2,00,000 accidental insurance cover, ₹10,000 overdraft facility for eligible account holders, and seamless Direct Benefit Transfer (DBT) gateway for all government welfare subsidies.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "National",
      "government_level": "CENTRAL",
      "jurisdiction_type": "CENTRAL_SECTOR"
    },
    "provenance": {
      "official_source_name": "Department of Financial Services (DFS), Ministry of Finance, Government of India",
      "official_source_url": "https://pmjdy.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Financial Services / Reserve Bank of India / Commercial Banks",
      "effective_from": "2014-08-28",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "PMJDY Guidelines (Ministry of Finance)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Bank Mitra / Bank Branch Manager",
      "organization": "Public and Private Sector Commercial Banks & Regional Rural Banks",
      "portal_url": "https://pmjdy.gov.in",
      "helpline_number": "1800-11-0001 / 1800-180-1111",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Any Indian citizen aged 10 years and above not having a bank account",
        "Overdraft facility of ₹10,000 available to one member per household (preferably the woman head) with satisfactory transaction history of 6 months"
      ],
      "required_documents": [
        "Aadhaar Card (or Simplified KYC documents: Voter ID, NREGA Card, Passport)",
        "Passport size photograph"
      ]
    },
    "keywords": [
      "pmjdy zero balance account",
      "rupay card 2 lakh accident insurance",
      "10000 overdraft facility jan dhan",
      "pmjdy gov in financial inclusion"
    ]
  }
];
