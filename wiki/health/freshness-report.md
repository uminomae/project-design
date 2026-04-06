---
title: "Freshness Report"
checked: "2026-04-06"
status: PASS
---
# Freshness Report

## チェック内容
wiki ページの compiled 日と source の git log 最終変更日を比較し、stale ページを検出する (WL-3)。
source パスの実在を確認する (WL-5)。

## 結果

### concepts/

| wiki ページ | compiled | source | source 最終変更 | 鮮度 |
|---|---|---|---|---|
| 信頼の定義仮説 | 2026-04-06 | knowledge/concepts/CN-005_trust-hypothesis-inventory.md | 2026-04-04 | FRESH |
| 信頼の多元的記述 | 2026-04-06 | knowledge/concepts/CN-006_trust-analysis-axes.md | 2026-04-04 | FRESH |
| 測定設計原則 | 2026-04-06 | knowledge/concepts/CN-007_iss42-measurement-design-principles.md | 2026-04-04 | FRESH |
| PDブリッジ保持論点 | 2026-04-06 | knowledge/concepts/CN-008_pd-bridge-holding-issues.md | 2026-04-04 | FRESH |

### entities/

| wiki ページ | compiled | source | source 最終変更 | 鮮度 |
|---|---|---|---|---|
| ドナルド・ショーン | 2026-04-06 | knowledge/research/design-thinking/design-thinking-integrated.md | 2026-03-27 | FRESH |
| ナイジェル・クロス | 2026-04-06 | knowledge/research/design-thinking/design-thinking-integrated.md | 2026-03-27 | FRESH |
| アネット・ベイアー | 2026-04-06 | knowledge/research/trust/trust-integrated.md | 2026-03-27 | FRESH |
| ニクラス・ルーマン | 2026-04-06 | knowledge/research/trust/trust-integrated.md | 2026-03-27 | FRESH |
| 山岸俊男 | 2026-04-06 | knowledge/research/trust/trust-integrated.md, knowledge/research/kesson-bridge.md | 2026-04-04 | FRESH |
| アブダクション | 2026-04-06 | knowledge/research/design-thinking/design-thinking-integrated.md, knowledge/research/kesson-bridge.md | 2026-04-04 | FRESH |
| ウィキッド・プロブレム | 2026-04-06 | knowledge/research/design-thinking/design-thinking-integrated.md, knowledge/research/kesson-bridge.md | 2026-04-04 | FRESH |
| 愛着理論 | 2026-04-06 | knowledge/research/trust/trust-integrated.md, knowledge/research/kesson-bridge.md | 2026-04-04 | FRESH |
| シュワルツの基本的価値理論 | 2026-04-06 | knowledge/research/value/value-integrated.md | 2026-03-27 | FRESH |
| ピエール・ブルデュー | 2026-04-06 | knowledge/research/value/value-integrated.md | 2026-03-27 | FRESH |
| プロスペクト理論 | 2026-04-06 | knowledge/research/value/value-integrated.md | 2026-03-27 | FRESH |
| デイヴィッド・グレーバー | 2026-04-06 | knowledge/research/value/value-integrated.md | 2026-03-27 | FRESH |
| Value Sensitive Design | 2026-04-06 | knowledge/research/value/value-integrated.md | 2026-03-27 | FRESH |

### WL-5: source パス実在確認

全 source パスの実在を確認。

| パス | 存在 |
|---|---|
| knowledge/concepts/CN-005_trust-hypothesis-inventory.md | OK |
| knowledge/concepts/CN-006_trust-analysis-axes.md | OK |
| knowledge/concepts/CN-007_iss42-measurement-design-principles.md | OK |
| knowledge/concepts/CN-008_pd-bridge-holding-issues.md | OK |
| knowledge/research/design-thinking/design-thinking-integrated.md | OK |
| knowledge/research/trust/trust-integrated.md | OK |
| knowledge/research/value/value-integrated.md | OK |
| knowledge/research/kesson-bridge.md | OK |

## 判定

**PASS**: 全ページが FRESH。全 source パスが実在。
