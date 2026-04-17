# state.md — project-design

## Git
- branch: develop
- HEAD: 1c9ed38 (2026-04-17 #02 セッション終了時点)
- main: 5f1bf6d (merged & pushed 2026-04-17 #02)
- remote: synced
- dirty: .cache/session/state.md のみ
- develop ahead of main: なし（マージ済み）

## 完了タスク
### 2026-04-17 #02 (本セッション — concepts 格上げ + sources 分類)
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
- なし

## 次のステップ
- **#76 sources/pd/ の compile**: 統合分析3件(trust/value/design-thinking) + 独自調査2件(origin-survey, kesson-bridge) の wiki ページ生成
- techo の探究系 backlog（重め、pjdhiro 判断要）:
  - techo#60 探究: 信頼とは何か
  - techo#67 origin-survey: 対照群テスト
  - techo#105 ks/as ナレッジ再構築（LLM推測分離）
  - techo#116 欠損駆動思考ナレッジ全面見直し

## Hot Topics
- **wiki 構造整理完了**: concepts/(16件) + keywords/(15件) + sources/(118件、trust/value/design-thinking サブディレクトリ化済み)
- **概念/運用分離ルール**: wiki-compile SKILL.md に明文化
- wiki 更新ルール稼働: wiki/ 変更 → index.md 自動再生成 → content wikilink 再処理 → Quartz ビルド
- 保持論点は ks repo Issue #173-#179 に登録済み
