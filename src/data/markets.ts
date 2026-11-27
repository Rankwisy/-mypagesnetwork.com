// The 20 markets we work in. `gl` is Google's country code (UK is GB),
// `langs[0]` is the interface language used for the localized search URL.
export interface Market {
  code: string;
  gl: string;
  flag: string;
  name: string;
  langs: { code: string; name: string }[];
}

const L = {
  en: { code: "en", name: "English" }, fr: { code: "fr", name: "French" },
  es: { code: "es", name: "Spanish" }, de: { code: "de", name: "German" },
  nl: { code: "nl", name: "Dutch" }, it: { code: "it", name: "Italian" },
  pt: { code: "pt", name: "Portuguese" }, pl: { code: "pl", name: "Polish" },
  sv: { code: "sv", name: "Swedish" }, hi: { code: "hi", name: "Hindi" },
};

const m = (code: string, name: string, langs: Market["langs"], gl = code): Market =>
  ({ code, gl, flag: gl.toLowerCase(), name, langs });

export const markets: Market[] = [
  m("US", "United States", [L.en, L.es]),
  m("UK", "United Kingdom", [L.en], "GB"),
  m("CA", "Canada", [L.en, L.fr]),
  m("AU", "Australia", [L.en]),
  m("IE", "Ireland", [L.en]),
  m("FR", "France", [L.fr]),
  m("BE", "Belgium", [L.nl, L.fr]),
  m("CH", "Switzerland", [L.de, L.fr, L.it]),
  m("ES", "Spain", [L.es]),
  m("MX", "Mexico", [L.es]),
  m("DE", "Germany", [L.de]),
  m("AT", "Austria", [L.de]),
  m("NL", "Netherlands", [L.nl]),
  m("IT", "Italy", [L.it]),
  m("PT", "Portugal", [L.pt]),
  m("BR", "Brazil", [L.pt]),
  m("PL", "Poland", [L.pl]),
  m("SE", "Sweden", [L.sv]),
  m("IN", "India", [L.en, L.hi]),
  m("ZA", "South Africa", [L.en]),
];

/** Languages we write and review content in ourselves. */
export const IN_HOUSE_LANGS = new Set(["en", "fr", "es", "nl"]);

export const HERO_MARKETS = ["US", "UK", "FR", "DE", "ES", "NL", "IT", "BE"].map(
  (c) => markets.find((x) => x.code === c)!,
);
