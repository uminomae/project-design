---
title: "CN Divergence Report"
checked: "2026-04-06"
---
# CN Divergence Report

## チェック内容
terminology-changelog の用語統一（Withhold→抱持）が全リポに反映されているか。

## 結果

### 検索対象
- `/Users/uminomae/dev/project-design/knowledge/concepts/`
- `/Users/uminomae/dev/kesson-space/knowledge/concepts/`
- `/Users/uminomae/dev/awareness-space/knowledge/concepts/`

### "Withhold"（英語旧概念名、大文字小文字不問）
検出なし。全3リポの concepts/ から旧英語名は除去済み。

### "保持"（日本語、一般用法との区別が必要）
多数検出。ただし全て一般的な日本語動詞としての用法（「保持する」「保持論点」「保持条件」等）であり、
Withhold 概念の旧訳としての使用ではない。

#### project-design/knowledge/concepts/
- `CN-005_trust-hypothesis-inventory.md`: "保持論点"（5箇所）、"保持される"（1箇所）
- `CN-008_pd-bridge-holding-issues.md`: "保持論点"（6箇所）、"保持すべき問い"（1箇所）

#### kesson-space/knowledge/concepts/
- `CN-004_collective-hoji.md`: "保持"（12箇所） -- 集団的保持の文脈。一般動詞用法
- `CN-003_boundary-casebook.md`: "保持"（15箇所） -- 保持条件・保持能力の文脈。一般動詞用法
- `index.md`: "保持"（2箇所） -- "文脈を保持"、"保持論点"

#### awareness-space/knowledge/concepts/
- `CN-005_trust-hypothesis-inventory.md`: "保持"（7箇所） -- 保持論点・保持条件の文脈
- `CN-001_internalized-relationship.md`: "保持"（8箇所） -- 保持条件の文脈
- `CN-002_f-axis-exposure.md`: "保持条件"（1箇所）
- `CN-007_iss42-measurement-design-principles.md`: "保持・再評価"（1箇所）
- `index.md`: "保持"（1箇所）

## 推奨アクション
- **旧英語名 "Withhold" の残存はなし。** 用語統一は完了している。
- **"保持" は一般動詞として広く使用されており、概念名 "抱持" との混同リスクは低い。** 現時点で修正不要。
- 今後 compile 時に「抱持」概念への参照が "保持" と表記されていないか定期チェックを推奨。
