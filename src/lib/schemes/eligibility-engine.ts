import { VerifiedSourceRecord } from "@/types/source-data";
import { WELFARE_SOURCES } from "@/data/sources/schemes";
import {
  UserEligibilityProfile,
  SchemeEvaluationResult,
  EligibilityEvaluationState,
  WelfareBenefitType,
  MANDATORY_SCHEME_DISCLAIMER
} from "@/types/scheme-navigator";
import { VERIFIED_SCHEME_REGISTRY, VerifiedSchemeRule } from "@/data/schemes/schemes-registry";

export interface EvaluatedSchemeOutput {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  governmentLevel: string;
  stateUt: string;
  ministryOrDept: string;
  summary: string;
  benefitDescription: string;
  benefitType: WelfareBenefitType;
  isLoanOrCredit: boolean;
  evaluationState: EligibilityEvaluationState;
  matchedConditions: string[];
  failedConditions: string[];
  missingConditions: string[];
  whyMatched: string;
  whatIsMissing: string;
  requiredDocuments: string[];
  portalUrl?: string;
  applicationMode: string;
  statutoryFee?: string;
  lastVerified: string;
  verificationStatus: string;
  officialSourceName: string;
  officialSourceUrl: string;
}

/**
 * Determines the benefit type classification from record metadata and text
 */
export function classifyBenefitType(record: VerifiedSourceRecord): {
  type: WelfareBenefitType;
  isLoan: boolean;
} {
  const text = (
    record.title +
    " " +
    record.summary +
    " " +
    (record.rules_or_criteria?.benefit_amount_or_details || "")
  ).toLowerCase();

  if (
    text.includes("loan") ||
    text.includes("credit") ||
    text.includes("mudra") ||
    text.includes("svanidhi") ||
    text.includes("interest subvention")
  ) {
    return { type: text.includes("credit") ? "CREDIT" : "LOAN", isLoan: true };
  }
  if (
    text.includes("scholarship") ||
    text.includes("tuition fee") ||
    text.includes("stipend") ||
    text.includes("maintenance allowance") ||
    text.includes("fellowship")
  ) {
    return { type: "SCHOLARSHIP", isLoan: false };
  }
  if (
    text.includes("pension") ||
    text.includes("monthly pension") ||
    text.includes("social security pension") ||
    text.includes("divyang pension")
  ) {
    return { type: "PENSION", isLoan: false };
  }
  if (
    text.includes("insurance") ||
    text.includes("pmjjby") ||
    text.includes("pmsby") ||
    text.includes("health insurance") ||
    text.includes("assurance") ||
    text.includes("ayushman")
  ) {
    return { type: "INSURANCE", isLoan: false };
  }
  if (
    text.includes("subsidy") ||
    text.includes("interest subsidy") ||
    text.includes("lpg subsidy")
  ) {
    return { type: "SUBSIDY", isLoan: false };
  }
  if (
    text.includes("ration") ||
    text.includes("food grains") ||
    text.includes("pmgkay") ||
    text.includes("free food")
  ) {
    return { type: "IN_KIND_FOOD", isLoan: false };
  }
  if (
    text.includes("training") ||
    text.includes("skill") ||
    text.includes("apprenticeship")
  ) {
    return { type: "TRAINING", isLoan: false };
  }
  return { type: "GRANT", isLoan: false };
}

/**
 * Evaluates a user profile against all 91 verified welfare scheme source records.
 * Deterministic, rule-grounded, and zero-hallucination.
 */
export function evaluateAllWelfareSchemes(
  profile: UserEligibilityProfile = {},
  records: VerifiedSourceRecord[] = WELFARE_SOURCES
): EvaluatedSchemeOutput[] {
  const evaluatedList: EvaluatedSchemeOutput[] = [];

  for (const record of records) {
    const { type: benefitType, isLoan } = classifyBenefitType(record);
    const rules = record.rules_or_criteria || {};
    const recordState = record.jurisdiction.state_ut || "National";
    const userState = (profile.state_ut || "").trim();

    const matchedConditions: string[] = [];
    const failedConditions: string[] = [];
    const missingConditions: string[] = [];

    // CRITICAL GUARD: NEEDS_REVERIFICATION schemes can NEVER be confirmed as ELIGIBLE
    if (record.provenance.verification_status === "NEEDS_REVERIFICATION") {
      evaluatedList.push({
        id: record.id,
        title: record.title,
        domain: record.domain,
        subdomain: record.subdomain,
        governmentLevel: record.jurisdiction.government_level,
        stateUt: recordState,
        ministryOrDept:
          record.provenance.administering_authority || "Administering Authority",
        summary: record.summary,
        benefitDescription: rules.benefit_amount_or_details || record.summary,
        benefitType,
        isLoanOrCredit: isLoan,
        evaluationState: "UNKNOWN",
        matchedConditions: [],
        failedConditions: [],
        missingConditions: [
          "Official scheme guidelines and operational status under departmental review / reverification"
        ],
        whyMatched: "Scheme record flagged for official reverification.",
        whatIsMissing:
          "Official notification reconfirming operational status and current guidelines.",
        requiredDocuments: rules.required_documents || ["Aadhaar Card", "Application Form"],
        portalUrl: record.authority_details?.portal_url,
        applicationMode:
          record.authority_details?.filing_modes?.join(" & ") || "Online / Official Counter",
        lastVerified: record.provenance.last_verified,
        verificationStatus: record.provenance.verification_status,
        officialSourceName: record.provenance.official_source_name,
        officialSourceUrl: record.provenance.official_source_url
      });
      continue;
    }

    // 1. State / UT Domicile Check
    if (
      record.jurisdiction.government_level === "STATE" &&
      recordState !== "National" &&
      recordState !== "All States"
    ) {
      if (!userState) {
        missingConditions.push(`State domicile verification (Restricted to ${recordState})`);
      } else if (userState.toLowerCase() !== recordState.toLowerCase()) {
        failedConditions.push(
          `Restricted to residents of ${recordState} (User domicile: ${userState})`
        );
      } else {
        matchedConditions.push(`Resident of ${recordState}`);
      }
    } else if (userState) {
      matchedConditions.push("All-India Central / National Scheme");
    }

    const userIncome = profile.annual_income !== undefined ? profile.annual_income : profile.annual_family_income;
    const userStudent = profile.is_student !== undefined ? profile.is_student : profile.current_student;
    const userDisability = profile.has_disability !== undefined ? profile.has_disability : profile.is_pwd;

    // 2. Annual Income Check
    if (rules.annual_income_limit !== undefined) {
      if (userIncome === undefined || userIncome === null) {
        missingConditions.push(
          `Annual family income verification (Ceiling: ₹${rules.annual_income_limit.toLocaleString("en-IN")})`
        );
      } else if (userIncome <= rules.annual_income_limit) {
        matchedConditions.push(
          `Income ₹${userIncome.toLocaleString("en-IN")} within ceiling limit (₹${rules.annual_income_limit.toLocaleString("en-IN")})`
        );
      } else {
        failedConditions.push(
          `Income ₹${userIncome.toLocaleString("en-IN")} exceeds maximum ceiling of ₹${rules.annual_income_limit.toLocaleString("en-IN")}`
        );
      }
    }

    // 3. Age Checks
    if (rules.min_age !== undefined) {
      if (profile.age === undefined) {
        missingConditions.push(`Age verification (Minimum: ${rules.min_age} years)`);
      } else if (profile.age >= rules.min_age) {
        matchedConditions.push(`Age ${profile.age} satisfies minimum age (${rules.min_age}+)`);
      } else {
        failedConditions.push(`Age ${profile.age} is below minimum required (${rules.min_age} years)`);
      }
    }

    if (rules.max_age !== undefined) {
      if (profile.age === undefined) {
        missingConditions.push(`Age verification (Maximum: ${rules.max_age} years)`);
      } else if (profile.age <= rules.max_age) {
        matchedConditions.push(`Age ${profile.age} is within maximum age limit (${rules.max_age})`);
      } else {
        failedConditions.push(`Age ${profile.age} exceeds maximum limit (${rules.max_age} years)`);
      }
    }

    // 4. Specific Target Group / Occupation / Student Checks
    const recordText = (
      record.title +
      " " +
      record.summary +
      " " +
      (rules.benefit_amount_or_details || "")
    ).toLowerCase();

    // Student Status
    if (
      recordText.includes("student") ||
      recordText.includes("scholarship") ||
      recordText.includes("education") ||
      recordText.includes("post-matric") ||
      recordText.includes("pre-matric") ||
      recordText.includes("pudhumai")
    ) {
      if (userStudent === undefined) {
        missingConditions.push("Student enrollment confirmation (School / College / University)");
      } else if (!userStudent) {
        failedConditions.push("Requires active student enrollment in recognized educational institution");
      } else {
        matchedConditions.push("Active student enrollment confirmed");
      }
    }

    // Farmer Status
    if (
      recordText.includes("farmer") ||
      recordText.includes("pm-kisan") ||
      recordText.includes("rythu") ||
      recordText.includes("kalia") ||
      recordText.includes("agriculture") ||
      recordText.includes("krishi")
    ) {
      if (profile.is_farmer === undefined) {
        missingConditions.push("Farmer / Agricultural landholder status verification");
      } else if (!profile.is_farmer) {
        failedConditions.push("Requires agricultural landholding / cultivator status");
      } else {
        matchedConditions.push("Farmer / Landholder status verified");
      }
    }

    // Disability (PwD)
    if (
      recordText.includes("disability") ||
      recordText.includes("divyang") ||
      recordText.includes("pwd") ||
      recordText.includes("adip")
    ) {
      if (userDisability === undefined) {
        missingConditions.push("Person with Benchmark Disability (PwD) status verification");
      } else if (!userDisability) {
        failedConditions.push("Requires Person with Disability (PwD) certificate (Minimum 40% benchmark)");
      } else if (
        profile.disability_percentage !== undefined &&
        profile.disability_percentage < 40
      ) {
        failedConditions.push(
          `Disability percentage (${profile.disability_percentage}%) is below statutory benchmark (40%)`
        );
      } else {
        matchedConditions.push("Person with Benchmark Disability (PwD) confirmed");
      }
    }

    // Gender (Women / Girl Child)
    if (
      recordText.includes("women") ||
      recordText.includes("girl child") ||
      recordText.includes("maternity") ||
      recordText.includes("magalir") ||
      recordText.includes("kanya") ||
      recordText.includes("mahila") ||
      recordText.includes("widow")
    ) {
      if (profile.gender === undefined) {
        missingConditions.push("Gender confirmation (Targeted to female beneficiaries)");
      } else if (profile.gender !== "FEMALE") {
        failedConditions.push("Scheme benefit is reserved exclusively for female applicants / girl children");
      } else {
        matchedConditions.push("Female beneficiary category matched");
      }
    }

    // Community / Caste (SC / ST / OBC / MBC / DNC / Minority)
    if (
      recordText.includes("sc/st") ||
      recordText.includes("scheduled caste") ||
      recordText.includes("scheduled tribe") ||
      recordText.includes("tribal")
    ) {
      if (profile.community === undefined) {
        missingConditions.push("Community / Caste certificate (SC / ST)");
      } else if (profile.community !== "SC" && profile.community !== "ST") {
        failedConditions.push(
          `Targeted to SC/ST beneficiaries (Applicant category: ${profile.community})`
        );
      } else {
        matchedConditions.push(`Community category (${profile.community}) matched`);
      }
    } else if (
      recordText.includes("bc/mbc") ||
      recordText.includes("backward classes") ||
      recordText.includes("mbc") ||
      recordText.includes("obc")
    ) {
      if (profile.community === undefined) {
        missingConditions.push("Community category confirmation (OBC / BC / MBC / DNC)");
      } else if (profile.community === "GENERAL") {
        failedConditions.push("Reserved for Backward / Most Backward Classes (OBC/BC/MBC/DNC)");
      } else {
        matchedConditions.push(`Eligible Backward Community category (${profile.community})`);
      }
    }

    // Unorganised Workers
    if (
      recordText.includes("unorganised worker") ||
      recordText.includes("e-shram") ||
      recordText.includes("construction worker") ||
      recordText.includes("street vendor")
    ) {
      if (profile.is_unorganised_worker === undefined && profile.has_eshram === undefined) {
        missingConditions.push("Unorganised worker registration / e-Shram / BOCW membership");
      } else if (profile.is_unorganised_worker === false && profile.has_eshram === false) {
        failedConditions.push("Requires unorganised worker registration or e-Shram enrollment");
      } else {
        matchedConditions.push("Unorganised worker status / e-Shram confirmed");
      }
    }

    // Scheme-Specific Mandatory Verifications
    if (record.id === "SRC-SCH-TN-PUDHUMAI") {
      if (profile.studied_tn_govt_school_class_6_12 === undefined) {
        missingConditions.push("Tamil Nadu Government School Class 6th–12th study certificate");
      } else if (!profile.studied_tn_govt_school_class_6_12) {
        failedConditions.push(
          "Mandatory requirement: Must have studied Class 6th to 12th in Tamil Nadu Government Schools"
        );
      } else {
        matchedConditions.push("Class 6th–12th Tamil Nadu Government School study confirmed");
      }
    }

    // Determine Final Evaluation State
    let evaluationState: EligibilityEvaluationState = "UNKNOWN";
    if (failedConditions.length > 0) {
      evaluationState = "NOT_ELIGIBLE";
    } else if (missingConditions.length > 0) {
      evaluationState = "POTENTIALLY_ELIGIBLE";
    } else if (matchedConditions.length > 0) {
      evaluationState = "ELIGIBLE";
    }

    const whyMatched =
      matchedConditions.length > 0
        ? matchedConditions.join("; ")
        : "Basic profile matches preliminary criteria.";

    const whatIsMissing =
      missingConditions.length > 0
        ? missingConditions.join("; ")
        : "All mandatory profile parameters confirmed.";

    evaluatedList.push({
      id: record.id,
      title: record.title,
      domain: record.domain,
      subdomain: record.subdomain,
      governmentLevel: record.jurisdiction.government_level,
      stateUt: recordState,
      ministryOrDept:
        record.provenance.administering_authority ||
        record.authority_details?.organization ||
        "Administering Department",
      summary: record.summary,
      benefitDescription: rules.benefit_amount_or_details || record.summary,
      benefitType,
      isLoanOrCredit: isLoan,
      evaluationState,
      matchedConditions,
      failedConditions,
      missingConditions,
      whyMatched,
      whatIsMissing,
      requiredDocuments: rules.required_documents || [
        "Aadhaar Card",
        "Income Certificate",
        "Bank Passbook (Aadhaar Seeded)"
      ],
      portalUrl: record.authority_details?.portal_url,
      applicationMode:
        record.authority_details?.filing_modes?.join(" & ") || "Online / Physical",
      statutoryFee: "Nil (Free of cost)",
      lastVerified: record.provenance.last_verified,
      verificationStatus: record.provenance.verification_status,
      officialSourceName: record.provenance.official_source_name,
      officialSourceUrl: record.provenance.official_source_url
    });
  }

  return evaluatedList;
}

// -----------------------------------------------------------------------------
// Route-Handler API Types & Function for /api/schemes/match
// -----------------------------------------------------------------------------

export interface CitizenSchemeProfile {
  age?: number | null;
  gender?: string | null;
  state?: string | null;
  district?: string | null;
  annualFamilyIncome?: number | null;
  socialCategory?: string | null;
  occupation?: string | null;
  isStudent?: boolean | null;
  educationLevel?: string | null;
  hasDisability?: boolean | null;
  areaType?: "urban" | "rural" | null;
  isFarmer?: boolean | null;
}

export interface SchemeMatchEvaluation {
  schemeId: string;
  schemeName: string;
  categoryTag: string;
  status: "ELIGIBLE" | "NOT_ELIGIBLE" | "NEEDS_INFORMATION";
  satisfiedConditions: string[];
  failedConditions: string[];
  missingFields: string[];
  requiredDocuments: string[];
  officialSourceId: string;
  officialUrl: string;
  lastVerified: string;
}

export interface SchemeEngineOutput {
  totalEvaluated: number;
  totalEligible: number;
  totalNeedsInfo: number;
  results: SchemeMatchEvaluation[];
}

/**
 * Deterministically evaluates citizen profile against verified statutory scheme rules.
 * Zero LLM decision making. Strictly source-grounded logic.
 * Never outputs ELIGIBLE if any required condition field is missing.
 */
export function evaluateSchemeEligibility(profile: CitizenSchemeProfile): SchemeEngineOutput {
  const results: SchemeMatchEvaluation[] = [];

  for (const scheme of VERIFIED_SCHEME_REGISTRY) {
    const satisfiedConditions: string[] = [];
    const failedConditions: string[] = [];
    const missingFields: string[] = [];

    // 1. Applicable State Check
    if (!scheme.applicableStates.includes("ALL")) {
      if (profile.state === undefined || profile.state === null || profile.state.trim() === "") {
        missingFields.push(
          `State selection required (Scheme restricted to ${scheme.applicableStates.join(", ")})`
        );
      } else if (
        scheme.applicableStates.some((s: string) => s.toLowerCase() === profile.state?.toLowerCase())
      ) {
        satisfiedConditions.push(`State condition met (${profile.state})`);
      } else {
        failedConditions.push(
          `State restricted to ${scheme.applicableStates.join(", ")}; citizen is in ${profile.state}`
        );
      }
    } else if (profile.state) {
      satisfiedConditions.push("State condition met (Applicable All India)");
    }

    // 2. Income Check
    if (scheme.maxIncome !== undefined) {
      if (profile.annualFamilyIncome === undefined || profile.annualFamilyIncome === null) {
        missingFields.push(
          `Annual family income required (Max allowed: ₹${scheme.maxIncome.toLocaleString("en-IN")})`
        );
      } else if (profile.annualFamilyIncome <= scheme.maxIncome) {
        satisfiedConditions.push(
          `Income ₹${profile.annualFamilyIncome.toLocaleString("en-IN")} <= Max allowed ₹${scheme.maxIncome.toLocaleString("en-IN")}`
        );
      } else {
        failedConditions.push(
          `Income ₹${profile.annualFamilyIncome.toLocaleString("en-IN")} exceeds maximum limit of ₹${scheme.maxIncome.toLocaleString("en-IN")}`
        );
      }
    }

    // 3. Age Check
    if (scheme.ageMin !== undefined || scheme.ageMax !== undefined) {
      if (profile.age === undefined || profile.age === null) {
        const reqStr =
          scheme.ageMin && scheme.ageMax
            ? `${scheme.ageMin}-${scheme.ageMax}`
            : scheme.ageMin
            ? `>= ${scheme.ageMin}`
            : `<= ${scheme.ageMax}`;
        missingFields.push(`Age required (Required range: ${reqStr} years)`);
      } else {
        let ageOk = true;
        if (scheme.ageMin !== undefined && profile.age < scheme.ageMin) ageOk = false;
        if (scheme.ageMax !== undefined && profile.age > scheme.ageMax) ageOk = false;

        if (ageOk) {
          satisfiedConditions.push(`Age ${profile.age} years satisfies age criteria`);
        } else {
          const reqStr =
            scheme.ageMin && scheme.ageMax
              ? `${scheme.ageMin}-${scheme.ageMax}`
              : scheme.ageMin
              ? `>= ${scheme.ageMin}`
              : `<= ${scheme.ageMax}`;
          failedConditions.push(
            `Age ${profile.age} years does not fall in required range (${reqStr} years)`
          );
        }
      }
    }

    // 4. Gender Check
    if (scheme.allowedGenders && !scheme.allowedGenders.includes("all")) {
      if (!profile.gender) {
        missingFields.push(`Gender selection required (Restricted to ${scheme.allowedGenders.join(", ")})`);
      } else if (
        scheme.allowedGenders.some((g: string) => g.toLowerCase() === profile.gender?.toLowerCase())
      ) {
        satisfiedConditions.push(`Gender requirement met (${profile.gender})`);
      } else {
        failedConditions.push(
          `Scheme restricted to ${scheme.allowedGenders.join(", ")}; citizen selected ${profile.gender}`
        );
      }
    }

    // 5. Social Category Check
    if (scheme.allowedCategories && scheme.allowedCategories.length > 0) {
      if (!profile.socialCategory) {
        missingFields.push(
          `Social category required (Allowed: ${scheme.allowedCategories.join(", ")})`
        );
      } else if (
        scheme.allowedCategories.some((c: string) => c.toLowerCase() === profile.socialCategory?.toLowerCase())
      ) {
        satisfiedConditions.push(`Social category requirement met (${profile.socialCategory})`);
      } else {
        failedConditions.push(
          `Category ${profile.socialCategory} not eligible (Allowed: ${scheme.allowedCategories.join(", ")})`
        );
      }
    }

    // 6. Student Requirement Check
    if (scheme.isStudentRequired) {
      if (profile.isStudent === undefined || profile.isStudent === null) {
        missingFields.push("Student status confirmation required");
      } else if (profile.isStudent === true) {
        satisfiedConditions.push("Student status verified");
      } else {
        failedConditions.push("Scheme requires active student status");
      }
    }

    // 7. Disability Requirement Check
    if (scheme.disabilityRequired) {
      if (profile.hasDisability === undefined || profile.hasDisability === null) {
        missingFields.push("Disability status confirmation required");
      } else if (profile.hasDisability === true) {
        satisfiedConditions.push("Person with Disability (PwD) status verified");
      } else {
        failedConditions.push("Scheme requires minimum 40% disability status");
      }
    }

    // 8. Farmer Requirement Check
    if (scheme.farmerRequired) {
      if (profile.isFarmer === undefined || profile.isFarmer === null) {
        missingFields.push("Farmer / Landholder status confirmation required");
      } else if (profile.isFarmer === true) {
        satisfiedConditions.push("Farmer status verified");
      } else {
        failedConditions.push("Scheme requires agricultural landholder status");
      }
    }

    // 9. Rural / Urban Check
    if (scheme.ruralUrban && scheme.ruralUrban !== "both") {
      if (!profile.areaType) {
        missingFields.push("Area type (urban/rural) confirmation required");
      } else if (profile.areaType === scheme.ruralUrban) {
        satisfiedConditions.push(`Area type condition met (${profile.areaType})`);
      } else {
        failedConditions.push(`Scheme restricted to ${scheme.ruralUrban} areas`);
      }
    }

    // Status Determination Strategy
    let status: "ELIGIBLE" | "NOT_ELIGIBLE" | "NEEDS_INFORMATION";

    if (failedConditions.length > 0) {
      status = "NOT_ELIGIBLE";
    } else if (missingFields.length > 0) {
      status = "NEEDS_INFORMATION";
    } else {
      status = "ELIGIBLE";
    }

    results.push({
      schemeId: scheme.id,
      schemeName: scheme.name,
      categoryTag: scheme.categoryTag,
      status,
      satisfiedConditions,
      failedConditions,
      missingFields,
      requiredDocuments: scheme.requiredDocuments,
      officialSourceId: scheme.officialSourceId,
      officialUrl: scheme.officialUrl,
      lastVerified: scheme.lastVerified
    });
  }

  return {
    totalEvaluated: results.length,
    totalEligible: results.filter((r) => r.status === "ELIGIBLE").length,
    totalNeedsInfo: results.filter((r) => r.status === "NEEDS_INFORMATION").length,
    results
  };
}
