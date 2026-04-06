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

## [2026-04-06] compile | Step 3 P1 clinical-psychology + as topics + pd meta
- scope: Step 3 P1（cross-repo compile: ks clinical-psychology + as topics + pd meta）
- sources: 10（ks/text/clinical-psychology/ 7篇, ks/schema/core-definitions, as/topics/four-layers/ja/report, as/topics/survival-trust-axis/ja/report, pd/meta/project-overview）
- pages: 5 entities stub -> 充実化（ネガティブケイパビリティ, 間主観性, 情動の構成, 内受容感覚）+ 1 concepts stub -> 充実化（プロジェクトデザイン）+ 1 entities 新規（4層モデル）
- updates: index.md, concept-entity-map, freshness-report, orphan-report
- notes: ks Phase 4 Part 1-6 から臨床心理学概念を compile。as の4層モデル・生存-信頼軸レポートを参照。赤リンク 7件中 5件を解消 + 新規1件。残り2件（Love 駆動開発, 感情処理）は P2 で対応。

## [2026-04-06] compile | Step 3 P0 core concepts (cross-repo)
- scope: Step 3 P0（cross-repo compile: ks + pd）
- sources: 6（ks/core-definitions, ks/phase1-summary, ks/glossary, ks/container-mapping, ks/hoji-matching-v2, pd/design-thinking-integrated）
- pages: 4 entities（欠損, 欠損駆動思考, 抱持, デザイン思考）stub -> 充実化
- updates: index.md, concept-entity-map, freshness-report, orphan-report
- notes: D1-D4 コア定義から entities を compile。抱持は Containment の訳語として統一（Withhold ではない）。赤リンク 11件中 4件を解消。

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
