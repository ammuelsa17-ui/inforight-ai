"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { calculateRtiFeeStructure } from "@/lib/statutory/fee-calculator";
import { CreditCard, ExternalLink, ShieldCheck } from "lucide-react";

interface RtiFeeCalculatorProps {
  initialState?: string;
  initialAuthority?: string;
}

export function RtiFeeCalculator({
  initialState = "Tamil Nadu",
  initialAuthority = "Coimbatore City Municipal Corporation",
}: RtiFeeCalculatorProps) {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedAuthority, setSelectedAuthority] = useState(initialAuthority);
  const [isBplApplicant, setIsBplApplicant] = useState(false);

  const feeData = calculateRtiFeeStructure(selectedState, selectedAuthority);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t("feeCalc.title")}
            </h4>
            <p className="text-xs text-slate-500">
              {t("feeCalc.subtitle")}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          {feeData.jurisdiction} Jurisdiction
        </span>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t("feeCalc.authLabel")}
          </label>
          <select
            value={selectedAuthority}
            onChange={(e) => setSelectedAuthority(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Central / Public Information Officer">{t("feeCalc.authCentral")}</option>
            <option value="Coimbatore City Municipal Corporation">{t("feeCalc.authCCMC")}</option>
            <option value="State Revenue Administration">{t("feeCalc.authStateRevenue")}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t("feeCalc.jurisdictionLabel")}
          </label>
          <input
            type="text"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* BPL Exemption Toggle */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bpl-check"
            checked={isBplApplicant}
            onChange={(e) => setIsBplApplicant(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="bpl-check" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            {t("feeCalc.bplLabel")}
          </label>
        </div>
        <span className="text-[10px] text-slate-500">Section 7(5)</span>
      </div>

      {/* Fee Display Box */}
      <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{t("feeCalc.feeLabel")}</span>
          <span className="text-base font-extrabold text-blue-700 dark:text-blue-300">
            {isBplApplicant ? "₹0 (Exempt)" : `₹${feeData.applicationFeeAmount} ${feeData.currency}`}
          </span>
        </div>

        {isBplApplicant && (
          <p className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800 font-medium">
            {feeData.bplExemptionNotice}
          </p>
        )}

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            {t("feeCalc.permittedInstruments")}
          </span>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
            {feeData.permittedPaymentModes.map((mode, idx) => (
              <li key={idx}>{mode}</li>
            ))}
          </ul>
        </div>

        {feeData.reproductionFeeNotice && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-blue-200 dark:border-blue-800/40">
            {feeData.reproductionFeeNotice}
          </p>
        )}
      </div>

      {/* Source Citation */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Source: {feeData.sourceCitation}
        </span>
        <a
          href={feeData.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 font-medium"
        >
          {t("feeCalc.officialRegistry")} <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default RtiFeeCalculator;
