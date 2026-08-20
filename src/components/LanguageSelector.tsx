"use client";

import React, { useState } from "react";
import { SCHEDULED_LANGUAGES } from "@/i18n/languages";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const [selectedLang, setSelectedLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("inforight_lang") || "en";
    }
    return "en";
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("inforight_lang", lang);
      window.dispatchEvent(new Event("languageChange"));
    }
  };

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4F9FF] border border-[#BCD7EE] text-xs text-[#102A56]">
      <Globe className="w-3.5 h-3.5 text-[#4F46E5]" />
      <select
        value={selectedLang}
        onChange={handleChange}
        className="bg-transparent font-semibold focus:outline-none cursor-pointer"
        aria-label="Select Bharat Language"
      >
        {SCHEDULED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
}
