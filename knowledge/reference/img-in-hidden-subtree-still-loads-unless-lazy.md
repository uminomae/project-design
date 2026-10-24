# `display:none` の中の `<img>` も読み込まれる（止めるのは `loading="lazy"` だけ）

**確認日**: 2026-09-03
**一次ソース**: HTML 仕様「Lazy loading attributes」
https://html.spec.whatwg.org/multipage/urls-and-fetching.html#lazy-loading-attributes
（lazy は「表示領域と交わったら」読み始める＝レイアウト枠の無い要素は交わらない）と、
gonin の本番での実測（`/benkyo` を開いただけで modal の中の 1,406,249 バイトの PNG が取得されていた・
`performance.getEntriesByType("resource")`・commit ad12fb4 で修正）

---

## 事実

`<img src>` は、**祖先が `display:none` でも**、DOM に入った時点で読み込みが始まる。
見えるかどうかは関係ない。止まるのは `loading="lazy"` を付けたときだけで、lazy の画像は
レイアウトの枠を持って表示領域と交わるまで取りに行かない（`display:none` の中では枠が無いので、
表示されるまで読まれない）。

gonin の棚は、カードごとに Bootstrap の modal（閉じているあいだは `display:none`）を持ち、
その中に本体の画像（長辺 1200px・1MB 超）を置いている。carousel の 2 枚目以降は lazy にしていたが、
**1 枚目と、1 枚だけのカードの画像には lazy を付けていなかった**ので、棚を開いただけで
カードの数ぶん本体画像を読んでいた（2 枚のカードで 1.6MB。20 枚なら 20 本体）。
サムネイルを小さくした効果を、この 1 か所が打ち消していた。

## 対処

1. 隠しておく画像（modal・タブ・アコーディオンの中）には**全部** `loading="lazy"` を付ける
2. 開くときに読み始めたい画像は、開く直前に `img.loading = "eager"` に変える（属性を変えた時点で読み始める）。
   gonin は Bootstrap の `show.bs.modal`（幕が出る前）で「いまの 1 枚と前後」だけを eager にしている
3. 「読まれていないはず」は**実測で確かめる**＝ページを開いただけの状態で
   `performance.getEntriesByType("resource")` を見て、隠した画像の URL が無いことを見る

## なぜ気づきにくいか

見た目には何も変わらないので、開発者ツールのネットワーク欄か通信量でしか分からない。
「隠しているから読まれない」という直感が外れているのが原因で、lazy を付けた枚数を数えるより、
**隠した `<img>` に lazy が付いていないものが 0 か**を機械で見るほうが確実。
