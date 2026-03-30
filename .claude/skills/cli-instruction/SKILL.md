---
name: cli-instruction
description: |
  CLI指示書を作成するときの標準手順。テンプレート読み込み・チェックリスト・
  判断基準を定める。指示書作成前にこのスキルをロードすることで、
  テンプレート未適用を構造的に防止する。
  正本は project-design。各リポジトリからポインタで参照。
triggers: |
  「CLI指示書を書く」「CLIに投入したい」「指示書作成」
  「CLIにやらせたい」「実装はCLIで」
applyTo: ".cache/inbox/"
agent: "DT"
---

# CLI指示書作成スキル

**バージョン**: 2.0
**作成日**: 2026-03-18
**正本**: project-design（メタリポジトリ）
**移植元**: awareness-space/skills/cli-instruction → pd に正本化 (techo#56)

---

## 0. このスキルの役割

CLI 指示書を作成する際に必ずロードするスキル。
テンプレートの読み込みを「注意して守る」ではなく、
「まずこのファイルを読む」で固定する。

### 他スキルとの連携

| スキル | 責務 | 正本 |
|---|---|---|
| **本スキル** | CLI指示書の作成手順・テンプレート・チェックリスト | pd |
| **codex-worker-instruction** | Codex background worker 向け指示書 | pd |
| **agent-team-workflow** | 指示書を読んだ CLI が実行するワークフロー | pd |

### ワークフロー内の位置

```
本スキルで指示書を生成 → CLI が読み取り → agent-team-workflow で実行
```

---

## 1. 指示書作成手順

### Step 1: テンプレートを読む

正本（pd 同梱）:

`~/.claude/skills/cli-instruction/templates/cli-instruction.md`

各リポにコピーがある場合は `docs/templates/cli-instruction.md` でもよい。

### Step 2: 指示書を書く

テンプレートの構造に従い、作業固有のステップを埋め込む。

必須要素:

- **Step 0（前提確認）** - ブランチ確認等
- **作業手順（Step 1〜N）**
- **検証**
- **commit & push**
- **コミット影響レビュー**
- **Step 完了報告** - 最終出力末尾に `model` / `tokens used`
- **Step 最終（完了処理）** - Issue コメント + DONE ファイル作成 + Issue 状態確認 + close 判定 + close 結果確認

### Step 3: チェックリスト（§3）でセルフチェック

### Step 4: inbox に配置

```text
.cache/inbox/_instructions-{issue}-{slug}.md
```

---

## 2. テンプレート

正本は本スキル同梱の `templates/cli-instruction.md`。

### 必須構造

```markdown
# CLI指示書: {タイトル}

**担当**: Claude Code CLI
**対象リポジトリ**: {owner/repo}
**ブランチ**: {ブランチ名}
**前提**: {前提条件}
**reasoning**: {high | xhigh}

---

## Step 0: 前提確認（作業開始前に必ず実行）

## 前提確認

## 作業手順

## Step N: 検証

## Step N+1: commit & push

## Step N+2: コミット影響レビュー

## Step 気づき: 作業中の発見と助言（必須）

## Step 完了報告（Codex 向け・必須）

## Step 最終: 完了処理

## 完了条件
```

---

## 3. チェックリスト

指示書を書き終えたら、以下を全て確認する。

### 全指示書共通

- [ ] `対象リポジトリ` が記載されているか
- [ ] Step 0（前提確認）が含まれているか
- [ ] Step 最終（Issue コメント + DONE ファイル）が含まれているか
- [ ] Codex 向けの完了報告フッター（`model` / `tokens used`）が含まれているか
- [ ] commit を含む指示書にコミット影響レビューが含まれているか
- [ ] レビュー結果の報告先が明示されているか
- [ ] DONE ファイルの出力先が明示されているか
- [ ] `gh issue view --json state` による終了状況確認が書かれているか
- [ ] Issue close 条件が書かれているか
- [ ] 出力先ディレクトリの README を確認したか

### スキル新設・変更を伴う場合

- [ ] スキル一覧（README 等）を更新したか

---

## 4. 判断基準

### いつ CLI 指示書を書くか

| 状況 | 判断 |
|---|---|
| git commit / push を伴う | CLI指示書 |
| 複数ファイルを編集する | CLI指示書 |
| バッチ処理・一括変換 | CLI指示書 |
| `.cache/` 内のみの軽微作業 | 直接実施でも可 |

### reasoning effort の選択基準

| reasoning | タスク特性 | 例 |
|---|---|---|
| `high` | 機械的検証・形式チェック・ファイル操作 | リネーム、残骸除去、リンク修正 |
| `xhigh` | 解釈・判断・分析・設計を伴う | UI 設計、理論整理、品質評価 |

迷ったら `high` を選ぶ。

---

## 5. 更新履歴

| 日付 | バージョン | 内容 |
|---|---|---|
| 2026-03-30 | 2.0 | pd に正本化。repo 固有参照を汎用化。agent-team-workflow 連携を明記 (techo#56) |
| 2026-03-19 | 1.1 | Step 最終に Issue 状態確認と close 結果確認を追加 |
| 2026-03-18 | 1.0 | kesson-driven-thinking から awareness-space へ移植 |
