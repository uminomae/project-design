# SETUP — 環境構築手順

## 前提

- macOS
- Python 3（`python3 -m http.server` で開発サーバーを起動）
- Node.js（テスト用: puppeteer）
- Git

## リポジトリ取得

```bash
git clone https://github.com/uminomae/project-design.git
cd project-design
npm install  # puppeteer（レスポンシブテスト用）
```

## 開発サーバー

| 項目 | 値 |
|------|------|
| URL | `http://localhost:3004/` |
| 起動スクリプト | `serve.sh`（python3 http.server） |
| launchd plist | `~/Library/LaunchAgents/com.uminomae.project-design.plist` |
| ログ | `~/Library/Logs/project-design.log` |

### 起動方法

**推奨: launchd（常駐）**

```bash
# 初回登録（RunAtLoad で自動起動）
launchctl load ~/Library/LaunchAgents/com.uminomae.project-design.plist

# 停止
launchctl unload ~/Library/LaunchAgents/com.uminomae.project-design.plist

# 状態確認
lsof -i :3004 -P
```

**手動起動**

```bash
bash serve.sh
```

## テスト

```bash
npm test  # レスポンシブ品質テスト（puppeteer）
```

## CI

GitHub Actions で `static-checks.js` が push/PR 時に自動実行される。

- シェーダー整合性チェック
- クエリリンク整合性チェック

## ディレクトリ構造

```
project-design/
├── CLAUDE.md          # ルール正本
├── AGENTS.md          # Codex 向けガイド（CLAUDE.md を参照）
├── GLOSSARY.md        # 用語集
├── index.html         # ランディングページ
├── src/               # CSS・JS・シェーダー
├── content/           # MD コンテンツ（about, knowledge）
├── knowledge/         # 調査・探索データベース
├── docs/              # プロジェクト文書
├── .claude/           # CLI ルール・スクリプト・エージェント
│   ├── rules/         # 運用ルール
│   ├── scripts/       # 自動化スクリプト
│   ├── agents/        # エージェント定義
│   └── skills/        # スキル定義
└── .cache/            # セッション状態・inbox・outbox
    ├── session/       # state.md・セッションログ
    ├── inbox/         # CLI への指示
    ├── outbox/        # CLI からの報告
    └── active/        # 進行中タスク計画
```
