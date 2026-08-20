"use client";

import React, { useState } from "react";
import { Search, Phone, ExternalLink, Scale, ShieldAlert, HeartHandshake, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { StatusBadge } from "@/components/Feedback";

interface Resource {
  title: string;
  category: "Legal Aid" | "Govt Portal" | "NGO" | "Helpline";
  desc: string;
  contact: string;
  url?: string;
}

const RESOURCES_LIST: Resource[] = [
  {
    title: "National Legal Services Authority (NALSA)",
    category: "Legal Aid",
    desc: "A constitutional body providing free legal counsel and representation to weaker sections, women, and children.",
    contact: "Helpline: 15100",
    url: "https://nalsa.gov.in"
  },
  {
    title: "National Consumer Helpline (NCH)",
    category: "Helpline",
    desc: "Ministry of Consumer Affairs portal to register grievances against fraudulent merchants or deficient warranty services.",
    contact: "Helpline: 1915",
    url: "https://consumerhelpline.gov.in"
  },
  {
    title: "Coimbatore City Municipal Corporation (CCMC) Portal",
    category: "Govt Portal",
    desc: "Submit complaints regarding road repairs, drainage blocks, and municipal utility connections in Coimbatore.",
    contact: "Phone: 1800-425-4900",
    url: "https://www.ccmc.gov.in"
  },
  {
    title: "State Cyber Crime Cell",
    category: "Helpline",
    desc: "Official emergency response center to report digital bank fraud, identity theft, cyberstalking, and hacking.",
    contact: "Helpline: 1930",
    url: "https://cybercrime.gov.in"
  },
  {
    title: "District Legal Services Authority (DLSA) Coimbatore",
    category: "Legal Aid",
    desc: "Local court district committee offering legal guidance, filing assistance, and disputes reconciliation.",
    contact: "Office: District Court Complex, Coimbatore",
  },
  {
    title: "PRATHAM - Citizen Action Network",
    category: "NGO",
    desc: "Grievance support and guidance organization helping citizens submit RTIs and monitor public service delivery.",
    contact: "Contact: info@pratham.org",
    url: "https://www.pratham.org"
  },
  {
    title: "National Commission for Women (NCW) Cell",
    category: "Helpline",
    desc: "24/7 national counseling and emergency legal response cell for women facing harassment or domestic disputes.",
    contact: "Helpline: 7827170170",
    url: "https://ncw.nic.in"
  },
  {
    title: "Elderline National Helpline",
    category: "Helpline",
    desc: "Government support hotline offering pension grievance help, care, and shelter advice to senior citizens.",
    contact: "Helpline: 14567"
  }
];

const FAQS_LIST = [
  {
    q: "What is the Right to Information (RTI) Act, 2005?",
    a: "The RTI Act empowers citizens to request records, logs, and files from any public authority or government office in India. The department is legally obligated to reply within 30 days of receiving the request."
  },
  {
    q: "How do I file an RTI application using the generated draft?",
    a: "Simply copy or print the draft generated on our 'Ask AI' page. Verify the PIO name. Enclose a fee of Rs. 10 (using an Indian Postal Order or Court Fee Stamp) and send it to the Public Information Officer via Registered/Speed Post."
  },
  {
    q: "Does InfoRight AI store my personal information on external servers?",
    a: "No. InfoRight enforces a strict browser-local privacy shield. Your name, complete address, and signature files are processed inside your computer memory and are never transmitted to AI or server logs."
  },
  {
    q: "What happens if a municipal office refuses to reply to my request?",
    a: "If the PIO does not reply within 30 days, or rejects your application without valid reasons, you can file a First Appeal before the designated First Appellate Authority of that same department within 45 days."
  },
  {
    q: "Are the AI responses legally binding?",
    a: "No. The AI responses are informational templates and classifications to assist citizens in representing their civic problems factually. They do not constitute formal legal counsel. Users should verify provisions before filings."
  }
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  const filteredResources = RESOURCES_LIST.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" ? true : r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (idx: number) => {
    setFaqOpenIdx(faqOpenIdx === idx ? null : idx);
  };

  return (
    <div className="flex-1 space-y-6 max-w-6xl mx-auto w-full py-4 bg-slate-50/20">
      
      {/* Page Header */}
      <div className="border-b border-borders pb-4">
        <span className="text-[10.5px] font-bold text-indigo-primary uppercase tracking-wider block">Help & Resources</span>
        <h1 className="text-2xl font-bold tracking-tight text-dark-text sm:text-3xl uppercase">
          Reference Library & Helplines
        </h1>
        <p className="text-xs sm:text-sm text-secondary-text mt-1">
          Access emergency toll-free contact numbers, verified government dispute portals, and frequently asked legal questions.
        </p>
      </div>

      {/* 1. Highly Visible Emergency Panel (Subtle warning styling) */}
      <Card className="border-l-4 border-warning-amber bg-amber-50/15">
        <div className="flex items-start gap-3.5">
          <ShieldAlert className="h-6 w-6 text-warning-amber shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-dark-text uppercase tracking-wide">Emergency Legal & Crime Response</span>
            <p className="text-xs text-secondary-text leading-relaxed">
              If you have experienced financial cyber theft, online harassment, or require immediate rescue services, contact these national centers immediately.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3.5">
              <div className="bg-white border border-borders rounded p-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-secondary-text uppercase block">Cyber Crime</span>
                  <span className="text-sm font-bold text-dark-text block">1930</span>
                </div>
                <Phone className="h-4.5 w-4.5 text-indigo-primary" />
              </div>
              <div className="bg-white border border-borders rounded p-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-secondary-text uppercase block">Women Helpline</span>
                  <span className="text-sm font-bold text-dark-text block">1091 / 112</span>
                </div>
                <Phone className="h-4.5 w-4.5 text-indigo-primary" />
              </div>
              <div className="bg-white border border-borders rounded p-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-secondary-text uppercase block">Senior Citizens</span>
                  <span className="text-sm font-bold text-dark-text block">14567</span>
                </div>
                <Phone className="h-4.5 w-4.5 text-indigo-primary" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Resource list with search & filter */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-b border-borders pb-2 flex justify-between items-center">
            <h2 className="text-sm font-bold text-dark-text uppercase tracking-wider">Resources Directory</h2>
            <span className="text-xs font-semibold text-secondary-text">{filteredResources.length} Verified Links</span>
          </div>

          {/* Search bar and Category Pills */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-secondary-text" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources by organization or type..."
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-borders text-xs text-dark-text bg-white transition-colors focus:border-indigo-primary focus:outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {["all", "Legal Aid", "Govt Portal", "NGO", "Helpline"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "bg-indigo-primary border-indigo-primary text-white"
                      : "bg-white border-borders text-secondary-text hover:text-dark-text hover:bg-slate-50"
                  }`}
                >
                  {cat === "all" ? "All Resources" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredResources.map((res, idx) => (
              <div key={idx} className="bg-white border border-borders rounded-lg p-5 flex flex-col justify-between shadow-2xs hover:border-indigo-primary/20 transition-all">
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-dark-text block truncate max-w-[170px]">{res.title}</span>
                    <StatusBadge status={res.category === "Legal Aid" ? "Verified" : "Low"} className="scale-90" />
                  </div>
                  <p className="text-xs text-secondary-text leading-relaxed line-clamp-3">{res.desc}</p>
                </div>
                
                <div className="border-t border-borders pt-3 mt-4.5 flex justify-between items-center text-xs">
                  <span className="font-bold text-dark-text">{res.contact}</span>
                  {res.url && (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-primary font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: FAQs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border-b border-borders pb-2">
            <h2 className="text-sm font-bold text-dark-text uppercase tracking-wider">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS_LIST.map((faq, idx) => {
              const isOpen = faqOpenIdx === idx;
              return (
                <div key={idx} className="bg-white border border-borders rounded-lg overflow-hidden shadow-2xs">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-4 py-3.5 text-left text-xs font-bold text-dark-text hover:bg-slate-50 flex justify-between items-center cursor-pointer transition-colors"
                  >
                    <span className="leading-relaxed pr-2">{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-indigo-primary" /> : <ChevronDown className="h-4 w-4 shrink-0 text-secondary-text" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4.5 text-xs text-secondary-text leading-relaxed border-t border-slate-50 pt-2.5 bg-slate-50/15">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
