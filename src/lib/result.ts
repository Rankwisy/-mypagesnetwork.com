const SITE_HOST = "mypagesnetwork.com";

/** "/services/local-seo/" -> "mypagesnetwork.com › services › local-seo"; external URLs keep their host. */
export function pathLine(href: string): string {
  const url = new URL(href, `https://${SITE_HOST}`);
  const segs = url.pathname.split("/").filter(Boolean);
  return [url.host.replace(/^www\./, ""), ...segs].join(" › ");
}

/** Splits text into parts, flagging case-insensitive whole-word matches of any term. */
export function highlight(text: string, terms: string[]): { text: string; hit: boolean }[] {
  const clean = terms.map((t) => t.trim()).filter(Boolean);
  if (!clean.length) return [{ text, hit: false }];
  const esc = [...clean].sort((a, b) => b.length - a.length).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`\\b(${esc.join("|")})\\b`, "gi");
  // split() with one capture group puts the matches at odd indexes.
  return text.split(re).map((s, i) => ({ text: s, hit: i % 2 === 1 })).filter((p) => p.text);
}
