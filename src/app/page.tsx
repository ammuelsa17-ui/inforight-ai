"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Building2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-10 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          Coimbatore Civic Road Prototype — Phase 1
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Convert Civic Road Complaints into <span className="text-teal-400">Record-Based RTI Applications</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          InfoRight AI is a privacy-conscious RTI drafting agent that converts ordinary civic complaints into precise requests for existing government records, recommends the responsible authority using deterministic rules, validates citations against official sources, and preserves document generation through a safe fallback when AI fails.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/ask"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold bg-teal-600 text-white hover:bg-teal-500 transition-colors shadow-lg shadow-teal-950"
          >
            <span>Draft RTI Application</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Browser Privacy Boundary", desc: "Applicant identity details stay 100% inside your local browser memory." },
          { title: "Deterministic Authority", desc: "Public Information Officers are assigned using strict Coimbatore source rules." },
          { title: "Source Citation Allowlisting", desc: "Citation IDs are intersected server-side against verified official records." },
          { title: "Safe Fallback Protection", desc: "Standard record templates activate automatically if AI generation is unavailable." },
        ].map((item, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold text-white">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">How InfoRight AI Works</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            From plain-language civic problem to official record request in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Describe Civic Problem", desc: "Enter plain English details about road potholes, unpaved trenches, or maintenance delays." },
            { step: "2", title: "Sanitize & Validate", desc: "Server redacts personal data and validates official citation allowlists." },
            { step: "3", title: "Generate Record Requests", desc: "Gemini drafts 3–5 objective questions for work orders, MB entries, and estimates." },
            { step: "4", title: "Add Applicant Details & Export", desc: "Incorporate local identity client-side and print or save as PDF." },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3 relative">
              <span className="w-8 h-8 rounded-lg bg-teal-950 text-teal-300 border border-teal-500/30 font-bold text-sm flex items-center justify-center">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Official Sources Section */}
      <section id="sources" className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Building2 className="w-6 h-6 text-teal-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Official Government Sources</h2>
            <p className="text-xs text-slate-400">Curated Phase 1 registry for Coimbatore City Municipal Corporation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "RTI_ACT_2005_AMENDED", title: "RTI Act 2005 (Amended)", authority: "Ministry of Law & Justice, Govt of India", desc: "National statutory framework governing public information requests under Section 6(1)." },
            { id: "CCMC_RTI_AUTHORITY", title: "CCMC RTI PIO Directory", authority: "Coimbatore City Municipal Corporation", desc: "Official designation directory for Public Information Officers in Coimbatore." },
            { id: "CCMC_ENGINEERING_ROADS", title: "CCMC Engineering & Road Register", authority: "CCMC Engineering Department", desc: "Official function page covering municipal road construction, repairs, and Measurement Books." },
          ].map((src) => (
            <div key={src.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                {src.id}
              </span>
              <h3 className="font-bold text-white text-sm">{src.title}</h3>
              <p className="text-slate-400">{src.authority}</p>
              <p className="text-slate-300 pt-1 leading-relaxed">{src.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-slate-300">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Informational & Educational Disclaimer
        </div>
        <p className="leading-relaxed">
          InfoRight AI is a research prototype designed to assist citizens in drafting record-based RTI applications. It does not provide legal advice or file applications automatically with public authorities. Citizens should verify authority details and prescribed application fees prior to submission.
        </p>
      </footer>
    </div>
  );
}
