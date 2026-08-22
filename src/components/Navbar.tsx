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
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#102A56] flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-[#102A56] tracking-tight">
                InfoRight <span className="text-[#4F46E5]">AI</span>
              </span>
              <span className="block text-[10px] text-[#526176] font-medium leading-none">
                {t("home.badge")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 text-sm font-semibold text-[#102A56] shrink-0">
            <Link href="/" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap">
              {t("nav.home")}
            </Link>
            <Link href="/ask" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap">
              {t("nav.rtiDrafting")}
            </Link>
            <Link href="/rights" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap">
              {t("nav.rightsNavigator")}
            </Link>
            <Link href="/schemes" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap">
              {t("nav.welfareSchemes")}
            </Link>
            <Link href="/locator" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap">
              Locator
            </Link>
            <Link href="/dashboard" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap">
              Tracker
            </Link>
            <Link href="/sources" className="hover:text-[#4F46E5] transition-colors whitespace-nowrap">
              {t("nav.officialSources")}
            </Link>
          </nav>

          {/* Action CTA & Language Selector */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            <AccessibilityToolbar textToRead="Welcome to InfoRight AI. Convert municipal road complaints into clear record-based RTI applications with verified official sources." />
            <LanguageSelector />
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-sm whitespace-nowrap"
            >
              <span>{t("nav.describeProblem")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
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
        <div className="md:hidden border-b border-[#BCD7EE] bg-white px-4 py-4 space-y-3">
          <div className="pb-2 border-b border-[#BCD7EE]">
            <AccessibilityToolbar textToRead="Welcome to InfoRight AI. Convert municipal road complaints into clear record-based RTI applications with verified official sources." />
          </div>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/ask"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.rtiDrafting")}
          </Link>
          <Link
            href="/rights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.rightsNavigator")}
          </Link>
          <Link
            href="/forms"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            Forms
          </Link>
          <Link
            href="/schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.welfareSchemes")}
          </Link>
          <Link
            href="/locator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            Authority Locator
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            Statutory Tracker
          </Link>
          <Link
            href="/sources"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#102A56] hover:text-[#4F46E5] py-1.5"
          >
            {t("nav.officialSources")}
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
