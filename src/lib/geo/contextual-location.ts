import { LocationSource } from "@/types/rectification";

export interface ContextualLocationModel {
  latitude?: number;
  longitude?: number;
  accuracyMeters?: number;
  source: LocationSource;
  pinCode?: string;
  state?: string;
  district?: string;
  locality?: string;
  capturedAt?: string;
  isApproximate?: boolean;
}

/**
 * Centroids for major verified PIN codes / administrative headquarters.
 * Used for approximate visual centering without fabricating street-level precision.
 */
export const APPROXIMATE_PIN_CENTROIDS: Record<string, { lat: number; lng: number; locality: string }> = {
  // Tamil Nadu
  "641001": { lat: 10.9972, lng: 76.9634, locality: "Coimbatore Central / Collectorate" },
  "641002": { lat: 11.0084, lng: 76.9515, locality: "R.S. Puram, Coimbatore" },
  "641004": { lat: 11.0264, lng: 77.0028, locality: "Peelamedu, Coimbatore" },
  "641005": { lat: 11.0298, lng: 76.9388, locality: "Saibaba Colony, Coimbatore" },
  "641012": { lat: 11.0183, lng: 76.9725, locality: "Gandhipuram, Coimbatore" },
  "600001": { lat: 13.0878, lng: 80.2885, locality: "George Town / Fort St. George, Chennai" },
  "600042": { lat: 12.9815, lng: 80.2180, locality: "Velachery, Chennai" },
  "625001": { lat: 9.9252, lng: 78.1198, locality: "Madurai Main" },
  "620001": { lat: 10.7905, lng: 78.7047, locality: "Tiruchirappalli Central" },
  "636001": { lat: 11.6643, lng: 78.1460, locality: "Salem Collectorate" },

  // Karnataka
  "560001": { lat: 12.9716, lng: 77.5946, locality: "Bengaluru G.P.O. / MG Road" },
  "560034": { lat: 12.9279, lng: 77.6271, locality: "Koramangala, Bengaluru" },
  "560066": { lat: 12.9698, lng: 77.7500, locality: "Whitefield, Bengaluru" },
  "570001": { lat: 12.2958, lng: 76.6394, locality: "Mysuru Head Post Office" },

  // Maharashtra
  "400001": { lat: 18.9322, lng: 72.8347, locality: "Mumbai G.P.O. / Fort" },
  "400051": { lat: 19.0596, lng: 72.8495, locality: "Bandra Kurla Complex (BKC), Mumbai" },
  "411001": { lat: 18.5204, lng: 73.8567, locality: "Pune H.O. / Camp" },

  // Delhi NCR
  "110001": { lat: 28.6304, lng: 77.2177, locality: "Connaught Place, New Delhi" },
  "110003": { lat: 28.5921, lng: 77.2285, locality: "Kaka Nagar / CGO Complex, New Delhi" },

  // Uttar Pradesh
  "226001": { lat: 26.8467, lng: 80.9462, locality: "Hazratganj, Lucknow" },
  "201301": { lat: 28.5355, lng: 77.3910, locality: "Sector 1–12, Noida" },

  // West Bengal
  "700001": { lat: 22.5726, lng: 88.3639, locality: "B.B.D. Bagh / Kolkata G.P.O." },

  // Kerala
  "695001": { lat: 8.5241, lng: 76.9366, locality: "Thiruvananthapuram G.P.O." },
  "682001": { lat: 9.9312, lng: 76.2673, locality: "Kochi Port / Fort Kochi" },

  // Telangana
  "500001": { lat: 17.3850, lng: 78.4867, locality: "Hyderabad G.P.O. / Abids" },
  "500081": { lat: 17.4435, lng: 78.3772, locality: "HITEC City / Madhapur, Hyderabad" },

  // Gujarat
  "380001": { lat: 23.0225, lng: 72.5714, locality: "Ahmedabad G.P.O." },

  // Rajasthan
  "302001": { lat: 26.9124, lng: 75.7873, locality: "Jaipur G.P.O. / MI Road" },
};

/**
 * Resolves approximate coordinates for a 6-digit Indian PIN code.
 */
export function getApproximatePinCoordinates(pincode: string): { lat: number; lng: number; locality: string } | null {
  if (!pincode || pincode.length !== 6) return null;
  return APPROXIMATE_PIN_CENTROIDS[pincode] || null;
}
