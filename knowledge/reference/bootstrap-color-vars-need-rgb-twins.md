# Bootstrap 5 の色の変数は `-rgb` 版も一緒に上書きする

**確認日**: 2026-09-02
**一次ソース**: Bootstrap 5.3.3 の `bootstrap.min.css`（`.bg-body-tertiary` などの定義）と、
gonin の棚で帯の色だけ古いまま残った実測（gonin#21・PR #22）

---

## 事実

Bootstrap 5.3 は色を**2系統の CSS 変数**で持つ。`--bs-body-bg` のような通常版と、
`--bs-body-bg-rgb` のような **RGB 版**（`255, 253, 250` の形）。

ユーティリティクラスの多くは **RGB 版**を使う。

| クラス | 使う変数 |
|---|---|
| `.bg-body-tertiary` | `rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity))` |
| `.bg-body` | `rgba(var(--bs-body-bg-rgb), …)` |
| `.text-body-secondary` | `--bs-secondary-color`（通常版） |
| `body` の背景 | `--bs-body-bg`（通常版） |

つまり `:root { --bs-tertiary-bg: … }` だけ上書きしても、`.bg-body-tertiary` の帯は
**既定の灰色のまま**になる。片方だけ変えると「body は新しい色、帯は古い色」というちぐはぐが
起き、ダークモードで特に目立つ（帯だけ明るい灰色が残る）。

## 対処

配色を差し替えるときは、**通常版と `-rgb` 版を必ず対で**書く。

```css
:root {
  --bs-body-bg: #fefcfe;
  --bs-body-bg-rgb: 254, 252, 254;
  --bs-tertiary-bg: #f6f2fb;
  --bs-tertiary-bg-rgb: 246, 242, 251;
}
```

対で書く対象＝`body-bg`・`body-color`・`secondary-bg`・`tertiary-bg`・`emphasis-color` あたり。
`border-color` と `link-color` には RGB 版が無い（通常版だけでよい）。

## 見つけ方

見た目で「1か所だけ古い色が残る」が出たら、そのクラスの定義を `bootstrap.min.css` で引き、
`rgba(var(--bs-…-rgb)` になっていないかを見る。
