import { BharatLanguageCode } from "@/lib/language/types";

export interface UITranslationDictionary {
  nav: {
    home: string;
    rtiDrafting: string;
    rightsNavigator: string;
    welfareSchemes: string;
    officialSources: string;
    describeProblem: string;
    selectLanguage: string;
  };
  common: {
    backToHome: string;
    statutoryDisputeNav: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  rights: {
    badge: string;
    title: string;
    subtitle: string;
    consumerTitle: string;
    consumerDescription: string;
    consumerEscalation: string;
    consumerButton: string;
    tenantTitle: string;
    tenantDescription: string;
    tenantEscalation: string;
    tenantButton: string;
    workplaceTitle: string;
    workplaceDescription: string;
    workplaceEscalation: string;
    workplaceButton: string;
  };
  schemes: {
    badge: string;
    title: string;
    subtitle: string;
  };
  sources: {
    badge: string;
    title: string;
    subtitle: string;
  };
  resources: {
    badge: string;
    title: string;
    subtitle: string;
  };
  official: {
    badge: string;
    title: string;
    subtitle: string;
  };
  dashboard: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export const ENGLISH_UI_TRANSLATIONS: UITranslationDictionary = {
  nav: {
    home: "Home",
    rtiDrafting: "RTI Drafting",
    rightsNavigator: "Rights Navigator",
    welfareSchemes: "Welfare Schemes",
    officialSources: "Official Sources",
    describeProblem: "Describe Problem",
    selectLanguage: "Select Language",
  },
  common: {
    backToHome: "Back to Home",
    statutoryDisputeNav: "Statutory Dispute Navigation",
  },
  home: {
    badge: "AI for Civic and Legal Empowerment — Version 2.0",
    title: "Understand and Act on Your Civic & Legal Rights",
    subtitle: "InfoRight AI translates bureaucratic complexity into a clear, guided path. Describe your problem in plain language to generate certified RTI record requests or match welfare schemes.",
    cta: "Describe Your Problem (Unified Entry)",
  },
  rights: {
    badge: "Statutory Rights Navigator",
    title: "Know & Enforce Your Citizen Rights",
    subtitle: "Select a dispute category to access official escalation channels, statutory forms, and state portal links.",
    consumerTitle: "Consumer Disputes",
    consumerDescription: "Faulty products, defective services, billing fraud, and unfulfilled warranties.",
    consumerEscalation: "National Consumer Helpline (NCH 1915) & e-Jagriti Portal",
    consumerButton: "Navigate Consumer Dispute",
    tenantTitle: "Tenant Rights",
    tenantDescription: "Unlawful eviction, security deposit retention, rent control, and maintenance disputes.",
    tenantEscalation: "State Rent Control Authority / Rent Tribunal",
    tenantButton: "Navigate Tenant Dispute",
    workplaceTitle: "Workplace Rights",
    workplaceDescription: "Unpaid wages, illegal termination, gratuity withholding, and workplace safety.",
    workplaceEscalation: "Labor Commissioner Office & SAMADHAN 2.0 Portal",
    workplaceButton: "Navigate Workplace Dispute",
  },
  schemes: {
    badge: "Government Schemes",
    title: "Welfare Schemes & Scholarships",
    subtitle: "Check eligibility for post-matric scholarships, welfare assistance, and state benefits.",
  },
  sources: {
    badge: "Official Legal Repository",
    title: "Verified Statutory Sources & Rules",
    subtitle: "Grounding legal recommendations in official acts, state RTI rules, and gazette notifications.",
  },
  resources: {
    badge: "Public Documentation & Templates",
    title: "Civic Resources & Form Templates",
    subtitle: "Access verified statutory forms, RTI templates, and legal guidance documentation.",
  },
  official: {
    badge: "Government Officer Interface",
    title: "Official Decision Portal",
    subtitle: "Review incoming citizen consultations, audit statutory timelines, and process RTI requests.",
  },
  dashboard: {
    badge: "Citizen Case Store",
    title: "My Dashboard & Saved Cases",
    subtitle: "Access saved RTI applications, statutory guidance, and official consultation records.",
  },
};

export const KANNADA_UI_TRANSLATIONS: UITranslationDictionary = {
  nav: {
    home: "ಮುಖಪುಟ",
    rtiDrafting: "ಆರ್‌ಟಿಐ ಕರಡು",
    rightsNavigator: "ಹಕ್ಕುಗಳ ಮಾರ್ಗದರ್ಶಿ",
    welfareSchemes: "ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು",
    officialSources: "ಅಧಿಕೃತ ಮೂಲಗಳು",
    describeProblem: "ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
  common: {
    backToHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    statutoryDisputeNav: "ಶಾಸನಬದ್ಧ ವಿವಾದ ಮಾರ್ಗದರ್ಶನ",
  },
  home: {
    badge: "ನಾಗರಿಕ ಮತ್ತು ಕಾನೂನು ಸಬಲೀಕರಣಕ್ಕಾಗಿ AI — ಆವೃತ್ತಿ 2.0",
    title: "ನಿಮ್ಮ ನಾಗರಿಕ ಮತ್ತು ಕಾನೂನು ಹಕ್ಕುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಕಾರ್ಯನಿರ್ವಹಿಸಿ",
    subtitle: "ಇನ್ಫೋರೈಟ್ AI ಅಧಿಕಾರಿಶಾಹಿ ಸಂಕೀರ್ಣತೆಯನ್ನು ಸ್ಪಷ್ಟವಾದ ಮಾರ್ಗದರ್ಶನವಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ. ಪ್ರಮಾಣೀಕೃತ ಆರ್‌ಟಿಐ ಅರ್ಜಿಗಳನ್ನು ರಚಿಸಲು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ.",
    cta: "ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ (ಏಕೀಕೃತ ಪ್ರವೇಶ)",
  },
  rights: {
    badge: "ಶಾಸನಬದ್ಧ ಹಕ್ಕುಗಳ ಮಾರ್ಗದರ್ಶಿ",
    title: "ನಿಮ್ಮ ನಾಗರಿಕ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿಯಿರಿ ಮತ್ತು ಜಾರಿಗೊಳಿಸಿ",
    subtitle: "ಅಧಿಕೃತ ದೂರು ಮಾರ್ಗಗಳು, ಶಾಸನಬದ್ಧ ನಮೂನೆಗಳು ಮತ್ತು ರಾಜ್ಯ ಪೋರ್ಟಲ್ ಲಿಂಕ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ವಿವಾದದ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    consumerTitle: "ಗ್ರಾಹಕ ವಿವಾದಗಳು",
    consumerDescription: "ದೋಷಪೂರಿತ ಉತ್ಪನ್ನಗಳು, ಕಳಪೆ ಸೇವೆಗಳು, ಬಿಲ್ಲಿಂಗ್ ವಂಚನೆ ಮತ್ತು ನೆರವೇರದ ವಾರಂಟಿಗಳು.",
    consumerEscalation: "ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಹಕ ಸಹಾಯವಾಣಿ (NCH 1915) ಮತ್ತು e-Jagriti ಪೋರ್ಟಲ್",
    consumerButton: "ಗ್ರಾಹಕ ವಿವಾದವನ್ನು ಮಾರ್ಗದರ್ಶಿಸಿ",
    tenantTitle: "ಬಾಡಿಗೆದಾರರ ಹಕ್ಕುಗಳು",
    tenantDescription: "ಅಕ್ರಮ ತೆರವು, ಭದ್ರತಾ ಠೇವಣಿ ತಡೆಹಿಡಿಯುವಿಕೆ, ಬಾಡಿಗೆ ನಿಯಂತ್ರಣ ಮತ್ತು ನಿರ್ವಹಣೆ ವಿವಾದಗಳು.",
    tenantEscalation: "ರಾಜ್ಯ ಬಾಡಿಗೆ ನಿಯಂತ್ರಣ ಪ್ರಾಧಿಕಾರ / ಬಾಡಿಗೆ ನ್ಯಾಯಮಂಡಳಿ",
    tenantButton: "ಬಾಡಿಗೆದಾರರ ವಿವಾದವನ್ನು ಮಾರ್ಗದರ್ಶಿಸಿ",
    workplaceTitle: "ಉದ್ಯೋಗಸ್ಥಳದ ಹಕ್ಕುಗಳು",
    workplaceDescription: "ಪಾವತಿಯಾಗದ ವೇತನಗಳು, ಅಕ್ರಮ ವಜಾಗೊಳಿಸುವಿಕೆ, ಉಪಧನ ತಡೆಹಿಡಿಯುವಿಕೆ ಮತ್ತು ಸುರಕ್ಷತೆ.",
    workplaceEscalation: "ಕಾರ್ಮಿಕ ಆಯುಕ್ತರ ಕಚೇರಿ ಮತ್ತು SAMADHAN 2.0 ಪೋರ್ಟಲ್",
    workplaceButton: "ಉದ್ಯೋಗಸ್ಥಳದ ವಿವಾದವನ್ನು ಮಾರ್ಗದರ್ಶಿಸಿ",
  },
  schemes: {
    badge: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    title: "ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು",
    subtitle: "ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು, ಕಲ್ಯಾಣ ನೆರವು ಮತ್ತು ರಾಜ್ಯ ಸೌಲಭ್ಯಗಳಿಗೆ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
  },
  sources: {
    badge: "ಅಧಿಕೃತ ಕಾನೂನು ಉಗ್ರಾಣ",
    title: "ಪರಿಶೀಲಿಸಿದ ಶಾಸನಬದ್ಧ ಮೂಲಗಳು ಮತ್ತು ನಿಯಮಗಳು",
    subtitle: "ಅಧಿಕೃತ ಕಾಯಿದೆಗಳು, ರಾಜ್ಯ ಆರ್‌ಟಿಐ ನಿಯಮಗಳು ಮತ್ತು ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆಗಳಲ್ಲಿ ಕಾನೂನು ಶಿಫಾರಸುಗಳನ್ನು ಆಧರಿಸಿದೆ.",
  },
  resources: {
    badge: "ಸಾರ್ವಜನಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಮಾದರಿಗಳು",
    title: "ನಾಗರಿಕ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಅರ್ಜಿ ನಮೂನೆಗಳು",
    subtitle: "ಪರಿಶೀಲಿಸಿದ ಶಾಸನಬದ್ಧ ನಮೂನೆಗಳು, ಆರ್‌ಟಿಐ ಮಾದರಿಗಳು ಮತ್ತು ಕಾನೂನು ಮಾರ್ಗದರ್ಶನ ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ.",
  },
  official: {
    badge: "ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗಳ ಇಂಟರ್ಫೇಸ್",
    title: "ಅಧಿಕೃತ ನಿರ್ಧಾರ ಪೋರ್ಟಲ್",
    subtitle: "ಬರುವ ನಾಗರಿಕ ಸಮಾಲೋಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಶಾಸನಬದ್ಧ ಸಮಯದ ಮಿತಿಗಳನ್ನು ಆಡಿಟ್ ಮಾಡಿ ಮತ್ತು ಆರ್‌ಟಿಐ ಅರ್ಜಿಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಿ.",
  },
  dashboard: {
    badge: "ನಾಗರಿಕ ಪ್ರಕರಣಗಳ ಸಂಗ್ರಹ",
    title: "ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಮತ್ತು ಉಳಿಸಿದ ಪ್ರಕರಣಗಳು",
    subtitle: "ಉಳಿಸಿದ ಆರ್‌ಟಿಐ ಅರ್ಜಿಗಳು, ಶಾಸನಬದ್ಧ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಅಧಿಕೃತ ಸಮಾಲೋಚನೆ ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ.",
  },
};

export const TAMIL_UI_TRANSLATIONS: UITranslationDictionary = {
  nav: {
    home: "முகப்பு",
    rtiDrafting: "தகவல் அறியும் உரிமை",
    rightsNavigator: "உரிமைகள் வழிகாட்டி",
    welfareSchemes: "நலத் திட்டங்கள்",
    officialSources: "அதிகாரப்பூர்வ மூலங்கள்",
    describeProblem: "சிக்கலை விவரிக்குக",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
  },
  common: {
    backToHome: "முகப்பிற்குத் திரும்பு",
    statutoryDisputeNav: "சட்டப்பூர்வ தகராறு வழிகாட்டல்",
  },
  home: {
    badge: "குடிமக்கள் மற்றும் சட்ட அதிகாரமளிப்பிற்கான AI — பதிப்பு 2.0",
    title: "உங்கள் குடிமக்கள் மற்றும் சட்ட உரிமைகளைப் புரிந்து செயல்படுங்கள்",
    subtitle: "இன்ஃபோரைட் AI அதிகாரத்துவ சிக்கல்களைத் தெளிவான வழிகாட்டியாக மாற்றுகிறது. உங்கள் சிக்கலை எளிய மொழியில் விவரியுங்கள்.",
    cta: "உங்கள் சிக்கலை விவரியுங்கள் (ஒருங்கிணைந்த பதிவு)",
  },
  rights: {
    badge: "சட்டப்பூர்வ உரிமைகள் வழிகாட்டி",
    title: "உங்கள் குடிமக்கள் உரிமைகளை அறிந்து செயல்படுத்துங்கள்",
    subtitle: "அதிகாரப்பூர்வ மேல்முறையீட்டு வழிகள், சட்டப்பூர்வ படிவங்கள் மற்றும் மாநில போர்ட்டல் இணைப்புகளை அணுக ஒரு தகராறு பிரிவைத் தேர்ந்தெடுக்கவும்.",
    consumerTitle: "நுகர்வோர் தகராறுகள்",
    consumerDescription: "பழுதடைந்த பொருட்கள், மோசமான சேவைகள், பில்லிங் மோசடி மற்றும் நிறைவேற்றப்படாத உத்தரவாதங்கள்.",
    consumerEscalation: "தேசிய நுகர்வோர் உதவி எண் (NCH 1915) மற்றும் e-Jagriti போர்டல்",
    consumerButton: "நுகர்வோர் தகராறை வழிகாட்டுக",
    tenantTitle: "வாடகைதாரர் உரிமைகள்",
    tenantDescription: "சட்டவிரோத வெளியேற்றம், வைப்புத்தொகை பிடிப்பு, வாடகை கட்டுப்பாடு மற்றும் பராமரிப்பு தகராறுகள்.",
    tenantEscalation: "மாநில வாடகை கட்டுப்பாட்டு அதிகாரம் / வாடகை தீர்ப்பாயம்",
    tenantButton: "வாடகைதாரர் தகராறை வழிகாட்டுக",
    workplaceTitle: "பணியிட உரிமைகள்",
    workplaceDescription: "வழங்கப்படாத ஊதியம், சட்டவிரோத பணிநீக்கம், பணிக்கொடை பிடிப்பு மற்றும் பணியிட பாதுகாப்பு.",
    workplaceEscalation: "தொழிலாளர் ஆணையர் அலுவலகம் மற்றும் SAMADHAN 2.0 போர்டல்",
    workplaceButton: "பணியிட தகராறை வழிகாட்டுக",
  },
  schemes: {
    badge: "அரசுத் திட்டங்கள்",
    title: "நலத் திட்டங்கள் & கல்வி உதவித்தொகை",
    subtitle: "கல்வி உதவித்தொகை, நல உதவி மற்றும் மாநில நன்மைகளுக்கான தகுதியைச் சரிபார்க்கவும்.",
  },
  sources: {
    badge: "அதிகாரப்பூர்வ சட்டக் களஞ்சியம்",
    title: "சரிபார்க்கப்பட்ட சட்ட மூலங்கள் மற்றும் விதிகள்",
    subtitle: "சட்டப்பூர்வ பரிந்துரைகளை அதிகாரப்பூர்வ சட்டங்கள் மற்றும் அரசு அறிவிக்கைகளில் அடிப்படையாகக் கொண்டது.",
  },
  resources: {
    badge: "பொது ஆவணங்கள் மற்றும் வார்ப்புருக்கள்",
    title: "குடிமக்கள் வளங்கள் மற்றும் படிவ வார்ப்புருக்கள்",
    subtitle: "சரிபார்க்கப்பட்ட சட்டப்பூர்வ படிவங்கள் மற்றும் தகவல் அறியும் உரிமை ஆவணங்களை அணுகவும்.",
  },
  official: {
    badge: "அரசு அலுவலர் இடைமுகம்",
    title: "அதிகாரப்பூர்வ முடிவு போர்டல்",
    subtitle: "வரவிருக்கும் மனுக்களை மதிப்பாய்வு செய்து முடிவுகளை செயலாக்கவும்.",
  },
  dashboard: {
    badge: "குடிமக்கள் வழக்கு சேமிப்பு",
    title: "எனது டாஷ்போர்டு & சேமிக்கப்பட்ட வழக்குகள்",
    subtitle: "சேமிக்கப்பட்ட மனுக்கள், சட்டப்பூர்வ வழிகாட்டுதல்கள் மற்றும் அதிகாரப்பூர்வ பதிவுகளை அணுகவும்.",
  },
};

export const HINDI_UI_TRANSLATIONS: UITranslationDictionary = {
  nav: {
    home: "मुख्य पृष्ठ",
    rtiDrafting: "आरटीआई ड्राफ्टिंग",
    rightsNavigator: "अधिकार नेविगेटर",
    welfareSchemes: "कल्याणकारी योजनाएं",
    officialSources: "आधिकारिक स्रोत",
    describeProblem: "समस्या का वर्णन करें",
    selectLanguage: "भाषा चुनें",
  },
  common: {
    backToHome: "मुख्य पृष्ठ पर वापस जाएं",
    statutoryDisputeNav: "वैधानिक विवाद मार्गदर्शन",
  },
  home: {
    badge: "नागरिक एवं कानूनी सशक्तिकरण हेतु एआई — संस्करण 2.0",
    title: "अपने नागरिक और कानूनी अधिकारों को समझें और कार्रवाई करें",
    subtitle: "इन्फोराइट एआई नौकरशाही की जटिलता को एक स्पष्ट मार्गदर्शन में बदलता है। अपनी समस्या का सरल भाषा में वर्णन करें।",
    cta: "अपनी समस्या का वर्णन करें (एकीकृत प्रविष्टि)",
  },
  rights: {
    badge: "वैधानिक अधिकार नेविगेटर",
    title: "अपने नागरिक अधिकारों को जानें और लागू करें",
    subtitle: "आधिकारिक शिकायत चैनलों, वैधानिक फार्मों और राज्य पोर्टल लिंक तक पहुंचने के लिए एक विवाद श्रेणी चुनें।",
    consumerTitle: "उपभोक्ता विवाद",
    consumerDescription: "खराब उत्पाद, घटिया सेवाएं, बिलिंग धोखाधड़ी और अपूरित वारंटी।",
    consumerEscalation: "राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH 1915) और e-Jagriti पोर्टल",
    consumerButton: "उपभोक्ता विवाद नेविगेट करें",
    tenantTitle: "किरायेदार के अधिकार",
    tenantDescription: "गैर-कानूनी बेदखली, सुरक्षा जमा राशि रोकना, किराया नियंत्रण और रखरखाव विवाद।",
    tenantEscalation: "राज्य किराया नियंत्रण प्राधिकरण / किराया न्यायाधिकरण",
    tenantButton: "किरायेदार विवाद नेविगेट करें",
    workplaceTitle: "कार्यस्थल के अधिकार",
    workplaceDescription: "अदत्त वेतन, अवैध बर्खास्तगी, ग्रेच्युटी रोकना और कार्यस्थल सुरक्षा।",
    workplaceEscalation: "श्रम आयुक्त कार्यालय और SAMADHAN 2.0 पोर्टल",
    workplaceButton: "कार्यस्थल विवाद नेविगेट करें",
  },
  schemes: {
    badge: "सरकारी योजनाएं",
    title: "कल्याणकारी योजनाएं और छात्रवृत्तियां",
    subtitle: "मैट्रिकोत्तर छात्रवृत्ति, कल्याण सहायता और राज्य लाभों के लिए पात्रता की जांच करें।",
  },
  sources: {
    badge: "आधिकारिक कानूनी रिपॉजिटरी",
    title: "सत्यापित वैधानिक स्रोत और नियम",
    subtitle: "आधिकारिक अधिनियमों, राज्य आरटीआई नियमों और राजपत्र अधिसूचनाओं में कानूनी सिफारिशों को आधारित करना।",
  },
  resources: {
    badge: "सार्वजनिक दस्तावेज और टेम्पलेट",
    title: "नागरिक संसाधन और फॉर्म टेम्पलेट",
    subtitle: "सत्यापित वैधानिक फॉर्मों, आरटीआई टेम्पलेट्स और कानूनी मार्गदर्शन दस्तावेजों तक पहुंचें।",
  },
  official: {
    badge: "सरकारी अधिकारी इंटरफेस",
    title: "आधिकारिक निर्णय पोर्टल",
    subtitle: "आने वाले नागरिक परामर्शों की समीक्षा करें और आरटीआई आवेदनों को संसाधित करें।",
  },
  dashboard: {
    badge: "नागरिक केस स्टोर",
    title: "मेरा डैशबोर्ड और सहेजे गए मामले",
    subtitle: "सहेजे गए आरटीआई आवेदनों, वैधानिक मार्गदर्शन और आधिकारिक परामर्श रिकॉर्ड तक पहुंचें।",
  },
};

export const UI_TRANSLATIONS_MAP: Record<BharatLanguageCode, UITranslationDictionary> = {
  "en-IN": ENGLISH_UI_TRANSLATIONS,
  "kn-IN": KANNADA_UI_TRANSLATIONS,
  "ta-IN": TAMIL_UI_TRANSLATIONS,
  "hi-IN": HINDI_UI_TRANSLATIONS,
  "te-IN": ENGLISH_UI_TRANSLATIONS,
  "ml-IN": ENGLISH_UI_TRANSLATIONS,
  "mr-IN": ENGLISH_UI_TRANSLATIONS,
  "bn-IN": ENGLISH_UI_TRANSLATIONS,
  "gu-IN": ENGLISH_UI_TRANSLATIONS,
  "pa-IN": ENGLISH_UI_TRANSLATIONS,
  "od-IN": ENGLISH_UI_TRANSLATIONS,
  "as-IN": ENGLISH_UI_TRANSLATIONS,
  "brx-IN": ENGLISH_UI_TRANSLATIONS,
  "doi-IN": ENGLISH_UI_TRANSLATIONS,
  "ks-IN": ENGLISH_UI_TRANSLATIONS,
  "kok-IN": ENGLISH_UI_TRANSLATIONS,
  "mai-IN": ENGLISH_UI_TRANSLATIONS,
  "mni-IN": ENGLISH_UI_TRANSLATIONS,
  "ne-IN": ENGLISH_UI_TRANSLATIONS,
  "sa-IN": ENGLISH_UI_TRANSLATIONS,
  "sat-IN": ENGLISH_UI_TRANSLATIONS,
  "sd-IN": ENGLISH_UI_TRANSLATIONS,
  "ur-IN": ENGLISH_UI_TRANSLATIONS,
};

export function getUITranslations(code: BharatLanguageCode): UITranslationDictionary {
  return UI_TRANSLATIONS_MAP[code] || ENGLISH_UI_TRANSLATIONS;
}
