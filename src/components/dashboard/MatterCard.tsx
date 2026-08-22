"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CitizenMatter } from "@/types/deadlines";
import { calculateMatterDeadline, formatFriendlyDate } from "@/lib/deadlines/deadline-engine";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Trash2,
  Check,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Info
} from "lucide-react";

interface MatterCardProps {
  matter: CitizenMatter;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MatterCard({
  matter,
  onToggleComplete,
  onDelete
}: MatterCardProps) {
  const [showTimeline, setShowTimeline] = useState(false);
  const result = calculateMatterDeadline(matter);

  const getStatusBadge = () => {
    switch (result.status) {
      case "COMPLETED":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "COMPLETED"
        };
      case "DUE_TODAY":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-300 font-bold",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
          label: "DUE TODAY"
        };
      case "APPEAL_AVAILABLE":
        return {
          bg: "bg-purple-50 text-purple-800 border-purple-300 font-bold",
          icon: <FileText className="w-3.5 h-3.5 text-purple-600" />,
          label: "FIRST APPEAL AVAILABLE"
        };
      case "OVERDUE":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-300",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "PERIOD EXPIRED"
        };
      case "AWAITING_RESPONSE":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
          label: "AWAITING RESPONSE"
        };
      case "DEADLINE_UNKNOWN":
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-300",
          icon: <Info className="w-3.5 h-3.5 text-slate-500" />,
          label: "VERIFY DEADLINE"
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div
      className={`bg-white rounded-2xl border transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
        result.status === "APPEAL_AVAILABLE"
          ? "border-purple-300 ring-2 ring-purple-100"
          : result.status === "DUE_TODAY"
          ? "border-amber-300 ring-2 ring-amber-100"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="p-6">
        {/* Top Header: Domain, State, Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${statusBadge.bg}`}
            >
              {statusBadge.icon}
              <span>{statusBadge.label}</span>
            </span>

            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {matter.domain.replace("_", " ")} • {matter.state_ut}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleComplete(matter.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                matter.status === "COMPLETED"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  : "bg-white text-slate-400 border-slate-200 hover:text-emerald-600 hover:border-emerald-200"
              }`}
              title={matter.status === "COMPLETED" ? "Reopen Matter" : "Mark as Completed"}
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(matter.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
              title="Delete Matter"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
          {matter.title}
        </h3>

        <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
          <span>Authority: <strong className="text-slate-700">{matter.authority}</strong></span>
          {matter.reference_number && (
            <span>• Ref: <strong className="font-mono text-slate-700">{matter.reference_number}</strong></span>
          )}
        </div>

        {/* Countdown / Statutory Deadline Banner */}
        <div
          className={`p-3.5 rounded-xl border text-xs mb-4 flex items-start gap-3 ${
            result.status === "APPEAL_AVAILABLE"
              ? "bg-purple-50/70 border-purple-200 text-purple-950"
              : result.status === "DUE_TODAY"
              ? "bg-amber-50/70 border-amber-200 text-amber-950"
              : result.status === "OVERDUE"
              ? "bg-rose-50/70 border-rose-200 text-rose-950"
              : "bg-slate-50 border-slate-200 text-slate-800"
          }`}
        >
          <Clock
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              result.status === "APPEAL_AVAILABLE"
                ? "text-purple-600"
                : result.status === "DUE_TODAY"
                ? "text-amber-600"
                : result.status === "OVERDUE"
                ? "text-rose-600"
                : "text-blue-600"
            }`}
          />
          <div className="space-y-1 flex-1">
            <div className="font-bold text-sm leading-tight">
              {result.countdownText}
            </div>
            <div className="text-[11px] opacity-90">
              Statutory Deadline: <strong>{result.formattedDeadlineDate}</strong> (Filed: {formatFriendlyDate(matter.filing_date)})
            </div>
          </div>
        </div>

        {/* Legal Basis Citation */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1 mb-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-500">Legal Basis:</span>
            <span className="text-[10px] text-slate-400 font-mono">
              Citation: {result.sourceRecordId}
            </span>
          </div>
          <p className="font-medium text-slate-800">{result.legalBasis}</p>
        </div>

        {/* Condonation of Delay Note (if available) */}
        {result.condonationAvailable && (
          <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed mb-3">
            <span className="font-bold block mb-0.5">ℹ️ Statutory Delay Condonation Available:</span>
            {result.condonationMessage || "Statutory authority is empowered to admit belated filings upon showing sufficient cause."}
          </div>
        )}

        {/* Interactive Timeline Dropdown */}
        {showTimeline && (
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-3 animate-in fade-in">
            <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
              Statutory Lifecycle Timeline
            </span>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {result.timeline.map((m, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-6 top-0.5 w-3 h-3 rounded-full border-2 bg-white ${
                      m.status === "COMPLETED"
                        ? "border-emerald-500 bg-emerald-500"
                        : m.status === "ACTIVE"
                        ? "border-amber-500 bg-amber-500 animate-pulse"
                        : m.status === "OVERDUE"
                        ? "border-rose-500 bg-rose-500"
                        : "border-slate-300"
                    }`}
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{m.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {formatFriendlyDate(m.targetDate)}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 block mb-0.5">
                      {m.legalBasis} — {m.sectionOrRule}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 transition-colors"
        >
          <span>{showTimeline ? "Hide Timeline" : "View Statutory Timeline"}</span>
          {showTimeline ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {result.nextAction.relatedFormId ? (
          <Link
            href={`/forms/${result.nextAction.relatedFormId}`}
            className="inline-flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-colors"
          >
            <span>{result.nextAction.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : result.nextAction.portalUrl ? (
          <a
            href={result.nextAction.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>{result.nextAction.title}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
