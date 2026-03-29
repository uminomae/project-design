/**
 * static-checks.js — 静的整合性チェック
 *
 * CI で Puppeteer なしで回せる軽量テスト群。
 * 実行: node .claude/scripts/static-checks.js
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '../..');
const results = [];
let exitCode = 0;

function pass(id, msg) {
  results.push({ id, status: 'PASS', msg });
}
function fail(id, msg) {
  results.push({ id, status: 'FAIL', msg });
  exitCode = 1;
}

// S1: シェーダー4ファイルの存在確認
const SHADER_FILES = ['main.js', 'main2.js', 'main3.js', 'main4.js'];
const missing = SHADER_FILES.filter(
  f => !fs.existsSync(path.join(ROOT, 'src/shaders', f))
);
if (missing.length === 0) {
  pass('S1', `シェーダー ${SHADER_FILES.length} ファイル全て存在`);
} else {
  fail('S1', `シェーダー不足: ${missing.join(', ')}`);
}

// S2: 各シェーダーに cleanup export があるか
for (const f of SHADER_FILES) {
  const fp = path.join(ROOT, 'src/shaders', f);
  if (!fs.existsSync(fp)) continue;
  const src = fs.readFileSync(fp, 'utf8');
  if (/export\s+function\s+cleanup\b/.test(src)) {
    pass(`S2-${f}`, `${f}: cleanup export あり`);
  } else {
    fail(`S2-${f}`, `${f}: cleanup export なし`);
  }
}

async function main() {
  const appSrc = fs.readFileSync(path.join(ROOT, 'src/app.js'), 'utf8');
  const shaderBootstrapSrc = fs.readFileSync(path.join(ROOT, 'src/bootstrap/shaders.js'), 'utf8');
  const menuSrc = fs.readFileSync(path.join(ROOT, 'src/ui/menu.js'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const siteData = await import(pathToFileURL(path.join(ROOT, 'src/content/site-data.mjs')).href);

  // S3: シェーダーのランダム選択が bootstrap に分離されているか
  if (/loadRandomShader/.test(appSrc) && /Math\.random/.test(shaderBootstrapSrc) && /await import/.test(shaderBootstrapSrc)) {
    pass('S3', 'シェーダーランダム選択ロジックあり');
  } else {
    fail('S3', 'シェーダーランダム選択ロジックなし');
  }

  // S4: モーダルのクエリリンク整合性
  const entryKeys = Object.keys(siteData.KNOWLEDGE_ENTRIES);

  const aboutInHtml = /data-modal-open="about"/.test(indexHtml);
  const aboutInSitemap = /\?about/.test(sitemap);
  if (aboutInHtml && aboutInSitemap) {
    pass('S4a', 'about モーダル: HTML トリガー + sitemap あり');
  } else {
    const lacks = [];
    if (!aboutInHtml) lacks.push('HTML トリガー');
    if (!aboutInSitemap) lacks.push('sitemap');
    fail('S4a', `about モーダル: ${lacks.join(' / ')} なし`);
  }

  const menuRootPresent = /id="site-menu"/.test(indexHtml);
  const knowledgeLinkRenderer = /data-knowledge=/.test(menuSrc);
  for (const key of entryKeys) {
    const inSitemap = sitemap.includes(`?knowledge=${key}`);
    if (menuRootPresent && knowledgeLinkRenderer && inSitemap) {
      pass(`S4k-${key}`, `knowledge/${key}: menu renderer + sitemap あり`);
    } else {
      const lacks = [];
      if (!menuRootPresent) lacks.push('HTML menu root');
      if (!knowledgeLinkRenderer) lacks.push('menu renderer');
      if (!inSitemap) lacks.push('sitemap');
      fail(`S4k-${key}`, `knowledge/${key}: ${lacks.join(' / ')} なし`);
    }
  }

  // S5: index.html の存在
  if (fs.existsSync(path.join(ROOT, 'index.html'))) {
    pass('S5', 'index.html 存在');
  } else {
    fail('S5', 'index.html なし');
  }

  console.log('\n=== Static Checks ===\n');
  for (const r of results) {
    console.log(`  [${r.status}] ${r.id}: ${r.msg}`);
  }
  const passed = results.filter(r => r.status === 'PASS').length;
  console.log(`\n  ${passed}/${results.length} passed\n`);
  process.exit(exitCode);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
