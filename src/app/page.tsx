"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, Scale, Award, AlertTriangle, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { enMessages } from "@/i18n/messages/en";
import { hiMessages } from "@/i18n/messages/hi";
import { taMessages } from "@/i18n/messages/ta";

export default function HomePage() {
  const { language, currentLangObj } = useLanguage();

  const msg =
    language === "ta"
      ? taMessages
      : language === "hi"
      ? hiMessages
      : enMessages;

  return (
    <div className="w-full space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Translation Beta Banner for Non-English */}
      {language !== "en" && (
        <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FCD34D] text-xs text-[#92400E] flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>
            <strong>Translation Notice ({currentLangObj.nativeName})</strong> — Dynamic translation is not yet available for this language. Verified English guidance will be displayed.
          </span>
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-10 border-b border-[#BCD7EE]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#7DD3FC] text-[#0369A1] text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
          {msg.hero.badge}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102A56] tracking-tight leading-tight max-w-4xl mx-auto">
          {msg.hero.title}
        </h1>

        <p className="text-base sm:text-lg text-[#526176] max-w-3xl mx-auto leading-relaxed font-normal">
          {msg.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/ask"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-md shadow-indigo-100"
          >
            <span>{msg.hero.cta}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 4 Core Modules Selection Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#102A56]">Four Integrated Empowerment Modules</h2>
          <p className="text-sm text-[#526176] max-w-xl mx-auto">
            Select a module directly or describe your problem for automated AI triage and step-by-step guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Module 1: RTI */}
          <Link
            href="/ask"
            className="p-6 rounded-2xl bg-white border border-[#BCD7EE] hover:border-[#4F46E5] hover:shadow-md transition-all space-y-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#102A56] group-hover:text-[#4F46E5] transition-colors">
                RTI Drafting Agent
              </h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                Convert civic road complaints into 3–5 objective requests for certified copies of government records under Section 6(1) of RTI Act 2005.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-[#4F46E5] inline-flex items-center gap-1">
              <span>Draft RTI Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Module 2: Rights Navigator */}
          <Link
            href="/rights"
            className="p-6 rounded-2xl bg-white border border-[#BCD7EE] hover:border-[#4F46E5] hover:shadow-md transition-all space-y-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
              <Scale className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#102A56] group-hover:text-[#4F46E5] transition-colors">
                Rights Navigator
              </h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                Navigate Consumer (e-Commerce), Tenancy, or Workplace disputes with simple-language breakdowns, evidence checklists, and statutory links (e-Jagriti, 1915, SAMADHAN 2.0).
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-[#4F46E5] inline-flex items-center gap-1">
              <span>Explore Rights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Module 3: Schemes */}
          <Link
            href="/schemes"
            className="p-6 rounded-2xl bg-white border border-[#BCD7EE] hover:border-[#4F46E5] hover:shadow-md transition-all space-y-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#102A56] group-hover:text-[#4F46E5] transition-colors">
                Scheme Eligibility Reader
              </h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                Evaluate citizen profiles against 12 verified welfare schemes returning potential scheme matches requiring official department confirmation (myScheme framework).
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-[#4F46E5] inline-flex items-center gap-1">
              <span>Match Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Safety & Privacy Bar */}
      <section className="p-6 rounded-2xl bg-[#F4F9FF] border border-[#BCD7EE] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[#0284C7] shrink-0" />
          <div className="text-xs text-[#172033]">
            <strong className="text-[#102A56] block">Browser Privacy Boundary Guaranteed</strong>
            Applicant identity fields are excluded from the permitted translation payload and remain 100% in local browser state.
          </div>
        </div>
        <Link
          href="/sources"
          className="px-4 py-2 rounded-lg bg-white border border-[#BCD7EE] text-xs font-semibold text-[#102A56] hover:bg-[#E0F2FE] transition-colors whitespace-nowrap"
        >
          View Source Registry
        </Link>
      </section>
    </div>
  );
}
