# project-design

プロジェクトデザイン論の探索・構造化・管理拠点。

## プロジェクトデザインとは

プロジェクトデザインとは、プロジェクトの構想・設計・実行だけでなく、実行・管理の方法そのものを対象化し、構想・設計する営み。

- **射程**: 「やること（Doing）」と「起きていること（Being）」の両方を含む
- **焦点**: コミュニケーション（情報処理／感情処理）、とくに感情処理
- **駆動力**: Love 駆動開発 — 関係・感情・意図が駆動する局面

## ディレクトリ構造

```
project-design/
├── CLAUDE.md              # CLI エントリーポイント
├── README.md              # このファイル
├── knowledge/             # データベース層
│   └── evidence/          # 調査・探索データ
├── publish/               # 公開用出力先（正本は pjdhiro）
├── transform/             # 変換ルール・テンプレート
├── docs/                  # 管理書類
│   ├── README.md          # 管理ハブ
│   └── PROJECT.md         # プロジェクト憲章
├── scripts/               # ビルド・同期スクリプト
├── assets/                # 静的アセット
├── src/                   # Web UI（将来）
└── .claude/               # CLI 設定
```

## コンテンツ源

公開 MD の正本は `pjdhiro/_pages/pd/` に配置。本リポジトリは探索・構造化・管理の拠点。

| pjdhiro 上のパス | 内容 |
|---|---|
| `project-design.md` | PD 総論 |
| `dialogue/` | 対話記録 7篇 |
| `thinking/` | 思考法（欠損駆動思考、BI思考） |
| `emotional-processing/` | 感情処理 7篇 |
| `word/` | 用語定義 |

## 関連リポジトリ

| リポジトリ | 関係 |
|---|---|
| [kesson-driven-thinking](https://github.com/uminomae/kesson-driven-thinking) | 欠損駆動思考の探索拠点 |
| [creation-space](https://github.com/uminomae/creation-space) | 「創造とは」の探索拠点 |
| [kesson-space](https://github.com/uminomae/kesson-space) | kesson-space サイト |

## Git 規約

- `develop`: 作業ブランチ
- `main`: 公開用（develop → main マージは pjdhiro が判断）
