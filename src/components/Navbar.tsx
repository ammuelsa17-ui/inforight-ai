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

          {/* Desktop Navigation Links — Only at 2xl (1536px+) */}
          <nav className="hidden 2xl:flex items-center ml-6 gap-6 text-sm font-semibold text-[#102A56] shrink-0">
            <Link href="/ask" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap text-indigo-700 font-bold shrink-0">
              {t("nav.getHelp")}
            </Link>
            <Link href="/dashboard" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap shrink-0">
              {t("nav.myCases")}
            </Link>
            <Link href="/rights" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap shrink-0">
              {t("nav.rightsSchemes")}
            </Link>
            <Link href="/resources" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap shrink-0">
              {t("nav.resources")}
            </Link>
            <Link
              href="/official"
              className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-md border border-slate-300 transition-colors whitespace-nowrap font-medium shrink-0"
              title={t("nav.officialTooltip")}
            >
              {t("nav.officialWorkspace")}
            </Link>
          </nav>

          {/* Action CTA & Tools for Full Desktop (2xl+) */}
          <div className="hidden 2xl:flex items-center gap-3 shrink-0 ml-auto pl-4">
            <AccessibilityToolbar textToRead={t("accessibility.defaultSpeechText")} />
            <LanguageSelector />
            <Link
              href="/ask"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-xs whitespace-nowrap"
            >
              <span>{t("nav.describeProblem")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Compact Navbar for all viewports below 2xl (<1536px) */}
          <div className="flex 2xl:hidden items-center gap-2 sm:gap-3 ml-auto">
            <Link
              href="/ask"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-xs whitespace-nowrap"
            >
              <span>{t("nav.getHelp")}</span>
            </Link>
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

      {/* Drawer Menu for all viewports below 2xl (<1536px) */}
      {mobileMenuOpen && (
        <div className="2xl:hidden border-b border-[#BCD7EE] bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="pb-2 border-b border-[#BCD7EE]">
            <AccessibilityToolbar textToRead={t("accessibility.defaultSpeechText")} />
          </div>
          <Link
            href="/ask"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-indigo-600 hover:text-indigo-800 py-1.5"
          >
            {t("nav.getHelp")}
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.myCases")}
          </Link>
          <Link
            href="/rights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.rightsSchemes")}
          </Link>
          <Link
            href="/resources"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.resources")}
          </Link>
          <Link
            href="/official"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-600 hover:text-slate-900 py-1.5 border-t border-slate-100 pt-2"
          >
            {t("nav.officialRoleDemo")}
          </Link>
          <div className="pt-2 border-t border-[#BCD7EE]">
            <Link
              href="/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors"
            >
              <span>{t("nav.describeProblem")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
