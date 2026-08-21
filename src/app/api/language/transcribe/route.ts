import { NextRequest, NextResponse } from "next/server";
import { sarvamProvider } from "@/lib/language/sarvam";
import { BharatLanguageCode } from "@/lib/language/types";
import { supportsSTT } from "@/lib/language/languages";

const SUPPORTED_AUDIO_MIMES = new Set([
  "audio/webm",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/wav",
  "audio/x-wav",
  "audio/wave",
  "audio/mpeg",
  "audio/mp3",
  "audio/ogg",
  "audio/aac",
  "audio/x-aac",
  "audio/flac",
  "audio/x-flac",
]);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
    }

    const file = formData.get("file") as File | null;
    const languageCode = (formData.get("languageCode") as string) || "hi-IN";

    if (!file) {
      return NextResponse.json({ error: "AUDIO_FILE_REQUIRED" }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "AUDIO_FILE_EMPTY" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "AUDIO_PAYLOAD_TOO_LARGE" }, { status: 400 });
    }

    const rawMime = file.type || "audio/wav";
    const cleanMime = rawMime.split(";")[0].trim().toLowerCase();

    if (!SUPPORTED_AUDIO_MIMES.has(cleanMime)) {
      return NextResponse.json({ error: `UNSUPPORTED_AUDIO_MIME: ${cleanMime}` }, { status: 400 });
    }

    if (!supportsSTT(languageCode)) {
      return NextResponse.json({ error: `STT_UNSUPPORTED_LANGUAGE: ${languageCode}` }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    const result = await sarvamProvider.transcribe({
      audioBuffer,
      mimeType: cleanMime,
      languageCode: languageCode as BharatLanguageCode,
    });

    return NextResponse.json(result, { status: 200 });
  } catch {
    console.error("Sarvam STT failed", { status: 500, code: "TRANSCRIPTION_FAILED" });
    return NextResponse.json({ error: "TRANSCRIPTION_FAILED" }, { status: 500 });
  }
}
