import { BrowserSupportStatus, VoiceLanguage } from "@/types/voice";
import { BHARAT_LANGUAGES } from "@/data/voice/languages";

export interface BrowserVoiceCapabilities {
  hasSpeechRecognition: boolean;
  hasSpeechSynthesis: boolean;
  availableTtsVoices: SpeechSynthesisVoice[];
  supportsLanguage(languageId: string): BrowserSupportStatus;
}

/**
 * Detects browser-native Web Speech API capabilities safely on the client.
 */
export function checkBrowserVoiceCapabilities(): BrowserVoiceCapabilities {
  if (typeof window === "undefined") {
    return {
      hasSpeechRecognition: false,
      hasSpeechSynthesis: false,
      availableTtsVoices: [],
      supportsLanguage: () => "UNAVAILABLE"
    };
  }

  const hasSpeechRecognition = !!(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );

  const hasSpeechSynthesis = "speechSynthesis" in window;

  let voices: SpeechSynthesisVoice[] = [];
  if (hasSpeechSynthesis) {
    voices = window.speechSynthesis.getVoices() || [];
  }

  const supportsLanguage = (languageId: string): BrowserSupportStatus => {
    const lang = BHARAT_LANGUAGES.find((l) => l.id === languageId);
    if (!lang) return "UNAVAILABLE";

    const hasTtsVoice = voices.some(
      (v) =>
        v.lang.toLowerCase() === lang.tts_locale.toLowerCase() ||
        v.lang.toLowerCase().startsWith(lang.id.toLowerCase())
    );

    if (hasSpeechRecognition && hasTtsVoice) return "FULL_SUPPORT";
    if (hasSpeechRecognition && !hasTtsVoice) return "STT_ONLY";
    if (!hasSpeechRecognition && hasTtsVoice) return "TTS_ONLY";
    if (!hasSpeechRecognition && !hasTtsVoice && hasSpeechSynthesis) return "TTS_ONLY";
    return "UNAVAILABLE";
  };

  return {
    hasSpeechRecognition,
    hasSpeechSynthesis,
    availableTtsVoices: voices,
    supportsLanguage
  };
}

/**
 * Retrieves the best matching SpeechSynthesisVoice for a given language
 */
export function findBestTtsVoice(
  langLocale: string,
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const target = langLocale.toLowerCase();
  const langPrefix = target.split("-")[0];

  // 1. Exact locale match (e.g. "ta-IN")
  const exact = voices.find((v) => v.lang.toLowerCase() === target);
  if (exact) return exact;

  // 2. Language prefix match (e.g. "ta")
  const prefixMatch = voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (prefixMatch) return prefixMatch;

  // 3. Indian English fallback if target is English
  if (langPrefix === "en") {
    const enIn = voices.find((v) => v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("en_in"));
    if (enIn) return enIn;
    const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (anyEn) return anyEn;
  }

  return null;
}
