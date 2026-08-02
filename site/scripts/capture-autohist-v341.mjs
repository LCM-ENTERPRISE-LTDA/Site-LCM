import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../docs/sprints/08-autohist/screenshots");
const OUT2 = path.resolve(__dirname, "../../docs/screenshots/autohist");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(OUT2, { recursive: true });

const URL = "http://localhost:3000/produtos/autohist";

async function settle(page) {
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: "header{visibility:hidden!important} [class*='ScrollToTop']{display:none!important} button[aria-label='Voltar ao topo']{display:none!important}",
  });
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += Math.max(400, window.innerHeight * 0.7)) {
      window.scrollTo(0, y);
      await sleep(140);
    }
    window.scrollTo(0, 0);
    await sleep(350);
  });
}

async function shotSection(page, selector, file) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const dest = path.join(OUT, file);
  await el.screenshot({ path: dest });
  fs.copyFileSync(dest, path.join(OUT2, file));
  console.log("ok", file);
}

async function shotFull(page, file) {
  const dest = path.join(OUT, file);
  await page.screenshot({ path: dest, fullPage: true });
  fs.copyFileSync(dest, path.join(OUT2, file));
  console.log("ok", file);
}

const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const [w, h, name, sel] of [
  [1440, 900, "autohist-v341-flow-1440x900.png", 'section[aria-labelledby="ah-flow-title"]'],
  [390, 844, "autohist-v341-flow-390x844.png", 'section[aria-labelledby="ah-flow-title"]'],
  [1440, 900, "autohist-v341-search-1440x900.png", 'section[aria-labelledby="ah-search-title"]'],
  [390, 844, "autohist-v341-search-390x844.png", 'section[aria-labelledby="ah-search-title"]'],
  [1440, 900, "autohist-v341-timeline-1440x900.png", 'section[aria-labelledby="ah-timeline-title"]'],
  [390, 844, "autohist-v341-timeline-390x844.png", 'section[aria-labelledby="ah-timeline-title"]'],
  [1440, 900, "autohist-v341-confidence-1440x900.png", 'section[aria-labelledby="ah-trust-title"]'],
  [390, 844, "autohist-v341-confidence-390x844.png", 'section[aria-labelledby="ah-trust-title"]'],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotSection(page, sel, name);
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  const count = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")].filter((img) =>
      (img.currentSrc || img.src).includes("screens/final") ||
      (img.getAttribute("src") || "").includes("screens/final") ||
      decodeURIComponent(img.currentSrc || "").includes("screens%2Ffinal"),
    );
    const unique = new Set(
      imgs.map((img) => {
        const s = decodeURIComponent(img.currentSrc || img.src || "");
        const m = s.match(/autohist-[a-z-]+\.webp/);
        return m ? m[0] : s;
      }),
    );
    return { imgs: imgs.length, unique: [...unique] };
  });
  console.log("visible-finals", JSON.stringify(count));
  await shotFull(page, "autohist-v341-full-desktop.png");
  console.log("height", await page.evaluate(() => document.body.scrollHeight));
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotFull(page, "autohist-v341-full-mobile.png");
  console.log("mobile-height", await page.evaluate(() => document.body.scrollHeight));
  await ctx.close();
}

await browser.close();
console.log("DONE");
