import fs from "fs";
import path from "path";

export function extractCoreTranslationKeys(): string[] {
  const srcDir = path.join(process.cwd(), "src");

  // Recursively collect all tsx files in src/components and src/app
  function getTsxFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getTsxFiles(fullPath));
      } else if (file.endsWith(".tsx")) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const allTsxFiles = [
    ...getTsxFiles(path.join(srcDir, "components")),
    ...getTsxFiles(path.join(srcDir, "app"))
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

  return Array.from(foundKeys).sort();
}

if (process.argv[1] && process.argv[1].endsWith("extract-core-keys.ts")) {
  const keys = extractCoreTranslationKeys();
  console.log(`Extracted ${keys.length} unique t() translation keys from all UI components:`);
  console.log(JSON.stringify(keys, null, 2));
}
