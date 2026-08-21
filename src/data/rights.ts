export interface RightDetail {
  explanation: string;
  applies: string;
  whatToDo: string;
  law: string;
  documents: string[];
  help: string;
  related: { name: string; id: string }[];
}

export interface RightCategory {
  id: string;
  title: string;
  description: string;
  iconName: "Scale" | "ShoppingBag" | "Home" | "Briefcase" | "UserCheck" | "GraduationCap" | "Heart" | "HelpCircle" | "Shield" | "Globe";
  details: RightDetail;
}

export const RIGHTS_DATA: Record<string, RightCategory> = {
  fundamental: {
    id: "fundamental",
    title: "Fundamental Rights",
    description: "Basic constitutional protections including equality, speech, and legal remedy guarantees under the Indian Constitution.",
    iconName: "Scale",
    details: {
      explanation: "Fundamental Rights are the core rights guaranteed to all Indian citizens under Part III of the Constitution. They protect citizens against arbitrary state actions and guarantee freedom of speech, assembly, religion, and equal protection under law.",
      applies: "Applies at all times in all territories of India. No authority, municipal body, or state legislature can formulate regulations that violate these constitutional protections.",
      whatToDo: "If a fundamental right is violated (e.g. unlawful detention, discrimination by a public authority), a citizen can file a Writ Petition under Article 32 in the Supreme Court or under Article 226 in the respective High Court.",
      law: "Articles 14 to 32 of the Constitution of India (including Right to Equality, Freedom of Speech, and Right to Constitutional Remedies).",
      documents: ["Copy of discriminatory government orders or rules", "Affidavit explaining the violation factually", "Representations submitted previously to officials"],
      help: "High Court Legal Services Committee, Supreme Court Legal Aid Cell, or National Legal Services Authority (NALSA) at helpline 15100.",
      related: [
        { name: "Legal Aid Directory", id: "legal-aid" },
        { name: "Labour Rights", id: "labour" }
      ]
    }
  },
  consumer: {
    id: "consumer",
    title: "Consumer Rights",
    description: "Protection against commercial exploitation, substandard products, and unfair trade practices.",
    iconName: "ShoppingBag",
    details: {
      explanation: "Consumer rights protect buyers from fraudulent transactions, spurious goods, and deficient services. It guarantees the right to be informed about product quality, price, safety standards, and provides a clear mechanism for claiming refunds and damages.",
      applies: "Applies whenever you purchase goods or hire services for commercial or personal use, including retail, e-commerce, banking, insurance, and medical services.",
      whatToDo: "Send a formal written notice to the merchant. If they fail to resolve it, file a consumer complaint on the National Consumer Helpline (NCH) or approach the District Consumer Disputes Redressal Commission.",
      law: "The Consumer Protection Act, 2019.",
      documents: ["Purchase invoice / bill receipt", "Warranty card / service contracts", "Written email correspondence with customer support"],
      help: "National Consumer Helpline (NCH) toll-free 1915, or visit consumerhelpline.gov.in.",
      related: [
        { name: "Tenant Rights", id: "tenant" },
        { name: "Cyber Rights", id: "cyber" }
      ]
    }
  },
  tenant: {
    id: "tenant",
    title: "Tenant Rights",
    description: "Protection against arbitrary rent hikes, unfair deposit withholdings, and illegal evictions.",
    iconName: "Home",
    details: {
      explanation: "Tenancy regulations protect renters from arbitrary evictions, illegal utility cutoffs, and unfair withholding of security deposits by landlords. It mandates the execution of written tenancy agreements and limits deposits to a maximum of 2-3 months rent in most states.",
      applies: "Applies to residential and commercial tenants who have signed a rental agreement or are living under legal lease arrangements in urban zones.",
      whatToDo: "Draft a formal response pointing to the Rent Control Act provisions. If the landlord cuts utilities or threatens eviction without a court order, petition the local Rent Control Authority/Sub-Divisional Magistrate.",
      law: "The Model Tenancy Act, 2021 (adopted by states, e.g., TN Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017).",
      documents: ["Registered Rental/Lease Agreement", "Rent payment receipts or bank logs", "Security deposit transaction receipt"],
      help: "Local Rent Authority Office, Sub-Divisional Magistrate (SDM), or District Court Legal Clinics.",
      related: [
        { name: "Consumer Rights", id: "consumer" },
        { name: "Legal Aid Directory", id: "legal-aid" }
      ]
    }
  },
  labour: {
    id: "labour",
    title: "Labour & Work Rights",
    description: "Protections regarding minimum wages, working hours, safety regulations, and overtime compensations.",
    iconName: "Briefcase",
    details: {
      explanation: "Labour laws safeguard workers from exploitation, ensuring fair wages, standard working hours, paid leaves, and safe, hygienic workspaces. It also prohibits forced labour, child labour, and guarantees the right to form trade unions.",
      applies: "Applies to all employees and contractual workers working in factories, shops, commercial establishments, startups, and public sector offices.",
      whatToDo: "Register a complaint with the Deputy Labour Commissioner or submit a petition to the Labour Court for recovery of unpaid wages or wrongful termination.",
      law: "The Code on Wages, 2019 and The Occupational Safety, Health and Working Conditions Code, 2020.",
      documents: ["Employment Offer Letter or ID Card", "Salary slips or bank statement showing payment history", "Official communication logs regarding termination or dispute"],
      help: "Office of the Labour Commissioner, Ministry of Labour & Employment, or State Trade Union Legal desks.",
      related: [
        { name: "Fundamental Rights", id: "fundamental" },
        { name: "Women's Rights", id: "womens" }
      ]
    }
  },
  womens: {
    id: "womens",
    title: "Women's Rights",
    description: "Protection against domestic violence, workplace harassment, and right to equal pay.",
    iconName: "UserCheck",
    details: {
      explanation: "Women's Rights encompass protections against physical, mental, or sexual harassment. This includes laws prohibiting domestic violence, workplace sexual harassment, female foeticide, and ensuring equal pay for equal work.",
      applies: "Applies to all women in public places, private households, and formal or informal work environments.",
      whatToDo: "Contact local police at 1091 or approach the Internal Complaints Committee (ICC) at the workplace. For domestic issues, petition the Protection Officer under the Domestic Violence Act.",
      law: "Protection of Women from Domestic Violence Act, 2005; Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
      documents: ["Written logs of incidents with dates", "Audio-visual records or text messages if available", "Previous medical certificates or police complaints"],
      help: "National Commission for Women (NCW) helpline 7827170170, or Emergency Helpline 112 / 1091.",
      related: [
        { name: "Fundamental Rights", id: "fundamental" },
        { name: "Student Rights", id: "student" }
      ]
    }
  },
  student: {
    id: "student",
    title: "Student Rights",
    description: "Access to education, anti-ragging protections, and fair assessment guarantees.",
    iconName: "GraduationCap",
    details: {
      explanation: "Student rights guarantee children under 14 the fundamental right to free and compulsory education. In higher education, it protects students from physical/mental abuse (ragging), sexual harassment, and guarantees fair evaluation standards.",
      applies: "Applies to school students, university students, and applicants to public and private educational institutions.",
      whatToDo: "Report ragging issues immediately to the National Anti-Ragging Helpline. For academic disputes, approach the College Ombudsman or file an RTI requesting answer sheet keys.",
      law: "Right to Education (RTE) Act, 2009; UGC Anti-Ragging Regulations.",
      documents: ["Admission card or tuition fee receipts", "Copy of university bylaws or regulations booklet", "E-mails sent to college administration detailing complaints"],
      help: "National Anti-Ragging Helpline 1800-180-5522, or University Grievance Redressal Cell.",
      related: [
        { name: "Fundamental Rights", id: "fundamental" },
        { name: "Women's Rights", id: "womens" }
      ]
    }
  },
  senior: {
    id: "senior",
    title: "Senior Citizen Rights",
    description: "Right to maintenance, healthcare benefits, and priority municipal services.",
    iconName: "Heart",
    details: {
      explanation: "Protects the elderly by establishing a legal obligation for children to provide food, shelter, and medical care. It also provides for government senior citizen pensions, subsidized medical facilities, and fast-track grievance processing in civil matters.",
      applies: "Applies to all Indian citizens aged 60 years or above.",
      whatToDo: "File an application for maintenance from children or relatives before the Maintenance Tribunal headed by the Sub-Divisional Magistrate.",
      law: "Maintenance and Welfare of Parents and Senior Citizens Act, 2007.",
      documents: ["Age proof (Aadhaar or Birth Certificate)", "Details of children/relatives assets", "Monthly medical prescription bills and expense records"],
      help: "Elderline National Helpline for Senior Citizens 14567.",
      related: [
        { name: "Legal Aid Directory", id: "legal-aid" },
        { name: "Fundamental Rights", id: "fundamental" }
      ]
    }
  },
  "legal-aid": {
    id: "legal-aid",
    title: "Legal Aid",
    description: "Access to free legal representation and consultation for eligible citizens.",
    iconName: "HelpCircle",
    details: {
      explanation: "Legal Aid guarantees that no citizen is denied justice due to financial or social disability. Eligible citizens (including women, children, SC/ST members, and low-income earners) are provided free lawyers, court fee waivers, and help in draft filing.",
      applies: "Applies to litigants in any civil, criminal, or revenue court, or before any administrative tribunal.",
      whatToDo: "Apply for legal services directly at the District Court Legal Services Authority (DLSA) or apply online through the NALSA portal.",
      law: "The Legal Services Authorities Act, 1987 (Article 39A of the Constitution).",
      documents: ["Income Certificate or BPL Card", "Identity and residence certificates", "Copy of summons or court petition documents"],
      help: "National Legal Services Authority (NALSA) toll-free 15100, or visit local District Court complex.",
      related: [
        { name: "Fundamental Rights", id: "fundamental" },
        { name: "Senior Citizen Rights", id: "senior" }
      ]
    }
  },
  cyber: {
    id: "cyber",
    title: "Cyber Rights",
    description: "Protection from online fraud, data identity theft, cyberstalking, and hacking.",
    iconName: "Shield",
    details: {
      explanation: "Cyber rights protect your digital identity, data privacy, and online transactions. It outlines the legal remedies against unauthorized data breaches, cyber blackmail, online phishing scams, and digital financial fraud.",
      applies: "Applies to anyone who uses internet services, digital payments, smart devices, or experiences cyber abuse.",
      whatToDo: "File a complaint immediately on the National Cyber Crime Reporting Portal or report to the nearest local Cyber Police Cell within 24 hours of a financial fraud.",
      law: "Information Technology Act, 2000 and Digital Personal Data Protection (DPDP) Act, 2023.",
      documents: ["Screenshots of fraudulent chats/emails", "Bank transaction logs or UPI debit alerts", "Domain registration / IP address logs if available"],
      help: "National Cyber Crime Helpline 1930, or cybercrime.gov.in.",
      related: [
        { name: "Consumer Rights", id: "consumer" },
        { name: "Public Services", id: "public-services" }
      ]
    }
  },
  "public-services": {
    id: "public-services",
    title: "Public Services Right",
    description: "Time-bound delivery of public services (birth certificates, water connections, street cleaning).",
    iconName: "Globe",
    details: {
      explanation: "Guarantees that municipal and government departments must deliver public services (like passport verification, property registration, municipal cleaning, water connections) within a set statutory timeframe, or face penalties.",
      applies: "Applies to all residents requesting certificates, utility connections, or service complaints to local municipal offices.",
      whatToDo: "File a service request on the state e-district portal. If the service is delayed past the SLA, file a Right to Service (RTS) appeal with the Appellate Authority.",
      law: "Right to Service Acts (implemented in various states, e.g., Kerala State Right to Service Act, Karnataka Sakala Act).",
      documents: ["Acknowledgment slip with service request number", "Previous complaint copies", "SLA timeline document for that specific service"],
      help: "State e-Governance / e-District portals, or the municipal Central Commissioner Office.",
      related: [
        { name: "Tenant Rights", id: "tenant" },
        { name: "Cyber Rights", id: "cyber" }
      ]
    }
  }
};
