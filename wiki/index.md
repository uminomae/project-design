---
title: "Wiki Index"
compiled: "2026-04-06"
---
# Wiki — Map of Content

pd/knowledge/ および関連リポの知識を compile した閲覧用 wiki。

## Concepts
- [[concepts/信頼の定義仮説|信頼の定義仮説]]
- [[concepts/信頼の多元的記述|信頼の多元的記述]]
- [[concepts/測定設計原則|測定設計原則]]
- [[concepts/PDブリッジ保持論点|PDブリッジ保持論点]]

## Entities
- [[entities/ドナルド・ショーン|ドナルド・ショーン]] -- reflection-in-action, designerly thinking
- [[entities/ナイジェル・クロス|ナイジェル・クロス]] -- designerly ways of knowing
- [[entities/アネット・ベイアー|アネット・ベイアー]] -- trust と vulnerability
- [[entities/ニクラス・ルーマン|ニクラス・ルーマン]] -- trust/confidence 区別, 社会システム理論
- [[entities/山岸俊男|山岸俊男]] -- 安心/信頼区別
- [[entities/アブダクション|アブダクション]] -- Peirce → Dorst, 仮説的推論
- [[entities/ウィキッド・プロブレム|ウィキッド・プロブレム]] -- Rittel & Webber, 厄介な問題
- [[entities/愛着理論|愛着理論]] -- Bowlby, 安全基地, 内的作業モデル

## Cross References
- [[cross-refs/concept-entity-map|Concept-Entity Map]] -- concepts と entities の関係マトリクス

## Health
- [[health/cn-divergence-report|CN Divergence Report]]
- [[health/freshness-report|Freshness Report]]
- [[health/orphan-report|Orphan Report]]

## Dataview クエリ例

### 全 concepts（status 別）
```dataview
TABLE status, compiled, review_state
FROM "concepts"
SORT status ASC, compiled DESC
```

### 最近 compile されたページ
```dataview
TABLE compiled, tags
FROM ""
WHERE compiled
SORT compiled DESC
LIMIT 10
```
