"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { Copy, Printer, ArrowLeft, CheckCircle2, AlertTriangle, Activity } from "lucide-react";
import { BeforeAfterComparisonPanel } from "@/components/evidence/BeforeAfterComparisonPanel";
import { CitizenConfirmationModal } from "@/components/evidence/CitizenConfirmationModal";
import { triggerPrintDocument, exportRectificationEvidencePackHtml } from "@/lib/pdf/print-export";

export default function CitizenCasePage() {
  const { t } = useLanguage();
  const { id } = useParams();
  const { cases, confirmCitizenResolution, reopenCitizenCase } = useRole();

  const selectedCase = React.useMemo(() => cases.find((c) => c.id === id), [cases, id]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (!selectedCase) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold text-red-600">Case Not Found</h2>
        <Link href="/dashboard" className="mt-4 inline-flex items-center text-xs font-bold text-indigo-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const latestRecord = selectedCase.rectificationRecords?.[selectedCase.rectificationRecords.length - 1];
  const beforeEvidence = selectedCase.civicEvidence?.find((e) => e.stage === "BEFORE_RECTIFICATION");
  const afterEvidence = selectedCase.civicEvidence?.find((e) => e.stage === "OFFICER_RECTIFICATION");

  const handleExportEvidencePack = () => {
    const html = exportRectificationEvidencePackHtml({
      caseId: selectedCase.id,
      issueDescription: selectedCase.issue,
      locationDetails: `${selectedCase.locality}, ${selectedCase.district}, ${selectedCase.state}`,
      submissionDate: new Date(selectedCase.createdAt).toLocaleDateString(),
      department: selectedCase.assignment?.assignedDepartment || selectedCase.localBodyName,
      officerDesignation: selectedCase.assignment?.assignedOfficerDesignation,
      rectifiedDate: latestRecord ? new Date(latestRecord.rectifiedAt).toLocaleDateString() : "Pending",
      officerActionNote: latestRecord?.officerActionNote || "Under review",
      locationConsistency: latestRecord?.locationConsistency || "NOT_AVAILABLE",
      distanceMeters: latestRecord?.distanceMeters,
      citizenStatus: selectedCase.status,
      citizenComments: latestRecord?.citizenFeedback,
      beforeEvidence: beforeEvidence
        ? {
            id: beforeEvidence.id,
            description: beforeEvidence.description,
            date: new Date(beforeEvidence.capturedAt).toLocaleDateString(),
            locationText: beforeEvidence.location ? `${beforeEvidence.location.latitude.toFixed(5)}°, ${beforeEvidence.location.longitude.toFixed(5)}°` : undefined,
            checksum: beforeEvidence.sha256Checksum,
          }
        : undefined,
      afterEvidence: afterEvidence
        ? {
            id: afterEvidence.id,
            description: afterEvidence.description,
            date: new Date(afterEvidence.capturedAt).toLocaleDateString(),
            locationText: afterEvidence.location ? `${afterEvidence.location.latitude.toFixed(5)}°, ${afterEvidence.location.longitude.toFixed(5)}°` : undefined,
            checksum: afterEvidence.sha256Checksum,
          }
        : undefined,
    });
    triggerPrintDocument(html);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">
              Citizen Grievance Tracking
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl uppercase">
              Consultation &amp; Rectification — {selectedCase.id}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(beforeEvidence || afterEvidence) && (
            <button
              onClick={handleExportEvidencePack}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer"
            >
              Print Evidence Pack
            </button>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            {selectedCase.status}
          </span>
        </div>
      </div>

      {/* Citizen Rectification Action Banner */}
      {selectedCase.status === "RECTIFIED_PENDING_CITIZEN_CONFIRMATION" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-amber-950">
                  Action Taken by Public Authority — Verification Required
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed">
                  The municipal department has submitted proof of rectification. Please inspect the before/after photos below and confirm if the grievance is satisfactorily resolved.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsConfirmModalOpen(true)}
              className="shrink-0 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-amber-700 transition-colors cursor-pointer"
            >
              Verify Resolution
            </button>
          </div>
        </div>
      )}

      {/* Case Closed Confirmation Banner */}
      {selectedCase.status === "CLOSED" && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold block">Grievance Verified &amp; Closed</span>
            <p>Resolution was confirmed by the citizen. All audit trails and before/after evidence are preserved.</p>
          </div>
        </div>
      )}

      {/* Before / After Evidence Panel */}
      {(beforeEvidence || afterEvidence) && (
        <BeforeAfterComparisonPanel
          beforeEvidence={beforeEvidence}
          afterEvidence={afterEvidence}
          locationConsistency={latestRecord?.locationConsistency}
          distanceMeters={latestRecord?.distanceMeters}
          accuracyToleranceMeters={latestRecord?.accuracyToleranceMeters}
          officerActionNote={latestRecord?.officerActionNote}
          department={selectedCase.assignment?.assignedDepartment}
          officerDesignation={selectedCase.assignment?.assignedOfficerDesignation}
        />
      )}

      {/* Case Information Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Grievance Description
          </span>
          <p className="text-xs text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-semibold">
            &ldquo;{selectedCase.issue}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs border-t border-slate-100 pt-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Location</span>
            <span className="font-semibold text-slate-800">{selectedCase.locality}, {selectedCase.district}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Public Authority</span>
            <span className="font-semibold text-slate-800">{selectedCase.localBodyName}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Filing Date</span>
            <span className="font-semibold text-slate-800">{new Date(selectedCase.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Audit Trail & Lifecycle Timeline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          Lifecycle History &amp; Audit Trail
        </span>

        <div className="space-y-3 text-xs">
          {selectedCase.history && selectedCase.history.length > 0 ? (
            selectedCase.history.map((evt, idx) => (
              <div key={evt.eventId || idx} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="p-1.5 rounded-full bg-indigo-50 text-indigo-600 h-fit mt-0.5">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 block">{evt.action}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                    <span>{new Date(evt.timestamp).toLocaleString()}</span>
                    <span>•</span>
                    <span>{evt.actorTitle || evt.actorType}</span>
                    {evt.cycleNumber && <span>• Cycle {evt.cycleNumber}</span>}
                  </div>
                  {evt.notes && (
                    <p className="text-[11px] text-slate-600 italic mt-1">&ldquo;{evt.notes}&rdquo;</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">No events recorded in history yet.</p>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <CitizenConfirmationModal
          caseId={selectedCase.id}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirmResolution={(comment) => confirmCitizenResolution(selectedCase.id, comment)}
          onReopenCase={async (reason, followUpEv, followUpBlob) => {
            await reopenCitizenCase(selectedCase.id, reason, followUpEv, followUpBlob);
          }}
        />
      )}
    </div>
  );
}
