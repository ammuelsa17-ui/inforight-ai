# InfoRight AI — Multilingual Voice Recognition Live Browser Test Protocol

This checklist guides manual verification of dynamic voice recognition on Safari, Chrome, and Firefox on macOS.

---

## Pre-Requisites
1. Open the deployed application URL or local development server (`http://localhost:3000/ask`).
2. Ensure browser microphone permission is granted.

---

## Verification Steps

### Step 1: Tamil (தமிழ்) Voice Recognition
- [ ] Select **தமிழ் (Tamil)** in the top navigation language selector.
- [ ] Check `/ask` page: Voice button should visibly display **`Voice: Tamil`**.
- [ ] Click the microphone button to open the modal.
- [ ] Verify modal header displays: `Voice input language: Tamil (தமிழ்)` and `Locale: ta-IN`.
- [ ] Tap the microphone icon and speak in Tamil (e.g. *"எங்கள் தெருவில் குடிநீர் குழாய் உடைந்துள்ளது"*).
- [ ] **Expected Result**: Transcript displays in Tamil Unicode characters.
- [ ] Click **"Confirm & Use Text"** and verify Tamil text populates the problem textarea.

---

### Step 2: Hindi (हिन्दी) Voice Recognition
- [ ] Select **हिन्दी (Hindi)** in the language selector.
- [ ] Check `/ask` page: Voice button displays **`Voice: Hindi`**.
- [ ] Open voice modal and verify locale shows `hi-IN`.
- [ ] Speak in Hindi (e.g. *"सड़क पर बड़ा गड्ढा है"*).
- [ ] **Expected Result**: Transcript displays in Devanagari script.

---

### Step 3: Kannada (ಕನ್ನಡ) Voice Recognition
- [ ] Select **ಕನ್ನಡ (Kannada)** in the language selector.
- [ ] Check `/ask` page: Voice button displays **`Voice: Kannada`**.
- [ ] Open voice modal and verify locale shows `kn-IN`.
- [ ] Speak in Kannada (e.g. *"ನಮ್ಮ ಬೀದಿಯಲ್ಲಿ ಬೀದಿ ದೀಪಗಳು ಉರಿಯುತ್ತಿಲ್ಲ"*).
- [ ] **Expected Result**: Transcript displays in Kannada script.

---

### Step 4: Rapid Language Switching Test
- [ ] Open Voice modal with **Tamil** selected → record a short phrase.
- [ ] Change dropdown inside modal to **English (India)** → record *"Streetlight not working"*.
- [ ] Change dropdown to **Hindi** → record *"पानी की समस्या है"*.
- [ ] **Expected Result**: Each recording strictly reflects the newly selected locale and does not revert to English defaults.

---

### Step 5: Fallback & Error Handling Test (Safari / Non-Chrome Browsers)
- [ ] In Safari / Firefox where native Web Speech API may not support Indian locales:
  - Verify the modal shows: `"Browser speech recognition is not reliable for [Language]. Using Sarvam Multilingual Speech Recognition instead."`
  - Record audio → verify `/api/language/transcribe` (Sarvam STT `saaras:v3`) returns the accurate Indian-language transcript.
- [ ] Deny microphone permission → verify clear, localized message: `"Microphone access was denied. Please allow microphone permissions in your browser address bar to speak."`

---

## Issue Reporting Template (If Any Defect Encountered)
If any step fails, please report:
- **Browser & OS**: (e.g. Safari 18 on macOS Sequoia)
- **Selected Language**: (e.g. Tamil `ta-IN`)
- **Action Taken**: (Clicked microphone button / Spoke into mic)
- **Observed Behavior**: (No sound recorded / Error text shown / English text returned)
- **Error Message / Console Log**: (Exact message displayed)
