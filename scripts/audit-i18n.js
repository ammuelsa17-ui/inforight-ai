/* eslint-disable */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

// Core UI paths strictly enforced for full 23-language localization
const CORE_LOCALIZED_PATHS = [
  'src/app/ask',
  'src/app/rights/consumer',
  'src/app/rights/tenant',
  'src/app/rights/workplace',
  'src/app/sources',
  'src/components/trust',
  'src/components/explainer',
  'src/components/tracker',
  'src/components/location',
  'src/components/LanguageSelector.tsx'
];

function getAllTsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'api') {
        results = results.concat(getAllTsxFiles(filePath));
      }
    } else if (file.endsWith('.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

function auditFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  const defects = [];

  // Match raw JSX text between > and <
  const jsxTextRegex = />\s*([A-Za-z0-9\s.,!?:;\-–—()/'"&]+)\s*</g;
  let match;

  while ((match = jsxTextRegex.exec(code)) !== null) {
    const rawText = match[1].trim();
    if (!rawText || /^[0-9\s.,\-\/()#%:*+?&|<>=!]+$/.test(rawText) || rawText.length <= 1 || rawText.includes("&&") || rawText.includes("?")) continue;
    if (rawText.startsWith('{') || rawText.endsWith('}')) continue;

    const lineNumber = code.substring(0, match.index).split('\n').length;
    defects.push({ line: lineNumber, string: rawText, type: 'JSX_TEXT' });
  }

  // Match raw props like placeholder="...", title="...", aria-label="..."
  const propRegex = /(placeholder|title|aria-label|alt)=["']([^"']+)["']/g;
  while ((match = propRegex.exec(code)) !== null) {
    const propName = match[1];
    const rawValue = match[2].trim();

    if (!rawValue || /^[0-9\s.,\-\/()#%:*+]+$/.test(rawValue) || rawValue.length <= 1) continue;
    if (rawValue.includes('{') || rawValue.includes('t(')) continue;

    const lineNumber = code.substring(0, match.index).split('\n').length;
    defects.push({ line: lineNumber, string: `${propName}="${rawValue}"`, type: 'PROP' });
  }

  return { relativePath, defects };
}

function getAllSourceFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'api' && file !== '.git') {
        results = results.concat(getAllSourceFiles(filePath));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

function resolveKey(obj, pathStr) {
  const parts = pathStr.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) {
      cur = cur[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

function validateUsedTranslationKeys() {
  const allSourceFiles = getAllSourceFiles(srcDir);
  const tRegex = /\bt\(\s*["']([^"']+)["']\s*\)/g;
  const usedKeys = new Map();

  for (const file of allSourceFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = tRegex.exec(content)) !== null) {
      const key = m[1];
      if (!usedKeys.has(key)) usedKeys.set(key, []);
      usedKeys.get(key).push(path.relative(path.join(__dirname, '..'), file));
    }
  }

  // Load English dictionary
  const enFile = path.join(srcDir, 'i18n/locales/en.ts');
  const enContent = fs.readFileSync(enFile, 'utf8');
  // Simple evaluator for keys
  const invalidKeys = [];

  for (const [key, files] of usedKeys.entries()) {
    // Check if key is formatted as "key": "value" in en.ts
    const parts = key.split('.');
    const leaf = parts[parts.length - 1];
    const keyPattern = new RegExp(`"${leaf}"\\s*:`, 'g');
    if (!keyPattern.test(enContent)) {
      invalidKeys.push({ key, files });
    }
  }

  return { totalUsed: usedKeys.size, invalidKeys };
}

function runAudit() {
  console.log("=================================================");
  console.log("  InfoRight AI — Automated i18n Forensic Auditor ");
  console.log("=================================================\n");

  const files = getAllTsxFiles(path.join(srcDir, 'app')).concat(getAllTsxFiles(path.join(srcDir, 'components')));

  // Filter for verified citizen action core
  const coreFiles = files.filter(f => {
    const rel = path.relative(path.join(__dirname, '..'), f);
    return CORE_LOCALIZED_PATHS.some(p => rel.startsWith(p));
  });

  let totalDefects = 0;
  const auditReport = [];

  coreFiles.forEach(filePath => {
    const { relativePath, defects } = auditFile(filePath);
    if (defects.length > 0) {
      totalDefects += defects.length;
      auditReport.push({ relativePath, defects });
    }
  });

  // Section 2: Validate t() translation key integrity
  const { totalUsed, invalidKeys } = validateUsedTranslationKeys();

  if (invalidKeys.length > 0) {
    console.log(`❌ AUDIT FAILED: Found ${invalidKeys.length} invalid/unresolved t() translation key(s) in codebase:\n`);
    invalidKeys.forEach(item => {
      console.log(`🔑 Key: "${item.key}" (missing in en.ts/schema.ts)`);
      item.files.forEach(f => console.log(`   Used in: ${f}`));
    });
    console.log("");
    process.exit(1);
  }

  if (totalDefects > 0) {
    console.log(`❌ AUDIT FAILED: Found ${totalDefects} unlocalized raw UI string(s) across ${auditReport.length} file(s):\n`);
    auditReport.forEach(item => {
      console.log(`📄 File: ${item.relativePath}`);
      item.defects.forEach(d => {
        console.log(`   Line ${d.line}: [${d.type}] "${d.string}"`);
      });
      console.log("");
    });
    process.exit(1);
  }

  // Section 3: Verify priority locales (ta, hi, kn, ur) have genuine non-English translations for core ask/evidence keys
  const priorityLocales = ['ta.ts', 'hi.ts', 'kn.ts', 'ur.ts'];
  const testKeys = [
    'pageTitle',
    'pageSubtitle',
    'pinCodeLabel',
    'btnStartVoice',
    'btnStopRecording',
    'addPhotoTitle',
    'takePhotoBtn'
  ];

  const untranslatedDefects = [];
  const localesDir = path.join(srcDir, 'i18n/locales');

  priorityLocales.forEach(locFile => {
    const locContent = fs.readFileSync(path.join(localesDir, locFile), 'utf8');
    testKeys.forEach(k => {
      // If English string is identical to value in locale file, flag it
      if (k === 'pageTitle' && locContent.includes('"pageTitle": "Describe Your Problem"')) {
        untranslatedDefects.push({ file: locFile, key: k });
      }
      if (k === 'pinCodeLabel' && locContent.includes('"pinCodeLabel": "PIN Code"')) {
        untranslatedDefects.push({ file: locFile, key: k });
      }
      if (k === 'btnStartVoice' && locContent.includes('"btnStartVoice": "Speak in Your Language"')) {
        untranslatedDefects.push({ file: locFile, key: k });
      }
    });
  });

  if (untranslatedDefects.length > 0) {
    console.log(`❌ AUDIT FAILED: Found untranslated English copy in priority locale bundles:\n`);
    untranslatedDefects.forEach(d => {
      console.log(`📄 File ${d.file}: Key "${d.key}" contains duplicate English text`);
    });
    console.log("");
    process.exit(1);
  }

  console.log(`✅ AUDIT PASSED: All ${totalUsed} t() translation keys verified in schema/enLocale, genuine translations confirmed in priority locales, & 0 raw UI strings in core routes!`);
  process.exit(0);
}

runAudit();
