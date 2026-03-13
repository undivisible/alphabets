import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  base: "./",
  root: "frontend",
  publicDir: "../backend/public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../"),
    },
  },
  build: {
    outDir: "../dist",
    assetsDir: "assets",
    emptyOutDir: true,
  }
});
