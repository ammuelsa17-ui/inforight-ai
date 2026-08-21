export type LanguageAvailability =
  | "verified"
  | "static-ui-beta"
  | "provider-unverified"
  | "english-fallback";

export interface ScheduledLanguage {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  availability: LanguageAvailability;
}

export const ALL_SCHEDULED_LANGUAGES: ScheduledLanguage[] = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr", availability: "verified" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", direction: "ltr", availability: "static-ui-beta" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", direction: "ltr", availability: "static-ui-beta" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", direction: "ltr", availability: "provider-unverified" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", direction: "ltr", availability: "provider-unverified" },
  { code: "brx", name: "Bodo", nativeName: "बर'", direction: "ltr", availability: "provider-unverified" },
  { code: "doi", name: "Dogri", nativeName: "डोगरी", direction: "ltr", availability: "provider-unverified" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", direction: "ltr", availability: "provider-unverified" },
  { code: "kn", name: "Kannada", nativeName: "கன்னட / ಕನ್ನಡ", direction: "ltr", availability: "provider-unverified" },
  { code: "ks", name: "Kashmiri", nativeName: "कश्मीरी / كश्मीरी", direction: "rtl", availability: "provider-unverified" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी", direction: "ltr", availability: "provider-unverified" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली", direction: "ltr", availability: "provider-unverified" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", direction: "ltr", availability: "provider-unverified" },
  { code: "mni", name: "Manipuri", nativeName: "மईतेई / ꯃꯩꯇꯩꯂꯣꯟ", direction: "ltr", availability: "provider-unverified" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", direction: "ltr", availability: "provider-unverified" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", direction: "ltr", availability: "provider-unverified" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", direction: "ltr", availability: "provider-unverified" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", direction: "ltr", availability: "provider-unverified" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", direction: "ltr", availability: "provider-unverified" },
  { code: "sat", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", direction: "ltr", availability: "provider-unverified" },
  { code: "sd", name: "Sindhi", nativeName: "सिंधी / سنڌي", direction: "rtl", availability: "provider-unverified" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", direction: "ltr", availability: "provider-unverified" },
  { code: "ur", name: "Urdu", nativeName: "اردو", direction: "rtl", availability: "provider-unverified" },
];

export const VALID_LANGUAGE_CODES = new Set(ALL_SCHEDULED_LANGUAGES.map((l) => l.code));
