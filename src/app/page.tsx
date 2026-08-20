"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  MessageSquare,
  Lock,
  HeartHandshake,
  CheckCircle,
  FileText,
  Search,
  BookOpen,
  Home,
  Briefcase,
  ShoppingBag,
  UserCheck,
  GraduationCap,
  Heart,
  HelpCircle
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/Button";

const RIGHTS_CATEGORIES = [
  { id: "fundamental", title: "Fundamental Rights", desc: "Basic constitutional protections and civil liberties for every citizen.", icon: Scale },
  { id: "consumer", title: "Consumer Rights", desc: "Protection against unfair trade practices and substandard products.", icon: ShoppingBag },
  { id: "tenant", title: "Tenant Rights", desc: "Renter protections, rent control, deposits, and eviction prevention rules.", icon: Home },
  { id: "labour", title: "Labour & Work Rights", desc: "Minimum wage, working hours, safety, and discrimination protections.", icon: Briefcase },
  { id: "womens", title: "Women's Rights", desc: "Gender equality, workplace safety, domestic protections, and family laws.", icon: UserCheck },
  { id: "student", title: "Student Rights", desc: "Right to education, academic freedom, and anti-harassment protections.", icon: GraduationCap },
  { id: "senior", title: "Senior Citizen Rights", desc: "Maintenance rights, healthcare benefits, and government pension schemes.", icon: Heart },
  { id: "legal-aid", title: "Legal Aid Directory", desc: "Pro-bono legal support and government schemes for underprivileged citizens.", icon: HelpCircle }
];

export default function LandingPage() {
  const router = useRouter();
  const [problemInput, setProblemInput] = useState("");

  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (problemInput.trim()) {
      router.push(`/ask?issue=${encodeURIComponent(problemInput)}`);
    } else {
      router.push("/ask");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-primary/5 border border-indigo-primary/10 mb-6.5">
              <ShieldCheck className="h-4 w-4 text-indigo-primary" />
              <span className="text-xs font-bold text-indigo-primary uppercase tracking-wider">Empowering Citizens with AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark-text leading-tight sm:leading-none">
              Understand Your Rights.<br/>
              <span className="text-indigo-primary">Know What To Do Next.</span>
            </h1>
            
            <p className="mt-6 text-base sm:text-lg text-secondary-text leading-relaxed max-w-2xl mx-auto">
              Citizens should be able to describe their civic or legal problem in simple words and receive AI-assisted information about their rights and possible next steps.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4.5 justify-center">
              <PrimaryButton
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => router.push("/ask")}
                className="w-full sm:w-auto text-base py-3 px-6"
              >
                Describe Your Problem
              </PrimaryButton>
              <SecondaryButton
                icon={Scale}
                onClick={() => router.push("/rights")}
                className="w-full sm:w-auto text-base py-3 px-6 bg-white"
              >
                Know Your Rights
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main AI Problem-Input Preview */}
      <section className="py-12 bg-white -mt-8 sm:-mt-12 relative z-10 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-borders rounded-xl shadow-md p-6 sm:p-8">
          <span className="text-[10.5px] font-bold text-indigo-primary uppercase tracking-wider block mb-2">Try the AI Assistant</span>
          <h2 className="text-lg font-bold text-dark-text tracking-tight mb-4">
            Type your civic or legal situation in plain language
          </h2>
          
          <form onSubmit={handleStartConsultation} className="space-y-4">
            <div className="relative">
              <textarea
                value={problemInput}
                onChange={(e) => setProblemInput(e.target.value)}
                placeholder='Example: "My landlord is refusing to return my security deposit and is not answering my calls."'
                className="w-full px-4.5 py-3.5 border border-borders rounded-lg text-sm text-dark-text bg-slate-50/20 shadow-2xs focus:border-indigo-primary focus:outline-none min-h-[100px] resize-none"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-secondary-text">
                <Lock className="h-4 w-4 text-indigo-primary" />
                <span>Personal identifiers (names, addresses) are kept private in your browser.</span>
              </div>
              <PrimaryButton type="submit" icon={ArrowRight} iconPosition="right" className="self-end sm:self-auto cursor-pointer">
                Submit to Assistant
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>

      {/* 3. How InfoRight Works */}
      <section className="py-20 bg-slate-50/30 border-t border-b border-borders/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-indigo-primary uppercase tracking-wider">Process Overview</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark-text tracking-tight mt-2">
              Empowering Citizens In 4 Simple Steps
            </h2>
            <p className="text-sm text-secondary-text mt-3">
              We translate complex legal frameworks and civic paperwork into action-oriented, simple guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Describe Situation",
                desc: "Explain the road, public service, or tenancy issue you are facing in simple language.",
                icon: MessageSquare
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "The system identifies the core issue, relevant civic standards, and citizen rights.",
                icon: ShieldCheck
              },
              {
                step: "03",
                title: "Generate RTI Draft",
                desc: "We generate a structured draft asking for government records from the local authority.",
                icon: FileText
              },
              {
                step: "04",
                title: "Take Official Action",
                desc: "Review the output, download the documentation, and submit to the municipal officer.",
                icon: CheckCircle
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-white border border-borders rounded-lg p-6 relative shadow-2xs hover:border-indigo-primary/20 transition-all">
                  <span className="absolute top-4 right-5 text-3xl font-bold text-indigo-primary/10 tracking-tight">
                    {step.step}
                  </span>
                  <div className="bg-indigo-primary/5 text-indigo-primary p-2.5 rounded-lg w-fit mb-5">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-sm font-bold text-dark-text tracking-tight uppercase mb-2">{step.title}</h3>
                  <p className="text-xs text-secondary-text leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Know Your Rights Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-indigo-primary uppercase tracking-wider">Resource Center</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark-text tracking-tight mt-2">
              Browse Rights by Category
            </h2>
            <p className="text-sm text-secondary-text mt-3">
              Select a category to learn about standard regulations, legal provisions, and available help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RIGHTS_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => router.push(`/rights/${category.id}`)}
                  className="bg-white border border-borders rounded-lg p-5 shadow-2xs hover:border-indigo-primary/40 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-indigo-primary/5 text-indigo-primary p-2 rounded w-fit mb-4 group-hover:bg-indigo-primary/10 transition-colors">
                      <Icon className="h-5.5 w-5.5 text-indigo-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-dark-text tracking-tight mb-1.5">{category.title}</h3>
                    <p className="text-xs text-secondary-text leading-relaxed line-clamp-3">{category.desc}</p>
                  </div>
                  
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-primary mt-4 group-hover:text-indigo-primary/80">
                    <span>Explore category</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Key Platform Benefits */}
      <section className="py-20 bg-slate-50/50 border-t border-b border-borders/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[11px] font-bold text-indigo-primary uppercase tracking-wider block mb-2">Platform Benefits</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark-text tracking-tight">
                Designed for Transparency and Empowerment
              </h2>
              <p className="text-sm text-secondary-text mt-4 leading-relaxed">
                InfoRight AI bridges the information gap between public offices and citizens, enabling you to represent your issues clearly and factually.
              </p>
              
              <div className="mt-8 space-y-4">
                {[
                  { title: "Structured Legal Sections", desc: "No wall of text. We divide guidance into rights, legal codes, evidence, and support." },
                  { title: "Deterministic Validation", desc: "Official links, local fees, and public offices are constructed securely using allowlisted databases." },
                  { title: "Empowerment for Officials", desc: "Officers receive well-structured, clear applications, easing processing bottlenecks." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-dark-text block">{item.title}</span>
                      <p className="text-xs text-secondary-text mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white border border-borders rounded-xl p-6 sm:p-8 shadow-xs relative">
              <div className="absolute top-4 right-4 bg-sky-blue/10 text-indigo-primary px-2.5 py-1 rounded text-[10px] font-bold uppercase">
                AI Guidance Demo
              </div>
              <span className="text-xs font-bold text-indigo-primary block uppercase tracking-wide mb-3">AI Response Sample</span>
              <div className="space-y-4">
                <div className="border border-indigo-primary/20 rounded bg-indigo-primary/5 p-3.5">
                  <span className="text-xs font-bold text-indigo-primary block uppercase tracking-wider">Your Rights</span>
                  <p className="text-xs text-dark-text mt-1 leading-relaxed">
                    Under the Municipal Corporation Act, citizens possess a right to pothole-free public roads. Maintenance budgets are public records.
                  </p>
                </div>
                <div className="border border-sky-blue/20 rounded bg-sky-light-bg p-3.5">
                  <span className="text-xs font-bold text-dark-text block uppercase tracking-wider">What You Can Do Now</span>
                  <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                    Draft a formal application to the Public Information Officer requesting expenditure logs on road repairs for the past fiscal year.
                  </p>
                </div>
                <div className="border border-borders rounded p-3.5">
                  <span className="text-xs font-bold text-dark-text block uppercase tracking-wider">Necessary Evidence</span>
                  <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                    Geotagged photos of road defects, complaints registry screenshots, and news articles on local accidents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trust & Privacy Information */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-indigo-primary/5 border border-indigo-primary/10 rounded-xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-primary/5 rounded-full blur-xl" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sky-blue/10 rounded-full blur-xl" />
            
            <Lock className="h-10 w-10 text-indigo-primary mx-auto mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-dark-text tracking-tight">
              Privacy First. Secure Browser Environment.
            </h2>
            <p className="text-sm text-secondary-text leading-relaxed mt-4 max-w-2xl mx-auto">
              We enforce a strict privacy boundary. Your name, complete address, phone numbers, and signatures never leave your browser. They are not sent to any AI generation APIs, ensuring full anonymity under public disclosure laws.
            </p>
            <div className="mt-8 flex justify-center gap-8 text-xs font-semibold text-dark-text">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success-green" /> 100% Client-side Personal Data</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-success-green" /> Allowlisted Citations Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Legal Aid/Resources Preview */}
      <section className="py-20 bg-slate-50/30 border-t border-borders/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col justify-center">
              <span className="text-[11px] font-bold text-indigo-primary uppercase tracking-wider block mb-2">Legal Resources</span>
              <h2 className="text-2xl font-bold text-dark-text tracking-tight">
                Government Helplines and Legal Aid Centers
              </h2>
              <p className="text-xs text-secondary-text mt-3 leading-relaxed">
                Connect with verified governmental bodies, legal clinics, and civic forums for real-time support.
              </p>
              <Link href="/resources" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-primary hover:text-indigo-primary/80 mt-5 w-fit">
                <span>View Full Resource Directory</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "National Legal Services Authority", type: "Legal Aid", desc: "Constitutional body providing free legal services to weaker sections of society.", contact: "15100 / nalsa.gov.in" },
                { title: "National Consumer Helpline", type: "Govt Portal", desc: "Official portal to register complaints against trade malpractices and consumer grievances.", contact: "1915 / consumerhelpline.gov.in" },
                { title: "ccmc.gov.in (Coimbatore CCMC)", type: "Govt Portal", desc: "Local body official portal to register civic service issues and file RTIs directly.", contact: "ccmc.gov.in / 1800-425-4900" },
                { title: "District Legal Services (DLSA)", type: "Legal Aid", desc: "District-level administrative committees providing guidance and dispute resolution support.", contact: "Local Court Premises" }
              ].map((res, idx) => (
                <div key={idx} className="bg-white border border-borders rounded-lg p-5 shadow-2xs">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-dark-text block truncate max-w-[150px]">{res.title}</span>
                    <span className="bg-slate-100 border border-slate-200 text-secondary-text px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {res.type}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-text leading-relaxed line-clamp-2 mb-4">{res.desc}</p>
                  <div className="text-xs font-semibold text-indigo-primary pt-3 border-t border-borders">
                    Contact: {res.contact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Important Disclaimer */}
      <section className="py-10 bg-slate-50 border-t border-borders/60 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-danger-red uppercase tracking-wider mb-2.5">
            <ShieldCheck className="h-4 w-4 text-danger-red" />
            <span>Important Legal Disclaimer</span>
          </div>
          <p className="text-[11px] text-secondary-text leading-relaxed">
            InfoRight AI provides structured, educational information on civic rights, public record requests, and local government frameworks using generative AI tools. <strong>This guidance is informational only and does not constitute professional legal advice.</strong> Information is drafted in good faith, and users are urged to consult qualified legal counsel or the official department directories before filing petitions or applications.
          </p>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-dark-text text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8.5">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-6 w-6 text-sky-blue" />
                <span className="font-bold text-base tracking-tight text-white">InfoRight AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering citizens across municipal structures through AI-guided public record drafts and clear rights education.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-semibold">
                <li><Link href="/" className="hover:text-white transition-colors">Home Page</Link></li>
                <li><Link href="/ask" className="hover:text-white transition-colors">Ask AI Assistant</Link></li>
                <li><Link href="/rights" className="hover:text-white transition-colors">Know Your Rights</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources Helpline</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Legal Guides</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-semibold">
                <li><Link href="/rights/tenant" className="hover:text-white transition-colors">Tenant Rights</Link></li>
                <li><Link href="/rights/consumer" className="hover:text-white transition-colors">Consumer Rights</Link></li>
                <li><Link href="/rights/labour" className="hover:text-white transition-colors">Labour Rules</Link></li>
                <li><Link href="/rights/fundamental" className="hover:text-white transition-colors">Fundamental Rights</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Strict privacy boundary prevents names, details, and signatures from being transmitted to external servers.
              </p>
              <div className="inline-flex items-center gap-1 text-[10px] text-sky-blue font-bold">
                <Lock className="h-3 w-3" />
                <span>100% Client Encryption Boundary</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-semibold">
            <span>&copy; {new Date().getFullYear()} InfoRight AI. Coimbatore CCMC Pilot project.</span>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
