"use client";

import React, { useState } from "react";
import { calculateStatutoryTimeline } from "@/lib/statutory/timeline-engine";
import { Calendar, AlertTriangle } from "lucide-react";

interface RtiStatutoryTimelineProps {
  initialFilingDate?: string;
}

export function RtiStatutoryTimeline({
  initialFilingDate = new Date().toISOString().split("T")[0],
}: RtiStatutoryTimelineProps) {
  const [filingDate, setFilingDate] = useState(initialFilingDate);
  const [isLifeAndLiberty, setIsLifeAndLiberty] = useState(false);
  const [scenario, setScenario] = useState<"no_response" | "decision_received">("no_response");
  const [decisionDate, setDecisionDate] = useState("");

  const timelineData = calculateStatutoryTimeline(filingDate, isLifeAndLiberty, scenario, decisionDate || undefined);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Statutory RTI Timeline & Legal Deadlines Engine
            </h4>
            <p className="text-xs text-slate-500">
              Calculates indicative calendar dates under Sections 6(3), 7(1), and 19(1) of RTI Act 2005
            </p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Application Filing Date
          </label>
          <input
            type="date"
            value={filingDate}
            onChange={(e) => setFilingDate(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Appeal Scenario
          </label>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value as "no_response" | "decision_received")}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="no_response">Scenario A: No Response Received</option>
            <option value="decision_received">Scenario B: Decision / Rejection Received</option>
          </select>
        </div>

        {scenario === "decision_received" && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Decision Receipt Date
            </label>
            <input
              type="date"
              value={decisionDate}
              onChange={(e) => setDecisionDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Emergency Toggle */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="life-liberty-check"
            checked={isLifeAndLiberty}
            onChange={(e) => setIsLifeAndLiberty(e.target.checked)}
            className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
          />
          <label htmlFor="life-liberty-check" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer flex items-center gap-1.5">
            Matter Concerning Life & Liberty (48-Hour Response)
          </label>
        </div>
        <span className="text-[10px] text-red-600 font-bold bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
          Section 7(1) Proviso
        </span>
      </div>

      {/* Timeline Event Cards */}
      <div className="space-y-2">
        {timelineData.events.map((evt) => (
          <div
            key={evt.id}
            className={`p-3 rounded-xl border flex items-start justify-between ${
              evt.isUrgent
                ? "bg-red-50/60 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200"
                : evt.isWarning
                ? "bg-amber-50/60 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200"
                : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">{evt.title}</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {evt.sectionReference}
                </span>
              </div>
              <p className="text-[11px] opacity-80">{evt.description}</p>
            </div>
            <span className="text-xs font-extrabold font-mono shrink-0 pl-3 pt-0.5">
              {evt.dateStr}
            </span>
          </div>
        ))}
      </div>

      {/* Statutory Warnings */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        {timelineData.nuanceFlags.map((flag, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>{flag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RtiStatutoryTimeline;
