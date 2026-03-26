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

- グロークラス以外で `text-shadow`, `backdrop-filter`, `background: rgba(255,255,255,*)` を使わない（menu-toggle / site-menu / lang-toggle / pill は例外）
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
- タッチターゲット（pill, glow-link, menu-toggle 等）は最小 44x44px

## 4. タイポグラフィ

| 要素 | フォント | サイズ | ウェイト |
|------|----------|--------|----------|
| h1 | --serif-en | clamp(3.5rem, 10vw, 6rem) | 400 |
| h2 | --serif-jp | clamp(1.75rem, 4vw, 2.5rem) | 400 |
| h3 | --sans | 0.9rem | 500 |
| p（本文） | --sans | 0.9rem | 300 |
| p（明朝） | --serif-jp | 0.9rem-0.95rem | 300 |
| ラベル | --serif-en | 0.8rem | 400 |

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

## 7. 機械検証項目（ui-lint.sh で自動チェック）

1. index.html 内の `h1`, `h2`, `span.section-label`, `span.hero-label` に `.glow-heading` が付いているか
2. 本文ブロック（`.overview-text`, `.hero-notice`, `.being-desc`, `.future-text`）に `.glow-text` が付いているか
3. `.card` に `.glow-card` が付いているか
4. `.repo-card` に `.glow-link` が付いているか
5. style.css にグロークラス外の孤立した `text-shadow` がないか
6. style.css にハードコードされた色（#で始まる6桁）が `:root` 外にないか
7. viewport meta タグが存在するか
8. タッチターゲットの min-height/min-width が 44px 以上か（CSS 検証）

## 8. 却下履歴 — 試して合わなかった手法

再提案を防ぐために記録する。削除は pjdhiro 承認が必要。

| 日付 | 手法 | 理由 |
|------|------|------|
| 2026-03-26 | 本文テキストに text-shadow のみ（パネルなし）で可読性確保 | 0.9rem の本文ではグローが視認できない。見出しには有効だが本文には不十分 |
| 2026-03-26 | 全要素に同一の glow-panel パネルを適用 | 全部がブロックになり構造のメリハリが消える。見出し/本文/カード/リンクで差別化が必要 |
