---
title: "Orphan Report"
checked: "2026-04-06"
status: PASS
---
# Orphan Report

## チェック内容
wiki 内で他のどのページからもリンクされていない孤立ページを検出する (WL-4)。

## リンクグラフ解析

### ページ一覧（index.md 除く）

| ページ | 被リンク元 |
|---|---|
| concepts/信頼の定義仮説 | index.md, 信頼の多元的記述, 測定設計原則, PDブリッジ保持論点, アネット・ベイアー, ニクラス・ルーマン, 山岸俊男, 愛着理論, concept-entity-map |
| concepts/信頼の多元的記述 | index.md, 信頼の定義仮説, 測定設計原則, PDブリッジ保持論点, アネット・ベイアー, ニクラス・ルーマン, 山岸俊男, 愛着理論, concept-entity-map |
| concepts/測定設計原則 | index.md, 信頼の定義仮説, 信頼の多元的記述, PDブリッジ保持論点, 愛着理論, concept-entity-map |
| concepts/PDブリッジ保持論点 | index.md, 信頼の定義仮説, 測定設計原則, ドナルド・ショーン, アネット・ベイアー, ニクラス・ルーマン, アブダクション, ウィキッド・プロブレム, concept-entity-map |
| entities/ドナルド・ショーン | index.md, concept-entity-map |
| entities/ナイジェル・クロス | index.md, concept-entity-map |
| entities/アネット・ベイアー | index.md, concept-entity-map |
| entities/ニクラス・ルーマン | index.md, concept-entity-map |
| entities/山岸俊男 | index.md, ニクラス・ルーマン, concept-entity-map |
| entities/アブダクション | index.md, PDブリッジ保持論点, concept-entity-map |
| entities/ウィキッド・プロブレム | index.md, PDブリッジ保持論点, concept-entity-map |
| entities/愛着理論 | index.md, 信頼の定義仮説, 信頼の多元的記述, 測定設計原則, concept-entity-map |
| entities/シュワルツの基本的価値理論 | index.md, concept-entity-map |
| entities/ピエール・ブルデュー | index.md, concept-entity-map |
| entities/プロスペクト理論 | index.md, concept-entity-map |
| entities/デイヴィッド・グレーバー | index.md, concept-entity-map |
| entities/Value-Sensitive-Design | index.md, concept-entity-map |
| cross-refs/concept-entity-map | index.md |
| health/cn-divergence-report | index.md |
| health/freshness-report | index.md |
| health/orphan-report | index.md |
| entities/欠損 | index.md, 欠損駆動思考, 抱持, デザイン思考, concept-entity-map |
| entities/欠損駆動思考 | index.md, 欠損, 抱持, デザイン思考, concept-entity-map |
| entities/抱持 | index.md, 欠損, 欠損駆動思考, concept-entity-map |
| entities/デザイン思考 | index.md, 欠損駆動思考, concept-entity-map |

### 未リンク wikilink ターゲット（wiki 外の概念への参照）

以下は wikilink として参照されているが、対応する wiki ページが存在しないもの（stub のみ）:
- [[情動の構成]] -- entities/ から参照。canonical-keywords D4。stub あり
- [[ネガティブケイパビリティ]] -- entities/ から参照。canonical-keywords。stub あり
- [[間主観性]] -- concepts/ から参照。canonical-keywords。stub あり
- [[内受容感覚]] -- 測定設計原則から参照。canonical-keywords。stub あり
- [[プロジェクトデザイン]] -- entities/ から参照。canonical-keywords。stub あり
- [[Love 駆動開発]] -- entities/ から参照。canonical-keywords。stub あり
- [[感情処理]] -- entities/ から参照。canonical-keywords。stub あり

P0 で解消済み: 欠損, 欠損駆動思考, 抱持, デザイン思考（4件）
残り7件は P1-P3 で解消予定。

## 判定

**PASS**: wiki 内の全ページは index.md または他ページからリンクされており、孤立ページなし。
未リンクターゲット（赤リンク）は7件（P0 で4件解消、残り7件は P1-P3 で解消予定）。
