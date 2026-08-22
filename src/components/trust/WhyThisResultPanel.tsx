"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertCircle, ChevronDown, ChevronUp, Check, HelpCircle, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface WhyThisResultProps {
  title: string;
  resultSummary: string;
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  reasons: string[];
  rulesUsed?: string[];
  officialSources: Array<{ id: string; name: string; url?: string }>;
  unresolvedQuestions?: string[];
}

export const WhyThisResultPanel: React.FC<WhyThisResultProps> = ({
  title,
  resultSummary,
  confidence,
  reasons,
  rulesUsed = [],
  officialSources,
  unresolvedQuestions = [],
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const getConfidenceBadge = () => {
    switch (confidence) {
      case "HIGH":
        return {
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
          label: "HIGH CONFIDENCE — FULLY GROUNDED",
        };
      case "MEDIUM":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          icon: <HelpCircle className="w-3.5 h-3.5 text-amber-600" />,
          label: "MEDIUM CONFIDENCE — BOUNDARY / PILOT SCOPE",
        };
      case "VERIFICATION_REQUIRED":
      default:
        return {
          bg: "bg-rose-100 text-rose-900 border-rose-300",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "VERIFICATION REQUIRED — FACTS UNCONFIRMED",
        };
    }
  };

  const badge = getConfidenceBadge();

  return (
    <div className="p-4 rounded-xl bg-white border border-[#BCD7EE] shadow-2xs space-y-3">
      <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {t("trust.whyTitle")}
          </span>
          <h4 className="text-sm font-bold text-[#102A56]">{title}</h4>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${badge.bg}`}>
          {badge.icon}
          <span>{badge.label}</span>
        </span>
      </div>

      <p className="text-xs text-slate-700 font-medium leading-relaxed">
        {resultSummary}
      </p>

      {/* Top Reasons Summary */}
      <div className="space-y-1.5 pt-1">
        {reasons.map((r, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>{r}</span>
          </div>
        ))}
      </div>

      {unresolvedQuestions.length > 0 && (
        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <span className="font-bold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            {t("trust.unresolvedFacts")}
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
            {unresolvedQuestions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Expandable Source Transparency Accordion */}
      <div className="pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>{isOpen ? t("trust.hideSources") : t("trust.showSources")}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isOpen && (
          <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
            {rulesUsed.length > 0 && (
              <div>
                <strong className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1">
                  {t("trust.rulesEvaluated")}
                </strong>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[11px]">
                  {rulesUsed.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <strong className="block text-[11px] text-slate-600 uppercase tracking-wider mb-1">
                {t("trust.officialSourceRecords")}
              </strong>
              <div className="flex flex-wrap gap-2">
                {officialSources.map((src) => (
                  <span
                    key={src.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-300 rounded text-[11px] font-mono text-indigo-900"
                  >
                    <span>{src.id} ({src.name})</span>
                    {src.url && (
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
