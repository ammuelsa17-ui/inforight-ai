import fs from "fs";
import path from "path";

const localesDir = path.join(process.cwd(), "src/i18n/locales");

const TELUGU_CLOSED_LOOP = {
  evidence: {
    addPhotoTitle: "ఫోటో సాక్ష్యాన్ని జత చేయండి (మరమ్మతుకు ముందు)",
    takePhotoBtn: "ఫోటో తీయండి",
    uploadPhotoBtn: "ఫైల్‌ను అప్‌లోడ్ చేయండి",
    descriptionLabel: "సాక్ష్యం వివరణ",
    descriptionPlaceholder: "కనిపించే లోపాన్ని వివరించండి (ఉదా. రోడ్డుపై లోతైన గుంత)...",
    geoTagHeading: "పరికరం స్థానం మరియు GPS మెటాడేటా",
    addLocationBtn: "GPS స్థానాన్ని నమోదు చేయండి",
    confirmEvidenceBtn: "కేసుకు సాక్ష్యాన్ని జత చేయండి",
    organizerTitle: "బ్రౌజర్ సాక్ష్యాల నిర్వాహకుడు",
    organizerSubtitle: "ఫోటోలు, రసీదులు మరియు నోటీసులను మీ బ్రౌజర్ మెమరీలో స్థానికంగా జత చేయండి",
    privacyNotice: "మీరు సమర్పించే వరకు ఫైల్‌లు మీ బ్రౌజర్‌లోనే సురక్షితంగా ఉంటాయి.",
    categoryLabel: "సాక్ష్యం వర్గం",
    selectFileLabel: "స్థానిక ఫైల్‌ను ఎంచుకోండి (గరిష్టంగా 5MB)",
    emptyText: "ఇంకా ఎటువంటి సాక్ష్యాల ఫైల్‌లు జత చేయబడలేదు. ఫోటోలు లేదా రసీదులను జోడించడానికి పై ఫైల్‌ను ఎంచుకోండి.",
    scorecardTitle: "సాక్ష్యాల సంపూర్ణత స్కోర్‌కార్డ్",
    scorecardSubtitle: "సహాయక వాస్తవాలు మరియు సాక్ష్యాల సంపూర్ణతను కొలుస్తుంది",
    catPhoto: "ఛాయాచిత్రం / సైట్ పరిస్థితి",
    catAck: "ఫిర్యాదు రసీదు / పావతి",
    catGovLetter: "ప్రభుత్వ లేఖ / ఉత్తర్వు",
    catReceipt: "రసీదు / పన్ను ఇన్‌వాయిస్",
    catNotice: "చట్టపరమైన నోటీసు",
    catSupportDoc: "సహాయక పత్రం",
    catOther: "ఇతర పత్రం",
    previewFileTitle: "ఫైల్‌ను వీక్షించండి",
    removeFileTitle: "ఫైల్‌ను తొలగించండి"
  },
  appeal: {
    title: "సెక్షన్ 19(1) మొదటి అప్పీల్ జనరేటర్",
    subtitle: "PIO గడువు ముగిసినప్పుడు మొదటి అప్పీలేట్ అథారిటీకి అధికారిక అప్పీల్ ముసాయిదాను రూపొందిస్తుంది",
    refLabel: "అసలు RTI ఫైల్ / రసీదు సంఖ్య",
    statusLabel: "PIO ప్రతిస్పందన స్థితి",
    groundsLabel: "మొదటి అప్పీల్‌కు గల కారణాలు",
    statusNoResponse: "ఎటువంటి స్పందన రాలేదు (తిరస్కరించినట్లుగా భావించబడుతుంది)",
    statusRefused: "సమాచారం నిరాకరించబడింది / తిరస్కరించబడింది",
    statusIncomplete: "అసంపూర్ణ / తప్పుదారి పట్టించే సమాచారం",
    draftNotice: "దాఖలు చేయడానికి ముందు పౌరుడి సమీక్ష కోసం ముసాయిదా రూపొందించబడింది.",
    clientSideNotice: "బ్రౌజర్‌లో రూపొందించిన ముసాయిదా",
    printPdf: "ముద్రించండి / PDF సేవ్ చేయండి"
  },
  feeCalc: {
    title: "చట్టబద్ధమైన RTI రుసుము మరియు చెల్లింపు కాలిక్యులేటర్",
    subtitle: "RTI నిబంధనలు 2012 మరియు రాష్ట్ర నియమాల ఆధారంగా రుసుము నిర్మాణం",
    authLabel: "లక్ష్య ప్రజా అధికారం",
    jurisdictionLabel: "రాష్ట్ర / కేంద్రపాలిత ప్రాంత పరిధి",
    bplLabel: "దారిద్య్రరేఖకు దిగువన ఉన్న (BPL) దరఖాస్తుదారునికి మినహాయింపు",
    feeLabel: "చట్టబద్ధమైన దరఖాస్తు రుసుము:",
    permittedInstruments: "అనుమతించబడిన చెల్లింపు మార్గాలు:",
    officialRegistry: "అధికారిక రిజిస్ట్రీ",
    authCentral: "కేంద్ర ప్రజా అధికారం (DoPT / కేంద్ర ప్రభుత్వం)",
    authCCMC: "కోయంబత్తూరు మున్సిపల్ కార్పొరేషన్ (రాష్ట్ర ప్రభుత్వం)",
    authStateRevenue: "రాష్ట్ర రెవెన్యూ పరిపాలన (తమిళనాడు)"
  },
  timelineEngine: {
    title: "చట్టబద్ధమైన RTI కాలపరిమితి మరియు గడువు ఇంజిన్",
    subtitle: "RTI చట్టం 2005 లోని సెక్షన్లు 6(3), 7(1), మరియు 19(1) కింద క్యాలెండర్ తేదీలను లెక్కిస్తుంది",
    filingDateLabel: "దరఖాస్తు దాఖలు చేసిన తేదీ",
    scenarioLabel: "అప్పీల్ పరిస్థితి",
    scenNoResponse: "పరిస్థితి A: ఎటువంటి సమాధానం రాలేదు",
    scenDecision: "పరిస్థితి B: నిర్ణయం / తిరస్కరణ అందింది",
    receiptDateLabel: "నిర్ణయం అందిన తేదీ",
    lifeLibertyLabel: "జీవితం మరియు స్వేచ్ఛకు సంబంధించిన అంశం (48-గంటల స్పందన)"
  },
  checksum: {
    title: "పత్రం సమగ్రత చెక్‌సమ్ (SHA-256)",
    subtitle: "సమగ్రత చెక్‌సమ్ — రూపకల్పన తర్వాత ఈ పత్రం మార్చబడిందో లేదో గుర్తించడంలో సహాయపడుతుంది.",
    copyAria: "క్లిప్‌బోర్డ్‌కు SHA-256 హాష్‌ను కాపీ చేయండి"
  },
  trustPanel: {
    title: "భద్రత మరియు విశ్వసనీయత ప్యానెల్",
    subtitle: "నిజ-సమయ ధృవీకరణ కొలమానాలు మరియు గోప్యతా హామీలు",
    authLabel: "ప్రాధికార సంస్థ:",
    domainLabel: "డొమైన్:",
    supportsLabel: "మద్దతు ఇచ్చేవి:"
  },
  fallbackBanner: {
    title: "ఫాల్‌బ్యాక్ టెంప్లేట్ సక్రియం చేయబడింది",
    noticeTitle: "అధికార ధృవీకరణ నోటీసు",
    noticeBody: "నమోదు చేసిన ప్రజా అధికారం మా రిజిస్ట్రీలో స్వతంత్రంగా ధృవీకరించబడలేదు. దయచేసి సమర్పించే ముందు వివరాలను నిర్ధారించుకోండి."
  },
  sidebar: {
    privacyTitle: "గోప్యతా రక్షణ",
    privacyBody: "మీ వ్యక్తిగత వివరాలు ఈ బ్రౌజర్‌లోనే ఉంటాయి మరియు AI సేవలతో భాగస్వామ్యం చేయబడవు."
  },
  tracker: {
    title: "చట్టబద్ధమైన సమర్పణ మరియు స్థితి ట్రాకర్",
    stepDraft: "1. ముసాయిదా సిద్ధమైంది",
    stepSubmit: "2. పౌరుడి సమర్పణ",
    stepDeadline: "3. చట్టబద్ధమైన గడువు",
    stepEscalation: "4. అప్పీల్ / తదుపరి చర్య",
    recordDispatch: "అధికారిక దాఖలు / పోస్టల్ వివరాలను నమోదు చేయండి:",
    dispatchDateLabel: "దాఖలు చేసిన తేదీ *",
    methodLabel: "విధానం *",
    speedPost: "స్పీడ్ పోస్ట్ / రిజిస్టర్డ్ పోస్ట్ (పోస్ట్ ఆఫీస్)",
    onlinePortal: "ఆన్‌లైన్ పోర్టల్ / RTI ఆన్‌లైన్",
    physicalCounter: "ప్రత్యక్ష కార్యాలయ కౌంటర్",
    ackNoLabel: "ట్రాకింగ్ / రసీదు సంఖ్య (ఐచ్ఛికం)",
    ackPlaceholder: "ఉదాహరణ: EM987654321IN",
    btnSaveCountdown: "సేవ్ చేసి కౌంట్‌డౌన్ ప్రారంభించండి",
    submittedOn: "సమర్పించిన తేదీ:",
    viaLabel: "ద్వారా",
    refNoLabel: "రిఫరెన్స్ / ట్రాకింగ్ సంఖ్య:",
    btnEditRecord: "రికార్డును సవరించండి",
    btnFirstAppeal: "మొదటి అప్పీల్ రూపొందించండి"
  },
  trust: {
    whyTitle: "ఇన్ఫోరైట్ ఈ నిర్ణయం ఎందుకు తీసుకుంది:",
    unresolvedFacts: "పరిష్కారం కాని పరిధి / వాస్తవాలు:",
    rulesEvaluated: "విశ్లేషించబడిన చట్టపరమైన నిబంధనలు:",
    officialSourceRecords: "అధికారిక మూల రికార్డులు:",
    showSources: "ధృవీకరించబడిన చట్టపరమైన మూలాలను చూపించు",
    hideSources: "చట్టపరమైన మూలాలను దాచు"
  },
  explainer: {
    whatItMeans: "దీని అర్థం ఏమిటి:",
    whatNext: "తదుపరి మీరు ఏమి చేయాలి:"
  },
  planner: {
    tabPlanner: "సమగ్ర కార్యాచరణ ప్రణాళిక (అన్ని హక్కులు)",
    tabGuided: "5-దశల మార్గదర్శక పౌర ఫారమ్ (RTI)",
    legalDistinction: "చట్టపరమైన పరిధి వ్యత్యాసం:",
    verifiedAuthTitle: "ధృవీకరించబడిన సమర్థ అధికారం:",
    printPdf: "ముద్రించండి / PDF గా సేవ్ చేయండి",
    toLabel: "స్వీకర్త:",
    subjectLabel: "విషయం:",
    factsLabel: "వాస్తవాల ప్రకటన:",
    statutoryBasisLabel: "చట్టబద్ధమైన ఆధారం:",
    reliefLabel: "కోరిన పరిష్కారం:"
  }
};

const ASSAMESE_CLOSED_LOOP = {
  evidence: {
    addPhotoTitle: "ফটো প্ৰমাণ সংলগ্ন কৰক (মেৰামতিৰ পূৰ্বে)",
    takePhotoBtn: "ফটো তোলক",
    uploadPhotoBtn: "ফাইল আপলোড কৰক",
    descriptionLabel: "প্ৰমাণৰ বিৱৰণ",
    descriptionPlaceholder: "দেখা পোৱা সমস্যাটো উল্লেখ কৰক (যেনে পথৰ গভীৰ গাঁত)...",
    geoTagHeading: "ডিভাইচৰ অৱস্থান আৰু GPS মেটাডাটা",
    addLocationBtn: "GPS স্থান সংগ্ৰহ কৰক",
    confirmEvidenceBtn: "গোচৰত প্ৰমাণ সংলগ্ন কৰক",
    organizerTitle: "ক্লায়েণ্ট-পক্ষৰ প্ৰমাণ সংগঠক",
    organizerSubtitle: "সহায়ক ফটো, ৰচিদ আৰু জাননী স্থানীয়ভাৱে ব্ৰাউজাৰ মেমৰীত সংলগ্ন কৰক",
    privacyNotice: "আপুনি স্পষ্টভাৱে দাখিল নকৰালৈকে ফাইলসমূহ ব্ৰাউজাৰতে থাকে।",
    categoryLabel: "প্ৰমাণৰ শ্ৰেণী",
    selectFileLabel: "স্থানীয় ফাইল বাছক (সৰ্বাধিক 5MB)",
    emptyText: "এতিয়ালৈকে কোনো প্ৰমাণ সংলগ্ন কৰা হোৱা নাই। ফটো বা ৰচিদ যোগ কৰিবলৈ ওপৰত ফাইল বাছক।",
    scorecardTitle: "প্ৰমাণৰ সম্পূৰ্ণতা স্ক’ৰকাৰ্ড",
    scorecardSubtitle: "তথ্য আৰু প্ৰমাণৰ সম্পূৰ্ণতা পৰিমাপ কৰে",
    catPhoto: "ফটোগ্ৰাফ / স্থানৰ স্থিতি",
    catAck: "অভিযোগৰ স্বীকৃতি পত্ৰ",
    catGovLetter: "চৰকাৰী পত্ৰ / আদেশ",
    catReceipt: "ৰচিদ / টেক্স ইনভয়েচ",
    catNotice: "আইনী জাননী",
    catSupportDoc: "সহায়ক নথি",
    catOther: "অন্যান্য নথি",
    previewFileTitle: "ফাইল প্ৰদৰ্শন কৰক",
    removeFileTitle: "ফাইল মচক"
  },
  appeal: {
    title: "ধাৰা ১৯(১) প্ৰথম আপীল জেনেৰেটৰ",
    subtitle: "PIO সময়সীমা উকলি যোৱাৰ পিছত প্ৰথম আপীল কৰ্তৃপক্ষৰ বাবে আনুষ্ঠানিক আবেদন প্ৰস্তুত কৰে",
    refLabel: "মূল RTI ফাইল / স্বীকৃতি নম্বৰ",
    statusLabel: "PIO প্ৰত্যুত্তৰ স্থিতি",
    groundsLabel: "প্ৰথম আপীলৰ ভিত্তি",
    statusNoResponse: "কোনো উত্তৰ পোৱা নগ’ল (প্ৰত্যাখ্যান বুলি গণ্য)",
    statusRefused: "তথ্য প্ৰদান কৰিবলৈ অস্বীকাৰ কৰা হ’ল",
    statusIncomplete: "অসম্পূৰ্ণ / বিভ্ৰান্তিকৰ তথ্য",
    draftNotice: "দাখিল কৰাৰ পূৰ্বে নাগৰিকৰ পৰ্যালোচনাৰ বাবে খচৰা প্ৰস্তুত কৰা হৈছে।",
    clientSideNotice: "ব্ৰাউজাৰ-ভিত্তিক খচৰা প্ৰস্তুতি",
    printPdf: "প্ৰিণ্ট / PDF সংৰক্ষণ কৰক"
  },
  feeCalc: {
    title: "আইনী RTI মাচুল আৰু পৰিশোধ কেলকুলেটৰ",
    subtitle: "RTI নিয়ম ২০১২ আৰু ৰাজ্যিক নিয়মৰ ওপৰত ভিত্তি কৰি মাচুল নিৰ্ধাৰণ",
    authLabel: "লক্ষ্য ৰাজহুৱা কৰ্তৃপক্ষ",
    jurisdictionLabel: "ৰাজ্য / কেন্দ্ৰীয় শাসিত অঞ্চল",
    bplLabel: "দ্ৰিদ্ৰসীমাৰ তলৰ (BPL) আবেদনকাৰীৰ ৰেহাই",
    feeLabel: "আইনী আবেদন মাচুল:",
    permittedInstruments: "অনুমোদিত পৰিশোধ মাধ্যম:",
    officialRegistry: "চৰকাৰী পঞ্জী",
    authCentral: "কেন্দ্ৰীয় কৰ্তৃপক্ষ (DoPT / কেন্দ্ৰীয় চৰকাৰ)",
    authCCMC: "কয়ম্বাটুৰ পৌৰ নিগম (ৰাজ্য চৰকাৰ)",
    authStateRevenue: "ৰাজ্যিক ৰাজহ প্ৰশাসন (তামিলনাডু)"
  },
  timelineEngine: {
    title: "আইনী RTI সময়সীমা আৰু কেলেণ্ডাৰ ইঞ্জিন",
    subtitle: "RTI আইন ২০০৫ ৰ ধাৰা ৬(৩), ৭(১) আৰু ১৯(১) অধীনত দিন গণনা কৰে",
    filingDateLabel: "আবেদন দাখিল কৰা তাৰিখ",
    scenarioLabel: "আপীল পৰিস্থিতি",
    scenNoResponse: "পৰিস্থিতি A: কোনো উত্তৰ পোৱা নগ’ল",
    scenDecision: "পৰিস্থিতি B: সিদ্ধান্ত / প্ৰত্যাখ্যান পোৱা গ’ল",
    receiptDateLabel: "সিদ্ধান্ত পোৱা তাৰিখ",
    lifeLibertyLabel: "জীৱন আৰু স্বাধীনতা সম্পৰ্কীয় বিষয় (৪৮ ঘণ্টাৰ উত্তৰ)"
  },
  checksum: {
    title: "নথি সত্যতা পৰীক্ষক (SHA-256)",
    subtitle: "সত্যতা পৰীক্ষক — প্ৰস্তুত হোৱাৰ পিছত এই খচৰা সলনি কৰা হৈছে নে নাই নিৰ্ণয় কৰে।",
    copyAria: "SHA-256 ক’ড ক্লিপবৰ্ডত কপি কৰক"
  },
  trustPanel: {
    title: "সুৰক্ষা আৰু বিশ্বাস পেনেল",
    subtitle: "প্ৰকৃত সময়ৰ পৰীক্ষণ মেট্ৰিক্স আৰু গোপনীয়তা নিশ্চয়তা",
    authLabel: "কৰ্তৃপক্ষ:",
    domainLabel: "ডমেইন:",
    supportsLabel: "সমৰ্থন কৰে:"
  },
  fallbackBanner: {
    title: "ফলবেক টেমপ্লেট সক্ৰিয় কৰা হৈছে",
    noticeTitle: "কৰ্তৃপক্ষ পৰীক্ষণ জাননী",
    noticeBody: "প্ৰবিষ্ট কৰা চৰকাৰী কৰ্তৃপক্ষ আমাৰ পঞ্জীত স্বতন্ত্ৰভাৱে প্ৰমাণিত হোৱা নাই। দাখিল কৰাৰ পূৰ্বে তথ্যসমূহ পৰীক্ষা কৰক।"
  },
  sidebar: {
    privacyTitle: "গোপনীয়তা সুৰক্ষা",
    privacyBody: "আপোনাৰ ব্যক্তিগত তথ্য এই ব্ৰাউজাৰতে থাকে আৰু AI লৈ প্ৰেৰণ কৰা নহয়।"
  },
  tracker: {
    title: "আইনী দাখিল আৰু গোচৰ নিৰীক্ষক",
    stepDraft: "১. খচৰা প্ৰস্তুত",
    stepSubmit: "২. নাগৰিকৰ দাখিল",
    stepDeadline: "৩. আইনী সময়সীমা",
    stepEscalation: "৪. আপীল / পদক্ষেপ",
    recordDispatch: "চৰকাৰী দাখিল / ডাকৰ বিৱৰণ লিপিবদ্ধ কৰক:",
    dispatchDateLabel: "দাখিল কৰা তাৰিখ *",
    methodLabel: "মাধ্যম *",
    speedPost: "স্পীড পোষ্ট / পঞ্জীভুক্ত ডাক (ডাকঘৰ)",
    onlinePortal: "অনলাইন পৰ্টেল / RTI অনলাইন",
    physicalCounter: "কাৰ্যালয়ৰ প্ৰত্যক্ষ কাউণ্টাৰ",
    ackNoLabel: "ট্ৰেকিং / স্বীকৃতি নম্বৰ (ঐচ্ছিক)",
    ackPlaceholder: "যেনে: EM987654321IN",
    btnSaveCountdown: "সংৰক্ষণ কৰি সময় গণনা আৰম্ভ কৰক",
    submittedOn: "দাখিল কৰা তাৰিখ:",
    viaLabel: "জৰিয়তে",
    refNoLabel: "ট্ৰেকিং / স্বীকৃতি নম্বৰ:",
    btnEditRecord: "তথ্য সম্পাদনা কৰক",
    btnFirstAppeal: "প্ৰথম আপীল প্ৰস্তুত কৰক"
  },
  trust: {
    whyTitle: "InfoRight য়ে এই সিদ্ধান্ত কিয় ল’লে:",
    unresolvedFacts: "অমীমাংসিত অধিকাৰক্ষেত্ৰ / তথ্য:",
    rulesEvaluated: "মূল্যায়ন কৰা আইনী নিয়ম:",
    officialSourceRecords: "চৰকাৰী উৎসৰ নথি:",
    showSources: "প্ৰমাণিত আইনী উৎস চাওক",
    hideSources: "আইনী উৎস লুকুৱাওক"
  },
  explainer: {
    whatItMeans: "ইয়াৰ অৰ্থ কি:",
    whatNext: "ইয়াৰ পিছত আপুনি কি কৰা উচিত:"
  },
  planner: {
    tabPlanner: "একত্ৰিত কাৰ্য পৰিকল্পক (সকলো অধিকাৰ)",
    tabGuided: "৫-পদক্ষেপৰ নিৰ্দেশিত প্ৰপত্ৰ (RTI)",
    legalDistinction: "আইনী পৰিসৰ পাৰ্থক্য:",
    verifiedAuthTitle: "প্ৰমাণিত উপযুক্ত কৰ্তৃপক্ষ:",
    printPdf: "প্ৰিণ্ট / PDF হিচাপে সংৰক্ষণ কৰক",
    toLabel: "প্ৰাপক:",
    subjectLabel: "বিষয়:",
    factsLabel: "ঘটনাৰ বিৱৰণ:",
    statutoryBasisLabel: "আইনী ভিত্তি:",
    reliefLabel: "দাবী কৰা প্ৰতিকাৰ:"
  }
};

function updateBundle(lang: string, closedLoopData: Record<string, Record<string, string>>) {
  const p = path.join(localesDir, `${lang}.ts`);
  let content = fs.readFileSync(p, "utf8");

  for (const [section, map] of Object.entries(closedLoopData)) {
    for (const [k, v] of Object.entries(map)) {
      // Look for `"k": "..."` inside `section: { ... }`
      const secIdx = content.indexOf(`"${section}": {`);
      const secIdxAlt = content.indexOf(`  ${section}: {`);
      const targetSecIdx = secIdx !== -1 ? secIdx : secIdxAlt;

      if (targetSecIdx !== -1) {
        const secEnd = content.indexOf("}", targetSecIdx);
        const secSub = content.substring(targetSecIdx, secEnd);
        const regex = new RegExp(`("${k}":\\s*")[^"]*(")`);
        if (regex.test(secSub)) {
          const updatedSecSub = secSub.replace(regex, `$1${v}$2`);
          content = content.substring(0, targetSecIdx) + updatedSecSub + content.substring(secEnd);
        }
      }
    }
  }

  fs.writeFileSync(p, content, "utf8");
  console.log(`Updated closed loop sections in ${lang}.ts`);
}

updateBundle("te", TELUGU_CLOSED_LOOP);
updateBundle("as", ASSAMESE_CLOSED_LOOP);
