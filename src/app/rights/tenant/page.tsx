"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Printer, Building, Scale, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ALL_STATES_AND_UTS } from "@/lib/location/location-context";
import { planTenantAction, TenantActionPlan, TenantIssueType } from "@/lib/tenancy/tenancy-engine";
import { generateRepresentationDocument, exportRepresentationHtml, RepresentationData } from "@/lib/templates/representation-generator";
import { triggerPrintDocument } from "@/lib/pdf/print-export";
import { WhyThisResultPanel } from "@/components/trust/WhyThisResultPanel";
import { PlainLanguageExplainer } from "@/components/explainer/PlainLanguageExplainer";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";

export default function TenantRightsPage() {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Coimbatore");
  const [pinCode, setPinCode] = useState("641002");
  const [propertyType, setPropertyType] = useState<"RESIDENTIAL" | "COMMERCIAL" | "OTHER">("RESIDENTIAL");
  const [issueType, setIssueType] = useState<TenantIssueType>("SECURITY_DEPOSIT");
  const [monthlyRent] = useState<number>(15000);
  const [securityDeposit, setSecurityDeposit] = useState<number>(45000);
  const [issueDescription, setIssueDescription] = useState(
    "Vacated rental premises 3 weeks ago after full key handover and utility clearance. Landlord refuses to return ₹45,000 security deposit without any written damage assessment."
  );
  const [agreementAvailable, setAgreementAvailable] = useState(true);
  const [agreementRegistered, setAgreementRegistered] = useState(false);
  const [handoverProofAvailable, setHandoverProofAvailable] = useState(true);
  const [communicationsAvailable, setCommunicationsAvailable] = useState(true);

  const [tenantName] = useState("Citizen Tenant");
  const [tenantAddress] = useState("R.S. Puram, Coimbatore, Tamil Nadu - 641002");

  const [plan, setPlan] = useState<TenantActionPlan | null>(null);
  const [representationDoc, setRepresentationDoc] = useState<RepresentationData | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlanAction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const actionPlan = planTenantAction({
      state: selectedState,
      district: district || undefined,
      pinCode: pinCode || undefined,
      propertyType,
      agreementAvailable,
      agreementRegistered,
      monthlyRent: Number(monthlyRent) || undefined,
      securityDepositPaid: Number(securityDeposit) || undefined,
      issueType,
      issueDescription,
      noticeReceived: false,
      handoverProofAvailable,
      communicationsAvailable,
      tenantName,
      tenantAddress,
    });

    const doc = generateRepresentationDocument({
      documentType: "TENANT_REPRESENTATION",
      problemDescription: issueDescription,
      locality: district || selectedState,
      state: selectedState,
      applicantName: tenantName,
      applicantAddress: tenantAddress,
      amountClaimed: securityDeposit ? `₹${securityDeposit.toLocaleString("en-IN")}` : undefined,
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
    <PageContainer size="narrow">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/rights"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>
        <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
          {t("tenantEngine.badge")}
        </span>
      </div>

      <PageHeader
        title={t("tenantEngine.title")}
        description={t("tenantEngine.subtitle")}
      />

      {/* Guided Tenant Interview */}
      <form onSubmit={handlePlanAction} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#102A56] flex items-center gap-2">
          <Building className="w-5 h-5 text-amber-600" />
          {t("tenantEngine.tellUsTitle")}
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
              placeholder={t("tenantEngine.districtPlaceholder")}
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
              placeholder={t("tenantEngine.pinPlaceholder")}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
            />
          </div>
        </div>

        {/* Property & Issue Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("tenantEngine.propertyTypeLabel")}</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as "RESIDENTIAL" | "COMMERCIAL" | "OTHER")}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
            >
              <option value="RESIDENTIAL">{t("tenantEngine.propResidential")}</option>
              <option value="COMMERCIAL">{t("tenantEngine.propCommercial")}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("tenantEngine.issueCategoryLabel")}</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as TenantIssueType)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
            >
              <option value="SECURITY_DEPOSIT">{t("tenantEngine.catDeposit")}</option>
              <option value="EVICTION">{t("tenantEngine.catEviction")}</option>
              <option value="RENT_INCREASE">{t("tenantEngine.catRentIncrease")}</option>
              <option value="ESSENTIAL_SERVICES">{t("tenantEngine.catEssential")}</option>
              <option value="MAINTENANCE">{t("tenantEngine.catMaintenance")}</option>
              <option value="LOCKOUT">{t("tenantEngine.catLockout")}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t("tenantEngine.depositHeldLabel")}</label>
            <input
              type="number"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
            />
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

        {/* Checkbox Proofs */}
        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreementAvailable}
              onChange={(e) => setAgreementAvailable(e.target.checked)}
              className="rounded text-amber-600"
            />
            <span>{t("tenantEngine.chkAgreement")}</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreementRegistered}
              onChange={(e) => setAgreementRegistered(e.target.checked)}
              className="rounded text-amber-600"
            />
            <span>{t("tenantEngine.chkRegistered")}</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={handoverProofAvailable}
              onChange={(e) => setHandoverProofAvailable(e.target.checked)}
              className="rounded text-amber-600"
            />
            <span>{t("tenantEngine.chkHandover")}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Building className="w-4 h-4" />
          <span>{t("tenantEngine.btnResolve")}</span>
        </button>
      </form>

      {/* Results View */}
      {plan && (
        <div className="space-y-6">
          {/* State Law Status Banner */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                {t("tenantEngine.stateLawTitle")}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                {plan.stateRecord.verificationTier} VERIFIED
              </span>
            </div>
            <div className="font-semibold text-amber-900 text-sm">{plan.applicableLaw.actTitle}</div>
            <p className="text-slate-700">{plan.statutoryRule.summary}</p>
            {plan.stateRecord.notes && (
              <p className="text-[11px] text-amber-800 italic pt-1 border-t border-amber-200/60">
                📌 {plan.stateRecord.notes}
              </p>
            )}
          </div>

          {/* Authority Resolution Card */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-600" />
                {t("tenantEngine.rentAuthTitle")}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {plan.authorityResolution.confidence} CONFIDENCE
              </span>
            </div>
            <div className="font-semibold text-slate-800">{plan.authorityResolution.rentAuthorityName}</div>
            <p className="text-slate-600">Appellate Forum: {plan.authorityResolution.rentCourtName}</p>
            {plan.authorityResolution.registrationPortal && (
              <div className="pt-1">
                <a
                  href={plan.authorityResolution.registrationPortal}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                >
                  <span>{t("tenantEngine.regPortal")}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Action Steps */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#102A56] uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              {t("tenantEngine.ladderTitle")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {plan.actionSteps.map((step) => (
                <div key={step.stepNumber} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950">
                      Step {step.stepNumber}: {step.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {step.timelineDays} Days
                    </span>
                  </div>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Explainer & Why This Result */}
          <PlainLanguageExplainer definitionKey="TNRRRLT_SEC_11" />
          <WhyThisResultPanel
            title={plan.applicableLaw.actTitle}
            resultSummary={`Tenancy dispute resolved under ${plan.location.stateName} state tenancy legislation.`}
            confidence={plan.confidence}
            reasons={[
              plan.statutoryRule.summary,
              "Tenancy law is enacted and administered strictly at the State / Union Territory level.",
              "Model Tenancy Act serves as a central framework and does not substitute for notified state enactments.",
            ]}
            officialSources={[
              { id: plan.applicableLaw.sourceId, name: plan.applicableLaw.actTitle, url: plan.applicableLaw.sourceUrl || "https://www.indiacode.nic.in" },
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
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t("tenantEngine.printPdf")}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-sans text-xs text-slate-900 leading-relaxed max-h-[300px] overflow-y-auto">
                <div className="font-bold text-center uppercase tracking-wide text-[#102A56]">
                  {representationDoc.title}
                </div>
                <div>
                  <strong>{t("tenantEngine.toLabel")}</strong> {representationDoc.recipientTitle}, {representationDoc.recipientOrg} ({representationDoc.recipientAddress})
                </div>
                <div>
                  <strong>{t("tenantEngine.subjectLabel")}</strong> {representationDoc.subject}
                </div>
                <div className="space-y-1">
                  <strong>{t("tenantEngine.factsLabel")}</strong>
                  {representationDoc.factsAndGrievance.map((f, i) => (
                    <p key={i}>• {f}</p>
                  ))}
                </div>
                <div className="space-y-1">
                  <strong>{t("tenantEngine.statutoryBasisLabel")}</strong>
                  {representationDoc.legalStatutoryBasis.map((b, i) => (
                    <p key={i}>• {b}</p>
                  ))}
                </div>
                <div className="space-y-1">
                  <strong>{t("tenantEngine.reliefLabel")}</strong>
                  {representationDoc.demandedRelief.map((r, i) => (
                    <p key={i}>• {r}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
}
