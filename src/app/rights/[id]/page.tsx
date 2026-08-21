"use client";

import React, { use } from "react";
import Link from "next/link";
import { RIGHTS_DATA } from "@/data/rights";
import { useRole } from "@/context/RoleContext";
import {
  ArrowLeft,
  Scale,
  Bookmark,
  CheckCircle,
  FileText,
  HelpCircle,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Card, AIResponseCard } from "@/components/Card";
import { Toast } from "@/components/Feedback";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RightDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { savedRights, toggleSaveRight } = useRole();
  const [toastMsg, setToastMsg] = useState("");

  function useState(initialVal: string) {
    return React.useState(initialVal);
  }

  const right = RIGHTS_DATA[id];

  if (!right) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-borders rounded-lg max-w-xl mx-auto my-12">
        <h2 className="text-lg font-bold text-dark-text">Right Category Not Found</h2>
        <p className="text-xs text-secondary-text mt-2">The right category you are looking for does not exist in our Phase 1 allowlist.</p>
        <Link href="/rights" className="mt-4 text-xs font-bold text-indigo-primary hover:underline">
          Return to Rights Directory
        </Link>
      </div>
    );
  }

  const isBookmarked = savedRights.includes(right.id);

  const handleSaveToggle = () => {
    toggleSaveRight(right.id);
    setToastMsg(isBookmarked ? "Right removed from dashboard bookmarks" : "Right bookmarked to your citizen dashboard!");
  };

  return (
    <div className="flex-1 space-y-6 max-w-6xl mx-auto w-full py-4">
      {toastMsg && <Toast type="success" message={toastMsg} onClose={() => setToastMsg("")} />}

      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-borders pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/rights"
            className="p-2 rounded-lg text-secondary-text hover:text-dark-text hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-[10px] text-indigo-primary font-bold uppercase tracking-wider block">Citizens Rights Guide</span>
            <h1 className="text-xl font-bold tracking-tight text-dark-text sm:text-2xl uppercase">
              {right.title}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSaveToggle}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            isBookmarked
              ? "bg-indigo-primary/10 border-indigo-primary/30 text-indigo-primary"
              : "bg-white border-borders text-secondary-text hover:text-dark-text hover:bg-slate-50"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-indigo-primary" : ""}`} />
          <span>{isBookmarked ? "Bookmarked to Dashboard" : "Bookmark this Right"}</span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Explanatory Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simple Explanation */}
          <AIResponseCard title="Simple Explanation" variant="sky" icon={BookOpen}>
            <p className="text-sm leading-relaxed text-dark-text">
              {right.details.explanation}
            </p>
          </AIResponseCard>

          {/* When the Right Applies */}
          <AIResponseCard title="When the Right Applies" variant="sky" icon={CheckCircle}>
            <p className="text-sm leading-relaxed text-dark-text">
              {right.details.applies}
            </p>
          </AIResponseCard>

          {/* What the Citizen Can Do */}
          <AIResponseCard title="What the Citizen Can Do" variant="green" icon={CheckCircle}>
            <p className="text-sm leading-relaxed text-dark-text">
              {right.details.whatToDo}
            </p>
          </AIResponseCard>

          {/* Related Rights */}
          {right.details.related && right.details.related.length > 0 && (
            <Card>
              <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-3">Related Guides</span>
              <div className="space-y-2">
                {right.details.related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/rights/${rel.id}`}
                    className="flex items-center justify-between p-3 border border-borders rounded-lg text-xs font-bold text-dark-text hover:border-indigo-primary/30 hover:bg-slate-50 transition-all group"
                  >
                    <span>{rel.name}</span>
                    <ChevronRight className="h-4 w-4 text-secondary-text group-hover:text-indigo-primary transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Relevant Provisions, Documents, Helplines */}
        <div className="lg:col-span-5 space-y-6">
          {/* Law/Legal Provisions */}
          <AIResponseCard title="Relevant Law / Legal Provision" variant="indigo" icon={Scale}>
            <div className="bg-indigo-primary/5 border border-indigo-primary/20 rounded p-4.5">
              <span className="text-xs font-bold text-indigo-primary block uppercase tracking-wider">Statutory Authority</span>
              <p className="text-sm font-semibold text-dark-text mt-2">
                {right.details.law}
              </p>
            </div>
            <p className="text-xs text-secondary-text mt-3.5 leading-relaxed">
              These provisions give citizens statutory standing when drafting grievances or public record requests under municipal jurisdictions.
            </p>
          </AIResponseCard>

          {/* Useful Documents */}
          <AIResponseCard title="Useful Documents & Evidence" variant="sky" icon={FileText}>
            <p className="text-xs text-secondary-text mb-3">Keep these documents ready to attach to your complaints or RTI forms:</p>
            <ul className="space-y-2">
              {right.details.documents.map((doc, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-dark-text">
                  <CheckCircle className="h-4 w-4 text-indigo-primary shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </AIResponseCard>

          {/* Where to Get Help */}
          <AIResponseCard title="Where to Get Help" variant="green" icon={HelpCircle}>
            <div className="bg-success-bg border border-success-green/20 rounded p-4.5">
              <span className="text-xs font-bold text-success-green block uppercase tracking-wider">Verified Helpline / Agency</span>
              <p className="text-sm font-semibold text-dark-text mt-2">
                {right.details.help}
              </p>
            </div>
            <p className="text-xs text-secondary-text mt-3.5 leading-relaxed">
              If local municipal units refuse to comply with your request, escalate the matter directly to the aforementioned regulatory helplines.
            </p>
          </AIResponseCard>
        </div>
      </div>
    </div>
  );
}

