import { BharatLanguageCode } from "@/lib/language/types";
import { UITranslationSchema } from "./locales/schema";
import { enLocale } from "./locales/en";
import { hiLocale } from "./locales/hi";
import { taLocale } from "./locales/ta";
import { knLocale } from "./locales/kn";
import { teLocale } from "./locales/te";
import { mlLocale } from "./locales/ml";
import { mrLocale } from "./locales/mr";
import { bnLocale } from "./locales/bn";
import { guLocale } from "./locales/gu";
import { paLocale } from "./locales/pa";
import { odLocale } from "./locales/od";
import { asLocale } from "./locales/as";
import { brxLocale } from "./locales/brx";
import { doiLocale } from "./locales/doi";
import { ksLocale } from "./locales/ks";
import { kokLocale } from "./locales/kok";
import { maiLocale } from "./locales/mai";
import { mniLocale } from "./locales/mni";
import { neLocale } from "./locales/ne";
import { saLocale } from "./locales/sa";
import { satLocale } from "./locales/sat";
import { sdLocale } from "./locales/sd";
import { urLocale } from "./locales/ur";

export type { UITranslationSchema } from "./locales/schema";
export type UITranslationDictionary = UITranslationSchema;

export const UI_TRANSLATIONS_MAP: Record<BharatLanguageCode, UITranslationSchema> = {
  "en-IN": enLocale,
  "hi-IN": hiLocale,
  "ta-IN": taLocale,
  "kn-IN": knLocale,
  "te-IN": teLocale,
  "ml-IN": mlLocale,
  "mr-IN": mrLocale,
  "bn-IN": bnLocale,
  "gu-IN": guLocale,
  "pa-IN": paLocale,
  "od-IN": odLocale,
  "as-IN": asLocale,
  "brx-IN": brxLocale,
  "doi-IN": doiLocale,
  "ks-IN": ksLocale,
  "kok-IN": kokLocale,
  "mai-IN": maiLocale,
  "mni-IN": mniLocale,
  "ne-IN": neLocale,
  "sa-IN": saLocale,
  "sat-IN": satLocale,
  "sd-IN": sdLocale,
  "ur-IN": urLocale,
};

export function getUITranslations(code: BharatLanguageCode): UITranslationSchema {
  return UI_TRANSLATIONS_MAP[code] || enLocale;
}
