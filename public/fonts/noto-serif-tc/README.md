# Guogang serif font

Unmodified Noto Serif TC v36 WOFF2 Unicode segments, licensed under the included SIL Open Font License. Source URLs are recorded in `source.json`.

`app/fonts.css` declares the full segmented family at weights 200–900. The browser requests only segments needed by the displayed text; visitors do not contact Google Fonts.

Do not replace this family with a single Google Fonts segment. A single segment contains only part of the Chinese character set, causing words in one paragraph to mix the web font with platform-specific fallback fonts. This mixed-font defect was identified while investigating inconsistent glyph appearance reported in Safari on macOS.

The rendered HTML tests check that all published Chinese characters have declared coverage. Browser QA also checks actual rendered font usage through Chromium's `CSS.getPlatformFontsForNode`. macOS Safari itself must be verified on a Mac.
