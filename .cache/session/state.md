# state.md — project-design

## Git
- branch: develop
- HEAD: 93a6360 (docs(skill): wiki-compile SKILL.md を4ファイル分割)
- main: 0b56c2f (About モーダル系マージ済み、#79 以降は未反映)
- remote: synced
- dirty: state.md (本セッション未 commit)
- develop ahead of main: 非常に大きい（#79 + cs-as-component ルール + #81 Phase A〜C-2b 計 117 件 + About モーダル系 + wiki-compile 分割 等）

## 完了タスク
### 2026-04-19 #03 (本セッション — wiki-compile SKILL.md 4ファイル分割)
- **wiki-compile skill の構造整理**: 364行の単一 SKILL.md を entry + 3 詳細ファイルに分割
  - `SKILL.md`（92行、entry）: 概要 / Step スコープ / フロー / 更新トリガー / CLI指示書チェックリスト / 正本方針
  - `sources-pipeline.md`（177行）: Step 3b 自動化、命名、本文構造、DOI/URL、OCR、生成後処理
  - `writing-rules.md`（86行）: 設計原則、概念/運用分離、定義の文献確認、高校生向け解説
  - `schemas.md`（73行）: Front matter、wikilink、index.md 自動生成
- **cli-instruction 由来のチェックリストを統合**: Step 0、Step 最終、DONE、Issue close、commit 影響レビュー、Codex 完了報告フッター等
- **正本方針**: pd 単独、他 repo へは symlink 作成せず（wiki-compile は pd でのみ実行される skill のため dead reference になる）
- commit: 93a6360 / push: develop 済
- セッションログ: `.cache/session/log-20260419-03.md`, `/Users/uminomae/dev/.cache/session-logs/SESSION-20260419-03.md`

### 2026-04-19 #02 以前 (pd#81 Phase C-2b PMC バケツ + Publisher 最終評価)
- **Phase C-2b 完了**: WebFetch PMC 3 件追加
  - D11-S14 blanco (Principles of nanoparticle design, PMC4978509)
  - D11-S17 tognoli (Brain coordination dynamics: metastability, PMC3020160)
  - D22-S14 wenger/snyder (Communities of Practice / Our World as a Learning System, PMC7122803)
- pd wiki/sources/: 236 → 239 (+3)
- inbox v2: 123 → 120
- **Publisher 最終評価**（C-2a + C-2b 通算）:
  - ✅ 成功: PMC / arXiv abs / Frontiers HTML / figshare (一部)
  - ❌ 失敗: Nature (303) / PNAS (403) / preprints.org (403) / MDPI HTML・PDF (403) / Cell / Springer article・PDF (303) / figshare (文脈依存)
  - → 残 120 件は**即時 WebFetch 経路では処理不可**。Semantic Scholar API / DOI → PMC 検索 / archive.org 別経路が必要
- pd#81 コメント: **未投稿**（`gh` で TLS x509 エラー `OSStatus -26276`。git push は通る、gh API のみ失敗）。次セッションで再試行 or pjdhiro 手動投稿
- セッションログ: `.cache/session/log-20260419-02.md`, `/Users/uminomae/dev/.cache/session-logs/SESSION-20260419-02.md`

### 2026-04-19 #01 以前 (pd#81 Phase C-2a + Publisher 評価)
- **Phase C-2a 完了**: WebFetch 6 件追加
  - D11-S15 csermely (allo-network drugs, arXiv)
  - D14-S02 clark-chalmers (Extended Mind, TUE PDF)
  - D18-S09 nowak (Five Rules, PMC)
  - D23-S16 kartner-koster, D23-S18 kim-carlson (Frontiers)
  - D24-S16 berkovich-ohana (Frontiers)
- pd wiki/sources/: 230 → 236 (+6)
- inbox v2: 129 → 123
- pd#81 にコメント投稿済（#issuecomment-4274569678）
- **Publisher 評価**: PMC/arXiv/Frontiers ◯ / Cell・MDPI・Royal Society・Springer ✗
- 次セッション用指示書配置予定: `_instructions-81-phase-c2-fetch-routes.md`

### 2026-04-18 #02 以前 (pd#81 Phase C-1 完了: cs 既要約 48 件全消化)
- **★ Phase C-1 完了 (C-1a 〜 C-1d)**: 48 件追加。cs 既要約から再編可能なものを全消化
  - C-1a: D01-D04 系 +12 (commit e63308d)
  - C-1b: D04/D06/D07 系 +12 (commit ec8c1e9)
  - C-1c: D07-D15 系 +12 (commit aeec8ed)
  - C-1d: D07/D16-D30 系 +12 (commit 07b3151)
- pd wiki/sources/: 182 → 230 (+48)
- inbox v2: 177 → 129 (48 件処理済)
- 入力: cs/knowledge/source-notes/D{NN}/D{NN}-S##_*.md（cs 構造変更後の新パス）
- pjdhiro 側で先行コミット分も path フィールドを `knowledge/wiki/` → `knowledge/source-notes/` に一括更新
- pd#81 に Phase C-1 完了コメント投稿済 (#issuecomment-4273908579)
- 残スコープ: Phase C-2 = 残 129 件（すべて WebFetch 必要、緊急性低下）

### 2026-04-18 #01 以前 (pd#81 Phase B 完了: ≥5 不変条件 30/30 達成)
- **★ Phase B 完了 (B-1 〜 B-4)**: 50 件追加、cs#227 ≥5 不変条件を全 30 領域で PASS
  - B-1: D03/D04/D05/D08/D10/D12 +12 (commit 96b2701, 54443cb)
  - B-2: D14/D16/D17/D18 +14 (commit 0bfe823)
  - B-3: D19/D20/D22/D23/D24/D25 +13 (commit b5a7568)
  - B-4: D27/D28/D29/D30 +11 (commit 0ba33aa)
- pd wiki/sources/: 122 → 182 (+60 = Phase A 10 + B 50)
- inbox v2: 237 → 177 (60 件処理済)
- 入力: 全 60 件、cs/knowledge/wiki/D{NN}/D{NN}-S##_*.md（cs 既要約）を一次入力
- 戦略: WebFetch 不要、cs 既要約からの再編で完結
- pd#81 に Phase B 完了コメント投稿済 (#issuecomment-4272939722)
- 指示書: `_instructions-81-wiki-completion.md`（B-1〜B-4 の Phase 計画）
- 残スコープ: Phase C = 残り 177 件（≥5 超過テール、緊急性低下）

### 2026-04-17 #06 以前 (pd#81 Phase A: D09/D26 ゼロ埋め)
- **Phase A 完了**: D09 (0→5) + D26 (0→5) = 合計 +10 本
- url-verified エントリの初配置。front matter に `oa_url` フィールド導入
- inbox v2: 237 → 227 に圧縮
- commit: 2b6607b (D09) / 218a161 (D26 + index)
- pd#81 にコメント投稿済（#issuecomment-4268555144）

### 2026-04-17 #05 以前 (About モーダル Wiki リンク追加)
- **About モーダルに Wiki リンク追加** (commit b903e4a, 3d91059)
  - `content/about-{ja,en}.md` の「プレゼン資料を見る / AIに読ませる」行に `<a href="/project-design/wiki/" target="_blank" rel="noopener">Wiki</a>` を追加
  - compiled 版も再生成
- **develop → main マージ公開** (6f9963d → 0b56c2f)

### 2026-04-17 #04 (cs#225 umbrella + pd#79 hook 拡張)
- **cs#225 Phase A 診断**: team-worker 経由で cs/pd wiki 本数ギャップを機械集計
  - レポート: `cs/.cache/session/REPORT-cs225-wiki-gap-20260417.md`
  - 数値: cs 201 / pd 98、pd shortage 22/30 領域
  - cs#225 に Phase A 完了コメント投稿
- **pd#79 実装・close** (commit 58c911a):
  - wiki-gen-check.sh を raw-confirmed + url-verified 両対応に
  - access_status 列追加、stem_from_title() 推定 fallback 導入
  - 動作確認: 237 件検出（raw 10 / url 227 / TBD 0）
- **pd#80 起票・指示書配置（未実行）**: 237 件版発生でスコープ見直し要

### 2026-04-17 #03 以前 (wiki ワークフロー自動化強化)
- **#77 stale wiki 再 compile の inbox 依頼化** — commit 40d55bc
  - `scripts/wiki-stale-check.mjs` に `--write-inbox` フラグ追加
  - `.cache/inbox/wiki-restale-{date}.md` を auto-execute 依頼として生成（同日マージ dedupe、旧日付 archive 退避）
  - `.claude/hooks/content-compile.sh` が knowledge/ 編集時に `--write-inbox` を渡す
  - `.claude/rules/session-management.md` の自動実行 inbox 表に `wiki-restale-*.md` 追加
- **#78 SessionStart で wiki/ 差分を state.md に記録** — commit cec4c5e
  - `.claude/hooks/obsidian-diff-check.sh` 新規追加（未 commit + 未 push を両方検出）
  - `wiki/.obsidian/` は pathspec で除外、冪等な置換動作
  - `.claude/settings.json` の SessionStart hooks に登録
- **wiki 更新ワークフロー総合レビュー**: Obsidian 同期ギャップ / stale 再 compile ギャップ / main 自動反映 / cs→pd cross-repo 経路を俯瞰
- **develop → main マージ公開** (09ef374)
- **関連: as/.claude/agents/ の不要 symlink 4本削除**（team-critic/planner/researcher/worker — as では agent-team-workflow 未採用、絶対パスで未 commit の cruft）

### 2026-04-17 #02 以前
- **信頼・価値・デザイン思考を concepts/ に格上げ** — commit 76661c0
  - 信頼.md: CN-005(定義仮説)+CN-006(多元的記述)を統合した単一ページ
  - 価値.md: 新規。5問題系・日英翻訳ズレ・PD接続・Being側空白を明示
  - デザイン思考（PD）.md: 新規。PD独自3視点、keywords/デザイン思考と棲み分け
- **sources/ にサブディレクトリ追加** — 同 commit
  - sources/trust/: Baier, Luhmann, 山岸, Mayer, Rousseau (5件)
  - sources/value/: Kahneman-Tversky, Schwartz, Bourdieu, Graeber, Friedman (5件)
  - sources/design-thinking/: Cross, Schon, Dorst, Rittel-Webber, Johansson-Skoldberg (5件)
- 旧 CN-005/CN-006 削除、全参照を「信頼」に一括更新
- develop → main マージ公開 (5f1bf6d)

### 2026-04-17 #01 以前
- プロジェクトデザイン.md トップレベル昇格 (b02f0ce)
- 運用情報セクション削除 + 概念/運用分離ルール (f8680d3)
- entities/ → concepts/ + keywords/ 分離、sources/pd/ 新設 (8c6b24b)

## 進行中
- **cs#225 (OPEN, umbrella)**: wiki 生成ルール補修。Phase A 完了、Phase B-1 完了。pjdhiro が Issue 本文変更予定
- **pd#80 (OPEN)**: raw PDF 13 件の wiki 化指示書。pd#81 とは別セット。未着手
- **pd#81 (OPEN)**: 237 件 wiki-compile バッチ。**Phase A+B+C-1+C-2a 完了 (-114)、残 123 件、≥5 不変条件 30/30 PASS**

## 次のステップ
- **pd#81 Phase C-2 続き**（残 120 件 — 即時 WebFetch 経路は完全に尽きた）
  - 第二陣の別経路を pjdhiro に相談し方針決定（Semantic Scholar API / DOI → PMC 検索 / archive.org OCR / 古典書籍の扱い）
  - 指示書: `.cache/inbox/_instructions-81-phase-c2-fetch-routes.md`
  - 緊急性は低下（cs#227 ≥5 不変条件は維持）
  - 古典書籍 25 件は pjdhiro 判断待ち（訓練知識書き起こし vs 章別取得 vs Phase から除外）
- **pd#81 コメント未投稿の解消**: 次セッションで `gh` の TLS 問題が再現するか確認し、解消後に Phase C-2b 報告コメント投稿
- **develop → main マージ公開判定**（pjdhiro 専権、Phase A+B の +60 本を公開するか）
- **cs#225 Issue 本文変更後の再スコープ**（pjdhiro による変更待ち）
- **境界ケース 4 件の説明**（pjdhiro 説明要求中）: D15 nose-1940 vs nose_1944, D24 teresa-16c vs teresa_1921, D25 vangennep 2 版, D29 clauset-2009 vs clauset_2007
- **pd#80 スコープ判定**: 13 件 raw PDF を処理するか、#81 に統合 close するか
- **#76 sources/pd/ の compile**: 統合分析3件(trust/value/design-thinking) + 独自調査2件(origin-survey, kesson-bridge) の wiki ページ生成
- techo の探究系 backlog（重め、pjdhiro 判断要）:
  - techo#60 探究: 信頼とは何か
  - techo#67 origin-survey: 対照群テスト
  - techo#105 ks/as ナレッジ再構築（LLM推測分離）
  - techo#116 欠損駆動思考ナレッジ全面見直し

## Hot Topics
- **wiki 更新ワークフロー自動化チェーン完成**:
  - cs raw PDF/wiki 改訂 → pd `.cache/inbox/wiki-gen-*.md`（cs f23edd7）
  - pd knowledge/ 編集 → pd `.cache/inbox/wiki-restale-*.md`（#77）
  - pd wiki/ Obsidian 編集 → pd `state.md` Hot Topics（#78）
  - develop → main は pjdhiro 専権（維持）。main 反映後は GitHub Actions で Pages 自動デプロイ
- **wiki 構造整理完了**: concepts/(16件) + keywords/(15件) + sources/(118件、trust/value/design-thinking サブディレクトリ化済み)
- **概念/運用分離ルール**: wiki-compile SKILL.md に明文化
- 保持論点は ks repo Issue #173-#179 に登録済み
