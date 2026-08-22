"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Scale,
  Award,
  MessageSquareText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowDown,
  UserCheck,
  RefreshCw,
  Eye
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="w-full space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-10 border-b border-[#BCD7EE]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#7DD3FC] text-[#0369A1] text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
          <span>{t("home.badge")}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102A56] tracking-tight leading-tight max-w-4xl mx-auto">
          Understand Your Rights. Know What to Do Next.
        </h1>

        <p className="text-base sm:text-lg text-[#526176] max-w-3xl mx-auto leading-relaxed font-normal">
          InfoRight AI turns complex civic and legal information into clear, source-grounded actions — across rights, schemes, authorities, documents, and case follow-up.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/ask"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-md shadow-indigo-100"
          >
            <span>Get Help (Describe Problem)</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 transition-colors shadow-xs"
          >
            <span>View My Cases &amp; Tracker</span>
          </Link>
        </div>
      </section>

      {/* 3-Step Journey Explanation */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Simple 3-Step Journey</span>
          <h2 className="text-2xl font-bold text-[#102A56]">How InfoRight Works</h2>
          <p className="text-sm text-[#526176] max-w-xl mx-auto">
            From plain-language complaint to certified statutory submission and closed-loop verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">Describe Your Problem</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tell InfoRight what happened in plain speech or text in any of 23 Indian languages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-base">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">Get the Right Path</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              See competent statutory authorities, verified rules, timeline countdowns, and print-ready petition drafts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">Track &amp; Verify Outcome</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Follow official rectification evidence side-by-side, then confirm resolution or reopen if incomplete.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Sided Civic Resolution Loop Visualizer */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">Accountability Architecture</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Two-Sided Closed-Loop Civic Resolution
            </h2>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
            Prototype Role View: Citizen ↔ Official
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Officers cannot unilaterally close civic complaints. Cases transition to citizen review only after geo-verified rectification proof is uploaded, ensuring complete transparency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 min-w-0">
            <span className="text-[10px] text-indigo-400 font-bold uppercase block">Step 1 • Citizen</span>
            <strong className="text-white block truncate">Reports Issue</strong>
            <p className="text-[11px] text-slate-400">Uploads Before-photo &amp; locality details.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 min-w-0">
            <span className="text-[10px] text-sky-400 font-bold uppercase block">Step 2 • Official</span>
            <strong className="text-white block truncate">Reviews &amp; Dispatches</strong>
            <p className="text-[11px] text-slate-400">Assigned department crew marks IN_PROGRESS.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 min-w-0">
            <span className="text-[10px] text-amber-400 font-bold uppercase block">Step 3 • Official</span>
            <strong className="text-white block truncate">Uploads Rectification</strong>
            <p className="text-[11px] text-slate-400">After-repair photo with GPS validation.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 min-w-0">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block">Step 4 • Citizen</span>
            <strong className="text-white block truncate">Confirms or Reopens</strong>
            <p className="text-[11px] text-slate-400">Inspects Before vs After evidence comparison.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-1.5 min-w-0 sm:col-span-2 lg:col-span-1">
            <span className="text-[10px] text-emerald-300 font-bold uppercase block">Step 5 • Audit</span>
            <strong className="text-emerald-100 block truncate">SHA-256 Record</strong>
            <p className="text-[11px] text-emerald-300/80">Tamper-evident PDF evidence package.</p>
          </div>
        </div>
      </section>

      {/* 4 Core Modules Selection Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#102A56]">{t("home.modulesTitle")}</h2>
          <p className="text-sm text-[#526176] max-w-xl mx-auto">
            {t("home.modulesSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Module 1: RTI Drafting Agent */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">{t("home.module1Title")}</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                {t("home.module1Desc")}
              </p>
            </div>
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] pt-2"
            >
              <span>{t("home.module1Cta")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 2: Rights Navigator */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">{t("home.module2Title")}</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                {t("home.module2Desc")}
              </p>
            </div>
            <Link
              href="/rights"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] pt-2"
            >
              <span>{t("home.module2Cta")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 3: Scheme Eligibility Reader */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] text-[#0F9D76] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">{t("home.module3Title")}</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                {t("home.module3Desc")}
              </p>
            </div>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0F9D76] hover:text-[#0B7A5C] pt-2"
            >
              <span>{t("home.module3Cta")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 4: Conversational Form-Filler */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">{t("home.module4Title")}</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                {t("home.module4Desc")}
              </p>
            </div>
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D97706] hover:text-[#B45309] pt-2"
            >
              <span>{t("home.module4Cta")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 Mandatory Demo Scenarios Bar */}
      <section className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-3">
          <h3 className="text-base font-bold text-[#102A56]">{t("home.demoTitle")}</h3>
          <span className="text-xs text-[#526176] font-medium">{t("home.demoSubtitle")}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Link href="/ask" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">1. {t("home.demo1Title")}</span>
            <span className="text-[#526176] text-[11px] block">{t("home.demo1Sub")}</span>
          </Link>
          <Link href="/rights/consumer" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">2. {t("home.demo2Title")}</span>
            <span className="text-[#526176] text-[11px] block">{t("home.demo2Sub")}</span>
          </Link>
          <Link href="/rights/tenant" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">3. {t("home.demo3Title")}</span>
            <span className="text-[#526176] text-[11px] block">{t("home.demo3Sub")}</span>
          </Link>
          <Link href="/rights/workplace" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">4. {t("home.demo4Title")}</span>
            <span className="text-[#526176] text-[11px] block">{t("home.demo4Sub")}</span>
          </Link>
          <Link href="/schemes" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#0F9D76] transition-colors block">
            <span className="font-bold text-[#102A56] block">5. {t("home.demo5Title")}</span>
            <span className="text-[#526176] text-[11px] block">{t("home.demo5Sub")}</span>
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="p-4 rounded-xl bg-white border border-[#BCD7EE] text-xs text-[#526176] space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-semibold text-[#102A56]">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          {t("home.disclaimerTitle")}
        </div>
        <p className="leading-relaxed">
          {t("home.disclaimerText")}
        </p>
      </footer>
    </div>
  );
}
