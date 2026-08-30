import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const worker = (await import(workerUrl.href)).default;

async function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const routes = [
  "/",
  "/goods",
  "/goods/goods-01",
  "/guogang",
  "/people",
  "/about",
];

test("all required public routes render", async () => {
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should return 200`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  }
});

test("homepage contains the complete editorial structure", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /這裡是過港/);
  assert.match(html, /home-scroll-01\.webp/);
  assert.match(html, /home-scroll-01-1280\.webp/);
  assert.match(html, /scroll-story-sticky tone-paper has-photo/);
  assert.doesNotMatch(html, /River notes · place|scroll-story-number|scroll-story-note/);
  assert.doesNotMatch(html, /guogang-river-sketch\.png/);
  assert.doesNotMatch(html, /scroll-story-progress/);
  assert.match(html, /一個名字，/);
  assert.match(html, /把熟悉的日常/);
  assert.match(html, /goods-01-cutout\.png/);
  assert.match(html, /港式蘿蔔糕/);
  assert.match(html, /鴉片鐵蛋/);
  assert.match(html, /瓶蓋牆奶奶/);
  assert.match(html, /早餐店老闆娘/);
  assert.match(html, /煮飯媽媽/);
  assert.match(html, /一群人一起做的事/);
  assert.match(html, /如果喜歡過港/);
  assert.match(html, /205 基隆市暖暖區過港里過港路 54 號/);
  assert.match(html, /02-2458-8802/);
  assert.match(html, /前往 Facebook/);
  assert.doesNotMatch(html, /association-structure\.png|組織架構圖/);
  assert.doesNotMatch(html, /社區故事 01/);
  assert.doesNotMatch(html, /codex-preview|Starter Project|Building your site|react-loading-skeleton/i);
});

test("homepage scroll story maps all four supplied photos in order", async () => {
  const source = await readFile(
    new URL("../app/components/HomeScrollStory.tsx", import.meta.url),
    "utf8",
  );
  const desktopImages = ["01", "02", "03", "04"].map(
    (number) => `home-scroll-${number}.webp`,
  );

  for (const number of ["01", "02", "03", "04"]) {
    assert.match(source, new RegExp(`home-scroll-${number}\\.webp`));
    assert.match(source, new RegExp(`home-scroll-${number}-1280\\.webp`));
  }

  assert.deepEqual(
    desktopImages.map((image) => source.indexOf(image)),
    desktopImages.map((image) => source.indexOf(image)).toSorted((a, b) => a - b),
    "homepage scroll photos should follow scene order",
  );
});

test("homepage and goods controls use the organic, borderless treatment", async () => {
  const home = await readFile(new URL("../app/components/HomeScrollStory.tsx", import.meta.url), "utf8");
  const gallery = await readFile(new URL("../app/components/ProductGallery.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.doesNotMatch(home, /scroll-story-progress/);
  assert.doesNotMatch(home, /scroll-story-number|scroll-story-note|eyebrow:/);
  assert.match(gallery, /&lt;/);
  assert.match(gallery, /&gt;/);
  assert.match(css, /\.product-gallery-arrow\s*\{[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;/);
  assert.match(css, /\.product-gallery \.image-placeholder\s*\{\s*border:\s*0;/);
  assert.match(css, /\.header-line-button\s*\{[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;/);
});

test("homepage photo story shows the header fade before scrolling", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(
    css,
    /body:has\(\.scroll-story-sticky\.has-photo\) \.site-header::before/,
  );
});

test("homepage uses one organic scroll cue instead of the retired four-line progress", async () => {
  const response = await render("/");
  const html = await response.text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(html, /往下看看/);
  assert.match(html, /scroll-story-cue/);
  assert.match(css, /@keyframes scroll-cue-float/);
  assert.doesNotMatch(html, /scroll-story-progress/);
});

test("desktop serif stays unchanged while mobile uses the bundled serif font", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(
    css,
    /:root\s*\{[\s\S]*?--serif:\s*"Noto Serif TC",\s*"Source Han Serif TC",\s*"Songti TC",\s*"PMingLiU",\s*serif/,
  );
  assert.match(css, /@font-face\s*\{[\s\S]*?font-family:\s*"Guogang Mobile Serif"[\s\S]*?guogang-serif-mobile\.woff2/);
  assert.match(
    css,
    /@media \(max-width: 760px\)\s*\{[\s\S]*?:root\s*\{[\s\S]*?--serif:\s*"Guogang Mobile Serif"/,
  );
});

test("header color follows the visual section instead of a small scroll threshold", async () => {
  const header = await readFile(
    new URL("../app/components/SiteHeader.tsx", import.meta.url),
    "utf8",
  );
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(header, /const visualSection = pagePhoto \?\? story/);
  assert.match(header, /visualSection\.getBoundingClientRect\(\)\.bottom <= headerHeight/);
  assert.match(header, /overPagePhoto && !menuOpen/);
  assert.match(
    css,
    /body:has\(\.scroll-story-sticky\.has-photo\) \.site-header:not\(\.is-scrolled\)/,
  );
});

test("chapter order, photo intros, compact goods gallery and interactive map match the current site", async () => {
  const goodsResponse = await render("/goods");
  const goodsHtml = await goodsResponse.text();
  assert.match(goodsHtml, /page-intro-index[^>]*>03</);
  assert.match(goodsHtml, /過港好味\.jpg/);
  assert.doesNotMatch(goodsHtml, /catalog-index|product-gallery-count|product-gallery-dots|product-gallery-controls/);
  assert.match(goodsHtml, /product-gallery-arrow-prev/);
  assert.match(goodsHtml, /product-gallery-arrow-next/);
  assert.match(goodsHtml, /goods-01-cutout\.png/);
  assert.match(goodsHtml, /goods-01-photo\.jpg/);
  assert.match(goodsHtml, /product-image-cutout/);
  assert.ok(
    goodsHtml.indexOf("goods-01-cutout.png") < goodsHtml.indexOf("goods-01-photo.jpg"),
    "the cutout product image should be first",
  );

  const guogangResponse = await render("/guogang");
  const guogangHtml = await guogangResponse.text();
  assert.match(guogangHtml, /page-intro-index[^>]*>01</);
  assert.match(guogangHtml, /認識過港\.jpg/);
  assert.match(guogangHtml, /新的居民，在過港落腳/);
  assert.match(guogangHtml, /過港互動示意地圖/);
  assert.match(guogangHtml, /暖暖溪河岸/);
  assert.match(guogangHtml, /社區發展協會/);
  assert.doesNotMatch(guogangHtml, /地點名單待確認/);
  assert.match(guogangHtml, /故事走到今天/);
  assert.doesNotMatch(guogangHtml, /ABOUT THE SOURCE/);
});

test("interactive map supports pointer, touch and keyboard selection", async () => {
  const map = await readFile(
    new URL("../app/components/GuogangInteractiveMap.tsx", import.meta.url),
    "utf8",
  );
  assert.match(map, /useState/);
  assert.match(map, /onMouseEnter=/);
  assert.match(map, /onFocus=/);
  assert.match(map, /onClick=/);
  assert.match(map, /aria-pressed=/);
  assert.match(map, /id="guogang-map"/);
});

test("people page presents the six manuscript story directions without invented names", async () => {
  const response = await render("/people");
  const html = await response.text();
  assert.match(html, /page-intro-index[^>]*>02</);
  assert.match(html, /過港人物\.jpg/);
  assert.match(html, /瓶蓋牆奶奶/);
  assert.match(html, /早餐店老闆娘/);
  assert.match(html, /夫妻故事一/);
  assert.match(html, /夫妻故事二/);
  assert.match(html, /人物姓名與完整訪談仍在確認/);
  assert.doesNotMatch(html, /people-empty-index|01—/);
});

test("about page does not publish the supplied organization chart", async () => {
  const response = await render("/about");
  const html = await response.text();
  assert.match(html, /page-intro-index[^>]*>04</);
  assert.match(html, /關於我們\.jpg/);
  assert.doesNotMatch(html, /association-structure\.png|組織架構圖|會員大會/);
});

test("retired story routes point visitors to the association history", async () => {
  for (const route of ["/stories", "/stories/story-01"]) {
    const response = await render(route);
    assert.ok([307, 308].includes(response.status), `${route} should redirect`);
    assert.equal(response.headers.get("location"), "/about#history");
  }
});

test("placeholder people detail pages are no longer public", async () => {
  const response = await render("/people/interview-01");
  assert.equal(response.status, 404);
});

test("unset LINE links render safe buttons without fake URLs", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /LINE 連結即將提供/);
  assert.match(html, /加入 LINE 看本期好味/);
  assert.doesNotMatch(html, /line\.me|lin\.ee/i);
});
