---
name: model-dispatch
description: |
  設計と実行のモデル振り分け方針。Fable 5（Main セッション）を設計者・複雑推論・
  統合判断に固定し、調査・実装の実行は Opus / Sonnet / Haiku の subagent に
  タスク特性で振り分ける。Agent tool の model パラメータと
  agent-team-workflow の各フェーズに適用する。
  正本は project-design。各リポジトリからポインタで参照。
triggers: |
  「model-dispatch」「モデル振り分け」「fable5 で設計」
  「実行は opus/sonnet で」「モデルを適宜判断して」
applyTo: ".claude/agents/, .claude/skills/"
agent: "CLI"
---

# model-dispatch スキル

**バージョン**: 1.0
**作成日**: 2026-07-09
**Issue**: cs#259（初出。TH-001 READER パイプラインの運用要件から新設）
**正本**: project-design（メタリポジトリ）

---

## 0. 原則 — 設計と実行の分離

- **Main セッション（Fable 5）は設計者**。計画・アーキテクチャ判断・複雑な推論・
  成果物の統合・最終検証・マージ・pjdhiro との対話を担い、
  **実行作業で自分のコンテキスト窓を消費しない**。
- **実行は subagent**。調査・精読・実装・整形は Agent tool で
  Opus / Sonnet / Haiku に委任する。
- **LLM を使わない選択肢を常に先に検討する**。決定的スクリプト（`scripts/`）で
  済む集計・検査に subagent を立てない（cs#246）。

## 1. 役割 × モデル対応表

| モデル | 役割 | 典型タスク |
|---|---|---|
| **Fable 5**（Main） | 設計者・PM・複雑推論 | 調査計画の設計／READER 骨格・論理構成の決定／subagent 出力の統合・裁定／不変条件に関わる判断／マージ・push／pjdhiro への提案 |
| **Opus**（subagent） | 高難度実行 | 批判レビュー（critic）／長鎖推論を要する原典精読・矛盾検出／数学・物理の検証／統合的な長文執筆の下書き |
| **Sonnet**（subagent） | 標準実行 | SURVEY 並行調査／source-note 生成／定型実装（テンプレ移植・スクリプト作成）／テスト作成・実行／書誌照合 |
| **Haiku**（subagent） | 軽量実行 | 列挙・収集・フォーマット変換／機械的チェックの束ね／単純な抽出 |

**Fable 5 を subagent に使わない**（`fork` 以外で model: "fable" を指定しない）。
設計判断が subagent 側に分散すると、Main の裁定と衝突して統合コストが増える。

## 2. 判断基準（「適宜判断」の明文化）

上から順に評価し、最初に該当した行に従う:

| 条件 | 振り分け |
|---|---|
| 誤りが下流全体に伝播する判断（構成・命名・不変条件・公開可否） | **Main（Fable 5）が自分でやる** |
| 決定的スクリプトで代替可能（集計・整合検査・変換） | **LLM を使わない**（`scripts/` を書く/使う） |
| 出力品質が推論の深さに依存（批判・検証・難文献・数理） | **Opus** |
| 手順が明確で、完了条件を機械的に検証できる（実装・調査・生成） | **Sonnet** |
| 手順が自明で出力が短い（列挙・変換・単純抽出） | **Haiku** |

迷ったら **Sonnet**。Sonnet の出力が浅ければ同一タスクを Opus で 1 回だけ再実行し、
それでも不足なら Main が直接やる（3 段で打ち切り。モデル間往復を繰り返さない）。

## 3. 指定方法

Agent tool の `model` パラメータは agent 定義（`.claude/agents/*.md`）の
`model:` frontmatter に**優先**する。

- team-* agents（researcher / critic / worker / planner）の既定は `sonnet`
- critic を高難度案件で使うときは起動時に `model: "opus"` を明示する
- 実装委任は `subagent_type: "claude"`（汎用）+ `model: "sonnet"` + 必要なら
  `isolation: "worktree"`

```
Agent(subagent_type: "team-critic", model: "opus", prompt: ...)
Agent(subagent_type: "claude", model: "sonnet", isolation: "worktree", prompt: ...)
```

## 4. 枠ゲート（必須・cs#246 準拠）

subagent 起動前に必ず枠ゲートを通す（cs では `bash scripts/budget-check.sh --plan N`）:

| 判定 | 本スキルでの追加ルール |
|---|---|
| SUBAGENT_OK | 対応表どおり起動 |
| CAUTION | **Opus 指定を Sonnet に降格**し、並行を 1 本に絞る |
| MAIN_ONLY | subagent 禁止。Main 逐次 or 決定的スクリプト |

並行は 2 本までを既定とする。Opus の並行起動は原則しない（枠消費が大きい）。

## 5. agent-team-workflow への適用

7 フェーズ（SURVEY → REVIEW → PLAN → REVIEW → EXECUTE → REVIEW → CLOSE）への割当:

| フェーズ | 実行者 | モデル |
|---|---|---|
| SURVEY | team-researcher（並行可） | Sonnet（難文献・数理の柱だけ Opus） |
| REVIEW（各回） | team-critic | **Opus 推奨**（合意度判定の質が推論深度に依存） |
| PLAN | Main | Fable 5（planner agent を立てず Main が設計） |
| EXECUTE | team-worker / 汎用 claude | Sonnet |
| CLOSE（統合・最終検証） | Main | Fable 5 |

## 6. 完了処理

- subagent の完了処理は各 repo の `.claude/rules/agent-completion.md` に従う
- Main は subagent 出力を**必ず自分で検証してから**統合する
  （モデルを下げた分、検証は Main 側で厚くする）

## 7. 関連

- `agent-team-workflow`（pd 正本）— フェーズ定義と Handoff フォーマット
- cs `.claude/rules/parallel-worktree.md` — 枠ゲート・実行パターン
- cs `.claude/rules/agent-completion.md` — 完了処理
- cs#259 — 初出ユースケース（TH-001 READER パイプライン）
