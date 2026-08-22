"use client";

import React, { useState, useMemo } from "react";
import { resolvePinAuthority, PinRoutingResolution } from "@/lib/routing/pin-router";
import { generateRtiApplication } from "@/services/api";
import { GenerateRtiResponse } from "@/types/api";
import { useLanguage } from "@/context/LanguageContext";
import {
  triggerPrintDocument,
  exportRtiApplicationHtml,
  exportEvidenceIndexHtml,
} from "@/lib/pdf/print-export";
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowLeft, ArrowRight, Printer, FileText, Send, Calendar, Clock, MapPin, Building2, HelpCircle, Sparkles, RotateCcw } from "lucide-react";
import { LocationMap } from "@/components/location/LocationMap";

export interface CivicFormState {
  problemDescription: string;
  pinCode: string;
  locality: string;
  dateRange: string;
  ward: string;
  applicantName: string;
  applicantAddress: string;
}

export interface CivicFormFillerProps {
  initialTranscript?: string;
  initialPin?: string;
  onGenerateSuccess?: (app: GenerateRtiResponse) => void;
}

export const CivicFormFiller: React.FC<CivicFormFillerProps> = ({
  initialTranscript = "",
  initialPin = "",
  onGenerateSuccess,
}) => {
  const { t } = useLanguage();

  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<CivicFormState>({
    problemDescription: initialTranscript || "Deep potholes along DB Road, R.S. Puram causing severe traffic slowdowns and accidents.",
    pinCode: initialPin || "641002",
    locality: "DB Road, R.S. Puram",
    dateRange: "January 2026 to Present",
    ward: "",
    applicantName: "A. Kumar",
    applicantAddress: "42, Lawley Road, Coimbatore, Tamil Nadu",
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedApp, setGeneratedApp] = useState<GenerateRtiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Deterministically compute PIN resolution with useMemo
  const pinResolution: PinRoutingResolution | null = useMemo(() => {
    if (form.pinCode && form.pinCode.length === 6) {
      return resolvePinAuthority(form.pinCode, form.problemDescription);
    }
    return null;
  }, [form.pinCode, form.problemDescription]);

  const handleNext = () => {
    setError(null);
    if (step === 1 && !form.problemDescription.trim()) {
      setError(t("ask.requiredFieldsError"));
      return;
    }
    if (step === 2 && (!form.pinCode || form.pinCode.length !== 6)) {
      setError(t("ask.pinPlaceholder"));
      return;
    }
    if (step === 3 && !form.locality.trim()) {
      setError(t("ask.localityPlaceholder"));
      return;
    }
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setStep(1);
    setGeneratedApp(null);
    setError(null);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const payload = {
        issue: form.problemDescription,
        state: pinResolution?.state || "Tamil Nadu",
        district: pinResolution?.district || "Coimbatore",
        localBodyName: pinResolution?.localBodyName || "Coimbatore City Municipal Corporation",
        locality: form.locality,
        ward: form.ward ? `Ward ${form.ward}` : undefined,
        dateRange: form.dateRange,
        sourceIds: [
          pinResolution?.jurisdictionSourceId || "SRC-TN-CCMC-JURISDICTION",
          "SRC-RTI-CENTRAL-2005",
        ],
      };

      const result = await generateRtiApplication(payload);
      setGeneratedApp(result);
      if (onGenerateSuccess) {
        onGenerateSuccess(result);
      }
      setStep(6); // Review & Export step
    } catch (err) {
      setError(err instanceof Error ? err.message : t("ask.genericGenerationError"));
    } finally {
      setIsGenerating(false);
    }
  };

  // PDF Export Handlers
  const handlePrintRti = () => {
    if (!generatedApp) return;
    const html = exportRtiApplicationHtml({
      applicationDate: new Date().toLocaleDateString("en-IN"),
      publicAuthority: pinResolution?.responsibleAuthority || "Coimbatore City Municipal Corporation",
      departmentName: pinResolution?.departmentName,
      pioTitle: pinResolution?.rtiAuthority || "The Public Information Officer",
      applicantName: form.applicantName,
      applicantAddress: form.applicantAddress,
      subject: generatedApp.subject || "Request for Information under RTI Act 2005 (Road Works & Expenditure)",
      problemDescription: generatedApp.applicationBody || form.problemDescription,
      requestedQuestions: generatedApp.questions || [
        "Provide certified copies of the sanctioned estimate and measurement book (MB) records for this work.",
        "Provide names and designations of the junior and assistant executive engineers responsible for supervision.",
        "State the exact defect liability period (DLP) and contact details of the contractor.",
      ],
      periodConcerned: form.dateRange,
      feeAmount: 10,
      paymentMode: "Court Fee Stamp",
      bplStatus: false,
      sourceReferences: [
        pinResolution?.postalSourceId || "SRC-POST-IN-PIN",
        pinResolution?.jurisdictionSourceId || "SRC-TN-CCMC-JURISDICTION",
        "SRC-RTI-CENTRAL-2005",
      ],
      checksum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    });
    triggerPrintDocument(html);
  };

  const handlePrintEvidenceIndex = () => {
    const html = exportEvidenceIndexHtml({
      caseId: "RTI-2026-CCMC-001",
      date: new Date().toLocaleDateString("en-IN"),
      applicantName: form.applicantName,
      authorityName: pinResolution?.responsibleAuthority || "CCMC Engineering Cell",
      evidenceItems: [
        {
          id: "E-1",
          description: "Photographs of pothole damage and unpaved trench cuts on DB Road",
          date: "August 2026",
          fileRef: "IMG_DB_ROAD_01.JPG",
          purpose: "Demonstrates hazardous road surface and lack of periodic maintenance",
        },
        {
          id: "E-2",
          description: "Namma Kovai Civic Grievance Acknowledgement Receipt",
          date: "July 2026",
          fileRef: "CCMC_GRV_8921.PDF",
          purpose: "Proof of prior statutory grievance lodged without resolution",
        },
        {
          id: "E-3",
          description: "India Post PIN Code Jurisdiction Reference (641002 - West Zone)",
          date: "2026-08-20",
          fileRef: "SRC-POST-IN-PIN",
          purpose: "Statutory proof of administrative and municipal jurisdiction",
        },
      ],
    });
    triggerPrintDocument(html);
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-6">
      {/* Step Progress Tracker */}
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-4 text-xs font-semibold text-slate-500 flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-200"}`}>1</span>
          <span className={step >= 1 ? "text-indigo-900 font-bold" : ""}>Problem {step > 1 && "✓"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-200"}`}>2</span>
          <span className={step >= 2 ? "text-indigo-900 font-bold" : ""}>Location {step > 2 && "✓"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 4 ? "bg-indigo-600 text-white" : "bg-slate-200"}`}>3</span>
          <span className={step >= 4 ? "text-indigo-900 font-bold" : ""}>Authority {step > 4 && "✓"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 5 ? "bg-indigo-600 text-white" : "bg-slate-200"}`}>4</span>
          <span className={step >= 5 ? "text-indigo-900 font-bold" : ""}>Period {step > 5 && "✓"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 6 ? "bg-indigo-600 text-white" : "bg-slate-200"}`}>5</span>
          <span className={step >= 6 ? "text-indigo-900 font-bold" : ""}>Ready ○</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Problem Description */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#102A56]">{t("ask.step1Title")}</h3>
            <p className="text-xs text-slate-500">{t("ask.step1Desc")}</p>
          </div>
          <textarea
            value={form.problemDescription}
            onChange={(e) => setForm({ ...form, problemDescription: e.target.value })}
            rows={4}
            className="w-full p-3 bg-white border border-[#BCD7EE] rounded-xl text-sm text-[#172033] focus:outline-none focus:border-indigo-600"
            placeholder={t("ask.problemPlaceholder")}
          />
        </div>
      )}

      {/* STEP 2: PIN Code Entry */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#102A56]">{t("ask.step2Title")}</h3>
            <p className="text-xs text-slate-500">{t("ask.step2Desc")}</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              maxLength={6}
              value={form.pinCode}
              onChange={(e) => setForm({ ...form, pinCode: e.target.value.replace(/\D/g, "") })}
              className="w-40 p-3 bg-white border border-[#BCD7EE] rounded-xl text-lg font-mono font-bold tracking-wider text-[#102A56] text-center focus:outline-none focus:border-indigo-600"
              placeholder={t("ask.pinPlaceholder")}
            />
            <span className="text-xs text-slate-500">{t("ask.demoPinsNotice")}</span>
          </div>

          {pinResolution && (
            <div className={`p-4 rounded-xl text-xs space-y-2 border ${pinResolution.resolved ? "bg-emerald-50/70 border-emerald-300" : "bg-amber-50 border-amber-300"}`}>
              {pinResolution.resolved ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {t("ask.pinLocalityLabel")} {pinResolution.localityName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold">
                      {pinResolution.confidence} CONFIDENCE
                    </span>
                  </div>
                  <p className="text-emerald-800">
                    <strong>{t("ask.pinJurisdictionLabel")}</strong> {pinResolution.localBodyName} {pinResolution.zoneName ? `(${pinResolution.zoneName})` : ""}
                  </p>
                  <p className="text-emerald-800">
                    <strong>{t("ask.responsibleWing")}</strong> {pinResolution.responsibleAuthority}
                  </p>
                </>
              ) : (
                <div className="text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{t("ask.unsupportedPinTitle")}</p>
                    <p>{pinResolution.unsupportedMessage || t("ask.pinResolverInstruction")}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contextual Visual Map Preview */}
          {form.pinCode.length === 6 && (
            <LocationMap
              pinCode={form.pinCode}
              interactive={true}
              heightClass="h-[180px] sm:h-[220px]"
              helperText="Visual confirmation of the issue area. Final administrative jurisdiction remains grounded in statutory rules."
            />
          )}
        </div>
      )}

      {/* STEP 3: Locality & Street Details */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#102A56]">{t("ask.step3Title")}</h3>
            <p className="text-xs text-slate-500">{t("ask.step3Desc")}</p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.localityLabel")} *</label>
              <input
                type="text"
                value={form.locality}
                onChange={(e) => setForm({ ...form, locality: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-xl text-sm"
                placeholder={t("ask.localityPlaceholder")}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.wardLabel")}</label>
              <input
                type="text"
                value={form.ward}
                onChange={(e) => setForm({ ...form, ward: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-xl text-sm"
                placeholder={t("ask.wardPlaceholder")}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Duration / Period */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#102A56]">{t("ask.step4Title")}</h3>
            <p className="text-xs text-slate-500">{t("ask.step4Desc")}</p>
          </div>
          <input
            type="text"
            value={form.dateRange}
            onChange={(e) => setForm({ ...form, dateRange: e.target.value })}
            className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-xl text-sm"
            placeholder={t("ask.dateRangePlaceholder")}
          />
        </div>
      )}

      {/* STEP 5: Applicant Details (Browser-Local Privacy) */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#102A56]">{t("ask.step5Title")}</h3>
            <p className="text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-600 mr-1" />
              <strong>{t("ask.privacyNotice")}</strong> {t("ask.privacyKeptLocal")}
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.applicantNameLabel")}</label>
              <input
                type="text"
                value={form.applicantName}
                onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-xl text-sm"
                placeholder={t("ask.applicantNamePlaceholder")}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t("ask.applicantAddressLabel")}</label>
              <textarea
                value={form.applicantAddress}
                onChange={(e) => setForm({ ...form, applicantAddress: e.target.value })}
                rows={2}
                className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-xl text-sm"
                placeholder={t("ask.applicantAddressPlaceholder")}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Review, Generate, & Official PDF Export */}
      {step === 6 && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs space-y-2">
            <h4 className="font-bold text-sm flex items-center gap-1.5 text-indigo-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t("ask.step6Title")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-indigo-200/60">
              <div><strong>{t("sources.responsibleAuth")}</strong> {pinResolution?.responsibleAuthority || "CCMC Headquarters"}</div>
              <div><strong>{t("ask.pinRtiPioLabel")}</strong> {pinResolution?.rtiAuthority || "Public Information Officer"}</div>
              <div><strong>{t("ask.localityLabel")}:</strong> {form.locality} (PIN {form.pinCode})</div>
              <div><strong>{t("ask.dateRangeLabel")}:</strong> {form.dateRange}</div>
            </div>
          </div>

          {!generatedApp ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <span>{t("ask.generating")}</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t("ask.generateBtn")}</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2">
                <div className="font-bold text-sm flex items-center justify-between">
                  <span>{t("ask.step6Success")}</span>
                  <span className="font-mono text-[11px] bg-emerald-200 px-2 py-0.5 rounded text-emerald-950">
                    Fee: ₹10
                  </span>
                </div>
                <p>{t("ask.deadlineNotice")}</p>
              </div>

              {/* Dedicated Official Export Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handlePrintRti}
                  className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t("ask.exportRtiPdf")}</span>
                </button>

                <button
                  onClick={handlePrintEvidenceIndex}
                  className="p-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t("ask.exportEvidencePdf")}</span>
                </button>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t("ask.appealUnlockNotice")}</span>
                </span>
                <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded">
                  {t("ask.sec71Notice")}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation & Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[#BCD7EE]">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t("ask.btnRestart")}</span>
        </button>

        <div className="flex items-center gap-2">
          {step > 1 && step < 6 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("ask.btnBack")}</span>
            </button>
          )}

          {step < 5 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm"
            >
              <span>{t("ask.btnContinue")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 5 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm"
            >
              <span>{t("ask.btnReview")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
