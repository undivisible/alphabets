import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.resolve(process.cwd(), "public/data");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Special groupings for known multi-script languages
const SPECIAL_GROUPS: Record<string, { label: string, scripts: string[] }> = {
  "japanese": { label: "Japanese", scripts: ["Hiragana", "Katakana"] },
  "korean": { label: "Korean", scripts: ["Hangul"] },
};

// Scripts to ignore completely (too large or non-linguistic)
const IGNORE_SCRIPTS = ["Common", "Inherited", "Unknown", "Han", "Tangut", "Nushu", "Khitan_Small_Script"];

async function generate() {
  console.log("Generating ALL world alphabets from Unicode 15.1.0...");
  
  const scriptDir = path.resolve(process.cwd(), "node_modules/@unicode/unicode-15.1.0/Script");
  const scriptNames = fs.readdirSync(scriptDir).filter(f => fs.statSync(path.join(scriptDir, f)).isDirectory());
  const names = (await import("@unicode/unicode-15.1.0/Names/index.js")).default;

  const manifest: Record<string, any> = {};
  const processedScripts = new Set<string>();

  // 1. Process Special Groups first
  for (const [langId, info] of Object.entries(SPECIAL_GROUPS)) {
    const variants = [];
    for (const scriptName of info.scripts) {
      const items = await processScript(scriptName, names);
      if (items.length > 0) {
        const variantId = scriptName.toLowerCase().replace(/_/g, "-");
        fs.writeFileSync(path.join(OUTPUT_DIR, `${langId}-${variantId}.json`), JSON.stringify(items, null, 2));
        variants.push({ id: variantId, label: scriptName.replace(/_/g, " ") });
        processedScripts.add(scriptName);
      }
    }
    // Add Kanji placeholder for Japanese
    if (langId === "japanese") variants.push({ id: "kanji", label: "Kanji" });
    
    if (variants.length > 0) {
      manifest[langId] = { label: info.label, variants };
    }
  }

  // 2. Process all remaining scripts
  for (const scriptName of scriptNames) {
    if (processedScripts.has(scriptName) || IGNORE_SCRIPTS.includes(scriptName)) continue;

    const items = await processScript(scriptName, names);
    if (items.length > 0) {
      const langId = scriptName.toLowerCase().replace(/_/g, "-");
      const variantId = "main";
      fs.writeFileSync(path.join(OUTPUT_DIR, `${langId}-${variantId}.json`), JSON.stringify(items, null, 2));
      
      manifest[langId] = {
        label: scriptName.replace(/_/g, " "),
        variants: [{ id: variantId, label: "Characters" }]
      };
    }
  }

  // Sort manifest by label alphabetically
  const sortedManifest = Object.fromEntries(
    Object.entries(manifest).sort(([, a], [, b]) => a.label.localeCompare(b.label))
  );

  fs.writeFileSync(path.join(OUTPUT_DIR, "manifest.json"), JSON.stringify(sortedManifest, null, 2));
  console.log(`Generation complete. Total languages in manifest: ${Object.keys(sortedManifest).length}`);
}

async function processScript(scriptName: string, namesMap: any) {
  try {
    const data = (await import(`@unicode/unicode-15.1.0/Script/${scriptName}/code-points.js`)).default;
    const items = data.map((codePoint: number) => {
      const char = String.fromCodePoint(codePoint);
      const name = namesMap.get(codePoint) || "";
      return {
        label: char,
        meta: name ? name.toLowerCase() : `U+${codePoint.toString(16).toUpperCase()}`,
        ipa: ""
      };
    })
    .filter((item: any) => {
      const m = item.meta;
      // Strict filter for "base" alphabet characters
      return !m.includes("digit") && 
             !m.includes("accent") && 
             !m.includes("mark") && 
             !m.includes("symbol") && 
             !m.includes("punctuation") &&
             !m.includes("sign") &&
             !m.includes("variation") &&
             !m.includes("<");
    })
    .sort((a: any, b: any) => a.meta.localeCompare(b.meta));

    // Limit to first 120 curated characters to keep it manageable
    return items.slice(0, 120);
  } catch (e) {
    return [];
  }
}

generate().catch(console.error);
