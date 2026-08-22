"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MasterDomain } from "@/types/source-data";
import {
  AuthorityResolutionQuery,
  AuthorityResolutionResult
} from "@/types/authority-locator";
import { defaultPincodeProvider } from "@/lib/authorities/pincode-resolver";
import { resolveCompetentAuthority } from "@/lib/authorities/authority-router";
import AuthorityCard from "@/components/locator/AuthorityCard";
import VoiceInputButton from "@/components/voice/VoiceInputButton";
import { normalizeSpokenPincode } from "@/lib/voice/number-normalizer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Scale,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers,
  FileText
} from "lucide-react";

export default function LocatorPage() {
  const { selectedLanguage } = useLanguage();
  const [pincodeInput, setPincodeInput] = useState("600042");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [domain, setDomain] = useState<MasterDomain>("RTI_ACCESS");

  // Domain clarifications
  const [rtiSphere, setRtiSphere] = useState<
    "CENTRAL_PUBLIC_AUTHORITY" | "STATE_PUBLIC_AUTHORITY" | "LOCAL_CIVIC_BODY"
  >("LOCAL_CIVIC_BODY");

  const [workplaceSphere, setWorkplaceSphere] = useState<
    "CENTRAL_SPHERE_ESTABLISHMENT" | "STATE_PRIVATE_ESTABLISHMENT"
  >("STATE_PRIVATE_ESTABLISHMENT");

  const [workplaceIssueType, setWorkplaceIssueType] = useState<
    "WAGES" | "TERMINATION_DISPUTE" | "GRATUITY" | "GENERAL"
  >("GENERAL");

  // Resolve PIN Location
  const pinResolution = useMemo(() => {
    return defaultPincodeProvider.resolvePincode(pincodeInput);
  }, [pincodeInput]);

  // Handle locality default when PIN changes
  React.useEffect(() => {
    if (pinResolution.candidateLocalities.length > 0) {
      setSelectedLocality(pinResolution.candidateLocalities[0].locality);
    } else {
      setSelectedLocality("");
    }
  }, [pinResolution]);

  // Resolve Competent Authority
  const resolutionResult: AuthorityResolutionResult | null = useMemo(() => {
    if (!pinResolution.isValid) return null;

    const query: AuthorityResolutionQuery = {
      pincode: pinResolution.pincode,
      domain,
      selectedLocality,
      rti_sphere: rtiSphere,
      workplace_sphere: workplaceSphere,
      workplace_issue_type: workplaceIssueType
    };

    return resolveCompetentAuthority(query);
  }, [pinResolution, domain, selectedLocality, rtiSphere, workplaceSphere, workplaceIssueType]);

  const quickPins = [
    { pin: "600042", label: "Chennai South (Velachery / Guindy)" },
    { pin: "600001", label: "Chennai North (George Town)" },
    { pin: "110001", label: "New Delhi (Connaught Place)" },
    { pin: "160017", label: "Chandigarh (Sector 17)" },
    { pin: "400001", label: "Mumbai (Fort / Colaba)" },
    { pin: "560001", label: "Bengaluru (MG Road)" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Jurisdiction-First Authority Locator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            PIN-Code Authority, Court &amp; Legal Office Locator
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-3xl">
            Locate your competent District Consumer Commission, Rent Authority, PIO, or Labour Conciliation Officer based on verified statutory jurisdiction—not merely physical distance.
          </p>
        </div>

        {/* Interactive Query Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 space-y-6">
          {/* Step 1: PIN Code Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                1. Enter Your 6-Digit Indian Postal PIN Code
              </label>
              <VoiceInputButton
                onTranscriptConfirmed={(transcript) => {
                  const norm = normalizeSpokenPincode(transcript);
                  if (norm.confidence !== "UNABLE_TO_PARSE" && typeof norm.normalizedValue === "string") {
                    setPincodeInput(norm.normalizedValue);
                  } else {
                    setPincodeInput(transcript.replace(/\D/g, ""));
                  }
                }}
                fieldLabel="Spoken PIN Code"
                defaultLanguageCode={selectedLanguage}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 600042"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-slate-900"
                />
              </div>

              {/* Resolved Location Badge */}
              {pinResolution.isValid && pinResolution.primaryLocation && (
                <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center gap-2 text-xs text-indigo-950">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong>{pinResolution.primaryLocation.district}</strong>, {pinResolution.primaryLocation.state_ut}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Demo PIN Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Quick Select:</span>
              {quickPins.map((qp) => (
                <button
                  key={qp.pin}
                  type="button"
                  onClick={() => setPincodeInput(qp.pin)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors ${
                    pincodeInput === qp.pin
                      ? "bg-indigo-600 text-white border-indigo-600 font-bold"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {qp.pin} ({qp.label.split(" ")[0]})
                </button>
              ))}
            </div>

            {/* Error state */}
            {!pinResolution.isValid && pinResolution.errorMessage && (
              <div className="mt-2 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{pinResolution.errorMessage}</span>
              </div>
            )}
          </div>

          {/* Step 2: Locality / Local Body Disambiguation (if multiple exist for PIN) */}
          {pinResolution.requiresDisambiguation && pinResolution.candidateLocalities.length > 1 && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 animate-in fade-in">
              <label className="block text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>2. Select Your Specific Locality / Municipal Zone (PIN covers multiple areas)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pinResolution.candidateLocalities.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedLocality(loc.locality)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      selectedLocality === loc.locality
                        ? "bg-amber-100/80 border-amber-400 text-amber-950 font-bold shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-semibold">{loc.locality}</div>
                    <div className="text-[11px] text-slate-500">{loc.local_body_name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Domain Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              {pinResolution.requiresDisambiguation ? "3." : "2."} What Legal or Civic Domain Do You Need Help With?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {[
                { id: "RTI_ACCESS", label: "RTI Access", desc: "PIO / SPIO / Civic Body" },
                { id: "CONSUMER_PROTECTION", label: "Consumer", desc: "District Commission (DCDRC)" },
                { id: "TENANT_RIGHTS", label: "Tenant Rights", desc: "Rent Authority / Controller" },
                { id: "WORKPLACE_RIGHTS", label: "Workplace", desc: "Labour Office / Gratuity" },
                { id: "WELFARE_SCHEMES", label: "Welfare Schemes", desc: "Social Welfare Office" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDomain(tab.id as MasterDomain)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                    domain === tab.id
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="font-bold text-xs block mb-0.5">{tab.label}</span>
                  <span
                    className={`text-[10px] ${
                      domain === tab.id ? "text-indigo-100" : "text-slate-400"
                    }`}
                  >
                    {tab.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Domain-Specific Clarification */}
          {domain === "RTI_ACCESS" && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs animate-in fade-in">
              <label className="block font-bold text-slate-800">
                Which Public Authority holds the information you seek?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: "LOCAL_CIVIC_BODY",
                    title: "Local Municipal Body / Panchayat",
                    desc: "Road repairs, sanitation, building plan sanction, municipal taxes"
                  },
                  {
                    id: "CENTRAL_PUBLIC_AUTHORITY",
                    title: "Central Public Authority / PSU",
                    desc: "EPFO, Railways, Income Tax, Defense, Central Banks, Telecommunications"
                  },
                  {
                    id: "STATE_PUBLIC_AUTHORITY",
                    title: "State Government Department",
                    desc: "State Police, Revenue, State Education, Transport, Registration"
                  }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setRtiSphere(s.id as any)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      rtiSphere === s.id
                        ? "bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-xs"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-bold text-xs">{s.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {domain === "WORKPLACE_RIGHTS" && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs animate-in fade-in">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Specific Workplace Issue Type:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "GENERAL", label: "General Labour Dispute" },
                    { id: "GRATUITY", label: "Unpaid Statutory Gratuity (Form N)" },
                    { id: "TERMINATION_DISPUTE", label: "Wrongful Termination / Conciliation" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setWorkplaceIssueType(t.id as any)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold text-xs ${
                        workplaceIssueType === t.id
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {workplaceIssueType !== "GRATUITY" && (
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Employer Jurisdiction Sphere:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWorkplaceSphere("STATE_PRIVATE_ESTABLISHMENT")}
                      className={`p-2.5 rounded-lg border text-left ${
                        workplaceSphere === "STATE_PRIVATE_ESTABLISHMENT"
                          ? "bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold">State / Private Establishment</div>
                      <div className="text-[10px] text-slate-500">Private shops, IT companies, factories, commercial firms</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWorkplaceSphere("CENTRAL_SPHERE_ESTABLISHMENT")}
                      className={`p-2.5 rounded-lg border text-left ${
                        workplaceSphere === "CENTRAL_SPHERE_ESTABLISHMENT"
                          ? "bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold">Central Sphere / PSU</div>
                      <div className="text-[10px] text-slate-500">Banks, Railways, Ports, Mines, Defense PSUs, Central Gov</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Resolved Competent Authority Card */}
        {resolutionResult && <AuthorityCard result={resolutionResult} />}

        {/* Jurisdictional Competence Guardrail Banner */}
        <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 block mb-0.5">
              Jurisdictional Competence vs. Physical Proximity
            </span>
            <p className="leading-relaxed">
              InfoRight AI routes disputes strictly according to statutory territorial and subject jurisdiction under official Acts. A physically closer government office that lacks legal jurisdiction is never recommended.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
