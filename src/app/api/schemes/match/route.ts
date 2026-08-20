import { NextRequest, NextResponse } from "next/server";
import { SchemeMatchRequest, SchemeMatchResponse, SchemeMatch } from "@/types/api";
import { VERIFIED_SCHEMES_REGISTRY } from "@/data/schemes/schemes-registry";

const ALLOWED_KEYS = new Set([
  "state",
  "age",
  "annualIncome",
  "occupation",
  "isStudent",
  "areaType",
  "hasDisability",
  "socialCategory",
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
      age,
      annualIncome,
      occupation,
      isStudent,
      areaType,
    } = body as unknown as SchemeMatchRequest;

    if (!state || typeof age !== "number" || typeof annualIncome !== "number" || typeof state !== "string") {
      return NextResponse.json(
        { error: "Missing required fields: state, age, annualIncome are required." },
        { status: 400 }
      );
    }

    // Boundary & Range Validations
    if (age < 0 || age > 120) {
      return NextResponse.json(
        { error: "Invalid age value. Age must be between 0 and 120." },
        { status: 400 }
      );
    }

    if (annualIncome < 0) {
      return NextResponse.json(
        { error: "Invalid annualIncome. Income cannot be negative." },
        { status: 400 }
      );
    }

    const matchedSchemes: SchemeMatch[] = [];

    for (const scheme of VERIFIED_SCHEMES_REGISTRY) {
      const reasons: string[] = [];
      let isMatch = true;

      // 1. State / Domicile Check
      if (scheme.state !== "National" && scheme.state.toLowerCase() !== state.toLowerCase()) {
        isMatch = false;
      } else {
        reasons.push(`Domicile matches target region (${scheme.state}).`);
      }

      // 2. Age Range Check
      if (scheme.minAge && age < scheme.minAge) {
        isMatch = false;
      }
      if (scheme.maxAge && age > scheme.maxAge) {
        isMatch = false;
      }
      if (isMatch) {
        reasons.push(`Age (${age}) falls within eligible criteria.`);
      }

      // 3. Income Limit Check
      if (scheme.maxIncome && annualIncome > scheme.maxIncome) {
        isMatch = false;
      } else if (scheme.maxIncome) {
        reasons.push(`Annual income (₹${annualIncome.toLocaleString()}) is below maximum threshold of ₹${scheme.maxIncome.toLocaleString()}.`);
      }

      // 4. Student Requirement Check
      if (scheme.isStudentOnly && !isStudent) {
        isMatch = false;
      } else if (scheme.isStudentOnly && isStudent) {
        reasons.push("Confirmed active student status.");
      }

      // 5. Area Type Check
      if (scheme.areaType && scheme.areaType !== "both" && scheme.areaType !== areaType) {
        isMatch = false;
      } else if (scheme.areaType) {
        reasons.push(`Location (${areaType}) matches scheme area target.`);
      }

      // 6. Occupation Matching
      if (scheme.occupations && scheme.occupations.length > 0) {
        if (!scheme.occupations.includes(occupation)) {
          isMatch = false;
        } else {
          reasons.push(`Occupation (${occupation}) matches target scheme category.`);
        }
      }

      if (isMatch) {
        matchedSchemes.push({
          schemeId: scheme.id,
          result: "matched",
          reasons,
          requiredDocuments: scheme.requiredDocuments,
          officialApplyUrl: scheme.officialApplyUrl,
          citationIds: ["MYSCHEME_PLATFORM"],
        });
      }
    }

    const response: SchemeMatchResponse = {
      totalMatched: matchedSchemes.length,
      matchedSchemes,
      disclaimer: "Final eligibility is determined strictly by the respective government department.",
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in Scheme Matcher Route." },
      { status: 500 }
    );
  }
}
