---
description: コミット後 Codex レビューの dispatch / reply 回収を行う
---

# /codex-review

まず `.claude/skills/codex-review/SKILL.md` を読むこと。

## 想定引数

- なし: 直近 commit を review 対象にする
- `{SHA}`: 指定 commit を review する
- `--reply {threadId}`: 既存 thread の reply を回収する
- `Issue #NNN`: 関連 Issue を併記する

## 実行方針

1. review 対象 commit を確定する
2. `.claude/skills/codex-review/SKILL.md` の Step 1-6 を実行する
3. MCP が利用可能なら非同期 dispatch し、`threadId` を pending に残す
4. MCP が利用不可なら `REQ-codex-review-*` を残し、WARN で終了する
5. reply 回収時は `.cache/reviews/codex/` に正規化レポートを書く

## 注意

- review 専任。実装はしない
- commit / push は review 完了待ちで止めない
- `WARN` / `FAIL` は `.cache/inbox/REVIEW-codex-*` か Issue コメントに返す
