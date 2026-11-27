// Generates favicons and the default OG image into public/.
// Source: public/brand/MYPAGES_Logo_Small.png when present, otherwise a text wordmark.
// Run with `npm run brand` after adding or changing the logo files.
import { existsSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const NAVY = "#0b1f3a";
const ACCENT = "#ffb020";
const SMALL = "public/brand/MYPAGES_Logo_Small.png";
const hasLogo = existsSync(SMALL);

const monogram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${NAVY}"/>
  <rect x="12" y="44" width="40" height="6" fill="${ACCENT}"/>
  <text x="32" y="40" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#fff" text-anchor="middle">MP</text>
</svg>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="80" y="430" width="240" height="10" fill="${ACCENT}"/>
  <text x="80" y="250" font-family="Arial, Helvetica, sans-serif" font-size="110" font-weight="700" fill="#fff" letter-spacing="6">MYPAGES</text>
  <text x="80" y="350" font-family="Arial, Helvetica, sans-serif" font-size="44" fill="#c9d4e3">Data-driven SEO for e-commerce and online businesses</text>
  <text x="80" y="520" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#c9d4e3">mypagesnetwork.com</text>
</svg>`;

const iconSource = () => (hasLogo ? sharp(SMALL) : sharp(Buffer.from(monogram)));
const square = (size) =>
  iconSource().resize(size, size, { fit: "contain", background: hasLogo ? "#ffffff" : NAVY }).png();

// ICO with one embedded 32x32 PNG (supported by every current browser).
function ico(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  header.writeUInt8(32, 6); header.writeUInt8(32, 7);
  header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

try {
  const p32 = await square(32).toBuffer();
  writeFileSync("public/favicon.ico", ico(p32));
  await square(180).toFile("public/apple-touch-icon.png");
  await square(192).toFile("public/icon-192.png");
  await square(512).toFile("public/icon-512.png");
  if (hasLogo) {
    const b64 = (await square(64).toBuffer()).toString("base64");
    writeFileSync("public/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image href="data:image/png;base64,${b64}" width="64" height="64"/></svg>`);
    const logo = await sharp(SMALL).resize(360, 360, { fit: "inside" }).png().toBuffer();
    await sharp(Buffer.from(og)).composite([{ input: logo, top: 135, left: 760 }]).png().toFile("public/og-default.png");
  } else {
    writeFileSync("public/favicon.svg", monogram);
    await sharp(Buffer.from(og)).png().toFile("public/og-default.png");
  }
  console.log(`brand: icons and OG image generated from ${hasLogo ? SMALL : "text wordmark"}`);
} catch (err) {
  console.error("brand: generation failed", err);
  process.exit(1);
}
