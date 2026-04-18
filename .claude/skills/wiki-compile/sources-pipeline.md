# Step 3b: 原典解説ページの compile フロー

wiki-compile の Step 3b（PDF → wiki/sources/ 生成）に関する詳細。
入力・自動化・命名・本文構造・DOI/URL・OCR・生成後処理をまとめる。

関連ドキュメント:
- 概要と Step スコープ: `SKILL.md`
- 執筆ルール（設計原則、概念/運用分離、定義の文献確認、高校生向け解説）: `writing-rules.md`
- Front matter スキーマ: `schemas.md`

## 入力
- 正本: `cs/knowledge/raw/manifest.md`（access_status が `raw-confirmed` かつ `local_file` が存在する行）
- 原典 PDF: `cs/knowledge/raw/{filename}.pdf`

## 自動化パイプライン

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
pjdhiro が develop → main マージ(公開判定は pjdhiro 専権)
  ↓
GitHub Actions (wiki-publish.yml, branches:[main]): 自動 build & deploy
  ↓
GitHub Pages に公開
```

## 差分検出
- `wiki-gen-check.sh` hook（SessionStart 時に自動実行）
- manifest の raw-confirmed 行と `wiki/{stem}.md` の存在を突き合わせ
- 未生成があれば `.cache/inbox/wiki-gen-{date}.md` に依頼を書き出す（warn ではなく action）

## ファイル命名
- 原則: `wiki/sources/{stem}.md`（stem = PDF ファイル名から拡張子を除いたもの）
- ドメイン不一致時: manifest の domain_id が local_file の接頭辞と異なる場合、domain_id で置換
  - 例: D08-S08 の local_file が `D14_varela_...pdf` → `wiki/sources/D08_varela_...md`
- part 分割 PDF: 1つの wiki ページにまとめる。ファイル名から `_part1` を除去
  - 例: `D24_suzuki_1935_manual-of-zen-buddhism_part1.pdf` → `wiki/sources/D24_suzuki_1935_manual-of-zen-buddhism.md`
- awareness-model 原典: `wiki/sources/{Author}_{year}_{keyword}.md`
  - 例: `wiki/sources/Craig_2002_interoception.md`

## 本文構造

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

高校生向け解説の執筆ガイドラインは `writing-rules.md` を参照。

## DOI/URL 追加ルール

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

## OCR フロー（スキャン画像 PDF 向け）

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

## 生成後チェック
- `grep -rl '�' wiki/ --include='*.md'` で UTF-8 文字化けチェック
- wiki-lint WL-5 で source パスの実在確認
- **crosslink**: `node scripts/wiki-crosslink.mjs --source wiki/sources/{新ページ}.md` を実行し、本文中で言及された concept/entity/cross-refs ページの `## 関連原典` セクションに逆向き参照を自動追記。`--dry-run` / `--all` オプションあり。冪等なので再実行しても重複追記されない。現環境では Quartz ローカルビルドが Node 25/4.5.2 非互換で OOM するため、スクリプトはデフォルトで build をスキップする。公開確認は GitHub Pages に任せる（wiki-publish SKILL 参照）
- **cross-check (cs wiki 矛盾検査)** (pd#82): `node scripts/wiki-cross-check.mjs --source wiki/sources/{新ページ}.md` を実行し、cs 対応ページ（`cs/knowledge/source-notes/D{NN}/D{NN}-S{##}_*.md`）との内容矛盾を検査する。対応ペアを `wiki-conflict-candidates-{date}.md` に書き出し、CLI が読んで判定する。cs 未生成ならスキップ。矛盾検知時は `.cache/inbox/wiki-conflict-{date}.md` に起票し、pjdhiro 判断を仰ぐ

### 矛盾検査の対象項目

以下を「矛盾あり」と判定する:

| 種別 | 例 |
|---|---|
| 事実誤認 | 発表年・著者・ジャーナル名が異なる |
| 主要概念のズレ | 原典が主張している核心概念の解釈が互いに矛盾 |
| 結論の逆転 | 一方が「Xは成立する」、他方が「Xは成立しない」 |
| 引用関係の誤り | 参照している定理・原典が食い違う |

許容するもの（矛盾としない）:
- 強調点の違い（同じ原典でも切り口が異なるのは自然）
- 高校生向け解説のたとえの違い
- 関連セクションで挙げる概念の違い

### 対応付けロジック

- 正本: `cs/knowledge/raw/manifest.md`
- cs 側: `source_id`（D{NN}-S{##}）でファイル特定 → `knowledge/source-notes/D{NN}/{source_id}_*.md`
- pd 側: `domain_id` + `author` + `year` でファイル特定 → `wiki/sources/D{NN}_{author}_{year}_*.md`
- 両者が存在するペアのみ比較対象
- 一方のみ存在: WARN 記録のみ（cs 未生成なら生成後に再実行）
