# Front matter スキーマ / wikilink / index.md

wiki/ 配下ページの front matter スキーマ、wikilink 変換ルール、index.md 自動生成仕様。

関連ドキュメント:
- 概要と Step スコープ: `SKILL.md`
- 執筆ルール: `writing-rules.md`
- Step 3b 本文構造テンプレート: `sources-pipeline.md`

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

### keywords/

```yaml
title, aliases, source[], compiled, tags, related_concepts[]
```

### sources/ (原典解説 Step 3b)

```yaml
title: "原典タイトル"
description: "原典の要約 1-2文"
aliases: ["英語タイトル"]
tags: ["{domain_id}", "原典解説"]
source:
  repo: "creation-space"
  path: "knowledge/raw/{filename}.pdf"
  manifest_id: "{source_id}"
compiled: "YYYY-MM-DD"
```

## wikilink 変換ルール

- canonical-keywords.md から用語辞書を構築
- wiki/ 内の既存ページ名も辞書に追加
- 各ページ内で同一語は初出のみ [[リンク]] 化
- 辞書ベースの正規表現で機械的に変換（LLM ではなく後処理）
- 冪等性: 既に [[]] で囲まれた語はスキップ

## index.md 自動生成

**スクリプト**: `scripts/generate-wiki-index.mjs`

wiki/ の全ページ front matter を読み取り、index.md を自動生成する。
`content-compile.sh` hook (PostToolUse) 内で実行される。
wiki/index.md 自体の変更では再帰防止のためスキップ。

**セクション構成**:

| セクション | データソース | ソート |
|-----------|-------------|-------|
| Concepts | wiki/concepts/*.md | ファイル名順 |
| Keywords | wiki/keywords/*.md | ファイル名順 |
| Sources (awareness-model) | wiki/sources/ で D\d{2}_ 以外 | tags の §分類でグループ化 |
| Sources (D01-D30) | wiki/sources/D\d{2}_*.md | ドメイン番号順 |
| Cross References | wiki/cross-refs/*.md | ファイル名順 |
| Health | wiki/health/*.md | ファイル名順 |
| Concepts 一覧 | concepts の status, compiled, review_state | ファイル名順 |
| 最近 compile されたページ | 全カテゴリの compiled 日 | 降順、上位20件 |
