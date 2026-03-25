# コミットルール

## ブランチ戦略

| ブランチ | 役割 |
|---------|------|
| **develop** | 作業ブランチ。全編集はここ |
| **main** | 公開用。develop→main マージ = 公開。pjdhiroが判断 |

## コミットメッセージ形式

```
{type}: {summary}

{body（任意）}

Co-Authored-By: Claude <noreply@anthropic.com>
```

type: feat, fix, docs, refactor, chore 等

## push前チェック

1. `git diff --stat` で変更内容を確認
2. 自律push範囲（CLAUDE.md §自律権限 参照）は確認不要で push 可
3. それ以外は pjdhiro に確認を取ってから push
