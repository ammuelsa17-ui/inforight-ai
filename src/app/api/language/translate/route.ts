import { NextRequest, NextResponse } from "next/server";
import { sarvamProvider } from "@/lib/language/sarvam";
import { BharatLanguageCode } from "@/lib/language/types";
import { supportsTranslation } from "@/lib/language/languages";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const { text, sourceLanguage = "en-IN", targetLanguage } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Field 'text' is required and must be a string." }, { status: 400 });
    }

    if (!targetLanguage || typeof targetLanguage !== "string") {
      return NextResponse.json({ error: "Field 'targetLanguage' is required." }, { status: 400 });
    }

    if (!supportsTranslation(sourceLanguage)) {
      return NextResponse.json(
        { error: `UNSUPPORTED_SOURCE_LANGUAGE: ${sourceLanguage}` },
        { status: 400 }
      );
    }

    if (!supportsTranslation(targetLanguage)) {
      return NextResponse.json(
        { error: `UNSUPPORTED_TARGET_LANGUAGE: ${targetLanguage}` },
        { status: 400 }
      );
    }

    const result = await sarvamProvider.translate({
      text,
      sourceLanguage: sourceLanguage as BharatLanguageCode,
      targetLanguage: targetLanguage as BharatLanguageCode,
    });

    return NextResponse.json(result, { status: 200 });
  } catch {
    console.error("Sarvam Translation failed", { status: 500, code: "TRANSLATION_FAILED" });
    return NextResponse.json({ error: "TRANSLATION_FAILED" }, { status: 500 });
  }
}
