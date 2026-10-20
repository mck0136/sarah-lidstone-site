# Asset and link audit

Audit date: 2026-10-20  
Source: `sarah-lidstone-design-reference-20261019` and the active site's `content/site.ts`, `app/research/page.tsx`, and `app/speaking-media/page.tsx`.

## Supplied assets

All supplied design-reference assets were copied byte-for-byte into the site's public directory. SHA-256 comparisons verified 14 images, 18 uploads, and 2 exports. Existing portrait, headshot, logo, and monogram files were preserved. The complete per-file comparison is in [`content/design-assets-audit.json`](../content/design-assets-audit.json).

The app can use same-domain reference URLs as local root paths. The existing headshot and portrait paths are present under `public/images/`; new design images live beside them. The supplied export files are under `public/exports/`.

## Outbound links

The audit collected 58 unique HTTP(S) destinations from the HTML reference pages and the active research data, including generated PubMed and DOI publication links. A bounded GET check used a one-byte Range request, a maximum of four concurrent requests, and an eight-second timeout. The workspace TLS gateway certificate was not trusted by Python, so the audit disabled certificate verification for the connectivity check; treat these results as HTTP reachability evidence only.

- 36 destinations returned HTTP 200 or 206.
- 21 returned HTTP 403. These are blocked or rate-limited by the destination or network path; they are not confirmed missing.
- One source-only preconnect URL (`https://fonts.googleapis.com`, the bare origin) returned 404. It is a font connection hint, not a visitor-facing link.
- No visitor-facing destination returned a confirmed 404 or 410.

The full URL-by-URL status, redirect target, and error record is in [`content/design-assets-audit.json`](../content/design-assets-audit.json). This union includes legacy destinations found in reference HTML that are not necessarily part of the active app. Key active destinations include the TEDx YouTube video, the PubMed author search, ORCID, and 11 PubMed/DOI pairs. Several publisher, PubMed, and podcast hosts returned 403, so their availability could not be confirmed by this network check.

## Local routes and placeholders

The replacement app includes all 11 supplied routes, including Consulting, Creative, and Education alongside the existing pages.

Speaking & Media links to `/downloads/speaker-one-sheet-placeholder.html`. Despite the legacy filename, this is the old site's populated, styled HTML one-sheet with biography, speaking topics, audiences, contact details, and a headshot. The replacement reuses the file unchanged; the owner explicitly approved this reuse on 2026-10-20 pending a future update. The owner also approved publication of the remaining source placeholders as supplied. The Research page states that citation counts are omitted because no stable public source was available.
