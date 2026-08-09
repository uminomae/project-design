# Periodic Review: 2026-08-10 08:32

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL（`project-design` が兄弟に存在）
前回: 2026-07-20 08:31 → 今回まで **21 日**（scheduler が 2 回分スキップされた可能性あり）
チェックセット: PR-1〜PR-6

## Summary

| repo | status | note |
|---|---|---|
| project-design | WARN | state.md が 7/17 から更新停止（HEAD プレースホルダ継続・以後 3 commit 分のログ不在）/ worktree 残骸 4 件（全て develop の祖先＝prune 安全と確認）/ auto-execute inbox が 21 日間未消化 / 0720 の REVIEW-periodic が inbox 滞留。本体は clean・remote 同期・static 11/11 |
| creation-space | WARN | evidence>SVG staleness 30 領域は **mtime 由来ではなく git 履歴でも実在**と今回確定（4/07-08 の一括 evidence 更新が SVG へ未伝播）/ inline font-family SVG 30 件 / **未登録の worktree ディレクトリ 10 件・8.7GB がディスクに残存**（新規検出） |
| kesson-driven-thinking | WARN | retired command `parallel-dispatch.md` / `codex-dispatch.md` が `.claude/commands/` に残存（PR-3・アーカイブ予定 repo のため低優先） |
| pjdhiro | PASS | 0720 の behind 1 は解消（remote 同期）。garage/img/ untracked のみ |
| awareness-space | PASS | clean・同期 |
| kesson-space | PASS | clean・同期 |
| techo | PASS | untracked note 1 件のみ（軽微） |
| myhome | PASS | clean・同期（本日 commit あり） |
| uminomae.github.io | PASS | clean・同期 |
| zenn-content | PASS | clean・同期 |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| WARN | project-design | PR-2 | `.cache/session/state.md` が **2026-07-17 17:33 から未更新**。冒頭の HEAD 行は「develop=（本 commit 後に更新）」プレースホルダのまま（0720 から継続）。以後 develop に 3 commit（`00d9514` 07-30 / `eb6bd85` 08-02 / `d736446` 08-05）が入ったが、対応するセッションログ（`log-2026073x-*` 等）が存在しない（最新ログは `log-20260717-01.md`）。実 develop HEAD=`d736446` | 次セッション冒頭で state.md を Read-Before-Write 更新し実 HEAD を反映。3 件の CN 追加セッションは事後ログを起こすか、追記不要と判断するなら state.md にその旨を残す |
| WARN | project-design | PR-2/PR-5 | `.cache/inbox/wiki-gen-*.md`（action: auto-execute）が **21 日以上未消化**。07-20 / 07-24 / 07-27 / 08-07 / 08-10 の各版で **未生成 7 件が完全に同一**（D05-S15 / D06-S11 / D07-S15 / D09-S02 / D12-S13 / D13-S14 / D28-S15）。生成依頼だけが毎回再作成され archive へ流れている | 次の**対話**セッションで wiki-compile Step 3b を実行して 7 件を消化する。消化できない理由（原典未取得等）があるなら依頼側で除外するか STALE マークを付け、無限再生成を止める |
| WARN | project-design | PR-5 | `.cache/inbox/REVIEW-periodic-20260720-0831.md` が 21 日間 inbox に滞留（follow-up 未処理・archive 未移動） | follow-up 5 件を消化して `.cache/inbox/archive/` へ移動する。未消化のまま残すなら state.md の Hot Topics に昇格させる |
| WARN | project-design | PR-1 | worktree 残骸 4 件（0720 から不変）: `continuation-e3551d`(09f3478) / `continuation-e477dc`(258c0b4) / `pd121-remaining-tasks-efb6c4`(fa24187) / `remaining-tasks-564adb`(95b5751)。**今回 4 件すべて `git merge-base --is-ancestor <c> develop` = YES を確認**＝回収済みで prune 安全。加えて `claude/*` ブランチ 8 本が残存。合計 249MB | `git worktree remove` + `git branch -d` を実行（対話セッションで。定期レビューは read-only のため未実行） |
| WARN | creation-space | PR-6 | evidence>SVG staleness 30/30・inline `font-family` SVG 30 件。**0720 の保持論点「mtime 由来（checkout アーティファクト）か実差分か」に回答**: git 履歴でも evidence の最終更新が SVG より後（サンプル D01 ev=2026-04-07 / svg=2026-03-20、D05 04-07/03-21、D09 04-07/03-31、D13 04-08/03-20、D28 04-08/04-01）。**2026-04-07〜08 の一括 evidence 更新が下流 SVG へ伝播していない**のが実体。**0706 から 3 回連続の持ち越し** | pjdhiro 判断: 30 領域の SVG 一括再生成（`techo/rules/rebuild-publication.md` に従う）か、意図的凍結として staleness チェックから除外するか。判断が出るまで毎回 WARN が出続ける |
| WARN | creation-space | PR-1 | `.claude/worktrees/` にディレクトリ **11 件が実在するのに `git worktree list` の登録は 2 件**（main + `branch-organization-c111f0`）。残り 10 件（charming-euclid / cs219-narrow-scope / keen-bardeen / lucid-jepsen / raw-rerun-continue / sad-bhabha / stupefied-boyd / vigorous-jemison / vigorous-pasteur / zealous-satoshi）は git 管理外の孤児ディレクトリ。**合計 8.7GB**（新規検出） | `git worktree prune` 後、孤児ディレクトリに未回収の作業が無いか（各 dir の git log / 未コミット差分）を確認してから削除。**確認前の一括削除はしない**（CN-012「未マージ≠未回収」） |
| WARN | kesson-driven-thinking | PR-3 | retired asset が `.claude/commands/parallel-dispatch.md` と `.claude/commands/codex-dispatch.md` に残存（正本は pd の `codex-review` / `periodic-review` skill）。kdt は「移設中・最終的にアーカイブ予定」のため実害は小さい | kdt アーカイブ時に併せて削除。単独対応するなら 2 ファイル削除で足りる |
| INFO | creation-space | PR-1 | untracked: `knowledge/.DS_Store`（無害）/ `knowledge/raw/D05_feistel_2024_origin-of-life-symmetry-breaking.pdf`。後者は **pd の wiki-gen 依頼が raw-confirmed として参照している原典 PDF が未コミット**という関係にある | .DS_Store は gitignore 追加候補。raw PDF は knowledge-raw-policy に従い commit 可否を判断 |

## Resolved since last run（0720 follow-up の消化状況）

- ✅ **pjdhiro behind 1 → 解消**（remote main と同期・HEAD `2b32a86`）
- ⏸ **pd state.md HEAD プレースホルダ** → 未解消（かつ 24 日間更新停止へ悪化）
- ⏸ **pd worktree 残骸 4 件** → 未解消（ただし今回 prune 安全性を機械確認済み＝実行の前提は揃った）
- ⏸ **pd wiki-gen auto-execute** → 未解消（同一 7 件が 21 日間再生成され続けている）
- ⏸ **cs evidence>SVG staleness 30 領域** → 未解消（ただし今回「実差分である」と原因を確定＝pjdhiro 判断材料は揃った）

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | 全 10 repo が期待ブランチ・upstream と ahead/behind 0。dirty は untracked のみ。worktree 残骸が pd 4 件（249MB）/ cs 孤児 10 件（8.7GB） |
| PR-2 | Session hygiene | WARN | pd state.md 24 日停止＋3 commit 分のログ不在／auto-execute inbox 21 日未消化 |
| PR-3 | Canonical reference drift | WARN | kdt に retired command 2 件。pd は SKILL 自身の grep 定義文字列のみ（違反なし）。cs `docs/lessons/CL-002.md` の言及は**過去の経緯記録**であり drift ではない（対応不要） |
| PR-4 | Quality smoke | PASS | `node .claude/scripts/static-checks.js` → **11/11 PASS** |
| PR-5 | Review queue health | WARN | codex pending 0 件（健全）。ただし pd inbox に 0720 REVIEW-periodic が 21 日滞留 |
| PR-6 | Publication staleness | WARN | cs 30 領域 staleness＋旧世代 SVG 30 件（3 回連続持ち越し・原因は今回確定） |

## Skipped

| repo | check | reason |
|---|---|---|
| project-design | PR-4 responsive-test | 定期レビューは read-only。pd に今期間 UI 変更なし（3 commit はすべて knowledge/ の CN 追加）。dev server 起動前提も不足のため static-checks(11/11) で代替 |
| all | 修正・prune・auto-execute | SKILL §7「自動で修正しない」に従い、検出と記録のみ |

## Follow-up

優先度順:

1. **cs 孤児 worktree 10 件・8.7GB** — 未回収作業の有無を確認してから prune（ディスク影響が最大・新規検出）
2. **cs evidence>SVG staleness 30 領域** — pjdhiro 判断（再生成 or 凍結宣言）。**実差分と確定したので判断材料は揃っている**・3 回連続持ち越し
3. **pd state.md 更新再開** — 次セッション冒頭で Read-Before-Write 更新（実 HEAD `d736446`）＋ 07-30/08-02/08-05 のログ扱いを決める
4. **pd wiki-gen 7 件の消化** — 対話セッションで wiki-compile Step 3b。消化不能なら依頼側で止める
5. **pd worktree 4 件 + claude/* ブランチ 8 本の prune** — 安全性は今回確認済み
6. **pd inbox の 0720 REVIEW-periodic を archive へ**
7. **kdt の retired command 2 ファイル削除**（アーカイブ時でも可）

## メタ

- FAIL: 0 件 / WARN: 7 件（うち 4 件は持ち越し・2 件は新規検出・1 件は原因確定で前進）/ PASS: 6 repo
- 前回からの間隔が 21 日（想定は週次 7 日）。**scheduler が 2 回分発火していない可能性**があり、次回も 14 日超なら scheduled task `weekly-periodic-review` の稼働状況を確認する
- 定期レビューは検出と記録のみ。修正・prune・auto-execute は本 run では実行していない（read-only 制約）
