import { NextRequest, NextResponse } from "next/server";
import { processTranslationRequest } from "@/lib/translation/translation-service";
import { TranslateRequest } from "@/lib/translation/types";
import { VALID_LANGUAGE_CODES } from "@/i18n/languages";

const ALLOWED_TOP_LEVEL_KEYS = new Set(["sourceLanguage", "targetLanguage", "fields"]);
const TRANSLATABLE_FIELDS = new Set([
  "title",
  "summary",
  "actions",
  "evidenceChecklist",
  "escalationSteps",
  "representationLetter",
  "whatThisMeans",
  "whatYouShouldDoNow",
  "documentsToCollect",
  "whereToSubmit",
  "whatIfNoResponse",
  "problemDescription",
  "issue",
  "issueTitle",
  "disclaimer",
  "reasons",
  "questions",
  "explanation",
  "body",
  "subject",
  "text",
]);

const PROTECTED_FIELDS = new Set([
  "citationIds",
  "sourceUrls",
  "schemeIds",
  "authority",
  "authorityName",
  "portalUrl",
  "portalName",
  "helplinePhone",
  "legalReferences",
  "dates",
  "amounts",
  "amountInDispute",
  "annualIncome",
  "age",
  "state",
  "district",
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

    // Strict Unknown Top-Level Field Rejection
    const keys = Object.keys(body);
    const unknownKeys = keys.filter((k) => !ALLOWED_TOP_LEVEL_KEYS.has(k));
    if (unknownKeys.length > 0) {
      return NextResponse.json(
        { error: `Unknown request fields detected: ${unknownKeys.join(", ")}.` },
        { status: 400 }
      );
    }

    const { sourceLanguage = "en", targetLanguage, fields } = body as unknown as TranslateRequest;

    if (!targetLanguage || typeof targetLanguage !== "string") {
      return NextResponse.json(
        { error: "Missing required string field: 'targetLanguage'." },
        { status: 400 }
      );
    }

    if (sourceLanguage && !VALID_LANGUAGE_CODES.has(sourceLanguage)) {
      return NextResponse.json(
        { error: `Invalid sourceLanguage '${sourceLanguage}'. Must be a supported language code.` },
        { status: 400 }
      );
    }

    if (!VALID_LANGUAGE_CODES.has(targetLanguage)) {
      return NextResponse.json(
        { error: `Invalid targetLanguage '${targetLanguage}'. Must be a supported language code.` },
        { status: 400 }
      );
    }

    // Strict Fields Validation
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      return NextResponse.json(
        { error: "Field 'fields' must be a non-null plain object." },
        { status: 400 }
      );
    }

    for (const [k, v] of Object.entries(fields)) {
      if (!TRANSLATABLE_FIELDS.has(k) && !PROTECTED_FIELDS.has(k)) {
        return NextResponse.json(
          { error: `Unknown translation field '${k}' detected.` },
          { status: 400 }
        );
      }

      if (typeof v !== "string" && !Array.isArray(v)) {
        return NextResponse.json(
          { error: `Field '${k}' has invalid type. Values must be string or string[].` },
          { status: 400 }
        );
      }
    }

    const result = await processTranslationRequest(fields, targetLanguage, sourceLanguage);

    if (result.errorCode === "FREE_TEXT_PII_DETECTED" || result.errorCode === "INVALID_FIELD_TYPE") {
      return NextResponse.json(
        { error: result.disclaimer },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in Translate Route." },
      { status: 500 }
    );
  }
}
