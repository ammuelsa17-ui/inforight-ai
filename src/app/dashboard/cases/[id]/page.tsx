// src/app/dashboard/cases/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { Copy, Printer, ArrowLeft } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { StatusBadge } from "@/components/Feedback";
import DocumentIntegrityChecksum from "@/components/DocumentIntegrityChecksum";
import RtiStatutoryTimeline from "@/components/RtiStatutoryTimeline";
import FirstAppealGenerator from "@/components/FirstAppealGenerator";
import { calculateStatutoryTimeline } from "@/lib/statutory/timeline-engine";

export default function CitizenCasePage() {
  const { id } = useParams();
  const { cases } = useRole();

  const selectedCase = React.useMemo(() => cases.find((c) => c.id === id), [cases, id]);

  if (!selectedCase) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-red-600">Case not found</h2>
        <Link href="/dashboard">
          <PrimaryButton className="mt-4" icon={ArrowLeft}>Back to Dashboard</PrimaryButton>
        </Link>
      </div>
    );
  }

  const handleCopyCaseRti = () => {
    if (!selectedCase || !selectedCase.aiResponse) return;
    const rtiText = `
TO:
The Public Information Officer (PIO)
${selectedCase.aiResponse.authority.organization}
${selectedCase.aiResponse.authority.state}

SUBJECT:
${selectedCase.aiResponse.subject}

Dear Sir/Madam,
${selectedCase.aiResponse.applicationBody}

QUESTIONS:
${selectedCase.aiResponse.questions.map((q, idx) => `${idx + 1}. ${q}`).join("\n")}

`; // Removed applicant info from copy
    navigator.clipboard.writeText(rtiText);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="flex items-center">
          <ArrowLeft className="h-5 w-5 text-indigo-primary" />
          <span className="ml-1 text-sm font-medium text-indigo-primary">Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold text-dark-text">Consultation Details — {selectedCase.id}</h1>
      </div>

      {/* Case Info */}
      <div className="bg-white border border-borders rounded-lg p-4 shadow-2xs">
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-t-lg border-b border-borders">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-secondary-text">Status:</span>
            <StatusBadge status={selectedCase.status} />
            <span className="text-xs font-semibold text-secondary-text">Priority:</span>
            <StatusBadge status={selectedCase.priority} />
          </div>
          <span className="text-xs text-secondary-text">Created: {new Date(selectedCase.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-1">Issue Described</span>
            <p className="text-xs text-dark-text bg-slate-50 p-3 rounded border border-borders font-sans leading-relaxed">
              {selectedCase.issue}
            </p>
          </div>
          {selectedCase.aiResponse && (
            <div className="border border-indigo-primary/20 rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 bg-indigo-primary/5 border-b border-indigo-primary/10 flex justify-between items-center">
                <span className="text-[10px] font-bold text-indigo-primary uppercase tracking-wider">Generated RTI Draft Document</span>
                <span className="text-[9px] bg-success-bg border border-success-green/20 text-success-green px-1.5 py-0.5 rounded font-bold uppercase">Verification Complete</span>
              </div>
              <div className="p-4 font-serif text-xs space-y-4 max-h-[250px] overflow-y-auto">
                <div>
                  <span className="font-bold block">To, The Public Information Officer,</span>
                  <span className="block font-bold">{selectedCase.aiResponse.authority.organization}</span>
                  <span className="block">{selectedCase.aiResponse.authority.state}</span>
                </div>
                <div>
                  <span className="font-bold">Subject: </span>
                  <span>{selectedCase.aiResponse.subject}</span>
                </div>
                <div>
                  <span className="font-bold block mb-1">Particulars requested:</span>
                  <ol className="list-decimal pl-4 space-y-1">
                    {selectedCase.aiResponse.questions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ol>
                </div>

              </div>
            </div>
          )}

        </div>
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 pb-4 border-b border-borders">
          <SecondaryButton icon={Copy} onClick={handleCopyCaseRti}>Copy Draft</SecondaryButton>
          <SecondaryButton icon={Printer} onClick={() => window.print()}>Print</SecondaryButton>
        </div>

        {/* Section: Document Integrity Checksum */}
        {selectedCase.aiResponse && (
          <div className="mt-4">
            <DocumentIntegrityChecksum
              documentText={`${selectedCase.aiResponse.subject}\n\n${selectedCase.aiResponse.applicationBody}\n\n${selectedCase.aiResponse.questions.join("\n")}`}
            />
          </div>
        )}

        {/* Section: Statutory Timeline Engine */}
        <div className="mt-6">
          <RtiStatutoryTimeline initialFilingDate={selectedCase.createdAt.split("T")[0]} />
        </div>

        {/* Section: First Appeal Generator (Deterministic Statutory Eligibility Check) */}
        {(() => {
          const filingDateStr = selectedCase.createdAt.split("T")[0];
          const timeline = calculateStatutoryTimeline(filingDateStr, false, "no_response");
          const todayStr = new Date().toISOString().split("T")[0];
          const isDeadlineExpired = todayStr >= timeline.standardResponseDeadline;
          const isExplicitResponseRecorded = selectedCase.status === "In Progress" || selectedCase.status === "Resolved";
          const isEligibleForAppeal = isDeadlineExpired || isExplicitResponseRecorded;

          if (isEligibleForAppeal) {
            return (
              <div className="mt-6 border-t border-borders pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Statutory First Appeal Assistant (Section 19(1))
                </h3>
                <FirstAppealGenerator
                  initialData={{
                    originalRtiRefId: selectedCase.id,
                    filingDate: filingDateStr,
                    targetAuthority: selectedCase.aiResponse?.authority.organization || selectedCase.localBodyName,
                    applicantName: selectedCase.applicantName || "",
                    applicantAddress: selectedCase.applicantAddress || "",
                    responseStatus: isDeadlineExpired && !isExplicitResponseRecorded ? "no_response" : "incomplete_info",
                  }}
                />
              </div>
            );
          }

          return (
            <div className="mt-6 border-t border-borders pt-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Section 19(1) First Appeal Status: Pending Response Period
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  First Appeal becomes available once the statutory 30-day PIO response deadline ({timeline.standardResponseDeadline}) passes or a qualifying PIO decision/refusal is recorded.
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
