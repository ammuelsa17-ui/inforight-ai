"use client";

import React, { useState, useMemo } from "react";
import { CitizenMatter } from "@/types/deadlines";
import { MasterDomain } from "@/types/source-data";
import {
  STATUTORY_DEADLINE_RULES,
  getDeadlineRulesForDomain
} from "@/data/deadlines/deadline-registry";
import {
  getTodayUtcIso,
  calculateMatterDeadline,
  formatFriendlyDate
} from "@/lib/deadlines/deadline-engine";
import {
  X,
  Plus,
  Clock,
  ShieldCheck,
  Building,
  FileText,
  AlertCircle
} from "lucide-react";

interface AddMatterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMatter: (matter: CitizenMatter) => void;
}

const INDIAN_STATES_AND_UTS = [
  "National",
  "Tamil Nadu",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Telangana",
  "Andhra Pradesh",
  "Uttar Pradesh",
  "West Bengal",
  "Gujarat",
  "Kerala",
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Bihar",
  "Odisha",
  "Madhya Pradesh",
  "Chandigarh",
  "Puducherry"
];

export default function AddMatterModal({
  isOpen,
  onClose,
  onAddMatter
}: AddMatterModalProps) {
  const [domain, setDomain] = useState<MasterDomain>("RTI_ACCESS");
  const [stateUt, setStateUt] = useState("National");
  const [title, setTitle] = useState("");
  const [authority, setAuthority] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [filingDate, setFilingDate] = useState(getTodayUtcIso());
  const [selectedRuleId, setSelectedRuleId] = useState("RTI_SEC_7_1_NORMAL");
  const [notes, setNotes] = useState("");

  // Available rules for selected domain and state
  const applicableRules = useMemo(() => {
    return getDeadlineRulesForDomain(domain, stateUt);
  }, [domain, stateUt]);

  // Ensure selected rule is valid when domain changes
  React.useEffect(() => {
    if (applicableRules.length > 0) {
      if (!applicableRules.some((r) => r.deadline_id === selectedRuleId)) {
        setSelectedRuleId(applicableRules[0].deadline_id);
      }
    }
  }, [applicableRules, selectedRuleId]);

  // Preview statutory calculation
  const previewMatter: CitizenMatter = {
    id: "preview-temp",
    title: title || "New Matter Preview",
    domain,
    state_ut: stateUt,
    authority: authority || "Public Authority",
    reference_number: referenceNumber,
    trigger_rule_id: selectedRuleId,
    filing_date: filingDate,
    status: "AWAITING_RESPONSE",
    notes,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const previewResult = useMemo(() => {
    return calculateMatterDeadline(previewMatter);
  }, [previewMatter]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMatter: CitizenMatter = {
      id: `matter_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      domain,
      state_ut: stateUt,
      authority: authority.trim() || "Public Authority",
      reference_number: referenceNumber.trim() || undefined,
      trigger_rule_id: selectedRuleId,
      filing_date: filingDate,
      status: "AWAITING_RESPONSE",
      notes: notes.trim() || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onAddMatter(newMatter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Track New Statutory Matter</h2>
              <span className="text-xs text-slate-500">
                Calculates official statutory disposal windows and appeal stages deterministically.
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6 space-y-4 text-xs">
          {/* Domain & Jurisdiction Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Legal Knowledge Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as MasterDomain)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-slate-900"
              >
                <option value="RTI_ACCESS">RTI Access (RTI Act 2005)</option>
                <option value="CONSUMER_PROTECTION">Consumer Protection (CPA 2019 / E-Commerce)</option>
                <option value="TENANT_RIGHTS">Tenant Rights (TNRRRLT / Rent Authority)</option>
                <option value="WORKPLACE_RIGHTS">Workplace Rights (Code on Wages / Gratuity)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                State / UT Jurisdiction
              </label>
              <select
                value={stateUt}
                onChange={(e) => setStateUt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-slate-900"
              >
                {INDIAN_STATES_AND_UTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Matter Title */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Matter Title / Description *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. RTI regarding Ward 12 Road Tender Sanctions"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900 font-medium"
            />
          </div>

          {/* Statutory Trigger Event Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Statutory Event / Trigger Type *
            </label>
            <select
              value={selectedRuleId}
              onChange={(e) => setSelectedRuleId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-slate-900"
            >
              {applicableRules.map((rule) => (
                <option key={rule.deadline_id} value={rule.deadline_id}>
                  {rule.trigger_event} — {rule.duration} {rule.duration_unit.replace("_", " ").toLowerCase()} ({rule.section_or_rule})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Authority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Filing / Event Date *
              </label>
              <input
                type="date"
                required
                value={filingDate}
                onChange={(e) => setFilingDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Public Authority / Entity
              </label>
              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                placeholder="e.g. CPIO, Municipal Corporation"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Reference Number */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Registration / Acknowledgment Number (Optional)
            </label>
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="e.g. DOTEL/R/E/24/00123"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-mono text-slate-900"
            />
          </div>

          {/* Statutory Preview Card */}
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Calculated Statutory Deadline:</span>
              </span>
              <span className="font-bold text-sm text-indigo-700 font-mono">
                {previewResult.formattedDeadlineDate}
              </span>
            </div>
            <p className="text-[11px] text-indigo-800 leading-relaxed">
              <strong>Legal Basis:</strong> {previewResult.legalBasis} (Source: {previewResult.sourceRecordId})
            </p>
          </div>

          {/* Privacy Note */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>100% Client-Side Privacy:</strong> This case matter is stored purely in your browser memory/localStorage. No personal case details are sent to any remote server.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-colors"
            >
              Save &amp; Track Matter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
