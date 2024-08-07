import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  outDir: "./dist/astro",
  build: {
    out: "dist"
  },
  srcDir: "src",
  plugins: [{
    // Handle React components
    package: "@astrojs/renderer-react"
  }],
  integrations: [react(), vue()]
});