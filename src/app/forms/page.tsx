"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_OFFICIAL_FORMS } from "@/data/forms";
import { MasterDomain } from "@/types/source-data";
import {
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Banknote,
  Globe,
  SlidersHorizontal,
  CheckCircle2,
  Printer
} from "lucide-react";

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");

  const filteredForms = useMemo(() => {
    return ALL_OFFICIAL_FORMS.filter((form) => {
      const matchesDomain =
        selectedDomain === "ALL" || form.domain === selectedDomain;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        form.form_name.toLowerCase().includes(query) ||
        (form.form_code && form.form_code.toLowerCase().includes(query)) ||
        form.authority.toLowerCase().includes(query) ||
        form.jurisdiction.state_ut.toLowerCase().includes(query) ||
        (form.form_description && form.form_description.toLowerCase().includes(query));

      return matchesDomain && matchesSearch;
    });
  }, [searchQuery, selectedDomain]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Civic Forms &amp; Petition Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Official Forms &amp; Filing-Ready Drafts
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-3xl">
            Fill out statutory government applications step-by-step through conversational guidance.
            All data is processed strictly inside your browser with zero PII server storage, producing print-ready, legally formatted petitions.
          </p>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by form code, authority, or keyword..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
            />
          </div>

          {/* Domain Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: "ALL", label: "All Forms" },
              { id: "RTI_ACCESS", label: "RTI" },
              { id: "CONSUMER_PROTECTION", label: "Consumer" },
              { id: "TENANT_RIGHTS", label: "Tenancy" },
              { id: "WORKPLACE_RIGHTS", label: "Workplace" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDomain(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDomain === tab.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredForms.map((form) => {
            const isOfficial = form.form_category === "OFFICIAL_PRESCRIBED_FORM";

            return (
              <div
                key={form.form_id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Badge & Code */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isOfficial
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {isOfficial ? "Official Form" : "Filing Draft"}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      {form.form_code || form.form_id}
                    </span>
                  </div>

                  {/* Form Title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                    {form.form_name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {form.form_description ||
                      `Statutory application administered by ${form.authority}.`}
                  </p>

                  {/* Metadata List */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100 mb-6">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        <strong>Authority:</strong> {form.authority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        <strong>Jurisdiction:</strong> {form.jurisdiction.state_ut} (
                        {form.jurisdiction.government_level})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Banknote className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        <strong>Statutory Fee:</strong>{" "}
                        {form.submission.statutory_fee || "Nil"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        <strong>Filing Mode:</strong>{" "}
                        {form.submission.online && form.submission.offline
                          ? "Online & Offline"
                          : form.submission.online
                          ? "Online Portal"
                          : "Physical Counter"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <Link
                  href={`/forms/${form.form_id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm transition-colors"
                >
                  <span>Start Step-by-Step Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Feature Explanation Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 shadow-lg">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privacy &amp; Statutory Compliance</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              How InfoRight AI Form Filling Works
            </h2>
            <p className="text-xs text-indigo-100 leading-relaxed mb-6">
              Unlike generic AI tools that hallucinate legal text or send personal data to external clouds,
              our form wizard guides you through strictly codified questions defined in official rules.
              Your answers are compiled locally into standard court/office petition formats.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="font-bold text-emerald-300 mb-1">1. Conversational Q&amp;A</div>
                <div className="text-indigo-200">
                  Simple questions one step at a time with instant Indian PIN, date, and fee validation.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="font-bold text-emerald-300 mb-1">2. Local Storage</div>
                <div className="text-indigo-200">
                  Save drafts and resume anytime on your device without creating an account.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="font-bold text-emerald-300 mb-1">3. Print &amp; PDF Export</div>
                <div className="text-indigo-200">
                  Generates standard A4 petitions with verification clauses and filing guides.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
