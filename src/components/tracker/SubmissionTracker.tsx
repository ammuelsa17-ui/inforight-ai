"use client";

import React, { useState, useMemo } from "react";
import { Clock, Send, ArrowRight, FileCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type CaseLifecycleStatus =
  | "GENERATED"
  | "READY_TO_SUBMIT"
  | "SUBMITTED"
  | "AWAITING_RESPONSE"
  | "ACTION_REQUIRED"
  | "ESCALATION_AVAILABLE"
  | "CLOSED";

export interface SubmissionRecord {
  caseId: string;
  status: CaseLifecycleStatus;
  generatedDate: string;
  submittedDate?: string;
  acknowledgementNumber?: string;
  submissionMethod?: "SPEED_POST" | "ONLINE_PORTAL" | "PHYSICAL_COUNTER";
  statutoryDaysLimit: number;
  statutoryBasis: string;
}

export interface SubmissionTrackerProps {
  initialData: SubmissionRecord;
  onUpdateSubmission?: (record: SubmissionRecord) => void;
  onTriggerEscalation?: () => void;
}

export const SubmissionTracker: React.FC<SubmissionTrackerProps> = ({
  initialData,
  onUpdateSubmission,
  onTriggerEscalation,
}) => {
  const { t } = useLanguage();
  const [data, setData] = useState<SubmissionRecord>(initialData);
  const [isRecording, setIsRecording] = useState<boolean>(!initialData.submittedDate);
  const [submitDate, setSubmitDate] = useState<string>(
    initialData.submittedDate || "2026-08-22"
  );
  const [ackNumber, setAckNumber] = useState<string>(initialData.acknowledgementNumber || "");
  const [method, setMethod] = useState<SubmissionRecord["submissionMethod"]>(
    initialData.submissionMethod || "SPEED_POST"
  );

  // Compute Days Elapsed and Deadline deterministically
  const { daysElapsed, deadlineDate, daysRemaining, isExpired } = useMemo(() => {
    if (!data.submittedDate) {
      return { daysElapsed: 0, deadlineDate: undefined, daysRemaining: data.statutoryDaysLimit, isExpired: false };
    }
    const subTime = new Date(data.submittedDate).getTime();
    if (isNaN(subTime)) {
      return { daysElapsed: 0, deadlineDate: undefined, daysRemaining: data.statutoryDaysLimit, isExpired: false };
    }
    const diff = Math.max(0, Math.floor((new Date("2026-08-22").getTime() - subTime) / (1000 * 60 * 60 * 24)));
    const deadline = new Date(subTime + data.statutoryDaysLimit * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const remaining = Math.max(0, data.statutoryDaysLimit - diff);
    return {
      daysElapsed: diff,
      deadlineDate: deadline,
      daysRemaining: remaining,
      isExpired: diff >= data.statutoryDaysLimit,
    };
  }, [data.submittedDate, data.statutoryDaysLimit]);

  const handleSaveSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SubmissionRecord = {
      ...data,
      submittedDate: submitDate,
      acknowledgementNumber: ackNumber.trim() || undefined,
      submissionMethod: method,
      status: isExpired ? "ESCALATION_AVAILABLE" : "AWAITING_RESPONSE",
    };
    setData(updated);
    setIsRecording(false);
    if (onUpdateSubmission) {
      onUpdateSubmission(updated);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-[#102A56]">{t("tracker.title")}</h4>
            <span className="text-[11px] text-slate-500 font-medium">{data.statutoryBasis}</span>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            data.status === "ESCALATION_AVAILABLE"
              ? "bg-purple-100 text-purple-900 border-purple-300 animate-pulse"
              : data.status === "AWAITING_RESPONSE"
              ? "bg-amber-100 text-amber-900 border-amber-300"
              : data.status === "SUBMITTED"
              ? "bg-blue-100 text-blue-900 border-blue-300"
              : "bg-slate-100 text-slate-700 border-slate-300"
          }`}
        >
          {data.status.replace(/_/g, " ")}
        </span>
      </div>

      {/* Lifecycle Progress Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-center">
        <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950">
          <span className="block text-[10px] text-indigo-600 font-bold uppercase">{t("tracker.stepDraft")}</span>
          <span>{data.generatedDate}</span>
        </div>

        <div className={`p-2.5 rounded-xl border ${data.submittedDate ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
          <span className="block text-[10px] uppercase font-bold text-slate-500">{t("tracker.stepSubmit")}</span>
          <span>{data.submittedDate || "—"}</span>
        </div>

        <div className={`p-2.5 rounded-xl border ${data.submittedDate && !isExpired ? "bg-amber-50 border-amber-300 text-amber-950" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
          <span className="block text-[10px] uppercase font-bold text-slate-500">{t("tracker.stepDeadline")}</span>
          <span>{deadlineDate || `${data.statutoryDaysLimit} Days`}</span>
        </div>

        <div className={`p-2.5 rounded-xl border ${isExpired ? "bg-purple-100 border-purple-300 text-purple-950" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
          <span className="block text-[10px] uppercase font-bold text-slate-500">{t("tracker.stepEscalation")}</span>
          <span>{isExpired ? "Unlocked" : "Locked (<30 Days)"}</span>
        </div>
      </div>

      {/* Record Submission Action Form */}
      {isRecording ? (
        <form onSubmit={handleSaveSubmission} className="p-4 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] space-y-3 text-xs">
          <span className="font-bold text-[#102A56] block flex items-center gap-1.5">
            <Send className="w-4 h-4 text-indigo-600" />
            {t("tracker.recordDispatch")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t("tracker.dispatchDateLabel")}</label>
              <input
                type="date"
                value={submitDate}
                onChange={(e) => setSubmitDate(e.target.value)}
                className="w-full p-2 bg-white border border-[#BCD7EE] rounded-lg text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t("tracker.methodLabel")}</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as SubmissionRecord["submissionMethod"])}
                className="w-full p-2 bg-white border border-[#BCD7EE] rounded-lg text-xs"
              >
                <option value="SPEED_POST">{t("tracker.speedPost")}</option>
                <option value="ONLINE_PORTAL">{t("tracker.onlinePortal")}</option>
                <option value="PHYSICAL_COUNTER">{t("tracker.physicalCounter")}</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">{t("tracker.ackNoLabel")}</label>
              <input
                type="text"
                value={ackNumber}
                onChange={(e) => setAckNumber(e.target.value)}
                placeholder={t("tracker.ackPlaceholder")}
                className="w-full p-2 bg-white border border-[#BCD7EE] rounded-lg text-xs"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{t("tracker.btnSaveCountdown")}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-slate-500 block">{t("tracker.submittedOn")} <strong>{data.submittedDate}</strong> {t("tracker.viaLabel")} <strong>{data.submissionMethod?.replace(/_/g, " ")}</strong></span>
              {data.acknowledgementNumber && (
                <span className="text-slate-500 block">{t("tracker.refNoLabel")} <strong className="font-mono text-indigo-900">{data.acknowledgementNumber}</strong></span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsRecording(true)}
              className="text-indigo-600 hover:text-indigo-800 underline font-bold"
            >
              {t("tracker.btnEditRecord")}
            </button>
          </div>

          {/* Statutory Days Countdown Card */}
          {data.submittedDate && (
            <div className={`p-3 rounded-xl border mt-2 flex items-center justify-between ${isExpired ? "bg-purple-50 border-purple-300 text-purple-900" : "bg-emerald-50 border-emerald-300 text-emerald-900"}`}>
              <div>
                <strong className="block text-sm">
                  {isExpired
                    ? "Statutory 30-Day Window Exceeded (Deemed Refusal)"
                    : `${daysRemaining} Days Remaining for PIO Response`}
                </strong>
                <span className="text-[11px] opacity-90">
                  {isExpired
                    ? "Section 7(2) deems the request refused. You are now entitled to file a First Appeal under Section 19(1) free of cost."
                    : `Statutory deadline date: ${deadlineDate} (${daysElapsed} days elapsed since filing).`}
                </span>
              </div>

              {isExpired && onTriggerEscalation && (
                <button
                  type="button"
                  onClick={onTriggerEscalation}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm shrink-0"
                >
                  <span>{t("tracker.btnFirstAppeal")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
