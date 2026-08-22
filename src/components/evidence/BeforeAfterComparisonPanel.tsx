"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CivicEvidenceItem, LocationConsistencyStatus } from "@/types/rectification";
import { CheckCircle2, AlertTriangle, MapPin, Calendar, ShieldCheck, FileCheck } from "lucide-react";

interface BeforeAfterComparisonPanelProps {
  beforeEvidence?: CivicEvidenceItem;
  afterEvidence?: CivicEvidenceItem;
  locationConsistency?: LocationConsistencyStatus;
  distanceMeters?: number;
  accuracyToleranceMeters?: number;
  officerActionNote?: string;
  department?: string;
  officerDesignation?: string;
  className?: string;
}

export function BeforeAfterComparisonPanel({
  beforeEvidence,
  afterEvidence,
  locationConsistency = "NOT_AVAILABLE",
  distanceMeters,
  accuracyToleranceMeters,
  officerActionNote,
  department,
  officerDesignation,
  className = "",
}: BeforeAfterComparisonPanelProps) {
  const { t } = useLanguage();

  const getConsistencyBadge = () => {
    switch (locationConsistency) {
      case "CONSISTENT":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-300",
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
          label: "Location Consistent",
          desc: `Device-reported location appears consistent with the reported issue area (~${distanceMeters}m${accuracyToleranceMeters ? `, accuracy ±${accuracyToleranceMeters}m` : ""}).`,
        };
      case "NEARBY":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-300",
          icon: <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />,
          label: "Nearby Location",
          desc: `Device-reported location is nearby (~${distanceMeters}m from reported issue area).`,
        };
      case "SIGNIFICANT_MISMATCH":
        return {
          bg: "bg-amber-50 text-amber-900 border-amber-300",
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
          label: "Location Mismatch",
          desc: `Rectification evidence location appears different from the reported issue location (~${distanceMeters ? (distanceMeters / 1000).toFixed(1) : "?"} km distance).`,
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200",
          icon: <MapPin className="w-4 h-4 text-slate-500 shrink-0" />,
          label: "Location Not Captured",
          desc: "Device-reported GPS coordinates were not provided for both points.",
        };
    }
  };

  const consistency = getConsistencyBadge();

  return (
    <div className={`rounded-2xl bg-white border border-[#BCD7EE] shadow-xs overflow-hidden space-y-4 ${className}`}>
      {/* Panel Header */}
      <div className="p-4 bg-[#F4F9FF] border-b border-[#BCD7EE] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-600 shrink-0" />
          <h3 className="text-sm font-extrabold text-[#102A56]">
            Civic Rectification Evidence (Before & After)
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${consistency.bg}">
          {consistency.icon}
          <span>{consistency.label}</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Consistency Description */}
        <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${consistency.bg}`}>
          {consistency.icon}
          <div className="space-y-0.5">
            <span className="font-bold block">{consistency.label}</span>
            <p>{consistency.desc}</p>
          </div>
        </div>

        {/* Before vs After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LEFT: BEFORE (Citizen) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                BEFORE (Citizen Issue)
              </span>
              {beforeEvidence && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {beforeEvidence.id}
                </span>
              )}
            </div>

            {beforeEvidence?.previewUrl ? (
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-48 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={beforeEvidence.previewUrl}
                  alt="Citizen before-rectification proof"
                  className="h-48 object-contain w-full"
                />
              </div>
            ) : (
              <div className="h-48 rounded-xl border border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center text-slate-400 text-xs p-4 text-center">
                <FileCheck className="w-8 h-8 mb-2 opacity-50" />
                <span>No before photo recorded with grievance</span>
              </div>
            )}

            <div className="space-y-1.5 text-xs text-slate-600">
              {beforeEvidence?.description && (
                <p className="italic text-slate-800 bg-white p-2 rounded-lg border border-slate-200">
                  &ldquo;{beforeEvidence.description}&rdquo;
                </p>
              )}

              <div className="flex items-center gap-1.5 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Reported: {beforeEvidence ? new Date(beforeEvidence.capturedAt).toLocaleDateString() : "On record"}
                </span>
              </div>

              {beforeEvidence?.location && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-900">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    {beforeEvidence.location.latitude.toFixed(5)}°, {beforeEvidence.location.longitude.toFixed(5)}°
                  </span>
                </div>
              )}

              {beforeEvidence?.sha256Checksum && (
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  SHA-256: {beforeEvidence.sha256Checksum.slice(0, 20)}...
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: AFTER (Officer) */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <span className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                AFTER (Officer Rectification)
              </span>
              {afterEvidence && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">
                  {afterEvidence.id}
                </span>
              )}
            </div>

            {afterEvidence?.previewUrl ? (
              <div className="rounded-xl overflow-hidden border border-emerald-200 bg-slate-900 h-48 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={afterEvidence.previewUrl}
                  alt="Officer after-rectification proof"
                  className="h-48 object-contain w-full"
                />
              </div>
            ) : (
              <div className="h-48 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 flex flex-col items-center justify-center text-emerald-700 text-xs p-4 text-center">
                <ShieldCheck className="w-8 h-8 mb-2 opacity-50" />
                <span>Work documented through official action note</span>
              </div>
            )}

            <div className="space-y-1.5 text-xs text-slate-600">
              {officerActionNote && (
                <div className="bg-white p-2.5 rounded-lg border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-900 block uppercase tracking-wider">
                    Official Action Taken:
                  </span>
                  <p className="text-slate-800">{officerActionNote}</p>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Rectified: {afterEvidence ? new Date(afterEvidence.capturedAt).toLocaleDateString() : "Recently"}
                </span>
              </div>

              {(department || officerDesignation) && (
                <div className="text-[11px] text-slate-700 font-semibold">
                  Action by: {officerDesignation ? `${officerDesignation}, ` : ""}{department || "Municipal Department"}
                </div>
              )}

              {afterEvidence?.location && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-900">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {afterEvidence.location.latitude.toFixed(5)}°, {afterEvidence.location.longitude.toFixed(5)}°
                  </span>
                </div>
              )}

              {afterEvidence?.sha256Checksum && (
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  SHA-256: {afterEvidence.sha256Checksum.slice(0, 20)}...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
