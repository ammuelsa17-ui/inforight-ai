"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Scale, ShoppingBag, Home, Briefcase, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";

export default function RightsPage() {
  const { t } = useLanguage();

  return (
    <PageContainer size="default">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>
        <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200">
          <Scale className="w-3.5 h-3.5" />
          <span>{t("common.statutoryDisputeNav")}</span>
        </span>
      </div>

      <PageHeader
        title={t("rights.title")}
        description={t("rights.subtitle")}
      />

      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Category 1: Consumer Protection */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between hover:border-indigo-200 transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t("rights.consumerTitle")}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t("rights.consumerDesc")}
            </p>
            <div className="text-xs text-sky-800 bg-sky-50 p-2.5 rounded-xl border border-sky-200 font-medium leading-relaxed">
              {t("rights.consumerEscalation")}
            </div>
          </div>
          <Link
            href="/rights/consumer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <span>{t("rights.consumerCta")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category 2: Tenant Rights */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between hover:border-sky-200 transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Home className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t("rights.tenantTitle")}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t("rights.tenantDesc")}
            </p>
            <div className="text-xs text-sky-800 bg-sky-50 p-2.5 rounded-xl border border-sky-200 font-medium leading-relaxed">
              {t("rights.tenantEscalation")}
            </div>
          </div>
          <Link
            href="/rights/tenant"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-xs"
          >
            <span>{t("rights.tenantCta")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category 3: Workplace Rights */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between hover:border-emerald-200 transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t("rights.workplaceTitle")}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t("rights.workplaceDesc")}
            </p>
            <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-medium leading-relaxed">
              {t("rights.workplaceEscalation")}
            </div>
          </div>
          <Link
            href="/rights/workplace"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <span>{t("rights.workplaceCta")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
