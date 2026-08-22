"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import {
  Search,
  FolderOpen,
  AlertOctagon,
  Clock,
  CheckCircle2,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { Card, StatCard } from "@/components/Card";
import { Input } from "@/components/Input";
import { StatusBadge, EmptyState } from "@/components/Feedback";
import { useLanguage } from "@/context/LanguageContext";

export default function OfficialDashboardPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="p-6 text-xs text-secondary-text font-bold uppercase tracking-wider">{t("common.loading")}</div>}>
      <OfficialDashboardContent />
    </Suspense>
  );
}

function OfficialDashboardContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";
  const activeTab = searchParams.get("tab") || "cases";

  const { cases, role, setRole } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Ensure role is elevated to official
  React.useEffect(() => {
    if (role === "public") {
      setRole("official");
    }
  }, [role, setRole]);

  // Compute stat counts
  const totalRequests = cases.length;
  const pendingCount = cases.filter((c) => c.status === "Pending").length;
  const inProgressCount = cases.filter((c) => c.status === "In Progress").length;
  const resolvedCount = cases.filter((c) => c.status === "Resolved").length;
  const urgentCount = cases.filter((c) => c.priority === "Urgent").length;

  // Filter cases based on search and selected filter parameters
  const filteredCases = cases.filter((c) => {
    // Search filter
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.applicantName?.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "all" ? true : c.status === statusFilter;
    const matchesPriority = priorityFilter === "all" ? true : c.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="flex-1 space-y-6 max-w-6xl mx-auto w-full py-4 bg-slate-50/20">
      
      {/* Page Header */}
      <div className="border-b border-borders pb-4">
        <span className="text-[10.5px] font-bold text-indigo-primary uppercase tracking-wider block">{t("official.badge")}</span>
        <h1 className="text-2xl font-bold tracking-tight text-dark-text sm:text-3xl uppercase">
          {t("official.title")}
        </h1>
        <p className="text-xs sm:text-sm text-secondary-text mt-1">
          {t("official.subtitle")}
        </p>
      </div>

      {activeTab === "cases" && (
        <div className="space-y-6">
          {/* Official Formal Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <StatCard title={t("official.title")} value={totalRequests} icon={FolderOpen} color="indigo" />
            <StatCard title={t("official.title")} value={pendingCount} icon={Clock} color="amber" />
            <StatCard title={t("official.title")} value={inProgressCount} icon={Clock} color="indigo" />
            <StatCard title={t("official.title")} value={resolvedCount} icon={CheckCircle2} color="green" />
            <StatCard title={t("official.title")} value={urgentCount} icon={AlertOctagon} color="red" />
          </div>

          {/* Filtering Tools */}
          <div className="bg-white border border-borders rounded-lg p-4.5 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-text" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("common.search")}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-borders text-xs text-dark-text bg-white transition-colors focus:border-indigo-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3.5 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-secondary-text uppercase">{t("common.status")}</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 border border-borders rounded-lg text-xs bg-white text-dark-text focus:outline-none focus:border-indigo-primary cursor-pointer font-semibold"
                >
                  <option value="all">{t("common.filter")}</option>
                  <option value="Pending">{t("common.status")}</option>
                  <option value="In Progress">{t("common.status")}</option>
                  <option value="Resolved">{t("common.status")}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-secondary-text uppercase">{t("common.filter")}</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-2.5 py-1.5 border border-borders rounded-lg text-xs bg-white text-dark-text focus:outline-none focus:border-indigo-primary cursor-pointer font-semibold"
                >
                  <option value="all">{t("common.filter")}</option>
                  <option value="Low">{t("common.filter")}</option>
                  <option value="Medium">{t("common.filter")}</option>
                  <option value="High">{t("common.filter")}</option>
                  <option value="Urgent">{t("common.filter")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cases Data Table / Cards */}
          {filteredCases.length > 0 ? (
            <div className="bg-white border border-borders rounded-lg overflow-x-auto shadow-2xs">
              <table className="min-w-full divide-y divide-borders text-left text-xs">
                <thead className="bg-slate-50 text-secondary-text font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">{t("dashboard.title")}</th>
                    <th className="px-6 py-4">{t("ask.applicantNameLabel")}</th>
                    <th className="px-6 py-4">{t("ask.problemLabel")}</th>
                    <th className="px-6 py-4">{t("common.status")}</th>
                    <th className="px-6 py-4">{t("common.filter")}</th>
                    <th className="px-6 py-4">{t("ask.dateRangeLabel")}</th>
                    <th className="px-6 py-4 text-right">{t("common.action")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borders text-dark-text font-medium">
                  {filteredCases.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => router.push(`/official/cases/${c.id}`)}
                      className="hover:bg-slate-50/50 cursor-pointer group transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-bold text-indigo-primary">
                        {c.id}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {c.applicantName || "Anonymous Citizen"}
                      </td>
                      <td className="px-6 py-4 max-w-[220px] truncate text-secondary-text">
                        {c.issue}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={c.priority} />
                      </td>
                      <td className="px-6 py-4 text-secondary-text">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-primary group-hover:underline">
                          <span>{t("common.viewDetails")}</span>
                          <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title={t("dashboard.emptyState")}
              description="No citizen-submitted consultations match the selected filter or search terms."
              action={
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setPriorityFilter("all");
                    router.push("/official");
                  }}
                  className="px-4 py-2 text-xs font-bold text-indigo-primary hover:underline cursor-pointer"
                >
                  {t("common.filter")}
                </button>
              }
            />
          )}
        </div>
      )}

      {activeTab === "citizens" && (
        <div className="space-y-4">
          <div className="bg-white border border-borders rounded-lg p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-dark-text uppercase tracking-wider mb-4">{t("official.title")}</h3>
            <div className="space-y-3">
              {cases.map((c) => (
                <div key={c.id} className="p-4 border border-borders rounded-lg bg-slate-50/50 flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-dark-text block">{c.applicantName || "Anonymous Citizen"}</span>
                    <span className="text-secondary-text block">Address: {c.applicantAddress || "Client-Side Isolation"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-secondary-text block mb-1">{t("dashboard.title")}</span>
                    <Link href={`/official/cases/${c.id}`} className="text-xs font-bold text-indigo-primary hover:underline">
                      {c.id}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <Card className="max-w-2xl mx-auto space-y-6 bg-white">
          <div className="border-b border-borders pb-3">
            <h3 className="text-sm font-bold text-dark-text uppercase tracking-wide">{t("official.title")}</h3>
            <p className="text-[10px] text-secondary-text">{t("official.subtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Central Registry Email" defaultValue="pio@ccmc.gov.in" />
            <Input label="RTI Fee Payment Code" defaultValue="0070-00-501-AA-0000" />
            <Input label="Appellate Authority Designation" defaultValue="Joint Commissioner (CCMC)" />
            <Input label="Verification Office Limit" defaultValue="Coimbatore Corporation Limits" />
          </div>

          <div className="bg-sky-light-bg border border-sky-blue/20 rounded-lg p-3.5 flex gap-2">
            <UserCheck className="h-5 w-5 text-indigo-primary shrink-0" />
            <span className="text-[11px] text-secondary-text leading-relaxed">
              <strong>{t("official.title")}</strong> {t("official.subtitle")}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}
