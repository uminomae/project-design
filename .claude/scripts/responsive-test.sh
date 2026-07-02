#!/bin/bash
# responsive-test.sh — WCAG レスポンシブ品質テスト実行
# 実行: bash .claude/scripts/responsive-test.sh
# 前提: localhost:3004 が起動していること

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# localhost:3004 の起動確認
if ! curl -s -o /dev/null -w '' http://localhost:3004/ 2>/dev/null; then
  echo "[SKIP] localhost:3004 not running — responsive test skipped"
  exit 0
fi

cd "$PROJECT_DIR"

# 対象ページ: index + 公開サブページ（DESIGN-RULES §0a 項目7）
rc=0
for u in "http://localhost:3004/" "http://localhost:3004/reader/three-and-seven.html"; do
  echo "== Testing $u =="
  TEST_URL="$u" node .claude/scripts/responsive-test.js || rc=1
done
exit "$rc"
