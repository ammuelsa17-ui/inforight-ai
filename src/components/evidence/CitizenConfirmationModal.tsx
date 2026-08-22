"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, AlertTriangle, X, MessageSquare, ArrowRight } from "lucide-react";
import { CivicEvidenceItem } from "@/types/rectification";
import { CitizenEvidenceCapture } from "./CitizenEvidenceCapture";

interface CitizenConfirmationModalProps {
  caseId: string;
  onClose: () => void;
  onConfirmResolution: (closingComment?: string) => void;
  onReopenCase: (
    reason: string,
    followUpEvidence?: Omit<CivicEvidenceItem, "id" | "cycleNumber">,
    followUpBlob?: Blob
  ) => Promise<void>;
}

export function CitizenConfirmationModal({
  caseId,
  onClose,
  onConfirmResolution,
  onReopenCase,
}: CitizenConfirmationModalProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"SELECT" | "CONFIRM" | "REOPEN">("SELECT");
  const [closingComment, setClosingComment] = useState<string>("");
  const [reopenReason, setReopenReason] = useState<string>("");
  const [followUpEvidence, setFollowUpEvidence] = useState<{
    evidence: Omit<CivicEvidenceItem, "id" | "cycleNumber">;
    blob?: Blob;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState<boolean>(false);

  const handleFinalConfirm = () => {
    onConfirmResolution(closingComment.trim() || undefined);
    onClose();
  };

  const handleFinalReopen = async () => {
    if (!reopenReason.trim()) return;
    setIsSubmitting(true);
    try {
      await onReopenCase(
        reopenReason,
        followUpEvidence?.evidence,
        followUpEvidence?.blob
      );
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#BCD7EE] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide block">
              Citizen Rectification Verification
            </span>
            <h2 className="text-base font-extrabold text-[#102A56]">
              Verify Case Resolution ({caseId})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {mode === "SELECT" && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              The municipal authority has uploaded proof of work and marked this grievance as rectified. Please inspect the location or proof and confirm if the issue is resolved to your satisfaction.
            </p>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setMode("CONFIRM")}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/50 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200 transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-emerald-950 block">
                      YES, ISSUE IS RESOLVED
                    </span>
                    <span className="text-[11px] text-emerald-700">
                      Work is verified on site. Mark grievance as permanently CLOSED.
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => setMode("REOPEN")}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-amber-300 bg-amber-50/50 hover:bg-amber-100/50 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700 group-hover:bg-amber-200 transition-colors">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-amber-950 block">
                      NO, ISSUE IS STILL PRESENT
                    </span>
                    <span className="text-[11px] text-amber-700">
                      Work is incomplete or defective. REOPEN case for follow-up cycle.
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>
        )}

        {mode === "CONFIRM" && (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You are confirming resolution of this grievance. Status will move to <strong>CLOSED</strong>.</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Optional Closing Remarks / Citizen Feedback
              </label>
              <textarea
                rows={3}
                value={closingComment}
                onChange={(e) => setClosingComment(e.target.value)}
                placeholder="e.g. Verified road patch on site today morning. Work done properly."
                className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-xl text-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMode("SELECT")}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalConfirm}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 transition-colors"
              >
                Confirm &amp; Close Case
              </button>
            </div>
          </div>
        )}

        {mode === "REOPEN" && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Contesting rectification will start <strong>Cycle 2</strong> while preserving all prior history.</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                What is still unresolved? *
              </label>
              <textarea
                required
                rows={3}
                value={reopenReason}
                onChange={(e) => setReopenReason(e.target.value)}
                placeholder="Describe why the repair is incomplete (e.g. only half the pothole filled, debris left uncollected)..."
                className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-xl text-slate-900 focus:outline-none"
              />
            </div>

            {/* Optional Follow-up photo */}
            {!showPhotoCapture && !followUpEvidence && (
              <button
                type="button"
                onClick={() => setShowPhotoCapture(true)}
                className="w-full py-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-dashed border-indigo-200 rounded-xl bg-indigo-50/50"
              >
                + Add Photo of Incomplete Work (Optional)
              </button>
            )}

            {showPhotoCapture && (
              <CitizenEvidenceCapture
                onEvidenceCaptured={(evidence, blob) => {
                  setFollowUpEvidence({ evidence, blob });
                  setShowPhotoCapture(false);
                }}
                onCancel={() => setShowPhotoCapture(false)}
              />
            )}

            {followUpEvidence && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Follow-up photo attached: {followUpEvidence.evidence.fileName}</span>
                <button
                  type="button"
                  onClick={() => setFollowUpEvidence(null)}
                  className="text-red-600 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMode("SELECT")}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!reopenReason.trim() || isSubmitting}
                onClick={handleFinalReopen}
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Reopening..." : "Reopen Grievance"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
