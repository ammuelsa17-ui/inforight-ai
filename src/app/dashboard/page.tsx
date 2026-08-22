"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRole, Case } from "@/context/RoleContext";
import { useLanguage } from "@/context/LanguageContext";
import { RIGHTS_DATA } from "@/data/rights";
import {
  MessageSquarePlus,
  Scale,
  Bookmark,
  FileText,
  HelpCircle,
  User,
  ArrowRight,
  FileUp,
  Search,
  ChevronRight,
  Printer,
  Copy
} from "lucide-react";
import { Card, StatCard } from "@/components/Card";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { StatusBadge, EmptyState, Toast } from "@/components/Feedback";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";

export default function CitizenDashboardPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="p-6">{t("common.loading")}</div>}>
      <CitizenDashboardContent />
    </Suspense>
  );
}

function CitizenDashboardContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  
  const {
    cases,
    savedRights,
    documents,
    addDocument,
    role,
    setRole
  } = useRole();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Redirect to landing if role is public
  React.useEffect(() => {
    if (role === "public") {
      setRole("citizen"); // Automatically elevate to citizen to view dashboard
    }
  }, [role, setRole]);

  const handleOpenCase = (c: Case) => {
    setSelectedCase(c);
    setIsCaseModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      addDocument(file.name, sizeStr);
      setToastMsg(`Uploaded ${file.name} to My Documents`);
    }
  };

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

APPLICANT:
${selectedCase.applicantName}
${selectedCase.applicantAddress}
    `;
    navigator.clipboard.writeText(rtiText);
    setToastMsg("RTI Draft copied to clipboard!");
  };

  return (
    <div className="flex-1 space-y-6 max-w-6xl mx-auto w-full py-4">
      {toastMsg && <Toast type="success" message={toastMsg} onClose={() => setToastMsg("")} />}

      {/* Case Details Modal */}
      {selectedCase && (
        <Modal
          isOpen={isCaseModalOpen}
          onClose={() => setIsCaseModalOpen(false)}
          title={`Consultation Details — ${selectedCase.id}`}
          size="lg"
          actions={
            <div className="flex gap-2">
              <SecondaryButton icon={Copy} onClick={handleCopyCaseRti}>
                {t("common.copy")}
              </SecondaryButton>
              <SecondaryButton icon={Printer} onClick={() => window.print()}>
                {t("common.print")}
              </SecondaryButton>
              <Link href={`/dashboard/cases/${selectedCase.id}`}>
                <PrimaryButton>
                  {t("common.viewDetails")}
                </PrimaryButton>
              </Link>
              <PrimaryButton onClick={() => setIsCaseModalOpen(false)}>
                {t("common.close")}
              </PrimaryButton>
            </div>
          }
        >
          <div className="space-y-5">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-borders">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-secondary-text">{t("common.status")}</span>
                <StatusBadge status={selectedCase.status} />
                <span className="text-xs font-semibold text-secondary-text">{t("common.filter")}</span>
                <StatusBadge status={selectedCase.priority} />
              </div>
              <span className="text-xs text-secondary-text font-semibold">
                Created: {new Date(selectedCase.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-1">{t("ask.problemLabel")}</span>
              <p className="text-xs text-dark-text bg-slate-50 p-3.5 rounded border border-borders font-sans leading-relaxed">
                {selectedCase.issue}
              </p>
            </div>

            {selectedCase.aiResponse && (
              <div className="border border-indigo-primary/20 rounded-lg overflow-hidden bg-white">
                <div className="px-4 py-2.5 bg-indigo-primary/5 border-b border-indigo-primary/10 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-indigo-primary uppercase tracking-wider block">{t("preview.generatedTitle")}</span>
                  <span className="text-[9px] bg-success-bg border border-success-green/20 text-success-green px-1.5 py-0.5 rounded font-bold uppercase">
                    {t("sources.verifiedBadge")}
                  </span>
                </div>
                <div className="p-4 font-serif text-xs space-y-4 max-h-[250px] overflow-y-auto">
                  <div>
                    <span className="font-bold block">{t("preview.targetAuth")}</span>
                    <span className="block font-bold">{selectedCase.aiResponse.authority.organization}</span>
                    <span className="block">{selectedCase.aiResponse.authority.state || "Tamil Nadu"}</span>
                  </div>
                  <div>
                    <span className="font-bold">{t("preview.subjectLabel")} </span>
                    <span>{selectedCase.aiResponse.subject}</span>
                  </div>
                  <div>
                    <span className="font-bold block mb-1">{t("preview.bgContextLabel")}</span>
                    <ol className="list-decimal pl-4 space-y-1">
                      {selectedCase.aiResponse.questions.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="border-t border-borders pt-3 text-[10px] text-secondary-text">
                    <span className="block">Applicant: {selectedCase.applicantName}</span>
                    <span className="block">Address: {selectedCase.applicantAddress}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedCase.internalNotes && (
              <div className="bg-sky-light-bg border border-sky-blue/20 rounded-lg p-3.5">
                <span className="text-[10px] font-bold text-indigo-primary uppercase tracking-wider block">{t("official.title")}</span>
                <p className="text-xs text-dark-text mt-1 leading-relaxed">
                  {selectedCase.internalNotes}
                </p>
                {selectedCase.assignedOfficial && (
                  <span className="text-[10px] font-semibold text-secondary-text block mt-1.5">
                    Assigned Officer: {selectedCase.assignedOfficial}
                  </span>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Welcome Header */}
      <div className="bg-white border border-borders rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4.5 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-dark-text sm:text-2xl">
            {t("dashboard.title")}
          </h2>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            {t("dashboard.subtitle")}
          </p>
        </div>
        <Link href="/ask">
          <PrimaryButton icon={MessageSquarePlus}>
            {t("ask.heading")}
          </PrimaryButton>
        </Link>
      </div>

      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard title={t("dashboard.title")} value={cases.length} icon={MessageSquarePlus} color="indigo" />
            <StatCard title={t("rights.badge")} value={savedRights.length} icon={Scale} color="sky" />
            <StatCard title={t("resources.title")} value={documents.length} icon={FileText} color="green" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recent Cases */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex justify-between items-center border-b border-borders pb-2">
                <h3 className="text-sm font-bold text-dark-text uppercase tracking-wider">{t("dashboard.title")}</h3>
                <Link href="/dashboard?tab=consultations" className="text-xs font-bold text-indigo-primary hover:underline flex items-center gap-0.5">
                  <span>{t("common.viewDetails")}</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </Link>
              </div>

              {cases.length > 0 ? (
                <div className="space-y-3">
                  {cases.slice(0, 3).map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleOpenCase(c)}
                      className="bg-white border border-borders hover:border-indigo-primary/30 rounded-lg p-4 flex items-center justify-between shadow-2xs cursor-pointer group"
                    >
                      <div className="space-y-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-dark-text">{c.id}</span>
                          <StatusBadge status={c.status} />
                          <StatusBadge status={c.priority} />
                        </div>
                        <p className="text-xs text-secondary-text font-semibold truncate leading-normal">
                          {c.issue}
                        </p>
                        <span className="text-[10px] text-secondary-text/80 block">
                          PIO: {c.aiResponse?.authority.organization || "CCMC Coimbatore"}
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-secondary-text group-hover:text-indigo-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={t("dashboard.emptyState")}
                  description="Describe your civic or legal issue to receive AI-assisted guidance and create an official RTI draft."
                  action={
                    <Link href="/ask">
                      <PrimaryButton icon={MessageSquarePlus}>{t("ask.heading")}</PrimaryButton>
                    </Link>
                  }
                />
              )}
            </div>

            {/* Right Panel: {t("rights.badge")} & Quick Help */}
            <div className="lg:col-span-4 space-y-6">
              {/* {t("rights.badge")} */}
              <div className="space-y-4">
                <div className="border-b border-borders pb-2">
                  <h3 className="text-sm font-bold text-dark-text uppercase tracking-wider">{t("rights.badge")}</h3>
                </div>
                {savedRights.length > 0 ? (
                  <div className="space-y-2">
                    {savedRights.slice(0, 3).map((rId) => {
                      const right = RIGHTS_DATA[rId];
                      if (!right) return null;
                      return (
                        <Link
                          key={rId}
                          href={`/rights/${rId}`}
                          className="flex items-center justify-between p-3 border border-borders rounded-lg bg-white hover:border-indigo-primary/30 hover:bg-slate-50 transition-all text-xs font-bold text-dark-text block"
                        >
                          <span className="truncate">{right.title}</span>
                          <ArrowRight className="h-4 w-4 text-indigo-primary" />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-white border border-borders rounded-lg text-center text-xs text-secondary-text">
                    {t("rights.subtitle")}
                    <Link href="/rights" className="block text-indigo-primary font-bold mt-1.5 hover:underline">
                      {t("rights.title")}
                    </Link>
                  </div>
                )}
              </div>

              {/* Quick Help Helpline */}
              <Card className="bg-sky-light-bg border-sky-blue/20">
                <h4 className="text-xs font-bold text-dark-text uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <HelpCircle className="h-4.5 w-4.5 text-indigo-primary" />
                  <span>{t("rights.badge")}</span>
                </h4>
                <p className="text-xs text-secondary-text leading-relaxed mb-4">
                  Stuck with a civic dispute? Contact legal aid services directly for pro-bono assistance.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-dark-text bg-white p-2.5 rounded border border-borders/60">
                    <span>{t("rights.badge")}</span>
                    <span className="text-indigo-primary">15100</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-dark-text bg-white p-2.5 rounded border border-borders/60">
                    <span>{t("rights.consumerEscalation")}</span>
                    <span className="text-indigo-primary">1915</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Consultations */}
      {activeTab === "consultations" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white border border-borders rounded-lg p-4 shadow-2xs">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-text" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("common.search")}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-borders text-xs text-dark-text bg-white transition-colors focus:border-indigo-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {cases.filter(c => c.id.toLowerCase().includes(searchQuery.toLowerCase()) || c.issue.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
              <div
                key={c.id}
                onClick={() => handleOpenCase(c)}
                className="bg-white border border-borders hover:border-indigo-primary/30 rounded-lg p-4 flex items-center justify-between shadow-2xs cursor-pointer group"
              >
                <div className="space-y-1.5 min-w-0 pr-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-dark-text">{c.id}</span>
                    <StatusBadge status={c.status} />
                    <StatusBadge status={c.priority} />
                  </div>
                  <p className="text-xs text-secondary-text font-medium leading-relaxed">
                    {c.issue}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-secondary-text/80">
                    <span>PIO: {c.aiResponse?.authority.organization || "CCMC Coimbatore"}</span>
                    <span>Created: {new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-secondary-text group-hover:text-indigo-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Saved Resources */}
      {activeTab === "saved-resources" && (
        <Card className="text-center p-12 bg-white">
          <Bookmark className="h-8 w-8 text-secondary-text/80 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-dark-text">{t("resources.title")}</h3>
          <p className="text-xs text-secondary-text mt-1 max-w-sm mx-auto">
            {t("resources.subtitle")}
          </p>
          <Link href="/resources">
            <PrimaryButton className="mt-4">{t("common.search")}</PrimaryButton>
          </Link>
        </Card>
      )}

      {/* Tab: Documents */}
      {activeTab === "documents" && (
        <div className="space-y-6">
          <div className="bg-white border border-borders rounded-lg p-6 flex justify-between items-center shadow-2xs">
            <div>
              <h3 className="text-sm font-bold text-dark-text uppercase tracking-wider">{t("resources.title")}</h3>
              <p className="text-xs text-secondary-text mt-0.5">{t("evidence.privacyNotice")}</p>
            </div>
            
            <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-primary hover:bg-indigo-primary/95 cursor-pointer shadow-2xs gap-2">
              <FileUp className="h-4.5 w-4.5" />
              <span>{t("evidence.selectFileLabel")}</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="bg-white border border-borders rounded-lg overflow-x-auto shadow-2xs">
            <table className="min-w-full divide-y divide-borders text-left text-xs">
              <thead className="bg-slate-50/70 text-secondary-text font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">{t("evidence.categoryLabel")}</th>
                  <th className="px-6 py-3">{t("common.status")}</th>
                  <th className="px-6 py-3">{t("ask.dateRangeLabel")}</th>
                  <th className="px-6 py-3 text-right">{t("common.action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borders text-dark-text">
                {documents.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 flex items-center gap-2">
                      <FileText className="h-4.5 w-4.5 text-indigo-primary shrink-0" />
                      <span className="font-semibold">{doc.name}</span>
                    </td>
                    <td className="px-6 py-4 text-secondary-text">{doc.size}</td>
                    <td className="px-6 py-4 text-secondary-text">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setToastMsg(`{t("common.downloadPdf")}ed ${doc.name} (Simulation)`)}
                        className="text-xs font-bold text-indigo-primary hover:underline cursor-pointer"
                      >
                        {t("common.downloadPdf")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Profile */}
      {activeTab === "profile" && (
        <Card className="max-w-2xl mx-auto space-y-6">
          <div className="border-b border-borders pb-3">
            <h3 className="text-sm font-bold text-dark-text uppercase tracking-wide">{t("ask.applicantDetailsTitle")}</h3>
            <p className="text-[10px] text-secondary-text">{t("ask.privacyBadge")}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Default Applicant Name" placeholder={t("ask.applicantNamePlaceholder")} defaultValue="Harish Kumar" />
            <Input label="Default Post Address" placeholder={t("ask.applicantAddressPlaceholder")} defaultValue="12, Ramanathapuram, Coimbatore" />
            <Input label="Mobile Number" placeholder="+91 98765 43210" />
            <Input label="Email Address" placeholder={t("ask.applicantNamePlaceholder")} />
          </div>

          <div className="bg-sky-light-bg border border-sky-blue/20 rounded-lg p-3.5 flex gap-2">
            <User className="h-5 w-5 text-indigo-primary shrink-0" />
            <span className="text-[11px] text-secondary-text leading-relaxed">
              <strong>{t("ask.privacyBadge")}</strong> {t("ask.privacyBadge")}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}
