import { MasterDomain, AnySubdomain } from "@/types/source-data";
import { UserIntent } from "@/types/router";

interface ClassificationResult {
  intent: UserIntent;
  domain: MasterDomain | "FORM_FILLING";
  subdomain?: AnySubdomain;
  confidence: number;
}

/**
 * Domain-specific keyword signatures
 */
const DOMAIN_SIGNATURES: Record<MasterDomain | "FORM_FILLING", string[]> = {
  TENANT_RIGHTS: [
    "landlord", "tenant", "rent", "advance", "security deposit", "rental agreement",
    "evict", "eviction", "lockout", "electricity cut", "water cut", "lease",
    "wear and tear", "rent authority", "rent court", "owner not returning", "flat deposit", "house rent"
  ],
  CONSUMER_PROTECTION: [
    "amazon", "flipkart", "refund", "defective", "warranty", "seller", "replacement",
    "delivery", "e-commerce", "service charge", "overcharging", "mrp", "flight delay",
    "cancelled flight", "bank fraud", "unauthorized debit", "upi failed", "insurance claim",
    "telecom", "fssai", "adulteration", "drip pricing", "dark pattern", "consumer court", "ejagriti", "e-jagriti", "edaakhil", "nch"
  ],
  RTI_ACCESS: [
    "rti", "right to information", "panchayat spent", "road expenditure", "sanction order",
    "work order", "measurement book", "certified copy", "cpio", "spio", "first appeal",
    "second appeal", "cic", "tnic", "public authority", "inspection of records", "tender copy",
    "how much government spent", "how much my panchayat spent", "road tender"
  ],
  WELFARE_SCHEMES: [
    "scheme", "scholarship", "subsidy", "pension", "pm-kisan", "pm kisan", "pm-jay", "ayushman",
    "pmmvy", "maternity benefit", "post matric", "pre matric", "yasasvi", "pudhumai penn",
    "magalir urimai", "kmut", "job card", "nrega", "mgnrega", "eshram", "e-shram", "vishwakarma",
    "mudra", "pmay", "surya ghar", "bpl", "eligible", "eligibility", "income 1.8 lakh", "income 2.5 lakh"
  ],
  WORKPLACE_RIGHTS: [
    "salary", "unpaid salary", "delayed salary", "unlawful deduction", "overtime",
    "maternity leave", "terminated", "termination", "retrenchment", "fired", "gratuity",
    "epf", "provident fund", "pf not deposited", "esic", "gig worker", "delivery partner",
    "samadhan", "labour court", "labour commissioner", "posh", "sexual harassment workplace"
  ],
  FORM_FILLING: [
    "fill form", "form application", "draft application", "application form",
    "form 1", "form n", "ejagriti form", "edaakhil form", "rti form"
  ]
};

export function classifyIntentAndDomain(query: string): ClassificationResult {
  const lowerQuery = query.toLowerCase();
  
  // 1. Check RTI Drafting
  if (
    lowerQuery.includes("rti") ||
    lowerQuery.includes("how much my panchayat spent") ||
    lowerQuery.includes("how much government spent") ||
    lowerQuery.includes("certified copy of") ||
    lowerQuery.includes("work order") ||
    lowerQuery.includes("sanction order") ||
    lowerQuery.includes("tender copy")
  ) {
    let intent: UserIntent = "RTI_DRAFTING";
    if (lowerQuery.includes("first appeal") || lowerQuery.includes("second appeal")) {
      intent = "GRIEVANCE_ESCALATION";
    }
    return {
      intent,
      domain: "RTI_ACCESS",
      subdomain: "3B_RTI_DRAFTING_FILING",
      confidence: 0.95
    };
  }

  // 2. Check Tenancy
  if (
    lowerQuery.includes("landlord") ||
    lowerQuery.includes("tenant") ||
    lowerQuery.includes("advance") ||
    lowerQuery.includes("security deposit") ||
    lowerQuery.includes("evict") ||
    lowerQuery.includes("rental agreement")
  ) {
    let subdomain: AnySubdomain = "2A_BASIC_RIGHTS_FRAMEWORK";
    if (lowerQuery.includes("advance") || lowerQuery.includes("deposit") || lowerQuery.includes("rent")) {
      subdomain = "2B_RENT_DEPOSIT_RECEIPTS";
    } else if (lowerQuery.includes("water") || lowerQuery.includes("electricity") || lowerQuery.includes("utility")) {
      subdomain = "2C_REPAIRS_UTILITIES_PRIVACY";
    } else if (lowerQuery.includes("evict") || lowerQuery.includes("lockout") || lowerQuery.includes("throw")) {
      subdomain = "2D_EVICTION_NOTICE_LOCKOUT";
    }

    return {
      intent: "RIGHTS_NAVIGATION",
      domain: "TENANT_RIGHTS",
      subdomain,
      confidence: 0.92
    };
  }

  // 3. Check Welfare Schemes
  if (
    lowerQuery.includes("scholarship") ||
    lowerQuery.includes("scheme") ||
    lowerQuery.includes("mbc") ||
    lowerQuery.includes("pension") ||
    lowerQuery.includes("pm-kisan") ||
    lowerQuery.includes("pmkisan") ||
    lowerQuery.includes("ayushman") ||
    lowerQuery.includes("pudhumai penn") ||
    (lowerQuery.includes("student") && lowerQuery.includes("income"))
  ) {
    let subdomain: AnySubdomain = "4B_STUDENTS_SCHOLARSHIPS";
    if (lowerQuery.includes("farmer") || lowerQuery.includes("pm-kisan") || lowerQuery.includes("crop")) {
      subdomain = "4H_FARMERS_AGRICULTURE";
    } else if (lowerQuery.includes("pension") || lowerQuery.includes("old age")) {
      subdomain = "4G_SENIOR_CITIZENS_PENSION";
    } else if (lowerQuery.includes("maternity") || lowerQuery.includes("pregnant") || lowerQuery.includes("girl")) {
      subdomain = "4A_WOMEN_CHILDREN_FAMILY";
    }

    return {
      intent: "SCHEME_ELIGIBILITY",
      domain: "WELFARE_SCHEMES",
      subdomain,
      confidence: 0.90
    };
  }

  // 4. Check Workplace
  if (
    lowerQuery.includes("salary") ||
    lowerQuery.includes("employer") ||
    lowerQuery.includes("termination") ||
    lowerQuery.includes("retrenchment") ||
    lowerQuery.includes("gratuity") ||
    lowerQuery.includes("epf") ||
    lowerQuery.includes("provident fund") ||
    lowerQuery.includes("gig worker") ||
    lowerQuery.includes("delivery partner")
  ) {
    let subdomain: AnySubdomain = "WORKPLACE_WAGES_CONDITIONS";
    if (lowerQuery.includes("maternity")) {
      subdomain = "WORKPLACE_MATERNITY_PROTECTION";
    } else if (lowerQuery.includes("termination") || lowerQuery.includes("fired") || lowerQuery.includes("retrenched")) {
      subdomain = "WORKPLACE_DISPUTES_TERMINATION";
    } else if (lowerQuery.includes("epf") || lowerQuery.includes("pf") || lowerQuery.includes("gratuity") || lowerQuery.includes("esic")) {
      subdomain = "WORKPLACE_SOCIAL_SECURITY";
    }

    return {
      intent: "RIGHTS_NAVIGATION",
      domain: "WORKPLACE_RIGHTS",
      subdomain,
      confidence: 0.88
    };
  }

  // 5. Check Consumer
  if (
    lowerQuery.includes("amazon") ||
    lowerQuery.includes("flipkart") ||
    lowerQuery.includes("refund") ||
    lowerQuery.includes("defective") ||
    lowerQuery.includes("seller") ||
    lowerQuery.includes("service charge") ||
    lowerQuery.includes("overcharging") ||
    lowerQuery.includes("mrp") ||
    lowerQuery.includes("bank fraud") ||
    lowerQuery.includes("insurance")
  ) {
    let subdomain: AnySubdomain = "1B_DEFECTIVE_PRODUCTS_REFUND";
    if (lowerQuery.includes("amazon") || lowerQuery.includes("flipkart") || lowerQuery.includes("e-commerce") || lowerQuery.includes("online order")) {
      subdomain = "1D_ECOMMERCE_ONLINE_SHOPPING";
    } else if (lowerQuery.includes("service charge") || lowerQuery.includes("dark pattern") || lowerQuery.includes("mrp")) {
      subdomain = "1E_MISLEADING_ADS_DARK_PATTERNS";
    } else if (lowerQuery.includes("bank") || lowerQuery.includes("insurance") || lowerQuery.includes("flight") || lowerQuery.includes("electricity")) {
      subdomain = "1F_SECTOR_SPECIFIC_DISPUTES";
    }

    return {
      intent: "RIGHTS_NAVIGATION",
      domain: "CONSUMER_PROTECTION",
      subdomain,
      confidence: 0.88
    };
  }

  // Fallback domain scoring
  let bestDomain: MasterDomain = "CONSUMER_PROTECTION";
  let maxMatches = 0;

  for (const [dom, keywords] of Object.entries(DOMAIN_SIGNATURES)) {
    const matches = keywords.filter((k) => lowerQuery.includes(k)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestDomain = dom as MasterDomain;
    }
  }

  return {
    intent: "RIGHTS_NAVIGATION",
    domain: bestDomain,
    confidence: maxMatches > 0 ? 0.75 : 0.5
  };
}
