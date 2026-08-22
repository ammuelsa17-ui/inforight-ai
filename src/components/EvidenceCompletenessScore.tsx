"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { calculateEvidenceCompletenessScore } from "@/lib/statutory/evidence-completeness";
import { CheckCircle2, Circle, AlertCircle, BarChart3 } from "lucide-react";

interface EvidenceCompletenessScoreProps {
  issueDescription: string;
  locationAndAuthority: string;
  dateRange?: string;
  priorComplaintRef?: string;
  hasSupportingDocuments?: boolean;
  hasSpecificQuestions?: boolean;
}

export function EvidenceCompletenessScore({
  issueDescription,
  locationAndAuthority,
  dateRange,
  priorComplaintRef,
  hasSupportingDocuments,
  hasSpecificQuestions,
}: EvidenceCompletenessScoreProps) {
  const { t } = useLanguage();
  const completeness = calculateEvidenceCompletenessScore({
    issueDescription,
    locationAndAuthority,
    dateRange,
    priorComplaintRef,
    hasSupportingDocuments,
    hasSpecificQuestions,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800";
    if (score >= 50) return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800";
    return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800";
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t("evidence.scorecardTitle")}
            </h4>
            <p className="text-xs text-slate-500">
              {t("evidence.scorecardSubtitle")}
            </p>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full border text-xs font-extrabold flex items-center gap-1 ${getScoreColor(completeness.scorePercentage)}`}>
          <span>{completeness.scorePercentage}% Completeness</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            completeness.scorePercentage >= 80
              ? "bg-emerald-500"
              : completeness.scorePercentage >= 50
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
          style={{ width: `${completeness.scorePercentage}%` }}
        />
      </div>

      {/* Criteria Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {completeness.items.map((item) => (
          <div
            key={item.id}
            className={`p-2.5 rounded-xl border flex items-center gap-2 ${
              item.isCompleted
                ? "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                : "bg-amber-50/40 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300"
            }`}
          >
            {item.isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Missing Items Notice */}
      {completeness.missingItemsList.length > 0 && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <span className="font-bold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Missing Information ({completeness.missingItemsList.length} items):
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] opacity-90 pl-1">
            {completeness.missingItemsList.map((missing, i) => (
              <li key={i}>{missing}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EvidenceCompletenessScore;
