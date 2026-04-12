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

## [2026-04-11] compile | Step 3b wiki-gen auto-execute + DOI/URL 一括追加
- scope: Step 3b（wiki-gen auto-execute, sources 書誌拡充, 原典解説追加）
- sources: 7（未生成PDF 5件: D10_akdis, D10_rosenblum, D12_maff, D12_stern, D02_rayleigh）+ D16 Toynbee解説 + 既存 sources 103件
- pages: 原典解説 6件新規（上記 5 + D16 Toynbee）+ sources 103件に DOI/OA URL 追加
- updates: .claude/skills/wiki-compile/SKILL.md に DOI/URL 自動付与ルール追加、wiki-gen-check.sh 新設
- commits: 3f685d5, 4b7aabb, 7620b26, ca897d0
- notes: wiki-gen inbox の auto-execute フローが稼働。残7件は DOI 非該当（intersubjectivity 4件、JETP/書籍章/Hilgardia 3件）。

## [2026-04-10] compile | Step 3b 一括 PDF解説ページ生成 + 4層モデル除去
- scope: Step 3b（knowledge/raw/*.pdf → sources/ 原典解説ページ一括生成）+ リファクタリング
- sources: 56（D01-D30 の creation-space 原典 PDF）
- pages: sources/ 56ページ新規 + 4層モデル関連ファイル全除去（#63）+ PD関連セクション整理
- updates: index.md 自動生成スクリプト追加, compile-content-links.mjs export 化（as#125）
- commits: 194eadb, 91e0ccc, 3350961, 90286ee
- notes: wiki-compile Step 3b 仕組み確立。index.md の維持を自動化。4層モデル非採用決定に伴う除去。

## [2026-04-08] compile | cross-refs/awareness-space-overview v2照合 + アウェアネスモデル v3
- scope: 既存 compile ページの v2 照合と新規 concept ページ追加
- sources: awareness-space knowledge/topics/four-layers/ja/, survival-trust-axis/ja/
- pages: cross-refs/awareness-space-overview.md（review_state: v2照合済）、concepts/アウェアネスモデル.md 新規、entities/ 一部更新（ocr_verified 付与）
- commits: 0606e50 以降（techo#108, #120 連携）
- notes: as knowledge の v2 系列を wiki に取り込み、entities/間主観性 を v2照合中状態に変更。ocr_verified フィールド導入。

## [2026-04-06] compile | Step 3 P3 finalize (cross-refs overview + wikilink meta + health check)
- scope: Step 3 P3（仕上げ: overview ページ + wikilink メタ + health check + about 更新）
- sources: wiki 内データ（集約ページ）
- pages: 2 cross-refs 新規（kesson-space-overview, awareness-space-overview）+ 1 concepts stub -> 充実化（wikilink）
- updates: concept-entity-map（最終整合確認）, freshness-report, orphan-report, about.md, index.md, log.md
- notes: P0-P3 全完了。赤リンク 0件。孤立ページ 0件。全ページ FRESH。about.md に Step 3 完了と cross-repo ソース一覧を追加。Issue #53 close。

## [2026-04-06] compile | Step 3 P2 concepts + cs knowledge
- scope: Step 3 P2（cross-repo compile: pd/meta + ks/clinical-psychology + cs/knowledge）
- sources: 35+（pd/meta/project-overview, ks/schema/core-definitions, ks/text/clinical-psychology/part2,3,5,6, cs/knowledge/five-stages-guide, cs/knowledge/glossary, cs/knowledge/schema/five-stages, cs/knowledge/schema/academic-domains, cs/knowledge/domains/ D01-D30 全30レポート）
- pages: 2 concepts stub -> 充実化（Love 駆動開発, 感情処理）+ 1 entities 新規（創造の5段階モデル）+ 1 cross-refs 新規（creation-space-domains）
- updates: index.md, concept-entity-map, freshness-report, log.md
- notes: P2 完了。Love 駆動開発・感情処理の赤リンク解消。cs 30ドメイン横断テーマ（縁の中心性、境界の厚み、予測符号化クラスタ、遅延負帰還と抱持、循環構造、領域クラスタ分布）を1ページに抽出。

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
- notes: コア概念群から entities を compile。抱持は Containment の訳語として統一（Withhold ではない）。赤リンク 11件中 4件を解消。

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
