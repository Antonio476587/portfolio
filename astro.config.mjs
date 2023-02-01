import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";

export default defineConfig({
  outDir: "./dist/astro",
//   output: "server",
//   adapter: deno()
});