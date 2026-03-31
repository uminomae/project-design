# セッション管理ルール

## state.md プロトコル

パス: `.cache/session/state.md`

- **ローカル書き込み完了ごとに更新**（凍結防止の重要ルール）
- **Read-Before-Write**: 更新前に必ず最新を読む。読まずに書くとデータ消失の原因になる
- 構造: Git 状態 / 進行中 / 次のステップ / Hot Topics

### 必須トリガー

| タイミング | アクション |
|-----------|-----------|
| セッション開始 | state.md に「CLI 作業中」登録、HEAD SHA 更新 |
| Issue 作成時 | state.md に記録（同一ターンで） |
| commit & push | HEAD SHA を state.md に更新 |
| タスク完了 | state.md から除去、Issue にコメント |
| セッション終了 | 最終更新、セッションログ作成 |

## セッションログ

パス: `.cache/session/log-{YYYYMMDD}-{seq}.md`

セッション終了時に必ず作成。以下を含める:
- 基本情報（Issue番号、ブランチ、開始/終了コミットSHA）
- 作業内容と成果
- 変更ファイル一覧
- 未解決事項・保持論点
- 次セッションへの指示

## ハンドオフ

パス: `.cache/session/handoff-{FROM}-{YYYYMMDD}-{slug}.md`

| 方向 | 例 | 書き手 | 読み手 |
|------|---|--------|--------|
| DT → CLI | handoff-DT-20260325-policy.md | DT App | CLI |
| CLI → DT | handoff-CLI-20260325-report.md | CLI | DT App |

読了後、ファイル末尾に `## 読了: {reader} {date}` を追記。
読了済みハンドオフは次セッション開始時に `.cache/session/archive/` に移動可。

## inbox 運用

パス: `.cache/inbox/`

- 命名: `_instructions-{issue}-{slug}.md`, `REVIEW-{engine}-*`
- 処理完了後は `archive/` に移動

## review artifact 運用

レビュー成果物は inbox / outbox / reviews を分けて扱う。

- 送信記録: `.cache/outbox/REQ-{engine}-*`
- 親セッションまたは人間への返却: `.cache/inbox/REVIEW-{engine}-*`
- 履歴の正本: `.cache/reviews/{engine}/...`
- Codex 非同期 pending: `.cache/reviews/codex/pending/`

## DIC（成果物整合性チェック）

commit 時に以下を確認:
1. `git add` 対象ファイルの存在確認
2. inbox の残留確認
3. state.md との整合性
