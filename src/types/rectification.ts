// src/types/rectification.ts — Closed-Loop Geo-Tagged Civic Rectification Types

export type LocationSource =
  | "DEVICE_GEOLOCATION"
  | "PHOTO_METADATA"
  | "USER_ENTERED"
  | "NONE";

export type LocationConsistencyStatus =
  | "CONSISTENT"
  | "NEARBY"
  | "SIGNIFICANT_MISMATCH"
  | "NOT_AVAILABLE";

export type EvidenceStage =
  | "BEFORE_RECTIFICATION"
  | "OFFICER_RECTIFICATION"
  | "CITIZEN_FOLLOW_UP";

export type CitizenConfirmationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED";

export type CivicIssueType =
  | "POTHOLE_ROAD"
  | "GARBAGE_ACCUMULATION"
  | "DRAINAGE_OVERFLOW"
  | "STREETLIGHT_FAULT"
  | "WATER_LEAKAGE"
  | "INFRASTRUCTURE_DAMAGE"
  | "SANITATION"
  | "ENCROACHMENT"
  | "OTHER_CIVIC";

/**
 * Universal Canonical Case Status (Domain-Aware Lifecycle)
 */
export type CanonicalCaseStatus =
  // Initial preparation & submission
  | "GENERATED"
  | "READY_TO_SUBMIT"
  | "SUBMITTED"
  // RTI & Statutory Navigator Lifecycle
  | "AWAITING_RESPONSE"
  | "ESCALATION_AVAILABLE"
  | "FIRST_APPEAL_FILED"
  // Civic Rectification Operational Lifecycle
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RECTIFIED_PENDING_CITIZEN_CONFIRMATION"
  | "REOPENED"
  // Terminal Lifecycle Status
  | "CLOSED";

export interface GeoLocationCoordinates {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  altitude?: number;
  capturedAt: string;
  source: LocationSource;
}

export interface CivicEvidenceItem {
  id: string; // e.g. "E1", "E2"
  caseId: string;
  cycleNumber: number;
  stage: EvidenceStage;
  fileName: string;
  mimeType: "image/jpeg" | "image/png" | "image/webp";
  fileSize: number;
  capturedAt: string;
  uploadedAt: string;
  storageKey: string; // Key in IndexedDB
  previewUrl?: string; // Runtime blob: URL (hydrated from IndexedDB)
  location?: GeoLocationCoordinates;
  locality?: string;
  district?: string;
  state?: string;
  description: string;
  sha256Checksum: string;
  officerActionNote?: string;
}

export interface RectificationRecord {
  cycleNumber: number;
  rectifiedAt: string;
  officerActionNote: string;
  beforeEvidenceIds: string[];
  afterEvidenceIds: string[];
  issueLocation: {
    state: string;
    district: string;
    locality?: string;
    coordinates?: { latitude: number; longitude: number };
  };
  rectificationLocation?: GeoLocationCoordinates;
  distanceMeters?: number;
  accuracyToleranceMeters?: number;
  locationConsistency: LocationConsistencyStatus;
  officerDesignation?: string;
  department: string;
  citizenConfirmation: CitizenConfirmationStatus;
  confirmedAt?: string;
  citizenFeedback?: string;
  reopenReason?: string;
  followUpEvidenceIds?: string[];
  status: CanonicalCaseStatus;
}

export interface CaseAssignment {
  assignedDepartment: string;
  assignedOfficerDesignation?: string;
  assignedAt: string;
}

export interface CaseLifecycleHistoryEvent {
  eventId: string;
  timestamp: string;
  action: string;
  actorType: "CITIZEN" | "OFFICER" | "SYSTEM";
  actorTitle?: string;
  cycleNumber?: number;
  status: CanonicalCaseStatus;
  notes?: string;
  evidenceIds?: string[];
}

export interface CivicProofRequirements {
  issueType: CivicIssueType;
  requiresAfterPhoto: boolean;
  requiresOfficerNote: boolean;
  guidanceText: string;
}
