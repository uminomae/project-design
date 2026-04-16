# state.md — project-design

## Git
- branch: develop
- HEAD: f909c77 (2026-04-16 #02 終了時点, 並行セッション含む)
- main: acf2e4f (merged & pushed 2026-04-15 #01 — #69 #72 #73 #74 #75 公開)
- remote: synced
- dirty: .cache/ 系のみ
- develop ahead of main: wiki 間主観性/情動伝染 再整理 + 関連 crosslink 機構 + wiki-gen-check 改善 + docs ドリフト修正

## 完了タスク
### 2026-04-16 #02 (このセッション — ワークフローレビュー系)
- **wiki 生成ワークフローのレビューと改善** — commits bc73868, 29ffe17, 44cbd96, f36b00b
  - P0-1 wiki-gen-check false positive 修正: manifest `local_file` が非 PDF / 実ファイル不在の行を対象外、前日以前の inbox を auto-archive (bc73868)
  - P0-2 docs ドリフト修正: wiki-compile/wiki-publish SKILL を `branches:[main]` 実態に戻す (bc73868)
  - P1-④ 関連ページ自動更新: `scripts/wiki-crosslink.mjs` 新規。source → concept/entity/cross-refs への逆向き参照を `## 関連原典` で冪等追記 (29ffe17)。117 sources backfill → 67 件を 10 ハブページに追加
  - P1-⑤ ローカル反映撤退: Node 25/Quartz 4.5.2 OOM 非互換を確定、GitHub Pages 一本化。wiki-crosslink の build を opt-in に (f36b00b)
  - セキュリティ: `GITHUB_TOKEN=gho_...` の ps 露出を検出。pjdhiro 判断で運用注意のみ
- ※ 並行で 2026-04-16 #01 セッションが走行し、間主観性/情動伝染を再整理した (下記)

### 2026-04-16 #01 (並行セッション — wiki 内容系)
- **間主観性/情動伝染の層分離と文献確認書き直し** — commits 600e9a0, 375680a, 222cc3c
  - Trevarthen一次的間主観性/Stolorow調律崩壊論を 間主観性 から 情動伝染 へ分離 (600e9a0)
  - 核心仮説を構造層/現象層併記に更新、Husserl第五省察/Hatfield 1993の原典ノートを knowledge/evidence と wiki/sources に新設 (375680a)
  - SEP Husserl / SEP Empathy / Wikipedia Emotional Contagion を調査し、訓練知識合成を撤廃して文献引用付きで再定義 (222cc3c)
  - SEP Empathy の発達階層モデル (情動伝染→basic empathy→proper intersubjectivity) を採用し、pjdhiro の「本能+間接刺激」モデルと接続
- **wiki-compile SKILL に「定義の文献確認ルール」追加** — 222cc3c
  - 訓練知識合成を禁止、SEP/原典/査読論文での定義確認を必須化
  - 「不明なら書かない」を明文化

### 2026-04-15 以前
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
- **#75** source 不在 6 件の修復 + 内受容感覚/間主観性 を v3 準拠書き直し — commit e6e606e → **Issue closed**
  - pd 4 entities: knowledge/raw/*.pdf 二次 source 削除、"原典参照" タグ除去
  - as 2 entities: pd awareness-model に source 差し替え、v3 全面書き直し
  - LLM 構成物 (Layer/神経部位確定マッピング/社会的アロスタシス/α機能4層内在化/臨床療法テーブル) 除去
  - freshness-report FAIL(6) → PASS(0)
- **内受容感覚/間主観性** pjdhiro 精読 → status: 正準 / review_state: pjdhiro確認済み(2026-04-15)
- **#71** wiki/log.md auto-append hook — commit abc0672 → **Issue closed**（要 close）
  - PostToolUse Bash hook + scripts/wiki-log-append.mjs
  - 閾値 3 wiki/*.md、follow-up コミット方式、核 guard: log.md only / auto-append / --amend
  - 実機テストで e6e606e (10件) 用 retro auto-append 成功 (c4f5996)
- **#68 umbrella** wiki 自動追従 → **Issue closed**（要 close、#71 完了で子 issue 全クリア）
- **wiki-gen-check 改善** — commit bc73868
  - manifest の非PDF/ローカル不在マーカーを対象外
  - 前日以前の wiki-gen-*.md inbox を archive へ自動退避

## 進行中
- なし

## 次のステップ
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
