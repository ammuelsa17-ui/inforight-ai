// src/lib/voice/speech-language-registry.ts — Canonical Speech Recognition Language Binding & Capability Model
import { BharatLanguageCode } from "@/lib/language/types";
import { BHARAT_LANGUAGES, ALL_BHARAT_LANGUAGES } from "@/lib/language/languages";

export interface SpeechLanguageConfig {
  code: BharatLanguageCode;
  name: string;
  nativeName: string;
  bcp47SpeechLocale: string;
  sarvamLanguageCode: string;
  isBrowserReliable: boolean;
}

/**
 * Canonical 23-language Bharat Speech Recognition Registry
 * Maps UI/Input language codes to browser SpeechRecognition locales and Sarvam STT codes.
 */
export const SPEECH_LANGUAGE_REGISTRY: Record<BharatLanguageCode, SpeechLanguageConfig> = {
  "en-IN": { code: "en-IN", name: "English (India)", nativeName: "English (India)", bcp47SpeechLocale: "en-IN", sarvamLanguageCode: "en-IN", isBrowserReliable: true },
  "hi-IN": { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी", bcp47SpeechLocale: "hi-IN", sarvamLanguageCode: "hi-IN", isBrowserReliable: true },
  "ta-IN": { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்", bcp47SpeechLocale: "ta-IN", sarvamLanguageCode: "ta-IN", isBrowserReliable: true },
  "te-IN": { code: "te-IN", name: "Telugu", nativeName: "తెలుగు", bcp47SpeechLocale: "te-IN", sarvamLanguageCode: "te-IN", isBrowserReliable: true },
  "kn-IN": { code: "kn-IN", name: "Kannada", nativeName: "ಕನ್ನಡ", bcp47SpeechLocale: "kn-IN", sarvamLanguageCode: "kn-IN", isBrowserReliable: true },
  "ml-IN": { code: "ml-IN", name: "Malayalam", nativeName: "മലയാളം", bcp47SpeechLocale: "ml-IN", sarvamLanguageCode: "ml-IN", isBrowserReliable: true },
  "mr-IN": { code: "mr-IN", name: "Marathi", nativeName: "मराठी", bcp47SpeechLocale: "mr-IN", sarvamLanguageCode: "mr-IN", isBrowserReliable: true },
  "bn-IN": { code: "bn-IN", name: "Bengali", nativeName: "বাংলা", bcp47SpeechLocale: "bn-IN", sarvamLanguageCode: "bn-IN", isBrowserReliable: true },
  "gu-IN": { code: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી", bcp47SpeechLocale: "gu-IN", sarvamLanguageCode: "gu-IN", isBrowserReliable: true },
  "pa-IN": { code: "pa-IN", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", bcp47SpeechLocale: "pa-IN", sarvamLanguageCode: "pa-IN", isBrowserReliable: false },
  "od-IN": { code: "od-IN", name: "Odia", nativeName: "ଓଡ଼ିଆ", bcp47SpeechLocale: "or-IN", sarvamLanguageCode: "od-IN", isBrowserReliable: false },
  "as-IN": { code: "as-IN", name: "Assamese", nativeName: "অসমীয়া", bcp47SpeechLocale: "as-IN", sarvamLanguageCode: "as-IN", isBrowserReliable: false },
  "brx-IN": { code: "brx-IN", name: "Bodo", nativeName: "बड़ो", bcp47SpeechLocale: "brx-IN", sarvamLanguageCode: "brx-IN", isBrowserReliable: false },
  "doi-IN": { code: "doi-IN", name: "Dogri", nativeName: "डोगरी", bcp47SpeechLocale: "doi-IN", sarvamLanguageCode: "doi-IN", isBrowserReliable: false },
  "ks-IN": { code: "ks-IN", name: "Kashmiri", nativeName: "कॉशुर", bcp47SpeechLocale: "ks-IN", sarvamLanguageCode: "ks-IN", isBrowserReliable: false },
  "kok-IN": { code: "kok-IN", name: "Konkani", nativeName: "कोंकणी", bcp47SpeechLocale: "kok-IN", sarvamLanguageCode: "kok-IN", isBrowserReliable: false },
  "mai-IN": { code: "mai-IN", name: "Maithili", nativeName: "मैथिली", bcp47SpeechLocale: "mai-IN", sarvamLanguageCode: "mai-IN", isBrowserReliable: false },
  "mni-IN": { code: "mni-IN", name: "Manipuri", nativeName: "ꯃꯤꯇꯩ ꯂꯣꯟ", bcp47SpeechLocale: "mni-IN", sarvamLanguageCode: "mni-IN", isBrowserReliable: false },
  "ne-IN": { code: "ne-IN", name: "Nepali", nativeName: "नेपाली", bcp47SpeechLocale: "ne-NP", sarvamLanguageCode: "ne-IN", isBrowserReliable: false },
  "sa-IN": { code: "sa-IN", name: "Sanskrit", nativeName: "संस्कृतम्", bcp47SpeechLocale: "sa-IN", sarvamLanguageCode: "sa-IN", isBrowserReliable: false },
  "sat-IN": { code: "sat-IN", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", bcp47SpeechLocale: "sat-IN", sarvamLanguageCode: "sat-IN", isBrowserReliable: false },
  "sd-IN": { code: "sd-IN", name: "Sindhi", nativeName: "सिन्धी", bcp47SpeechLocale: "sd-IN", sarvamLanguageCode: "sd-IN", isBrowserReliable: false },
  "ur-IN": { code: "ur-IN", name: "Urdu", nativeName: "اُردُو", bcp47SpeechLocale: "ur-IN", sarvamLanguageCode: "ur-IN", isBrowserReliable: true }
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
