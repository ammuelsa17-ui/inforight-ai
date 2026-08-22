"use client";

import React, { useState } from "react";
import Link from "next/link";
import { matchWelfareSchemes } from "@/services/api";
import { SchemeMatchResponse, SchemeMatchRequest } from "@/types/api";
import { SchemeMatchEvaluation } from "@/lib/schemes/eligibility-engine";
import { ArrowLeft, Sparkles, AlertCircle, ExternalLink, CheckCircle2, XCircle, HelpCircle, Info, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SchemesPage() {
  const { t } = useLanguage();
  const [state, setState] = useState("Tamil Nadu");
  const [age, setAge] = useState<number>(20);
  const [annualIncome, setAnnualIncome] = useState<number>(150000);
  const [occupation, setOccupation] = useState<"student" | "farmer" | "salaried" | "self_employed" | "unemployed" | "senior_citizen">("student");
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [areaType, setAreaType] = useState<"urban" | "rural">("urban");
  const [socialCategory, setSocialCategory] = useState<string>("SC");
  const [hasDisability, setHasDisability] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("female");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<(SchemeMatchResponse & { evaluations?: SchemeMatchEvaluation[] }) | null>(null);

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
        socialCategory,
        hasDisability,
        gender
      } as unknown as SchemeMatchRequest);
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
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.stateLabel")}</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.ageLabel")}</label>
            <input
              type="number"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.incomeLabel")}</label>
            <input
              type="number"
              min={0}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.occupationLabel")}</label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value as "student" | "farmer" | "salaried" | "self_employed" | "unemployed" | "senior_citizen")}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="student">{t("schemes.occStudent")}</option>
              <option value="farmer">{t("schemes.occFarmer")}</option>
              <option value="self_employed">{t("schemes.occSelfEmployed")}</option>
              <option value="salaried">{t("schemes.occSalaried")}</option>
              <option value="unemployed">{t("schemes.occUnemployed")}</option>
              <option value="senior_citizen">{t("schemes.occSenior")}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.socialCategoryLabel")}</label>
            <select
              value={socialCategory}
              onChange={(e) => setSocialCategory(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="OBC">OBC (Other Backward Classes)</option>
              <option value="GENERAL">General Category</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.genderLabel")}</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.areaLabel")}</label>
            <select
              value={areaType}
              onChange={(e) => setAreaType(e.target.value as "urban" | "rural")}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="urban">{t("schemes.areaUrban")}</option>
              <option value="rural">{t("schemes.areaRural")}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("schemes.studentStatusLabel")}</label>
            <select
              value={isStudent ? "yes" : "no"}
              onChange={(e) => setIsStudent(e.target.value === "yes")}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="yes">{t("schemes.studentYes")}</option>
              <option value="no">{t("schemes.studentNo")}</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>{t("schemes.matching")}</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t("schemes.matchBtn")}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#102A56]">
              {t("schemes.resultsTitle")} ({result.totalMatched})
            </h2>
            {result.totalNeedsInfo !== undefined && result.totalNeedsInfo > 0 && (
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                {result.totalNeedsInfo} Need More Info
              </span>
            )}
          </div>

          {result.evaluations && result.evaluations.length > 0 ? (
            <div className="space-y-4">
              {result.evaluations.map((evalItem) => (
                <div
                  key={evalItem.schemeId}
                  className={`p-5 rounded-2xl bg-white border shadow-xs space-y-4 ${
                    evalItem.status === "ELIGIBLE"
                      ? "border-emerald-300 ring-1 ring-emerald-300"
                      : evalItem.status === "NEEDS_INFORMATION"
                      ? "border-amber-300"
                      : "border-slate-200 opacity-80 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                        {evalItem.categoryTag}
                      </span>
                      <h3 className="text-lg font-bold text-[#102A56] mt-1">{evalItem.schemeName}</h3>
                    </div>
                    <div>
                      {evalItem.status === "ELIGIBLE" && (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t("schemes.eligibleBadge")}
                        </span>
                      )}
                      {evalItem.status === "NEEDS_INFORMATION" && (
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          {t("schemes.needsInfoBadge")}
                        </span>
                      )}
                      {evalItem.status === "NOT_ELIGIBLE" && (
                        <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          {t("schemes.notEligibleBadge")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Conditions Breakdown */}
                  <div className="space-y-2 text-xs">
                    {evalItem.satisfiedConditions.length > 0 && (
                      <div className="space-y-1">
                        <strong className="text-emerald-800 font-bold block">{t("schemes.satisfiedCriteriaLabel")}</strong>
                        <ul className="space-y-1">
                          {evalItem.satisfiedConditions.map((cond, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-emerald-900">
                              <span className="font-bold text-emerald-600">✓</span> {cond}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evalItem.failedConditions.length > 0 && (
                      <div className="space-y-1">
                        <strong className="text-red-800 font-bold block">{t("schemes.failedCriteriaLabel")}</strong>
                        <ul className="space-y-1">
                          {evalItem.failedConditions.map((cond, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-red-900">
                              <span className="font-bold text-red-600">✗</span> {cond}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evalItem.missingFields.length > 0 && (
                      <div className="space-y-1">
                        <strong className="text-amber-900 font-bold block">{t("schemes.missingDataLabel")}</strong>
                        <ul className="space-y-1">
                          {evalItem.missingFields.map((field, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-amber-900">
                              <span className="font-bold text-amber-600">?</span> {field}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Required Documents */}
                  <div className="space-y-1.5 text-xs pt-3 border-t border-slate-100">
                    <strong className="text-[#102A56] block">{t("schemes.reqDocs")}</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {evalItem.requiredDocuments.map((doc, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-[#F4F9FF] border border-[#BCD7EE] text-[#526176]">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link & Grounded Citation */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t("schemes.sourceIdLabel")} <strong className="font-mono text-slate-700">{evalItem.officialSourceId}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span>Verified: {evalItem.lastVerified}</span>
                    </div>
                    <a
                      href={evalItem.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#4F46E5] hover:underline"
                    >
                      <span>{t("schemes.applyPortal")}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

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
