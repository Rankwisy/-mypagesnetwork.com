// Asserts the native tools build the exact Google URLs Isearchtrends builds.
// Runs first in `npm run build`; Node strips the TS types natively.
import assert from "node:assert/strict";
import { simulatorUrl, buildQuery, queryUrl, adMatrix } from "../src/lib/tools/google.ts";

const G = "https://www.google.com/search?";

// Google Search Simulator
assert.equal(simulatorUrl({ q: "running shoes", gl: "US", hl: "en" }), G + "q=running+shoes&gl=US&hl=en&num=10");
assert.equal(simulatorUrl({ q: "chaussures", gl: "FR", hl: "fr", num: 50, safe: true }), G + "q=chaussures&gl=FR&hl=fr&num=50&safe=active");
assert.equal(simulatorUrl({ q: "  ", gl: "DE", hl: "de" }), null);

// Search Query Builder
assert.equal(buildQuery({ searchQuery: "seo tips", site: "example.com", fileType: "pdf" }), "seo tips site:example.com filetype:pdf");
assert.equal(
  buildQuery({ exactPhrase: "write for us", exclude: "jobs", or: "guest  post contributor", daterange: "2459000-2459365" }),
  '"write for us" -jobs guest | post | contributor daterange:2459000-2459365',
);
assert.equal(buildQuery({ backlink: "blog.com mysite.com", inAnchor: "seo" }), "inanchor:seo site:blog.com link:mysite.com");
assert.equal(queryUrl('intitle:"seo" site:a.com'), G + "q=intitle%3A%22seo%22+site%3Aa.com");
assert.equal(queryUrl(""), null);

// Google Ads Preview A/B test
const vars = [{ headline: "Fast Shoes Sale", description: "" }, { headline: "", description: "skipped" }, { headline: "Buy Now & Save", description: "" }];
const tests = [{ location: "US", device: "desktop" }, { location: "GB", device: "mobile" }];
const m = adMatrix(vars, tests);
assert.equal(m.length, 4);
assert.equal(m[0].url, G + "q=Fast+Shoes+Sale&gl=US");
assert.equal(m[3].url, G + "q=Buy+Now+%26+Save&gl=GB");
assert.deepEqual(adMatrix([{ headline: "", description: "" }], tests), []);

console.log("check-tools: all tool URL checks passed");
