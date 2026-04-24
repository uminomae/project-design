# CLAUDE.md

プロジェクトデザイン論の探索・構造化・管理拠点。

## このファイルの位置づけ

**権限・起動手順・branch ルールの正本は本ファイル。**
競合した場合は `CLAUDE.md` を優先する。本ファイル更新時は `docs/README.md` も同時に確認すること。

## プロジェクト概要

- `project-design` は「プロジェクトデザイン論」を探索する独立モジュール
- プロジェクト = 「やること（Doing）」＋「起きていること（Being）」を含む出来事
- Love 駆動開発: 関係・感情・意図が駆動する局面に名前を与える試み
- 調査資産を `knowledge/evidence/` に蓄積し、`transform/` で公開用に整形する
- **公開 MD の正本は `pjdhiro` に残す**（creation-space と同じパターン）

## コンテンツ源（pjdhiro 正本）

| pjdhiro 上のパス | 内容 |
|---|---|
| `_pages/pd/project-design.md` | PD 総論（射程・領域・Doing/Being・Love駆動開発） |
| `_pages/pd/dialogue/` | 対話記録 7篇（創造、受容、場と時代、概念共有、精神、PD、2025） |
| `_pages/pd/thinking/` | 思考法（欠損駆動思考、BI思考） |
| `_pages/pd/emotional-processing/` | 感情処理 7篇（瞑想、情動伝染、感情メタ認知、心理的境界、価値、受容、総論） |
| `_pages/pd/word/` | 用語定義（プロジェクト、その他） |

## 絶対原則

- **D1-D4 表記禁止（暫定ルール）**: 欠損駆動思考の概念を「D1」「D2」「D3」「D4」等の定義番号で参照してはならない。これは LLM が勝手に作った体系であり pjdhiro が定めたものではない。概念は必ず用語名（欠損駆動思考、欠損、抱持、情動の構成 等）で記述する。「D1-D4 の定義体系」「コア定義 D1-D4」のような表現も禁止。既存ファイルで D1-D4 表記を発見した場合は用語名に置換する。コア概念は固定された4つではなく進化中である。（このルールは概念体系が安定したら破棄する）
- **保持論点を急いで解くな**。不快と混乱は保持論点として残す
- **AI多数派バイアス保護**: 独自の主張を通説に丸めない
- **[P][M][S]タグ**: [P]確立事実 / [M]比喩的解釈 / [S]推測仮説。最終出力には含めない
- 対話する人間の固有名詞は **pjdhiro** を使用
- **取り消せない操作、価値判断を伴う操作は pjdhiro の明示的承認なしに実行しない**
- **デザインルールは対話から拾って常にブラッシュアップする**: pjdhiro との UI 対話で生まれたデザイン判断（採用・却下とも）は `docs/DESIGN-RULES.md` に同一セッション内で反映する。品質管理の一環であり、ルールの陳腐化を防ぐ
- **wiki compile 後の文字化けチェック**: wiki/*.md にファイルを書き込んだ後、`grep -rl '�' wiki/ --include='*.md'` で UTF-8 置換文字（U+FFFD）が混入していないか検証する。LLM が日本語テキストを生成する際に文字化けが発生する既知の問題への対策

<important if="you are writing or modifying JS/TS files">

## コーディング禁止事項

- **JS/TS ファイルでシェルエスケープを使ってはならない**。具体的に禁止するパターン:
  - `\!` → `!` と書く（`!==`, `!value` 等）
  - `` \` `` → `` ` `` と書く（テンプレートリテラル）
  - `\${` → `${` と書く（テンプレートリテラル内の式展開）

</important>

## 共通 hooks の正本管理

### 原則

**共通 hooks は pd (project-design) に正本を置き、各 repo は相対シンボリックリンクで参照する。**

pd の `.claude/hooks/` を更新すれば、cs・ks・as に自動反映される。

### 共通 hooks リスト

| ファイル | 用途 |
|---------|------|
| `_common` | 全 hook の共通関数ライブラリ |
| `backslash-bang-guard.sh` | JS/TS への `\!` `\`` `\${` 混入をブロック |
| `credential-guard.sh` | 機密情報参照を検出 |
| `destructive-command-guard.sh` | 破壊的コマンドを警告 |
| `exfil-guard.sh` | Bash での外部送信を検出 |
| `instruction-lint.sh` | CLI 指示書の必須項目チェック |
| `instruction-prereq-guard.sh` | CLI 指示書作成前の必読ファイル確認 |
| `session-start-guard.sh` | セッション開始時の基本チェック |

### 各 repo での参照方法

各 repo の `.claude/hooks/` 内に、以下の相対パスで symlink を作成する:

```bash
ln -sf ../../../project-design/.claude/hooks/{file} .claude/hooks/{file}
```

### repo 固有 hooks

共通 hooks リストに含まれないファイル（例: `state-lock-guard.sh`, `design-system-guard.sh`）は各 repo 内で管理する。

### 同期検証

`scripts/verify-hooks-sync.sh` で全 repo のリンク状態を検証する。

## design-system の正本管理

### 原則

**design system (tokens / components) は pd に正本を置き、3 repo (kesson / creation / awareness) から参照する。**

pd の `design-system/` を更新すれば、3 repo に反映される（参照方式は pd#86 ADR 決着による）。

### 配置

| ファイル | 用途 |
|---------|------|
| `design-system/tokens.css` | `--ds-*` 共通 token（現状 44 個、拡張可） |
| `design-system/components.md` | SYSTEMIZE 候補 component の仕様記述（pd#90 で拡充予定） |
| `design-system/tokens.json` | Claude Design 連携用の構造化データ（pd#91 で整備予定） |
| `design-system/README.md` | 三層構造の説明 + 参照ガイド |

### 三層構造

| Layer | Prefix | 管轄 | 配置 |
|-------|--------|------|------|
| メタ共通 | `--ds-*` | 3 repo 値一致 token | pd `design-system/tokens.css` |
| pd 固有 | `--pd-*`（統一予定、現状 `--bg / --ink / --gold / --navy / --coral / --glass-* / --glow-*`） | pd の light theme + warm + glow | pd `src/styles/tokens.css`（既存維持） |
| repo 個性 | `--kesson-* / --cs-* / --as-*` | intentional difference | 各 repo `src/styles/tokens.css`（既存維持） |

**注**: pd 固有の prefix 統一は pd#88 で追跡。`--kesson-*` prefix の cross-repo 汚染整理は techo#128 で追跡。

### 各 repo での参照方法（現状: 相対 import）

3 repo の `src/styles/tokens.css` 冒頭に以下を配置:

```css
@import url('../../../project-design/design-system/tokens.css');
```

各 token は `var(--ds-*, <既存値>)` で fallback 付き alias 化する。`@import` が解決できない場合も fallback で従来動作。

**注**: 相対パス方式は本番 deploy (GitHub Pages 別 URL prefix) で解決しない可能性がある。**採用方式は pd#86 ADR で決定**（CDN / submodule / build-time inline / 絶対パスの比較）。

### 新規 repo 立ち上げ時の手順

1. `src/styles/tokens.css` を作成
2. 冒頭に `@import url('../../../project-design/design-system/tokens.css');`（ADR 決着後は採用方式に従う）
3. 必要な `--ds-*` を `var(--ds-*, <初期値>)` で alias、repo 個性 token は `--{repo}-*` prefix で定義
4. `src/styles/tokens.css` 以外で `--ds-*` を直接参照しない（alias 経由のみ）

### 参考

- pd#84 (CLOSED) — design-system/ 新設、`--ds-*` 44 token
- pd#86 — import 方式 ADR
- pd#88 — pd 固有 token の `--pd-*` prefix 統一
- pd#90 — components.md 拡充
- pd#91 — Claude Design 連携口整備
- techo#126 — design system 集約の発端 issue
- techo#128 — `--kesson-*` prefix cross-repo 整理

## 委任レベル

| レベル | 例 |
|--------|-----|
| 自律実行 | ファイル読み取り、state.md更新、同期チェック、inbox管理 |
| 確認後実行 | ファイル削除・統合、ルール変更 |
| pjdhiro専権 | しっくり感チェック、保持論点の解消、理論の最終採否、公開判定 |

**永続承認**: セッション終了時に pjdhiro が承認した操作は永続的に有効。
**dev/ 以下の push**: dev/ 配下の全リポジトリは push まで自律実行してよい（2026-03-19 pjdhiro承認）。

## パス定数

| 用途 | パス |
|------|------|
| state.md | `.cache/session/state.md` |
| inbox | `.cache/inbox/` |
| outbox | `.cache/outbox/` |
| active | `.cache/active/` |
| セッションログ | `.cache/session/log-{YYYYMMDD}-{seq}.md` |

## 開発サーバー

詳細は `SETUP.md` を参照。以下は要約:

macOS launchd でローカルサーバーを常駐させる。スクリプトの手動実行ではなく **launchd が正規の起動方法**。

| 項目 | 値 |
|------|------|
| URL | `http://localhost:3004/` |
| 起動スクリプト | `serve.sh` |
| launchd plist | `~/Library/LaunchAgents/com.uminomae.project-design.plist` |
| ログ | `~/Library/Logs/project-design.log` |

### 操作コマンド

```bash
# 起動（通常は RunAtLoad で自動起動）
launchctl load ~/Library/LaunchAgents/com.uminomae.project-design.plist

# 停止
launchctl unload ~/Library/LaunchAgents/com.uminomae.project-design.plist

# 状態確認
lsof -i :3004 -P
```

<important if="this is the beginning of a session">

## セッション開始手順

1. **state.md を読む**: `.cache/session/state.md`
2. **同期チェック**: `git branch --show-current` → develop確認、HEAD vs remote
3. **inbox/active 確認**
4. **現状報告** → pjdhiro にタスクを選んでもらう

</important>

## Git 規約

- 作業ブランチ: **develop**（main はマージ=公開。pjdhiroが判断）
- `Co-Authored-By: Claude <noreply@anthropic.com>` を含める
- push権限は §委任レベル に従う

<important if="the session is ending or user requests session end">

## セッション終了時（必須）

1. state.md を **Read-Before-Write** で更新
2. セッションログ作成: `.cache/session/log-{YYYYMMDD}-{seq}.md`
3. state.md に最終コミットSHA・次セッションへの指示

</important>

## 自律権限

### 自律pushできる範囲
- evidence/ の調査データ
- state.md / session log / inbox 整理
- knowledge/ のデータ追加・更新

### pjdhiro承認が必要
- CLAUDE.md / .claude/rules/ の変更
- docs/ の構造的変更
- develop → main マージ
- 新しいIssueの作成
- `design-system/tokens.css` の token 追加・削除・rename（3 repo 波及のため）

## 関連リポジトリ

| リポジトリ | 関係 |
|---|---|
| `pjdhiro` | 公開先。`_pages/pd/` の MD をホスティング |
| `kesson-driven-thinking` | 欠損駆動思考の探索拠点。PD の重要部品 |
| `creation-space` | 「創造のモデル」を独立構築する拠点。PD 論の基盤部品として引用する（詳細: `.claude/rules/cs-as-component.md`） |
| `kesson-space` | kesson-space サイト |

## 参照ガイド

タスク種別に応じた必読ファイルは `.claude/rules/docs-navigator.md` を参照。
