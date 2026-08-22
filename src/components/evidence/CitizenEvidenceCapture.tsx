"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Camera, Upload, MapPin, X, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { CivicEvidenceItem, LocationSource } from "@/types/rectification";
import { calculateSha256 } from "@/lib/geo/distance-calculator";

interface CitizenEvidenceCaptureProps {
  onEvidenceCaptured: (evidence: Omit<CivicEvidenceItem, "id" | "cycleNumber">, blob?: Blob) => void;
  onCancel?: () => void;
  className?: string;
}

export function CitizenEvidenceCapture({
  onEvidenceCaptured,
  onCancel,
  className = "",
}: CitizenEvidenceCaptureProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [selectedBlob, setSelectedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [checksum, setChecksum] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Geolocation states
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracyMeters?: number;
    source: LocationSource;
  } | null>(null);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setFileError(null);

    // Validate MIME types
    const validMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!validMimes.includes(file.type)) {
      setFileError("Only JPEG, PNG, or WebP images are allowed.");
      return;
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size exceeds 10MB limit.");
      return;
    }

    setIsProcessing(true);
    try {
      const sha = await calculateSha256(file);
      const url = URL.createObjectURL(file);
      setSelectedBlob(file);
      setPreviewUrl(url);
      setFileName(file.name);
      setChecksum(sha);
    } catch {
      setFileError("Could not process image file.");
    } finally {
      setIsProcessing(false);
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
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError("Location permission denied. You can still submit photo evidence without GPS.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError("Position information is unavailable from device.");
            break;
          case error.TIMEOUT:
            setGeoError("Location request timed out. Please try again.");
            break;
          default:
            setGeoError("Could not acquire location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  const handleClearEvidence = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedBlob(null);
    setPreviewUrl(null);
    setFileName("");
    setChecksum("");
    setLocation(null);
    setGeoError(null);
    setFileError(null);
  };

  const handleConfirm = () => {
    if (!selectedBlob || !fileName) return;

    onEvidenceCaptured(
      {
        caseId: "",
        stage: "BEFORE_RECTIFICATION",
        fileName,
        mimeType: (selectedBlob.type as any) || "image/jpeg",
        fileSize: selectedBlob.size,
        capturedAt: new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        storageKey: "",
        description: description || "Citizen before-rectification photo evidence",
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
      selectedBlob
    );
  };

  return (
    <div className={`p-4 rounded-2xl bg-white border border-[#BCD7EE] space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <span className="text-xs font-bold text-[#102A56] uppercase tracking-wide">
          {t("evidence.addPhotoTitle")}
        </span>
        <span className="text-[10px] font-semibold text-slate-500">
          Client-Side Verified • Zero AI Leak
        </span>
      </div>

      {fileError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {fileError}
        </div>
      )}

      {/* Hidden native file inputs */}
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
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 hover:bg-indigo-100/50 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{t("evidence.takePhotoBtn")}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{t("evidence.uploadPhotoBtn")}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            Supported formats: JPEG, PNG, WebP (Max 10MB). Photos are stored securely in your browser.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-60 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Uploaded civic evidence preview"
              className="max-h-60 object-contain w-full"
            />
            <button
              type="button"
              onClick={handleClearEvidence}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              title="Remove photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              {t("evidence.descriptionLabel")}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("evidence.descriptionPlaceholder")}
              className="w-full p-2.5 bg-[#F4F9FF] border border-[#BCD7EE] text-xs rounded-xl text-slate-900 focus:outline-none"
            />
          </div>

          {/* Geolocation Section */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{t("evidence.geoTagHeading")}</span>
              </div>
              {!location && (
                <button
                  type="button"
                  onClick={handleCaptureLocation}
                  disabled={geoLoading}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {geoLoading ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Acquiring GPS...</span>
                    </>
                  ) : (
                    <span>{t("evidence.addLocationBtn")}</span>
                  )}
                </button>
              )}
            </div>

            {geoError && (
              <div className="flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{geoError}</span>
              </div>
            )}

            {location && (
              <div className="flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-mono">
                    Device-reported: {location.latitude.toFixed(5)}°, {location.longitude.toFixed(5)}°
                    {location.accuracyMeters ? ` (±${location.accuracyMeters}m)` : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLocation(null)}
                  className="text-slate-500 hover:text-slate-700 text-[10px] underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Checksum & Integrity Badge */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>SHA-256 Checksum: {checksum.slice(0, 16)}...</span>
            <span className="text-slate-400">Tamper detection enabled</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isProcessing}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
            >
              {t("evidence.confirmEvidenceBtn")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
