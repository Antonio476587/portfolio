import { defineConfig } from "astro/config";
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
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
