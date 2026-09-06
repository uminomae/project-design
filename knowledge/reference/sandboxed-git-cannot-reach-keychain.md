# サンドボックスの中から macOS キーチェーンに届かない（git push / gh が落ちるのは TLS ではなく認証情報）

**確認日**: 2026-09-06
**一次ソース**: Claude Code 公式ドキュメント「Configure the sandboxed Bash tool」
https://code.claude.com/docs/en/sandboxing
（Troubleshooting の "Go-based CLIs fail TLS verification on macOS: tools such as `gh`, `gcloud`, and
`terraform` … List these tools in `excludedCommands` to run them outside the sandbox" と
"If the same git command fails often, add it to `excludedCommands`"）
と、investing#2 での実測（Claude Code 2.1.231 / macOS 24.6.0）

---

## 事実

サンドボックスされた Bash から `git push` すると、こう落ちる。

```
fatal: could not read Username for 'https://github.com': Device not configured
```

**これは TLS の失敗ではなく認証情報の失敗**。git の credential helper が `osxkeychain` で、
サンドボックスの中からキーチェーンに届いていない。`gh` が `Bad credentials` を返すのも同じ原因で、
**トークン自体は正常**（サンドボックス外で `gh auth status` を叩けば `Logged in (keyring)` と出る）。

`~/.ssh` はサンドボックスの denyRead なので、SSH 鍵に逃がす経路も使えない。

## 対処＝`sandbox.excludedCommands`

`.claude/settings.json`（コミットされる正本でよい）に置く。

```json
"sandbox": {
  "excludedCommands": [
    "git push", "git push *",
    "git fetch", "git fetch *",
    "git pull", "git pull *",
    "git ls-remote", "git ls-remote *",
    "gh", "gh *"
  ]
}
```

裸とワイルドカードの2形で入れてある。**マッチ構文は公式に明記されていない**（例は `docker *` の形だけ）。

除外されたコマンドはサンドボックス**外**で走るので通常の permission flow に乗るが、
`~/.claude/settings.json` が `Bash(*)` を allow していれば**承認プロンプトは出ない**。
`excludedCommands` と `allowUnsandboxedCommands` はどちらも Scope が "Any file" ＝ project 設定でも効く。

## 存在しない設定を探さないこと

**`sandbox.network.allowMachLookup` は無い。** キーチェーンは Mach サービスなので
「Mach lookup を許可すれば中から使える」と考えたくなるが、そういうキーは提供されていない。
サンドボックスの外に出す以外に道はない。

## これが起こす実害（無人実行では致命的）

サンドボックスの失敗を見た Claude は `dangerouslyDisableSandbox: true` でリトライしようとする。
**これは承認プロンプトを出す。ローカルの承認プロンプトにタイムアウトは無い**
（`dialogExpiry` はリモート転送時のみで、`Local-only permission prompts (no remote client) are unaffected`）。
定期タスクのような無人セッションはそこで**永久に止まる**。しかも走りっぱなしのセッションが残ると
次の枠が出ないので、その自動化そのものが死ぬ。

実測（2026-09-06）:

| repo | 何が起きたか |
|---|---|
| investing | `investing-artifact-refresh` が Artifact 上書きの直後に止まり、db への書き戻しに到達しなかった |
| project-design | `weekly-periodic-review` の 2 回の実行（8/10・8/24）が、`git push origin develop` のリトライで**途中で切れた** |

**pd のほうは「定期実行が死んでいた」のではない。** 週次レビューは 7/6 から 9/7 まで毎週走っていて、
レビュー成果物も全部コミットされている。止まったのはその回の後半だけで、次の枠はふつうに出ている。
（初報で「10 日間止まっていた」と書いたのは
[task-watchdog](https://github.com/uminomae/investing/blob/main/scripts/task-watchdog.py)
の誤検出。終わった実行を除いていなかった → [[claude-session-store-on-disk]]）

**実害の出方は「自動化が死ぬ」ではなく「その回の後始末が飛ぶ」**。investing の例では db が
`running` のまま残り、ページの更新ボタンが押せなくなった。気づきにくいのはどちらも同じ。

## 注意

- **`sandbox.allowUnsandboxedCommands: false`（strict mode）で塞ぐ手もあるが、副作用が大きい**。
  `dangerouslyDisableSandbox` が完全に無視されるので、`git worktree prune` のように
  サンドボックス外実行が本当に要る作業が**対話セッションでも打つ手なしで失敗**する。
  investing では採らなかった〔本人・2026-09-06〕
- **サンドボックス外実行が要る操作は他にもある**（実測）: `launchctl bootstrap`（`Input/output error`）、
  `osascript` の `display notification`（Apple Events が塞がれていて `0:20 syntax error`）、
  `.git/worktrees/` の削除（`Operation not permitted`）
- **設定はセッション開始時に読まれる**が、実測では走行中のセッションにも数十秒で反映された
  （1 回目は失敗、2 回目で成功）。効かないときは一度セッションを立て直して確かめる
- **たまに素通りせず落ちることがある**（2026-09-06・除外を入れたあとの `git push origin develop` が
  1 度だけ `Device not configured` で失敗し、**同じコマンドを単独で打ち直したら成功した**）。
  複合コマンド・heredoc との同居を疑って 3 パターン試したが**再現しなかった**ので、原因は未特定。
  実務上は **push を単独のコマンドとして打ち、落ちたら 1 度打ち直す**。
  無人タスクではここでリトライさせない（`dangerouslyDisableSandbox` に手が伸びる）
