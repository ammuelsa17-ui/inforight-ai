// src/lib/voice/speech-language-registry.ts — Canonical Speech Recognition Language Binding & Capability Model
import { BharatLanguageCode } from "@/lib/language/types";

export interface SpeechLanguageConfig {
  code: BharatLanguageCode;
  name: string;
  nativeName: string;
  browserLocale: string;
  sarvamLocale: string;
  isBrowserReliable: boolean;
}

/**
 * Canonical 23-language Bharat Speech Recognition Registry
 * Separate browserLocale and sarvamLocale explicitly.
 * NOTE: For Odia, Sarvam requires 'od-IN', while browser Web Speech requires 'or-IN'.
 */
export const SPEECH_LANGUAGE_REGISTRY: Record<BharatLanguageCode, SpeechLanguageConfig> = {
  "en-IN": { code: "en-IN", name: "English (India)", nativeName: "English (India)", browserLocale: "en-IN", sarvamLocale: "en-IN", isBrowserReliable: true },
  "hi-IN": { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी", browserLocale: "hi-IN", sarvamLocale: "hi-IN", isBrowserReliable: true },
  "ta-IN": { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்", browserLocale: "ta-IN", sarvamLocale: "ta-IN", isBrowserReliable: false },
  "te-IN": { code: "te-IN", name: "Telugu", nativeName: "తెలుగు", browserLocale: "te-IN", sarvamLocale: "te-IN", isBrowserReliable: false },
  "kn-IN": { code: "kn-IN", name: "Kannada", nativeName: "ಕನ್ನಡ", browserLocale: "kn-IN", sarvamLocale: "kn-IN", isBrowserReliable: false },
  "ml-IN": { code: "ml-IN", name: "Malayalam", nativeName: "മലയാളം", browserLocale: "ml-IN", sarvamLocale: "ml-IN", isBrowserReliable: false },
  "mr-IN": { code: "mr-IN", name: "Marathi", nativeName: "मराठी", browserLocale: "mr-IN", sarvamLocale: "mr-IN", isBrowserReliable: false },
  "bn-IN": { code: "bn-IN", name: "Bengali", nativeName: "বাংলা", browserLocale: "bn-IN", sarvamLocale: "bn-IN", isBrowserReliable: false },
  "gu-IN": { code: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી", browserLocale: "gu-IN", sarvamLocale: "gu-IN", isBrowserReliable: false },
  "pa-IN": { code: "pa-IN", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", browserLocale: "pa-IN", sarvamLocale: "pa-IN", isBrowserReliable: false },
  "od-IN": { code: "od-IN", name: "Odia", nativeName: "ଓଡ଼ିଆ", browserLocale: "or-IN", sarvamLocale: "od-IN", isBrowserReliable: false },
  "as-IN": { code: "as-IN", name: "Assamese", nativeName: "অসমীয়া", browserLocale: "as-IN", sarvamLocale: "as-IN", isBrowserReliable: false },
  "brx-IN": { code: "brx-IN", name: "Bodo", nativeName: "बड़ो", browserLocale: "brx-IN", sarvamLocale: "brx-IN", isBrowserReliable: false },
  "doi-IN": { code: "doi-IN", name: "Dogri", nativeName: "डोगरी", browserLocale: "doi-IN", sarvamLocale: "doi-IN", isBrowserReliable: false },
  "ks-IN": { code: "ks-IN", name: "Kashmiri", nativeName: "कॉशुर", browserLocale: "ks-IN", sarvamLocale: "ks-IN", isBrowserReliable: false },
  "kok-IN": { code: "kok-IN", name: "Konkani", nativeName: "कोंकणी", browserLocale: "kok-IN", sarvamLocale: "kok-IN", isBrowserReliable: false },
  "mai-IN": { code: "mai-IN", name: "Maithili", nativeName: "मैथिली", browserLocale: "mai-IN", sarvamLocale: "mai-IN", isBrowserReliable: false },
  "mni-IN": { code: "mni-IN", name: "Manipuri", nativeName: "ꯃꯤꯇꯩ ꯂꯣꯟ", browserLocale: "mni-IN", sarvamLocale: "mni-IN", isBrowserReliable: false },
  "ne-IN": { code: "ne-IN", name: "Nepali", nativeName: "नेपाली", browserLocale: "ne-NP", sarvamLocale: "ne-IN", isBrowserReliable: false },
  "sa-IN": { code: "sa-IN", name: "Sanskrit", nativeName: "संस्कृतम्", browserLocale: "sa-IN", sarvamLocale: "sa-IN", isBrowserReliable: false },
  "sat-IN": { code: "sat-IN", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", browserLocale: "sat-IN", sarvamLocale: "sat-IN", isBrowserReliable: false },
  "sd-IN": { code: "sd-IN", name: "Sindhi", nativeName: "सिन्धी", browserLocale: "sd-IN", sarvamLocale: "sd-IN", isBrowserReliable: false },
  "ur-IN": { code: "ur-IN", name: "Urdu", nativeName: "اُردُو", browserLocale: "ur-IN", sarvamLocale: "ur-IN", isBrowserReliable: false }
};

export function resolveSpeechLanguageConfig(code?: string): SpeechLanguageConfig {
  if (!code) return SPEECH_LANGUAGE_REGISTRY["en-IN"];
  
  // Direct match
  if (code in SPEECH_LANGUAGE_REGISTRY) {
    return SPEECH_LANGUAGE_REGISTRY[code as BharatLanguageCode];
  }

  // Two-letter prefix match (e.g. 'ta' -> 'ta-IN')
  const prefix = code.split("-")[0].toLowerCase();
  for (const key of Object.keys(SPEECH_LANGUAGE_REGISTRY) as BharatLanguageCode[]) {
    if (key.startsWith(prefix)) {
      return SPEECH_LANGUAGE_REGISTRY[key];
    }
  }

  return SPEECH_LANGUAGE_REGISTRY["en-IN"];
}

export function getAllSpeechLanguages(): SpeechLanguageConfig[] {
  return Object.values(SPEECH_LANGUAGE_REGISTRY);
}
