"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthorityResolutionResult } from "@/types/authority-locator";
import {
  Building2,
  MapPin,
  ExternalLink,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  Clock,
  Copy,
  Check,
  AlertTriangle,
  Info,
  ArrowRight,
  HelpCircle
} from "lucide-react";

interface AuthorityCardProps {
  result: AuthorityResolutionResult;
}

export default function AuthorityCard({ result }: AuthorityCardProps) {
  const [copied, setCopied] = useState(false);
  const auth = result.competentAuthority;

  const handleCopyAddress = () => {
    if (auth.office_address) {
      navigator.clipboard.writeText(auth.office_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getConfidenceBadge = () => {
    switch (result.confidence) {
      case "EXACT_VERIFIED":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
          label: "EXACT JURISDICTION VERIFIED"
        };
      case "DISTRICT_VERIFIED":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Check className="w-3.5 h-3.5 text-blue-600" />,
          label: "DISTRICT JURISDICTION VERIFIED"
        };
      case "STATE_LEVEL_VERIFIED":
        return {
          bg: "bg-indigo-50 text-indigo-800 border-indigo-200",
          icon: <Info className="w-3.5 h-3.5 text-indigo-600" />,
          label: "STATE FRAMEWORK VERIFIED"
        };
      case "OFFICE_LOCATION_REQUIRES_VERIFICATION":
      default:
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
          label: "OFFICE COUNTER REQUIRES VERIFICATION"
        };
    }
  };

  const confidenceBadge = getConfidenceBadge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden animate-in fade-in zoom-in-95">
      {/* Top Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${confidenceBadge.bg}`}
            >
              {confidenceBadge.icon}
              <span>{confidenceBadge.label}</span>
            </span>

            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {auth.domain.replace("_", " ")} • {auth.jurisdiction_scope} SCOPE
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{auth.district ? `${auth.district}, ` : ""}{auth.state_ut}</span>
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {auth.name}
        </h2>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">
          {auth.authority_type}
        </p>
      </div>

      {/* Main Content Body */}
      <div className="p-6 space-y-4 text-xs">
        {/* Pre-Litigation Helpline Banner (if applicable, e.g. Consumer NCH 1915) */}
        {auth.pre_litigation_help && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs">
                Pre-Litigation Resolution Helpline: {auth.pre_litigation_help.name} ({auth.pre_litigation_help.helpline})
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                {auth.pre_litigation_help.note}
              </p>
            </div>
          </div>
        )}

        {/* Office Address & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Competent Office Address</span>
              </span>
              {auth.office_address && (
                <button
                  onClick={handleCopyAddress}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              )}
            </div>
            <p className="text-slate-800 leading-relaxed font-medium">
              {auth.office_address || "Physical counter address requires district administrative confirmation."}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
            <span className="font-bold text-slate-700 block">Filing &amp; Procedural Modes</span>
            <div className="flex flex-wrap gap-1.5">
              {auth.filing_modes.map((mode, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold text-[11px]"
                >
                  {mode.replace("_", " ")}
                </span>
              ))}
            </div>

            {auth.official_website && (
              <div className="pt-1">
                <span className="text-slate-400 block text-[10px]">Official Website:</span>
                <a
                  href={auth.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold truncate block"
                >
                  {auth.official_website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Legal Basis & Statutory Disclaimer */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">Statutory Legal Basis:</span>
            <span className="text-[10px] text-slate-400 font-mono">
              Citation: {auth.source_record_ids.join(", ")}
            </span>
          </div>
          <p className="text-slate-800 font-medium">{auth.legal_basis}</p>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 leading-relaxed">
            {result.disclaimer}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {auth.filing_portal && (
            <a
              href={auth.filing_portal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold shadow-xs transition-colors"
            >
              <span>Open Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {result.suggestedActions.canAddToTracker && (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Deadlines</span>
            </Link>
          )}
        </div>

        {result.suggestedActions.canStartForm && result.suggestedActions.formId && (
          <Link
            href={`/forms/${result.suggestedActions.formId}`}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-colors"
          >
            <span>{result.suggestedActions.formTitle || "Start Relevant Form"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
