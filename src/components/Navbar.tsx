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
        <div className="flex items-center justify-between min-h-16 py-2 gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#102A56] flex items-center justify-center text-white shadow-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold text-[#102A56] tracking-tight shrink-0">
              INFOAI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-[#102A56] flex-wrap">
            <Link href="/" className="hover:text-[#4F46E5] transition-colors whitespace-normal break-words">
              {t("nav.home")}
            </Link>
            <Link href="/ask" className="hover:text-[#4F46E5] transition-colors whitespace-normal break-words">
              {t("nav.rtiDrafting")}
            </Link>
            <Link href="/rights" className="hover:text-[#4F46E5] transition-colors whitespace-normal break-words">
              {t("nav.rightsNavigator")}
            </Link>
            <Link href="/schemes" className="hover:text-[#4F46E5] transition-colors whitespace-normal break-words">
              {t("nav.welfareSchemes")}
            </Link>
            <Link href="/locator" className="hover:text-[#4F46E5] transition-colors whitespace-normal break-words">
              Locator
            </Link>
            <Link href="/dashboard" className="hover:text-[#4F46E5] transition-colors whitespace-normal break-words">
              Tracker
            </Link>
            <Link href="/sources" className="hover:text-[#4F46E5] transition-colors whitespace-normal break-words">
              {t("nav.officialSources")}
            </Link>
          </nav>

          {/* Action CTA & Language Selector */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <AccessibilityToolbar textToRead="Welcome to InfoRight AI. Convert municipal road complaints into clear record-based RTI applications with verified official sources." />
            <LanguageSelector />
            <Link
              href="/ask"
              className="inline-flex min-h-10 items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-sm whitespace-normal break-words text-center"
            >
              <span>{t("nav.describeProblem")}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#526176] hover:text-[#102A56] hover:bg-[#E0F2FE]"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#BCD7EE] bg-white px-4 py-4 space-y-3">
          <div className="pb-2 border-b border-[#BCD7EE]">
            <AccessibilityToolbar textToRead="Welcome to InfoRight AI. Convert municipal road complaints into clear record-based RTI applications with verified official sources." />
          </div>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/ask"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            {t("nav.rtiDrafting")}
          </Link>
          <Link
            href="/rights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            {t("nav.rightsNavigator")}
          </Link>
          <Link
            href="/forms"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            Forms
          </Link>
          <Link
            href="/schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            {t("nav.welfareSchemes")}
          </Link>
          <Link
            href="/locator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            Authority Locator
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            Statutory Tracker
          </Link>
          <Link
            href="/sources"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5 whitespace-normal break-words"
          >
            {t("nav.officialSources")}
          </Link>
          <div className="pt-2 border-t border-[#BCD7EE]">
            <Link
              href="/ask"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors whitespace-normal break-words text-center"
            >
              <span>{t("nav.describeProblem")}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
