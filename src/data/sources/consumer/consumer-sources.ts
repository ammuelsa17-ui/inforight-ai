import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Domain 1: Consumer Protection Verified Source Records (1A, 1B, 1C, 1D, 1E)
 * Sourced strictly from official Indian gazettes, acts, rules, CCPA guidelines,
 * and verified statutory dispute mechanisms.
 */
export const CONSUMER_CORE_SOURCES: VerifiedSourceRecord[] = [
  // =========================================================================
  // 1A — BASIC CONSUMER RIGHTS & LEGAL FRAMEWORK
  // =========================================================================
  {
    id: "SRC-CONS-1A-001",
    title: "Consumer Protection Act, 2019 (Act No. 35 of 2019) & Six Statutory Rights",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1A_BASIC_RIGHTS_FRAMEWORK",
    summary: "Primary legislation governing consumer rights in India. Defines 'consumer' under Section 2(7) as any person who buys goods or hires services for consideration, excluding purchases for commercial purpose (unless for earning livelihood through self-employment). Enshrines six fundamental statutory rights: Safety, Information, Choice, Being Heard, Redressal, and Consumer Awareness.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "The Gazette of India (Extraordinary), Ministry of Law and Justice",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution",
      effective_from: "2020-07-20",
      source_updated_date: "2020-07-20",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Consumer Protection Act, 2019, Sections 2(7), 2(9), 2(10), 2(11), 2(28), 2(46), 2(47), and 69",
      gazette_notification_ref: "Notification S.O. 2351(E)"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Chief Commissioner",
      organization: "Central Consumer Protection Authority (CCPA) / Department of Consumer Affairs",
      portal_url: "https://consumeraffairs.nic.in",
      helpline_number: "1915",
      filing_modes: ["ONLINE", "POSTAL", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 730, // 2-year limitation period from cause of action under Section 69
      eligibility_conditions: [
        "Buyer/hirer of goods or services for valuable consideration (paid, promised, or partly paid)",
        "Includes offline transactions, e-commerce, teleshopping, direct selling, and multi-level marketing",
        "Beneficiary using goods/services with approval of the purchaser",
        "Exclusion: Persons obtaining goods for resale or for commercial purposes (except exclusively for earning livelihood by self-employment)"
      ],
      required_documents: [
        "Tax invoice / Retail cash memo / Bill of supply",
        "Proof of payment (Bank/UPI transaction receipt, credit card slip)",
        "Copy of agreement, terms of service, or warranty card",
        "Written notice or email communication addressed to opposite party"
      ],
      escalation_route: [
        "Direct formal written notice / letter of demand to seller or service provider",
        "National Consumer Helpline (NCH) pre-litigation docket for mediation",
        "District Consumer Disputes Redressal Commission (DCDRC) via e-Jagriti (e-jagriti.gov.in)",
        "State Consumer Disputes Redressal Commission (SCDRC) on appeal",
        "National Consumer Disputes Redressal Commission (NCDRC)"
      ]
    },
    keywords: [
      "consumer protection act 2019",
      "consumer definition section 2(7)",
      "six consumer rights",
      "right to safety",
      "right to redressal",
      "commercial purpose exclusion",
      "two year limitation period"
    ]
  },
  {
    id: "SRC-CONS-1A-002",
    title: "Consumer Protection (Jurisdiction of District, State and National Commissions) Rules, 2021",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1A_BASIC_RIGHTS_FRAMEWORK",
    summary: "Statutory rules notified by the Central Government on 30 December 2021 determining the current revised pecuniary jurisdiction for consumer courts based on the value of goods or services paid as consideration: District Commission up to ₹50 Lakhs; State Commission exceeding ₹50 Lakhs up to ₹2 Crores; National Commission exceeding ₹2 Crores.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "APPELLATE"
    },
    provenance: {
      official_source_name: "The Gazette of India (Extraordinary), Department of Consumer Affairs",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/jurisdiction-rules-2021",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "National Consumer Disputes Redressal Commission / State Consumer Commissions",
      effective_from: "2021-12-30",
      source_updated_date: "2021-12-30",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Sections 34, 47, 58 read with Section 101, Consumer Protection Act 2019",
      gazette_notification_ref: "Notification G.S.R. 892(E), dated 30-12-2021"
    },
    supported_use_cases: [
      "jurisdiction_routing",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "President & Members",
      organization: "Consumer Disputes Redressal Commissions (District / State / National)",
      portal_url: "https://e-jagriti.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 730,
      statutory_fees: "Exempt from court fees for claims up to ₹5 Lakhs; Nominal scale for higher claims as prescribed under Consumer Protection (Consumer Commission Procedure) Regulations",
      eligibility_conditions: [
        "District Commission: Value of goods/services paid up to ₹50,00,000",
        "State Commission: Value of goods/services paid between ₹50,00,001 and ₹2,00,00,000",
        "National Commission: Value of goods/services paid exceeding ₹2,00,00,000"
      ],
      escalation_route: [
        "Filing before District Commission in district of complainant residence/workplace or opposite party business",
        "Appeal to State Commission within 45 days of District Commission order",
        "Appeal to National Commission within 30 days of State Commission order",
        "Appeal to Supreme Court of India under Section 67 within 30 days"
      ]
    },
    keywords: [
      "pecuniary jurisdiction 2021",
      "district commission 50 lakhs",
      "state commission 2 crores",
      "national commission ncdrc",
      "ejagriti filing",
      "court fee exemption 5 lakhs"
    ]
  },
  {
    id: "SRC-CONS-1A-003",
    title: "Consumer Protection (Mediation) Rules, 2020 & Consumer Mediation Cells",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1A_BASIC_RIGHTS_FRAMEWORK",
    summary: "Statutory framework under Chapter V of CPA 2019 establishing Consumer Mediation Cells attached to every District, State, and National Commission for pre-trial or in-court consensual dispute resolution with zero appeal against mediated settlements.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "CONCURRENT"
    },
    provenance: {
      official_source_name: "The Gazette of India, Department of Consumer Affairs",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/mediation-rules-2020",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "National / State / District Consumer Disputes Redressal Commissions",
      effective_from: "2020-07-24",
      source_updated_date: "2020-07-24",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Consumer Protection Act 2019, Chapter V, Sections 74 to 81",
      gazette_notification_ref: "Notification G.S.R. 450(E)"
    },
    supported_use_cases: [
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Nodal Officer / Empaneled Mediator",
      organization: "Consumer Mediation Cell (Attached to Commission)",
      portal_url: "https://e-jagriti.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 90, // Target mediation completion within 3 months under Section 79(3)
      statutory_fees: "No additional mediation fee payable by consumer",
      escalation_route: [
        "Reference to mediation by Commission at first hearing with consent of parties",
        "Mediation sessions before empaneled neutral mediator",
        "Execution of written settlement agreement",
        "Commission passes final order based on settlement (No appeal lies from mediated order under Section 81)"
      ]
    },
    keywords: [
      "consumer mediation",
      "mediation cell",
      "chapter V cpa 2019",
      "settlement agreement",
      "no appeal after mediation"
    ]
  },

  // =========================================================================
  // 1B — PRODUCT PROBLEMS, DEFECTS, WARRANTY & PRODUCT LIABILITY
  // =========================================================================
  {
    id: "SRC-CONS-1B-001",
    title: "Product Liability & Defect Redressal Framework (CPA 2019 Chapter VI)",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1B_DEFECTIVE_PRODUCTS_REFUND",
    summary: "Statutory product liability provisions under Sections 82–87 of CPA 2019 holding product manufacturers, product service providers, and product sellers strictly liable to compensate consumers for harm, personal injury, property damage, or death caused by a defective product or deficient warranty support.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "The Gazette of India, Ministry of Law and Justice",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Consumer Disputes Redressal Commissions / CCPA",
      effective_from: "2020-07-24",
      source_updated_date: "2020-07-24",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Consumer Protection Act 2019, Chapter VI, Sections 82, 83, 84, 85, 86, and 87"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      designation: "District / State / National Commission",
      organization: "Consumer Disputes Redressal Commission",
      portal_url: "https://e-jagriti.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 730,
      required_documents: [
        "Tax invoice / bill of purchase",
        "Warranty card or certificate",
        "Photographs / video of defective/damaged product",
        "Product serial number, batch number, and IMEI/barcode",
        "Authorised service centre job sheets showing repeated repair failures",
        "Proof of personal injury or property damage (medical reports, damage photos) if claiming product liability"
      ],
      prohibited_actions: [
        "Manufacturer/seller disclaiming liability through unilateral fine-print clauses",
        "Refusing warranty repair when product was purchased from authorized channel",
        "Refusal to replace product after repeated unsuccessful repair attempts"
      ],
      escalation_route: [
        "Lodge formal complaint with seller and manufacturer customer service",
        "Obtain written Service Job Sheet / Inspection Report from authorized service center",
        "Lodge grievance on National Consumer Helpline (1915 / consumerhelpline.gov.in)",
        "Issue formal legal notice giving 15 days to replace product or refund amount",
        "File consumer complaint under Section 35 via e-Jagriti portal (e-jagriti.gov.in)"
      ]
    },
    keywords: [
      "product liability",
      "defective product",
      "warranty repair failure",
      "service job sheet",
      "replacement claim",
      "refund of purchase price",
      "section 84 manufacturer liability"
    ]
  },
  {
    id: "SRC-CONS-1B-002",
    title: "National Consumer Helpline (NCH) Pre-Litigation Grievance Redressal",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1B_DEFECTIVE_PRODUCTS_REFUND",
    summary: "Central government alternate grievance redressal mechanism managed by the Department of Consumer Affairs, connecting consumers directly with over 1,000 convergence partner companies for pre-litigation resolution of product replacement, repair, and refund disputes.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "CONCURRENT"
    },
    provenance: {
      official_source_name: "Department of Consumer Affairs, Government of India",
      official_source_url: "https://consumerhelpline.gov.in",
      source_type: "OFFICIAL_GOVT_PORTAL",
      administering_authority: "Department of Consumer Affairs",
      effective_from: "2016-01-01",
      source_updated_date: "2026-01-15",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 4,
      legal_basis: "Department of Consumer Affairs Citizen Redressal Charter"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "form_filling",
      "citation_provenance"
    ],
    authority_details: {
      organization: "National Consumer Helpline (NCH)",
      portal_url: "https://consumerhelpline.gov.in",
      helpline_number: "1915 / SMS to 8800001915 / WhatsApp 8800001915",
      filing_modes: ["ONLINE"]
    },
    rules_or_criteria: {
      time_limits_days: 60,
      statutory_fees: "Free of cost",
      required_documents: [
        "Tax invoice / order confirmation",
        "Proof of payment",
        "Photographs of defective good",
        "Communication log with seller/brand"
      ]
    },
    keywords: [
      "nch 1915",
      "consumer helpline online",
      "pre-litigation refund",
      "convergence company dispute",
      "free consumer complaint"
    ]
  },

  // =========================================================================
  // 1C — DEFICIENCY IN SERVICES
  // =========================================================================
  {
    id: "SRC-CONS-1C-001",
    title: "Deficiency in Service Standards & Remedies (Section 2(11) CPA 2019)",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1C_DEFICIENCY_IN_SERVICES",
    summary: "Statutory framework defining 'deficiency' as any fault, imperfection, shortcoming, or inadequacy in the quality, nature, and manner of performance required to be maintained by law or contract. Covers non-delivery of paid services, unreasonable delay, negligence, unauthorized charges, and withholding of material information.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Ministry of Law and Justice, The Gazette of India",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Department of Consumer Affairs / Consumer Disputes Redressal Commissions",
      effective_from: "2020-07-20",
      source_updated_date: "2020-07-20",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Consumer Protection Act 2019, Section 2(11) and Section 39"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "jurisdiction_routing",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Registrar",
      organization: "Consumer Disputes Redressal Commission (District / State / National)",
      portal_url: "https://e-jagriti.gov.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      time_limits_days: 730,
      required_documents: [
        "Service booking receipt / contract agreement / subscription invoice",
        "Payment transaction records",
        "Written correspondence demonstrating service shortfall or unreasonable delay",
        "Proof of financial loss or mental agony suffered"
      ],
      escalation_route: [
        "Internal customer grievance escalation / Principal Nodal Officer of service provider",
        "Sectoral Statutory Ombudsman / Regulator (where applicable)",
        "National Consumer Helpline (NCH 1915)",
        "Consumer Commission complaint via e-Jagriti (e-jagriti.gov.in)"
      ]
    },
    keywords: [
      "deficiency in service",
      "section 2(11)",
      "incomplete service",
      "unreasonable delay",
      "hidden charges",
      "contractual failure",
      "service negligence"
    ]
  },

  // =========================================================================
  // 1D — E-COMMERCE & ONLINE SHOPPING
  // =========================================================================
  {
    id: "SRC-CONS-1D-001",
    title: "Consumer Protection (E-Commerce) Rules, 2020 (As Amended)",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1D_ECOMMERCE_ONLINE_SHOPPING",
    summary: "Mandatory statutory regulations for all e-commerce entities (marketplace and inventory-based) operating in India. Mandates appointment of Resident Grievance Officer (acknowledgment of complaint within 48 hours, resolution within 1 month), display of seller legal identity, country of origin, transparent cancellation policies, and prohibits unfair price manipulation, fake reviews, and unilateral cancellation charges.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "The Gazette of India (Extraordinary), Department of Consumer Affairs",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/e-commerce-rules",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Central Consumer Protection Authority (CCPA)",
      effective_from: "2020-07-23",
      source_updated_date: "2021-05-17",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Consumer Protection Act 2019, Section 94 and Section 101(2)(zg)",
      gazette_notification_ref: "Notification G.S.R. 458(E)"
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
      designation: "Resident Grievance Officer / CCPA Nodal Officer",
      organization: "E-Commerce Entity & Central Consumer Protection Authority",
      portal_url: "https://consumerhelpline.gov.in",
      filing_modes: ["ONLINE", "EMAIL"]
    },
    rules_or_criteria: {
      time_limits_days: 30, // 48 hours for acknowledgment; 30 days for resolution under Rule 4(4)
      required_documents: [
        "Order ID and tax invoice containing seller GSTIN",
        "Product unboxing video / photographic evidence of wrong or spurious item",
        "Chat transcript / return rejection emails from customer care",
        "Courier delivery tracking confirmation"
      ],
      prohibited_actions: [
        "Imposing cancellation charges on consumers after purchase unless similar charges are borne by the e-commerce entity if they cancel unilaterally (Rule 4(8))",
        "Manipulating search results or deceptive pricing (Rule 4(11))",
        "Refusing return or refund if product is defective, deficient, delivered late, or materially different from description (Rule 6(4))"
      ],
      escalation_route: [
        "In-app grievance ticket to E-Commerce platform support",
        "Formal escalation to designated Resident Grievance Officer (email and postal address published on website under Rule 4(4))",
        "National Consumer Helpline (NCH 1915 / consumerhelpline.gov.in)",
        "Complaint to CCPA for unfair trade practices across platform under Section 17",
        "e-Jagriti consumer court complaint (e-jagriti.gov.in)"
      ]
    },
    keywords: [
      "ecommerce rules 2020",
      "grievance officer 48 hours",
      "return refund dispute online",
      "spurious counterfeit goods",
      "cancellation charges illegal",
      "marketplace seller dispute"
    ]
  },

  // =========================================================================
  // 1E — MISLEADING ADVERTISEMENTS, UNFAIR TRADE PRACTICES & DARK PATTERNS
  // =========================================================================
  {
    id: "SRC-CONS-1E-001",
    title: "Guidelines for Prevention and Regulation of Dark Patterns, 2023",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1E_MISLEADING_ADS_DARK_PATTERNS",
    summary: "Statutory guidelines notified by CCPA on 30 November 2023 strictly prohibiting 13 specified dark patterns across all platforms: False Urgency, Basket Sneaking, Confirm Shaming, Forced Action, Subscription Trap, Interface Interference, Bait and Switch, Drip Pricing, Disguised Advertisements, Nagging, Trick Questions, SaaS Billing Traps, and Rogue Malware.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Central Consumer Protection Authority (CCPA), The Gazette of India (Extraordinary)",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/dark-patterns-guidelines-2023",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Central Consumer Protection Authority (CCPA)",
      effective_from: "2023-11-30",
      source_updated_date: "2023-11-30",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Section 18, Consumer Protection Act 2019",
      gazette_notification_ref: "Notification F. No. CCPA/1/2023-CCPA"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Commissioner (Enforcement)",
      organization: "Central Consumer Protection Authority (CCPA)",
      portal_url: "https://consumeraffairs.nic.in",
      helpline_number: "1915",
      filing_modes: ["ONLINE", "EMAIL"]
    },
    rules_or_criteria: {
      required_documents: [
        "Screenshots / screen recordings showing checkout interface and undisclosed added charges",
        "Order receipt showing pre-ticked add-on services or hidden fees",
        "Subscription terms and cancellation hurdle screenshots"
      ],
      prohibited_actions: [
        "Drip pricing: Revealing incremental mandatory charges only at final payment step",
        "Basket sneaking: Adding insurance, charity, or items to cart without explicit consent",
        "False urgency: Fabricating false timers or fake low stock alerts",
        "Subscription trap: Making cancellation unreasonably complex compared to sign-up"
      ],
      escalation_route: [
        "Report dark pattern on National Consumer Helpline (NCH 1915)",
        "Formal complaint to CCPA for class action penalty under Section 21 of CPA 2019",
        "Consumer Commission petition for refund of unauthorized drip charges"
      ]
    },
    keywords: [
      "dark patterns guidelines 2023",
      "drip pricing hidden fee",
      "basket sneaking auto add",
      "false urgency fake timer",
      "subscription trap cancel",
      "ccpa dark patterns"
    ]
  },
  {
    id: "SRC-CONS-1E-002",
    title: "Guidelines for Prevention of Misleading Advertisements & Endorsements, 2022",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1E_MISLEADING_ADS_DARK_PATTERNS",
    summary: "CCPA statutory guidelines prohibiting surrogate advertising, unsubstantiated claims, deceptive fine-print disclaimers, and regulating celebrity/influencer endorsements. Imposes penalties up to ₹10 Lakhs (and up to ₹50 Lakhs for subsequent violations) on manufacturers, service providers, and endorsers under Section 21.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Central Consumer Protection Authority, The Gazette of India (Extraordinary)",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/misleading-ad-guidelines-2022",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Central Consumer Protection Authority (CCPA)",
      effective_from: "2022-06-09",
      source_updated_date: "2022-06-09",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Section 18 read with Section 21, Consumer Protection Act 2019",
      gazette_notification_ref: "Notification F. No. J-25/14/2020-CCPA"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Chief Commissioner",
      organization: "Central Consumer Protection Authority (CCPA)",
      portal_url: "https://consumeraffairs.nic.in",
      filing_modes: ["ONLINE", "EMAIL"]
    },
    rules_or_criteria: {
      required_documents: [
        "Copy of print ad, video recording, or social media link of deceptive advertisement",
        "Purchase proof showing product failed to deliver advertised claim",
        "Packaging showing contradictory claims"
      ],
      prohibited_actions: [
        "Disclaimers in font sizes too small to be legible to normal consumer",
        "Bait advertising without reasonable stock availability",
        "Surrogate advertising promoting banned products through brand extensions"
      ],
      escalation_route: [
        "Lodge complaint on GAMA Portal (Grievances Against Misleading Advertisements) / NCH",
        "Petition CCPA for discontinuance and corrective advertisement order under Section 21",
        "District Consumer Commission for individual damages"
      ]
    },
    keywords: [
      "misleading advertisement guidelines 2022",
      "false claims",
      "surrogate advertising",
      "unsubstantiated guarantee",
      "ccpa section 21 penalty",
      "influencer endorsement"
    ]
  },
  {
    id: "SRC-CONS-1E-003",
    title: "Legal Metrology (Packaged Commodities) Rules, 2011 & MRP Compliance",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1E_MISLEADING_ADS_DARK_PATTERNS",
    summary: "Statutory rules under the Legal Metrology Act 2009 mandating clear declarations on all pre-packaged commodities (Maximum Retail Price inclusive of all taxes, unit sale price, net quantity, manufacturer/importer name, consumer care details). Prohibits dual MRP pricing and charging higher than declared MRP.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Department of Consumer Affairs, Ministry of Consumer Affairs, Food and Public Distribution",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/legal-metrology",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Legal Metrology Division, Department of Consumer Affairs / State Legal Metrology Controllers",
      effective_from: "2011-04-01",
      source_updated_date: "2022-12-01",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Legal Metrology Act, 2009 (Act No. 1 of 2010), Sections 18 and 36"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "Controller of Legal Metrology / Inspector of Legal Metrology",
      organization: "State Legal Metrology Department / District Inspectorate",
      portal_url: "https://consumeraffairs.nic.in",
      filing_modes: ["ONLINE", "PHYSICAL_COUNTER"]
    },
    rules_or_criteria: {
      required_documents: [
        "Product packaging / wrapper clearly showing MRP sticker or over-pasting",
        "Invoice / retail bill showing charge higher than printed MRP",
        "Photographs of packaging declarations"
      ],
      prohibited_actions: [
        "Selling pre-packaged goods at a price higher than the Maximum Retail Price (MRP)",
        "Dual MRP: Declaring different MRPs for identical commodities in different establishments",
        "Smudging, altering, or pasting new stickers over original manufacturer MRP"
      ],
      escalation_route: [
        "Complaint to State Legal Metrology Inspector for compounding / seizure under Section 36",
        "National Consumer Helpline (NCH 1915)",
        "Consumer Commission complaint for refund of excess amount and punitive compensation"
      ]
    },
    keywords: [
      "legal metrology packaged commodities",
      "overcharging above mrp",
      "dual mrp illegal",
      "net quantity deficiency",
      "unit sale price declaration"
    ]
  },
  {
    id: "SRC-CONS-1E-004",
    title: "CCPA Guidelines on Prevention of Unfair Trade Practices Regarding Service Charges in Hotels & Restaurants",
    domain: "CONSUMER_PROTECTION",
    subdomain: "1E_MISLEADING_ADS_DARK_PATTERNS",
    summary: "Statutory guidelines issued by CCPA on 4 July 2022 directing that hotels and restaurants shall not levy service charge automatically or by default in food bills. Mandates that service charge is strictly voluntary, optional, and at consumer's discretion.",
    jurisdiction: {
      country: "IN",
      state_ut: "National",
      government_level: "CENTRAL",
      jurisdiction_type: "EXCLUSIVE"
    },
    provenance: {
      official_source_name: "Central Consumer Protection Authority (CCPA), Department of Consumer Affairs",
      official_source_url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection/service-charge-guidelines-2022",
      source_type: "ACT_GAZETTE_RULES",
      administering_authority: "Central Consumer Protection Authority / District Collectors",
      effective_from: "2022-07-04",
      source_updated_date: "2022-07-04",
      last_verified: "2026-08-20",
      verification_status: "CURRENT",
      source_priority: 1,
      legal_basis: "Section 18(2)(l), Consumer Protection Act 2019",
      gazette_notification_ref: "Guideline F. No. J-25/57/2022-CCPA"
    },
    supported_use_cases: [
      "problem_understanding",
      "rights_navigation",
      "authority_identification",
      "citation_provenance"
    ],
    authority_details: {
      designation: "District Collector / CCPA Commissioner",
      organization: "District Administration & Central Consumer Protection Authority",
      portal_url: "https://consumerhelpline.gov.in",
      helpline_number: "1915",
      filing_modes: ["ONLINE"]
    },
    rules_or_criteria: {
      required_documents: [
        "Restaurant food bill showing mandatory addition of service charge",
        "Proof of objection/request to remove service charge"
      ],
      prohibited_actions: [
        "Adding service charge automatically or by default in the food bill",
        "Restricting entry or service delivery on refusal to pay service charge",
        "Collecting service charge under disguise of another statutory levy"
      ],
      escalation_route: [
        "Request restaurant management to remove service charge from bill",
        "Lodge complaint on NCH 1915 / NCH Mobile App",
        "Submit grievance to District Collector for investigation under Section 19",
        "File complaint via e-Jagriti (e-jagriti.gov.in) before District Consumer Commission"
      ]
    },
    keywords: [
      "service charge restaurant illegal",
      "ccpa service charge guidelines",
      "mandatory service charge",
      "hotel bill dispute",
      "voluntary tipping"
    ]
  }
];
