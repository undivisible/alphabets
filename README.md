# Alphabets

An interactive, visually rich application for learning and tracking progress across the world's writing systems. Explore everything from common alphabets to rare Unicode scripts.

## 🚀 Features

- **Progress Tracking:** Interactive glyph tiles to mark and track learned characters.
- **Global Coverage:** Support for major scripts (Japanese, Cyrillic, Devanagari, etc.) and a vast collection of Unicode scripts.
- **Customizable Experience:** 
    - Toggle Latin pronunciation and IPA.
    - Adjustable grid scaling and dense layouts.
    - Themeable accent colors.
- **Mobile Ready:** Built with Capacitor for seamless performance on iOS and Android.
- **Automated Data:** Scripts to generate alphabet data directly from Unicode standards.

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v4 + Radix UI
- **Mobile:** Capacitor (iOS & Android)
- **Runtime:** Bun (preferred for scripts and package management)
- **Architecture:** Static build with asynchronous data fetching for performance.

## 📦 Project Structure

```text
├── backend/          # Data generation scripts and source assets
│   └── scripts/      # Bun/TypeScript scripts to build alphabet JSONs
├── docs/             # Detailed guides (e.g., ADDING_ALPHABETS.md)
├── frontend/         # React source code (Equilibrium & standard React)
├── public/           # Static assets
│   └── data/         # Generated alphabet JSON files (git-ignored/generated)
└── package.json      # Project configuration and scripts
```

## 🚦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- (Optional) Xcode/Android Studio for mobile development.

### Installation

```bash
bun install
```

### Development

Run the development server (this will also generate the necessary alphabet data):

```bash
bun run dev
```

### Building for Production

To create a production-ready static build:

```bash
bun run build
```

### Mobile Development

Sync the web build to mobile platforms:

```bash
bun run sync
bun run open:ios      # Opens in Xcode
bun run open:android  # Opens in Android Studio
```

## 📖 Data & Contributions

The alphabet data is dynamically generated to ensure accuracy and reduce bundle size. 

- **Adding Scripts:** To add or modify writing systems, see [docs/ADDING_ALPHABETS.md](docs/ADDING_ALPHABETS.md).
- **Core Instructions:** AI-specific coding standards are maintained in [GEMINI.md](GEMINI.md).

---

