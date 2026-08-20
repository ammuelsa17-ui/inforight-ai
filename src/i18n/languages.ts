export interface LanguageDefinition {
  code: string;
  name: string;
  nativeName: string;
  stage: 1 | 2 | 3;
  direction: "ltr" | "rtl";
}

export const SCHEDULED_LANGUAGES: LanguageDefinition[] = [
  { code: "en", name: "English", nativeName: "English", stage: 1, direction: "ltr" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", stage: 1, direction: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", stage: 1, direction: "ltr" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", stage: 2, direction: "ltr" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", stage: 2, direction: "ltr" },
  { code: "kn", name: "Kannada", nativeName: "கன்னட / ಕನ್ನಡ", stage: 2, direction: "ltr" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", stage: 2, direction: "ltr" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", stage: 2, direction: "ltr" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", stage: 2, direction: "ltr" },
];
