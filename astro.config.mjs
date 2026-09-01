import { defineConfig } from "astro/config";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import deno from "@deno/astro-adapter";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// ponytail: safety net — rewrites any remaining @assets/media/* url() refs to root-relative
// /media/* paths, which Vite skips during build. Runtime redirect handled by src/pages/media/[...path].ts
const rewriteMediaUrls = {
  postcssPlugin: "rewrite-media-urls",
  Declaration(decl) {
    if (!decl.value.includes("@assets/media/")) return;
    decl.value = decl.value.replace(
      /url\(["']?@assets\/media\/([^"')]+)["']?\)/g,
      (_, p) => `url("/media/${p}")`
    );
  },
};

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: deno(),
  integrations: [
    react(),
    vue(),
    mdx(),
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: "eu",
      },
      components: {
        page: "storyblok/Page",
        grid: "storyblok/Grid",
        feature: "storyblok/Feature",
        teaser: "storyblok/Teaser",
        banner: "storyblok/Banner",
        gallery: "storyblok/Gallery",
        caseStudy: "storyblok/CaseStudy",
        classic: "storyblok/Classic",
        landingContent: "storyblok/LandingContent",
        cardItem: "storyblok/CardItem",
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      postcss: {
        plugins: [rewriteMediaUrls, postcssImport(), autoprefixer()],
      },
    },
    resolve: {
      alias: {
        "@assets": new URL("./assets", import.meta.url).pathname,
      },
    },
  },
});
