# デザインルール — index.html ランディングページ

## このファイルの位置づけ

index.html の VI（ビジュアルアイデンティティ）とUI品質基準の正本。
CSS/HTML を編集する際はこのルールに準拠すること。
hook `ui-lint.sh` が機械的に検証可能な項目を自動チェックする。

## 0. 運用原則 — 対話駆動のブラッシュアップ

**このルールは完成品ではなく、pjdhiro との対話から継続的に更新される品質管理文書である。**

- pjdhiro との UI に関する対話で決定・変更・却下されたデザイン判断は、同一セッション内でこのファイルに反映する
- セッションログに UI 関連の議論が残っているのにこのファイルが未更新の場合、定期レビュー（cron-commit-review 3m-4）が WARN を出す
- 「試して合わなかった手法」も記録する（§8 却下履歴）。同じ失敗を繰り返さないため
- CLI（Claude）はルールの提案・追記を行えるが、ルールの削除・根本的変更は pjdhiro 承認が必要

## 1. コンセプト

- **透過するコンテンツ**: WebGL シェーダー背景の上にテキストが浮かぶ
- **読みやすさ最優先**: 背景がどのシェーダーでも本文が読めること
- **静かな存在感**: 装飾は控え、余白と文字で構造を伝える

## 2. グロークラス体系

テキストの可読性は以下の3クラスで制御する。それ以外の箇所に個別の text-shadow / backdrop-filter を書かない。

| クラス | 用途 | 背景 | 枠 | ホバー |
|--------|------|------|-----|--------|
| `.glow-heading` | 見出し・ラベル | なし | なし | なし |
| `.glow-text` | 本文ブロック | なし | なし | なし |
| `.glow-card` | 情報カード（3カラム等） | 白パネル | ガラス枠 | なし |
| `.glow-link` | タップ対象（リンクカード） | なし | 下線 | 白背景+インデント |

### 禁止事項

- グロークラス以外で `text-shadow`, `backdrop-filter`, `background: rgba(255,255,255,*)` を使わない（menu-toggle / site-menu / lang-toggle / pill / about-trigger / about-modal は例外）
- `.glow-card` と `.glow-link` を同じ要素に付けない
- `.glow-text` にパネル系プロパティ（background, backdrop-filter）を付けない

## 3. レスポンシブ

### ブレークポイント

| 名前 | 幅 | 用途 |
|------|-----|------|
| sm | max-width: 480px | スマートフォン |
| md | max-width: 768px | タブレット |
| lg | 769px 以上 | デスクトップ |

### 必須対応

- `.grid` は md 以下で `grid-template-columns: 1fr`
- 本文ブロックの `max-width` はビューポート幅を超えないこと
- `.container` の padding は sm で `0 1rem` 以上
- タッチターゲット（pill, glow-link, menu-toggle, about-trigger 等）は最小 44x44px

### 実装値一覧

#### md（max-width: 768px）

| 対象 | プロパティ | 値 |
|------|-----------|-----|
| `.container` | padding | `0 1.5rem` |
| `.hero h1` | font-size | `3rem` |
| `h2` | font-size | `2rem` |
| `section` | padding | `5rem 0` |
| `section` | min-height | `auto` |
| `.glow-card` | padding | `1.5rem` |
| `.glow-link` | padding | `1rem 1.5rem` |
| `.top-bar` | top / right | `1rem` |
| `.site-menu` | top / right | `3.5rem` / `1rem` |
| `.hero-notice, .overview-text, .being-desc, .future-text` | max-width | `100%` |

#### sm（max-width: 480px）

| 対象 | プロパティ | 値 |
|------|-----------|-----|
| `.container` | padding | `0 1rem` |
| `.hero` | padding | `4rem 0` |
| `.hero h1` | font-size | `2.5rem` |
| `.hero h1` | margin-bottom | `2rem` |
| `h2` | font-size | `1.5rem` |
| `h2` | margin-bottom | `1.5rem` |
| `section` | padding | `3rem 0` |
| `.glow-card` | padding | `1.25rem` |
| `.glow-link` | padding | `0.75rem 1rem` |
| `.pills` | gap | `0.5rem` |
| `footer a` | margin / font-size | `0 0.75rem` / `0.85rem` |

#### タッチターゲット（全幅共通）

| 対象 | min-height |
|------|-----------|
| `.pill`, `.glow-link`, `.menu-toggle`, `.lang-toggle button`, `.about-trigger`, `.about-modal__close` | `44px` |

## 4. タイポグラフィ

### フォントサイズ階層

| 階層 | サイズ | 対象 |
|------|--------|------|
| 最小（prose block） | 0.95rem | hero-notice, overview-text, being-desc, future-text の p |
| 標準 | 1rem | タップ対象（pill, menu-toggle, lang-toggle button, footer a, site-menu a）、カード内（card p, card li, repo-card__desc）、h3 |
| ラベル（例外） | 0.75-0.8rem | hero-label, section-label, menu-label（装飾ラベルはタップ対象外のため例外） |

**ルール**: prose block（0.95rem）が本文の最小値。タップ対象・カード内・見出しは 1rem 以上。ラベル類のみ例外。

### 要素別一覧

| 要素 | フォント | サイズ | ウェイト |
|------|----------|--------|----------|
| h1 | --serif-en | clamp(3.5rem, 10vw, 6rem) | 400 |
| h2 | --serif-jp | clamp(1.75rem, 4vw, 2.5rem) | 400 |
| h3 | --sans | 1rem | 500 |
| p（汎用） | --sans | 0.95rem | 300 |
| p（prose block） | --serif-jp | 0.95rem | 300 |
| card p / card li | --sans | 1rem | 300 |
| タップ対象 | 各種 | 1rem | 400 |
| ラベル | --serif-en | 0.75-0.8rem | 400 |

## 5. カラー

CSS 変数のみ使用。ハードコードされた色は禁止。

| 変数 | 値 | 用途 |
|------|-----|------|
| --ink | #0f172a | 見出し・強調テキスト |
| --mid | #334155 | 本文テキスト |
| --mute | #94a3b8 | ラベル・補助テキスト |
| --gold | #8a7040 | カード見出し（Doing 系） |
| --navy | #2e3a6e | Being 系アクセント |
| --coral | #b04050 | Doing 系アクセント |

## 6. 構造ルール

- `#content` は `background: transparent`（シェーダー表示のため）
- `body` は `background: transparent`
- セクションごとに `min-height: 100vh`
- 各構成要素が `.glow-heading` / `.glow-text` / `.glow-card` / `.glow-link` のいずれかを持つこと
- prose 系本文ブロック（hero / overview / being / future）は `.prose-block` で共通化し、タイポグラフィ設定を個別に複製しない
- UI の振る舞いは `src/app.js` に集約し、`index.html` に `onclick` やインライン `<script>` を残さない

## 7. 機械検証項目

### 7a. 静的チェック（ui-lint.sh — PostToolUse hook）

1. index.html 内の `h1`, `h2`, `span.section-label`, `span.hero-label` に `.glow-heading` が付いているか
2. 本文ブロック（`.overview-text`, `.hero-notice`, `.being-desc`, `.future-text`）に `.glow-text` が付いているか
3. `.card` に `.glow-card` が付いているか
4. `.repo-card` に `.glow-link` が付いているか
5. style.css にグロークラス外の孤立した `text-shadow` がないか
6. style.css にハードコードされた色（#で始まる6桁）が `:root` 外にないか
7. viewport meta タグが存在するか
8. タッチターゲットの min-height/min-width が 44px 以上か（CSS 検証）
9. `user-scalable=no` または `maximum-scale=1` を使っていないか（WCAG 1.4.4）
10. CSS に `orientation` ロックがないか（WCAG 1.3.4）

### 7b. ブラウザチェック（responsive-test.sh — 定期実行）

Puppeteer で `http://localhost:3004/` に対して実行。根拠は WCAG 2.2 AA。

| # | チェック | 根拠 | 閾値 |
|---|---------|------|------|
| B1 | 320px 幅で横スクロールなし | WCAG 1.4.10 Reflow | `scrollWidth <= clientWidth` |
| B2 | 768px 幅で grid が 1カラム化 | §3 必須対応 | `grid-template-columns: 1fr` |
| B3 | 200% zoom で水平オーバーフローなし | WCAG 1.4.4 Resize Text | `scrollWidth <= clientWidth` |
| B4 | タッチターゲット実測 44x44px 以上 | WCAG 2.5.5 (AAA) | `boundingRect >= 44` |
| B5 | フォント最小 12px | Lighthouse 基準 | 全テキスト要素 `fontSize >= 12` |

実行: `npm test` または `bash .claude/scripts/responsive-test.sh`

## 8. 却下履歴 — 試して合わなかった手法

再提案を防ぐために記録する。削除は pjdhiro 承認が必要。

| 日付 | 手法 | 理由 |
|------|------|------|
| 2026-03-26 | 本文テキストに text-shadow のみ（パネルなし）で可読性確保 | 0.9rem の本文ではグローが視認できない。見出しには有効だが本文には不十分 |
| 2026-03-26 | 全要素に同一の glow-panel パネルを適用 | 全部がブロックになり構造のメリハリが消える。見出し/本文/カード/リンクで差別化が必要 |
