# state.md — project-design

## Git
- branch: develop
- HEAD: cec4c5e (2026-04-17 #03 セッション終了時点)
- main: 09ef374 (merged & pushed 2026-04-17 #03)
- remote: synced
- dirty: .cache/session/state.md のみ
- develop ahead of main: なし（マージ済み）

## 完了タスク
### 2026-04-17 #03 (本セッション — wiki ワークフロー自動化強化)
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
- なし

## 次のステップ
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
