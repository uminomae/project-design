---
title: "About This Wiki"
compiled: "2026-04-06"
tags: [meta]
---

# About This Wiki

この wiki の成り立ち、仕組み、役割分担を説明するメタドキュメント。

---

## この wiki は何か

pd/knowledge/ および関連リポジトリの知識資産から、LLM が自動生成した **compiled view**（編集済み閲覧用ビュー）。元の資料を変更せず、読みやすく再構成し、概念間のリンクを付与したもの。

**正本ではない。** 正本は各リポの knowledge/ や evidence/ にある。この wiki は閲覧・探索・健全性チェックのためのレイヤーであり、いつでも全削除して再生成できる。

---

## ソースとなるナレッジの所在

| リポジトリ | ディレクトリ | 内容 | compile 状況 |
|---|---|---|---|
| **project-design** | `knowledge/concepts/` | 概念ノート CN-005〜008（信頼、測定、保持論点） | Step 1 済 → `concepts/` |
| **project-design** | `knowledge/research/` | 調査レポート群（trust, value, design-thinking 等） | Step 2 済 → `entities/` |
| **project-design** | `knowledge/meta/` | canonical-keywords.md, terminology-changelog.md 等 | wikilink 辞書として使用 |
| **project-design** | `knowledge/schema/` | evidence-metadata.md（メタデータ体系定義） | 参照のみ |
| **kesson-space** | `knowledge/` | concepts/CN-001〜004, expressions/, schema/, text/ | Step 3 完了 |
| **awareness-space** | `knowledge/` | topics/four-layers, topics/survival-trust-axis | Step 3 完了 |
| **creation-space** | `knowledge/` | five-stages-guide, glossary, schema/, domains/ (D01-D30) | Step 3 完了 |

### 参照しているが wiki に取り込んでいないもの

- `pjdhiro/_pages/pd/` — 公開用 Markdown の正本。wiki とは独立
- `techo/knowledge/` — for-ai 用語集、pd 関連の対話記録。参考情報
- 各リポの `transform/` — 生成ルール・パイプライン。wiki の compile とは別系統

---

## compile の仕組み

### 誰が何をするか

| 主体 | 役割 | 具体的な操作 |
|---|---|---|
| **Claude Code CLI** | compile 実行 | ソースを読み、wiki ページを生成・更新する |
| **canonical-keywords.md** | wikilink 辞書 | compile 後の後処理で、辞書の用語を初出のみ `[[wikilink]]` に変換 |
| **Obsidian** | 閲覧・探索 | 人間がグラフビュー、バックリンク、Dataview クエリで知識を探索する |
| **pjdhiro（人間）** | レビュー・判断 | `review_state` を「レビュー済み」に変更。理論の最終採否は人間の専権 |

### compile フロー

```
knowledge/ (raw)  ──LLM読み取り──▶  plain markdown 生成
                                         │
                                         ▼
                              canonical-keywords.md 辞書
                                         │
                                    正規表現で初出のみ
                                    [[wikilink]] 挿入
                                         │
                                         ▼
                                    wiki/*.md 出力
                                         │
                                         ▼
                                    log.md に記録
```

### compile のステップ

| Step | 範囲 | 入力 | 出力 | 状況 |
|---|---|---|---|---|
| **Step 1** | pd 内 同一ディレクトリ | `knowledge/concepts/CN-*.md` | `concepts/` | 完了 |
| **Step 2** | pd 内 cross-directory | `knowledge/research/` | `entities/`, `cross-refs/` | 完了 |
| **Step 3** | cross-repo | ks, as, cs の knowledge | `entities/` 充実化 + `cross-refs/` 拡充 | 完了（[#53](https://github.com/uminomae/project-design/issues/53)） |

### front matter の読み方

各ページの冒頭にある YAML front matter がトレーサビリティを担保する。

```yaml
title: "概念名"              # ページタイトル
aliases: ["English", "略称"]  # Obsidian の検索・リンク解決で使用
source:                       # ★ compile 元のファイル
  - repo: "project-design"
    path: "knowledge/concepts/CN-005_trust-hypothesis-inventory.md"
compiled: "2026-04-06"        # 最後に compile した日
tags: [concept, trust]        # Obsidian タグ
status: 探索的 | 暫定 | 正典   # 内容の成熟度（LLM が判定）
review_state: 未レビュー       # 人間のレビュー状態
```

---

## Obsidian と LLM の分担

```
┌─────────────────────────────────────────────┐
│  LLM（Claude Code CLI）の領域               │
│                                             │
│  ・wiki ページの生成・更新                    │
│  ・wikilink の挿入（辞書ベース後処理）        │
│  ・health check（lint）の実行               │
│  ・log.md への記録                           │
│                                             │
│  ※ knowledge/ の正本は読むだけ。変更しない   │
└─────────────────────────────────────────────┘
                    ▼ 出力
┌─────────────────────────────────────────────┐
│  Obsidian の領域                             │
│                                             │
│  ・グラフビューで概念間の接続を可視化         │
│  ・バックリンクで逆方向の参照を発見           │
│  ・Dataview クエリで status や compiled で    │
│    フィルタリング                            │
│  ・全文検索で知識を横断探索                   │
│                                             │
│  ※ wiki ファイルを人間が手動編集する必要なし  │
└─────────────────────────────────────────────┘
                    ▼ 判断
┌─────────────────────────────────────────────┐
│  pjdhiro（人間）の領域                       │
│                                             │
│  ・review_state の確定                       │
│  ・理論の最終採否（しっくり感チェック）        │
│  ・保持論点の解消                             │
│  ・公開判定（develop → main マージ）          │
└─────────────────────────────────────────────┘
```

---

## health check（wiki-lint）

wiki の健全性を定期的にチェックするスキル。結果は `health/` に出力される。

| チェック | 何を見るか | レポート |
|---|---|---|
| **WL-1** CN divergence | 用語統一（Withhold→抱持）が全リポに反映されているか | [[health/cn-divergence-report]] |
| **WL-2** 用語統一 | canonical-keywords.md の禁止用語が wiki に残っていないか | WL-1 に統合 |
| **WL-3** 鮮度 | wiki の compiled 日 vs ソースの最終変更日 | [[health/freshness-report]] |
| **WL-4** 孤立ページ | どこからもリンクされていないページ | [[health/orphan-report]] |
| **WL-5** source 実在 | front matter の source パスが実際に存在するか | WL-3 に統合 |
| **WL-6** 文字化け検出 | UTF-8 置換文字（U+FFFD `�`）が wiki/*.md に含まれていないか | compile 時に検出 |

---

## 設計思想

Karpathy の [LLM Knowledge Base パターン](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) を参考に、既存のマルチリポ構成に追加レイヤーとして設計。

| Karpathy の概念 | この wiki での実装 |
|---|---|
| **Raw Sources**（不変） | 各リポの knowledge/, evidence/（変更なし） |
| **Compiled Wiki**（LLM 生成） | `pd/wiki/`（本ディレクトリ） |
| **Schema**（構造定義） | wiki-compile SKILL.md, canonical-keywords.md |
| **Ingest** | 各リポの knowledge を LLM が読み取る |
| **Compile** | wiki-compile スキルで markdown を生成 |
| **Query & Enhance** | Obsidian で閲覧・検索 |
| **Lint & Maintain** | wiki-lint スキルで health check |

### 設計原則

1. **既存ファイル変更ゼロ** — wiki は追加物。ソースを書き換えない
2. **再生成可能** — wiki/ を全削除しても再 compile できる
3. **wikilink は冪等** — 辞書ベースの後処理。何度実行しても同じ結果
4. **正本分離** — wiki は compiled view。正本は各リポの knowledge/evidence

---

## Cross-Repo ソースの参照範囲

Step 3 で参照した各リポジトリの範囲。

| リポ | 参照パス | 用途 | wiki ページ |
|------|---------|------|------------|
| **kesson-space** | knowledge/schema/core-definitions.md | コア概念定義の正本 | 欠損, 欠損駆動思考, 抱持, 情動の構成 |
| **kesson-space** | knowledge/schema/glossary.md, container-mapping.md, hoji-matching-v2.md | 抱持の詳細構造 | 抱持 |
| **kesson-space** | knowledge/text/foundation/phase1-summary.md | 理論構造概要 | 欠損駆動思考, 欠損 |
| **kesson-space** | knowledge/text/clinical-psychology/ (7篇) | 臨床心理学との接続 | ネガティブケイパビリティ, 間主観性, 情動の構成, 内受容感覚, 4層モデル |
| **kesson-space** | knowledge/concepts/CN-001〜004 | ks 固有の概念ノート | 各 entities に部分反映 |
| **awareness-space** | knowledge/topics/four-layers/ja/report.md | 4層モデルの独自レポート | 4層モデル, 内受容感覚 |
| **awareness-space** | knowledge/topics/survival-trust-axis/ja/report.md | 生存-信頼軸の独自レポート | 情動の構成, 間主観性 |
| **creation-space** | knowledge/five-stages-guide.md, glossary.md | 5段階モデル解説 | 創造の5段階モデル |
| **creation-space** | knowledge/schema/five-stages.md, academic-domains.md | 構造定義 | 創造の5段階モデル |
| **creation-space** | knowledge/domains/ (D01-D30) | 30ドメインの構造化レポート | creation-space-domains (cross-refs) |

### 不採用としたソース

- kdt (kesson-driven-thinking): アーカイブ済み。コンテンツは ks/cs に移行完了
- pjdhiro/_pages/pd/: 公開用正本。wiki compile 対象外
- as/concepts/CN-001,002: ks と同一起源（ks を正本とした）
- as/concepts/CN-005,006,007: pd と同一起源（Step 1 で pd を正本として compile 済み）
- cs/evidence/: 大容量生データ。cs/knowledge/ の構造化版を使用

---

## 関連スキル・Issue

| 項目 | 場所 |
|---|---|
| wiki-compile スキル | `.claude/skills/wiki-compile/SKILL.md` |
| wiki-lint スキル | `.claude/skills/wiki-lint/SKILL.md` |
| 計画 Issue | [pd#48](https://github.com/uminomae/project-design/issues/48) |
| Obsidian 設定 Issue | [pd#49](https://github.com/uminomae/project-design/issues/49) |
| Cross-Repo Compile Issue | [pd#53](https://github.com/uminomae/project-design/issues/53) |
