import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 4 State Schemes: All 28 State-Specific Flagship Welfare Schemes
 * Grounded in official State Government Portals and Department G.O.s.
 */
export const STATE_SCHEME_SOURCES: VerifiedSourceRecord[] = [
  {
    "id": "SRC-SCH-AP-CHEYUTHA",
    "title": "YSR Cheyutha (Under State Policy Review / Transition)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Historical welfare livelihood scheme providing ₹18,750/year (total ₹75,000 in 4 installments) to SC, ST, BC, and Minority women aged 45–60 years. NOTE: Following the 2024 state governance transition, legacy YSR Cheyutha is under administrative review and transitioning to the Super Six (Aadabidda Nidhi / NTR Bharosa) welfare architecture. New application intake is not open until revised operational guidelines are officially notified.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Andhra Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Panchayat Raj & Rural Development Department / Social Welfare, Government of Andhra Pradesh",
      "official_source_url": "https://gramawardsachivalayam.ap.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Society for Elimination of Rural Poverty (SERP) / Village & Ward Secretariats",
      "effective_from": "2020-08-12",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "NEEDS_REVERIFICATION",
      "source_priority": 4,
      "legal_basis": "G.O.Ms.No. 405 (Historical) & Super Six Welfare Transition Policy (Govt of AP)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Welfare and Education Assistant (WEA) / Village Secretariat",
      "organization": "Village and Ward Secretariats Department & Social Welfare",
      "portal_url": "https://gramawardsachivalayam.ap.gov.in",
      "helpline_number": "1902 (Citizen Helpline)",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Historical criteria: Women belonging to SC, ST, BC, or Minority communities aged 45 to 60 years with rural family income <= ₹10,000/month or urban <= ₹12,000/month",
        "Current status: Policy transition under Super Six guarantees pending publication of operational guidelines"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Integrated Community Certificate (Caste)",
        "Income Certificate / Rice Card",
        "Aadhaar seeded bank passbook"
      ]
    },
    "keywords": [
      "ysr cheyutha historical",
      "ap women livelihood transition",
      "aadabidda nidhi review",
      "andhra pradesh cheyutha review"
    ]
  },
  {
    "id": "SRC-SCH-AP-AAROGYASRI",
    "title": "Dr. NTR Vaidya Seva (Universal Health Assurance Scheme - Andhra Pradesh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Cashless health assurance scheme (administered by Dr. NTR Vaidya Seva Trust, formerly Dr. YSR Aarogyasri): Provides 100% cashless medical and surgical treatment cover up to ₹25,00,000 per family per year for 3,257+ notified procedures in empaneled network hospitals across Andhra Pradesh, Hyderabad, Chennai, and Bengaluru for Rice Card / BPL cardholders.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Andhra Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Dr. NTR Vaidya Seva Trust, Health, Medical & Family Welfare Department, Government of Andhra Pradesh",
      "official_source_url": "https://ysraarogyasri.ap.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Dr. NTR Vaidya Seva Trust / Health, Medical & Family Welfare Department, AP",
      "effective_from": "2007-04-01",
      "source_updated_date": "2024-06-15",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Dr. NTR Vaidya Seva Scheme Guidelines & Trust Rules (Govt of AP)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Aarogya Mithra / District Coordinator",
      "organization": "Dr. NTR Vaidya Seva Trust & Empaneled Hospitals",
      "portal_url": "https://ysraarogyasri.ap.gov.in",
      "helpline_number": "104 / 1800-425-1818",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Families residing in Andhra Pradesh holding Rice Card / BPL White Ration Card",
        "Annual family income <= ₹5,00,000 per annum"
      ],
      "required_documents": [
        "Aarogyasri / NTR Vaidya Seva Card / Rice Card",
        "Aadhaar Card",
        "Doctor referral from Primary Health Centre"
      ]
    },
    "keywords": [
      "dr ntr vaidya seva health card",
      "ntr aarogya seva 25 lakh",
      "ysr aarogyasri legacy alias",
      "ap cashless health 25 lakh",
      "andhra pradesh cashless hospital 104"
    ]
  },
  {
    "id": "SRC-SCH-AR-CMAAY",
    "title": "Chief Minister's Arogya Arunachal Yojana (CMAAY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Universal cashless health insurance scheme in Arunachal Pradesh: Provides cover of up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization in empaneled hospitals across the state and country to all APST (indigenous tribal) citizens and state regular employees.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Arunachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Health & Family Welfare, Government of Arunachal Pradesh",
      "official_source_url": "https://cmaay.com",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Chief Minister Arogya Arunachal Society (CMAAS)",
      "effective_from": "2018-08-15",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "CMAAY Operational Guidelines (Cabinet Approved)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Medical Officer (DMO) / Arogya Mitra",
      "organization": "CMAAS & Empaneled Hospitals",
      "portal_url": "https://cmaay.com",
      "helpline_number": "1800-233-5555",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Arunachal Pradesh Scheduled Tribe (APST) members holding APST Certificate",
        "Non-APST permanent residents holding Permanent Resident Certificate (PRC) with BPL card",
        "State Government employees and their legal dependents"
      ],
      "required_documents": [
        "APST Certificate / PRC",
        "Aadhaar Card",
        "Ration Card / Govt Employee ID"
      ]
    },
    "keywords": [
      "cmaay arunachal health scheme",
      "chief minister arogya arunachal 5 lakh",
      "apst medical insurance"
    ]
  },
  {
    "id": "SRC-SCH-AR-DULARI",
    "title": "Dulari Kanya Scheme (Arunachal Pradesh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Institutional delivery and girl-child welfare incentive: Direct deposit of ₹20,000 into a fixed deposit account in the name of every girl child born in a Government hospital in Arunachal Pradesh, maturing with interest upon the girl child passing Class 10 and attaining 18 years of age without getting married.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Arunachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Health & Family Welfare, Government of Arunachal Pradesh",
      "official_source_url": "https://arunachalpradesh.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Health and Family Welfare / SBI",
      "effective_from": "2017-08-15",
      "source_updated_date": "2023-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Dulari Kanya Scheme Notification"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Medical Officer In-Charge / Child Development Project Officer",
      "organization": "Primary Health Centre / Community Health Centre",
      "portal_url": "https://arunachalpradesh.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Girl child born in a recognized Government Hospital / Community Health Centre / PHC in Arunachal Pradesh",
        "Mother must be an APST resident or spouse of an APST resident"
      ],
      "required_documents": [
        "Hospital Institutional Delivery Certificate",
        "Birth Certificate of Girl Child",
        "Mother Aadhaar & APST Certificate",
        "Bank / Post Office account details"
      ]
    },
    "keywords": [
      "dulari kanya arunachal",
      "20000 fixed deposit girl child",
      "arunachal institutional delivery"
    ]
  },
  {
    "id": "SRC-SCH-AS-ORUNODOI",
    "title": "Orunodoi 3.0 (Direct Benefit Transfer to Women Heads of Family)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Assam flagship direct cash transfer: Provides ₹1,250 per month deposited directly into bank accounts of eligible nominated female heads of vulnerable and underprivileged families to meet nutritional and medical requirements.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Assam",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Finance Department, Government of Assam",
      "official_source_url": "https://orunodoi.assam.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Finance Department / District Commissioner Offices",
      "effective_from": "2020-10-02",
      "source_updated_date": "2024-09-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Orunodoi 3.0 Implementation Guidelines (Finance Dept Assam)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Commissioner / Circle Officer / VCDC Chairman",
      "organization": "District Administration & Gaon Panchayat",
      "portal_url": "https://orunodoi.assam.gov.in",
      "helpline_number": "1800-345-3525",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Permanent resident of Assam",
        "Nominated beneficiary must be an adult female member of the household",
        "Annual household income must not exceed ₹2,00,000 per annum",
        "Priority given to widows, unmarried women, Divyangjan members, and destitute households"
      ],
      "required_documents": [
        "Ration Card (NFSA) / Income Certificate",
        "Aadhaar Card",
        "Aadhaar-seeded Bank Passbook",
        "Voter ID"
      ]
    },
    "keywords": [
      "orunodoi 3.0 assam",
      "1250 per month women dbt assam",
      "orunodoi assam gov in",
      "assam finance dept orunodoi"
    ]
  },
  {
    "id": "SRC-SCH-AS-PRAGYAN",
    "title": "Pragyan Bharati Scheme (Assam Student Education Support)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "Assam comprehensive student support package: Free college admission and tuition fee waiver for HS to PG students in government colleges for family income below ₹2 Lakhs, free textbooks, mess dues waiver of ₹1,000–₹2,000/mo for hostellers, and Dr. Banikanta Kakati Merit Award (Scooty) for meritorious girl and boy students.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Assam",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Higher Education, Government of Assam",
      "official_source_url": "https://directorateofhighereducation.assam.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Higher Education, Assam / State Universities",
      "effective_from": "2020-07-01",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Pragyan Bharati Scheme G.O. (Higher Education Assam)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Director of Higher Education / College Principal",
      "organization": "Department of Higher Education, Assam",
      "portal_url": "https://directorateofhighereducation.assam.gov.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Students seeking admission in HS, Degree, or PG courses in Assam Provincialised & Govt Colleges",
        "Parental annual income from all sources must not exceed ₹2,00,000 per annum (for fee waiver)",
        "Minimum 60% in HSLC/AHSEC examinations for scooty/merit incentives"
      ],
      "required_documents": [
        "Income Certificate issued by Circle Officer / Revenue Officer",
        "Admit Card & Marksheet of qualifying exam",
        "Aadhaar Card",
        "Bank details"
      ]
    },
    "keywords": [
      "pragyan bharati assam fee waiver",
      "assam college free admission",
      "banikanta kakati scooty scheme",
      "assam higher education grant"
    ]
  },
  {
    "id": "SRC-SCH-BR-KANYA",
    "title": "Mukhyamantri Kanya Utthan Yojana (MKUY - Bihar)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Bihar staged financial incentive from birth to graduation for girls: ₹2,000 on birth, ₹1,000 at 1 yr (Aadhaar linkage), ₹2,000 after complete immunization, ₹10,000 on passing Class 10 (1st div), ₹25,000 on passing Class 12 (unmarried), and ₹50,000 directly via DBT on completing Graduation (Degree).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Bihar",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Education & Social Welfare Department, Government of Bihar",
      "official_source_url": "https://medhasoft.bih.nic.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Education Department / Social Welfare Department, Bihar",
      "effective_from": "2018-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Bihar Cabinet Resolution on Mukhyamantri Kanya Utthan Yojana"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Programme Officer (DPO) / University Nodal Officer",
      "organization": "Education Department, Bihar & Medhasoft Portal",
      "portal_url": "https://medhasoft.bih.nic.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Girl student resident of Bihar",
        "Graduation component: Passed graduation degree from recognized college/university in Bihar",
        "Inter/Class 12 component: Unmarried girl passing Class 12 from Bihar School Examination Board (BSEB)"
      ],
      "required_documents": [
        "Graduation / Class 12 Final Marksheet and Roll Number",
        "Aadhaar Card",
        "Residential / Domicile Certificate",
        "Bank Account in applicant's own name (Aadhaar seeded)"
      ]
    },
    "keywords": [
      "mukhyamantri kanya utthan yojana bihar",
      "bihar graduation 50000 girl",
      "medhasoft bih nic in kanya utthan",
      "bihar inter 25000"
    ]
  },
  {
    "id": "SRC-SCH-BR-STUDENTCREDIT",
    "title": "Bihar Student Credit Card Scheme (MNSSBY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "State education loan guarantee scheme under 7 Nishchay: Provides education loan of up to ₹4,00,000 for higher education (BA, BSc, BTech, MBBS, MBA, Diploma) with nominal simple interest (1% for women, PwD, and transgender / 4% for male students) with moratorium period (course duration + 1 year) and full State Government guarantee.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Bihar",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Bihar State Education Finance Corporation (BSEFC), Government of Bihar",
      "official_source_url": "https://www.7nishchay-yuvaupmission.bihar.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Planning and Development / Education Department / DRCC",
      "effective_from": "2016-10-02",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Bihar Student Credit Card Scheme Rules (BSEFC)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Manager, District Registration and Counseling Centre (DRCC)",
      "organization": "DRCC & Bihar State Education Finance Corporation",
      "portal_url": "https://www.7nishchay-yuvaupmission.bihar.gov.in",
      "helpline_number": "1800-345-6444 (Toll Free)",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Permanent resident of Bihar aged up to 25 years at time of application",
        "Passed Class 12 (or Class 10 for polytechnic) from recognized board in Bihar",
        "Enrolled in recognized higher education institution (NAAC/NIRF/Govt recognized)"
      ],
      "required_documents": [
        "Class 10 and 12 mark sheets & certificates",
        "College Allotment Letter & Fee Schedule",
        "Aadhaar Card of student & co-applicant (parent)",
        "Residential Certificate of Bihar",
        "PAN Card"
      ]
    },
    "keywords": [
      "bihar student credit card",
      "4 lakh education loan 1 percent interest",
      "drcc bihar education loan",
      "7 nishchay student credit card"
    ]
  },
  {
    "id": "SRC-SCH-CG-MAHTARI",
    "title": "Mahtari Vandan Yojana (Chhattisgarh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Chhattisgarh direct financial assistance scheme for married women: Provides ₹1,000 per month (₹12,000 per year) directly transferred via DBT into Aadhaar-seeded bank accounts of eligible married, widowed, deserted, and divorced women aged 21+.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Chhattisgarh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Women and Child Development Department, Government of Chhattisgarh",
      "official_source_url": "https://mahtarivandan.cgstate.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Women and Child Development Department, CG",
      "effective_from": "2024-03-01",
      "source_updated_date": "2024-03-10",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Mahtari Vandan Yojana Guidelines (WCD Chhattisgarh)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Anganwadi Worker",
      "organization": "WCD Department & Gram Panchayat / Ward Office",
      "portal_url": "https://mahtarivandan.cgstate.gov.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Married woman resident of Chhattisgarh (includes widows, divorced, and abandoned women)",
        "Age 21 years or above on January 1 of the application year",
        "Family must not contain income tax payees or regular Government / PSU employees"
      ],
      "required_documents": [
        "Aadhaar Card of applicant and husband",
        "Marriage Certificate / Ration Card / Affidavit",
        "Aadhaar-seeded bank passbook",
        "Domicile Certificate"
      ]
    },
    "keywords": [
      "mahtari vandan yojana chhattisgarh",
      "1000 rupees monthly women cg",
      "mahtarivandan cgstate gov in",
      "married women 12000 per year"
    ]
  },
  {
    "id": "SRC-SCH-GA-GRIHA",
    "title": "Griha Aadhar Scheme (Goa)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Goa state welfare grant to maintain household living standards: Provides monthly financial assistance of ₹1,500 deposited directly into bank accounts of married housewives / homemakers from low-income families residing in Goa for 15+ years.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Goa",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Directorate of Women and Child Development, Government of Goa",
      "official_source_url": "https://www.goa.gov.in/department/directorate-of-women-and-child-development",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Women and Child Development, Goa",
      "effective_from": "2012-10-02",
      "source_updated_date": "2023-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Griha Aadhar Scheme Rules (Govt of Goa)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Director / Child Development Project Officer (CDPO)",
      "organization": "Directorate of Women and Child Development, Panaji",
      "portal_url": "https://www.goa.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Married woman / housewife whose husband is living or deceased",
        "Resident of Goa for minimum 15 years",
        "Gross annual family income must not exceed ₹3,00,000 per annum"
      ],
      "required_documents": [
        "15 Years Residence Certificate of Goa",
        "Income Certificate issued by Mamlatdar",
        "Marriage Certificate",
        "Aadhaar Card & Bank details"
      ]
    },
    "keywords": [
      "griha aadhar goa",
      "1500 per month housewife goa",
      "goa women welfare 3 lakh income"
    ]
  },
  {
    "id": "SRC-SCH-GJ-MA",
    "title": "Mukhyamantri Amrutam (MA / MA Vatsalya) & PM-JAY Gujarat",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Gujarat comprehensive health protection scheme: Delivers 100% cashless treatment up to ₹10,00,000 per family per year in empaneled multi-specialty government and private hospitals for serious illnesses (heart surgery, oncology, neurosurgery, burns, renal failure, neonatal diseases) to BPL and middle-income families with income up to ₹4 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Gujarat",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Health & Family Welfare Department, Government of Gujarat",
      "official_source_url": "https://www.magujarat.com",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Anti-Fraud & Health Agency (SHA Gujarat)",
      "effective_from": "2012-09-04",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Mukhyamantri Amrutam Yojana G.O.s (H&FW Gujarat)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Nodal Officer / MA Kiosk Executive",
      "organization": "Civic Centre / Taluka Seva Sadan / District Hospital",
      "portal_url": "https://www.magujarat.com",
      "helpline_number": "1800-233-1022 (Toll Free)",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Families enrolled in BPL list OR families with annual gross income up to ₹4,00,000 (MA Vatsalya)",
        "Senior citizens (60+) in families with income up to ₹6,00,000",
        "Accredited journalists, U-win cardholders (unorganised workers), and ASHA workers"
      ],
      "required_documents": [
        "MA Card / PM-JAY Ayushman Card",
        "Income Certificate from Mamlatdar / TDO",
        "Ration Card",
        "Aadhaar Card"
      ]
    },
    "keywords": [
      "mukhyamantri amrutam ma card",
      "gujarat 10 lakh health insurance",
      "ma vatsalya card 4 lakh income",
      "magujarat com"
    ]
  },
  {
    "id": "SRC-SCH-GJ-VAHLI",
    "title": "Vahli Dikri Yojana (Gujarat)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Gujarat girl-child empowerment financial assistance: Provides ₹4,000 on admission to Class 1, ₹6,000 on admission to Class 9, and ₹1,00,000 upon attaining 18 years of age (for higher education or marriage) to first and second girl children of families with annual income up to ₹2 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Gujarat",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Women and Child Development Department, Government of Gujarat",
      "official_source_url": "https://wcd.gujarat.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Women and Child Development, Gujarat / CDPO",
      "effective_from": "2019-07-02",
      "source_updated_date": "2023-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Vahli Dikri Yojana Resolution (WCD Gujarat)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Anganwadi Worker",
      "organization": "WCD Department & e-Gram Panchayat Centre",
      "portal_url": "https://wcd.gujarat.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "First two girl children born in the family on or after 02-08-2019",
        "Annual family income must not exceed ₹2,00,000 per annum"
      ],
      "required_documents": [
        "Birth Certificate of Girl Child",
        "Income Certificate (< ₹2 Lakhs)",
        "Mother and Father Aadhaar Card",
        "Ration Card"
      ]
    },
    "keywords": [
      "vahli dikri yojana gujarat",
      "1 lakh girl child 18 years gujarat",
      "wcd gujarat vahli dikri"
    ]
  },
  {
    "id": "SRC-SCH-HR-OLDAGE",
    "title": "Old Age Samman Bhatta Scheme (Haryana Parivar Pehchan Patra Linked)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "Universal monthly social security pension for senior citizens in Haryana: Automatically sanctioned through Parivar Pehchan Patra (PPP) database without physical application, providing ₹3,000 per month deposited directly via DBT to elderly residents aged 60+ with annual family income up to ₹3 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Haryana",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Justice and Empowerment Department, Government of Haryana",
      "official_source_url": "https://socialjusticehry.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Social Justice & Empowerment Department / Citizen Resources Information Department (CRID)",
      "effective_from": "2021-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Haryana Old Age Samman Allowance Rules"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer (DSWO)",
      "organization": "Social Justice Department & Saral Haryana Portal",
      "portal_url": "https://saralharyana.gov.in",
      "helpline_number": "0172-3968400 (Saral Helpline)",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Age 60 years or above domicile of Haryana",
        "Total combined annual income of self and spouse must not exceed ₹3,00,000 per annum",
        "Active Parivar Pehchan Patra (Family ID) with verified age and income"
      ],
      "required_documents": [
        "Parivar Pehchan Patra (PPP / Family ID)",
        "Aadhaar Card",
        "Aadhaar-seeded Bank Account"
      ]
    },
    "keywords": [
      "haryana old age pension 3000",
      "old age samman bhatta ppp",
      "saral haryana vridha pension",
      "parivar pehchan patra pension"
    ]
  },
  {
    "id": "SRC-SCH-HP-PYARIBEHNA",
    "title": "Indira Gandhi Pyari Behna Sukh Samman Nidhi Yojana (Himachal Pradesh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Himachal Pradesh direct basic income support: Provides ₹1,500 per month (₹18,000 per year) directly transferred via DBT into bank accounts of eligible adult women aged 18 to 59 years residing in Himachal Pradesh.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Himachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Justice and Empowerment Department, Government of Himachal Pradesh",
      "official_source_url": "https://esomsa.hp.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Women and Child Development / Social Justice Department, HP",
      "effective_from": "2024-03-01",
      "source_updated_date": "2024-04-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Indira Gandhi Pyari Behna Sukh Samman Nidhi Rules 2024"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Tehsil Welfare Officer (TWO) / CDPO",
      "organization": "Social Justice & Empowerment Department, HP",
      "portal_url": "https://esomsa.hp.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Women aged between 18 and 59 years (Himachal Bonafide)",
        "Exclusions: Households with serving/retired Govt/PSU employees, pensioners, income tax payees, or beneficiaries already getting ₹1,500+ social security pension"
      ],
      "required_documents": [
        "Himachali Bonafide Certificate",
        "Aadhaar Card",
        "Ration Card (Pariwar Register Copy)",
        "Bank Passbook seeded with Aadhaar"
      ]
    },
    "keywords": [
      "indira gandhi pyari behna sukh samman",
      "1500 rupees women himachal",
      "esomsa hp gov in pyari behna"
    ]
  },
  {
    "id": "SRC-SCH-HP-HIMCARE",
    "title": "HIMCARE (Himachal Health Care Scheme)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Cashless health protection for families not covered under Ayushman Bharat: Provides cashless hospitalisation treatment cover of up to ₹5,00,000 per family per year in empaneled government and private hospitals across Himachal Pradesh and premier regional institutions (PGI Chandigarh).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Himachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Health & Family Welfare, Government of Himachal Pradesh",
      "official_source_url": "https://www.hpsbys.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Himachal Pradesh Swasthya Bima Yojna Society (HPSBYS)",
      "effective_from": "2019-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "HIMCARE Scheme Notification & Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Nodal Officer (HIMCARE) / Lokmitra Kendra",
      "organization": "HPSBYS & Department of Health",
      "portal_url": "https://www.hpsbys.in",
      "helpline_number": "104",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Resident families of Himachal Pradesh not covered under Ayushman Bharat PM-JAY or Government Medical Reimbursement",
        "Free enrollment for BPL, Street Vendors, and 70+ seniors; Nominal annual fee (₹365 or ₹1,000) for other categories"
      ],
      "required_documents": [
        "Ration Card",
        "Aadhaar Card",
        "Category Proof (BPL / Disability Certificate / Senior Citizen ID)"
      ]
    },
    "keywords": [
      "himcare scheme himachal 5 lakh",
      "hpsbys in himcare card",
      "cashless medical cover himachal"
    ]
  },
  {
    "id": "SRC-SCH-JH-MAIYA",
    "title": "Jharkhand Mukhya Mantri Maiya Samman Yojana (JMMSY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Direct basic financial assistance to women in Jharkhand: Provides ₹1,000 per month (₹12,000 per year) deposited directly via DBT into bank accounts of eligible women aged 21 to 50 years belonging to underprivileged and Antyodaya/priority households.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Jharkhand",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Women, Child Development and Social Security Department, Government of Jharkhand",
      "official_source_url": "https://mmmsy.jharkhand.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Women, Child Development & Social Security, Jharkhand",
      "effective_from": "2024-08-03",
      "source_updated_date": "2024-08-15",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Jharkhand Mukhya Mantri Maiya Samman Yojana Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Block Development Officer (BDO) / Circle Officer (CO)",
      "organization": "District Social Welfare Office & Pragya Kendra (CSC)",
      "portal_url": "https://mmmsy.jharkhand.gov.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Woman resident of Jharkhand aged between 21 and 50 years",
        "Holder of Jharkhand Ration Card (Antyodaya / Priority Householder / Green Card)",
        "Must NOT have income tax payers or regular Govt/EPFO employees in family"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Ration Card",
        "Aadhaar-linked Bank Account Passbook",
        "Self-declaration of income"
      ]
    },
    "keywords": [
      "jharkhand maiya samman yojana",
      "jmmsy 1000 per month women",
      "mmmsy jharkhand gov in",
      "21 to 50 years women scheme jharkhand"
    ]
  },
  {
    "id": "SRC-SCH-KA-GRUHALAKSHMI",
    "title": "Gruha Lakshmi Scheme (Direct Financial Assistance to Female Head of Household)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Karnataka flagship guarantee scheme: Provides ₹2,000 per month directly transferred via DBT into bank accounts of female heads of households (as notified on BPL/APL/Antyodaya ration cards) to combat inflation and ensure gender financial dignity.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Karnataka",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Women and Child Development, Government of Karnataka",
      "official_source_url": "https://sevasindhugs.karnataka.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Women and Child Development Department / e-Governance Department",
      "effective_from": "2023-08-30",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Government of Karnataka Order on Gruha Lakshmi Guarantee"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Grama One Executive",
      "organization": "Grama One / Karnataka One / Bangalore One Centres",
      "portal_url": "https://sevasindhu.karnataka.gov.in",
      "helpline_number": "1902 / 080-22279954",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Women recognized as Head of Family on BPL / APL / Antyodaya Ration Cards of Karnataka",
        "Applicant and husband must NOT be Income Tax or GST payees"
      ],
      "required_documents": [
        "Karnataka Ration Card (BPL/AAY/APL)",
        "Aadhaar Card of wife and husband",
        "Aadhaar-seeded Bank Account (DBT enabled)"
      ]
    },
    "keywords": [
      "gruha lakshmi karnataka 2000",
      "female head of family guarantee",
      "sevasindhu gruhalakshmi",
      "karnataka women 2000 rupees"
    ]
  },
  {
    "id": "SRC-SCH-KA-YUVANIDHI",
    "title": "Yuva Nidhi Scheme (Unemployment Allowance for Graduates & Diploma Holders)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4I_WORKERS_EMPLOYMENT_SKILLS",
    "summary": "Karnataka 5th Guarantee scheme: Provides monthly unemployment allowance of ₹3,000 for Degree Graduates and ₹1,500 for Diploma holders who graduated in 2023 or later and remained unemployed for 6 months after graduation, paid up to a maximum period of 2 years or until employment.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Karnataka",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Skill Development, Entrepreneurship and Livelihood, Karnataka",
      "official_source_url": "https://sevasindhugs.karnataka.gov.in/yuvanidhi",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Skill Development & Livelihood Department, Karnataka",
      "effective_from": "2024-01-12",
      "source_updated_date": "2024-04-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Yuva Nidhi Scheme Implementation Order (Karnataka)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Employment Officer",
      "organization": "Department of Skill Development & Seva Sindhu",
      "portal_url": "https://sevasindhugs.karnataka.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Domicile of Karnataka who passed Degree or Diploma course in the academic year 2022-23 or later",
        "Remained unemployed (neither in formal employment nor self-employed) for at least 180 days after completion",
        "Not admitted to higher regular education courses"
      ],
      "required_documents": [
        "Degree / Diploma Certificate & Marks Cards",
        "Aadhaar Card (Aadhaar seeded bank account)",
        "Karnataka Domicile Proof"
      ]
    },
    "keywords": [
      "yuva nidhi karnataka 3000",
      "unemployment allowance graduate diploma 1500",
      "sevasindhu yuvanidhi"
    ]
  },
  {
    "id": "SRC-SCH-KL-KASP",
    "title": "Karunya Arogya Suraksha Padhathi (KASP - Kerala)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Kerala flagship health assurance scheme integrating PM-JAY and Karunya Benevolent Fund: Delivers cashless hospitalization and treatment cover up to ₹5,00,000 per family per year for 1,600+ secondary and tertiary medical/surgical procedures in empaneled government and private hospitals.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Kerala",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "State Health Agency (SHA), Health & Family Welfare Department, Government of Kerala",
      "official_source_url": "https://sha.kerala.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Health Agency (SHA), Kerala",
      "effective_from": "2020-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "KASP Operational Guidelines (Health & Family Welfare Kerala)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Arogyamithra / District Coordinator",
      "organization": "State Health Agency Kerala & Hospital KASP Kiosk",
      "portal_url": "https://sha.kerala.gov.in",
      "helpline_number": "1056 (DISHA) / 1800-425-1056",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Families listed in SECC database or holding Kerala Priority (Yellow/Pink) Ration Cards",
        "Beneficiaries of legacy RSBY / Karunya Benevolent Fund (annual income <= ₹3 Lakhs)"
      ],
      "required_documents": [
        "Ration Card (Priority/Karunya)",
        "Aadhaar Card of all family members",
        "Medical Certificate for catastrophic illnesses"
      ]
    },
    "keywords": [
      "kasp kerala health assurance",
      "karunya arogya suraksha padhathi 5 lakh",
      "sha kerala gov in kasp",
      "disha 1056 kerala"
    ]
  },
  {
    "id": "SRC-SCH-KL-SEVANA",
    "title": "Sevana Direct Social Security Welfare Pensions (Kerala)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "Kerala universal direct social security pension system: Delivers monthly direct pension of ₹1,600 directly into bank accounts or via postman at doorstep to 50+ Lakh beneficiaries under 5 categories (Old Age, Widow, Disability, Agricultural Labourer, Unmarried Women aged 50+).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Kerala",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Local Self Government Department, Government of Kerala",
      "official_source_url": "https://welfarepension.lsgkerala.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Grama Panchayats / Municipalities / Gulati Institute of Finance & Taxation",
      "effective_from": "2010-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Kerala Social Security Welfare Pension Rules (LSGD)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Panchayat Secretary / Municipal Secretary",
      "organization": "Local Self Government Department & Sevana Portal",
      "portal_url": "https://welfarepension.lsgkerala.gov.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Resident of Kerala for minimum 3 years",
        "Age: 60+ for Old Age & Agr Labourers; 50+ for Unmarried Women; Any age for PwD (40%+ disability)",
        "Annual family income must not exceed ₹1,00,000 per annum",
        "Must NOT own four-wheeled motor vehicle (except auto for livelihood) or residential house > 1,200 sq.ft"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Ration Card",
        "Income Certificate from Village Officer",
        "Age Proof / Death Certificate of husband / Disability Certificate"
      ]
    },
    "keywords": [
      "sevana pension kerala 1600",
      "welfarepension lsgkerala gov in",
      "kerala old age widow pension dbt"
    ]
  },
  {
    "id": "SRC-SCH-MP-LADLIBEHNA",
    "title": "Mukhyamantri Ladli Behna Yojana (Madhya Pradesh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Madhya Pradesh flagship monthly financial assistance: Delivers ₹1,250 per month deposited directly via DBT into bank accounts of eligible resident women aged 21 to 60 years belonging to low and middle-income families.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Madhya Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Women and Child Development Department, Government of Madhya Pradesh",
      "official_source_url": "https://cmladlibahna.mp.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Women and Child Development Department, MP",
      "effective_from": "2023-03-15",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Mukhyamantri Ladli Behna Yojana Guidelines 2023"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Gram Panchayat Secretary",
      "organization": "WCD Department & MP Online / Samagra Portal",
      "portal_url": "https://cmladlibahna.mp.gov.in",
      "helpline_number": "0755-2700800",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Married woman (including widows, divorced, abandoned) resident of Madhya Pradesh",
        "Age between 21 and 60 years",
        "Annual family income must not exceed ₹2,50,000 per annum",
        "Family landholding <= 5 acres cultivable land"
      ],
      "required_documents": [
        "Samagra Family ID & Member ID (e-KYC verified)",
        "Aadhaar Card",
        "Aadhaar-seeded & DBT-enabled Bank Account"
      ]
    },
    "keywords": [
      "cmladlibahna mp gov in",
      "ladli behna 1250 rupees mp",
      "madhya pradesh women monthly assistance",
      "samagra id ladli behna"
    ]
  },
  {
    "id": "SRC-SCH-MP-MMVY",
    "title": "Mukhyamantri Medhavi Vidyarthi Yojana (MMVY - Madhya Pradesh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "Full higher education tuition fee scholarship: State pays 100% of the tuition fee for engineering (JEE Mains rank up to 1.5 Lakhs), medical (NEET admission in govt/private medical colleges), law (CLAT in NLUs), and all undergraduate/postgraduate courses in government colleges for meritorious MP students with family income up to ₹6 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Madhya Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Technical Education, Skill Development & Employment Department, Government of MP",
      "official_source_url": "https://scholarshipportal.mp.nic.in/MedhaviChhatra",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Higher Education & Technical Education, MP",
      "effective_from": "2017-06-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "MMVY Scheme Rules (Govt of Madhya Pradesh)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Nodal Officer (Scholarships) / Institute Dean",
      "organization": "State Scholarship Portal 2.0 (MP)",
      "portal_url": "https://scholarshipportal.mp.nic.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Domicile of Madhya Pradesh",
        "Scored 70% or more in MP Board Class 12 OR 85% or more in CBSE/ICSE Class 12",
        "Annual family income must not exceed ₹6,00,000 per annum"
      ],
      "required_documents": [
        "Class 10 and 12 Marksheet",
        "Income Certificate (< ₹6 Lakhs)",
        "Admission Fee Slip & College Allotment Letter",
        "Aadhaar Card & MP Domicile Certificate"
      ]
    },
    "keywords": [
      "mmvy scholarship mp",
      "medhavi vidyarthi yojana full fee reimbursement",
      "mp medical engineering free fees 6 lakh income"
    ]
  },
  {
    "id": "SRC-SCH-MH-LADKIBAHIN",
    "title": "Mukhyamantri Majhi Ladki Bahin Yojana (Maharashtra)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Maharashtra flagship financial autonomy grant: Provides ₹1,500 per month (₹18,000 per year) directly transferred via DBT into bank accounts of eligible married, widowed, divorced, abandoned, and destitute women aged 21 to 65 years with annual family income up to ₹2.5 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Maharashtra",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Women and Child Development Department, Government of Maharashtra",
      "official_source_url": "https://ladkibahin.maharashtra.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Women and Child Development Department, Maharashtra",
      "effective_from": "2024-07-01",
      "source_updated_date": "2024-07-15",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Government Resolution No. WCD-2024/C.R.74/Desk-02, dated 28-06-2024"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Anganwadi Sevika",
      "organization": "WCD Department, Maharashtra & Nari Shakti Doot App",
      "portal_url": "https://ladkibahin.maharashtra.gov.in",
      "helpline_number": "181 (Women Helpline)",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Women resident of Maharashtra (holding Domicile Certificate / Ration Card / Birth Certificate in Maharashtra)",
        "Age between 21 and 65 years",
        "Annual gross family income must not exceed ₹2,50,000 per annum (Yellow / Orange Ration Card holders exempted from separate income certificate)"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Maharashtra Domicile Certificate / Yellow/Orange Ration Card",
        "Aadhaar-seeded Bank Passbook",
        "Self-declaration undertaking"
      ]
    },
    "keywords": [
      "mukhyamantri majhi ladki bahin yojana",
      "1500 per month maharashtra women",
      "ladkibahin maharashtra gov in",
      "nari shakti doot app ladki bahin"
    ]
  },
  {
    "id": "SRC-SCH-MH-MJPJAY",
    "title": "Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY - Maharashtra)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Universal state health assurance scheme: Provides completely cashless secondary and tertiary hospitalization treatment cover of up to ₹5,00,000 per family per year across 1,000+ empaneled government and private network hospitals for 1,356 notified medical procedures for all resident families of Maharashtra.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Maharashtra",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "State Health Assurance Society (SHAS), Public Health Department, Maharashtra",
      "official_source_url": "https://www.jeevandayee.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Health Assurance Society (SHAS), Maharashtra",
      "effective_from": "2012-07-02",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Government Resolution on Universal Health Cover MJPJAY 2.0"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Arogyamitra / District Coordinator",
      "organization": "State Health Assurance Society & Hospital MJPJAY Kiosk",
      "portal_url": "https://www.jeevandayee.gov.in",
      "helpline_number": "155388 / 1800-120-8040 (Toll Free)",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "All families holding valid Yellow, Orange, or White Ration Cards of Maharashtra",
        "Agrarian distress district farmers (7/12 extract holder)"
      ],
      "required_documents": [
        "Ration Card (Yellow/Orange/White)",
        "Aadhaar Card / Voter ID",
        "Doctor referral / Diagnosis report"
      ]
    },
    "keywords": [
      "mjpjay maharashtra health card 5 lakh",
      "mahatma jyotirao phule jan arogya yojana",
      "jeevandayee gov in cashless hospital",
      "arogyamitra maharashtra"
    ]
  },
  {
    "id": "SRC-SCH-MH-MAHADBT",
    "title": "MahaDBT Post-Matric Scholarship & Tuition Fee Reimbursement (Maharashtra)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4C_SC_WELFARE",
    "summary": "100% tuition fee and exam fee waiver plus maintenance allowance for SC, ST, VJNT, OBC, and SBC students pursuing higher education (Arts, Science, Commerce, Engineering, Medical, MBA, Pharmacy, Polytechnic) in government and private-aided colleges in Maharashtra.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Maharashtra",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Justice and Special Assistance Department, Government of Maharashtra",
      "official_source_url": "https://mahadbt.maharashtra.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Social Welfare / Tribal Development / Higher Education, Maharashtra",
      "effective_from": "2018-08-01",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "MahaDBT Scholarship Rules (Cabinet Resolution)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Assistant Commissioner Social Welfare / College Principal",
      "organization": "Social Welfare Department & MahaDBT Portal",
      "portal_url": "https://mahadbt.maharashtra.gov.in",
      "helpline_number": "022-49150800",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Students belonging to SC, ST, VJNT, OBC, SBC categories with valid Caste Certificate and Caste Validity Certificate",
        "Annual family income <= ₹2,50,000 (SC/ST 100% waiver) or <= ₹1,50,000 to ₹8,00,000 (OBC/EBC freeship)"
      ],
      "required_documents": [
        "Caste Certificate & Caste Validity Certificate",
        "Income Certificate issued by Tahsildar",
        "CAP Allotment Letter & College Fee Receipt",
        "Aadhaar seeded Bank Passbook",
        "Domicile Certificate of Maharashtra"
      ]
    },
    "keywords": [
      "mahadbt scholarship maharashtra",
      "sc st obc college fee waiver maharashtra",
      "caste validity mahadbt",
      "mahadbt maharashtra gov in"
    ]
  },
  {
    "id": "SRC-SCH-MN-CMHT",
    "title": "Chief Minister-gi Hakshelgi Tengbang (CMHT - Manipur)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Manipur cashless health protection scheme: Provides cashless hospitalization cover of up to ₹5,00,000 per family per year for secondary and tertiary care in empaneled government and private hospitals across Manipur, Assam, and Delhi for poor and vulnerable families.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Manipur",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Health & Family Welfare, Government of Manipur",
      "official_source_url": "https://cmhtmanipur.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Health Agency, Manipur",
      "effective_from": "2018-01-21",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "CMHT Operational Guidelines (Govt of Manipur)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "CMHT Kiosk Executive / District Medical Officer",
      "organization": "State Health Agency Manipur",
      "portal_url": "https://cmhtmanipur.gov.in",
      "helpline_number": "1800-103-2015",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "AAY / BPL ration cardholders of Manipur",
        "Widows, Divyangjan, newspaper hawkers, and local domestic workers verified by verification committee"
      ],
      "required_documents": [
        "Ration Card (AAY/BPL)",
        "Aadhaar Card",
        "Income Certificate / Professional ID"
      ]
    },
    "keywords": [
      "cmht manipur health scheme",
      "chief ministergi hakshelgi tengbang 5 lakh",
      "manipur cashless hospital card"
    ]
  },
  {
    "id": "SRC-SCH-ML-MHIS",
    "title": "Meghalaya Health Insurance Scheme (MHIS Phase 5)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Universal health insurance in Meghalaya integrated with PM-JAY: Delivers cashless hospitalization cover of up to ₹5,30,000 per family per year in empaneled hospitals across Meghalaya and Northeast India for all resident families irrespective of income.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Meghalaya",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Health & Family Welfare, Government of Meghalaya",
      "official_source_url": "https://mhis.org.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Nodal Agency (SNA) MHIS, Meghalaya",
      "effective_from": "2012-12-15",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "MHIS Phase V Notification & Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Program Manager (MHIS) / Arogyamitra",
      "organization": "State Nodal Agency MHIS",
      "portal_url": "https://mhis.org.in",
      "helpline_number": "1800-345-3644",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "All permanent resident families of Meghalaya (except State and Central Government employees entitled to medical reimbursement)"
      ],
      "required_documents": [
        "Meghalaya Epic / Electoral Voter ID",
        "Aadhaar Card",
        "Ration Card"
      ]
    },
    "keywords": [
      "mhis meghalaya health insurance",
      "mhis 5.30 lakh cover",
      "mhis org in universal health meghalaya"
    ]
  },
  {
    "id": "SRC-SCH-MZ-MSHCS",
    "title": "Mizoram State Health Care Scheme (MSHCS)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "State health assistance scheme for resident families of Mizoram not covered under PM-JAY: Delivers medical treatment reimbursement and cashless benefits up to ₹3,00,000 per family per year in empaneled hospitals across Mizoram and referral hospitals in Kolkata, Guwahati, and Shillong.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Mizoram",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Mizoram State Health Care Society, Department of Health & Family Welfare",
      "official_source_url": "https://health.mizoram.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Mizoram State Health Care Society (MSHCS)",
      "effective_from": "2019-10-01",
      "source_updated_date": "2023-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "MSHCS Operational Guidelines (Govt of Mizoram)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Chief Executive Officer / Medical Superintendent",
      "organization": "Mizoram State Health Care Society",
      "portal_url": "https://health.mizoram.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Permanent resident families of Mizoram not enrolled under PM-JAY or regular Govt employee medical reimbursement"
      ],
      "required_documents": [
        "MSHCS Enrollment Card",
        "Ration Card (Mizoram)",
        "Aadhaar Card",
        "Hospital Medical Bills & Discharge Summary"
      ]
    },
    "keywords": [
      "mshcs mizoram health care",
      "mizoram 3 lakh medical reimbursement",
      "mizoram state health care society"
    ]
  },
  {
    "id": "SRC-SCH-NL-CMHIS",
    "title": "Chief Minister's Health Insurance Scheme (CMHIS - Nagaland)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Universal state health insurance scheme for all indigenous and permanent residents of Nagaland: Delivers cashless hospitalization cover of up to ₹5,00,000 per family per year in empaneled hospitals across the country for all non-government citizen families (CMHIS General) and up to ₹20,00,000 for government employee families.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Nagaland",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Nagaland Health Protection Society, Department of Health and Family Welfare",
      "official_source_url": "https://cmhis.nagaland.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Nagaland Health Protection Society (NHPS)",
      "effective_from": "2022-10-14",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "CMHIS Policy Guidelines (Cabinet Resolution Nagaland)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Coordinator / Arogyamitra",
      "organization": "Nagaland Health Protection Society & District Hospital Kiosk",
      "portal_url": "https://cmhis.nagaland.gov.in",
      "helpline_number": "8880515011 / 8880515012",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Indigenous Inhabitant of Nagaland (holding Indigenous Inhabitant Certificate)",
        "Permanent resident holding Permanent Resident Certificate (PRC) with valid Electoral Photo ID Card of Nagaland"
      ],
      "required_documents": [
        "Indigenous Inhabitant Certificate / PRC",
        "Ration Card",
        "Aadhaar Card of all family members"
      ]
    },
    "keywords": [
      "cmhis nagaland health insurance",
      "chief minister health insurance 5 lakh nagaland",
      "cmhis nagaland gov in"
    ]
  },
  {
    "id": "SRC-SCH-OD-KALIA",
    "title": "Krushak Assistance for Livelihood and Income Augmentation (KALIA - Odisha)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4H_FARMERS_AGRICULTURE",
    "summary": "Odisha comprehensive farmer & agricultural labourer assistance scheme: Provides financial assistance of ₹10,000 per year (₹4,000/crop season) to small and marginal farmers, and ₹12,500 one-time financial assistance to landless agricultural households for allied agricultural activities (goat rearing, duckery, fishery).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Odisha",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Agriculture and Farmers' Empowerment, Government of Odisha",
      "official_source_url": "https://kalia.odisha.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Agriculture & Farmers' Empowerment, Odisha",
      "effective_from": "2019-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "KALIA Scheme Implementation Resolution"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Village Agriculture Worker (VAW) / Block Agriculture Officer",
      "organization": "Department of Agriculture & Gram Panchayat Kiosk",
      "portal_url": "https://kalia.odisha.gov.in",
      "helpline_number": "1800-572-1122 (KALIA Helpline)",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Small and marginal farmers owning cultivable land up to 2 hectares (5 acres)",
        "Landless agricultural labourers dependent on agriculture for their primary livelihood",
        "Must NOT be regular government employees or income tax payees"
      ],
      "required_documents": [
        "Aadhaar Card",
        "Land Record (RoR) / Landless certificate from Gram Panchayat",
        "Aadhaar-seeded Bank Passbook"
      ]
    },
    "keywords": [
      "kalia scheme odisha",
      "kalia odisha gov in",
      "odisha farmer assistance 10000",
      "landless agricultural labourer 12500"
    ]
  },
  {
    "id": "SRC-SCH-OD-BSKY",
    "title": "Gopabandhu Jan Arogya Yojana (GJAY - Odisha, converged with Ayushman Bharat PM-JAY)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Odisha universal health assurance scheme (successor to Biju Swasthya Kalyan Yojana / BSKY, officially integrated with Ayushman Bharat PM-JAY): Delivers 100% cashless secondary and tertiary hospitalization treatment cover up to ₹5,00,000 per family per year (₹10,00,000 for women members) across 800+ empaneled public and private network hospitals across Odisha and premier national health institutions.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Odisha",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "State Health Assurance Society (SHAS), Health & Family Welfare Department, Government of Odisha",
      "official_source_url": "https://gjay.odisha.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Health Assurance Society (SHAS), Odisha / National Health Authority (NHA)",
      "effective_from": "2018-08-15",
      "source_updated_date": "2024-07-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Gopabandhu Jan Arogya Yojana Guidelines & Ayushman Bharat Convergence Notification (Govt of Odisha)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "GJAY Swasthya Mitra / District Coordinator",
      "organization": "State Health Assurance Society (SHAS) Odisha & Hospital Helpdesk",
      "portal_url": "https://gjay.odisha.gov.in",
      "helpline_number": "104 / 155369",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "All families holding NFSA / SFSS (State Food Security Scheme) Cards or GJAY / BSKY Smart Health Cards of Odisha",
        "Converged beneficiaries under Ayushman Bharat PM-JAY database in Odisha"
      ],
      "required_documents": [
        "GJAY / BSKY Smart Health Card / Ration Card",
        "Aadhaar Card of patient"
      ]
    },
    "keywords": [
      "gopabandhu jan arogya yojana gjay",
      "gjay odisha gov in",
      "bsky legacy alias odisha",
      "ayushman bharat odisha convergence 10 lakh",
      "swasthya mitra gjay"
    ]
  },
  {
    "id": "SRC-SCH-PB-OLDAGE",
    "title": "Punjab Social Security Old Age Pension Scheme",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "Monthly social security pension for impoverished senior citizens in Punjab: Provides ₹1,500 per month deposited directly into bank accounts of elderly women aged 58+ and elderly men aged 65+ with annual family income up to ₹60,000.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Punjab",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Social Security, Women & Child Development, Government of Punjab",
      "official_source_url": "https://sswcd.punjab.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "District Social Security Officer (DSSO) / CDPO",
      "effective_from": "1964-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Punjab Old Age Pension Rules (Revised 2021)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Security Officer (DSSO) / Sewa Kendra Executive",
      "organization": "Department of Social Security & Sewa Kendra Portal",
      "portal_url": "https://sswcd.punjab.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Elderly women aged 58 years or above; Elderly men aged 65 years or above",
        "Permanent resident of Punjab",
        "Total family annual income must not exceed ₹60,000 per annum",
        "Landholding <= 2.5 acres in plain areas or <= 5 acres in barani areas"
      ],
      "required_documents": [
        "Age Proof (Voter ID / Matriculation Certificate)",
        "Income Certificate / Sarpanch Recommendation",
        "Aadhaar Card",
        "Aadhaar seeded bank account"
      ]
    },
    "keywords": [
      "punjab old age pension 1500",
      "sswcd punjab gov in vridha pension",
      "sewa kendra punjab pension"
    ]
  },
  {
    "id": "SRC-SCH-RJ-CHIRANJEEVI",
    "title": "Mukhyamantri Ayushman Arogya Yojana (MAAY - Rajasthan)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Flagship universal health assurance scheme of Rajasthan (officially renamed from Chiranjeevi Swasthya Bima Yojana): Provides completely cashless secondary and tertiary hospital treatment cover of up to ₹25,00,000 per family per year in 1,800+ empaneled government and private network hospitals across Rajasthan, with zero premium for NFSA, SECC, small farmers, contractual workers, and EWS families.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Rajasthan",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Rajasthan State Health Assurance Agency, Medical & Health Department, Government of Rajasthan",
      "official_source_url": "https://health.rajasthan.gov.in/mmay",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Rajasthan State Health Assurance Agency (RSHAA)",
      "effective_from": "2021-05-01",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Mukhyamantri Ayushman Arogya Yojana (MAAY) Operational Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Swasthya Margdarshak / Block Chief Medical Officer",
      "organization": "RSHAA & Jan Aadhaar Portal",
      "portal_url": "https://health.rajasthan.gov.in/mmay",
      "helpline_number": "181 (CM Helpline) / 104",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "All resident families of Rajasthan enrolled in Jan Aadhaar database",
        "Free category: NFSA cardholders, SECC families, Small/marginal farmers, Contractual workers, EWS families (income <= ₹8 Lakhs)",
        "Paid category: Any resident family can enroll by paying subsidized annual premium of ₹850"
      ],
      "required_documents": [
        "Jan Aadhaar Card / Jan Aadhaar Enrolment Slip",
        "Aadhaar Card of all family members"
      ]
    },
    "keywords": [
      "mukhyamantri ayushman arogya yojana maay",
      "rajasthan health insurance 25 lakh",
      "chiranjeevi legacy alias rajasthan",
      "jan aadhaar maay card",
      "rajasthan cashless hospital 181"
    ]
  },
  {
    "id": "SRC-SCH-RJ-ANUPRATI",
    "title": "Mukhyamantri Anuprati Coaching Yojana (Rajasthan)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "Free professional competitive exam coaching: Provides 100% free coaching in premier empaneled institutes for UPSC Civil Services, RPSC RAS, IIT-JEE, NEET, CLAT, CA, REET, and Bank PO, plus ₹40,000 annual accommodation stipend for outstation students from SC, ST, OBC, MBC, EWS, and Minority communities with family income up to ₹8 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Rajasthan",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Justice and Empowerment Department, Government of Rajasthan",
      "official_source_url": "https://sje.rajasthan.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Social Justice and Empowerment Department (SJED), Rajasthan",
      "effective_from": "2021-06-05",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Mukhyamantri Anuprati Coaching Scheme Guidelines (SJED)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer",
      "organization": "SJED & SSO Rajasthan Portal",
      "portal_url": "https://sso.rajasthan.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Domicile of Rajasthan belonging to SC, ST, OBC, MBC, Minority, or EWS categories",
        "Annual family income must not exceed ₹8,00,000 per annum (or parent in Pay Matrix Level L-11)",
        "Minimum marks in Class 10/12 as notified for specific competitive coaching courses"
      ],
      "required_documents": [
        "Jan Aadhaar Card",
        "Caste Certificate",
        "Income Certificate (< ₹8 Lakhs)",
        "Class 10 and 12 mark sheets"
      ]
    },
    "keywords": [
      "anuprati coaching yojana rajasthan",
      "free iit neet upsc coaching 40000 stipend",
      "sje rajasthan anuprati",
      "sso rajasthan free coaching"
    ]
  },
  {
    "id": "SRC-SCH-SK-AAMA",
    "title": "Aama Yojana (Financial Grant for Non-Working Mothers - Sikkim)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Sikkim state financial assistance for mothers: Delivers direct annual financial grant of ₹40,000 (deposited via DBT into bank accounts) to all non-working mothers in Sikkim who are not employed in Government or formal service, to inculcate savings and economic independence.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Sikkim",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Women & Child Development Department, Government of Sikkim",
      "official_source_url": "https://sikkim.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Women and Child Development Department, Sikkim",
      "effective_from": "2022-08-15",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Aama Yojana Notification (WCD Sikkim)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Block Development Officer",
      "organization": "WCD Department & Gram Vikas Kendra",
      "portal_url": "https://sikkim.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Non-working mother holding Certificate of Identification (COI) / Sikkim Subject Certificate",
        "Listed in the Electoral Roll of Sikkim",
        "Must NOT be employed in Government service, PSUs, or drawing regular salary/pension"
      ],
      "required_documents": [
        "Sikkim Subject Certificate / COI",
        "Electoral Voter ID Card of Sikkim",
        "Aadhaar Card",
        "Bank Account in State Bank of Sikkim / Nationalised Bank"
      ]
    },
    "keywords": [
      "aama yojana sikkim 40000",
      "non working mother grant sikkim",
      "wcd sikkim aama scheme"
    ]
  },
  {
    "id": "SRC-SCH-TN-PUDHUMAI",
    "title": "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Tamil Nadu Government financial incentive scheme: Provides ₹1,00,0 per month deposited directly into bank accounts of girl students who studied from Class 6 to 12 in Government schools in Tamil Nadu until the uninterrupted completion of their undergraduate degree, diploma, or ITI course.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
      "official_source_url": "https://pudhumaipenn.tn.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
      "effective_from": "2022-09-05",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "G.O. (Ms) No. 37, Social Welfare and Women Empowerment Department, dated 09-08-2022"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer (DSWO) / College Principal",
      "organization": "Social Welfare Department, Government of Tamil Nadu",
      "portal_url": "https://pudhumaipenn.tn.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Girl students pursuing higher education (UG Degree, Diploma, ITI, Professional courses)",
        "Must have studied continuously from Class 6 to 12 in Tamil Nadu Government Schools"
      ],
      "required_documents": [
        "EMIS (Education Management Information System) ID / School Study Certificate (Class 6 to 12)",
        "College Bonafide Certificate & ID Card",
        "Aadhaar Card",
        "Aadhaar-seeded Bank Account Passbook"
      ]
    },
    "keywords": [
      "pudhumai penn 1000 rupees",
      "tamil nadu girl student higher education",
      "moovalur ramamirtham ammaiyar scheme",
      "pudhumaipenn tn gov in",
      "govt school girl college 1000"
    ]
  },
  {
    "id": "SRC-SCH-TN-CMCHIS",
    "title": "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS - Tamil Nadu)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "State health insurance scheme in Tamil Nadu integrated with PM-JAY: Provides cashless medical and surgical treatment cover of up to ₹5,00,000 per family per year in empaneled government and private hospitals for 1,000+ notified procedures to resident families with annual income below ₹1,20,000.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Health and Family Welfare Department, Government of Tamil Nadu & United India Insurance",
      "official_source_url": "https://www.cmchistn.com",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Tamil Nadu Health Systems Project (TNHSP) / Health & Family Welfare Department",
      "effective_from": "2012-01-11",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "G.O. Ms. No. 169, Health and Family Welfare Department"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Kiosk Officer / CMCHIS Nodal Officer",
      "organization": "TNHSP / District Collectorate Kiosk",
      "portal_url": "https://www.cmchistn.com",
      "helpline_number": "1800-425-3993 (Toll Free 24/7)",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Resident family in Tamil Nadu with annual family income less than ₹1,20,000 per annum",
        "Family listed in Smart Ration Card / Family Card of Tamil Nadu"
      ],
      "required_documents": [
        "Tamil Nadu Smart Ration Card",
        "Income Certificate issued by Revenue Department (VAO / Tahsildar)",
        "Aadhaar Card of all family members"
      ]
    },
    "keywords": [
      "cmchis tamil nadu health insurance",
      "chief minister health insurance 5 lakh",
      "cmchistn com 18004253993",
      "tamil nadu cashless hospital card"
    ]
  },
  {
    "id": "SRC-SCH-TN-MAGALIR",
    "title": "Kalaignar Magalir Urimai Thittam (KMUT) — Basic Monthly Income for Women",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Tamil Nadu flagship basic income support scheme: Provides ₹1,000 per month directly transferred via DBT into bank accounts of eligible women heads of households (aged 21+) with annual family income below ₹2.5 Lakhs and landholding within prescribed ceilings.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Special Programme Implementation Department, Government of Tamil Nadu",
      "official_source_url": "https://kmut.tn.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Revenue and Disaster Management / Special Programme Implementation Department",
      "effective_from": "2023-09-15",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "G.O. (Ms) No. 1, Special Programme Implementation Department, dated 07-07-2023"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Tahsildar / Village Administrative Officer (VAO)",
      "organization": "Revenue Department, Government of Tamil Nadu",
      "portal_url": "https://kmut.tn.gov.in",
      "helpline_number": "044-25619208",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Woman head of family as specified in the Smart Ration Card (aged 21 years or above)",
        "Annual family income must not exceed ₹2,50,000 per annum",
        "Family landholding must not exceed 5 acres of wetland or 10 acres of dryland",
        "Annual electricity consumption must be below 3,600 units"
      ],
      "required_documents": [
        "Tamil Nadu Smart Ration Card (NFSA / State)",
        "Aadhaar Card of the woman head and adult family members",
        "Bank Passbook seeded with Aadhaar",
        "Electricity Consumer Number / Bill"
      ]
    },
    "keywords": [
      "kmut 1000 per month",
      "kalaignar magalir urimai thittam",
      "tamil nadu women rights grant 1000",
      "kmut tn gov in",
      "women head 1000 dbt"
    ]
  },
  {
    "id": "SRC-SCH-TS-RYTHUBHAROSA",
    "title": "Rythu Bharosa (Telangana Agricultural Investment & Labour Support Scheme)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4H_FARMERS_AGRICULTURE",
    "summary": "Telangana flagship agricultural investment support scheme (successor to Rythu Bandhu): Provides ₹15,000 per acre per year (₹7,500 per acre per crop season for Kharif and Rabi) directly deposited via DBT into bank accounts of land-owning farmers holding Pattadar Passbooks, and ₹12,000 per year financial assistance for landless agricultural labourers.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Telangana",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Agriculture and Cooperation Department, Government of Telangana",
      "official_source_url": "https://rythubandhu.telangana.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Agriculture, Telangana",
      "effective_from": "2018-05-10",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Rythu Bharosa Guidelines (Govt of Telangana)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Agriculture Extension Officer (AEO) / Mandal Agriculture Officer",
      "organization": "Department of Agriculture, Telangana",
      "portal_url": "https://rythubandhu.telangana.gov.in",
      "helpline_number": "040-23383520",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Farmers owning agricultural land in Telangana holding Dharani Pattadar Passbooks (₹15,000/acre/year)",
        "Landless agricultural labourers verified through village enumeration (₹12,000/year)"
      ],
      "required_documents": [
        "Dharani Pattadar Passbook / Title Deed",
        "Aadhaar Card",
        "Aadhaar-seeded Bank Account Passbook"
      ]
    },
    "keywords": [
      "rythu bharosa telangana 15000",
      "telangana farmer investment 7500 per season",
      "rythu bandhu predecessor alias",
      "landless labourer 12000 telangana",
      "dharani passbook farmer dbt"
    ]
  },
  {
    "id": "SRC-SCH-TS-DALITBANDHU",
    "title": "Telangana Dalit Bandhu Scheme (Under State Administrative Review)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4C_SC_WELFARE",
    "summary": "Historical direct capital grant scheme for Scheduled Caste (SC) households (₹10,00,000 one-time enterprise grant). NOTE: Following the state governance transition, the scheme is currently under comprehensive administrative review and restructuring into the Ambedkar Abhaya Hastham welfare framework. New applications and guaranteed capital disbursals are paused pending revised state guidelines.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Telangana",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Scheduled Castes Development Department, Government of Telangana",
      "official_source_url": "https://dalitbandhu.telangana.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Telangana Scheduled Castes Co-operative Development Corporation (TSCCDC)",
      "effective_from": "2021-08-04",
      "source_updated_date": "2024-06-01",
      "last_verified": "2026-08-20",
      "verification_status": "NEEDS_REVERIFICATION",
      "source_priority": 4,
      "legal_basis": "Dalit Bandhu G.O.Ms.No. 23 (Historical) & Ambedkar Abhaya Hastham Policy Transition (Govt of Telangana)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Collector / Executive Director TSCCDC",
      "organization": "District Administration & TSCCDC",
      "portal_url": "https://dalitbandhu.telangana.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Historical criteria: SC households resident of Telangana holding Food Security / White Ration Card",
        "Current status: Policy transition and executive review under Ambedkar Abhaya Hastham pending publication of fresh operational guidelines"
      ],
      "required_documents": [
        "SC Community Certificate",
        "Food Security / White Ration Card",
        "Aadhaar Card",
        "Special Dalit Bandhu Bank Account details"
      ]
    },
    "keywords": [
      "dalit bandhu telangana review",
      "ambedkar abhaya hastham transition",
      "sc welfare telangana review",
      "dalitbandhu telangana gov in"
    ]
  },
  {
    "id": "SRC-SCH-TR-MATRU",
    "title": "Mukhyamantri Matru Pushti Uphaar (Tripura)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Tripura maternal nutrition scheme: Provides free specialized nutrition kits (containing Horlicks, condensed milk, soybeans, ghee, dates, chana) worth ₹500 four times during pregnancy (total ₹2,000 value) to pregnant women attending Antenatal Checkups (ANC) at Primary Health Centres.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tripura",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Welfare and Social Education Department, Government of Tripura",
      "official_source_url": "https://socialwelfare.tripura.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Social Welfare & Social Education, Tripura",
      "effective_from": "2020-07-01",
      "source_updated_date": "2023-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Mukhyamantri Matru Pushti Uphaar Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Anganwadi Worker",
      "organization": "Social Welfare Department & Primary Health Centre",
      "portal_url": "https://socialwelfare.tripura.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Pregnant women residing in Tripura undergoing regular Antenatal Care (ANC) at Government Health Centres"
      ],
      "required_documents": [
        "Mother and Child Protection (MCP) Card",
        "Aadhaar Card",
        "Ration Card"
      ]
    },
    "keywords": [
      "matru pushti uphaar tripura",
      "pregnant women nutrition kit tripura",
      "social welfare tripura"
    ]
  },
  {
    "id": "SRC-SCH-UP-KANYASUMANGALA",
    "title": "Mukhyamantri Kanya Sumangala Yojana (Uttar Pradesh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Uttar Pradesh conditional cash transfer scheme for girl children: Delivers total financial grant of ₹25,000 across 6 educational and developmental stages (₹5,000 at birth, ₹2,000 on vaccination, ₹3,000 on Class 1, ₹3,000 on Class 6, ₹5,000 on Class 9, and ₹7,000 on admission to Degree/Diploma) for families with income up to ₹3 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Uttar Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Women and Child Development Department, Government of Uttar Pradesh",
      "official_source_url": "https://mksy.up.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Women Welfare, Uttar Pradesh",
      "effective_from": "2019-10-25",
      "source_updated_date": "2024-04-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Mukhyamantri Kanya Sumangala Yojana Rules (Enhanced grant Cabinet G.O. 2024)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Probation Officer (DPO) / Block Development Officer",
      "organization": "Department of Women Welfare, UP",
      "portal_url": "https://mksy.up.gov.in",
      "helpline_number": "181 (Women Power Line)",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Permanent resident of Uttar Pradesh",
        "Annual gross family income must not exceed ₹3,00,000 per annum",
        "Maximum of two girl children per family eligible"
      ],
      "required_documents": [
        "Birth Certificate of Girl Child",
        "Income Certificate issued by Tehsildar",
        "Aadhaar Card of Parent and Child",
        "Admission Certificate / Fee Receipt of respective class",
        "Bank Passbook seeded with Aadhaar"
      ]
    },
    "keywords": [
      "mukhyamantri kanya sumangala yojana up",
      "mksy up gov in 25000",
      "up girl child scheme staged dbt",
      "kanya sumangala 25000"
    ]
  },
  {
    "id": "SRC-SCH-UP-SAKSHAM",
    "title": "UP Scholarship & Fee Reimbursement Online System (Saksham Portal)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "Complete scholarship and tuition fee reimbursement for Pre-Matric (Class 9-10), Post-Matric (Class 11-12), and Post-Matric Other Than Inter (Graduation, PG, B.Tech, MBBS, Polytechnic, ITI) in Uttar Pradesh for SC/ST (income <= ₹2.5L) and General/OBC/Minority (income <= ₹2L).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Uttar Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Welfare Department, Government of Uttar Pradesh",
      "official_source_url": "https://scholarship.up.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Social Welfare / Backward Classes / Minority Welfare Departments, UP",
      "effective_from": "2012-07-01",
      "source_updated_date": "2024-07-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Uttar Pradesh Post-Matric Scholarship Rules"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer (DSWO) / Institute Nodal Officer",
      "organization": "Social Welfare Department & Saksham Scholarship Portal",
      "portal_url": "https://scholarship.up.gov.in",
      "helpline_number": "1800-180-5131 / 1076",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Domicile of Uttar Pradesh studying in recognized educational institution",
        "Annual family income ceiling: <= ₹2,50,000 for SC/ST and <= ₹2,00,000 for General/OBC/Minority"
      ],
      "required_documents": [
        "Caste Certificate",
        "Income Certificate verified on edistrict.up.gov.in",
        "Previous Class Marksheet",
        "College Fee Receipt & Non-Refundable Fee Schedule",
        "Aadhaar Card (Biometric / OTP e-KYC verified)"
      ]
    },
    "keywords": [
      "up scholarship fee reimbursement",
      "scholarship up gov in saksham",
      "up post matric scholarship 2 lakh income",
      "up btech polytechnic fee waiver"
    ]
  },
  {
    "id": "SRC-SCH-UK-ATALAYUSHMAN",
    "title": "Atal Ayushman Uttarakhand Yojana",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Universal state health assurance: Provides completely cashless secondary and tertiary hospitalisation treatment cover of up to ₹5,00,000 per family per year in empaneled government and private network hospitals for all 23+ Lakh resident families of Uttarakhand holding State Ration / NFSA cards.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Uttarakhand",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "State Health Agency (SHA), Medical Health & Family Welfare Department, Uttarakhand",
      "official_source_url": "https://ayushmanuttarakhand.org",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Health Agency (SHA), Uttarakhand",
      "effective_from": "2018-12-25",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Atal Ayushman Uttarakhand Scheme Notification"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Arogya Mitra / District Coordinator",
      "organization": "State Health Agency & Empaneled Hospital Kiosk",
      "portal_url": "https://ayushmanuttarakhand.org",
      "helpline_number": "104 / 155368",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "All permanent resident families of Uttarakhand holding valid Ration Card / NFSA Card"
      ],
      "required_documents": [
        "Uttarakhand Ration Card",
        "Aadhaar Card of all family members"
      ]
    },
    "keywords": [
      "atal ayushman uttarakhand yojana 5 lakh",
      "ayushmanuttarakhand org",
      "universal health cover uttarakhand",
      "arogya mitra uttarakhand"
    ]
  },
  {
    "id": "SRC-SCH-WB-LAKSHMIR",
    "title": "Lakshmir Bhandar (Basic Income Support for Women - West Bengal)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "West Bengal flagship universal basic income scheme: Delivers ₹1,000 per month for General category women and ₹1,200 per month for SC/ST women aged 25 to 60 years deposited directly via DBT into their bank accounts to ensure household financial empowerment.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "West Bengal",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Women & Child Development and Social Welfare, Government of West Bengal",
      "official_source_url": "https://socialwelfare.wb.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Women & Child Development and Social Welfare Department / Duare Sarkar Camps",
      "effective_from": "2021-09-01",
      "source_updated_date": "2024-04-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Lakshmir Bhandar Scheme G.O. (WCD & SW West Bengal)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Block Development Officer (BDO) / Duare Sarkar Camp Officer",
      "organization": "WCD Department & Duare Sarkar Camps",
      "portal_url": "https://socialwelfare.wb.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Female resident of West Bengal aged between 25 and 60 years",
        "Holder of West Bengal Swasthya Sathi Card",
        "Must NOT be a permanent employee of Central/State Government, Statutory Bodies, or Panchayats"
      ],
      "required_documents": [
        "Swasthya Sathi Card",
        "Aadhaar Card",
        "SC/ST Certificate (for ₹1,200 rate)",
        "Aadhaar-seeded Bank Passbook"
      ]
    },
    "keywords": [
      "lakshmir bhandar 1000 1200",
      "west bengal women basic income",
      "duare sarkar lakshmir bhandar",
      "swasthya sathi lakshmir bhandar"
    ]
  },
  {
    "id": "SRC-SCH-WB-KANYASHREE",
    "title": "Kanyashree Prakalpa (Conditional Cash Transfer for Adolescent Girls - West Bengal)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "UN Public Service Award winning girl-child empowerment scheme: (1) K1 Component: Annual scholarship of ₹1,000 for unmarried girl students aged 13–18 years in Classes 8 to 12; (2) K2 Component: One-time grant of ₹25,000 upon attaining 18 years of age while pursuing education/training unmarried.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "West Bengal",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Women & Child Development and Social Welfare, Government of West Bengal",
      "official_source_url": "https://www.wbkanyashree.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Social Welfare, West Bengal / School Headmistress",
      "effective_from": "2013-10-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Kanyashree Prakalpa Guidelines & Rules"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Nodal Officer (Kanyashree) / School Headmaster",
      "organization": "WCD Department & Kanyashree Portal",
      "portal_url": "https://www.wbkanyashree.gov.in",
      "helpline_number": "033-23373840",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Unmarried girl student resident of West Bengal enrolled in regular recognized school, college, or vocational training institute",
        "Age: 13 to 18 years for K1 (Annual ₹1,000); 18 to 19 years for K2 (One-time ₹25,000)"
      ],
      "required_documents": [
        "Birth Certificate",
        "Unmarried Status Declaration by Parent",
        "School Bonafide Certificate",
        "Aadhaar Card",
        "Bank Account in applicant's own name"
      ]
    },
    "keywords": [
      "kanyashree prakalpa west bengal",
      "k1 1000 k2 25000 kanyashree",
      "wbkanyashree gov in",
      "girl student grant west bengal"
    ]
  },
  {
    "id": "SRC-SCH-WB-SWASTHYASATHI",
    "title": "Swasthya Sathi Scheme (West Bengal)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Universal state health assurance scheme: Provides completely cashless secondary and tertiary hospitalisation treatment cover of up to ₹5,00,000 per family per year in 1,500+ empaneled government and private hospitals in West Bengal and premier institutions across India, with Smart Card issued in the name of the female head of the family.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "West Bengal",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Health & Family Welfare Department, Government of West Bengal",
      "official_source_url": "https://swasthyasathi.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Health Transport Organisation / Swasthya Sathi Samiti",
      "effective_from": "2016-12-30",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Swasthya Sathi Operational Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Swasthya Sathi Mitra / District Nodal Officer",
      "organization": "Swasthya Sathi Samiti & Empaneled Hospital Kiosk",
      "portal_url": "https://swasthyasathi.gov.in",
      "helpline_number": "1800-345-5384 (Toll Free 24/7)",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "All permanent resident families of West Bengal (except families receiving Govt medical allowance / covered under other statutory health schemes)"
      ],
      "required_documents": [
        "Swasthya Sathi Smart Card",
        "Aadhaar Card",
        "Ration Card"
      ]
    },
    "keywords": [
      "swasthya sathi west bengal 5 lakh",
      "swasthyasathi gov in smart card",
      "cashless health insurance west bengal",
      "swasthya sathi mitra"
    ]
  }
];
