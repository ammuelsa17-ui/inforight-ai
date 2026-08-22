"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CanonicalCaseStatus,
  CivicEvidenceItem,
  RectificationRecord,
  CaseAssignment,
  CaseLifecycleHistoryEvent,
  CivicIssueType
} from "@/types/rectification";
import { evaluateLocationConsistency } from "@/lib/geo/distance-calculator";
import { saveEvidenceBlob, getEvidenceBlobUrl } from "@/lib/evidence/evidence-storage";

export interface GenerateRtiResponse {
  mode: "ai" | "fallback";
  subject: string;
  applicationBody: string;
  questions: string[];
  authority: {
    designation: "Public Information Officer";
    organization: string;
    state: string;
    verified: boolean;
  };
  citationIds: string[];
  validation: {
    schemaValid: boolean;
    citationsValid: boolean;
    questionCount: number;
    applicantDataSentToAI: false;
  };
  warning?: string;
}

export interface Case {
  id: string;
  issue: string;
  state: string;
  district: string;
  localBodyName: string;
  locality: string;
  ward?: string;
  dateRange?: string;
  sourceIds: string[];
  status: CanonicalCaseStatus;
  priority: "Low" | "Medium" | "High" | "Urgent";
  createdAt: string;
  assignedOfficial?: string;
  internalNotes?: string;
  aiResponse?: GenerateRtiResponse;
  
  // Closed-Loop Civic Rectification Extensions
  domain?: "CIVIC_RTI" | "CONSUMER" | "TENANT" | "WORKPLACE" | "WELFARE";
  issueType?: CivicIssueType;
  issueCoordinates?: { latitude: number; longitude: number };
  civicEvidence?: CivicEvidenceItem[];
  rectificationRecords?: RectificationRecord[];
  assignment?: CaseAssignment;
  history?: CaseLifecycleHistoryEvent[];
  currentCycle?: number;

  // Client-side only (never sent to AI)
  applicantName?: string;
  applicantAddress?: string;
  applicantSignature?: string;
  uploadedFiles?: { name: string; size: string; type: string }[];
}

export interface RightsCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: {
    explanation: string;
    applies: string;
    whatToDo: string;
    law: string;
    documents: string[];
    help: string;
    related: string[];
  };
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  contact: string;
  type: "Helpline" | "Govt Portal" | "NGO" | "Legal Aid";
}

interface RoleContextType {
  role: "public" | "citizen" | "official";
  setRole: (role: "public" | "citizen" | "official") => void;
  cases: Case[];
  addCase: (newCase: Omit<Case, "id" | "createdAt" | "status" | "priority">) => Case;
  updateCaseStatus: (
    id: string,
    status: CanonicalCaseStatus,
    internalNotes?: string,
    priority?: Case["priority"],
    assignedOfficial?: string
  ) => void;

  // Closed-Loop Rectification Workflow Actions
  addEvidenceToCase: (caseId: string, evidence: Omit<CivicEvidenceItem, "id" | "cycleNumber">, blob?: Blob) => Promise<CivicEvidenceItem>;
  assignCaseToDepartment: (caseId: string, department: string, officerDesignation?: string) => void;
  markCaseWorkInProgress: (caseId: string, notes?: string) => void;
  submitOfficerRectification: (
    caseId: string,
    proof: {
      actionNote: string;
      department: string;
      officerDesignation?: string;
      afterEvidence: Omit<CivicEvidenceItem, "id" | "cycleNumber">;
      afterBlob?: Blob;
    }
  ) => Promise<void>;
  confirmCitizenResolution: (caseId: string, closingComment?: string) => void;
  reopenCitizenCase: (
    caseId: string,
    reason: string,
    followUpEvidence?: Omit<CivicEvidenceItem, "id" | "cycleNumber">,
    followUpBlob?: Blob
  ) => Promise<void>;

  savedRights: string[];
  toggleSaveRight: (id: string) => void;
  savedResources: string[];
  toggleSaveResource: (id: string) => void;
  documents: { name: string; size: string; uploadedAt: string }[];
  addDocument: (name: string, size: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Initial mock data with realistic before-evidence and coordinates
const INITIAL_CASES: Case[] = [
  {
    id: "INF-2026-001",
    issue: "Water logging and drainage block causing traffic bottlenecks and health hazard for 3 weeks.",
    domain: "CIVIC_RTI",
    issueType: "DRAINAGE_OVERFLOW",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Ramanathapuram",
    ward: "Ward 63",
    dateRange: "Last 30 Days",
    sourceIds: ["CIT-TAM-01", "CIT-TAM-03"],
    status: "SUBMITTED",
    priority: "Urgent",
    createdAt: "2026-08-15T14:30:00Z",
    applicantName: "Aravind Swamy",
    applicantAddress: "No. 12, Ramasamy Layout, Ramanathapuram, Coimbatore - 641045",
    uploadedFiles: [{ name: "drainage_photo.jpg", size: "1.4 MB", type: "image/jpeg" }],
    currentCycle: 1,
    issueCoordinates: { latitude: 10.9984, longitude: 76.9742 },
    civicEvidence: [
      {
        id: "E1",
        caseId: "INF-2026-001",
        cycleNumber: 1,
        stage: "BEFORE_RECTIFICATION",
        fileName: "drainage_photo.jpg",
        mimeType: "image/jpeg",
        fileSize: 1468000,
        capturedAt: "2026-08-15T14:20:00Z",
        uploadedAt: "2026-08-15T14:30:00Z",
        storageKey: "INF-2026-001-E1",
        location: {
          latitude: 10.9984,
          longitude: 76.9742,
          accuracyMeters: 12,
          capturedAt: "2026-08-15T14:20:00Z",
          source: "DEVICE_GEOLOCATION"
        },
        locality: "Ramanathapuram",
        district: "Coimbatore",
        state: "Tamil Nadu",
        description: "Severe stormwater drain blockage causing stagnant water accumulation across 40 metres of roadway.",
        sha256Checksum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      }
    ],
    history: [
      {
        eventId: "EVT-1",
        timestamp: "2026-08-15T14:30:00Z",
        action: "Citizen submitted civic grievance with geo-tagged evidence",
        actorType: "CITIZEN",
        actorTitle: "Aravind Swamy",
        cycleNumber: 1,
        status: "SUBMITTED",
        evidenceIds: ["E1"]
      }
    ],
    aiResponse: {
      mode: "ai",
      subject: "Request for Information regarding drainage maintenance and public works funding in Ward 63, Ramanathapuram",
      applicationBody: "Under Section 6(1) of the Right to Information Act, 2005, please provide records regarding drainage maintenance at Ramanathapuram (Ward 63).",
      questions: [
        "Provide certified copies of work orders and budget allocations for drainage desilting in Ward 63 for FY 2025-26.",
        "Provide copies of the complaints register and action taken reports on drainage blockage received between July 1, 2026, and August 15, 2026."
      ],
      authority: {
        designation: "Public Information Officer",
        organization: "Coimbatore City Municipal Corporation",
        state: "Tamil Nadu",
        verified: true
      },
      citationIds: ["CIT-TAM-01", "CIT-TAM-03"],
      validation: {
        schemaValid: true,
        citationsValid: true,
        questionCount: 2,
        applicantDataSentToAI: false
      }
    }
  },
  {
    id: "INF-2026-002",
    issue: "Pothole-ridden stretch on Crosscut Road causing multiple two-wheeler accidents daily.",
    domain: "CIVIC_RTI",
    issueType: "POTHOLE_ROAD",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Gandhipuram",
    ward: "Ward 28",
    dateRange: "Current Month",
    sourceIds: ["CIT-TAM-01", "CIT-TAM-02"],
    status: "RECTIFIED_PENDING_CITIZEN_CONFIRMATION",
    priority: "High",
    createdAt: "2026-08-18T09:15:00Z",
    applicantName: "Praveen Kumar",
    applicantAddress: "45-A, 7th Street, Gandhipuram, Coimbatore - 641012",
    uploadedFiles: [{ name: "pothole_crosscut.jpg", size: "2.1 MB", type: "image/jpeg" }],
    currentCycle: 1,
    issueCoordinates: { latitude: 11.0168, longitude: 76.9678 },
    assignment: {
      assignedDepartment: "Engineering & Roads Department",
      assignedOfficerDesignation: "Assistant Executive Engineer (Roads)",
      assignedAt: "2026-08-18T11:00:00Z"
    },
    civicEvidence: [
      {
        id: "E1",
        caseId: "INF-2026-002",
        cycleNumber: 1,
        stage: "BEFORE_RECTIFICATION",
        fileName: "pothole_crosscut.jpg",
        mimeType: "image/jpeg",
        fileSize: 2200000,
        capturedAt: "2026-08-18T09:10:00Z",
        uploadedAt: "2026-08-18T09:15:00Z",
        storageKey: "INF-2026-002-E1",
        location: {
          latitude: 11.0168,
          longitude: 76.9678,
          accuracyMeters: 8,
          capturedAt: "2026-08-18T09:10:00Z",
          source: "DEVICE_GEOLOCATION"
        },
        locality: "Gandhipuram",
        district: "Coimbatore",
        state: "Tamil Nadu",
        description: "Deep crater-like pothole near 7th Street intersection measuring ~1.5m wide.",
        sha256Checksum: "c79f972049e6f3de49ac06f3630f9a2e6f4a861612dfa8f029ec264627b47e5b"
      },
      {
        id: "E2",
        caseId: "INF-2026-002",
        cycleNumber: 1,
        stage: "OFFICER_RECTIFICATION",
        fileName: "crosscut_road_patch_rectified.jpg",
        mimeType: "image/jpeg",
        fileSize: 1850000,
        capturedAt: "2026-08-20T16:30:00Z",
        uploadedAt: "2026-08-20T16:45:00Z",
        storageKey: "INF-2026-002-E2",
        location: {
          latitude: 11.0170,
          longitude: 76.9679,
          accuracyMeters: 10,
          capturedAt: "2026-08-20T16:30:00Z",
          source: "DEVICE_GEOLOCATION"
        },
        locality: "Gandhipuram",
        district: "Coimbatore",
        state: "Tamil Nadu",
        description: "Bituminous mastic asphalt patching completed and compacted.",
        officerActionNote: "Pothole patch completed with hot-mix asphalt compaction. Traffic flow restored smoothly.",
        sha256Checksum: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
      }
    ],
    rectificationRecords: [
      {
        cycleNumber: 1,
        rectifiedAt: "2026-08-20T16:45:00Z",
        officerActionNote: "Pothole patch completed with hot-mix asphalt compaction. Traffic flow restored smoothly.",
        beforeEvidenceIds: ["E1"],
        afterEvidenceIds: ["E2"],
        issueLocation: {
          state: "Tamil Nadu",
          district: "Coimbatore",
          locality: "Gandhipuram",
          coordinates: { latitude: 11.0168, longitude: 76.9678 }
        },
        rectificationLocation: {
          latitude: 11.0170,
          longitude: 76.9679,
          accuracyMeters: 10,
          capturedAt: "2026-08-20T16:30:00Z",
          source: "DEVICE_GEOLOCATION"
        },
        distanceMeters: 25,
        locationConsistency: "CONSISTENT",
        officerDesignation: "Assistant Executive Engineer (Roads)",
        department: "Engineering & Roads Department",
        citizenConfirmation: "PENDING",
        status: "RECTIFIED_PENDING_CITIZEN_CONFIRMATION"
      }
    ],
    history: [
      {
        eventId: "EVT-1",
        timestamp: "2026-08-18T09:15:00Z",
        action: "Grievance submitted with photo evidence E1",
        actorType: "CITIZEN",
        actorTitle: "Praveen Kumar",
        cycleNumber: 1,
        status: "SUBMITTED",
        evidenceIds: ["E1"]
      },
      {
        eventId: "EVT-2",
        timestamp: "2026-08-18T11:00:00Z",
        action: "Assigned to Engineering & Roads Department",
        actorType: "OFFICER",
        actorTitle: "Assistant Executive Engineer (Roads)",
        cycleNumber: 1,
        status: "ASSIGNED"
      },
      {
        eventId: "EVT-3",
        timestamp: "2026-08-19T08:30:00Z",
        action: "Road work crew deployed on site",
        actorType: "OFFICER",
        cycleNumber: 1,
        status: "IN_PROGRESS"
      },
      {
        eventId: "EVT-4",
        timestamp: "2026-08-20T16:45:00Z",
        action: "Uploaded rectification photo E2 and marked rectified",
        actorType: "OFFICER",
        actorTitle: "Assistant Executive Engineer (Roads)",
        cycleNumber: 1,
        status: "RECTIFIED_PENDING_CITIZEN_CONFIRMATION",
        evidenceIds: ["E2"]
      }
    ],
    aiResponse: {
      mode: "ai",
      subject: "Request for information on road repair tenders, budget allocation, and maintenance records for Crosscut Road",
      applicationBody: "Under Section 6(1) of the RTI Act 2005, please furnish certified inspection logs and contractor guarantee records for Crosscut Road.",
      questions: [
        "Provide copies of the latest road relaying tender work order for Crosscut Road, Gandhipuram.",
        "State the defect liability period (DLP) specified in the contractor agreement for this road stretch."
      ],
      authority: {
        designation: "Public Information Officer",
        organization: "Coimbatore City Municipal Corporation",
        state: "Tamil Nadu",
        verified: true
      },
      citationIds: ["CIT-TAM-01", "CIT-TAM-02"],
      validation: {
        schemaValid: true,
        citationsValid: true,
        questionCount: 2,
        applicantDataSentToAI: false
      }
    }
  }
];

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<"public" | "citizen" | "official">(() => {
    if (typeof window === "undefined") return "public";
    const saved = localStorage.getItem("inforight_role");
    return (saved as "public" | "citizen" | "official") || "public";
  });

  const [cases, setCases] = useState<Case[]>(() => {
    if (typeof window === "undefined") return INITIAL_CASES;

    const saved = localStorage.getItem("inforight_cases");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Case[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize legacy statuses
          return parsed.map((c) => {
            let normalizedStatus = c.status;
            if (c.status === ("Pending" as any)) normalizedStatus = "SUBMITTED";
            if (c.status === ("In Progress" as any)) normalizedStatus = "IN_PROGRESS";
            if (c.status === ("Resolved" as any)) normalizedStatus = "CLOSED";
            return {
              ...c,
              status: normalizedStatus,
              civicEvidence: c.civicEvidence || [],
              rectificationRecords: c.rectificationRecords || [],
              history: c.history || [],
              currentCycle: c.currentCycle || 1
            };
          });
        }
      } catch {
        // Fallback to initial cases
      }
    }
    return INITIAL_CASES;
  });

  const [savedRights, setSavedRights] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("inforight_saved_rights");
    return saved ? JSON.parse(saved) : [];
  });

  const [savedResources, setSavedResources] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("inforight_saved_resources");
    return saved ? JSON.parse(saved) : [];
  });

  const [documents, setDocuments] = useState<{ name: string; size: string; uploadedAt: string }[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("inforight_docs");
    return saved ? JSON.parse(saved) : [];
  });

  // Hydrate preview URLs from IndexedDB for durable image rendering
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;
    async function hydrateEvidenceUrls() {
      let changed = false;
      const updatedCases = await Promise.all(
        cases.map(async (c) => {
          if (!c.civicEvidence || c.civicEvidence.length === 0) return c;

          const updatedEvidence = await Promise.all(
            c.civicEvidence.map(async (ev) => {
              if (ev.previewUrl) return ev;
              const blobUrl = await getEvidenceBlobUrl(ev.storageKey);
              if (blobUrl) {
                changed = true;
                return { ...ev, previewUrl: blobUrl };
              }
              return ev;
            })
          );
          return { ...c, civicEvidence: updatedEvidence };
        })
      );

      if (changed && isMounted) {
        setCases(updatedCases);
      }
    }

    hydrateEvidenceUrls();
    return () => {
      isMounted = false;
    };
  }, []);

  const setRole = (newRole: "public" | "citizen" | "official") => {
    setRoleState(newRole);
    localStorage.setItem("inforight_role", newRole);
  };

  const persistCases = (updated: Case[]) => {
    setCases(updated);
    // Strip previewUrl before localStorage serialization (memory safety)
    const serializable = updated.map((c) => ({
      ...c,
      civicEvidence: c.civicEvidence?.map(({ previewUrl, ...rest }) => rest)
    }));
    localStorage.setItem("inforight_cases", JSON.stringify(serializable));
  };

  const addCase = (newCaseData: Omit<Case, "id" | "createdAt" | "status" | "priority">) => {
    const id = `INF-2026-${String(cases.length + 1).padStart(3, "0")}`;
    const newCase: Case = {
      ...newCaseData,
      id,
      createdAt: new Date().toISOString(),
      status: "SUBMITTED",
      currentCycle: 1,
      civicEvidence: newCaseData.civicEvidence || [],
      rectificationRecords: [],
      history: [
        {
          eventId: `EVT-${Date.now()}-1`,
          timestamp: new Date().toISOString(),
          action: "Grievance registered in system",
          actorType: "CITIZEN",
          actorTitle: newCaseData.applicantName || "Citizen",
          cycleNumber: 1,
          status: "SUBMITTED",
          evidenceIds: newCaseData.civicEvidence?.map((e) => e.id)
        }
      ],
      priority: newCaseData.issue.toLowerCase().includes("accident") ||
        newCaseData.issue.toLowerCase().includes("hazard") ||
        newCaseData.issue.toLowerCase().includes("broken main")
        ? "Urgent"
        : "Medium"
    };

    const updatedCases = [newCase, ...cases];
    persistCases(updatedCases);
    return newCase;
  };

  const updateCaseStatus = (
    id: string,
    status: CanonicalCaseStatus,
    internalNotes?: string,
    priority?: Case["priority"],
    assignedOfficial?: string
  ) => {
    const updatedCases = cases.map((c) => {
      if (c.id === id) {
        const historyEvent: CaseLifecycleHistoryEvent = {
          eventId: `EVT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `Status updated to ${status}`,
          actorType: "SYSTEM",
          cycleNumber: c.currentCycle || 1,
          status,
          notes: internalNotes
        };

        return {
          ...c,
          status,
          ...(internalNotes !== undefined && { internalNotes }),
          ...(priority !== undefined && { priority }),
          ...(assignedOfficial !== undefined && { assignedOfficial }),
          history: [...(c.history || []), historyEvent]
        };
      }
      return c;
    });
    persistCases(updatedCases);
  };

  const addEvidenceToCase = async (
    caseId: string,
    evidenceData: Omit<CivicEvidenceItem, "id" | "cycleNumber">,
    blob?: Blob
  ): Promise<CivicEvidenceItem> => {
    const targetCase = cases.find((c) => c.id === caseId);
    const existingCount = targetCase?.civicEvidence?.length || 0;
    const evidenceId = `E${existingCount + 1}`;
    const cycle = targetCase?.currentCycle || 1;
    const storageKey = `${caseId}-${evidenceId}-${Date.now()}`;

    let previewUrl: string | undefined = undefined;
    if (blob) {
      await saveEvidenceBlob(storageKey, blob, evidenceData.fileName);
      previewUrl = URL.createObjectURL(blob);
    }

    const newEvidence: CivicEvidenceItem = {
      ...evidenceData,
      id: evidenceId,
      cycleNumber: cycle,
      storageKey,
      previewUrl
    };

    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        const historyEvent: CaseLifecycleHistoryEvent = {
          eventId: `EVT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `Evidence ${evidenceId} attached (${evidenceData.stage})`,
          actorType: evidenceData.stage === "OFFICER_RECTIFICATION" ? "OFFICER" : "CITIZEN",
          cycleNumber: cycle,
          status: c.status,
          evidenceIds: [evidenceId]
        };

        return {
          ...c,
          civicEvidence: [...(c.civicEvidence || []), newEvidence],
          history: [...(c.history || []), historyEvent]
        };
      }
      return c;
    });

    persistCases(updatedCases);
    return newEvidence;
  };

  const assignCaseToDepartment = (
    caseId: string,
    department: string,
    officerDesignation?: string
  ) => {
    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        const assignment: CaseAssignment = {
          assignedDepartment: department,
          assignedOfficerDesignation: officerDesignation || "Responsible Officer",
          assignedAt: new Date().toISOString()
        };

        const historyEvent: CaseLifecycleHistoryEvent = {
          eventId: `EVT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `Assigned to ${department}${officerDesignation ? ` (${officerDesignation})` : ""}`,
          actorType: "OFFICER",
          actorTitle: officerDesignation || department,
          cycleNumber: c.currentCycle || 1,
          status: "ASSIGNED"
        };

        return {
          ...c,
          status: "ASSIGNED" as CanonicalCaseStatus,
          assignment,
          history: [...(c.history || []), historyEvent]
        };
      }
      return c;
    });
    persistCases(updatedCases);
  };

  const markCaseWorkInProgress = (caseId: string, notes?: string) => {
    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        const historyEvent: CaseLifecycleHistoryEvent = {
          eventId: `EVT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: "Work commenced on site",
          actorType: "OFFICER",
          actorTitle: c.assignment?.assignedOfficerDesignation || "Responsible Officer",
          cycleNumber: c.currentCycle || 1,
          status: "IN_PROGRESS",
          notes
        };

        return {
          ...c,
          status: "IN_PROGRESS" as CanonicalCaseStatus,
          internalNotes: notes || c.internalNotes,
          history: [...(c.history || []), historyEvent]
        };
      }
      return c;
    });
    persistCases(updatedCases);
  };

  const submitOfficerRectification = async (
    caseId: string,
    proof: {
      actionNote: string;
      department: string;
      officerDesignation?: string;
      afterEvidence: Omit<CivicEvidenceItem, "id" | "cycleNumber">;
      afterBlob?: Blob;
    }
  ) => {
    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase) return;

    const cycle = targetCase.currentCycle || 1;
    const existingCount = targetCase.civicEvidence?.length || 0;
    const evidenceId = `E${existingCount + 1}`;
    const storageKey = `${caseId}-${evidenceId}-${Date.now()}`;

    let previewUrl: string | undefined = undefined;
    if (proof.afterBlob) {
      await saveEvidenceBlob(storageKey, proof.afterBlob, proof.afterEvidence.fileName);
      previewUrl = URL.createObjectURL(proof.afterBlob);
    }

    const afterItem: CivicEvidenceItem = {
      ...proof.afterEvidence,
      id: evidenceId,
      cycleNumber: cycle,
      stage: "OFFICER_RECTIFICATION",
      storageKey,
      previewUrl,
      officerActionNote: proof.actionNote
    };

    // Locate before evidence for this cycle
    const beforeItem = targetCase.civicEvidence?.find(
      (e) => e.cycleNumber === cycle && e.stage === "BEFORE_RECTIFICATION"
    );

    const comparisonPoint1 = beforeItem?.location
      ? { latitude: beforeItem.location.latitude, longitude: beforeItem.location.longitude, accuracyMeters: beforeItem.location.accuracyMeters }
      : targetCase.issueCoordinates
      ? { latitude: targetCase.issueCoordinates.latitude, longitude: targetCase.issueCoordinates.longitude }
      : undefined;

    const comparisonPoint2 = afterItem.location
      ? { latitude: afterItem.location.latitude, longitude: afterItem.location.longitude, accuracyMeters: afterItem.location.accuracyMeters }
      : undefined;

    const locationEval = evaluateLocationConsistency(comparisonPoint1, comparisonPoint2);

    const rectificationRecord: RectificationRecord = {
      cycleNumber: cycle,
      rectifiedAt: new Date().toISOString(),
      officerActionNote: proof.actionNote,
      beforeEvidenceIds: beforeItem ? [beforeItem.id] : [],
      afterEvidenceIds: [evidenceId],
      issueLocation: {
        state: targetCase.state,
        district: targetCase.district,
        locality: targetCase.locality,
        coordinates: targetCase.issueCoordinates
      },
      rectificationLocation: afterItem.location,
      distanceMeters: locationEval.distanceMeters,
      accuracyToleranceMeters: locationEval.accuracyToleranceMeters,
      locationConsistency: locationEval.status,
      officerDesignation: proof.officerDesignation,
      department: proof.department,
      citizenConfirmation: "PENDING",
      status: "RECTIFIED_PENDING_CITIZEN_CONFIRMATION"
    };

    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        const historyEvent: CaseLifecycleHistoryEvent = {
          eventId: `EVT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `Rectification evidence ${evidenceId} submitted. Awaiting citizen confirmation.`,
          actorType: "OFFICER",
          actorTitle: proof.officerDesignation || proof.department,
          cycleNumber: cycle,
          status: "RECTIFIED_PENDING_CITIZEN_CONFIRMATION",
          evidenceIds: [evidenceId],
          notes: proof.actionNote
        };

        const existingRecords = (c.rectificationRecords || []).filter((r) => r.cycleNumber !== cycle);

        return {
          ...c,
          status: "RECTIFIED_PENDING_CITIZEN_CONFIRMATION" as CanonicalCaseStatus,
          civicEvidence: [...(c.civicEvidence || []), afterItem],
          rectificationRecords: [...existingRecords, rectificationRecord],
          history: [...(c.history || []), historyEvent]
        };
      }
      return c;
    });

    persistCases(updatedCases);
  };

  const confirmCitizenResolution = (caseId: string, closingComment?: string) => {
    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        const cycle = c.currentCycle || 1;
        const historyEvent: CaseLifecycleHistoryEvent = {
          eventId: `EVT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `Citizen verified rectification and closed case${closingComment ? `: "${closingComment}"` : ""}`,
          actorType: "CITIZEN",
          actorTitle: c.applicantName || "Citizen",
          cycleNumber: cycle,
          status: "CLOSED",
          notes: closingComment
        };

        const updatedRecords = (c.rectificationRecords || []).map((r) => {
          if (r.cycleNumber === cycle) {
            return {
              ...r,
              citizenConfirmation: "CONFIRMED" as const,
              confirmedAt: new Date().toISOString(),
              citizenFeedback: closingComment,
              status: "CLOSED" as CanonicalCaseStatus
            };
          }
          return r;
        });

        return {
          ...c,
          status: "CLOSED" as CanonicalCaseStatus,
          rectificationRecords: updatedRecords,
          history: [...(c.history || []), historyEvent]
        };
      }
      return c;
    });
    persistCases(updatedCases);
  };

  const reopenCitizenCase = async (
    caseId: string,
    reason: string,
    followUpEvidence?: Omit<CivicEvidenceItem, "id" | "cycleNumber">,
    followUpBlob?: Blob
  ) => {
    const targetCase = cases.find((c) => c.id === caseId);
    if (!targetCase) return;

    const currentCycle = targetCase.currentCycle || 1;
    const nextCycle = currentCycle + 1;

    let followUpItem: CivicEvidenceItem | undefined = undefined;
    if (followUpEvidence) {
      const evidenceId = `E${(targetCase.civicEvidence?.length || 0) + 1}`;
      const storageKey = `${caseId}-${evidenceId}-${Date.now()}`;
      let previewUrl: string | undefined = undefined;
      if (followUpBlob) {
        await saveEvidenceBlob(storageKey, followUpBlob, followUpEvidence.fileName);
        previewUrl = URL.createObjectURL(followUpBlob);
      }

      followUpItem = {
        ...followUpEvidence,
        id: evidenceId,
        cycleNumber: nextCycle,
        stage: "CITIZEN_FOLLOW_UP",
        storageKey,
        previewUrl
      };
    }

    const updatedCases = cases.map((c) => {
      if (c.id === caseId) {
        const historyEvent: CaseLifecycleHistoryEvent = {
          eventId: `EVT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `Citizen contested rectification and reopened case (Cycle ${nextCycle}): "${reason}"`,
          actorType: "CITIZEN",
          actorTitle: c.applicantName || "Citizen",
          cycleNumber: nextCycle,
          status: "REOPENED",
          notes: reason,
          evidenceIds: followUpItem ? [followUpItem.id] : undefined
        };

        const updatedRecords = (c.rectificationRecords || []).map((r) => {
          if (r.cycleNumber === currentCycle) {
            return {
              ...r,
              citizenConfirmation: "REJECTED" as const,
              reopenReason: reason,
              followUpEvidenceIds: followUpItem ? [followUpItem.id] : undefined,
              status: "REOPENED" as CanonicalCaseStatus
            };
          }
          return r;
        });

        return {
          ...c,
          status: "REOPENED" as CanonicalCaseStatus,
          currentCycle: nextCycle,
          rectificationRecords: updatedRecords,
          civicEvidence: followUpItem ? [...(c.civicEvidence || []), followUpItem] : c.civicEvidence,
          history: [...(c.history || []), historyEvent]
        };
      }
      return c;
    });

    persistCases(updatedCases);
  };

  const toggleSaveRight = (id: string) => {
    const updated = savedRights.includes(id)
      ? savedRights.filter((rId) => rId !== id)
      : [...savedRights, id];
    setSavedRights(updated);
    localStorage.setItem("inforight_saved_rights", JSON.stringify(updated));
  };

  const toggleSaveResource = (id: string) => {
    const updated = savedResources.includes(id)
      ? savedResources.filter((rId) => rId !== id)
      : [...savedResources, id];
    setSavedResources(updated);
    localStorage.setItem("inforight_saved_resources", JSON.stringify(updated));
  };

  const addDocument = (name: string, size: string) => {
    const newDoc = { name, size, uploadedAt: new Date().toISOString() };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem("inforight_docs", JSON.stringify(updated));
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        cases,
        addCase,
        updateCaseStatus,
        addEvidenceToCase,
        assignCaseToDepartment,
        markCaseWorkInProgress,
        submitOfficerRectification,
        confirmCitizenResolution,
        reopenCitizenCase,
        savedRights,
        toggleSaveRight,
        savedResources,
        toggleSaveResource,
        documents,
        addDocument
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
