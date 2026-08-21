import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 2F: State/UT-Specific Tenancy Law Directory
 * Grounded strictly in official State Gazettes, State Tenancy Portals,
 * and State Rent Control Enactments.
 * Covers all 28 States and 8 Union Territories (36 Jurisdictions).
 */
export const TENANCY_STATE_SOURCES: VerifiedSourceRecord[] = [
  {
    "id": "SRC-TEN-2F-AP",
    "title": "Andhra Pradesh Buildings (Lease, Rent and Eviction) Control Framework",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Andhra Pradesh: (1) Applicable to urban areas within Municipal Corporations and Municipalities; (2) Landlord must issue written rent receipts under Section 8; (3) Security deposit is not capped by statute (customarily 2-3 months advance, stored as NOT_SPECIFIED_BY_STATUTE); (4) Cutting off essential supplies (water/electricity) is strictly prohibited under Section 14 with summary restoration by Rent Controller; (5) Landlord entry requires reasonable prior notice; (6) Eviction requires a formal petition before the Rent Controller (Principal Junior Civil Judge); self-help lockouts are illegal; (7) Appeals lie before the Subordinate Judge / Senior Civil Judge within 30 days.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Andhra Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law & Municipal Administration Department, Government of Andhra Pradesh",
      "official_source_url": "https://law.ap.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Principal Junior Civil Judge) / Municipal Administration",
      "effective_from": "1960-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Andhra Pradesh Buildings (Lease, Rent and Eviction) Control Act, 1960 (Act No. XV of 1960), Sections 8, 10, 14, 20"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Principal Junior Civil Judge) / Subordinate Judge",
      "department": "Judicial Department / Municipal Administration",
      "organization": "Court of the Rent Controller, District Court Complex",
      "portal_url": "https://districts.ecourts.gov.in/andhra-pradesh",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, conservancy) under Section 14 [ESSENTIAL_SERVICE_CUTOFF]",
        "Dispossessing tenant without an order of eviction from the Rent Controller [FORCED_LOCKOUT]",
        "Arbitrary mid-tenancy rent increases without mutual agreement or fair rent determination"
      ],
      "required_documents": [
        "Tenancy Agreement / Lease Deed",
        "Rent payment receipts / Bank transaction records",
        "Notice of disconnection / Landlord communication",
        "Photographs of premises / electricity meter reading"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller under Section 14 for immediate restoration of essential water/electricity supply",
        "Application to Rent Controller under Section 8 to deposit rent in court if landlord refuses acceptance",
        "Eviction petition by landlord under Section 10 on statutory grounds (willful default, personal requirement, subletting)",
        "Appeal before Subordinate Judge / Senior Civil Judge under Section 20 within 30 days of Rent Controller order",
        "Revision petition before High Court of Andhra Pradesh under Section 22"
      ]
    },
    "keywords": [
      "andhra pradesh rent control act 1960",
      "ap tenant rights",
      "rent controller junior civil judge ap",
      "section 14 water electricity cutoff ap",
      "ap eviction notice"
    ]
  },
  {
    "id": "SRC-TEN-2F-AR",
    "title": "Arunachal Pradesh Tenancy Legal Framework (General Property Law & Customary System)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "General property and customary framework governing tenancy in Arunachal Pradesh: (1) No special state rent control enactment exists; tenancies are governed under Chapter V of the Transfer of Property Act, 1882 and the Arunachal Pradesh Civil Courts Act / customary village authority (Gaon Buras); (2) Written agreement is strongly recommended and enforceable under contract law; (3) Deposit limit is NOT_SPECIFIED_BY_STATUTE (governed by mutual lease terms); (4) Essential services cannot be maliciously disconnected; (5) Eviction requires statutory 15 days notice for month-to-month leases under Section 106 TP Act followed by a civil suit for possession; self-help lockouts are prohibited under common law; (6) Disputes are adjudicated by the Court of the Civil Judge (Junior/Senior Division) and District Court.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Arunachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Law, Legislative and Judicial Affairs, Government of Arunachal Pradesh",
      "official_source_url": "https://arunachalpradesh.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Civil Courts of Competent Jurisdiction / Deputy Commissioner",
      "effective_from": "1882-07-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Transfer of Property Act, 1882 (Chapter V, Sections 105-116) & Civil Courts Act"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Civil Judge (Junior/Senior Division) / Deputy Commissioner",
      "department": "Judicial Department",
      "organization": "District Judiciary / Office of the Deputy Commissioner",
      "portal_url": "https://districts.ecourts.gov.in/arunachal-pradesh",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 15,
      "prohibited_actions": [
        "Physical lockout or forcible dispossession without civil court decree [FORCED_LOCKOUT]",
        "Malicious utility disconnection [ESSENTIAL_SERVICE_CUTOFF]"
      ],
      "required_documents": [
        "Lease Deed / Rent Agreement",
        "Rent payment proofs / bank transfers",
        "Legal notice copy under Section 106 TP Act"
      ],
      "escalation_route": [
        "Mutual grievance notice / local Gaon Bura mediation",
        "Statutory 15-day termination notice under Section 106 Transfer of Property Act",
        "Civil Suit for recovery of possession and mesne profits before Civil Judge",
        "Appeal before District Judge / Gauhati High Court (Itanagar Bench)"
      ]
    },
    "keywords": [
      "arunachal pradesh tenancy",
      "transfer of property act arunachal",
      "itanagar rent dispute",
      "civil court possession arunachal"
    ]
  },
  {
    "id": "SRC-TEN-2F-AS",
    "title": "Assam Tenancy Act, 2021 (Act No. XXXVII of 2021)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State tenancy legislation in Assam (enacted adopting the Model Tenancy Act framework): (1) Mandates execution of written tenancy agreement and joint submission of digital intimation to the Rent Authority under Section 4; (2) Security deposit capped at a maximum of 2 months' rent for residential premises and 1 month's rent for non-residential premises under Section 11; (3) Landlord cannot cut off or withhold essential services (water/electricity) under Section 20; (4) Landlord entry requires 24 hours prior written/electronic notice; (5) Mandatory rent receipts; (6) 3-tier dispute machinery: Rent Authority (Deputy Commissioner / SDO), Rent Court (Civil Judge), and Rent Tribunal (District Judge); (7) Eviction requires an order from the Rent Court under Section 21; self-help evictions are strictly barred.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Assam",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Assam Gazette (Extraordinary), Housing and Urban Affairs Department",
      "official_source_url": "https://assam.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Housing and Urban Affairs Department / District Rent Authority, Assam",
      "effective_from": "2021-12-31",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Assam Tenancy Act, 2021 (Assam Act No. XXXVII of 2021), Sections 4, 11, 13, 20, 21, 30, 32"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Authority (Deputy Commissioner / Addl Deputy Commissioner / SDO)",
      "department": "Housing and Urban Affairs Department",
      "organization": "District Administration & Rent Court",
      "portal_url": "https://assam.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 60,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, lift, sanitation) [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding security deposit exceeding 2 months rent for residential (1 month for non-residential)",
        "Dispossessing tenant without Rent Court order [FORCED_LOCKOUT]",
        "Entry without 24 hours prior notice"
      ],
      "required_documents": [
        "Written Tenancy Agreement",
        "Rent Authority Intimation Receipt",
        "Rent payment proofs",
        "Notice copies"
      ],
      "escalation_route": [
        "Emergency complaint to Rent Authority under Section 20 for immediate restoration of essential utility (decided within 1 month)",
        "Application to Rent Authority under Section 14 to deposit rent in case of landlord refusal",
        "Petition before Rent Court for recovery of possession / determination of tenancy",
        "Appeal before Rent Tribunal (District Judge) within 30 days of Rent Court order"
      ]
    },
    "keywords": [
      "assam tenancy act 2021",
      "assam model tenancy",
      "guwahati rent authority",
      "assam 2 months deposit cap",
      "assam rent court"
    ]
  },
  {
    "id": "SRC-TEN-2F-BR",
    "title": "Bihar Buildings (Lease, Rent and Eviction) Control Act, 1982 (BBC Act)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Bihar: (1) Applicable to all urban areas across Bihar; (2) Landlord must issue written rent receipts under Section 19; (3) Security deposit is NOT_SPECIFIED_BY_STATUTE (governed by contractual agreement); (4) Cutting off essential services (water, electricity, conservancy) is prohibited under Section 10, punishable with fine and summary restoration by the House Controller; (5) Landlord may evict tenant only on statutory grounds (2 months rent default, personal necessity, expiry of lease, subletting) through formal decree of Court; (6) Competent Authorities: House Rent Controller (SDO), Appellate Authority (Collector / District Magistrate), and Munsif/Civil Judge for eviction suits under Section 11.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Bihar",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law Department & Urban Development and Housing Department, Government of Bihar",
      "official_source_url": "https://state.bihar.gov.in/urban",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "House Rent Controller (Sub-Divisional Officer) / Civil Courts",
      "effective_from": "1983-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Bihar Buildings (Lease, Rent and Eviction) Control Act, 1982 (Bihar Act No. 1 of 1983), Sections 10, 11, 14, 19, 24"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "House Rent Controller (Sub-Divisional Officer / SDO) / Civil Judge",
      "department": "Revenue / Urban Development / Judicial Department",
      "organization": "Sub-Divisional Office & Civil Court",
      "portal_url": "https://districts.ecourts.gov.in/bihar",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water, electricity, or sanitary services under Section 10 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without civil court eviction decree under Section 11 [FORCED_LOCKOUT]",
        "Refusal to grant rent receipts under Section 19"
      ],
      "required_documents": [
        "Tenancy Agreement / Kirayanama",
        "Rent Receipts / Money Order receipts",
        "Notice copy",
        "Utility bills"
      ],
      "escalation_route": [
        "Application to House Rent Controller (SDO) under Section 10 for emergency restoration of cut-off electricity/water",
        "Remittance of rent via postal money order or court deposit under Section 19 upon landlord refusal",
        "Eviction suit by landlord under Section 11/14 before Munsif / Civil Judge (Junior Division)",
        "Appeal before District Judge / High Court of Judicature at Patna"
      ]
    },
    "keywords": [
      "bihar rent control act 1982",
      "bbc act bihar",
      "patna rent dispute",
      "section 10 water electricity bihar",
      "house rent controller sdo bihar"
    ]
  },
  {
    "id": "SRC-TEN-2F-CG",
    "title": "Chhattisgarh Rent Control Act, 2011 (Act No. 19 of 2012)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Chhattisgarh: (1) Written agreement executed between landlord and tenant is mandatory and must be informed to Rent Controller under Section 4; (2) Rent can be revised annually as per Schedule IV (default max 10% per annum); (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 2-3 months advance); (4) Tenant has statutory rights to basic amenities under Schedule II; disconnection of water/power is strictly barred under Section 10 with Rent Controller empowered to order restoration and impose penalties; (5) Eviction governed strictly under Schedule III on notified grounds; (6) Specialized dispute machinery: Rent Controller (Deputy Collector / SDM) and Rent Control Tribunal (presided by retired High Court / District Judge).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Chhattisgarh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Chhattisgarh Gazette (Extraordinary), Housing & Environment Department",
      "official_source_url": "https://cgstate.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Deputy Collector) & Rent Control Tribunal, Chhattisgarh",
      "effective_from": "2012-11-06",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Chhattisgarh Rent Control Act, 2011 (C.G. Act No. 19 of 2012), Sections 4, 7, 9, 10, Schedules I-IV"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Deputy Collector / SDM) / Rent Control Tribunal",
      "department": "Housing and Environment Department",
      "organization": "Office of the Rent Controller, Collectorate & Rent Control Tribunal, Raipur",
      "portal_url": "https://cgstate.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Withholding or severing essential amenities (water, electricity, lift) under Section 10 [ESSENTIAL_SERVICE_CUTOFF]",
        "Eviction without order of the Rent Controller under Schedule III [FORCED_LOCKOUT]",
        "Rent increase exceeding Schedule IV norms without written agreement"
      ],
      "required_documents": [
        "Written Tenancy Agreement",
        "Rent payment receipts / Bank statements",
        "Notice of dispute / Rent Controller application"
      ],
      "escalation_route": [
        "Application before Rent Controller for summary restoration of essential service (decided within 15-30 days)",
        "Application to Rent Controller for eviction / arrears determination under Schedule III",
        "Direct statutory appeal before Chhattisgarh Rent Control Tribunal, Raipur under Section 9 within 30 days",
        "Supreme Court of India (SLP against Rent Control Tribunal orders under Section 9(3))"
      ]
    },
    "keywords": [
      "chhattisgarh rent control act 2011",
      "cg rent controller",
      "rent control tribunal raipur",
      "schedule ii tenant rights cg",
      "section 10 water power chhattisgarh"
    ]
  },
  {
    "id": "SRC-TEN-2F-GA",
    "title": "Goa, Daman and Diu Buildings (Lease, Rent and Eviction) Control Act, 1968",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Goa: (1) Applicable to all residential and commercial buildings across Goa; (2) Landlord must issue written rent receipts under Section 17; (3) Landlord cannot claim premium or advance exceeding 3 months' rent under Section 14 (deposit cap: 3 months); (4) Essential amenities (water, electricity, passage) cannot be severed under Section 20; Rent Controller can order immediate restoration; (5) Landlord inspection requires reasonable notice; (6) Eviction strictly governed under Section 22 on statutory grounds before the Rent Controller; (7) Competent Authority: Rent Controller (Mamlatdar / Dy Collector) and Administrative Tribunal (Appellate Authority).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Goa",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Government of Goa, Law Department (Legal Affairs)",
      "official_source_url": "https://www.goa.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Mamlatdar) & Administrative Tribunal, Goa",
      "effective_from": "1969-10-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Goa Buildings (Lease, Rent and Eviction) Control Act, 1968 (Act No. 2 of 1969), Sections 14, 17, 20, 22, 40"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Mamlatdar / Joint Mamlatdar) / Administrative Tribunal",
      "department": "Revenue / Law Department",
      "organization": "Office of the Mamlatdar, Taluka Headquarters & Administrative Tribunal, Panaji",
      "portal_url": "https://www.goa.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Demanding or receiving security deposit / advance exceeding 3 months' rent under Section 14",
        "Cutting off or withholding water or electricity supply under Section 20 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without order of the Rent Controller [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Tenancy Agreement / Lease Deed",
        "Rent payment receipts",
        "Electricity/Water consumer bills",
        "Eviction notice copy"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller (Mamlatdar) under Section 20 for restoration of cut-off utility",
        "Deposit of rent before Rent Controller under Section 18 if landlord refuses receipt",
        "Eviction application by landlord before Rent Controller under Section 22",
        "Appeal before Administrative Tribunal, Panaji under Section 40 within 30 days",
        "Revision petition before High Court of Bombay at Goa"
      ]
    },
    "keywords": [
      "goa rent control act 1968",
      "mamlatdar rent controller goa",
      "3 months deposit cap goa",
      "section 20 water electricity goa",
      "administrative tribunal panaji"
    ]
  },
  {
    "id": "SRC-TEN-2F-GJ",
    "title": "Gujarat Rents, Hotel and Lodging House Rates Control Framework (Gujarat Rent Act)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Gujarat: (1) Applicable to all urban municipal areas and notified zones; (2) Landlord cannot claim any fine, premium or pagdi or deposit exceeding 3 months' rent under Section 10 (deposit cap: 3 months); (3) Landlord must issue written rent receipts under Section 26; (4) Cutting off or withholding essential supplies (water, electricity, lift, sanitation) is strictly prohibited under Section 24; Court can order immediate restoration within 24 hours; (5) Standard rent determination under Section 11; (6) Eviction suits filed before Small Causes Court (Ahmedabad/Surat/Vadodara/Rajkot) or Civil Judge (Junior Division) under Section 13; self-help eviction is illegal; (7) Appeals lie before District Court or Bench of Small Causes Court.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Gujarat",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Legal Department & Urban Development Department, Government of Gujarat",
      "official_source_url": "https://gujaratindia.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Small Causes Court / Civil Courts, Gujarat",
      "effective_from": "1948-02-13",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Bombay Rents, Hotel and Lodging House Rates Control Act, 1947 (as adapted in Gujarat), Sections 10, 11, 13, 24, 26, 28"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Judge, Court of Small Causes / Principal Senior Civil Judge",
      "department": "Judicial Department, Gujarat",
      "organization": "Small Causes Court (Ahmedabad/Surat/Vadodara) & District Judiciary",
      "portal_url": "https://districts.ecourts.gov.in/gujarat",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 24 [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding or receiving advance/deposit exceeding 3 months' standard rent under Section 10",
        "Dispossessing tenant without formal civil court decree under Section 13 [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Rent Note / Tenancy Agreement",
        "Rent payment receipts",
        "Electricity/water connection bills",
        "Legal notice copy"
      ],
      "escalation_route": [
        "Urgent application under Section 24 before Small Causes Court for immediate restoration of cut-off utility",
        "Standard rent fixation application under Section 11",
        "Eviction suit by landlord under Section 12/13 for arrears or personal requirement",
        "Appellate Bench of Small Causes Court / District Court under Section 29 within 30 days",
        "Civil Revision Application before High Court of Gujarat under Section 115 CPC"
      ]
    },
    "keywords": [
      "gujarat rent control act",
      "bombay rent act gujarat",
      "ahmedabad small causes court rent",
      "section 24 utility cutoff gujarat",
      "3 months deposit cap gujarat"
    ]
  },
  {
    "id": "SRC-TEN-2F-HR",
    "title": "Haryana Urban (Control of Rent and Eviction) Act, 1973",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing urban tenancies in Haryana: (1) Applicable to all urban areas across Haryana (including Gurugram, Faridabad, Panipat, Ambala); (2) Fair rent determination under Section 4; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (governed by contractual lease terms); (4) Landlord cannot cut off or withhold essential services (water/electricity) without reasonable cause under Section 11; Rent Controller can order immediate restoration; (5) Landlord repair obligation under Section 12; (6) Eviction strictly regulated under Section 13 before Rent Controller (Civil Judge Junior Division); (7) Appellate Authority: District Judge / Additional District Judge.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Haryana",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administration of Justice & Urban Local Bodies Department, Government of Haryana",
      "official_source_url": "https://haryanajudiciary.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Civil Judge Junior Division) / District Court",
      "effective_from": "1973-04-27",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Haryana Urban (Control of Rent and Eviction) Act, 1973 (Haryana Act No. 11 of 1973), Sections 4, 11, 12, 13, 15"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Civil Judge Junior Division) / Appellate Authority (District Judge)",
      "department": "Judicial Department, Haryana",
      "organization": "Court of the Rent Controller, District Court Complex (Gurugram/Faridabad/Chandigarh)",
      "portal_url": "https://districts.ecourts.gov.in/haryana",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Withholding or severing water or electricity supply under Section 11 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible dispossession of tenant without Rent Controller eviction order under Section 13 [FORCED_LOCKOUT]",
        "Failure to carry out necessary structural repairs after notice under Section 12"
      ],
      "required_documents": [
        "Lease Agreement",
        "Rent Receipts / Online bank transaction proofs",
        "Electricity/water meter bills",
        "Statutory notice copy"
      ],
      "escalation_route": [
        "Urgent petition to Rent Controller under Section 11 for immediate restoration of cut-off electricity/water",
        "Petition under Section 12 for tenant repair reimbursement / rent deduction",
        "Eviction petition by landlord under Section 13 on statutory grounds (arrears, personal use, nuisance)",
        "Appeal before Appellate Authority (District Judge) under Section 15 within 30 days",
        "Revision petition before High Court of Punjab and Haryana at Chandigarh"
      ]
    },
    "keywords": [
      "haryana rent control act 1973",
      "gurugram tenant dispute",
      "faridabad rent controller",
      "section 11 water power cutoff haryana",
      "haryana eviction section 13"
    ]
  },
  {
    "id": "SRC-TEN-2F-HP",
    "title": "Himachal Pradesh Urban Rent Control Act, 1987 (Act No. 25 of 1987)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Himachal Pradesh: (1) Applicable to all urban areas across Himachal Pradesh (including Shimla, Dharamshala, Solan, Mandi); (2) Fair rent determination under Section 4; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE; (4) Landlord cannot cut off or withhold essential services (water/electricity) without reasonable cause under Section 11; Rent Controller can order immediate restoration; (5) Eviction strictly governed under Section 14 on statutory grounds before the Rent Controller; (6) Appellate Authority: District Judge / Additional District Judge; (7) High Court revision under Section 24(5).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Himachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Himachal Pradesh Government Gazette, Law Department",
      "official_source_url": "https://hphighcourt.nic.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Sub-Judge / Sub-Divisional Magistrate) / District Court",
      "effective_from": "1987-10-17",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Himachal Pradesh Urban Rent Control Act, 1987 (Act No. 25 of 1987), Sections 4, 11, 12, 14, 24"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Civil Judge / Sub-Judge) / Appellate Authority (District Judge)",
      "department": "Judicial Department, Himachal Pradesh",
      "organization": "Court of the Rent Controller, District Court Complex (Shimla/Kangra/Solan)",
      "portal_url": "https://districts.ecourts.gov.in/himachal-pradesh",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, sewerage) under Section 11 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without eviction decree of the Rent Controller under Section 14 [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Rent Agreement",
        "Rent payment proofs",
        "Notice copy",
        "Electricity/water connection documents"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller under Section 11 for immediate restoration of cut-off utility",
        "Eviction petition by landlord under Section 14 on statutory grounds (non-payment, bona fide personal requirement, rebuilding)",
        "Appeal before Appellate Authority (District Judge) under Section 24 within 30 days",
        "Revision petition before High Court of Himachal Pradesh under Section 24(5)"
      ]
    },
    "keywords": [
      "himachal rent control act 1987",
      "shimla rent controller",
      "section 11 utility restoration hp",
      "hp eviction section 14"
    ]
  },
  {
    "id": "SRC-TEN-2F-JH",
    "title": "Jharkhand Buildings (Lease, Rent and Eviction) Control Act, 2011",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Jharkhand: (1) Applicable to all urban areas across Jharkhand (Ranchi, Jamshedpur, Dhanbad, Bokaro); (2) Landlord must issue written rent receipts under Section 20; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 2-3 months advance); (4) Cutting off essential services (water, electricity, conservancy) without just cause is strictly prohibited under Section 10; House Controller can order immediate restoration; (5) Eviction governed under Section 19 through formal suit before Civil Judge / Munsif; (6) House Rent Controller (Sub-Divisional Officer / SDO) and Appellate Authority (Deputy Commissioner / District Judge).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Jharkhand",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Urban Development & Housing Department, Government of Jharkhand",
      "official_source_url": "https://udhd.jharkhand.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "House Rent Controller (SDO) / Civil Courts, Jharkhand",
      "effective_from": "2012-03-30",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Jharkhand Buildings (Lease, Rent and Eviction) Control Act, 2011 (Jharkhand Act No. 06 of 2012), Sections 10, 19, 20, 28"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "House Rent Controller (Sub-Divisional Officer / SDO) / Civil Judge",
      "department": "Revenue / Urban Development / Judicial Department",
      "organization": "Office of the SDO & Civil Court Complex (Ranchi/Dhanbad/Jamshedpur)",
      "portal_url": "https://districts.ecourts.gov.in/jharkhand",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 10 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without civil court eviction decree under Section 19 [FORCED_LOCKOUT]",
        "Refusal to issue rent receipt under Section 20"
      ],
      "required_documents": [
        "Tenancy Agreement / Kirayanama",
        "Rent Receipts / Bank statement",
        "Notice copies",
        "Utility disconnection evidence"
      ],
      "escalation_route": [
        "Emergency petition to House Rent Controller (SDO) under Section 10 for restoration of cut-off utility",
        "Remittance of rent via money order or court deposit under Section 20",
        "Eviction suit by landlord under Section 19 before Munsif / Civil Judge",
        "Appeal before Deputy Commissioner / District Judge under Section 28 within 30 days",
        "High Court of Jharkhand at Ranchi (Civil Revision)"
      ]
    },
    "keywords": [
      "jharkhand rent control act 2011",
      "ranchi house rent controller",
      "jamshedpur rent dispute",
      "section 10 water power jharkhand"
    ]
  },
  {
    "id": "SRC-TEN-2F-KA",
    "title": "Karnataka Rent Act, 1999 (Act No. 34 of 2001)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Karnataka: (1) Applicable to areas under Municipal Corporations (Bengaluru, Mysuru, Hubballi-Dharwad, Mangaluru); (2) Exemptions under Section 2(3)(g): Premises whose standard rent/monthly rent exceeds ₹3,500 in Corporation areas (₹2,000 elsewhere) or premises with plinth area > 14 sq.m. commercial are exempt from Rent Act protections and governed by Transfer of Property Act, 1882; (3) Landlord must execute written agreement and issue rent receipts under Section 13; (4) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 2-10 months, contractually determined); (5) Disconnection of essential services (water/electricity) is strictly prohibited under Section 37; Rent Controller can order immediate restoration and impose heavy fine; (6) Landlord entry requires 24 hours written notice under Section 25; (7) Eviction suits filed before Court of Small Causes (Bengaluru) or Civil Judge under Section 27.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Karnataka",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Karnataka Gazette, Department of Parliamentary Affairs & Legislation",
      "official_source_url": "https://dpal.karnataka.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Court of Small Causes (Bengaluru) / Rent Controller (Assistant Commissioner) / Civil Courts",
      "effective_from": "2001-12-31",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Karnataka Rent Act, 1999 (Karnataka Act No. 34 of 2001), Sections 2(3)(g), 13, 25, 27, 37, 46"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Chief Judge, Court of Small Causes / Rent Controller (Assistant Commissioner)",
      "department": "Judicial Department, Karnataka",
      "organization": "Court of Small Causes, Bengaluru & District Judiciary",
      "portal_url": "https://districts.ecourts.gov.in/bengaluru",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, lift, lights) under Section 37 [ESSENTIAL_SERVICE_CUTOFF]",
        "Dispossessing tenant without an eviction order from Court of Small Causes / Civil Court under Section 27 [FORCED_LOCKOUT]",
        "Entry into premises without 24 hours prior written notice under Section 25"
      ],
      "required_documents": [
        "Rental Agreement / Lease Deed",
        "Rent payment receipts / Bank transaction statement",
        "Security deposit payment proof (cheque/bank transfer)",
        "Electricity bill (BESCOM) / Water bill (BWSSB)"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller under Section 37 for immediate restoration of cut-off electricity/water (decided within 24-48 hours)",
        "Application to Court of Small Causes / Civil Court for recovery of wrongfully withheld security deposit",
        "Eviction petition by landlord under Section 27 on statutory grounds (arrears, bona fide personal requirement, subletting)",
        "Revision petition before High Court of Karnataka under Section 46 within 90 days"
      ]
    },
    "keywords": [
      "karnataka rent act 1999",
      "bengaluru tenant rights",
      "section 37 bescom bwssb cutoff",
      "bengaluru small causes court rent",
      "section 2 3 g exemption 3500 rent",
      "karnataka deposit refund"
    ]
  },
  {
    "id": "SRC-TEN-2F-KL",
    "title": "Kerala Buildings (Lease and Rent Control) Act, 1965 (Act No. 2 of 1965)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Kerala: (1) Applicable to all urban municipal areas and notified panchayats across Kerala; (2) Fair rent determination under Section 5; (3) Landlord must issue written rent receipts under Section 9; (4) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 2-3 months advance); (5) Landlord cannot cut off or withhold essential services (water/electricity/sanitation) without just cause under Section 13; Rent Control Court can order immediate restoration; (6) Eviction strictly governed under Section 11 before the Rent Control Court (Munsiff); (7) Appellate Authority: Rent Control Appellate Authority (Subordinate Judge / District Judge) under Section 18; High Court revision under Section 20.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Kerala",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law Department & Local Self Government Department, Government of Kerala",
      "official_source_url": "https://highcourt.kerala.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Control Court (Munsiff) & Rent Control Appellate Authority, Kerala",
      "effective_from": "1965-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Kerala Buildings (Lease and Rent Control) Act, 1965 (Act No. 2 of 1965), Sections 5, 9, 11, 13, 18, 20"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Control Court (Munsiff) / Rent Control Appellate Authority (Subordinate Judge)",
      "department": "Judicial Department, Kerala",
      "organization": "Rent Control Court, District Court Complex (Ernakulam/Thiruvananthapuram/Kozhikode)",
      "portal_url": "https://districts.ecourts.gov.in/kerala",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 13 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout or dispossession without Rent Control Court eviction order under Section 11 [FORCED_LOCKOUT]",
        "Refusal to issue rent receipts under Section 9"
      ],
      "required_documents": [
        "Rent Agreement (Vaddaka Karar)",
        "Rent Receipts / Bank transfer proofs",
        "KSEB electricity bill / KWA water bill",
        "Eviction notice copy"
      ],
      "escalation_route": [
        "Emergency petition to Rent Control Court (Munsiff) under Section 13 for restoration of cut-off utility",
        "Deposit of rent before Rent Control Court under Section 9 upon landlord refusal",
        "Eviction petition by landlord under Section 11 on statutory grounds (rent default, bona fide personal use, cessation of occupation)",
        "Appeal before Rent Control Appellate Authority (Sub Judge) under Section 18 within 30 days",
        "Revision petition before High Court of Kerala at Ernakulam under Section 20"
      ]
    },
    "keywords": [
      "kerala rent control act 1965",
      "munsiff rent control court kerala",
      "section 13 kseb kwa cutoff kerala",
      "section 11 eviction grounds kerala",
      "kerala rent appeal section 18"
    ]
  },
  {
    "id": "SRC-TEN-2F-MP",
    "title": "Madhya Pradesh Accommodation Control Framework & Parisar Kirayedari Adhiniyam",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Madhya Pradesh: (1) Adjudicated under the Madhya Pradesh Accommodation Control Act, 1961 (MP Act No. 41 of 1961) alongside the transitioning Parisar Kirayedari Adhiniyam framework; (2) Landlord must issue written rent receipts; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE under 1961 Act (capped to max 2 months residential / 1 month commercial under the 2021 Adhiniyam guidelines); (4) Cutting off or withholding essential supply (water/electricity) without just cause is strictly prohibited under Section 38 of the 1961 Act (and Section 20 of the 2021 Act); (5) Eviction strictly governed on statutory grounds before Rent Controlling Authority (RCA - SDO) / Civil Judge under Section 12; self-help lockouts are illegal; (6) Appeals lie before the District Judge / High Court of Madhya Pradesh.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Madhya Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law and Legislative Affairs & Urban Development and Housing Department, Government of Madhya Pradesh",
      "official_source_url": "https://mpurban.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controlling Authority (RCA / SDO) & District Court, MP",
      "effective_from": "1961-12-30",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Madhya Pradesh Accommodation Control Act, 1961 (Sections 12, 28, 38) & Parisar Kirayedari Adhiniyam, 2021"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Authority (Sub-Divisional Officer / SDO) / Rent Court",
      "department": "Urban Development and Housing Department",
      "organization": "Office of the SDO & Rent Court, District Judiciary (Bhopal/Indore/Jabalpur)",
      "portal_url": "https://mpurban.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 60,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 20 [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding security deposit exceeding 2 months rent for residential (1 month for non-residential)",
        "Dispossessing tenant without Rent Court order [FORCED_LOCKOUT]",
        "Entry without 24 hours prior notice under Section 16"
      ],
      "required_documents": [
        "Written Tenancy Agreement",
        "Rent Authority Intimation Receipt",
        "Rent payment proofs",
        "Notice copies"
      ],
      "escalation_route": [
        "Urgent application to Rent Authority under Section 20 for restoration of cut-off utility (decided within 1 month)",
        "Application to Rent Authority under Section 14 to deposit rent upon landlord refusal",
        "Petition before Rent Court under Section 21 for recovery of possession / determination of tenancy",
        "Appeal before Rent Tribunal (District Judge) under Section 32 within 30 days"
      ]
    },
    "keywords": [
      "madhya pradesh tenancy act 2021",
      "mp rent authority sdo",
      "bhopal indore rent dispute",
      "mp 2 months deposit cap",
      "mp rent court"
    ]
  },
  {
    "id": "SRC-TEN-2F-MH",
    "title": "Maharashtra Rent Control Act, 1999 & Leave and License Framework",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancies and leave and license arrangements in Maharashtra: (1) Mandates compulsory registration of all tenancy/leave-and-license agreements under Section 55 on the IGR Maharashtra e-Registration portal (igrmaharashtra.gov.in); (2) Landlord/licensor is statutorily responsible for registration; (3) Prohibits cutting off essential utilities (water, electricity, lift) under Section 29; Competent Court can order immediate restoration; (4) Summary eviction proceedings for licensees under Section 24 before the Competent Authority (Rent Control Act); (5) Eviction of statutory tenants under Section 16 before the Court of Small Causes (Mumbai/Pune) or Civil Judge; (6) Deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 2-6 months, contractually determined); (7) Self-help lockouts are strictly illegal.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Maharashtra",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Maharashtra Government Gazette, Law and Judiciary Department & Inspector General of Registration (IGR)",
      "official_source_url": "https://igrmaharashtra.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Court of Small Causes (Mumbai/Pune) / Competent Authority (Rent Control Act) / Civil Judge",
      "effective_from": "2000-03-31",
      "source_updated_date": "2024-03-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Maharashtra Rent Control Act, 1999 (Maharashtra Act No. 18 of 2000), Sections 16, 24, 29, 41, 42, 55"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Chief Judge, Court of Small Causes (Mumbai/Pune) / Competent Authority (Rent Control)",
      "department": "Law and Judiciary Department / Revenue Department (IGR)",
      "organization": "Court of Small Causes & Office of the Competent Authority (Konkan/Pune Division)",
      "portal_url": "https://igrmaharashtra.gov.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, lift, sanitation) under Section 29 [ESSENTIAL_SERVICE_CUTOFF]",
        "Failure by landlord to register agreement under Section 55 (punishable with imprisonment up to 3 months or fine)",
        "Forcible lockout of licensee/tenant without order of the Competent Authority / Small Causes Court [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Registered Leave and License Agreement (IGR e-Registration copy)",
        "Security deposit payment receipts / Bank transaction statement",
        "Rent payment proofs",
        "Notice of termination / Legal notice copy"
      ],
      "escalation_route": [
        "Emergency application to Small Causes Court / Magistrate under Section 29 for immediate restoration of cut-off water/electricity",
        "Eviction application by licensor before Competent Authority under Section 24/42 for summary possession upon license expiry",
        "Suit before Small Causes Court (Mumbai/Pune) for recovery of possession or standard rent determination",
        "Revision application before Additional Commissioner / High Court of Judicature at Bombay"
      ]
    },
    "keywords": [
      "maharashtra rent control act 1999",
      "mumbai leave and license section 55",
      "igr maharashtra e registration",
      "competent authority rent control bandra",
      "section 29 utility cutoff mumbai",
      "small causes court mumbai"
    ]
  },
  {
    "id": "SRC-TEN-2F-MN",
    "title": "Manipur Rent Control Framework & Urban Tenancy Rules",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State tenancy framework in Manipur: (1) Applicable to Imphal Municipal Corporation and notified urban areas; (2) Fair rent determination and standard rent protections; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (governed by mutual lease terms); (4) Disconnection of essential services (water/power) is prohibited; (5) Eviction requires formal proceedings before the Rent Controller / Civil Court on statutory grounds (arrears, bona fide need, rebuilding); (6) Competent Authority: Rent Controller (Sub-Divisional Officer / SDO) and District Court.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Manipur",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law and Legislative Affairs Department & MAHUD, Government of Manipur",
      "official_source_url": "https://manipur.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (SDO) & Civil Courts, Manipur",
      "effective_from": "1995-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Manipur Rent Control Act & Transfer of Property Act, 1882 (Chapter V)"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Sub-Divisional Officer / SDO) / Civil Judge",
      "department": "Municipal Administration, Housing and Urban Development (MAHUD)",
      "organization": "Office of the SDO & District Judiciary (Imphal East/Imphal West)",
      "portal_url": "https://districts.ecourts.gov.in/manipur",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off water or electricity supply to force eviction [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible dispossession without civil court / Rent Controller order [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Tenancy Agreement",
        "Rent payment proofs",
        "Notice copy"
      ],
      "escalation_route": [
        "Petition before Rent Controller (SDO) for restoration of essential amenities",
        "Eviction suit before Civil Judge on statutory grounds",
        "Appeal before District Judge / High Court of Manipur"
      ]
    },
    "keywords": [
      "manipur rent control",
      "imphal tenant rights",
      "sdo rent controller manipur",
      "manipur eviction notice"
    ]
  },
  {
    "id": "SRC-TEN-2F-ML",
    "title": "Meghalaya Urban Areas Rent Control Act, 1972 (Act No. 8 of 1972)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Meghalaya: (1) Applicable to Shillong Municipality and all urban notified areas across Meghalaya; (2) Fair rent fixation under Section 3; (3) Landlord must issue written rent receipts under Section 7; (4) Security deposit limit: NOT_SPECIFIED_BY_STATUTE; (5) Cutting off or withholding essential amenities (water/electricity) without reasonable cause is strictly barred under Section 8; Court can order immediate restoration; (6) Eviction strictly governed under Section 5 before the Court of the Civil Judge / Deputy Commissioner; self-help lockouts are illegal; (7) Appeals lie before the District Court.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Meghalaya",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law Department & Urban Affairs Department, Government of Meghalaya",
      "official_source_url": "https://meghalaya.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Civil Courts / Deputy Commissioner, Meghalaya",
      "effective_from": "1972-04-18",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Meghalaya Urban Areas Rent Control Act, 1972 (Act No. 8 of 1972), Sections 3, 5, 7, 8"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Civil Judge (Senior/Junior Division) / Deputy Commissioner",
      "department": "Judicial Department / Urban Affairs",
      "organization": "District Court Complex (Shillong/Tura/Jowai)",
      "portal_url": "https://districts.ecourts.gov.in/meghalaya",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 8 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without civil court decree under Section 5 [FORCED_LOCKOUT]",
        "Refusal to grant rent receipt under Section 7"
      ],
      "required_documents": [
        "Rent Agreement / Lease Deed",
        "Rent Receipts / Bank proofs",
        "Electricity (MePDCL) / Water connection documents"
      ],
      "escalation_route": [
        "Emergency petition to Civil Judge under Section 8 for restoration of cut-off utility",
        "Deposit of rent in Civil Court under Section 7 upon landlord refusal",
        "Eviction suit by landlord under Section 5 on statutory grounds (arrears, personal necessity, building repairs)",
        "Appeal before District Judge / High Court of Meghalaya"
      ]
    },
    "keywords": [
      "meghalaya rent control act 1972",
      "shillong rent dispute",
      "section 8 water electricity meghalaya",
      "meghalaya eviction section 5"
    ]
  },
  {
    "id": "SRC-TEN-2F-MZ",
    "title": "Mizoram Tenancy Legal Framework (General Property Law & Urban Regulations)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "General property framework governing tenancy in Mizoram: (1) Applicable across Aizawl Municipal Corporation and urban town areas under Chapter V of the Transfer of Property Act, 1882 and local urban council rules; (2) Written agreement is standard and contractually enforceable; (3) Deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 1-3 months); (4) Essential services cannot be arbitrarily disconnected; (5) Eviction requires statutory 15 days notice for month-to-month leases under Section 106 TP Act followed by a civil suit before the Civil Court; self-help lockouts are prohibited; (6) Adjudicated by Civil Judge (Senior/Junior Division) and District Court (Aizawl/Lunglei).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Mizoram",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law and Judicial Department & UD&PA Department, Government of Mizoram",
      "official_source_url": "https://landrevenue.mizoram.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Civil Courts of Competent Jurisdiction / Local Council",
      "effective_from": "1882-07-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Transfer of Property Act, 1882 (Chapter V, Sections 105-116) & Mizoram Civil Courts Act"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Civil Judge (Senior/Junior Division) / Local Council Chairman",
      "department": "Law and Judicial Department",
      "organization": "Court of the Civil Judge, District Court Complex (Aizawl/Lunglei)",
      "portal_url": "https://districts.ecourts.gov.in/mizoram",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 15,
      "prohibited_actions": [
        "Physical lockout or forcible dispossession without civil court decree [FORCED_LOCKOUT]",
        "Malicious disconnection of water/electricity supply [ESSENTIAL_SERVICE_CUTOFF]"
      ],
      "required_documents": [
        "Lease Deed / Tenancy Agreement",
        "Rent payment proofs",
        "Legal notice under Section 106 TP Act"
      ],
      "escalation_route": [
        "Local Council / Village Council conciliation",
        "Statutory 15-day notice under Section 106 Transfer of Property Act",
        "Civil Suit for eviction and mesne profits before Civil Judge",
        "Appeal before District Judge / Gauhati High Court (Aizawl Bench)"
      ]
    },
    "keywords": [
      "mizoram tenancy law",
      "aizawl rent dispute",
      "transfer of property act mizoram",
      "civil court eviction aizawl"
    ]
  },
  {
    "id": "SRC-TEN-2F-NL",
    "title": "Nagaland Tenancy Legal Framework (Customary Authority & General Property Law)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "Tenancy framework in Nagaland: (1) Applicable across Kohima, Dimapur, and district headquarters under Article 371A customary administration and Chapter V of Transfer of Property Act, 1882; (2) Written agreements are standard; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (contractually agreed); (4) Cutting off essential electricity/water is unlawful; (5) Eviction requires valid statutory notice followed by civil suit / proceedings before Deputy Commissioner / Dobashis Court; self-help lockouts are prohibited; (6) Adjudicated by Court of the Civil Judge / Deputy Commissioner and District Court.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Nagaland",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Justice and Law & Urban Development Department, Government of Nagaland",
      "official_source_url": "https://nagaland.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Deputy Commissioner / Civil Courts / Dobashis Court, Nagaland",
      "effective_from": "1882-07-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Transfer of Property Act, 1882 & Rules for Administration of Justice and Police in Nagaland"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Civil Judge / Deputy Commissioner / Dobashis Court",
      "department": "Department of Justice and Law",
      "organization": "District Court Complex & Office of the Deputy Commissioner (Kohima/Dimapur)",
      "portal_url": "https://districts.ecourts.gov.in/nagaland",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 15,
      "prohibited_actions": [
        "Forcible lockout without due process of law [FORCED_LOCKOUT]",
        "Malicious utility disconnection [ESSENTIAL_SERVICE_CUTOFF]"
      ],
      "required_documents": [
        "Tenancy Agreement",
        "Rent payment proofs",
        "Notice copy"
      ],
      "escalation_route": [
        "Village Council / Ward GB mediation",
        "Legal notice under Section 106 Transfer of Property Act",
        "Civil Suit before Civil Judge / Deputy Commissioner",
        "Appeal before District Judge / Gauhati High Court (Kohima Bench)"
      ]
    },
    "keywords": [
      "nagaland tenancy law",
      "kohima rent dispute",
      "dimapur tenant rights",
      "deputy commissioner nagaland rent"
    ]
  },
  {
    "id": "SRC-TEN-2F-OD",
    "title": "Odisha House Rent Control Act, 1967 (Act No. 4 of 1968)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Odisha: (1) Applicable to all Municipal Corporations (Bhubaneswar, Cuttack, Rourkela, Berhampur, Sambalpur) and Municipalities; (2) Fair rent determination under Section 5; (3) Landlord must issue written rent receipts under Section 8; (4) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 1-3 months advance); (5) Disconnection of essential services (water, electricity, sewerage) without reasonable cause is prohibited under Section 13; House Rent Controller can order immediate restoration; (6) Eviction strictly regulated under Section 7 on statutory grounds before the House Rent Controller; self-help lockouts are prohibited; (7) Appellate Authority: Collector / Additional District Magistrate (ADM) under Section 13; High Court revision under Section 15.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Odisha",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law Department & Housing and Urban Development Department, Government of Odisha",
      "official_source_url": "https://urban.odisha.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "House Rent Controller (Sub-Collector / Tahsildar) & Collector / ADM, Odisha",
      "effective_from": "1968-05-04",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Odisha House Rent Control Act, 1967 (Odisha Act No. 4 of 1968), Sections 5, 7, 8, 13, 15"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "House Rent Controller (Sub-Collector / Tahsildar) / Appellate Authority (Collector / ADM)",
      "department": "Revenue and Disaster Management / Housing Department",
      "organization": "Office of the Sub-Collector & Collectorate (Bhubaneswar/Cuttack)",
      "portal_url": "https://urban.odisha.gov.in",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 13 [ESSENTIAL_SERVICE_CUTOFF]",
        "Evicting tenant without order of the House Rent Controller under Section 7 [FORCED_LOCKOUT]",
        "Refusal to give rent receipt under Section 8"
      ],
      "required_documents": [
        "House Rent Agreement",
        "Rent payment receipts / Bank proofs",
        "TPCODL electricity bill / WATCO water bill",
        "Notice copies"
      ],
      "escalation_route": [
        "Emergency application to House Rent Controller (Sub-Collector) under Section 13 for restoration of cut-off utility",
        "Deposit of rent before House Rent Controller under Section 8 upon landlord refusal",
        "Eviction application by landlord under Section 7 on statutory grounds (arrears, personal requirement, subletting)",
        "Appeal before Collector / ADM under Section 13 within 30 days",
        "Revision petition before High Court of Orissa at Cuttack under Section 15"
      ]
    },
    "keywords": [
      "odisha house rent control act 1967",
      "bhubaneswar rent controller",
      "cuttack tenant rights",
      "section 13 water electricity odisha",
      "sub collector rent controller odisha"
    ]
  },
  {
    "id": "SRC-TEN-2F-PB",
    "title": "Punjab Rent Act, 1995 (Act No. 13 of 2012, effective 30-11-2014)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing urban tenancy in Punjab: (1) Applicable to all urban areas in Punjab (Ludhiana, Amritsar, Jalandhar, Patiala, Mohali); (2) Written agreement is mandatory and must be registered with the Rent Authority under Section 4; (3) Security deposit capped at a maximum of 1 month's rent under Section 4(3); (4) Mandatory rent receipts under Section 7; (5) Landlord cannot cut off or withhold essential services (water/electricity/lift) under Section 17; Rent Authority can order immediate restoration and impose heavy fine; (6) Landlord entry requires 24 hours written notice under Section 13; (7) Eviction strictly governed under Sections 20-24 before the Rent Authority (SDM/Assistant Commissioner); (8) Appellate Authority: District Judge / Additional District Judge under Section 38.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Punjab",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Punjab Government Gazette (Extraordinary), Department of Housing and Urban Development",
      "official_source_url": "https://punjab.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Authority (Assistant Commissioner / SDM) & District Court, Punjab",
      "effective_from": "2014-11-30",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Punjab Rent Act, 1995 (Punjab Act No. 13 of 2012), Sections 4, 7, 13, 17, 20, 38"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Authority (Sub-Divisional Magistrate / Assistant Commissioner) / District Judge",
      "department": "Housing and Urban Development Department",
      "organization": "Office of the Rent Authority, Sub-Divisional Complex & District Court (Ludhiana/Mohali/Amritsar)",
      "portal_url": "https://districts.ecourts.gov.in/punjab",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Demanding or receiving security deposit exceeding 1 month rent under Section 4(3)",
        "Cutting off or withholding water or electricity supply under Section 17 [ESSENTIAL_SERVICE_CUTOFF]",
        "Dispossessing tenant without Rent Authority eviction order under Section 20 [FORCED_LOCKOUT]",
        "Entry without 24 hours prior notice under Section 13"
      ],
      "required_documents": [
        "Written Tenancy Agreement",
        "Rent Authority Registration Certificate",
        "Rent payment proofs / Bank transfers",
        "PSPCL electricity bill"
      ],
      "escalation_route": [
        "Emergency application to Rent Authority under Section 17 for immediate restoration of cut-off utility",
        "Deposit of rent before Rent Authority under Section 8 if landlord refuses receipt",
        "Eviction petition by landlord under Section 20 on statutory grounds (arrears, bona fide need, expiry)",
        "Appeal before Appellate Authority (District Judge) under Section 38 within 30 days",
        "Revision petition before High Court of Punjab and Haryana at Chandigarh"
      ]
    },
    "keywords": [
      "punjab rent act 1995",
      "punjab 1 month deposit cap",
      "mohali rent authority",
      "ludhiana rent dispute",
      "section 17 water power cutoff punjab",
      "punjab rent court sdm"
    ]
  },
  {
    "id": "SRC-TEN-2F-RJ",
    "title": "Rajasthan Rent Control Act, 2001 (Act No. 1 of 2003 as amended)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Rajasthan: (1) Applicable to all Municipal Corporation, Council, and Board areas across Rajasthan (Jaipur, Jodhpur, Kota, Udaipur); (2) Written agreement executed between landlord and tenant is standard; (3) Security deposit capped at a maximum of 1 month's rent under Section 4; (4) Rent revision governed by Section 6 (default 5% per annum compounding); (5) Landlord cannot cut off or withhold essential services (water/electricity/lift) under Section 23; Rent Tribunal can order immediate restoration within 24-48 hours; (6) Specialized two-tier judicial dispute machinery: Rent Tribunal (Senior Civil Judge) under Section 13 and Appellate Rent Tribunal (District Judge / ADJ) under Section 19; (7) Jurisdiction of Civil Courts is strictly barred under Section 18; (8) Self-help lockouts are illegal.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Rajasthan",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Rajasthan Government Gazette, Law Department & Local Self Government Department",
      "official_source_url": "https://rajasthanjudiciary.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Tribunal (Senior Civil Judge) & Appellate Rent Tribunal, Rajasthan",
      "effective_from": "2003-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Rajasthan Rent Control Act, 2001 (Act No. 1 of 2003), Sections 4, 6, 9, 13, 18, 19, 23"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Presiding Officer, Rent Tribunal (Senior Civil Judge) / Appellate Rent Tribunal (District Judge)",
      "department": "Judicial Department, Rajasthan",
      "organization": "Rent Tribunal, District Court Complex (Jaipur/Jodhpur/Udaipur/Kota)",
      "portal_url": "https://districts.ecourts.gov.in/rajasthan",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 60,
      "prohibited_actions": [
        "Cutting off or withholding essential amenities (water, electricity, passage) under Section 23 [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding or receiving advance deposit exceeding 1 month's rent under Section 4",
        "Dispossessing tenant without certificate of recovery of possession from Rent Tribunal under Section 9/15 [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Rent Agreement (Kirayanama)",
        "Rent payment receipts / Bank transaction statement",
        "JVVNL/AVVNL/JdVVNL electricity bill",
        "Notice copies"
      ],
      "escalation_route": [
        "Urgent application to Rent Tribunal under Section 23 for immediate restoration of cut-off utility",
        "Petition before Rent Tribunal under Section 9 for eviction on statutory grounds (arrears of 4 months, bona fide necessity, subletting)",
        "Appeal before Appellate Rent Tribunal (District Judge) under Section 19 within 60 days",
        "Writ petition before High Court of Judicature for Rajasthan at Jodhpur / Jaipur Bench under Article 227"
      ]
    },
    "keywords": [
      "rajasthan rent control act 2001",
      "jaipur rent tribunal",
      "rajasthan 1 month deposit cap",
      "section 23 utility cutoff rajasthan",
      "appellate rent tribunal rajasthan",
      "section 9 eviction grounds rajasthan"
    ]
  },
  {
    "id": "SRC-TEN-2F-SK",
    "title": "Gangtok Rent Control and Eviction Framework (Sikkim Tenancy Law)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Sikkim: (1) Applicable to Gangtok Municipal Corporation and notified urban bazaars across Sikkim; (2) Fair rent fixation and rent receipts; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (governed by mutual agreement); (4) Disconnection of water or electricity is prohibited; (5) Eviction requires formal proceedings before the District Collector / Civil Court on statutory grounds (arrears, personal necessity, structural rebuilding); (6) Competent Authorities: District Collector & Court of Civil Judge (East Sikkim at Gangtok).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Sikkim",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law Department & Urban Development Department, Government of Sikkim",
      "official_source_url": "https://sikkim.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "District Collector / Civil Courts, Sikkim",
      "effective_from": "1956-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Gangtok Rent Control and Eviction Act, 1956 & Transfer of Property Act, 1882 (Chapter V)"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "District Collector / Civil Judge (Senior/Junior Division)",
      "department": "Urban Development Department / Law Department",
      "organization": "Office of the District Collector & District Court, Gangtok",
      "portal_url": "https://districts.ecourts.gov.in/sikkim",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off water or electricity supply [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without court decree [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Tenancy Agreement",
        "Rent Receipts",
        "Notice copy"
      ],
      "escalation_route": [
        "Application to District Collector / Civil Judge for emergency utility restoration",
        "Eviction suit by landlord on statutory grounds before Civil Judge",
        "Appeal before District Judge / High Court of Sikkim at Gangtok"
      ]
    },
    "keywords": [
      "sikkim rent control",
      "gangtok tenancy law",
      "district collector sikkim rent",
      "gangtok eviction dispute"
    ]
  },
  {
    "id": "SRC-TEN-2F-TN",
    "title": "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Tamil Nadu: (1) Mandates that every tenancy agreement must be in writing and registered on the official portal (tenancy.tn.gov.in) within 90 days of execution under Section 4; (2) Save an agreement to the contrary, security deposit is capped to a maximum of three times monthly rent under Section 11 (refund within 1 month after vacation); (3) Mandatory rent receipts under Section 13; (4) Strict prohibition under Section 18 against cutting or withholding essential supplies (water/electricity); Rent Authority can order restoration within 1 month and impose penalty; (5) Landlord entry requires 24 hours prior written/electronic notice under Section 16; (6) Rent revision governed by Section 9 (agreement terms or 3 months prior notice); (7) Eviction only through Rent Court decree under Section 21; (8) Appeals: Appeal from Rent Authority lies to Rent Court under Section 30 (within 30 days); Appeal from Rent Court lies to Rent Tribunal under Section 38 (within 30 days).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Tamil Nadu Government Gazette (Extraordinary), Housing and Urban Development Department",
      "official_source_url": "https://www.tenancy.tn.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Housing and Urban Development Department, Government of Tamil Nadu",
      "effective_from": "2019-02-22",
      "source_updated_date": "2024-03-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Tamil Nadu Act No. 42 of 2017, Sections 4, 9, 11, 13, 14, 15, 16, 18, 21, 30, 32, and 38",
      "gazette_notification_ref": "T.N. Govt. Gaz. Ex., Pt. IV-Sec. 2, dt. 04-08-2017; Rules dt. 22-02-2019"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Authority (Revenue Divisional Officer / Tahsildar)",
      "department": "Revenue and Disaster Management / Housing Department",
      "organization": "Office of the Rent Authority, District Collectorate & Rent Court",
      "portal_url": "https://www.tenancy.tn.gov.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 90,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, passage) under Section 18 [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding or receiving security deposit exceeding 3 times monthly rent (save agreement to contrary) under Section 11",
        "Dispossessing tenant without an eviction order from the Rent Court under Section 21 [FORCED_LOCKOUT]",
        "Unannounced entry without 24 hours prior notice under Section 16"
      ],
      "required_documents": [
        "Tenancy Registration Number (TNRRRLT portal generated)",
        "Original / copy of executed written tenancy agreement",
        "Rent payment receipts / Bank transaction statement",
        "Notice copy served on opposite party"
      ],
      "escalation_route": [
        "Emergency application to Rent Authority under Section 18 for immediate restoration of essential supply (decided within 1 month)",
        "Application to Rent Authority under Section 14 to deposit rent if landlord refuses acceptance",
        "Application to Rent Authority under Section 11 for recovery of wrongfully withheld security deposit",
        "Petition before Rent Court under Section 21 for determination of tenancy or recovery of possession",
        "Appeal before Rent Tribunal (District Judge) under Section 38 within 30 days of Rent Court order"
      ]
    },
    "keywords": [
      "tamil nadu tenancy act 2017",
      "tnrrrlt act",
      "tenancy tn gov in portal",
      "section 18 water electricity disconnection",
      "3 times monthly rent deposit cap tamil nadu",
      "rdo rent authority rent court",
      "section 38 rent tribunal appeal"
    ]
  },
  {
    "id": "SRC-TEN-2F-TS",
    "title": "Telangana Buildings (Lease, Rent and Eviction) Control Framework",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Telangana: (1) Applicable to Hyderabad, Warangal, Nizamabad, and all urban municipal corporation areas; (2) Landlord must issue written rent receipts under Section 8; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 2-3 months advance, stored as NOT_SPECIFIED_BY_STATUTE); (4) Cutting off essential supplies (water, electricity, drainage, lift) without reasonable cause is strictly prohibited under Section 14; Rent Controller can order immediate restoration and penalize landlord; (5) Landlord entry requires reasonable prior notice; (6) Eviction requires a formal petition before the Rent Controller (Principal Junior Civil Judge); self-help lockouts are illegal; (7) Appeals lie before the Chief Judge, City Civil Court (Hyderabad) / Senior Civil Judge within 30 days.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Telangana",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law & Municipal Administration Department, Government of Telangana",
      "official_source_url": "https://law.telangana.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Principal Junior Civil Judge) & City Civil Court, Hyderabad",
      "effective_from": "1960-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Telangana Buildings (Lease, Rent and Eviction) Control Act, 1960 (Act No. XV of 1960), Sections 8, 10, 14, 20"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Principal Junior Civil Judge) / Chief Judge, City Civil Court",
      "department": "Judicial Department, Telangana",
      "organization": "Court of the Rent Controller, City Civil Court Complex, Hyderabad & District Judiciary",
      "portal_url": "https://districts.ecourts.gov.in/telangana",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, lift, drainage) under Section 14 [ESSENTIAL_SERVICE_CUTOFF]",
        "Dispossessing tenant without an order of eviction from the Rent Controller under Section 10 [FORCED_LOCKOUT]",
        "Arbitrary mid-tenancy rent increases without mutual agreement"
      ],
      "required_documents": [
        "Rental Agreement / Lease Deed",
        "Rent payment receipts / Bank transaction records",
        "TGSPDCL electricity bill / HMWSSB water bill",
        "Notice copies"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller under Section 14 for immediate restoration of cut-off electricity/water",
        "Application to Rent Controller under Section 8 to deposit rent if landlord refuses acceptance",
        "Eviction petition by landlord under Section 10 on statutory grounds (willful default, personal requirement, subletting)",
        "Appeal before Chief Judge, City Civil Court / Senior Civil Judge under Section 20 within 30 days",
        "Revision petition before High Court for the State of Telangana at Hyderabad under Section 22"
      ]
    },
    "keywords": [
      "telangana rent control act 1960",
      "hyderabad tenant rights",
      "rent controller city civil court hyderabad",
      "section 14 tgspdcl hmwssb cutoff",
      "telangana eviction notice"
    ]
  },
  {
    "id": "SRC-TEN-2F-TR",
    "title": "Tripura Buildings (Lease and Rent Control) Act, 1975 (Act No. 5 of 1975)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Tripura: (1) Applicable to Agartala Municipal Corporation and urban town areas; (2) Fair rent determination under Section 4; (3) Landlord must issue written rent receipts under Section 8; (4) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (governed contractually); (5) Cutting off essential services (water/electricity) without reasonable cause is prohibited under Section 12; Rent Controller can order immediate restoration; (6) Eviction strictly governed under Section 10 before the Rent Controller (Sub-Divisional Magistrate / SDM); (7) Appellate Authority: District Judge under Section 20.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tripura",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law Department & Urban Development Department, Government of Tripura",
      "official_source_url": "https://tripura.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Sub-Divisional Magistrate) & District Court, Tripura",
      "effective_from": "1975-06-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Tripura Buildings (Lease and Rent Control) Act, 1975 (Act No. 5 of 1975), Sections 4, 8, 10, 12, 20"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Sub-Divisional Magistrate / SDM) / District Judge",
      "department": "Urban Development Department / Law Department",
      "organization": "Office of the SDM & District Judiciary (West Tripura / Agartala)",
      "portal_url": "https://districts.ecourts.gov.in/tripura",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 12 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without Rent Controller eviction order under Section 10 [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Tenancy Agreement",
        "Rent Receipts",
        "Notice copy",
        "TSECL electricity bill"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller (SDM) under Section 12 for restoration of cut-off utility",
        "Deposit of rent before Rent Controller under Section 8 upon landlord refusal",
        "Eviction petition by landlord under Section 10 on statutory grounds",
        "Appeal before District Judge under Section 20 within 30 days",
        "High Court of Tripura at Agartala"
      ]
    },
    "keywords": [
      "tripura rent control act 1975",
      "agartala rent controller sdm",
      "section 12 water electricity tripura",
      "tripura eviction appeal"
    ]
  },
  {
    "id": "SRC-TEN-2F-UP",
    "title": "Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021 (UP Act No. 16 of 2021)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Uttar Pradesh (enacted adopting the Model Tenancy Act framework): (1) Mandates executed written tenancy agreements and intimation to Rent Authority via the official portal (uprentauthority.in); (2) Caps security deposit to a maximum of 2 months' rent for residential premises and 1 month's rent for non-residential premises under Section 11; (3) Landlord must issue written rent receipts under Section 10; (4) Landlord cannot cut off or withhold essential services (water/electricity/lift) under Section 21; Rent Authority can order immediate restoration with compensation; (5) Landlord entry requires 24 hours prior written notice under Section 17; (6) 3-tier dispute machinery: Rent Authority (ADM/SDM), Rent Court (Civil Judge), and Rent Tribunal (District Judge); (7) Eviction strictly governed under Section 22; self-help lockouts are prohibited.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Uttar Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Uttar Pradesh Government Gazette (Extraordinary), Urban Development Department",
      "official_source_url": "https://uprentauthority.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Urban Development Department / District Rent Authority, Uttar Pradesh",
      "effective_from": "2021-01-11",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021 (U.P. Act No. 16 of 2021), Sections 4, 10, 11, 17, 21, 22, 35, 36"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Authority (Additional District Magistrate / Sub-Divisional Magistrate)",
      "department": "Urban Development Department, Uttar Pradesh",
      "organization": "Office of the Rent Authority, District Collectorate & Rent Tribunal (Noida/Lucknow/Kanpur/Ghaziabad)",
      "portal_url": "https://uprentauthority.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 60,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, lift, sanitation) under Section 21 [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding or receiving security deposit exceeding 2 months rent for residential (1 month for non-residential) under Section 11",
        "Dispossessing tenant without Rent Court eviction order under Section 22 [FORCED_LOCKOUT]",
        "Entry without 24 hours prior notice under Section 17"
      ],
      "required_documents": [
        "Written Tenancy Agreement",
        "Rent Authority Registration ID (uprentauthority.in)",
        "Rent payment proofs / Bank transfers",
        "Electricity/water meter connection details"
      ],
      "escalation_route": [
        "Emergency application to Rent Authority under Section 21 for immediate restoration of cut-off utility (decided within 1 month)",
        "Application to Rent Authority under Section 15 to deposit rent upon landlord refusal",
        "Petition before Rent Court under Section 22 for determination of tenancy or recovery of possession",
        "Appeal before Rent Tribunal (District Judge) under Section 36 within 30 days of Rent Court order"
      ]
    },
    "keywords": [
      "uttar pradesh tenancy act 2021",
      "up model tenancy",
      "noida rent authority",
      "lucknow rent dispute",
      "up 2 months deposit cap",
      "uprentauthority in portal",
      "section 21 utility cutoff up"
    ]
  },
  {
    "id": "SRC-TEN-2F-UK",
    "title": "Uttarakhand Urban Buildings (Regulation of Letting, Rent and Eviction) Framework",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in Uttarakhand: (1) Applicable to all Municipal Corporations (Dehradun, Haridwar, Haldwani, Roorkee) and Municipalities; (2) Standard rent determination under Section 9; (3) Landlord must issue written rent receipts under Section 25; (4) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (contractual lease terms); (5) Severing or withholding essential services (water, electricity, conservancy) is strictly prohibited under Section 26; Rent Control and Eviction Officer (RCEO / SDM) can order immediate restoration and penalize landlord; (6) Eviction strictly regulated under Section 20 before Civil Judge / Small Causes Court on statutory grounds; (7) Appellate Authority: District Judge under Section 22.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Uttarakhand",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Urban Development Department & Judicial Department, Government of Uttarakhand",
      "official_source_url": "https://highcourtofuttarakhand.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Control and Eviction Officer (RCEO / SDM) & District Court, Uttarakhand",
      "effective_from": "2000-11-09",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Uttar Pradesh Urban Buildings (Regulation of Letting, Rent and Eviction) Act, 1972 (as adapted in Uttarakhand), Sections 9, 20, 22, 25, 26"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Control and Eviction Officer (RCEO / Sub-Divisional Magistrate) / District Judge",
      "department": "Urban Development Department / Revenue Department",
      "organization": "Office of the RCEO / SDM & District Judiciary (Dehradun/Nainital/Haridwar)",
      "portal_url": "https://districts.ecourts.gov.in/uttarakhand",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 26 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without civil court decree under Section 20 [FORCED_LOCKOUT]",
        "Refusal to issue rent receipt under Section 25"
      ],
      "required_documents": [
        "Rent Agreement",
        "Rent Receipts / Bank transaction proofs",
        "UPCL electricity bill / Jal Sansthan water bill",
        "Notice copies"
      ],
      "escalation_route": [
        "Emergency application to RCEO / SDM under Section 26 for restoration of cut-off utility",
        "Deposit of rent before Civil Judge under Section 30 if landlord refuses acceptance",
        "Eviction suit by landlord under Section 20 before Civil Judge / Small Causes Court",
        "Appeal before District Judge under Section 22 within 30 days",
        "High Court of Uttarakhand at Nainital"
      ]
    },
    "keywords": [
      "uttarakhand rent control act",
      "dehradun rent dispute",
      "rceo sdm dehradun",
      "section 26 water electricity uttarakhand",
      "uttarakhand eviction section 20"
    ]
  },
  {
    "id": "SRC-TEN-2F-WB",
    "title": "West Bengal Premises Tenancy Act, 1997 (Act No. 37 of 1997, effective 10-07-2001)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in West Bengal: (1) Applicable to Kolkata Municipal Corporation, Howrah, and all urban municipal areas across West Bengal; (2) Exemption: Tenancies where monthly rent exceeds ₹6,500 for residential or ₹10,000 for commercial in Kolkata (₹3,000 / ₹5,000 elsewhere) are governed by Transfer of Property Act, 1882; (3) Landlord cannot claim premium or security deposit exceeding 1 month's rent under Section 5(a) (deposit cap: 1 month); (4) Landlord must issue written rent receipts under Section 21; (5) Cutting off or withholding essential supplies (water, electricity, lift, conservancy) is strictly prohibited under Section 27; Rent Controller can order immediate restoration within 24 hours and impose fine; (6) Eviction strictly governed under Section 6 before Civil Judge / Small Causes Court (Kolkata); (7) Appellate Authority: Chief Judge, Small Causes Court / District Judge under Section 43.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "West Bengal",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Kolkata Gazette (Extraordinary), Land & Land Reforms and Refugee Relief Department",
      "official_source_url": "https://calcuttahighcourt.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Sub-Divisional Officer / Deputy Collector) & Small Causes Court, Kolkata",
      "effective_from": "2001-07-10",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "West Bengal Premises Tenancy Act, 1997 (West Bengal Act No. 37 of 1997), Sections 3, 5, 6, 21, 27, 43"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Sub-Divisional Officer / Deputy Collector) / Chief Judge, Small Causes Court",
      "department": "Land & Land Reforms / Judicial Department",
      "organization": "Office of the Rent Controller & Court of Small Causes, Kolkata / District Judiciary",
      "portal_url": "https://districts.ecourts.gov.in/west-bengal",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 27 [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding or receiving security deposit exceeding 1 month's rent under Section 5(a)",
        "Dispossessing tenant without formal civil court decree under Section 6 [FORCED_LOCKOUT]",
        "Refusal to issue written rent receipts under Section 21"
      ],
      "required_documents": [
        "Tenancy Agreement / Rent Note",
        "Rent payment receipts",
        "CESC electricity bill / KMC water bill",
        "Notice of ejectment copy"
      ],
      "escalation_route": [
        "Urgent application to Rent Controller under Section 27 for immediate restoration of cut-off electricity/water",
        "Deposit of rent before Rent Controller under Section 21/22 if landlord refuses receipt",
        "Suit for eviction by landlord under Section 6 on statutory grounds (arrears, reasonable requirement, subletting)",
        "Appeal before Chief Judge, Small Causes Court / District Judge under Section 43 within 30 days",
        "Revision petition before High Court at Calcutta under Section 115 CPC"
      ]
    },
    "keywords": [
      "west bengal premises tenancy act 1997",
      "kolkata rent controller",
      "wb 1 month deposit cap",
      "section 27 cesc water cutoff kolkata",
      "small causes court kolkata rent",
      "section 6 eviction grounds wb"
    ]
  },
  {
    "id": "SRC-TEN-2F-AN",
    "title": "Andaman and Nicobar Islands Tenancy Framework (General Property Law)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "General property and tenancy framework in UT Andaman and Nicobar Islands: (1) Governed under Chapter V of the Transfer of Property Act, 1882 and Andaman & Nicobar Land Revenue Regulations; (2) Written lease agreement is standard and contractually enforceable; (3) Deposit limit: NOT_SPECIFIED_BY_STATUTE (governed by mutual agreement); (4) Essential services cannot be unlawfully disconnected; (5) Eviction requires statutory 15 days notice for month-to-month leases under Section 106 TP Act followed by civil suit before Civil Judge; self-help lockouts are illegal; (6) Adjudicated by Court of the Civil Judge (Senior/Junior Division) at Port Blair and District Court.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Andaman and Nicobar Islands",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Andaman & Nicobar Administration, Law Department & District Judiciary",
      "official_source_url": "https://andaman.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Civil Courts of Competent Jurisdiction / Deputy Commissioner",
      "effective_from": "1882-07-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Transfer of Property Act, 1882 (Chapter V, Sections 105-116)"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Civil Judge (Senior/Junior Division) / Deputy Commissioner",
      "department": "Judicial Department, A&N Islands",
      "organization": "District Court Complex, Port Blair & Office of Deputy Commissioner",
      "portal_url": "https://districts.ecourts.gov.in/andaman-and-nicobar",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 15,
      "prohibited_actions": [
        "Forcible lockout without civil court eviction decree [FORCED_LOCKOUT]",
        "Malicious utility disconnection [ESSENTIAL_SERVICE_CUTOFF]"
      ],
      "required_documents": [
        "Lease Deed / Rental Agreement",
        "Rent payment proofs",
        "Notice copy under Section 106 TP Act"
      ],
      "escalation_route": [
        "Legal notice under Section 106 Transfer of Property Act",
        "Civil Suit for recovery of possession and rent before Civil Judge, Port Blair",
        "Appeal before District Judge / High Court at Calcutta (Circuit Bench at Port Blair)"
      ]
    },
    "keywords": [
      "andaman tenancy law",
      "port blair rent dispute",
      "transfer of property act andaman",
      "port blair eviction"
    ]
  },
  {
    "id": "SRC-TEN-2F-CH",
    "title": "Chandigarh Tenancy Legal Framework (East Punjab Urban Rent Act & MHA Tenancy Guidance)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "Tenancy legal framework in UT Chandigarh: (1) Adjudicated primarily under the East Punjab Urban Rent Restriction Act, 1949 (as extended to Chandigarh) alongside MHA Model Tenancy policy guidelines; (2) Written lease agreement is standard and contractually enforceable; (3) Security deposit limit: NOT_SPECIFIED_BY_STATUTE under the 1949 Act (governed by lease terms, customary 1-2 months); (4) Landlord cannot cut off or withhold essential services (water/electricity) without just cause under Section 11; Rent Controller can order immediate restoration; (5) Mandatory rent receipts; (6) Eviction strictly governed on statutory grounds under Section 13 before the Court of the Rent Controller (Civil Judge, Sector 43); (7) Appellate Authority: District Judge, Chandigarh under Section 15.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Chandigarh",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Chandigarh Administration, Department of Urban Planning & District Judiciary",
      "official_source_url": "https://chandigarh.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Civil Judge, Sector 43) & District Court, Chandigarh",
      "effective_from": "1949-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "East Punjab Urban Rent Restriction Act, 1949 (as extended to UT Chandigarh), Sections 4, 11, 13, 15"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Civil Judge Junior Division) / District Judge",
      "department": "Judicial Department, Chandigarh",
      "organization": "District Courts Complex, Sector 43, Chandigarh",
      "portal_url": "https://districts.ecourts.gov.in/chandigarh",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 11 [ESSENTIAL_SERVICE_CUTOFF]",
        "Dispossessing tenant without Rent Controller eviction order under Section 13 [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Lease Agreement",
        "Rent payment proofs / Bank transfers",
        "Electricity/water connection bills",
        "Notice copies"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller (Sector 43) under Section 11 for immediate restoration of cut-off utility",
        "Eviction petition before Rent Controller under Section 13 on statutory grounds",
        "Appeal before Appellate Authority (District Judge, Sector 43) under Section 15 within 30 days",
        "Revision petition before High Court of Punjab and Haryana at Chandigarh"
      ]
    },
    "keywords": [
      "chandigarh tenancy law",
      "chandigarh rent controller sector 43",
      "east punjab rent restriction act chandigarh",
      "section 11 water power cutoff chandigarh",
      "chandigarh eviction notice"
    ]
  },
  {
    "id": "SRC-TEN-2F-DNH",
    "title": "Dadra and Nagar Haveli and Daman and Diu Buildings Rent Control Framework",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "Tenancy framework in UT Dadra and Nagar Haveli and Daman and Diu: (1) In Daman and Diu districts: Governed under the Goa, Daman and Diu Buildings (Lease, Rent and Eviction) Control Act, 1968 (Section 14 caps advance rent to max 3 months, Section 20 prohibits utility severance); (2) In Dadra & Nagar Haveli (Silvassa): Governed under general tenancy / Transfer of Property Act, 1882 (deposit NOT_SPECIFIED_BY_STATUTE); (3) Landlord must issue written rent receipts; (4) Eviction strictly requires due process of law / order of Rent Controller or Civil Court; self-help lockouts are prohibited; (5) Appeals lie before District Court / Administrative Authority.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Dadra and Nagar Haveli and Daman and Diu",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "UT Administration of DNH & DD, Law Department & Revenue Administration",
      "official_source_url": "https://daman.nic.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Mamlatdar) & District Court, Daman / Silvassa",
      "effective_from": "1969-10-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Goa, Daman and Diu Buildings (Lease, Rent and Eviction) Control Act, 1968 & Transfer of Property Act, 1882"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Mamlatdar / Dy Collector) / District Judge",
      "department": "Revenue / Judicial Department",
      "organization": "Office of the Mamlatdar & District Court Complex (Silvassa/Daman)",
      "portal_url": "https://districts.ecourts.gov.in/daman-and-diu",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water/electricity) [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding deposit exceeding 3 months rent",
        "Forcible lockout without court order [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Tenancy Agreement",
        "Rent payment proofs",
        "Notice copies"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller (Mamlatdar) for restoration of cut-off utility",
        "Eviction petition before Rent Controller",
        "Appeal before District Judge / High Court of Judicature at Bombay"
      ]
    },
    "keywords": [
      "dnh dd rent control",
      "silvassa tenant rights",
      "daman rent controller mamlatdar",
      "daman eviction dispute"
    ]
  },
  {
    "id": "SRC-TEN-2F-DL",
    "title": "Delhi Rent Control Act, 1958 (Act No. 59 of 1958) & General Property Law Framework",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "Tenancy legal framework in NCT of Delhi: (1) Dual regime: Premises rented at monthly rent <= ₹3,500 are protected under the Delhi Rent Control Act, 1958 (DRC Act); premises rented at > ₹3,500/month are governed by the Transfer of Property Act, 1882 and contract terms under Section 3(c); (2) DRC Act premises: Landlord cannot cut off essential services (water/electricity) under Section 45; Rent Controller can order immediate restoration and impose heavy fine; (3) Landlord must issue rent receipts under Section 26; (4) DRC Act eviction strictly governed under Section 14 before the Rent Controller / Additional Rent Controller (ARC); (5) For rent > ₹3,500/month: Landlord must serve 15-day termination notice under Section 106 TP Act followed by a civil suit for possession before Civil Judge / District Court; self-help lockouts are strictly illegal; (6) Deposit limit: NOT_SPECIFIED_BY_STATUTE (customarily 1-2 months, contractually determined).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Delhi",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Ministry of Law and Justice / Delhi District Courts & High Court of Delhi",
      "official_source_url": "https://delhidistrictcourts.nic.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller / Additional Rent Controller (ARC) & Civil Courts, Delhi",
      "effective_from": "1959-02-09",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Delhi Rent Control Act, 1958 (Act No. 59 of 1958), Sections 3(c), 14, 26, 38, 45 & Transfer of Property Act, 1882"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller / Additional Rent Controller (ARC) / Civil Judge / District Judge",
      "department": "Judicial Department, Delhi",
      "organization": "Delhi District Courts (Tis Hazari, Saket, Patiala House, Karkardooma, Rohini, Dwarka, Rouse Avenue)",
      "portal_url": "https://delhidistrictcourts.nic.in",
      "filing_modes": [
        "ONLINE",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding essential supplies (water, electricity, passage) under Section 45 DRC Act [ESSENTIAL_SERVICE_CUTOFF]",
        "Dispossessing tenant without an eviction order from Rent Controller or Civil Court decree [FORCED_LOCKOUT]",
        "Refusal to issue written rent receipt under Section 26"
      ],
      "required_documents": [
        "Rent Agreement (Registered / Notarized)",
        "Rent payment receipts / Bank transaction records",
        "BSES (Rajdhani/Yamuna) / TPDDL electricity bill / DJB water bill",
        "Legal notice / Eviction notice copy"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller (ARC) under Section 45 for immediate restoration of cut-off utility (decided within 24-48 hours)",
        "Application to Rent Controller under Section 27 to deposit rent if landlord refuses acceptance",
        "Eviction petition by landlord under Section 14 (for rent <= ₹3,500) before ARC or Civil Suit (for rent > ₹3,500) before Civil Judge",
        "Appeal before Rent Control Tribunal (District Judge) under Section 38 within 30 days",
        "Revision / Civil appeal before High Court of Delhi under Section 25B(8) or Section 115 CPC"
      ]
    },
    "keywords": [
      "delhi rent control act 1958",
      "section 45 bses djb cutoff delhi",
      "rent above 3500 transfer of property act delhi",
      "additional rent controller tis hazari saket",
      "delhi eviction notice section 14",
      "delhi security deposit refund"
    ]
  },
  {
    "id": "SRC-TEN-2F-JK",
    "title": "Jammu and Kashmir Houses and Shops Rent Control Act, 1966 & Tenancy Framework",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State tenancy legislation in UT Jammu and Kashmir: (1) Applicable to Municipal Corporations (Srinagar, Jammu) and notified urban areas; (2) Fair rent determination under Section 8; (3) Landlord must issue written rent receipts under Section 14; (4) Security deposit limit: NOT_SPECIFIED_BY_STATUTE (governed by contractual lease terms); (5) Disconnection of essential services (water, electricity, sanitation) without reasonable cause is prohibited under Section 28; Rent Controller can order immediate restoration and impose fine; (6) Eviction strictly governed under Section 11 before the Rent Controller (Munsiff / Sub-Judge); (7) Appellate Authority: District Judge under Section 21.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Jammu and Kashmir",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Law, Justice and Parliamentary Affairs & High Court of J&K and Ladakh",
      "official_source_url": "https://jkhighcourt.nic.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Munsiff / Sub-Judge) & District Court, J&K",
      "effective_from": "1966-04-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Jammu and Kashmir Houses and Shops Rent Control Act, 1966 (Act No. XXXIV of 1966), Sections 8, 11, 14, 21, 28"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Munsiff / Sub-Judge) / District Judge",
      "department": "Judicial Department, J&K",
      "organization": "Court of the Rent Controller, District Court Complex (Srinagar/Jammu)",
      "portal_url": "https://districts.ecourts.gov.in/jk",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 28 [ESSENTIAL_SERVICE_CUTOFF]",
        "Forcible lockout without Rent Controller eviction decree under Section 11 [FORCED_LOCKOUT]",
        "Refusal to give written rent receipt under Section 14"
      ],
      "required_documents": [
        "Rent Agreement",
        "Rent payment proofs",
        "JPDCL / KPDCL electricity bills / Jal Shakti water bills",
        "Notice copies"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller (Munsiff) under Section 28 for restoration of cut-off utility",
        "Deposit of rent before Rent Controller under Section 14 upon landlord refusal",
        "Eviction petition by landlord under Section 11 on statutory grounds (arrears, bona fide personal requirement, rebuilding)",
        "Appeal before District Judge under Section 21 within 30 days",
        "Revision petition before High Court of Jammu & Kashmir and Ladakh"
      ]
    },
    "keywords": [
      "jk rent control act 1966",
      "srinagar rent controller",
      "jammu tenant rights",
      "section 28 water electricity jk",
      "jk eviction appeal"
    ]
  },
  {
    "id": "SRC-TEN-2F-LA",
    "title": "Ladakh Tenancy Legal Framework (General Property Law & Urban Regulations)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "Tenancy framework in UT Ladakh: (1) Applicable across Leh and Kargil urban municipal areas under Chapter V of Transfer of Property Act, 1882 and local urban administration; (2) Written agreement is standard and contractually enforceable; (3) Deposit limit: NOT_SPECIFIED_BY_STATUTE (customary 1-3 months); (4) Essential electricity and water heating/supply cannot be arbitrarily cut off; (5) Eviction requires statutory 15 days notice for month-to-month leases under Section 106 TP Act followed by civil suit; self-help lockouts are prohibited; (6) Adjudicated by Court of the Principal District & Sessions Judge / Munsiff (Leh/Kargil).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Ladakh",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administration of Union Territory of Ladakh, Department of Law & Justice",
      "official_source_url": "https://ladakh.nic.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Principal District Judge / Munsiff (Leh/Kargil)",
      "effective_from": "1882-07-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Transfer of Property Act, 1882 (Chapter V, Sections 105-116) & Ladakh Reorganisation Laws"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Principal District Judge / Munsiff / Deputy Commissioner",
      "department": "Department of Law & Justice, UT Ladakh",
      "organization": "District Court Complex, Leh & Kargil",
      "portal_url": "https://districts.ecourts.gov.in/ladakh",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 15,
      "prohibited_actions": [
        "Physical lockout or forcible dispossession without civil court decree [FORCED_LOCKOUT]",
        "Malicious utility disconnection [ESSENTIAL_SERVICE_CUTOFF]"
      ],
      "required_documents": [
        "Lease Deed / Tenancy Agreement",
        "Rent payment proofs",
        "Notice copy under Section 106 TP Act"
      ],
      "escalation_route": [
        "Mediation before local municipal/revenue authorities",
        "Statutory 15-day termination notice under Section 106 TP Act",
        "Civil Suit for recovery of possession before Munsiff / Principal District Judge",
        "Appeal before High Court of Jammu & Kashmir and Ladakh (Circuit at Leh/Srinagar)"
      ]
    },
    "keywords": [
      "ladakh tenancy law",
      "leh rent dispute",
      "kargil tenant rights",
      "transfer of property act ladakh",
      "leh civil court eviction"
    ]
  },
  {
    "id": "SRC-TEN-2F-LK",
    "title": "Lakshadweep Tenancy Legal Framework (General Property Law & Island Regulations)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "Tenancy framework in UT Lakshadweep: (1) Governed under Chapter V of Transfer of Property Act, 1882 and Lakshadweep Land Revenue Regulations; (2) Written agreements are contractually enforceable; (3) Deposit limit: NOT_SPECIFIED_BY_STATUTE; (4) Essential utility disruption is prohibited; (5) Eviction requires statutory notice under Section 106 TP Act followed by civil proceedings before Sub-Divisional Magistrate / Civil Judge at Kavaratti; (6) Adjudicated by Sub-Divisional Magistrate / Subordinate Judge (Kavaratti/Amini).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Lakshadweep",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administration of Union Territory of Lakshadweep, Department of Law",
      "official_source_url": "https://lakshadweep.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Sub-Divisional Magistrate / Subordinate Judge, Kavaratti",
      "effective_from": "1882-07-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Transfer of Property Act, 1882 (Chapter V, Sections 105-116)"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Subordinate Judge / Sub-Divisional Magistrate (Kavaratti)",
      "department": "Department of Law, UT Lakshadweep",
      "organization": "District & Sessions Court / Sub-Divisional Office, Kavaratti",
      "portal_url": "https://districts.ecourts.gov.in/lakshadweep",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 15,
      "prohibited_actions": [
        "Physical lockout or forcible dispossession [FORCED_LOCKOUT]",
        "Arbitrary disruption of electricity or water [ESSENTIAL_SERVICE_CUTOFF]"
      ],
      "required_documents": [
        "Tenancy Agreement",
        "Rent Receipts",
        "Notice copy"
      ],
      "escalation_route": [
        "Statutory notice under Section 106 TP Act",
        "Civil Suit before Subordinate Judge, Kavaratti",
        "Appeal before District Court / High Court of Kerala at Ernakulam"
      ]
    },
    "keywords": [
      "lakshadweep tenancy law",
      "kavaratti rent dispute",
      "subordinate judge kavaratti",
      "transfer of property act lakshadweep"
    ]
  },
  {
    "id": "SRC-TEN-2F-PY",
    "title": "Pondicherry Buildings (Lease and Rent Control) Act, 1969 (Act No. 5 of 1969)",
    "domain": "TENANT_RIGHTS",
    "subdomain": "2F_STATE_SPECIFIC_LAW",
    "summary": "State legislation governing tenancy in UT Puducherry: (1) Applicable to all urban municipal areas across Puducherry, Karaikal, Mahe, and Yanam; (2) Fair rent determination under Section 4; (3) Landlord must issue written rent receipts under Section 8; (4) Landlord cannot claim or receive advance/deposit exceeding 1 month's rent under Section 6 (deposit cap: 1 month); (5) Disconnection of essential services (water/electricity/sanitation) without reasonable cause is strictly barred under Section 14; Rent Controller can order immediate restoration; (6) Eviction strictly governed under Section 10 before the Rent Controller (Principal Subordinate Judge / Munsif); (7) Appellate Authority: District Judge under Section 23.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Puducherry",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Law Department & Local Administration Department, Government of Puducherry",
      "official_source_url": "https://py.gov.in",
      "source_type": "ACT_GAZETTE_RULES",
      "administering_authority": "Rent Controller (Principal Subordinate Judge / Munsif) & District Court, Puducherry",
      "effective_from": "1969-08-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 1,
      "legal_basis": "Pondicherry Buildings (Lease and Rent Control) Act, 1969 (Act No. 5 of 1969), Sections 4, 6, 8, 10, 14, 23"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Rent Controller (Principal Subordinate Judge / Munsif) / District Judge",
      "department": "Judicial Department, Puducherry",
      "organization": "Court of the Rent Controller, District Court Complex (Puducherry/Karaikal)",
      "portal_url": "https://districts.ecourts.gov.in/puducherry",
      "filing_modes": [
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "prohibited_actions": [
        "Cutting off or withholding water or electricity supply under Section 14 [ESSENTIAL_SERVICE_CUTOFF]",
        "Demanding or receiving advance deposit exceeding 1 month's rent under Section 6",
        "Dispossessing tenant without Rent Controller eviction order under Section 10 [FORCED_LOCKOUT]"
      ],
      "required_documents": [
        "Lease Deed / Rental Agreement",
        "Rent Receipts / Bank transaction proofs",
        "Electricity Department / PWD water bill",
        "Notice copy"
      ],
      "escalation_route": [
        "Emergency application to Rent Controller under Section 14 for immediate restoration of cut-off utility",
        "Deposit of rent before Rent Controller under Section 8 if landlord refuses receipt",
        "Eviction petition by landlord under Section 10 on statutory grounds (arrears, personal occupation, subletting)",
        "Appeal before Appellate Authority (District Judge) under Section 23 within 30 days",
        "Revision petition before High Court of Judicature at Madras"
      ]
    },
    "keywords": [
      "puducherry rent control act 1969",
      "pondicherry rent controller",
      "puducherry 1 month deposit cap",
      "section 14 water electricity puducherry",
      "puducherry eviction section 10"
    ]
  }
];
