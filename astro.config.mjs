import { defineConfig } from "astro/config";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import deno from "@astrojs/deno";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

const env = loadEnv("", process.cwd(), "STORYBLOK");
const { STORYBLOK_DELIVERY_API_TOKEN } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "",
);

const firebaseBase =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-personal-df7a4.appspot.com/o/";

// ponytail: PostCSS plugin — runs after SASS compiles resolveUrl() to @assets/media/* strings,
// before Vite tries to resolve them as local files.
const rewriteFirebaseAssets = {
  postcssPlugin: "rewrite-firebase-assets",
  Declaration(decl) {
    if (!decl.value.includes("@assets/media/")) return;
    decl.value = decl.value.replace(
      /url\(["']?@assets\/media\/([^"')]+)["']?\)/g,
      (_, p) => `url("${firebaseBase}${p.replace(/\//g, "%2F")}?alt=media")`
    );
  },
};
rewriteFirebaseAssets.postcss = true;

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
        plugins: [rewriteFirebaseAssets, postcssImport(), autoprefixer()],
      },
    },
    resolve: {
      alias: {
        "@assets": new URL("./assets", import.meta.url).pathname,
      },
    },
  },
});
