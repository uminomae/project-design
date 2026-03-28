/**
 * static-checks.js — 静的整合性チェック
 *
 * CI で Puppeteer なしで回せる軽量テスト群。
 * 実行: node .claude/scripts/static-checks.js
 */

const fs = require('fs');
const path = require('path');

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

// S3: app.js がランダム選択ロジックを含むか
const appSrc = fs.readFileSync(path.join(ROOT, 'src/app.js'), 'utf8');
if (/Math\.random/.test(appSrc) && /shaders/.test(appSrc)) {
  pass('S3', 'app.js: シェーダーランダム選択ロジックあり');
} else {
  fail('S3', 'app.js: シェーダーランダム選択ロジックなし');
}

// S4: index.html の存在
if (fs.existsSync(path.join(ROOT, 'index.html'))) {
  pass('S4', 'index.html 存在');
} else {
  fail('S4', 'index.html なし');
}

// 結果出力
console.log('\n=== Static Checks ===\n');
for (const r of results) {
  console.log(`  [${r.status}] ${r.id}: ${r.msg}`);
}
const passed = results.filter(r => r.status === 'PASS').length;
console.log(`\n  ${passed}/${results.length} passed\n`);
process.exit(exitCode);
