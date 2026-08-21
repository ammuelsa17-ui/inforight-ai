import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 3F: India-Wide State/UT & Local Authority RTI Directory (All 28 States, 8 UTs & Municipal Authorities)
 * Grounded in State RTI Rules, State Information Commissions (SICs),
 * Central Information Commission (CIC), and official State Online RTI Portals.
 * 
 * CRITICAL RULE: State Government RTIs must NEVER be directed to the
 * Central portal (rtionline.gov.in). They must route to respective State portals
 * or physical/postal SPIOs.
 */
export const RTI_STATE_SOURCES: VerifiedSourceRecord[] = [
  {
    "id": "SRC-RTI-3F-AP",
    "title": "Andhra Pradesh Right to Information Rules & AP State Information Commission (APSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI framework in Andhra Pradesh: (1) Application fee of ₹10 payable via Court Fee Stamp, Indian Postal Order (IPO), Demand Draft, or Treasury Challan (Head of Account: 0070-60-118-00-01-001-000-NV); (2) Copying charges of ₹2 per page for A4/A3 paper; (3) Below Poverty Line (BPL) applicants exempt from application and copying fees under Section 7(5); (4) First Appeal lies to the designated departmental First Appellate Authority (FAA) within 30 days; (5) Second Appeal / Complaint lies before the Andhra Pradesh Information Commission (APSIC), Dr. B.R. Ambedkar Bhavan, Mangalagiri / Vijayawada within 90 days.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Andhra Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Andhra Pradesh & APSIC",
      "official_source_url": "https://apsic.ap.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Andhra Pradesh State Information Commission (APSIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Andhra Pradesh Right to Information Rules, 2005 (G.O.Ms.No. 454, G.A. (I&PR.II) Dept.)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Andhra Pradesh Information Commission (APSIC)",
      "office_address": "Dr. B.R. Ambedkar Bhavan, Tadepalli, Mangalagiri, Guntur District, Andhra Pradesh - 522501",
      "portal_url": "https://apsic.ap.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://apsic.ap.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, DD, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Andhra Pradesh Government Department / GVMC / VMC / District Collectorate",
        "First Appellate Authority (FAA) of the respective department within 30 days",
        "Second Appeal to Andhra Pradesh Information Commission (APSIC), Mangalagiri within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "andhra pradesh rti",
      "apsic mangalagiri",
      "ap rti court fee stamp 10",
      "gvmc rti pio",
      "ap first appeal"
    ]
  },
  {
    "id": "SRC-RTI-3F-AR",
    "title": "Arunachal Pradesh Right to Information Rules & State Information Commission (APIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Arunachal Pradesh: (1) Application fee of ₹10 payable via Treasury Challan, IPO, or Court Fee Stamp; (2) Copying fee of ₹2 per page; (3) BPL cardholders exempt from fees; (4) First Appeal to departmental FAA within 30 days; (5) Second Appeal to Arunachal Pradesh Information Commission (APIC), Information Bhawan, Itanagar within 90 days.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Arunachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of Arunachal Pradesh & APIC",
      "official_source_url": "https://apic.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Arunachal Pradesh Information Commission (APIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Arunachal Pradesh Right to Information Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Registrar",
      "organization": "Arunachal Pradesh Information Commission (APIC)",
      "office_address": "Information Bhawan, Sector-E, Itanagar - 791111",
      "portal_url": "https://apic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://apic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Treasury Challan, IPO, or Court fee stamp (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Arunachal Pradesh Department / District Administration (DC Office)",
        "First Appellate Authority within 30 days",
        "Second Appeal to Arunachal Pradesh Information Commission (APIC), Itanagar within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "arunachal pradesh rti",
      "apic itanagar",
      "itanagar pio rti",
      "arunachal rti rules"
    ]
  },
  {
    "id": "SRC-RTI-3F-AS",
    "title": "Assam Right to Information Rules & Assam State Information Commission (ASIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Assam: (1) Application fee of ₹10 payable via Court Fee Stamp, IPO, Treasury Challan, or online gateway on rtionline.assam.gov.in; (2) Copying fee of ₹2 per page; (3) BPL fee waiver applicable; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Assam State Information Commission (ASIC), Silpagram Road, Jonaki Path, Panjabari, Guwahati - 781037.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Assam",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms and Training Department, Government of Assam & ASIC",
      "official_source_url": "https://asic.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Assam State Information Commission (ASIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Assam Right to Information Rules, 2005 (Notification No. AR. 27/2005/3)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Assam State Information Commission (ASIC)",
      "office_address": "Silpagram Road, Jonaki Path, Panjabari, Guwahati - 781037",
      "portal_url": "https://rtionline.assam.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.assam.gov.in",
      "first_appeal_portal": "https://rtionline.assam.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://asic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, Treasury Challan, or online on rtionline.assam.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Assam Department / GMC / District Administration",
        "First Appellate Authority within 30 days",
        "Second Appeal to Assam State Information Commission (ASIC), Guwahati within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "assam rti online",
      "rtionline assam gov in",
      "asic panjabari guwahati",
      "gmc guwahati rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-BR",
    "title": "Bihar Right to Information Rules (Jaankari) & Bihar State Information Commission (BSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Bihar: (1) Application fee of ₹10 payable via IPO, Demand Draft, Non-judicial stamp, or telephonic Jaankari Call Centre (155311); (2) Copying fee of ₹2 per page; (3) BPL cardholders exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Bihar State Information Commission (BSIC), Suchna Bhawan, Bailey Road, Patna - 800015.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Bihar",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Bihar & BSIC",
      "official_source_url": "https://sic.bihar.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Bihar State Information Commission (BSIC)",
      "effective_from": "2006-03-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Bihar Right to Information Rules, 2006 (Jaankari Model)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Bihar State Information Commission (BSIC)",
      "office_address": "Suchna Bhawan, Jawaharlal Nehru Marg (Bailey Road), Patna - 800015",
      "portal_url": "https://jaankari.bihar.gov.in",
      "helpline_number": "155311 / 0612-2217016",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://jaankari.bihar.gov.in",
      "first_appeal_portal": "https://jaankari.bihar.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://sic.bihar.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO, DD, Non-judicial stamp, or Jaankari facilitation",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Bihar Department / Patna Municipal Corporation / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Bihar State Information Commission (BSIC), Patna within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "bihar rti jaankari",
      "jaankari bihar gov in",
      "bsic suchna bhawan patna",
      "patna municipal rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-CG",
    "title": "Chhattisgarh Right to Information Rules & CG State Information Commission (CGSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Chhattisgarh: (1) Application fee of ₹10 payable via Non-Judicial Stamp, IPO, DD, or online gateway on rtionline.cg.nic.in; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to designated FAA; (5) Second Appeal / Complaint to Chhattisgarh State Information Commission, Sector 19, North Block, Nava Raipur, Atal Nagar - 492002.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Chhattisgarh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Chhattisgarh & CGSIC",
      "official_source_url": "https://sic.cg.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Chhattisgarh State Information Commission (CGSIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Chhattisgarh Right to Information Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Chhattisgarh State Information Commission (CGSIC)",
      "office_address": "Sector 19, North Block, Nava Raipur, Atal Nagar, Raipur - 492002",
      "portal_url": "https://rtionline.cg.nic.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.cg.nic.in",
      "first_appeal_portal": "https://rtionline.cg.nic.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://sic.cg.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Non-judicial stamp, IPO, DD, or online on rtionline.cg.nic.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of CG Department / Raipur Municipal Corporation / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Chhattisgarh State Information Commission (CGSIC), Nava Raipur within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "chhattisgarh rti online",
      "rtionline cg nic in",
      "cgsic nava raipur",
      "raipur municipal corporation rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-GA",
    "title": "Goa Right to Information Rules & Goa State Information Commission (GSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Goa: (1) Application fee of ₹10 payable via Court Fee Stamp, Treasury Challan, Cash, or online via Goa Online portal; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Goa State Information Commission (GSIC), 7th Floor, Kamat Towers, Patto, Panaji - 403001.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Goa",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of Goa & GSIC",
      "official_source_url": "https://gsic.goa.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Goa State Information Commission (GSIC)",
      "effective_from": "2006-03-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Goa Right to Information Rules, 2006 (Notification No. 10/1/2005-AR)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Goa State Information Commission (GSIC)",
      "office_address": "7th Floor, Kamat Towers, Patto Plaza, Panaji, Goa - 403001",
      "portal_url": "https://goaonline.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://goaonline.gov.in",
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://gsic.goa.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, Treasury Challan, or online on goaonline.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Goa Department / CCP Panaji / Collectorate (North/South Goa)",
        "First Appellate Authority within 30 days",
        "Second Appeal to Goa State Information Commission (GSIC), Panaji within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "goa rti online",
      "gsic panaji patto",
      "goa court fee stamp 10",
      "panaji corporation rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-GJ",
    "title": "Gujarat Right to Information Rules & Gujarat Information Commission (GIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Gujarat: (1) Application fee of ₹20 payable via Court Fee Stamp, IPO, Demand Draft, Non-judicial stamp, or online on the Gujarat RTI Online Portal (rtionline.gujarat.gov.in); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Gujarat Information Commission (GIC), Karmayogi Bhavan, Block 1, Sector 10A, Gandhinagar - 382010.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Gujarat",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Gujarat & GIC",
      "official_source_url": "https://gic.gujarat.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Gujarat Information Commission (GIC)",
      "effective_from": "2010-03-22",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Gujarat Right to Information Rules, 2010 (Notification No. GS/2010/8/RTI/102008/1199/ARTD)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Gujarat Information Commission (GIC)",
      "office_address": "Karmayogi Bhavan, Block 1, 6th Floor, Sector 10A, Gandhinagar - 382010",
      "portal_url": "https://rtionline.gujarat.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.gujarat.gov.in",
      "first_appeal_portal": "https://rtionline.gujarat.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://gic.gujarat.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹20 via Court Fee Stamp, IPO, DD, or online gateway on rtionline.gujarat.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Gujarat Department / AMC Ahmedabad / SMC Surat / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Gujarat Information Commission (GIC), Gandhinagar within 90 days"
      ],
      "application_fee_amount": 20,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "gujarat rti online",
      "rtionline gujarat gov in",
      "gic gandhinagar karmayogi bhavan",
      "amc rti pio",
      "gujarat 20 rupees rti fee"
    ]
  },
  {
    "id": "SRC-RTI-3F-HR",
    "title": "Haryana Right to Information Rules & State Information Commission Haryana",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Haryana: (1) Application fee of ₹10 (under Haryana Right to Information Rules, 2009 as amended in 2016) payable via IPO, Treasury Challan, Demand Draft, or online on the Haryana RTI Portal (rtiharyana.gov.in); (2) Copying fee of ₹2 per page for A4/A3; (3) Inspection: first hour free, ₹5 per subsequent hour or fraction thereof; (4) BPL applicants exempt under Section 7(5); (5) First Appeal to departmental FAA within 30 days (also available online); (6) Second Appeal / Complaint lies before State Information Commission Haryana, SCO 70-71, Sector 8-C, Chandigarh within 90 days.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Haryana",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of Haryana & SIC Haryana",
      "official_source_url": "https://cicharyana.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "State Information Commission Haryana",
      "effective_from": "2009-10-28",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Haryana Right to Information Rules, 2009 as amended by Haryana RTI (Amendment) Rules, 2016 (Notification No. G.S.R. 24/C.A. 22/2005/S. 27/2016 dt. 20-10-2016)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "State Information Commission Haryana",
      "office_address": "SCO No. 70-71, Sector 8-C, Madhya Marg, Chandigarh - 160009",
      "portal_url": "https://rtiharyana.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtiharyana.gov.in",
      "first_appeal_portal": "https://rtiharyana.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://cicharyana.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO, Treasury Challan, DD, or online on rtiharyana.gov.in (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Haryana Department / MCG Gurugram / MCF Faridabad / District Administration",
        "First Appellate Authority within 30 days",
        "Second Appeal to State Information Commission Haryana, Sector 8-C, Chandigarh within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "haryana rti online",
      "rtiharyana gov in",
      "cicharyana chandigarh",
      "mcg gurugram rti",
      "haryana 10 rupees rti fee",
      "haryana rti amendment 2016"
    ]
  },
  {
    "id": "SRC-RTI-3F-HP",
    "title": "Himachal Pradesh Right to Information Rules & HP State Information Commission",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Himachal Pradesh: (1) Application fee of ₹10 payable via IPO, Court Fee Stamp, Demand Draft, or online gateway on rtionline.hp.gov.in; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to HP State Information Commission, Keonthal Complex, Khalini, Shimla - 171002.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Himachal Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of Himachal Pradesh & HPSIC",
      "official_source_url": "https://hp.gov.in/sic",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Himachal Pradesh State Information Commission",
      "effective_from": "2006-01-21",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Himachal Pradesh Right to Information Rules, 2006"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "HP State Information Commission",
      "office_address": "Keonthal Commercial Complex, Khalini, Shimla - 171002",
      "portal_url": "https://rtionline.hp.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.hp.gov.in",
      "first_appeal_portal": "https://rtionline.hp.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://hp.gov.in/sic"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, DD, or online on rtionline.hp.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of HP Department / Shimla Municipal Corporation / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to HP State Information Commission, Shimla within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "himachal pradesh rti online",
      "rtionline hp gov in",
      "hpsic khalini shimla",
      "shimla municipal rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-JH",
    "title": "Jharkhand Right to Information Rules & State Information Commission (JSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Jharkhand: (1) Application fee of ₹10 payable via IPO, Demand Draft, or Treasury Challan; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Jharkhand State Information Commission (JSIC), Engineers' Hostel, HEC Campus, Dhurwa, Ranchi - 834004.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Jharkhand",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Personnel, Administrative Reforms and Rajbhasha, Government of Jharkhand & JSIC",
      "official_source_url": "https://jharkhand.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Jharkhand State Information Commission (JSIC)",
      "effective_from": "2007-06-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Jharkhand Right to Information Rules, 2007"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Jharkhand State Information Commission (JSIC)",
      "office_address": "Engineers' Hostel No. 2, HEC Campus, Dhurwa, Ranchi - 834004",
      "portal_url": "https://jharkhand.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://jharkhand.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO, DD, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Jharkhand Department / Ranchi Municipal Corporation / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Jharkhand State Information Commission (JSIC), Ranchi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "jharkhand rti",
      "jsic dhurwa ranchi",
      "ranchi municipal corporation rti",
      "jharkhand rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-KA",
    "title": "Karnataka Right to Information Rules & Karnataka Information Commission (KIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Karnataka: (1) Application fee of ₹10 payable via Court fee stamp, IPO, DD, or online on the Karnataka RTI Online portal (rtionline.karnataka.gov.in); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt under Section 7(5); (4) First Appeal to designated departmental FAA; (5) Second Appeal / Complaint to Karnataka Information Commission (KIC), Mahithi Soudha, Devraj Urs Road, Bengaluru - 560001.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Karnataka",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Personnel and Administrative Reforms (DPAR), Government of Karnataka & KIC",
      "official_source_url": "https://kic.karnataka.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Karnataka Information Commission (KIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Karnataka Right to Information Rules, 2005 (Notification No. DPAR 13 RTI 2005)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Karnataka Information Commission (KIC)",
      "office_address": "Mahithi Soudha, Devraj Urs Road, Opp. Vidhana Soudha, Bengaluru - 560001",
      "portal_url": "https://rtionline.karnataka.gov.in",
      "helpline_number": "080-22370000",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.karnataka.gov.in",
      "first_appeal_portal": "https://rtionline.karnataka.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://kic.karnataka.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, DD, or Online Payment on rtionline.karnataka.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Karnataka Department / BBMP / District Administration",
        "First Appellate Authority within 30 days",
        "Second Appeal to Karnataka Information Commission (KIC), Bengaluru within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "karnataka information commission kic",
      "rtionline karnataka gov in",
      "bbmp rti pio",
      "mahithi soudha bengaluru rti",
      "dpar karnataka rti rules"
    ]
  },
  {
    "id": "SRC-RTI-3F-KL",
    "title": "Kerala Right to Information Rules & Kerala State Information Commission (SIC Kerala)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Kerala: (1) Application fee of ₹10 payable via Court Fee Stamp, Treasury Challan (Head of Account: 0070-60-118-99-Receipts under RTI Act), IPO, or Demand Draft; (2) Copying fee of ₹2 per page; (3) BPL cardholders exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Kerala State Information Commission, Punnen Road, Thiruvananthapuram - 695039.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Kerala",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Personnel and Administrative Reforms Department, Government of Kerala & SIC Kerala",
      "official_source_url": "https://sic.kerala.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Kerala State Information Commission",
      "effective_from": "2006-05-10",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Kerala Right to Information (Fee and Cost) Rules, 2006 (G.O.(P) No. 180/2006/GAD)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Kerala State Information Commission",
      "office_address": "Punnen Road, Thiruvananthapuram - 695039",
      "portal_url": "https://sic.kerala.gov.in",
      "helpline_number": "0471-2335199",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://sic.kerala.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, Treasury Challan (Head 0070), IPO, or DD (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Kerala Department / Corporation (KMC/TMC) / Grama Panchayat",
        "First Appellate Authority within 30 days",
        "Second Appeal to Kerala State Information Commission, Thiruvananthapuram within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "kerala rti rules",
      "sic kerala thiruvananthapuram",
      "kerala rti treasury chalan 0070",
      "kochi corporation rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-MP",
    "title": "Madhya Pradesh Right to Information Rules & State Information Commission (MPSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Madhya Pradesh: (1) Application fee of ₹10 payable via Non-Judicial Stamp, IPO, Treasury Challan, or online gateway on rtionline.mp.gov.in; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to MP State Information Commission (MPSIC), Suchna Bhawan, 35-B Arera Hills, Bhopal - 462011.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Madhya Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Madhya Pradesh & MPSIC",
      "official_source_url": "https://mpsic.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Madhya Pradesh State Information Commission (MPSIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Madhya Pradesh Right to Information (Fees and Appeal) Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "MP State Information Commission (MPSIC)",
      "office_address": "Suchna Bhawan, 35-B Arera Hills, Bhopal - 462011",
      "portal_url": "https://mpsic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://mpsic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Non-judicial stamp, IPO, Treasury Challan, or online on rtionline.mp.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of MP Department / Nagar Nigam (Bhopal/Indore/Jabalpur) / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to MP State Information Commission, Bhopal within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "madhya pradesh rti online",
      "rtionline mp gov in",
      "mpsic bhopal arera hills",
      "bhopal indore municipal rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-MH",
    "title": "Maharashtra Right to Information Rules & State Information Commission (SIC Maharashtra)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Maharashtra: (1) Application fee of ₹10 payable via Court fee stamp, Indian Postal Order, Demand Draft, or online on the Maharashtra RTI Online Portal (rtionline.maharashtra.gov.in); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to State Information Commission Maharashtra (benches at Mumbai, Pune, Nagpur, Nashik, Amravati, Aurangabad, Konkan).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Maharashtra",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Maharashtra & SIC Maharashtra",
      "official_source_url": "https://sic.maharashtra.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "State Information Commission, Maharashtra / General Administration Department",
      "effective_from": "2005-10-11",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Maharashtra Right to Information Rules, 2005 (Notification No. RTI. 2005/C.R. 315/05/5)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "State Information Commission, Maharashtra",
      "office_address": "13th Floor, New Administrative Building, Madam Cama Road, Mantralaya, Mumbai - 400032",
      "portal_url": "https://rtionline.maharashtra.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.maharashtra.gov.in",
      "first_appeal_portal": "https://rtionline.maharashtra.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://sic.maharashtra.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, DD, or online gateway on rtionline.maharashtra.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Maharashtra Department / Municipal Corporation (BMC/PMC/PCMC)",
        "First Appellate Authority (FAA) within 30 days",
        "Second Appeal to State Information Commission (SIC), Mantralaya, Mumbai within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "maharashtra rti online",
      "rtionline maharashtra gov in",
      "sic maharashtra mantralaya mumbai",
      "bmc rti pio",
      "pune corporation rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-MN",
    "title": "Manipur Right to Information Rules & Manipur Information Commission (MIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Manipur: (1) Application fee of ₹10 payable via Court fee stamp, IPO, or Treasury Challan; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Manipur Information Commission (MIC), Officers' Colony, Babupara, Imphal - 795001.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Manipur",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of Manipur & MIC",
      "official_source_url": "https://mic.manipur.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Manipur Information Commission (MIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Manipur Right to Information Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Manipur Information Commission (MIC)",
      "office_address": "Officers' Colony, Babupara, Imphal - 795001",
      "portal_url": "https://mic.manipur.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://mic.manipur.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Manipur Department / Imphal Municipal Corporation / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Manipur Information Commission (MIC), Imphal within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "manipur rti",
      "mic imphal babupara",
      "imphal municipal rti",
      "manipur rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-ML",
    "title": "Meghalaya Right to Information Rules & State Information Commission (MSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Meghalaya: (1) Application fee of ₹10 payable via Court fee stamp, IPO, or Treasury Challan; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Meghalaya State Information Commission (MSIC), Lower Lachumiere, Shillong - 793001.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Meghalaya",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Personnel & Administrative Reforms Department, Government of Meghalaya & MSIC",
      "official_source_url": "https://megsic.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Meghalaya State Information Commission (MSIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Meghalaya Right to Information Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Meghalaya State Information Commission (MSIC)",
      "office_address": "Lower Lachumiere, Temple Road, Shillong - 793001",
      "portal_url": "https://megsic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://megsic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Meghalaya Department / Shillong Municipal Board / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Meghalaya State Information Commission (MSIC), Shillong within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "meghalaya rti",
      "msic shillong",
      "shillong municipal rti",
      "meghalaya rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-MZ",
    "title": "Mizoram Right to Information Rules & Mizoram Information Commission (MIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Mizoram: (1) Application fee of ₹10 payable via Treasury Challan, IPO, or Cash at counter; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Mizoram Information Commission (MIC), Mizoram Secretariat Complex, Khatla, Aizawl - 796001.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Mizoram",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Information & Public Relations Department, Government of Mizoram & MIC",
      "official_source_url": "https://mic.mizoram.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Mizoram Information Commission (MIC)",
      "effective_from": "2010-09-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Mizoram Right to Information Rules, 2010"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Mizoram Information Commission (MIC)",
      "office_address": "Mizoram Secretariat Complex, Block-C, Khatla, Aizawl - 796001",
      "portal_url": "https://mic.mizoram.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://mic.mizoram.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Treasury Challan, IPO, or Cash (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Mizoram Department / Aizawl Municipal Corporation / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Mizoram Information Commission (MIC), Aizawl within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "mizoram rti",
      "mic aizawl khatla",
      "aizawl municipal corporation rti",
      "mizoram rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-NL",
    "title": "Nagaland Right to Information Rules & Nagaland Information Commission (NIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Nagaland: (1) Application fee of ₹10 payable via Treasury Challan, IPO, or Cash; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Nagaland Information Commission (NIC), Old CM Bungalow, Kohima - 797001.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Nagaland",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Personnel and Administrative Reforms Department, Government of Nagaland & NIC",
      "official_source_url": "https://nlsic.nagaland.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Nagaland Information Commission (NIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Nagaland Right to Information Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Nagaland Information Commission (NIC)",
      "office_address": "Old CM Bungalow, Officers' Hill, Kohima - 797001",
      "portal_url": "https://nlsic.nagaland.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://nlsic.nagaland.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Treasury Challan, IPO, or Cash (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Nagaland Department / Kohima / Dimapur Municipal Council / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Nagaland Information Commission (NIC), Kohima within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "nagaland rti",
      "nlsic kohima",
      "dimapur municipal rti",
      "nagaland rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-OD",
    "title": "Odisha Right to Information Rules & Odisha Information Commission (OIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Odisha: (1) Application fee of ₹10 payable via Treasury Challan, IPO, Court Fee Stamp, or online on the Odisha RTI Portal (rtionline.odisha.gov.in); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Odisha Information Commission (OIC), Toshali Bhawan, Block B-1, Satyanagar, Bhubaneswar - 751007.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Odisha",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Information and Public Relations Department, Government of Odisha & OIC",
      "official_source_url": "https://oic.nic.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Odisha Information Commission (OIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Odisha Right to Information Rules, 2005 (Notification No. 27163/I&PR)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Odisha Information Commission (OIC)",
      "office_address": "Toshali Bhawan, Block B-1, Satyanagar, Bhubaneswar - 751007",
      "portal_url": "https://rtionline.odisha.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.odisha.gov.in",
      "first_appeal_portal": "https://rtionline.odisha.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://oic.nic.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, Treasury Challan, or online on rtionline.odisha.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Odisha Department / BMC Bhubaneswar / CMC Cuttack / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Odisha Information Commission (OIC), Bhubaneswar within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "odisha rti online",
      "rtionline odisha gov in",
      "oic bhubaneswar toshali bhawan",
      "bmc bhubaneswar rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-PB",
    "title": "Punjab Right to Information Rules & Punjab State Information Commission (PSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Punjab: (1) Application fee of ₹10 payable via Treasury Challan, IPO, Demand Draft, or online on the Punjab RTI Portal (rtionline.punjab.gov.in); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Punjab State Information Commission (PSIC), Red Cross Building, Sector 16-A, Chandigarh - 160016.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Punjab",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Governance Reforms, Government of Punjab & PSIC",
      "official_source_url": "https://infocommpunjab.com",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Punjab State Information Commission (PSIC)",
      "effective_from": "2007-04-18",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Punjab Right to Information Rules, 2007"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Punjab State Information Commission (PSIC)",
      "office_address": "Red Cross Building, Sector 16-A, Madhya Marg, Chandigarh - 160016",
      "portal_url": "https://rtionline.punjab.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.punjab.gov.in",
      "first_appeal_portal": "https://rtionline.punjab.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://infocommpunjab.com"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Treasury Challan, IPO, DD, or online on rtionline.punjab.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Punjab Department / Municipal Corporation (Ludhiana/Amritsar/Jalandhar/Mohali)",
        "First Appellate Authority within 30 days",
        "Second Appeal to Punjab State Information Commission (PSIC), Chandigarh within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "punjab rti online",
      "rtionline punjab gov in",
      "psic sector 16 chandigarh",
      "ludhiana municipal corporation rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-RJ",
    "title": "Rajasthan Right to Information Rules & Rajasthan Information Commission (RIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Rajasthan: (1) Application fee of ₹10 payable via Court Fee Stamp, IPO, Demand Draft, or online on the Rajasthan RTI Portal (rtionline.rajasthan.gov.in); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Rajasthan Information Commission (RIC), Suchna Bhavan, OTS Chauraha, JLN Marg, Jaipur - 302017.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Rajasthan",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of Rajasthan & RIC",
      "official_source_url": "https://ric.rajasthan.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Rajasthan Information Commission (RIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Rajasthan Right to Information Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Rajasthan Information Commission (RIC)",
      "office_address": "Suchna Bhavan, OTS Chauraha, JLN Marg, Jaipur - 302017",
      "portal_url": "https://rtionline.rajasthan.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.rajasthan.gov.in",
      "first_appeal_portal": "https://rtionline.rajasthan.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://ric.rajasthan.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, DD, or online on rtionline.rajasthan.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Rajasthan Department / Nagar Nigam (Jaipur/Jodhpur/Kota) / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Rajasthan Information Commission (RIC), Jaipur within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "rajasthan rti online",
      "rtionline rajasthan gov in",
      "ric jaipur jln marg",
      "jaipur nagar nigam rti"
    ]
  },
  {
    "id": "SRC-RTI-3F-SK",
    "title": "Sikkim Right to Information Rules & State Information Commission (SSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Sikkim: (1) Application fee of ₹100 payable via Bank Receipt under State Revenue Head 0070-Other Administrative Services, IPO, or Bank Draft; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal fee of ₹100 to departmental FAA within 30 days; (5) Second Appeal fee of ₹100 / Complaint to Sikkim State Information Commission, Secretariat Annexe, Topakhana, Gangtok within 90 days.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Sikkim",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Personnel, Administrative Reforms, Training and Public Grievances, Government of Sikkim & SSIC",
      "official_source_url": "https://sic.sikkim.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Sikkim State Information Commission",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Sikkim State Right to Information Rules, 2005 (Notification No. 89/GEN/DOP)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Sikkim State Information Commission",
      "office_address": "Secretariat Annexe, Topakhana, Gangtok, Sikkim - 737101",
      "portal_url": "https://sic.sikkim.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://sic.sikkim.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹100 via Bank Receipt under Head 0070, IPO, or DD (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Sikkim Department / Gangtok Municipal Corporation / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Sikkim State Information Commission, Gangtok within 90 days"
      ],
      "application_fee_amount": 100,
      "first_appeal_fee_amount": 100,
      "second_appeal_fee_amount": 100,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "sikkim rti",
      "sic gangtok topakhana",
      "gangtok municipal corporation rti",
      "sikkim 100 rupees rti fee"
    ]
  },
  {
    "id": "SRC-RTI-3F-TN",
    "title": "Tamil Nadu Right to Information Rules & State Information Commission (TNIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Tamil Nadu: (1) Application fee of ₹10 payable via Court Fee Stamp, Treasury Chalan (Head of Account: 0070-00-501-AA-0000), Demand Draft, or Online Net Banking on rtionline.tn.gov.in; (2) Copying charges of ₹2 per page; (3) BPL applicants exempt under Section 7(5); (4) First Appeal to designated departmental FAA within 30 days; (5) Second Appeal / Complaint to the Tamil Nadu Information Commission (TNIC), No. 19, Government Farm Village, Pernambut Road, Nandanam, Chennai - 600035.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Tamil Nadu State Information Commission & Personnel and Administrative Reforms Department",
      "official_source_url": "https://www.nsic.tn.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Tamil Nadu Information Commission (TNIC)",
      "effective_from": "2005-10-07",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Tamil Nadu Right to Information Rules, 2005 (G.O. Ms. No. 988, Public (Estt.I & Leg.) Dept.)"
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
      "designation": "State Chief Information Commissioner / Registrar",
      "organization": "Tamil Nadu Information Commission (TNIC)",
      "office_address": "No. 19, Government Farm Village, Pernambut Road, Nandanam, Chennai - 600035",
      "portal_url": "https://rtionline.tn.gov.in",
      "helpline_number": "044-24357580",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.tn.gov.in",
      "first_appeal_portal": "https://rtionline.tn.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://www.nsic.tn.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 (Court Fee Stamp affixed to paper, Treasury Chalan, or Online Payment)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Tamil Nadu Government Department / Local Body / District Collectorate",
        "First Appellate Authority (FAA) of the respective Department within 30 days",
        "Second Appeal to Tamil Nadu Information Commission (TNIC), Chennai within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "tamil nadu information commission tnic",
      "nsic tn gov in",
      "tamil nadu rti court fee stamp 10 rupees",
      "treasury chalan head 0070",
      "nandanam chennai tnic"
    ]
  },
  {
    "id": "SRC-RTI-3F-TS",
    "title": "Telangana Right to Information Rules & Telangana State Information Commission (TSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Telangana: (1) Application fee of ₹10 payable via Court Fee Stamp, IPO, Demand Draft, or Treasury Challan (Head: 0070-60-118-00-01-001-000-NV); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Telangana State Information Commission (TSIC), Samachara Hakku Bhavan, H.No. 5-4-399, Mozamzahi Market, Hyderabad - 500001.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Telangana",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Telangana & TSIC",
      "official_source_url": "https://tsic.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Telangana State Information Commission (TSIC)",
      "effective_from": "2014-06-02",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Telangana Right to Information Rules, 2005 (Adapted under AP Reorganisation Act, 2014)"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Telangana State Information Commission (TSIC)",
      "office_address": "Samachara Hakku Bhavan, H.No. 5-4-399, Mozamzahi Market, Hyderabad - 500001",
      "portal_url": "https://tsic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://tsic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, DD, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Telangana Department / GHMC Hyderabad / District Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Telangana State Information Commission (TSIC), Hyderabad within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "telangana rti",
      "tsic hyderabad mozamzahi market",
      "ghmc rti pio",
      "telangana rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-TR",
    "title": "Tripura Right to Information Rules & Tripura Information Commission (TIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Tripura: (1) Application fee of ₹10 payable via Court fee stamp, IPO, or Treasury Challan; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Tripura Information Commission (TIC), P.N. Complex, Gurkhabasti, Agartala - 799006.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tripura",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration (AR) Department, Government of Tripura & TIC",
      "official_source_url": "https://tic.tripura.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Tripura Information Commission (TIC)",
      "effective_from": "2008-01-01",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Tripura Right to Information Rules, 2008"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Tripura Information Commission (TIC)",
      "office_address": "P.N. Complex, Gurkhabasti, Agartala - 799006",
      "portal_url": "https://tic.tripura.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://tic.tripura.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Tripura Department / Agartala Municipal Corporation / DM Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Tripura Information Commission (TIC), Agartala within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "tripura rti",
      "tic agartala gurkhabasti",
      "agartala municipal corporation rti",
      "tripura rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-UP",
    "title": "Uttar Pradesh Right to Information Rules & UP State Information Commission (UPSIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Uttar Pradesh: (1) Application fee of ₹10 payable via Non-Judicial Stamp Paper, IPO, Treasury Chalan, or online on the UP RTI Online portal (rtionline.up.gov.in); (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to UP State Information Commission (UPSIC), 7/7 A, Vikalp Khand, Gomti Nagar, Lucknow - 226010.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Uttar Pradesh",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of Uttar Pradesh & UPSIC",
      "official_source_url": "https://upsic.up.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Uttar Pradesh State Information Commission (UPSIC)",
      "effective_from": "2015-12-07",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Uttar Pradesh Right to Information Rules, 2015 (Notification No. 8/2015/334/Forty-Three-2015-1(3)/2009)"
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
      "designation": "State Chief Information Commissioner / Registrar",
      "organization": "Uttar Pradesh State Information Commission (UPSIC)",
      "office_address": "7/7 A, Vikalp Khand, Gomti Nagar, Lucknow - 226010",
      "portal_url": "https://rtionline.up.gov.in",
      "helpline_number": "0522-2720050",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.up.gov.in",
      "first_appeal_portal": "https://rtionline.up.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://upsic.up.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Non-judicial stamp paper, IPO, or online gateway on rtionline.up.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of UP Department / Nagar Nigam / Development Authority (e.g. LDA/NOIDA)",
        "First Appellate Authority within 30 days",
        "Second Appeal to UP State Information Commission (UPSIC), Lucknow within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "uttar pradesh rti online",
      "rtionline up gov in",
      "upsic gomti nagar lucknow",
      "noida authority rti pio",
      "up rti non judicial stamp 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-UK",
    "title": "Uttarakhand Right to Information Rules & State Information Commission (UIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in Uttarakhand: (1) Application fee of ₹10 payable via IPO, Court Fee Stamp, or Treasury Challan; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to Uttarakhand State Information Commission (UIC), Suchna Bhawan, Ring Road, Ladpur, Dehradun - 248008.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Uttarakhand",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of Uttarakhand & UIC",
      "official_source_url": "https://uic.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Uttarakhand State Information Commission (UIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Uttarakhand Right to Information Rules, 2005"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "Uttarakhand State Information Commission (UIC)",
      "office_address": "Suchna Bhawan, Ring Road, Ladpur, Dehradun - 248008",
      "portal_url": "https://uic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://uic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Uttarakhand Department / Dehradun Municipal Corporation / DM Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Uttarakhand State Information Commission, Dehradun within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "uttarakhand rti",
      "uic dehradun ladpur",
      "dehradun municipal corporation rti",
      "uttarakhand rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-WB",
    "title": "West Bengal Right to Information Rules & State Information Commission (WBIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State RTI administration in West Bengal: (1) Application fee of ₹10 payable via Court Fee Stamp, IPO, Demand Draft, or Treasury Challan; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint to West Bengal Information Commission (WBIC), 11A, Mirza Ghalib Street, Kolkata - 700087.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "West Bengal",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Personnel and Administrative Reforms Department, Government of West Bengal & WBIC",
      "official_source_url": "https://wbic.wb.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "West Bengal Information Commission (WBIC)",
      "effective_from": "2006-03-29",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "West Bengal Right to Information Rules, 2006 (Notification No. 157-PAR(AR))"
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
      "designation": "State Chief Information Commissioner / Secretary",
      "organization": "West Bengal Information Commission (WBIC)",
      "office_address": "11A, Mirza Ghalib Street, Kolkata - 700087",
      "portal_url": "https://wbic.wb.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://wbic.wb.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, DD, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of West Bengal Department / Kolkata Municipal Corporation (KMC) / Howrah / DM Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to West Bengal Information Commission (WBIC), Kolkata within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "west bengal rti",
      "wbic kolkata mirza ghalib",
      "kmc kolkata municipal rti",
      "west bengal rti fee 10"
    ]
  },
  {
    "id": "SRC-RTI-3F-AN",
    "title": "Andaman and Nicobar Islands RTI Administration & Central Information Commission",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration in UT Andaman and Nicobar Islands: (1) Application fee of ₹10 payable via IPO, Court Fee Stamp, or Demand Draft to the designated SPIO; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to designated departmental FAA; (5) Second Appeal / Complaint lies before the Central Information Commission (CIC), Baba Gangnath Marg, Munirka, New Delhi under Section 19(3).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Andaman and Nicobar Islands",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "UT Administration of Andaman & Nicobar Islands & Central Information Commission",
      "official_source_url": "https://andaman.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Andaman & Nicobar Administration / Central Information Commission (CIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Right to Information Rules, 2012 & UT Administrative Directives"
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
      "designation": "Central Public Information Officer / Central Information Commissioner",
      "organization": "Andaman & Nicobar Administration / Central Information Commission (CIC)",
      "office_address": "Secretariat, Port Blair, Andaman and Nicobar Islands - 744101",
      "portal_url": "https://cic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO, Court fee stamp, or DD (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of A&N Department / Port Blair Municipal Council / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "andaman rti",
      "port blair municipal rti",
      "cic andaman nicobar second appeal",
      "a&n administration pio"
    ]
  },
  {
    "id": "SRC-RTI-3F-CH",
    "title": "Chandigarh Administration RTI Rules & Central Information Commission (CIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration in UT Chandigarh: (1) Application fee of ₹10 payable via IPO, Demand Draft, or Treasury Challan to the Public Authority; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to designated FAA of Chandigarh Administration / Municipal Corporation Chandigarh (MCC); (5) Second Appeal / Complaint lies before the Central Information Commission (CIC), New Delhi.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Chandigarh",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Chandigarh Administration & Central Information Commission",
      "official_source_url": "https://chandigarh.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Chandigarh Administration / Central Information Commission (CIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Right to Information Rules, 2012 & Chandigarh Administration Guidelines"
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
      "designation": "CPIO / SPIO & Central Information Commissioner",
      "organization": "Chandigarh Administration / Central Information Commission (CIC)",
      "office_address": "UT Secretariat, Sector 9, Chandigarh - 160009",
      "portal_url": "https://cic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO, DD, or Cash at Treasury (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Chandigarh Administration / Municipal Corporation Chandigarh (MCC)",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "chandigarh rti",
      "mcc chandigarh rti pio",
      "sector 9 chandigarh administration rti",
      "cic second appeal chandigarh"
    ]
  },
  {
    "id": "SRC-RTI-3F-DNH",
    "title": "Dadra & Nagar Haveli and Daman & Diu RTI Administration & Central Information Commission",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration in UT Dadra and Nagar Haveli and Daman and Diu: (1) Application fee of ₹10 payable via Court Fee Stamp, IPO, or DD; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Second Appeal / Complaint lies before the Central Information Commission (CIC), New Delhi.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Dadra and Nagar Haveli and Daman and Diu",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "UT Administration of DNH & DD & Central Information Commission",
      "official_source_url": "https://daman.nic.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "UT Administration of DNH & DD / Central Information Commission (CIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Right to Information Rules, 2012 & UT Administration Directives"
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
      "designation": "CPIO / SPIO & Central Information Commissioner",
      "organization": "UT Administration of DNH & DD / Central Information Commission (CIC)",
      "office_address": "Secretariat, Moti Daman / Collectorate Silvassa",
      "portal_url": "https://cic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, or DD (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of UT Department / Daman Municipal Council / Silvassa Municipality",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "dnh dd rti",
      "silvassa rti pio",
      "daman municipal rti",
      "cic dnh dd second appeal"
    ]
  },
  {
    "id": "SRC-RTI-3F-DL",
    "title": "Delhi Right to Information Rules & Delhi e-RTI Portal (rtionline.delhi.gov.in)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration for the Government of NCT of Delhi: (1) Application fee of ₹10 payable via Court fee stamp, IPO, or online on the Delhi e-RTI Portal (rtionline.delhi.gov.in); (2) Covers Delhi Government Departments, Municipal Corporation of Delhi (MCD), Delhi Jal Board (DJB), DDA, and DTC; (3) Note on Appellate Jurisdiction: Second Appeals and Complaints concerning GNCTD bodies lie before the Central Information Commission (CIC) under Section 19(3).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Delhi",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administrative Reforms Department, Government of NCT of Delhi & Central Information Commission",
      "official_source_url": "https://rtionline.delhi.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Government of NCT of Delhi / Central Information Commission",
      "effective_from": "2017-07-10",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Delhi Right to Information Rules, 2005 & GNCTD Administrative Directives"
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
      "designation": "SPIO / FAA & Central Information Commissioner",
      "organization": "Government of NCT of Delhi / Central Information Commission (CIC)",
      "portal_url": "https://rtionline.delhi.gov.in",
      "filing_modes": [
        "ONLINE",
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "ONLINE_APPLICATION_PORTAL",
      "initial_application_portal": "https://rtionline.delhi.gov.in",
      "first_appeal_portal": "https://rtionline.delhi.gov.in",
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court fee stamp, IPO, or online gateway on rtionline.delhi.gov.in",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of GNCTD Department / MCD Zone / Delhi Jal Board",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), Baba Gangnath Marg, Munirka, New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "delhi rti online",
      "rtionline delhi gov in",
      "mcd pio rti",
      "delhi jal board rti",
      "cic second appeal delhi govt"
    ]
  },
  {
    "id": "SRC-RTI-3F-JK",
    "title": "Jammu and Kashmir RTI Administration & Central Information Commission (CIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration in UT Jammu and Kashmir: (1) Post-J&K Reorganisation Act 2019, Central RTI Act 2005 and Right to Information Rules 2012 apply; (2) Application fee of ₹10 payable via IPO, Demand Draft, or Treasury Challan; (3) Copying fee of ₹2 per page; (4) BPL applicants exempt; (5) First Appeal to departmental FAA; (6) Second Appeal / Complaint lies before the Central Information Commission (CIC), New Delhi (dedicated J&K Bench).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Jammu and Kashmir",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "General Administration Department, Government of J&K & Central Information Commission",
      "official_source_url": "https://jkgad.nic.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Government of Jammu and Kashmir / Central Information Commission (CIC)",
      "effective_from": "2019-10-31",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Right to Information Act, 2005 & Jammu and Kashmir Reorganisation Act, 2019"
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
      "designation": "CPIO / SPIO & Central Information Commissioner",
      "organization": "Government of J&K / Central Information Commission (CIC)",
      "office_address": "Civil Secretariat, Srinagar / Jammu",
      "portal_url": "https://cic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO, DD, or Treasury Challan (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of J&K Department / SMC Srinagar / JMC Jammu / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "jammu kashmir rti",
      "jkgad rti",
      "smc srinagar rti pio",
      "jmc jammu rti",
      "cic j&k bench second appeal"
    ]
  },
  {
    "id": "SRC-RTI-3F-LA",
    "title": "Ladakh UT RTI Administration & Central Information Commission (CIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration in UT Ladakh: (1) Governed under the Central RTI Act, 2005 and Right to Information Rules, 2012; (2) Application fee of ₹10 payable via IPO or Demand Draft; (3) Copying fee of ₹2 per page; (4) BPL applicants exempt; (5) First Appeal to designated departmental FAA; (6) Second Appeal / Complaint lies before the Central Information Commission (CIC), New Delhi.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Ladakh",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Administration of UT Ladakh & Central Information Commission",
      "official_source_url": "https://ladakh.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Administration of UT Ladakh / Central Information Commission (CIC)",
      "effective_from": "2019-10-31",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Right to Information Act, 2005 & Ladakh Reorganisation Provisions"
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
      "designation": "CPIO / SPIO & Central Information Commissioner",
      "organization": "Administration of UT Ladakh / Central Information Commission (CIC)",
      "office_address": "UT Secretariat, Leh, Ladakh - 194101",
      "portal_url": "https://cic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO or DD (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Ladakh Department / Leh / Kargil Municipal Committee / DC Office",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "ladakh rti",
      "leh rti pio",
      "kargil rti",
      "cic ladakh second appeal"
    ]
  },
  {
    "id": "SRC-RTI-3F-LK",
    "title": "Lakshadweep UT RTI Administration & Central Information Commission (CIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration in UT Lakshadweep: (1) Governed under Central RTI Act 2005 & Rules 2012; (2) Application fee of ₹10 payable via IPO or Demand Draft; (3) Copying fee of ₹2 per page; (4) BPL applicants exempt; (5) First Appeal to departmental FAA; (6) Second Appeal / Complaint lies before the Central Information Commission (CIC), New Delhi.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Lakshadweep",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "UT Administration of Lakshadweep & Central Information Commission",
      "official_source_url": "https://lakshadweep.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "UT Administration of Lakshadweep / Central Information Commission (CIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Right to Information Rules, 2012 & UT Directives"
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
      "designation": "CPIO / SPIO & Central Information Commissioner",
      "organization": "UT Administration of Lakshadweep / Central Information Commission (CIC)",
      "office_address": "Secretariat, Kavaratti, Lakshadweep - 682555",
      "portal_url": "https://cic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via IPO or DD (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Lakshadweep Department / Village Dweep Panchayat / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "lakshadweep rti",
      "kavaratti rti pio",
      "cic lakshadweep second appeal"
    ]
  },
  {
    "id": "SRC-RTI-3F-PY",
    "title": "Puducherry Right to Information Rules & Central Information Commission (CIC)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "RTI administration in UT Puducherry: (1) Application fee of ₹10 payable via Court Fee Stamp, IPO, or Demand Draft; (2) Copying fee of ₹2 per page; (3) BPL applicants exempt; (4) First Appeal to departmental FAA; (5) Note on Appellate Jurisdiction: Second Appeals and Complaints for UT Puducherry public authorities lie before the Central Information Commission (CIC), New Delhi under Section 19(3).",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Puducherry",
      "government_level": "UT",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Department of Personnel and Administrative Reforms, Government of Puducherry & CIC",
      "official_source_url": "https://dpar.py.gov.in",
      "source_type": "STATUTORY_REGULATOR",
      "administering_authority": "Government of Puducherry / Central Information Commission (CIC)",
      "effective_from": "2005-10-12",
      "source_updated_date": "2024-01-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 3,
      "legal_basis": "Puducherry Right to Information Rules, 2005 (G.O. Ms. No. 67, DPAR)"
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
      "designation": "SPIO / FAA & Central Information Commissioner",
      "organization": "Government of Puducherry / Central Information Commission (CIC)",
      "office_address": "Chief Secretariat, Goubert Avenue, Puducherry - 605001",
      "portal_url": "https://cic.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ],
      "portal_type": "INFORMATION_COMMISSION_WEBSITE",
      "initial_application_portal": null,
      "first_appeal_portal": null,
      "second_appeal_portal": null,
      "information_commission_website": "https://cic.gov.in"
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp, IPO, or DD (Free for BPL)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO of Puducherry Department / Puducherry / Oulgaret Municipality / Collectorate",
        "First Appellate Authority within 30 days",
        "Second Appeal to Central Information Commission (CIC), New Delhi within 90 days"
      ],
      "application_fee_amount": 10,
      "first_appeal_fee_amount": 0,
      "second_appeal_fee_amount": 0,
      "first_appeal_filing_deadline_days": 30,
      "first_appeal_delay_condonation": true,
      "first_appeal_disposal_normal_days": 30,
      "first_appeal_disposal_max_days": 45,
      "second_appeal_filing_deadline_days": 90,
      "second_appeal_delay_condonation": true
    },
    "keywords": [
      "puducherry rti",
      "dpar puducherry",
      "puducherry municipality rti",
      "cic puducherry second appeal"
    ]
  },
  {
    "id": "SRC-RTI-TN-001",
    "title": "Tamil Nadu RTI Online Filing Portal (rtionline.tn.gov.in)",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "State Government digital gateway enabling citizens to file online RTI applications and First Appeals directly to Secretariat Departments, Heads of Departments, District Collectorates, and Municipal Corporations across Tamil Nadu.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "government_level": "STATE",
      "jurisdiction_type": "EXCLUSIVE"
    },
    "provenance": {
      "official_source_name": "Human Resources Management Department, Government of Tamil Nadu",
      "official_source_url": "https://rtionline.tn.gov.in",
      "source_type": "OFFICIAL_GOVT_PORTAL",
      "administering_authority": "Government of Tamil Nadu / Tamil Nadu Information Commission",
      "effective_from": "2022-11-01",
      "source_updated_date": "2026-01-10",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 4,
      "legal_basis": "Tamil Nadu Right to Information Rules & Digital Governance Directives"
    },
    "supported_use_cases": [
      "jurisdiction_routing",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    "authority_details": {
      "organization": "Tamil Nadu RTI Online Portal Cell",
      "portal_url": "https://rtionline.tn.gov.in",
      "filing_modes": [
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Net Banking / UPI / Debit Card",
      "time_limits_days": 30
    },
    "keywords": [
      "rtionline tn gov in",
      "tamil nadu rti portal",
      "chennai coimbatore online rti",
      "tn first appeal online"
    ]
  },
  {
    "id": "CCMC_RTI_AUTHORITY",
    "title": "Coimbatore City Municipal Corporation (CCMC) RTI Public Authority Directory",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "Curated official municipal authority directory identifying designated SPIOs and First Appellate Authorities across all 5 administrative zones (East, West, North, South, Central) of Coimbatore City Municipal Corporation.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "district_if_relevant": "Coimbatore",
      "local_body_if_relevant": "Coimbatore City Municipal Corporation",
      "government_level": "LOCAL",
      "jurisdiction_type": "MUNICIPAL"
    },
    "provenance": {
      "official_source_name": "Coimbatore Corporation Official Portal, Municipal Administration and Water Supply Department",
      "official_source_url": "https://www.ccmc.gov.in",
      "source_type": "MINISTRY_DEPT_WEBSITE",
      "administering_authority": "Coimbatore City Municipal Corporation, Government of Tamil Nadu",
      "effective_from": "2005-10-12",
      "source_updated_date": "2026-02-01",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 2,
      "legal_basis": "Section 4(1)(b) Proactive Disclosures, RTI Act 2005 & Tamil Nadu Urban Local Bodies Act 1998"
    },
    "supported_use_cases": [
      "jurisdiction_routing",
      "authority_identification",
      "rti_drafting",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Public Information Officer",
      "department": "Administration / Central Grievance Cell",
      "organization": "Coimbatore City Municipal Corporation",
      "office_address": "Main Office, Big Bazaar Street, Town Hall, Coimbatore - 641001",
      "portal_url": "https://www.ccmc.gov.in",
      "helpline_number": "1800-425-4900 / 0422-2302323",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER",
        "ONLINE"
      ]
    },
    "rules_or_criteria": {
      "statutory_fees": "₹10 via Court Fee Stamp / Treasury Chalan (Head: 0070-00-501-AA-0000)",
      "time_limits_days": 30,
      "escalation_route": [
        "SPIO: Zone Assistant Commissioner / Central Office PIO, Town Hall",
        "First Appellate Authority: Deputy Commissioner / Commissioner, CCMC",
        "Second Appeal: Tamil Nadu Information Commission (TNIC), Chennai"
      ]
    },
    "keywords": [
      "ccmc rti directory",
      "coimbatore corporation pio",
      "town hall coimbatore rti",
      "coimbatore municipal records",
      "coimbatore first appeal"
    ]
  },
  {
    "id": "CCMC_ENGINEERING_ROADS",
    "title": "CCMC Engineering & Works Department Road Maintenance Guidelines & Defect Liability Records",
    "domain": "RTI_ACCESS",
    "subdomain": "3F_STATE_SPECIFIC_RTI",
    "summary": "Technical division records governing municipal road laying, asphalt quality certificates, Measurement Book (MB) recordings, contractor agreements, and Defect Liability Periods (DLP) for all 100 municipal wards in Coimbatore.",
    "jurisdiction": {
      "country": "IN",
      "state_ut": "Tamil Nadu",
      "district_if_relevant": "Coimbatore",
      "local_body_if_relevant": "Coimbatore City Municipal Corporation",
      "government_level": "LOCAL",
      "jurisdiction_type": "MUNICIPAL"
    },
    "provenance": {
      "official_source_name": "Engineering Department, Coimbatore City Municipal Corporation",
      "official_source_url": "https://www.ccmc.gov.in/ccmc/index.php/departments/engineering",
      "source_type": "MINISTRY_DEPT_WEBSITE",
      "administering_authority": "City Engineer, Engineering Wing, Coimbatore City Municipal Corporation",
      "effective_from": "2015-01-01",
      "source_updated_date": "2025-08-10",
      "last_verified": "2026-08-20",
      "verification_status": "CURRENT",
      "source_priority": 2,
      "legal_basis": "Tamil Nadu Urban Local Bodies Act, 1998 and CCMC Engineering Works Regulations"
    },
    "supported_use_cases": [
      "problem_understanding",
      "rti_drafting",
      "authority_identification",
      "citation_provenance"
    ],
    "authority_details": {
      "designation": "Executive Engineer (Roads & Works) / Assistant Executive Engineer",
      "department": "Engineering Wing",
      "organization": "Coimbatore City Municipal Corporation",
      "portal_url": "https://www.ccmc.gov.in",
      "filing_modes": [
        "POSTAL",
        "PHYSICAL_COUNTER"
      ]
    },
    "rules_or_criteria": {
      "time_limits_days": 30,
      "required_documents": [
        "RTI Application specifying road stretch, ward number, and survey landmarks"
      ]
    },
    "keywords": [
      "ccmc road works rti",
      "measurement book entry coimbatore",
      "defect liability period dlp ccmc",
      "pothole repair expenditure coimbatore",
      "road contractor tender agreement"
    ]
  }
];
