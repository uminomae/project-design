---
name: wiki-lint
description: |
  wiki の健全性チェック。CN divergence 検出、用語統一、鮮度、孤立ページ、source 実在確認。
  wiki compile とは独立した責務。periodic-review と連携。
---

# wiki-lint スキル

## 概要

wiki/ 内のページが正本 (knowledge/) と一貫していること、用語が統一されていること、
全ページがリンクグラフで結ばれていることを検証する。
compile スキルとは異なり、ページの生成は行わない。検出とレポートのみ。

## チェックセット

| ID | チェック | 入力 | 出力 |
|----|---------|------|------|
| WL-1 | CN divergence 検出 | terminology-changelog.md + 全リポ knowledge/ | health/cn-divergence-report.md |
| WL-2 | 用語統一チェック | canonical-keywords.md + wiki/**/*.md | WL-1 に統合 |
| WL-3 | 鮮度チェック | wiki の compiled 日 vs source の git log 最終変更日 | health/freshness-report.md |
| WL-4 | 孤立ページ検出 | wiki/ 内の wikilink グラフ解析 | health/orphan-report.md |
| WL-5 | source パス実在確認 | front matter source[] のパスが存在するか | WL-3 に統合 |

## 各チェックの詳細

### WL-1: CN divergence 検出

1. `knowledge/meta/terminology-changelog.md` から旧用語リスト (禁止語) を抽出
2. `canonical-keywords.md` の禁止・非推奨用語テーブルも参照
3. 全リポの `knowledge/` を検索し、旧用語が残存していないか確認
4. wiki/ 内の全ページも同時チェック
5. 一般動詞用法（「保持する」等）と概念名用法を区別して報告

### WL-2: 用語統一チェック

1. `canonical-keywords.md` の日本語・英語ペアを辞書として読み込み
2. wiki/ 内の全ページを走査し、辞書にある用語が正しい表記で使われているか確認
3. 結果は WL-1 の cn-divergence-report.md に統合

### WL-3: 鮮度チェック

1. wiki/ 内の全ページの front matter `compiled` 日を抽出
2. 各ページの `source[]` パスの `git log -1 --format=%ai` を取得
3. compiled 日 < source 最終変更日 の場合、stale として報告
4. source パスが存在しない場合は WL-5 として同時報告

### WL-4: 孤立ページ検出

1. wiki/ 内の全 `*.md` ファイルを列挙
2. 各ファイル内の `[[...]]` wikilink を抽出してリンクグラフを構築
3. index.md からの到達性を検証
4. どのページからもリンクされていない孤立ページを報告

### WL-5: source パス実在確認

1. wiki/ 内の全ページの front matter `source` を抽出
2. `repo` フィールドに応じてベースパスを解決:
   - `project-design` → `~/dev/project-design/`
   - `creation-space` → `~/dev/creation-space/`（原典解説ページ）
   - `kesson-driven-thinking` → `~/dev/kesson-driven-thinking/`
3. 各 source のパスがファイルシステム上に存在するか確認
4. `manifest_id` がある場合、cs/knowledge/raw/manifest.md にその source_id が存在するか確認
5. 結果は WL-3 の freshness-report.md に統合

## 実行方法

### 自動実行（PostToolUse hook）

`scripts/wiki-lint.mjs` が `.claude/hooks/content-compile.sh` から自動呼び出しされる:

- トリガー: wiki/ への Edit/Write（`wiki/health/` 自体の編集は除外して無限ループ防止）
- Debounce: 60 秒。連続編集では最初の 1 回のみ実行
- 対象チェック:
  - WL-4 孤立ページ検出（full re-derivation）
  - WL-3 freshness-report の `checked:` 日付更新のみ（cross-repo source tracking は手動対象）
- 失敗時は stderr にメッセージを出すだけでセッションを止めない
- Debounce 状態: `/tmp/pd-wiki-lint-last`

### 手動実行

セッション内で `/wiki-lint` または手動で各チェックを実行。

```bash
node scripts/wiki-lint.mjs       # orphan + freshness (date only)
```

WL-1 CN divergence / WL-5 source パス実在は現状手動:

```bash
# 手動実行の場合の参考コマンド
cd /Users/uminomae/dev/project-design

# WL-1/WL-2: 旧用語検索
grep -ri "Withhold" knowledge/ wiki/
grep -ri "F軸\|O軸" knowledge/ wiki/

# WL-3: 鮮度チェック（front matter のパース要）
# wiki/*.md の compiled 日 vs source の git log を比較

# WL-4: 孤立ページ（wikilink パース要）
# grep -oP '\[\[([^\]|]+)' wiki/**/*.md でリンク抽出

# WL-5: source パス実在
# front matter の source[].path をパースして test -f
```

## 出力先

すべてのレポートは `wiki/health/` に出力する。

| レポート | パス |
|---------|------|
| CN divergence + 用語統一 | `wiki/health/cn-divergence-report.md` |
| 鮮度 + source 実在 | `wiki/health/freshness-report.md` |
| 孤立ページ | `wiki/health/orphan-report.md` |

## periodic-review との連携

periodic-review 実行時に `wiki/health/` のレポートを参照し、
WARN/FAIL があれば報告する。

wiki-lint は compile とは独立した検証フェーズであり、
compile 直後に実行することで品質を担保する。

## 判定基準

| 判定 | 条件 |
|------|------|
| PASS | 全チェック問題なし |
| WARN | stale ページあり (WL-3)、または孤立ページあり (WL-4) |
| FAIL | 旧用語残存 (WL-1)、source パス不在 (WL-5) |
