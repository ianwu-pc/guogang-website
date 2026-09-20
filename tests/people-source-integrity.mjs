import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

// Source paragraphs were read from the six supplied Google Docs tabs,
// excluding only layout labels, heading brackets, dividers and whitespace.
export const peopleSources = JSON.parse(await readFile(
  new URL("./fixtures/people-source-integrity.json", import.meta.url), "utf8",
));
const quoteStyles = JSON.parse(await readFile(new URL("./fixtures/people-quote-styles.json", import.meta.url), "utf8"));

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
  const decode = (value) => value.replace(/<[^>]*>/g, "").replace(/&quot;/g, '"').replace(/&#x27;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  const expectedGroups = source.paragraphs.join("").split("主標題：\n")[1].trim().split(/\n{2,}/)
    .filter(group => !/^─+$/.test(group) && group !== "【人物頁最後大字】" && group !== "小字：")
    .map(group => /^【[^\n]+】$/.test(group) ? group.slice(1, -1) : group);
  const titleText = decode(title.replace(/<span class="heading-line">/g, "\n")).replace(/^\n/, "");
  const renderedGroups = [titleText, ...[...article.matchAll(/<(p|blockquote|h2)\b[^>]*>([\s\S]*?)<\/\1>/g)].flatMap(match => decode(match[2]).split(/\n{2,}/))];
  assert.equal(renderedGroups[0].replace(/\s/g, ""), expectedGroups[0].replace(/\s/g, ""), `${source.slug}: title words unchanged; hero breaks are presentation`);
  assert.deepEqual(renderedGroups.slice(1), expectedGroups.slice(1), `${source.slug}: exact source paragraphs and manual line breaks`);
  const emphasized = [...article.matchAll(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>|<span class="people-inline-quote">([\s\S]*?)<\/span>/g)].map(match => decode(match[1] ?? match[2]));
  assert.deepEqual(emphasized, quoteStyles.find(item => item.slug === source.slug).quotes, `${source.slug}: only source bold and italic quotations are emphasized`);
}
