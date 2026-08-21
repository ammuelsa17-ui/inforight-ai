"use client";

import React, { useState } from "react";
import FallbackBanner from "./FallbackBanner";
import TrustPanel, { SourceCardInfo } from "./TrustPanel";
import DocumentActions from "./DocumentActions";
import { CheckCircle2, AlertCircle, FileText, MapPin } from "lucide-react";

export interface GeneratedRtiData {
  mode: "ai" | "fallback";
  subject: string;
  applicationBody: string;
  questions: string[];
  authority: {
    designation: string;
    organization: string;
    state: string;
    verified: boolean;
  };
  citationIds: string[];
  validation: {
    schemaValid: boolean;
    citationsValid: boolean;
    questionCount: number;
    applicantDataSentToAI: boolean;
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
}

export default function GeneratedPreview({
  data,
  applicantDetails,
  sources = [],
}: GeneratedPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState(data.subject);
  const [editedBody, setEditedBody] = useState(data.applicationBody);
  const [editedQuestions, setEditedQuestions] = useState<string[]>([...data.questions]);

  const handleQuestionChange = (index: number, val: string) => {
    const next = [...editedQuestions];
    next[index] = val;
    setEditedQuestions(next);
  };

  const fullTextToCopy = `To,
The Public Information Officer (PIO)
${data.authority.organization}
${data.authority.state}

Subject: ${editedSubject}

Respected Sir/Madam,

${editedBody}

Under Section 6(1) of the Right to Information Act, 2005, I request you to kindly provide certified copies of the following official government records:

${editedQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Applicant Details (Local):
Name: ${applicantDetails?.name || "[Applicant Name]"}
Address: ${applicantDetails?.address || "[Applicant Address]"}`;

  return (
    <div className="w-full space-y-8">
      {/* Top Banner for Fallback or Verification Warning */}
      <FallbackBanner
        mode={data.mode}
        warning={data.warning}
        verifiedAuthority={data.authority.verified}
      />

      {/* Action Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#BCD7EE] shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-[#102A56]">Generated RTI Application</h3>
          <p className="text-xs text-[#526176]">
            Review, edit, and export your record-based RTI request
          </p>
        </div>
        <DocumentActions
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          onCopy={() => navigator.clipboard.writeText(fullTextToCopy)}
        />
      </div>

      {/* Printable Document Container */}
      <div className="w-full bg-white border border-[#BCD7EE] p-8 rounded-xl shadow-xs space-y-6 text-[#172033] print:border-none print:shadow-none print:p-0 print:text-black">
        {/* Document Authority Header */}
        <div className="border-b border-[#BCD7EE] pb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
              Target Public Authority
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
                  Verified Coimbatore Authority
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
                  Unverified Authority Notice
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

        {/* Subject Line */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#526176]">
            Subject
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
              {editedSubject}
            </p>
          )}
        </div>

        {/* Application Body */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#526176]">
            Background / Context
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
              {editedBody}
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
                    className="w-full px-3 py-1.5 bg-white border border-[#BCD7EE] rounded text-[#172033] text-sm focus:outline-none focus:border-[#4F46E5]"
                  />
                ) : (
                  <p className="text-sm text-[#172033] leading-relaxed font-normal">
                    {question}
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
              Applicant Details — kept in this browser session
            </span>
            <div className="p-4 rounded-lg bg-[#F4F9FF] border border-[#BCD7EE] text-sm space-y-1">
              <p>
                <strong className="text-[#102A56]">Name:</strong> {applicantDetails.name}
              </p>
              <p>
                <strong className="text-[#102A56]">Address:</strong> {applicantDetails.address}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Guided Filing Action Checklist */}
      <div className="p-6 rounded-xl bg-white border border-[#BCD7EE] shadow-xs space-y-4">
        <h4 className="text-base font-bold text-[#102A56] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#0F9D76]" />
          Filing Action Guidance
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-[#526176] leading-relaxed">
          <li>Print or export this application as PDF using the controls above.</li>
          <li>Attach the prescribed RTI Application Fee (e.g., ₹10 Court Fee Stamp or Indian Postal Order payable to PIO).</li>
          <li>Sign the application at the bottom of the printed copy.</li>
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
