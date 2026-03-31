# knowledge/research/

調査レポートのハブ。テーマ別にサブディレクトリを切って管理する。

## 配置判断の経緯

当初 `techo/inquiry/` や `knowledge/pd/` 等が候補に挙がったが、project-design リポの `knowledge/research/` に集約する方針で確定（2026-03-31）。理由:

- 調査資産の一元管理（リポ横断の参照を避ける）
- テーマ別サブディレクトリで拡張性を確保

## サブディレクトリ

| ディレクトリ | 内容 |
|---|---|
| `trust/` | trust 系の調査・深掘り・インデックス（17ファイル） |
| `design-thinking/` | design thinking 系の調査・深掘り・インデックス |
| `value/` | value 系の調査 |
| `origin-survey/` | 起源・語源調査 |
| `meta/` | テーマ横断メモ・評価メモ |
| `ninja/` | 個別テーマ外の作業メモ・補助資料 |
