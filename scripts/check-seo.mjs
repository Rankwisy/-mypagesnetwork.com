// Crawls dist/ after the build and fails on broken on-page SEO basics:
// title, meta description, canonical, single H1, parseable JSON-LD, duplicates,
// internal links that point nowhere, inline scripts the CSP would block, and
// thin service/tool pages (< 600 words in <main>).
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = "dist";
const SITE = "https://mypagesnetwork.com";
const MIN_WORDS = 600;
const NOINDEX_OK = new Set(["/404/", "/thanks/"]);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

const toRoute = (file) => {
  const r = "/" + relative(DIST, file).split(sep).join("/");
  return r === "/404.html" ? "/404/" : r.replace(/index\.html$/, "");
};

const one = (html, re) => html.match(re)?.[1]?.trim() ?? "";
const errors = [];
const seen = { title: new Map(), description: new Map() };

const routeExists = (href) => {
  const path = decodeURI(href.split(/[?#]/)[0]);
  if (!path.startsWith("/")) return true;
  const file = join(DIST, path);
  return existsSync(file) && (statSync(file).isFile() || existsSync(join(file, "index.html")));
};

const pages = walk(DIST);
for (const file of pages) {
  const route = toRoute(file);
  const html = readFileSync(file, "utf8");
  const fail = (msg) => errors.push(`${route}: ${msg}`);

  const title = one(html, /<title>([^<]*)<\/title>/);
  const desc = one(html, /<meta name="description" content="([^"]*)"/);
  const canonical = one(html, /<link rel="canonical" href="([^"]*)"/);
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  const noindex = /<meta name="robots" content="noindex/.test(html);

  if (!title) fail("missing <title>");
  else if (title.length > 60) fail(`title over 60 chars (${title.length})`);
  if (!desc) fail("missing meta description");
  else if (desc.length > 155) fail(`meta description over 155 chars (${desc.length})`);
  if (h1s.length !== 1) fail(`expected 1 <h1>, found ${h1s.length}`);

  if (noindex) {
    if (!NOINDEX_OK.has(route)) fail("unexpected noindex");
  } else if (!canonical) fail("missing canonical");
  else if (canonical !== SITE + route) fail(`canonical ${canonical} != ${SITE + route}`);

  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length) fail("missing JSON-LD");
  for (const [, json] of ld) {
    try { JSON.parse(json); } catch (e) { fail(`invalid JSON-LD: ${e.message}`); }
  }

  for (const [tag] of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>/g)) {
    fail(`inline script blocked by CSP: ${tag}`);
  }

  for (const [, href] of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    if (href.startsWith("/") && !routeExists(href)) fail(`broken internal link ${href}`);
    if (href.startsWith("/") && !href.split(/[?#]/)[0].endsWith("/") && !/\.\w+$/.test(href.split(/[?#]/)[0])) fail(`link without trailing slash ${href}`);
  }
  if (/<img (?![^>]*\balt=)[^>]*>/.test(html)) fail("img without alt");

  if (/^\/(services|tools)\/[^/]+\/$/.test(route)) {
    const main = one(html, /<main[^>]*>([\s\S]*)<\/main>/).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
    const words = main.replace(/<[^>]+>/g, " ").split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
    if (words < MIN_WORDS) fail(`only ${words} words (min ${MIN_WORDS})`);
  }

  if (!noindex) {
    for (const [key, value] of [["title", title], ["description", desc]]) {
      const prev = seen[key].get(value);
      if (prev) fail(`duplicate ${key} with ${prev}`);
      else seen[key].set(value, route);
    }
  }
}

if (!existsSync(join(DIST, "sitemap-index.xml"))) errors.push("missing sitemap-index.xml");

if (errors.length) {
  console.error(`check-seo: ${errors.length} problem(s)\n` + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`check-seo: ${pages.length} pages passed`);
