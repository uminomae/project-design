# SEO・LLM 発見性ルール

## クエリリンク

- モーダルで表示する主要コンテンツには `?key` でダイレクトアクセスできるようにする
- 例: `?about` → About モーダルを開く
- モーダルを開いたら `history.pushState` で URL にクエリを追加する（アドレスバーに表示）
- モーダルを閉じたら `history.back()` または `history.replaceState` で URL からクエリを除去する
- ブラウザの戻る/進むボタンに対応する（`popstate` イベントでモーダルの開閉を同期）
- canonical URL はクエリなしの素の URL を維持する（`<link rel="canonical">` にクエリを含めない）

## 静的要約（SEO）

- モーダルコンテンツの要約を `#seo-content-summary`（`visually-hidden`）に静的 HTML で配置する
- クローラーが JS なしでもコンテンツを発見できるようにするため
- `<noscript>` ブロックにも同等の要約を含める

## 構造化データ

- 主要コンテンツは JSON-LD `@graph` に反映する
- About ページ相当のコンテンツは `WebPage` or `AboutPage` として記述する

## モーダル追加時のチェックリスト

新しいモーダルを追加するたびに以下を実施する:

1. `?key` クエリパラメータでダイレクトアクセスできるようにする
2. `#seo-content-summary` に静的要約を追加する
3. `<noscript>` に要約を追記する
4. JSON-LD `@graph` に構造化データを追加する
5. `dev-panel.js` の `DEV_LINKS` 配列にリンクを追加する
6. `sitemap.xml` にクエリリンク付き URL を追加する

## サイトマップ

- `sitemap.xml` にクエリリンク付き URL を含める
- モーダル追加時はサイトマップにもエントリを追加する

## robots.txt

- クエリ付き URL（`?about` 等）をブロックしない
- モーダルコンテンツはクローラブルに保つ

## 参考パターン（creation-space）

- `?domain=`, `?modal=`, `?guide=` でモーダルを開く
- `#seo-content-summary` に静的要約を配置
- `<noscript>` にフォールバックコンテンツ
