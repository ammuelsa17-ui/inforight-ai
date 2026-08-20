export interface SchemeDefinition {
  id: string;
  title: string;
  ministry: string;
  state: string;
  targetCategory: string;
  minAge?: number;
  maxAge?: number;
  maxIncome?: number;
  occupations?: string[];
  isStudentOnly?: boolean;
  areaType?: "urban" | "rural" | "both";
  benefits: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  officialApplyUrl: string;
  lastVerifiedDate: string;
}

export const VERIFIED_SCHEMES_REGISTRY: SchemeDefinition[] = [
  {
    id: "TN_POST_MATRIC_SCHOLARSHIP",
    title: "Tamil Nadu Post-Matric Scholarship Scheme",
    ministry: "Backward Classes, MBC & Minorities Welfare Department",
    state: "Tamil Nadu",
    targetCategory: "Students pursuing post-matric / degree education",
    minAge: 15,
    maxAge: 30,
    maxIncome: 250000, // ₹2.5 Lakhs annual income limit
    occupations: ["student"],
    isStudentOnly: true,
    areaType: "both",
    benefits: "100% compulsory tuition fee waiver, maintenance allowance up to ₹4,000/year, hostel fee support.",
    eligibilityCriteria: [
      "Must be a domicile resident of Tamil Nadu.",
      "Must be pursuing post-matriculation higher education (Diploma, UG, PG, Professional courses).",
      "Annual family income must not exceed ₹2,50,000 per annum.",
    ],
    requiredDocuments: [
      "Community Certificate",
      "Income Certificate issued by Revenue Department",
      "Aadhaar Card copy",
      "Previous Year Mark Sheet",
      "Bank Account Passbook (Aadhaar Seeded)",
    ],
    officialApplyUrl: "https://www.myscheme.gov.in/",
    lastVerifiedDate: "2026-02-15",
  },
  {
    id: "TN_MOOVALUR_RAMAMIRTHAM_PUDHUMAI_PENN",
    title: "Pudhumai Penn Scheme (Higher Education Assurance)",
    ministry: "Social Welfare and Women Empowerment Department",
    state: "Tamil Nadu",
    targetCategory: "Female students pursuing higher education",
    minAge: 17,
    maxAge: 25,
    maxIncome: 500000,
    occupations: ["student"],
    isStudentOnly: true,
    areaType: "both",
    benefits: "Monthly financial assistance of ₹1,000 directly credited to bank account until degree completion.",
    eligibilityCriteria: [
      "Female students who studied Class 6th to 12th in Tamil Nadu Government Schools.",
      "Enrolled in undergraduate degree, diploma, ITI, or professional courses in recognized institutions.",
    ],
    requiredDocuments: [
      "Class 6th to 12th Government School Study Certificate",
      "Aadhaar Card",
      "College Admission Slip",
      "Student Bank Account Details",
    ],
    officialApplyUrl: "https://www.myscheme.gov.in/",
    lastVerifiedDate: "2026-02-15",
  },
  {
    id: "PM_KISAN_SAMMAN_NIDHI",
    title: "PM Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    state: "National",
    targetCategory: "Small and marginal farmer families",
    minAge: 18,
    maxAge: 75,
    maxIncome: 300000,
    occupations: ["farmer"],
    isStudentOnly: false,
    areaType: "rural",
    benefits: "Financial benefit of ₹6,000 per year payable in three equal quarterly installments of ₹2,000.",
    eligibilityCriteria: [
      "Landholding farmer families with cultivable landholding in revenue records.",
      "Excludes institutional landholders and high-income taxpayers.",
    ],
    requiredDocuments: [
      "Land Ownership Records (Patta / Chitta / Revenue Records)",
      "Aadhaar Card",
      "Bank Account Number with IFSC",
    ],
    officialApplyUrl: "https://www.myscheme.gov.in/",
    lastVerifiedDate: "2026-02-15",
  },
  {
    id: "TN_KALAIGNAR_MAGALIR_URIMAI_THOGAI",
    title: "Kalaignar Magalir Urimai Thogai Scheme",
    ministry: "Special Programme Implementation Department",
    state: "Tamil Nadu",
    targetCategory: "Eligible female heads of household",
    minAge: 21,
    maxAge: 65,
    maxIncome: 250000,
    occupations: ["self_employed", "unemployed", "farmer"],
    isStudentOnly: false,
    areaType: "both",
    benefits: "Monthly financial rights allowance of ₹1,000 credited to bank accounts of female household heads.",
    eligibilityCriteria: [
      "Family annual income below ₹2.5 Lakhs.",
      "Family electricity consumption below 3,600 units per year.",
      "Family does not own 4-wheeler or income tax filing history.",
    ],
    requiredDocuments: [
      "Family Smart Ration Card",
      "Aadhaar Card",
      "Electricity Consumer Number",
      "Bank Account Details",
    ],
    officialApplyUrl: "https://www.myscheme.gov.in/",
    lastVerifiedDate: "2026-02-15",
  },
  {
    id: "PM_PRADHAN_MANTRI_AWAS_YOJANA",
    title: "Pradhan Mantri Awas Yojana (PMAY-Urban)",
    ministry: "Ministry of Housing and Urban Affairs",
    state: "National",
    targetCategory: "Economically Weaker Section (EWS) / Low Income Group (LIG)",
    minAge: 21,
    maxAge: 70,
    maxIncome: 300000,
    occupations: ["self_employed", "unemployed", "salaried"],
    isStudentOnly: false,
    areaType: "urban",
    benefits: "Interest subsidy of up to ₹2.67 Lakhs on housing loans for first-time pucca house construction.",
    eligibilityCriteria: [
      "Beneficiary family should not own a pucca house anywhere in India.",
      "Annual household income for EWS up to ₹3 Lakhs.",
    ],
    requiredDocuments: [
      "Income Certificate",
      "Aadhaar Card of all family members",
      "Proof of no pucca house ownership affidavit",
    ],
    officialApplyUrl: "https://www.myscheme.gov.in/",
    lastVerifiedDate: "2026-02-15",
  },
];
