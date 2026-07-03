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

## commit 前品質ループ（必須）

**実質的な成果物編集は「調査 → 仮案 → レビュー → テスト → 修正」を経てから commit する。**
対話の勢いで「編集 → 即 commit → 即公開」に流れることを禁止する（2026-07-03 pjdhiro 承認）。

対象: knowledge/・wiki/・docs/・公開 HTML/CSS/JS・READER 等の成果物。
対象外: state.md / セッションログ / inbox 整理などの運用ファイル、typo 等の軽微修正。

1. **レビュー**: commit 前に team-critic（agent-team-workflow の REVIEW、V3-V6）で仮案を検証する。
   軽微な変更でも最低限 Main 自身による V3（反例探索）を明示的に行い、結果を残す
2. **テスト**: 該当するテストを実行する（pd なら `static-checks.js`、UI 変更なら `responsive-test.sh`、
   wiki なら UTF-8 文字化けチェック）
3. **修正**: レビュー/テストの指摘を反映するか、解決しない論点は保持論点として明記する
4. 上記を経ていない成果物 commit は作らない

## push前チェック

1. `git diff --stat` で変更内容を確認
2. commit 前品質ループ（上記）を経ているか確認
3. 自律push範囲（CLAUDE.md §自律権限 参照）は確認不要で push 可
4. それ以外は pjdhiro に確認を取ってから push
