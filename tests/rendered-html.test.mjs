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

test("chapter order, supplied goods photos and interactive map match the current site", async () => {
  const goodsResponse = await render("/goods");
  const goodsHtml = await goodsResponse.text();
  assert.match(goodsHtml, /page-intro-index[^>]*>03</);
  assert.match(goodsHtml, /過港好味\.jpg/);
  assert.doesNotMatch(goodsHtml, /catalog-index|product-gallery-count|product-gallery-dots|product-gallery-controls/);
  assert.doesNotMatch(goodsHtml, /商品完整照｜待提供|商品製作過程照｜待提供|商品料理或食用情境照｜待提供/);
  for (const image of ["double-bamboo-shoot-dumplings", "radish-cake", "iron-eggs", "white-fungus-drink", "stone-flower-jelly", "guogang-goods-collection"]) {
    assert.match(goodsHtml, new RegExp(`${image}\\.jpg`));
  }

  const guogangResponse = await render("/guogang");
  const guogangHtml = await guogangResponse.text();
  assert.match(guogangHtml, /page-intro-index[^>]*>01</);
  assert.match(guogangHtml, /認識過港\.jpg/);
  assert.match(guogangHtml, /新的居民，在過港落腳/);
  assert.match(guogangHtml, /可探索的過港手繪生活地圖/);
  assert.match(guogangHtml, /guogang-map-2026\/background\.webp/);
  assert.match(guogangHtml, /guogang-map-2026\/shengguang-church\.png/);
  assert.match(guogangHtml, /guogang-map-2026\/nuanjiang-walkway\.png/);
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

test("People article titles use explicit natural-language lines instead of browser balancing", async () => {
  const peopleStories = await readFile(new URL("../app/data/peopleStories.ts", import.meta.url), "utf8");
  const stories = JSON.parse(peopleStories.split("export const PEOPLE_STORIES: PeopleStory[] = ")[1].split(";\n")[0]);

  for (const [slug, lines] of Object.entries({
    "bottle-cap-grandma": ["把時間，", "一個瓶蓋一個瓶蓋", "留在過港。"],
    "breakfast-shop-owner": ["二十五年，", "早晨裡的人", "慢慢熟了。"],
    "couple-story-one": ["四十多年，", "他們一起把日子", "過到了過港。"],
    "couple-story-two": ["去看看，", "最近好不好。"],
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
  assert.match(photos, /people-drive\/lin\/lin-dscf5586\.webp/);
  assert.match(photos, /people-drive\/breakfast\/breakfast-dscf5920\.webp/);
  assert.match(photos, /people-drive\/li\/li-48\.webp/);
  assert.match(photos, /people-drive\/meihua\/meihua-29\.webp/);
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

test("original page copy is preserved except the supplied replacement map introduction", async () => {
  const { createHash } = await import("node:crypto");
  const baseline = JSON.parse(await readFile(new URL("./fixtures/editorial-content-integrity.json", import.meta.url), "utf8"));
  // The user's 建築物文字敘述.docx explicitly supplies a new map opening.
  // Keep the historical fixture intact; only these two superseded nodes are exempt.
  const replacedMapOpening = new Set([
    "21191945e15e2cc05fc52373a5d8775e5df03cc2f62c156c2bf4bc32d66f8fb1",
    "22100d0d4b19151508f86eccef945f26a610145163ca0a1ac31b48787cc7677f",
  ]);
  const clean = (text) => text.replace(/<[^>]*>/g, "").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replace(/\s/g, "");
  for (const [route, expected] of Object.entries(baseline)) {
    const html = await (await render(route)).text();
    const actual = new Set([...html.matchAll(/<(p|h[123]|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((match) => createHash("sha256").update(clean(match[2])).digest("hex")));
    for (const record of expected) {
      if (route === "/guogang" && replacedMapOpening.has(record.sha256)) continue;
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
  const order = ["林秀英", "早餐店老闆娘", "丁梅花", "清爽 × 阿笑", "煮飯阿姨", "親家阿公阿嬤"];
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
