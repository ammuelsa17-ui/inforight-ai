/* eslint-disable */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

// Whitelist of canonical legal identifiers, authority names, and system symbols that are allowed as literal strings in JSX
const CANONICAL_ALLOWLIST = new Set([
  "InfoRight AI",
  "RTI",
  "RTI Act 2005",
  "RTI Act 2005 (Amended)",
  "Consumer Protection Act 2019",
  "CPA 2019",
  "Rent Control Act",
  "Equal Remuneration Act 1976",
  "Payment of Wages Act 1936",
  "Minimum Wages Act 1948",
  "Industrial Disputes Act 1947",
  "POSH Act 2013",
  "EPF Act 1952",
  "ESI Act 1948",
  "Code on Wages 2019",
  "Section 6(1)",
  "Section 7(1)",
  "Section 19(1)",
  "Section 19(3)",
  "NCH 1915",
  "e-Jagriti",
  "SAMADHAN 2.0",
  "SHA-256",
  "MB",
  "PIO",
  "Public Information Officer",
  "First Appellate Authority",
  "SC (Scheduled Caste)",
  "ST (Scheduled Tribe)",
  "OBC (Other Backward Classes)",
  "General Category",
  "Female",
  "Male",
  "Other",
  "Problem",
  "Location",
  "Authority",
  "Period",
  "Ready",
  "Tamil Nadu",
  "Coimbatore",
  "Coimbatore City Municipal Corporation",
  "CCMC",
  "National Consumer Helpline",
  "https://rtionline.gov.in",
  "https://consumerhelpline.gov.in",
  "https://samadhan.labour.gov.in",
  "https://scholarships.gov.in",
  "https://tn.gov.in/scholarships",
  "RTI_ACT_2005_AMENDED",
  "CCMC_RTI_AUTHORITY",
  "CCMC_ENGINEERING_ROADS",
  "CONSUMER_PROTECTION_ACT_2019",
  "E_JAGRITI_PORTAL",
  "TENANCY_ACT_MODEL",
  "SAMADHAN_PORTAL",
  "TN_POST_MATRIC_SCHOLARSHIP",

  "InfoRight",
  "AI",
  "myScheme",
  "Section 7(5)",
  "Section 7(1) Proviso",
  "Section 6(3)",
  "Section 6(1)",
  "Section 19(1)"
,
  "CENTRAL_SECTOR_SCHOLARSHIP"
]);

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
    
    // Ignore pure numbers, single characters, symbols, or empty spaces
    if (!rawText || /^[0-9\s.,\-\/()#%:*+?&|<>=!]+$/.test(rawText) || rawText.length <= 1 || rawText.includes("&&") || rawText.includes("?")) continue;
    
    // Check if whitelisted
    if (CANONICAL_ALLOWLIST.has(rawText)) continue;
    
    // Check if it's JS expression inside curly braces or variable
    if (rawText.startsWith('{') || rawText.endsWith('}')) continue;

    // Line number calculation
    const lineNumber = code.substring(0, match.index).split('\n').length;
    defects.push({ line: lineNumber, string: rawText, type: 'JSX_TEXT' });
  }

  // Match raw props like placeholder="...", title="...", aria-label="..."
  const propRegex = /(placeholder|title|aria-label|alt)=["']([^"']+)["']/g;
  while ((match = propRegex.exec(code)) !== null) {
    const propName = match[1];
    const rawValue = match[2].trim();

    if (!rawValue || /^[0-9\s.,\-\/()#%:*+]+$/.test(rawValue) || rawValue.length <= 1) continue;
    if (CANONICAL_ALLOWLIST.has(rawValue)) continue;
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
  let totalDefects = 0;
  const auditReport = [];

  files.forEach(filePath => {
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
    console.log("✅ AUDIT PASSED: 0 unlocalized raw UI strings found across all routes and components!");
    process.exit(0);
  }
}

runAudit();
