import assert from "node:assert/strict";
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
  assert.match(html, /過港，從一條河的對岸開始/);
  assert.match(html, /河岸、宿舍與市場/);
  assert.match(html, /一件好物，不只說明材料/);
  assert.match(html, /先把位置留給真正的聲音/);
  assert.match(html, /一個協會的歷程/);
  assert.match(html, /一起生活，/);
  assert.doesNotMatch(html, /association-structure\.png|組織架構圖/);
  assert.doesNotMatch(html, /六組人物|姓名｜待提供|社區故事 01/);
  assert.doesNotMatch(html, /codex-preview|Starter Project|Building your site|react-loading-skeleton/i);
});

test("chapter order, compact goods gallery and map match revision two", async () => {
  const goodsResponse = await render("/goods");
  const goodsHtml = await goodsResponse.text();
  assert.match(goodsHtml, /page-intro-index[^>]*>01</);
  assert.doesNotMatch(goodsHtml, /catalog-index|product-gallery-count|product-gallery-dots|product-gallery-controls/);
  assert.match(goodsHtml, /product-gallery-arrow-prev/);
  assert.match(goodsHtml, /product-gallery-arrow-next/);

  const guogangResponse = await render("/guogang");
  const guogangHtml = await guogangResponse.text();
  assert.match(guogangHtml, /page-intro-index[^>]*>02</);
  assert.match(guogangHtml, /過港互動示意地圖/);
  assert.match(guogangHtml, /暖暖溪河岸/);
  assert.match(guogangHtml, /關懷據點/);
});

test("people page provides six neutral interview positions without invented profiles", async () => {
  const response = await render("/people");
  const html = await response.text();
  assert.match(html, /人物1/);
  assert.match(html, /人物6/);
  assert.match(html, /訪談資料整理中/);
  assert.doesNotMatch(html, /people-empty-index|01—/);
});

test("about page does not publish the supplied organization chart", async () => {
  const response = await render("/about");
  const html = await response.text();
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
  assert.doesNotMatch(html, /line\.me|lin\.ee/i);
});
