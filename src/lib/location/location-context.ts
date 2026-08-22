// src/lib/location/location-context.ts — Pan-India Location Context and Resolution
export interface IndiaLocationContext {
  country: "India";
  stateCode: string;
  stateName: string;
  unionTerritory: boolean;
  district?: string;
  pinCode?: string;
  city?: string;
  locality?: string;
  addressOptional?: string;
  resolutionSource: "CITIZEN_SELECTED" | "PIN_GROUNDED" | "DISTRICT_CONFIRMED" | "FALLBACK";
}

export interface StateUtMetadata {
  code: string;
  name: string;
  unionTerritory: boolean;
  capital: string;
  officialLanguages: string[];
  highCourtJurisdiction: string;
}

export const ALL_STATES_AND_UTS: StateUtMetadata[] = [
  // 28 States
  { code: "AP", name: "Andhra Pradesh", unionTerritory: false, capital: "Amaravati", officialLanguages: ["te-IN", "en-IN"], highCourtJurisdiction: "High Court of Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh", unionTerritory: false, capital: "Itanagar", officialLanguages: ["en-IN"], highCourtJurisdiction: "Gauhati High Court" },
  { code: "AS", name: "Assam", unionTerritory: false, capital: "Dispur", officialLanguages: ["as-IN", "bn-IN", "en-IN"], highCourtJurisdiction: "Gauhati High Court" },
  { code: "BR", name: "Bihar", unionTerritory: false, capital: "Patna", officialLanguages: ["hi-IN", "ur-IN"], highCourtJurisdiction: "Patna High Court" },
  { code: "CG", name: "Chhattisgarh", unionTerritory: false, capital: "Raipur", officialLanguages: ["hi-IN"], highCourtJurisdiction: "Chhattisgarh High Court" },
  { code: "GA", name: "Goa", unionTerritory: false, capital: "Panaji", officialLanguages: ["kok-IN", "mr-IN", "en-IN"], highCourtJurisdiction: "Bombay High Court" },
  { code: "GJ", name: "Gujarat", unionTerritory: false, capital: "Gandhinagar", officialLanguages: ["gu-IN", "hi-IN"], highCourtJurisdiction: "Gujarat High Court" },
  { code: "HR", name: "Haryana", unionTerritory: false, capital: "Chandigarh", officialLanguages: ["hi-IN", "pa-IN"], highCourtJurisdiction: "Punjab and Haryana High Court" },
  { code: "HP", name: "Himachal Pradesh", unionTerritory: false, capital: "Shimla", officialLanguages: ["hi-IN"], highCourtJurisdiction: "Himachal Pradesh High Court" },
  { code: "JH", name: "Jharkhand", unionTerritory: false, capital: "Ranchi", officialLanguages: ["hi-IN", "sat-IN"], highCourtJurisdiction: "Jharkhand High Court" },
  { code: "KA", name: "Karnataka", unionTerritory: false, capital: "Bengaluru", officialLanguages: ["kn-IN", "en-IN"], highCourtJurisdiction: "High Court of Karnataka" },
  { code: "KL", name: "Kerala", unionTerritory: false, capital: "Thiruvananthapuram", officialLanguages: ["ml-IN", "en-IN"], highCourtJurisdiction: "High Court of Kerala" },
  { code: "MP", name: "Madhya Pradesh", unionTerritory: false, capital: "Bhopal", officialLanguages: ["hi-IN"], highCourtJurisdiction: "Madhya Pradesh High Court" },
  { code: "MH", name: "Maharashtra", unionTerritory: false, capital: "Mumbai", officialLanguages: ["mr-IN", "en-IN"], highCourtJurisdiction: "Bombay High Court" },
  { code: "MN", name: "Manipur", unionTerritory: false, capital: "Imphal", officialLanguages: ["mni-IN", "en-IN"], highCourtJurisdiction: "High Court of Manipur" },
  { code: "ML", name: "Meghalaya", unionTerritory: false, capital: "Shillong", officialLanguages: ["en-IN"], highCourtJurisdiction: "High Court of Meghalaya" },
  { code: "MZ", name: "Mizoram", unionTerritory: false, capital: "Aizawl", officialLanguages: ["en-IN"], highCourtJurisdiction: "Gauhati High Court" },
  { code: "NL", name: "Nagaland", unionTerritory: false, capital: "Kohima", officialLanguages: ["en-IN"], highCourtJurisdiction: "Gauhati High Court" },
  { code: "OD", name: "Odisha", unionTerritory: false, capital: "Bhubaneswar", officialLanguages: ["od-IN", "en-IN"], highCourtJurisdiction: "Orissa High Court" },
  { code: "PB", name: "Punjab", unionTerritory: false, capital: "Chandigarh", officialLanguages: ["pa-IN", "en-IN"], highCourtJurisdiction: "Punjab and Haryana High Court" },
  { code: "RJ", name: "Rajasthan", unionTerritory: false, capital: "Jaipur", officialLanguages: ["hi-IN"], highCourtJurisdiction: "Rajasthan High Court" },
  { code: "SK", name: "Sikkim", unionTerritory: false, capital: "Gangtok", officialLanguages: ["ne-IN", "en-IN"], highCourtJurisdiction: "High Court of Sikkim" },
  { code: "TN", name: "Tamil Nadu", unionTerritory: false, capital: "Chennai", officialLanguages: ["ta-IN", "en-IN"], highCourtJurisdiction: "Madras High Court" },
  { code: "TS", name: "Telangana", unionTerritory: false, capital: "Hyderabad", officialLanguages: ["te-IN", "ur-IN", "en-IN"], highCourtJurisdiction: "High Court for the State of Telangana" },
  { code: "TR", name: "Tripura", unionTerritory: false, capital: "Agartala", officialLanguages: ["bn-IN", "en-IN"], highCourtJurisdiction: "High Court of Tripura" },
  { code: "UP", name: "Uttar Pradesh", unionTerritory: false, capital: "Lucknow", officialLanguages: ["hi-IN", "ur-IN"], highCourtJurisdiction: "Allahabad High Court" },
  { code: "UK", name: "Uttarakhand", unionTerritory: false, capital: "Dehradun", officialLanguages: ["hi-IN", "sa-IN"], highCourtJurisdiction: "Uttarakhand High Court" },
  { code: "WB", name: "West Bengal", unionTerritory: false, capital: "Kolkata", officialLanguages: ["bn-IN", "en-IN", "ne-IN"], highCourtJurisdiction: "Calcutta High Court" },
  // 8 Union Territories
  { code: "AN", name: "Andaman and Nicobar Islands", unionTerritory: true, capital: "Port Blair", officialLanguages: ["hi-IN", "en-IN"], highCourtJurisdiction: "Calcutta High Court" },
  { code: "CH", name: "Chandigarh", unionTerritory: true, capital: "Chandigarh", officialLanguages: ["en-IN", "hi-IN", "pa-IN"], highCourtJurisdiction: "Punjab and Haryana High Court" },
  { code: "DH", name: "Dadra and Nagar Haveli and Daman and Diu", unionTerritory: true, capital: "Daman", officialLanguages: ["gu-IN", "mr-IN", "hi-IN"], highCourtJurisdiction: "Bombay High Court" },
  { code: "DL", name: "Delhi", unionTerritory: true, capital: "New Delhi", officialLanguages: ["hi-IN", "en-IN", "ur-IN", "pa-IN"], highCourtJurisdiction: "High Court of Delhi" },
  { code: "JK", name: "Jammu and Kashmir", unionTerritory: true, capital: "Srinagar / Jammu", officialLanguages: ["ks-IN", "ur-IN", "doi-IN", "hi-IN", "en-IN"], highCourtJurisdiction: "High Court of Jammu & Kashmir and Ladakh" },
  { code: "LA", name: "Ladakh", unionTerritory: true, capital: "Leh", officialLanguages: ["hi-IN", "en-IN"], highCourtJurisdiction: "High Court of Jammu & Kashmir and Ladakh" },
  { code: "LD", name: "Lakshadweep", unionTerritory: true, capital: "Kavaratti", officialLanguages: ["ml-IN", "en-IN"], highCourtJurisdiction: "High Court of Kerala" },
  { code: "PY", name: "Puducherry", unionTerritory: true, capital: "Puducherry", officialLanguages: ["ta-IN", "fr-IN", "en-IN"], highCourtJurisdiction: "Madras High Court" },
];

export function resolveLocationContext(input: {
  state?: string;
  stateCode?: string;
  district?: string;
  pinCode?: string;
  city?: string;
  locality?: string;
}): IndiaLocationContext {
  const normState = input.state?.trim();
  const normCode = input.stateCode?.trim().toUpperCase();

  const found = ALL_STATES_AND_UTS.find(
    (s) =>
      (normCode && s.code === normCode) ||
      (normState && s.name.toLowerCase() === normState.toLowerCase()) ||
      (normState && s.code.toLowerCase() === normState.toLowerCase())
  );

  const matched = found || {
    code: "TN",
    name: "Tamil Nadu",
    unionTerritory: false,
    capital: "Chennai",
    officialLanguages: ["ta-IN", "en-IN"],
    highCourtJurisdiction: "Madras High Court",
  };

  return {
    country: "India",
    stateCode: matched.code,
    stateName: matched.name,
    unionTerritory: matched.unionTerritory,
    district: input.district?.trim(),
    pinCode: input.pinCode?.trim(),
    city: input.city?.trim(),
    locality: input.locality?.trim(),
    resolutionSource: input.state ? "CITIZEN_SELECTED" : input.pinCode ? "PIN_GROUNDED" : "FALLBACK",
  };
}
