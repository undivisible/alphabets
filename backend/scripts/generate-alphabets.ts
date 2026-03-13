import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.resolve(process.cwd(), "public/data");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generate() {
  console.log("Generating all world alphabets from Unicode 15.1.0...");
  
  // Get all available scripts from the package
  const scriptDir = path.resolve(process.cwd(), "node_modules/@unicode/unicode-15.1.0/Script");
  const scripts = fs.readdirSync(scriptDir).filter(f => fs.statSync(path.join(scriptDir, f)).isDirectory());

  const languageDefinitions: any = {};
  const names = (await import("@unicode/unicode-15.1.0/Names/index.js")).default;

  for (const scriptName of scripts) {
    try {
      if (scriptName === "Common" || scriptName === "Inherited" || scriptName === "Unknown") continue;

      const data = (await import(`@unicode/unicode-15.1.0/Script/${scriptName}/code-points.js`)).default;
      
      const items = data.map((codePoint: number) => {
        const char = String.fromCodePoint(codePoint);
        const name = names.get(codePoint) || "";
        return {
          label: char,
          meta: name ? name.toLowerCase() : `U+${codePoint.toString(16).toUpperCase()}`,
          ipa: "" 
        };
      }).filter((item: any) => !item.meta.includes("<"));

      if (items.length === 0) continue;

      const id = scriptName.toLowerCase().replace(/_/g, "-");
      const fileName = `${id}.json`;
      
      // Save all characters, but we can truncate in the UI if needed
      fs.writeFileSync(
        path.join(OUTPUT_DIR, fileName),
        JSON.stringify(items, null, 2)
      );
      
      languageDefinitions[id] = {
        label: scriptName.replace(/_/g, " "),
        variants: [{ id: "main", label: "Characters" }]
      };
      
      console.log(`Generated ${fileName} with ${items.length} characters.`);
    } catch (e) {
      // console.error(`Failed to load script ${scriptName}`);
    }
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "manifest.json"),
    JSON.stringify(languageDefinitions, null, 2)
  );
  
  console.log(`Alphabet generation complete. Generated ${Object.keys(languageDefinitions).length} scripts.`);
}

generate().catch(console.error);
