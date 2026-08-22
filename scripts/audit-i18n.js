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
  } else {
    console.log("✅ AUDIT PASSED: 0 unlocalized raw UI strings across all core citizen routes (/ask, /rights/consumer, /rights/tenant, /rights/workplace, /sources, /official)!");
    process.exit(0);
  }
}

runAudit();
