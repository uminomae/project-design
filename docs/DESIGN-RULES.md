# デザインルール — pd サイト公開ページ

## このファイルの位置づけ

pd サイトの VI（ビジュアルアイデンティティ）とUI品質基準の正本。
index.html を基準ページとし、**サイト配下の全公開 HTML ページ（サブページ・LP を含む）に適用される**。
CSS/HTML を編集する際はこのルールに準拠すること。
hook `ui-lint.sh` が機械的に検証可能な項目を自動チェックする。

## 0a. 公開ページ新設時の必須制約（2026-07-03, pjdhiro 指示により明文化）

**新しい公開ページ（LP・サブページ）を作るとき、以下は選択の余地がない必須制約である。**
（違反実例: `reader/three-and-seven.html` 初版が独自の warm-light テーマを新造し pjdhiro に却下された。§8b 参照）

1. **VI の新造禁止**: 新規ページは index.html の VI を継承する。独自のテーマ・パレット・タイポグラフィを発明しない
2. **透過するコンテンツ**: WebGL シェーダー背景（`#webgl-container`）の上にテキストが浮かぶ構造。`body` / コンテンツ層は `background: transparent`（§1・§6）
3. **グロークラス体系**: 可読性は `.glow-heading` / `.glow-text` / `.glow-card` / `.glow-link` で制御（§2）。独自の text-shadow / backdrop-filter を書かない
4. **カラーは既存 CSS 変数のみ**: `src/styles/tokens.css` の `--ink / --mid / --mute / --gold / --navy / --coral` 等。新色のハードコード禁止（§5）
5. **タイポグラフィ階層の継承**: `--serif-en` / `--serif-jp` / `--sans`、ウェイト 300/400、§4 のサイズ階層
6. **スタイルは `src/styles/` を再利用**: ページ内埋め込みの standalone CSS を新造しない。ページ固有スタイルが必要な場合も tokens と glow 体系の上に載せる
7. **レスポンシブ §3・機械検証 §7 の対象に含める**（responsive-test の URL 対象に追加）
8. **コンテンツパターン**: 主要概念には誤解FAQ アコーディオン（§9）を検討する
9. **着工前にこのファイルを必読**（docs-navigator「UI / CSS 変更」）。生成スクリプト経由でページを作る場合も、テンプレートがこの制約を満たすこと

## 0. 運用原則 — 対話駆動のブラッシュアップ

**このルールは完成品ではなく、pjdhiro との対話から継続的に更新される品質管理文書である。**

- pjdhiro との UI に関する対話で決定・変更・却下されたデザイン判断は、同一セッション内でこのファイルに反映する
- セッションログに UI 関連の議論が残っているのにこのファイルが未更新の場合、定期レビュー（`.claude/skills/periodic-review/SKILL.md`）が WARN を出す
- 「試して合わなかった手法」も記録する（§8 却下履歴）。同じ失敗を繰り返さないため
- CLI（Claude）はルールの提案・追記を行えるが、ルールの削除・根本的変更は pjdhiro 承認が必要

## 1. コンセプト

- **透過するコンテンツ**: WebGL シェーダー背景の上にテキストが浮かぶ
- **読みやすさ最優先**: 背景がどのシェーダーでも本文が読めること
- **静かな存在感**: 装飾は控え、余白と文字で構造を伝える

**背景シェーダーの負荷上限（2026-07-05 対話で確立）**: 背景はあくまで背景であり、**スクロールがカクつくほど重いシェーダーはランダム選択プールに入れない**。目安として、フルスクリーン @ devicePixelRatio 2 で毎ピクセルの反復が重いもの（体積レイマーチ×3Dノイズなど）は除外する。除外したファイルは削除せず `src/shaders/` に参照用として保持し、プール（`src/content/site-data.mjs` の `SHADER_PATHS`）のコメントに除外理由を書く。適用例: main2-webgpu（12ステップ体積レイマーチ）を除外し、main-webgpu・main3-webgpu・main4-webgpu の3本を選択（pjdhiro 報告「特定の背景でカクカクする」を受けた措置。当初 main3 も除外したが、pjdhiro の体感確認で重いのは1本だけと判明し、2026-07-05 に main3 を復帰）。

## 2. グロークラス体系

テキストの可読性は以下の3クラスで制御する。それ以外の箇所に個別の text-shadow / backdrop-filter を書かない。

| クラス | 用途 | 背景 | 枠 | ホバー |
|--------|------|------|-----|--------|
| `.glow-heading` | 見出し・ラベル | なし | なし | なし |
| `.glow-text` | 本文ブロック | なし | なし | なし |
| `.glow-card` | 情報カード（3カラム等） | 白パネル | ガラス枠 | なし |
| `.glow-link` | タップ対象（リンクカード） | なし | 下線 | 白背景+インデント |

### 禁止事項

- グロークラス以外で `text-shadow`, `backdrop-filter`, `background: rgba(255,255,255,*)` を使わない（menu-toggle / site-menu / lang-toggle / pill / about-trigger / about-modal / knowledge-modal は例外）
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
| `.pill`, `.glow-link`, `.menu-toggle`, `.lang-toggle button`, `.about-trigger`, `.about-modal__close`, `.knowledge-modal__close` | `44px` |

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
| .repo-card--feature の desc | --sans | 0.95rem | 300 |

**補助テキストの可読性（2026-07-03 対話で確立）**: シェーダー背景上の補助テキストに `--mute` を使うと白黒どちらの背景でも沈む。**色は本文と同じ `--mid` に上げ（`.glow-link span` のグローと併用で両背景対応）、階層差は色でなく文字サイズで付ける**（例: repo-card--feature は title 1.1rem / desc 0.95rem）。半透過白パネルの追加は §2 禁止事項（グロークラス外の background 禁止）に抵触するため採らない。
**読み物ページのコールアウト（2026-07-03 対話で確立）**: リード文・用語ほどき（📖）・仮説ボックス等の blockquote は、グローだけではシェーダーに輪郭が溶けるため、**`.glow-card` パネルに載せる**（ビルド時にクラス付与。§2 の枠内で背景を得る正規の方法）。

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

## 8. wiki 参照信頼性の原則（pd#113, 2026-06-16）

wiki/sources/ の各ページは、人間も Claude も本文に辿れる識別子を最低1つ持つ必要がある。

| 優先順位 | 識別子 | 備考 |
|---------|--------|------|
| 1 | DOI | 全ドメイン共通。書誌情報セクションに必ず記載 |
| 2 | PMID (PubMed) | 生命科学・医学・心理学系。EuropePMC REST で abstract 回収可能 |
| 3 | PMC ID | PMC 収録論文。フルテキスト回収可能 |
| 4 | arXiv ID | プレプリント系 |
| 5 | 安定 OA URL | archive.org / 機関リポジトリ等 |

**manifest_id**: cs source-note 由来のページは `source.manifest_id` に `DXX-SYY` 形式で記載する。

**wikilink の `/` 禁止**: 年号範囲を含むタイトル（例: `van Gennep 1909/1960`）へのタイトルベース wikilink は basename 誤抽出を引き起こす。`[[sources/FILE|ラベル]]` または aliases を使用すること。`wiki-lint.mjs` WL-6 が自動検出する。

## 8b. 却下履歴 — 試して合わなかった手法

再提案を防ぐために記録する。削除は pjdhiro 承認が必要。

| 日付 | 手法 | 理由 |
|------|------|------|
| 2026-03-26 | 本文テキストに text-shadow のみ（パネルなし）で可読性確保 | 0.9rem の本文ではグローが視認できない。見出しには有効だが本文には不十分 |
| 2026-03-26 | 全要素に同一の glow-panel パネルを適用 | 全部がブロックになり構造のメリハリが消える。見出し/本文/カード/リンクで差別化が必要 |
| 2026-07-03 | 公開 LP（reader/three-and-seven.html 初版）を index.html の VI と無関係な warm-light 独自テーマ（独自パレット #0F6E56 等・埋め込み standalone CSS・グロー体系なし・シェーダーなし）で新造 | **pjdhiro 却下（コンセプト不一致）**。公開ページはサイト VI（透過するコンテンツ + グロー体系 + 確立パレット）の継承が必須。§0a に明文化 |
| 2026-07-08 | READER の **720°二重被覆**を対話的 Micro-world で表現（「裏の針／糸の球／ベルト」の3描画を試作。`src/reader-microworlds.js`・数理は node 検証済み） | **pjdhiro 却下「720度に関するものがわかりづらい」（pd#128・720°の図だけ撤去）**。数理は正しくても、スピノル（720°）は抽象度が高く触れても直感に繋がらなかった。他の3図（複素数回転・四元数非可換・零因子）は有効として**維持**。対話的可視化が効く題材と効かない題材がある。再挑戦はしっくり来る表現の当てを得てから。経緯 RR-014 §G-3 |

## 9. 誤解FAQ アコーディオン（コンテンツパターン）

pjdhiro との対話で生まれたパターン（pd#110, 2026-05-31）。pd の AI協働サイトと pjdhiro 概念ページの両方に適用する。

**原則**: 対話で賢い読者（Claude を含む）が踏んだ誤解は、そのまま読者が知りたいこと。本文を簡潔・断定回避で保ちつつ、誤解を `<details>` アコーディオンに隠して併置する。

| 項目 | ルール |
|------|--------|
| 要素 | `<details><summary>よくある誤解</summary>…</details>`（JS ゲートしない） |
| 中身 | **誤解 → なぜ違うか → 正しい捉え方** の3点構成 |
| 位置 | 各主要概念の直後に添える。本文には混ぜない |
| 発見性 | 折りたたみでも DOM に載るのでクローラ・LLM は読める（seo-llm.md 準拠） |
| 蓄積 | 新たな誤解が吟味で出るたび pd#110 の表に追記してから実装する |

却下: 誤解を本文に直接書き込む案 → 本文が防御的になり読みにくい。折りたたみで「知りたい人だけ開く」形にする。

### 9a. 読み物アコーディオンの2種別（2026-07-05 対話で確立）

読み物ページ（reader）の `<details>` は**同列に並べない**。2種別を見た目で区別する:

| 種別 | 意味 | マークアップ | 見た目（reader.css） |
|------|------|-------------|---------------------|
| 「詳しく」 | 本筋の同じ話の深掘り | `<details>`（素） | glass カード＋影・開閉ラベル「詳しく」 |
| 「コラム」 | 本筋から独立した寄り道・補足 | `<details class="pd-column">` | 背景透過・破線枠・影なし・summary 縮小・開閉ラベル「寄り道」 |

背景: pjdhiro 指示「全く全体の話と無関係な事柄は同列に並べるべきでない。補足的な位置付けであることが明確な方が良い」。正本ルールは two-axis-closure README §3 ルール22。

## 10. Micro-worlds（触って直感できる対話的図・コンテンツパターン）

pd#128（2026-07-08）で確立。Litt 三技法の一つ「Micro-worlds」（CN-011 §2）を読み物に実装するパターン。読者が**その場で触って挙動を直感**できる対話的可視化を置く。現在 READER に3図（複素数回転・四元数非可換・零因子）。

| 項目 | ルール |
|------|--------|
| 配置 | 正本 MD に空のプレースホルダ `<div class="microworld glow-card" data-microworld="{kind}" role="group" aria-label="…">` を書く。中に `<p class="mw-title">` と `<p class="mw-fallback">`（no-JS 用の短い説明文）だけを置く |
| 実装 | `src/reader-microworlds.js`（vanilla・**依存ライブラリなし**）が `[data-microworld]` を探して canvas＋コントロールをマウントする。インライン `<script>` や埋め込み SVG は書かない（後処理で glow-card に二重包装されるため SVG は JS 生成に限る） |
| VI | §0a 準拠。色は `getComputedStyle` で tokens（`--ink/--navy/--gold/--coral/--mid/--mute`）を読む。新色ハードコード禁止。パネルは `glow-card`、スタイルは `reader.css` の `.mw-*` |
| 表示保証 | 折りたたみ `<details>` 内でも壊れないよう、サイズが実際に変わった時だけ canvas をクリアし（同幅の再代入で空白化しない）、`ResizeObserver`＋`<details>` の `toggle` で必ず再描画する |
| アクセシビリティ | コントロールは実体 `<button>`/`<input type=range>`（キーボード可・44px 以上）。状態は `aria-live` の `.mw-status` で読み上げる。JS 不可環境は `.mw-fallback` の文が残る（`.mw-ready` で JS 時のみ隠す・SEO/no-JS 発見性 seo-llm.md 準拠） |
| 正確さ | 図が主張する数理は機械検証してから出す（Cayley–Dickson 乗算・八元数の合成則・16元数零因子は node で検証） |
| 題材の向き不向き | **触れることが直感に効く題材だけ**に使う。抽象度が高い題材（例: 720°二重被覆＝スピノル）は、触れても直感に繋がらず却下された（§8b・RR-014 §G-3）。しっくり来る表現の当てを得てから採る |

却下しない代替として、静的 SVG は引き続き併用してよい（Micro-worlds は静的図を**置き換えず補う**）。監査は skill `reader-litt-conformance`。
