import { NextRequest, NextResponse } from "next/server";
import { SchemeMatchRequest, SchemeMatchResponse, SchemeMatch } from "@/types/api";
import { VERIFIED_SCHEMES_REGISTRY } from "@/data/schemes/schemes-registry";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as SchemeMatchRequest | null;

    if (!body || !body.state || typeof body.age !== "number" || typeof body.annualIncome !== "number") {
      return NextResponse.json(
        { error: "Missing required fields: state, age, annualIncome are required." },
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
    } = body;

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
