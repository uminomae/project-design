---
description: 簡素化された定期 Claude レビューを実行する
---

# /periodic-review

まず `.claude/skills/periodic-review/SKILL.md` を読むこと。

## 想定引数

- なし: `~/dev/*` の既定 repo 群を対象にする
- `project-design creation-space ...`: 対象 repo を限定する

## 実行方針

1. 対象 repo を列挙する
2. `.cache/reviews/periodic/periodic-review-state.json` を読む
3. `PR-1` から `PR-5` の簡素版チェックを回す
4. `.cache/reviews/periodic/REVIEW-periodic-*.md` を出力する
5. 必要なら `.cache/inbox/REVIEW-periodic-*.md` へ follow-up を返す

## 注意

- 定期レビューは検出と記録が主で、自動修正はしない
- `SKIP` は理由を明記する
- retired asset 参照を見つけた場合は pd 正本への置き換えを提案する
