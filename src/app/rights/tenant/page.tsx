"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navigateRightsDispute } from "@/services/api";
import { RightsNavigateResponse } from "@/types/api";
import { ArrowLeft, Sparkles, AlertCircle, ExternalLink, Copy, Printer, Check, AlertTriangle } from "lucide-react";

export default function TenantRightsPage() {
  const [description, setDescription] = useState(
    "Vacated rental apartment in Chennai 3 weeks ago after full key handover and utility bill settlement. Landlord refuses to return ₹50,000 security deposit without repair bills."
  );
  const [state, setState] = useState("Tamil Nadu");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RightsNavigateResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleNavigate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await navigateRightsDispute({
        category: "tenant",
        issueType: "Security Deposit Withholding",
        description,
        state,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to process tenant rights dispute.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.representationLetter) {
      const text = `To,\n${result.representationLetter.recipientTitle}\n\nSubject: ${result.representationLetter.subject}\n\n${result.representationLetter.body}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-4">
        <Link href="/rights" className="inline-flex items-center gap-2 text-sm text-[#526176] hover:text-[#102A56] font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Rights Overview</span>
        </Link>
        <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider px-3 py-1 bg-[#FEF3C7] rounded-full border border-[#FDE68A]">
          State Tenancy Jurisdiction
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">Tenant Rights Navigator</h1>
        <p className="text-sm text-[#526176]">
          Recover security deposits, address repair disputes, and prevent illegal evictions with state rent authority legal pathways.
        </p>
      </div>

      {/* Form Input */}
      <form onSubmit={handleNavigate} className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#102A56]">
            Describe Tenancy Dispute <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-white border border-[#BCD7EE] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#102A56]">State Jurisdiction</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
            required
          />
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
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span>{loading ? "Navigating Tenant Rights..." : "Navigate Tenant Rights"}</span>
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="space-y-6">
          {/* State Jurisdiction Warning */}
          {result.jurisdictionWarning && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-sm">
              <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">State Jurisdiction Warning</h4>
                <p className="text-xs leading-relaxed">{result.jurisdictionWarning}</p>
              </div>
            </div>
          )}

          {/* Guidance Card */}
          <div className="p-6 rounded-2xl bg-[#F4F9FF] border border-[#BCD7EE] space-y-4">
            <h3 className="text-lg font-bold text-[#102A56]">{result.issueTitle}</h3>
            <p className="text-sm text-[#172033] leading-relaxed">{result.summary}</p>
            {result.escalationPathway && (
              <div className="pt-2 border-t border-[#BCD7EE] flex flex-wrap gap-4 text-xs font-bold text-[#0369A1]">
                <a href={result.escalationPathway.portalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                  <span>Escalation Authority: {result.escalationPathway.portalName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Bureaucracy Translation Block */}
          {result.bureaucracyTranslation && (
            <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] space-y-4">
              <h4 className="text-base font-bold text-[#102A56]">Bureaucracy Translation — What This Means</h4>
              <p className="text-sm text-[#526176]">{result.bureaucracyTranslation.whatThisMeans}</p>
              <div className="space-y-2 text-xs">
                <strong className="text-[#102A56] block">Next Action:</strong>
                <p className="text-[#526176]">{result.bureaucracyTranslation.whatYouShouldDoNow}</p>
              </div>
            </div>
          )}

          {/* Generated Representation Letter */}
          {result.representationLetter && (
            <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] space-y-4 no-print">
              <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-3">
                <h4 className="text-base font-bold text-[#102A56]">Generated Draft Tenant Notice Letter</h4>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg bg-white border border-[#BCD7EE] text-xs font-semibold text-[#102A56] inline-flex items-center gap-1">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                  <button onClick={() => window.print()} className="px-3 py-1.5 rounded-lg bg-[#4F46E5] text-xs font-semibold text-white inline-flex items-center gap-1">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] text-xs space-y-2 font-mono text-[#172033]">
                <p>To,</p>
                <p className="font-bold">{result.representationLetter.recipientTitle}</p>
                <p className="font-bold text-[#4F46E5]">Subject: {result.representationLetter.subject}</p>
                <p className="whitespace-pre-line leading-relaxed pt-2">{result.representationLetter.body}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
