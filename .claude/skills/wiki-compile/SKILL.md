---
name: wiki-compile
description: |
  knowledge/ の正本から wiki/ の compiled view を生成する。
  Step 1-3 の段階に対応し、ソースの traceability を front matter で保持する。
---

# wiki-compile スキル

## 概要

各リポの knowledge/evidence から pd/wiki/ に compiled view を生成する。

## 処理フロー

1. ソース探索: 対象ディレクトリのファイルを列挙
2. 差分検出: source の mtime vs wiki page の compiled 日を比較
3. compile 実行:
   a. ソースを読み、内容を整理・構造化（LLM）
   b. front matter 生成（source パス、status、compiled 日）
   c. wikilink 後処理: canonical-keywords.md 辞書で初出のみ [[]] 挿入（正規表現、冪等）
4. log.md に実行記録を追記

## Step 別スコープ

| Step | スコープ | 入力 | 出力 |
|------|---------|------|------|
| 1 | 同一ディレクトリ内 | pd/knowledge/concepts/CN-*.md | wiki/concepts/*.md |
| 2 | 同一リポ cross-directory | pd/knowledge/{concepts,research,meta}/* | wiki/{concepts,entities,cross-refs}/*.md |
| 3 | cross-repo (別Issue) | ks/knowledge/, as/knowledge/, cs/evidence/ | wiki/cross-refs/*.md + 既存ページ追記 |

## Front matter スキーマ

### concepts/

```yaml
title: "概念名"
aliases: ["英語名", "略称"]
source:
  - repo: "project-design"
    path: "knowledge/concepts/CN-XXX.md"
compiled: "YYYY-MM-DD"
tags: [concept, ...]
status: 探索的 | 暫定 | 正典
review_state: 未レビュー
```

### entities/

```yaml
title, aliases, source[], compiled, tags, related_concepts[]
```

## wikilink 変換ルール

- canonical-keywords.md から用語辞書を構築
- wiki/ 内の既存ページ名も辞書に追加
- 各ページ内で同一語は初出のみ [[リンク]] 化
- 辞書ベースの正規表現で機械的に変換（LLM ではなく後処理）
- 冪等性: 既に [[]] で囲まれた語はスキップ

## agent-team-workflow との連携

- Step 1: single（Main 単独実行）
- Step 2: light（researcher で差分検出 + worker で compile）
- Step 3: standard（cross-repo 調査が必要）
