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
- Speaking: final speaker one-sheet; the local HTML download remains a placeholder.
- The source footer says content requires final approval before publication.

These items are preserved for review. No professional descriptions, claims, or download assets were invented.

The [asset and external-link audit](docs/asset-link-audit.md) records all supplied file hashes and 58 destination checks. No visitor link returned a confirmed 404/410; 21 destinations blocked automated requests. Facebook and Instagram embeds may be blocked, and the source's direct “Watch” links remain available.

## Replacing the live website

The existing GitHub/Vercel connection is retained. Work is on branch `codex/sarah-design-replacement-20261020`. Nothing has been pushed or deployed by this build. After the replacement and remaining content are approved, publish through the existing repository workflow. The current live site can be recovered from the pre-replacement Git history.
