/**
 * Rasterizes editorial icon mark → ICO for legacy tab/bookmark targets.
 * Regenerate after changing app/icon.svg: `node scripts/generate-favicon.mjs`
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const svgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect fill="#0b0b0c" width="32" height="32" rx="4"/>
  <rect fill="none" stroke="rgba(237,234,227,0.22)" stroke-width="0.95" x="7" y="7" width="18" height="18" rx="1.25"/>
  <circle fill="#c8ff00" cx="21.75" cy="21.75" r="3.25"/>
</svg>`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../app/favicon.ico");

async function main() {
  const toIco = (await import("png-to-ico")).default;
  const buf16 = await sharp(Buffer.from(svgDark)).resize(16, 16).png().toBuffer();
  const buf32 = await sharp(Buffer.from(svgDark)).resize(32, 32).png().toBuffer();
  const ico = await toIco([buf32, buf16]);
  fs.writeFileSync(outPath, ico);
  console.warn("wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
