#!/bin/bash
# scheduled-responsive-test.sh — 定期レスポンシブ品質テスト
# launchd から呼ばれる。結果を .cache/reviews/ に出力。

set -euo pipefail

PROJECT_DIR="/Users/uminomae/dev/project-design"
LOG_DIR="$PROJECT_DIR/.cache/reviews"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
DATE_SLUG=$(date '+%Y%m%d-%H%M')

mkdir -p "$LOG_DIR"

# PATH 確保 (launchd は最小 PATH)
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$PATH"

# localhost:3004 確認
if ! curl -s -o /dev/null http://localhost:3004/ 2>/dev/null; then
  echo "[$TIMESTAMP] SKIP: localhost:3004 not running" >> "$LOG_DIR/responsive-test.log"
  exit 0
fi

cd "$PROJECT_DIR"

OUTPUT=$(node .claude/scripts/responsive-test.js 2>&1) || true
EXIT_CODE=${PIPESTATUS[0]:-$?}

echo "[$TIMESTAMP] exit=$EXIT_CODE" >> "$LOG_DIR/responsive-test.log"

# FAIL があればレビューファイルを生成
if echo "$OUTPUT" | grep -q '\[FAIL\]'; then
  REVIEW_FILE="$LOG_DIR/REVIEW-responsive-${DATE_SLUG}.md"
  cat > "$REVIEW_FILE" <<REVIEW
# Responsive Quality Test — $TIMESTAMP

## Result: FAIL

\`\`\`
$OUTPUT
\`\`\`

## 根拠
- docs/DESIGN-RULES.md §7b
- WCAG 2.2 AA

## 対応
FAIL 項目を修正し、\`npm test\` で再確認すること。
REVIEW
  echo "[$TIMESTAMP] FAIL — wrote $REVIEW_FILE" >> "$LOG_DIR/responsive-test.log"
else
  echo "[$TIMESTAMP] PASS" >> "$LOG_DIR/responsive-test.log"
fi
