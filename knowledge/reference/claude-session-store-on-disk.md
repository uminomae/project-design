# デスクトップアプリのセッションはどこに置かれているか（`~/.claude/sessions/` には定期タスクが載らない）

**確認日**: 2026-09-06
**一次ソース**: この Mac の実測（Claude Code 2.1.231 / デスクトップアプリ）。
[investing の task-watchdog](https://github.com/uminomae/investing/blob/main/scripts/task-watchdog.py)
を書くために特定した。公式ドキュメントに記載は見つからないので、**アプリの更新で変わりうる**

---

## 事実

セッションの記録は**2 か所に分かれていて、置き場が種類ごとに違う**。

| 場所 | 何が載るか |
|---|---|
| `~/.claude/sessions/<pid>.json` | **対話セッションだけ**。`claude` プロセスが 1 つずつ持つ（`pid` / `cwd` / `kind: "interactive"` / `entrypoint: "claude-desktop"`） |
| `~/Library/Application Support/Claude/claude-code-sessions/<acct>/<org>/local_<uuid>.json` | **アプリ内のセッション全部**。定期タスク発のものもここ |
| `~/.claude/projects/<slug>/<cliSessionId>.jsonl` | transcript（会話の実体） |

**定期タスクのセッションは別プロセスではない**ので `~/.claude/sessions/` には出てこない。
ここを見て「定期タスクのセッションが見当たらない」と迷子になりやすい。

## `local_*.json` の使えるフィールド

```json
{
  "sessionId": "local_d7198a89-...",
  "cliSessionId": "570c4c7e-98a6-4b96-8fa7-2da41ccceae1",
  "cwd": "/Users/uminomae/dev/investing",
  "title": "【15分ごと・7〜25時】相場手帳 更新ボタンの受付",
  "model": "claude-haiku-4-5-20251001",
  "scheduledTaskId": "investing-artifact-refresh",
  "lastActivityAt": 1788666773458
}
```

- **`scheduledTaskId` があれば定期タスク発**。無ければ人が始めたセッション
- **`cliSessionId` が transcript のファイル名**。ディレクトリ名は `cwd` の `/` と `.` を `-` に潰したもの
  （`/Users/uminomae/dev/investing/.claude/worktrees/x` → `-Users-uminomae-dev-investing--claude-worktrees-x`。
  `/.` が `--` になるのはこのため）
- **`isRunning` は無い**。MCP の `list_sessions` は返すが、ディスク上には持っていない

## 「止まっている」をディスクから判定する

`isRunning` が無いので、transcript の形で見る。

**`isArchived` が false**（＝アプリがまだ走っている扱い）で、かつ
**最後の assistant メッセージが `tool_use` で、その `tool_result` が無く、
transcript が N 分更新されていない** → ツールの返りを待ったまま進んでいない。

承認プロンプトで固まった実績はどれもこの形（末尾が `(called Artifact)` / `(called Bash)`）。
→ [[sandboxed-git-cannot-reach-keychain]]

**`isArchived` を外すと誤検出する。** アプリは終わった実行を archived にするが、
**その transcript の末尾が返りの無い `tool_use` のまま終わっていることは普通にある**
（途中で切れた実行の名残）。ここを見落として、毎週完走している定期タスクを
「10 日間止まっている」と報告した（2026-09-06 の実例）。**「未応答の tool_use」は
死因の痕跡であって、いま待っている証拠ではない。**

読むときの注意:

- transcript には `last-prompt` / `frame-link` / `artifact-comment-monitor` のような
  **会話ではない行が混ざる**。`type` が `assistant` / `user` の行だけを見る
- `message.content` が配列でないこと（素のテキスト）もある

## できないこと

**アプリ内セッションは kill できない。** 別プロセスではないので相手がいない。
外から打てる手は「気づく」ところまでで、止めるのは人がサイドバーからやる。

## 注意

- 公式に文書化された配置ではない。**アプリの更新で壊れる前提**で、壊れても実害が出ない用途
  （検出・通知）に留める
- 使う側は `--session-dir` / `--project-dir` のように**置き場を差し替えられるようにしておく**と、
  合成データでテストできる（task-watchdog はそうしてある）
