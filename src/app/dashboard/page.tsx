"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CitizenMatter } from "@/types/deadlines";
import { calculateMatterDeadline } from "@/lib/deadlines/deadline-engine";
import MatterCard from "@/components/dashboard/MatterCard";
import AddMatterModal from "@/components/dashboard/AddMatterModal";
import { useRole, Case } from "@/context/RoleContext";
import { useLanguage } from "@/context/LanguageContext";
import { RIGHTS_DATA } from "@/data/rights";
import {
  Clock,
  Plus,
  Search,
  SlidersHorizontal,
  Download,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  Sparkles,
  RotateCcw,
  Scale,
  Bookmark,
  HelpCircle,
  User,
  ArrowRight,
  FileUp,
  ChevronRight,
  Copy
} from "lucide-react";
import { Card, StatCard } from "@/components/Card";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { StatusBadge, EmptyState, Toast } from "@/components/Feedback";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";

const STORAGE_KEY = "inforight_deadline_matters";

const SAMPLE_INITIAL_MATTERS: CitizenMatter[] = [
  {
    id: "matter_sample_rti_1",
    title: "RTI Application — Ward 12 Road Tender Sanctions & Measurement Book",
    domain: "RTI_ACCESS",
    state_ut: "Tamil Nadu",
    authority: "Public Information Officer, Greater Chennai Corporation",
    reference_number: "GCC/RTI/2026/00481",
    trigger_rule_id: "RTI_SEC_7_1_NORMAL",
    filing_date: "2026-08-01",
    status: "AWAITING_RESPONSE",
    notes: "Filed seeking copies of administrative sanction and MB records for road relaying.",
    created_at: "2026-08-01T10:00:00.000Z",
    updated_at: "2026-08-01T10:00:00.000Z"
  },
  {
    id: "matter_sample_cons_1",
    title: "E-Commerce Refund Grievance — Defective Refrigerator Delivery",
    domain: "CONSUMER_PROTECTION",
    state_ut: "National",
    authority: "Appliance Retailer Grievance Officer",
    reference_number: "GRIEV-2026-9921",
    trigger_rule_id: "CONS_ECOMMERCE_GRIEVANCE_REDRESSAL",
    filing_date: "2026-08-10",
    status: "AWAITING_RESPONSE",
    notes: "Replacement requested under E-Commerce Rules 2020.",
    created_at: "2026-08-10T11:00:00.000Z",
    updated_at: "2026-08-10T11:00:00.000Z"
  }
];

export default function DashboardPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Loading citizen dashboard...</div>}>
      <CitizenDashboardUnified />
    </Suspense>
  );
}

function CitizenDashboardUnified() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab") || "deadlines";
  const [activeTab, setActiveTab] = useState<string>(rawTab === "overview" ? "deadlines" : rawTab);

  const {
    cases,
    savedRights,
    documents,
    addDocument,
    role,
    setRole
  } = useRole();

  // Role elevation
  useEffect(() => {
    if (role === "public") {
      setRole("citizen");
    }
  }, [role, setRole]);

  // Sync tab with URL if needed
  useEffect(() => {
    if (rawTab && rawTab !== "overview") {
      setActiveTab(rawTab);
    }
  }, [rawTab]);

  // Matters state (Feature 3 local deadline tracker)
  const [matters, setMatters] = useState<CitizenMatter[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.warn("Failed to load local matters:", err);
      }
    }
    return SAMPLE_INITIAL_MATTERS;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Persist matters to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(matters));
      } catch (err) {
        console.warn("Failed to persist matters:", err);
      }
    }
  }, [matters]);

  const handleAddMatter = (newMatter: CitizenMatter) => {
    setMatters((prev) => [newMatter, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setMatters((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const newStatus = m.status === "COMPLETED" ? "AWAITING_RESPONSE" : "COMPLETED";
        return {
          ...m,
          status: newStatus,
          updated_at: new Date().toISOString()
        };
      })
    );
  };

  const handleDeleteMatter = (id: string) => {
    if (window.confirm("Are you sure you want to remove this matter from your local tracker?")) {
      setMatters((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all locally tracked matters? This action cannot be undone.")) {
      setMatters([]);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matters, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `inforight_matters_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

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
`;
    navigator.clipboard.writeText(rtiText);
    setToastMsg("RTI Application text copied to clipboard!");
  };

  // Evaluated Matters for Statistics & Filtering
  const evaluatedMatters = useMemo(() => {
    return matters.map((m) => ({
      matter: m,
      calc: calculateMatterDeadline(m)
    }));
  }, [matters]);

  const stats = useMemo(() => {
    let overdueCount = 0;
    let urgentCount = 0;
    let pendingCount = 0;
    let completedCount = 0;

    for (const { calc } of evaluatedMatters) {
      if (calc.status === "COMPLETED") {
        completedCount++;
      } else if (calc.daysRemaining !== undefined && calc.daysRemaining < 0) {
        overdueCount++;
      } else if (calc.daysRemaining !== undefined && calc.daysRemaining <= 5) {
        urgentCount++;
      } else {
        pendingCount++;
      }
    }

    return {
      total: matters.length,
      overdue: overdueCount,
      urgent: urgentCount,
      pending: pendingCount,
      completed: completedCount
    };
  }, [evaluatedMatters, matters.length]);

  const filteredMatters = useMemo(() => {
    return evaluatedMatters.filter(({ matter, calc }) => {
      if (domainFilter !== "ALL" && matter.domain !== domainFilter) return false;

      if (statusFilter === "OVERDUE" && (calc.daysRemaining === undefined || calc.daysRemaining >= 0 || calc.status === "COMPLETED")) return false;
      if (statusFilter === "URGENT" && (calc.daysRemaining === undefined || calc.daysRemaining < 0 || calc.daysRemaining > 5 || calc.status === "COMPLETED")) return false;
      if (statusFilter === "PENDING" && (calc.status === "COMPLETED" || (calc.daysRemaining !== undefined && calc.daysRemaining < 0))) return false;
      if (statusFilter === "COMPLETED" && calc.status !== "COMPLETED") return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = matter.title.toLowerCase().includes(q);
        const matchesAuth = matter.authority.toLowerCase().includes(q);
        const matchesRef = (matter.reference_number || "").toLowerCase().includes(q);
        const matchesRule = calc.legalBasis.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuth && !matchesRef && !matchesRule) return false;
      }

      return true;
    });
  }, [evaluatedMatters, domainFilter, statusFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {toastMsg && <Toast type="info" message={toastMsg} onClose={() => setToastMsg("")} />}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Citizen Legal Dashboard &amp; Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Statutory Matters &amp; RTI Cases
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Track RTI requests, consumer complaints, tenancy deposits, and workplace disputes with automated statutory countdowns, appeal guidance, and 100% private local storage.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Track New Matter</span>
            </button>
            <button
              onClick={handleExportJson}
              title="Export local matters as JSON backup"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("deadlines")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === "deadlines"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Statutory Deadlines ({matters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === "consultations"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Saved RTI Cases ({cases.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === "documents"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileUp className="w-4 h-4" />
            <span>My Documents ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === "profile"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile &amp; Privacy</span>
          </button>
        </div>

        {/* TAB 1: STATUTORY DEADLINES & MATTERS */}
        {activeTab === "deadlines" && (
          <div className="space-y-6">
            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  {stats.total}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Tracked</div>
                  <div className="text-sm font-bold text-slate-900">{stats.total} matters</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  {stats.overdue}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Overdue / Appeal</div>
                  <div className="text-sm font-bold text-rose-700">{stats.overdue} require action</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  {stats.urgent}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Due Soon (≤5d)</div>
                  <div className="text-sm font-bold text-amber-700">{stats.urgent} upcoming</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  {stats.completed}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Completed</div>
                  <div className="text-sm font-bold text-emerald-700">{stats.completed} resolved</div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, authority, reference number, or statutory rule..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ALL">All Legal Domains</option>
                  <option value="RTI_ACCESS">RTI Access</option>
                  <option value="CONSUMER_PROTECTION">Consumer Protection</option>
                  <option value="TENANT_RIGHTS">Tenant Rights</option>
                  <option value="WORKPLACE_RIGHTS">Workplace Rights</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="OVERDUE">Overdue Only</option>
                  <option value="URGENT">Due Within 5 Days</option>
                  <option value="PENDING">Active Pending</option>
                  <option value="COMPLETED">Completed</option>
                </select>

                {matters.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    title="Clear all tracked matters"
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Matter Cards List */}
            {filteredMatters.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No matters match your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  Add an RTI, consumer, tenancy or workplace filing to calculate deadlines automatically.
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-xs hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Track First Matter</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {filteredMatters.map(({ matter }) => (
                  <MatterCard
                    key={matter.id}
                    matter={matter}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteMatter}
                  />
                ))}
              </div>
            )}

            {/* Local Privacy Note */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">
                  100% Client-Side Privacy Guarantee
                </span>
                <p className="leading-relaxed">
                  All case names, filing dates, reference numbers, and authorities are calculated and stored exclusively in your local browser memory (<code>localStorage</code>). No personal case data is sent to external servers or AI endpoints.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SAVED RTI CASES (FROM ROLE CONTEXT) */}
        {activeTab === "consultations" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved cases..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {cases.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No saved RTI cases yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  Generate an RTI petition or civic application to save it to your dashboard.
                </p>
                <Link
                  href="/ask"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-xs hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Draft RTI Application</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {cases
                  .filter((c) => c.id.toLowerCase().includes(searchQuery.toLowerCase()) || c.issue.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleOpenCase(c)}
                      className="bg-white border border-slate-200 hover:border-indigo-500/30 rounded-xl p-4 flex items-center justify-between shadow-xs cursor-pointer group transition-colors"
                    >
                      <div className="space-y-1.5 min-w-0 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900">{c.id}</span>
                          <StatusBadge status={c.status} />
                          <StatusBadge status={c.priority} />
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                          {c.issue}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500">
                          <span>PIO: {c.aiResponse?.authority.organization || "Public Information Officer"}</span>
                          <span>Created: {new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex justify-between items-center shadow-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Local Citizen Documents</h3>
                <p className="text-xs text-slate-500 mt-0.5">Files remain client-side in browser memory only.</p>
              </div>

              <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-xs gap-2 transition-colors">
                <FileUp className="h-4 w-4" />
                <span>Upload Document</span>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {documents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No documents uploaded yet.</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3">Document Name</th>
                      <th className="px-6 py-3">Size</th>
                      <th className="px-6 py-3">Uploaded Date</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-900">
                    {documents.map((doc, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-indigo-600 shrink-0" />
                          <span className="font-semibold">{doc.name}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{doc.size}</td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setToastMsg(`Downloaded ${doc.name}`)}
                            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === "profile" && (
          <Card className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Applicant Details (Client-Side)</h3>
              <p className="text-[10px] text-slate-500">Stored strictly in local browser session.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Default Applicant Name" placeholder="Your Name" defaultValue="Citizen Applicant" />
              <Input label="Default Post Address" placeholder="Your Address" defaultValue="Local Address" />
              <Input label="Mobile Number" placeholder="+91 98765 43210" />
              <Input label="Email Address" placeholder="citizen@example.com" />
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3.5 flex gap-2">
              <User className="h-5 w-5 text-indigo-600 shrink-0" />
              <span className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Privacy Safeguard:</strong> InfoRight AI never transmits profile details to third-party databases. All draft forms and petitions compile data locally on your device.
              </span>
            </div>
          </Card>
        )}

        {/* Add Matter Modal */}
        <AddMatterModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddMatter={handleAddMatter}
        />

        {/* Case Details Modal */}
        {selectedCase && (
          <Modal
            isOpen={isCaseModalOpen}
            onClose={() => setIsCaseModalOpen(false)}
            title={`Case ${selectedCase.id}: ${selectedCase.issue.slice(0, 40)}...`}
          >
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">PIO / Public Authority</span>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedCase.aiResponse?.authority.organization || "Public Authority"}
                </p>
              </div>

              {selectedCase.aiResponse && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Subject</span>
                  <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200 mt-1">
                    {selectedCase.aiResponse.subject}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <SecondaryButton onClick={handleCopyCaseRti} icon={Copy}>
                  Copy Application
                </SecondaryButton>
                <Link href={`/dashboard/cases/${selectedCase.id}`}>
                  <PrimaryButton>Open Full Case Timeline</PrimaryButton>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
