"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, Scale, Award, MessageSquareText, AlertTriangle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-10 border-b border-[#BCD7EE]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#7DD3FC] text-[#0369A1] text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
          AI for Civic and Legal Empowerment — Version 2.0
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102A56] tracking-tight leading-tight max-w-4xl mx-auto">
          Understand and Act on Your <span className="text-[#4F46E5]">Civic & Legal Rights</span>
        </h1>

        <p className="text-base sm:text-lg text-[#526176] max-w-3xl mx-auto leading-relaxed font-normal">
          InfoRight AI translates bureaucratic complexity into a clear, guided path. Describe your civic or legal problem in plain language to generate certified RTI record requests, navigate consumer, tenant, or workplace disputes, or match verified welfare schemes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/ask"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-md shadow-indigo-100"
          >
            <span>Describe Your Problem (Unified Entry)</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 4 Core Modules Selection Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#102A56]">Four Integrated Empowerment Modules</h2>
          <p className="text-sm text-[#526176] max-w-xl mx-auto">
            Addressing every illustrative direction under Problem Statement 3
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Module 1: RTI Drafting Agent */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">RTI Drafting Agent</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                Converts plain-language civic road complaints into 3–5 objective requests for certified copies of government records under Section 6(1) of RTI Act 2005.
              </p>
            </div>
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] pt-2"
            >
              <span>Draft RTI Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 2: Rights Navigator */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">Rights Navigator</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                Provides simple-language legal rights summaries, evidence checklists, statutory portal links (e-Jagriti / SAMADHAN 2.0), and draft representation letters.
              </p>
            </div>
            <Link
              href="/rights"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] pt-2"
            >
              <span>Explore Dispute Rights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 3: Scheme Eligibility Reader */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] text-[#0F9D76] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">Scheme Eligibility Reader</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                Evaluates your profile against 12 verified National and Tamil Nadu welfare schemes (myScheme framework) with deterministic matching rules.
              </p>
            </div>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0F9D76] hover:text-[#0B7A5C] pt-2"
            >
              <span>Check Welfare Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 4: Conversational Form-Filler */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A56]">Conversational Form-Filler</h3>
              <p className="text-xs text-[#526176] leading-relaxed">
                Interviews the citizen one step at a time to auto-populate draft RTI applications, complaint representation letters, and scheme checklists.
              </p>
            </div>
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D97706] hover:text-[#B45309] pt-2"
            >
              <span>Start Conversational Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 Mandatory Demo Scenarios Bar */}
      <section className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-3">
          <h3 className="text-base font-bold text-[#102A56]">Mandatory Demonstration Use Cases</h3>
          <span className="text-xs text-[#526176] font-medium">Click to test instantly</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Link href="/ask" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">1. Coimbatore Road RTI</span>
            <span className="text-[#526176] text-[11px] block">R.S. Puram Potholes inspection</span>
          </Link>
          <Link href="/rights/consumer" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">2. Laptop Refund Denial</span>
            <span className="text-[#526176] text-[11px] block">Consumer NCH 1915 & e-Jagriti</span>
          </Link>
          <Link href="/rights/tenant" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">3. Deposit Withholding</span>
            <span className="text-[#526176] text-[11px] block">Tenant Rent Court notice</span>
          </Link>
          <Link href="/rights/workplace" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#4F46E5] transition-colors block">
            <span className="font-bold text-[#102A56] block">4. Unpaid Salary Dues</span>
            <span className="text-[#526176] text-[11px] block">SAMADHAN 2.0 Conciliation</span>
          </Link>
          <Link href="/schemes" className="p-3 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-1 hover:border-[#0F9D76] transition-colors block">
            <span className="font-bold text-[#102A56] block">5. Student Scholarship</span>
            <span className="text-[#526176] text-[11px] block">myScheme rule-based match</span>
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="p-4 rounded-xl bg-white border border-[#BCD7EE] text-xs text-[#526176] space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-semibold text-[#102A56]">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
          Informational & Educational Disclaimer
        </div>
        <p className="leading-relaxed">
          InfoRight AI is a research prototype designed to assist citizens in understanding rights and drafting applications. It does not provide legal advice or file applications automatically with public authorities. Citizens should verify authority details and statutory fees prior to submission.
        </p>
      </footer>
    </div>
  );
}
