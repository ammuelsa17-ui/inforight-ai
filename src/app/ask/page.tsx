"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { generateRtiApplication } from "@/services/api";
import { GenerateRtiResponse } from "@/types/api";
import GeneratedPreview from "@/components/rti/GeneratedPreview";
import RtiFeeCalculator from "@/components/RtiFeeCalculator";
import RtiStatutoryTimeline from "@/components/RtiStatutoryTimeline";
import EvidenceOrganizer from "@/components/EvidenceOrganizer";
import {
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Mic,
  MicOff,
  Globe,
  Check,
  Printer,
  FileText,
  Building,
} from "lucide-react";
import { ALL_BHARAT_LANGUAGES } from "@/lib/language/languages";
import { BharatLanguageCode } from "@/lib/language/types";
import { translateText, transcribeAudio } from "@/services/language";
import { useLanguage } from "@/context/LanguageContext";

import { resolvePinAuthority, PinRoutingResolution } from "@/lib/routing/pin-router";
import { planCitizenAction, ActionPlan } from "@/lib/triage/action-planner";
import {
  generateRepresentationDocument,
  exportRepresentationHtml,
  RepresentationData,
} from "@/lib/templates/representation-generator";
import { triggerPrintDocument } from "@/lib/pdf/print-export";
import { CivicFormFiller } from "@/components/forms/CivicFormFiller";
import { WhyThisResultPanel } from "@/components/trust/WhyThisResultPanel";
import { PlainLanguageExplainer } from "@/components/explainer/PlainLanguageExplainer";
import { SubmissionTracker } from "@/components/tracker/SubmissionTracker";
import { ALL_STATES_AND_UTS } from "@/lib/location/location-context";

const PREFILLED_SCENARIOS = [
  {
    labelKey: "ask.scenario1Label" as const,
    domain: "CIVIC_RTI",
    issue: "Deep potholes and unpaved trench cuts along DB Road, R.S. Puram causing severe traffic slowdowns and accidents.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "DB Road, R.S. Puram",
    ward: "Ward 23",
    dateRange: "January 2026 to Present",
    pinCode: "641002",
  },
  {
    labelKey: "ask.scenarioTenant" as const,
    domain: "TENANT",
    issue: "Landlord is refusing to refund my security deposit of ₹40,000 after 2 months of vacating the apartment in R.S. Puram.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "R.S. Puram",
    ward: "Ward 23",
    dateRange: "June 2026 to Present",
    pinCode: "641002",
  },
  {
    labelKey: "ask.scenarioConsumer" as const,
    domain: "CONSUMER",
    issue: "E-commerce platform delivered a defective electronic product and rejected refund within the 7-day warranty window.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Peelamedu",
    ward: "Ward 35",
    dateRange: "July 2026",
    pinCode: "641004",
  },
  {
    labelKey: "ask.scenarioWorkplace" as const,
    domain: "WORKPLACE",
    issue: "Employer withheld 2 months of earned wages and has not issued relieving letter following resignation.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Gandhipuram",
    ward: "Ward 12",
    dateRange: "May - July 2026",
    pinCode: "641012",
  },
];

type IssueInputSource = "manual" | "voice" | "prefilled";

export default function AskPage() {
  // Global Language Context
  const { selectedLanguage, setSelectedLanguage, t } = useLanguage();

  // Voice State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Form state
  const [issue, setIssue] = useState("");
  const [issueInputSource, setIssueInputSource] = useState<IssueInputSource>("manual");
  const [issueInputLanguage, setIssueInputLanguage] = useState<BharatLanguageCode>("en-IN");
  const [pinCode, setPinCode] = useState("641002");
  const [pinResolution, setPinResolution] = useState<PinRoutingResolution | null>(() =>
    resolvePinAuthority("641002", "Deep potholes and unpaved trench cuts")
  );
  const [state, setState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Coimbatore");
  const [localBodyName, setLocalBodyName] = useState("Coimbatore City Municipal Corporation");
  const [locality, setLocality] = useState("");
  const [ward, setWard] = useState("");
  const [dateRange, setDateRange] = useState("");

  // Applicant details (Stored purely in browser local state — NEVER sent to external LLMs)
  const [applicantName, setApplicantName] = useState("");
  const [applicantAddress, setApplicantAddress] = useState("");

  // Response & UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateRtiResponse | null>(null);
  const [representationDoc, setRepresentationDoc] = useState<RepresentationData | null>(null);
  const [flowMode, setFlowMode] = useState<"planner" | "guided">("planner");

  // Dynamic Unified Action Plan
  const actionPlan: ActionPlan = useMemo(() => {
    return planCitizenAction(issue || "Describe a civic or legal dispute", pinCode, state, district);
  }, [issue, pinCode, state, district]);

  const handlePinChange = (val: string) => {
    setPinCode(val);
    if (val.trim().length === 6) {
      const res = resolvePinAuthority(val, issue);
      setPinResolution(res);
      if (res.resolved) {
        if (res.state) setState(res.state);
        if (res.district) setDistrict(res.district);
        if (res.localBodyName) setLocalBodyName(res.localBodyName);
      }
    } else {
      setPinResolution(null);
    }
  };

  const applyScenario = (scenario: typeof PREFILLED_SCENARIOS[0]) => {
    setIssue(scenario.issue);
    setIssueInputSource("prefilled");
    setIssueInputLanguage("en-IN");
    setState(scenario.state);
    setDistrict(scenario.district);
    setLocalBodyName(scenario.localBodyName);
    setLocality(scenario.locality);
    setWard(scenario.ward);
    setDateRange(scenario.dateRange);
    setPinCode(scenario.pinCode);
    const res = resolvePinAuthority(scenario.pinCode, scenario.issue);
    setPinResolution(res);
    setResult(null);
    setRepresentationDoc(null);
    setError(null);
  };

  const startManualProblem = () => {
    setIssue("");
    setIssueInputSource("manual");
    setIssueInputLanguage(selectedLanguage);
    setError(null);
    setResult(null);
    setRepresentationDoc(null);
  };

  const startVoiceRecording = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setVoiceError(t("ask.voiceUnsupported"));
        return;
      }
      setVoiceError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setRecordingSeconds(0);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        if (timerRef.current) clearInterval(timerRef.current);
        const recordedMimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
        const audioBlob = new Blob(audioChunksRef.current, { type: recordedMimeType });
        setIsTranscribing(true);
        try {
          const res = await transcribeAudio(audioBlob, selectedLanguage);
          setVoiceTranscript(res.transcript);
          setVoiceError(null);
        } catch {
          setVoiceTranscript("");
          setVoiceError(t("ask.transcriptionError"));
        } finally {
          setIsTranscribing(false);
          setRecordingSeconds(0);
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setRecordingSeconds(seconds);
        if (seconds >= 30) {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }
      }, 1000);
    } catch {
      setVoiceError(t("ask.microphoneDenied"));
    }
  };

  const stopVoiceRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const applyVoiceTranscript = () => {
    if (voiceTranscript.trim()) {
      setIssue(voiceTranscript);
      setIssueInputSource("voice");
      setIssueInputLanguage(selectedLanguage);
      setVoiceTranscript("");
      setVoiceError(null);
    }
  };

  // Generate either RTI or Specific Legal Representation
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!issue.trim()) {
      setError(t("ask.describeProblemRequired"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (actionPlan.domain === "CIVIC_RTI") {
        // RTI Generation Flow
        let processedIssue = issue;
        if (issueInputSource !== "prefilled" && issueInputLanguage !== "en-IN") {
          try {
            const translationResult = await translateText(issue, issueInputLanguage, "en-IN");
            processedIssue = translationResult.translatedText;
          } catch {
            setError(t("ask.translationUnavailable"));
            setLoading(false);
            return;
          }
        }

        const res = await generateRtiApplication({
          issue: processedIssue,
          state,
          district,
          localBodyName: pinResolution?.responsibleAuthority || localBodyName,
          locality: locality || "R.S. Puram",
          ward,
          dateRange,
          sourceIds: [
            pinResolution?.postalSourceId || "SRC-POST-IN-PIN",
            pinResolution?.jurisdictionSourceId || "SRC-TN-CCMC-JURISDICTION",
          ],
        });
        setResult(res);
        setRepresentationDoc(null);
      } else {
        // Deterministic Representation Generator (Tenant / Consumer / Workplace)
        const doc = generateRepresentationDocument({
          documentType: actionPlan.availableDocumentType,
          problemDescription: issue,
          locality: locality || district || "Coimbatore",
          state,
          applicantName: applicantName || "Citizen Applicant",
          applicantAddress: applicantAddress || "Address as per record",
        });
        setRepresentationDoc(doc);
        setResult(null);
      }
    } catch {
      setError(t("ask.genericGenerationError"));
    } finally {
      setLoading(false);
    }
  };

  const handlePrintRepresentation = () => {
    if (representationDoc) {
      const html = exportRepresentationHtml(representationDoc);
      triggerPrintDocument(html);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#526176] hover:text-[#102A56] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>

        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-mono text-[11px] font-bold rounded-full border border-indigo-200 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>{t("ask.actionPlannerTitle")}</span>
        </span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56] tracking-tight">
          {t("ask.pageTitle")}
        </h1>
        <p className="text-sm text-[#526176] mt-1 font-medium">
          {t("ask.pageSubtitle")}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => setFlowMode("planner")}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            flowMode === "planner"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>{t("planner.tabPlanner")}</span>
        </button>
        <button
          type="button"
          onClick={() => setFlowMode("guided")}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            flowMode === "guided"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>{t("planner.tabGuided")}</span>
        </button>
      </div>

      {flowMode === "guided" ? (
        <CivicFormFiller
          initialTranscript={issueInputSource === "voice" ? issue : undefined}
          initialPin={pinCode || "641002"}
        />
      ) : (
        <div className="space-y-6">
          {/* Quick Scenario Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#526176] uppercase tracking-wider">
              {t("ask.quickScenariosLabel")}
            </label>
            <div className="flex flex-wrap gap-2">
              {PREFILLED_SCENARIOS.map((sc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyScenario(sc)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#BCD7EE] text-xs font-semibold text-[#102A56] hover:bg-[#F4F9FF] hover:border-[#4F46E5] transition-colors shadow-xs"
                >
                  {t(sc.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Citizen Input Box */}
          <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-4">
            {/* Language & Voice Banner */}
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-bold text-sky-950">{t("ask.selectLanguageLabel")}</span>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as BharatLanguageCode)}
                className="p-1.5 bg-white border border-sky-300 rounded-lg text-xs font-semibold text-slate-800"
              >
                {ALL_BHARAT_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Problem Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#102A56]">
                  {t("ask.problemLabel")}
                </label>
                {issueInputSource === "prefilled" && (
                  <button
                    type="button"
                    onClick={startManualProblem}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline"
                  >
                    {t("ask.writeOwnProblem")}
                  </button>
                )}
              </div>

              <textarea
                rows={3}
                value={issue}
                readOnly={issueInputSource === "prefilled"}
                onChange={(e) => {
                  setIssue(e.target.value);
                  setIssueInputSource("manual");
                  setIssueInputLanguage(selectedLanguage);
                }}
                placeholder={t("ask.problemPlaceholder")}
                className="w-full p-3 bg-[#F4F9FF] border border-[#BCD7EE] focus:border-[#4F46E5] rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Pan-India Location Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">{t("ask.stateLabel")}</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2 bg-[#F4F9FF] border border-[#BCD7EE] font-semibold text-xs rounded-lg text-slate-900"
                >
                  {ALL_STATES_AND_UTS.map((s) => (
                    <option key={s.code} value={s.name}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">{t("ask.districtLabel")}</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder={t("consumerEngine.districtPlaceholder")}
                  className="w-full p-2 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">{t("ask.pinCodeLabel")}</label>
                <input
                  type="text"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => handlePinChange(e.target.value)}
                  placeholder={t("consumerEngine.pinPlaceholder")}
                  className="w-full p-2 bg-[#F4F9FF] border border-[#BCD7EE] font-mono font-bold text-xs text-center rounded-lg text-slate-900"
                />
              </div>
            </div>

            {/* Voice Control Buttons */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                {isRecording ? (
                  <button
                    type="button"
                    onClick={stopVoiceRecording}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-1.5 animate-pulse"
                  >
                    <MicOff className="w-3.5 h-3.5" />
                    <span>{t("ask.btnStopRecording")} ({recordingSeconds}s)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startVoiceRecording}
                    className="px-3 py-1.5 bg-white border border-[#BCD7EE] hover:bg-sky-50 text-indigo-900 font-bold rounded-lg flex items-center gap-1.5 shadow-2xs"
                  >
                    <Mic className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{t("ask.btnStartVoice")}</span>
                  </button>
                )}

                {isTranscribing && (
                  <span className="text-[11px] text-slate-500 font-medium">{t("ask.transcribingText")}</span>
                )}
              </div>
            </div>

            {voiceTranscript && (
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-indigo-950 block">{t("ask.voiceTranscriptLabel")}:</span>
                <p className="text-slate-800">{voiceTranscript}</p>
                <button
                  type="button"
                  onClick={applyVoiceTranscript}
                  className="px-3 py-1 bg-indigo-600 text-white font-bold rounded-lg text-xs"
                >
                  {t("ask.btnUseTranscript")}
                </button>
              </div>
            )}

            {voiceError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{voiceError}</span>
              </div>
            )}
          </div>

          {/* UNIFIED ACTION PLANNER DISPLAY */}
          {issue.trim().length > 10 && (
            <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-5">
              {/* Domain & Recommended Route */}
              <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap border-b border-[#BCD7EE] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                    {t("ask.recommendedRoute")}
                  </span>
                  <h3 className="text-base font-extrabold text-[#102A56]">
                    {actionPlan.recommendedAction}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-indigo-100 text-indigo-900 border border-indigo-300">
                  {actionPlan.domain.replace(/_/g, " ")}
                </span>
              </div>

              {/* Problem Understood */}
              <div className="text-xs text-slate-700 space-y-1">
                <strong className="text-[#102A56] block">{t("ask.problemUnderstoodTitle")}:</strong>
                <p className="leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {actionPlan.problemUnderstood}
                </p>
              </div>

              {/* Why This Action */}
              <div className="space-y-1.5 text-xs">
                <strong className="text-[#102A56] block">{t("ask.whyThisRoute")}:</strong>
                <ul className="space-y-1 text-slate-700">
                  {actionPlan.whyThisAction.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
                {actionPlan.whyNotOtherRoutes && (
                  <p className="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200 mt-2 font-medium">
                    ℹ️ <strong>{t("planner.legalDistinction")}</strong> {actionPlan.whyNotOtherRoutes}
                  </p>
                )}
              </div>

              {/* Verified Authority Card */}
              <div className="p-4 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#102A56] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-indigo-600" />
                    {t("planner.verifiedAuthTitle")}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {actionPlan.authority.confidence} CONFIDENCE
                  </span>
                </div>
                <div className="text-slate-800 font-semibold">{actionPlan.authority.name}</div>
                {actionPlan.authority.department && (
                  <div className="text-[11px] text-slate-600">{actionPlan.authority.department}</div>
                )}
              </div>

              {/* Evidence Checklist */}
              <div className="space-y-1.5 text-xs">
                <strong className="text-[#102A56] block">{t("ask.evidenceRequired")}:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {actionPlan.evidenceRequired.map((ev, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2">
                      <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                        E{idx + 1}
                      </span>
                      <span className="text-slate-800 text-[11px]">{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plain-Language Explainer */}
              <PlainLanguageExplainer
                custom={{
                  term: actionPlan.statutoryDeadline.basis,
                  whatItMeans: actionPlan.statutoryDeadline.plainLanguageMeaning,
                  whatYouShouldDo: actionPlan.statutoryDeadline.nextAction,
                }}
              />

              {/* Why This Result Panel */}
              <WhyThisResultPanel
                title={actionPlan.recommendedAction}
                resultSummary={`InfoRight classified this dispute under ${actionPlan.domain.replace(/_/g, " ")} based on statutory provisions.`}
                confidence={actionPlan.confidence}
                reasons={actionPlan.whyThisAction}
                officialSources={actionPlan.sourceReferences.map((id) => ({
                  id,
                  name: "Verified Legal & Government Gazette Repository",
                  url: "/sources",
                }))}
              />

              {/* Generate Document Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  disabled={loading}
                  className="w-full p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>{loading ? "Preparing Verified Legal Document..." : t("ask.generateDocBtn")}</span>
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* GENERATED REPRESENTATION DOCUMENT DISPLAY */}
          {representationDoc && (
            <div className="p-6 rounded-2xl bg-white border border-[#BCD7EE] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h4 className="text-sm font-bold text-[#102A56]">{representationDoc.title}</h4>
                    <span className="text-[11px] text-slate-500">Statutory Notice Period: {representationDoc.responseTimelineDays} Days</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrintRepresentation}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t("planner.printPdf")}</span>
                  </button>
                </div>
              </div>

              {/* Document Text Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-sans text-xs text-slate-900 leading-relaxed max-h-[350px] overflow-y-auto">
                <div className="font-bold text-center uppercase tracking-wide text-[#102A56] pb-2 border-b border-slate-200">
                  {representationDoc.title}
                </div>
                <div>
                  <strong>{t("planner.toLabel")}</strong> {representationDoc.recipientTitle}, {representationDoc.recipientOrg} ({representationDoc.recipientAddress})
                </div>
                <div>
                  <strong>{t("planner.subjectLabel")}</strong> {representationDoc.subject}
                </div>
                <div className="space-y-1">
                  <strong>{t("planner.factsLabel")}</strong>
                  {representationDoc.factsAndGrievance.map((f, i) => (
                    <p key={i}>• {f}</p>
                  ))}
                </div>
                <div className="space-y-1">
                  <strong>{t("planner.statutoryBasisLabel")}</strong>
                  {representationDoc.legalStatutoryBasis.map((b, i) => (
                    <p key={i}>• {b}</p>
                  ))}
                </div>
                <div className="space-y-1">
                  <strong>{t("planner.reliefLabel")}</strong>
                  {representationDoc.demandedRelief.map((r, i) => (
                    <p key={i}>• {r}</p>
                  ))}
                </div>
              </div>

              {/* Submission & Follow-Up Tracker */}
              <SubmissionTracker
                initialData={{
                  caseId: "REP-2026-CURRENT",
                  status: "READY_TO_SUBMIT",
                  generatedDate: "2026-08-22",
                  statutoryDaysLimit: representationDoc.responseTimelineDays,
                  statutoryBasis: representationDoc.legalStatutoryBasis[0] || "Statutory Legal Notice",
                }}
              />
            </div>
          )}

          {/* GENERATED RTI APPLICATION DISPLAY */}
          {result && (
            <div className="space-y-6">
              <GeneratedPreview
                data={result}
                applicantDetails={{
                  name: applicantName,
                  address: applicantAddress,
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RtiFeeCalculator
                  initialState={state}
                  initialAuthority={pinResolution?.responsibleAuthority || localBodyName}
                />
                <RtiStatutoryTimeline initialFilingDate="2026-08-22" />
              </div>

              <EvidenceOrganizer />

              {/* Submission & Follow-Up Tracker */}
              <SubmissionTracker
                initialData={{
                  caseId: "RTI-2026-CURRENT",
                  status: "READY_TO_SUBMIT",
                  generatedDate: "2026-08-22",
                  statutoryDaysLimit: 30,
                  statutoryBasis: "Section 7(1) of the Right to Information Act, 2005",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
