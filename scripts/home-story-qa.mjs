import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.QA_ORIGIN || 'http://localhost:4173';
const output = path.resolve(process.env.QA_OUTPUT || 'work/home-story-qa');
const widths = process.env.QA_WIDTHS ? process.env.QA_WIDTHS.split(',').map(Number) : [1440, 1281, 1280, 1024, 768, 430, 390, 360];
const report = { origin, scenes: [], backgrounds: [], interactions: [], errors: [] };
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
page.setDefaultTimeout(15000);
page.setDefaultNavigationTimeout(25000);
page.on('pageerror', error => report.errors.push(error.message));
const active = () => page.locator('.home-narrative').getAttribute('data-active-scene');
async function settled(index) {
  await page.waitForFunction(index => document.querySelector('.home-narrative').dataset.activeScene === String(index), index);
  await page.waitForFunction(() => !document.querySelector('.book-turn-leaf'));
}
async function ready() {
  await page.evaluate(async () => { await document.fonts.ready; document.querySelectorAll('img[loading="lazy"]').forEach(image => image.loading = 'eager'); await Promise.all([...document.images].map(image => image.decode().catch(() => {}))); });
}
try {
  for (const width of widths) {
    await page.setViewportSize({ width, height: width === 1281 ? 552 : 1000 });
    await page.goto(origin + '/', { waitUntil: 'networkidle' });
    await ready();
    await page.mouse.move(width / 2, Math.min(300, (width === 1281 ? 552 : 1000) / 2));
    const originalScroll = await page.evaluate(() => scrollY);
    for (let index = 0; index < 4; index++) {
      if (index) {
        await page.mouse.wheel(0, 40);
        await page.waitForFunction(index => document.querySelector('.home-narrative').dataset.activeScene === String(index), index);
        // A trackpad's trailing events must not skip the next chapter or exit the story.
        for (const delta of [30, 20, 10]) await page.mouse.wheel(0, delta);
        if (index === 1) {
          await page.locator('.book-turn-leaf').evaluate((el, width) => { const animation = el.getAnimations()[0]; animation.pause(); animation.currentTime = width <= 700 ? 220 : 360; }, width);
          assert.match(await page.locator('.book-turn-leaf').evaluate(el => getComputedStyle(el).transform), /^matrix3d\(/, 'A physical 3D page turn is visible');
          await page.screenshot({ path: path.join(output, `book-turn-${width}.png`) });
          await page.locator('.book-turn-leaf').evaluate(el => el.getAnimations()[0].play());
        }
      }
      await settled(index);
      assert.equal(await active(), String(index));
      assert.equal(await page.evaluate(() => scrollY), originalScroll, 'One wheel gesture turns one page without moving the document');
      const state = await page.evaluate(() => {
        const current = document.querySelector('.narrative-scene.is-current');
        const bounds = document.querySelector('.narrative-pages').getBoundingClientRect();
        const clipped = [...current.querySelectorAll('img, figcaption, h1, h2, p, a')].filter(el => {
          const r = el.getBoundingClientRect();
          return r.left < bounds.left - 1 || r.right > bounds.right + 1 || r.top < bounds.top - 1 || r.bottom > bounds.bottom + 1;
        }).map(el => el.textContent || el.getAttribute('alt'));
        const photo = current.querySelector('img').getBoundingClientRect(), copy = current.querySelector('.narrative-copy').getBoundingClientRect();
        return { index: current.dataset.scene, title: current.querySelector('h1,h2').textContent, titleSize: getComputedStyle(current.querySelector('h1,h2')).fontSize,
          visible: document.querySelectorAll('.narrative-scene:not([inert])').length, clipped,
          collision: photo.left < copy.right && photo.right > copy.left && photo.top < copy.bottom && photo.bottom > copy.top,
          overflow: document.documentElement.scrollWidth > innerWidth, background: getComputedStyle(document.body).backgroundColor };
      });
      assert.equal(state.visible, 1); assert.deepEqual(state.clipped, []); assert.equal(state.collision, false); assert.equal(state.overflow, false);
      assert.equal(state.background, 'rgb(245, 244, 242)');
      report.scenes.push({ width, ...state });
      await page.screenshot({ path: path.join(output, `home-${width}-${index + 1}.png`) });
    }
    assert.equal(new Set(report.scenes.filter(scene => scene.width === width).map(scene => scene.titleSize)).size, 1, 'All four story headings share one size');
    await page.mouse.wheel(0, 450);
    await page.waitForFunction(() => scrollY > 100);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.mouse.wheel(0, -40); await settled(2);
    await page.locator('.narrative-index a[aria-current]').focus();
    await page.keyboard.press('ArrowUp'); await settled(1);
    await page.keyboard.press('PageDown'); await settled(2);
    await page.locator('.narrative-index a').first().click(); await settled(0);
    await page.mouse.wheel(0, -100);
    assert.equal(await active(), '0');
    report.interactions.push(`${width}: forward, momentum, reverse, boundary exit, keyboard, chapter links`);
    for (const route of ['/guogang/', '/people/', '/goods/', '/about/']) {
      await page.goto(origin + route, { waitUntil: 'networkidle' });
      const surfaces = await page.locator('html, body, .site-header, .site-footer').evaluateAll(elements => elements.map(el => ({ name: el.className || el.tagName, color: getComputedStyle(el).backgroundColor })));
      surfaces.forEach(surface => assert.equal(surface.color, 'rgb(245, 244, 242)'));
      report.backgrounds.push({ width, route, surfaces });
      if (width === 1440 || width === 360) {
        await ready(); await page.screenshot({ path: path.join(output, `${route.split('/')[1]}-${width}.png`) });
      }
    }
    console.log(`Passed ${width}px: all four page turns, boundary exit, typography, four route backgrounds`);
    await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  }
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const touchPage = await touch.newPage();
  await touchPage.goto(origin + '/', { waitUntil: 'networkidle' });
  const client = await touch.newCDPSession(touchPage);
  const swipe = async (fromY, toY) => {
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: fromY }] });
    for (let step = 1; step <= 12; step++) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y: fromY + (toY - fromY) * step / 12 }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  for (let index = 1; index < 4; index++) {
    await swipe(600, 350);
    await touchPage.waitForFunction(index => document.querySelector('.home-narrative').dataset.activeScene === String(index), index);
    await touchPage.waitForFunction(() => !document.querySelector('.book-turn-leaf'));
  }
  await swipe(600, 300); await touchPage.waitForFunction(() => scrollY > 50);
  await touchPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await swipe(350, 600); await touchPage.waitForFunction(() => document.querySelector('.home-narrative').dataset.activeScene === '2');
  report.interactions.push('390px touch: one chapter per swipe, fourth-page exit and reverse');
  await touch.close();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(origin + '/', { waitUntil: 'networkidle' });
  await page.locator('.narrative-index a').nth(3).click();
  assert.equal(await active(), '3');
  assert.equal(await page.locator('.book-turn-leaf').count(), 0);
  report.interactions.push('Reduced motion changes chapters without animation');
  assert.deepEqual(report.errors, []);
} finally {
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
