"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { UserEligibilityProfile } from "@/types/scheme-navigator";
import {
  evaluateAllWelfareSchemes,
  EvaluatedSchemeOutput
} from "@/lib/schemes/eligibility-engine";
import SchemeCard from "@/components/schemes/SchemeCard";
import SchemeComparisonModal from "@/components/schemes/SchemeComparisonModal";
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  RotateCcw,
  ShieldCheck,
  Building,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  Scale,
  X,
  Layers,
  GraduationCap,
  Users,
  Heart,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";

const INDIAN_STATES_AND_UTS = [
  "National",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export default function SchemesPage() {
  const profileStorageKey = "inforight_scheme_profile";

  // User Profile State
  const [profile, setProfile] = useState<UserEligibilityProfile>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(profileStorageKey);
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.warn("Failed to load local scheme profile:", err);
      }
    }
    return {
      state_ut: "Tamil Nadu",
      age: 20,
      annual_family_income: 180000,
      current_student: true,
      education_level: "UG",
      community: "MBC",
      rural_urban: "URBAN"
    };
  });

  const [showExtendedQuestions, setShowExtendedQuestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [levelFilter, setLevelFilter] = useState<string>("ALL");
  const [targetGroupFilter, setTargetGroupFilter] = useState<string>("ALL");
  const [benefitTypeFilter, setBenefitTypeFilter] = useState<string>("ALL");

  // Comparison State
  const [selectedSchemeIds, setSelectedSchemeIds] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Auto-save profile to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(profileStorageKey, JSON.stringify(profile));
      } catch (err) {
        console.warn("Failed to persist scheme profile:", err);
      }
    }
  }, [profile]);

  // Real-time deterministic evaluation of all 91 schemes
  const allEvaluatedSchemes = useMemo(() => {
    return evaluateAllWelfareSchemes(profile);
  }, [profile]);

  // Statistics Summary
  const eligibleCount = allEvaluatedSchemes.filter((s) => s.evaluationState === "ELIGIBLE").length;
  const potentiallyEligibleCount = allEvaluatedSchemes.filter(
    (s) => s.evaluationState === "POTENTIALLY_ELIGIBLE"
  ).length;

  // Filtered scheme output
  const filteredSchemes = useMemo(() => {
    return allEvaluatedSchemes.filter((scheme) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          scheme.title.toLowerCase().includes(q) ||
          scheme.summary.toLowerCase().includes(q) ||
          scheme.ministryOrDept.toLowerCase().includes(q) ||
          scheme.stateUt.toLowerCase().includes(q) ||
          scheme.benefitType.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Status Filter
      if (statusFilter !== "ALL" && scheme.evaluationState !== statusFilter) {
        return false;
      }

      // 3. Government Level Filter
      if (levelFilter === "CENTRAL" && scheme.governmentLevel !== "CENTRAL") return false;
      if (levelFilter === "STATE" && scheme.governmentLevel === "CENTRAL") return false;

      // 4. Benefit Type Filter
      if (benefitTypeFilter !== "ALL" && scheme.benefitType !== benefitTypeFilter) {
        return false;
      }

      // 5. Target Group Filter
      if (targetGroupFilter !== "ALL") {
        const text = (scheme.title + " " + scheme.summary + " " + scheme.subdomain).toLowerCase();
        if (targetGroupFilter === "STUDENTS" && !text.includes("student") && !text.includes("scholarship")) return false;
        if (targetGroupFilter === "FARMERS" && !text.includes("farmer") && !text.includes("kisan") && !text.includes("agriculture")) return false;
        if (targetGroupFilter === "WOMEN" && !text.includes("women") && !text.includes("girl") && !text.includes("maternity") && !text.includes("widow")) return false;
        if (targetGroupFilter === "PWD" && !text.includes("disability") && !text.includes("divyang") && !text.includes("pwd")) return false;
        if (targetGroupFilter === "SENIORS" && !text.includes("senior") && !text.includes("old age") && !text.includes("elderly") && !text.includes("vaya")) return false;
        if (targetGroupFilter === "WORKERS" && !text.includes("worker") && !text.includes("shram") && !text.includes("labour") && !text.includes("vendor")) return false;
      }

      return true;
    });
  }, [allEvaluatedSchemes, searchQuery, statusFilter, levelFilter, benefitTypeFilter, targetGroupFilter]);

  // Comparison Handlers
  const handleToggleComparison = (schemeId: string) => {
    setSelectedSchemeIds((prev) => {
      if (prev.includes(schemeId)) {
        return prev.filter((id) => id !== schemeId);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 schemes at a time.");
        return prev;
      }
      return [...prev, schemeId];
    });
  };

  const handleClearProfile = () => {
    if (window.confirm("Are you sure you want to reset your eligibility profile?")) {
      const defaultProfile: UserEligibilityProfile = {
        state_ut: "Tamil Nadu",
        age: undefined,
        annual_family_income: undefined,
        current_student: undefined,
        community: undefined
      };
      setProfile(defaultProfile);
      if (typeof window !== "undefined") {
        localStorage.removeItem(profileStorageKey);
      }
    }
  };

  const selectedSchemesForModal = useMemo(() => {
    return allEvaluatedSchemes.filter((s) => selectedSchemeIds.includes(s.id));
  }, [allEvaluatedSchemes, selectedSchemeIds]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Welfare Discovery &amp; Eligibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welfare Schemes Discovery &amp; Eligibility Reader
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-3xl">
            Evaluate your citizen profile deterministically against 91 verified Central, State, and UT welfare schemes.
            Compare non-repayable grants, scholarships, and social security pensions with strict rule-based transparency.
          </p>
        </div>

        {/* Profile Questionnaire Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your Eligibility Profile</h2>
                <span className="text-xs text-slate-500">
                  Update your parameters to re-evaluate eligible benefits in real-time.
                </span>
              </div>
            </div>

            <button
              onClick={handleClearProfile}
              className="text-xs text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Profile</span>
            </button>
          </div>

          {/* Primary Profile Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* 1. State / UT */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                State / Union Territory
              </label>
              <select
                value={profile.state_ut}
                onChange={(e) => setProfile((p) => ({ ...p, state_ut: e.target.value }))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium text-slate-900"
              >
                {INDIAN_STATES_AND_UTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Age */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Age (in Years)
              </label>
              <input
                type="number"
                min={0}
                max={120}
                value={profile.age ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    age: e.target.value === "" ? undefined : Number(e.target.value)
                  }))
                }
                placeholder="e.g. 19"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium text-slate-900"
              />
            </div>

            {/* 3. Annual Family Income */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Annual Family Income (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={profile.annual_family_income ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      annual_family_income:
                        e.target.value === "" ? undefined : Number(e.target.value)
                    }))
                  }
                  placeholder="e.g. 180000"
                  className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium text-slate-900 font-mono"
                />
              </div>
            </div>

            {/* 4. Social Community / Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Community / Category
              </label>
              <select
                value={profile.community ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    community: e.target.value ? (e.target.value as any) : undefined
                  }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium text-slate-900"
              >
                <option value="">Select Category (Optional)</option>
                <option value="GENERAL">General (Open Category)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
                <option value="OBC">Other Backward Classes (OBC)</option>
                <option value="BC">Backward Classes (BC)</option>
                <option value="MBC">Most Backward Classes (MBC)</option>
                <option value="DNC">Denotified Communities (DNC)</option>
                <option value="SC">Scheduled Castes (SC)</option>
                <option value="ST">Scheduled Tribes (ST)</option>
              </select>
            </div>
          </div>

          {/* Quick Toggle Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() =>
                setProfile((p) => ({ ...p, current_student: !p.current_student }))
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                profile.current_student
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{profile.current_student ? "✓ Active Student" : "+ Active Student"}</span>
            </button>

            <button
              type="button"
              onClick={() => setProfile((p) => ({ ...p, is_farmer: !p.is_farmer }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                profile.is_farmer
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{profile.is_farmer ? "✓ Farmer / Cultivator" : "+ Farmer / Cultivator"}</span>
            </button>

            <button
              type="button"
              onClick={() => setProfile((p) => ({ ...p, is_pwd: !p.is_pwd }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                profile.is_pwd
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{profile.is_pwd ? "✓ PwD (Divyangjan)" : "+ PwD (Divyangjan)"}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setProfile((p) => ({
                  ...p,
                  gender: p.gender === "FEMALE" ? undefined : "FEMALE"
                }))
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                profile.gender === "FEMALE"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{profile.gender === "FEMALE" ? "✓ Female Beneficiary" : "+ Female Beneficiary"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowExtendedQuestions(!showExtendedQuestions)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 ml-auto flex items-center gap-1 py-1.5"
            >
              <span>{showExtendedQuestions ? "Fewer Options" : "More Specific Criteria"}</span>
              {showExtendedQuestions ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Extended Conditional Criteria */}
          {showExtendedQuestions && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Disability Benchmark Percentage (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={profile.disability_percentage ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      disability_percentage:
                        e.target.value === "" ? undefined : Number(e.target.value),
                      is_pwd: true
                    }))
                  }
                  placeholder="e.g. 40 (Benchmark >= 40%)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Education Level
                </label>
                <select
                  value={profile.education_level ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, education_level: e.target.value || undefined }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">Select Level</option>
                  <option value="PRE_MATRIC">Pre-Matric (Class 1-10)</option>
                  <option value="POST_MATRIC">Post-Matric (Class 11-12)</option>
                  <option value="DIPLOMA">Diploma / ITI</option>
                  <option value="UG">Undergraduate (UG / Degree)</option>
                  <option value="PG">Postgraduate (PG / Masters)</option>
                  <option value="DOCTORATE">Doctorate (Ph.D.)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Marital Status
                </label>
                <select
                  value={profile.marital_status ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      marital_status: e.target.value ? (e.target.value as any) : undefined
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">Select Marital Status</option>
                  <option value="UNMARRIED">Unmarried</option>
                  <option value="MARRIED">Married</option>
                  <option value="WIDOW">Widow</option>
                  <option value="DIVORCED_DESERTED">Deserted / Divorced</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Statistics & Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scheme name, ministry, keyword..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-semibold">
              <button
                onClick={() => setStatusFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === "ALL"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Schemes ({allEvaluatedSchemes.length})
              </button>

              <button
                onClick={() => setStatusFilter("ELIGIBLE")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                  statusFilter === "ELIGIBLE"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Eligible ({eligibleCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter("POTENTIALLY_ELIGIBLE")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                  statusFilter === "POTENTIALLY_ELIGIBLE"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Potentially Eligible ({potentiallyEligibleCount})</span>
              </button>
            </div>
          </div>

          {/* Secondary Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Filter by:</span>

            {/* Target Groups */}
            {[
              { id: "ALL", label: "All Groups" },
              { id: "STUDENTS", label: "Students" },
              { id: "FARMERS", label: "Farmers" },
              { id: "WOMEN", label: "Women & Girls" },
              { id: "PWD", label: "PwD" },
              { id: "SENIORS", label: "Senior Citizens" },
              { id: "WORKERS", label: "Workers" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTargetGroupFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  targetGroupFilter === tab.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Benefit Types */}
            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            {[
              { id: "ALL", label: "All Types" },
              { id: "SCHOLARSHIP", label: "Scholarships" },
              { id: "GRANT", label: "Direct Grants / DBT" },
              { id: "PENSION", label: "Pensions" },
              { id: "LOAN", label: "Loans & Credit" },
              { id: "INSURANCE", label: "Insurance" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setBenefitTypeFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  benefitTypeFilter === tab.id
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Output Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isSelectedForComparison={selectedSchemeIds.includes(scheme.id)}
                onToggleComparison={handleToggleComparison}
                canSelectMore={selectedSchemeIds.length < 4}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No Schemes Matched Your Current Filters
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Try adjusting your income, student status, or community filters to view eligible welfare schemes.
            </p>
            <button
              onClick={() => {
                setStatusFilter("ALL");
                setTargetGroupFilter("ALL");
                setBenefitTypeFilter("ALL");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Floating Comparison Action Bar */}
        {selectedSchemeIds.length > 0 && (
          <div className="fixed bottom-6 inset-x-0 z-40 px-4">
            <div className="max-w-xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-slate-800 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
                  {selectedSchemeIds.length}
                </div>
                <div>
                  <span className="text-xs font-bold block">
                    {selectedSchemeIds.length} Scheme{selectedSchemeIds.length > 1 ? "s" : ""} Selected
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Select 2 to 4 schemes to compare side-by-side
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSchemeIds([])}
                  className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsComparisonOpen(true)}
                  disabled={selectedSchemeIds.length < 2}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedSchemeIds.length >= 2
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare Matrix</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mandatory Department Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 mb-8">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Statutory Disclaimer:</strong> Eligibility evaluations are generated based strictly on official Ministry guidelines, gazette notifications, and myScheme data. InfoRight AI does not sanction benefits or guarantee application acceptance. Final eligibility and disbursement are subject to statutory scrutiny by the respective administering department.
          </p>
        </div>

        {/* Comparison Modal */}
        <SchemeComparisonModal
          isOpen={isComparisonOpen}
          onClose={() => setIsComparisonOpen(false)}
          selectedSchemes={selectedSchemesForModal}
          onRemoveScheme={(id) => setSelectedSchemeIds((prev) => prev.filter((sId) => sId !== id))}
        />
      </div>
    </div>
  );
}
