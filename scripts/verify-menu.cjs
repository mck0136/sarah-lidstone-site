#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { chromium, webkit } = require("/Users/mark_mckendry/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const BASE_URL = (process.env.BASE_URL || "http://127.0.0.1:3005").replace(/\/$/, "");
const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "qa", "menu-fix-20261020");
const INSTALLED_CHROMIUM = "/Users/mark_mckendry/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const ROUTES = [
  ["Home", "/"],
  ["About", "/about"],
  ["Research", "/research"],
  ["Speaking", "/speaking-media"],
  ["Integrated Care", "/integrated-care"],
  ["Consulting", "/consulting"],
  ["Creative", "/creative"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy"],
  ["Accessibility", "/accessibility"],
  ["Education", "/education"]
];

fs.mkdirSync(OUTPUT, { recursive: true });

const report = {
  baseUrl: BASE_URL,
  startedAt: new Date().toISOString(),
  browser: "Chromium",
  mode: "390px touch emulation",
  routes: [],
  interactionChecks: [],
  desktop: null,
  webkit: "not checked",
  errors: []
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitReady(page) {
  await page.locator('[data-ready="true"]').waitFor({ state: "visible", timeoutMs: 15000 });
  if (await page.evaluate(() => innerWidth <= 767)) {
    await page.locator(".design-mobile-header").waitFor({ state: "visible", timeoutMs: 10000 });
  }
}

async function navigate(page, route) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await waitReady(page);
}

async function layoutState(page) {
  return page.evaluate(() => {
    const rect = (element) => {
      const r = element.getBoundingClientRect();
      return { x: Math.round(r.x * 10) / 10, y: Math.round(r.y * 10) / 10, width: Math.round(r.width * 10) / 10, height: Math.round(r.height * 10) / 10 };
    };
    const source = document.querySelector(".design-source");
    const elements = source ? [...source.querySelectorAll("*")] : [];
    const styleSignature = elements.flatMap((element, index) => {
      const style = getComputedStyle(element);
      const inline = element.style;
      const transformed = style.transform !== "none";
      const grid = style.display === "grid";
      const largeText = Number.parseFloat(style.fontSize) >= 28;
      if (!transformed && !grid && !largeText) return [];
      return [{ index, tag: element.tagName, fontSize: style.fontSize, display: style.display, grid: grid ? style.gridTemplateColumns : "", transform: style.transform, inline: inline.cssText }];
    });
    const mobileHeader = document.querySelector(".design-mobile-header");
    const menu = document.querySelector(".design-mobile-menu");
    const scroll = document.querySelector(".design-mobile-scroll");
    const sourceHeaders = source ? [...source.querySelectorAll("header")].map(rect) : [];
    const sourceNavs = source ? [...source.querySelectorAll("nav")].map(rect) : [];
    return {
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      totalHeaders: document.querySelectorAll("header").length,
      mobileHeaderCount: document.querySelectorAll(".design-mobile-header").length,
      mobileHeaderRect: mobileHeader ? rect(mobileHeader) : null,
      sourceHeaderCount: sourceHeaders.length,
      sourceHeaders,
      sourceNavCount: sourceNavs.length,
      sourceNavs,
      menuHidden: menu?.getAttribute("aria-hidden") === "true",
      menuRect: menu ? rect(menu) : null,
      scrollHeight: scroll?.scrollHeight || 0,
      clientHeight: scroll?.clientHeight || 0,
      scrollTop: scroll?.scrollTop || 0,
      styleSignature
    };
  });
}

async function assertClosedMobile(page, where) {
  const state = await layoutState(page);
  assert(state.mobileHeaderCount === 1, `${where}: expected one mobile header, found ${state.mobileHeaderCount}`);
  assert(state.totalHeaders === 1, `${where}: expected one total header, found ${state.totalHeaders}`);
  assert(state.sourceHeaderCount === 0, `${where}: source header returned (${JSON.stringify(state.sourceHeaders)})`);
  assert(state.sourceNavCount === 0, `${where}: source desktop nav returned (${JSON.stringify(state.sourceNavs)})`);
  assert(state.menuHidden, `${where}: mobile menu is not closed`);
  assert(state.documentWidth === state.width, `${where}: horizontal overflow (${state.documentWidth}px at ${state.width}px)`);
  return state;
}

async function openMenu(page) {
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator('.design-mobile-menu[aria-hidden="false"]').waitFor({ state: "visible", timeoutMs: 5000 });
}

async function closeWithX(page) {
  await page.getByRole("button", { name: "Close menu" }).click();
  await page.locator('.design-mobile-menu[aria-hidden="true"]').waitFor({ state: "hidden", timeoutMs: 5000 });
}

async function runMobile(browser, browserName) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  const before = {};

  try {
    for (const [name, route] of ROUTES) {
      await navigate(page, route);
      const state = await assertClosedMobile(page, `${browserName} ${name} initial`);
      before[route] = state.styleSignature;
      await openMenu(page);
      assert(await page.locator('.design-mobile-menu[aria-hidden="false"] .design-mobile-menu-nav a').count() === 7,
        `${browserName} ${name}: expected seven primary links in open menu`);
      await closeWithX(page);
      const after = await assertClosedMobile(page, `${browserName} ${name} after X`);
      assert(JSON.stringify(before[route]) === JSON.stringify(after.styleSignature),
        `${browserName} ${name}: source font/grid/transform styles changed across open/close`);
      report.routes.push({ browser: browserName, name, route, passed: true });
      if (route === "/consulting" && browserName === "Chromium") {
        await page.screenshot({ path: path.join(OUTPUT, "local-consulting-closed.png"), fullPage: false });
        await openMenu(page);
        await page.screenshot({ path: path.join(OUTPUT, "local-consulting-open.png"), fullPage: false });
        await closeWithX(page);
        await page.screenshot({ path: path.join(OUTPUT, "local-consulting-closed-after.png"), fullPage: false });
      }
    }

    await navigate(page, "/consulting");
    await openMenu(page);
    await page.keyboard.press("Escape");
    await page.locator('.design-mobile-menu[aria-hidden="true"]').waitFor({ state: "hidden", timeoutMs: 5000 });
    await assertClosedMobile(page, `${browserName} Escape`);
    report.interactionChecks.push({ browser: browserName, check: "Escape closes menu", passed: true });

    await openMenu(page);
    await page.locator(".design-mobile-menu-nav a").filter({ hasText: "Consulting" }).click();
    await page.waitForLoadState({ state: "domcontentloaded", timeoutMs: 10000 }).catch(() => {});
    await waitReady(page);
    await assertClosedMobile(page, `${browserName} same-page navigation`);
    assert(new URL(await page.url()).pathname === "/consulting", `${browserName}: same-page navigation changed route unexpectedly`);
    report.interactionChecks.push({ browser: browserName, check: "same-page navigation closes menu", passed: true });

    await openMenu(page);
    await page.locator(".design-mobile-menu-nav a").filter({ hasText: "About" }).click();
    await page.waitForLoadState({ state: "domcontentloaded", timeoutMs: 10000 }).catch(() => {});
    await waitReady(page);
    await assertClosedMobile(page, `${browserName} other-page navigation`);
    assert(new URL(await page.url()).pathname === "/about", `${browserName}: other-page navigation did not reach /about`);
    report.interactionChecks.push({ browser: browserName, check: "other-page navigation closes menu", passed: true });

    await navigate(page, "/consulting");
    const baseline = await assertClosedMobile(page, `${browserName} repeated-cycle baseline`);
    for (let i = 1; i <= 5; i++) {
      await openMenu(page);
      if (i % 2 === 0) await page.keyboard.press("Escape");
      else await page.getByRole("button", { name: "Close menu" }).click();
      await page.locator('.design-mobile-menu[aria-hidden="true"]').waitFor({ state: "hidden", timeoutMs: 5000 });
      const state = await assertClosedMobile(page, `${browserName} repeated cycle ${i}`);
      assert(JSON.stringify(baseline.styleSignature) === JSON.stringify(state.styleSignature),
        `${browserName}: source style signature changed after cycle ${i}`);
    }
    report.interactionChecks.push({ browser: browserName, check: "five repeated open/close cycles", passed: true });

    await page.evaluate(() => {
      const scroll = document.querySelector(".design-mobile-scroll");
      scroll.scrollTop = Math.min(360, scroll.scrollHeight - scroll.clientHeight - 1);
    });
    const scrollBefore = await page.locator(".design-mobile-scroll").evaluate((element) => element.scrollTop);
    assert(scrollBefore > 0, `${browserName}: consulting page could not be scrolled for resize check`);
    await page.setViewportSize({ width: 390, height: 640 });
    const scrollAfter = await page.locator(".design-mobile-scroll").evaluate((element) => element.scrollTop);
    assert(Math.abs(scrollAfter - scrollBefore) <= 1,
      `${browserName}: scroll moved during height-only resize (${scrollBefore} -> ${scrollAfter})`);
    await page.setViewportSize({ width: 390, height: 844 });
    const restored = await assertClosedMobile(page, `${browserName} height resize restore`);
    assert(Math.abs(restored.scrollTop - scrollBefore) <= 1,
      `${browserName}: scroll did not remain stable after restoring height (${scrollBefore} -> ${restored.scrollTop})`);
    report.interactionChecks.push({ browser: browserName, check: "scroll preserved through height-only resize", passed: true, scrollTop: scrollBefore });
  } finally {
    await context.close();
  }
}

async function runDesktop(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  try {
    await navigate(page, "/consulting");
    const state = await page.evaluate(() => ({
      width: innerWidth,
      mobileHeaderCount: document.querySelectorAll(".design-mobile-header").length,
      sourceHeaders: [...document.querySelectorAll(".design-source-desktop header")].map((header) => {
        const rect = header.getBoundingClientRect();
        return { width: rect.width, height: rect.height, display: getComputedStyle(header).display, visibility: getComputedStyle(header).visibility };
      }),
      sourceNavs: [...document.querySelectorAll(".design-source-desktop nav")].map((nav) => {
        const rect = nav.getBoundingClientRect();
        return { width: rect.width, height: rect.height, display: getComputedStyle(nav).display, visibility: getComputedStyle(nav).visibility };
      })
    }));
    assert(state.mobileHeaderCount === 0, `desktop: unexpected mobile header (${state.mobileHeaderCount})`);
    assert(state.sourceHeaders.length === 1, `desktop: expected original source header, found ${state.sourceHeaders.length}`);
    assert(state.sourceHeaders[0].display !== "none" && state.sourceHeaders[0].visibility !== "hidden" && state.sourceHeaders[0].width > 500,
      `desktop: original header is not visible (${JSON.stringify(state.sourceHeaders[0])})`);
    assert(state.sourceNavs.length > 0 && state.sourceNavs.some((nav) => nav.display !== "none" && nav.visibility !== "hidden" && nav.width > 500),
      `desktop: original source navigation is not visible (${JSON.stringify(state.sourceNavs)})`);
    await page.screenshot({ path: path.join(OUTPUT, "local-consulting-desktop.png"), fullPage: false });
    report.desktop = { passed: true, width: state.width, ...state };
  } finally {
    await context.close();
  }
}

(async () => {
  let browser;
  try {
    const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || (fs.existsSync(INSTALLED_CHROMIUM) ? INSTALLED_CHROMIUM : undefined);
    browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
    await runMobile(browser, "Chromium");
    await runDesktop(browser);
  } catch (error) {
    report.errors.push({ browser: "Chromium", message: error.message, stack: error.stack });
  } finally {
    await browser?.close();
  }

  try {
    const safari = await webkit.launch({ headless: true });
    report.webkit = "installed; running touch emulation suite";
    report.browser = "Chromium and WebKit";
    try {
      await runMobile(safari, "WebKit");
    } catch (error) {
      report.errors.push({ browser: "WebKit", message: error.message, stack: error.stack });
    }
    await safari.close();
  } catch (error) {
    report.webkit = `unavailable (${error.message.split("\n")[0]}); Chromium touch emulation used`;
  }

  report.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(OUTPUT, "menu-regression-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  const passed = report.errors.length === 0 && report.routes.every((route) => route.passed) && report.desktop?.passed;
  console.log(JSON.stringify({
    baseUrl: report.baseUrl,
    routePasses: report.routes.length,
    interactionChecks: report.interactionChecks,
    desktop: report.desktop,
    webkit: report.webkit,
    errors: report.errors.map(({ browser: name, message }) => ({ browser: name, message })),
    report: path.join(OUTPUT, "menu-regression-report.json"),
    passed
  }, null, 2));
  if (!passed) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
