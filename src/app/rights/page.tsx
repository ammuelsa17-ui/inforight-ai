"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Scale, ShoppingBag, Home, Briefcase, ArrowLeft } from "lucide-react";

export default function RightsPage() {
  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#526176] hover:text-[#102A56] font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs font-semibold text-[#4F46E5] uppercase tracking-wider flex items-center gap-1.5 px-3 py-1 bg-[#EEF2FF] rounded-full border border-[#C7D2FE]">
          <Scale className="w-4 h-4" />
          Statutory Dispute Navigation
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">Rights Navigator</h1>
        <p className="text-sm text-[#526176]">
          Select your dispute category to receive simple-language legal rights explanations, evidence checklists, official escalation links, and a generated draft representation letter.
        </p>
      </div>

      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category 1: Consumer Protection */}
        <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#102A56]">Consumer Disputes</h2>
            <p className="text-xs text-[#526176] leading-relaxed">
              Defective products, online laptop refund denials, misleading advertisements, and non-delivery of service under Consumer Protection Act 2019.
            </p>
            <div className="text-[11px] text-[#0369A1] bg-[#E0F2FE] p-2 rounded-lg border border-[#7DD3FC] font-medium">
              Official Escalation: NCH 1915 & e-Jagriti Portal
            </div>
          </div>
          <Link
            href="/rights/consumer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors"
          >
            <span>Navigate Consumer Rights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category 2: Tenant Rights */}
        <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold">
              <Home className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#102A56]">Tenant Rights</h2>
            <p className="text-xs text-[#526176] leading-relaxed">
              Security deposit withholding, unreasonable rent hikes, structural repair delays, and arbitrary eviction notices under state rent control acts.
            </p>
            <div className="text-[11px] text-[#D97706] bg-[#FEF3C7] p-2 rounded-lg border border-[#FDE68A] font-medium">
              Official Escalation: State Rent Authority & Rent Court
            </div>
          </div>
          <Link
            href="/rights/tenant"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors"
          >
            <span>Navigate Tenant Rights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category 3: Workplace Rights */}
        <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#E6F4EA] text-[#0F9D76] flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#102A56]">Workplace Rights</h2>
            <p className="text-xs text-[#526176] leading-relaxed">
              Unpaid monthly salary dues, post-resignation settlement delays, wrongful termination, and workplace grievance conciliation.
            </p>
            <div className="text-[11px] text-[#0F9D76] bg-[#E6F4EA] p-2 rounded-lg border border-[#A8DADC] font-medium">
              Official Escalation: SAMADHAN 2.0 Conciliation Portal
            </div>
          </div>
          <Link
            href="/rights/workplace"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors"
          >
            <span>Navigate Workplace Rights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
