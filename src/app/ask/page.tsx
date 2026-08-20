"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import {
  Scale,
  ShieldCheck,
  FileText,
  Printer,
  Copy,
  Plus,
  RefreshCw,
  AlertTriangle,
  Lock,
  BookOpen,
  HelpCircle,
  CheckCircle
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { generateRti } from "@/services/api";
import { GenerateRtiRequest, GenerateRtiResponse } from "@/types/api";
import { Input, TextArea, Select, FileUpload, VoiceInputButton } from "@/components/Input";
import { Card, AIResponseCard } from "@/components/Card";
import { StatusBadge, AlertBanner, LoadingState, ErrorState, Toast } from "@/components/Feedback";

export default function AskPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading search parameters...</div>}>
      <AskPageContent />
    </Suspense>
  );
}

function AskPageContent() {
  const searchParams = useSearchParams();

  const { addCase } = useRole();

  // URL pre-fill
  const issueParam = searchParams.get("issue") || "";

  // 1. Citizen Personal Details (Client-side ONLY, never sent to API)
  const [applicantName, setApplicantName] = useState("");
  const [applicantAddress, setApplicantAddress] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);

  // 2. Location & Consultation Inputs
  const [issue, setIssue] = useState(issueParam);
  const [state, setState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState("Coimbatore");
  const [localBodyName, setLocalBodyName] = useState("Coimbatore City Municipal Corporation");
  const [locality, setLocality] = useState("");
  const [ward, setWard] = useState("");
  const [dateRange] = useState("Last 90 Days");
  const [selectedSources, setSelectedSources] = useState<string[]>(["CIT-TAM-01", "CIT-TAM-02"]);
  const [simulateFailure, setSimulateFailure] = useState(false);

  // 3. UI Flow States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [activeStep, setActiveStep] = useState(1); // Step 1: Form, Step 2: Response

  // 4. Response & Editing States
  const [generatedResponse, setGeneratedResponse] = useState<GenerateRtiResponse | null>(null);
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editQuestions, setEditQuestions] = useState<string[]>([]);
  const [savedCaseId, setSavedCaseId] = useState<string | null>(null);



  // Mock Voice Recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    const interval = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    setRecordingInterval(interval);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    // Mock text result based on typical user request
    const voiceText = "The street lights in my layout have been completely broken for over two weeks, leading to safety concerns at night.";
    setIssue((prev) => (prev ? prev + " " + voiceText : voiceText));
    showToast("Voice input transcribed successfully");
  };

  const handleFilesSelected = (files: File[]) => {
    const formatted = files.map((f) => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(1) + " MB",
      type: f.type
    }));
    setUploadedFiles((prev) => [...prev, ...formatted]);
    showToast(`${files.length} file(s) attached to local draft`);
  };

  const handleSourceToggle = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  // Submit to API
  const handleGenerateGuidance = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!issue.trim()) {
      setErrorMsg("Please describe your civic or legal problem first.");
      return;
    }
    if (!locality.trim()) {
      setErrorMsg("Please specify the locality/ward of the problem.");
      return;
    }

    setIsProcessing(true);
    setErrorMsg("");
    setSavedCaseId(null);

    try {
      const request: GenerateRtiRequest = {
        issue,
        state,
        district,
        localBodyName,
        locality,
        ward: ward || undefined,
        dateRange: dateRange || undefined,
        sourceIds: selectedSources,
        simulateFailure,
      };
      const data: GenerateRtiResponse = await generateRti(request);
      setGeneratedResponse(data);
      setEditSubject(data.subject);
      setEditBody(data.applicationBody);
      setEditQuestions(data.questions);
      setActiveStep(2); // Jump to response screen
      showToast("AI Guidance Generated Successfully");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Save consultation to citizen history
  const handleSaveConsultation = () => {
    if (!generatedResponse) return;

    const saved = addCase({
      issue,
      state,
      district,
      localBodyName,
      locality,
      ward: ward || undefined,
      dateRange: dateRange || undefined,
      sourceIds: selectedSources,
      applicantName: applicantName || "Anonymous Citizen",
      applicantAddress: applicantAddress || "Client-Side Address (Not stored on server)",
      uploadedFiles,
      aiResponse: {
        ...generatedResponse,
        subject: editSubject,
        applicationBody: editBody,
        questions: editQuestions
      }
    });

    setSavedCaseId(saved.id);
    showToast("Consultation saved to your dashboard!");
  };

  const handleCopyToClipboard = () => {
    const textToCopy = `
TO:
The Public Information Officer (PIO)
${generatedResponse?.authority.organization}
${generatedResponse?.authority.state}

SUBJECT:
${editSubject}

Dear Sir/Madam,
${editBody}

QUESTIONS:
${editQuestions.map((q, idx) => `${idx + 1}. ${q}`).join("\n")}

APPLICANT:
${applicantName || "[Name withheld for privacy]"}
${applicantAddress || "[Address withheld for privacy]"}
    `;

    navigator.clipboard.writeText(textToCopy);
    showToast("Application draft copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleQuestionChange = (index: number, val: string) => {
    const updated = [...editQuestions];
    updated[index] = val;
    setEditQuestions(updated);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 py-4 max-w-6xl mx-auto w-full">
      {/* Toast Notifier */}
      {toastMsg && <Toast type="success" message={toastMsg} onClose={() => setToastMsg("")} />}

      <div className="mb-6.5 no-print">
        <h1 className="text-2xl font-bold tracking-tight text-dark-text sm:text-3xl">
          Ask InfoRight AI
        </h1>
        <p className="text-xs sm:text-sm text-secondary-text mt-1">
          Provide your local municipality details and describe your civic road or legal issue to draft a public record application.
        </p>
      </div>

      {isProcessing && <LoadingState message="Connecting to AI engine and validating source citations..." />}

      {errorMsg && !isProcessing && (
        <div className="mb-6 no-print">
          <ErrorState
            title="Generation Failure"
            description={errorMsg}
            onRetry={() => handleGenerateGuidance()}
          />
        </div>
      )}

      {/* STEP 1: Input Form */}
      {activeStep === 1 && !isProcessing && (
        <form onSubmit={handleGenerateGuidance} className="space-y-6.5 no-print">
          {/* Privacy Disclaimer Card */}
          <div className="bg-sky-light-bg border border-sky-blue/30 rounded-lg p-4 flex gap-3.5">
            <Lock className="h-5.5 w-5.5 text-indigo-primary shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="text-xs font-bold text-dark-text uppercase tracking-wider block">Privacy Encryption Boundary Active</span>
              <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                Your personal details (Name, Full Address, Signature) remain localized in your browser memory. <strong>They are never sent to external servers or AI systems.</strong> Only location parameters (locality, local body name) and the text problem description are sent for processing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5">
            {/* Column 1 & 2: Main Form Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card: Personal Details */}
              <Card>
                <div className="border-b border-borders pb-3 mb-4.5">
                  <span className="text-[10.5px] font-bold text-indigo-primary uppercase tracking-wider block">Local Browser Storage Only</span>
                  <h3 className="text-sm font-bold text-dark-text uppercase tracking-wide">Applicant Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Applicant Full Name"
                    placeholder="E.g. Harish Kumar"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    helperText="Will only be merged locally during document print/export."
                  />
                  <Input
                    label="Full Postal Address"
                    placeholder="E.g. 45, Avinashi Road, Coimbatore - 641018"
                    value={applicantAddress}
                    onChange={(e) => setApplicantAddress(e.target.value)}
                    helperText="Required officially to receive reply letters."
                  />
                </div>
              </Card>

              {/* Card: Location Details */}
              <Card>
                <div className="border-b border-borders pb-3 mb-4.5">
                  <span className="text-[10.5px] font-bold text-indigo-primary uppercase tracking-wider block">RTI Routing Coordinates</span>
                  <h3 className="text-sm font-bold text-dark-text uppercase tracking-wide">Public Authority Location</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    options={[
                      { value: "Tamil Nadu", label: "Tamil Nadu" },
                      { value: "Kerala", label: "Kerala" },
                      { value: "Karnataka", label: "Karnataka" }
                    ]}
                  />
                  <Input
                    label="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="E.g. Coimbatore"
                    required
                  />
                  <Input
                    label="Local Body Name"
                    value={localBodyName}
                    onChange={(e) => setLocalBodyName(e.target.value)}
                    placeholder="E.g. Coimbatore City Municipal Corporation"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3.5">
                    <Input
                      label="Locality"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="E.g. Ramanathapuram"
                      required
                    />
                    <Input
                      label="Ward (Optional)"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      placeholder="E.g. Ward 63"
                    />
                  </div>
                </div>
              </Card>

              {/* Card: Problem Description */}
              <Card>
                <div className="border-b border-borders pb-3 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10.5px] font-bold text-indigo-primary uppercase tracking-wider block">Describe Issue</span>
                    <h3 className="text-sm font-bold text-dark-text uppercase tracking-wide">Civic / Legal Situation</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {isRecording && (
                      <span className="text-[10px] text-danger-red font-bold animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-danger-red"></span>
                        Recording: {recordingSeconds}s
                      </span>
                    )}
                    <VoiceInputButton
                      isRecording={isRecording}
                      onStartRecording={startRecording}
                      onStopRecording={stopRecording}
                    />
                  </div>
                </div>
                
                <TextArea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder='My landlord is refusing to return my security deposit because he claims the walls have minor scratches, which were present before I moved in...'
                  rows={4}
                  required
                />

                {/* File attachment preview */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 border border-borders rounded-lg p-3 bg-slate-50/50">
                    <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-2">Attached Local Files ({uploadedFiles.length})</span>
                    <div className="space-y-1.5">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-borders text-xs">
                          <span className="font-semibold text-dark-text truncate max-w-[200px]">{file.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-secondary-text">{file.size}</span>
                            <button
                              type="button"
                              onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                              className="text-danger-red hover:underline text-[10px] font-bold cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <FileUpload onFilesSelected={handleFilesSelected} maxFiles={3} />
                </div>
              </Card>
            </div>

            {/* Column 3: Citations, Sources & Sandbox controls */}
            <div className="space-y-6">
              {/* Allowlisted Sources */}
              <Card>
                <div className="border-b border-borders pb-3 mb-4.5">
                  <span className="text-[10.5px] font-bold text-indigo-primary uppercase tracking-wider block">Source Citations Allowlist</span>
                  <h3 className="text-sm font-bold text-dark-text uppercase tracking-wide">Legal & Civic Documents</h3>
                </div>
                <div className="space-y-3.5">
                  {[
                    { id: "CIT-TAM-01", name: "CCMC Road Restoration Guidelines", desc: "Coimbatore local guidelines for road maintenance." },
                    { id: "CIT-TAM-02", name: "TN RTI Fee Rules 2005", desc: "Official fee structure guidelines for filing RTIs." },
                    { id: "CIT-TAM-03", name: "Coimbatore Public Grievance Charter", desc: "Turnaround milestones for civic complaints." },
                    { id: "CIT-TAM-04", name: "TN Urban Local Bodies Act, 1998", desc: "Municipal legislative authority structures." }
                  ].map((src) => (
                    <label key={src.id} className="flex items-start gap-3 p-2.5 border border-borders rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSources.includes(src.id)}
                        onChange={() => handleSourceToggle(src.id)}
                        className="mt-1 accent-indigo-primary cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-dark-text block">{src.name}</span>
                        <span className="text-[10px] text-secondary-text leading-tight block mt-0.5">{src.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Simulation Box */}
              <Card className="border-amber-200 bg-amber-50/20">
                <div className="border-b border-amber-200 pb-3 mb-4.5">
                  <span className="text-[10.5px] font-bold text-warning-amber uppercase tracking-wider block">Simulation Sandbox</span>
                  <h3 className="text-sm font-bold text-warning-amber uppercase tracking-wide">RTI Fallback Trigger</h3>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={simulateFailure}
                      onChange={(e) => setSimulateFailure(e.target.checked)}
                      className="accent-warning-amber cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-dark-text block">Simulate Generation Failure</span>
                      <span className="text-[10px] text-secondary-text mt-0.5 block">Forces fallback generation template (matches contract).</span>
                    </div>
                  </label>

                  <div className="pt-3 border-t border-amber-200/50">
                    <PrimaryButton type="submit" className="w-full justify-center text-sm py-2.5">
                      Generate Guidance & Draft
                    </PrimaryButton>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </form>
      )}

      {/* STEP 2: Response & Editable Document Preview */}
      {activeStep === 2 && generatedResponse && !isProcessing && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Action Bar (Header) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-borders rounded-lg p-4 no-print shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-secondary-text">Result Mode:</span>
              <StatusBadge status={generatedResponse.mode === "ai" ? "Verified" : "Pending"} />
              {generatedResponse.mode === "fallback" && (
                <span className="text-xs font-semibold text-warning-amber bg-warning-bg px-2.5 py-1 border border-warning-amber/10 rounded">
                  Fallback Mode Active
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              <SecondaryButton icon={RefreshCw} onClick={() => setActiveStep(1)}>
                Edit Inputs
              </SecondaryButton>
              <SecondaryButton icon={Copy} onClick={handleCopyToClipboard}>
                Copy Draft
              </SecondaryButton>
              <SecondaryButton icon={Printer} onClick={handlePrint}>
                Print / PDF
              </SecondaryButton>
              <PrimaryButton icon={Plus} onClick={handleSaveConsultation} disabled={!!savedCaseId}>
                {savedCaseId ? "Saved to Dashboard" : "Save Consultation"}
              </PrimaryButton>
            </div>
          </div>

          {/* Validation alerts if authority is unverified or fallback occurred */}
          {generatedResponse.warning && (
            <div className="no-print">
              <AlertBanner
                type="warning"
                message="Public Authority Warning"
                description={generatedResponse.warning}
              />
            </div>
          )}

          {/* Grid Layout: Column 1 is AI response cards, Column 2 is Editable RTI Document Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Hand: AI-Assisted guidance (7 Sections/Cards) */}
            <div className="lg:col-span-6 space-y-6 no-print">
              <div className="px-1 border-b border-borders pb-2">
                <h2 className="text-base font-bold text-dark-text uppercase tracking-wider">AI-Assisted Empowerment Guidance</h2>
                <p className="text-[11px] text-secondary-text mt-0.5">Explaining your situation and suggesting actionable rights-based guidelines.</p>
              </div>

              {/* 1. Understanding Your Situation */}
              <AIResponseCard title="1. Understanding Your Situation" variant="sky" icon={BookOpen}>
                <p>
                  Based on your description, the issue qualifies as a public service maintenance failure under regional municipal corporate liability. Since you reported this local body name as <strong className="text-indigo-primary">{localBodyName}</strong>, standard civic service levels specify timelines for correction.
                </p>
                <p className="mt-2.5">
                  The primary hurdle in similar cases is the lack of public logs or transparency regarding the budget allocated vs. work completed. Filing an RTI is a powerful step to force the release of these official records.
                </p>
              </AIResponseCard>

              {/* 2. Your Rights */}
              <AIResponseCard title="2. Your Rights" variant="indigo" icon={Scale}>
                <ul className="list-disc pl-4 space-y-2 text-xs">
                  <li><strong>Right to Safety and Utility Access:</strong> Citizens possess an inherent right to safely designed, pothole-free municipal passages.</li>
                  <li><strong>Right to Information (Section 3, RTI Act 2005):</strong> All citizens possess the right to demand copies of government contracts, budgets, and inspector logs.</li>
                  <li><strong>Right to Grievance Resolution:</strong> The Municipal Charter commits the department to investigate blocked sewer/street light problems within 7 to 15 days of filing a complain.</li>
                </ul>
              </AIResponseCard>

              {/* 3. What You Can Do Now */}
              <AIResponseCard title="3. What You Can Do Now" variant="green" icon={CheckCircle}>
                <ol className="list-decimal pl-4 space-y-2 text-xs">
                  <li><strong>File this RTI Application:</strong> Use the drafted document on the right. Send it via Registered Post with a 10 rupee postal order or submit it on the online RTI portal of the local body.</li>
                  <li><strong>Collect and Log local complaints:</strong> Gather local complaints reference numbers and screenshots from municipal app registers.</li>
                  <li><strong>Record visual proof:</strong> Take clear, timestamped photos of the issue with nearby landmarks.</li>
                </ol>
              </AIResponseCard>

              {/* 4. Relevant Laws / Legal Provisions */}
              <AIResponseCard title="4. Relevant Laws & Provisions" variant="indigo" icon={Scale}>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-dark-text block">Section 6(1) of the RTI Act, 2005:</span>
                    <p className="text-secondary-text mt-0.5">Entitles you to request information from any public authority in writing, with no requirement to give reasons.</p>
                  </div>
                  <div>
                    <span className="font-bold text-dark-text block">The Tamil Nadu District Municipalities Act, 1920:</span>
                    <p className="text-secondary-text mt-0.5">Details the statutory duties of local municipal bodies to construct, clean, light, and maintain all public pathways.</p>
                  </div>
                </div>
              </AIResponseCard>

              {/* 5. Necessary Evidence or Documents */}
              <AIResponseCard title="5. Necessary Evidence & Documents" variant="sky" icon={FileText}>
                <p className="mb-2">To strengthen your case or follow-up, make sure you collect:</p>
                <ul className="list-disc pl-4 space-y-1.5 text-xs">
                  <li>Photos of the road/drain defects showing the exact dates and street signs.</li>
                  <li>Signed petition/complaint letter copy signed by at least 5 neighborhood residents.</li>
                  <li>Previous grievance registration IDs generated through the online portal or phone calls.</li>
                </ul>
              </AIResponseCard>

              {/* 6. Where You Can Get Help */}
              <AIResponseCard title="6. Where You Can Get Help" variant="sky" icon={HelpCircle}>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-dark-text block">Coimbatore CCMC Central Grievance Cell:</span>
                    <p className="text-secondary-text">Call 1800-425-4900 or visit the official CCMC Portal (ccmc.gov.in).</p>
                  </div>
                  <div>
                    <span className="font-bold text-dark-text block">District Legal Services Authority (DLSA):</span>
                    <p className="text-secondary-text">Provides pro-bono consulting inside district court compounds to assist underprivileged citizens in drafting civic petitions.</p>
                  </div>
                </div>
              </AIResponseCard>

              {/* 7. Important / Urgent / Warning Information */}
              <AIResponseCard title="7. Important Warning Information" variant="amber" icon={AlertTriangle}>
                <p className="text-xs leading-relaxed">
                  <strong>Timelines:</strong> Public authorities must respond within 30 days of receiving your RTI application. If the requested information concerns the life or liberty of a person, it must be provided within 48 hours.
                </p>
                <p className="text-xs leading-relaxed mt-2">
                  <strong>Fee Payment:</strong> Ensure a payment of Rs. 10 is paid as filing fee (via court fee stamp, demand draft, or IPO) to make the application legally valid.
                </p>
              </AIResponseCard>

              {/* 8. Suggested Next Steps */}
              <AIResponseCard title="8. Suggested Next Steps" variant="green" icon={CheckCircle}>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-success-green" defaultChecked />
                    <span>Merge your personal name and address locally into the document draft.</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-success-green" />
                    <span>Print the application to PDF or paper copy (2 sets).</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-success-green" />
                    <span>Purchase a Rs. 10 Indian Postal Order (IPO) or Court Fee Stamp.</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-success-green" />
                    <span>Post the document via Registered Post to the PIO address on the draft.</span>
                  </label>
                </div>
              </AIResponseCard>
            </div>

            {/* Right Hand: Interactive, Editable RTI Document Preview */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="px-1 border-b border-borders pb-2 no-print">
                <h2 className="text-base font-bold text-dark-text uppercase tracking-wider">Editable Document Preview</h2>
                <p className="text-[11px] text-secondary-text mt-0.5">Modify the generated RTI draft below. Changes are held client-side only.</p>
              </div>

              {/* The RTI Document Shell (styled formally) */}
              <div className="bg-white border border-slate-300 shadow-sm p-8 max-w-2xl mx-auto rounded-xs font-serif text-dark-text print:border-none print:shadow-none print:p-0 print:m-0 print:text-black">
                {/* Document Header */}
                <div className="text-center border-b-2 border-dark-text pb-4 mb-6">
                  <h2 className="text-base font-bold uppercase tracking-wide">Application under the Right to Information Act, 2005</h2>
                  <span className="text-[10px] tracking-wide block mt-1">Filing Fee: Rs. 10</span>
                </div>

                {/* Recipient Authority */}
                <div className="mb-6 text-sm">
                  <span className="font-bold block">To,</span>
                  <span className="block font-bold">The Public Information Officer (PIO),</span>
                  <div className="flex gap-2 items-center group no-print">
                    <span className="block font-semibold bg-slate-50 px-1 border border-dashed border-borders">{generatedResponse.authority.organization}</span>
                    <span className="text-[10px] text-indigo-primary flex items-center gap-0.5 font-bold">
                      <ShieldCheck className="h-3 w-3 text-indigo-primary" /> Verified Authority
                    </span>
                  </div>
                  <span className="hidden print:block">{generatedResponse.authority.organization}</span>
                  <span className="block">{generatedResponse.authority.state}</span>
                </div>

                {/* Subject Block */}
                <div className="mb-6 flex gap-2 items-start text-sm">
                  <span className="font-bold shrink-0">Subject:</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-100 border border-borders focus:border-indigo-primary focus:bg-white rounded px-2 py-1 text-sm font-semibold no-print"
                    />
                    <p className="hidden print:block font-bold text-sm leading-relaxed">{editSubject}</p>
                  </div>
                </div>

                {/* Application Body */}
                <div className="mb-6 text-sm">
                  <span className="font-bold block mb-2">Dear Sir / Madam,</span>
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="w-full bg-slate-50/50 hover:bg-slate-100 border border-borders focus:border-indigo-primary focus:bg-white rounded px-2 py-1 text-sm leading-relaxed min-h-[80px] no-print"
                  />
                  <p className="hidden print:block text-sm leading-relaxed">{editBody}</p>
                </div>

                {/* Record Questions Block */}
                <div className="mb-6 text-sm">
                  <span className="font-bold block mb-3">Particulars of Information Required:</span>
                  <div className="space-y-4">
                    {editQuestions.map((question, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <span className="font-bold shrink-0 mt-1">{idx + 1}.</span>
                        <div className="flex-1">
                          <textarea
                            value={question}
                            onChange={(e) => handleQuestionChange(idx, e.target.value)}
                            className="w-full bg-slate-50/50 hover:bg-slate-100 border border-borders focus:border-indigo-primary focus:bg-white rounded px-2 py-1 text-xs leading-normal min-h-[50px] no-print"
                          />
                          <p className="hidden print:block text-sm leading-relaxed">{question}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standard Legal Footer info */}
                <div className="mb-8 text-xs leading-relaxed space-y-2 text-dark-text/95">
                  <p>I state that the information requested does not fall within the exemptions contained in Section 8 of the RTI Act 2005, and to the best of my knowledge, it pertains to your office.</p>
                  <p>A filing fee of Rs. 10 is enclosed herewith via Postal Order / Court Fee stamp.</p>
                </div>

                {/* Applicant details (merged locally only!) */}
                <div className="border-t border-borders pt-6 mt-6 flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-secondary-text mb-1">Applicant Details</span>
                    <span className="block font-bold text-dark-text">{applicantName || "[Please edit name in form]"}</span>
                    <span className="block text-secondary-text max-w-[250px] leading-relaxed">{applicantAddress || "[Please edit address in form]"}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-secondary-text mb-1">Signature</span>
                    <div className="h-10 w-24 border border-dashed border-borders/60 rounded flex items-center justify-center bg-slate-50 text-[10px] text-secondary-text/70 italic no-print select-none">
                      Local Sign Draft
                    </div>
                    <span className="block font-bold text-dark-text mt-1">{applicantName || ""}</span>
                  </div>
                </div>
              </div>

              {/* Informational Disclaimer Card */}
              <div className="bg-slate-100 border border-borders rounded-lg p-4 no-print text-center">
                <span className="text-[10px] font-bold text-danger-red uppercase tracking-wider block mb-1">Empowerment Platform Disclaimer</span>
                <p className="text-[10px] text-secondary-text leading-relaxed">
                  This draft is compiled based on allowsource ID rules and AI classifications. Verify local PIO office room details before physical submission. InfoRight does not submit legal claims directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
