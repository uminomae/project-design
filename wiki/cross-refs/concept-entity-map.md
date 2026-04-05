---
title: "Concept-Entity Map"
compiled: "2026-04-06"
tags: [cross-ref, map]
---

# Concept-Entity Map

concepts/ と entities/ の関係を可視化するマトリクス。

## マトリクス

| Entity \ Concept | [[信頼の定義仮説]] | [[信頼の多元的記述]] | [[測定設計原則]] | [[PDブリッジ保持論点]] |
|---|:---:|:---:|:---:|:---:|
| [[ドナルド・ショーン]] | | | | **共鳴** |
| [[ナイジェル・クロス]] | | | | |
| [[アネット・ベイアー]] | **参照** | **参照** | | **堅牢** |
| [[ニクラス・ルーマン]] | **参照** | **参照** | | |
| [[山岸俊男]] | **参照** | **参照** | | **共鳴** |
| [[アブダクション]] | | | | **部分的** |
| [[ウィキッド・プロブレム]] | | | | **保持** |
| [[愛着理論]] | **参照** | **参照** | **参照** | |

### 凡例

- **堅牢**: critic 検証済みの接続
- **共鳴**: 機能的類似（分析軸の違いあり）
- **部分的**: 抽象レベルでの類似
- **保持**: 保持論点として登録済み（未決）
- **参照**: 理論的根拠・参照文献として引用

## canonical-keywords との関連

| Entity | 関連する canonical keyword |
|---|---|
| [[ドナルド・ショーン]] | [[デザイン思考]] |
| [[ナイジェル・クロス]] | [[デザイン思考]] |
| [[アネット・ベイアー]] | [[抱持]] |
| [[ニクラス・ルーマン]] | -- |
| [[山岸俊男]] | [[抱持]], [[ネガティブケイパビリティ]] |
| [[アブダクション]] | [[欠損駆動思考]], [[デザイン思考]] |
| [[ウィキッド・プロブレム]] | [[欠損駆動思考]], [[デザイン思考]] |
| [[愛着理論]] | [[抱持]] |

## Dataview クエリ

### entities の related_concepts 一覧

```dataview
TABLE related_concepts, tags
FROM "entities"
SORT title ASC
```

### 特定 concept に関連する entities

```dataview
TABLE related_concepts
FROM "entities"
WHERE contains(related_concepts, "信頼の定義仮説")
SORT title ASC
```

### 未接続 entities（related_concepts が空）

```dataview
LIST
FROM "entities"
WHERE !related_concepts OR length(related_concepts) = 0
```
