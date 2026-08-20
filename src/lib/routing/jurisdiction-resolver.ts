import { ResolvedJurisdiction } from "@/types/router";
import { GovernmentLevel } from "@/types/source-data";

const STATES_AND_UTS: Record<string, string[]> = {
  "Tamil Nadu": ["tamil nadu", "tn", "chennai", "coimbatore", "madurai", "salem", "tiruchirappalli", "erode"],
  "Maharashtra": ["maharashtra", "mumbai", "pune", "nagpur", "thane", "nashik", "aurangabad"],
  "Karnataka": ["karnataka", "bengaluru", "bangalore", "mysuru", "mysore", "hubballi", "mangalore"],
  "Delhi": ["delhi", "new delhi", "nct", "dwarka", "saket", "rohini", "tis hazari"],
  "Uttar Pradesh": ["uttar pradesh", "up", "lucknow", "noida", "greater noida", "ghaziabad", "kanpur", "varanasi"],
  "Kerala": ["kerala", "thiruvananthapuram", "kochi", "cochin", "kozhikode", "ernakulam"],
  "Telangana": ["telangana", "hyderabad", "secunderabad", "warangal"],
  "Andhra Pradesh": ["andhra pradesh", "ap", "visakhapatnam", "vijayawada", "guntur", "tirupati"],
  "West Bengal": ["west bengal", "wb", "kolkata", "howrah"],
  "Rajasthan": ["rajasthan", "jaipur", "jodhpur", "udaipur"],
  "Gujarat": ["gujarat", "ahmedabad", "surat", "vadodara", "rajkot"]
};

export function resolveJurisdiction(
  query: string,
  hintState?: string,
  hintDistrict?: string
): ResolvedJurisdiction {
  const lowerQuery = query.toLowerCase();

  let resolvedState: string | undefined = hintState;
  let resolvedDistrict: string | undefined = hintDistrict;
  let resolvedLocalBody: string | undefined = undefined;

  // 1. Check direct query text for state / city keywords
  for (const [stateName, keywords] of Object.entries(STATES_AND_UTS)) {
    for (const kw of keywords) {
      if (lowerQuery.includes(kw)) {
        resolvedState = stateName;
        // Check for specific known cities as district hints
        if (kw === "coimbatore") {
          resolvedDistrict = "Coimbatore";
          resolvedLocalBody = "Coimbatore City Municipal Corporation";
        } else if (kw === "chennai") {
          resolvedDistrict = "Chennai";
          resolvedLocalBody = "Greater Chennai Corporation";
        } else if (kw === "bengaluru" || kw === "bangalore") {
          resolvedDistrict = "Bengaluru Urban";
          resolvedLocalBody = "Bruhat Bengaluru Mahanagara Palike (BBMP)";
        } else if (kw === "mumbai") {
          resolvedDistrict = "Mumbai";
          resolvedLocalBody = "Brihanmumbai Municipal Corporation (BMC)";
        } else if (kw === "pune") {
          resolvedDistrict = "Pune";
          resolvedLocalBody = "Pune Municipal Corporation (PMC)";
        }
        break;
      }
    }
    if (resolvedState) break;
  }

  // 2. Determine government level
  let governmentLevel: GovernmentLevel = "CENTRAL";
  if (resolvedLocalBody) {
    governmentLevel = "LOCAL";
  } else if (resolvedState === "Delhi") {
    governmentLevel = "UT";
  } else if (resolvedState) {
    governmentLevel = "STATE";
  }

  return {
    country: "IN",
    state_ut: resolvedState,
    district: resolvedDistrict,
    local_body: resolvedLocalBody,
    government_level: governmentLevel,
    is_state_identified: resolvedState !== undefined
  };
}
