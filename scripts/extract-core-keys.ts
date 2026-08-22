import fs from "fs";
import path from "path";

export function extractCoreTranslationKeys(): string[] {
  const srcDir = path.join(process.cwd(), "src");

  // Recursively collect all tsx and ts files in src/components, src/app, and src/context
  function getTsxFiles(dir: string): string[] {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getTsxFiles(fullPath));
      } else if (file.endsWith(".tsx") || (file.endsWith(".ts") && !file.includes("locales"))) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const allTsxFiles = [
    ...getTsxFiles(path.join(srcDir, "components")),
    ...getTsxFiles(path.join(srcDir, "app")),
    ...getTsxFiles(path.join(srcDir, "context")),
    ...getTsxFiles(path.join(srcDir, "lib"))
  ];

  const foundKeys = new Set<string>();
  const tRegex = /\bt\(\s*["']([a-zA-Z0-9_.]+)["']\s*\)/g;

  for (const f of allTsxFiles) {
    const content = fs.readFileSync(f, "utf8");
    let match;
    while ((match = tRegex.exec(content)) !== null) {
      foundKeys.add(match[1]);
    }
  }

  // Also include essential common keys that are part of core user actions
  const essentialCommonKeys = [
    "common.submit",
    "common.cancel",
    "common.save",
    "common.edit",
    "common.delete",
    "common.loading",
    "common.close",
    "common.backToHome"
  ];
  for (const k of essentialCommonKeys) {
    foundKeys.add(k);
  }

  return Array.from(foundKeys).sort();
}

if (process.argv[1] && process.argv[1].endsWith("extract-core-keys.ts")) {
  const keys = extractCoreTranslationKeys();
  console.log(`Extracted ${keys.length} statically discoverable t() keys in app/components:`);
  console.log(JSON.stringify(keys, null, 2));
}
