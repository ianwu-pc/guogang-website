# Guogang serif font

Unmodified Noto Serif TC v36 WOFF2 Unicode segments, licensed under the included SIL Open Font License. Source URLs are recorded in `source.json`.

`app/fonts.css` declares the full segmented family at weights 200–900. The browser requests only segments needed by the displayed text; visitors do not contact Google Fonts.

Do not replace this family with a single Google Fonts segment. A single segment contains only part of the Chinese character set, causing words in one paragraph to mix the web font with platform-specific fallback fonts. This mixed-font defect was identified while investigating inconsistent glyph appearance reported in Safari on macOS.

The rendered HTML tests check that all published Chinese characters have declared coverage. Browser QA also checks actual rendered font usage through Chromium's `CSS.getPlatformFontsForNode`. macOS Safari itself must be verified on a Mac.

## Content subsets

The `*-home.woff2` and `*-site.woff2` files are lossless glyph subsets of the original segments, retaining variable weights and original metrics. Their explicit Unicode ranges override the complete family; characters added later still resolve through the original full segments. Home and remaining site ranges are disjoint to avoid redundant downloads.

After a successful Pages export, run `python scripts/subset-fonts.py` with fontTools and brotli available, then rebuild and export. The script reads rendered homepage text and application source text; generated assets are committed, so production builds need no Python dependency. Verify actual browser font bytes and custom-font usage after regeneration.

## Page font bundles (2026-09-20)

The Pages exporter now preloads **one complete font subset per route** from
`public/fonts/pages/`, with content-addressed URLs. It uses the same Noto Serif TC
2.003 variable font (weights 200–900), not a replacement typeface. The older
Unicode segments remain a fallback for unforeseen characters. Page bundles include
all visible text and image labels; the Guogang bundle also includes dynamic map
copy. This prevents the overlapping full/site/home segments from causing dozens
of concurrent font requests.

After a copy change introduces new characters, export the updated pages, then run:

```powershell
python scripts/build-page-fonts.py path/to/NotoSerifTC.ttf
python scripts/measure-image-sizes.py
pnpm export:pages
pnpm test:pages
```

Download the upstream variable TTF from
https://github.com/google/fonts/tree/main/ofl/notoseriftc (SIL OFL).
Commit generated `public/fonts/pages/`, `scripts/page-fonts.json` and
`scripts/image-sizes.json` together with the content changes. CI does not need Python
or network font generation. The export test rejects missing characters, mismatched
font hashes and images without intrinsic dimensions. The image manifest reserves
space before lazy images load, avoiding layout collapse and premature downloads.

Verify interactive map content and menu/flip interactions in the exported browser
preview, not just development mode. Network timings depend on the hosting route;
local throttling measurements are not promises about real-world loading time.
