# CLAUDE.md

プロジェクトデザイン論の探索・構造化・管理拠点。

## このファイルの位置づけ

**権限・起動手順・branch ルールの正本は本ファイル。**
競合した場合は `CLAUDE.md` を優先する。本ファイル更新時は `docs/README.md` も同時に確認すること。

## プロジェクト概要

- `project-design` は「プロジェクトデザイン論」を探索する独立モジュール
- プロジェクト = 「やること（Doing）」＋「起きていること（Being）」を含む出来事
- Love 駆動開発: 関係・感情・意図が駆動する局面に名前を与える試み
- 調査資産を `knowledge/evidence/` に蓄積し、`transform/` で公開用に整形する
- **公開 MD の正本は `pjdhiro` に残す**（creation-space と同じパターン）

## コンテンツ源（pjdhiro 正本）

| pjdhiro 上のパス | 内容 |
|---|---|
| `_pages/pd/project-design.md` | PD 総論（射程・領域・Doing/Being・Love駆動開発） |
| `_pages/pd/dialogue/` | 対話記録 7篇（創造、受容、場と時代、概念共有、精神、PD、2025） |
| `_pages/pd/thinking/` | 思考法（欠損駆動思考、BI思考） |
| `_pages/pd/emotional-processing/` | 感情処理 7篇（瞑想、情動伝染、感情メタ認知、心理的境界、価値、受容、総論） |
| `_pages/pd/word/` | 用語定義（プロジェクト、その他） |

## 絶対原則

- **保持論点を急いで解くな**。不快と混乱は保持論点として残す
- **AI多数派バイアス保護**: 独自の主張を通説に丸めない
- **[P][M][S]タグ**: [P]確立事実 / [M]比喩的解釈 / [S]推測仮説。最終出力には含めない
- 対話する人間の固有名詞は **pjdhiro** を使用
- **取り消せない操作、価値判断を伴う操作は pjdhiro の明示的承認なしに実行しない**

<important if="you are writing or modifying JS/TS files">

## コーディング禁止事項

- **JS/TS ファイルでシェルエスケープを使ってはならない**。具体的に禁止するパターン:
  - `\!` → `!` と書く（`!==`, `!value` 等）
  - `` \` `` → `` ` `` と書く（テンプレートリテラル）
  - `\${` → `${` と書く（テンプレートリテラル内の式展開）

</important>

## 委任レベル

| レベル | 例 |
|--------|-----|
| 自律実行 | ファイル読み取り、state.md更新、同期チェック、inbox管理 |
| 確認後実行 | ファイル削除・統合、ルール変更 |
| pjdhiro専権 | しっくり感チェック、保持論点の解消、理論の最終採否、公開判定 |

**永続承認**: セッション終了時に pjdhiro が承認した操作は永続的に有効。
**dev/ 以下の push**: dev/ 配下の全リポジトリは push まで自律実行してよい（2026-03-19 pjdhiro承認）。

## パス定数

| 用途 | パス |
|------|------|
| state.md | `.cache/session/state.md` |
| inbox | `.cache/inbox/` |
| outbox | `.cache/outbox/` |
| active | `.cache/active/` |
| セッションログ | `.cache/session/log-{YYYYMMDD}-{seq}.md` |

<important if="this is the beginning of a session">

## セッション開始手順

1. **state.md を読む**: `.cache/session/state.md`
2. **同期チェック**: `git branch --show-current` → develop確認、HEAD vs remote
3. **inbox/active 確認**
4. **現状報告** → pjdhiro にタスクを選んでもらう

</important>

## Git 規約

- 作業ブランチ: **develop**（main はマージ=公開。pjdhiroが判断）
- `Co-Authored-By: Claude <noreply@anthropic.com>` を含める
- push権限は §委任レベル に従う

<important if="the session is ending or user requests session end">

## セッション終了時（必須）

1. state.md を **Read-Before-Write** で更新
2. セッションログ作成: `.cache/session/log-{YYYYMMDD}-{seq}.md`
3. state.md に最終コミットSHA・次セッションへの指示

</important>

## 自律権限

### 自律pushできる範囲
- evidence/ の調査データ
- state.md / session log / inbox 整理
- knowledge/ のデータ追加・更新

### pjdhiro承認が必要
- CLAUDE.md / .claude/rules/ の変更
- docs/ の構造的変更
- develop → main マージ
- 新しいIssueの作成

## 関連リポジトリ

| リポジトリ | 関係 |
|---|---|
| `pjdhiro` | 公開先。`_pages/pd/` の MD をホスティング |
| `kesson-driven-thinking` | 欠損駆動思考の探索拠点。PD の重要部品 |
| `creation-space` | 「創造とは」の探索拠点。PD の実践事例 |
| `kesson-space` | kesson-space サイト |

## 参照ガイド

タスク種別に応じた必読ファイルは `.claude/rules/docs-navigator.md` を参照。
