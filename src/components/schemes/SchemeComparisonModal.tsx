"use client";

import React from "react";
import { EvaluatedSchemeOutput } from "@/lib/schemes/eligibility-engine";
import {
  X,
  Printer,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  AlertTriangle,
  Scale
} from "lucide-react";

interface SchemeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSchemes: EvaluatedSchemeOutput[];
  onRemoveScheme: (schemeId: string) => void;
}

export default function SchemeComparisonModal({
  isOpen,
  onClose,
  selectedSchemes,
  onRemoveScheme
}: SchemeComparisonModalProps) {
  if (!isOpen || selectedSchemes.length === 0) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Scheme Comparison Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Comparing {selectedSchemes.length} selected welfare schemes side-by-side based on verified government rules.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Table</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table Body */}
        <div className="flex-1 overflow-auto p-6 bg-slate-100">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              {/* Header Row: Scheme Titles */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 w-48 font-bold text-slate-700 uppercase tracking-wider bg-slate-100/70 sticky left-0 z-10">
                    Feature / Scheme
                  </th>
                  {selectedSchemes.map((s) => (
                    <th key={s.id} className="p-4 font-bold text-slate-900 min-w-[240px] max-w-xs align-top border-l border-slate-200">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-slate-400 font-mono">
                          {s.id}
                        </span>
                        <button
                          onClick={() => onRemoveScheme(s.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-bold leading-snug">{s.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {/* 1. Eligibility Status */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Eligibility Status
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                          s.evaluationState === "ELIGIBLE"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : s.evaluationState === "POTENTIALLY_ELIGIBLE"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : s.evaluationState === "NOT_ELIGIBLE"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {s.evaluationState}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 2. Benefit Amount & Type */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Benefit &amp; Type
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200">
                      <div className="font-semibold text-slate-900 mb-1">{s.benefitType}</div>
                      {s.isLoanOrCredit && (
                        <div className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1.5 inline-block">
                          ⚠️ Repayable Loan / Credit Facility
                        </div>
                      )}
                      <p className="text-slate-600 leading-relaxed">{s.benefitDescription}</p>
                    </td>
                  ))}
                </tr>

                {/* 3. Why Matched / Missing Info */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Match Analysis
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200">
                      <div className="text-slate-800 mb-1">
                        <strong>Matched:</strong> {s.whyMatched}
                      </div>
                      {s.missingConditions.length > 0 && (
                        <div className="text-amber-800">
                          <strong>Missing:</strong> {s.missingConditions.join("; ")}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 4. Jurisdiction & Level */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Jurisdiction
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200 text-slate-800">
                      {s.governmentLevel} ({s.stateUt})
                    </td>
                  ))}
                </tr>

                {/* 5. Required Documents */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Required Documents
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200">
                      <ul className="list-disc pl-4 space-y-1 text-slate-700">
                        {s.requiredDocuments.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 6. Administering Department */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Administering Dept
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200 text-slate-800">
                      {s.ministryOrDept}
                    </td>
                  ))}
                </tr>

                {/* 7. Application Mode & Portal */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Application Route
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200">
                      <div className="text-slate-800 mb-1">{s.applicationMode}</div>
                      {s.portalUrl && (
                        <a
                          href={s.portalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 8. Sourcing & Verification */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                    Official Sourcing
                  </td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-l border-slate-200 text-slate-500">
                      <div>{s.officialSourceName}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Verified: {s.lastVerified} ({s.verificationStatus})
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              All eligibility parameters are compared deterministically based on official scheme guidelines.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
}
