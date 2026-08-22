"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getFormById } from "@/data/forms";
import FormWizard from "@/components/forms/FormWizard";
import { ChevronRight, ArrowLeft, FileText, AlertTriangle } from "lucide-react";

interface FormDynamicPageProps {
  params: Promise<{ id: string }>;
}

export default function FormDynamicPage({ params }: FormDynamicPageProps) {
  const resolvedParams = use(params);
  const formId = decodeURIComponent(resolvedParams.id);
  const form = getFormById(formId);

  if (!form) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 mb-2">Form Not Found</h1>
          <p className="text-xs text-slate-600 mb-6">
            The requested form ID <code className="font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">{formId}</code> is not registered in our verified official catalogue.
          </p>
          <Link
            href="/forms"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Forms Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 overflow-x-auto">
          <Link href="/" className="hover:text-indigo-600 transition-colors whitespace-nowrap">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/forms" className="hover:text-indigo-600 transition-colors whitespace-nowrap">
            Official Forms
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {form.form_code || form.form_name}
          </span>
        </nav>

        {/* Wizard Mount */}
        <FormWizard form={form} />
      </div>
    </div>
  );
}
