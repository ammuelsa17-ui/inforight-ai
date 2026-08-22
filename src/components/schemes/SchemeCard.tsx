"use client";

import React, { useState } from "react";
import { EvaluatedSchemeOutput } from "@/lib/schemes/eligibility-engine";
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  XCircle,
  ExternalLink,
  Building,
  MapPin,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";

interface SchemeCardProps {
  scheme: EvaluatedSchemeOutput;
  isSelectedForComparison: boolean;
  onToggleComparison: (schemeId: string) => void;
  canSelectMore: boolean;
}

export default function SchemeCard({
  scheme,
  isSelectedForComparison,
  onToggleComparison,
  canSelectMore
}: SchemeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusBadge = () => {
    switch (scheme.evaluationState) {
      case "ELIGIBLE":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "ELIGIBLE"
        };
      case "POTENTIALLY_ELIGIBLE":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <HelpCircle className="w-3.5 h-3.5 text-amber-600" />,
          label: "POTENTIALLY ELIGIBLE"
        };
      case "NOT_ELIGIBLE":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "NOT ELIGIBLE"
        };
      case "UNKNOWN":
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-300",
          icon: <AlertCircle className="w-3.5 h-3.5 text-slate-500" />,
          label: scheme.verificationStatus === "NEEDS_REVERIFICATION" ? "UNDER REVERIFICATION" : "UNKNOWN"
        };
    }
  };

  const getBenefitTypeBadge = () => {
    const isLoan = scheme.isLoanOrCredit;
    const colors: Record<string, string> = {
      SCHOLARSHIP: "bg-indigo-50 text-indigo-700 border-indigo-200",
      GRANT: "bg-emerald-50 text-emerald-700 border-emerald-200",
      PENSION: "bg-purple-50 text-purple-700 border-purple-200",
      SUBSIDY: "bg-teal-50 text-teal-700 border-teal-200",
      INSURANCE: "bg-blue-50 text-blue-700 border-blue-200",
      HEALTH_ASSURANCE: "bg-cyan-50 text-cyan-700 border-cyan-200",
      IN_KIND_FOOD: "bg-amber-50 text-amber-700 border-amber-200",
      TRAINING: "bg-orange-50 text-orange-700 border-orange-200",
      LOAN: "bg-rose-50 text-rose-800 border-rose-300 font-bold",
      CREDIT: "bg-rose-50 text-rose-800 border-rose-300 font-bold"
    };

    return {
      classes: colors[scheme.benefitType] || "bg-slate-100 text-slate-700 border-slate-200",
      label: isLoan ? `REPAYABLE ${scheme.benefitType}` : scheme.benefitType
    };
  };

  const statusBadge = getStatusBadge();
  const benefitBadge = getBenefitTypeBadge();

  return (
    <div
      className={`bg-white rounded-2xl border transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
        isSelectedForComparison
          ? "border-indigo-500 ring-2 ring-indigo-500/20"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="p-6">
        {/* Top Badges & Selection Control */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${statusBadge.bg}`}
            >
              {statusBadge.icon}
              <span>{statusBadge.label}</span>
            </span>

            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${benefitBadge.classes}`}
            >
              {benefitBadge.label}
            </span>

            <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {scheme.governmentLevel} • {scheme.stateUt}
            </span>
          </div>

          {/* Comparison Checkbox */}
          <label className="flex items-center gap-1.5 text-xs text-slate-600 font-medium cursor-pointer shrink-0 select-none bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={isSelectedForComparison}
              disabled={!isSelectedForComparison && !canSelectMore}
              onChange={() => onToggleComparison(scheme.id)}
              className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span>Compare</span>
          </label>
        </div>

        {/* Scheme Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
          {scheme.title}
        </h3>

        {/* Loan Warning Banner */}
        {scheme.isLoanOrCredit && (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Repayable Credit / Loan:</strong> This scheme provides a loan or credit line that must be repaid according to bank terms, not a free non-repayable grant.
            </span>
          </div>
        )}

        {/* Benefit Summary */}
        <p className="text-xs text-slate-700 leading-relaxed mb-4 line-clamp-3">
          {scheme.benefitDescription}
        </p>

        {/* Why Matched / Missing Info Box */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 mb-4">
          <div className="flex items-start gap-1.5">
            <span className="font-semibold text-slate-500 shrink-0">Why Matched:</span>
            <span className="text-slate-800">{scheme.whyMatched}</span>
          </div>

          {scheme.evaluationState === "POTENTIALLY_ELIGIBLE" && (
            <div className="flex items-start gap-1.5 pt-1 border-t border-slate-200/60 text-amber-800">
              <span className="font-semibold shrink-0">Missing Info:</span>
              <span>{scheme.whatIsMissing}</span>
            </div>
          )}

          {scheme.evaluationState === "NOT_ELIGIBLE" && (
            <div className="flex items-start gap-1.5 pt-1 border-t border-slate-200/60 text-rose-800">
              <span className="font-semibold shrink-0">Disqualified:</span>
              <span>{scheme.failedConditions.join("; ")}</span>
            </div>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 text-xs space-y-3 animate-in fade-in">
            <div>
              <span className="font-semibold text-slate-500 block mb-1">Administering Department:</span>
              <span className="text-slate-800 font-medium">{scheme.ministryOrDept}</span>
            </div>

            <div>
              <span className="font-semibold text-slate-500 block mb-1">Mandatory Documents Required:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="font-semibold text-slate-400 block">Application Mode:</span>
                <span className="text-slate-700">{scheme.applicationMode}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Statutory Fee:</span>
                <span className="text-slate-700">{scheme.statutoryFee || "Nil"}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Official Sourcing:</span>
                <span className="text-slate-700 truncate block">{scheme.officialSourceName}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block">Last Verified:</span>
                <span className="text-slate-700">{scheme.lastVerified}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors"
        >
          <span>{isExpanded ? "Show Less" : "View Full Details"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {scheme.portalUrl ? (
          <a
            href={scheme.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-slate-400 font-medium">Physical Filing</span>
        )}
      </div>
    </div>
  );
}
