# Alphabets

A visually rich, interactive application for learning and tracking progress across different writing systems and alphabets.

## Features
- **Progress Tracking:** Keep track of characters you've learned.
- **Multiple Languages:** Currently supports Japanese (Hiragana, Katakana, Kanji), Arabic, Cyrillic, Thai, Devanagari, and Hebrew.
- **Customizable UI:** Toggle Latin pronunciation, IPA, dense layouts, and change accent colors.
- **Zoom Controls:** Dynamically scale the grid for better readability.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production (static)
npm run build
```

## Adding All World Alphabets
To expand the app to cover all writing systems globally, it is highly recommended *not* to hardcode them. Instead, utilize established JSON datasets:

1. **Unicode Character Database (UCD):** Contains every official character. Libraries like `iLib-js/UCD` or `datasets/unicode-characters` provide this in JSON format.
2. **CLDR (Common Locale Data Repository):** Provided by Unicode (`unicode-org/cldr-json`), this helps map languages to their respective scripts.
3. **ISO 15924:** Use this to get the names and classifications of writing systems (e.g., distinguishing between abjads, abugidas, and alphabets).

*See `docs/ADDING_ALPHABETS.md` for a deeper dive into the proposed architecture for dynamically fetching these.*

## AI Agent Instructions
This repository includes shared instructions for AI coding assistants. See `GEMINI.md` (which is also symlinked for Claude and GitHub Copilot) for the project's coding standards and architectural preferences.
