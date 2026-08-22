import { NumberNormalizationResult } from "@/types/voice";

/**
 * Multilingual Word-to-Digit Dictionary
 * Supports English, Hindi, Tamil, Telugu, and other Indian language spoken digits.
 */
const WORD_DIGIT_MAP: Record<string, string> = {
  // English
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",

  // Hindi (Transliterated & Devanagari)
  shunya: "0",
  ek: "1",
  do: "2",
  teen: "3",
  chaar: "4",
  char: "4",
  paanch: "5",
  panch: "5",
  chhah: "6",
  chhe: "6",
  saat: "7",
  aath: "8",
  ath: "8",
  nau: "9",
  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
  शून्य: "0",
  एक: "1",
  दो: "2",
  तीन: "3",
  चार: "4",
  पांच: "5",
  छह: "6",
  सात: "7",
  आठ: "8",
  नौ: "9",

  // Tamil (Transliterated & Script)
  poojiyam: "0",
  ondru: "1",
  onnu: "1",
  irandu: "2",
  rendu: "2",
  moondru: "3",
  moonu: "3",
  naangu: "4",
  naalu: "4",
  aindhu: "5",
  anju: "5",
  aaru: "6",
  ezhu: "7",
  ettu: "8",
  onbadhu: "9",
  பூஜ்ஜியம்: "0",
  ஒன்று: "1",
  இரண்டு: "2",
  மூன்று: "3",
  நான்கு: "4",
  ஐந்து: "5",
  ஆறு: "6",
  ஏழு: "7",
  எட்டு: "8",
  ஒன்பது: "9",

  // Telugu (Transliterated & Script)
  sunna: "0",
  okati: "1",
  rendu_te: "2",
  moodu: "3",
  naalugu: "4",
  aidu: "5",
  aaru_te: "6",
  edu: "7",
  yenimidi: "8",
  tommidi: "9",
  సున్నా: "0",
  ఒకటి: "1",
  రెండు: "2",
  మూడు: "3",
  నాలుగు: "4",
  ఐదు: "5",
  ఆరు: "6",
  ఏడు: "7",
  ఎనిమిది: "8",
  తొమ్మిది: "9"
};

/**
 * Normalizes spoken PIN codes (e.g. "six zero zero zero four two" -> "600042")
 */
export function normalizeSpokenPincode(spokenText: string): NumberNormalizationResult {
  if (!spokenText) {
    return {
      originalText: "",
      normalizedValue: "",
      type: "PINCODE",
      formattedDisplay: "",
      confidence: "UNABLE_TO_PARSE",
      confirmationPrompt: "Unable to detect PIN code from speech."
    };
  }

  // 1. Direct digits in text
  const directDigits = spokenText.replace(/\D/g, "");
  if (directDigits.length === 6 && /^[1-9][0-9]{5}$/.test(directDigits)) {
    return {
      originalText: spokenText,
      normalizedValue: directDigits,
      type: "PINCODE",
      formattedDisplay: directDigits,
      confidence: "CONFIRMED_EXACT",
      confirmationPrompt: `Postal PIN Code: ${directDigits} — Confirm?`
    };
  }

  // 2. Tokenize words and convert word-by-word
  const words = spokenText.toLowerCase().split(/[\s,-]+/);
  let digitString = "";

  for (const word of words) {
    if (/^\d$/.test(word)) {
      digitString += word;
    } else if (WORD_DIGIT_MAP[word]) {
      digitString += WORD_DIGIT_MAP[word];
    }
  }

  if (digitString.length === 6 && /^[1-9][0-9]{5}$/.test(digitString)) {
    return {
      originalText: spokenText,
      normalizedValue: digitString,
      type: "PINCODE",
      formattedDisplay: digitString,
      confidence: "CANDIDATE_REQUIRES_CONFIRMATION",
      confirmationPrompt: `Parsed PIN Code: ${digitString} — Confirm?`
    };
  }

  return {
    originalText: spokenText,
    normalizedValue: digitString,
    type: "PINCODE",
    formattedDisplay: digitString,
    confidence: "UNABLE_TO_PARSE",
    confirmationPrompt: `Spoken PIN '${spokenText}' did not produce a 6-digit postal PIN.`
  };
}

/**
 * Normalizes spoken annual family income (e.g. "one lakh eighty thousand" -> 180000)
 */
export function normalizeSpokenIncome(spokenText: string): NumberNormalizationResult {
  if (!spokenText) {
    return {
      originalText: "",
      normalizedValue: 0,
      type: "INCOME",
      formattedDisplay: "₹0",
      confidence: "UNABLE_TO_PARSE",
      confirmationPrompt: "Unable to parse income."
    };
  }

  const text = spokenText.toLowerCase().replace(/,/g, "");

  // Check direct numbers like "180000" or "₹1,80,000"
  const directMatch = text.match(/₹?\s*(\d{4,8})/);
  if (directMatch) {
    const val = parseInt(directMatch[1], 10);
    return {
      originalText: spokenText,
      normalizedValue: val,
      type: "INCOME",
      formattedDisplay: `₹${val.toLocaleString("en-IN")}`,
      confidence: "CONFIRMED_EXACT",
      confirmationPrompt: `Annual Family Income: ₹${val.toLocaleString("en-IN")} — Confirm?`
    };
  }

  // Parse Indian numbering system: Lakhs & Thousands
  let total = 0;
  let hasParsed = false;

  // Lakhs / Lacs (लाख / லட்சம் / లక్ష)
  const lakhMatch = text.match(/(\d+|one|two|three|four|five|six|seven|eight|nine|ten|ek|do|teen|chaar|paanch|chhe|saat|aath|nau|das|oru|irandu|rendu|moondru|naangu|aindhu|aaru|ezhu|ettu|onbadhu|patthu|okati|moodu|naalugu|aidu|edu|yenimidi|tommidi|padi)\s*(?:lakh|lacs|lac|लाख|லட்சம்|లక్ష)/i);
  if (lakhMatch) {
    const count = parseWordOrDigit(lakhMatch[1]);
    if (count > 0) {
      total += count * 100000;
      hasParsed = true;
    }
  }

  // Thousands (हज़ार / ஆயிரம் / వేలు)
  const thousandMatch = text.match(/(\d+|eighty|eight|fifty|forty|thirty|twenty|ten|ninety|seventy|sixty|assi|pachaas|chaalees|tees|bees|das|nabbe|sattar|saath|enbhadhu|aimbadhu|naarpadhu|muppadhu|irubadhu|patthu|thonnooru|ezhubadhu|arubadhu|enabhai|yabhai|nalabhai|mupphai|iravai|padi|tombhai|debbhai|aravai)\s*(?:thousand|k|हज़ार|ஆயிரம்|వేలు)/i);
  if (thousandMatch) {
    const count = parseWordOrDigit(thousandMatch[1]);
    if (count > 0) {
      total += count * 1000;
      hasParsed = true;
    }
  }

  if (hasParsed && total > 0) {
    return {
      originalText: spokenText,
      normalizedValue: total,
      type: "INCOME",
      formattedDisplay: `₹${total.toLocaleString("en-IN")}`,
      confidence: "CANDIDATE_REQUIRES_CONFIRMATION",
      confirmationPrompt: `Annual Family Income candidate: ₹${total.toLocaleString("en-IN")} — Confirm?`
    };
  }

  return {
    originalText: spokenText,
    normalizedValue: 0,
    type: "INCOME",
    formattedDisplay: "₹0",
    confidence: "UNABLE_TO_PARSE",
    confirmationPrompt: `Could not determine exact income from speech '${spokenText}'. Please enter manually.`
  };
}

function parseWordOrDigit(token: string): number {
  const t = token.toLowerCase().trim();
  if (/^\d+$/.test(t)) return parseInt(t, 10);

  const wordMap: Record<string, number> = {
    one: 1, ek: 1, oru: 1, ondru: 1, okati: 1,
    two: 2, do: 2, irandu: 2, rendu: 2,
    three: 3, teen: 3, moondru: 3, moonu: 3, moodu: 3,
    four: 4, chaar: 4, char: 4, naangu: 4, naalu: 4, naalugu: 4,
    five: 5, paanch: 5, panch: 5, aindhu: 5, anju: 5, aidu: 5,
    six: 6, chhah: 6, chhe: 6, aaru: 6,
    seven: 7, saat: 7, ezhu: 7, edu: 7,
    eight: 8, aath: 8, ath: 8, ettu: 8, yenimidi: 8,
    nine: 9, nau: 9, onbadhu: 9, tommidi: 9,
    ten: 10, das: 10, patthu: 10, padi: 10,
    twenty: 20, bees: 20, irubadhu: 20, iravai: 20,
    thirty: 30, tees: 30, muppadhu: 30, mupphai: 30,
    forty: 40, chaalees: 40, naarpadhu: 40, nalabhai: 40,
    fifty: 50, pachaas: 50, aimbadhu: 50, yabhai: 50,
    sixty: 60, saath: 60, arubadhu: 60, aravai: 60,
    seventy: 70, sattar: 70, ezhubadhu: 70, debbhai: 70,
    eighty: 80, assi: 80, enbhadhu: 80, enabhai: 80,
    ninety: 90, nabbe: 90, thonnooru: 90, tombhai: 90
  };

  return wordMap[t] || 0;
}
