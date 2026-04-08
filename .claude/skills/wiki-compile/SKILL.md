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
| 3a | cross-repo 概念 | ks/knowledge/, as/knowledge/, cs/evidence/ | wiki/cross-refs/*.md + 既存ページ追記 |
| 3b | cross-repo 原典解説 | cs/knowledge/raw/manifest.md + PDF | wiki/{domain}_{author}_{year}_{keyword}.md |

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

### 原典解説（Step 3b）

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

## Step 3b: 原典解説ページの compile フロー

### 入力
- 正本: `cs/knowledge/raw/manifest.md`（access_status が `raw-confirmed` かつ `local_file` が存在する行）
- 原典 PDF: `cs/knowledge/raw/{filename}.pdf`

### 自動化パイプライン

```
cs: PDF commit → manifest 更新 → push
  ↓
pd: SessionStart → wiki-gen-check.sh hook
  ↓ 未生成あり → .cache/inbox/wiki-gen-{date}.md 生成
  ↓ action: auto-execute → pjdhiro 承認不要で自動実行
  ↓
CLI: PDF をテキスト抽出（下記参照）→ wiki ページ生成 → 文字化けチェック
  ↓
自動 commit & push to develop
  ↓
GitHub Actions (wiki-publish.yml): develop push で自動 build & deploy
  ↓
GitHub Pages に公開
```

### 差分検出
- `wiki-gen-check.sh` hook（SessionStart 時に自動実行）
- manifest の raw-confirmed 行と `wiki/{stem}.md` の存在を突き合わせ
- 未生成があれば `.cache/inbox/wiki-gen-{date}.md` に依頼を書き出す（warn ではなく action）

### ファイル命名
- 原則: `wiki/{stem}.md`（stem = PDF ファイル名から拡張子を除いたもの）
- ドメイン不一致時: manifest の domain_id が local_file の接頭辞と異なる場合、domain_id で置換
  - 例: D08-S08 の local_file が `D14_varela_...pdf` → `wiki/D08_varela_...md`
- part 分割 PDF: 1つの wiki ページにまとめる。ファイル名から `_part1` を除去
  - 例: `D24_suzuki_1935_manual-of-zen-buddhism_part1.pdf` → `wiki/D24_suzuki_1935_manual-of-zen-buddhism.md`

### 本文構造

```markdown
# {原典タイトル}

## 概要
{原典の概要 3-5文。PDF の内容に基づく}

## 主要概念
{原典が提唱・検証する主要概念の解説}

## プロジェクトデザインとの関連
{PD の文脈での位置づけ}

## 書誌情報
- 著者: {author}
- 年: {year}
- 出典: {journal/publisher}
- access_status: raw-confirmed
```

### 設計原則（暫定）
1. **原典の内容が解説されていること** — 最優先
2. **原典への参照があること** — source traceability
3. **主な読者は LLM** — 構造化・明確さ重視

### OCR フロー（スキャン画像 PDF 向け）

`pdftotext` でテキストを抽出できないスキャン画像 PDF は以下のフローで処理する:

```
スキャン画像 PDF
  ↓ pdftoppm で PNG/JPEG に変換（dpi はファイルサイズに応じて調整）
  ↓ Claude Read ツールでページ画像を読み取り（OCR）
  ↓ OCR テキストを中間ファイルに保存: cs/knowledge/raw/ocr/{source_id}_{author}_{year}.md
  ↓ 中間ファイルを入力として wiki 解説ページを生成/再生成
```

**dpi 選択の目安:**
| PDF サイズ | 推奨 dpi | 形式 | 備考 |
|-----------|---------|------|------|
| ~10MB | 300 | PNG | Feynman 等の論文 |
| 10-50MB | 200 | PNG | Alexander 等の書籍 |
| 50MB+ | 100 | JPEG | Suzuki, 世阿弥 等の大型スキャン |

**サンプリング戦略:** 大容量 PDF は全ページ OCR せず、代表ページ（表紙、目次、序文、主要章の冒頭）を選択的に読み取る。front matter に `ocr_verified: true` を付与し、サンプリング方式の場合は書誌情報にその旨を記載する。

**中間ファイルの構造:**
```markdown
# OCR: {著者} ({年}) {タイトル}
- source_id: {D??-S??}
- method: Claude Vision (pdftoppm {dpi}dpi {format} → Claude Read)
- date: {YYYY-MM-DD}
- pages: {total} (sampled: pp.{range})
## Structure
{目次・構成}
## Key Content Summary (from OCR)
{セクション別の内容要約}
```

### 生成後チェック
- `grep -rl '�' wiki/ --include='*.md'` で UTF-8 文字化けチェック
- wiki-lint WL-5 で source パスの実在確認

## wikilink 変換ルール

- canonical-keywords.md から用語辞書を構築
- wiki/ 内の既存ページ名も辞書に追加
- 各ページ内で同一語は初出のみ [[リンク]] 化
- 辞書ベースの正規表現で機械的に変換（LLM ではなく後処理）
- 冪等性: 既に [[]] で囲まれた語はスキップ

## agent-team-workflow との連携

- Step 1: single（Main 単独実行）
- Step 2: light（researcher で差分検出 + worker で compile）
- Step 3a: standard（cross-repo 調査が必要）
- Step 3b: parallel workers（PDF バッチを分割し、4-5 agent で並列生成）
