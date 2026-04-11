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
| 3b | cross-repo 原典解説 | cs/knowledge/raw/manifest.md + PDF | wiki/sources/{domain}_{author}_{year}_{keyword}.md |
| 3c | awareness-model 原典 | pd/knowledge/evidence/awareness-model/*.md | wiki/sources/{Author}_{year}_{keyword}.md |

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
- 原則: `wiki/sources/{stem}.md`（stem = PDF ファイル名から拡張子を除いたもの）
- ドメイン不一致時: manifest の domain_id が local_file の接頭辞と異なる場合、domain_id で置換
  - 例: D08-S08 の local_file が `D14_varela_...pdf` → `wiki/sources/D08_varela_...md`
- part 分割 PDF: 1つの wiki ページにまとめる。ファイル名から `_part1` を除去
  - 例: `D24_suzuki_1935_manual-of-zen-buddhism_part1.pdf` → `wiki/sources/D24_suzuki_1935_manual-of-zen-buddhism.md`
- awareness-model 原典: `wiki/sources/{Author}_{year}_{keyword}.md`
  - 例: `wiki/sources/Craig_2002_interoception.md`

### 本文構造

```markdown
# {原典タイトル}

## 概要
{原典の概要 3-5文。PDF の内容に基づく}

## 主要概念
{原典が提唱・検証する主要概念の解説}

## 関連（任意）
{以下のキーワードとの実質的な接続がある場合のみ記述。比喩的類推は不可。}
{- 意識（awareness-space: 4層モデル、内受容感覚、予測符号化）}
{- 創造（creation-space: 創造の5段階モデル、場→波→縁→渦→束）}
{- 欠損駆動思考（kesson-space: 欠損、抱持、情動の構成）}
{- 信頼・価値（project-design: 信頼の定義仮説、価値論）— 今後拡充}
{接続がなければこのセクション自体を省略する。}

## 書誌情報
- 著者: {author}
- 年: {year}
- 出典: {journal/publisher}
- access_status: raw-confirmed
- **DOI**: [{doi}](https://doi.org/{doi})           ← manifest notes に DOI があれば
- **オープンアクセス**: [PDF]({oa_url})              ← manifest notes に OA URL があれば
- **全文**: [{source_name}]({url})                   ← 書籍の場合、archive.org 等の安定URL
- **公式URL**: [{org_name}]({url})                   ← 公的文書の場合
- **ISBN**: {isbn}                                   ← 書籍で DOI がない場合
```

### DOI/URL 追加ルール

wiki ソースページ生成時、manifest の notes 列から DOI / OA URL を抽出し、書誌情報に含める。

**優先順位**:
1. **DOI** — 論文であれば最優先。`DOI: 10.xxxx` の形式で manifest notes に記載されている場合
2. **OA URL** — `OA: https://...` の形式で manifest notes に記載されている場合
3. **安定 URL** — archive.org, Wikimedia Commons, NDL, 著者ページ等。manifest notes のキーワードから推定
4. **公式 URL** — ICH, MAFF, CBD 等の公的文書
5. **ISBN** — 書籍で上記がない場合

**DOI の取得元**:
- manifest notes に明示されている DOI
- 論文の場合: 著者名・年・雑誌名・巻号から既知の DOI（主要ジャーナルの DOI パターンは安定）
- DOI が不明な場合は空欄のまま生成し、後で追加する

**フォーマット**:
- DOI: `- **DOI**: [10.xxxx](https://doi.org/10.xxxx)`
- OA: `- **オープンアクセス**: [PDF](https://...)`
- 全文: `- **全文**: [Internet Archive](https://archive.org/...)`
- 公式: `- **公式URL**: [機関名](https://...)`
- ISBN: `- **ISBN**: 978-x-xxx-xxxxx-x`

**DOI なしの正当なケース**（無理に追加しない）:
- JETP 等のソ連時代の雑誌（標準 DOI なし）
- 書籍の章（Eldredge-Gould 1972 等）
- Hilgardia 等の廃刊誌
- 複数文献のまとめページ（intersubjectivity 系）

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

## wiki 更新ルール

### 更新トリガー表

| トリガー | アクション | 方法 |
|---------|-----------|------|
| wiki/*.md 追加・編集 | index.md 再生成 | PostToolUse hook → `generate-wiki-index.mjs` |
| wiki/*.md 追加・編集 | content/ wikilink 再処理 | PostToolUse hook → `compile-content-links.mjs`（既存） |
| wiki/*.md 追加・編集 | Quartz ビルド | PostToolUse hook → `wiki-build.sh`（既存） |
| knowledge/ 正本更新 | wiki ページ再コンパイル | 手動 `/wiki-compile`。WL-3 で stale 検知 |
| cs manifest 更新 | wiki/sources/ 生成依頼 | SessionStart → `wiki-gen-check.sh`（既存） |

### index.md 自動生成

**スクリプト**: `scripts/generate-wiki-index.mjs`

wiki/ の全ページ front matter を読み取り、index.md を自動生成する。
`content-compile.sh` hook (PostToolUse) 内で実行される。
wiki/index.md 自体の変更では再帰防止のためスキップ。

**セクション構成**:

| セクション | データソース | ソート |
|-----------|-------------|-------|
| Concepts | wiki/concepts/*.md | ファイル名順 |
| Entities | wiki/entities/*.md | ファイル名順 |
| Sources (awareness-model) | wiki/sources/ で D\d{2}_ 以外 | tags の §分類でグループ化 |
| Sources (D01-D30) | wiki/sources/D\d{2}_*.md | ドメイン番号順 |
| Cross References | wiki/cross-refs/*.md | ファイル名順 |
| Health | wiki/health/*.md | ファイル名順 |
| Concepts 一覧 | concepts の status, compiled, review_state | ファイル名順 |
| 最近 compile されたページ | 全カテゴリの compiled 日 | 降順、上位20件 |
