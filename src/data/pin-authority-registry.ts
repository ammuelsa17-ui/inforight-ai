/**
 * InfoRight AI — Verified PIN Code to Authority Registry
 * Grounded statutory mappings between Indian 6-digit PIN codes, geographic jurisdictions,
 * and public authorities under India Post, CCMC Municipal Charters, and RTI Act 2005.
 */

export type CivicIssueCategory =
  | "road_pothole"
  | "drainage_sewage"
  | "streetlight"
  | "waste_sanitation"
  | "water_supply";

export interface CategoryAuthorityMapping {
  issueCategory: CivicIssueCategory;
  categoryTitle: string;
  responsibleAuthority: string;
  departmentName: string;
  rtiAuthority: string;
  grievanceChannel: string;
  postalSourceId: string;
  jurisdictionSourceId: string;
  departmentSourceId: string;
  rtiSourceId: string;
  officialSourceId: string; // Alias for backward compatibility
  confidence: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  reasoning: string;
}

export interface PinAuthorityRecord {
  pinCode: string;
  localityName: string;
  state: string;
  district: string;
  localBodyName: string;
  jurisdictionType: "municipal_corporation" | "municipality" | "town_panchayat" | "district_collectorate";
  zoneName?: string;
  wardNumbers?: string;
  wardNote?: string;
  categoryMappings: Record<CivicIssueCategory, CategoryAuthorityMapping>;
}

export const PIN_AUTHORITY_REGISTRY: Record<string, PinAuthorityRecord> = {
  // 641001 — Town Hall / Coimbatore Main HO (Central Zone)
  "641001": {
    pinCode: "641001",
    localityName: "Town Hall / Coimbatore Main Head Post Office",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation (CCMC)",
    jurisdictionType: "municipal_corporation",
    zoneName: "Central Zone (CCMC HQ Town Hall Office)",
    wardNumbers: undefined,
    wardNote: "Exact ward requires street address confirmation within Central Zone",
    categoryMappings: {
      road_pothole: {
        issueCategory: "road_pothole",
        categoryTitle: "Road Maintenance & Pothole Repair",
        responsibleAuthority: "Engineering Department (Central Zone), CCMC Headquarters",
        departmentName: "CCMC Central Engineering Cell",
        rtiAuthority: "Public Information Officer, CCMC Headquarters, Town Hall, Coimbatore",
        grievanceChannel: "CCMC Central Grievance Cell (1800 425 4355)",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "India Post (SRC-POST-IN-PIN) grounds 641001 to Coimbatore Main Head Post Office at Town Hall. CCMC Zonal Directory (SRC-TN-CCMC-JURISDICTION) places Town Hall in Central Zone."
      },
      drainage_sewage: {
        issueCategory: "drainage_sewage",
        categoryTitle: "Stormwater Drainage & Sewage Overflow",
        responsibleAuthority: "Underground Drainage (UGD) Division, CCMC Central Zone",
        departmentName: "CCMC UGD Division",
        rtiAuthority: "Public Information Officer, CCMC Central Zone",
        grievanceChannel: "CCMC Helpline / UGD Emergency Cell",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Central Zone underground drainage lines are under direct statutory operation of CCMC UGD Division."
      },
      streetlight: {
        issueCategory: "streetlight",
        categoryTitle: "Streetlight Non-Functional & Electrical Maintenance",
        responsibleAuthority: "Electrical Wing (Central Zone), CCMC Headquarters",
        departmentName: "CCMC Electrical Division",
        rtiAuthority: "Public Information Officer, CCMC Headquarters",
        grievanceChannel: "CCMC Electrical Desk",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Commercial area street lighting in Town Hall is maintained directly by CCMC Electrical Division."
      },
      waste_sanitation: {
        issueCategory: "waste_sanitation",
        categoryTitle: "Garbage Clearance & Solid Waste Management",
        responsibleAuthority: "City Health Officer & Sanitary Inspector, Central Zone, CCMC",
        departmentName: "CCMC Central Health Wing",
        rtiAuthority: "Public Information Officer, City Health Officer, CCMC",
        grievanceChannel: "CCMC Sanitation Hotline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Market and commercial waste collection in 641001 is monitored by Central Zone Sanitary Inspectors."
      },
      water_supply: {
        issueCategory: "water_supply",
        categoryTitle: "Piped Drinking Water Supply & Pipe Leaks",
        responsibleAuthority: "Water Supply Division (Pilloor / Siruvani), CCMC",
        departmentName: "CCMC Main Water Cell",
        rtiAuthority: "Public Information Officer, Executive Engineer (Water Supply)",
        grievanceChannel: "CCMC Water Helpline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Piped water in Town Hall is administered by CCMC Central Water Distribution Control."
      }
    }
  },

  // 641002 — R.S. Puram SO (West Zone)
  "641002": {
    pinCode: "641002",
    localityName: "R.S. Puram / Cowley Brown Road / Lawley Road",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation (CCMC)",
    jurisdictionType: "municipal_corporation",
    zoneName: "West Zone (Ramachandra Road Office)",
    wardNumbers: undefined,
    wardNote: "Exact ward requires street address confirmation within West Zone",
    categoryMappings: {
      road_pothole: {
        issueCategory: "road_pothole",
        categoryTitle: "Road Maintenance & Pothole Repair",
        responsibleAuthority: "Engineering Department (West Zone), Coimbatore City Municipal Corporation",
        departmentName: "CCMC West Zone Engineering Cell",
        rtiAuthority: "Public Information Officer, CCMC West Zone Office, R.S. Puram, Coimbatore",
        grievanceChannel: "CCMC Namma Kovai App / CCMC Toll-Free Helpline (1800 425 4355)",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "India Post (SRC-POST-IN-PIN) grounds 641002 to R.S. Puram Post Office. CCMC Zonal Directory (SRC-TN-CCMC-JURISDICTION) places R.S. Puram in West Zone."
      },
      drainage_sewage: {
        issueCategory: "drainage_sewage",
        categoryTitle: "Stormwater Drainage & Sewage Overflow",
        responsibleAuthority: "Public Health & Engineering Department, CCMC West Zone",
        departmentName: "CCMC Public Health Engineering",
        rtiAuthority: "Public Information Officer, CCMC Headquarters, Town Hall, Coimbatore",
        grievanceChannel: "CCMC Civic Helpline / Tamil Nadu E-Sevai Portal",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Urban drainage infrastructure in PIN 641002 is directly administered by CCMC West Zone Engineering Division."
      },
      streetlight: {
        issueCategory: "streetlight",
        categoryTitle: "Streetlight Non-Functional & Electrical Maintenance",
        responsibleAuthority: "Electrical Engineering Wing, Coimbatore City Municipal Corporation",
        departmentName: "CCMC Electrical Maintenance Cell",
        rtiAuthority: "Public Information Officer, CCMC West Zone Office",
        grievanceChannel: "CCMC Electrical Complaints Helpline / WhatsApp Grievance (8190000200)",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Street lighting maintenance in PIN 641002 is assigned to CCMC Electrical Maintenance Division."
      },
      waste_sanitation: {
        issueCategory: "waste_sanitation",
        categoryTitle: "Garbage Clearance & Solid Waste Management",
        responsibleAuthority: "Sanitary Officer & Health Department, CCMC West Zone",
        departmentName: "CCMC Sanitation Cell",
        rtiAuthority: "Public Information Officer, City Health Officer, CCMC",
        grievanceChannel: "CCMC Waste Management Portal / Clean Kovai Hotline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Solid waste collection in 641002 is monitored by CCMC West Zone Sanitary Inspectorate."
      },
      water_supply: {
        issueCategory: "water_supply",
        categoryTitle: "Piped Drinking Water Supply & Pipe Leaks",
        responsibleAuthority: "Water Supply Department, CCMC (Siruvani Distribution Cell)",
        departmentName: "CCMC Water Supply Division",
        rtiAuthority: "Public Information Officer, Executive Engineer (Water Supply), CCMC",
        grievanceChannel: "CCMC Water Supply Grievance Desk / TWAD Board Helpline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Drinking water distribution in R.S. Puram is administered by CCMC Water Supply Division."
      }
    }
  },

  // 641003 — Ganapathy SO (North / East Zone Transition)
  "641003": {
    pinCode: "641003",
    localityName: "Ganapathy / Sivanandapuram",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation (CCMC)",
    jurisdictionType: "municipal_corporation",
    zoneName: undefined, // Ambiguous boundary between North and East zones
    wardNumbers: undefined,
    wardNote: "Exact municipal zone & ward require locality confirmation (Ganapathy boundary)",
    categoryMappings: {
      road_pothole: {
        issueCategory: "road_pothole",
        categoryTitle: "Road Maintenance & Pothole Repair",
        responsibleAuthority: "Coimbatore City Municipal Corporation (Zonal Engineering)",
        departmentName: "CCMC Zonal Engineering Division",
        rtiAuthority: "Public Information Officer, CCMC Headquarters, Town Hall, Coimbatore",
        grievanceChannel: "CCMC Namma Kovai App / CCMC Toll-Free (1800 425 4355)",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "MEDIUM",
        reasoning: "India Post (SRC-POST-IN-PIN) grounds 641003 to Ganapathy. Exact municipal zone requires locality confirmation across North/East boundary."
      },
      drainage_sewage: {
        issueCategory: "drainage_sewage",
        categoryTitle: "Stormwater Drainage & Sewage Overflow",
        responsibleAuthority: "CCMC Public Health Engineering",
        departmentName: "CCMC Public Health Engineering",
        rtiAuthority: "Public Information Officer, CCMC Headquarters",
        grievanceChannel: "CCMC Civic Helpline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "MEDIUM",
        reasoning: "India Post grounds 641003 to Ganapathy. Exact zonal drainage division requires locality confirmation."
      },
      streetlight: {
        issueCategory: "streetlight",
        categoryTitle: "Streetlight Non-Functional & Electrical Maintenance",
        responsibleAuthority: "CCMC Electrical Maintenance Division",
        departmentName: "CCMC Electrical Maintenance Cell",
        rtiAuthority: "Public Information Officer, CCMC Headquarters",
        grievanceChannel: "CCMC Electrical Complaints Helpline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "MEDIUM",
        reasoning: "Street lighting in 641003 maps to CCMC Municipal Electrical Cell."
      },
      waste_sanitation: {
        issueCategory: "waste_sanitation",
        categoryTitle: "Garbage Clearance & Solid Waste Management",
        responsibleAuthority: "CCMC Health Department & Sanitation Inspectorate",
        departmentName: "CCMC Health Wing",
        rtiAuthority: "Public Information Officer, City Health Officer, CCMC",
        grievanceChannel: "CCMC Waste Management Portal",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "MEDIUM",
        reasoning: "Solid waste management in 641003 is administered by CCMC Sanitation Inspectorate."
      },
      water_supply: {
        issueCategory: "water_supply",
        categoryTitle: "Piped Drinking Water Supply & Pipe Leaks",
        responsibleAuthority: "CCMC Water Supply Division",
        departmentName: "CCMC Water Supply Cell",
        rtiAuthority: "Public Information Officer, Executive Engineer (Water Supply)",
        grievanceChannel: "CCMC Water Desk",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "MEDIUM",
        reasoning: "Piped water in Ganapathy is fed via CCMC Municipal Water Supply Cell."
      }
    }
  },

  // 641004 — Peelamedu SO / Hope College / Avinashi Road (East Zone)
  "641004": {
    pinCode: "641004",
    localityName: "Peelamedu / Hope College / Avinashi Road",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation (CCMC)",
    jurisdictionType: "municipal_corporation",
    zoneName: "East Zone (Singanallur CCMC East Office)",
    wardNumbers: undefined,
    wardNote: "Exact ward requires street address confirmation within East Zone",
    categoryMappings: {
      road_pothole: {
        issueCategory: "road_pothole",
        categoryTitle: "Road Maintenance & Pothole Repair",
        responsibleAuthority: "State Highways Department (Avinashi Stretch) / CCMC East Zone Engineering",
        departmentName: "Tamil Nadu State Highways / CCMC East Engineering",
        rtiAuthority: "Public Information Officer, Divisional Engineer (Highways) / CCMC East Zone Office",
        grievanceChannel: "TN Highways Portal / CCMC Helpline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "India Post (SRC-POST-IN-PIN) explicitly grounds PEELAMEDU / PEELMEDU as PIN 641004. CCMC Zonal Directory (SRC-TN-CCMC-JURISDICTION) places Peelamedu in East Zone."
      },
      drainage_sewage: {
        issueCategory: "drainage_sewage",
        categoryTitle: "Stormwater Drainage & Sewage Overflow",
        responsibleAuthority: "Engineering Department (East Zone), CCMC Singanallur Office",
        departmentName: "CCMC East Engineering Cell",
        rtiAuthority: "Public Information Officer, CCMC East Zone Office",
        grievanceChannel: "CCMC Namma Kovai App",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "East Zone municipal drains in Peelamedu map directly to CCMC East Zone Assistant Commissioner."
      },
      streetlight: {
        issueCategory: "streetlight",
        categoryTitle: "Streetlight Non-Functional & Electrical Maintenance",
        responsibleAuthority: "Electrical Wing (East Zone), CCMC",
        departmentName: "CCMC East Electrical Cell",
        rtiAuthority: "Public Information Officer, CCMC East Zone Office",
        grievanceChannel: "CCMC Electrical Desk",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "LED streetlight networks in Peelamedu (641004) are maintained under CCMC East Zone contracts."
      },
      waste_sanitation: {
        issueCategory: "waste_sanitation",
        categoryTitle: "Garbage Clearance & Solid Waste Management",
        responsibleAuthority: "Health Department (East Zone), CCMC",
        departmentName: "CCMC East Sanitation Inspectorate",
        rtiAuthority: "Public Information Officer, City Health Officer",
        grievanceChannel: "CCMC Waste Management Portal",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Residential and IT corridor waste collection in 641004 is monitored by CCMC East Zone Health Wing."
      },
      water_supply: {
        issueCategory: "water_supply",
        categoryTitle: "Piped Drinking Water Supply & Pipe Leaks",
        responsibleAuthority: "Pilloor Water Scheme Cell, CCMC East Zone",
        departmentName: "CCMC Water Supply East Division",
        rtiAuthority: "Public Information Officer, Executive Engineer (Water)",
        grievanceChannel: "CCMC Water Desk",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Water supply in Peelamedu is fed via Pilloor Scheme II distribution mains under CCMC East Division."
      }
    }
  },

  // 641005 — Singanallur SO / Trichy Road / Ondipudur (South Zone)
  "641005": {
    pinCode: "641005",
    localityName: "Singanallur / Trichy Road / Ondipudur",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation (CCMC)",
    jurisdictionType: "municipal_corporation",
    zoneName: "South Zone (Kuniyamuthur CCMC South Office)",
    wardNumbers: undefined,
    wardNote: "Exact ward requires street address confirmation within South Zone",
    categoryMappings: {
      road_pothole: {
        issueCategory: "road_pothole",
        categoryTitle: "Road Maintenance & Pothole Repair",
        responsibleAuthority: "Engineering Department (South Zone), CCMC Kuniyamuthur Office",
        departmentName: "CCMC South Engineering Division",
        rtiAuthority: "Public Information Officer, CCMC South Zone Office",
        grievanceChannel: "CCMC Toll-Free / TN Highways Portal",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "India Post (SRC-POST-IN-PIN) grounds 641005 to Singanallur Post Office. CCMC Zonal Directory (SRC-TN-CCMC-JURISDICTION) places Singanallur in South Zone."
      },
      drainage_sewage: {
        issueCategory: "drainage_sewage",
        categoryTitle: "Stormwater Drainage & Sewage Overflow",
        responsibleAuthority: "Public Health Engineering Wing, CCMC South Zone",
        departmentName: "CCMC South Public Health",
        rtiAuthority: "Public Information Officer, CCMC South Zone Office",
        grievanceChannel: "CCMC Civic App",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Singanallur tank feeder channels and stormwater drains are maintained by CCMC South Zone."
      },
      streetlight: {
        issueCategory: "streetlight",
        categoryTitle: "Streetlight Non-Functional & Electrical Maintenance",
        responsibleAuthority: "Electrical Wing (South Zone), CCMC",
        departmentName: "CCMC South Electrical Cell",
        rtiAuthority: "Public Information Officer, CCMC South Zone Office",
        grievanceChannel: "CCMC Electrical Desk",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Trichy Road municipal streetlights map to CCMC South Zone Electrical Maintenance."
      },
      waste_sanitation: {
        issueCategory: "waste_sanitation",
        categoryTitle: "Garbage Clearance & Solid Waste Management",
        responsibleAuthority: "Sanitary Inspector, CCMC South Zone",
        departmentName: "CCMC South Sanitation Cell",
        rtiAuthority: "Public Information Officer, City Health Officer",
        grievanceChannel: "CCMC Sanitation Cell",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Solid waste management in Singanallur is operated by CCMC South Zone Health Inspectorate."
      },
      water_supply: {
        issueCategory: "water_supply",
        categoryTitle: "Piped Drinking Water Supply & Pipe Leaks",
        responsibleAuthority: "Water Supply Department (South Zone), CCMC",
        departmentName: "CCMC South Water Cell",
        rtiAuthority: "Public Information Officer, Executive Engineer (Water)",
        grievanceChannel: "CCMC Water Supply Desk",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Drinking water in 641005 is administered under CCMC South Zone Distribution Grid."
      }
    }
  },

  // 641012 — Gandhipuram Bazaar SO (North Zone)
  "641012": {
    pinCode: "641012",
    localityName: "Gandhipuram / Crosscut Road / 100 Feet Road",
    state: "Tamil Nadu",
    district: "Coimbatore",
    localBodyName: "Coimbatore City Municipal Corporation (CCMC)",
    jurisdictionType: "municipal_corporation",
    zoneName: "North Zone (Balasundaram Road Office)",
    wardNumbers: undefined,
    wardNote: "Exact ward requires street address confirmation within North Zone",
    categoryMappings: {
      road_pothole: {
        issueCategory: "road_pothole",
        categoryTitle: "Road Maintenance & Pothole Repair",
        responsibleAuthority: "Engineering Department (North Zone), CCMC Balasundaram Road Office",
        departmentName: "CCMC North Engineering Division",
        rtiAuthority: "Public Information Officer, CCMC North Zone Office, Coimbatore",
        grievanceChannel: "CCMC Namma Kovai App / CCMC Toll-Free (1800 425 4355)",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "India Post (SRC-POST-IN-PIN) grounds 641012 to Gandhipuram Bazaar Post Office. CCMC Zonal Directory (SRC-TN-CCMC-JURISDICTION) places Gandhipuram in North Zone."
      },
      drainage_sewage: {
        issueCategory: "drainage_sewage",
        categoryTitle: "Stormwater Drainage & Sewage Overflow",
        responsibleAuthority: "Drainage Division (North Zone), CCMC",
        departmentName: "CCMC North Drainage Cell",
        rtiAuthority: "Public Information Officer, CCMC North Zone Office",
        grievanceChannel: "CCMC Civic Helpline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Crosscut Road stormwater channels are under CCMC North Division maintenance."
      },
      streetlight: {
        issueCategory: "streetlight",
        categoryTitle: "Streetlight Non-Functional & Electrical Maintenance",
        responsibleAuthority: "Electrical Wing (North Zone), CCMC",
        departmentName: "CCMC North Electrical Wing",
        rtiAuthority: "Public Information Officer, CCMC North Zone Office",
        grievanceChannel: "CCMC Electrical Desk",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Commercial streetlights in Gandhipuram are serviced under CCMC North Zone Electrical Maintenance."
      },
      waste_sanitation: {
        issueCategory: "waste_sanitation",
        categoryTitle: "Garbage Clearance & Solid Waste Management",
        responsibleAuthority: "Sanitary Officer & Health Department, CCMC North Zone",
        departmentName: "CCMC North Health Inspectorate",
        rtiAuthority: "Public Information Officer, City Health Officer",
        grievanceChannel: "CCMC Clean Kovai Cell",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Commercial bus stand and retail corridor waste collection in 641012 is managed by CCMC North Sanitation Inspectors."
      },
      water_supply: {
        issueCategory: "water_supply",
        categoryTitle: "Piped Drinking Water Supply & Pipe Leaks",
        responsibleAuthority: "Siruvani / Pilloor Distribution Wing, CCMC North Zone",
        departmentName: "CCMC North Water Cell",
        rtiAuthority: "Public Information Officer, Executive Engineer (Water)",
        grievanceChannel: "CCMC Water Helpline",
        postalSourceId: "SRC-POST-IN-PIN",
        jurisdictionSourceId: "SRC-TN-CCMC-JURISDICTION",
        departmentSourceId: "SRC-TN-CCMC-DEPARTMENTS",
        rtiSourceId: "SRC-TN-CCMC-RTI-PIO",
        officialSourceId: "SRC-TN-CCMC-JURISDICTION",
        confidence: "HIGH",
        reasoning: "Water supply in Gandhipuram commercial zone is monitored under CCMC North Division Distribution Grid."
      }
    }
  }
};
