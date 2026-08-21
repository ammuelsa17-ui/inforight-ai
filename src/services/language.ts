import { BharatLanguageCode, TranslateResult, TranscribeResult, TTSResult } from "@/lib/language/types";

/**
 * Frontend Language Service Abstraction.
 * Browser code communicates EXCLUSIVELY with InfoRight's internal API routes (/api/language/*).
 * Zero provider API keys or external URLs are exposed to the browser.
 */

export async function translateText(
  text: string,
  targetLanguage: BharatLanguageCode,
  sourceLanguage: BharatLanguageCode = "en-IN"
): Promise<TranslateResult> {
  try {
    const res = await fetch("/api/language/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, sourceLanguage, targetLanguage }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        translatedText: text,
        sourceLanguage,
        targetLanguage,
        provider: "InfoRight Local",
        fallbackOccurred: true,
        disclaimer: errJson.error || "Multilingual translation service unavailable. Displaying official source-grounded English version.",
      };
    }

    return await res.json();
  } catch {
    return {
      translatedText: text,
      sourceLanguage,
      targetLanguage,
      provider: "InfoRight Local",
      fallbackOccurred: true,
      disclaimer: "Multilingual translation service unavailable. Displaying official source-grounded English version.",
    };
  }
}

export function getAudioExtensionFromMime(mime: string): string {
  const cleanMime = (mime || "").split(";")[0].trim().toLowerCase();
  switch (cleanMime) {
    case "audio/webm":
      return ".webm";
    case "audio/mp4":
    case "audio/m4a":
    case "audio/x-m4a":
      return ".m4a";
    case "audio/mpeg":
    case "audio/mp3":
      return ".mp3";
    case "audio/wav":
    case "audio/x-wav":
      return ".wav";
    case "audio/ogg":
      return ".ogg";
    case "audio/aac":
      return ".aac";
    case "audio/flac":
      return ".flac";
    default:
      return ".bin";
  }
}

export async function transcribeAudio(
  audioBlob: Blob,
  languageCode: BharatLanguageCode = "hi-IN"
): Promise<TranscribeResult> {
  const formData = new FormData();
  const ext = getAudioExtensionFromMime(audioBlob.type);
  formData.append("file", audioBlob, `recording${ext}`);
  formData.append("languageCode", languageCode);

  const res = await fetch("/api/language/transcribe", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || "Audio transcription failed.");
  }

  return await res.json();
}

export async function speakText(text: string, languageCode: BharatLanguageCode): Promise<TTSResult> {
  const res = await fetch("/api/language/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, languageCode }),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || "Text-to-Speech synthesis failed.");
  }

  return await res.json();
}
