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
  "/people/bottle-cap-grandma",
  "/people/breakfast-shop-owner",
  "/people/community-kitchen-mother",
  "/people/couple-story-one",
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
  assert.match(html, /林秀英/);
  assert.match(html, /瓶蓋牆創作者/);
  assert.match(html, /黃淑惠/);
  assert.match(html, /美食坊老闆娘/);
  assert.match(html, /李水錦阿姨/);
  assert.match(html, /一群人一起做的[\s\S]*?事/);
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

test("homepage and goods controls keep the organic treatment and the header LINE action uses deep beige", async () => {
  const home = await readFile(new URL("../app/components/HomeScrollStory.tsx", import.meta.url), "utf8");
  const gallery = await readFile(new URL("../app/components/ProductGallery.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.doesNotMatch(home, /scroll-story-progress/);
  assert.doesNotMatch(home, /scroll-story-number|scroll-story-note|eyebrow:/);
  assert.match(gallery, /&lt;/);
  assert.match(gallery, /&gt;/);
  assert.match(css, /\.product-gallery-arrow\s*\{[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;/);
  assert.match(css, /\.product-gallery \.image-placeholder\s*\{\s*border:\s*0;/);
  assert.match(css, /--beige-deep:\s*#7b6b52;/);
  assert.match(css, /\.header-line-button\s*\{[\s\S]*?border:\s*0;[\s\S]*?background:\s*linear-gradient\(135deg,\s*rgba\(123,\s*107,\s*82,\s*0\.5\)[\s\S]*?rgba\(109,\s*94,\s*70,\s*0\.5\)[\s\S]*?color:\s*#fff;[\s\S]*?box-shadow:/);
  assert.match(css, /\.header-line-button::before,\s*\.header-line-button::after\s*\{\s*content:\s*none;/);
  assert.doesNotMatch(css, /\.header-line-button::before\s*\{[\s\S]*?content:\s*"↗"/);
});

test("people ending aligns to the shared inner-page content column", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(
    css,
    /\.people-overview,\s*\.people-ending,\s*\.goods-story-intro,[\s\S]*?width:\s*min\(calc\(100% - var\(--page-x\) \* 2\),\s*calc\(var\(--max\) - var\(--page-x\) \* 2\)\);[\s\S]*?margin-inline:\s*auto;/,
  );
});

test("homepage photo story shows the header fade before scrolling", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(
    css,
    /body:has\(\.scroll-story-sticky\.has-photo\) \.site-header::before/,
  );
});

test("homepage uses one small text-free scroll cue instead of the retired four-line progress", async () => {
  const response = await render("/");
  const html = await response.text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(html, /⌄/);
  assert.match(html, /scroll-story-cue/);
  assert.doesNotMatch(html, /往下看看/);
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

test("semantic headings preserve author lines and matching levels share one size", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const headingPages = [
    "../app/page.tsx",
    "../app/guogang/page.tsx",
    "../app/goods/page.tsx",
    "../app/people/page.tsx",
    "../app/about/page.tsx",
    "../app/components/SiteFooter.tsx",
  ];

  for (const page of headingPages) {
    const source = await readFile(new URL(page, import.meta.url), "utf8");
    assert.doesNotMatch(source, /<br\s*\/>/, `${page} should not force editorial heading breaks`);
  }

  assert.match(css, /h1,\s*h2,\s*h3\s*\{[\s\S]*?text-wrap:\s*balance/);
  assert.match(css, /:is\(h1, h2, h3\):has\(> \.heading-line\)\s*\{[\s\S]*?text-wrap:\s*wrap/);
  assert.match(css, /\.heading-line\s*\{[\s\S]*?display:\s*block;[\s\S]*?white-space:\s*nowrap;[\s\S]*?text-wrap:\s*nowrap/);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.heading-line\s*\{[\s\S]*?white-space:\s*normal;[\s\S]*?text-wrap:\s*balance/);
  assert.match(css, /\.about-people-power h2\s*\{\s*font-size:\s*var\(--type-section\)/);
  assert.match(
    css,
    /\.home-guide-copy h2,[\s\S]*?\.contact-section h2,[\s\S]*?font-size:\s*var\(--type-section\)/,
  );
});

test("revision 3 headings use the Word-authored semantic line data", async () => {
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const story = await readFile(new URL("../app/components/HomeScrollStory.tsx", import.meta.url), "utf8");
  const footer = await readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8");
  const guogang = await readFile(new URL("../app/guogang/page.tsx", import.meta.url), "utf8");
  const map = await readFile(new URL("../app/components/GuogangInteractiveMap.tsx", import.meta.url), "utf8");
  const data = await readFile(new URL("../app/data/site.ts", import.meta.url), "utf8");

  for (const lines of [
    '["過港的樣子，", "藏在每個人的日常裡。"]',
    '["而這些日常，", "也被一雙雙手做成了味道。"]',
    '["把過港的故事，", "帶到更遠的地方。"]',
  ]) {
    assert.ok(story.includes(lines), `scroll story should include ${lines}`);
  }
  assert.match(story, /titleLines:\s*readonly string\[\]/);
  assert.equal((story.match(/<HeadingLines lines=\{stage\.titleLines\}/g) ?? []).length, 2);

  for (const lines of [
    '["一個名字，", "從河的另一岸開始。"]',
    '["把熟悉的日常，", "做成可以分享的味道。"]',
    '["過港的樣子，", "藏在這裡的人身上。"]',
    '["一群人一起做的事，", "慢慢成了社區的力量。"]',
    '["如果喜歡過港，", "也歡迎把這份味道帶回家。"]',
  ]) {
    assert.ok(home.includes(lines), `homepage should include ${lines}`);
  }

  assert.ok(footer.includes('["從一個地方的名字開始，", "慢慢認識過港。"]'));
  assert.match(guogang, /history-intro-lead[^>]*>過港不是一個突然出現的名字，</);
  assert.match(guogang, /history-intro-support[^>]*>而是被河流、移居與日常慢慢寫下的地方。</);
  assert.ok(map.includes('["沿著河岸，", "看看過港的生活地景。"]'));

  for (const lines of [
    '["生活機能，", "一點一點完整起來"]',
    '["新的家庭，", "帶來新的生活樣貌"]',
    '["從一起生活，", "到一起做社區"]',
    '["過港的故事，", "還在繼續"]',
  ]) {
    assert.ok(data.includes(lines), `timeline should include ${lines}`);
  }
});

test("product and person names share the smaller non-wrapping name scale", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--type-name:\s*clamp\(/);
  assert.match(
    css,
    /\.home-feature-card h3,\s*\.people-story-copy h3,\s*\.catalog-copy h2\s*\{[\s\S]*?font-size:\s*var\(--type-name\);[\s\S]*?white-space:\s*nowrap;[\s\S]*?word-break:\s*keep-all;/,
  );
  assert.doesNotMatch(
    css,
    /\.home-feature-card h3\s*\{[^}]*font-size:\s*var\(--type-card\)/,
  );
  assert.doesNotMatch(css, /text-overflow:\s*ellipsis/);
});

test("timeline years preserve their shared type scale without wrapping", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const timelineYearRule = css.match(/\.timeline-year strong\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(timelineYearRule, /white-space:\s*nowrap/);
  assert.match(timelineYearRule, /word-break:\s*keep-all/);
  assert.match(timelineYearRule, /font-size:\s*clamp\(1\.15rem,\s*2vw,\s*1\.8rem\)/);
});

test("history introduction keeps its explicit two-level exception", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--type-history-lead:\s*clamp\(/);
  assert.match(css, /--type-history-support:\s*clamp\(/);
  assert.match(css, /\.history-intro-heading \.history-intro-lead\s*\{[\s\S]*?var\(--type-history-lead\)/);
  assert.match(css, /\.history-intro-heading \.history-intro-support\s*\{[\s\S]*?var\(--type-history-support\)/);
});

test("header color follows the visual section instead of a small scroll threshold", async () => {
  const header = await readFile(
    new URL("../app/components/SiteHeader.tsx", import.meta.url),
    "utf8",
  );
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(header, /const visualSection = pagePhoto \?\? story/);
  assert.match(header, /visualSection\.getBoundingClientRect\(\)\.bottom <= headerHeight/);
  assert.match(header, /const mobileScrollStarted =/);
  assert.match(header, /window\.innerWidth <= 760 && window\.scrollY > 16/);
  assert.match(header, /overPagePhoto && !menuOpen && !scrolled/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.site-header\.is-scrolled::before\s*\{[\s\S]*?rgba\(241, 238, 227, 0\.84\)/);
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

test("people page preserves six stories and integrates the four finalized identities", async () => {
  const response = await render("/people");
  const html = await response.text();
  assert.match(html, /page-intro-index[^>]*>02</);
  assert.match(html, /過港人物\.jpg/);
  assert.match(html, /林秀英/);
  assert.match(html, /瓶蓋牆創作者/);
  assert.match(html, /把時間[\s\S]*?一個瓶蓋一個瓶蓋[\s\S]*?留在過港。/);
  assert.match(html, /黃淑惠/);
  assert.match(html, /煎台上的晨之味/);
  assert.match(html, /李水錦阿姨/);
  assert.match(html, /十年灶腳，一味歡喜/);
  assert.match(html, /清爽阿公 × 阿笑阿嬤/);
  assert.match(html, /四十年相伴，[\s\S]*?二十年過港/);
  assert.match(html, /people-story-quote[^>]*><span class="heading-line">四十年相伴，<\/span><span class="heading-line">二十年過港<\/span>/);
  assert.match(html, /people-story-editorial-cover/);
  const editorialCards = [...html.matchAll(/<article class="people-story-card"><div class="image-placeholder ratio-portrait tone-paper people-story-editorial-cover"[\s\S]*?<\/article>/g)].map((match) => match[0]);
  const bottleCapCard = editorialCards[0];
  assert.ok(bottleCapCard, "Lin Xiu-ying story should render the editorial text-only cover");
  assert.match(bottleCapCard, /林秀英/);
  assert.doesNotMatch(bottleCapCard, /來源未提供|IMAGE|待提供/);
  assert.doesNotMatch(html, /黃淑惠與美食坊工作畫面｜來源未提供/);
  const breakfastCard = editorialCards[1];
  assert.ok(breakfastCard, "breakfast story should render the editorial text-only cover");
  assert.doesNotMatch(breakfastCard, /來源未提供|IMAGE|待提供/);
  assert.match(html, /夫妻故事二/);
  assert.doesNotMatch(html, /人物姓名與完整訪談仍在確認/);
  assert.doesNotMatch(html, /people-empty-index|01—/);
});

test("finalized people stories render complete editorial pages from shared data", async () => {
  const checks = [
    [
      "/people/bottle-cap-grandma",
      ["林秀英", "把時間", "一個瓶蓋一個瓶蓋留在過港。", "她做過的事情，好像很難一次數完", "一面牆，是很多雙手一起長出來的", "這雙手，一直沒有真正停過", "時間不能留白", "原本在家裡做的事，慢慢走到了外面", "住久了，就有感情了", "有些時間，最後會變成一個地方的樣子", "而過港，也收下了她這六十多年的時間"],
    ],
    [
      "/people/breakfast-shop-owner",
      ["黃淑惠", "煎台上的晨之味", "煎台上的清晨", "落腳過港時", "一間早餐店，一條街的人情", "晨光裡的餘韻", "二十五年來，美食坊就這樣靜靜佇立在過港的晨光裡"],
    ],
    [
      "/people/community-kitchen-mother",
      ["李水錦阿姨", "十年灶腳，一味歡喜", "灶腳裡的笑聲，煮著她的人生", "從內湖的風雨，到過港的安頓", "灶腳裡的熱心，也藏著人情味", "六十歲，再當一次學生", "人生就是要健康、要快樂", "阿姨帶著滿滿的笑聲"],
    ],
    [
      "/people/couple-story-one",
      ["清爽阿公 × 阿笑阿嬤", "四十年相伴，", "二十年過港", "笑了就爽 爽了就笑", "在協會裡學新知、交朋友", "鐵道歲月的奔波與守護", "水患之後的安居", "笑了就爽，爽了就笑"],
    ],
  ];

  for (const [route, phrases] of checks) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should return 200`);
    const html = await response.text();
    for (const phrase of phrases) assert.match(html, new RegExp(phrase), `${route} should include ${phrase}`);
    assert.match(html, /people-article-page/);
    assert.match(html, /← 上一篇人物/);
    assert.match(html, /返回全部人物/);
    assert.match(html, /下一篇人物 →/);
  }
});

test("finalized story pages share one responsive typography scale and semantic title lines", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const data = await readFile(new URL("../app/data/peopleStories.ts", import.meta.url), "utf8");

  for (const token of ["--type-article-title", "--type-article-subtitle", "--type-article-section", "--type-article-body"]) {
    assert.match(css, new RegExp(`${token}:\\s*clamp\\(`));
  }
  assert.match(css, /\.people-article-heading h1\s*\{[^}]*font-size:\s*var\(--type-article-title\)/);
  assert.match(css, /\.people-article-section-copy h2\s*\{[^}]*font-size:\s*var\(--type-article-section\)/);
  assert.match(css, /\.people-story-editorial-cover strong\s*\{[^}]*max-width:\s*100%/);
  assert.ok(data.includes('titleLines: ["四十年相伴，", "二十年過港"]'));
  assert.ok(data.includes('titleLines: ["煎台上的", "晨之味"]'));
  assert.ok(data.includes('titleLines: ["把時間", "一個瓶蓋一個瓶蓋留在過港。"]'));
  assert.ok(data.includes('subtitleLines: ["——守著一方煎台，", "也守著一條街的成長與人情"]'));
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
