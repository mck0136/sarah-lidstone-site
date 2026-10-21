/* Production route, content, asset, interaction and reference checks. */
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/Users/mark_mckendry/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const { PNG } = require("/Users/mark_mckendry/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pngjs");
const data = require("../content/design-pages.json");
const { transform: applyEditorialUpdates } = require("./editorial-updates.cjs");
const base = process.env.SITE_URL || "http://127.0.0.1:3005";
const reference = process.env.DESIGN_SOURCE_URL || "http://127.0.0.1:3100";
const output = process.env.QA_OUTPUT_DIR || path.join(__dirname, "..", "qa", "editorial-20261020");

async function ready(page, selector) {
  await page.locator(selector).first().waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter(img => img.src).map(img => img.decode().catch(() => {})));
  });
}

async function main() {
  await fs.mkdir(output, { recursive: true });
  const { default: pixelmatch } = await import("/Users/mark_mckendry/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pixelmatch/index.js");
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || "/Users/mark_mckendry/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
  const errors = [];
  const warnings = new Set();
  const report = { checkedAt: new Date().toISOString(), base, reference: "supplied design plus approved editorial updates", pages: [], interactions: {}, localTargets: 0, failures: [], warnings: [] };
  const localTargets = new Set();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 802 }, isMobile: true, hasTouch: true });
  const refDesktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const refMobile = await browser.newPage({ viewport: { width: 390, height: 802 }, isMobile: true, hasTouch: true });
  for (const page of [desktop, mobile]) {
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`${response.status()} ${response.url()}`);
      else if (response.status() >= 400) warnings.add(`External HTTP ${response.status()}: ${response.url()}`);
    });
    page.on("requestfailed", request => {
      if (request.url().startsWith(base)) errors.push(`${request.failure()?.errorText} ${request.url()}`);
      else warnings.add(`External request unavailable: ${request.url()}`);
    });
  }
  try {
    for (const [name, record] of Object.entries(data)) {
      const row = { name, route: record.slug };
      for (const [mode, page, ref] of [["desktop", desktop, refDesktop], ["phone", mobile, refMobile]]) {
        const response = await page.goto(base + record.slug);
        await ready(page, ".design-source h1");
        await page.waitForFunction(() => document.querySelector('.design-page')?.dataset.ready === 'true');
        const details = await page.evaluate(() => {
          const root = document.querySelector(".design-source");
          return {
            h1: root.querySelector("h1")?.textContent.trim(),
            text: root.textContent.replace(/\s+/g, " ").trim(),
            brokenImages: [...root.querySelectorAll("img")].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute("src")),
            missingAlt: [...root.querySelectorAll("img")].filter(img => !img.hasAttribute("alt")).length,
            emptyLinks: [...root.querySelectorAll("a[href]")].filter(a => !a.textContent.trim() && !a.querySelector("img[alt]") && !a.getAttribute("aria-label")).length,
            targets: [...root.querySelectorAll("a[href], img[src]")].map(el => el.getAttribute(el.tagName === "A" ? "href" : "src")).filter(url => url?.startsWith("/")),
            contentWidth: root.scrollWidth,
            viewportWidth: innerWidth,
            documentWidth: document.documentElement.scrollWidth
          };
        });
        details.targets.forEach(target => localTargets.add(target));
        delete details.targets;
        if (response.status() !== 200) report.failures.push(`${name} ${mode}: HTTP ${response.status()}`);
        if (details.brokenImages.length || details.missingAlt || details.emptyLinks || details.documentWidth > details.viewportWidth) report.failures.push(`${name} ${mode}: asset/accessibility/overflow issue (see page report)`);
        let refRoot;
        if (mode === "desktop") {
          await ref.goto(`${reference}/${name}.dc.html`);
          await ready(ref, "#dc-root h1");
          refRoot = ref.locator("#dc-root");
        } else {
          await ref.goto(`${reference}/?page=${name}`);
          await ready(ref, "#mobile-content h1");
          await ref.locator("#mobile-loading").waitFor({ state: "hidden" });
          refRoot = ref.locator("#mobile-content");
        }
        const renderedReference = await refRoot.evaluate(root => {
          const clone = root.cloneNode(true);
          clone.querySelectorAll("script, style").forEach(element => element.remove());
          clone.querySelectorAll("*").forEach(element => {
            for (const attr of [...element.attributes]) if (/^on/i.test(attr.name) || /^data-(?:dc|sc)-/i.test(attr.name)) element.removeAttribute(attr.name);
          });
          return clone.innerHTML;
        });
        const referenceHtml = renderedReference.replace(/href="(?:\.\/)?([A-Za-z]+)\.dc\.html"/g, (match, pageName) => data[pageName] ? `href="${data[pageName].slug}"` : match);
        const updatedReference = applyEditorialUpdates({ ...data, [name]: { ...record, html: referenceHtml } });
        await refRoot.evaluate((root, html) => { root.innerHTML = html; }, updatedReference[name].html);
        const refText = await refRoot.evaluate(root => root.textContent.replace(/\s+/g, " ").trim());
        details.sourceTextMatches = details.text === refText;
        delete details.text;
        if (!details.sourceTextMatches) report.failures.push(`${name} ${mode}: source text differs`);
        const actual = PNG.sync.read(await page.screenshot({ path: path.join(output, `${name}-${mode}.png`) }));
        const expected = PNG.sync.read(await ref.screenshot());
        const differentPixels = pixelmatch(actual.data, expected.data, null, actual.width, actual.height, { threshold: .1 });
        details.referenceDifferencePercent = +(differentPixels / (actual.width * actual.height) * 100).toFixed(3);
        row[mode] = details;
      }
      report.pages.push(row);
      console.log(`${name}: desktop ${row.desktop.referenceDifferencePercent}% / phone ${row.phone.referenceDifferencePercent}% difference; source text ${row.desktop.sourceTextMatches && row.phone.sourceTextMatches ? "matches" : "differs"}`);
    }
    for (const target of localTargets) {
      const response = await desktop.request.get(base + target, { failOnStatusCode: false });
      if (response.status() >= 400) report.failures.push(`Local link HTTP ${response.status()}: ${target}`);
    }
    report.localTargets = localTargets.size;
    await mobile.goto(base + "/");
    await ready(mobile, ".design-mobile-header");
    await mobile.getByRole("button", { name: "Open menu", exact: true }).click();
    const opened = await mobile.getByRole("button", { name: "Open menu", exact: true }).getAttribute("aria-expanded") === "true";
    await mobile.screenshot({ path: path.join(output, "menu-phone.png") });
    await mobile.keyboard.press("Escape");
    const escaped = await mobile.getByRole("button", { name: "Open menu", exact: true }).getAttribute("aria-expanded") === "false";
    await mobile.getByRole("button", { name: "Open menu", exact: true }).click();
    await mobile.locator(".design-mobile-menu-nav").getByRole("link", { name: "Research", exact: true }).click();
    await ready(mobile, ".design-source h1");
    report.interactions.menu = { opened, escaped, navigated: new URL(mobile.url()).pathname === "/research", closedAfterNavigation: await mobile.getByRole("button", { name: "Open menu", exact: true }).getAttribute("aria-expanded") === "false" };
    await mobile.locator(".design-mobile-scroll").evaluate(el => el.scrollTop = 600);
    await mobile.setViewportSize({ width: 390, height: 700 });
    report.interactions.heightResizePreservesScroll = await mobile.locator(".design-mobile-scroll").evaluate(el => el.scrollTop === 600);
    await mobile.setViewportSize({ width: 360, height: 802 });
    await mobile.goto(base + "/");
    await ready(mobile, ".design-source h1");
    await mobile.screenshot({ path: path.join(output, "Home-360.png") });
    report.interactions.narrowHome = await mobile.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, lockups: [...document.querySelectorAll('.design-source span[data-lockup]')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).length }));
    await desktop.goto(base + "/contact");
    await ready(desktop, ".design-source form");
    await desktop.getByRole("button", { name: "Prepare Inquiry" }).click();
    const invalidPrevented = await desktop.locator("[data-design-mailto-fallback]").count() === 0;
    await desktop.locator('input[name="name"]').fill("Website Review");
    await desktop.locator('input[name="email"]').fill("review@example.test");
    await desktop.locator('textarea[name="message"]').fill("Synthetic website review message. No delivery requested.");
    await desktop.locator('input[name="ack"]').check();
    await desktop.getByRole("button", { name: "Prepare Inquiry" }).click();
    const href = await desktop.locator("[data-design-mailto-fallback]").getAttribute("href");
    report.interactions.contact = { invalidPrevented, draftPrepared: href?.startsWith("mailto:Sarah.Lidstone@gmail.com?"), includesFields: decodeURIComponent(href || "").includes("review@example.test") };
    const withoutJS = await browser.newContext({ javaScriptEnabled: false });
    const noJSPage = await withoutJS.newPage();
    await noJSPage.goto(base + "/research");
    report.interactions.serverRendered = await noJSPage.locator(".design-source article").count() === 11;
    await withoutJS.close();
    if (Object.values(report.interactions.menu).some(value => !value) || !report.interactions.heightResizePreservesScroll || !report.interactions.serverRendered || Object.values(report.interactions.contact).some(value => !value) || report.interactions.narrowHome.lockups) report.failures.push("An interaction or narrow viewport check failed");
    report.failures.push(...new Set(errors));
    report.warnings = [...warnings];
    await fs.writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2) + "\n");
    console.log(JSON.stringify({ interactions: report.interactions, localTargets: report.localTargets, failures: report.failures, externalWarnings: warnings.size }, null, 2));
    if (report.failures.length) process.exitCode = 1;
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
