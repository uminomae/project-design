# reader/ — 公開読み物ページ（生成物）

**このディレクトリ内の HTML は生成物。直接編集禁止。**

| ページ | 正本（編集はこちら） | style |
|---|---|---|
| `three-and-seven.html` | `knowledge/research/two-axis-closure/READER-division-algebra-consciousness-organization.md` | glow（透過記事＋glow-card） |
| `energy-flow.html` | `knowledge/research/energy-flow-psyche/READER-energy-flow-psyche.md` | flow（一枚ガラスカラム＋章アコーディオン＋garage 型目次。DESIGN-RULES §13） |

## このページが何で、どう育てるか

`three-and-seven.html` は **可除代数‑意識/組織仮説の万人向け公開解説ページ**（North Star）。
ゴール・骨格・執筆ルール・検証プロセス・残タスクの正本は
**[`knowledge/research/two-axis-closure/README.md`](../knowledge/research/two-axis-closure/README.md)**（着工前に必読）。

- 骨格は完成済み。残り作業は**調査・検証で論拠を固め、進捗ごとに §9 を更新して再公開**すること
- 執筆ルール（一人称語り・三点セット・anti-collapse・棄却の三層段差表＋比喩）も上記 README に集約

## テンプレート固有の章（energy-flow）

`energy-flow.html` の最終章「あなたの問いで、同じページを作る」は**正本 MD ではなくテンプレート
（`scripts/reader-energy-flow-template.html`）で管理**する。ページの URL をひとつ LLM に渡すだけで、
リポジトリ構築〜対話的調査〜GitHub Pages 公開まで同じ仕組みを再構築できる「LLM 向け仕様書」を
ページ自身に内蔵させるための章。編集はテンプレート側で行い、再生成で反映する。

## 更新手順

1. 正本の READER (MD) を編集する
2. 再生成: `python3 scripts/build-reader-lp.py`
3. develop に commit → main へマージで公開（GitHub Pages。反映まで数分〜10分）

## デザイン制約（必須）

**`docs/DESIGN-RULES.md` §0a を必読。** 公開ページはサイトの VI を継承する:

- WebGL シェーダー背景（`#webgl-container` + `src/reader-app.js`）の上に透過コンテンツ
- グロークラス体系（`.glow-heading` / `.glow-text` / `.glow-card`）で可読性を制御
- カラー・タイポは `src/styles/tokens.css` の CSS 変数のみ（新色ハードコード禁止）
- ページ固有スタイルは `src/styles/reader.css`（tokens + glow の上に載せる）
- 独自テーマ・埋め込み standalone CSS の新造は**禁止**（2026-07-03 の却下実例が DESIGN-RULES §8b にある）

テンプレートは `scripts/reader-lp-template.html`。テンプレート変更時も上記制約を満たすこと。
