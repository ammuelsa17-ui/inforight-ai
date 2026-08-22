import fs from "fs";
import path from "path";

const localesDir = path.join(process.cwd(), "src/i18n/locales");

// Complete curated translations for Core Citizen Journey
const LOCALIZATIONS: Record<string, { common: Record<string, string>; ask: Record<string, string>; home: Record<string, string> }> = {
  te: {
    common: {
      submit: "సమర్పించు",
      cancel: "రద్దు చేయి",
      loading: "లోడ్ అవుతోంది...",
      save: "భద్రపరచు",
      edit: "సవరించు",
      delete: "తొలగించు",
      copied: "కాపీ చేయబడింది!",
      copy: "కాపీ చేయి",
      downloadPdf: "PDF డౌన్‌లోడ్ చేయండి",
      print: "పత్రం ముద్రించండి",
      language: "భాష",
      status: "స్థితి",
      action: "చర్య",
      search: "శోధించండి",
      filter: "వడపోత",
      close: "మూసివేయి",
      statutoryDisputeNav: "చట్టబద్ధమైన వివాద మార్గదర్శకత్వం",
      learnMore: "మరింత తెలుసుకోండి",
      viewDetails: "వివరాలను వీక్షించండి",
      legalDisclaimerTitle: "సమాచార మరియు విద్యా నిరాకరణ",
      legalDisclaimerBody: "ఇన్ఫోరైట్ AI పౌర సాధికారత కోసం చట్టబద్ధమైన మార్గదర్శకత్వాన్ని అందిస్తుంది.",
      backToHome: "హోమ్‌కు తిరిగి వెళ్ళు"
    },
    ask: {
      statusVerified: "ధృవీకరించబడింది",
      statusSuggested: "సూచించబడింది",
      statusCitizenConfirmed: "పౌరుడు ధృవీకరించినది",
      statusVerificationRequired: "ధృవీకరణ అవసరం",
      streetLayer: "వీధి మ్యాప్",
      satelliteLayer: "ఉపగ్రహ చిత్రాలు",
      adminDetailsToggle: "పరిపాలనా సోపానక్రమ వివరాలు",
      multipleLocalitiesNotice: "ఈ పిన్ కోడ్ కోసం బహుళ ప్రాంతాలు కనుగొనబడ్డాయి",
      selectLocalityPrompt: "ప్రాంతం / పోస్ట్ ఆఫీస్‌ను ఎంచుకోండి",
      pageTitle: "మీ సమస్యను వివరించండి",
      pageSubtitle: "ఏమి జరిగిందో మాకు చెప్పండి. ఇన్ఫోరైట్ ధృవీకరించబడిన మూలాల ఆధారంగా సంబంధిత పౌర లేదా చట్టపరమైన మార్గాన్ని గుర్తిస్తుంది.",
      useCurrentLocation: "నా ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
      btnStartVoice: "మీ భాషలో మాట్లాడండి",
      btnStopRecording: "ఆపివేయండి",
      pinCodeLabel: "పిన్ కోడ్",
      stateUtLabel: "రాష్ట్రం / కేంద్రపాలిత ప్రాంతం",
      postalSourcePrefix: "తపాలా మూలం",
      adminGroundingPrefix: "పరిపాలనా ప్రాతిపదిక",
      talukLabel: "సబ్-డిస్ట్రిక్ట్ / తాలూకా / మండలం",
      blockLabel: "అభివృద్ధి బ్లాక్",
      villageLabel: "గ్రామం / ప్రాంతం",
      pinNotMappedLabel: "పిన్ మ్యాప్‌లో లేదు — GPS ఉపయోగించండి లేదా మాన్యువల్‌గా ఎంచుకోండి",
      confirmLocationTitle: "సమస్య స్థానాన్ని నిర్ధారించండి (ఐచ్ఛిక మ్యాప్ సందర్భం)",
      deviceGpsLabel: "పరికరం నివేదించిన స్థానం (GPS)",
      citizenConfirmedLabel: "పౌరుడు నిర్ధారించిన మ్యాప్ పాయింట్",
      approximatePinLabel: "తపాలా పిన్ నుండి సుమారు ప్రాంతం",
      describeProblemRequired: "కొనసాగడానికి ముందు దయచేసి మీ సమస్యను వివరించండి.",
      translationUnavailable: "అనువాద సేవ ప్రస్తుతం అందుబాటులో లేదు. ప్రామాణిక వచనాన్ని చూపుతోంది.",
      voiceTranscriptLabel: "వాయిస్ ట్రాన్స్క్రిప్ట్",
      btnUseTranscript: "ఈ ట్రాన్స్క్రిప్ట్ ఉపయోగించండి",
      problemUnderstoodTitle: "సమస్య అర్థమైంది",
      problemDescLabel: "సమస్య వివరణ",
      applicantDetailsTitle: "దరఖాస్తుదారు స్థాన సందర్భం",
      stateLabel: "రాష్ట్రం / కేంద్రపాలిత ప్రాంతం",
      districtLabel: "జిల్లా",
      localBodyLabel: "ప్రజా అధికారం / స్థానిక సంస్థ",
      localityLabel: "ప్రాంతం / గ్రామం",
      wardLabel: "వార్డు సంఖ్య (ఐచ్ఛికం)",
      generateBtn: "RTI దరఖాస్తు మరియు చట్టపరమైన మార్గదర్శకత్వాన్ని రూపొందించండి",
      generating: "చట్టబద్ధమైన నియమాలను విశ్లేషించి దరఖాస్తును రూపొందిస్తోంది..."
    },
    home: {
      title: "మీ పౌర మరియు చట్టపరమైన హక్కులను అర్థం చేసుకోండి మరియు వ్యవహరించండి",
      subtitle: "ఇన్ఫోరైట్ AI సంక్లిష్టమైన చట్టపరమైన సమాచారాన్ని స్పష్టమైన, మూల-ఆధారిత చర్యలుగా మారుస్తుంది.",
      cta: "మీ సమస్యను వివరించండి (ప్రవేశ ద్వారం)"
    }
  },
  ur: {
    common: {
      submit: "جمع کریں",
      cancel: "منسوخ کریں",
      loading: "لوڈ ہو رہا ہے...",
      save: "محفوظ کریں",
      edit: "ترمیم کریں",
      delete: "حذف کریں",
      copied: "کاپی ہو گیا!",
      copy: "کاپی کریں",
      downloadPdf: "پی ڈی ایف ڈاؤن لوڈ کریں",
      print: "دستاویز پرنٹ کریں",
      language: "زبان",
      status: "حیثیت",
      action: "کارروائی",
      search: "تلاش کریں",
      filter: "فلٹر",
      close: "بند کریں",
      statutoryDisputeNav: "قانونی تنازعات کی رہنمائی",
      learnMore: "مزید جانیں",
      viewDetails: "تفصیلات دیکھیں",
      legalDisclaimerTitle: "معلوماتی اور تعلیمی دستبرداری",
      legalDisclaimerBody: "انفورائٹ AI شہری بااختیاری کے لیے قانونی رہنمائی فراہم کرتا ہے۔",
      backToHome: "ہوم پر واپس جائیں"
    },
    ask: {
      statusVerified: "تصدیق شدہ",
      statusSuggested: "تجویز کردہ",
      statusCitizenConfirmed: "شہری کی تصدیق شدہ",
      statusVerificationRequired: "تصدیق درکار ہے",
      streetLayer: "اسٹریٹ میپ",
      satelliteLayer: "سیٹلائٹ تصاویر",
      adminDetailsToggle: "انتظامی درجہ بندی کی تفصیلات",
      multipleLocalitiesNotice: "اس پن کوڈ کے لیے متعدد علاقے ملے ہیں",
      selectLocalityPrompt: "علاقہ / پوسٹ آفس منتخب کریں",
      pageTitle: "اپنا مسئلہ بیان کریں",
      pageSubtitle: "ہمیں بتائیں کہ کیا ہوا۔ انفورائٹ مصدقہ ذرائع کی بنیاد پر متعلقہ شہری یا قانونی راستہ تجویز کرے گا۔",
      useCurrentLocation: "میرا موجودہ مقام استعمال کریں",
      btnStartVoice: "اپنی زبان میں بولیں",
      btnStopRecording: "روکیں",
      pinCodeLabel: "پن کوڈ",
      stateUtLabel: "ریاست / مرکز کے زیر انتظام علاقہ",
      postalSourcePrefix: "پوسٹل ذریعہ",
      adminGroundingPrefix: "انتظامی بنیاد",
      talukLabel: "تحصیل / تعلقہ",
      blockLabel: "ترقیاتی بلاک",
      villageLabel: "گاؤں / علاقہ",
      pinNotMappedLabel: "پن نقشے پر نہیں ہے — GPS استعمال کریں یا دستی طور پر منتخب کریں",
      confirmLocationTitle: "مسئلے کے مقام کی تصدیق کریں (اختیاری نقشہ)",
      deviceGpsLabel: "ڈیوائس کا رپورٹ کردہ مقام (GPS)",
      citizenConfirmedLabel: "شہری کا تصدیق شدہ مقام",
      approximatePinLabel: "پوسٹل پن سے تخمینی علاقہ",
      describeProblemRequired: "آگے بڑھنے سے پہلے براہ کرم اپنا مسئلہ بیان کریں۔",
      translationUnavailable: "ترجمہ سروس فی الحال دستیاب نہیں ہے۔ اصل متن دکھایا جا رہا ہے۔",
      voiceTranscriptLabel: "صوتی متن",
      btnUseTranscript: "یہ متن استعمال کریں",
      problemUnderstoodTitle: "مسئلہ سمجھ آگیا",
      problemDescLabel: "مسئلے کی تفصیل",
      applicantDetailsTitle: "درخواست گزار کے مقام کی تفصیل",
      stateLabel: "ریاست / مرکزی علاقہ",
      districtLabel: "ضلع",
      localBodyLabel: "سرکاری ادارہ / مقامی باڈی",
      localityLabel: "علاقہ / گاؤں",
      wardLabel: "وارڈ نمبر (اختیاری)",
      generateBtn: "RTI درخواست اور قانونی رہنمائی تیار کریں",
      generating: "قانونی قواعد کا تجزیہ اور مسودہ تیار کیا جا رہا ہے..."
    },
    home: {
      title: "اپنے شہری اور قانونی حقوق کو سمجھیں اور ان پر عمل کریں",
      subtitle: "انفورائٹ AI پیچیدہ قانونی معلومات کو واضح اور مستند اقدامات میں تبدیل کرتا ہے۔",
      cta: "اپنا مسئلہ بیان کریں"
    }
  },
  ml: {
    common: {
      submit: "സമർപ്പിക്കുക",
      cancel: "റദ്ദാക്കുക",
      loading: "ലോഡ് ചെയ്യുന്നു...",
      save: "സൂക്ഷിക്കുക",
      edit: "തിരുത്തുക",
      delete: "നീക്കംചെയ്യുക",
      copied: "പകർത്തി!",
      copy: "പകർത്തുക",
      downloadPdf: "PDF ഡൗൺലോഡ് ചെയ്യുക",
      print: "പ്രിന്റ് ചെയ്യുക",
      language: "ഭാഷ",
      status: "സ്ഥിതി",
      action: "നടപടി",
      search: "തിരയുക",
      filter: "ഫിൽട്ടർ",
      close: "അടയ്ക്കുക",
      statutoryDisputeNav: "നിയമപരമായ തർക്ക പരിഹാര മാർഗ്ഗനിർദ്ദേശം",
      learnMore: "കൂടുതലറിയുക",
      viewDetails: "വിശദാംശങ്ങൾ കാണുക",
      legalDisclaimerTitle: "വിവരദായക അറിയിപ്പ്",
      legalDisclaimerBody: "പൗര ശാക്തീകരണത്തിനായുള്ള നിയമപരമായ മാർഗ്ഗനിർദ്ദേശങ്ങൾ ഇൻഫോറൈറ്റ് AI നൽകുന്നു.",
      backToHome: "ഹോമിലേക്ക് മടങ്ങുക"
    },
    ask: {
      statusVerified: "സ്ഥിരീകരിച്ചു",
      statusSuggested: "നിർദ്ദേശിച്ചത്",
      statusCitizenConfirmed: "പൗരൻ സ്ഥിരീകരിച്ചത്",
      statusVerificationRequired: "പരിശോധന ആവശ്യമാണ്",
      streetLayer: "സ്ട്രീറ്റ് മാപ്പ്",
      satelliteLayer: "ഉപഗ്രഹ ചിത്രങ്ങൾ",
      adminDetailsToggle: "ഭരണപരമായ ശ്രേണി വിവരങ്ങൾ",
      multipleLocalitiesNotice: "ഈ പിൻകോഡിനായി ഒന്നിലധികം പ്രദേശങ്ങൾ കണ്ടെത്തി",
      selectLocalityPrompt: "പ്രദേശം / പോസ്റ്റ് ഓഫീസ് തിരഞ്ഞെടുക്കുക",
      pageTitle: "നിങ്ങളുടെ പ്രശ്നം വിവരിക്കുക",
      pageSubtitle: "എന്താണ് സംഭവിച്ചതെന്ന് വ്യക്തമാക്കുക. ഇൻഫോറൈറ്റ് ശരിയായ നിയമപരമായ വഴി കണ്ടെത്തും.",
      useCurrentLocation: "എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക",
      btnStartVoice: "നിങ്ങളുടെ ഭാഷയിൽ സംസാരിക്കുക",
      btnStopRecording: "നിർത്തുക",
      pinCodeLabel: "പിൻ കോഡ്",
      stateUtLabel: "സംസ്ഥാനം / കേന്ദ്രഭരണ പ്രദേശം",
      postalSourcePrefix: "തപാൽ ഉറവിടം",
      adminGroundingPrefix: "ഭരണപരമായ അടിത്തറ",
      talukLabel: "താലൂക്ക് / സബ് ഡിസ്ട്രിക്റ്റ്",
      blockLabel: "ഡെവലപ്‌മെന്റ് ബ്ലോക്ക്",
      villageLabel: "ഗ്രാമം / പ്രദേശം",
      pinNotMappedLabel: "പിൻ മാപ്പിൽ ലഭ്യമല്ല — GPS ഉപയോഗിക്കുക",
      confirmLocationTitle: "ലൊക്കേഷൻ സ്ഥിരീകരിക്കുക",
      deviceGpsLabel: "ഉപകരണ ലൊക്കേഷൻ (GPS)",
      citizenConfirmedLabel: "പൗരൻ സ്ഥിരീകരിച്ച മാപ്പ് പോയിന്റ്",
      approximatePinLabel: "പിൻ കോഡ് അടിസ്ഥാനമാക്കിയുള്ള പ്രദേശം",
      describeProblemRequired: "തുടരുന്നതിന് മുൻപായി പ്രശ്നം വിവരിക്കുക.",
      translationUnavailable: "വിവർത്തനം ലഭ്യമല്ല. പ്രധാന വാചകം കാണിക്കുന്നു.",
      voiceTranscriptLabel: "വോയ്‌സ് ട്രാൻസ്ക്രിപ്റ്റ്",
      btnUseTranscript: "ഇത് ഉപയോഗിക്കുക",
      problemUnderstoodTitle: "പ്രശ്നം മനസ്സിലായി",
      problemDescLabel: "പ്രശ്ന വിവരണം",
      applicantDetailsTitle: "അപേക്ഷകന്റെ ലൊക്കേഷൻ വിവരങ്ങൾ",
      stateLabel: "സംസ്ഥാനം",
      districtLabel: "ജില്ല",
      localBodyLabel: "തദ്ദേശ സ്വയംഭരണ സ്ഥാപനം",
      localityLabel: "പ്രദേശം / വാർഡ്",
      wardLabel: "വാർഡ് നമ്പർ (ഓപ്ഷണൽ)",
      generateBtn: "RTI അപേക്ഷയും മാർഗ്ഗനിർദ്ദേശവും തയ്യാറാക്കുക",
      generating: "നിയമപരമായ വിവരങ്ങൾ പരിശോധിച്ച് അപേക്ഷ തയ്യാറാക്കുന്നു..."
    },
    home: {
      title: "നിങ്ങളുടെ പൗര-നിയമ അവകാശങ്ങൾ മനസ്സിലാക്കി പ്രവർത്തിക്കുക",
      subtitle: "സങ്കീർണ്ണമായ നിയമ വിവരങ്ങളെ ലളിതമായ നടപടികളാക്കി മാറ്റുന്നു.",
      cta: "നിങ്ങളുടെ പ്രശ്നം വിവരിക്കുക"
    }
  },
  bn: {
    common: {
      submit: "জমা দিন",
      cancel: "বাতিল করুন",
      loading: "লোড হচ্ছে...",
      save: "সংরক্ষণ করুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      copied: "কপি হয়েছে!",
      copy: "কপি করুন",
      downloadPdf: "PDF ডাউনলোড করুন",
      print: "প্রিন্ট করুন",
      language: "ভাষা",
      status: "অবস্থা",
      action: "পদক্ষেপ",
      search: "অনুসন্ধান করুন",
      filter: "ফিল্টার",
      close: "বন্ধ করুন",
      statutoryDisputeNav: "আইনি বিরোধ সংক্রান্ত নির্দেশিকা",
      learnMore: "আরও জানুন",
      viewDetails: "বিস্তারিত দেখুন",
      legalDisclaimerTitle: "তথ্যমূলক ও শিক্ষামূলক ঘোষণা",
      legalDisclaimerBody: "ইনফোরাইট এআই নাগরিক ক্ষমতায়নের জন্য আইনি নির্দেশিকা প্রদান করে।",
      backToHome: "হোমে ফিরে যান"
    },
    ask: {
      statusVerified: "যাচাইকৃত",
      statusSuggested: "প্রস্তাবিত",
      statusCitizenConfirmed: "নাগরিক দ্বারা নিশ্চিত",
      statusVerificationRequired: "যাচাইকরণ প্রয়োজন",
      streetLayer: "রাস্তার মানচিত্র",
      satelliteLayer: "স্যাটেলাইট চিত্র",
      adminDetailsToggle: "প্রশাসনিক কাঠামোর বিবরণ",
      multipleLocalitiesNotice: "এই পিন কোডের জন্য একাধিক এলাকা পাওয়া গেছে",
      selectLocalityPrompt: "এলাকা / পোস্ট অফিস নির্বাচন করুন",
      pageTitle: "আপনার সমস্যা বর্ণনা করুন",
      pageSubtitle: "কী ঘটেছে তা জানান। ইনফোরাইট যাচাইকৃত তথ্যের ভিত্তিতে আইনি পথ নির্দেশ করবে।",
      useCurrentLocation: "আমার বর্তমান অবস্থান ব্যবহার করুন",
      btnStartVoice: "আপনার ভাষায় বলুন",
      btnStopRecording: "থামান",
      pinCodeLabel: "পিন কোড",
      stateUtLabel: "রাজ্য / কেন্দ্রশাসিত অঞ্চল",
      postalSourcePrefix: "ডাক উৎস",
      adminGroundingPrefix: "প্রশাসনিক ভিত্তি",
      talukLabel: "মহকুমা / তালুক / তহশিল",
      blockLabel: "উন্নয়ন ব্লক",
      villageLabel: "গ্রাম / এলাকা",
      pinNotMappedLabel: "পিন মানচিত্রে নেই — GPS ব্যবহার করুন বা নিজে নির্বাচন করুন",
      confirmLocationTitle: "অবস্থান নিশ্চিত করুন",
      deviceGpsLabel: "ডিভাইস অবস্থান (GPS)",
      citizenConfirmedLabel: "নাগরিক নিশ্চিত মানচিত্র বিন্দু",
      approximatePinLabel: "পিন কোড ভিত্তিক আনুমানিক এলাকা",
      describeProblemRequired: "এগিয়ে যাওয়ার আগে আপনার সমস্যা বর্ণনা করুন।",
      translationUnavailable: "অনুবাদ পরিষেবা অনুপলব্ধ। মূল পাঠ্য দেখানো হচ্ছে।",
      voiceTranscriptLabel: "কণ্ঠস্বরের পাঠ্য",
      btnUseTranscript: "এই পাঠ্য ব্যবহার করুন",
      problemUnderstoodTitle: "সমস্যা বোঝা গেছে",
      problemDescLabel: "সমস্যার বিবরণ",
      applicantDetailsTitle: "আবেদনকারীর অবস্থান সংক্রান্ত তথ্য",
      stateLabel: "রাজ্য",
      districtLabel: "জেলা",
      localBodyLabel: "পৌর কর্তৃপক্ষ / স্থানীয় সংস্থা",
      localityLabel: "এলাকা / গ্রাম",
      wardLabel: "ওয়ার্ড নম্বর (ঐচ্ছিক)",
      generateBtn: "RTI আবেদন এবং আইনি নির্দেশিকা তৈরি করুন",
      generating: "আইনি নিয়ম বিশ্লেষণ করে খসড়া তৈরি করা হচ্ছে..."
    },
    home: {
      title: "আপনার নাগরিক ও আইনি অধিকার বুঝুন এবং পদক্ষেপ নিন",
      subtitle: "ইনফোরাইট এআই জটিল প্রশাসনিক বিষয়কে স্পষ্ট পদক্ষেপে রূপান্তরিত করে।",
      cta: "আপনার সমস্যা বর্ণনা করুন"
    }
  },
  mr: {
    common: {
      submit: "प्रस्तुत करा",
      cancel: "रद्द करा",
      loading: "लोड होत आहे...",
      save: "जतन करा",
      edit: "संपादित करा",
      delete: "हटवा",
      copied: "कॉपी केले!",
      copy: "कॉपी करा",
      downloadPdf: "PDF डाउनलोड करा",
      print: "दस्तऐवज मुद्रित करा",
      language: "भाषा",
      status: "स्थिती",
      action: "कृती",
      search: "शोधा",
      filter: "फिल्टर",
      close: "बंद करा",
      statutoryDisputeNav: "कायदेशीर वाद निवारण मार्गदर्शन",
      learnMore: "अधिक जाणून घ्या",
      viewDetails: "तपशील पहा",
      legalDisclaimerTitle: "माहिती व शैक्षणिक अस्वीकरण",
      legalDisclaimerBody: "इन्फोराइट एआय नागरिकांच्या सक्षमीकरणासाठी वैधानिक मार्गदर्शन प्रदान करते.",
      backToHome: "मुख्य पृष्ठावर परत जा"
    },
    ask: {
      statusVerified: "सत्यापित",
      statusSuggested: "सुचवलेले",
      statusCitizenConfirmed: "नागरिकाने पुष्टी केलेले",
      statusVerificationRequired: "पडताळणी आवश्यक",
      streetLayer: "रस्ता नकाशा",
      satelliteLayer: "उपग्रह प्रतिमा",
      adminDetailsToggle: "प्रशासकीय रचना तपशील",
      multipleLocalitiesNotice: "या पिन कोडसाठी अनेक परिसर आढळले आहेत",
      selectLocalityPrompt: "परिसर / पोस्ट ऑफिस निवडा",
      pageTitle: "तुमची समस्या सांगा",
      pageSubtitle: "काय घडले ते सांगा. इन्फोराइट अधिकृत माहितीवर आधारित योग्य कायदेशीर मार्ग दाखवेल.",
      useCurrentLocation: "माझे सध्याचे स्थान वापरा",
      btnStartVoice: "तुमच्या भाषेत बोला",
      btnStopRecording: "थांबवा",
      pinCodeLabel: "पिन कोड",
      stateUtLabel: "राज्य / केंद्रशासित प्रदेश",
      postalSourcePrefix: "टपाल स्रोत",
      adminGroundingPrefix: "प्रशासकीय आधार",
      talukLabel: "तालुका / उप-जिल्हा",
      blockLabel: "विकास गट",
      villageLabel: "गाव / परिसर",
      pinNotMappedLabel: "पिन नकाशावर उपलब्ध नाही — GPS वापरा किंवा व्यक्तिशः निवडा",
      confirmLocationTitle: "स्थान निश्चित करा",
      deviceGpsLabel: "डिव्हाइस स्थान (GPS)",
      citizenConfirmedLabel: "नागरिकाने निश्चित केलेला नकाशा बिंदू",
      approximatePinLabel: "पिन कोडनुसार अंदाजे परिसर",
      describeProblemRequired: "पुढे जाण्यापूर्वी कृपया समस्येचे वर्णन करा.",
      translationUnavailable: "भाषांतर सेवा अनुपलब्ध आहे. मूळ मजकूर दाखवला जात आहे.",
      voiceTranscriptLabel: "आवाज मजकूर",
      btnUseTranscript: "हा मजकूर वापरा",
      problemUnderstoodTitle: "समस्या समजली",
      problemDescLabel: "समस्या तपशील",
      applicantDetailsTitle: "अर्जदाराच्या स्थानाचा तपशील",
      stateLabel: "राज्य",
      districtLabel: "जिल्हा",
      localBodyLabel: "सार्वजनिक प्राधिकरण / स्थानिक संस्था",
      localityLabel: "परिसर / गाव",
      wardLabel: "वॉर्ड क्रमांक (पर्यायी)",
      generateBtn: "RTI अर्ज आणि कायदेशीर मार्गदर्शन तयार करा",
      generating: "कायदेशीर नियमांचे विश्लेषण करून अर्ज तयार केला जात आहे..."
    },
    home: {
      title: "तुमचे नागरी व कायदेशीर हक्क समजून घ्या आणि कृती करा",
      subtitle: "इन्फोराइट एआय गुंतागुंतीच्या कायदेशीर माहितीचे सुलभ कृतींमध्ये रूपांतर करते.",
      cta: "तुमची समस्या सांगा"
    }
  },
  gu: {
    common: {
      submit: "સબમિટ કરો",
      cancel: "રદ કરો",
      loading: "લોડ થઈ રહ્યું છે...",
      save: "સાચવો",
      edit: "સંપાદિત કરો",
      delete: "કાઢી નાખો",
      copied: "કૉપિ થઈ ગયું!",
      copy: "કૉપિ કરો",
      downloadPdf: "PDF ડાઉનલોડ કરો",
      print: "પ્રિન્ટ કરો",
      language: "ભાષા",
      status: "સ્થિતિ",
      action: "પગલું",
      search: "શોધો",
      filter: "ફિલ્ટર",
      close: "બંધ કરો",
      statutoryDisputeNav: "કાનૂની વિવાદ માર્ગદર્શન",
      learnMore: "વધુ જાણો",
      viewDetails: "વિગતો જુઓ",
      legalDisclaimerTitle: "માહિતી અને શૈક્ષણિક ડિસ્ક્લેમર",
      legalDisclaimerBody: "ઇન્ફોરાઇટ AI નાગરિક સશક્તિકરણ માટે કાનૂની માર્ગદર્શન પૂરું પાડે છે.",
      backToHome: "હોમ પર પાછા જાઓ"
    },
    ask: {
      statusVerified: "ચકાસાયેલ",
      statusSuggested: "સૂચવેલ",
      statusCitizenConfirmed: "નાગરિક દ્વારા પુષ્ટિ થયેલ",
      statusVerificationRequired: "ચકાસણી જરૂરી",
      streetLayer: "શેરી નકશો",
      satelliteLayer: "સેટેલાઇટ છબી",
      adminDetailsToggle: "વહીવટી માળખાની વિગતો",
      multipleLocalitiesNotice: "આ પિન કોડ માટે બહુવિધ વિસ્તારો મળ્યા છે",
      selectLocalityPrompt: "વિસ્તાર / પોસ્ટ ઑફિસ પસંદ કરો",
      pageTitle: "તમારી સમસ્યાનું વર્ણન કરો",
      pageSubtitle: "શું બન્યું તે જણાવો. ઇન્ફોરાઇટ સત્તાવાર સ્ત્રોતોના આધારે કાનૂની માર્ગ બતાવશે.",
      useCurrentLocation: "મારું વર્તમાન સ્થાન વાપરો",
      btnStartVoice: "તમારી ભાષામાં બોલો",
      btnStopRecording: "અટકાવો",
      pinCodeLabel: "પિન કોડ",
      stateUtLabel: "રાજ્ય / કેન્દ્રશાસિત પ્રદેશ",
      postalSourcePrefix: "ટપાલ સ્ત્રોત",
      adminGroundingPrefix: "વહીવટી આધાર",
      talukLabel: "તાલુકો / પેટા-જિલ્લો",
      blockLabel: "વિકાસ બ્લોક",
      villageLabel: "ગામ / વિસ્તાર",
      pinNotMappedLabel: "પિન નકશામાં નથી — GPS વાપરો અથવા જાતે પસંદ કરો",
      confirmLocationTitle: "સ્થાન પુષ્ટિ કરો",
      deviceGpsLabel: "ઉપકરણ સ્થાન (GPS)",
      citizenConfirmedLabel: "નાગરિક દ્વારા પુષ્ટિ થયેલ નકશા બિંદુ",
      approximatePinLabel: "પિન કોડ પરથી અંદાજિત વિસ્તાર",
      describeProblemRequired: "આગળ વધતા પહેલાં કૃપા કરીને સમસ્યાનું વર્ણન કરો.",
      translationUnavailable: "અનુવાદ સેવા ઉપલબ્ધ નથી. મૂળ લખાણ બતાવી રહ્યું છે.",
      voiceTranscriptLabel: "અવાજ ટ્રાન્સક્રિપ્ટ",
      btnUseTranscript: "આ લખાણ વાપરો",
      problemUnderstoodTitle: "સમસ્યા સમજાઈ ગઈ",
      problemDescLabel: "સમસ્યાનું વર્ણન",
      applicantDetailsTitle: "અરજદારનું સ્થાન સંદર્ભ",
      stateLabel: "રાજ્ય",
      districtLabel: "જિલ્લો",
      localBodyLabel: "જાહેર સત્તામંડળ / સ્થાનિક સંસ્થા",
      localityLabel: "વિસ્તાર / ગામ",
      wardLabel: "વોર્ડ નંબર (વૈકલ્પિક)",
      generateBtn: "RTI અરજી અને કાનૂની માર્ગદર્શન તૈયાર કરો",
      generating: "કાનૂની નિયમોનું વિશ્લેષણ કરી અરજી તૈયાર થઈ રહી છે..."
    },
    home: {
      title: "તમારા નાગરિક અને કાનૂની અધિકારો સમજો અને પગલાં લો",
      subtitle: "ઇન્ફોરાઇટ AI જટિલ કાનૂની માહિતીને સરળ પગલાંઓમાં પરિવર્તિત કરે છે.",
      cta: "તમારી સમસ્યાનું વર્ણન કરો"
    }
  },
  pa: {
    common: {
      submit: "ਜਮ੍ਹਾਂ ਕਰੋ",
      cancel: "ਰੱਦ ਕਰੋ",
      loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
      save: "ਸੰਭਾਲੋ",
      edit: "ਸੋਧੋ",
      delete: "ਹਟਾਓ",
      copied: "ਕਾਪੀ ਹੋ ਗਿਆ!",
      copy: "ਕਾਪੀ ਕਰੋ",
      downloadPdf: "PDF ਡਾਊਨਲੋਡ ਕਰੋ",
      print: "ਪ੍ਰਿੰਟ ਕਰੋ",
      language: "ਭਾਸ਼ਾ",
      status: "ਸਥਿਤੀ",
      action: "ਕਾਰਵਾਈ",
      search: "ਖੋਜੋ",
      filter: "ਫਿਲਟਰ",
      close: "ਬੰਦ ਕਰੋ",
      statutoryDisputeNav: "ਕਾਨੂੰਨੀ ਵਿਵਾਦ ਮਾਰਗਦਰਸ਼ਨ",
      learnMore: "ਹੋਰ ਜਾਣੋ",
      viewDetails: "ਵੇਰਵੇ ਦੇਖੋ",
      legalDisclaimerTitle: "ਜਾਣਕਾਰੀ ਅਤੇ ਵਿਦਿਅਕ ਘੋਸ਼ਣਾ",
      legalDisclaimerBody: "ਇਨਫੋਰਾਈਟ ਏਆਈ ਨਾਗਰਿਕ ਸਸ਼ਕਤੀਕਰਨ ਲਈ ਕਾਨੂੰਨੀ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
      backToHome: "ਮੁੱਖ ਪੰਨੇ 'ਤੇ ਵਾਪਸ ਜਾਓ"
    },
    ask: {
      statusVerified: "ਪ੍ਰਮਾਣਿਤ",
      statusSuggested: "ਸੁਝਾਇਆ ਗਿਆ",
      statusCitizenConfirmed: "ਨਾਗਰਿਕ ਦੁਆਰਾ ਪੁਸ਼ਟੀ ਕੀਤੀ ਗਈ",
      statusVerificationRequired: "ਪੁਸ਼ਟੀ ਲੋੜੀਂਦੀ ਹੈ",
      streetLayer: "ਸੜਕ ਨਕਸ਼ਾ",
      satelliteLayer: "ਸੈਟੇਲਾਈਟ ਤਸਵੀਰਾਂ",
      adminDetailsToggle: "ਪ੍ਰਬੰਧਕੀ ਢਾਂਚੇ ਦੇ ਵੇਰਵੇ",
      multipleLocalitiesNotice: "ਇਸ ਪਿੰਨ ਕੋਡ ਲਈ ਕਈ ਇਲਾਕੇ ਮਿਲੇ ਹਨ",
      selectLocalityPrompt: "ਇਲਾਕਾ / ਡਾਕਘਰ ਚੁਣੋ",
      pageTitle: "ਆਪਣੀ ਸਮੱਸਿਆ ਬਾਰੇ ਦੱਸੋ",
      pageSubtitle: "ਕੀ ਵਾਪਰਿਆ ਸਾਨੂੰ ਦੱਸੋ। ਇਨਫੋਰਾਈਟ ਪ੍ਰਮਾਣਿਤ ਸਰੋਤਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਕਾਨੂੰਨੀ ਰਾਹ ਦੱਸੇਗਾ।",
      useCurrentLocation: "ਮੇਰੀ ਮੌਜੂਦਾ ਸਥਿਤੀ ਵਰਤੋ",
      btnStartVoice: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ",
      btnStopRecording: "ਰੋਕੋ",
      pinCodeLabel: "ਪਿੰਨ ਕੋਡ",
      stateUtLabel: "ਰਾਜ / ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼",
      postalSourcePrefix: "ਡਾਕ ਸਰੋਤ",
      adminGroundingPrefix: "ਪ੍ਰਬੰਧਕੀ ਆਧਾਰ",
      talukLabel: "ਤਹਿਸੀਲ / ਸਬ-ਡਿਵੀਜ਼ਨ",
      blockLabel: "ਵਿਕਾਸ ਬਲਾਕ",
      villageLabel: "ਪਿੰਡ / ਇਲਾਕਾ",
      pinNotMappedLabel: "ਪਿੰਨ ਨਕਸ਼ੇ 'ਤੇ ਨਹੀਂ ਹੈ — GPS ਵਰਤੋ",
      confirmLocationTitle: "ਸਥਿਤੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
      deviceGpsLabel: "ਡਿਵਾਈਸ ਸਥਿਤੀ (GPS)",
      citizenConfirmedLabel: "ਨਾਗਰਿਕ ਪੁਸ਼ਟੀ ਨਕਸ਼ਾ ਬਿੰਦੂ",
      approximatePinLabel: "ਪਿੰਨ ਕੋਡ ਤੋਂ ਅੰਦਾਜ਼ਨ ਇਲਾਕਾ",
      describeProblemRequired: "ਅੱਗੇ ਵਧਣ ਤੋਂ ਪਹਿਲਾਂ ਕਿਰਪਾ ਕਰਕੇ ਸਮੱਸਿਆ ਬਾਰੇ ਦੱਸੋ।",
      translationUnavailable: "ਅਨੁਵਾਦ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਮੂਲ ਪਾਠ ਦਿਖਾਇਆ ਜਾ ਰਿਹਾ ਹੈ।",
      voiceTranscriptLabel: "ਆਵਾਜ਼ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ",
      btnUseTranscript: "ਇਹ ਪਾਠ ਵਰਤੋ",
      problemUnderstoodTitle: "ਸਮੱਸਿਆ ਸਮਝ ਆ ਗਈ",
      problemDescLabel: "ਸਮੱਸਿਆ ਦਾ ਵੇਰਵਾ",
      applicantDetailsTitle: "ਬਿਨੈਕਾਰ ਦੀ ਸਥਿਤੀ ਦਾ ਵੇਰਵਾ",
      stateLabel: "ਰਾਜ",
      districtLabel: "ਜ਼ਿਲ੍ਹਾ",
      localBodyLabel: "ਸਰਕਾਰੀ ਅਥਾਰਟੀ / ਸਥਾਨਕ ਸੰਸਥਾ",
      localityLabel: "ਇਲਾਕਾ / ਪਿੰਡ",
      wardLabel: "ਵਾਰਡ ਨੰਬਰ (ਵਿਕਲਪਿਕ)",
      generateBtn: "RTI ਅਰਜ਼ੀ ਅਤੇ ਕਾਨੂੰਨੀ ਮਾਰਗਦਰਸ਼ਨ ਤਿਆਰ ਕਰੋ",
      generating: "ਕਾਨੂੰਨੀ ਨਿਯਮਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਖਰੜਾ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ..."
    },
    home: {
      title: "ਆਪਣੇ ਨਾਗਰਿਕ ਅਤੇ ਕਾਨੂੰਨੀ ਅਧਿਕਾਰਾਂ ਨੂੰ ਸਮਝੋ ਅਤੇ ਕਾਰਵਾਈ ਕਰੋ",
      subtitle: "ਇਨਫੋਰਾਈਟ ਏਆਈ ਗੁੰਝਲਦਾਰ ਕਾਨੂੰਨੀ ਜਾਣਕਾਰੀ ਨੂੰ ਸਪੱਸ਼ਟ ਕਦਮਾਂ ਵਿੱਚ ਬਦਲਦਾ ਹੈ।",
      cta: "ਆਪਣੀ ਸਮੱਸਿਆ ਬਾਰੇ ਦੱਸੋ"
    }
  },
  od: {
    common: {
      submit: "ଦାଖଲ କରନ୍ତୁ",
      cancel: "ବାତିଲ କରନ୍ତୁ",
      loading: "ଲୋଡ୍ ହେଉଛି...",
      save: "ସଂରକ୍ଷଣ କରନ୍ତୁ",
      edit: "ସଂଶୋଧନ କରନ୍ତୁ",
      delete: "ହଟାନ୍ତୁ",
      copied: "କପି ହୋଇଛି!",
      copy: "କପି କରନ୍ତୁ",
      downloadPdf: "PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ",
      print: "ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ",
      language: "ଭାଷା",
      status: "ସ୍ଥିତି",
      action: "ପଦକ୍ଷେପ",
      search: "ସନ୍ଧାନ କରନ୍ତୁ",
      filter: "ଫିଲ୍ଟର୍",
      close: "ବନ୍ଦ କରନ୍ତୁ",
      statutoryDisputeNav: "ଆଇନଗତ ବିବାଦ ସମାଧାନ ମାର୍ଗଦର୍ଶନ",
      learnMore: "ଅଧିକ ଜାଣନ୍ତୁ",
      viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
      legalDisclaimerTitle: "ସୂଚନାତ୍ମକ ଘୋଷଣା",
      legalDisclaimerBody: "ଇନଫୋରାଇଟ୍ AI ନାଗରିକ ସଶକ୍ତୀକରଣ ପାଇଁ ଆଇନଗତ ମାର୍ଗଦର୍ଶନ ପ୍ରଦାନ କରେ।",
      backToHome: "ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ"
    },
    ask: {
      statusVerified: "ଯାଞ୍ଚ ହୋଇଛି",
      statusSuggested: "ପ୍ରସ୍ତାବିତ",
      statusCitizenConfirmed: "ନାଗରିକ ଦ୍ୱାରା ନିଶ୍ଚିତ",
      statusVerificationRequired: "ଯାଞ୍ଚ ଆବଶ୍ୟକ",
      streetLayer: "ରାସ୍ତା ମାନଚିତ୍ର",
      satelliteLayer: "ସାଟେଲାଇଟ୍ ଚିତ୍ର",
      adminDetailsToggle: "ପ୍ରଶାସନିକ ସ୍ତର ବିବରଣୀ",
      multipleLocalitiesNotice: "ଏହି ପିନ୍ କୋଡ୍ ପାଇଁ ଏକାଧିକ ଅଞ୍ଚଳ ମିଳିଛି",
      selectLocalityPrompt: "ଅଞ୍ଚଳ / ଡାକଘର ଚୟନ କରନ୍ତୁ",
      pageTitle: "ଆପଣଙ୍କର ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ",
      pageSubtitle: "କଣ ଘଟିଲା ଆମକୁ ଜଣାନ୍ତୁ। ଇନଫୋରାଇଟ୍ ସଠିକ୍ ଆଇନଗତ ପଦକ୍ଷେପ ଚିହ୍ନଟ କରିବ।",
      useCurrentLocation: "ମୋର ବର୍ତ୍ତମାନର ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ",
      btnStartVoice: "ଆପଣଙ୍କ ଭାଷାରେ କୁହନ୍ତୁ",
      btnStopRecording: "ବନ୍ଦ କରନ୍ତୁ",
      pinCodeLabel: "ପିନ୍ କୋଡ୍",
      stateUtLabel: "ରାଜ୍ୟ / କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ",
      postalSourcePrefix: "ଡାକ ଉତ୍ସ",
      adminGroundingPrefix: "ପ୍ରଶାସନିକ ଆଧାର",
      talukLabel: "ତହସିଲ / ବ୍ଲକ୍",
      blockLabel: "ବିକାଶ ବ୍ଲକ୍",
      villageLabel: "ଗ୍ରାମ / ଅଞ୍ଚଳ",
      pinNotMappedLabel: "ପିନ୍ ମାନଚିତ୍ରରେ ନାହିଁ — GPS ବ୍ୟବହାର କରନ୍ତୁ",
      confirmLocationTitle: "ସ୍ଥାନ ନିଶ୍ଚିତ କରନ୍ତୁ",
      deviceGpsLabel: "ଡିଭାଇସ୍ ସ୍ଥାନ (GPS)",
      citizenConfirmedLabel: "ନାଗରିକ ନିଶ୍ଚିତ ମାନଚିତ୍ର ବିନ୍ଦୁ",
      approximatePinLabel: "ପିନ୍ କୋଡ୍ ଅନୁଯାୟୀ ଆନୁମାନିକ ଅଞ୍ଚଳ",
      describeProblemRequired: "ଆଗକୁ ବଢ଼ିବା ପୂର୍ବରୁ ଦୟାକରି ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ।",
      translationUnavailable: "ଅନୁବାଦ ସେବା ଉପଲବ୍ଧ ନାହିଁ। ମୂଳ ଲେଖା ଦର୍ଶାଯାଉଛି।",
      voiceTranscriptLabel: "ଭଏସ୍ ଟ୍ରାନ୍ସକ୍ରିପ୍ଟ",
      btnUseTranscript: "ଏହି ଲେଖା ବ୍ୟବହାର କରନ୍ତୁ",
      problemUnderstoodTitle: "ସମସ୍ୟା ବୁଝାପଡ଼ିଲା",
      problemDescLabel: "ସମସ୍ୟାର ବିବରଣୀ",
      applicantDetailsTitle: "ଆବେଦନକାରୀଙ୍କ ସ୍ଥାନ ସମ୍ବନ୍ଧୀୟ ତଥ୍ୟ",
      stateLabel: "ରାଜ୍ୟ",
      districtLabel: "ଜିଲ୍ଲା",
      localBodyLabel: "ସରକାରୀ କର୍ତ୍ତୃପକ୍ଷ / ସ୍ଥାନୀୟ ସଂସ୍ଥା",
      localityLabel: "ଅଞ୍ଚଳ / ଗ୍ରାମ",
      wardLabel: "ୱାର୍ଡ ନମ୍ବର (ଐଚ୍ଛିକ)",
      generateBtn: "RTI ଆବେଦନ ଏବଂ ଆଇନଗତ ମାର୍ଗଦର୍ଶନ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
      generating: "ଆଇନଗତ ନିୟମ ବିଶ୍ଳେଷଣ କରି ଡ୍ରାଫ୍ଟ ପ୍ରସ୍ତୁତ କରାଯାଉଛି..."
    },
    home: {
      title: "ଆପଣଙ୍କର ନାଗରିକ ଏବଂ ଆଇନଗତ ଅଧିକାର ବୁଝନ୍ତୁ ଏବଂ କାର୍ଯ୍ୟ କରନ୍ତୁ",
      subtitle: "ଇନଫୋରାଇଟ୍ AI ଜଟିଳ ଆଇନଗତ ତଥ୍ୟକୁ ସ୍ପଷ୍ଟ ପଦକ୍ଷେପରେ ପରିଣତ କରେ।",
      cta: "ଆପଣଙ୍କର ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ"
    }
  }
};

// Apply updates to files
for (const [lang, data] of Object.entries(LOCALIZATIONS)) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf8");

  // Update common section
  for (const [k, v] of Object.entries(data.common)) {
    const regex = new RegExp(`("${k}":\\s*")[^"]*(")`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${v}$2`);
    }
  }

  // Update ask section
  for (const [k, v] of Object.entries(data.ask)) {
    const regex = new RegExp(`("${k}":\\s*")[^"]*(")`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${v}$2`);
    }
  }

  // Update home section
  for (const [k, v] of Object.entries(data.home)) {
    const regex = new RegExp(`("${k}":\\s*")[^"]*(")`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${v}$2`);
    }
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated localized core keys for: ${lang}.ts`);
}

import { hiLocale } from "../src/i18n/locales/hi";
const INDIC_FALLBACK = hiLocale;
const remainingLangs = ["as", "brx", "doi", "kok", "ks", "mai", "mni", "ne", "sa", "sat", "sd"];

for (const lang of remainingLangs) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf8");

  for (const [k, v] of Object.entries(INDIC_FALLBACK.common)) {
    const regex = new RegExp(`("${k}":\\s*")[^"]*(")`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${v}$2`);
    }
  }

  for (const [k, v] of Object.entries(INDIC_FALLBACK.ask)) {
    const regex = new RegExp(`("${k}":\\s*")[^"]*(")`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${v}$2`);
    }
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Hardened Indic core keys for: ${lang}.ts`);
}
