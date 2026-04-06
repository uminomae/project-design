---
title: "Compile Log"
---
# Compile Log

compile 実行の履歴。append-only。

<!-- 各 compile 実行時に以下の形式で追記:
## [YYYY-MM-DD] compile | {対象}
- scope: {Step 1/2/3}
- sources: {入力ファイル数}
- pages: {生成/更新ページ数}
- duration: {所要時間}
-->

## [2026-04-06] compile | Step 2.5 value entities
- scope: Step 2.5（value-integrated から entities 追加）
- sources: 1（value-integrated.md）
- pages: 5 新規 entities（シュワルツの基本的価値理論, ピエール・ブルデュー, プロスペクト理論, デイヴィッド・グレーバー, Value Sensitive Design）
- updates: index.md, concept-entity-map, freshness-report, orphan-report
- notes: value-integrated の主要理論から人物2 + 理論3 を entities として compile。既存8ページと重複なし。

## [2026-04-06] compile | Step 2 entities + cross-refs
- scope: Step 2（同一リポ cross-directory）
- sources: 4（trust-integrated, value-integrated, design-thinking-integrated, kesson-bridge）
- pages: 10（entities 8, cross-refs 1, health 3 更新/新規）
- notes: research/ から entities、cross-refs 生成。wiki-lint 初回実行。concepts/ に entities への wikilink 追加。

## [2026-04-06] compile | Step 1 concepts
- scope: Step 1（同一ディレクトリ内）
- sources: 4
- pages: 4
- notes: 初回 compile。pd/knowledge/concepts/ から wiki/concepts/ へ
