# reader/ — 公開読み物ページ（生成物）

**このディレクトリ内の HTML は生成物。直接編集禁止。**

| ページ | 正本（編集はこちら） |
|---|---|
| `three-and-seven.html` | `knowledge/research/two-axis-closure/READER-division-algebra-consciousness-organization.md` |

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
