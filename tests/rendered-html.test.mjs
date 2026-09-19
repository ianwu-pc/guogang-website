import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { peopleSources, assertPeopleSourceIntegrity } from "./people-source-integrity.mjs";

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
  "/people/bottle-cap-grandma",
  "/people/breakfast-shop-owner",
  "/people/community-kitchen-mother",
  "/people/couple-story-one",
  "/people/couple-story-two",
  "/people/community-volunteer",
  "/goods/goods-02",
  "/goods/goods-03",
  "/goods/goods-04",
  "/goods/goods-05",
  "/about",
];

test("all required public routes render", async () => {
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should return 200`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  }
});

test("self-hosted serif Unicode ranges cover all published Chinese text", async () => {
  const css = await readFile(new URL("../app/fonts.css", import.meta.url), "utf8");
  const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(globals, /@import "\.\/fonts\.css"/);
  assert.doesNotMatch(css, /url\(https?:/);
  const covered = new Set();
  for (const range of css.matchAll(/U\+([0-9a-f]+)(?:-([0-9a-f]+))?/gi)) {
    const start = parseInt(range[1], 16), end = parseInt(range[2] ?? range[1], 16);
    for (let code = start; code <= end; code++) covered.add(code);
  }
  for (const route of routes) {
    const html = await (await render(route)).text();
    const missing = [...new Set(html.match(/[\u3000-\u303f\u3400-\u9fff]/gu) ?? [])].filter(character => !covered.has(character.codePointAt(0)));
    assert.deepEqual(missing, [], `${route} must not need a system font for Chinese glyphs`);
  }
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

test("goods catalog contains every existing product story without detail-page navigation", async () => {
  const html = await (await render("/goods")).text();
  for (const number of ["01", "02", "03", "04", "05"]) {
    const detail = await (await render(`/goods/goods-${number}`)).text();
    const story = detail.match(/<section class="article-body good-story-body">([\s\S]*?)<\/section>/)?.[1];
    assert.ok(story, `existing story ${number} is available`);
    for (const paragraph of story.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
      assert.ok(html.includes(paragraph[1]), `story and shared ordering information ${number} remain readable on the catalog`);
    }
    assert.match(html, new RegExp(`id="goods-${number}"`));
  }
  assert.doesNotMatch(html, /href="[^\"]*\/goods\/goods-\d+/);
  assert.doesNotMatch(html, /查看這份好味/);
  assert.doesNotMatch(html, /catalog-purchase/);
  assert.equal((html.match(/<p[^>]*>過港的產品以小量製作為主。/g) ?? []).length, 1, "small-batch information appears once in the shared section");
});

test("chapter order, supplied goods photos and interactive map match the current site", async () => {
  const goodsResponse = await render("/goods");
  const goodsHtml = await goodsResponse.text();
  assert.match(goodsHtml, /page-intro-index[^>]*>03</);
  assert.match(goodsHtml, /過港好味\.webp/);
  assert.doesNotMatch(goodsHtml, /catalog-index|product-gallery-count|product-gallery-dots|product-gallery-controls/);
  assert.doesNotMatch(goodsHtml, /商品完整照｜待提供|商品製作過程照｜待提供|商品料理或食用情境照｜待提供/);
  assert.match(goodsHtml, /updated-20260919\/collection\.webp/);
  for (let index = 1; index <= 5; index++) {
    const id = String(index).padStart(2, "0");
    assert.match(goodsHtml, new RegExp(`updated-20260919/${id}-cutout\\.webp`));
    assert.match(goodsHtml, new RegExp(`updated-20260919/${id}-photo\\.webp`));
  }

  const guogangResponse = await render("/guogang");
  const guogangHtml = await guogangResponse.text();
  assert.match(guogangHtml, /page-intro-index[^>]*>01</);
  assert.match(guogangHtml, /認識過港\.webp/);
  assert.match(guogangHtml, /新的居民，在過港落腳/);
  assert.match(guogangHtml, /可探索的過港手繪生活地圖/);
  assert.match(guogangHtml, /guogang-map-2026\/background\.webp/);
  assert.match(guogangHtml, /guogang-map-2026\/shengguang-church\.webp/);
  assert.match(guogangHtml, /guogang-map-2026\/nuanjiang-walkway\.webp/);
  assert.match(guogangHtml, /小倆口福利社/);
  assert.match(guogangHtml, /過港社區發展協會/);
  for (const locationName of ["小倆口福利社", "美食坊早餐店", "舊警察宿舍", "暖江國小", "聖光堂", "黃蠟石文化館", "過港社區發展協會", "過港幼兒園", "過港郵局", "暖江步道", "暖江兒童公園", "北方大陸餅", "暖新住民會館", "過港福德宮"]) {
    assert.match(guogangHtml, new RegExp(locationName));
  }
  for (const name of ["港式／原味蘿蔔糕", "鴉片鐵蛋", "雙匯水餃", "清潤銀耳露", "海涼石花凍｜黑糖／百香果"]) {
    assert.match(goodsHtml, new RegExp(name));
  }
  assert.doesNotMatch(goodsHtml, /商品故事與特色待社區確認後補上|味道或特色｜待確認|製作者｜待確認/);
  assert.doesNotMatch(guogangHtml, /地點名單待確認/);
  assert.match(guogangHtml, /故事走到今天/);
  assert.doesNotMatch(guogangHtml, /ABOUT THE SOURCE/);
});

test("People article titles preserve the Google document's explicit line breaks", async () => {
  const peopleStories = await readFile(new URL("../app/data/peopleStories.ts", import.meta.url), "utf8");
  const stories = JSON.parse(peopleStories.split("export const PEOPLE_STORIES: PeopleStory[] = ")[1].split(";\n")[0]);

  for (const [slug, lines] of Object.entries({
    "bottle-cap-grandma": ["把時間，", "一個瓶蓋一個瓶蓋留在過港。"],
    "breakfast-shop-owner": ["二十五年，早晨裡的人慢慢熟了。"],
    "couple-story-one": ["四十多年，他們一起把日子過到了過港。"],
    "couple-story-two": ["去看看，最近好不好。"],
  })) {
    assert.deepEqual(stories.find((story) => story.slug === slug).titleLines, lines);
  }
});

test("finalized people stories render complete editorial pages from shared data", async () => {
  for (const source of peopleSources) {
    const route = `/people/${source.slug}`;
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should return 200`);
    const html = await response.text();
    assertPeopleSourceIntegrity(html, source);
    assert.match(html, /people-article-page/);
    assert.doesNotMatch(html, /people-article-inline-image/);
    const galleryStart = html.indexOf('class="people-article-gallery"');
    assert.ok(galleryStart > html.indexOf('class="people-article-ending"'), "gallery follows the complete story");
    const bodyBeforeGallery = html.slice(html.indexOf('<article class="people-article-content">'), galleryStart);
    assert.doesNotMatch(bodyBeforeGallery, /<img\b/, "no photos interrupt the article");
    assert.match(html, /← 上一篇人物/);
    assert.match(html, /返回全部人物/);
    assert.match(html, /下一篇人物 →/);
  }
});

test("shared Drive people photos are connected to all six finalized articles", async () => {
  const photos = await readFile(new URL("../app/data/peopleStoryPhotos.ts", import.meta.url), "utf8");
  for (const slug of ["bottle-cap-grandma", "breakfast-shop-owner", "community-kitchen-mother", "community-volunteer", "couple-story-one", "couple-story-two"]) {
    assert.match(photos, new RegExp(`"${slug}"`));
  }
  assert.match(photos, /people-updated-20260920\/lin-hero\.webp/);
  assert.match(photos, /people-updated-20260920\/breakfast-hero\.webp/);
  assert.match(photos, /people-updated-20260920\/kitchen-hero\.webp/);
  assert.match(photos, /people-updated-20260920\/meihua-hero\.webp/);
});

test("about page does not publish the supplied organization chart", async () => {
  const response = await render("/about");
  const html = await response.text();
  assert.match(html, /page-intro-index[^>]*>04</);
  assert.match(html, /關於我們\.webp/);
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

test("original page copy is preserved except explicitly replaced map copy and removed goods summaries", async () => {
  const { createHash } = await import("node:crypto");
  const baseline = JSON.parse(await readFile(new URL("./fixtures/editorial-content-integrity.json", import.meta.url), "utf8"));
  // The user's 建築物文字敘述.docx explicitly supplies a new map opening.
  // Keep the historical fixture intact; only these two superseded nodes are exempt.
  const replacedMapOpening = new Set([
    "21191945e15e2cc05fc52373a5d8775e5df03cc2f62c156c2bf4bc32d66f8fb1",
    "22100d0d4b19151508f86eccef945f26a610145163ca0a1ac31b48787cc7677f",
  ]);
  // On 2026-09-13 the user removed these five duplicated catalog summaries.
  // The full stories remain covered by the catalog story preservation test.
  const removedGoodsSummaries = new Set([
    "8e0517396f26c9abaf4fc0af64c64b4fb45f2ec331e6943dd7ab824b1ee08051",
    "c59edc9587355ade59dc111a8eef6bc9a0385e704fe93aec9cbc341a4c07b50b",
    "8db6533a18a3bde7f870a791cb4f04aba65db3a140230408d8872d1758a5e87b",
    "8a6cff173253b21992a8170276bbbb7a0e002f3fca9bc96b6eeb6d8074e4ea16",
    "8ee2612181b07cb45e2628f66b9b74cd1cfc6c310d2d51d9ed845cf467f0eb52",
  ]);
  const clean = (text) => text.replace(/<[^>]*>/g, "").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replace(/\s/g, "");
  // These index excerpts are superseded by the user's six Google Docs stories.
  // Exact new paragraphs and line breaks are checked by assertPeopleSourceIntegrity.
  const replacedPeopleExcerpts = new Set(JSON.parse(await readFile(new URL("./fixtures/people-replaced-excerpts.json", import.meta.url), "utf8")));
  for (const [route, expected] of Object.entries(baseline)) {
    // The six replacement articles have their own exact-source integrity checks.
    if (peopleSources.some(source => route === `/people/${source.slug}`)) continue;
    const html = await (await render(route)).text();
    const actual = new Set([...html.matchAll(/<(p|h[123]|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((match) => createHash("sha256").update(clean(match[2])).digest("hex")));
    if (route === "/goods") {
      for (const hash of removedGoodsSummaries) assert.ok(!actual.has(hash), "removed catalog summaries stay absent");
      assert.doesNotMatch(html, /<h3[^>]*>從日常開始<\/h3>/);
    }
    for (const record of expected) {
      if (route === "/guogang" && replacedMapOpening.has(record.sha256)) continue;
      if (route === "/goods" && removedGoodsSummaries.has(record.sha256)) continue;
      if (route === "/people" && replacedPeopleExcerpts.has(record.sha256)) continue;
      assert.ok(actual.has(record.sha256), `${route}: original ${record.tag} (${record.characters} characters) must be preserved: ${record.sha256}`);
    }
  }
});

test("homepage preserves four photo chapters and original copy in the book presentation", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /home-narrative/);
  assert.match(html, /aria-roledescription="翻頁書"/);
  assert.equal((html.match(/data-scene="[0-3]"[^>]*aria-hidden="true"[^>]*inert/g) ?? []).length, 3);
  for (const number of ["01", "02", "03", "04"]) {
    assert.match(html, new RegExp(`id="scene-${number}"`));
    assert.match(html, new RegExp(`home-scroll-${number}\\.webp`));
  }
  assert.match(html, /一個沿著基隆河生活的地方。/);
  assert.match(html, /從備料到料理，一雙雙手把熟悉的味道慢慢做出來。/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.doesNotMatch(html, /scroll-story-sticky|linear-gradient/);
});

test("the editorial system shares typography roles and removes dark photo overlays", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const intro = await readFile(new URL("../app/components/PageIntro.tsx", import.meta.url), "utf8");
  for (const role of ["hero", "page", "section", "card", "name", "article-title", "article-section", "body", "label"]) assert.ok(css.includes(`--type-${role}:`));
  assert.match(css, /--paper:\s*#f5f4f2;/);
  assert.match(css, /h2\s*\{\s*font-size:\s*var\(--type-section\)/);
  assert.match(css, /\.people-article-heading h1\s*\{\s*font-size:\s*var\(--type-article-title\)/);
  assert.match(css, /\.heading-unit\s*\{[^}]*white-space:\s*nowrap/);
  assert.doesNotMatch(intro, /minHeight|position:\s*"absolute"|linear-gradient/);
  assert.doesNotMatch(css, /overflow-x:\s*hidden|text-overflow:\s*ellipsis|--type-history-lead/);
});

test("all six People entries include photographs while preserving the original editorial order", async () => {
  const html = await (await render("/people")).text();
  const cards = [...html.matchAll(/<article class="people-story-card[\s\S]*?<\/article>/g)].map((match) => match[0]);
  const order = ["林秀英", "黃淑惠", "丁梅花", "清爽 × 阿笑", "李水錦", "順發阿公 × 宜慧阿嬤"];
  assert.equal(cards.length, 6);
  cards.forEach((card, index) => { assert.ok(card.includes(`>${order[index]}<`)); assert.match(card, /<img\b/); assert.match(card, /people-story-summary/); });
});

test("new map configuration is complete, source-specific and independently positioned", async () => {
  const source = await readFile(new URL("../app/data/guogangMap.ts", import.meta.url), "utf8");
  const locations = JSON.parse(source.split("export const GUOGANG_MAP_LOCATIONS: MapLandmark[] = ")[1].trim().replace(/;$/, ""));
  const names = ["小倆口福利社", "美食坊早餐店", "舊警察宿舍", "暖江國小", "聖光堂", "黃蠟石文化館", "過港社區發展協會", "過港幼兒園", "過港郵局", "暖江步道", "暖江兒童公園", "北方大陸餅", "暖新住民會館", "過港福德宮"];
  assert.deepEqual(locations.map((location) => location.name), names);
  assert.equal(new Set(locations.map((location) => location.id)).size, 14);
  assert.ok(locations[3].x < locations[2].x, "the school is to the left of the blue police dormitory, as confirmed by the user");
  const rows = [locations.slice(0, 5), locations.slice(5, 9), locations.slice(9)];
  rows.forEach((row, rowIndex) => {
    assert.ok(row.every((location) => location.row === ["upper", "middle", "lower"][rowIndex]));
    for (let index = 1; index < row.length; index++) {
      assert.ok(row[index - 1].x > row[index].x, `${row[index].name}: names read right to left within each row`);
    }
    if (rowIndex > 0) assert.ok(Math.max(...rows[rowIndex - 1].map((location) => location.y)) < Math.min(...row.map((location) => location.y)), "rows read top to bottom");
  });
  const html = await (await render("/guogang")).text();
  const groups = [...html.matchAll(/<optgroup label="([^"]+)">([\s\S]*?)<\/optgroup>/g)];
  assert.deepEqual(groups.map((group) => group[1]), ["上排（由右至左）", "中排（由右至左）", "下排（由右至左）"]);
  groups.forEach((group, index) => assert.deepEqual([...group[2].matchAll(/<option[^>]*>([^<]+)<\/option>/g)].map((option) => option[1]), rows[index].map((location) => location.name)));
  for (const location of locations) {
    for (const field of ["x", "y", "width", "height", "labelX", "labelY"]) assert.ok(location[field] >= 0 && location[field] <= 100);
    assert.ok(location.x + location.width <= 100.001 && location.y + location.height <= 100.001);
    const png = await readFile(new URL(`../public/images/guogang-map-2026/${location.id}.png`, import.meta.url));
    assert.equal(png[25], 6, `${location.name}: RGBA cutout required`);
  }
});

test("map has real labels, stable hit areas and equivalent pointer, touch and keyboard controls", async () => {
  const source = await readFile(new URL("../app/components/GuogangInteractiveMap.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  for (const contract of ["onPointerEnter", "onPointerLeave", "onFocus", "onClick", "onPointerDown", "onPointerMove", "scrollLeft", "suppressActivationRef", "aria-expanded", "guogang-map-labels", "map-place-picker"]) assert.ok(source.includes(contract), contract);
  assert.match(css, /\.guogang-map-landmark\.is-active img\s*\{[^}]*translateY\(-8px\)/);
  assert.match(css, /\.guogang-handdrawn-map-canvas\s*\{[^}]*aspect-ratio:\s*16 \/ 9/);
  assert.match(css, /\.guogang-map-scroll\s*\{[^}]*overflow-x:\s*auto/);
  assert.doesNotMatch(source, /guogang-map-stamps|guogang-map-landmarks\/|guogang-handdrawn-map\.jpg/);
});

test("every illustrated place has location metadata and details stay hidden before activation", async () => {
  const mapSource = await readFile(new URL("../app/data/guogangMap.ts", import.meta.url), "utf8");
  const locations = JSON.parse(mapSource.split("export const GUOGANG_MAP_LOCATIONS: MapLandmark[] = ")[1].trim().replace(/;$/, ""));
  const details = await readFile(new URL("../app/data/guogangMapDetails.ts", import.meta.url), "utf8");
  assert.deepEqual([...details.matchAll(/^ {2}"([^"]+)": \{/gm)].map(match => match[1]), locations.map(location => location.id));
  const html = await (await render("/guogang")).text();
  assert.match(html, /<aside[^>]*aria-label="地點介紹"[^>]*hidden/);
  assert.doesNotMatch(html, /<iframe\b/);
  assert.equal((html.match(/data-landmark="[^"]+"[^>]*aria-expanded="false"/g) ?? []).length, 14);
});

test("the map introduction and every place preserve the supplied DOCX text", async () => {
  const { createHash } = await import("node:crypto");
  const copy = JSON.parse(await readFile(new URL("../app/data/guogangMapCopy.json", import.meta.url), "utf8"));
  const fixture = JSON.parse(await readFile(new URL("./fixtures/map-copy-integrity.json", import.meta.url), "utf8"));
  const blocks = { "散步地圖｜開頭介紹": [copy.intro.titleLines, ...copy.intro.paragraphs], ...Object.fromEntries(copy.places.map(place => [place.name, place.paragraphs])) };
  assert.deepEqual(Object.keys(blocks), Object.keys(fixture.blocks));
  for (const [name, paragraphs] of Object.entries(blocks)) {
    const text = paragraphs.map(lines => lines.join("")).join("");
    assert.equal(createHash("sha256").update(text).digest("hex"), fixture.blocks[name].sha256, `${name}: original DOCX wording`);
    assert.equal(paragraphs.length, fixture.blocks[name].paragraphCount);
  }
  const html = await (await render("/guogang")).text();
  const plain = html.replace(/<[^>]*>/g, "");
  for (const lines of blocks["散步地圖｜開頭介紹"]) assert.ok(plain.includes(lines.join("")), "Supplied opening must render intact; activated place copy is checked in browser QA");
});
