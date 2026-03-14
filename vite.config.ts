import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { compression } from "vite-plugin-compression2";
import path from "path";

export default defineConfig({
  root: "frontend",
  publicDir: path.resolve(__dirname, "public"),
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithm: "brotliCompress", exclude: [/\.(br)$/, /\.(gz)$/] }),
    visualizer({
      filename: path.resolve(__dirname, "dist/stats.html"),
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react";
          if (id.includes("node_modules/@radix-ui")) return "radix";
          if (id.includes("node_modules/cmdk")) return "cmdk";
        },
      },
    },
  },
});
