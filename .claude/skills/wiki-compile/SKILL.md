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
pjdhiro が develop → main マージ（公開判定は pjdhiro 専権）
  ↓
GitHub Actions (wiki-publish.yml, branches:[main]): 自動 build & deploy
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

> **高校生向けのやさしい解説**
>
> {専門用語を避け、高校生が読んで「なるほど」と思える平易な日本語で概要を書く。2-4文。身近な例やたとえを1つ入れる。}

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

### 高校生向け解説ルール（全ページ型共通）

全 wiki ページ（concepts/, entities/, sources/, cross-refs/）の `# タイトル` 直後、最初の `## ` セクションの前に、blockquote 形式で「高校生向けのやさしい解説」を配置する。

**形式**:
```markdown
# {タイトル}

> **高校生向けのやさしい解説**
>
> {解説テキスト}

## 概要
...
```

**執筆ガイドライン**:
- **分量**: 2-4文（80-160字程度）
- **語彙**: 専門用語を使わない。使う場合は直後にかみ砕いた説明を添える
- **具体性**: 身近な例・たとえ・日常の場面を1つ以上入れる
- **トーン**: 教科書調ではなく、語りかける調子。「〜かもしれません」「〜ですよね」等は自然に使ってよい
- **正確性**: やさしくしても内容を歪めない。概念の核心を捉えた要約にする
- **wikilink**: 高校生向け解説の中では [[]] を使わない（平文のまま）
- **対象外ページ**: index.md, log.md, health/ レポートには付けない

**ページ型ごとの焦点**:
| ページ型 | 解説の焦点 |
|---------|-----------|
| concepts/ | 「この考え方が何の役に立つか」を伝える |
| entities/ | 「この人（理論）は何を言っているのか」を伝える |
| sources/ | 「この論文（本）は何を明らかにしたのか」を伝える |
| cross-refs/ | 「ここでは何と何のつながりを見ているか」を伝える |

### 設計原則（暫定）
1. **原典の内容が解説されていること** — 最優先
2. **原典への参照があること** — source traceability
3. **主な読者は LLM** — 構造化・明確さ重視
4. **用語の定義は必ず文献で確認する** — 下記「定義の文献確認ルール」参照

### 定義の文献確認ルール（必須）

wiki ページで扱う概念・用語は、**訓練知識からの合成ではなく必ず一次文献または信頼できる二次文献（SEP, Britannica, 査読論文, 原典）で定義を確認してから記述する**。

**背景**: 2026-04-15 のレビューで、LLM が「間主観性」を訓練知識から合成して書いた結果、Trevarthen の一次的間主観性（実質は情動伝染）を間主観性ページに混入させる誤りが発生した。定義を調べずに書くと、概念の境界が曖昧になり、異なる層の現象が同じページに混ざる。これは wiki の中核責務（概念の正確な整理）を損なう。

**手順**:
1. **定義の一次ソース確認** — 概念ごとに以下の順序で確認する:
   - (a) 概念を提唱した人物の原典（著作・論文）の該当箇所
   - (b) Stanford Encyclopedia of Philosophy (plato.stanford.edu) — 哲学概念
   - (c) Britannica / Cambridge dictionary — 一般概念
   - (d) 査読論文のレビュー・メタ分析 — 経験科学概念
2. **境界の確認** — 類似概念との区別を文献で確認する。例: 間主観性 vs 情動伝染 vs 共感 vs 調律 はすべて異なる概念であり、文献上で境界が定義されている
3. **定義の引用** — wiki ページに定義を書く際は、出典を明示する。可能なら短い直接引用（原語＋訳）を含める
4. **不明なら書かない** — 文献で定義が確認できない主張は wiki に書かない。調べてから書く。「たぶんこういう意味」で書いてはならない

**禁止事項**:
- 訓練知識の合成だけで概念定義を書くこと
- 複数の異なる概念を、同一ページ内で定義の区別なく並べること
- 「〜と言われている」「〜として知られる」のような出典の曖昧な記述を定義として使うこと

**例外**: pjdhiro 独自の概念・仮説（アウェアネスモデル核心仮説など）は文献にないため例外。ただしその場合は「pjdhiro 独自」と明示する

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
- **crosslink**: `node scripts/wiki-crosslink.mjs --source wiki/sources/{新ページ}.md` を実行し、本文中で言及された concept/entity/cross-refs ページの `## 関連原典` セクションに逆向き参照を自動追記。`--dry-run` / `--all` オプションあり。冪等なので再実行しても重複追記されない。現環境では Quartz ローカルビルドが Node 25/4.5.2 非互換で OOM するため、スクリプトはデフォルトで build をスキップする。公開確認は GitHub Pages に任せる（wiki-publish SKILL 参照）

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
| wiki/sources/*.md 追加 | concept/entity/cross-refs に逆向き参照 | 手動 `node scripts/wiki-crosslink.mjs --source <path>`（Step 3b 生成後に実行） |
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
