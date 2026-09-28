import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const destination = 'https://guogang-keelung.github.io/website';
const routes = ['/', '/guogang', '/people', '/goods', '/about',
  ...['bottle-cap-grandma','breakfast-shop-owner','community-kitchen-mother','community-volunteer','couple-story-one','couple-story-two'].map(s=>`/people/${s}`),
  ...Array.from({length:5},(_,i)=>`/goods/goods-${String(i+1).padStart(2,'0')}`),
  '/stories', ...Array.from({length:8},(_,i)=>`/stories/story-${String(i+1).padStart(2,'0')}`)];
function html(route) {
 const target=destination+(route==='/'?'/':route+'/');
 return `<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>基隆市暖暖區過港社區發展協會</title><link rel="canonical" href="${target}">
<meta property="og:title" content="基隆市暖暖區過港社區發展協會"><meta property="og:description" content="走進過港，看見地方與人的生活。"><meta property="og:url" content="${target}"><meta property="og:image" content="${destination}/images/guogang-share-logo-v2.jpg">
<script>const suffix=location.pathname.replace(/^\\/guogang-website(?=\\/|$)/,'');location.replace(${JSON.stringify(destination)}+(suffix||'/')+location.search+location.hash);</script>
<noscript><meta http-equiv="refresh" content="0; url=${target}"></noscript>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f4f2;color:#292e29;font-family:system-ui,sans-serif}main{padding:32px;max-width:36rem;line-height:1.8}a{color:inherit}</style></head>
<body><main><h1>過港網站已搬家</h1><p>我們已搬到新的網址，正在為您開啟。</p><a href="${target}">前往過港社區網站</a></main></body></html>`;
}
for(const route of routes){const file=path.join('relocation-dist',route==='/'?'index.html':route.slice(1)+'/index.html');await mkdir(path.dirname(file),{recursive:true});await writeFile(file,html(route));}
await writeFile('relocation-dist/404.html',html('/'));
await writeFile('relocation-dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${destination}/sitemap.xml\n`);
await writeFile('relocation-dist/.nojekyll','');
console.log(`Prepared ${routes.length} redirects and a fallback; website source is preserved.`);
