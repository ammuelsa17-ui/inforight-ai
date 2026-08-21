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

const PREFILLED_SCENARIOS = [
  {
    label: "Coimbatore R.S. Puram Potholes",
    issue: "Deep potholes and unpaved trench cuts along DB Road, R.S. Puram causing severe traffic slowdowns and accidents.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "DB Road, R.S. Puram",
    ward: "Ward 23",
    dateRange: "January 2026 to Present",
  },
  {
    label: "Peelamedu Storm Drain Damage",
    issue: "Open storm water drain and broken slab covers near Peelamedu bus stop posing danger to pedestrians.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Avinashi Road, Peelamedu",
    ward: "Ward 35",
    dateRange: "Last 6 Months",
  },
  {
    label: "Gandhipuram Road Re-tarring Inspection",
    issue: "Road re-tarring work completed 2 months ago is peeling off and damaged after rain; request inspection and MB records.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Cross Cut Road, Gandhipuram",
    ward: "Ward 12",
    dateRange: "FY 2025-26",
  },
];

export default function AskPage() {
  // Language & Voice State
  const [selectedLanguage, setSelectedLanguage] = useState<BharatLanguageCode>("en-IN");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Step form state
  const [issue, setIssue] = useState("");
  const [state, setState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Coimbatore");
  const [localBodyName, setLocalBodyName] = useState("Coimbatore City Municipal Corporation");
  const [locality, setLocality] = useState("");
  const [ward, setWard] = useState("");
  const [dateRange, setDateRange] = useState("");

  // Applicant details (Local browser session memory ONLY — Never sent to API)
  const [applicantName, setApplicantName] = useState("");
  const [applicantAddress, setApplicantAddress] = useState("");

  // Response & UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateRtiResponse | null>(null);
  const [showSuitabilityBanner, setShowSuitabilityBanner] = useState(false);

  const applyScenario = (scenario: typeof PREFILLED_SCENARIOS[0]) => {
    setIssue(scenario.issue);
    setState(scenario.state);
    setDistrict(scenario.district);
    setLocalBodyName(scenario.localBodyName);
    setLocality(scenario.locality);
    setWard(scenario.ward);
    setDateRange(scenario.dateRange);
    setError(null);
  };

  const startVoiceRecording = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        alert("Voice recording is not supported in this browser environment.");
        return;
      }
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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setIsTranscribing(true);
        try {
          const res = await transcribeAudio(audioBlob, selectedLanguage);
          setVoiceTranscript(res.transcript);
        } catch {
          setVoiceTranscript("Voice transcription error. Please try again or type text.");
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
      alert("Microphone permission denied or unsupported browser.");
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
      setError("Please describe the civic problem and enter the locality.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // RTI Suitability check: detect subjective "why" or "opinion" questions
    const isOpinionQuery = /why|reason|how come|who responsible/i.test(issue);
    setShowSuitabilityBanner(isOpinionQuery);

    try {
      // Step A: Translate Indic input to canonical English normalized input if non-English
      let canonicalEnglishIssue = issue;
      if (selectedLanguage !== "en-IN") {
        const transRes = await translateText(issue, "en-IN", selectedLanguage);
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
    } catch (err) {
      setResult(null);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate the RTI application. Please try again."
      );
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
          <span>Back to Home</span>
        </Link>
        <span className="text-xs font-semibold text-[#0369A1] uppercase tracking-wider flex items-center gap-1.5 px-3 py-1 bg-[#E0F2FE] rounded-full border border-[#7DD3FC]">
          <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
          Applicant identity fields & evidence files strictly excluded
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">Draft Your Record-Based RTI Application</h1>
        <p className="text-sm text-[#526176]">
          Convert your civic road complaint into clear, record-based requests for official government records.
        </p>
      </div>

      {/* Demo Scenario Selectors */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#526176] uppercase tracking-wider">
          Quick Prefilled Scenarios (Coimbatore)
        </label>
        <div className="flex flex-wrap gap-2">
          {PREFILLED_SCENARIOS.map((sc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyScenario(sc)}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#BCD7EE] text-xs font-semibold text-[#102A56] hover:bg-[#F4F9FF] hover:border-[#4F46E5] transition-colors shadow-xs"
            >
              {sc.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-[#526176]">
          Demo inputs are hypothetical. Verify the locality, ward and date range before filing.
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
                <span className="text-xs font-bold text-sky-900 block">Select Input Language (22 Scheduled Languages)</span>
                <span className="text-[11px] text-sky-700 block">Sarvam AI formal translation normalizes your query to canonical English</span>
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
                title="Record voice input in selected language"
                aria-label="Voice input recording"
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? `Stop (${recordingSeconds}s / 30s max)` : isTranscribing ? "Transcribing..." : "Voice Input"}</span>
              </button>
            </div>
          </div>

          {voiceTranscript && (
            <div className="p-3 bg-white border border-sky-300 rounded-lg space-y-2 text-xs">
              <span className="font-bold text-sky-900 block">Voice Transcript Review (Saaras v3 STT):</span>
              <p className="text-slate-800 bg-slate-50 p-2 rounded border border-slate-200">{voiceTranscript}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIssue(voiceTranscript);
                    setVoiceTranscript("");
                  }}
                  className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700 flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Use Transcript</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVoiceTranscript("")}
                  className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded text-[11px] font-semibold hover:bg-slate-300"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#102A56]">
            1. Describe the Civic Road Problem <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="E.g., Deep potholes and broken pavement along DB Road near R.S. Puram causing traffic congestion and accidents."
            className="w-full p-3 bg-white border border-[#BCD7EE] rounded-xl text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            required
          />
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-bold text-[#102A56]">Local Body Name</label>
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
              Locality / Road Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="E.g., DB Road, R.S. Puram"
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A56]">Ward Number (Optional)</label>
            <input
              type="text"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              placeholder="E.g., Ward 23"
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-bold text-[#102A56]">Date Range (Optional)</label>
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder="E.g., January 2026 to Present"
              className="w-full p-2.5 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>
        </div>

        {/* Local Applicant Details (Kept strictly in browser session) */}
        <div className="p-4 rounded-xl bg-[#F4F9FF] border border-[#BCD7EE] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0369A1] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            Applicant details — kept in this browser session
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#526176]">Applicant Name</label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="E.g., K. Harsha"
                className="w-full p-2 bg-white border border-[#BCD7EE] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#526176]">Applicant Address</label>
              <input
                type="text"
                value={applicantAddress}
                onChange={(e) => setApplicantAddress(e.target.value)}
                placeholder="E.g., 42 R.S. Puram, Coimbatore - 641002"
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
          <span>{loading ? "Generating Record Requests..." : "Generate RTI Application"}</span>
        </button>
      </form>

      {/* RTI Suitability Banner */}
      {showSuitabilityBanner && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm shadow-xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-blue-950">RTI Suitability Guidance</h4>
            <p className="text-blue-900/90 leading-relaxed">
              RTI generally requests existing official records rather than explanations or subjective opinions. We converted your concern into requests for work orders, estimates, Measurement Book (MB) entries, and expenditure records.
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
