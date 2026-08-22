import React from "react";
import { CheckCircle2, Clock, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CanonicalCaseStatus } from "@/types/rectification";

interface JourneyProgressProps {
  stage: CanonicalCaseStatus;
  className?: string;
  reopenCount?: number;
}

export function JourneyProgress({ stage, className = "", reopenCount = 0 }: JourneyProgressProps) {
  const { t } = useLanguage();

  const steps = [
    {
      id: "report",
      label: "1. Issue Reported",
      sub: "Before Photo & Facts",
      done: true,
      current: stage === "SUBMITTED",
    },
    {
      id: "action",
      label: "2. Officer Action",
      sub: "Work In Progress",
      done: stage === "ASSIGNED" || stage === "IN_PROGRESS" || stage === "RECTIFIED_PENDING_CITIZEN_CONFIRMATION" || stage === "CLOSED",
      current: stage === "ASSIGNED" || stage === "IN_PROGRESS",
    },
    {
      id: "evidence",
      label: "3. After Rectification",
      sub: "Repair Proof & GPS",
      done: stage === "RECTIFIED_PENDING_CITIZEN_CONFIRMATION" || stage === "CLOSED",
      current: stage === "RECTIFIED_PENDING_CITIZEN_CONFIRMATION",
    },
    {
      id: "confirm",
      label: "4. Citizen Confirmation",
      sub: stage === "CLOSED" ? "Resolved & Closed" : stage === "REOPENED" ? `Reopened (Cycle #${reopenCount})` : "Awaiting Your Review",
      done: stage === "CLOSED",
      current: stage === "CLOSED" || stage === "REOPENED",
      alert: stage === "REOPENED",
    },
  ];

  return (
    <div className={`p-4 bg-slate-50 border border-slate-200 rounded-2xl ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3 text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>{t("home.badge")}</span>
        </span>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
          {stage}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all ${
              s.current
                ? s.alert
                  ? "bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-400"
                  : "bg-indigo-50 border-indigo-300 text-indigo-950 ring-1 ring-indigo-400"
                : s.done
                ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                : "bg-white border-slate-200 text-slate-400 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold">{s.label}</span>
              {s.done && !s.alert && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              {s.current && !s.done && !s.alert && <Clock className="w-3.5 h-3.5 text-indigo-600 animate-pulse shrink-0" />}
              {s.alert && <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
            </div>
            <span className="text-[11px] text-slate-600 block leading-tight">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
