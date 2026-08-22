"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { generateRtiApplication } from "@/services/api";
import { GenerateRtiResponse } from "@/types/api";
import GeneratedPreview, { ApplicantLocalDetails } from "@/components/rti/GeneratedPreview";
import RtiFeeCalculator from "@/components/RtiFeeCalculator";
import RtiStatutoryTimeline from "@/components/RtiStatutoryTimeline";
import EvidenceCompletenessScore from "@/components/EvidenceCompletenessScore";
import EvidenceOrganizer from "@/components/EvidenceOrganizer";
import { ArrowLeft, Sparkles, AlertCircle, Info, ShieldCheck, Mic, MicOff, Globe, Check } from "lucide-react";
import { ALL_BHARAT_LANGUAGES } from "@/lib/language/languages";
import { BharatLanguageCode } from "@/lib/language/types";
import { translateText, transcribeAudio } from "@/services/language";
import { useLanguage } from "@/context/LanguageContext";

import { resolvePinAuthority, PinRoutingResolution } from "@/lib/routing/pin-router";
import { CivicFormFiller } from "@/components/forms/CivicFormFiller";

const PREFILLED_SCENARIOS = [
  {
    labelKey: "ask.scenario1Label" as const,
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
    labelKey: "ask.scenario2Label" as const,
    issue: "Open storm water drain and broken slab covers near Peelamedu bus stop posing danger to pedestrians.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Avinashi Road, Peelamedu",
    ward: "Ward 35",
    dateRange: "Last 6 Months",
    pinCode: "641004",
  },
  {
    labelKey: "ask.scenario3Label" as const,
    issue: "Road re-tarring work completed 2 months ago is peeling off and damaged after rain; request inspection and MB records.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Cross Cut Road, Gandhipuram",
    ward: "Ward 12",
    dateRange: "FY 2025-26",
    pinCode: "641012",
  },
];

type IssueInputSource = "manual" | "voice" | "prefilled";

export default function AskPage() {
  // Sync with Global Language Context
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

  // Step form state
  const [issue, setIssue] = useState("");
  const [issueInputSource, setIssueInputSource] = useState<IssueInputSource>("manual");
  const [issueInputLanguage, setIssueInputLanguage] = useState<BharatLanguageCode>("en-IN");
  const [pinCode, setPinCode] = useState("641002");
  const [pinResolution, setPinResolution] = useState<PinRoutingResolution | null>(() => resolvePinAuthority("641002", "Deep potholes and unpaved trench cuts"));
  const [state, setState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Coimbatore");
  const [localBodyName, setLocalBodyName] = useState("Coimbatore City Municipal Corporation");
  const [locality, setLocality] = useState("");
  const [ward, setWard] = useState("");
  const [dateRange, setDateRange] = useState("");

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

  // Applicant details (Local browser session memory ONLY — Never sent to API)
  const [applicantName, setApplicantName] = useState("");
  const [applicantAddress, setApplicantAddress] = useState("");

  // Response & UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateRtiResponse | null>(null);
  const [showSuitabilityBanner, setShowSuitabilityBanner] = useState(false);
  const [flowMode, setFlowMode] = useState<"guided" | "direct">("guided");

  const applyScenario = (scenario: typeof PREFILLED_SCENARIOS[0]) => {
    setIssue(scenario.issue);
    setIssueInputSource("prefilled");
    setIssueInputLanguage("en-IN"); // Canonical prefilled scenarios are ALWAYS en-IN
    setState(scenario.state);
    setDistrict(scenario.district);
    setLocalBodyName(scenario.localBodyName);
    setLocality(scenario.locality);
    setWard(scenario.ward);
    setDateRange(scenario.dateRange);
    setError(null);
  };

  const startManualProblem = () => {
    setIssue("");
    setIssueInputSource("manual");
    setIssueInputLanguage(selectedLanguage);
    setError(null);
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

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim() || !locality.trim()) {
      setError(t("ask.requiredFieldsError"));
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // RTI Suitability check: detect subjective "why" or "opinion" questions
    const isOpinionQuery = /why|reason|how come|who responsible/i.test(issue);
    setShowSuitabilityBanner(isOpinionQuery);

    try {
      // Step A: Translate Indic input to canonical English normalized input ONLY IF issueInputLanguage is not en-IN
      let canonicalEnglishIssue = issue;
      if (issueInputLanguage !== "en-IN") {
        const transRes = await translateText(issue, "en-IN", issueInputLanguage);
        if (transRes.fallbackOccurred) {
          setError(t("ask.translationUnavailableError"));
          setLoading(false);
          return;
        }
        canonicalEnglishIssue = transRes.translatedText;
      }

      // STRICT PRIVACY BOUNDARY: Payload contains ONLY civic context
      // Prohibited applicantName and applicantAddress are strictly EXCLUDED
      const response = await generateRtiApplication({
        issue: canonicalEnglishIssue,
        state,
        district,
        localBodyName,
        locality,
        ward: ward || undefined,
        dateRange: dateRange || undefined,
        sourceIds: ["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"],
      });

      setResult(response);
    } catch {
      setResult(null);
      setError(t("ask.genericGenerationError"));
    } finally {
      setLoading(false);
    }
  };

  const applicantLocalDetails: ApplicantLocalDetails = {
    name: applicantName || "[Applicant Name]",
    address: applicantAddress || "[Applicant Address]",
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Header Navigation */}
      <div className="flex items-center justify-between border-b border-[#BCD7EE] pb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#526176] hover:text-[#102A56] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>{t("common.backToHome")}</span>
        </Link>
        <span className="text-xs font-semibold text-[#0369A1] uppercase tracking-wider flex items-center gap-1.5 px-3 py-1 bg-[#E0F2FE] rounded-full border border-[#7DD3FC]">
          <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
          {t("ask.privacyBadge")}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">{t("ask.heading")}</h1>
        <p className="text-sm text-[#526176]">
          {t("ask.subheading")}
        </p>
      </div>

      {/* Workflow Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => setFlowMode("guided")}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            flowMode === "guided"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>{t("ask.modeGuided")}</span>
        </button>
        <button
          type="button"
          onClick={() => setFlowMode("direct")}
          className={`flex-1 py-2 rounded-lg transition-all text-center ${
            flowMode === "direct"
              ? "bg-white text-indigo-950 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>{t("ask.modeDirect")}</span>
        </button>
      </div>

      {flowMode === "guided" ? (
        <CivicFormFiller
          initialTranscript={issueInputSource === "voice" ? issue : undefined}
          initialPin={pinCode || "641002"}
        />
      ) : (
        <>
          {/* Demo Scenario Selectors */}
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
            <p className="text-[11px] text-[#526176]">
              {t("ask.quickScenariosHelp")}
            </p>
          </div>

          {/* Guided RTI Form */}
          <form onSubmit={handleGenerate} className="p-6 sm:p-8 rounded-2xl bg-white border border-[#BCD7EE] shadow-xs space-y-6">
        {/* Bharat Language & Voice Controls */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-sky-900 block">{t("ask.selectLanguageLabel")}</span>
                <span className="text-[11px] text-sky-700 block">{t("ask.sarvamInfoText")}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as BharatLanguageCode)}
                className="px-3 py-1.5 bg-white border border-sky-300 rounded-lg text-xs font-bold text-sky-900 focus:outline-none focus:border-sky-600"
              >
                {ALL_BHARAT_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                disabled={isTranscribing}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  isRecording
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
                title={t("ask.recordVoiceTitle")}
                aria-label={t("ask.recordVoiceAria")}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? `${t("ask.stopRecording")} (${recordingSeconds}s / ${t("ask.recordingMaxSuffix")})` : isTranscribing ? t("ask.transcribing") : t("ask.startRecording")}</span>
              </button>
            </div>
          </div>

          {voiceError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{voiceError}</span>
            </div>
          )}

          {voiceTranscript && (
            <div className="p-3 bg-white border border-sky-300 rounded-lg space-y-2 text-xs">
              <span className="font-bold text-sky-900 block">{t("ask.transcriptReview")}</span>
              <p className="text-slate-800 bg-slate-50 p-2 rounded border border-slate-200">{voiceTranscript}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIssue(voiceTranscript);
                    setIssueInputSource("voice");
                    setIssueInputLanguage(selectedLanguage);
                    setVoiceTranscript("");
                  }}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  {t("ask.useTranscript")}
                </button>
                <button
                  type="button"
                  onClick={() => setVoiceTranscript("")}
                  className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-bold text-xs"
                >
                  {t("ask.discard")}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-[#102A56]">
              {t("ask.problemLabel")} <span className="text-red-500">*</span>
            </label>
            {issueInputSource === "prefilled" && (
              <button
                type="button"
                onClick={startManualProblem}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
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
              if (issueInputSource !== "prefilled") {
                setIssueInputSource("manual");
                setIssueInputLanguage(selectedLanguage);
              }
            }}
            placeholder={t("ask.problemPlaceholder")}
            className={`w-full p-3 border rounded-xl text-sm text-[#172033] focus:outline-none ${
              issueInputSource === "prefilled"
                ? "bg-slate-50 border-[#BCD7EE] cursor-not-allowed"
                : "bg-white border-[#BCD7EE] placeholder-slate-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            }`}
            required
          />
        </div>

        {/* PIN Code Authority Resolver Input & Card */}
        <div className="p-4 bg-indigo-50/50 border border-indigo-200/60 rounded-xl space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-950">
              {t("ask.pinResolverTitle")}
            </label>
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
              {t("ask.pinResolverTag")}
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={pinCode}
              onChange={(e) => handlePinChange(e.target.value)}
              placeholder={t("ask.pinPlaceholder")}
              className="w-36 p-2.5 bg-white border border-indigo-300 rounded-lg text-sm text-[#172033] font-mono font-bold focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
            <div className="text-xs text-indigo-900 flex items-center">
              <span>{t("ask.pinResolverInstruction")}</span>
            </div>
          </div>

          {pinResolution && pinResolution.resolved && (
            <div className="p-3 bg-white border border-indigo-200 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="font-bold text-indigo-950 text-sm">{pinResolution.localBodyName}</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> CONFIDENCE: {pinResolution.confidence}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <div><strong>{t("ask.pinLocalityLabel")}</strong> {pinResolution.localityName}</div>
                <div><strong>{t("ask.pinJurisdictionLabel")}</strong> {pinResolution.district}, {pinResolution.state}</div>
                <div className="sm:col-span-2"><strong>{t("ask.pinResponsibleDeptLabel")}</strong> {pinResolution.responsibleAuthority}</div>
                <div className="sm:col-span-2"><strong>{t("ask.pinRtiPioLabel")}</strong> {pinResolution.rtiAuthority}</div>
              </div>
              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-200">
                <strong>{t("ask.pinStatutoryBasisLabel")}</strong> {pinResolution.reasoning}
              </p>
            </div>
          )}

          {pinResolution && !pinResolution.resolved && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{pinResolution.unsupportedMessage}</span>
            </div>
          )}
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("ask.stateLabel")}</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("ask.districtLabel")}</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("ask.localBodyLabel")}</label>
            <input
              type="text"
              value={localBodyName}
              onChange={(e) => setLocalBodyName(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">
              {t("ask.localityLabel")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder={t("ask.localityPlaceholder")}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("ask.wardLabel")}</label>
            <input
              type="text"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              placeholder={t("ask.wardPlaceholder")}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-bold text-[#102A56]">{t("ask.dateRangeLabel")}</label>
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder={t("ask.dateRangePlaceholder")}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>
        </div>

        {/* Local Applicant Details (Kept strictly in browser session) */}
        <div className="p-4 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0369A1] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            {t("ask.applicantDetailsTitle")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#526176]">{t("ask.applicantNameLabel")}</label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder={t("ask.applicantNamePlaceholder")}
                className="w-full p-2 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#526176]">{t("ask.applicantAddressLabel")}</label>
              <input
                type="text"
                value={applicantAddress}
                onChange={(e) => setApplicantAddress(e.target.value)}
                placeholder={t("ask.applicantAddressPlaceholder")}
                className="w-full p-2 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors shadow-md shadow-indigo-100 disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" />
          <span>{loading ? t("ask.generating") : t("ask.generateBtn")}</span>
        </button>
      </form>
      </>
      )}

      {/* RTI Suitability Banner */}
      {showSuitabilityBanner && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm shadow-xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-blue-950">{t("ask.suitabilityTitle")}</h4>
            <p className="text-blue-900/90 leading-relaxed">
              {t("ask.suitabilityBody")}
            </p>
          </div>
        </div>
      )}

      {/* Generated Result Preview */}
      {result && (
        <div className="space-y-6">
          <GeneratedPreview
            data={result}
            applicantDetails={applicantLocalDetails}
            sources={[]}
            civicContext={{
              issue,
              state,
              district,
              localBodyName,
              locality,
              ward,
              dateRange,
            }}
            targetLanguage={selectedLanguage}
          />

          {/* Evidence Completeness Scorecard */}
          <EvidenceCompletenessScore
            issueDescription={issue}
            locationAndAuthority={`${locality}, ${localBodyName}, ${state}`}
            dateRange={dateRange}
            hasSupportingDocuments={false}
            hasSpecificQuestions={Boolean(result.questions && result.questions.length > 0)}
          />

          {/* Statutory Fee & Payment Mode Calculator */}
          <RtiFeeCalculator
            initialState={state}
            initialAuthority={localBodyName}
          />

          {/* Statutory Timeline Engine */}
          <RtiStatutoryTimeline />

          {/* Client-Side Evidence Organizer */}
          <EvidenceOrganizer />
        </div>
      )}
    </div>
  );
}
