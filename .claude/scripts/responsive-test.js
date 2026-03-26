/**
 * responsive-test.js — WCAG 2.2 AA レスポンシブ品質テスト
 *
 * 根拠: docs/DESIGN-RULES.md §7b
 * 対象: http://localhost:3004/
 * 実行: node .claude/scripts/responsive-test.js
 */

const puppeteer = require('puppeteer');

const URL = process.env.TEST_URL || 'http://localhost:3004/';
const TOUCH_SELECTORS = '.pill, .glow-link, .menu-toggle, .lang-toggle button';
const MIN_TOUCH_SIZE = 44;
const MIN_FONT_SIZE = 12;

const results = [];
let exitCode = 0;

function pass(id, msg) {
  results.push({ id, status: 'PASS', msg });
}
function fail(id, msg) {
  results.push({ id, status: 'FAIL', msg });
  exitCode = 1;
}

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 10000 });
  } catch (e) {
    fail('CONN', `localhost:3004 に接続できません: ${e.message}`);
    console.log(formatResults());
    await browser.close();
    process.exit(1);
  }

  // B1: 320px 幅で横スクロールなし (WCAG 1.4.10)
  await page.setViewport({ width: 320, height: 568 });
  await page.waitForFunction(() => document.readyState === 'complete');
  const b1 = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  if (b1.scrollW <= b1.clientW) {
    pass('B1', `320px: 横スクロールなし (scrollWidth=${b1.scrollW}, clientWidth=${b1.clientW})`);
  } else {
    fail('B1', `320px: 横スクロール検出 (scrollWidth=${b1.scrollW} > clientWidth=${b1.clientW}) [WCAG 1.4.10]`);
  }

  // B2: 768px 幅で grid が 1カラム化
  await page.setViewport({ width: 768, height: 1024 });
  await page.waitForFunction(() => document.readyState === 'complete');
  const b2 = await page.evaluate(() => {
    const grids = document.querySelectorAll('.grid');
    const failures = [];
    grids.forEach((g, i) => {
      const cols = getComputedStyle(g).gridTemplateColumns;
      const colCount = cols.split(/\s+/).filter(c => c && c !== '0px').length;
      if (colCount > 1) {
        failures.push(`grid[${i}]: ${colCount}カラム (${cols})`);
      }
    });
    return failures;
  });
  if (b2.length === 0) {
    pass('B2', '768px: 全 .grid が 1カラム');
  } else {
    fail('B2', `768px: grid 1カラム化失敗 — ${b2.join(', ')}`);
  }

  // B3: 200% zoom で水平オーバーフローなし (WCAG 1.4.4)
  // 200% zoom = 640px content を 1280px viewport で表示するのと同等
  await page.setViewport({ width: 640, height: 480 });
  await page.waitForFunction(() => document.readyState === 'complete');
  const b3 = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  if (b3.scrollW <= b3.clientW) {
    pass('B3', `200% zoom相当 (640px): 横オーバーフローなし`);
  } else {
    fail('B3', `200% zoom相当 (640px): 横オーバーフロー (scrollWidth=${b3.scrollW} > clientWidth=${b3.clientW}) [WCAG 1.4.4]`);
  }

  // B4: タッチターゲット実測 44x44px 以上 (WCAG 2.5.5)
  await page.setViewport({ width: 375, height: 812 });
  await page.waitForFunction(() => document.readyState === 'complete');
  const b4 = await page.evaluate((sel, min) => {
    const elems = document.querySelectorAll(sel);
    const failures = [];
    elems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width < min || rect.height < min) {
        const label = el.textContent.trim().slice(0, 20) || el.className;
        failures.push(`${label}: ${Math.round(rect.width)}x${Math.round(rect.height)}px`);
      }
    });
    return failures;
  }, TOUCH_SELECTORS, MIN_TOUCH_SIZE);
  if (b4.length === 0) {
    pass('B4', `タッチターゲット全て >= ${MIN_TOUCH_SIZE}x${MIN_TOUCH_SIZE}px`);
  } else {
    fail('B4', `タッチターゲット不足 — ${b4.join(', ')} [WCAG 2.5.5]`);
  }

  // B5: フォント最小 12px
  const b5 = await page.evaluate((min) => {
    const failures = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const checked = new Set();
    while (walker.nextNode()) {
      const el = walker.currentNode.parentElement;
      if (!el || checked.has(el) || !walker.currentNode.textContent.trim()) continue;
      checked.add(el);
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (size < min) {
        const tag = el.tagName.toLowerCase();
        const cls = el.className ? `.${el.className.split(' ')[0]}` : '';
        failures.push(`${tag}${cls}: ${size}px`);
      }
    }
    return failures;
  }, MIN_FONT_SIZE);
  if (b5.length === 0) {
    pass('B5', `全テキスト >= ${MIN_FONT_SIZE}px`);
  } else {
    fail('B5', `フォント ${MIN_FONT_SIZE}px 未満 — ${b5.join(', ')}`);
  }

  await browser.close();
  console.log(formatResults());
  process.exit(exitCode);
}

function formatResults() {
  const lines = ['\n=== Responsive Quality Test (WCAG 2.2 AA) ===\n'];
  for (const r of results) {
    const icon = r.status === 'PASS' ? 'PASS' : 'FAIL';
    lines.push(`  [${icon}] ${r.id}: ${r.msg}`);
  }
  const passed = results.filter(r => r.status === 'PASS').length;
  lines.push(`\n  ${passed}/${results.length} passed\n`);
  return lines.join('\n');
}

run().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
