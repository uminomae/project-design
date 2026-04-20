# project-design / design-system

**purpose**: dev/ 配下の UI 層で共有する token / component の**単一ソース**。

## 三層構造

| Layer | Prefix | 管轄 | 配置 |
|-------|--------|------|------|
| メタ共通 | `--ds-*` | 3 repo（kesson / creation / awareness）で値が一致する token | 本ディレクトリ `tokens.css` |
| pd 固有 | `--pd-*` | pd の light theme + warm palette + glow 表現 | `../src/styles/tokens.css`（既存） |
| repo 個性 | `--kesson-* / --cs-* / --as-*` | 各 repo の intentional difference（action 濃度 / topbar サイズ / surface 階調 など） | 各 repo `src/styles/tokens.css`（既存） |

## 原則

- pd 本体 UI（`project-design/index.html` + `project-design/src/styles/`）は**触らない**。pd は light theme + glow 表現を保持する。
- design system は**追加レイヤー**。pd 本体と同居するが別ブランドで運用する。
- 3 repo からの参照方式は未定（submodule / CDN / npm）。現状は同 workspace 前提で相対パス参照を想定。

## 含まれるもの

- `tokens.css`: `--ds-*` 44 token
- `components.md`: SYSTEMIZE 候補 component の placeholder（今後の拡充対象）

## 含まれないもの（意図的に除外）

- action 系 token（kesson/as と cs で値が異なる。intentional difference）
- topbar サイズ系（as は tighter）
- markdown token 群（cs 未使用）
- surface 階調（cs のみ 3 段階、kesson/as は単一）
- Three.js / Bootstrap 等の外部依存バージョン統一

## 参照

- 親 issue: [techo#126](https://github.com/uminomae/techo/issues/126)
- 本 repo issue: [#84](https://github.com/uminomae/project-design/issues/84)
- 観点A 棚卸し結果: `docs/reviews/UI-assets-20260420.md`（pd）/ 他 3 repo の同名ファイル
