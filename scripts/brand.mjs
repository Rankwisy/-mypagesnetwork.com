// Generates favicons and the default OG image into public/.
// - Favicons: the "M" of the traced wordmark (public/brand/wordmark.svg), white on brand blue.
// - OG image: the white logo box of MYPAGES_Logo_Main.png, redrawn from the trace, centred on the logo's own gradient.
// Runs on every build; run alone with `npm run brand`.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import sharp from "sharp";

const BRAND = "#0F4392";
const GRADIENT = ["#0F4392", "#4A71AD"]; // sampled from the corners of MYPAGES_Logo_Main.png
const WORDMARK = "public/brand/wordmark.svg";

function faviconSvg(d) {
  const m = d.split(/(?=M)/)[0]; // first subpath is the "M": x 1.11-69.29, y 1.25-47
  const [x0, x1, y0, y1] = [1.11, 69.29, 1.25, 47];
  const s = 44 / (x1 - x0);
  const tx = (64 - 44) / 2 - x0 * s;
  const ty = (64 - (y1 - y0) * s) / 2 - y0 * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${BRAND}"/><path fill="#fff" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})" d="${m}"/></svg>`;
}

// ICO with one embedded 32x32 PNG (supported by every current browser).
function ico(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  header.writeUInt8(32, 6); header.writeUInt8(32, 7);
  header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

async function ogImage(d) {
  // The main logo's white box (396x99, radius 8, wordmark inset 20px) redrawn at 2x from the vector trace.
  const [bw, bh] = [792, 198];
  const [bx, by] = [(1200 - bw) / 2, (630 - bh) / 2];
  const s = 2, lx = bx + (bw - 358 * s) / 2, ly = by + (bh - 61 * s) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${GRADIENT[0]}"/><stop offset="1" stop-color="${GRADIENT[1]}"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="16" fill="#fff"/><path fill="${BRAND}" fill-rule="evenodd" transform="translate(${lx} ${ly}) scale(${s})" d="${d}"/></svg>`;
  await sharp(Buffer.from(svg)).png().toFile("public/og-default.png");
}

try {
  if (!existsSync(WORDMARK)) throw new Error(`missing ${WORDMARK}`);
  const d = readFileSync(WORDMARK, "utf8").match(/ d="([^"]+)"/)[1];
  const svg = faviconSvg(d);
  writeFileSync("public/favicon.svg", svg);
  const icon = (size) => sharp(Buffer.from(svg), { density: 72 * (size / 64) * 2 }).resize(size, size).png();
  writeFileSync("public/favicon.ico", ico(await icon(32).toBuffer()));
  await icon(180).toFile("public/apple-touch-icon.png");
  await icon(192).toFile("public/icon-192.png");
  await icon(512).toFile("public/icon-512.png");
  await ogImage(d);
  console.log("brand: favicons and OG image generated");
} catch (err) {
  console.error("brand: generation failed", err);
  process.exit(1);
}
