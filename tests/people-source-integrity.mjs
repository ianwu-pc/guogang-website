import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

// Expected hashes were extracted directly from the supplied Word documents,
// excluding only layout labels, heading brackets, dividers and whitespace.
export const peopleSources = JSON.parse(await readFile(
  new URL("./fixtures/people-source-integrity.json", import.meta.url), "utf8",
));

export function assertPeopleSourceIntegrity(html, source) {
  const title = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  const article = html.match(/<article class="people-article-content">([\s\S]*?)<\/article>/)?.[1];
  assert.ok(title && article, `${source.slug}: complete article must render`);
  const text = (title + article)
    .replace(/<div class="people-article-section-marker"[^>]*>[\s\S]*?<\/div>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/\s+/g, "");
  assert.equal([...text].length, source.characters, `${source.slug}: source character count`);
  assert.equal(createHash("sha256").update(text).digest("hex"), source.textSha256,
    `${source.slug}: every source character and its order must match ${source.source}`);
  assert.doesNotMatch(article, /人物頁最後大字|主標題：|小字：|待提供|來源未提供/);
  assert.match(article, /people-article-ending-large/);
  assert.match(article, /people-article-ending-small/);
}
