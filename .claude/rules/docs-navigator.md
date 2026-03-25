# docs/ ナビゲータ — タスク種別に応じた参照ガイド

CLI は docs/ を自動読み込みしない。以下の対応表に従い、タスクに関連するファイルを `Read` で読むこと。

## タスク種別 → 参照すべきファイル

| タスク | 必読ファイル | 理由 |
|--------|-------------|------|
| プロジェクト全体の状況把握 | `docs/README.md` | エントリーポイント |
| プロジェクト方針の確認 | `docs/PROJECT.md` | プロジェクト憲章 |
| commit・push | `.claude/rules/commit-rules.md` | Git 規約 |
| セッション管理 | `.claude/rules/session-management.md` | セッション手順 |

## 読み方の原則

- **全文読みは避ける**: 大きなファイルはセクション指定で読む
- **CLAUDE.md が常に優先**: docs/ と CLAUDE.md が矛盾したら CLAUDE.md に従う
