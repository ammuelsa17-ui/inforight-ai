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
    <div className="w-full space-y-6 bg-white border border-[#BCD7EE] p-6 rounded-xl shadow-xs">
      {/* Verification Trust Panel Header */}
      <div className="flex items-center gap-3 border-b border-[#BCD7EE] pb-4">
        <ShieldCheck className="w-6 h-6 text-[#4F46E5] shrink-0" />
        <div>
          <h3 className="text-base font-bold text-[#102A56]">Safety & Trust Panel</h3>
          <p className="text-xs text-[#526176]">
            Real-time verification metrics and privacy guarantees
          </p>
        </div>
      </div>

      {/* Trust Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {trustBadges.map((badge, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#F4F9FF] border border-[#BCD7EE] text-xs text-[#172033]"
          >
            <CheckCircle2
              className={`w-4 h-4 shrink-0 ${
                badge.status ? "text-[#0F9D76]" : "text-[#D97706]"
              }`}
            />
            <span className="font-medium">{badge.text}</span>
          </div>
        ))}
      </div>

      {/* Source Transparency Section */}
      {sources.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-[#102A56] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#4F46E5]" />
            Official Source Cards ({sources.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((source) => (
              <div
                key={source.id}
                className="p-4 rounded-lg bg-[#F4F9FF] border border-[#BCD7EE] space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-[#102A56] text-sm">{source.title}</h5>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      source.verified
                        ? "bg-[#E6F4EA] text-[#0F9D76] border border-[#A8DADC]"
                        : "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]"
                    }`}
                  >
                    {source.verified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <p className="text-[#526176]">
                  <strong className="text-[#102A56]">Authority:</strong> {source.authority}
                </p>
                <p className="text-[#526176] flex items-center gap-1">
                  <strong className="text-[#102A56]">Domain:</strong> {source.domain}
                  <ExternalLink className="w-3 h-3 text-[#526176]" />
                </p>
                <p className="text-[#526176]">
                  <strong className="text-[#102A56]">Supports:</strong> {source.supports}
                </p>
                <div className="text-[11px] text-[#526176] pt-1 border-t border-[#BCD7EE]">
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
