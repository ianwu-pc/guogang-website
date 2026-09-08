import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.QA_ORIGIN || 'http://localhost:4173';
const output = path.resolve(process.env.QA_OUTPUT || 'work/map-followup-qa');
const widths = [1440, 1281, 1280, 1024, 768, 430, 390, 360];
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const report = { origin, widths, pages: [], states: [], errors: [], externalMapsIsolated: true };
const suppliedCopy = JSON.parse(await fs.readFile(new URL('../app/data/guogangMapCopy.json', import.meta.url), 'utf8'));
page.on('pageerror', e => report.errors.push(e.message));
// This pass isolates geometry from third-party traffic. Check a real embed separately.
await page.route('https://maps.google.com/**', route => route.fulfill({ contentType: 'text/html', body: '' }));
await page.emulateMedia({ reducedMotion: 'reduce' });
try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: width === 1281 ? 552 : 1000 });
    await page.goto(origin + '/guogang/', { waitUntil: 'domcontentloaded' });
    await page.locator('[data-landmark]').first().waitFor();
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(im => im.decode().catch(() => {}))); });
    assert.equal(await page.locator('#guogang-map-title').textContent(), suppliedCopy.intro.titleLines.join(''));
    assert.equal(await page.locator('.guogang-map-intro').textContent(), suppliedCopy.intro.paragraphs.flat().join(''));
    const viewport = page.locator('.guogang-map-scroll');
    const geometry = await viewport.evaluate(el => ({ width: el.clientWidth, scrollWidth: el.scrollWidth, pageOverflow: document.documentElement.scrollWidth > innerWidth }));
    assert.equal(geometry.pageOverflow, false);
    if (width >= 1024) assert.ok(geometry.scrollWidth <= geometry.width + 1, `Full desktop illustration must fit at ${width}`);
    report.pages.push({ width, ...geometry });
    await page.locator('.guogang-map-heading').screenshot({ path: path.join(output, `intro-${width}.png`) });
    await viewport.screenshot({ path: path.join(output, `map-${width}.png`) });
    const ids = await page.locator('[data-landmark]').evaluateAll(es => es.map(e => e.dataset.landmark));
    for (const id of ids) {
      await page.mouse.move(0, 0);
      await page.locator('#map-place-picker').focus();
      await page.locator('#map-place-picker').selectOption(id);
      const landmark = page.locator(`[data-landmark="${id}"]`);
      await landmark.focus();
      await page.waitForFunction(id => document.querySelector(`[data-landmark="${id}"]`).getAttribute('aria-expanded') === 'true', id);
      const state = await page.evaluate(id => {
        const viewport = document.querySelector('.guogang-map-scroll').getBoundingClientRect();
        const label = document.querySelector(`[data-label="${id}"]`);
        const object = document.querySelector(`[data-landmark="${id}"] img`);
        const labels = [...document.querySelectorAll('[data-label]')], images = [...document.querySelectorAll('[data-landmark] img')];
        const hit = (a, b) => a.left < b.right - .5 && a.right > b.left + .5 && a.top < b.bottom - .5 && a.bottom > b.top + .5;
        const collisions = labels.flatMap((a, i) => [...labels.slice(i + 1), ...images].filter(b => hit(a.getBoundingClientRect(), b.getBoundingClientRect())).map(b => [a.textContent, b.dataset.label || b.parentElement.dataset.landmark]));
        const outside = [label, object].filter(e => { const r = e.getBoundingClientRect(); return r.left < viewport.left - 1 || r.right > viewport.right + 1 || r.top < viewport.top - 1 || r.bottom > viewport.bottom + 1; }).map(e => e.tagName);
        const style = getComputedStyle(label), backdrop = getComputedStyle(label, '::before');
        const link = document.querySelector('.guogang-map-google > a');
        return { id, name: label.textContent, collisions, outside, font: style.fontFamily, fontSize: style.fontSize, background: backdrop.backgroundColor, borderWidth: style.borderWidth, backdropShape: backdrop.clipPath, heading: document.querySelector('.guogang-map-info h3').textContent, description: document.querySelector('.guogang-map-place-text').textContent, mapUrl: link.href, frameUrl: document.querySelector('.guogang-map-google iframe').src };
      }, id);
      report.states.push({ width, ...state });
      assert.deepEqual(state.collisions, [], `${width} ${id}: label collisions`);
      assert.deepEqual(state.outside, [], `${width} ${id}: selected image and label must fit`);
      assert.match(state.font, /Guogang Serif/);
      assert.equal(state.fontSize, '14px');
      assert.notEqual(state.background, 'rgba(0, 0, 0, 0)');
      assert.equal(state.borderWidth, '0px');
      assert.match(state.background, /^rgba\(.+, 0\.\d+\)$/);
      assert.match(state.backdropShape, /^polygon\(/);
      assert.equal(state.heading, state.name);
      assert.ok(state.description.length > 35);
      assert.equal(state.description, suppliedCopy.places.find(place => place.id === id).paragraphs.flat().join(''), `${id}: user-supplied copy renders intact`);
      const map = new URL(state.mapUrl), embed = new URL(state.frameUrl);
      assert.equal(map.hostname, 'www.google.com');
      assert.equal(map.searchParams.get('api'), '1');
      assert.equal(map.searchParams.get('query'), embed.searchParams.get('q'));
      await page.locator('.guogang-map-google > a').focus();
      assert.equal(await page.locator('.guogang-map-info h3').textContent(), state.name, 'Details persist when focusing their link');
    }
    // Revisit the two reported clipped objects at the exact viewport and at every breakpoint.
    for (const id of ['little-couple-store', 'nuanjiang-walkway']) {
      await page.locator('#map-place-picker').selectOption(id);
      await viewport.screenshot({ path: path.join(output, `map-${width}-${id}.png`) });
    }
    await page.locator('#map-place-picker').selectOption('wax-culture-hall');
    await page.locator('#guogang-map-info').screenshot({ path: path.join(output, `details-${width}.png`) });
    await page.locator('#map-place-picker').selectOption('northern-pastry');
    await page.locator('#guogang-map-info').screenshot({ path: path.join(output, `details-long-${width}.png`) });
    console.log(`Passed ${width}px: full desktop map / 14 labels, introductions and map links`);
    await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  }
  const touch = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 360, height: 900 }, reducedMotion: 'reduce' });
  await touch.route('https://maps.google.com/**', route => route.fulfill({ contentType: 'text/html', body: '' }));
  const touchPage = await touch.newPage();
  await touchPage.goto(origin + '/guogang/', { waitUntil: 'networkidle' });
  for (const id of await touchPage.locator('[data-landmark]').evaluateAll(es => es.map(e => e.dataset.landmark))) {
    await touchPage.locator('#map-place-picker').selectOption(id);
    await touchPage.locator(`[data-landmark="${id}"]`).tap();
    assert.equal(await touchPage.locator(`[data-landmark="${id}"]`).getAttribute('aria-expanded'), 'true');
    assert.equal(await touchPage.locator('.guogang-map-info h3').textContent(), await touchPage.locator(`[data-label="${id}"]`).textContent());
  }
  const viewport = touchPage.locator('.guogang-map-scroll');
  await viewport.scrollIntoViewIfNeeded();
  await viewport.evaluate(el => el.scrollLeft = 0);
  const box = await viewport.boundingBox(), beforeSelection = await touchPage.locator('#map-place-picker').inputValue();
  const client = await touch.newCDPSession(touchPage);
  const y = Math.max(50, Math.min(800, box.y + box.height * .8));
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.width - 30, y }] });
  for (let step = 1; step <= 12; step++) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: box.x + box.width - 30 - (box.width - 60) * step / 12, y }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  assert.ok(await viewport.evaluate(el => el.scrollLeft) > 100, 'Touch drag pans only the map');
  assert.equal(await touchPage.locator('#map-place-picker').inputValue(), beforeSelection, 'Dragging does not select another landmark');
  report.touch = '14 selections and horizontal drag passed at 360px';
  await touch.close();
  assert.deepEqual(report.errors, []);
} finally {
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
