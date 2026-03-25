# state.md 同期ルール

## 必須トリガー

| タイミング | アクション |
|-----------|-----------|
| セッション開始 | state.md に「CLI 作業中」登録、HEAD SHA 更新 |
| Issue 作成時 | state.md に記録（同一ターンで） |
| commit & push | HEAD SHA を state.md に更新 |
| タスク完了 | state.md から除去、Issue にコメント |
| セッション終了 | 最終更新、セッションログ作成 |

## Read-Before-Write

state.md を更新する前に必ず最新を読む。読まずに書くとデータ消失の原因になる。
