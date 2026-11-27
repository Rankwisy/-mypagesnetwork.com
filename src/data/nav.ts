import { markets } from "./markets.ts";

export const mainNav = [
  { href: "/services/", label: "Services" },
  { href: "/tools/", label: "Free tools" },
  { href: "/markets/", label: "Markets" },
  { href: "/about/", label: "About" },
];

// Languages the routing is prepared for (see README, "Adding a language later").
export const SITE_LANGS = [
  { code: "en", label: "English", live: true },
  { code: "fr", label: "Français", live: false },
  { code: "nl", label: "Nederlands", live: false },
  { code: "es", label: "Español", live: false },
];

export const isearchtrends = (campaign: string) =>
  `https://isearchtrends.com/seo-tool?utm_source=mypagesnetwork&utm_medium=referral&utm_campaign=${campaign}`;

export const MARKETS = markets.map((m) => m.code);
