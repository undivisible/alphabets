# Adding World Alphabets

To add "all the alphabets in the world," the application must shift from a hardcoded approach in `constants.ts` to a dynamic data-fetching or pre-compiled JSON build step.

## Proposed Data Sources
Instead of manually typing out characters, we can leverage open-source Unicode and ISO datasets:

1. **ISO 15924 (Script Codes):**
   - Source: [andyearnshaw/iso-15924](https://github.com/andyearnshaw/iso-15924) or `pycountry` databases.
   - Purpose: To get the definitive list of all writing systems (e.g., `Latn` for Latin, `Cyrl` for Cyrillic, `Arab` for Arabic).

2. **Unicode Character Database (UCD) JSON:**
   - Source: [iLib-js/UCD](https://github.com/iLib-js/UCD)
   - Purpose: To fetch the exact characters that belong to each script code defined in ISO 15924. By parsing the `Scripts.json` or `Blocks.json`, we can group characters by their native alphabet.

3. **CLDR (Common Locale Data Repository):**
   - Source: [unicode-org/cldr-json](https://github.com/unicode-org/cldr-json)
   - Purpose: To map languages to scripts (e.g., mapping the "Russian" language to the "Cyrillic" script subset).

## Implementation Strategy

### Step 1: Pre-computation Script
Because the full UCD is massive (megabytes of JSON), shipping it to the client is inefficient. Create a Node.js script (e.g., `scripts/generate-alphabets.js`) that runs during the build step:
1. Downloads the ISO 15924 script list.
2. Downloads the UCD Script definitions.
3. Maps them together, extracting only the essential metadata (Character, Latin Pronunciation/Name, IPA if available).
4. Outputs optimized JSON files into the `public/data/` directory (e.g., `public/data/cyrillic.json`, `public/data/georgian.json`).

### Step 2: Dynamic Loading in React
Update `App.tsx` to dynamically fetch these JSON files instead of reading from `LOCAL_DATA`.
```typescript
useEffect(() => {
  async function loadAlphabet() {
    const res = await fetch(`/data/${activeLanguage}.json`);
    const data = await res.json();
    setActiveItems(data);
  }
  loadAlphabet();
}, [activeLanguage]);
```

### Step 3: Handling IPA and Pronunciations
While Unicode provides character *names* (e.g., "LATIN SMALL LETTER A"), it does not universally provide IPA pronunciations. For missing IPA data, you can:
- Scrape Wikipedia data (using a parser like `wtf_wikipedia`) to map phonetic values.
- Rely on community-driven phonetic databases like [Wiktionary's pronunciation data](https://en.wiktionary.org/).
