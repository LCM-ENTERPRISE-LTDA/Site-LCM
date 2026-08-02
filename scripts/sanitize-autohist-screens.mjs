/**
 * Sanitize AutoHist product screenshots for public use.
 * - Reads originals from docs/ only
 * - Writes rasterized WebP to site/public/products/autohist/screens/
 * - Never modifies originals
 * - Never embeds real PII in config (fictional replacements only)
 *
 * Usage (from site/): node ../scripts/sanitize-autohist-screens.mjs
 * Uses sharp from site/node_modules (Next.js image pipeline dependency).
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(path.join(root, "site", "package.json"));
const sharp = require("sharp");
const srcDir = path.join(root, "docs", "sprints", "08-autohist", "Imagens Reais AutoHist");
const outDir = path.join(root, "site", "public", "products", "autohist", "screens");
const reportDir = path.join(root, "docs", "sprints", "08-autohist", "sanitization");

/** Official demo fiction — consistent across all screens */
const DEMO = {
  company: "Oficina Demonstração",
  cnpj: "00.000.000/0000-00",
  staffA: "Funcionário A",
  staffB: "Funcionário B",
  staffC: "Funcionário C",
  plate: "AUT0H25",
  plateAlt: "ABC1D23",
  plateFmt: "AUT - 0H25",
  plateEq: "AUT-0H25",
  service: "Manutenção preventiva e substituição de componentes",
  serviceShort: "Manutenção preventiva",
  value: "R$ 350,00",
  balance: "R$ 18.750,00",
  avg: "R$ 146,48",
  orders: "128",
  staffCount: "4",
  orderId: "#000101",
  orderId2: "#000102",
  orderId3: "#000103",
  model: "Veículo Demonstração",
  brand: "Marca Demo",
  km: "45.200 km",
  year: "2020/2020",
  pctA: "42 · 33%",
  pctB: "38 · 30%",
  pctC: "28 · 22%",
};

const W = 720;
const H_FLOW = 900;
const H_PROOF = 560;

function findSource(partial) {
  const files = fs.readdirSync(srcDir);
  const hit = files.find((f) => f.toLowerCase().includes(partial.toLowerCase()));
  if (!hit) throw new Error(`Source not found matching: ${partial}`);
  return path.join(srcDir, hit);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Regions for list cards in export/history screen (normalized 720×1320) */
function historyCardRegions(y0, plate, staff, orderId) {
  return [
    { x: 100, y: y0, w: 140, h: 28, fill: "#FFFFFF", text: orderId, size: 12, color: "#94A3B8", tx: 110, ty: y0 + 18 },
    { x: 100, y: y0 + 24, w: 260, h: 48, fill: "#EEF2F7", text: plate, size: 16, color: "#0A1F3D", weight: 700, tx: 124, ty: y0 + 54 },
    { x: 100, y: y0 + 70, w: 480, h: 40, fill: "#FFFFFF", text: `Há 1 dia · ${staff}`, size: 13, color: "#64748B", tx: 110, ty: y0 + 96 },
  ];
}

/** Opaque raster rectangles — avoids SVG alpha ghosting over underlying glyphs */
async function buildCoverLayers(regions) {
  const layers = [];
  for (const r of regions) {
    const fill = r.fill || "#FFFFFF";
    const patch = await sharp({
      create: {
        width: Math.max(1, Math.round(r.w)),
        height: Math.max(1, Math.round(r.h)),
        channels: 3,
        background: fill,
      },
    })
      .png()
      .toBuffer();
    layers.push({ input: patch, left: Math.round(r.x), top: Math.round(r.y) });
  }

  const labeled = regions.filter((r) => r.text);
  if (labeled.length) {
    const maxX = Math.max(...regions.map((r) => r.x + r.w));
    const maxY = Math.max(...regions.map((r) => r.y + r.h));
    const minX = Math.min(...regions.map((r) => r.x));
    const minY = Math.min(...regions.map((r) => r.y));
    // Full-frame transparent SVG with text only (no rects)
    const texts = labeled
      .map((r) => {
        const size = r.size || 14;
        const color = r.color || "#0A1F3D";
        const weight = r.weight || 600;
        const anchor = r.anchor || "start";
        const tx = r.tx ?? (anchor === "end" ? r.x + r.w - 8 : r.x + 10);
        const ty = r.ty ?? r.y + r.h / 2 + size * 0.35;
        return `<text x="${tx}" y="${ty}" fill="${color}" font-size="${size}" font-weight="${weight}" font-family="Segoe UI, Arial, sans-serif" text-anchor="${anchor}">${escapeXml(r.text)}</text>`;
      })
      .join("");
    // Use a canvas large enough for all text; composite at 0,0
    const svgW = Math.max(W, Math.ceil(maxX + 8));
    const svgH = Math.max(Math.ceil(maxY + 8), Math.ceil(minY + 8));
    const svg = Buffer.from(
      `<svg width="${svgW}" height="${svgH}" xmlns="http://www.w3.org/2000/svg">${texts}</svg>`,
    );
    layers.push({ input: svg, left: 0, top: 0 });
  }
  return layers;
}

async function applyOverlay(
  basePath,
  regions,
  { extract, outHeight = H_FLOW, gravity = "north", fit = "cover", background = "#F3F4F6" } = {},
) {
  const meta = await sharp(basePath).rotate().metadata();
  const fullH = Math.max(1, Math.round((meta.height / meta.width) * W));

  let buf = await sharp(basePath)
    .rotate()
    .resize({ width: W, height: fullH, fit: "fill" })
    .png()
    .toBuffer();

  if (regions.length) {
    const layers = await buildCoverLayers(regions);
    buf = await sharp(buf).composite(layers).png().toBuffer();
  }

  const info = await sharp(buf).metadata();
  const actualH = info.height || fullH;
  const actualW = info.width || W;

  if (extract) {
    const top = Math.max(0, Math.min(extract.top, actualH - 1));
    const height = Math.max(1, Math.min(extract.height, actualH - top));
    const width = Math.min(W, actualW);
    buf = await sharp(buf).extract({ left: 0, top, width, height }).toBuffer();
  }

  return sharp(buf)
    .resize({
      width: W,
      height: outHeight,
      fit,
      position: gravity,
      background,
    })
    .webp({ quality: 84 })
    .toBuffer();
}

async function writeOut(name, buffer, report) {
  const dest = path.join(outDir, name);
  await fs.promises.writeFile(dest, buffer);
  const st = await fs.promises.stat(dest);
  report.push({ file: name, bytes: st.size, kb: +(st.size / 1024).toFixed(1) });
  console.log("wrote", name, `${(st.size / 1024).toFixed(1)} KB`);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(reportDir, { recursive: true });

  for (const f of fs.readdirSync(outDir)) {
    if (/\.(webp|png|jpe?g|avif)$/i.test(f)) fs.unlinkSync(path.join(outDir, f));
  }

  const report = [];
  const inventory = [];

  const srcCreate = findSource("Cadastrar Nova Ordem");
  const srcPhotos = findSource("Adicionar fotos");
  const srcExport = findSource("AbaEmpresaExportarTodasOS");
  const srcNetwork = findSource("Pesquisa na Rede");
  const srcOrderCard = findSource("DashBoard de OS");
  const srcCompanyValues = findSource("demonstrando valores");

  inventory.push(
    { sourceKey: "create-order", output: "autohist-screen-create-order.webp", chapter: "03-01", categories: ["plate-field"], method: "cover+replace+crop" },
    { sourceKey: "create-order", output: "autohist-screen-service-details.webp", chapter: "03-02", categories: ["none-empty-form"], method: "crop" },
    { sourceKey: "add-photos", output: "autohist-screen-add-photos.webp", chapter: "03-03", categories: ["none"], method: "crop" },
    { sourceKey: "export-orders", output: "autohist-screen-order-history.webp", chapter: "03-04/04", categories: ["plate", "staff-name", "money", "order-id"], method: "cover+replace+crop" },
    { sourceKey: "network-search", output: "autohist-screen-network-search.webp", chapter: "04", categories: ["plate"], method: "cover+replace+crop" },
    { sourceKey: "export-orders", output: "autohist-screen-export-pdf.webp", chapter: "04/05", categories: ["money", "order-count"], method: "cover+replace+crop" },
    { sourceKey: "order-card", output: "autohist-screen-order-value.webp", chapter: "05", categories: ["plate", "staff-name", "free-text", "money", "vehicle"], method: "cover+replace" },
    { sourceKey: "company-values", output: "autohist-screen-company-dashboard.webp", chapter: "06", categories: ["company", "cnpj", "staff-name", "money", "order-count"], method: "cover+replace+crop" },
  );

  // 1) Create order — plate focus (empty form; reinforce demo plate)
  await writeOut(
    "autohist-screen-create-order.webp",
    await applyOverlay(
      srcCreate,
      [
        {
          x: 40,
          y: 400,
          w: 640,
          h: 120,
          fill: "#FFFFFF",
          text: DEMO.plate,
          size: 22,
          color: "#64748B",
          tx: 72,
          ty: 470,
        },
      ],
      { extract: { top: 280, height: 720 }, outHeight: H_FLOW, gravity: "north" },
    ),
    report,
  );

  // 2) Service details — empty selects (no PII)
  await writeOut(
    "autohist-screen-service-details.webp",
    await applyOverlay(srcCreate, [], {
      extract: { top: 680, height: 780 },
      outHeight: H_FLOW,
      gravity: "north",
    }),
    report,
  );

  // 3) Add photos — FOTOS block
  await writeOut(
    "autohist-screen-add-photos.webp",
    await applyOverlay(srcPhotos, [], {
      extract: { top: 480, height: 720 },
      outHeight: H_FLOW,
      gravity: "north",
    }),
    report,
  );

  // 4) Order history — filters + cards
  const historyRegions = [
    // summary counts + money (full wipe)
    {
      x: 28,
      y: 640,
      w: 400,
      h: 90,
      fill: "#F3F4F6",
      text: `${DEMO.orders} ordens`,
      size: 15,
      color: "#0F172A",
      weight: 700,
      tx: 36,
      ty: 672,
    },
    {
      x: 36,
      y: 684,
      w: 380,
      h: 36,
      fill: "#F3F4F6",
      text: `Valor total: ${DEMO.balance}`,
      size: 14,
      color: "#0F172A",
      weight: 700,
      tx: 36,
      ty: 708,
    },
    // badge next to HISTÓRICO GERAL — cover original count fully
    {
      x: 220,
      y: 752,
      w: 100,
      h: 40,
      fill: "#E2E8F0",
      text: DEMO.orders,
      size: 12,
      color: "#334155",
      tx: 248,
      ty: 778,
    },
    ...historyCardRegions(800, DEMO.plate, DEMO.staffA, DEMO.orderId),
    ...historyCardRegions(960, DEMO.plateAlt, DEMO.staffB, DEMO.orderId2),
    ...historyCardRegions(1120, "XYZ9K88", DEMO.staffC, DEMO.orderId3),
  ];

  await writeOut(
    "autohist-screen-order-history.webp",
    await applyOverlay(srcExport, historyRegions, {
      extract: { top: 360, height: 920 },
      outHeight: H_FLOW,
      gravity: "north",
    }),
    report,
  );

  // 5) Network search
  await writeOut(
    "autohist-screen-network-search.webp",
    await applyOverlay(
      srcNetwork,
      [
        {
          x: 48,
          y: 128,
          w: 520,
          h: 52,
          fill: "#13284A",
          rx: 12,
          text: DEMO.plate,
          size: 20,
          color: "#F8FAFC",
          weight: 700,
          tx: 72,
          ty: 162,
        },
        {
          x: 28,
          y: 248,
          w: 420,
          h: 56,
          fill: "#FFFFFF",
          text: DEMO.plateFmt,
          size: 28,
          color: "#0A1F3D",
          weight: 700,
          tx: 36,
          ty: 288,
        },
        {
          x: 28,
          y: 300,
          w: 380,
          h: 32,
          fill: "#FFFFFF",
          text: `Inclui equivalente ${DEMO.plateEq}`,
          size: 13,
          color: "#94A3B8",
          tx: 36,
          ty: 322,
        },
      ],
      { extract: { top: 40, height: 980 }, outHeight: H_FLOW, gravity: "north" },
    ),
    report,
  );

  // 6) Export PDF proof — summary + button only (no unsanitized list cards)
  await writeOut(
    "autohist-screen-export-pdf.webp",
    await applyOverlay(
      srcExport,
      [
        {
          x: 28,
          y: 640,
          w: 400,
          h: 90,
          fill: "#F3F4F6",
          text: `${DEMO.orders} ordens`,
          size: 15,
          color: "#0F172A",
          weight: 700,
          tx: 36,
          ty: 672,
        },
        {
          x: 36,
          y: 684,
          w: 380,
          h: 36,
          fill: "#F3F4F6",
          text: `Valor total: ${DEMO.balance}`,
          size: 14,
          color: "#0F172A",
          weight: 700,
          tx: 36,
          ty: 708,
        },
        {
          x: 220,
          y: 752,
          w: 100,
          h: 40,
          fill: "#E2E8F0",
          text: DEMO.orders,
          size: 12,
          color: "#334155",
          tx: 248,
          ty: 778,
        },
      ],
      { extract: { top: 600, height: 200 }, outHeight: 280, gravity: "north", fit: "contain", background: "#F3F4F6" },
    ),
    report,
  );

  // 7) Order detail card
  await writeOut(
    "autohist-screen-order-value.webp",
    await applyOverlay(
      srcOrderCard,
      [
        { x: 200, y: 18, w: 90, h: 36, fill: "#F1F5F9", rx: 14, text: DEMO.orders, size: 13, color: "#475569", tx: 224, ty: 42 },
        { x: 100, y: 80, w: 110, h: 24, fill: "#FFFFFF", text: DEMO.orderId, size: 12, color: "#94A3B8", tx: 100, ty: 97 },
        {
          x: 140,
          y: 96,
          w: 200,
          h: 42,
          fill: "#E8EEF5",
          rx: 8,
          text: DEMO.plate,
          size: 16,
          color: "#0A1F3D",
          weight: 700,
          tx: 156,
          ty: 124,
        },
        {
          x: 100,
          y: 134,
          w: 340,
          h: 32,
          fill: "#FFFFFF",
          text: `Há 1 dia · ${DEMO.staffA}`,
          size: 13,
          color: "#64748B",
          tx: 100,
          ty: 156,
        },
        {
          x: 330,
          y: 190,
          w: 360,
          h: 60,
          fill: "#FFFFFF",
          text: DEMO.model,
          size: 14,
          color: "#0F172A",
          weight: 600,
          tx: 350,
          ty: 228,
        },
        {
          x: 40,
          y: 288,
          w: 180,
          h: 36,
          fill: "#FFFFFF",
          text: DEMO.brand,
          size: 14,
          color: "#0F172A",
          weight: 600,
          tx: 48,
          ty: 312,
        },
        {
          x: 350,
          y: 288,
          w: 200,
          h: 36,
          fill: "#FFFFFF",
          text: DEMO.km,
          size: 14,
          color: "#0F172A",
          weight: 600,
          tx: 360,
          ty: 312,
        },
        {
          x: 40,
          y: 368,
          w: 200,
          h: 36,
          fill: "#FFFFFF",
          text: DEMO.year,
          size: 14,
          color: "#0F172A",
          weight: 600,
          tx: 48,
          ty: 392,
        },
        {
          x: 40,
          y: 448,
          w: 640,
          h: 44,
          fill: "#FFFFFF",
          text: DEMO.serviceShort,
          size: 15,
          color: "#0F172A",
          weight: 600,
          tx: 48,
          ty: 476,
        },
        {
          x: 40,
          y: 498,
          w: 640,
          h: 48,
          fill: "#F1F5F9",
          rx: 10,
          text: `Valor do serviço   ${DEMO.value}`,
          size: 15,
          color: "#0A1F3D",
          weight: 700,
          tx: 56,
          ty: 528,
        },
        {
          x: 250,
          y: 640,
          w: 240,
          h: 34,
          fill: "#FEF3C7",
          text: "até 15/03/2026",
          size: 13,
          color: "#92400E",
          weight: 700,
          tx: 270,
          ty: 662,
        },
        {
          x: 160,
          y: 812,
          w: 220,
          h: 36,
          fill: "#E8EEF5",
          text: "15/02/2026",
          size: 13,
          color: "#475569",
          tx: 200,
          ty: 836,
        },
      ],
      { outHeight: H_FLOW, gravity: "north" },
    ),
    report,
  );

  // 8) Company dashboard
  await writeOut(
    "autohist-screen-company-dashboard.webp",
    await applyOverlay(
      srcCompanyValues,
      [
        // company info value column — full row wipes
        {
          x: 260,
          y: 330,
          w: 420,
          h: 50,
          fill: "#FFFFFF",
          text: DEMO.company,
          size: 15,
          color: "#0F172A",
          weight: 700,
          anchor: "end",
        },
        {
          x: 260,
          y: 400,
          w: 420,
          h: 50,
          fill: "#FFFFFF",
          text: DEMO.cnpj,
          size: 15,
          color: "#0F172A",
          weight: 600,
          anchor: "end",
        },
        {
          x: 520,
          y: 480,
          w: 160,
          h: 50,
          fill: "#FFFFFF",
          text: DEMO.staffCount,
          size: 15,
          color: "#0F172A",
          weight: 700,
          anchor: "end",
        },
        {
          x: 520,
          y: 555,
          w: 160,
          h: 50,
          fill: "#FFFFFF",
          text: DEMO.orders,
          size: 15,
          color: "#0F172A",
          weight: 700,
          anchor: "end",
        },
        // balance card — wipe values only, keep card chrome
        {
          x: 36,
          y: 730,
          w: 640,
          h: 110,
          fill: "#FFFFFF",
          text: DEMO.balance,
          size: 28,
          color: "#0A1F3D",
          weight: 700,
          tx: 48,
          ty: 780,
        },
        {
          x: 48,
          y: 790,
          w: 240,
          h: 28,
          fill: "#FFFFFF",
          text: `${DEMO.orders} ordens`,
          size: 14,
          color: "#64748B",
          tx: 48,
          ty: 810,
        },
        {
          x: 48,
          y: 818,
          w: 400,
          h: 28,
          fill: "#FFFFFF",
          text: `Média por OS: ${DEMO.avg}`,
          size: 14,
          color: "#475569",
          tx: 48,
          ty: 838,
        },
        // staff rows — full name + stats wipe
        {
          x: 36,
          y: 980,
          w: 650,
          h: 90,
          fill: "#FFFFFF",
          text: `${DEMO.staffA}     ${DEMO.pctA}`,
          size: 15,
          color: "#0F172A",
          weight: 700,
          tx: 48,
          ty: 1012,
        },
        {
          x: 48,
          y: 1020,
          w: 300,
          h: 28,
          fill: "#FFFFFF",
          text: "Administrador · Ativo",
          size: 12,
          color: "#94A3B8",
          tx: 48,
          ty: 1040,
        },
        {
          x: 36,
          y: 1085,
          w: 650,
          h: 90,
          fill: "#FFFFFF",
          text: `${DEMO.staffB}     ${DEMO.pctB}`,
          size: 15,
          color: "#0F172A",
          weight: 700,
          tx: 48,
          ty: 1117,
        },
        {
          x: 48,
          y: 1125,
          w: 300,
          h: 28,
          fill: "#FFFFFF",
          text: "Funcionário · Ativo",
          size: 12,
          color: "#94A3B8",
          tx: 48,
          ty: 1145,
        },
      ],
      { extract: { top: 200, height: 1000 }, outHeight: H_FLOW, gravity: "north" },
    ),
    report,
  );

  // Contact sheet (sanitized only)
  const finals = fs.readdirSync(outDir).filter((f) => f.endsWith(".webp")).sort();
  const sheetH = 200;
  const sheetW = 140;
  const cols = 4;
  const rows = Math.ceil(finals.length / cols);
  const composites = [];
  for (let i = 0; i < finals.length; i++) {
    const thumb = await sharp(path.join(outDir, finals[i]))
      .resize(sheetW, sheetH, { fit: "cover", position: "north" })
      .png()
      .toBuffer();
    composites.push({
      input: thumb,
      left: (i % cols) * (sheetW + 12) + 12,
      top: Math.floor(i / cols) * (sheetH + 12) + 12,
    });
  }
  await sharp({
    create: {
      width: cols * (sheetW + 12) + 12,
      height: rows * (sheetH + 12) + 12,
      channels: 3,
      background: "#061428",
    },
  })
    .composite(composites)
    .png()
    .toFile(path.join(reportDir, "sanitized-contact-sheet.png"));

  const reportJson = {
    generatedAt: new Date().toISOString(),
    demoFiction: DEMO,
    inventory,
    outputs: report,
    totalKb: report.reduce((s, r) => s + r.kb, 0),
    note: "Categories listed without reproducing source PII. Calibration coords on 720-wide normalized frames.",
  };
  await fs.promises.writeFile(
    path.join(reportDir, "sanitize-report.json"),
    JSON.stringify(reportJson, null, 2),
  );

  console.log("\nDone. Total public screens:", report.length, "·", reportJson.totalKb.toFixed(1), "KB");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
