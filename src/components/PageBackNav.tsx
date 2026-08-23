"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PageBackNavProps {
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export default function PageBackNav({
  backHref = "/",
  backLabel,
  className = "",
}: PageBackNavProps) {
  const { t } = useLanguage();

  const resolvedBackLabel = backLabel || (backHref === "/" ? t("common.backToHome") : t("common.back"));

  return (
    <div className={`w-full max-w-full flex items-center justify-between gap-3 py-2.5 mb-4 text-xs font-semibold text-slate-600 border-b border-slate-200/80 ${className}`}>
      {/* Back Link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[#102A56] hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-2xs min-h-9 h-auto whitespace-normal break-words leading-snug shrink min-w-0"
      >
        <ArrowLeft className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
        <span className="break-words">{resolvedBackLabel}</span>
      </Link>

      {/* Home Link (Always available) */}
      {backHref !== "/" && (
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[#102A56] hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-2xs min-h-9 h-auto whitespace-normal break-words leading-snug shrink-0"
          title={t("common.backToHome")}
        >
          <Home className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
          <span>{t("common.home")}</span>
        </Link>
      )}
    </div>
  );
}
