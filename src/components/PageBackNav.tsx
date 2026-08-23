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

  const isTopLevel = backHref === "/" || !backHref;
  const resolvedBackLabel = backLabel || (isTopLevel ? t("common.backToHome") : t("common.back"));

  return (
    <nav
      aria-label="Breadcrumb Navigation"
      className={`w-full max-w-full flex items-center justify-between gap-2 py-2 mb-3 sm:mb-4 text-xs text-slate-500 flex-wrap ${className}`}
    >
      {/* Back Link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors font-medium min-h-8 h-auto whitespace-normal break-words leading-snug shrink min-w-0"
      >
        <ArrowLeft className={`w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-indigo-600 ${direction === "rtl" ? "rotate-180" : ""}`} />
        <span className="break-words">{resolvedBackLabel}</span>
      </Link>

      {/* Home Link — Rendered ONLY for nested pages where backHref !== '/' */}
      {!isTopLevel && (
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors font-medium min-h-8 h-auto whitespace-normal break-words leading-snug shrink-0"
          title={t("common.backToHome")}
        >
          <Home className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>{t("common.home")}</span>
        </Link>
      )}
    </nav>
  );
}
