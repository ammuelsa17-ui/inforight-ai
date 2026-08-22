"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Camera, Upload, MapPin, X, CheckCircle2, AlertTriangle, RefreshCw, ShieldCheck } from "lucide-react";
import { CivicEvidenceItem, LocationSource } from "@/types/rectification";
import { calculateSha256 } from "@/lib/geo/distance-calculator";
import { LocationMap } from "@/components/location/LocationMap";

interface OfficerRectificationModalProps {
  caseId: string;
  issueDescription: string;
  department: string;
  onClose: () => void;
  onSubmit: (proof: {
    actionNote: string;
    department: string;
    officerDesignation?: string;
    afterEvidence: Omit<CivicEvidenceItem, "id" | "cycleNumber">;
    afterBlob?: Blob;
  }) => Promise<void>;
}

export function OfficerRectificationModal({
  caseId,
  issueDescription,
  department,
  onClose,
  onSubmit,
}: OfficerRectificationModalProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [officerDesignation, setOfficerDesignation] = useState<string>("Assistant Executive Engineer");
  const [actionNote, setActionNote] = useState<string>("");
  const [selectedBlob, setSelectedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [checksum, setChecksum] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Geolocation
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracyMeters?: number;
    source: LocationSource;
  } | null>(null);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setFileError(null);
    const validMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!validMimes.includes(file.type)) {
      setFileError("Only JPEG, PNG, or WebP images are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size exceeds 10MB limit.");
      return;
    }

    try {
      const sha = await calculateSha256(file);
      const url = URL.createObjectURL(file);
      setSelectedBlob(file);
      setPreviewUrl(url);
      setFileName(file.name);
      setChecksum(sha);
    } catch {
      setFileError("Could not process image file.");
    }
  };

  const handleCaptureLocation = () => {
    setGeoError(null);
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyMeters: Math.round(position.coords.accuracy),
          source: "DEVICE_GEOLOCATION",
        });
        setGeoLoading(false);
      },
      (error) => {
        setGeoLoading(false);
        setGeoError(
          error.code === error.PERMISSION_DENIED
            ? "Location permission denied. Rectification will be recorded as RECTIFICATION_LOCATION_NOT_CAPTURED."
            : "Could not capture device location."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionNote.trim()) {
      setFileError("Please provide an action note explaining the rectification work completed.");
      return;
    }

    if (!selectedBlob || !fileName) {
      setFileError("Please upload or capture a photo showing the rectified civic site.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        actionNote,
        department,
        officerDesignation: officerDesignation || undefined,
        afterEvidence: {
          caseId,
          stage: "OFFICER_RECTIFICATION",
          fileName,
          mimeType: (selectedBlob.type as any) || "image/jpeg",
          fileSize: selectedBlob.size,
          capturedAt: new Date().toISOString(),
          uploadedAt: new Date().toISOString(),
          storageKey: "",
          description: `Officer rectification proof: ${actionNote}`,
          sha256Checksum: checksum,
          location: location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracyMeters: location.accuracyMeters,
                capturedAt: new Date().toISOString(),
                source: location.source,
              }
            : undefined,
        },
        afterBlob: selectedBlob,
      });
      onClose();
    } catch {
      setFileError("Failed to submit rectification proof.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#BCD7EE] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
              Official Rectification Submission
            </span>
            <h2 className="text-base font-extrabold text-[#102A56]">
              Submit Proof of Work ({caseId})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Issue summary */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
          <span className="font-bold text-slate-700 block">Reported Grievance:</span>
          <p className="text-slate-600 italic leading-relaxed">{issueDescription}</p>
        </div>

        {fileError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            {fileError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Officer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                disabled
                value={department}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 text-xs rounded-xl text-slate-600 font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Officer Designation (Optional)
              </label>
              <input
                type="text"
                value={officerDesignation}
                onChange={(e) => setOfficerDesignation(e.target.value)}
                placeholder="e.g. Assistant Executive Engineer"
                className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-xl text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Action Note */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Rectification Action Note *
            </label>
            <textarea
              required
              rows={3}
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
              placeholder="Detail specific repairs, materials used (e.g. hot-mix bituminous patch, drain clearance), and restored condition..."
              className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-xl text-slate-900 focus:outline-none"
            />
          </div>

          {/* Photo Capture / Upload */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              After-Repair Photo Evidence *
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            {!previewUrl ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/50 text-emerald-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take After Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                </button>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-48 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Rectification after preview"
                  className="max-h-48 object-contain w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setSelectedBlob(null);
                    setPreviewUrl(null);
                    setFileName("");
                    setChecksum("");
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Location Verification */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Officer Location Check
              </span>
              {!location && (
                <button
                  type="button"
                  onClick={handleCaptureLocation}
                  disabled={geoLoading}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {geoLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
                  <span>Capture GPS</span>
                </button>
              )}
            </div>

            {geoError && (
              <p className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
                {geoError}
              </p>
            )}

            {location && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <span className="font-mono">
                    {location.latitude.toFixed(5)}°, {location.longitude.toFixed(5)}° (±{location.accuracyMeters}m)
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <LocationMap
                  initialLat={location.latitude}
                  initialLng={location.longitude}
                  markers={[
                    {
                      lat: location.latitude,
                      lng: location.longitude,
                      label: "Officer Rectification Location",
                      color: "emerald",
                      source: location.source,
                    },
                  ]}
                  interactive={true}
                  onLocationSelect={(lat, lng, source) => {
                    setLocation((prev) =>
                      prev
                        ? { ...prev, latitude: lat, longitude: lng, source }
                        : { latitude: lat, longitude: lng, source }
                    );
                  }}
                  heightClass="h-[160px]"
                  showLocationStatus={false}
                  helperText="Officer location confirmed. You can click on the map to refine the marker."
                />
              </div>
            )}
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              Submitting marks the case as <strong>RECTIFIED_PENDING_CITIZEN_CONFIRMATION</strong>. Case cannot be marked CLOSED until the citizen verifies resolution.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Recording Proof..." : "Submit Rectification Proof"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
