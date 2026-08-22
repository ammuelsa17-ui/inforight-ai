import { VoiceLanguage } from "@/types/voice";

/**
 * Official Bharat Multilingual Voice Registry
 * Covers 23 Indian languages and language variants recognized under Schedule VIII of the Constitution of India.
 * Grounded in standard BCP-47 locale identifiers.
 */
export const BHARAT_LANGUAGES: VoiceLanguage[] = [
  {
    id: "en",
    display_name: "English (India)",
    native_name: "English (India)",
    locale: "en-IN",
    recognition_locale: "en-IN",
    tts_locale: "en-IN",
    script: "Latin",
    enabled: true,
    fallback_available: true
  },
  {
    id: "hi",
    display_name: "Hindi",
    native_name: "हिन्दी",
    locale: "hi-IN",
    recognition_locale: "hi-IN",
    tts_locale: "hi-IN",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "ta",
    display_name: "Tamil",
    native_name: "தமிழ்",
    locale: "ta-IN",
    recognition_locale: "ta-IN",
    tts_locale: "ta-IN",
    script: "Tamil",
    enabled: true,
    fallback_available: true
  },
  {
    id: "te",
    display_name: "Telugu",
    native_name: "తెలుగు",
    locale: "te-IN",
    recognition_locale: "te-IN",
    tts_locale: "te-IN",
    script: "Telugu",
    enabled: true,
    fallback_available: true
  },
  {
    id: "kn",
    display_name: "Kannada",
    native_name: "ಕನ್ನಡ",
    locale: "kn-IN",
    recognition_locale: "kn-IN",
    tts_locale: "kn-IN",
    script: "Kannada",
    enabled: true,
    fallback_available: true
  },
  {
    id: "ml",
    display_name: "Malayalam",
    native_name: "മലയാളം",
    locale: "ml-IN",
    recognition_locale: "ml-IN",
    tts_locale: "ml-IN",
    script: "Malayalam",
    enabled: true,
    fallback_available: true
  },
  {
    id: "bn",
    display_name: "Bengali",
    native_name: "বাংলা",
    locale: "bn-IN",
    recognition_locale: "bn-IN",
    tts_locale: "bn-IN",
    script: "Bengali",
    enabled: true,
    fallback_available: true
  },
  {
    id: "mr",
    display_name: "Marathi",
    native_name: "मराठी",
    locale: "mr-IN",
    recognition_locale: "mr-IN",
    tts_locale: "mr-IN",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "gu",
    display_name: "Gujarati",
    native_name: "ગુજરાતી",
    locale: "gu-IN",
    recognition_locale: "gu-IN",
    tts_locale: "gu-IN",
    script: "Gujarati",
    enabled: true,
    fallback_available: true
  },
  {
    id: "pa",
    display_name: "Punjabi",
    native_name: "ਪੰਜਾਬੀ",
    locale: "pa-IN",
    recognition_locale: "pa-IN",
    tts_locale: "pa-IN",
    script: "Gurmukhi",
    enabled: true,
    fallback_available: true
  },
  {
    id: "or",
    display_name: "Odia",
    native_name: "ଓଡ଼ିଆ",
    locale: "or-IN",
    recognition_locale: "or-IN",
    tts_locale: "or-IN",
    script: "Odia",
    enabled: true,
    fallback_available: true
  },
  {
    id: "as",
    display_name: "Assamese",
    native_name: "অসমীয়া",
    locale: "as-IN",
    recognition_locale: "as-IN",
    tts_locale: "as-IN",
    script: "Bengali-Assamese",
    enabled: true,
    fallback_available: true
  },
  {
    id: "ur",
    display_name: "Urdu",
    native_name: "اردو",
    locale: "ur-IN",
    recognition_locale: "ur-IN",
    tts_locale: "ur-IN",
    script: "Perso-Arabic",
    enabled: true,
    fallback_available: true
  },
  {
    id: "ne",
    display_name: "Nepali",
    native_name: "नेपाली",
    locale: "ne-NP",
    recognition_locale: "ne-NP",
    tts_locale: "ne-NP",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "kok",
    display_name: "Konkani",
    native_name: "कोंकणी",
    locale: "kok-IN",
    recognition_locale: "kok-IN",
    tts_locale: "kok-IN",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "mni",
    display_name: "Manipuri (Meitei)",
    native_name: "মৈতৈলোন্",
    locale: "mni-IN",
    recognition_locale: "mni-IN",
    tts_locale: "mni-IN",
    script: "Meetei Mayek / Bengali",
    enabled: true,
    fallback_available: true
  },
  {
    id: "brx",
    display_name: "Bodo",
    native_name: "बड़ो",
    locale: "brx-IN",
    recognition_locale: "brx-IN",
    tts_locale: "brx-IN",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "doi",
    display_name: "Dogri",
    native_name: "डोगरी",
    locale: "doi-IN",
    recognition_locale: "doi-IN",
    tts_locale: "doi-IN",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "ks",
    display_name: "Kashmiri",
    native_name: "كأشُر / कश्मीरी",
    locale: "ks-IN",
    recognition_locale: "ks-IN",
    tts_locale: "ks-IN",
    script: "Perso-Arabic / Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "mai",
    display_name: "Maithili",
    native_name: "मैथिली",
    locale: "mai-IN",
    recognition_locale: "mai-IN",
    tts_locale: "mai-IN",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "sat",
    display_name: "Santali",
    native_name: "ᱥᱟᱱᱛᱟᱲᱤ",
    locale: "sat-IN",
    recognition_locale: "sat-IN",
    tts_locale: "sat-IN",
    script: "Ol Chiki",
    enabled: true,
    fallback_available: true
  },
  {
    id: "sd",
    display_name: "Sindhi",
    native_name: "سنڌي / सिन्धी",
    locale: "sd-IN",
    recognition_locale: "sd-IN",
    tts_locale: "sd-IN",
    script: "Perso-Arabic / Devanagari",
    enabled: true,
    fallback_available: true
  },
  {
    id: "sa",
    display_name: "Sanskrit",
    native_name: "संस्कृतम्",
    locale: "sa-IN",
    recognition_locale: "sa-IN",
    tts_locale: "sa-IN",
    script: "Devanagari",
    enabled: true,
    fallback_available: true
  }
];

export function getLanguageById(id: string): VoiceLanguage {
  return BHARAT_LANGUAGES.find((l) => l.id === id) || BHARAT_LANGUAGES[0];
}

export function getLanguageByLocale(locale: string): VoiceLanguage {
  const norm = locale.toLowerCase();
  return (
    BHARAT_LANGUAGES.find(
      (l) =>
        l.locale.toLowerCase() === norm ||
        l.recognition_locale.toLowerCase() === norm ||
        l.id === norm.split("-")[0]
    ) || BHARAT_LANGUAGES[0]
  );
}
