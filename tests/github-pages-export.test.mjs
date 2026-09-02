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
  "goods/goods-05/index.html",
  "guogang/index.html",
  "people/index.html",
  "people/bottle-cap-grandma/index.html",
  "people/breakfast-shop-owner/index.html",
  "people/community-kitchen-mother/index.html",
  "people/couple-story-one/index.html",
  "people/couple-story-two/index.html",
  "about/index.html",
  "fonts/guogang-serif-mobile.woff2",
  "fonts/OFL-NotoSerifTC.txt",
  "_next/static/fonts/guogang-serif-mobile.woff2",
  "images/guogang-history-1949.png",
  "images/guogang-handdrawn-map.jpg",
  "images/guogang-handdrawn-map-background.png",
  "images/guogang-map-landmarks/inoue.png",
  "images/guogang-map-landmarks/manyueyuan.png",
  "images/guogang-map-landmarks/shengguang.png",
  "images/guogang-map-landmarks/pasta-86.png",
  "images/guogang-map-landmarks/police-dormitory.png",
  "images/guogang-map-landmarks/breakfast-shop.png",
  "images/guogang-map-landmarks/association.png",
  "images/guogang-map-landmarks/wax-museum.png",
  "images/guogang-map-landmarks/zhongyu.png",
  "images/guogang-map-landmarks/fude-temple.png",
  "images/guogang-map-landmarks/nuannuan-station.png",
  "images/home/home-scroll-01.webp",
  "images/home/home-scroll-01-1280.webp",
  "images/home/home-scroll-02.webp",
  "images/home/home-scroll-02-1280.webp",
  "images/home/home-scroll-03.webp",
  "images/home/home-scroll-03-1280.webp",
  "images/home/home-scroll-04.webp",
  "images/home/home-scroll-04-1280.webp",
  "images/認識過港.jpg",
  "images/過港人物.jpg",
  "images/過港好味.jpg",
  "images/關於我們.jpg",
  "images/goods/double-bamboo-shoot-dumplings.jpg",
  "images/goods/radish-cake.jpg",
  "images/goods/iron-eggs.jpg",
  "images/goods/white-fungus-drink.jpg",
  "images/goods/stone-flower-jelly.jpg",
  "images/goods/guogang-goods-collection.jpg",
  "images/people/community-kitchen-mother/li-shui-jin-kitchen.jpg",
  "images/people/community-kitchen-mother/li-shui-jin-community.jpg",
  "images/people/community-kitchen-mother/li-shui-jin-learning.jpg",
  "images/people/couple-story-one/qingshuang-axiao-portrait.jpg",
  "images/people/couple-story-one/qingshuang-axiao-community.jpg",
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

  assert.match(home, /這裡是過港/);
  assert.match(home, /home-scroll-01\.webp/);
  assert.match(home, /home-scroll-01-1280\.webp/);
  assert.match(home, /如果喜歡過港/);
  assert.match(home, /⌄/);
  assert.doesNotMatch(home, /往下看看/);
  assert.match(home, /02-2458-8802/);
  assert.match(goods, /guogang-goods-collection\.jpg/);
  assert.match(goods, /double-bamboo-shoot-dumplings\.jpg/);
  assert.match(goods, /過港好味\.jpg/);
  assert.match(guogang, /認識過港\.jpg/);
  assert.match(guogang, /可探索的過港手繪生活地圖/);
  assert.match(guogang, /guogang-handdrawn-map-background\.png/);
  assert.match(guogang, /guogang-map-landmarks\/inoue\.png/);
  assert.match(guogang, /guogang-map-landmarks\/nuannuan-station\.png/);
  assert.match(guogang, /美食坊早餐店/);
  assert.match(guogang, /過港社區發展協會/);
  for (const locationName of ["井上園日本料理", "滿越緣私房料理", "過港聖光堂", "過港86義大利麵", "警察宿舍", "美食坊早餐店", "過港社區發展協會", "黃蠟石博物館", "中漁新村", "過港福德宮", "暖暖火車站"]) {
    assert.match(guogang, new RegExp(locationName));
  }
  assert.doesNotMatch(guogang, /地點名單待確認/);
  assert.match(people, /過港人物\.jpg/);
  assert.match(people, /PEOPLE OF GUOGANG \/ 人與過港/);
  assert.match(people, /過港的樣子，[\s\S]*?藏在不同人的日常裡。/);

  const peopleCards = [...people.matchAll(/<article class="people-story-card[\s\S]*?<\/article>/g)].map((match) => match[0]);
  const peopleOrder = ["林秀英", "黃淑惠", "丁梅花", "清爽 × 阿笑", "李水錦阿姨", "親家阿公阿嬤"];
  assert.equal(peopleCards.length, peopleOrder.length, "exported People page should contain six editorial entries");
  assert.deepEqual(
    peopleCards.map((card) => peopleOrder.find((name) => card.includes(`>${name}<`))),
    peopleOrder,
    "exported People page should preserve the editorial reading order",
  );

  for (const [name, href] of [
    ["林秀英", "/people/bottle-cap-grandma"],
    ["黃淑惠", "/people/breakfast-shop-owner"],
    ["丁梅花", "/people/couple-story-two"],
    ["清爽 × 阿笑", "/people/couple-story-one"],
    ["李水錦阿姨", "/people/community-kitchen-mother"],
    ["親家阿公阿嬤", "/people/community-volunteer"],
  ]) {
    assert.match(people, new RegExp(`${name}[\\s\\S]*?href="[^"]*${href}`));
  }

  assert.match(people, /把時間，[\s\S]*?一個瓶蓋一個瓶蓋留在過港。/);
  assert.match(people, /二十五年，[\s\S]*?早餐店裡的客人慢慢成了朋友。/);
  assert.match(people, /一起四十多年，[\s\S]*?生活這件事一直在變。/);
  assert.match(people, /每天半個小時，[\s\S]*?她來過港過另一種生活。/);
  assert.match(people, /六個故事，[\s\S]*?六種與過港產生關係的方式。/);
  assert.doesNotMatch(people, /STORY 01|STORY 02|STORY 03|STORY 04/);
  assert.doesNotMatch(people, /page-intro-index[^>]*>\d{2}/);

  const breakfastCard = peopleCards.find((card) => card.includes(">黃淑惠<"));
  assert.ok(breakfastCard, "exported Huang Shu-hui entry should exist");
  assert.match(breakfastCard, /href="[^"]*\/people\/breakfast-shop-owner/);
  assert.match(breakfastCard, /people-story-editorial-cover/);
  assert.doesNotMatch(breakfastCard, /<img\b/i);

  const bottleCapStory = await read("people/bottle-cap-grandma/index.html");
  const breakfastStory = await read("people/breakfast-shop-owner/index.html");
  const kitchenStory = await read("people/community-kitchen-mother/index.html");
  const coupleStory = await read("people/couple-story-one/index.html");
  const meiHuaStory = await read("people/couple-story-two/index.html");
  const bottleCapArticle = bottleCapStory.match(/<main class="article-page people-article-page">[\s\S]*?<\/main>/)?.[0];
  assert.ok(bottleCapArticle, "exported Lin Xiu-ying page should contain the shared editorial article");
  assert.match(bottleCapStory, /把時間/);
  assert.match(bottleCapStory, /有些時間，最後會變成一個地方的樣子/);
  assert.doesNotMatch(bottleCapArticle, /來源未提供|IMAGE|待提供/);
  assert.match(breakfastStory, /煎台上的晨之味/);
  assert.match(kitchenStory, /li-shui-jin-kitchen\.jpg/);
  assert.match(coupleStory, /qingshuang-axiao-portrait\.jpg/);
  assert.match(meiHuaStory, /丁梅花/);
  assert.match(meiHuaStory, /再去看看/);
  assert.match(about, /關於我們\.jpg/);
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

  for (const assetPath of [...assetPaths].filter((value) => value.endsWith(".css"))) {
    const css = await read(assetPath);
    const references = [...css.matchAll(/url\(([^)]+)\)/g)].map((match) => match[1].replace(/["']/g, ""));
    for (const reference of references) {
      if (/^(?:data:|https?:)/i.test(reference)) continue;
      const referencedAsset = toArtifactAssetPath(reference);
      if (referencedAsset) assetPaths.add(referencedAsset);
    }
  }

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
