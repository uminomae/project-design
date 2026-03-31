---
name: codex-review
description: "Use when launching or receiving an asynchronous Codex post-commit review via MCP, with normalized review history under .cache/reviews/codex."
triggers: |
  「Codexレビュー」「コミット後レビュー」「post-commit review」
  「adversarial review」「threadId で結果を取りたい」「codex-review」
applyTo: ".cache/inbox/, .cache/outbox/, .cache/reviews/, .claude/commands/"
agent: "CLI"
---

**ステータス**: active
# codex-review SKILL

**参照 Issue**: techo#64
**目的**: Claude Code のコミット直後に、Codex へ非同期レビューを投げ、結果を正規化して履歴化する。

## 0. 基本方針

- **commit をブロックしない**: レビューは非同期。commit / push の成否とは分離する
- **設計判断まで踏み込む**: syntax check ではなく、隠れた前提・設計判断・副作用を拾う
- **結果は正規化して残す**: raw reply のまま終わらせず、PASS / WARN / FAIL の共通フォーマットに落とす
- **MCP 不可時は degrade**: `mcp__codex__codex` が使えない環境では REQ 記録を残して WARN 扱いにする

## 1. パス規約

| 用途 | パス |
|---|---|
| 送信記録 | `.cache/outbox/REQ-codex-review-{repo}-{shortsha}-{YYYYMMDD-HHMM}.md` |
| pending 記録 | `.cache/reviews/codex/pending/{repo}-{shortsha}-{threadId}.md` |
| 正規化済みレビュー履歴 | `.cache/reviews/codex/{YYYY-MM}/REVIEW-codex-{repo}-{shortsha}-{YYYYMMDD-HHMM}.md` |
| 実装側への返却が必要な所見 | `.cache/inbox/REVIEW-codex-{repo}-{shortsha}-{YYYYMMDD-HHMM}.md` |

`REVIEW-*` は「人間または親セッションが次に読む成果物」、`.cache/reviews/codex/` は「履歴の正本」として使い分ける。

## 2. 起動条件

以下のいずれかに当てはまる commit では優先的に使う。

- ファイル移動・削除・リネームを含む
- path 変更で参照切れリスクがある
- cross-repo 参照を更新する
- workflow / rules / skills / hooks を変更する
- UI 導線と docs 契約を同時に変更する

軽微な docs 修正などでは任意。

## 3. 入力

最低限、以下を揃える。

- repo 名
- branch 名
- commit SHA
- 関連 Issue 番号（あれば）
- 変更ファイル一覧
- review 観点
  - 参照切れ
  - hidden assumption
  - 設計判断の飛躍
  - cross-repo 影響

パス変更を含む場合は、必要に応じて `commit-review-with-log` 相当の影響走査を先に行い、その要約を添える。

## 4. 実行手順

### Step 1: 送信前の文脈を固める

以下を確認する。

```bash
git branch --show-current
git show --stat --name-status --format=fuller {SHA}
```

REQ ファイルには少なくとも次を記録する。

- commit の対象
- 変更ファイル
- 関連 Issue
- 「何を心配している review か」

### Step 2: review brief を作る

Codex への依頼には以下を含める。

- 対象 commit
- 変更要約
- repo 文脈の最小説明
- PASS / WARN / FAIL で返すこと
- 指摘は `file:line` または具体パス付きにすること
- 「実装はしない。レビューのみ」の制約

観点は 4 本柱に絞る。

1. 参照切れ / 契約不整合
2. cross-repo 影響
3. hidden assumption / adversarial review
4. close してよいかどうか

### Step 3: 非同期 dispatch

MCP が使える場合:

1. `mcp__codex__codex` で review を送る
2. 返ってきた `threadId` を pending 記録に保存する
3. commit / push はそのまま進める

MCP が使えない場合:

1. `REQ-codex-review-*` を残す
2. 「dispatch 未実行・後で手動回収が必要」と明記する
3. review 未実行を理由に commit 自体は止めない

### Step 4: reply 回収

任意のタイミングで `threadId` を使って reply を回収する。

- reply が未完了なら pending を維持
- reply 完了なら raw 内容を読み、PASS / WARN / FAIL に正規化
- 指摘が actionable なら `.cache/inbox/REVIEW-codex-*` に返す

### Step 5: 正規化レポート作成

履歴の正本は `.cache/reviews/codex/{YYYY-MM}/` に置く。

フォーマット:

```markdown
# Codex Review: {repo} {shortsha}

- date: YYYY-MM-DD HH:MM
- branch: {branch}
- issue: #{number or none}
- threadId: {threadId or unavailable}
- disposition: PASS / WARN / FAIL

## Findings
| severity | file | summary | action |

## Hidden assumptions
- ...

## Cross-repo impact
- ...

## Next step
- ...
```

### Step 6: disposition

| 判定 | 意味 | 次アクション |
|---|---|---|
| PASS | 重大所見なし | 履歴化して終了 |
| WARN | 追補修正 or follow-up が必要 | Issue コメント or inbox 返却 |
| FAIL | close 禁止級の問題 | 即 follow-up、必要なら修正 task 起動 |

`WARN` / `FAIL` では「誰が次に動くか」を必ず書く。

## 5. failure handling

| 状況 | 対応 |
|---|---|
| MCP ツールがない | REQ 記録を残して WARN。後で手動 dispatch |
| threadId はあるが reply が返らない | pending を維持。periodic-review で再点検 |
| 指摘が曖昧 | `.cache/inbox/REVIEW-codex-*` に「要二次確認」で返す |
| review 結果と実装現状がずれた | stale と明記し、対象 SHA を再確認して再投入 |

## 6. 連携

- `codex-worker-instruction`: review worker の納品形を揃える
- `periodic-review`: stale な pending / 未回収 thread を棚卸しする
- `agent-team-workflow`: 実装後 REVIEW フェーズの外部レビューとして使える

## 7. 実運用メモ

- `threadId` を会話の記憶に頼らずファイルへ残す
- review は raw reply ではなく正規化レポートを読む
- close 前に review が必要な変更か再判定する

## 8. 更新履歴

| 日付 | バージョン | 内容 |
|---|---|---|
| 2026-03-31 | 1.0 | techo#64 に対応。MCP 非同期 Codex review の正本を project-design に新設 |
