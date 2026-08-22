import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "src");
const coreFiles = [
  "components/Navbar.tsx",
  "components/AccessibilityToolbar.tsx",
  "app/page.tsx",
  "app/ask/page.tsx",
  "app/dashboard/page.tsx",
  "app/resources/page.tsx",
  "components/location/LocationMap.tsx",
  "components/location/AdministrativeDetailsPanel.tsx",
  "components/Feedback.tsx"
];

const foundKeys = new Set<string>();
const tRegex = /\bt\(\s*["']([a-zA-Z0-9_.]+)["']\s*\)/g;

for (const f of coreFiles) {
  const fullPath = path.join(srcDir, f);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, "utf8");
    let match;
    while ((match = tRegex.exec(content)) !== null) {
      foundKeys.add(match[1]);
    }
  }
}

console.log(`Found ${foundKeys.size} unique core t() keys in journey components:`);
console.log(JSON.stringify(Array.from(foundKeys).sort(), null, 2));
