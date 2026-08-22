"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { BharatLanguageCode } from "@/lib/language/types";
import { BHARAT_LANGUAGES } from "@/lib/language/languages";
import { getUITranslations, UITranslationDictionary } from "@/i18n/ui-translations";

interface LanguageContextType {
  selectedLanguage: BharatLanguageCode;
  setSelectedLanguage: (lang: BharatLanguageCode) => void;
  isEnglish: boolean;
  direction: "ltr" | "rtl";
  translations: UITranslationDictionary;
  t: (keyPath: string) => string;
}

const STORAGE_KEY = "inforight_lang";

const LEGACY_MIGRATION_MAP: Record<string, BharatLanguageCode> = {
  en: "en-IN",
  ta: "ta-IN",
  hi: "hi-IN",
  te: "te-IN",
  ml: "ml-IN",
  kn: "kn-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  gu: "gu-IN",
};

function normalizeLanguageCode(code: string | null): BharatLanguageCode {
  if (!code) return "en-IN";
  if (code in BHARAT_LANGUAGES) return code as BharatLanguageCode;
  if (code in LEGACY_MIGRATION_MAP) return LEGACY_MIGRATION_MAP[code];
  return "en-IN";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguageState] = useState<BharatLanguageCode>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const normalized = normalizeLanguageCode(stored);
        if (stored !== normalized) {
          localStorage.setItem(STORAGE_KEY, normalized);
        }
        return normalized;
      } catch {
        return "en-IN";
      }
    }
    return "en-IN";
  });

  const setSelectedLanguage = useCallback((lang: BharatLanguageCode) => {
    const normalized = normalizeLanguageCode(lang);
    setSelectedLanguageState(normalized);
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
      window.dispatchEvent(new CustomEvent("languageChange", { detail: normalized }));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setSelectedLanguageState(normalizeLanguageCode(e.newValue));
      }
    };
    const handleCustomLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedLanguageState(normalizeLanguageCode(customEvent.detail));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("languageChange", handleCustomLanguageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("languageChange", handleCustomLanguageChange);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const bcp = selectedLanguage || "en-IN";
      const isoLang = bcp.split("-")[0];
      const dir = bcp === "ur-IN" ? "rtl" : "ltr";
      document.documentElement.lang = isoLang;
      document.documentElement.dir = dir;
    }
  }, [selectedLanguage]);

  const translations = getUITranslations(selectedLanguage);

  const warnedKeysRef = React.useRef<Set<string>>(new Set());

  const t = useCallback(
    (keyPath: string): string => {
      const parts = keyPath.split(".");
      let curr: unknown = translations;
      for (const part of parts) {
        if (curr && typeof curr === "object" && part in curr) {
          curr = (curr as Record<string, unknown>)[part];
        } else {
          let fallbackCurr: unknown = getUITranslations("en-IN");
          for (const fallbackPart of parts) {
            if (fallbackCurr && typeof fallbackCurr === "object" && fallbackPart in fallbackCurr) {
              fallbackCurr = (fallbackCurr as Record<string, unknown>)[fallbackPart];
            } else {
              if (process.env.NODE_ENV === "development") {
                if (!warnedKeysRef.current.has(keyPath)) {
                  warnedKeysRef.current.add(keyPath);
                  console.warn(`[i18n] Missing translation key: "${keyPath}"`);
                }
                return `[MISSING: ${keyPath}]`;
              }
              return "";
            }
          }
          return typeof fallbackCurr === "string" ? fallbackCurr : "";
        }
      }
      return typeof curr === "string" ? curr : "";
    },
    [translations]
  );

  const direction = selectedLanguage === "ur-IN" ? "rtl" : "ltr";
  const isEnglish = selectedLanguage === "en-IN";

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        isEnglish,
        direction,
        translations,
        t,
      }}
    >
      <div dir={direction}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
