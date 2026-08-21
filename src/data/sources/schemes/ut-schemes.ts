import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 4: Union Territory Specific Flagship Welfare Schemes (8 UTs)
 * Grounded in official UT Administrations and Department Gazettes.
 */
export const UT_SCHEME_SOURCES: VerifiedSourceRecord[] = [
  {
    "id": "SRC-SCH-UT-AN-SOCIAL",
    "title": "Andaman & Nicobar Administration Social Security Pension Scheme",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "UT Administration social security pension: Delivers monthly direct financial pension of ₹2,500 for senior citizens aged 60+ and ₹2,500 for widows and destitute persons with disability living in the islands with family income up to ₹1,00,000.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Andaman and Nicobar Islands",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Directorate of Social Welfare, Andaman and Nicobar Administration",
      "official_source_url": "https://www.andaman.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Social Welfare, Port Blair",
      "effective_from": "2013-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "A&N Islands Old Age & Destitute Pension Rules"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Tehsildar",
      "organization": "Directorate of Social Welfare, Port Blair",
      "portal_url": "https://www.andaman.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Senior citizens aged 60+ / Widows / Persons with disability resident in A&N Islands for 10+ years",
        "Annual family income <= ₹1,00,000 per annum"
      ],
      "required_documents": [
        "Islander Card / 10-year Local Certificate",
        "Aadhaar Card",
        "Income Certificate from Tehsildar",
        "Bank details"
      ]
    },
    "keywords": [
      "andaman nicobar old age pension 2500",
      "social welfare port blair pension",
      "islander destitute pension"
    ]
  },
  {
    "id": "SRC-SCH-UT-CH-SENIOR",
    "title": "Chandigarh Administration Old Age & Destitute Pension Scheme",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "Chandigarh UT monthly pension support: Delivers monthly direct pension of ₹1,000 for elderly citizens aged 60+ (women aged 58+) living in Chandigarh for 3+ years with monthly personal income below ₹1,500.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Chandigarh",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Welfare Department, Chandigarh Administration",
      "official_source_url": "https://chandigarh.gov.in/dept_socwelfare.htm",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Director Social Welfare, Chandigarh",
      "effective_from": "2015-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Chandigarh Administration Social Security Pension Rules"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer",
      "organization": "Department of Social Welfare & Sampark Centres",
      "portal_url": "https://chandigarh.gov.in",
      "helpline_number": "0172-2700065",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Age 60 years or above (men) / 58 years or above (women)",
        "Resident of UT Chandigarh for minimum 3 years",
        "Monthly personal income <= ₹1,500 per month"
      ],
      "required_documents": [
        "Chandigarh Residence Proof (3 years)",
        "Age Proof (Voter ID / Matriculation)",
        "Income Certificate from Sub-Divisional Magistrate (SDM)",
        "Aadhaar seeded bank account"
      ]
    },
    "keywords": [
      "chandigarh old age pension 1000",
      "sampark chandigarh pension",
      "social welfare chandigarh"
    ]
  },
  {
    "id": "SRC-SCH-UT-DNH-DIKLI",
    "title": "Dikli Vahli Scheme (DNH & Daman and Diu)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "UT Administration girl child financial assistance: Provides staged cash grant of ₹5,000 on admission to Class 1, ₹10,000 on admission to Class 9, and ₹1,00,000 on completing 18 years of age unmarried to the first and second girl children of resident families with annual income up to ₹2 Lakhs.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Dadra and Nagar Haveli and Daman and Diu",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Social Welfare, UT Administration of DNH and Daman and Diu",
      "official_source_url": "https://daman.nic.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Social Welfare, Daman / Silvassa",
      "effective_from": "2019-08-01",
      "source_updated_date": "2023-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Dikli Vahli Yojana Guidelines (DNH & DD)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Child Development Project Officer (CDPO) / Social Welfare Officer",
      "organization": "Social Welfare Department & District Collectorate",
      "portal_url": "https://daman.nic.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "First two girl children born in the family residing in DNH and Daman and Diu",
        "Annual family income <= ₹2,00,000 per annum"
      ],
      "required_documents": [
        "Birth Certificate of Girl Child",
        "Domicile Certificate of DNH / Daman & Diu",
        "Income Certificate from Mamlatdar",
        "Aadhaar Card of parents"
      ]
    },
    "keywords": [
      "dikli vahli daman diu",
      "dnh girl child 1 lakh scheme",
      "social welfare daman"
    ]
  },
  {
    "id": "SRC-SCH-UT-DL-LADLI",
    "title": "Delhi Ladli Scheme (Financial Assistance for Girl Child Education)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Delhi state financial deposit scheme: Provides ₹11,000 for institutional delivery and ₹5,000 each at 5 educational milestones (Class 1, Class 6, Class 9, Class 10 pass, Class 12 pass) deposited in SBI Life Insurance bonds, maturing with interest when the girl child attains 18 years and passes Class 10 as a regular student.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Delhi",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Women and Child Development, Government of NCT of Delhi",
      "official_source_url": "https://wcd.delhi.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Women and Child Development & Department of Education, Delhi",
      "effective_from": "2008-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Delhi Ladli Scheme Rules & G.O. (GNCTD)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Women and Child Development Officer / School Principal",
      "organization": "WCD Department & e-District Delhi Portal",
      "portal_url": "https://edistrict.delhigovt.nic.in",
      "helpline_number": "1031 / 011-23381611",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Girl child born in Delhi and parents residing in NCT of Delhi for at least 3 years",
        "Annual gross family income must not exceed ₹1,00,000 per annum",
        "Girl must be enrolled in a recognized school in Delhi (DoE / MCD / NDMC)"
      ],
      "required_documents": [
        "3 Years Delhi Residence Proof (Voter ID / Ration Card / Electricity Bill)",
        "Income Certificate issued by Revenue SDM (< ₹1 Lakh)",
        "Birth Certificate of Girl Child",
        "School Admission Proof & Bonafide Certificate",
        "Aadhaar Card of Child & Parents"
      ]
    },
    "keywords": [
      "delhi ladli scheme",
      "edistrict delhigovt nic in ladli",
      "delhi girl child sbi bond",
      "wcd delhi ladli 11000"
    ]
  },
  {
    "id": "SRC-SCH-UT-DL-SENIOR",
    "title": "Delhi Financial Assistance to Senior Citizens (Old Age Pension)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4G_SENIOR_CITIZENS_PENSION",
    "summary": "Monthly social security pension in NCT of Delhi: Provides ₹2,000 per month for seniors aged 60–69 years (₹2,500 for SC/ST/Minority) and ₹2,500 per month for all seniors aged 70 years and above deposited directly via DBT for residents living in Delhi for 5+ years with family income up to ₹1 Lakh.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Delhi",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Social Welfare, Government of NCT of Delhi",
      "official_source_url": "https://socialwelfare.delhi.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Department of Social Welfare, Delhi",
      "effective_from": "2016-12-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Delhi Senior Citizen Pension Scheme Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer",
      "organization": "Department of Social Welfare & e-District Delhi",
      "portal_url": "https://edistrict.delhigovt.nic.in",
      "helpline_number": "1031 / 011-23381611",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Age 60 years or above",
        "Resident of Delhi for minimum 5 years",
        "Annual family income must not exceed ₹1,00,000 per annum",
        "Not in receipt of any other regular pension from Govt/MCD"
      ],
      "required_documents": [
        "Proof of 5 Years Residence in Delhi",
        "Age Proof document (Voter ID / Passport / School Certificate)",
        "Self-Declaration of Income (< ₹1 Lakh)",
        "Aadhaar-seeded bank account in Delhi"
      ]
    },
    "keywords": [
      "delhi old age pension 2500",
      "edistrict delhi vridha pension",
      "social welfare delhi senior citizen"
    ]
  },
  {
    "id": "SRC-SCH-UT-JK-SEHAT",
    "title": "Ayushman Bharat PM-JAY SEHAT Scheme (Universal Health Insurance - J&K)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4L_HEALTH_MEDICAL_WELFARE",
    "summary": "Universal state health assurance covering 100% of all resident families of Jammu & Kashmir: Provides completely cashless secondary and tertiary hospitalization treatment cover of up to ₹5,00,000 per family per year on floater basis across all empaneled public and private hospitals across India.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Jammu and Kashmir",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "State Health Agency (SHA), Health and Medical Education Department, J&K",
      "official_source_url": "https://sha.jk.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "State Health Agency J&K & National Health Authority",
      "effective_from": "2020-12-26",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Ayushman Bharat PM-JAY SEHAT Scheme Notification (J&K Govt)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Arogyamitra / District Coordinator (SHA)",
      "organization": "State Health Agency J&K & Hospital Ayushman Kiosk",
      "portal_url": "https://sha.jk.gov.in",
      "helpline_number": "14555 / 1800-233-5555",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "All permanent resident families of Union Territory of Jammu and Kashmir (Universal Coverage for all citizens & Govt employees)"
      ],
      "required_documents": [
        "Ration Card (NFSA / Non-NFSA J&K)",
        "Aadhaar Card of all family members"
      ]
    },
    "keywords": [
      "ayushman bharat sehat jk 5 lakh",
      "sehat card jammu kashmir universal health",
      "sha jk gov in sehat",
      "cashless hospital card jk"
    ]
  },
  {
    "id": "SRC-SCH-UT-JK-LADLIBETI",
    "title": "Ladli Beti Scheme (Jammu & Kashmir)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "Financial security scheme for girl children: UT Administration contributes ₹1,000 per month into a recurring deposit account in J&K Bank in the name of the girl child from birth until 14 years of age (total ₹1.68 Lakhs invested), which matures into a corpus of approximately ₹6.5 Lakhs when the girl attains 21 years of age.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Jammu and Kashmir",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Social Welfare Department, Government of Jammu and Kashmir",
      "official_source_url": "https://jksocialwelfare.nic.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Mission Shakti / Social Welfare Department & J&K Bank",
      "effective_from": "2015-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Ladli Beti Scheme Guidelines (Social Welfare J&K)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Social Welfare Officer (DSWO) / CDPO",
      "organization": "Social Welfare Department & J&K Bank",
      "portal_url": "https://jksocialwelfare.nic.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Girl child born on or after 01-04-2015 in notified districts of J&K",
        "Annual gross family income must not exceed ₹75,000 per annum"
      ],
      "required_documents": [
        "Birth Certificate of Girl Child",
        "Income Certificate (< ₹75,000)",
        "Domicile Certificate of J&K",
        "Aadhaar Card of Parents"
      ]
    },
    "keywords": [
      "ladli beti scheme jk 6.5 lakh",
      "jk social welfare ladli beti",
      "jk bank recurring deposit girl child"
    ]
  },
  {
    "id": "SRC-SCH-UT-LA-LAHDC",
    "title": "LAHDC Higher Education Financial Assistance Scheme (Ladakh)",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4B_STUDENTS_SCHOLARSHIPS",
    "summary": "Ladakh Autonomous Hill Development Council scholarship for higher and professional education: Provides annual financial grant of ₹50,000 to ₹1,00,000 towards college tuition fee and hostel charges for Ladakhi students pursuing MBBS, Engineering, PG, and Professional courses outside Ladakh.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Ladakh",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Ladakh Autonomous Hill Development Council (LAHDC Leh & Kargil)",
      "official_source_url": "https://leh.nic.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "LAHDC Higher Education Council / District Administration",
      "effective_from": "2020-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "LAHDC Higher Education Assistance Guidelines"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Executive Councilor (Education) / Deputy Commissioner",
      "organization": "LAHDC Secretariat Leh / Kargil",
      "portal_url": "https://leh.nic.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Permanent resident / ST of UT Ladakh",
        "Pursuing recognized higher/professional education courses in government or AICTE/UGC/NMC approved colleges in mainland India"
      ],
      "required_documents": [
        "ST / Resident Certificate of Ladakh",
        "College Bonafide & Fee Structure Receipt",
        "Class 12 Marksheet",
        "Aadhaar Card"
      ]
    },
    "keywords": [
      "lahdc scholarship ladakh",
      "leh kargil higher education grant",
      "ladakh student assistance 50000"
    ]
  },
  {
    "id": "SRC-SCH-UT-LK-FISHER",
    "title": "Lakshadweep Island Fishermen Monsoon Lean Season Relief",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4M_FISHERFOLK_WELFARE",
    "summary": "Financial sustenance support during southwest monsoon rough weather: Provides ₹4,500 financial grant (combined UT and Central assistance) to traditional coral and pole-and-line tuna fishermen families during the 3-month ban/rough sea season.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Lakshadweep",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Fisheries, UT Administration of Lakshadweep",
      "official_source_url": "https://lakshadweep.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Director of Fisheries, Kavaratti",
      "effective_from": "2018-06-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Fisheries Welfare Guidelines (Lakshadweep Administration)"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Fisheries Inspector / Officer In-Charge",
      "organization": "Department of Fisheries, Kavaratti",
      "portal_url": "https://lakshadweep.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Active traditional fishermen holding valid Lakshadweep Fishermen Biometric Identity Card",
        "Member of local Island Fishermen Cooperative Society"
      ],
      "required_documents": [
        "Fishermen Biometric Card",
        "Aadhaar Card",
        "Island Resident Certificate",
        "Bank Account Passbook"
      ]
    },
    "keywords": [
      "lakshadweep fishermen relief 4500",
      "tuna fishermen lean season lakshadweep",
      "fisheries kavaratti"
    ]
  },
  {
    "id": "SRC-SCH-UT-PY-DESTITUTE",
    "title": "Puducherry Monthly Financial Assistance to Destitute Women & Widows",
    "domain": "WELFARE_SCHEMES",
    "subdomain": "4A_WOMEN_CHILDREN_FAMILY",
    "summary": "UT financial security support: Provides ₹2,500 to ₹3,000 per month deposited directly into bank accounts of destitute widows, deserted wives, and unmarried women aged 40+ residing in Puducherry, Karaikal, Mahe, and Yanam for 3+ years.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Puducherry",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Women and Child Development, Government of Puducherry",
      "official_source_url": "https://wcd.py.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Directorate of Women and Child Development, Puducherry",
      "effective_from": "2011-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Puducherry Destitute Women Assistance Rules"
    },
    "supported_use_cases": [
      "scheme_eligibility",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Welfare Officer (WCD) / Tahsildar",
      "organization": "Directorate of Women and Child Development",
      "portal_url": "https://wcd.py.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "eligibility_conditions": [
        "Destitute widow / deserted wife / unmarried woman aged 40 years and above",
        "Resident of UT of Puducherry for continuous period of 3 years",
        "Annual family income must not exceed ₹75,000 per annum"
      ],
      "required_documents": [
        "3 Years Residence Certificate of Puducherry",
        "Income Certificate from Tahsildar (< ₹75,000)",
        "Death Certificate of Husband / Desertion Certificate",
        "Aadhaar Card & Bank Passbook"
      ]
    },
    "keywords": [
      "puducherry widow pension 3000",
      "wcd py gov in destitute women",
      "puducherry women financial assistance"
    ]
  }
];
