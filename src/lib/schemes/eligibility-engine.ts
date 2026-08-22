import { VERIFIED_SCHEME_REGISTRY, VerifiedSchemeRule } from "@/data/scheme-registry";

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
        missingFields.push(`State selection required (Scheme restricted to ${scheme.applicableStates.join(", ")})`);
      } else if (scheme.applicableStates.some(s => s.toLowerCase() === profile.state?.toLowerCase())) {
        satisfiedConditions.push(`State condition met (${profile.state})`);
      } else {
        failedConditions.push(`State restricted to ${scheme.applicableStates.join(", ")}; citizen is in ${profile.state}`);
      }
    } else if (profile.state) {
      satisfiedConditions.push(`State condition met (Applicable All India)`);
    }

    // 2. Income Check
    if (scheme.maxIncome !== undefined) {
      if (profile.annualFamilyIncome === undefined || profile.annualFamilyIncome === null) {
        missingFields.push(`Annual family income required (Max allowed: ₹${scheme.maxIncome.toLocaleString("en-IN")})`);
      } else if (profile.annualFamilyIncome <= scheme.maxIncome) {
        satisfiedConditions.push(`Income ₹${profile.annualFamilyIncome.toLocaleString("en-IN")} <= Max allowed ₹${scheme.maxIncome.toLocaleString("en-IN")}`);
      } else {
        failedConditions.push(`Income ₹${profile.annualFamilyIncome.toLocaleString("en-IN")} exceeds maximum limit of ₹${scheme.maxIncome.toLocaleString("en-IN")}`);
      }
    }

    // 3. Age Check
    if (scheme.ageMin !== undefined || scheme.ageMax !== undefined) {
      if (profile.age === undefined || profile.age === null) {
        const reqStr = scheme.ageMin && scheme.ageMax ? `${scheme.ageMin}-${scheme.ageMax}` : scheme.ageMin ? `>= ${scheme.ageMin}` : `<= ${scheme.ageMax}`;
        missingFields.push(`Age required (Required range: ${reqStr} years)`);
      } else {
        let ageOk = true;
        if (scheme.ageMin !== undefined && profile.age < scheme.ageMin) ageOk = false;
        if (scheme.ageMax !== undefined && profile.age > scheme.ageMax) ageOk = false;

        if (ageOk) {
          satisfiedConditions.push(`Age ${profile.age} years satisfies age criteria`);
        } else {
          const reqStr = scheme.ageMin && scheme.ageMax ? `${scheme.ageMin}-${scheme.ageMax}` : scheme.ageMin ? `>= ${scheme.ageMin}` : `<= ${scheme.ageMax}`;
          failedConditions.push(`Age ${profile.age} years does not fall in required range (${reqStr} years)`);
        }
      }
    }

    // 4. Gender Check
    if (scheme.allowedGenders && !scheme.allowedGenders.includes("all")) {
      if (!profile.gender) {
        missingFields.push(`Gender selection required (Restricted to ${scheme.allowedGenders.join(", ")})`);
      } else if (scheme.allowedGenders.some(g => g.toLowerCase() === profile.gender?.toLowerCase())) {
        satisfiedConditions.push(`Gender requirement met (${profile.gender})`);
      } else {
        failedConditions.push(`Scheme restricted to ${scheme.allowedGenders.join(", ")}; citizen selected ${profile.gender}`);
      }
    }

    // 5. Social Category Check
    if (scheme.allowedCategories && scheme.allowedCategories.length > 0) {
      if (!profile.socialCategory) {
        missingFields.push(`Social category required (Allowed: ${scheme.allowedCategories.join(", ")})`);
      } else if (scheme.allowedCategories.some(c => c.toLowerCase() === profile.socialCategory?.toLowerCase())) {
        satisfiedConditions.push(`Social category requirement met (${profile.socialCategory})`);
      } else {
        failedConditions.push(`Category ${profile.socialCategory} not eligible (Allowed: ${scheme.allowedCategories.join(", ")})`);
      }
    }

    // 6. Student Requirement Check
    if (scheme.isStudentRequired) {
      if (profile.isStudent === undefined || profile.isStudent === null) {
        missingFields.push(`Student status confirmation required`);
      } else if (profile.isStudent === true) {
        satisfiedConditions.push(`Student status verified`);
      } else {
        failedConditions.push(`Scheme requires active student status`);
      }
    }

    // 7. Disability Requirement Check
    if (scheme.disabilityRequired) {
      if (profile.hasDisability === undefined || profile.hasDisability === null) {
        missingFields.push(`Disability status confirmation required`);
      } else if (profile.hasDisability === true) {
        satisfiedConditions.push(`Person with Disability (PwD) status verified`);
      } else {
        failedConditions.push(`Scheme requires minimum 40% disability status`);
      }
    }

    // 8. Farmer Requirement Check
    if (scheme.farmerRequired) {
      if (profile.isFarmer === undefined || profile.isFarmer === null) {
        missingFields.push(`Farmer / Landholder status confirmation required`);
      } else if (profile.isFarmer === true) {
        satisfiedConditions.push(`Farmer status verified`);
      } else {
        failedConditions.push(`Scheme requires agricultural landholder status`);
      }
    }

    // 9. Rural / Urban Check
    if (scheme.ruralUrban && scheme.ruralUrban !== "both") {
      if (!profile.areaType) {
        missingFields.push(`Area type (urban/rural) confirmation required`);
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
    totalEligible: results.filter(r => r.status === "ELIGIBLE").length,
    totalNeedsInfo: results.filter(r => r.status === "NEEDS_INFORMATION").length,
    results
  };
}
