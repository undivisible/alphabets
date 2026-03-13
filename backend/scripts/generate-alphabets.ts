import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.resolve(process.cwd(), "public/data");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Define specific language groups to avoid scripts being standalone languages
const LANGUAGE_GROUPS: Record<string, { label: string, scripts: string[] }> = {
  "japanese": {
    label: "Japanese",
    scripts: ["Hiragana", "Katakana", "Han"]
  },
  "korean": {
    label: "Korean",
    scripts: ["Hangul"]
  },
  "chinese": {
    label: "Chinese",
    scripts: ["Han"] // Overlaps with Japanese but categorized here for simplicity
  },
  "latin-base": {
    label: "Latin / English",
    scripts: ["Latin"]
  }
};

async function generate() {
  console.log("Generating organized world alphabets from Unicode 15.1.0...");
  
  const scriptDir = path.resolve(process.cwd(), "node_modules/@unicode/unicode-15.1.0/Script");
  const scriptNames = fs.readdirSync(scriptDir).filter(f => fs.statSync(path.join(scriptDir, f)).isDirectory());

  const names = (await import("@unicode/unicode-15.1.0/Names/index.js")).default;
  const scriptData: Record<string, any[]> = {};

  for (const scriptName of scriptNames) {
    if (["Common", "Inherited", "Unknown"].includes(scriptName)) continue;

    try {
      const data = (await import(`@unicode/unicode-15.1.0/Script/${scriptName}/code-points.js`)).default;
      
      const items = data.map((codePoint: number) => {
        const char = String.fromCodePoint(codePoint);
        const name = names.get(codePoint) || "";
        return {
          label: char,
          meta: name ? name.toLowerCase() : `U+${codePoint.toString(16).toUpperCase()}`,
          ipa: "" 
        };
      })
      .filter((item: any) => !item.meta.includes("<"))
      // Sort items by metadata (alphabetical)
      .sort((a: any, b: any) => a.meta.localeCompare(b.meta));

      if (items.length > 0) {
        scriptData[scriptName] = items;
      }
    } catch (e) {}
  }

  const manifest: Record<string, any> = {};

  // 1. Process defined language groups
  for (const [langId, group] of Object.entries(LANGUAGE_GROUPS)) {
    manifest[langId] = {
      label: group.label,
      variants: group.scripts.map(s => ({
        id: s.toLowerCase().replace(/_/g, "-"),
        label: s
      }))
    };

    // Save each script in the group
    for (const scriptName of group.scripts) {
      if (scriptData[scriptName]) {
        const id = scriptName.toLowerCase().replace(/_/g, "-");
        fs.writeFileSync(
          path.join(OUTPUT_DIR, `${langId}-${id}.json`),
          JSON.stringify(scriptData[scriptName], null, 2)
        );
      }
    }
  }

  // 2. Add everything else as standalone
  const groupedScripts = new Set(Object.values(LANGUAGE_GROUPS).flatMap(g => g.scripts));
  const otherScripts = Object.keys(scriptData).filter(s => !groupedScripts.has(s)).sort();

  for (const scriptName of otherScripts) {
    const langId = scriptName.toLowerCase().replace(/_/g, "-");
    const variantId = "main";
    
    manifest[langId] = {
      label: scriptName.replace(/_/g, " "),
      variants: [{ id: variantId, label: "Characters" }]
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${langId}-${variantId}.json`),
      JSON.stringify(scriptData[scriptName], null, 2)
    );
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log(`Generation complete. Grouped ${Object.keys(manifest).length} entries.`);
}

generate().catch(console.error);
