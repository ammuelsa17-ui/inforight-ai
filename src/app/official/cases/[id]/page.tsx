"use client";

import React, { useState, useMemo, use } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  FileText,
  Activity,
  CheckCircle,
  Save,
  CheckCircle2,
  MapPin,
  Camera,
  UserCheck
} from "lucide-react";
import { Card } from "@/components/Card";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { Toast, AlertBanner } from "@/components/Feedback";
import { OfficerRectificationModal } from "@/components/evidence/OfficerRectificationModal";
import { BeforeAfterComparisonPanel } from "@/components/evidence/BeforeAfterComparisonPanel";
import { triggerPrintDocument, exportRectificationEvidencePackHtml } from "@/lib/pdf/print-export";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OfficialCaseDetailsPage({ params }: PageProps) {
  const { t } = useLanguage();
  const { id } = use(params);
  const {
    cases,
    assignCaseToDepartment,
    markCaseWorkInProgress,
    submitOfficerRectification,
    updateCaseStatus
  } = useRole();

  const caseItem = useMemo(() => cases.find((c) => c.id === id) ?? null, [id, cases]);

  const [toastMsg, setToastMsg] = useState("");
  const [isRectificationModalOpen, setIsRectificationModalOpen] = useState(false);
  const [assignDept, setAssignDept] = useState("Engineering & Roads Department");
  const [assignOfficer, setAssignOfficer] = useState("Assistant Executive Engineer");

  if (!caseItem) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-borders rounded-lg max-w-xl mx-auto my-12">
        <h2 className="text-lg font-bold text-dark-text">{t("dashboard.emptyState")}</h2>
        <Link href="/official" className="mt-4 text-xs font-bold text-indigo-primary hover:underline">
          {t("common.backToHome")}
        </Link>
      </div>
    );
  }

  const latestRecord = caseItem.rectificationRecords?.[caseItem.rectificationRecords.length - 1];
  const beforeEvidence = caseItem.civicEvidence?.find((e) => e.stage === "BEFORE_RECTIFICATION");
  const afterEvidence = caseItem.civicEvidence?.find((e) => e.stage === "OFFICER_RECTIFICATION");

  const handleAssign = () => {
    assignCaseToDepartment(caseItem.id, assignDept, assignOfficer);
    setToastMsg(`Case assigned to ${assignDept}!`);
  };

  const handleStartWork = () => {
    markCaseWorkInProgress(caseItem.id, "Work crew dispatched to reported location.");
    setToastMsg("Case status updated to IN_PROGRESS!");
  };

  const handleExportEvidencePack = () => {
    const html = exportRectificationEvidencePackHtml({
      caseId: caseItem.id,
      issueDescription: caseItem.issue,
      locationDetails: `${caseItem.locality}, ${caseItem.district}, ${caseItem.state}`,
      submissionDate: new Date(caseItem.createdAt).toLocaleDateString(),
      department: caseItem.assignment?.assignedDepartment || caseItem.localBodyName,
      officerDesignation: caseItem.assignment?.assignedOfficerDesignation,
      rectifiedDate: latestRecord ? new Date(latestRecord.rectifiedAt).toLocaleDateString() : "Pending",
      officerActionNote: latestRecord?.officerActionNote || "Work in progress",
      locationConsistency: latestRecord?.locationConsistency || "NOT_AVAILABLE",
      distanceMeters: latestRecord?.distanceMeters,
      citizenStatus: caseItem.status,
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
    <div className="flex-1 space-y-6 max-w-6xl mx-auto w-full py-4 bg-slate-50/10">
      {toastMsg && <Toast type="success" message={toastMsg} onClose={() => setToastMsg("")} />}

      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-borders pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/official"
            className="p-2 rounded-lg text-secondary-text hover:text-dark-text hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-[10px] text-indigo-primary font-bold uppercase tracking-wider block">
              Official Grievance Review &amp; Rectification
            </span>
            <h1 className="text-xl font-bold tracking-tight text-dark-text sm:text-2xl uppercase">
              Case {caseItem.id}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportEvidencePack}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer"
          >
            Print Evidence Record
          </button>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            {caseItem.status}
          </span>
        </div>
      </div>

      {/* Before / After Evidence Panel */}
      {(beforeEvidence || afterEvidence) && (
        <BeforeAfterComparisonPanel
          beforeEvidence={beforeEvidence}
          afterEvidence={afterEvidence}
          locationConsistency={latestRecord?.locationConsistency}
          distanceMeters={latestRecord?.distanceMeters}
          accuracyToleranceMeters={latestRecord?.accuracyToleranceMeters}
          officerActionNote={latestRecord?.officerActionNote}
          department={caseItem.assignment?.assignedDepartment}
          officerDesignation={caseItem.assignment?.assignedOfficerDesignation}
        />
      )}

      {/* Grid: Official Actions vs Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Citizen Grievance Summary */}
          <Card className="border-l-4 border-indigo-primary space-y-3">
            <div>
              <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider block">
                {t("ask.applicantNameLabel")}
              </span>
              <span className="text-sm font-bold text-dark-text">
                {caseItem.applicantName || "Anonymous Citizen"}
              </span>
              <span className="text-xs text-secondary-text block leading-relaxed mt-0.5">
                {caseItem.applicantAddress || `${caseItem.locality}, ${caseItem.district}`}
              </span>
            </div>

            <div className="border-t border-borders pt-3 space-y-1">
              <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider block">
                Reported Grievance
              </span>
              <p className="text-xs text-dark-text leading-relaxed font-semibold">
                &ldquo;{caseItem.issue}&rdquo;
              </p>
            </div>

            {caseItem.issueCoordinates && (
              <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-mono pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  Incident Location: {caseItem.issueCoordinates.latitude.toFixed(5)}°, {caseItem.issueCoordinates.longitude.toFixed(5)}°
                </span>
              </div>
            )}
          </Card>

          {/* Operational Workflow Steps */}
          <Card className="bg-white border-borders space-y-4">
            <div className="border-b border-borders pb-2">
              <span className="text-[10px] font-bold text-indigo-primary uppercase tracking-wide">
                Officer Actions
              </span>
              <h3 className="text-xs font-bold text-dark-text uppercase tracking-wide mt-0.5">
                Execute Rectification Lifecycle
              </h3>
            </div>

            {/* Stage 1: Assign Case */}
            {caseItem.status === "SUBMITTED" && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  1. Assign Competent Department &amp; Officer
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={assignDept}
                    onChange={(e) => setAssignDept(e.target.value)}
                    placeholder="Department"
                    className="p-2 bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={assignOfficer}
                    onChange={(e) => setAssignOfficer(e.target.value)}
                    placeholder="Officer Designation"
                    className="p-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAssign}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 cursor-pointer"
                >
                  Accept &amp; Assign Case
                </button>
              </div>
            )}

            {/* Stage 2: Start Work */}
            {caseItem.status === "ASSIGNED" && (
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <div>
                  <span className="text-xs font-bold text-indigo-950 block">
                    2. Deploy Work Crew &amp; Mark In Progress
                  </span>
                  <p className="text-[11px] text-indigo-700 mt-0.5">
                    Assigned to: {caseItem.assignment?.assignedDepartment} ({caseItem.assignment?.assignedOfficerDesignation})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleStartWork}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 cursor-pointer"
                >
                  Mark Work In Progress
                </button>
              </div>
            )}

            {/* Stage 3: Submit Rectification Proof */}
            {(caseItem.status === "IN_PROGRESS" || caseItem.status === "REOPENED") && (
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-300 space-y-3">
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">
                    3. Upload Proof of Work &amp; Mark Rectified
                  </span>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Take an after-repair photo on site to generate a verifiable Before/After comparison for citizen review.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRectificationModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 shadow-xs cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload Rectification Evidence &amp; Mark Rectified</span>
                </button>
              </div>
            )}

            {/* Stage 4: Awaiting Citizen Confirmation */}
            {caseItem.status === "RECTIFIED_PENDING_CITIZEN_CONFIRMATION" && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold block">Awaiting Citizen Confirmation</span>
                <p>
                  Proof of work has been submitted. The case will move to CLOSED once the citizen verifies resolution, or REOPENED if the citizen contests the repair.
                </p>
              </div>
            )}

            {/* Stage 5: Closed */}
            {caseItem.status === "CLOSED" && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Case successfully resolved and closed by citizen verification.
                </span>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN: Audit Trail & Immutable Lifecycle History */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-4">
            <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block">
              Audit Trail &amp; Lifecycle Timeline
            </span>

            <div className="space-y-3 text-xs">
              {caseItem.history && caseItem.history.length > 0 ? (
                caseItem.history.map((evt, idx) => (
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
          </Card>
        </div>
      </div>

      {/* Officer Rectification Modal */}
      {isRectificationModalOpen && (
        <OfficerRectificationModal
          caseId={caseItem.id}
          issueDescription={caseItem.issue}
          department={caseItem.assignment?.assignedDepartment || "Engineering & Roads Department"}
          onClose={() => setIsRectificationModalOpen(false)}
          onSubmit={async (proof) => {
            await submitOfficerRectification(caseItem.id, proof);
            setToastMsg("Proof of work submitted! Awaiting citizen verification.");
          }}
        />
      )}
    </div>
  );
}
