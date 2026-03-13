import { expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";

test("build artifacts exist", () => {
  const distDir = path.resolve(process.cwd(), "dist");
  expect(fs.existsSync(path.join(distDir, "main.js"))).toBe(true);
  expect(fs.existsSync(path.join(distDir, "main.css"))).toBe(true);
  expect(fs.existsSync(path.join(distDir, "data/manifest.json"))).toBe(true);
});

test("css is processed by tailwind", () => {
  const cssPath = path.resolve(process.cwd(), "dist/main.css");
  const content = fs.readFileSync(cssPath, "utf-8");
  // Check for tailwind variables or typical output
  expect(content).toContain("--font-sans");
  expect(content).not.toContain("@import \"tailwindcss\"");
});
