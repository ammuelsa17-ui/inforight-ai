"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ALL_SCHEDULED_LANGUAGES } from "@/i18n/languages";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center gap-2">
      <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select Language"
        className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer font-medium"
      >
        {ALL_SCHEDULED_LANGUAGES.map((lang) => {
          let labelBadge = "";
          if (lang.availability === "verified") {
            labelBadge = " (Verified)";
          } else if (lang.availability === "static-ui-beta") {
            labelBadge = " (UI Beta)";
          } else {
            labelBadge = " (Fallback)";
          }
          return (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName} ({lang.name}){labelBadge}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default LanguageSelector;
