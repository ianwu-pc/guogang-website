# Guogang serif font

Unmodified Noto Serif TC v36 WOFF2 Unicode segments, licensed under the included SIL Open Font License. Source URLs are recorded in `source.json`.

`app/fonts.css` declares the full segmented family at weights 200–900. The browser requests only segments needed by the displayed text; visitors do not contact Google Fonts.

Do not replace this family with a single Google Fonts segment. A single segment contains only part of the Chinese character set, causing words in one paragraph to mix the web font with platform-specific fallback fonts. This mixed-font defect was identified while investigating inconsistent glyph appearance reported in Safari on macOS.

The rendered HTML tests check that all published Chinese characters have declared coverage. Browser QA also checks actual rendered font usage through Chromium's `CSS.getPlatformFontsForNode`. macOS Safari itself must be verified on a Mac.

## Content subsets

The `*-home.woff2` and `*-site.woff2` files are lossless glyph subsets of the original segments, retaining variable weights and original metrics. Their explicit Unicode ranges override the complete family; characters added later still resolve through the original full segments. Home and remaining site ranges are disjoint to avoid redundant downloads.

After a successful Pages export, run `python scripts/subset-fonts.py` with fontTools and brotli available, then rebuild and export. The script reads rendered homepage text and application source text; generated assets are committed, so production builds need no Python dependency. Verify actual browser font bytes and custom-font usage after regeneration.
