"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Printer, Building, Scale, PhoneCall, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ALL_STATES_AND_UTS } from "@/lib/location/location-context";
import { planConsumerAction, ConsumerActionPlan, ConsumerIssueType, ConsumerReliefRequested } from "@/lib/consumer/consumer-engine";
import { generateRepresentationDocument, exportRepresentationHtml, RepresentationData } from "@/lib/templates/representation-generator";
import { triggerPrintDocument } from "@/lib/pdf/print-export";
import { WhyThisResultPanel } from "@/components/trust/WhyThisResultPanel";
import { PlainLanguageExplainer } from "@/components/explainer/PlainLanguageExplainer";

export default function ConsumerRightsPage() {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Coimbatore");
  const [pinCode, setPinCode] = useState("641002");
  const [productOrService, setProductOrService] = useState("Laptop / Electronic Device");
  const [sellerOrProvider, setSellerOrProvider] = useState("Online E-Commerce Platform / Seller");
  const [amountPaid, setAmountPaid] = useState<number>(45000);
  const [issueType, setIssueType] = useState<ConsumerIssueType>("DEFECTIVE_GOODS");
  const [reliefRequested, setReliefRequested] = useState<ConsumerReliefRequested>("REFUND");
  const [issueDescription, setIssueDescription] = useState(
    "Purchased an electronics laptop online 2 weeks ago; item delivered with broken screen display. E-commerce seller and customer care refused refund, closing ticket arbitrarily."
  );
  const [invoiceAvailable, setInvoiceAvailable] = useState(true);
  const [warrantyAvailable, setWarrantyAvailable] = useState(true);
  const [communicationsAvailable, setCommunicationsAvailable] = useState(true);

  const [applicantName] = useState("Citizen Complainant");
  const [applicantAddress] = useState("R.S. Puram, Coimbatore, Tamil Nadu - 641002");

  const [plan, setPlan] = useState<ConsumerActionPlan | null>(null);
  const [representationDoc, setRepresentationDoc] = useState<RepresentationData | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlanAction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const actionPlan = planConsumerAction({
      state: selectedState,
      district: district || undefined,
      pinCode: pinCode || undefined,
      productOrService,
      sellerOrProvider,
      amountPaid: Number(amountPaid) || undefined,
      issueType,
      issueDescription,
      invoiceAvailable,
      warrantyAvailable,
      communicationsAvailable,
      priorComplaintMade: true,
      reliefRequested,
      complainantName: applicantName,
      complainantAddress: applicantAddress,
    });

    const doc = generateRepresentationDocument({
      documentType: "CONSUMER_REPRESENTATION",
      problemDescription: issueDescription,
      locality: district || selectedState,
      state: selectedState,
      applicantName,
      applicantAddress,
      amountClaimed: amountPaid ? `₹${amountPaid.toLocaleString("en-IN")}` : undefined,
    });

    setPlan(actionPlan);
    setRepresentationDoc(doc);
    setLoading(false);
  };

  const handlePrint = () => {
    if (representationDoc) {
      const html = exportRepresentationHtml(representationDoc);
      triggerPrintDocument(html);
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-4">
        <Link href="/rights" className="inline-flex items-center gap-2 text-sm text-[#526176] hover:text-[#102A56] font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>
        <span className="text-xs font-semibold text-[#0369A1] uppercase tracking-wider px-3 py-1 bg-[#E0F2FE] rounded-full border border-[#7DD3FC]">
          {t("consumerEngine.badge")}
        </span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56] tracking-tight">
          {t("consumerEngine.title")}
        </h1>
        <p className="mt-2 text-sm text-[#526176]">
          {t("consumerEngine.subtitle")}
        </p>
      </div>

      {/* Guided Consumer Interview */}
      <form onSubmit={handlePlanAction} className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-6">
        <h2 className="text-base font-bold text-[#102A56] flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600" />
          {t("consumerEngine.tellUsTitle")}
        </h2>

        {/* Location Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.stateLabel")} *</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
            >
              {ALL_STATES_AND_UTS.map((s) => (
                <option key={s.code} value={s.name}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.districtLabel")}</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder={t("consumerEngine.districtPlaceholder")}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.pinCodeLabel")}</label>
            <input
              type="text"
              maxLength={6}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder={t("consumerEngine.pinPlaceholder")}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
            />
          </div>
        </div>

        {/* Transaction Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("consumerEngine.productLabel")}</label>
            <input
              type="text"
              value={productOrService}
              onChange={(e) => setProductOrService(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("consumerEngine.sellerLabel")}</label>
            <input
              type="text"
              value={sellerOrProvider}
              onChange={(e) => setSellerOrProvider(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("consumerEngine.amountPaidLabel")}</label>
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
            />
          </div>
        </div>

        {/* Issue Type & Relief */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("consumerEngine.issueCategoryLabel")}</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as ConsumerIssueType)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
            >
              <option value="DEFECTIVE_GOODS">{t("consumerEngine.catDefective")}</option>
              <option value="DEFICIENT_SERVICE">{t("consumerEngine.catDeficient")}</option>
              <option value="REFUND_REPLACEMENT_DISPUTE">{t("consumerEngine.catRefund")}</option>
              <option value="OVERCHARGING">{t("consumerEngine.catOvercharging")}</option>
              <option value="E_COMMERCE">{t("consumerEngine.catEcommerce")}</option>
              <option value="MISLEADING_ADVERTISEMENT">{t("consumerEngine.catMisleading")}</option>
              <option value="UNFAIR_TRADE_PRACTICE">{t("consumerEngine.catUnfair")}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("consumerEngine.reliefDemandedLabel")}</label>
            <select
              value={reliefRequested}
              onChange={(e) => setReliefRequested(e.target.value as ConsumerReliefRequested)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
            >
              <option value="REFUND">{t("consumerEngine.relRefund")}</option>
              <option value="REPLACEMENT">{t("consumerEngine.relReplacement")}</option>
              <option value="REPAIR">{t("consumerEngine.relRepair")}</option>
              <option value="COMPENSATION">{t("consumerEngine.relCompensation")}</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.problemDescLabel")} *</label>
          <textarea
            rows={3}
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
          />
        </div>

        {/* Evidence Checkboxes */}
        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={invoiceAvailable}
              onChange={(e) => setInvoiceAvailable(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span>{t("consumerEngine.chkInvoice")}</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={warrantyAvailable}
              onChange={(e) => setWarrantyAvailable(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span>{t("consumerEngine.chkWarranty")}</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={communicationsAvailable}
              onChange={(e) => setCommunicationsAvailable(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span>{t("consumerEngine.chkComms")}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Scale className="w-4 h-4" />
          <span>{t("consumerEngine.btnGenerate")}</span>
        </button>
      </form>

      {/* Results View */}
      {plan && (
        <div className="space-y-6">
          {/* Action Ladder */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#102A56] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              {t("consumerEngine.ladderTitle")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {plan.actionLadder.map((step) => (
                <div key={step.stepNumber} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900">
                      Step {step.stepNumber}: {step.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {step.timelineDays} Days
                    </span>
                  </div>
                  <p className="text-slate-600">{step.description}</p>
                  <div className="text-[11px] text-slate-800 font-semibold pt-1 border-t border-slate-200">
                    Channel: {step.authorityOrChannel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NCH Integration Box */}
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                {plan.nchDetails.portalName}
              </span>
              <a
                href={plan.nchDetails.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900"
              >
                <span>{t("consumerEngine.visitPortal")}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-emerald-900">
              {t("consumerEngine.nchNotice")} <strong>{plan.nchDetails.helplineNumber}</strong> | SMS: <strong>{plan.nchDetails.smsNumber}</strong>
            </p>
          </div>

          {/* Commission Jurisdiction Card */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-600" />
                {t("consumerEngine.territorialJurisdiction")}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {plan.commissionJurisdiction.confidence} CONFIDENCE
              </span>
            </div>
            <div className="font-semibold text-slate-800">{plan.commissionJurisdiction.tierName}</div>
            <p className="text-slate-600">{plan.commissionJurisdiction.pecuniaryLimitBasis}</p>
            <p className="text-slate-600">Territory: {plan.commissionJurisdiction.territorialJurisdiction}</p>
          </div>

          {/* Explainer & Why This Result */}
          <PlainLanguageExplainer definitionKey="CONSUMER_ADR_1915" />
          <WhyThisResultPanel
            title={plan.commissionJurisdiction.tierName}
            resultSummary={`National consumer dispute classified under Consumer Protection Act, 2019 for ${plan.location.stateName}.`}
            confidence={plan.confidence}
            reasons={[
              "Consumer Protection Act, 2019 applies uniformly nationwide across all States & UTs.",
              plan.commissionJurisdiction.pecuniaryLimitBasis,
              "Pre-litigation 15-day notice is mandatory proof before Consumer Commission admission.",
            ]}
            officialSources={[
              { id: "SRC-CONS-2A-CENTRAL", name: "Consumer Protection Act, 2019 (Central Act 35 of 2019)", url: "https://consumeraffairs.nic.in" },
              { id: "SRC-CONS-NCH", name: "National Consumer Helpline (Department of Consumer Affairs)", url: "https://consumerhelpline.gov.in" },
            ]}
          />

          {/* Generated Representation Notice */}
          {representationDoc && (
            <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-3 flex-wrap gap-2">
                <div>
                  <h4 className="text-sm font-bold text-[#102A56]">{representationDoc.title}</h4>
                  <span className="text-[11px] text-slate-500">Statutory Notice Period: {representationDoc.responseTimelineDays} Days</span>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t("consumerEngine.printPdf")}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-sans text-xs text-slate-900 leading-relaxed max-h-[300px] overflow-y-auto">
                <div className="font-bold text-center uppercase tracking-wide text-[#102A56]">
                  {representationDoc.title}
                </div>
                <div>
                  <strong>{t("consumerEngine.toLabel")}</strong> {representationDoc.recipientTitle}, {representationDoc.recipientOrg} ({representationDoc.recipientAddress})
                </div>
                <div>
                  <strong>{t("consumerEngine.subjectLabel")}</strong> {representationDoc.subject}
                </div>
                <div className="space-y-1">
                  <strong>{t("consumerEngine.factsLabel")}</strong>
                  {representationDoc.factsAndGrievance.map((f, i) => (
                    <p key={i}>• {f}</p>
                  ))}
                </div>
                <div className="space-y-1">
                  <strong>{t("consumerEngine.reliefLabel")}</strong>
                  {representationDoc.demandedRelief.map((r, i) => (
                    <p key={i}>• {r}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
