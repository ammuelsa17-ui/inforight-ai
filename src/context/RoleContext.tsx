"use client";

import React, { createContext, useContext, useState } from "react";

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
  status: "Pending" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High" | "Urgent";
  createdAt: string;
  assignedOfficial?: string;
  internalNotes?: string;
  aiResponse?: GenerateRtiResponse;
  
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
  updateCaseStatus: (id: string, status: Case["status"], internalNotes?: string, priority?: Case["priority"], assignedOfficial?: string) => void;
  savedRights: string[];
  toggleSaveRight: (id: string) => void;
  savedResources: string[];
  toggleSaveResource: (id: string) => void;
  documents: { name: string; size: string; uploadedAt: string }[];
  addDocument: (name: string, size: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Initial mock data
const INITIAL_CASES: Case[] = [
  {
    id: "INF-2026-001",
    issue: "Water logging and drainage block causing traffic bottlenecks and health hazard for 3 weeks.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Ramanathapuram",
    ward: "Ward 63",
    dateRange: "Last 30 Days",
    sourceIds: ["CIT-TAM-01", "CIT-TAM-03"],
    status: "Pending",
    priority: "Urgent",
    createdAt: "2026-08-15T14:30:00Z",
    applicantName: "Aravind Swamy",
    applicantAddress: "No. 12, Ramasamy Layout, Ramanathapuram, Coimbatore - 641045",
    uploadedFiles: [{ name: "drainage_photo.jpg", size: "1.4 MB", type: "image/jpeg" }],
    aiResponse: {
      mode: "ai",
      subject: "Request for Information regarding drainage maintenance and public works funding in Ward 63, Ramanathapuram",
      applicationBody: "Under Section 6(1) of the Right to Information Act, 2005, please provide the following records regarding the drainage maintenance and roadworks carried out at Ramanathapuram (Ward 63) during the period of June 2026 to August 2026.",
      questions: [
        "Provide certified copies of the work orders, sanctioned budgets, and completed project reports for drainage desilting in Ward 63 for FY 2025-26.",
        "State the total expenditure incurred on street cleanup and water drainage projects in Ramanathapuram locality in the last 6 months.",
        "Provide copies of the complaints register and action taken reports (ATR) on drainage blockage complaints received from Ward 63 between July 1, 2026, and August 15, 2026."
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
        questionCount: 3,
        applicantDataSentToAI: false
      }
    }
  },
  {
    id: "INF-2026-002",
    issue: "Pothole-ridden stretch on Crosscut Road causing multiple two-wheeler accidents daily.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Gandhipuram",
    ward: "Ward 28",
    dateRange: "Last 60 Days",
    sourceIds: ["CIT-TAM-01"],
    status: "In Progress",
    priority: "High",
    createdAt: "2026-08-18T09:15:00Z",
    assignedOfficial: "S. K. Balachandran (Asst. Commissioner)",
    internalNotes: "Assigned to the engineering department for site inspection. Surveying current road laying budgets.",
    applicantName: "Meenakshi Sundaram",
    applicantAddress: "Flat 4B, Ruby Apartments, Gandhipuram, Coimbatore - 641012",
    aiResponse: {
      mode: "ai",
      subject: "RTI seeking records on road repair budgets and execution reports for Crosscut Road (Ward 28)",
      applicationBody: "Under the provisions of the RTI Act 2005, please provide details regarding the road restoration projects for Crosscut Road, Gandhipuram under Ward 28.",
      questions: [
        "Provide details of the contractors assigned for road restoration of Crosscut Road in 2025-2026.",
        "Provide certified copies of the quality certificate submitted by the supervisor for the road works executed in early 2026.",
        "Specify the schedule of repair works planned for Crosscut Road in the current quarter."
      ],
      authority: {
        designation: "Public Information Officer",
        organization: "Coimbatore City Municipal Corporation",
        state: "Tamil Nadu",
        verified: true
      },
      citationIds: ["CIT-TAM-01"],
      validation: {
        schemaValid: true,
        citationsValid: true,
        questionCount: 3,
        applicantDataSentToAI: false
      }
    }
  },
  {
    id: "INF-2026-003",
    issue: "Street lights completely dark for 2 kilometers on Sathyamangalam Highway, Saravanampatti.",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation",
    locality: "Saravanampatti",
    ward: "Ward 4",
    dateRange: "Last 15 Days",
    sourceIds: ["CIT-TAM-04"],
    status: "Resolved",
    priority: "Medium",
    createdAt: "2026-08-10T11:00:00Z",
    assignedOfficial: "R. Dhanapal (Electrical Section)",
    internalNotes: "Local maintenance contractor replaced 14 dysfunctional LED street light bulbs. Verified operational.",
    applicantName: "Vignesh Kumar",
    applicantAddress: "G-15, Green Meadows, Saravanampatti, Coimbatore - 641035",
    aiResponse: {
      mode: "ai",
      subject: "Information request regarding operational status of street lights on Sathyamangalam Highway (Ward 4)",
      applicationBody: "Please provide records relating to the maintenance and electrification of Sathyamangalam Road under Saravanampatti limits.",
      questions: [
        "Provide the copy of the contract signed for the maintenance of LED street lights in Saravanampatti area.",
        "State the number of maintenance checks carried out by the municipal staff on street illumination between June and August 2026."
      ],
      authority: {
        designation: "Public Information Officer",
        organization: "Coimbatore City Municipal Corporation",
        state: "Tamil Nadu",
        verified: true
      },
      citationIds: ["CIT-TAM-04"],
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
    const saved = localStorage.getItem("inforight_role");
    return (saved as "public" | "citizen" | "official") || "public";
  });
  const [cases, setCases] = useState<Case[]>(() => {
    const saved = localStorage.getItem("inforight_cases");
    if (saved) {
      try {
        return JSON.parse(saved) as Case[];
      } catch {
        return INITIAL_CASES;
      }
    }
    return INITIAL_CASES;
  });
  const [savedRights, setSavedRights] = useState<string[]>(() => {
    const saved = localStorage.getItem("inforight_saved_rights");
    return saved ? JSON.parse(saved) : [];
  });
  const [savedResources, setSavedResources] = useState<string[]>(() => {
    const saved = localStorage.getItem("inforight_saved_resources");
    return saved ? JSON.parse(saved) : [];
  });
  const [documents, setDocuments] = useState<{ name: string; size: string; uploadedAt: string }[]>(() => {
    const saved = localStorage.getItem("inforight_docs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // No effect needed; state initialized from localStorage.

  const setRole = (newRole: "public" | "citizen" | "official") => {
    setRoleState(newRole);
    localStorage.setItem("inforight_role", newRole);
  };

  const addCase = (newCaseData: Omit<Case, "id" | "createdAt" | "status" | "priority">) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newCase: Case = {
      ...newCaseData,
      id: `INF-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
      status: "Pending",
      priority: newCaseData.issue.toLowerCase().includes("accident") || newCaseData.issue.toLowerCase().includes("hazard") || newCaseData.issue.toLowerCase().includes("broken main") ? "Urgent" : "Medium"
    };

    const updatedCases = [newCase, ...cases];
    setCases(updatedCases);
    localStorage.setItem("inforight_cases", JSON.stringify(updatedCases));

    // Automatically add uploaded files to the central document list
    if (newCaseData.uploadedFiles && newCaseData.uploadedFiles.length > 0) {
      const newDocs = [
        ...newCaseData.uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString()
        })),
        ...documents
      ];
      setDocuments(newDocs);
      localStorage.setItem("inforight_docs", JSON.stringify(newDocs));
    }

    return newCase;
  };

  const updateCaseStatus = (
    id: string,
    status: Case["status"],
    internalNotes?: string,
    priority?: Case["priority"],
    assignedOfficial?: string
  ) => {
    const updatedCases = cases.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status,
          ...(internalNotes !== undefined && { internalNotes }),
          ...(priority !== undefined && { priority }),
          ...(assignedOfficial !== undefined && { assignedOfficial })
        };
      }
      return c;
    });
    setCases(updatedCases);
    localStorage.setItem("inforight_cases", JSON.stringify(updatedCases));
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
