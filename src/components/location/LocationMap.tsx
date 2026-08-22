"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, RotateCcw, AlertCircle, ShieldCheck } from "lucide-react";
import { LocationSource } from "@/types/rectification";
import { getApproximatePinCoordinates } from "@/lib/geo/contextual-location";
import { useLanguage } from "@/context/LanguageContext";

export interface MarkerPoint {
  lat: number;
  lng: number;
  label?: string;
  color?: "indigo" | "emerald" | "amber" | "rose";
  source?: LocationSource;
}

export interface LocationMapProps {
  initialLat?: number;
  initialLng?: number;
  zoom?: number;
  markers?: MarkerPoint[];
  onLocationSelect?: (lat: number, lng: number, source: LocationSource) => void;
  interactive?: boolean;
  pinCode?: string;
  className?: string;
  heightClass?: string;
  helperText?: string;
  showLocationStatus?: boolean;
}

// Neutral Pan-India center for default unpinned view
const NEUTRAL_INDIA_LAT = 20.5937;
const NEUTRAL_INDIA_LNG = 78.9629;
const NEUTRAL_INDIA_ZOOM = 4;

export function LocationMap({
  initialLat,
  initialLng,
  zoom = 14,
  markers = [],
  onLocationSelect,
  interactive = true,
  pinCode,
  className = "",
  heightClass = "h-[280px] sm:h-[340px]",
  helperText,
  showLocationStatus = true,
}: LocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletMarkersRef = useRef<any[]>([]);

  // If pinCode provided, check if we have an approximate centroid
  const pinCoords = pinCode ? getApproximatePinCoordinates(pinCode) : null;
  const effectiveLat = initialLat ?? pinCoords?.lat;
  const effectiveLng = initialLng ?? pinCoords?.lng;

  const [currentMarker, setCurrentMarker] = useState<{ lat: number; lng: number; source: LocationSource } | null>(
    markers.length > 0
      ? { lat: markers[0].lat, lng: markers[0].lng, source: markers[0].source || "MAP_SELECTED" }
      : effectiveLat && effectiveLng
      ? { lat: effectiveLat, lng: effectiveLng, source: "PIN_APPROXIMATE" }
      : null
  );

  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<LocationSource>(
    markers.length > 0
      ? markers[0].source || "MAP_SELECTED"
      : effectiveLat && effectiveLng
      ? "PIN_APPROXIMATE"
      : "MANUAL"
  );

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      const L = (await import("leaflet")).default;

      // Fix standard Leaflet default icon URLs in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const centerLat = currentMarker?.lat ?? effectiveLat ?? NEUTRAL_INDIA_LAT;
        const centerLng = currentMarker?.lng ?? effectiveLng ?? NEUTRAL_INDIA_LNG;
        const initialZoom = (currentMarker?.lat || effectiveLat) ? zoom : NEUTRAL_INDIA_ZOOM;

        const map = L.map(mapContainerRef.current, {
          center: [centerLat, centerLng],
          zoom: initialZoom,
          zoomControl: true,
          attributionControl: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        if (interactive && onLocationSelect) {
          map.on("click", (e: any) => {
            const { lat, lng } = e.latlng;
            setCurrentMarker({ lat, lng, source: "MAP_SELECTED" });
            setActiveSource("MAP_SELECTED");
            onLocationSelect(lat, lng, "MAP_SELECTED");
          });
        }

        mapInstanceRef.current = map;
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when PIN changes
  useEffect(() => {
    if (pinCode && mapInstanceRef.current) {
      const pinCoords = getApproximatePinCoordinates(pinCode);
      if (pinCoords) {
        mapInstanceRef.current.setView([pinCoords.lat, pinCoords.lng], 14);
        setCurrentMarker({ lat: pinCoords.lat, lng: pinCoords.lng, source: "PIN_APPROXIMATE" });
        setActiveSource("PIN_APPROXIMATE");
        if (onLocationSelect) {
          onLocationSelect(pinCoords.lat, pinCoords.lng, "PIN_APPROXIMATE");
        }
      }
    }
  }, [pinCode]);

  // Render Markers
  useEffect(() => {
    async function updateMarkers() {
      if (!mapInstanceRef.current) return;
      const L = (await import("leaflet")).default;

      // Clear existing markers
      leafletMarkersRef.current.forEach((m) => m.remove());
      leafletMarkersRef.current = [];

      // If explicit markers array provided
      if (markers.length > 0) {
        markers.forEach((pt) => {
          const marker = L.marker([pt.lat, pt.lng]);
          if (pt.label) {
            marker.bindPopup(`<strong>${pt.label}</strong><br/>(${pt.lat.toFixed(5)}°, ${pt.lng.toFixed(5)}°)`);
          }
          marker.addTo(mapInstanceRef.current);
          leafletMarkersRef.current.push(marker);
        });

        if (markers.length > 1) {
          const group = L.featureGroup(leafletMarkersRef.current);
          mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
        } else if (markers.length === 1) {
          mapInstanceRef.current.setView([markers[0].lat, markers[0].lng], zoom);
        }
      } else if (currentMarker) {
        const marker = L.marker([currentMarker.lat, currentMarker.lng]);
        marker.bindPopup(
          `<strong>${activeSource === "DEVICE_GPS" ? "Device Location" : activeSource === "MAP_SELECTED" ? "Citizen Confirmed Location" : "Approximate PIN Location"}</strong><br/>${currentMarker.lat.toFixed(5)}°, ${currentMarker.lng.toFixed(5)}°`
        );
        marker.addTo(mapInstanceRef.current);
        leafletMarkersRef.current.push(marker);
      }
    }

    updateMarkers();
  }, [markers, currentMarker, activeSource, zoom]);

  const handleUseCurrentLocation = () => {
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCurrentMarker({ lat, lng, source: "DEVICE_GPS" });
        setActiveSource("DEVICE_GPS");

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 16);
        }

        if (onLocationSelect) {
          onLocationSelect(lat, lng, "DEVICE_GPS");
        }
      },
      (err) => {
        setGeoLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError("Location permission was denied. You can still click on the map to set the location.");
        } else {
          setGeoError("Could not retrieve device location. Please select the point on the map.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const { t } = useLanguage();

  const getSourceLabel = (src: LocationSource) => {
    switch (src) {
      case "DEVICE_GPS":
        return t("ask.deviceGpsLabel");
      case "MAP_SELECTED":
        return t("ask.citizenConfirmedLabel");
      case "PIN_APPROXIMATE":
      default:
        return t("ask.approximatePinLabel");
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Map Control Actions */}
      {interactive && (
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={geoLoading}
            className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Navigation className="w-3.5 h-3.5 text-indigo-600" />
            <span>{geoLoading ? t("ask.detectingGps") : t("ask.useCurrentLocation")}</span>
          </button>

          {showLocationStatus && currentMarker && (
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              {getSourceLabel(activeSource)}
            </span>
          )}
        </div>
      )}

      {geoError && (
        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{geoError}</span>
        </div>
      )}

      {/* Leaflet Canvas Container */}
      <div className={`w-full max-w-full rounded-2xl border border-slate-200 overflow-hidden relative shadow-2xs ${heightClass}`}>
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500 leading-normal">
          {helperText}
        </p>
      )}
    </div>
  );
}
