---
title: "Concept-Entity Map"
compiled: "2026-04-06"
tags: [cross-ref, map]
---

# Concept-Entity Map

concepts/ と entities/ の関係を可視化するマトリクス。

## マトリクス

| Entity \ Concept | [[プロジェクトデザイン]] | [[信頼の定義仮説]] | [[信頼の多元的記述]] | [[測定設計原則]] | [[PDブリッジ保持論点]] |
|---|:---:|:---:|:---:|:---:|:---:|
| [[欠損]] | **参照** | | | | **参照** |
| [[欠損駆動思考]] | **参照** | | | | **参照** |
| [[抱持]] | **参照** | | | | **参照** |
| [[情動の構成]] | **参照** | | | | **参照** |
| [[デザイン思考]] | **共鳴** | | | | **共鳴** |
| [[4層モデル]] | **参照** | | | | |
| [[ネガティブケイパビリティ]] | **共鳴** | | | | **共鳴** |
| [[間主観性]] | **参照** | **参照** | **参照** | | |
| [[内受容感覚]] | **参照** | | | **参照** | |
| [[ドナルド・ショーン]] | | | | | **共鳴** |
| [[ナイジェル・クロス]] | | | | | |
| [[アネット・ベイアー]] | | **参照** | **参照** | | **堅牢** |
| [[ニクラス・ルーマン]] | | **参照** | **参照** | | |
| [[山岸俊男]] | | **参照** | **参照** | | **共鳴** |
| [[アブダクション]] | | | | | **部分的** |
| [[ウィキッド・プロブレム]] | | | | | **保持** |
| [[愛着理論]] | | **参照** | **参照** | **参照** | |
| [[シュワルツの基本的価値理論]] | | | | | |
| [[ピエール・ブルデュー]] | | | | | |
| [[プロスペクト理論]] | | | | | **共鳴** |
| [[デイヴィッド・グレーバー]] | | | | | |
| [[Value Sensitive Design]] | **共鳴** | | | | |

### 凡例

- **堅牢**: critic 検証済みの接続
- **共鳴**: 機能的類似（分析軸の違いあり）
- **部分的**: 抽象レベルでの類似
- **保持**: 保持論点として登録済み（未決）
- **参照**: 理論的根拠・参照文献として引用

## canonical-keywords との関連

| Entity | 関連する canonical keyword |
|---|---|
| [[欠損]] | [[欠損駆動思考]], [[抱持]], [[情動の構成]] |
| [[欠損駆動思考]] | [[欠損]], [[抱持]], [[デザイン思考]] |
| [[抱持]] | [[欠損]], [[欠損駆動思考]], [[ネガティブケイパビリティ]], [[愛着理論]] |
| [[デザイン思考]] | [[欠損駆動思考]], [[アブダクション]], [[ウィキッド・プロブレム]] |
| [[ドナルド・ショーン]] | [[デザイン思考]] |
| [[ナイジェル・クロス]] | [[デザイン思考]] |
| [[アネット・ベイアー]] | [[抱持]] |
| [[ニクラス・ルーマン]] | -- |
| [[山岸俊男]] | [[抱持]], [[ネガティブケイパビリティ]] |
| [[アブダクション]] | [[欠損駆動思考]], [[デザイン思考]] |
| [[ウィキッド・プロブレム]] | [[欠損駆動思考]], [[デザイン思考]] |
| [[愛着理論]] | [[抱持]] |
| [[シュワルツの基本的価値理論]] | [[感情処理]], [[間主観性]] |
| [[ピエール・ブルデュー]] | [[間主観性]] |
| [[プロスペクト理論]] | [[感情処理]], [[欠損駆動思考]] |
| [[デイヴィッド・グレーバー]] | [[間主観性]] |
| [[Value Sensitive Design]] | [[Love 駆動開発]] |

## Entities の related_concepts 一覧

| Entity | related_concepts | tags |
|--------|-----------------|------|
| [[欠損]] | 欠損駆動思考, 抱持, 情動の構成, PDブリッジ保持論点 | entity, concept, kesson, prediction-error, phenomenology |
| [[欠損駆動思考]] | 欠損, 抱持, 情動の構成, PDブリッジ保持論点, デザイン思考 | entity, theory, thinking, kesson, attitude |
| [[抱持]] | 欠損, 欠損駆動思考, 情動の構成, ネガティブケイパビリティ, 愛着理論, PDブリッジ保持論点 | entity, concept, containment, psychoanalysis, consciousness |
| [[デザイン思考]] | 欠損駆動思考, アブダクション, ウィキッド・プロブレム, ドナルド・ショーン, ナイジェル・クロス, PDブリッジ保持論点 | entity, theory, design, abduction, framing, human-centered |
| [[アネット・ベイアー]] | 信頼の定義仮説, 信頼の多元的記述, 抱持 | entity, person, trust, philosophy, vulnerability |
| [[アブダクション]] | デザイン思考, 欠損駆動思考, PDブリッジ保持論点 | entity, theory, logic, design-thinking, abduction |
| [[ウィキッド・プロブレム]] | デザイン思考, 欠損駆動思考, PDブリッジ保持論点 | entity, theory, design-thinking, planning, complexity |
| [[ドナルド・ショーン]] | デザイン思考, 抱持, 欠損駆動思考 | entity, person, design-thinking, reflection |
| [[ナイジェル・クロス]] | デザイン思考 | entity, person, design-thinking, epistemology |
| [[ニクラス・ルーマン]] | 信頼の定義仮説, 信頼の多元的記述 | entity, person, trust, sociology, systems-theory |
| [[山岸俊男]] | 信頼の定義仮説, 信頼の多元的記述, 抱持 | entity, person, trust, social-psychology, japan |
| [[愛着理論]] | 信頼の定義仮説, 信頼の多元的記述, 測定設計原則, 抱持 | entity, theory, trust, developmental-psychology, attachment |
| [[シュワルツの基本的価値理論]] | 感情処理, 間主観性 | entity, theory, value, social-psychology, cross-cultural |
| [[ピエール・ブルデュー]] | 間主観性 | entity, person, value, sociology, capital |
| [[プロスペクト理論]] | 感情処理, 欠損駆動思考 | entity, theory, value, behavioral-economics, decision-making |
| [[デイヴィッド・グレーバー]] | 間主観性 | entity, person, value, anthropology, integration |
| [[Value Sensitive Design]] | プロジェクトデザイン, Love 駆動開発 | entity, theory, value, design, HCI, ethics |
| [[ネガティブケイパビリティ]] | 抱持, 欠損駆動思考, 間主観性, 情動の構成, デザイン思考 | entity, theory, philosophy, psychoanalysis, creativity |
| [[間主観性]] | 抱持, 内受容感覚, 情動の構成, 欠損駆動思考, 4層モデル, 愛着理論 | entity, concept, philosophy, developmental-psychology, phenomenology |
| [[情動の構成]] | 欠損, 欠損駆動思考, 抱持, 内受容感覚, 4層モデル, 間主観性, ネガティブケイパビリティ | entity, theory, neuroscience, emotion, consciousness |
| [[内受容感覚]] | 4層モデル, 間主観性, 情動の構成, 抱持, 欠損 | entity, theory, neuroscience, consciousness, embodiment |
| [[4層モデル]] | 欠損, 欠損駆動思考, 抱持, 情動の構成, 内受容感覚, 間主観性, ネガティブケイパビリティ | entity, theory, consciousness, neuroscience, model |

## 「信頼の定義仮説」に関連する entities

| Entity | related_concepts |
|--------|-----------------|
| [[アネット・ベイアー]] | 信頼の定義仮説, 信頼の多元的記述, 抱持 |
| [[ニクラス・ルーマン]] | 信頼の定義仮説, 信頼の多元的記述 |
| [[山岸俊男]] | 信頼の定義仮説, 信頼の多元的記述, 抱持 |
| [[愛着理論]] | 信頼の定義仮説, 信頼の多元的記述, 測定設計原則, 抱持 |

> **Note**: このテーブルは wiki-compile 時に生成された静的データです。Obsidian では Dataview クエリによる動的表示も利用できます。
