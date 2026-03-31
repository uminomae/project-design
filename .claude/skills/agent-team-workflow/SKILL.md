---
name: agent-team-workflow
description: |
  マルチエージェントチームによる汎用ワークフロー。
  SURVEY → REVIEW → PLAN → REVIEW → EXECUTE → REVIEW → CLOSE の7フェーズ。
  共通REVIEWエンジンと検証プリミティブV1-V6を持つ。
  全リポジトリ共通。正本は project-design。
triggers: |
  「エージェントチームで」「マルチエージェントで」「チームレビューして」
  「agent-team-workflow で」
applyTo: "skills/, .cache/"
agent: "CLI"
---

# agent-team-workflow スキル

**バージョン**: 1.5
**作成日**: 2026-03-27
**Issue**: cs#188, techo#68, techo#71, techo#72, techo#73, techo#74, techo#75
**正本**: project-design（メタリポジトリ）
**参照元**: [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) (CC BY-NC 4.0) のエッセンスを抽出し、pjdhiro プロジェクト向けに独自設計・独自実装。

---

## 0. 概要

全スキル・全CLIの基本作業フローをマルチエージェントチームで実行する汎用ワークフロー。

### 原則: シンプルさファースト

**「複雑さを足す前にシンプルな方法を使い切る」**（[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)）。

本ワークフローのデフォルトは **Phase 1-2（SURVEY + REVIEW）のみ**。フル実行（Phase 1-7）は、タスク規模判定またはユーザーの明示指定がある場合のみ。

### 指示書生成スキルとの連携

本スキルは単体でも使えるが、指示書駆動で使うのが標準パターン:

```
指示書生成（cli-instruction / codex-worker-instruction）
  → .cache/inbox/_instructions-*.md を生成
  → CLI / Codex が読み取り
  → 本スキル（agent-team-workflow）で実行
```

| 入力スキル | 用途 | 正本 |
|---|---|---|
| **cli-instruction** | Claude Code CLI 向け指示書を生成 | pd `.claude/skills/cli-instruction/` |
| **codex-worker-instruction** | Codex background worker 向け指示書を生成 | pd `.claude/skills/codex-worker-instruction/` |

指示書が agent-team-workflow の Phase 選択・スキップ・alignment を含む場合、本スキルはそれに従う。

### 前提条件

- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` が `.claude/settings.json` の `env` に設定されていること
- `.claude/agents/team-researcher.md`、`.claude/agents/team-planner.md`、`.claude/agents/team-critic.md`、`.claude/agents/team-worker.md` が配置されていること

### タスク規模判定（techo#74）

Main は alignment 受領時に、チーム実行の必要性を判定する。

| 判定 | 条件 | 実行形態 |
|------|------|---------|
| **single** | 単一ファイルの修正・生成、明確な仕様の定型作業、事実検証不要な実装 | チーム不使用。Main が単独で実行 |
| **light** | 1つの観点から調査・検証すれば十分 | Phase 1-2 のみ（デフォルト） |
| **standard** | 複数ソースの調査統合、設計判断が必要 | Phase 1-4（調査＋計画） |
| **full** | 仮説の妥当性検証、複数ファイル横断の実装、高信頼リサーチ | Phase 1-7（フル実行） |

ユーザーまたは指示書が明示的に Phase 構成を指定した場合、その指定が優先される（オーバーライド）。

### 呼び出し方

| 方法 | 例 |
|------|-----|
| **自動判定** | 「このタスクを agent-team-workflow で」→ Main が規模判定 |
| **明示指定** | 「Phase 1-2 だけ」「full で」「REVIEW だけ」 |
| **指示書から課題注入** | SKILL.md は骨格、具体的な課題・ゴール・スキップ指定はテンプレートで渡す |

### Agent 定義

| agent | 定義ファイル | 役割 | 権限 |
|-------|-------------|------|------|
| **researcher** | `.claude/agents/team-researcher.md` | 調査・情報収集・V1-V2 事実検証 | READ-ONLY |
| **planner** | `.claude/agents/team-planner.md` | 構造化・計画立案・ステップ分解 | READ-ONLY |
| **critic** | `.claude/agents/team-critic.md` | 批判的検証・V3-V6・合意度判定 | READ-ONLY |
| **worker** | `.claude/agents/team-worker.md` | 汎用実行。Main が役割を注入（implementer / translator 等） | READ/WRITE |

標準構成は 4 agent + Coordinator（Main）。WRITE 権限は worker のみに限定する。Main は Coordinator として起動・集約・判定・遷移を制御する。

---

## 1. 実行手順

### Step 0: 起動準備

Main（本体セッション）が以下を実行する:

1. **タスク定義の確認**: 何を調べ/作り/検証するか
2. **タスク規模判定**: §0 の判定基準に基づき single / light / standard / full を決定
3. **Phase 選択**: 規模判定に基づく Phase 構成（ユーザー指定があればオーバーライド）
4. **共有辞書の構築**: タスクに関連する用語・判定基準を整理

```yaml
# Main が構築する共有辞書（タスクごとに内容が変わる）
alignment:
  task: "{タスクの1行説明}"
  terms:
    # タスク固有の用語定義
  severity_levels:
    critical: "プロジェクトの前提を覆す問題"
    major: "成果物の品質に影響する問題"
    minor: "改善の余地がある点"
    info: "参考情報"
  scope: "{調査範囲の制約}"
  skip_phases: []  # スキップする Phase 番号
  scale: "light"   # single | light | standard | full（自動判定結果を記録）
  review_mode: "single"  # single | voting（§2 参照）
```

---

### Phase 間ゲート: Handoff スキーマ検証（techo#71）

Main は各 Phase の出力を次 Phase に渡す前に、以下の必須フィールドを検証する。不正な形式はエラーとして差し戻す。

| フォーマット | 必須フィールド |
|---|---|
| **handoff** | `findings[].claim`, `findings[].evidence`, `findings[].confidence`（high/medium/low） |
| **review** | `consensus`（CONSENSUS-4/3/SPLIT/CRITICAL のいずれか）, `convergence.recommendation` |
| **plan** | `steps[].id`, `steps[].assignee`（worker/researcher/critic）, `steps[].deliverables` |
| **worker-result** | `deliverables[]`（1件以上） |

検証に失敗した場合、Main は該当エージェントにフォーマット修正を指示して再実行する（最大1回）。

---

### Phase 1: SURVEY（調査）

**実行者**: researcher agent（Agent Teams で起動）

**Main の手順**:

1. Agent Teams で team-researcher を起動する。プロンプトに以下を含める:
   - `.claude/agents/team-researcher.md` を読むこと
   - alignment（共有辞書）
   - 答えるべき questions リスト
   - 調査範囲（scope）

2. 複数の観点がある場合、researcher を並行起動してよい（最大3並行）

**researcher の出力**: Handoff フォーマット（§3 参照）

---

### Phase 2: REVIEW（調査のレビュー）

**実行者**: critic agent（Agent Teams で起動）

**Main の手順**:

1. Phase 1 の researcher 出力を集約する
2. Agent Teams で team-critic を起動する。プロンプトに以下を含める:
   - `.claude/agents/team-critic.md` を読むこと
   - alignment（共有辞書）
   - researcher の Handoff 出力（全 agent 分）

3. critic の出力を確認する:
   - **CONSENSUS-4 / CONSENSUS-3** → Phase 3 へ進む
   - **SPLIT** → researcher を追加ラウンドで再起動（最大3ラウンド）
   - **CRITICAL** → Phase 1 からやり直し（問いを修正して再調査）

**critic の出力**: Review フォーマット（§3 参照）

---

### Phase 3: PLAN（計画）

**実行者**: planner agent

**Main の手順**:

1. Phase 2 の収束した調査結果 + INSIGHT を集約する
2. Agent Teams で team-planner を起動する。プロンプトに以下を含める:
   - `.claude/agents/team-planner.md` を読むこと
   - alignment（共有辞書）
   - Phase 1-2 の調査結果・INSIGHT
   - 制約条件
3. planner が返す plan（ステップ分解、担当割り当て、worker-assignment ドラフト）を確認する

---

### Phase 4: REVIEW（計画のレビュー）

Phase 2 と同じ手順。入力 = Phase 3 の計画。

---

### Phase 5: EXECUTE（実装）

**実行者**: worker（role: implementer）、必要に応じて複数 worker を並行起動

**Main の手順**:

1. Phase 4 で収束した計画に基づいて worker を起動する
2. 独立したタスクは worker を複数起動して並行実行（worktree と組み合わせ可）
3. 各 worker の worker-result を集約する

---

### Phase 6: REVIEW（実装のレビュー）

Phase 2 と同じ手順。入力 = Phase 5 の実装結果。

---

### Phase 7: CLOSE

**実行者**: Main

1. 成果物の最終確認
2. INSIGHT の棚卸し（有用なものを記録）
3. 教訓候補があれば即記録（lessons INDEX.md）
4. メタ評価（任意、§5 参照）

---

## 2. REVIEW エンジン詳細

毎回同じエンジン。入力が違うだけ（調査結果 / 計画 / 実装結果）。

### Single モード（デフォルト）

```
Main が critic を1体起動
  → critic が Question taxonomy で問いを生成
  → critic が V3-V6 で検証
  → critic が Consensus を判定
  → critic が INSIGHT を抽出
  → critic が収束判定を返す
Main が判定を確認
  → 収束 → 次 Phase
  → 未収束 → 前 Phase に差し戻し or 追加ラウンド
```

### Voting モード（techo#75、alignment に `review_mode: voting` で有効化）

高信頼性が必要な場面（リサーチ、重要な設計判断）で使用。同一入力で critic を複数独立実行し、多数決で判定する。

```
Main が critic を 2-3 体並行起動（同一入力、独立実行）
  → 各 critic が独立に V3-V6 検証 + consensus 判定
Main が結果を集約
  → 多数決で consensus 判定を統合
  → 意見が割れた場合: 各 critic の指摘を統合し追加ラウンドへ
  → 全員一致: 高信頼で次 Phase へ
```

| 項目 | Single | Voting |
|------|--------|--------|
| critic 数 | 1 | 2-3 |
| コスト | 低 | 中-高 |
| 信頼度 | 標準 | 高（独立検証による三角測量） |
| 適用場面 | 通常タスク | 高信頼リサーチ、重要設計判断 |

### 収束の4シグナル（3つ以上で収束）

| # | シグナル | 判定 |
|---|---------|------|
| 1 | **合意度** | CONSENSUS-4 or CONSENSUS-3 |
| 2 | **新規 INSIGHT** | 直近ラウンドで新規 INSIGHT が出なくなった |
| 3 | **未解決問い** | challenging 問いが全て回答済み |
| 4 | **ラウンド上限** | 最大3ラウンド（デフォルト。指示書で変更可） |

---

## 3. データフォーマット

### Handoff（researcher → Main）

```yaml
handoff:
  from: "researcher"
  phase: 1
  round: 1
  findings:
    - claim: "{主張}"
      evidence: "{根拠}"
      confidence: high | medium | low
      verification: [V1, V2]
  questions:
    - type: clarifying | probing | structuring | challenging
      target: "{対象}"
      content: "{問い}"
  insights: ["{INSIGHT}"]
```

### Review（critic → Main）

```yaml
review:
  from: "critic"
  phase: 2
  round: 1
  consensus: CONSENSUS-4 | CONSENSUS-3 | SPLIT | CRITICAL
  questions:
    - type: challenging
      target: "{対象の claim}"
      content: "{問い}"
      verification: [V3, V4, V5, V6]
  issues:
    - severity: critical | major | minor | info
      target: "{対象}"
      description: "{問題の説明}"
      suggestion: "{改善案}"
  insights: ["{検証から得られた洞察}"]
  convergence:
    agreement: true | false
    new_insights: true | false
    open_challenges: 0
    recommendation: "proceed | additional_round | escalate"
```

---

## 4. 検証プリミティブ（V1-V6）

| # | 名前 | 問い | 実行者 | 使いどころ |
|---|------|------|--------|-----------|
| **V1** | verify-reference | 参照先は実在するか？ | researcher | ファイル・URL・Issue 実在確認 |
| **V2** | verify-claim | 主張と根拠は一致するか？ | researcher | 引用・数値・事実の照合 |
| **V3** | challenge-claim | 最強の反論は何か？ | critic | Devil's Advocate |
| **V4** | detect-cherry | 都合の良い証拠だけ拾っていないか？ | critic | 確証バイアス検出 |
| **V5** | check-scope | 証拠の範囲を超えて一般化していないか？ | critic | 過度な一般化検出 |
| **V6** | check-logic | 論理の飛躍はないか？ | critic | 論理チェック |

---

## 5. メタ評価（Phase 7 CLOSE 用、任意）

### 品質次元

| 次元 | 評価観点 |
|------|---------|
| **coverage** | 調査の網羅性 |
| **depth** | 分析の深さ |
| **rigor** | 検証の厳密さ |
| **coherence** | 成果物の一貫性 |
| **efficiency** | ラウンド数・時間の妥当性 |
| **novelty** | 新規 INSIGHT の質 |

### 実行統計（techo#73）

Main は各 Phase 完了時に以下を記録し、Phase 7 で集計する:

```yaml
execution_stats:
  scale_used: "light"  # 実際に使用した規模
  phases_executed: [1, 2]
  total_agents_spawned: 3
  per_phase:
    - phase: 1
      agents: 2
      errors: 0
      rounds: 1
    - phase: 2
      agents: 1
      errors: 0
      rounds: 1
      review_mode: "single"  # or "voting"
      consensus_result: "CONSENSUS-3"
  gate_failures: 0  # handoff スキーマ検証の失敗回数
  insights_total: 5
```

この統計はセッションログに含め、ワークフロー改善の根拠とする。

---

## Gotchas

- **シンプルさファースト**: まず single / light で十分か判断する。full はコストに見合う場合のみ
- **デフォルトは Phase 1-2**: 明示指定または自動判定が standard/full でない限り、light 実行
- **ラウンド上限**: デフォルト3ラウンドで収束しない場合、問題の分割を検討
- **V1-V6 の過剰使用**: 全検証を毎回回すとコスト高。agent の判断に委ねる
- **Voting モードのコスト**: critic 2-3体分のトークンを消費する。通常タスクには不要
- **ゲート検証**: handoff スキーマ不正は1回だけリトライ。2回失敗したら Main が手動介入
- **Main の役割**: Main は orchestrator。規模判定・agent の起動・ゲート検証・結果の集約・判定・次 Phase への遷移を制御する

---

## 更新履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-04-01 | 1.5 | Building Effective Agents 知見反映: 自動ルーティング(techo#68)、handoff スキーマ検証ゲート(techo#71)、デフォルト最小構成(techo#72)、実行統計の可視化(techo#73)、単一LLM十分性判定(techo#74)、Voting パターン(techo#75) |
| 2026-03-31 | 1.4 | 4 agent + Coordinator 構成に拡張。planner / worker 追加、WRITE 権限を worker に限定 (techo#66) |
| 2026-03-30 | 1.3 | 指示書生成スキルとの連携を明文化 (techo#56) |
| 2026-03-27 | 1.2 | Agent Teams に統一。正本を project-design に移動 |
| 2026-03-27 | 1.1 | 実行可能な手順に更新。Agent 定義追加、Main の具体的手順を記述 |
| 2026-03-27 | 1.0 | 初版。cs#188 設計に基づき骨格を作成 |
