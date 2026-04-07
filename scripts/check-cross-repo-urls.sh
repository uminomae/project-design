#!/usr/bin/env bash
set -euo pipefail

# クロス repo URL 参照の整合性チェック
# GitHub Pages の公開 URL パターンとの整合性を検証する
#
# 正しいパターン:
#   https://uminomae.github.io/project-design/
#   https://uminomae.github.io/awareness-space/
#   https://uminomae.github.io/kesson-space/
#   https://uminomae.github.io/creation-space/
#
# 誤りやすいパターン:
#   /pjdhiro/project-design/  (旧パス)
#   //project-design/         (ダブルスラッシュ)

errors=0

# 旧パス /pjdhiro/ が残存していないか
if grep -rn '/pjdhiro/project-design' index.html src/ sitemap.xml 2>/dev/null; then
  echo "FAIL: Legacy path '/pjdhiro/project-design' found"
  errors=$((errors + 1))
fi

if grep -rn '/pjdhiro/awareness-space' index.html src/ sitemap.xml 2>/dev/null; then
  echo "FAIL: Legacy path '/pjdhiro/awareness-space' found"
  errors=$((errors + 1))
fi

if grep -rn '/pjdhiro/kesson-space' index.html src/ sitemap.xml 2>/dev/null; then
  echo "FAIL: Legacy path '/pjdhiro/kesson-space' found"
  errors=$((errors + 1))
fi

if grep -rn '/pjdhiro/creation-space' index.html src/ sitemap.xml 2>/dev/null; then
  echo "FAIL: Legacy path '/pjdhiro/creation-space' found"
  errors=$((errors + 1))
fi

# ダブルスラッシュのパス (//project-design/ 等)
if grep -rn '//project-design/' index.html src/ sitemap.xml 2>/dev/null | grep -v 'https://' | grep -v 'http://'; then
  echo "FAIL: Double-slash path found"
  errors=$((errors + 1))
fi

if [ $errors -gt 0 ]; then
  echo ""
  echo "FAIL: $errors cross-repo URL issue(s) found"
  exit 1
else
  echo "PASS: No cross-repo URL issues detected"
fi
