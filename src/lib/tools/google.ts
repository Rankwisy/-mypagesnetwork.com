// URL-building logic for the native tools, ported from isearchtrends.com so both
// sites produce identical Google URLs. Pure functions: used by the browser islands
// and by scripts/check-tools.mjs.

export const GOOGLE_SEARCH = "https://www.google.com/search";

export const COUNTRIES = [
  ["US", "United States"], ["GB", "United Kingdom"], ["CA", "Canada"],
  ["AU", "Australia"], ["DE", "Germany"], ["FR", "France"], ["ES", "Spain"],
  ["IT", "Italy"], ["JP", "Japan"], ["IN", "India"], ["BR", "Brazil"],
  ["MX", "Mexico"], ["NL", "Netherlands"], ["SE", "Sweden"], ["SG", "Singapore"],
  ["BE", "Belgium"], ["CH", "Switzerland"], ["AT", "Austria"], ["NO", "Norway"],
  ["DK", "Denmark"], ["FI", "Finland"], ["PL", "Poland"], ["IE", "Ireland"],
  ["NZ", "New Zealand"], ["ZA", "South Africa"], ["AR", "Argentina"],
] as const;

export const LANGUAGES = [
  ["en", "English"], ["es", "Spanish"], ["fr", "French"], ["de", "German"],
  ["it", "Italian"], ["pt", "Portuguese"], ["ja", "Japanese"], ["zh", "Chinese"],
] as const;

export const DEVICES = ["desktop", "tablet", "mobile"] as const;

// The Ads A/B tool offers a shorter list of markets, as on Isearchtrends.
export const AD_COUNTRIES = COUNTRIES.slice(0, 10);

export const HEADLINE_MAX = 30;
export const DESCRIPTION_MAX = 90;

export interface SimulatorInput {
  q: string;
  gl: string;
  hl: string;
  num?: number;
  safe?: boolean;
}

/** Google search as seen from a country (gl) in a language (hl). Empty query -> null. */
export function simulatorUrl({ q, gl, hl, num = 10, safe = false }: SimulatorInput): string | null {
  if (!q.trim()) return null;
  const p = new URLSearchParams({ q, gl, hl, num: String(num) });
  if (safe) p.append("safe", "active");
  return `${GOOGLE_SEARCH}?${p}`;
}

export const QUERY_FIELDS = [
  "searchQuery", "site", "inTitle", "inUrl", "fileType", "plus", "exactPhrase",
  "exclude", "or", "daterange", "link", "inAnchor", "allInAnchor", "inPostTitle",
  "define", "cache", "ext", "backlink",
] as const;

export type QueryField = (typeof QUERY_FIELDS)[number];
export type QueryInput = Partial<Record<QueryField, string>>;

/** Concatenates Google operators in the same order and syntax as Isearchtrends. */
export function buildQuery(f: QueryInput): string {
  let q = f.searchQuery ?? "";
  if (f.site) q += ` site:${f.site}`;
  if (f.inTitle) q += ` intitle:${f.inTitle}`;
  if (f.inUrl) q += ` inurl:${f.inUrl}`;
  if (f.fileType) q += ` filetype:${f.fileType}`;
  if (f.plus) q += ` +${f.plus}`;
  if (f.exactPhrase) q += ` "${f.exactPhrase}"`;
  if (f.exclude) q += ` -${f.exclude}`;
  if (f.or) q += ` ${f.or.replace(/\s+/g, " | ")}`;
  if (f.daterange) q += ` daterange:${f.daterange}`;
  if (f.link) q += ` link:${f.link}`;
  if (f.inAnchor) q += ` inanchor:${f.inAnchor}`;
  if (f.allInAnchor) q += ` allinanchor:${f.allInAnchor}`;
  if (f.inPostTitle) q += ` inposttitle:${f.inPostTitle}`;
  if (f.define) q += ` define:${f.define}`;
  if (f.cache) q += ` cache:${f.cache}`;
  if (f.ext) q += ` ext:${f.ext}`;
  if (f.backlink) {
    const [source = "", target = ""] = f.backlink.split(" ");
    q += ` site:${source} link:${target}`;
  }
  return q.trim();
}

export function queryUrl(query: string): string | null {
  return query ? `${GOOGLE_SEARCH}?${new URLSearchParams({ q: query })}` : null;
}

export interface AdVariation { headline: string; description: string }
export interface AdTest { location: string; device: string }
export interface AdCell { variation: number; test: number; url: string }

/** One Google URL per (variation with a headline) x (location/device test). */
export function adMatrix(variations: AdVariation[], tests: AdTest[]): AdCell[] {
  return variations.flatMap((v, vi) =>
    v.headline
      ? tests.map((t, ti) => ({
          variation: vi,
          test: ti,
          url: `${GOOGLE_SEARCH}?${new URLSearchParams({ q: v.headline, gl: t.location })}`,
        }))
      : [],
  );
}
