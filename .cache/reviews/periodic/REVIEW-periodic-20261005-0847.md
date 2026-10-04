# Periodic Review: 2026-10-05 08:47

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL
前回: 2026-09-28 08:45 → 今回まで **7 日**（scheduler 正常発火。0928 回の `77dc18e` は origin 到達＝前回は完走）
チェックセット: PR-1〜PR-6
対象: `~/dev/*` の git repo **15 件**（前回と同数）

> **静止週 2 週目**。前回からの commit は gonin 63（うち launchd `garden:` 42・人の編集は裏山の造成構想 docs と shisan）、futari 2（#196 WiMAX 解約）、techo 2（origin 側のみ・ブーツ選定ログ）、pd 1（前回の定期レビュー自身）。
> **最優先の持ち越し＝myhome の未 push 2 commit が 8 日経っても未保全**。前回提案の「upstream 無しローカル枝」走査を今回試行したところ、古い未 push 枝を **kesson-space 1・pjdhiro 2** 追加で検出した。

## Summary

| repo | status | note |
|---|---|---|
| myhome | **WARN（2 週連続）** | `claude/issue-342-b754c8` の 2 commit（09-27・#342 H）が依然 upstream 無し・main 未到達。gonin [E] は今週も 0＝検出漏れ確定 |
| kesson-space | **INFO（新規検出）** | ローカル枝 `codexDT/kesson-about-modal-history`（2026-04-01）に remote 未到達 1 commit |
| pjdhiro | WARN | 不変（worktree 6.4GB・2 SVG 未判断）。**新規検出**：ローカル枝 `TV-dev-treneAlert`（2025-09-07）・`qt-codex`（2025-06-25）に各 2 commit が remote 未到達 |
| techo | **INFO（新規）** | ローカル main が origin より **behind 2**（PR #142/#143 マージ分の未 pull）。untracked `transform/note/note-rules-05-three-and-seven.md`（07-03 から **3 か月**） |
| project-design | WARN | state.md 未反映 **28 コミット・49 日**。inbox periodic **6 通**（本レポートで 7 通目）。テスト全緑 |
| creation-space | WARN | 不変（HEAD `7ed02a8`）。cs#242 **158 日** OPEN（updatedAt 04-30） |
| awareness-space | WARN | 不変。proposal **94 日**・`codex-worker-instruction.md:87` retired 参照（5 回連続） |
| gonin | INFO | ahead/behind 0。session-log-check 合計 **93・増分 0**（4 週連続不変）。[E] 0 |
| futari | PASS | 2 commit（10-02・#196）。同期済み |
| shaman-meta-site | INFO | 不変（remote なし・bundle なし・4 週連続） |
| uminomae.github.io / zenn-content / futari-gate-throwaway | PASS/INFO | 変化なし |
| kesson-driven-thinking / investing | SKIP | archived（state の `archived: true`）。kdt は origin/main と一致 |

## Findings（今週動いたもの・新規のみ）

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| **WARN（2 週連続・最優先）** | myhome | PR-1 | `claude/issue-342-b754c8`（worktree `.claude/worktrees/continuation-574b7f`）の `ec8a867` / `e5e43d2` が **remote 枝のどれにも含まれない**（`git branch -r --contains` 空）。この Mac が失われると消える | myhome の次セッションで push か main へマージ |
| **INFO（確定）** | gonin | PR-2 | `session-log-check.py` [E] が今週も **0 ブランチ**。myhome 枝は最終 commit から 8 日＝閾値 12h を大きく超える。**upstream 無しローカル枝を走査していない**ことがほぼ確定 | gonin 管轄：[E] に `for-each-ref refs/heads` で upstream 無し＆`--not --remotes` が非空の枝を追加 |
| **INFO（新規検出）** | kesson-space / pjdhiro | PR-1 | 試行した走査（`for-each-ref` で upstream 空 → `rev-list --count <b> --not --remotes`）で古い未 push 枝 3 本：ks `codexDT/kesson-about-modal-history`（04-01・1）／pj `TV-dev-treneAlert`（2025-09-07・2）／pj `qt-codex`（2025-06-25・2）。いずれも長期放置＝実験枝の可能性が高い | 中身を見て捨てるか push（pjdhiro）。急ぎではない |
| INFO（新規） | techo | PR-1 | ローカル main が origin/main より behind 2（`a3091c9` / `c5b1c9b`・PR マージ）。untracked `note-rules-05-three-and-seven.md`（07-03）が 3 か月残存。gonin [F] は「最終更新 3 時間より前」なのに拾っていない（untracked を対象外にしている可能性） | techo の次セッションで pull ＋ untracked の採否 |

### 不変の持ち越し（1 行一覧・前回提案に従い畳んだ）

- pd: state.md 28 コミット/49 日・inbox periodic 6 通・未コミット空行削除（0824〜）・二重生成 wiki 2 組（`D08_miller_2001_cohen-j-d` / `D15_dewey_1934_1934`・8 回連続）・`wiki-conflict-candidates` 14 本・`Session:` trailer 方針未決
- cs: cs#242 158 日・worktree debt cs 11GB ＋ pjdhiro 6.4GB ＋ pd 158MB（HEAD 不変のため再計測せず）
- pjdhiro: 2 SVG（route-ladder / weapon-radar・12.6KB）未判断・未マージ remote 枝 14 本
- as: `docs/templates/codex-worker-instruction.md:87` retired 参照・`proposal-pd115-f4prime-order-experiment.md` 94 日
- shaman-meta-site: remote/bundle なし（未 push 1 commit）・futari-gate-throwaway の去就・空 dir（myhome 4 / gonin 1 / futari 1）
- cs PR-6: 旧世代 SVG `font-family` 30/30＝凍結 INFO

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | fetch 後 diverged 0・ahead 0。behind は techo 2 のみ。dirty は pd 1（state.md）/ techo 1（untracked）。upstream 無しローカル枝の未 push：myhome 1・ks 1・pjdhiro 2・shaman 1 |
| PR-2 | Session hygiene | WARN | pd state.md 49 日・as proposal 94 日。gonin session-log-check 93・増分 0（[E] 検出漏れ確定・[F] も untracked 未対象の疑い） |
| PR-3 | Canonical reference drift | WARN | as `:87` の 1 件のみ（5 回連続）。他 hit は retired 宣言・履歴・RETIRED 本体（cs）で正当 |
| PR-4 | Quality smoke | **PASS** | `static-checks.js` **11/11**／`responsive-test.js` **5/5**（localhost:3004=200）／wiki U+FFFD **0**／`wiki-access-lint` OK（332 ページ・404 原典）／leak した headless Chrome **0**。`wiki-cross-check` は SKIP |
| PR-5 | Review queue health | WARN | codex pending **0**。前回以降の新規 REVIEW/REQ **0**。pd inbox periodic 6 通・二重生成 wiki・cs#242 |
| PR-6 | Publication staleness | **PASS** | 7 回連続。compared=0 / warn=0 / skipped=30（全 stub） |

## Resolved since last run

- なし（0928 follow-up はすべて不変）

## Skipped

| repo | check | reason |
|---|---|---|
| project-design | `wiki-cross-check --all` | 入力（pd wiki / cs）とも前回から不変（cs HEAD `7ed02a8`・pd は periodic commit のみ）＝結果同一が確実。`.cache/` への書き込みを避ける |
| cs / pjdhiro / pd | worktree 容量の再計測 | 各 repo の HEAD・worktree 構成が不変のため前回値を流用 |
| kesson-driven-thinking / investing | 全（kdt は origin 一致確認のみ） | archived |
| shaman-meta-site / futari-gate-throwaway | PR-2・PR-3・PR-6 | CLAUDE.md / `.cache` 規約なし |
| all | 修正・prune・削除・push（本レポート・state・inbox 以外） | SKILL §7 |

## Follow-up

1. **myhome `claude/issue-342-b754c8` の 2 commit を push / マージ**（2 週連続・保全問題・myhome 管轄）
2. **gonin `session-log-check` [E] に upstream 無しローカル枝を追加**（検出漏れ確定・gonin 管轄）。併せて [F] が untracked を見ているか確認
3. ks 1 本・pjdhiro 2 本の古い未 push ローカル枝の採否（pjdhiro・低優先）
4. techo の pull と untracked note の採否（techo 次セッション）
5. 以下は持ち越し一覧のまま（pjdhiro 判断待ち）

## 運用提案（pjdhiro 承認事項・提案のみ）

- **SKILL PR-1 に「upstream 無しローカル枝」走査を正式追加**: 今回試行で有効性を確認（新規 3 本検出）。手順＝`git for-each-ref --format='%(refname:short)|%(upstream)' refs/heads` で upstream 空 → `git rev-list --count <branch> --not --remotes` が 1 以上なら列挙
- **pd inbox への periodic 積み上げ**: 7 通目。最新 1 通だけ残す規約か、優先 1〜2 を該当 repo の Issue コメントで返す形への切替を再提案（3 回目）

## メタ

- FAIL 0 / WARN 6 repo（新規 0）/ INFO 新規 3 / 解消 0 / SKIP 2 repo
- 人の手が入ったのは gonin（裏山造成構想）・futari（#196）・techo（origin 側のブーツ選定）のみ。pd / cs / pjdhiro / as / myhome は静止（pd は 5 週連続で人のセッションなし）
- 定期レビューは検出と記録のみ。修正・prune・削除は未実行
- サンドボックス: `git fetch`・`gh`・`curl :3004`・`responsive-test`・`pgrep` はサンドボックス外で実行（既知）
