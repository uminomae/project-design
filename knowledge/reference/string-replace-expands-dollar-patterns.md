# `String.prototype.replace` の置換文字列は `$` パターンを展開する（利用者の文は関数で渡す）

**確認日**: 2026-09-03
**一次ソース**: MDN「String.prototype.replace — Specifying a string as the replacement」
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement
と、gonin での再現（Node・`functions/_lib/posts.js`・commit 8e8367b）

---

## 事実

`str.replace(pattern, replacement)` の `replacement` が**文字列**のとき、その中の次の並びは特別に扱われる。
`pattern` が正規表現でなく**ただの文字列でも同じ**。

| 並び | 置き換わるもの |
|---|---|
| `$&` | 一致した部分そのもの |
| `` $` `` | 一致した部分より**前**の文字列ぜんぶ |
| `$'` | 一致した部分より**後**の文字列ぜんぶ |
| `$$` | `$` 1つ |
| `$1`〜`$99`・`$<name>` | 捕捉グループ（正規表現のとき） |

gonin では、雛形の目印 `<!--POSTS:psychology-->` を `html.replace(目印, カードの HTML)` で置き換えていた。
カードの HTML には利用者が書いた見出し・サマリー・解説が入る。見出しに `` 料金は$`です `` と書くと、
`` $` `` が「目印より前のページ全体」に展開され、**見出しの中に `<!doctype html>…` からの
ページ先頭が丸ごと入った**（11,000 バイトの雛形が 39,304 バイトに）。`$'` は HTML エスケープで
`$&#39;` になるので、こんどは `$&` が効いて目印コメントとゴミ文字が入る。`$$` は `$` が1つ消える。

HTML エスケープ（`& < > " '`）は `$` を触らないので、**エスケープしても防げない**。

## 対処

置き換え先を**関数で渡す**。関数の戻り値はそのまま入り、`$` は展開されない。

```js
html = html.replace(marker, () => cards);        // ○
html = html.replace(marker, cards);              // ×（cards に $ があると壊れる）
```

`replaceAll` も同じ規則。文字列連結（`html.split(marker).join(cards)`）でも避けられるが、
関数渡しがいちばん読み手に意図が伝わる。

## なぜ気づきにくいか

`$` の後ろに `&` `'` `` ` `` が来る文は日常ではまれで、テストデータには出てこない。
出るのは利用者が自由に書く欄（見出し・解説）だけなので、**「置換文字列に利用者の文を混ぜる」
コードを書いた時点で関数渡しにしておく**のが唯一の予防になる。
