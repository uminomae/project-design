---
title: "Orphan Report"
checked: "2026-04-13"
status: PASS
---
# Orphan Report

## チェック内容
wiki 内で他のどのページからもリンクされていない孤立ページを検出する (WL-4)。
赤リンク（存在しないページへのリンク）の残存も確認する。

## サマリ (2026-04-13)

| 指標 | 値 |
|---|---|
| 総ページ数 | 155 |
| 総 wikilink 数 | 861 |
| Orphan（被リンクなし、index/about/log 除外） | **0** |
| Broken wikilink | 0（5件は `concepts/wikilink` の文法説明用例示） |
| sources/ で index 以外からも被リンクあり | 116 / 116 (100%) |

## ディレクトリ別

| ディレクトリ | ページ数 | Orphan |
|---|---|---|
| wiki（ルート: index, about, about-project-design, log） | 4 | 0 |
| wiki/concepts | 9 | 0 |
| wiki/cross-refs | 4 | 0 |
| wiki/entities | 22 | 0 |
| wiki/sources | 116 | 0 |

## Top 10 hubs（被リンク数）

| ページ | 被リンク数 |
|---|---|
| 欠損駆動思考 | 38 |
| 抱持 | 31 |
| 欠損 | 30 |
| 情動の構成 | 20 |
| 間主観性 | 19 |
| ネガティブケイパビリティ | 17 |
| 創造の5段階モデル | 16 |
| 内受容感覚 | 15 |
| プロジェクトデザイン | 13 |
| アウェアネスモデル | 12 |

中心概念（kesson, 抱持, 情動構成, 創造5段階）が想定どおりハブを形成。

## 直近の修正 (2026-04-13)

- `wiki/about-project-design.md` の orphan を解消（about.md からリンク追加）
- `cross-refs/creation-space-domains.md` のテーブルを 31件 → 98件に拡張し、D01-D30 全 source ページを backref 化（fan-leaf 62件 → 0件）

## 判定

**PASS**: wiki 内の全ページは index 以外の少なくとも1ページからリンクされており、孤立ページなし。赤リンク 0件。
