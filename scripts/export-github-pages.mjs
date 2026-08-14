import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDirectory = path.join(projectRoot, "dist", "client");
const serverEntry = path.join(projectRoot, "dist", "server", "index.js");
const outputDirectory = path.join(projectRoot, "github-pages-dist");

const repositoryPath = process.env.GITHUB_REPOSITORY ?? "";
const [repositoryOwner = "local", repositoryName = ""] = repositoryPath.split("/");
const inferredBasePath =
  repositoryName && repositoryName.toLowerCase() !== `${repositoryOwner.toLowerCase()}.github.io`
    ? `/${repositoryName}`
    : "";

const basePath = normalizeBasePath(process.env.PAGES_BASE_PATH ?? inferredBasePath);
const origin = normalizeOrigin(
  process.env.PAGES_ORIGIN ??
    (repositoryOwner === "local" ? "http://localhost:3000" : `https://${repositoryOwner.toLowerCase()}.github.io`),
);
const siteBaseUrl = `${origin}${basePath}`;
const host = process.env.PAGES_HOST ?? new URL(origin).host;

const routes = [
  "/",
  "/goods",
  ...Array.from({ length: 6 }, (_, index) => `/goods/goods-${String(index + 1).padStart(2, "0")}`),
  "/guogang",
  "/people",
  "/about",
];

const redirectRoutes = [
  "/stories",
  ...Array.from({ length: 8 }, (_, index) => `/stories/story-${String(index + 1).padStart(2, "0")}`),
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

// These files remain in the source archive for reference but are not part of the public website.
await Promise.all([
  rm(path.join(outputDirectory, "images", "association-structure.png"), { force: true }),
  rm(path.join(outputDirectory, "og.png"), { force: true }),
  rm(path.join(outputDirectory, "_headers"), { force: true }),
  rm(path.join(outputDirectory, ".assetsignore"), { force: true }),
  rm(path.join(outputDirectory, ".vite"), { recursive: true, force: true }),
]);

await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");

const workerUrl = pathToFileURL(serverEntry);
workerUrl.searchParams.set("github-pages-export", `${Date.now()}`);
const worker = (await import(workerUrl.href)).default;

for (const route of routes) {
  const requestPath = toRequestPath(route);
  const response = await worker.fetch(
    new Request(`${origin}${requestPath}`, {
      headers: {
        accept: "text/html",
        host,
        "x-forwarded-host": host,
        "x-forwarded-proto": "https",
      },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (response.status !== 200) {
    throw new Error(`Static export failed for ${requestPath}: HTTP ${response.status}`);
  }

  let html = await response.text();
  html = rewriteMetadataUrls(html);
  validateBasePath(html, route);

  const destination = routeToFile(route);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
}

for (const route of redirectRoutes) {
  const destination = routeToFile(route);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, redirectPage(`${siteBaseUrl}/about/#history`), "utf8");
}

await writeFile(path.join(outputDirectory, "404.html"), notFoundPage(), "utf8");
await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap(), "utf8");
await writeFile(
  path.join(outputDirectory, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${siteBaseUrl}/sitemap.xml\n`,
  "utf8",
);

console.log(`GitHub Pages static site exported to ${outputDirectory}`);
console.log(`Base URL: ${siteBaseUrl || "/"}`);

function normalizeBasePath(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function normalizeOrigin(value) {
  return String(value).replace(/\/$/, "");
}

function toRequestPath(route) {
  if (route === "/") return `${basePath}/`;
  return `${basePath}${route}/`;
}

function routeToFile(route) {
  if (route === "/") return path.join(outputDirectory, "index.html");
  return path.join(outputDirectory, route.replace(/^\//, ""), "index.html");
}

function rewriteMetadataUrls(html) {
  let result = html
    .replaceAll("http://localhost:3000", siteBaseUrl)
    .replaceAll("https://localhost:3000", siteBaseUrl);

  for (const image of ["og-revision.png", "og.png"]) {
    result = result.replaceAll(`${origin}/${image}`, `${siteBaseUrl}/${image}`);
  }

  return result;
}

function validateBasePath(html, route) {
  if (!basePath) return;
  const rootReferences = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((match) => match[1]);
  const invalid = rootReferences.find((reference) => !reference.startsWith(`${basePath}/`) && reference !== basePath);
  if (invalid) throw new Error(`Unprefixed asset or link on ${route}: ${invalid}`);
}

function redirectPage(target) {
  return `<!doctype html>
<html lang="zh-Hant-TW">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0; url=${target}">
    <link rel="canonical" href="${target}">
    <title>頁面已移動｜過港</title>
  </head>
  <body><p>頁面已移動，<a href="${target}">前往協會歷程</a>。</p></body>
</html>`;
}

function notFoundPage() {
  return `<!doctype html>
<html lang="zh-Hant-TW">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>找不到頁面｜過港</title>
    <style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f1eee3;color:#17241d;font-family:system-ui,sans-serif}main{max-width:36rem;padding:2rem}a{color:#9b4936}</style>
  </head>
  <body><main><p>404</p><h1>找不到這個頁面</h1><p><a href="${siteBaseUrl}/">回到過港首頁</a></p></main></body>
</html>`;
}

function sitemap() {
  const urls = routes
    .map((route) => `${siteBaseUrl}${route === "/" ? "/" : `${route}/`}`)
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
