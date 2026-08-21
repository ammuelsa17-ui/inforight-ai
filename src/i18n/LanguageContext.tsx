"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ALL_SCHEDULED_LANGUAGES, ScheduledLanguage } from "./languages";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  currentLangObj: ScheduledLanguage;
  dir: "ltr" | "rtl";
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("inforight_lang");
      if (saved && ALL_SCHEDULED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    }
    return "en";
  });

  const currentLangObj =
    ALL_SCHEDULED_LANGUAGES.find((l) => l.code === language) ||
    ALL_SCHEDULED_LANGUAGES[0];

  const dir = currentLangObj.direction;
  const isRTL = dir === "rtl";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
    }
  }, [language, dir]);

  const setLanguage = (lang: string) => {
    const valid = ALL_SCHEDULED_LANGUAGES.some((l) => l.code === lang);
    const target = valid ? lang : "en";
    setLanguageState(target);
    if (typeof window !== "undefined") {
      localStorage.setItem("inforight_lang", target);
      window.dispatchEvent(new Event("languageChange"));
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLangObj,
        dir,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
