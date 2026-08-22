"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ALL_STATES_AND_UTS, getDistrictsForState, resolveLocationContext, IndiaLocationContext } from "@/lib/location/location-context";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";

export type LocationContextType =
  | "HOME"
  | "ISSUE"
  | "PROPERTY"
  | "WORKPLACE"
  | "CONSUMER"
  | "GENERAL";

export interface IndiaLocationSelectorProps {
  contextType?: LocationContextType;
  initialState?: string;
  initialDistrict?: string;
  initialPinCode?: string;
  initialLocality?: string;
  onLocationChange: (location: IndiaLocationContext) => void;
  requiredLevel?: "STATE" | "DISTRICT" | "PIN" | "LOCALITY";
  className?: string;
}

export function IndiaLocationSelector({
  contextType = "GENERAL",
  initialState = "Tamil Nadu",
  initialDistrict = "Coimbatore",
  initialPinCode = "641002",
  initialLocality = "",
  onLocationChange,
  requiredLevel = "DISTRICT",
  className = "",
}: IndiaLocationSelectorProps) {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [pinCode, setPinCode] = useState(initialPinCode);
  const [locality, setLocality] = useState(initialLocality);

  // Available districts for chosen state
  const availableDistricts = useMemo(() => {
    return getDistrictsForState(selectedState);
  }, [selectedState]);

  // Context-specific label
  const contextLabel = useMemo(() => {
    switch (contextType) {
      case "PROPERTY":
        return "Where is the rented property located?";
      case "WORKPLACE":
        return "Where is your workplace / employment establishment located?";
      case "CONSUMER":
        return "Where are you / the consumer transaction located?";
      case "ISSUE":
        return "Where did this civic / legal issue take place?";
      case "HOME":
        return "What is your primary state and district?";
      default:
        return "Select Jurisdiction Location";
    }
  }, [contextType]);

  // Resolve and propagate location context
  const locationContext = useMemo(() => {
    return resolveLocationContext({
      state: selectedState,
      district: selectedDistrict,
      pinCode,
      locality,
    });
  }, [selectedState, selectedDistrict, pinCode, locality]);

  useEffect(() => {
    onLocationChange(locationContext);
  }, [locationContext, onLocationChange]);

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    const districts = getDistrictsForState(newState);
    if (districts.length > 0) {
      setSelectedDistrict(districts[0]);
    } else {
      setSelectedDistrict("");
    }
  };

  return (
    <div className={`p-4 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4 ${className}`}>
      {/* Header Context Label */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs font-bold text-[#102A56] uppercase tracking-wide">
            {contextLabel}
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          {locationContext.stateCode} • {locationContext.unionTerritory ? "UT" : "STATE"}
        </span>
      </div>

      {/* Progressive Location Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* 1. State / UT Selection */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            {t("ask.stateLabel")} *
          </label>
          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] font-semibold text-xs rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
          >
            {ALL_STATES_AND_UTS.map((s) => (
              <option key={s.code} value={s.name}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        {/* 2. District Selection */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            {t("ask.districtLabel")} {requiredLevel === "DISTRICT" || requiredLevel === "PIN" ? "*" : ""}
          </label>
          {availableDistricts.length > 0 ? (
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] font-medium text-xs rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              placeholder={t("consumerEngine.districtPlaceholder")}
              className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-xl text-slate-900 focus:outline-none"
            />
          )}
        </div>

        {/* 3. PIN Code Input */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            {t("ask.pinCodeLabel")} {requiredLevel === "PIN" ? "*" : ""}
          </label>
          <input
            type="text"
            maxLength={6}
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder={t("consumerEngine.pinPlaceholder")}
            className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] font-mono font-bold text-xs text-center rounded-xl text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Locality Input (Optional / Step 4) */}
      {requiredLevel === "LOCALITY" && (
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            {t("ask.localityLabel")}
          </label>
          <input
            type="text"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder={t("ask.localityPlaceholder")}
            className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-xl text-slate-900 focus:outline-none"
          />
        </div>
      )}

      {/* Conflict Guard Notice */}
      {locationContext.conflictStatus === "LOCATION_CONFIRMATION_REQUIRED" && (
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold block">{t("ask.conflictTitle")}</span>
            <p>{locationContext.conflictMessage}</p>
          </div>
        </div>
      )}

      {/* Verified Status Banner */}
      {locationContext.conflictStatus === "OK" && selectedDistrict && (
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium pt-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Jurisdiction ground: {selectedDistrict}, {selectedState}</span>
        </div>
      )}
    </div>
  );
}
