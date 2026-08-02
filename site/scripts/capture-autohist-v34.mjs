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
  await page.waitForTimeout(900);
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += Math.max(400, window.innerHeight * 0.7)) {
      window.scrollTo(0, y);
      await sleep(180);
    }
    window.scrollTo(0, 0);
    await sleep(400);
  });
}

async function shotSection(page, selector, file) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
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

for (const [w, h, name] of [
  [1920, 1080, "autohist-v34-flow-1920x1080.png"],
  [1440, 900, "autohist-v34-flow-1440x900.png"],
  [768, 1024, "autohist-v34-flow-768x1024.png"],
  [390, 844, "autohist-v34-flow-390x844.png"],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotSection(page, 'section[aria-labelledby="ah-flow-title"]', name);
  await ctx.close();
}

for (const [w, h, name] of [
  [1440, 900, "autohist-v34-search-1440x900.png"],
  [390, 844, "autohist-v34-search-390x844.png"],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotSection(page, 'section[aria-labelledby="ah-search-title"]', name);
  await ctx.close();
}

for (const [w, h, name] of [
  [1440, 900, "autohist-v34-timeline-1440x900.png"],
  [390, 844, "autohist-v34-timeline-390x844.png"],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotSection(page, 'section[aria-labelledby="ah-timeline-title"]', name);
  await ctx.close();
}

for (const [w, h, name] of [
  [1440, 900, "autohist-v34-company-1440x900.png"],
  [390, 844, "autohist-v34-company-390x844.png"],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotSection(page, 'section[aria-labelledby="ah-trust-title"]', name);
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotFull(page, "autohist-v34-full-desktop.png");
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await settle(page);
  await shotFull(page, "autohist-v34-full-mobile.png");
  await ctx.close();
}

for (const [w, h] of [
  [1920, 1080],
  [1600, 900],
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [360, 800],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await sleep(120);
    }
  });
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const ow = Math.max(doc.scrollWidth, body.scrollWidth) - window.innerWidth;
    const broken = [...document.querySelectorAll("img")].filter(
      (img) => !img.complete || img.naturalWidth === 0,
    ).length;
    const finals = [...document.querySelectorAll("img")]
      .filter((img) => (img.currentSrc || img.src).includes("/screens/final/"))
      .map((img) => ({
        src: (img.currentSrc || img.src).split("/").pop(),
        nw: img.naturalWidth,
        nh: img.naturalHeight,
        cw: Math.round(img.clientWidth),
        ch: Math.round(img.clientHeight),
      }));
    return { ow, broken, finals: finals.length, sample: finals.slice(0, 4) };
  });
  console.log(`viewport ${w}x${h}`, JSON.stringify(overflow));
  await ctx.close();
}

await browser.close();
console.log("DONE");
