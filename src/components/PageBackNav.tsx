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
  const { t, direction } = useLanguage();

  const resolvedBackLabel = backLabel || (backHref === "/" ? t("common.backToHome") : t("common.back"));

  return (
    <div
      className={`w-full max-w-full flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2 sm:gap-3 py-2.5 mb-4 text-xs font-semibold text-slate-600 border-b border-slate-200/80 ${className}`}
    >
      {/* Back Link */}
      <Link
        href={backHref}
        className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-[#102A56] hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-2xs min-h-10 h-auto whitespace-normal break-words leading-snug shrink min-w-0"
      >
        <ArrowLeft className={`w-3.5 h-3.5 shrink-0 text-indigo-600 ${direction === "rtl" ? "rotate-180" : ""}`} />
        <span className="break-words">{resolvedBackLabel}</span>
      </Link>

      {/* Home Link (Always available on non-home pages) */}
      {backHref !== "/" && (
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-[#102A56] hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-2xs min-h-10 h-auto whitespace-normal break-words leading-snug shrink-0"
          title={t("common.backToHome")}
        >
          <Home className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
          <span>{t("common.home")}</span>
        </Link>
      )}
    </div>
  );
}
