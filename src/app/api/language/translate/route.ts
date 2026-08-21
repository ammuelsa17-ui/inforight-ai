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

    if (!supportsTranslation(targetLanguage)) {
      return NextResponse.json(
        { error: `Unsupported target language: ${targetLanguage}` },
        { status: 400 }
      );
    }

    const result = await sarvamProvider.translate({
      text,
      sourceLanguage: sourceLanguage as BharatLanguageCode,
      targetLanguage: targetLanguage as BharatLanguageCode,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
