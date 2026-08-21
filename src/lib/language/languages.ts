import { BharatLanguageCode, LanguageMetadata } from "./types";

export const BHARAT_LANGUAGES: Record<BharatLanguageCode, LanguageMetadata> = {
  "en-IN": { code: "en-IN", name: "English", nativeName: "English", translationSupported: true, sttSupported: true, ttsSupported: true },
  "hi-IN": { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी", translationSupported: true, sttSupported: true, ttsSupported: true },
  "ta-IN": { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்", translationSupported: true, sttSupported: true, ttsSupported: true },
  "te-IN": { code: "te-IN", name: "Telugu", nativeName: "తెలుగు", translationSupported: true, sttSupported: true, ttsSupported: true },
  "kn-IN": { code: "kn-IN", name: "Kannada", nativeName: "கன்னட / ಕನ್ನಡ", translationSupported: true, sttSupported: true, ttsSupported: true },
  "ml-IN": { code: "ml-IN", name: "Malayalam", nativeName: "மலையாளம் / മലയാളം", translationSupported: true, sttSupported: true, ttsSupported: true },
  "mr-IN": { code: "mr-IN", name: "Marathi", nativeName: "मराठी", translationSupported: true, sttSupported: true, ttsSupported: true },
  "bn-IN": { code: "bn-IN", name: "Bengali", nativeName: "বাংলা", translationSupported: true, sttSupported: true, ttsSupported: true },
  "gu-IN": { code: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી", translationSupported: true, sttSupported: true, ttsSupported: true },
  "pa-IN": { code: "pa-IN", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", translationSupported: true, sttSupported: true, ttsSupported: true },
  "od-IN": { code: "od-IN", name: "Odia", nativeName: "ଓଡ଼ିଆ", translationSupported: true, sttSupported: true, ttsSupported: true },
  "as-IN": { code: "as-IN", name: "Assamese", nativeName: "অসমীয়া", translationSupported: true, sttSupported: true, ttsSupported: false },
  "brx-IN": { code: "brx-IN", name: "Bodo", nativeName: "बड़ो", translationSupported: true, sttSupported: true, ttsSupported: false },
  "doi-IN": { code: "doi-IN", name: "Dogri", nativeName: "डोगरी", translationSupported: true, sttSupported: true, ttsSupported: false },
  "ks-IN": { code: "ks-IN", name: "Kashmiri", nativeName: "कॉशुर", translationSupported: true, sttSupported: true, ttsSupported: false },
  "kok-IN": { code: "kok-IN", name: "Konkani", nativeName: "கொங்கணி / कोंकणी", translationSupported: true, sttSupported: true, ttsSupported: false },
  "mai-IN": { code: "mai-IN", name: "Maithili", nativeName: "मैथिली", translationSupported: true, sttSupported: true, ttsSupported: false },
  "mni-IN": { code: "mni-IN", name: "Manipuri", nativeName: "মৈতৈলোন্", translationSupported: true, sttSupported: true, ttsSupported: false },
  "ne-IN": { code: "ne-IN", name: "Nepali", nativeName: "नेपाली", translationSupported: true, sttSupported: true, ttsSupported: false },
  "sa-IN": { code: "sa-IN", name: "Sanskrit", nativeName: "संस्कृतम्", translationSupported: true, sttSupported: true, ttsSupported: false },
  "sat-IN": { code: "sat-IN", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", translationSupported: true, sttSupported: true, ttsSupported: false },
  "sd-IN": { code: "sd-IN", name: "Sindhi", nativeName: "सिन्धी", translationSupported: true, sttSupported: true, ttsSupported: false },
  "ur-IN": { code: "ur-IN", name: "Urdu", nativeName: "اُردُو", translationSupported: true, sttSupported: true, ttsSupported: false }
};

export function getLanguage(code: string): LanguageMetadata | undefined {
  return BHARAT_LANGUAGES[code as BharatLanguageCode];
}

export function supportsTranslation(code: string): boolean {
  const lang = getLanguage(code);
  return Boolean(lang?.translationSupported);
}

export function supportsSTT(code: string): boolean {
  const lang = getLanguage(code);
  return Boolean(lang?.sttSupported);
}

export function supportsTTS(code: string): boolean {
  const lang = getLanguage(code);
  return Boolean(lang?.ttsSupported);
}

export const ALL_BHARAT_LANGUAGES = Object.values(BHARAT_LANGUAGES);
