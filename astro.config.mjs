// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

import icon from "astro-icon";

export default defineConfig({
  site: "https://www.monymtz.com/",
  output: "server",
  adapter: netlify({
    imageCDN: false,
  }),

  integrations: [
    react(),
    icon(),
    robotsTxt(),
    sitemap({
      filter: (page) => !page.includes("/api/"),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
