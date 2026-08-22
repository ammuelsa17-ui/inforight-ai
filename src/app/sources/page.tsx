"use client";

import React from "react";
import Link from "next/link";
import { OFFICIAL_SOURCES_REGISTRY } from "@/data/source-registry";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";

export default function SourcesPage() {
  const { t } = useLanguage();
  const sourcesList = Object.values(OFFICIAL_SOURCES_REGISTRY);

  return (
    <PageContainer size="default">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>
        <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider px-3 py-1 bg-sky-50 rounded-full border border-sky-200 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>{t("sources.badge")}</span>
        </span>
      </div>

      <PageHeader
        title={t("sources.title")}
        description={t("sources.subtitle")}
      />

      {/* Sources Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sourcesList.map((source) => (
          <div key={source.id} className="p-5 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-3 text-xs">
            <div className="flex items-start justify-between gap-2 border-b border-[#BCD7EE] pb-2">
              <span className="px-2.5 py-0.5 rounded bg-[#E0F2FE] text-[#0284C7] font-bold text-[10px] uppercase tracking-wider">
                {source.category.toUpperCase()} • {source.id}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E6F4EA] text-[#0F9D76] font-bold text-[10px] uppercase tracking-wider">
                {source.verificationStatus === "verified" ? t("sources.verifiedBadge") : source.verificationStatus}
              </span>
            </div>

            <h3 className="font-bold text-[#102A56] text-sm">{source.title}</h3>
            <p className="text-[#526176]">
              <strong className="text-[#102A56]">{t("sources.responsibleAuth")}</strong> {source.authority}
            </p>

            <p className="text-[#526176]">
              <strong className="text-[#102A56]">{t("sources.jurisdictionLabel")}</strong> {source.jurisdiction}
            </p>

            <div className="space-y-1">
              <strong className="text-[#102A56] block">{t("sources.supportedCapabilities")}</strong>
              <div className="flex flex-wrap gap-1">
                {source.supports.map((sup, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#F4F9FF] border border-[#BCD7EE] text-[#526176] text-[11px]">
                    {sup}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#BCD7EE] flex items-center justify-between">
              <span className="text-[#526176] text-[11px]">{t("sources.verifiedLabel")} {source.lastVerified}</span>
              <a
                href={source.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#4F46E5] hover:underline text-xs"
              >
                <span>{t("sources.visitPortal")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
