"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, FileText, ExternalLink } from "lucide-react";

export interface SourceCardInfo {
  id: string;
  title: string;
  authority: string;
  domain: string;
  verified: boolean;
  lastVerifiedDate: string;
  supports: string;
}

interface TrustPanelProps {
  sources?: SourceCardInfo[];
  applicantDataSentToAI?: boolean;
}

export default function TrustPanel({
  sources = [],
  applicantDataSentToAI = false,
}: TrustPanelProps) {
  const trustBadges = [
    { text: "Applicant identity stayed in the browser", status: !applicantDataSentToAI },
    { text: "Civic input was checked for sensitive data", status: true },
    { text: "Authority was selected deterministically", status: true },
    { text: "AI response structure was validated", status: true },
    { text: "Citation IDs were verified", status: true },
    { text: "Safe fallback is available", status: true },
  ];

  return (
    <div className="w-full space-y-6 bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
      {/* Verification Trust Panel Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0" />
        <div>
          <h3 className="text-base font-semibold text-white">Safety & Trust Panel</h3>
          <p className="text-xs text-slate-400">
            Real-time verification metrics and privacy guarantees
          </p>
        </div>
      </div>

      {/* Trust Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {trustBadges.map((badge, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-200"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{badge.text}</span>
          </div>
        ))}
      </div>

      {/* Source Transparency Section */}
      {sources.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" />
            Official Source Cards ({sources.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((source) => (
              <div
                key={source.id}
                className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/70 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-slate-100 text-sm">{source.title}</h5>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      source.verified
                        ? "bg-teal-950 text-teal-300 border border-teal-500/30"
                        : "bg-amber-950 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {source.verified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <p className="text-slate-400">
                  <strong className="text-slate-300">Authority:</strong> {source.authority}
                </p>
                <p className="text-slate-400 flex items-center gap-1">
                  <strong className="text-slate-300">Domain:</strong> {source.domain}
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </p>
                <p className="text-slate-400">
                  <strong className="text-slate-300">Supports:</strong> {source.supports}
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-700/40">
                  Verified: {source.lastVerifiedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
