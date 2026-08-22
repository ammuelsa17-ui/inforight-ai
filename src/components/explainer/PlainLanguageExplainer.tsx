"use client";

import React from "react";
import { HelpCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface PlainLanguageExplainerProps {
  term: string;
  sectionCode?: string;
  whatItMeans: string;
  whatYouShouldDo: string;
  statutoryBasis?: string;
}

export const EXPLAINER_DEFINITIONS: Record<string, PlainLanguageExplainerProps> = {
  "RTI_SECTION_6_1": {
    term: "RTI Application (Section 6(1))",
    sectionCode: "Section 6(1), RTI Act 2005",
    whatItMeans: "This is your statutory legal right to request certified copies of official government records, tender contracts, and measurement book inspection data.",
    whatYouShouldDo: "Submit the drafted application to the Public Information Officer (PIO) with the statutory ₹10 fee and save your receipt.",
    statutoryBasis: "Right to Information Act, 2005",
  },
  "RTI_SECTION_7_1": {
    term: "30-Day Response Window (Section 7(1))",
    sectionCode: "Section 7(1), RTI Act 2005",
    whatItMeans: "The government Public Information Officer has a mandatory deadline of 30 calendar days from receipt to supply the certified information.",
    whatYouShouldDo: "Keep your postal tracking or online receipt. InfoRight will count down the 30 days and unlock your First Appeal if no response arrives.",
    statutoryBasis: "Section 7(1) Timeline Guarantee",
  },
  "RTI_SECTION_19_1": {
    term: "First Appeal (Section 19(1))",
    sectionCode: "Section 19(1), RTI Act 2005",
    whatItMeans: "If the PIO ignores your RTI past 30 days (Deemed Refusal) or rejects it unlawfully, you can appeal to a senior officer free of cost.",
    whatYouShouldDo: "Generate the First Appeal document in InfoRight and submit it to the First Appellate Authority / Joint Commissioner.",
    statutoryBasis: "Statutory Appellate Remedy",
  },
  "TNRRRLT_SEC_11": {
    term: "Security Deposit Refund Guarantee",
    sectionCode: "Section 11, TNRRRLT Act 2017",
    whatItMeans: "Under Tamil Nadu law, residential security deposits are capped and must be refunded within 1 month after you vacate the premises.",
    whatYouShouldDo: "Send the formal demand representation via Speed Post with key handover proof. If ignored for 15-30 days, petition the Rent Authority.",
    statutoryBasis: "Tamil Nadu Act No. 42 of 2017",
  },
  "CONSUMER_ADR_1915": {
    term: "National Consumer Alternate Dispute Resolution",
    sectionCode: "Consumer Protection Act 2019",
    whatItMeans: "Before filing in court, e-commerce sellers and service providers are given an expedited 15 to 45-day window to resolve complaints via NCH mediation.",
    whatYouShouldDo: "Send the generated Pre-Litigation Notice to the seller's grievance officer and register the ticket on NCH 1915.",
    statutoryBasis: "Department of Consumer Affairs",
  },
};

export const PlainLanguageExplainer: React.FC<{ definitionKey?: keyof typeof EXPLAINER_DEFINITIONS; custom?: PlainLanguageExplainerProps }> = ({
  definitionKey,
  custom,
}) => {
  const { t } = useLanguage();
  const item = custom || (definitionKey ? EXPLAINER_DEFINITIONS[definitionKey] : null);
  if (!item) return null;

  return (
    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 text-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-sky-950">
          <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{item.term}</span>
        </div>
        {item.sectionCode && (
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-sky-200 text-sky-900">
            {item.sectionCode}
          </span>
        )}
      </div>

      <div className="space-y-2 text-sky-900">
        <div>
          <strong className="text-sky-950 block text-[11px] uppercase tracking-wider mb-0.5">
            {t("explainer.whatItMeans")}
          </strong>
          <p className="leading-relaxed text-slate-700">{item.whatItMeans}</p>
        </div>

        <div className="pt-2 border-t border-sky-200/60">
          <strong className="text-sky-950 block text-[11px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-indigo-600" /> {t("explainer.whatNext")}
          </strong>
          <p className="leading-relaxed text-slate-700">{item.whatYouShouldDo}</p>
        </div>
      </div>
    </div>
  );
};
