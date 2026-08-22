"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FallbackBanner from "./FallbackBanner";
import TrustPanel, { SourceCardInfo } from "./TrustPanel";
import DocumentActions from "./DocumentActions";
import { CheckCircle2, AlertCircle, FileText, MapPin, Globe, Volume2, Loader2 } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { BharatLanguageCode } from "@/lib/language/types";
import { supportsTTS, getLanguage } from "@/lib/language/languages";
import { translateText, speakText } from "@/services/language";
import { exportRtiApplicationHtml, triggerPrintDocument } from "@/lib/pdf/print-export";

export interface GeneratedRtiData {
  mode: "ai" | "fallback";
  subject: string;
  applicationBody: string;
  questions: string[];
  authority: {
    designation: "Public Information Officer";
    organization: string;
    state: string;
    verified: boolean;
  };
  citationIds: string[];
  validation: {
    schemaValid: boolean;
    citationsValid: boolean;
    questionCount: number;
    applicantDataSentToAI: false;
  };
  warning?: string;
}

export interface ApplicantLocalDetails {
  name: string;
  address: string;
  phone?: string;
  email?: string;
}

interface GeneratedPreviewProps {
  data: GeneratedRtiData;
  applicantDetails?: ApplicantLocalDetails;
  sources?: SourceCardInfo[];
  civicContext?: {
    issue?: string;
    state?: string;
    district?: string;
    localBodyName?: string;
    locality?: string;
    ward?: string;
    dateRange?: string;
  };
  targetLanguage?: BharatLanguageCode;
}

export default function GeneratedPreview({
  data,
  applicantDetails,
  sources = [],
  civicContext,
  targetLanguage = "en-IN",
}: GeneratedPreviewProps) {
  const { t } = useLanguage();
  const { addCase } = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState(data.subject);
  const [editedBody, setEditedBody] = useState(data.applicationBody);
  const [editedQuestions, setEditedQuestions] = useState<string[]>([...data.questions]);
  const [isSaved, setIsSaved] = useState(false);

  // Bharat Language Translation & TTS state
  const [activeDisplayMode, setActiveDisplayMode] = useState<"canonical" | "translated">("canonical");
  const [translatedSubject, setTranslatedSubject] = useState("");
  const [translatedBody, setTranslatedBody] = useState("");
  const [translatedQuestions, setTranslatedQuestions] = useState<string[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationDisclaimer, setTranslationDisclaimer] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleFetchTranslation = async () => {
    if (targetLanguage === "en-IN") return;
    setIsTranslating(true);
    setTranslationDisclaimer(null);

    try {
      const subjectRes = await translateText(editedSubject, targetLanguage, "en-IN");
      const bodyRes = await translateText(editedBody, targetLanguage, "en-IN");

      const qResults = await Promise.all(
        editedQuestions.map((q) => translateText(q, targetLanguage, "en-IN"))
      );

      const fallbackTriggered =
        subjectRes.fallbackOccurred ||
        bodyRes.fallbackOccurred ||
        qResults.some((r) => r.fallbackOccurred);

      if (fallbackTriggered) {
        setTranslationDisclaimer(
          subjectRes.disclaimer ||
            "Multilingual translation service unavailable. Displaying official source-grounded English version."
        );
        setActiveDisplayMode("canonical");
      } else {
        setTranslatedSubject(subjectRes.translatedText);
        setTranslatedBody(bodyRes.translatedText);
        setTranslatedQuestions(qResults.map((r) => r.translatedText));
        setTranslationDisclaimer(
          subjectRes.disclaimer ||
            "Translated from canonical English legal draft using Sarvam AI Formal Legal Translation."
        );
        setActiveDisplayMode("translated");
      }
    } catch {
      setTranslationDisclaimer("Multilingual translation service unavailable. Displaying official source-grounded English version.");
      setActiveDisplayMode("canonical");
    } finally {
      setIsTranslating(false);
    }
  };

  const currentSegmentIndexRef = React.useRef<number>(0);
  const audioSegmentsRef = React.useRef<string[]>([]);
  const mimeTypeRef = React.useRef<string>("audio/wav");

  const handlePlaySarvamAudio = async () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
      return;
    }

    setAudioError(null);
    try {
      const textToSpeak = `${editedSubject}. ${editedQuestions.join(". ")}`;
      const res = await speakText(textToSpeak, targetLanguage);

      const segments = res.audioSegmentsBase64 && res.audioSegmentsBase64.length > 0
        ? res.audioSegmentsBase64
        : [res.audioBase64];

      if (!segments[0]) {
        throw new Error("No audio returned from speech synthesizer.");
      }

      audioSegmentsRef.current = segments;
      mimeTypeRef.current = res.mimeType || "audio/wav";
      currentSegmentIndexRef.current = 0;

      const playNextSegment = (index: number) => {
        if (index >= audioSegmentsRef.current.length) {
          setIsPlayingAudio(false);
          audioRef.current = null;
          return;
        }

        const b64 = audioSegmentsRef.current[index];
        const audioSrc = `data:${mimeTypeRef.current};base64,${b64}`;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;

        audio.onended = () => {
          currentSegmentIndexRef.current = index + 1;
          playNextSegment(index + 1);
        };
        audio.onerror = () => {
          setIsPlayingAudio(false);
          setAudioError("Audio playback error.");
          audioRef.current = null;
        };

        setIsPlayingAudio(true);
        audio.play().catch(() => {
          setIsPlayingAudio(false);
          setAudioError("Audio playback failed to start.");
        });
      };

      playNextSegment(0);
    } catch {
      setAudioError("Speech synthesis unavailable for this language.");
      setIsPlayingAudio(false);
    }
  };

  const handleSaveToDashboard = () => {
    if (isSaved) return;

    try {
      addCase({
        issue: editedSubject || civicContext?.issue || data.subject,
        state: civicContext?.state || data.authority.state || "Tamil Nadu",
        district: civicContext?.district || "Coimbatore",
        localBodyName: civicContext?.localBodyName || data.authority.organization,
        locality: civicContext?.locality || "Local Area",
        ward: civicContext?.ward,
        dateRange: civicContext?.dateRange,
        sourceIds: data.citationIds || [],
        applicantName: applicantDetails?.name !== "[Applicant Name]" ? applicantDetails?.name : undefined,
        applicantAddress: applicantDetails?.address !== "[Applicant Address]" ? applicantDetails?.address : undefined,
        aiResponse: {
          ...data,
          subject: editedSubject,
          applicationBody: editedBody,
          questions: editedQuestions,
        },
      });
      setIsSaved(true);
    } catch {
      setIsSaved(true);
    }
  };

  const handleQuestionChange = (index: number, val: string) => {
    const next = [...editedQuestions];
    next[index] = val;
    setEditedQuestions(next);
  };

  const fullTextToCopy = `To,
The Public Information Officer (PIO)
${data.authority.organization}
${data.authority.state}

{t("preview.subjectLabel")}: ${editedSubject}

Respected Sir/Madam,

${editedBody}

Under Section 6(1) of the Right to Information Act, 2005, I request you to kindly provide certified copies of the following official government records:

${editedQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Applicant Details (Local):
Name: ${applicantDetails?.name || "[Applicant Name]"}
Address: ${applicantDetails?.address || "[Applicant Address]"}`;

  const handleDownloadPdf = () => {
    const html = exportRtiApplicationHtml({
      applicationDate: new Date().toLocaleDateString("en-IN"),
      publicAuthority: data.authority.organization,
      pioTitle: "The Public Information Officer (PIO)",
      applicantName: applicantDetails?.name || "Citizen Applicant",
      applicantAddress: applicantDetails?.address || "Address provided with original submission",
      subject: editedSubject,
      problemDescription: editedBody,
      requestedQuestions: editedQuestions,
      periodConcerned: civicContext?.dateRange || "Relevant Statutory Period",
      feeAmount: 10,
      paymentMode: "Court Fee Stamp / Indian Postal Order",
      bplStatus: false,
      sourceReferences: data.citationIds || ["SRC-RTI-CENTRAL-2005"],
    });
    triggerPrintDocument(html);
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Banner for Fallback or Verification Warning */}
      <FallbackBanner
        mode={data.mode}
        warning={data.warning}
        verifiedAuthority={data.authority.verified}
      />

      {/* Bharat Language Presentation Banner */}
      {targetLanguage !== "en-IN" && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-600" />
              <div>
                <span className="text-xs font-bold text-sky-900 block">
                  Bharat Language Presentation ({getLanguage(targetLanguage)?.nativeName || targetLanguage})
                </span>
                <span className="text-[11px] text-sky-700 block">
                  {t("preview.canonicalNotice")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleFetchTranslation}
                disabled={isTranslating}
                className="px-3 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-bold hover:bg-sky-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isTranslating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
                <span>{activeDisplayMode === "translated" ? "Refresh Translation" : "Translate Guidance"}</span>
              </button>

              {supportsTTS(targetLanguage) && (
                <button
                  onClick={handlePlaySarvamAudio}
                  disabled={isPlayingAudio}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  aria-label={t("preview.speakBtn")}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? "Playing Voice..." : "Listen Voice"}</span>
                </button>
              )}
            </div>
          </div>

          {activeDisplayMode === "translated" && (
            <div className="flex items-center justify-between border-t border-sky-200 pt-2 text-[11px] text-sky-800">
              <span className="font-semibold">{translationDisclaimer}</span>
              <button
                onClick={() => setActiveDisplayMode("canonical")}
                className="text-sky-900 underline font-bold"
              >
                {t("preview.viewCanonicalOriginal")}
              </button>
            </div>
          )}

          {audioError && <p className="text-xs text-red-600 font-semibold">{audioError}</p>}
        </div>
      )}

      {/* Action Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#BCD7EE] shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-[#102A56]">{t("preview.generatedTitle")}</h3>
          <p className="text-xs text-[#526176]">
            {t("preview.generatedSubtitle")}
          </p>
        </div>
        <DocumentActions
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          onCopy={() => navigator.clipboard.writeText(fullTextToCopy)}
          onSaveToDashboard={handleSaveToDashboard}
          onDownloadPdf={handleDownloadPdf}
          isSaved={isSaved}
        />
      </div>

      {/* Printable Document Container */}
      <div className="w-full bg-white border border-[#BCD7EE] p-8 rounded-xl shadow-xs space-y-6 text-[#172033] print:border-none print:shadow-none print:p-0 print:text-black">
        {/* Document Authority Header */}
        <div className="border-b border-[#BCD7EE] pb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
              {t("preview.targetAuth")}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                data.authority.verified
                  ? "bg-[#E6F4EA] text-[#0F9D76] border-[#A8DADC]"
                  : "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"
              }`}
            >
              {data.authority.verified ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D76]" />
                  {t("preview.verifiedAuthBadge")}
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
                  {t("preview.unverifiedNotice")}
                </>
              )}
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-[#102A56]">
            {data.authority.designation}
          </h2>
          <p className="text-base text-[#102A56] font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#4F46E5]" />
            {data.authority.organization}, {data.authority.state}
          </p>
        </div>

        {/* {t("preview.subjectLabel")} Line */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#526176]">
            {t("preview.subjectLabel")}
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedSubject}
              onChange={(e) => setEditedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#BCD7EE] rounded-lg text-[#172033] text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          ) : (
            <p className="text-base font-bold text-[#102A56] bg-[#F4F9FF] p-3 rounded-lg border border-[#BCD7EE]">
              {activeDisplayMode === "translated" && translatedSubject ? translatedSubject : editedSubject}
            </p>
          )}
        </div>

        {/* Application Body */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#526176]">
            {t("preview.bgContextLabel")}
          </label>
          {isEditing ? (
            <textarea
              rows={3}
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#BCD7EE] rounded-lg text-[#172033] text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          ) : (
            <p className="text-sm text-[#172033] bg-[#F4F9FF] p-4 rounded-lg border border-[#BCD7EE] leading-relaxed">
              {activeDisplayMode === "translated" && translatedBody ? translatedBody : editedBody}
            </p>
          )}
        </div>

        {/* Requested Record Questions List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Requested Government Records ({editedQuestions.length})
            </label>
          </div>

          <div className="space-y-3">
            {editedQuestions.map((question, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-[#F4F9FF] p-4 rounded-lg border border-[#BCD7EE]"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#7DD3FC] text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={question}
                    onChange={(e) => handleQuestionChange(idx, e.target.value)}
                    className="w-full bg-white border border-[#BCD7EE] rounded-md p-2 text-xs text-[#172033] focus:outline-none focus:border-[#4F46E5]"
                  />
                ) : (
                  <p className="text-sm font-semibold text-[#102A56] leading-snug">
                    {activeDisplayMode === "translated" && translatedQuestions[idx] ? translatedQuestions[idx] : question}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Local Applicant Details (Browser Only) */}
        {applicantDetails && (
          <div className="border-t border-[#BCD7EE] pt-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#526176]">
              {t("preview.applicantDetailsSession")}
            </span>
            <div className="p-4 rounded-lg bg-[#F4F9FF] border border-[#BCD7EE] text-sm space-y-1">
              <p>
                <strong className="text-[#102A56]">{t("preview.nameLabel")}</strong> {applicantDetails.name}
              </p>
              <p>
                <strong className="text-[#102A56]">{t("preview.addressLabel")}</strong> {applicantDetails.address}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Guided Filing Action Checklist */}
      <div className="p-6 rounded-xl bg-white border border-[#BCD7EE] shadow-xs space-y-4">
        <h4 className="text-base font-bold text-[#102A56] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#0F9D76]" />
          {t("preview.actionGuidanceTitle")}
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-[#526176] leading-relaxed">
          <li>{t("preview.guidanceStep1")}</li>
          <li>Attach the prescribed RTI Application Fee (e.g., ₹10 Court Fee Stamp or Indian Postal Order payable to PIO).</li>
          <li>{t("preview.guidanceStep2")}</li>
          <li>Submit by registered post or in-person at the PIO office of {data.authority.organization}.</li>
        </ol>
      </div>

      {/* Safety & Trust Panel */}
      <TrustPanel
        sources={sources}
        applicantDataSentToAI={data.validation.applicantDataSentToAI}
      />
    </div>
  );
}
