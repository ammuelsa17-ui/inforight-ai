import { NextRequest, NextResponse } from "next/server";
import { sarvamProvider } from "@/lib/language/sarvam";
import { BharatLanguageCode } from "@/lib/language/types";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ error: "Invalid multipart form data." }, { status: 400 });
    }

    const file = formData.get("file") as File | null;
    const languageCode = (formData.get("languageCode") as string) || "hi-IN";

    if (!file) {
      return NextResponse.json({ error: "Audio file is required." }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "Audio file cannot be empty." }, { status: 400 });
    }

    // 10MB limit for short audio recordings
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Audio file size exceeds 10MB limit." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    const result = await sarvamProvider.transcribe({
      audioBuffer,
      mimeType: file.type || "audio/wav",
      languageCode: languageCode as BharatLanguageCode,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Transcription failed";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
