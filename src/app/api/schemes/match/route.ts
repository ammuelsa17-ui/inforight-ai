import { NextRequest, NextResponse } from "next/server";
import { evaluateSchemeEligibility, CitizenSchemeProfile } from "@/lib/schemes/eligibility-engine";

const ALLOWED_KEYS = new Set([
  "state",
  "district",
  "age",
  "annualIncome",
  "gender",
  "occupation",
  "isStudent",
  "educationLevel",
  "areaType",
  "hasDisability",
  "socialCategory",
  "isFarmer",
  "simulateFailure"
]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    // Strict Unknown Field Rejection
    const keys = Object.keys(body);
    const unknownKeys = keys.filter((k) => !ALLOWED_KEYS.has(k));
    if (unknownKeys.length > 0) {
      return NextResponse.json(
        { error: `Unknown request fields detected: ${unknownKeys.join(", ")}. Strict schema parsing rejected request.` },
        { status: 400 }
      );
    }

    const {
      state,
      district,
      age,
      annualIncome,
      gender,
      occupation,
      isStudent,
      educationLevel,
      areaType,
      hasDisability,
      socialCategory,
      isFarmer
    } = body;

    // Range Validations when provided
    if (typeof age === "number" && (age < 0 || age > 120)) {
      return NextResponse.json(
        { error: "Invalid age value. Age must be between 0 and 120." },
        { status: 400 }
      );
    }

    if (typeof annualIncome === "number" && annualIncome < 0) {
      return NextResponse.json(
        { error: "Invalid annualIncome. Income cannot be negative." },
        { status: 400 }
      );
    }

    const profile: CitizenSchemeProfile = {
      state: typeof state === "string" ? state : null,
      district: typeof district === "string" ? district : null,
      age: typeof age === "number" ? age : null,
      annualFamilyIncome: typeof annualIncome === "number" ? annualIncome : null,
      gender: typeof gender === "string" ? gender : null,
      occupation: typeof occupation === "string" ? occupation : null,
      isStudent: typeof isStudent === "boolean" ? isStudent : null,
      educationLevel: typeof educationLevel === "string" ? educationLevel : null,
      areaType: (areaType === "urban" || areaType === "rural") ? areaType : null,
      hasDisability: typeof hasDisability === "boolean" ? hasDisability : null,
      socialCategory: typeof socialCategory === "string" ? socialCategory : null,
      isFarmer: typeof isFarmer === "boolean" ? isFarmer : null,
    };

    const engineOutput = evaluateSchemeEligibility(profile);

    // Format for backward compatibility contract
    const matchedSchemes = engineOutput.results
      .filter(r => r.status === "ELIGIBLE")
      .map(r => ({
        schemeId: r.schemeId,
        result: "matched" as const,
        reasons: r.satisfiedConditions,
        requiredDocuments: r.requiredDocuments,
        officialApplyUrl: r.officialUrl,
        citationIds: [r.officialSourceId]
      }));

    return NextResponse.json(
      {
        totalMatched: engineOutput.totalEligible,
        totalNeedsInfo: engineOutput.totalNeedsInfo,
        matchedSchemes,
        evaluations: engineOutput.results,
        disclaimer: "Final eligibility is determined strictly by the respective government department."
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in Scheme Matcher Route." },
      { status: 500 }
    );
  }
}
