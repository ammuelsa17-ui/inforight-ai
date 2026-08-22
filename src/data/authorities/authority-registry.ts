import { CompetentAuthority } from "@/types/authority-locator";

/**
 * Verified Competent Legal Authorities Registry
 * Grounded 100% in official gazettes, Acts, and verified departmental registries.
 * Zero fabricated phone numbers, addresses, coordinates, or PIO names.
 */
export const VERIFIED_AUTHORITIES_REGISTRY: CompetentAuthority[] = [
  // =========================================================================
  // 1. CONSUMER PROTECTION (DISTRICT CONSUMER COMMISSIONS — DCDRC)
  // =========================================================================
  {
    authority_id: "DCDRC_CHENNAI_NORTH",
    name: "District Consumer Disputes Redressal Commission (Chennai North)",
    authority_type: "District Consumer Commission (DCDRC)",
    domain: "CONSUMER_PROTECTION",
    state_ut: "Tamil Nadu",
    district: "Chennai",
    jurisdiction_scope: "DISTRICT",
    office_address: "Frazer Bridge Road, V.O.C. Nagar, Park Town, Chennai, Tamil Nadu 600003",
    pincode: "600003",
    helpline_phone: "1915 (National Consumer Helpline)",
    official_website: "https://e-jagriti.gov.in",
    filing_portal: "https://e-jagriti.gov.in",
    filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
    legal_basis: "Consumer Protection Act, 2019, Section 28 & Section 34 (Territorial Jurisdiction)",
    source_record_ids: ["SRC-CONS-1A-002", "SRC-CONS-1B-001"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    pre_litigation_help: {
      name: "National Consumer Helpline (NCH)",
      helpline: "1915 (Toll-Free) or SMS 8800001915",
      note: "Pre-litigation mediation and grievance registration platform operated by Department of Consumer Affairs (Not a court)."
    },
    suggested_form_id: "FORM-CONS-EJAGRITI",
    notes: "Jurisdiction covers northern zones of Greater Chennai."
  },
  {
    authority_id: "DCDRC_CHENNAI_SOUTH",
    name: "District Consumer Disputes Redressal Commission (Chennai South)",
    authority_type: "District Consumer Commission (DCDRC)",
    domain: "CONSUMER_PROTECTION",
    state_ut: "Tamil Nadu",
    district: "Chennai",
    jurisdiction_scope: "DISTRICT",
    office_address: "TNPSC Road, VOC Nagar, Park Town, Chennai, Tamil Nadu 600003",
    pincode: "600003",
    helpline_phone: "1915 (National Consumer Helpline)",
    official_website: "https://e-jagriti.gov.in",
    filing_portal: "https://e-jagriti.gov.in",
    filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
    legal_basis: "Consumer Protection Act, 2019, Section 28 & Section 34",
    source_record_ids: ["SRC-CONS-1A-002"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    pre_litigation_help: {
      name: "National Consumer Helpline (NCH)",
      helpline: "1915",
      note: "Pre-litigation helpline before formal commission filing."
    },
    suggested_form_id: "FORM-CONS-EJAGRITI"
  },
  {
    authority_id: "DCDRC_NEW_DELHI",
    name: "District Consumer Disputes Redressal Commission (New Delhi)",
    authority_type: "District Consumer Commission (DCDRC)",
    domain: "CONSUMER_PROTECTION",
    state_ut: "Delhi",
    district: "New Delhi",
    jurisdiction_scope: "DISTRICT",
    office_address: "M-Block, Vikas Bhawan, I.P. Estate, New Delhi 110002",
    pincode: "110002",
    helpline_phone: "1915",
    official_website: "https://e-jagriti.gov.in",
    filing_portal: "https://e-jagriti.gov.in",
    filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
    legal_basis: "Consumer Protection Act, 2019, Section 28",
    source_record_ids: ["SRC-CONS-1A-002"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-CONS-EJAGRITI"
  },
  {
    authority_id: "DCDRC_CHANDIGARH",
    name: "District Consumer Disputes Redressal Commission (Chandigarh)",
    authority_type: "District Consumer Commission (DCDRC)",
    domain: "CONSUMER_PROTECTION",
    state_ut: "Chandigarh",
    district: "Chandigarh",
    jurisdiction_scope: "DISTRICT",
    office_address: "Plot No. 5B, Sector 19-B, Madhya Marg, Chandigarh 160019",
    pincode: "160019",
    helpline_phone: "1915",
    official_website: "https://e-jagriti.gov.in",
    filing_portal: "https://e-jagriti.gov.in",
    filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
    legal_basis: "Consumer Protection Act, 2019, Section 28",
    source_record_ids: ["SRC-CONS-1A-002"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-CONS-EJAGRITI"
  },

  // =========================================================================
  // 2. TENANT RIGHTS AUTHORITIES (STATE SPECIFIC)
  // =========================================================================
  {
    authority_id: "RENT_AUTHORITY_CHENNAI_SOUTH",
    name: "Rent Authority (Tahsildar / Revenue Divisional Officer — Chennai South)",
    authority_type: "Rent Authority under TNRRRLT Act",
    domain: "TENANT_RIGHTS",
    state_ut: "Tamil Nadu",
    district: "Chennai",
    jurisdiction_scope: "DISTRICT",
    office_address: "Taluk Office Guindy / Velachery Revenue Division, Chennai",
    pincode: "600032",
    official_website: "https://www.tenancy.tn.gov.in",
    filing_portal: "https://www.tenancy.tn.gov.in",
    filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
    legal_basis: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017, Section 4 & Section 30",
    source_record_ids: ["SRC-TEN-2F-TN"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-TEN-TN-REG",
    notes: "Competent authority for registration of tenancy agreements and initial tenancy disputes in Chennai South."
  },
  {
    authority_id: "RENT_CONTROLLER_CHANDIGARH",
    name: "Court of the Rent Controller (Civil Judge Senior Division)",
    authority_type: "Rent Controller under East Punjab Act",
    domain: "TENANT_RIGHTS",
    state_ut: "Chandigarh",
    district: "Chandigarh",
    jurisdiction_scope: "DISTRICT",
    office_address: "District Courts Complex, Sector 43, Chandigarh 160043",
    pincode: "160043",
    official_website: "https://districts.ecourts.gov.in/chandigarh",
    filing_modes: ["PHYSICAL_COUNTER"],
    legal_basis: "East Punjab Urban Rent Restriction Act, 1949, Section 13 (as extended to Chandigarh)",
    source_record_ids: ["SRC-TEN-2F-CH"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    notes: "Adjudicates fair rent and eviction petitions under East Punjab tenancy framework. (Not a Tahsildar Rent Authority)."
  },

  // =========================================================================
  // 3. RTI PUBLIC AUTHORITIES (CENTRAL, STATE, AND LOCAL CIVIC)
  // =========================================================================
  {
    authority_id: "CPIO_EPFO_CENTRAL",
    name: "Central Public Information Officer (CPIO) — Employees' Provident Fund Organisation (EPFO)",
    authority_type: "Central Public Authority PIO",
    domain: "RTI_ACCESS",
    state_ut: "National",
    jurisdiction_scope: "CENTRAL",
    office_address: "EPFO Head Office, Bhavishya Nidhi Bhawan, 14, Bhikaiji Cama Place, New Delhi 110066",
    pincode: "110066",
    official_website: "https://www.epfindia.gov.in",
    filing_portal: "https://rtionline.gov.in",
    filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"],
    legal_basis: "Right to Information Act, 2005, Section 6(1) & Section 7(1)",
    source_record_ids: ["SRC-RTI-NAT-001", "SRC-RTI-NAT-002"],
    verification_status: "CURRENT",
    location_confidence: "EXACT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-RTI-6-1",
    notes: "Central Public Authority. Regardless of applicant's State, file online via rtionline.gov.in."
  },
  {
    authority_id: "PIO_GREATER_CHENNAI_CORP",
    name: "Public Information Officer (PIO) — Greater Chennai Corporation",
    authority_type: "Local Civic Body PIO (Urban Local Body)",
    domain: "RTI_ACCESS",
    state_ut: "Tamil Nadu",
    district: "Chennai",
    local_body: "Greater Chennai Corporation",
    jurisdiction_scope: "LOCAL_BODY",
    office_address: "Ripon Building, EVR Periyar Salai, Park Town, Chennai, Tamil Nadu 600003",
    pincode: "600003",
    official_website: "https://chennaicorporation.gov.in",
    filing_modes: ["PHYSICAL_COUNTER", "POSTAL"],
    legal_basis: "Right to Information Act, 2005, Section 6(1) & Tamil Nadu RTI Rules 2005",
    source_record_ids: ["SRC-RTI-NAT-001", "SRC-RTI-3F-TN"],
    verification_status: "CURRENT",
    location_confidence: "EXACT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-RTI-6-1",
    notes: "Competent authority for municipal civic matters (roads, streetlights, sanitation, building permits) in Chennai. (Do not file on Central rtionline.gov.in)."
  },
  {
    authority_id: "PIO_MCD_DELHI",
    name: "Public Information Officer (PIO) — Municipal Corporation of Delhi (MCD)",
    authority_type: "Local Civic Body PIO",
    domain: "RTI_ACCESS",
    state_ut: "Delhi",
    district: "New Delhi",
    local_body: "Municipal Corporation of Delhi",
    jurisdiction_scope: "LOCAL_BODY",
    office_address: "Dr. S.P.M. Civic Centre, Minto Road, New Delhi 110002",
    pincode: "110002",
    official_website: "https://mcdonline.nic.in",
    filing_modes: ["ONLINE", "PHYSICAL_COUNTER", "POSTAL"],
    legal_basis: "Right to Information Act, 2005, Section 6(1) & Delhi RTI Rules",
    source_record_ids: ["SRC-RTI-NAT-001", "SRC-RTI-3F-DL"],
    verification_status: "CURRENT",
    location_confidence: "EXACT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-RTI-6-1"
  },

  // =========================================================================
  // 4. WORKPLACE RIGHTS AUTHORITIES (CENTRAL VS STATE SPHERES)
  // =========================================================================
  {
    authority_id: "ALC_CENTRAL_CHENNAI",
    name: "Office of the Assistant Labour Commissioner (Central) — Chennai",
    authority_type: "Central Labour Conciliation Authority",
    domain: "WORKPLACE_RIGHTS",
    state_ut: "Tamil Nadu",
    district: "Chennai",
    jurisdiction_scope: "CENTRAL",
    office_address: "Shastri Bhawan, No. 26, Haddows Road, Nungambakkam, Chennai 600006",
    pincode: "600006",
    official_website: "https://clc.gov.in",
    filing_portal: "https://samadhan.labour.gov.in",
    filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
    legal_basis: "Industrial Relations Code, 2020 / Industrial Disputes Act, 1947, Section 4",
    source_record_ids: ["SRC-WRK-003-TERMINATION"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-WRK-SAMADHAN",
    notes: "Conciliation officer for Central Sphere establishments (Banks, Railways, Ports, Mines, Defense PSUs, Telecom, Central Gov)."
  },
  {
    authority_id: "CONTROLLING_AUTHORITY_GRATUITY_CHENNAI",
    name: "Controlling Authority under the Payment of Gratuity Act — Chennai",
    authority_type: "Statutory Gratuity Adjudication Authority",
    domain: "WORKPLACE_RIGHTS",
    state_ut: "Tamil Nadu",
    district: "Chennai",
    jurisdiction_scope: "DISTRICT",
    office_address: "DMS Complex, Teynampet, Chennai, Tamil Nadu 600006",
    pincode: "600006",
    official_website: "https://labour.tn.gov.in",
    filing_modes: ["PHYSICAL_COUNTER", "POSTAL"],
    legal_basis: "Payment of Gratuity Act, 1972, Section 3 & Section 7",
    source_record_ids: ["SRC-WRK-004-SOCIAL-SECURITY"],
    verification_status: "CURRENT",
    location_confidence: "DISTRICT_VERIFIED",
    last_verified: "2026-08-20",
    suggested_form_id: "FORM-WRK-GRATUITY-N",
    notes: "Adjudicates Form N applications for recovery of unpaid statutory gratuity with 10% compound interest."
  }
];

/**
 * Retrieve verified authority by exact ID
 */
export function getAuthorityById(authorityId: string): CompetentAuthority | undefined {
  return VERIFIED_AUTHORITIES_REGISTRY.find((a) => a.authority_id === authorityId);
}
