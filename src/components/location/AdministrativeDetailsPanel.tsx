// src/components/location/AdministrativeDetailsPanel.tsx — Collapsible Provenance & Administrative Details View
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, HelpCircle, CheckCircle2, Building, MapPin } from "lucide-react";
import { NormalizedLocationResolution, AdministrativeConfidence } from "@/lib/location/all-india-location-resolver";
import { useLanguage } from "@/context/LanguageContext";

interface AdministrativeDetailsPanelProps {
  resolution: NormalizedLocationResolution | null;
  onOverride?: (field: "subDistrict" | "block" | "localBody" | "village", value: string) => void;
  className?: string;
}

export function AdministrativeDetailsPanel({
  resolution,
  onOverride,
  className = "",
}: AdministrativeDetailsPanelProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (!resolution) return null;

  const renderBadge = (status: AdministrativeConfidence) => {
    let badgeClass = "bg-amber-100 text-amber-800 border-amber-200";
    let icon = <HelpCircle className="w-3 h-3 text-amber-600" />;
    let label = t("ask.statusVerificationRequired");

    if (status === "VERIFIED") {
      badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
      icon = <ShieldCheck className="w-3 h-3 text-emerald-600" />;
      label = t("ask.statusVerified");
    } else if (status === "SUGGESTED") {
      badgeClass = "bg-sky-100 text-sky-800 border-sky-200";
      icon = <MapPin className="w-3 h-3 text-sky-600" />;
      label = t("ask.statusSuggested");
    } else if (status === "USER_CONFIRMED") {
      badgeClass = "bg-indigo-100 text-indigo-800 border-indigo-200";
      icon = <CheckCircle2 className="w-3 h-3 text-indigo-600" />;
      label = t("ask.statusCitizenConfirmed");
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
        {icon}
        <span>{label}</span>
      </span>
    );
  };

  const admin = resolution.administrative;

  return (
    <div className={`rounded-xl border border-slate-200 bg-white overflow-hidden text-xs ${className}`}>
      {/* Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between font-bold text-slate-800"
      >
        <span className="flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-600" />
          <span>{t("ask.adminDetailsToggle")}</span>
        </span>
        <span className="flex items-center gap-2 text-slate-500 font-normal">
          {renderBadge(resolution.confidence)}
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Expanded Provenance Table */}
      {isOpen && (
        <div className="p-3.5 space-y-3 bg-white border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* State */}
            <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">{t("ask.stateUtLabel")}</span>
                <span className="font-bold text-slate-900">{admin.state.name || "—"}</span>
              </div>
              <div>{renderBadge(admin.state.status)}</div>
            </div>

            {/* District */}
            <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">{t("ask.districtLabel")}</span>
                <span className="font-bold text-slate-900">{admin.district.name || "—"}</span>
              </div>
              <div>{renderBadge(admin.district.status)}</div>
            </div>

            {/* Sub-District / Taluk / Tehsil */}
            <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {admin.subDistrict.label || t("ask.talukLabel")}
                </span>
                <span className="font-bold text-slate-900">{admin.subDistrict.name || "—"}</span>
              </div>
              <div>{renderBadge(admin.subDistrict.status)}</div>
            </div>

            {/* Local Governing Body */}
            <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {t("ask.localBodyLabel")}
                </span>
                <span className="font-bold text-slate-900">{admin.localBody.name || "—"}</span>
              </div>
              <div>{renderBadge(admin.localBody.status)}</div>
            </div>

            {/* Village / Locality */}
            <div className="p-2 rounded-lg bg-slate-50/70 border border-slate-200/80 flex items-center justify-between sm:col-span-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  {t("ask.villageLabel")}
                </span>
                <span className="font-bold text-slate-900">{admin.village.name || "—"}</span>
              </div>
              <div>{renderBadge(admin.village.status)}</div>
            </div>
          </div>

          {/* Provenance Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 flex-wrap gap-1">
            <span>
              <strong>{t("ask.postalSourcePrefix")}:</strong> {resolution.sourceStatus.postal}
            </span>
            <span>
              <strong>{t("ask.adminGroundingPrefix")}:</strong> {resolution.sourceStatus.administrative}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
