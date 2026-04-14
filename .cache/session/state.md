# state.md — project-design

## Git
- branch: develop
- HEAD: 84e1c6c
- main: d5b814b (merged & pushed 2026-04-14 #01 — 高校生向け解説シリーズ公開完了)
- remote: synced
- dirty: .cache/ 系のみ

## 完了タスク
- wiki原典解説56件生成 + index自動生成スクリプト + PD関連セクション整理 + 4層モデル除去
- techo#115: wiki Entities 原典PDF整備 — Issue closed
- CI 修正: ci.yml push トリガー main のみ
- wiki-gen auto-execute: 5件生成 — commit 3f685d5
- #64 デバッグログ除去 — commit 7a57bf4 → **Issue closed**
- #65 DOI/URL追加 103/110件 + Toynbee解説ページ生成 — commit 7620b26 → **Issue closed**
- wiki生成時DOI/URL自動付与ルール追加 — commit ca897d0
- **#63** 古い情報刷新（4層モデル除去）— **Issue closed**
- **#66 Phase 1** wiki 品質基盤整備 — commit b56d76b
- **wiki-gen auto-execute 5件** — commit 905fe58
- **#66 Phase 2 (LOW)** wiki tag体系統一 — commit f20455a → **Issue closed**
- **wiki graph 健全化**（Obsidian グラフビュー確認代替）— commit e732770
  - about-project-design.md orphan 解消、creation-space-domains.md テーブル拡充、orphan-report 更新
- **#67 wiki 全ページ高校生向け解説** — commit c77084a / 1c59dea / 2279e5b → **Issue closed**
  - SKILL.md にルール追加 (c77084a)
  - concepts 9 + entities 22 + cross-refs 4 + top-level 2 = 37件 (1c59dea)
  - sources 116件 (2279e5b) — 6 並列 team-worker + main 30件
  - UTF-8 文字化け（U+FFFD）なし確認済み
- **develop → main マージ公開** — merge d5b814b (2026-04-14 #02)
- **#69** wiki-lint 自動実行 hook — commit bf243c6 → **Issue closed**
- **#70** backlinks 静的生成 → **closed (Quartz で対応済み)**
- **#72 #73 #74** knowledge stale hook / WL-1/WL-5 / debounce 移動 — commit 84e1c6c → **Issue closed**
- **#75 新規** source 不在 6 件の修復 (WL-5 検出) — follow-up open
- **#75 修復** source 不在 6 件 freshness-report PASS — 2026-04-15 着手
  - pd 4 entities: knowledge/raw/*.pdf 二次 source 削除、"原典参照" タグ除去
  - 内受容感覚/間主観性: pd awareness-model に source 差し替え、v3 準拠で全面書き直し
  - 4層/Layer/神経部位確定マッピング/社会的アロスタシス/α機能4層内在化/臨床療法テーブル等の LLM 構成物を除去

## 進行中
- **#75 source 不在 6 件の修復** — 2026-04-15 着手、pjdhiro レビュー待ち（内受容感覚/間主観性 全面書き直し含む）

## 次のステップ
- **#68 umbrella** wiki 自動追従
  - **#69** wiki-lint 自動実行 → **closed** (bf243c6)
  - **#70** backlinks 自動生成 → **closed** (Quartz で対応済み)
  - **#71** log.md auto-append（スコープ狭小化で保留）
  - **#72** knowledge/ 編集時 stale 通知 → **closed** (84e1c6c)
  - **#73** wiki-lint WL-1/WL-5 実装 → **closed** (84e1c6c)
  - **#74** debounce を .cache/ に移動 → **closed** (84e1c6c)
  - **#75** source 不在 6 件の修復（新規、WL-5 検出）
- techo の探究系 backlog（重め、pjdhiro 判断要）:
  - techo#60 探究: 信頼とは何か
  - techo#67 origin-survey: 対照群テスト
  - techo#105 ks/as ナレッジ再構築（LLM推測分離）
  - techo#116 欠損駆動思考ナレッジ全面見直し

## Hot Topics
- **#67 高校生向け解説**: 全 wiki ページ（153件）の `# タイトル` 直後に blockquote 形式で平易な解説を挿入。LLM 向けとは別の「人間の読み手にとっての入口」を全ページに設けた
- **wiki DOI/URL 自動付与**: SKILL.md + wiki-gen-check.sh で manifest notes から DOI/OA URL を抽出し、wiki ソースページ生成時に書誌情報に自動含めるルールを導入
- **wiki 更新ルール稼働**: wiki/ 変更 → index.md 自動再生成 → content wikilink 再処理 → Quartz ビルド
- PDF正本ワークフロー: MD/PDF → pjdhiro assets → GitHub Pages 配信
- 保持論点は ks repo Issue #173-#179 に登録済み
