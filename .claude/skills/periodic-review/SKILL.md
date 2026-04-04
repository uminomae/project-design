---
name: periodic-review
description: "Use when running the rebuilt scheduled Claude review across repos, replacing the old cron-commit-review stack with a smaller checklist and a single state file."
triggers: |
  「定期レビュー」「月次レビュー」「scheduled review」
  「periodic-review」「レビュー棚卸し」「運用劣化チェック」
applyTo: ".cache/, docs/, .claude/, CLAUDE.md"
agent: "CLI"
---

**ステータス**: active
# periodic-review SKILL

**参照 Issue**: techo#64
**目的**: 旧 `cron-commit-review` / `review-team` を置き換え、Claude Code が定期的に repo 群を棚卸しする。

## 0. このスキルが置き換えるもの

廃止する考え方:

- 15+ 項目の肥大化した cron チェック
- repo ごとの `.last-reviewed-*` 散在
- 専用 review-team 前提の多段構成

残す考え方:

- 重要な drift を早く見つける
- review 結果を履歴化する
- 「問題なし」ではなく「次に見るべき場所」を返す

## 1. チェックセット（簡素版）

毎回すべてを full-scan せず、以下の 6 系統に絞る。

| ID | チェック | 内容 |
|---|---|---|
| PR-1 | Git drift | 前回 review 以降の新規 commit / dirty 状態 / branch の異常 |
| PR-2 | Session hygiene | state.md HEAD ずれ、stale inbox/outbox、未処理 DONE/REVIEW |
| PR-3 | Canonical reference drift | repo が retired asset を参照していないか、pd 正本を向いているか |
| PR-4 | Quality smoke | repo 固有の軽量テスト。pd なら `static-checks.js` と必要時 `responsive-test.sh` |
| PR-5 | Review queue health | stale な Codex pending、未回収 review、close guard 漏れ |
| PR-6 | Publication staleness | evidence 更新日 > 対応 SVG/PNG/PDF 更新日の検出、旧世代 SVG 形式の検出 |

## 2. パス規約

| 用途 | パス |
|---|---|
| 実行履歴 | `.cache/reviews/periodic/REVIEW-periodic-{YYYYMMDD-HHMM}.md` |
| 状態ファイル | `.cache/reviews/periodic/periodic-review-state.json` |
| 必要なら follow-up 用 | `.cache/inbox/REVIEW-periodic-{YYYYMMDD-HHMM}.md` |

旧 `.cache/reviews/.last-reviewed-*` は使わない。状態は 1 つの JSON に集約する。

## 3. 対象 repo

デフォルトは `~/dev/*` の git repo。必要なら引数で絞る。

最低対象:

- `project-design`
- `creation-space`
- `kesson-driven-thinking`
- `pjdhiro`

必要に応じて他 repo を足してよい。

## 4. 実行手順

### Step 1: 対象を列挙する

```bash
for repo in /Users/uminomae/dev/*/; do
  [ -d "$repo/.git" ] && echo "$repo"
done
```

### Step 2: 状態ファイルを読む

`periodic-review-state.json` から前回 review 時刻と repo ごとの最終 HEAD を読む。

見るポイント:

- 前回から HEAD が進んだ repo
- 長く dirty のままの repo
- stale な review pending

### Step 3: 6 チェックを回す

#### PR-1 Git drift

- `git branch --show-current`
- `git rev-parse HEAD`
- `git status --short`

#### PR-2 Session hygiene

- `.cache/session/state.md` の HEAD と実 HEAD
- `.cache/inbox/` / `.cache/outbox/` の未処理ファイル
- stale な `DONE-*`, `REVIEW-*`, `REQ-*`

#### PR-3 Canonical reference drift

retired asset 参照を grep し、必要なら WARN:

- `cron-commit-review`
- `review-team`
- `codex-dispatch`
- `parallel-dispatch`
- `commit-review-with-log` を旧正本として参照している記述

新正本は `project-design/.claude/skills/codex-review/` と
`project-design/.claude/skills/periodic-review/` を向く。

#### PR-4 Quality smoke

repo 固有の軽量テストだけを回す。pd の基準:

```bash
node .claude/scripts/static-checks.js
bash .claude/scripts/responsive-test.sh
```

サーバー未起動など前提不足なら `SKIP` と書いてよい。

#### PR-5 Review queue health

- `.cache/reviews/codex/pending/` の stale thread
- review 必須変更なのに `REVIEW-*` 不在
- close 前提 Issue に対する review 未回収

#### PR-6 Publication staleness（techo#83）

evidence/ の変更が下流の公開物に反映されているかを検出する。

チェック項目:

1. **更新日比較**: creation-space の `evidence/evidence-D{nn}-*.md` の mtime と、対応する `assets/svg/domains/domain-D{nn}-*.svg` / `assets/png/` / PDF の mtime を比較する。evidence が新しければ WARN
2. **旧世代 SVG**: `assets/svg/` 内の SVG にインライン `font-family` が残っていれば WARN（techo#82 関連）

```bash
# evidence vs SVG の更新日比較（creation-space）
cd /Users/uminomae/dev/creation-space
for ev in evidence/evidence-D*.md; do
  domain=$(echo "$ev" | grep -oP 'D\d+')
  svg=$(ls assets/svg/domains/domain-${domain}-*.svg 2>/dev/null | head -1)
  if [ -n "$svg" ] && [ "$ev" -nt "$svg" ]; then
    echo "WARN: $ev is newer than $svg"
  fi
done

# 旧世代 SVG 検出
grep -rl 'font-family' assets/svg/domains/ 2>/dev/null
```

ルール正本: `techo/rules/rebuild-publication.md`

### Step 4: レポートを書く

フォーマット:

```markdown
# Periodic Review: YYYY-MM-DD HH:MM

## Summary
| repo | status | note |

## Findings
| severity | repo | check | detail | next step |

## Skipped
| repo | reason |

## Follow-up
- ...
```

判定は `PASS / WARN / FAIL / SKIP` を使う。

### Step 5: 状態を更新する

レポートを書いた後に `periodic-review-state.json` を更新する。

更新項目:

- 実行時刻
- repo ごとの HEAD
- 未解決 pending 数

## 5. 判定の考え方

| 判定 | 条件 |
|---|---|
| PASS | drift なし、または軽微で即解消済み |
| WARN | 後続対応が必要だが、今すぐ壊れてはいない |
| FAIL | review 不在のまま close されそう、契約ずれ、品質テスト失敗 |
| SKIP | 前提不足で実行不能。理由を明記 |

## 6. 実行方式

実行主体は Claude Code。起動トリガーは 2 択:

- ローカル scheduler（launchd 等）
- Cloud automation

スキル自体は scheduler に依存しない。どちらの入口でも同じレポート形式に揃える。

## 7. 注意

- 自動で修正しない。定期レビューは検出と記録が主
- stale だからといって即削除しない。まず所有者と次アクションを明記する
- `SKIP` を FAIL で塗りつぶさない

## 8. 更新履歴

| 日付 | バージョン | 内容 |
|---|---|---|
| 2026-03-31 | 1.0 | techo#64 に対応。旧 cron-commit-review から簡素版 periodic-review へ再設計 |
