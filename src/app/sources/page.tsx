"use client";

import React from "react";
import Link from "next/link";
import { OFFICIAL_SOURCES_REGISTRY } from "@/data/source-registry";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SourcesPage() {
  const { t } = useLanguage();
  const sourcesList = Object.values(OFFICIAL_SOURCES_REGISTRY);

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#526176] hover:text-[#102A56] font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>
        <span className="text-xs font-semibold text-[#0369A1] uppercase tracking-wider px-3 py-1 bg-[#E0F2FE] rounded-full border border-[#7DD3FC] flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
          {t("sources.badge")}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">{t("sources.title")}</h1>
        <p className="text-sm text-[#526176]">
          {t("sources.subtitle")}
        </p>
      </div>

      {/* Sources Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sourcesList.map((source) => (
          <div key={source.id} className="p-5 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-3 text-xs">
            <div className="flex items-start justify-between gap-2 border-b border-[#BCD7EE] pb-2">
              <span className="px-2.5 py-0.5 rounded bg-[#E0F2FE] text-[#0284C7] font-bold text-[10px] uppercase tracking-wider">
                {source.category.toUpperCase()} • {source.id}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E6F4EA] text-[#0F9D76] font-bold text-[10px] uppercase tracking-wider">
                {source.verificationStatus}
              </span>
            </div>

            <h3 className="font-bold text-[#102A56] text-sm">{source.title}</h3>
            <p className="text-[#526176]">
              <strong className="text-[#102A56]">Responsible Authority:</strong> {source.authority}
            </p>

            <p className="text-[#526176]">
              <strong className="text-[#102A56]">Jurisdiction:</strong> {source.jurisdiction}
            </p>

            <div className="space-y-1">
              <strong className="text-[#102A56] block">Supported Capabilities:</strong>
              <div className="flex flex-wrap gap-1">
                {source.supports.map((sup, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#F4F9FF] border border-[#BCD7EE] text-[#526176] text-[11px]">
                    {sup}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#BCD7EE] flex items-center justify-between">
              <span className="text-[#526176] text-[11px]">Verified: {source.lastVerified}</span>
              <a
                href={source.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#4F46E5] hover:underline text-xs"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
