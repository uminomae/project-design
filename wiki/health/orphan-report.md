---
title: "Orphan Report"
checked: "2026-04-06"
status: PASS
---
# Orphan Report

## チェック内容
wiki 内で他のどのページからもリンクされていない孤立ページを検出する (WL-4)。
赤リンク（存在しないページへのリンク）の残存も確認する。

## リンクグラフ解析

### ページ一覧（index.md 除く）

| ページ | 被リンク元 |
|---|---|
| concepts/信頼の定義仮説 | index.md, 信頼の多元的記述, 測定設計原則, PDブリッジ保持論点, アネット・ベイアー, ニクラス・ルーマン, 山岸俊男, 愛着理論, concept-entity-map |
| concepts/信頼の多元的記述 | index.md, 信頼の定義仮説, 測定設計原則, PDブリッジ保持論点, アネット・ベイアー, ニクラス・ルーマン, 山岸俊男, 愛着理論, concept-entity-map |
| concepts/測定設計原則 | index.md, 信頼の定義仮説, 信頼の多元的記述, PDブリッジ保持論点, 愛着理論, concept-entity-map |
| concepts/PDブリッジ保持論点 | index.md, 信頼の定義仮説, 測定設計原則, ドナルド・ショーン, アネット・ベイアー, ニクラス・ルーマン, アブダクション, ウィキッド・プロブレム, concept-entity-map |
| concepts/プロジェクトデザイン | index.md, concept-entity-map, kesson-space-overview, awareness-space-overview |
| concepts/Love 駆動開発 | index.md, concept-entity-map, kesson-space-overview |
| concepts/感情処理 | index.md, concept-entity-map, kesson-space-overview |
| concepts/wikilink | index.md |
| entities/欠損 | index.md, 欠損駆動思考, 抱持, デザイン思考, concept-entity-map, kesson-space-overview, awareness-space-overview |
| entities/欠損駆動思考 | index.md, 欠損, 抱持, デザイン思考, concept-entity-map, kesson-space-overview, awareness-space-overview |
| entities/抱持 | index.md, 欠損, 欠損駆動思考, concept-entity-map, kesson-space-overview, awareness-space-overview |
| entities/情動の構成 | index.md, ネガティブケイパビリティ, 間主観性, 4層モデル, 欠損, 欠損駆動思考, 抱持, concept-entity-map, kesson-space-overview, awareness-space-overview |
| entities/デザイン思考 | index.md, 欠損駆動思考, concept-entity-map |
| entities/4層モデル | index.md, ネガティブケイパビリティ, 間主観性, 情動の構成, 内受容感覚, プロジェクトデザイン, concept-entity-map, kesson-space-overview, awareness-space-overview |
| entities/ネガティブケイパビリティ | index.md, 抱持, 4層モデル, concept-entity-map, kesson-space-overview, wikilink |
| entities/間主観性 | index.md, ネガティブケイパビリティ, 内受容感覚, 4層モデル, concept-entity-map, kesson-space-overview |
| entities/内受容感覚 | index.md, 間主観性, 情動の構成, 4層モデル, concept-entity-map, kesson-space-overview, awareness-space-overview |
| entities/創造の5段階モデル | index.md, concept-entity-map, creation-space-domains |
| entities/ドナルド・ショーン | index.md, concept-entity-map |
| entities/ナイジェル・クロス | index.md, concept-entity-map |
| entities/アネット・ベイアー | index.md, concept-entity-map |
| entities/ニクラス・ルーマン | index.md, concept-entity-map |
| entities/山岸俊男 | index.md, ニクラス・ルーマン, concept-entity-map |
| entities/アブダクション | index.md, PDブリッジ保持論点, concept-entity-map |
| entities/ウィキッド・プロブレム | index.md, PDブリッジ保持論点, concept-entity-map |
| entities/愛着理論 | index.md, 信頼の定義仮説, 信頼の多元的記述, 測定設計原則, concept-entity-map, kesson-space-overview |
| entities/シュワルツの基本的価値理論 | index.md, concept-entity-map |
| entities/ピエール・ブルデュー | index.md, concept-entity-map |
| entities/プロスペクト理論 | index.md, concept-entity-map |
| entities/デイヴィッド・グレーバー | index.md, concept-entity-map |
| entities/Value-Sensitive-Design | index.md, concept-entity-map |
| cross-refs/concept-entity-map | index.md, wikilink, kesson-space-overview |
| cross-refs/creation-space-domains | index.md, awareness-space-overview |
| cross-refs/kesson-space-overview | index.md, awareness-space-overview |
| cross-refs/awareness-space-overview | index.md, kesson-space-overview |
| health/cn-divergence-report | index.md, about.md |
| health/freshness-report | index.md, about.md |
| health/orphan-report | index.md, about.md |
| about | index.md, wikilink |
| log | (メタページ: 直接リンクなし) |

### 赤リンク（存在しないページへの参照）

P0 で解消: 欠損, 欠損駆動思考, 抱持, デザイン思考（4件）
P1 で解消: ネガティブケイパビリティ, 間主観性, 情動の構成, 内受容感覚, プロジェクトデザイン + 4層モデル新規（6件）
P2 で解消: Love 駆動開発, 感情処理（2件）
P3 で解消: wikilink（1件）

**赤リンク残存: 0件**

## 判定

**PASS**: wiki 内の全ページは index.md または他ページからリンクされており、孤立ページなし。赤リンク 0件。P0-P3 で全 13件の stub/赤リンクを解消済み。
