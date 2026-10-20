# Sarah Lidstone website replacement

The replacement is implemented in the existing Next.js website project using the approved Claude design from “Build Sarah Lidstone website.” It includes all 11 supplied site pages and all 34 supplied image assets. The original ZIP/reference and the separate mockup remain in sibling folders.

## Preview and checks

From this folder:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3005
```

Open [the replacement preview](http://127.0.0.1:3005/). For development, use `npm run dev`. Run `npm run typecheck` to check TypeScript.

The production build prerenders every page. The replacement has no dependency on the design runtime or an iframe for its page layout. Google Fonts and third-party media embeds still require network access.

## Structure

- `content/design-pages.json`: supplied content and rendered design markup for all 11 pages, with native route and local asset URLs.
- `components/DesignPage.tsx` and `app/design.css`: desktop presentation, source mobile transformation, accessible mobile menu, and contact email draft handling.
- `app/`: native routes, metadata, sitemap, redirects, and page-not-found recovery.
- `public/`: supplied visuals plus the existing portrait/headshot files referenced by the source.
- `scripts/export-design.cjs`: repeatable content export from the immutable reference served at a local URL.

Keep the approved source content as the authority for future edits. The exporter can be rerun with `node scripts/export-design.cjs --base-url http://127.0.0.1:3100`; it needs Playwright and Chromium, configurable through `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH`.

## Verification evidence

`qa/replacement-20261020/report.json` records the route, image, local-link, content, responsive, menu, and contact checks. Screenshots in the same directory document all 11 pages at 1440×1000 and 390×802. Their first-viewport comparisons against the source mockup had no different pixels at the configured comparison threshold, and complete page text matched. The 360px homepage lockup fits.

The browser checks confirmed validation and a mailto draft only; no message was sent. Existing speaking URLs are retained at `/speaking-media`, and `/speaking` plus the source `.dc.html` URLs redirect to native routes.

Run the comparison again with `node scripts/verify-design.cjs` while both local servers are running. It requires the bundled browser/image comparison libraries or equivalent installed modules.

## Supplied content still awaiting completion

The reference intentionally contains unfinished material:

- Consulting: FAST PD Clinics, Care Finder, and Digital Hub descriptions.
- Education: YouTube channel description, topics, and posting schedule.
- Accessibility: approved monitored feedback route.
- Speaking: the populated HTML speaker one-sheet from the old site is reused at `/downloads/speaker-one-sheet-placeholder.html`, pending a future updated sheet.
- The source footer says content requires final approval before publication.

The owner approved publishing these unfinished source sections as supplied on 2026-10-20 and updating them later. The owner also authorized reuse of the old speaker one-sheet. No professional descriptions, claims, or download assets were invented.

The [asset and external-link audit](docs/asset-link-audit.md) records all supplied file hashes and 58 destination checks. No visitor link returned a confirmed 404/410; 21 destinations blocked automated requests. Facebook and Instagram embeds may be blocked, and the source's direct “Watch” links remain available.

## Replacing the live website

The existing GitHub/Vercel connection is retained. The owner authorized production publication on 2026-10-20 through the existing repository workflow, including the source placeholders and old speaker one-sheet. The pre-replacement site can be recovered from commit `a1ef46c` in Git history.
