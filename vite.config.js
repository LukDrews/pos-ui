import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: __dirname,
  base: "./",
  build: {
    minify: "esbuild",
    target: "esnext",
    outDir: "../../dist/renderer",
    emptyOutDir: true,
  },
  server: { port: 8080, strictPort: true },
});
