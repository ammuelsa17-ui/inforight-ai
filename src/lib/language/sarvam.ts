import { BharatLanguageProvider } from "./provider";
import {
  BharatLanguageCode,
  TranslateRequest,
  TranslateResult,
  TranscribeRequest,
  TranscribeResult,
  TTSRequest,
  TTSResult,
} from "./types";
import { supportsTTS } from "./languages";
import { getAudioExtensionFromMime } from "@/services/language";

const SARVAM_BASE_URL = "https://api.sarvam.ai";

/**
 * Deterministically splits text into chunks of <= maxChunkLen characters
 * prioritizing paragraph breaks, sentence breaks, and space boundaries.
 * ZERO text data is discarded.
 * - Translation: <= 1,900 chars (Sarvam limit 2,000)
 * - TTS: <= 2,400 chars (Sarvam limit 2,500)
 */
export function splitTextForSarvam(text: string, maxChunkLen: number = 1900): string[] {
  if (!text || text.length <= maxChunkLen) return [text || ""];

  const chunks: string[] = [];

  function pushSubChunks(str: string) {
    let remaining = str;
    while (remaining.length > maxChunkLen) {
      let splitIdx = remaining.lastIndexOf(" ", maxChunkLen);
      if (splitIdx <= 0) {
        splitIdx = maxChunkLen;
      }
      const segment = remaining.slice(0, splitIdx).trim();
      if (segment) chunks.push(segment);
      remaining = remaining.slice(splitIdx).trim();
    }
    if (remaining) {
      chunks.push(remaining);
    }
  }

  const paragraphs = text.split("\n\n");
  let currentChunk = "";

  for (const para of paragraphs) {
    if ((currentChunk + (currentChunk ? "\n\n" : "") + para).length <= maxChunkLen) {
      currentChunk += (currentChunk ? "\n\n" : "") + para;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }

      if (para.length <= maxChunkLen) {
        currentChunk = para;
      } else {
        const sentences = para.match(/[^.!?;\n]+[.!?;\n]+|[^.!?;\n]+$/g) || [para];
        for (const sentence of sentences) {
          if ((currentChunk + (currentChunk ? " " : "") + sentence).length <= maxChunkLen) {
            currentChunk += (currentChunk ? " " : "") + sentence;
          } else {
            if (currentChunk) {
              chunks.push(currentChunk);
              currentChunk = "";
            }
            if (sentence.length <= maxChunkLen) {
              currentChunk = sentence;
            } else {
              pushSubChunks(sentence);
            }
          }
        }
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks.filter((c) => c.length > 0);
}

export class SarvamLanguageProvider implements BharatLanguageProvider {
  readonly name = "Sarvam AI";

  private getApiKey(): string | undefined {
    if (typeof window !== "undefined") {
      throw new Error("SarvamLanguageProvider must only be executed server-side.");
    }
    return process.env.SARVAM_API_KEY;
  }

  isAvailable(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.trim().length > 0);
  }

  async translate(request: TranslateRequest): Promise<TranslateResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return {
        translatedText: request.text,
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        provider: this.name,
        fallbackOccurred: true,
        disclaimer: "Multilingual translation service unavailable. Displaying official source-grounded English version.",
      };
    }

    if (!request.text || request.text.trim().length === 0) {
      return {
        translatedText: "",
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        provider: this.name,
        fallbackOccurred: false,
      };
    }

    if (request.sourceLanguage === request.targetLanguage) {
      return {
        translatedText: request.text,
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        provider: this.name,
        fallbackOccurred: false,
      };
    }

    try {
      const textChunks = splitTextForSarvam(request.text, 1900);
      const translatedChunks: string[] = [];

      for (const chunk of textChunks) {
        const res = await fetch(`${SARVAM_BASE_URL}/translate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-subscription-key": apiKey,
          },
          body: JSON.stringify({
            input: chunk,
            source_language_code: request.sourceLanguage,
            target_language_code: request.targetLanguage,
            model: "sarvam-translate:v1",
            mode: "formal",
          }),
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(`Sarvam Translation API error (${res.status}): ${errJson.message || res.statusText}`);
        }

        const data = await res.json();
        translatedChunks.push(data.translated_text || chunk);
      }

      return {
        translatedText: translatedChunks.join("\n\n"),
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        provider: this.name,
        fallbackOccurred: false,
        disclaimer: "Translated from canonical English legal draft using Sarvam AI Formal Legal Translation.",
      };
    } catch {
      return {
        translatedText: request.text,
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        provider: this.name,
        fallbackOccurred: true,
        disclaimer: "Multilingual translation service unavailable. Displaying official source-grounded English version.",
      };
    }
  }

  async transcribe(request: TranscribeRequest): Promise<TranscribeResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Language service is not configured on the server.");
    }

    if (!request.audioBuffer || request.audioBuffer.length === 0) {
      throw new Error("Audio buffer is empty.");
    }

    const formData = new FormData();
    const mime = request.mimeType || "audio/wav";
    const ext = getAudioExtensionFromMime(mime);
    const blob = new Blob([new Uint8Array(request.audioBuffer)], { type: mime });
    formData.append("file", blob, `input${ext}`);
    formData.append("model", "saaras:v3");
    formData.append("mode", "transcribe");
    if (request.languageCode) {
      // Map Odia or prefix codes cleanly to Sarvam STT locale format (e.g. od-IN for Odia)
      const langStr = String(request.languageCode);
      const targetLang = langStr === "or-IN" || langStr === "od-IN" ? "od-IN" : langStr;
      formData.append("language_code", targetLang);
    }

    const res = await fetch(`${SARVAM_BASE_URL}/speech-to-text`, {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
      },
      body: formData,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(`Sarvam STT API error (${res.status}): ${errJson.message || res.statusText}`);
    }

    const data = await res.json();
    return {
      transcript: data.transcript || "",
      languageCode: (data.language_code as BharatLanguageCode) || request.languageCode || "en-IN",
      provider: this.name,
      requestId: data.request_id,
    };
  }

  async synthesizeSpeech(request: TTSRequest): Promise<TTSResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("Language service is not configured on the server.");
    }

    if (!supportsTTS(request.languageCode)) {
      throw new Error(`Text-to-Speech is not currently supported for language: ${request.languageCode}`);
    }

    const textChunks = splitTextForSarvam(request.text, 2400);
    const audioSegmentsBase64: string[] = [];

    for (const chunk of textChunks) {
      if (!chunk.trim()) continue;

      const res = await fetch(`${SARVAM_BASE_URL}/text-to-speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": apiKey,
        },
        body: JSON.stringify({
          text: chunk,
          language_code: request.languageCode,
          model: "bulbul:v3",
          speaker: "shubh",
          pace: 1.0,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(`Sarvam TTS API error (${res.status}): ${errJson.message || res.statusText}`);
      }

      const data = await res.json();
      const segAudio = data.audios && data.audios.length > 0 ? data.audios[0] : "";
      if (segAudio) {
        audioSegmentsBase64.push(segAudio);
      }
    }

    return {
      audioBase64: audioSegmentsBase64[0] || "",
      audioSegmentsBase64,
      languageCode: request.languageCode,
      mimeType: "audio/wav",
      provider: this.name,
    };
  }
}

export const sarvamProvider = new SarvamLanguageProvider();
