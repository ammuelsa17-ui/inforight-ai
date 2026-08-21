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

const SARVAM_BASE_URL = "https://api.sarvam.ai";

/**
 * Deterministically splits text into chunks of <= maxChunkLen characters
 * prioritizing paragraph breaks, sentence breaks, and space boundaries.
 * - Translation: <= 1,900 chars (Sarvam limit 2,000)
 * - TTS: <= 2,400 chars (Sarvam limit 2,500)
 */
export function splitTextForSarvam(text: string, maxChunkLen: number = 1900): string[] {
  if (!text || text.length <= maxChunkLen) return [text || ""];

  const chunks: string[] = [];
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
        // Split huge paragraph into sentences
        const sentences = para.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [para];
        for (const sentence of sentences) {
          if ((currentChunk + (currentChunk ? " " : "") + sentence).length <= maxChunkLen) {
            currentChunk += (currentChunk ? " " : "") + sentence;
          } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = sentence.length > maxChunkLen ? sentence.slice(0, maxChunkLen) : sentence;
          }
        }
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
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
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Translation provider error";
      return {
        translatedText: request.text,
        sourceLanguage: request.sourceLanguage,
        targetLanguage: request.targetLanguage,
        provider: this.name,
        fallbackOccurred: true,
        disclaimer: `Multilingual translation service unavailable (${errMsg}). Displaying official source-grounded English version.`,
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
    const blob = new Blob([new Uint8Array(request.audioBuffer)], { type: request.mimeType || "audio/wav" });
    formData.append("file", blob, "input.wav");
    formData.append("model", "saaras:v3");
    formData.append("mode", "transcribe");
    if (request.languageCode) {
      formData.append("language_code", request.languageCode);
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

    const res = await fetch(`${SARVAM_BASE_URL}/text-to-speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify({
        inputs: textChunks,
        target_language_code: request.languageCode,
        model: "bulbul:v3",
        speaker: "meera",
        pace: 1.0,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(`Sarvam TTS API error (${res.status}): ${errJson.message || res.statusText}`);
    }

    const data = await res.json();
    const audioBase64 = data.audios && data.audios.length > 0 ? data.audios[0] : "";

    return {
      audioBase64,
      languageCode: request.languageCode,
      mimeType: "audio/wav",
      provider: this.name,
    };
  }
}

export const sarvamProvider = new SarvamLanguageProvider();
