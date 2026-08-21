import { NextRequest, NextResponse } from "next/server";
import { sarvamProvider } from "@/lib/language/sarvam";
import { BharatLanguageCode } from "@/lib/language/types";
import { supportsTTS } from "@/lib/language/languages";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const { text, languageCode } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Field 'text' is required." }, { status: 400 });
    }

    if (!languageCode || typeof languageCode !== "string") {
      return NextResponse.json({ error: "Field 'languageCode' is required." }, { status: 400 });
    }

    if (!supportsTTS(languageCode)) {
      return NextResponse.json(
        { error: `Text-to-Speech is not supported for language: ${languageCode}` },
        { status: 400 }
      );
    }

    const result = await sarvamProvider.synthesizeSpeech({
      text,
      languageCode: languageCode as BharatLanguageCode,
    });

    return NextResponse.json(result, { status: 200 });
  } catch {
    console.error("Sarvam TTS failed", { status: 500, code: "SPEECH_SYNTHESIS_FAILED" });
    return NextResponse.json({ error: "SPEECH_SYNTHESIS_FAILED" }, { status: 500 });
  }
}
