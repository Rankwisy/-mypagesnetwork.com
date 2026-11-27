import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE = "https://mypagesnetwork.com";
// Pages that must never appear in the sitemap.
const NOINDEX = ["/404/", "/thanks/"];

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  output: "static",
  build: { format: "directory" },
  compressHTML: true,
  // Keep every script external so the CSP can stay script-src 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
  // English only for now. Add "fr", "es", "nl" here, then src/pages/[lang]/... routes.
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-sans",
      provider: fontProviders.fontsource(),
      weights: [400, 700],
      styles: ["normal"],
      subsets: ["latin"],
      display: "swap",
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.some((p) => page === SITE + p),
    }),
  ],
});
