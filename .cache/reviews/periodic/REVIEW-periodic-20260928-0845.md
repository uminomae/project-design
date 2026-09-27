# Periodic Review: 2026-09-28 08:45

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL
前回: 2026-09-21 08:32 → 今回まで **7 日**（scheduler 正常発火。0921 回の `d1be0fe` は origin 到達＝前回は完走）
チェックセット: PR-1〜PR-6
対象: `~/dev/*` の git repo **15 件**（前回と同数）

> **今週は「ほぼ何も動かなかった週」**。前回からの commit は gonin 83（大半 launchd 自動・人の編集は garden / Wi-Fi 棚）、myhome 2、pd 1（前回の定期レビュー自身）だけ。**持ち越し 10 件は全て不変**。新規の実質的な指摘は **myhome の未 push 2 commit** の 1 件のみ。

## Summary

| repo | status | note |
|---|---|---|
| myhome | **WARN（新規）** | `claude/issue-342-b754c8`（worktree `continuation-574b7f`）に **09-27 の 2 commit（#342 H・network/U7 Outdoor）が main にも origin にも無い**。upstream 未設定・dirty 0。gonin `session-log-check` [E] は 0 と出しており**検出漏れ** |
| creation-space | WARN | 不変。worktree 13 件 **11GB**（救出不要は前回確定済み）。cs#242 **151 日 OPEN**（updatedAt 2026-04-30 のまま） |
| pjdhiro | WARN | 不変。worktree 6.4GB。未判断は 2 SVG（12.6KB）のみ |
| project-design | WARN | state.md 未反映 **27 コミット・42 日**。inbox periodic **5 通**（0824〜0921）。worktree 158MB。テスト全緑 |
| awareness-space | WARN | proposal **87 日**（6 回連続）・`codex-worker-instruction.md:87` retired 参照（**4 回連続**） |
| gonin | INFO | behind 3（全て launchd `garden:` 自動）。session-log-check 合計 **93・増分 0**（3 週連続不変） |
| shaman-meta-site | INFO | 不変（remote なし・bundle なし・**3 週連続**） |
| techo / futari / kesson-space / uminomae.github.io / zenn-content / futari-gate-throwaway | PASS/INFO | 変化なし |
| kesson-driven-thinking / investing | SKIP | archived（state の `archived: true`） |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| **WARN（新規）** | myhome | PR-1 | ローカル枝 `claude/issue-342-b754c8` に 2 commit（09-27 09:00・「network: access.md に U7 Outdoor／UniFi OS Server の節…」「U7 Outdoor の管理と IP の記録を実構成に合わせる」・#342 H）。**upstream 未設定＝origin に無い**、main へも未マージ。worktree `.claude/worktrees/continuation-574b7f`・dirty 0。**この Mac が失われると消える唯一の未保全 commit**。`git branch -r --no-merged main`（dev/CLAUDE.md 推奨）は remote しか見ないため、この形は拾えない | myhome の次セッションで push か main へマージ（#342 の進行側で判断） |
| **INFO（新規）** | gonin | PR-2 | `session-log-check.py` の [E]「main に届いていないコミット」が **0 ブランチ**と出た。上の myhome 枝は最終 commit から約 24h（閾値 12h 超）なので本来は該当するはず。**upstream 無しのローカル枝を走査対象にしていない**可能性 | gonin 管轄：[E] の走査対象に「upstream 無しのローカル枝（worktree 含む）」を足すか確認 |
| WARN | creation-space / pjdhiro / pd | PR-1・PR-5 | worktree debt **cs 11GB ＋ pjdhiro 6.4GB ＋ pd 158MB ≒ 17.6GB** 不変。cs#242 **151 日**・一度も更新なし。前回レポートで「定期レビューからの催促はこれで打ち止め」と宣言済み＝**今回は数値だけ記録** | 前回 follow-up #1〜#3 のまま（pjdhiro 判断） |
| WARN | pjdhiro | PR-1 | `bike-selection-height-eed99b/garage/assets/{route-ladder,weapon-radar}.svg`（6,045B / 6,558B・07-25）未判断のまま | gonin へ退避 or 捨てる（pjdhiro） |
| WARN | project-design | PR-2 | state.md 記載 HEAD `1a148bb`（08-17）→ 実 HEAD `d1be0fe`＝**27 コミット・42 日**。未コミットの空行 1 行削除も 0824 から不変。**pd で人のセッションが 4 週連続ゼロ** | 次の pd セッションで Read-Before-Write |
| WARN | project-design | PR-5 | inbox periodic **5 通**（本レポートで 6 通目）。前回メタで「pd inbox に積む follow-up は機能していない」と指摘済み | 下記「運用提案」参照 |
| WARN | awareness-space | PR-3 | `docs/templates/codex-worker-instruction.md:87` が retired `creation-space/skills/commit-review-with-log/SKILL.md` を参照（**4 回連続・1 行**）。他 hit は cs worktree 内の RETIRED 本体・CL-002 の複製で正当 | 87 行目を `project-design/.claude/skills/codex-review/` へ |
| WARN | awareness-space | PR-2 | `.cache/inbox/proposal-pd115-f4prime-order-experiment.md`（07-03）**87 日**・6 回連続 | 移送 or archive |
| WARN | project-design | PR-5 | 二重生成 wiki 2 組（`D08_miller_2001_*` / `D15_dewey_1934_*`）**7 回連続** | 削除候補 `_cohen-j-d` / `_1934`（pjdhiro 承認） |
| INFO | project-design | PR-4 | `wiki-conflict-candidates-*.md` は `.cache/` に **14 本**（0418〜0920）。本 run は **cross-check を実行しなかった**（下記 Skipped）ので 15 本目は作っていない | 古い分の archive ＋ `--no-write` 追加（軽微・pd 管轄） |
| INFO | shaman-meta-site | PR-1 | 1 commit・remote なし・bundle なし（**3 週連続**）。`investing.bundle` の前例あり | push か bundle（pjdhiro） |
| INFO | creation-space | PR-6 | 旧世代 SVG（インライン `font-family`）30/30＝凍結 INFO | cs#224 rebuild 待ち |
| INFO | project-design | PR-2 | 定期レビュー commit の `Session:` trailer 方針 未決（3 回連続） | 固定 trailer か例外登録か |

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | 全 repo 期待ブランチ・diverged 0。dirty は pd 1（state.md）/ techo 1 のみ。**新規：myhome の未 push ローカル枝 2 commit**。worktree debt 17.6GB 不変 |
| PR-2 | Session hygiene | WARN | pd state.md 42 日・as proposal 87 日。gonin session-log-check 93・増分 0（ただし [E] に検出漏れの疑い） |
| PR-3 | Canonical reference drift | WARN | as `:87` の 1 件のみ（4 回連続） |
| PR-4 | Quality smoke | **PASS** | `static-checks.js` **11/11**／`responsive-test.js` **5/5**（localhost:3004=200）／wiki U+FFFD **0**／`wiki-access-lint` OK（332 ページ・404 原典）／leak した headless Chrome **0**（3 週連続）。`wiki-cross-check` は SKIP |
| PR-5 | Review queue health | WARN | codex pending **0**。pd inbox periodic 5 通・二重生成 wiki 7 回連続・cs#242 151 日 |
| PR-6 | Publication staleness | **PASS** | 6 回連続。compared=0 / warn=0 / skipped=30（全 stub） |

## Resolved since last run

- なし（0921 follow-up 9 項目はすべて不変）。前回の「解消」4 件（cs 2 PDF 誤検知・cs 孤児の救出不要・pjdhiro garage 選別済み・investing SKIP 化）はそのまま維持

## Skipped

| repo | check | reason |
|---|---|---|
| project-design | `wiki-cross-check --all` | 実行ごとに `.cache/` へ 77KB を書く（前回 INFO）。**比較対象の pd wiki / cs とも前回 run から commit ゼロ**（cs HEAD `7ed02a8` 不変・pd は periodic commit のみ）＝結果が前回（pairs 300 / cs-missing 3 / pd-missing 2）と同じになるのは確実なので、書き込みを避けて省略 |
| kesson-driven-thinking / investing | 全（PR-1 の一致確認のみ） | archived |
| shaman-meta-site / futari-gate-throwaway | PR-2・PR-3・PR-6 | CLAUDE.md / `.cache` 規約なし |
| all | 修正・prune・削除・push（本レポート・state・inbox 以外） | SKILL §7 |

## Follow-up

1. **myhome `claude/issue-342-b754c8` の 2 commit を push / マージ**（新規・保全の問題なので最優先。myhome 管轄）
2. **gonin `session-log-check` [E] が upstream 無しのローカル枝を拾うか確認**（新規・gonin 管轄）
3. 以下は 0921 の follow-up のまま（pjdhiro 判断待ち）：cs#242 決着 → 17.6GB 掃除／pjdhiro 2 SVG／pd state.md・inbox 消化／as `:87` と proposal／shaman-meta-site 保全／二重生成 wiki／`wiki-conflict-candidates` 整理と `Session:` trailer 方針

## 運用提案（pjdhiro 承認事項・提案のみ）

- **持ち越しの圧縮**: 10 件が 3〜7 週連続で不変。毎週同じ表を再掲しても行動が起きていない（前回メタの結論）。次回からは「不変の持ち越し」を 1 行ずつの一覧に畳み、Findings は**その週に動いたもの・新規のもの**だけにするのが読み手の時間に見合う
- **PR-1 に「upstream 無しのローカル枝」を追加**: `git for-each-ref --format='%(refname:short) %(upstream)' refs/heads` で upstream 空かつ main 未到達の枝を列挙する。今回の myhome は既存の手順（`-r --no-merged`）でも gonin [E] でも拾えず、全 repo の `log --all --since` で初めて見えた
- **pd inbox への periodic 積み上げを止める**: follow-up が 6 通目に入る。前回提案どおり、優先 1〜2 は pjdhiro へ直接返す形（例：該当 repo の Issue コメント）へ切り替えるか、inbox の periodic は最新 1 通だけ残す規約にする

## メタ

- FAIL 0 / WARN 9（新規 1）/ INFO 5（新規 1）/ 解消 0 / SKIP 2 repo
- 人の手が入ったのは gonin（garden・Wi-Fi 棚）と myhome（#342 network）だけ。pd / cs / pjdhiro / as は 4 週以上ほぼ静止
- 今週唯一の実質的な発見は **「どの既存チェックにも引っかからない未 push commit」**。18GB の worktree debt と違い、こちらは**消えたら戻らない**種類のリスクなので優先度を上げた
- 定期レビューは検出と記録のみ。修正・prune・削除は未実行
- サンドボックス: `git fetch`・`gh`・`curl :3004`・`pgrep` はサンドボックス外で実行（既知）
