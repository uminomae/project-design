# state.md — project-design

## Git
- branch: develop
- HEAD: e732770
- main: 9787bac (develop → main マージ済み = 公開)
- remote: synced (develop push済み, main push済み)
- dirty: 並行セッションの sources/ 高校生向け解説 87ファイル（私の作業ではない、触らない）

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
  - CRITICAL: frontmatter status/review_state を125ファイルに追加
  - HIGH: log.md に 2026-04-08/04-10/04-11 のコンパイル履歴追記
  - MEDIUM: about.md にスキーマ拡充・ディレクトリ配置ルール追記
  - MEDIUM: creation-space-domains.md に6クラスタのテーマ別索引追加
- **wiki-gen auto-execute 5件** — commit 905fe58
  - D01 Hadamard (1945), D03 Field-Noyes (1974), D03 Winter-Chambon (1986, OCR),
    D20 UNCITRAL Mediation Rules (2021), D20 Singapore Convention (2018)
  - wiki-gen inbox 5件を archive に移動（D16 Toynbee 依頼含む、全て既生成済み）
- **#66 Phase 2 (LOW)** wiki tag体系統一 — commit f20455a → **Issue closed**
- **wiki graph 健全化**（Obsidian グラフビュー確認代替）— commit e732770
  - about-project-design.md orphan 解消（about.md からリンク追加）
  - creation-space-domains.md テーブル拡充 31件→98件（fan-leaf 62→0）
  - health/orphan-report.md を 2026-04-13 の解析結果で更新
  - 並行セッションで commit 1c59dea/c77084a が先行投入（高校生向け解説追加）
    → 私の about.md/creation-space-domains.md 編集は 1c59dea に取り込み済み
  - sources/ 116件に source 構造タグ付与
  - §1-先行研究 等の位置タグ 5件除去（Barrett/Clark/Craig/Damasio/Friston）
  - about.md に D01-D30 ドメインタグ・位置タグ禁止ルール追記
  - alias 順序統一は影響なしのため見送り（Phase 2 完了）

## 進行中
- なし（セッション終了 2026-04-13 #03、log-20260413-03.md）

## 次のステップ
- techo の探究系 backlog（重め、pjdhiro 判断要）:
  - techo#60 探究: 信頼とは何か
  - techo#67 origin-survey: 対照群テスト
  - techo#105 ks/as ナレッジ再構築（LLM推測分離）
  - techo#116 欠損駆動思考ナレッジ全面見直し
- ※as#125 (2304fca)、techo#112 (507f27c) は実装済み — state.md からstale項目削除

## Hot Topics
- **wiki DOI/URL 自動付与**: SKILL.md + wiki-gen-check.sh で manifest notes から DOI/OA URL を抽出し、wiki ソースページ生成時に書誌情報に自動含めるルールを導入
- **wiki 更新ルール稼働**: wiki/ 変更 → index.md 自動再生成 → content wikilink 再処理 → Quartz ビルド
- **wiki sources 111件**: 103件に DOI/URL あり。残り7件はDOI非該当（intersubjectivity 4件、JETP/書籍章/Hilgardia 3件）、1件新規(Toynbee)
- PDF正本ワークフロー: MD/PDF → pjdhiro assets → GitHub Pages 配信
- 保持論点は ks repo Issue #173-#179 に登録済み
