"use client";

import React, { useState } from "react";
import Link from "next/link";
import { matchWelfareSchemes } from "@/services/api";
import { SchemeMatchResponse, SchemeMatchRequest } from "@/types/api";
import { ArrowLeft, Sparkles, AlertCircle, ExternalLink, CheckCircle2, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SchemesPage() {
  const { t } = useLanguage();
  const [state, setState] = useState("Tamil Nadu");
  const [age, setAge] = useState<number>(20);
  const [annualIncome, setAnnualIncome] = useState<number>(150000);
  const [occupation, setOccupation] = useState<"student" | "farmer" | "salaried" | "self_employed" | "unemployed" | "senior_citizen">("student");
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [areaType, setAreaType] = useState<"urban" | "rural">("urban");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SchemeMatchResponse | null>(null);

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await matchWelfareSchemes({
        state,
        age: Number(age),
        annualIncome: Number(annualIncome),
        occupation,
        isStudent,
        areaType,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to match welfare schemes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#526176] hover:text-[#102A56] font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>
        <span className="text-xs font-semibold text-[#0F9D76] uppercase tracking-wider px-3 py-1 bg-[#E6F4EA] rounded-full border border-[#A8DADC]">
          {t("schemes.badge")}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">{t("schemes.title")}</h1>
        <p className="text-sm text-[#526176]">
          {t("schemes.subtitle")}
        </p>
      </div>

      {/* Questionnaire Form */}
      <form onSubmit={handleMatch} className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">State Domicile</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">Age (Years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">Annual Household Income (₹)</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">Primary Occupation</label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value as SchemeMatchRequest["occupation"])}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="student">Student</option>
              <option value="farmer">Farmer</option>
              <option value="salaried">Salaried Employee</option>
              <option value="self_employed">Self Employed</option>
              <option value="unemployed">Unemployed / Homemaker</option>
              <option value="senior_citizen">Senior Citizen</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">Location Type</label>
            <select
              value={areaType}
              onChange={(e) => setAreaType(e.target.value as SchemeMatchRequest["areaType"])}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="urban">Urban</option>
              <option value="rural">Rural</option>
            </select>
          </div>

          <div className="space-y-2 flex items-center pt-6">
            <label className="flex items-center gap-2 text-xs font-bold text-[#102A56] cursor-pointer">
              <input
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="w-4 h-4 text-[#4F46E5] rounded focus:ring-0"
              />
              <span>Currently Pursuing Studies (Active Student)</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-[#0F9D76] hover:bg-[#0B7A5C] transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span>{loading ? "Matching Welfare Schemes..." : "Match Eligible Welfare Schemes"}</span>
        </button>
      </form>

      {/* Matched Results Display */}
      {result && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#102A56]">
              Matching Welfare Schemes ({result.totalMatched})
            </h3>
            <span className="text-xs font-semibold text-[#526176]">
              Rule-Based Eligibility Match
            </span>
          </div>

          {result.matchedSchemes.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] text-center text-sm text-[#526176]">
              No schemes matched your exact combination of criteria. Try adjusting income limit or student status.
            </div>
          ) : (
            <div className="space-y-4">
              {result.matchedSchemes.map((scheme) => (
                <div key={scheme.schemeId} className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b border-[#BCD7EE] pb-3">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-[#E6F4EA] text-[#0F9D76] text-[10px] font-bold uppercase tracking-wider">
                        {scheme.schemeId}
                      </span>
                      <h4 className="text-lg font-bold text-[#102A56] mt-1">{scheme.schemeId.replace(/_/g, " ")}</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#7DD3FC] text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Matched
                    </span>
                  </div>

                  {/* Why You Matched Explanation */}
                  <div className="space-y-1.5 text-xs">
                    <strong className="text-[#102A56] block">Why You Matched:</strong>
                    <ul className="list-disc list-inside space-y-1 text-[#526176]">
                      {scheme.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div className="space-y-1.5 text-xs pt-2 border-t border-[#BCD7EE]">
                    <strong className="text-[#102A56] block">Required Documents:</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {scheme.requiredDocuments.map((doc, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-[#F4F9FF] border border-[#BCD7EE] text-[#526176]">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-[#BCD7EE] flex items-center justify-between text-xs">
                    <span className="text-[#526176]">Reference Platform: <strong>myScheme</strong></span>
                    <a
                      href={scheme.officialApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#4F46E5] hover:underline"
                    >
                      <span>Apply on myScheme Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Department Disclaimer */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{result.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
