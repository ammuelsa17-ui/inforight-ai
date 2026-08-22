"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CitizenMatter } from "@/types/deadlines";
import { calculateMatterDeadline } from "@/lib/deadlines/deadline-engine";
import MatterCard from "@/components/dashboard/MatterCard";
import AddMatterModal from "@/components/dashboard/AddMatterModal";
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
  Scale
} from "lucide-react";

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

  // Save to localStorage whenever matters change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(matters));
      } catch (err) {
        console.warn("Failed to persist matters:", err);
      }
    }
  }, [matters]);

  // Add new matter
  const handleAddMatter = (newMatter: CitizenMatter) => {
    setMatters((prev) => [newMatter, ...prev]);
  };

  // Toggle completed state
  const handleToggleComplete = (id: string) => {
    setMatters((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const newStatus = m.status === "COMPLETED" ? "AWAITING_RESPONSE" : "COMPLETED";
        return {
          ...m,
          status: newStatus,
          completed_at: newStatus === "COMPLETED" ? new Date().toISOString() : undefined,
          updated_at: new Date().toISOString()
        };
      })
    );
  };

  // Delete matter
  const handleDeleteMatter = (id: string) => {
    if (window.confirm("Are you sure you want to remove this matter from your local tracker?")) {
      setMatters((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Export local matters backup
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matters, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `inforight_statutory_tracker_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Clear completed matters
  const handleClearCompleted = () => {
    if (window.confirm("Clear all completed matters from local storage?")) {
      setMatters((prev) => prev.filter((m) => m.status !== "COMPLETED"));
    }
  };

  // Purge all data
  const handlePurgeAll = () => {
    if (window.confirm("WARNING: This will delete ALL saved cases from your browser storage. Proceed?")) {
      setMatters([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  // Calculated statistics
  const statistics = useMemo(() => {
    let activeCount = 0;
    let dueOrOverdueCount = 0;
    let appealsAvailableCount = 0;
    let completedCount = 0;

    matters.forEach((m) => {
      if (m.status === "COMPLETED") {
        completedCount++;
        return;
      }
      activeCount++;
      const res = calculateMatterDeadline(m);
      if (res.status === "DUE_TODAY" || res.status === "OVERDUE") {
        dueOrOverdueCount++;
      } else if (res.status === "APPEAL_AVAILABLE") {
        appealsAvailableCount++;
      }
    });

    return { activeCount, dueOrOverdueCount, appealsAvailableCount, completedCount };
  }, [matters]);

  // Filtered matters
  const filteredMatters = useMemo(() => {
    return matters.filter((m) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          m.title.toLowerCase().includes(q) ||
          m.authority.toLowerCase().includes(q) ||
          (m.reference_number && m.reference_number.toLowerCase().includes(q)) ||
          m.state_ut.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Domain Filter
      if (domainFilter !== "ALL" && m.domain !== domainFilter) {
        return false;
      }

      // 3. Status Filter
      if (statusFilter !== "ALL") {
        const res = calculateMatterDeadline(m);
        if (statusFilter === "COMPLETED" && m.status !== "COMPLETED") return false;
        if (statusFilter === "ACTIVE" && m.status === "COMPLETED") return false;
        if (statusFilter === "ACTION_DUE" && res.status !== "DUE_TODAY" && res.status !== "OVERDUE" && res.status !== "APPEAL_AVAILABLE") return false;
      }

      return true;
    });
  }, [matters, searchQuery, domainFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>Private Citizen Legal Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Statutory Deadline Tracker &amp; Citizen Dashboard
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Track RTI applications, consumer complaints, tenancy notices, and workplace gratuity claims with verified statutory countdowns.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Track New Matter</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Active Matters</span>
            <div className="text-2xl font-extrabold text-slate-900">{statistics.activeCount}</div>
            <span className="text-[11px] text-blue-600 font-medium mt-1 block">Statutory periods running</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Due / Overdue</span>
            <div className="text-2xl font-extrabold text-amber-600">{statistics.dueOrOverdueCount}</div>
            <span className="text-[11px] text-amber-700 font-medium mt-1 block">Response windows expired</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Appeals Available</span>
            <div className="text-2xl font-extrabold text-purple-600">{statistics.appealsAvailableCount}</div>
            <span className="text-[11px] text-purple-700 font-medium mt-1 block">Section 19(1) First Appeals</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Completed Matters</span>
            <div className="text-2xl font-extrabold text-emerald-600">{statistics.completedCount}</div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 block">Concluded proceedings</span>
          </div>
        </div>

        {/* Control Bar: Filters & Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matter title, authority, reference..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-900"
              />
            </div>

            {/* Domain Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-semibold">
              {[
                { id: "ALL", label: "All Domains" },
                { id: "RTI_ACCESS", label: "RTI Access" },
                { id: "CONSUMER_PROTECTION", label: "Consumer" },
                { id: "TENANT_RIGHTS", label: "Tenant Rights" },
                { id: "WORKPLACE_RIGHTS", label: "Workplace" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDomainFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    domainFilter === tab.id
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Pills & Management Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Status:</span>
              {[
                { id: "ALL", label: "All Cases" },
                { id: "ACTIVE", label: "Active Deadlines" },
                { id: "ACTION_DUE", label: "Action Due / Overdue" },
                { id: "COMPLETED", label: "Completed" }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    statusFilter === s.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportData}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-colors"
                title="Export JSON backup"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Backup</span>
              </button>

              <button
                onClick={handleClearCompleted}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 font-medium transition-colors"
                title="Clear completed matters"
              >
                <span>Clear Completed</span>
              </button>

              <button
                onClick={handlePurgeAll}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                title="Delete all cases"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Purge All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Matters Grid */}
        {filteredMatters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredMatters.map((matter) => (
              <MatterCard
                key={matter.id}
                matter={matter}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteMatter}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8">
            <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No Matters Found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Track a new RTI application, consumer grievance, tenancy notice, or workplace claim to start monitoring statutory deadlines.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Track New Matter</span>
            </button>
          </div>
        )}

        {/* Local Storage Privacy Guarantee Banner */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3 mb-8">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 block mb-0.5">
              100% Client-Side Privacy Guarantee
            </span>
            <p className="leading-relaxed">
              All case names, filing dates, reference numbers, and authorities are calculated and stored exclusively in your local browser memory (`localStorage`). No personal case data is sent to external servers or AI endpoints.
            </p>
          </div>
        </div>

        {/* Add Matter Modal */}
        <AddMatterModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddMatter={handleAddMatter}
        />
      </div>
    </div>
  );
}
