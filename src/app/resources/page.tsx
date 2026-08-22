// src/app/resources/page.tsx — Polished Citizen Resources & Verified Public Directory
"use client";

import React, { useState } from "react";
import { Search, Phone, ExternalLink, ShieldAlert, ChevronDown, ChevronUp, ShieldCheck, Globe, Building2, HelpCircle } from "lucide-react";
import { Card } from "@/components/Card";
import { useLanguage } from "@/context/LanguageContext";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";

interface Resource {
  title: string;
  category: "Legal Aid" | "Govt Portal" | "NGO" | "Helpline";
  desc: string;
  contact: string;
  url?: string;
  isOfficial?: boolean;
}

const RESOURCES_LIST: Resource[] = [
  {
    title: "National Legal Services Authority (NALSA)",
    category: "Legal Aid",
    desc: "Statutory constitutional body providing free legal counsel, legal aid clinics, and representation to weaker sections, women, and marginalized citizens.",
    contact: "Helpline: 15100",
    url: "https://nalsa.gov.in",
    isOfficial: true,
  },
  {
    title: "National Consumer Helpline (NCH)",
    category: "Helpline",
    desc: "Ministry of Consumer Affairs portal to register grievances against fraudulent merchants, deficient warranty services, and e-commerce unfair trade practices.",
    contact: "Toll-Free: 1915",
    url: "https://consumerhelpline.gov.in",
    isOfficial: true,
  },
  {
    title: "Coimbatore City Municipal Corporation (CCMC) Portal",
    category: "Govt Portal",
    desc: "Submit complaints regarding road repairs, drainage blocks, streetlight maintenance, and municipal utility connections in Coimbatore.",
    contact: "Phone: 1800-425-4900",
    url: "https://www.ccmc.gov.in",
    isOfficial: true,
  },
  {
    title: "National Cyber Crime Reporting Portal",
    category: "Helpline",
    desc: "Ministry of Home Affairs emergency response system to report digital banking frauds, identity theft, financial scams, and cyber stalking.",
    contact: "Helpline: 1930",
    url: "https://cybercrime.gov.in",
    isOfficial: true,
  },
  {
    title: "District Legal Services Authority (DLSA) Coimbatore",
    category: "Legal Aid",
    desc: "Court-annexed committee providing free legal aid, dispute reconciliation, mediation, and lok adalat support.",
    contact: "Office: District Court Complex, Coimbatore",
    isOfficial: true,
  },
  {
    title: "PRATHAM - Citizen Action Network",
    category: "NGO",
    desc: "Civil society network helping citizens formulate representations, monitor public works delivery, and file RTI follow-ups.",
    contact: "Contact: info@pratham.org",
    url: "https://www.pratham.org",
    isOfficial: false,
  },
  {
    title: "National Commission for Women (NCW) Emergency Cell",
    category: "Helpline",
    desc: "24/7 statutory emergency legal response and counseling cell for women facing harassment, workplace abuse, or domestic disputes.",
    contact: "Helpline: 7827170170",
    url: "https://ncw.nic.in",
    isOfficial: true,
  },
  {
    title: "Elderline National Senior Citizens Helpline",
    category: "Helpline",
    desc: "Ministry of Social Justice support hotline offering pension grievance help, legal guidance, and elder abuse intervention.",
    contact: "Toll-Free: 14567",
    isOfficial: true,
  },
];

const FAQS_LIST = [
  {
    q: "What is the Right to Information (RTI) Act, 2005?",
    a: "The RTI Act empowers Indian citizens to inspect public works, access certified copies of work orders/measurement books, and request government records. Public authorities are legally mandated under Section 7(1) to reply within 30 calendar days.",
  },
  {
    q: "How do I file the generated RTI or Representation draft?",
    a: "Download or print the draft generated in InfoRight AI. Verify the Public Information Officer (PIO) address. For RTI, attach the statutory fee (Rs. 10 via Postal Order / Court Fee Stamp) and send via Registered Post with Acknowledgment Due (RPAD) or submit in person.",
  },
  {
    q: "Does InfoRight AI store my personal information on remote servers?",
    a: "No. InfoRight AI uses a strict browser-local vault. Your personal identifiers (name, personal phone, address) are processed strictly in local browser memory and are never transmitted to external AI endpoints.",
  },
  {
    q: "What happens if a public authority does not reply within 30 days?",
    a: "If the PIO fails to respond within 30 days or rejects your application without valid statutory grounds, you have the legal right under Section 19(1) to file a First Appeal before the First Appellate Authority (FAA) within 45 days.",
  },
  {
    q: "Are the AI action plans and drafts legally binding?",
    a: "No. The drafts and classifications provide source-grounded civic templates to represent citizen grievances factually. They do not constitute formal attorney counsel. Citizens should verify local administrative rules before statutory filings.",
  },
];

export default function ResourcesPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  const filteredResources = RESOURCES_LIST.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" ? true : r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (idx: number) => {
    setFaqOpenIdx(faqOpenIdx === idx ? null : idx);
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        eyebrow={t("resources.badge")}
        title={t("resources.title")}
        description={t("resources.subtitle")}
      />

      {/* Emergency & Key National Helplines Summary Card */}
      <div className="rounded-2xl border border-indigo-100 bg-[#EAF6FF]/60 p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Phone className="h-5 w-5" />
          </div>
          <div className="space-y-1 w-full">
            <span className="text-xs font-bold text-[#102A56] uppercase tracking-wide block">
              National Citizen Emergency &amp; Statutory Helplines
            </span>
            <p className="text-xs text-[#56637A] leading-relaxed">
              Immediate national hotlines for cyber fraud, women safety, senior citizen welfare, and consumer grievances.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              {/* Cyber Helpline */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold text-[#56637A] uppercase block">
                    {t("resources.cyberCrimeHelpline")}
                  </span>
                  <span className="text-base font-bold text-[#102A56] font-mono">1930</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-bold border border-amber-200">
                  24/7
                </div>
              </div>

              {/* Women Helpline */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold text-[#56637A] uppercase block">
                    {t("resources.womenHelpline")}
                  </span>
                  <span className="text-base font-bold text-[#102A56] font-mono">1091 / 112</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center text-xs font-bold border border-rose-200">
                  SOS
                </div>
              </div>

              {/* Senior Citizen Helpline */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold text-[#56637A] uppercase block">
                    {t("resources.seniorCitizenHelpline")}
                  </span>
                  <span className="text-base font-bold text-[#102A56] font-mono">14567</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold border border-indigo-200">
                  Govt
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Directory & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* LEFT COLUMN: Resource list with search & filter */}
        <div className="lg:col-span-8 space-y-5">
          <div className="border-b border-slate-200/80 pb-2.5 flex justify-between items-center">
            <h2 className="text-sm font-bold text-[#102A56] uppercase tracking-wider">
              Verified Public Directory
            </h2>
            <span className="text-xs font-semibold text-[#56637A]">
              {filteredResources.length} {t("resources.verifiedLinksCount")}
            </span>
          </div>

          {/* Search bar and Category Pills */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#56637A]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("common.search")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-[#172033] bg-white transition-colors focus:border-[#4F46E5] focus:outline-none shadow-2xs"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["all", "Legal Aid", "Govt Portal", "NGO", "Helpline"].map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#4F46E5] border-[#4F46E5] text-white shadow-xs"
                        : "bg-white border-slate-200 text-[#102A56] hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {cat === "all" ? t("resources.allResourcesFilter") : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Directory Cards Grid */}
          {filteredResources.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white border border-slate-200 text-xs text-[#56637A]">
              No resources match your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredResources.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4.5 flex flex-col justify-between shadow-2xs hover:border-[#4F46E5]/40 transition-all space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-[#102A56] leading-snug">
                        {res.title}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${
                          res.isOfficial
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {res.isOfficial && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                        {res.isOfficial ? t("resources.officialPortalBadge") : t("resources.verifiedDirectoryBadge")}
                      </span>
                    </div>
                    <p className="text-xs text-[#56637A] leading-relaxed line-clamp-3">{res.desc}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs flex-wrap gap-2">
                    <span className="font-bold text-[#102A56] text-[11px]">{res.contact}</span>
                    {res.url && (
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4F46E5] font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>{t("sources.visitPortal")}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Common Questions / FAQ */}
        <div className="lg:col-span-4 space-y-5">
          <div className="border-b border-slate-200/80 pb-2.5">
            <h2 className="text-sm font-bold text-[#102A56] uppercase tracking-wider">
              {t("resources.faqsTitle")}
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQS_LIST.map((faq, idx) => {
              const isOpen = faqOpenIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-4 py-3.5 text-left text-xs font-bold text-[#102A56] hover:bg-slate-50/80 flex justify-between items-center cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="leading-relaxed pr-2">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-[#4F46E5]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#56637A]" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#56637A] leading-relaxed border-t border-slate-100 pt-2.5 bg-[#EAF6FF]/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
