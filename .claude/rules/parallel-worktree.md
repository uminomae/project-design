# 並列作業ルール

## 3レーン構造

| レーン | 役割 | ブランチ |
|--------|------|---------|
| Main | 設計判断・最終統合 | develop |
| Agent-BG | バックグラウンド調査（読み取り専用） | develop |
| Agent-WT | ワークツリー編集 | wt/{slug} |

## ワークツリーライフサイクル

1. 作成: `git worktree add .claude/worktrees/{slug} -b wt/{slug}`
2. 編集・コミット（Agent-WT 内で完結）
3. Main がマージ: `git merge wt/{slug}`
4. 削除: `git worktree remove .claude/worktrees/{slug}` → `git branch -d wt/{slug}`

## ファイルオーナーシップ

| ファイル | オーナー |
|---------|---------|
| CLAUDE.md, .claude/rules/* | Main のみ |
| docs/ 構造変更 | Main のみ |
| knowledge/evidence/* | Agent-WT 可 |
| .cache/* | Main のみ |

## 重要

- Agent-WT は push しない。Main がマージ後に push する
- マージは同一ターンで: ログ確認 → merge → worktree 削除 → branch 削除
