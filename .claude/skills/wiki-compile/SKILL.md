---
name: wiki-compile
description: |
  knowledge/ の正本から wiki/ の compiled view を生成する。
  Step 1-3 の段階に対応し、ソースの traceability を front matter で保持する。
---

# wiki-compile スキル

## 概要

各リポの knowledge/evidence から pd/wiki/ に compiled view を生成する。

**正本**: `/Users/uminomae/dev/project-design/.claude/skills/wiki-compile/`
**他 repo からの利用**: 各 repo の `.claude/skills/wiki-compile/` に相対シンボリックリンクを張り、本正本を参照する（共通 hooks と同じパターン。CLAUDE.md §共通 hooks の正本管理 を踏襲）。

## ドキュメント構成

| ファイル | 内容 |
|---|---|
| **SKILL.md**（本ファイル） | 概要、Step スコープ、全体フロー、更新トリガー、CLI指示書チェックリスト |
| [sources-pipeline.md](sources-pipeline.md) | Step 3b の PDF → wiki/sources/ 生成パイプライン（自動化、ファイル命名、本文構造、DOI/URL、OCR、生成後処理） |
| [writing-rules.md](writing-rules.md) | 執筆ルール（設計原則、概念/運用分離、定義の文献確認、高校生向け解説） |
| [schemas.md](schemas.md) | Front matter スキーマ、wikilink 変換、index.md 自動生成 |

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
| 2 | 同一リポ cross-directory | pd/knowledge/{concepts,research,meta}/* | wiki/{concepts,keywords,cross-refs}/*.md |
| 3a | cross-repo 概念 | ks/knowledge/, as/knowledge/, cs/evidence/ | wiki/cross-refs/*.md + 既存ページ追記 |
| 3b | cross-repo 原典解説 | cs/knowledge/raw/manifest.md + PDF | wiki/sources/{domain}_{author}_{year}_{keyword}.md |
| 3c | awareness-model 原典 | pd/knowledge/evidence/awareness-model/*.md | wiki/sources/{Author}_{year}_{keyword}.md |

Step 3b の詳細は [sources-pipeline.md](sources-pipeline.md) を参照。

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
| wiki/sources/*.md 追加 | cs wiki と矛盾検査 | 手動 `node scripts/wiki-cross-check.mjs --source <path>`（Step 3b 生成後に実行、pd#82） |
| knowledge/ 正本更新 | wiki ページ再コンパイル | 手動 `/wiki-compile`。WL-3 で stale 検知 |
| cs manifest 更新 | wiki/sources/ 生成依頼 | SessionStart → `wiki-gen-check.sh`（既存） |

## CLI指示書として実行する際のチェックリスト

wiki-compile を CLI指示書（`.cache/inbox/_instructions-{issue}-{slug}.md` または `wiki-gen-{date}.md`）経由で実行する場合、cli-instruction スキルのチェックリストに従う。最低限以下を含める:

- [ ] **対象リポジトリ・ブランチ**を明記（通常 develop）
- [ ] **Step 0（前提確認）**: ブランチ確認、対象ソースの存在確認
- [ ] **差分検出ステップ**: どのソースを compile するか列挙
- [ ] **生成後チェック**:
  - `grep -rl '�' wiki/ --include='*.md'` で UTF-8 文字化け
  - Step 3b 生成時は `wiki-crosslink.mjs` と `wiki-cross-check.mjs` を実行
  - wiki-lint WL-5 で source パス実在確認
- [ ] **commit & push**: `chore(wiki): log.md auto-append for {sha}` 等の自動コミットがある場合は指示書で明記
- [ ] **コミット影響レビュー**: wiki/*.md の追加・編集のみか、それ以外に波及していないか
- [ ] **Step 最終**: Issue コメント + DONE ファイル作成 + `gh issue view --json state` で終了状況確認 + close 判定
- [ ] **Codex 向け完了報告フッター**: `model` / `tokens used` を末尾に含める
- [ ] **自動実行の場合**: `action: auto-execute` 付き inbox であることを確認し、処理完了後は `.cache/inbox/archive/` に移動

チェックリスト全項目の根拠は cli-instruction スキル §3 を参照。

## 更新履歴

| 日付 | 内容 |
|---|---|
| 2026-04-19 | 4ファイル分割（SKILL.md / sources-pipeline.md / writing-rules.md / schemas.md）。cli-instruction チェックリスト統合。正本方針を明記 |
