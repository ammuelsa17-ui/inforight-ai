"use client";

import React from "react";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface FallbackBannerProps {
  mode: "ai" | "fallback";
  warning?: string;
  verifiedAuthority?: boolean;
}

export default function FallbackBanner({
  mode,
  warning,
  verifiedAuthority = true,
}: FallbackBannerProps) {
  if (mode === "ai" && verifiedAuthority) {
    return null;
  }

  return (
    <div className="w-full space-y-3 mb-6">
      {mode === "fallback" && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <h4 className="font-semibold text-amber-300">
              Fallback Template Activated
            </h4>
            <p className="text-amber-200/90 leading-relaxed">
              {warning ||
                "AI generation was unavailable. Standard, pre-approved record-based RTI requests have been loaded safely."}
            </p>
          </div>
        </div>
      )}

      {!verifiedAuthority && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-200">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <h4 className="font-semibold text-blue-300">
              Authority Verification Notice
            </h4>
            <p className="text-blue-200/90 leading-relaxed">
              The entered public authority has not been independently verified in our Coimbatore registry. Please confirm authority details before submitting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
