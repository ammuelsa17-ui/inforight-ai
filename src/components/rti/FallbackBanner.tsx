"use client";

import React from "react";
import { AlertTriangle, Info } from "lucide-react";

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
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-amber-950">
              Fallback Template Activated
            </h4>
            <p className="text-amber-900/90 leading-relaxed">
              {warning ||
                "AI generation was unavailable. Standard, pre-approved record-based RTI requests have been loaded safely."}
            </p>
          </div>
        </div>
      )}

      {!verifiedAuthority && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 shadow-xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-blue-950">
              Authority Verification Notice
            </h4>
            <p className="text-blue-900/90 leading-relaxed">
              The entered public authority has not been independently verified in our Coimbatore registry. Please confirm authority details before submitting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
