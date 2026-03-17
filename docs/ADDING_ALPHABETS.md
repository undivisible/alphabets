# Adding World Alphabets

The application uses a two-tier data system: **local curated data** for core alphabets (Japanese, Arabic, Thai, Devanagari, Hebrew) in `frontend/src/data/constants.ts`, and **auto-generated data** for all other Unicode scripts via `backend/scripts/generate-alphabets.ts`.

## Architecture

### Local Data (`constants.ts`)
Core alphabets with hand-curated IPA pronunciations and grid layouts live in `LOCAL_DATA` and `GROUPED_VARIANTS`. These are bundled with the app for instant loading.

### Generated Data (`generate-alphabets.ts`)
All other Unicode 15.1.0 scripts are auto-generated at build time into `public/data/` as individual JSON files. A `manifest.json` index is also generated so the frontend can discover available scripts dynamically.

## Adding a New Core Alphabet (with IPA)

1. Add character data to `LOCAL_DATA` in `frontend/src/data/constants.ts`:
   ```typescript
   export const LOCAL_DATA: any = {
     // ...existing data
     newScript: {
       letters: [
         { label: "A", meta: "a", ipa: "a" },
         // ...
       ],
     },
   };
   ```

2. Add language definition to `LANGUAGE_DEFINITIONS`:
   ```typescript
   newScript: { label: "New Script", variants: [{ id: "letters", label: "Letters" }] },
   ```

3. Optionally add grid layout in `GROUPED_VARIANTS` or row shape in `ROW_SHAPES`.

## Adding a Script to the Auto-Generated System

Scripts are automatically included from the `@unicode/unicode-15.1.0` npm package. To customize:

- **Ignore a script**: Add it to `IGNORE_SCRIPTS` in `generate-alphabets.ts`
- **Promote to major script** (gets its own top-level entry): Add to `MAJOR_SCRIPTS`
- **Add language-specific variants** (like Cyrillic→Russian/Ukrainian): Add to `SPECIAL_GROUPS` with custom character sets

## Build Process

```bash
bun run generate   # Generates public/data/*.json from Unicode data
bun run build      # Runs generate + Vite production build
```

The generation script:
1. Reads all scripts from `@unicode/unicode-15.1.0`
2. Filters to base letter characters (excluding modifiers, marks, symbols)
3. Limits each script to 120 characters
4. Outputs individual JSON files and a `manifest.json` index

## Data File Format

Each generated JSON file contains an array of:
```json
[
  { "label": "α", "meta": "greek small letter alpha" }
]
```

Local data additionally includes an `ipa` field with pronunciation.
