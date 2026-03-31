# AGENTS.md — Codex エージェント向けガイド

**正本は `CLAUDE.md`。** 本ファイルは OpenAI Codex 等の外部エージェントが読む際の入口。

## 基本方針

すべてのルール・権限・運用手順は `CLAUDE.md` に定義されている。
本ファイルと `CLAUDE.md` が矛盾した場合は **`CLAUDE.md` を優先**する。

## 参照先

| 内容 | ファイル |
|------|---------|
| プロジェクト概要・絶対原則・委任レベル | `CLAUDE.md` |
| タスク別参照ガイド | `.claude/rules/docs-navigator.md` |
| Git 規約 | `.claude/rules/commit-rules.md` |
| セッション管理 | `.claude/rules/session-management.md` |

## Codex 固有の差分

- Co-Authored-By: `Co-Authored-By: Codex <noreply@openai.com>`
- 非対話実行のため、pjdhiro 承認が必要な操作は実行せず outbox に報告を残すこと
