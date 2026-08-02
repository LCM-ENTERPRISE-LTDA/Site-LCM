import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../docs/sprints/08-autohist/screenshots");
const OUT2 = path.resolve(__dirname, "../../docs/screenshots/autohist");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(OUT2, { recursive: true });

const URL = "http://localhost:3000/produtos/autohist";
const SEL = 'section[aria-labelledby="ah-search-title"]';

async function settle(page) {
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "header{visibility:hidden!important} button[aria-label='Voltar ao topo']{display:none!important}",
  });
  await page.waitForTimeout(600);
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await sleep(100);
    }
    window.scrollTo(0, 0);
    await sleep(300);
  });
}

async function shot(page, file) {
  const el = page.locator(SEL).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(280);
  const dest = path.join(OUT, file);
  await el.screenshot({ path: dest });
  fs.copyFileSync(dest, path.join(OUT2, file));
  console.log("ok", file);
  return dest;
}

const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const [w, h, name] of [
  [1920, 1080, "autohist-v342-search-1920x1080.png"],
  [1440, 900, "autohist-v342-search-1440x900.png"],
  [1024, 768, "autohist-v342-search-1024x768.png"],
  [768, 1024, "autohist-v342-search-768x1024.png"],
  [390, 844, "autohist-v342-search-390x844.png"],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shot(page, name);
  await ctx.close();
}

await browser.close();

const before = path.resolve(OUT, "autohist-v341-search-1440x900.png");
const after = path.resolve(OUT, "autohist-v342-search-1440x900.png");
const compare = path.resolve(OUT, "autohist-v342-before-after-1440.png");

if (fs.existsSync(before) && fs.existsSync(after)) {
  const targetH = 900;
  const left = await sharp(before).resize({ height: targetH, fit: "inside" }).png().toBuffer();
  const right = await sharp(after).resize({ height: targetH, fit: "inside" }).png().toBuffer();
  const lm = await sharp(left).metadata();
  const rm = await sharp(right).metadata();
  const gap = 24;
  const labelH = 48;
  const width = (lm.width || 700) + gap + (rm.width || 700);
  const height = Math.max(lm.height || targetH, rm.height || targetH) + labelH;
  const svg = Buffer.from(
    `<svg width="${width}" height="${labelH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#061428"/>
      <text x="${(lm.width || 700) / 2}" y="30" fill="#7dd3fc" font-size="18" text-anchor="middle" font-family="Segoe UI, sans-serif">ANTES — V3.4.1</text>
      <text x="${(lm.width || 700) + gap + (rm.width || 700) / 2}" y="30" fill="#7dd3fc" font-size="18" text-anchor="middle" font-family="Segoe UI, sans-serif">DEPOIS — V3.4.2</text>
    </svg>`,
  );
  await sharp({
    create: { width, height, channels: 3, background: "#061428" },
  })
    .composite([
      { input: svg, top: 0, left: 0 },
      { input: left, top: labelH, left: 0 },
      { input: right, top: labelH, left: (lm.width || 700) + gap },
    ])
    .png()
    .toFile(compare);
  fs.copyFileSync(compare, path.join(OUT2, "autohist-v342-before-after-1440.png"));
  console.log("ok autohist-v342-before-after-1440.png");
} else {
  console.warn("skip before-after: missing v341 or v342 search shot");
}

console.log("DONE");
