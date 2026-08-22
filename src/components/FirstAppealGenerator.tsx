"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FirstAppealData } from "@/lib/statutory/types";
import { exportFirstAppealHtml, triggerPrintDocument } from "@/lib/pdf/print-export";
import { FileText, Copy, Printer, Check, AlertCircle, ShieldCheck } from "lucide-react";

interface FirstAppealGeneratorProps {
  initialData?: Partial<FirstAppealData>;
}

export function FirstAppealGenerator({ initialData }: FirstAppealGeneratorProps) {
  const { t } = useLanguage();
  const [data, setData] = useState<FirstAppealData>({
    originalRtiRefId: initialData?.originalRtiRefId || "RTI/CCMC/2026/0482",
    filingDate: initialData?.filingDate || new Date().toISOString().split("T")[0],
    targetAuthority: initialData?.targetAuthority || "Coimbatore City Municipal Corporation",
    firstAppellateAuthorityDesignation: "First Appellate Authority / Deputy Commissioner",
    applicantName: initialData?.applicantName || "",
    applicantAddress: initialData?.applicantAddress || "",
    responseStatus: initialData?.responseStatus || "no_response",
    groundsForAppeal:
      initialData?.groundsForAppeal ||
      "The Public Information Officer failed to provide the requested public records within the statutory 30-day period prescribed under Section 7(1) of the RTI Act 2005.",
    requestedRelief:
      initialData?.requestedRelief ||
      "Direct the PIO to provide certified copies of work orders, Measurement Book (MB) entries, and inspection reports free of cost under Section 7(6).",
    statutoryReference: "Section 19(1) of RTI Act 2005",
  });

  const [copied, setCopied] = useState(false);

  const appealText = `FIRST APPEAL UNDER SECTION 19(1) OF THE RIGHT TO INFORMATION ACT, 2005

BEFORE THE FIRST APPELLATE AUTHORITY:
Designation: ${data.firstAppellateAuthorityDesignation}
Public Authority: ${data.targetAuthority}

1. APPLICANT DETAILS:
Name of Appellant: ${data.applicantName || "[Appellant Name]"}
Address for Correspondence: ${data.applicantAddress || "[Appellant Address]"}

2. DETAILS OF ORIGINAL RTI APPLICATION:
Original Application Ref / File No: ${data.originalRtiRefId}
Date of Original RTI Filing: ${data.filingDate}
Target PIO Designation: Public Information Officer, ${data.targetAuthority}

3. STATUS OF PIO RESPONSE:
Response Status: ${
    data.responseStatus === "no_response"
      ? "No response received within statutory 30-day period (Deemed Refusal under Section 7(2))"
      : data.responseStatus === "refused"
      ? "Information refused / rejected by PIO"
      : "Incomplete / misleading information provided by PIO"
  }

4. GROUNDS FOR APPEAL (SECTION 19(1)):
${data.groundsForAppeal}

5. PRAYER / RELIEF SOUGHT:
The Appellant prays that the First Appellate Authority may be pleased to:
a) ${data.requestedRelief}
b) Direct the PIO to supply all records free of charge as mandated under Section 7(6) of the RTI Act 2005 due to statutory delay.

VERIFICATION:
I, ${data.applicantName || "[Appellant Name]"}, hereby declare that the contents of this First Appeal application are true and correct to the best of my knowledge.

Place: Coimbatore
Date: ${new Date().toISOString().split("T")[0]}
Signature: _______________________
(Appellant)`;

  const isAppealEligible = data.responseStatus === "no_response" || data.responseStatus === "refused" || data.responseStatus === "incomplete_info";

  const handleCopy = async () => {
    if (!isAppealEligible) return;
    try {
      await navigator.clipboard.writeText(appealText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Browser fallback
    }
  };

  const handlePrint = () => {
    if (!isAppealEligible) return;
    const html = exportFirstAppealHtml({
      appealDate: data.filingDate,
      appellantName: data.applicantName,
      appellantAddress: data.applicantAddress,
      originalRtiDate: data.filingDate,
      originalPioAuthority: `Public Information Officer, ${data.targetAuthority}`,
      firstAppellateAuthority: data.firstAppellateAuthorityDesignation,
      groundsForAppeal: [data.groundsForAppeal],
      statutoryTimelineBasis: "Section 19(1) of RTI Act 2005 (Statutory 30-day timeline exceeded).",
      reliefSought: data.requestedRelief,
      enclosures: [
        `Copy of Original RTI Application Ref ${data.originalRtiRefId}`,
        "Proof of Application Fee Payment",
        "Supporting Evidence Index",
      ],
    });
    triggerPrintDocument(html);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t("appeal.title")}
            </h4>
            <p className="text-xs text-slate-500">
              {t("appeal.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t("appeal.refLabel")}
          </label>
          <input
            type="text"
            value={data.originalRtiRefId}
            onChange={(e) => setData({ ...data, originalRtiRefId: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t("appeal.statusLabel")}
          </label>
          <select
            value={data.responseStatus}
            onChange={(e) => setData({ ...data, responseStatus: e.target.value as FirstAppealData["responseStatus"] })}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg p-2"
          >
            <option value="no_response">{t("appeal.statusNoResponse")}</option>
            <option value="refused">{t("appeal.statusRefused")}</option>
            <option value="incomplete_info">{t("appeal.statusIncomplete")}</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {t("appeal.groundsLabel")}
          </label>
          <textarea
            rows={2}
            value={data.groundsForAppeal}
            onChange={(e) => setData({ ...data, groundsForAppeal: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg p-2"
          />
        </div>
      </div>

      {/* Mandatory Notice */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          {t("appeal.draftNotice")}
        </span>
        <span className="text-[10px] text-amber-700 dark:text-amber-300">Section 19(1)</span>
      </div>

      {/* Draft Document Box */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
          {appealText}
        </pre>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> {t("appeal.clientSideNotice")}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!isAppealEligible}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                isAppealEligible
                  ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100"
                  : "bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Appeal"}</span>
            </button>
            <button
              onClick={handlePrint}
              disabled={!isAppealEligible}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isAppealEligible
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                  : "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>{t("appeal.printPdf")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstAppealGenerator;
