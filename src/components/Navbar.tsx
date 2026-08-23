"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Menu, X, ArrowRight } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#BCD7EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#102A56] flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-base font-bold text-[#102A56] tracking-tight">
              InfoRight <span className="text-[#4F46E5]">AI</span>
            </span>
          </Link>

          {/* Universal Right Controls: Language Selector + Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#526176] hover:text-[#102A56] hover:bg-[#E0F2FE] transition-colors"
              aria-label={mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Universal Drawer Menu across all viewports */}
      {mobileMenuOpen && (
        <div className="border-b border-[#BCD7EE] bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="pb-2 border-b border-[#BCD7EE]">
            <AccessibilityToolbar textToRead={t("accessibility.defaultSpeechText")} />
          </div>
          <Link
            href="/ask"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-indigo-600 hover:text-indigo-800 py-1.5 break-words whitespace-normal leading-snug"
          >
            {t("nav.getHelp")}
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 break-words whitespace-normal leading-snug"
          >
            {t("nav.myCases")}
          </Link>
          <Link
            href="/rights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 break-words whitespace-normal leading-snug"
          >
            {t("nav.rightsSchemes")}
          </Link>
          <Link
            href="/resources"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 break-words whitespace-normal leading-snug"
          >
            {t("nav.resources")}
          </Link>
          <Link
            href="/official"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-600 hover:text-slate-900 py-1.5 border-t border-slate-100 pt-2 break-words whitespace-normal leading-snug"
            title={t("nav.officialTooltip")}
          >
            {t("nav.officialRoleDemo")}
          </Link>
          <div className="pt-2 border-t border-[#BCD7EE]">
            <Link
              href="/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors whitespace-normal text-center leading-snug"
            >
              <span className="break-words">{t("nav.describeProblem")}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
