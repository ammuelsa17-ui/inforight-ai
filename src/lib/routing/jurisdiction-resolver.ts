import { ResolvedJurisdiction } from "@/types/router";
import { GovernmentLevel } from "@/types/source-data";

const STATES_AND_UTS: Record<string, string[]> = {
  "Tamil Nadu": ["tamil nadu", "tn", "chennai", "madras", "coimbatore", "madurai", "salem", "tiruchirappalli", "trichy", "erode", "tirunelveli"],
  "Maharashtra": ["maharashtra", "mumbai", "bombay", "pune", "nagpur", "thane", "nashik", "aurangabad", "navi mumbai"],
  "Karnataka": ["karnataka", "bengaluru", "bangalore", "mysuru", "mysore", "hubballi", "hubli", "dharwad", "mangalore", "mangaluru", "belagavi"],
  "Delhi": ["delhi", "new delhi", "nct", "dwarka", "saket", "rohini", "tis hazari", "karkardooma"],
  "Uttar Pradesh": ["uttar pradesh", "up", "lucknow", "noida", "greater noida", "ghaziabad", "kanpur", "varanasi", "agra", "prayagraj", "allahabad", "meerut"],
  "Kerala": ["kerala", "thiruvananthapuram", "trivandrum", "kochi", "cochin", "kozhikode", "calicut", "ernakulam", "thrissur", "kollam"],
  "Telangana": ["telangana", "hyderabad", "secunderabad", "warangal", "nizamabad", "karimnagar"],
  "Andhra Pradesh": ["andhra pradesh", "ap", "visakhapatnam", "vizag", "vijayawada", "guntur", "tirupati", "amaravati"],
  "West Bengal": ["west bengal", "wb", "kolkata", "calcutta", "howrah", "durgapur", "asansol", "siliguri"],
  "Rajasthan": ["rajasthan", "jaipur", "jodhpur", "kota", "bikaner", "ajmer", "udaipur"],
  "Gujarat": ["gujarat", "ahmedabad", "surat", "vadodara", "rajkot", "gandhinagar"],
  "Assam": ["assam", "guwahati", "dispur", "silchar", "dibrugarh", "jorhat"],
  "Bihar": ["bihar", "patna", "gaya", "bhagalpur", "muzaffarpur", "darbhanga"],
  "Chhattisgarh": ["chhattisgarh", "cg", "raipur", "bilaspur", "durg", "bhilai"],
  "Goa": ["goa", "panaji", "margao", "vasco", "mapusa", "ponda"],
  "Haryana": ["haryana", "gurugram", "gurgaon", "faridabad", "panipat", "ambala", "karnal", "rohtak"],
  "Himachal Pradesh": ["himachal pradesh", "himachal", "hp", "shimla", "dharamshala", "solan", "mandi", "kullu", "manali"],
  "Jharkhand": ["jharkhand", "ranchi", "jamshedpur", "dhanbad", "bokaro", "deoghar"],
  "Madhya Pradesh": ["madhya pradesh", "mp", "bhopal", "indore", "gwalior", "jabalpur", "ujjain"],
  "Odisha": ["odisha", "orissa", "bhubaneswar", "cuttack", "rourkela", "berhampur", "sambalpur", "puri"],
  "Punjab": ["punjab", "ludhiana", "amritsar", "jalandhar", "patiala", "mohali", "bathinda"],
  "Uttarakhand": ["uttarakhand", "uttaranchal", "dehradun", "haridwar", "haldwani", "roorkee", "nainital", "rishikesh"],
  "Arunachal Pradesh": ["arunachal pradesh", "itanagar", "naharlagun", "tawang", "pasighat"],
  "Manipur": ["manipur", "imphal", "churachandpur", "thoubal"],
  "Meghalaya": ["meghalaya", "shillong", "tura", "jowai"],
  "Mizoram": ["mizoram", "aizawl", "lunglei", "champhai"],
  "Nagaland": ["nagaland", "nagaland", "kohima", "dimapur", "mokokchung"],
  "Sikkim": ["sikkim", "gangtok", "namchi", "geyzing"],
  "Tripura": ["tripura", "agartala", "dharmanagar"],
  "Andaman and Nicobar Islands": ["andaman", "nicobar", "port blair"],
  "Chandigarh": ["chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["dadra", "nagar haveli", "daman", "diu", "silvassa"],
  "Jammu and Kashmir": ["jammu and kashmir", "j&k", "jammu", "srinagar", "anantnag", "baramulla"],
  "Ladakh": ["ladakh", "leh", "kargil"],
  "Lakshadweep": ["lakshadweep", "kavaratti", "agatti", "amini"],
  "Puducherry": ["puducherry", "pondicherry", "karaikal", "mahe", "yanam"]
};

const UT_NAMES = new Set([
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
]);

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
        } else if (kw === "chennai" || kw === "madras") {
          resolvedDistrict = "Chennai";
          resolvedLocalBody = "Greater Chennai Corporation";
        } else if (kw === "bengaluru" || kw === "bangalore") {
          resolvedDistrict = "Bengaluru Urban";
          resolvedLocalBody = "Bruhat Bengaluru Mahanagara Palike (BBMP)";
        } else if (kw === "mumbai" || kw === "bombay") {
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
  } else if (resolvedState && UT_NAMES.has(resolvedState)) {
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
