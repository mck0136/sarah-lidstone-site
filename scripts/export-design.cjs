#!/usr/bin/env node

/* Export the rendered design-reference pages into the site's native content data. */
const fs = require("node:fs");
const path = require("node:path");
const { transform } = require("./editorial-updates.cjs");

const PAGE_NAMES = [
  "Home", "About", "Research", "Speaking", "IntegratedCare", "Consulting",
  "Creative", "Education", "Contact", "Privacy", "Accessibility",
];
const SLUGS = {
  Home: "/",
  About: "/about",
  Research: "/research",
  Speaking: "/speaking-media",
  IntegratedCare: "/integrated-care",
  Consulting: "/consulting",
  Creative: "/creative",
  Education: "/education",
  Contact: "/contact",
  Privacy: "/privacy",
  Accessibility: "/accessibility",
};

function parseArgs(argv) {
  const args = { baseUrl: process.env.DESIGN_SOURCE_URL || "http://127.0.0.1:3100" };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--base-url") args.baseUrl = argv[++i];
    else if (argv[i] === "--output") args.output = argv[++i];
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return args;
}

function getPlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_MODULE,
    "playwright",
    "/Users/mark_mckendry/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
  ].filter(Boolean);
  for (const candidate of candidates) {
    try { return require(candidate); } catch { /* Try the next installed runtime. */ }
  }
  throw new Error("Playwright was not found. Set PLAYWRIGHT_MODULE to its installed module path.");
}

async function main() {
  const { chromium } = getPlaywright();
  const { baseUrl, output } = parseArgs(process.argv);
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const pages = {};
  const issues = [];
  try {
    for (const name of PAGE_NAMES) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const url = `${baseUrl.replace(/\/$/, "")}/${name}.dc.html`;
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      if (!response || !response.ok()) throw new Error(`${name}: source returned ${response?.status() ?? "no response"} at ${url}`);
      await page.waitForFunction(() => {
        const root = document.querySelector("#dc-root > *");
        return root && root.children.length > 0;
      }, { timeout: 30000 });
      // Give source-driven lists and deferred template substitutions a final paint.
      await page.waitForTimeout(500);
      const record = await page.evaluate(({ name, slug }) => {
        const root = document.querySelector("#dc-root > *");
        if (!root) throw new Error("Rendered page root was not found");
        const clone = root.cloneNode(true);
        clone.querySelectorAll("script, style").forEach((el) => el.remove());
        [clone, ...clone.querySelectorAll("*")].forEach((el) => {
          for (const attr of [...el.attributes]) {
            if (/^on/i.test(attr.name) || /^data-(?:dc|sc)-/i.test(attr.name)) el.removeAttribute(attr.name);
          }
        });
        const localRoutes = {
          "Home.dc.html": "/", "About.dc.html": "/about", "Research.dc.html": "/research",
          "Speaking.dc.html": "/speaking-media", "IntegratedCare.dc.html": "/integrated-care",
          "Consulting.dc.html": "/consulting", "Creative.dc.html": "/creative",
          "Education.dc.html": "/education", "Contact.dc.html": "/contact",
          "Privacy.dc.html": "/privacy", "Accessibility.dc.html": "/accessibility",
        };
        const localAsset = (value) => {
          if (!value || value.startsWith("#") || /^(mailto:|tel:|data:|blob:|javascript:)/i.test(value)) return value;
          let url;
          try { url = new URL(value, location.href); } catch { return value; }
          const originalPath = decodeURIComponent(url.pathname);
          const basename = originalPath.split("/").pop();
          if (localRoutes[basename]) return `${localRoutes[basename]}${url.search}${url.hash}`;
          const sourceOrigin = location.origin;
          const isSourceHost = url.origin === sourceOrigin || /(^|\.)drsarahlidstone\.com$/i.test(url.hostname);
          const assetPath = originalPath;
          if (isSourceHost && /^\/downloads\//i.test(assetPath)) return `${assetPath}${url.search}${url.hash}`;
          if (isSourceHost && /\.(?:png|jpe?g|gif|webp|svg|avif|pdf|woff2?|ttf|otf)$/i.test(assetPath)) {
            let normalized = assetPath;
            const recognized = assetPath.match(/\/(images|uploads|exports)\/(.*)$/i);
            if (recognized) normalized = `/${recognized[1].toLowerCase()}/${recognized[2]}`;
            else if (/\/wp-content\/uploads\//i.test(assetPath)) normalized = `/uploads/${assetPath.split(/\/wp-content\/uploads\//i).pop()}`;
            return `${normalized}${url.search}${url.hash}`;
          }
          if (url.origin === sourceOrigin && /\.dc\.html?$/i.test(originalPath)) {
            return `${localRoutes[basename] || `/${basename.replace(/\.dc\.html?$/i, "").toLowerCase()}`}${url.search}${url.hash}`;
          }
          return value;
        };
        clone.querySelectorAll("a[href]").forEach((el) => el.setAttribute("href", localAsset(el.getAttribute("href"))));
        clone.querySelectorAll("img[src], source[src], video[src], audio[src], iframe[src]").forEach((el) => el.setAttribute("src", localAsset(el.getAttribute("src"))));
        clone.querySelectorAll("img[srcset], source[srcset]").forEach((el) => {
          const srcset = el.getAttribute("srcset").split(",").map((item) => {
            const [src, ...descriptor] = item.trim().split(/\s+/);
            return [localAsset(src), ...descriptor].join(" ");
          }).join(", ");
          el.setAttribute("srcset", srcset);
        });
        const styles = [...document.querySelectorAll("head style")].map((style) => style.textContent.trim()).filter(Boolean);
        const unresolved = [...clone.querySelectorAll(".sc-interp.sc-unresolved, [data-unresolved]")].map((el) => el.textContent.trim()).filter(Boolean);
        const sourceLinks = [...clone.querySelectorAll("a[href]")].filter((el) => /\.dc\.html?(?:[?#]|$)/i.test(el.getAttribute("href"))).map((el) => el.getAttribute("href"));
        return {
          name,
          title: document.title || name,
          slug,
          html: clone.outerHTML,
          css: styles.join("\n\n"),
          logoHtml: clone.querySelector("header a")?.innerHTML || "",
          diagnostics: { unresolved, unrewrittenDesignLinks: sourceLinks },
        };
      }, { name, slug: SLUGS[name] });
      if (errors.length) issues.push(`${name}: ${errors.join("; ")}`);
      if (record.diagnostics.unresolved.length) issues.push(`${name}: unresolved runtime values ${record.diagnostics.unresolved.join(", ")}`);
      if (record.diagnostics.unrewrittenDesignLinks.length) issues.push(`${name}: unrewritten design links ${record.diagnostics.unrewrittenDesignLinks.join(", ")}`);
      // Diagnostics are reported separately; the site content contract contains only page fields.
      delete record.diagnostics;
      pages[name] = record;
      await page.close();
      console.log(`Captured ${name} (${record.html.length.toLocaleString()} HTML chars)`);
    }
  } finally {
    await browser.close();
  }
  const destination = output || path.join(__dirname, "..", "content", "design-pages.json");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const editorialPages = transform(pages);
  fs.writeFileSync(destination, `${JSON.stringify(editorialPages, null, 2)}\n`);
  console.log(`Wrote ${Object.keys(pages).length} pages to ${destination}`);
  if (issues.length) {
    console.error("Review source issues:");
    for (const issue of issues) console.error(`- ${issue}`);
  }
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});
