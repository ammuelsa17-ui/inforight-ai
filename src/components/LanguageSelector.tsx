"use client";

import React from "react";
import { ALL_BHARAT_LANGUAGES } from "@/lib/language/languages";
import { BharatLanguageCode } from "@/lib/language/types";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4F9FF] border border-[#BCD7EE] text-xs text-[#102A56]">
      <Globe className="w-3.5 h-3.5 text-[#4F46E5]" />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value as BharatLanguageCode)}
        className="bg-transparent font-semibold focus:outline-none cursor-pointer text-[#102A56]"
        aria-label={t("nav.selectLanguage")}
      >
        {ALL_BHARAT_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
}
