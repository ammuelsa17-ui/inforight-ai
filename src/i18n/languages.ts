import { ALL_BHARAT_LANGUAGES } from "@/lib/language/languages";

export interface LanguageDefinition {
  code: string;
  name: string;
  nativeName: string;
  stage: 1 | 2 | 3;
  direction: "ltr" | "rtl";
}

export const SCHEDULED_LANGUAGES: LanguageDefinition[] = ALL_BHARAT_LANGUAGES.map((lang) => ({
  code: lang.code,
  name: lang.name,
  nativeName: lang.nativeName,
  stage: lang.ttsSupported ? 1 : 2,
  direction: lang.code === "ur-IN" ? "rtl" : "ltr",
}));
