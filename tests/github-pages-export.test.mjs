import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(projectRoot, "github-pages-dist");
const basePath = normalizeBasePath(process.env.PAGES_BASE_PATH ?? inferBasePath());

const requiredFiles = [
  "index.html",
  "goods/index.html",
  "goods/goods-01/index.html",
  "goods/goods-06/index.html",
  "guogang/index.html",
  "people/index.html",
  "about/index.html",
  "images/guogang-history-1949.png",
  "images/goods/goods-01-cutout.png",
  "images/goods/goods-01-photo.jpg",
  "og-revision.png",
  ".nojekyll",
  "404.html",
  "sitemap.xml",
  "robots.txt",
];

test("GitHub Pages output contains every public route and required image", async () => {
  for (const relativePath of requiredFiles) await access(path.join(outputRoot, relativePath));
});

test("exported pages preserve revision content and interactions", async () => {
  const home = await read("index.html");
  const goods = await read("goods/index.html");
  const guogang = await read("guogang/index.html");
  const people = await read("people/index.html");
  const about = await read("about/index.html");

  assert.match(home, /過港，從一條河的對岸開始/);
  assert.match(goods, /product-gallery-arrow-next/);
  assert.match(guogang, /過港互動示意地圖/);
  assert.match(people, /人物6/);
  assert.doesNotMatch(`${home}${about}`, /association-structure\.png|組織架構圖|會員大會/);
});

test("repository subpath is applied to every root-relative link and asset", async () => {
  if (!basePath) return;
  for (const relativePath of ["index.html", "goods/index.html", "guogang/index.html", "people/index.html", "about/index.html"]) {
    const html = await read(relativePath);
    const references = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((match) => match[1]);
    assert.ok(references.length > 0, `${relativePath} should contain local links or assets`);
    for (const reference of references) {
      assert.ok(reference.startsWith(`${basePath}/`) || reference === basePath, `${relativePath}: ${reference}`);
    }
  }
});

test("every exported local asset reference resolves inside the Pages artifact", async () => {
  const pages = ["index.html", "goods/index.html", "guogang/index.html", "people/index.html", "about/index.html"];
  const assetPaths = new Set();

  for (const relativePath of pages) {
    const html = await read(relativePath);
    const references = [...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)].map((match) => match[1]);

    for (const reference of references) {
      const assetPath = toArtifactAssetPath(reference);
      if (assetPath) assetPaths.add(assetPath);
    }
  }

  assert.ok(assetPaths.size > 0, "exported pages should reference local assets");
  for (const assetPath of assetPaths) await access(path.join(outputRoot, assetPath));
});

async function read(relativePath) {
  return readFile(path.join(outputRoot, relativePath), "utf8");
}

function inferBasePath() {
  const [owner = "", repository = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (!repository || repository.toLowerCase() === `${owner.toLowerCase()}.github.io`) return "";
  return `/${repository}`;
}

function normalizeBasePath(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function toArtifactAssetPath(reference) {
  const pathname = new URL(reference, "https://example.invalid").pathname;
  const relativePath = basePath && pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length + 1)
    : pathname.replace(/^\/+/, "");

  if (
    relativePath.startsWith("_next/") ||
    relativePath.startsWith("images/") ||
    /\.(?:avif|css|gif|ico|jpe?g|js|png|svg|webp|woff2?)$/i.test(relativePath)
  ) {
    return decodeURIComponent(relativePath);
  }

  return null;
}
