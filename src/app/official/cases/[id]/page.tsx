"use client";

import React, { useState, useMemo, use } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useRole, Case } from "@/context/RoleContext";
import {
  ArrowLeft,
  Scale,
  Clock,
  ShieldCheck,
  FileText,
  Activity,
  CheckCircle,
  Save
} from "lucide-react";
import { Card, AIResponseCard } from "@/components/Card";
import { PrimaryButton } from "@/components/Button";
import { Toast, AlertBanner } from "@/components/Feedback";
import { Input, TextArea } from "@/components/Input";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OfficialCaseDetailsPage({ params }: PageProps) {
  const { t } = useLanguage();
  const { id } = use(params);
  const { cases, updateCaseStatus } = useRole();

  // Memoized case lookup
  const caseItem = useMemo(() => cases.find((c) => c.id === id) ?? null, [id, cases]);

  // Editable fields for officials
  const [status, setStatus] = useState<Case["status"]>(caseItem?.status ?? "Pending");
  const [priority, setPriority] = useState<Case["priority"]>(caseItem?.priority ?? "Medium");
  const [assignedOfficial, setAssignedOfficial] = useState(caseItem?.assignedOfficial ?? "");
  const [internalNotes, setInternalNotes] = useState(caseItem?.internalNotes ?? "");
  
  const [toastMsg, setToastMsg] = useState("");

  // Removed stateful case lookup; using memoized `caseItem` instead.

  // Sync derived fields when caseItem updates
  // Sync derived fields when caseItem updates


  if (!caseItem) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-borders rounded-lg max-w-xl mx-auto my-12">
        <h2 className="text-lg font-bold text-dark-text">{t("dashboard.emptyState")}</h2>
        <p className="text-xs text-secondary-text mt-2">{t("dashboard.emptyState")}</p>
        <Link href="/official" className="mt-4 text-xs font-bold text-indigo-primary hover:underline">
          {t("common.backToHome")}
        </Link>
      </div>
    );
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateCaseStatus(caseItem.id, status, internalNotes, priority, assignedOfficial || undefined);
    setToastMsg("Official record updated successfully!");
  };

  return (
    <div className="flex-1 space-y-6 max-w-6xl mx-auto w-full py-4 bg-slate-50/10">
      {toastMsg && <Toast type="success" message={toastMsg} onClose={() => setToastMsg("")} />}

      {/* Navigation Header */}
      <div className="flex items-center gap-3 border-b border-borders pb-4">
        <Link
          href="/official"
          className="p-2 rounded-lg text-secondary-text hover:text-dark-text hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <span className="text-[10px] text-indigo-primary font-bold uppercase tracking-wider block">{t("official.badge")}</span>
          <h1 className="text-xl font-bold tracking-tight text-dark-text sm:text-2xl uppercase">
            Review Request {caseItem.id}
          </h1>
        </div>
      </div>

      {/* Grid separating Official Decisions from AI-generated Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: OFFICIAL DECISIONS & ACTIONS (Authority Source) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="border-b border-borders pb-1.5">
            <h2 className="text-xs font-bold text-dark-text uppercase tracking-wider">{t("official.title")}</h2>
            <p className="text-[10.5px] text-secondary-text">{t("official.subtitle")}</p>
          </div>

          {/* Citizen Issue Summary */}
          <Card className="border-l-4 border-indigo-primary">
            <div className="mb-4">
              <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider block">{t("ask.applicantNameLabel")}</span>
              <span className="text-sm font-bold text-dark-text">{caseItem.applicantName || "Anonymous Citizen"}</span>
              <span className="text-xs text-secondary-text block leading-relaxed mt-0.5">{caseItem.applicantAddress || "Address confidential / Local browser"}</span>
            </div>

            <div className="border-t border-borders pt-4 space-y-2">
              <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider block">{t("ask.problemLabel")}</span>
              <p className="text-xs text-dark-text leading-relaxed font-semibold">
                &ldquo;{caseItem.issue}&rdquo;
              </p>
            </div>
            
            {caseItem.uploadedFiles && caseItem.uploadedFiles.length > 0 && (
              <div className="border-t border-borders pt-4 mt-4">
                <span className="text-[10px] text-secondary-text font-bold uppercase tracking-wider block mb-2">Attached Local Files ({caseItem.uploadedFiles.length})</span>
                <div className="space-y-1.5">
                  {caseItem.uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-borders rounded text-xs">
                      <FileText className="h-4.5 w-4.5 text-indigo-primary shrink-0" />
                      <span className="font-semibold text-dark-text">{file.name}</span>
                      <span className="text-secondary-text ml-auto">{file.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Official Action Controls */}
          <Card className="bg-white border-borders">
            <form onSubmit={handleSaveChanges} className="space-y-5">
              <div className="border-b border-borders pb-2">
                <span className="text-[10px] font-bold text-indigo-primary uppercase tracking-wide">{t("official.title")}</span>
                <h3 className="text-xs font-bold text-dark-text uppercase tracking-wide mt-0.5">{t("common.edit")}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-dark-text uppercase">{t("common.status")}</label>
                  <select
                    value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as Case["status"]) }
                    className="w-full px-3 py-2 rounded-lg border border-borders text-xs font-semibold text-dark-text bg-white focus:outline-none focus:border-indigo-primary cursor-pointer"
                  >
                    <option value="Pending">{t("common.status")}</option>
                    <option value="In Progress">{t("common.status")}</option>
                    <option value="Resolved">{t("common.status")}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-dark-text uppercase">{t("common.filter")}</label>
                  <select
                    value={priority}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value as Case["priority"]) }
                    className="w-full px-3 py-2 rounded-lg border border-borders text-xs font-semibold text-dark-text bg-white focus:outline-none focus:border-indigo-primary cursor-pointer"
                  >
                    <option value="Low">{t("common.filter")}</option>
                    <option value="Medium">{t("common.filter")}</option>
                    <option value="High">{t("common.filter")}</option>
                    <option value="Urgent">{t("common.filter")}</option>
                  </select>
                </div>
              </div>

              <Input
                label="Assigned Officer Name"
                placeholder={t("ask.applicantNamePlaceholder")}
                value={assignedOfficial}
                onChange={(e) => setAssignedOfficial(e.target.value)}
              />

              <TextArea
                label="Internal Audit & Case Progress Notes"
                placeholder={t("ask.problemPlaceholder")}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={3}
              />

              <div className="pt-2 flex justify-end">
                <PrimaryButton type="submit" icon={Save}>
                  {t("common.save")}
                </PrimaryButton>
              </div>
            </form>
          </Card>

          {/* Timeline of events */}
          <Card>
            <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-4">{t("timelineEngine.title")}</span>
            <div className="space-y-4 text-xs font-semibold text-secondary-text">
              <div className="flex gap-3">
                <CheckCircle className="h-4.5 w-4.5 text-indigo-primary shrink-0" />
                <div>
                  <span className="text-dark-text block">{t("timelineEngine.subtitle")}</span>
                  <span className="text-[10px] block mt-0.5">{new Date(caseItem.createdAt).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Clock className="h-4.5 w-4.5 text-indigo-primary shrink-0" />
                <div>
                  <span className="text-dark-text block">{t("official.title")}</span>
                  <span className="text-[10px] block mt-0.5">{t("official.subtitle")}</span>
                </div>
              </div>

              {caseItem.internalNotes && (
                <div className="flex gap-3">
                  <Activity className="h-4.5 w-4.5 text-indigo-primary shrink-0" />
                  <div>
                    <span className="text-dark-text block">{t("official.title")}</span>
                    <p className="text-[10px] text-secondary-text leading-tight mt-1">{caseItem.internalNotes}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: AI-ASSISTED CIVIC INTELLIGENCE (Strict Visual Distinction) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="border-b border-borders pb-1.5">
            <h2 className="text-xs font-bold text-sky-blue uppercase tracking-wider">{t("preview.generatedTitle")}</h2>
            <p className="text-[10.5px] text-secondary-text">{t("preview.generatedSubtitle")}</p>
          </div>

          <AlertBanner
            type="info"
            message="AI-Generated Reference Guidance"
            description="The card parameters below are generated by generative modules to assist the officer. They hold no legal authority and must be verified before formal municipal decisions are cleared."
          />

          {caseItem.aiResponse ? (
            <div className="border border-sky-blue/20 rounded-lg overflow-hidden bg-sky-light-bg/25">
              
              {/* Classification */}
              <div className="p-4 border-b border-sky-blue/10 bg-sky-light-bg/50 space-y-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-[9px] font-bold text-indigo-primary uppercase tracking-wider block">{t("rights.badge")}</span>
                  <span className="bg-sky-blue/10 text-indigo-primary px-2 py-0.5 rounded text-[9.5px] font-bold">
                    {t("rights.badge")}
                  </span>
                </div>
                <p className="text-xs text-secondary-text leading-relaxed">
                  {t("rights.badge")}
                </p>
              </div>

              {/* Subject Draft */}
              <div className="p-4 border-b border-sky-blue/10 space-y-2.5">
                <span className="text-[9px] font-bold text-secondary-text uppercase block">{t("preview.subjectLabel")}</span>
                <p className="text-xs font-bold text-dark-text leading-normal">
                  {caseItem.aiResponse.subject}
                </p>
              </div>

              {/* Questions Draft */}
              <div className="p-4 border-b border-sky-blue/10 space-y-3">
                <span className="text-[9px] font-bold text-secondary-text uppercase block">{t("preview.bgContextLabel")}</span>
                <ol className="list-decimal pl-4 space-y-2.5 text-xs font-medium text-dark-text/90">
                  {caseItem.aiResponse.questions.map((q, idx) => (
                    <li key={idx} className="leading-relaxed">{q}</li>
                  ))}
                </ol>
              </div>

              {/* Suggested citation list */}
              <div className="p-4 space-y-3.5">
                <span className="text-[9px] font-bold text-secondary-text uppercase block">{t("sources.title")}</span>
                <div className="space-y-1.5">
                  {caseItem.aiResponse.citationIds.map((cId) => (
                    <div key={cId} className="flex items-center justify-between p-2 rounded bg-white border border-sky-blue/10 text-[11px] font-bold">
                      <span>{cId}</span>
                      <span className="text-[9.5px] text-indigo-primary font-bold flex items-center gap-0.5">
                        <ShieldCheck className="h-3 w-3" /> {t("sources.verifiedBadge")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-borders rounded-lg p-6 text-center text-xs text-secondary-text">
              {t("dashboard.emptyState")}
            </div>
          )}

          {/* AI Suggested Legal Provisions */}
          <AIResponseCard title={t("sources.title")} variant="indigo" icon={Scale}>
            <div className="space-y-3 text-xs leading-normal">
              <div>
                <span className="font-bold text-dark-text block">{t("common.legalDisclaimerTitle")}</span>
                <p className="text-secondary-text mt-0.5">{t("common.legalDisclaimerBody")}</p>
              </div>
              <div>
                <span className="font-bold text-dark-text block">{t("common.legalDisclaimerTitle")}</span>
                <p className="text-secondary-text mt-0.5">{t("common.legalDisclaimerBody")}</p>
              </div>
            </div>
          </AIResponseCard>
        </div>
      </div>
    </div>
  );
}
