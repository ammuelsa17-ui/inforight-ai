"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WELFARE_SOURCES } from "@/data/sources/schemes";
import {
  evaluateAllWelfareSchemes,
  EvaluatedSchemeOutput
} from "@/lib/schemes/eligibility-engine";
import {
  ArrowLeft,
  Printer,
  Scale,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Plus
} from "lucide-react";

export default function SchemeComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 py-16 text-center text-slate-500 text-xs">
          Loading comparison matrix...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const initialIds = idsParam ? idsParam.split(",").filter(Boolean) : [];

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  const allEvaluated = useMemo(() => {
    return evaluateAllWelfareSchemes({});
  }, []);

  const selectedSchemes: EvaluatedSchemeOutput[] = useMemo(() => {
    return allEvaluated.filter((s) => selectedIds.includes(s.id));
  }, [allEvaluated, selectedIds]);

  const handleRemove = (id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/schemes"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600"
              title="Return to schemes catalogue"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                <span>Side-by-Side Scheme Comparison</span>
              </h1>
              <p className="text-xs text-slate-500">
                Compare up to 4 Central and State welfare schemes deterministically.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Comparison</span>
            </button>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Schemes</span>
            </Link>
          </div>
        </div>

        {selectedSchemes.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 w-48 font-bold text-slate-700 uppercase tracking-wider bg-slate-100/70 sticky left-0 z-10">
                      Criteria / Feature
                    </th>
                    {selectedSchemes.map((s) => (
                      <th
                        key={s.id}
                        className="p-4 font-bold text-slate-900 min-w-[260px] max-w-xs align-top border-l border-slate-200"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-[10px] font-semibold text-slate-400 font-mono">
                            {s.id}
                          </span>
                          <button
                            onClick={() => handleRemove(s.id)}
                            className="text-slate-400 hover:text-rose-600 text-xs font-bold"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="text-sm font-bold leading-snug">{s.title}</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {/* 1. Benefit & Type */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                      Benefit &amp; Type
                    </td>
                    {selectedSchemes.map((s) => (
                      <td key={s.id} className="p-4 border-l border-slate-200">
                        <span className="font-semibold text-slate-900 block mb-1">
                          {s.benefitType}
                        </span>
                        {s.isLoanOrCredit && (
                          <div className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1.5 inline-block">
                            ⚠️ Repayable Loan / Credit
                          </div>
                        )}
                        <p className="text-slate-600 leading-relaxed">{s.benefitDescription}</p>
                      </td>
                    ))}
                  </tr>

                  {/* 2. Jurisdiction & Level */}
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

                  {/* 3. Target Group & Summary */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                      Scope &amp; Target Group
                    </td>
                    {selectedSchemes.map((s) => (
                      <td key={s.id} className="p-4 border-l border-slate-200 text-slate-600 leading-relaxed">
                        {s.summary}
                      </td>
                    ))}
                  </tr>

                  {/* 4. Required Documents */}
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

                  {/* 5. Administering Authority */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/70 sticky left-0 z-10">
                      Administering Authority
                    </td>
                    {selectedSchemes.map((s) => (
                      <td key={s.id} className="p-4 border-l border-slate-200 text-slate-800">
                        {s.ministryOrDept}
                      </td>
                    ))}
                  </tr>

                  {/* 6. Application Route & Portal */}
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
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8">
            <Scale className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800 mb-1">No Schemes Selected for Comparison</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Return to the schemes discovery page and check the "Compare" box on 2 to 4 schemes to compare them here.
            </p>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
            >
              Browse Schemes Catalogue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
