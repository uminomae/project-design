# Periodic Review: 2026-08-17 08:32

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL（`project-design` が兄弟に存在）
前回: 2026-08-10 08:32 → 今回まで **7 日**（scheduler は今回正常に週次発火）
チェックセット: PR-1〜PR-6

## Summary

| repo | status | note |
|---|---|---|
| project-design | WARN | **前回レビュー commit `b55581f` が未 push（ahead 1）**＝レビュー機構自体の取りこぼし（新規）/ **自己参照 symlink 3 件を検出・原因は `serve.sh` の `ln -sf`（新規・原因確定）** / state.md 31 日停止 / wiki-gen 7 件が 6 回連続同一 / 孤児 worktree dir 2 件を追加検出。static 11/11・responsive 5/5 |
| myhome | WARN | **main が diverged（behind 8 / ahead 1）**。ローカル専用 `d2b85b7` が origin/main の祖先でない＝未回収（新規・今回の実害候補筆頭） |
| creation-space | WARN | evidence>SVG staleness 30/30・inline font-family 30 件（**4 回連続持ち越し**・pjdhiro 判断待ち）/ 孤児 worktree 10 件 8.7GB（未解消）/ inbox に `_instructions-*` 8 件が 102〜120 日滞留（新規） |
| kesson-space | WARN | inbox `_instructions-*` 7 件が 118〜140 日滞留（新規・軽微）。本体は clean・同期 |
| techo | WARN | inbox `_instructions-*` 8 件が 132 日滞留（新規・軽微）。untracked note 1 件 |
| kesson-driven-thinking | WARN | retired command `parallel-dispatch.md` / `codex-dispatch.md` 残存（継続・アーカイブ予定 repo のため低優先） |
| pjdhiro | PASS | clean・同期。untracked `garage/img/` のみ |
| awareness-space | PASS | clean・同期 |
| uminomae.github.io | PASS | clean・同期 |
| zenn-content | PASS | clean・同期 |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| WARN | project-design | PR-1 | **前回 run のレポート commit `b55581f`（2026-08-10）が push されていない**（`@{upstream}..HEAD` = 1）。scheduled task の指示は「push まで実行してよい」だが到達していなかった。**定期レビューの成果物が 7 日間ローカルのみに存在していた** | 本 run のレポート commit と同時に push する（本 run で解消予定）。次回以降 PR-1 で ahead>0 を毎回明示チェックする |
| WARN | project-design | PR-1 | **自己参照 symlink 3 件が untracked で存在**: `content/content -> .../content` / `reader/reader -> .../reader` / `src/src -> .../src`（すべて Aug 13 20:10 生成）。**原因確定**: `serve.sh:8-10` の `ln -sf "$(pwd)/src" build/_serve/src` が、**既存の symlink-to-dir を dereference して実体ディレクトリの内側にリンクを作る**（`build/_serve/src` は 4/06 から symlink として存在）。`index.html`（line 7）はファイルなので正常に置換されている。**.gitignore 対象外**のため `git add .` で自己参照リンクが commit される risk がある | `serve.sh` の 3 行を `ln -sfn`（`-n` = 非追従）へ変更するか、`ln` 前に `rm -f build/_serve/{src,content,reader}` を入れる。既存の `content/content` / `reader/reader` / `src/src` を削除する。**定期レビューは read-only のため未実行** |
| WARN | myhome | PR-1 | **`main` が diverged**: behind 8 / ahead 1。ローカル専用 `d2b85b7`「garden: resolve mechanical #116 warnings」（2026-08-16 19:51 JST）は `origin/main` の**祖先ではない**＝未回収。remote 側は同日以降 8 commit 進行（点予報取得・decisions.md 決裁記録・防除資材登録 等）。myhome 自身の `session-log-check.py` の [E] は「最終コミットが 12 時間より前のブランチ」だけを見るため**この分岐を検出できていない** | 次の myhome セッション冒頭で `git pull --rebase`（または merge）して `d2b85b7` を origin/main に載せる。**pull 前に実行すると 8 commit との衝突解決が必要**な可能性があるため、内容確認の上で行う |
| WARN | project-design | PR-2 | `.cache/session/state.md` が **2026-07-17 17:33 から未更新（31 日）**。冒頭 HEAD 行は「develop=（本 commit 後に更新）」プレースホルダのまま（0720 から 4 回連続）。実 develop HEAD = `b55581f` | 次の**対話**セッション冒頭で Read-Before-Write 更新。3 件の CN 追加セッション（07-30 / 08-02 / 08-05）のログ扱いも同時に決める |
| WARN | project-design | PR-2/PR-5 | `.cache/inbox/wiki-gen-2026-08-17.md`（本日 08:31 生成）の**未生成 7 件が 07-20 版から完全に同一**（D05-S15 / D06-S11 / D07-S15 / D09-S02 / D12-S13 / D13-S14 / D28-S15）。**6 回連続で同じ依頼が再生成 → archive されている**。28 日以上未消化 | 対話セッションで wiki-compile Step 3b を実行して 7 件を消化する。消化できない理由があるなら依頼生成側で除外するか STALE マークを付け、**無限再生成を止める**（毎回 WARN を生む原因） |
| WARN | project-design | PR-1 | `.claude/worktrees/` に**未登録の孤児ディレクトリ 2 件を追加検出**: `main-merge`（29MB）/ `wt-wiki-consciousness-core`（29MB）。`git worktree list` の登録は 4 件のみ。登録済み 4 件（continuation-e3551d / continuation-e477dc / pd121-remaining-tasks-efb6c4 / remaining-tasks-564adb）は前回 develop の祖先＝prune 安全と確認済み。合計 249MB。`claude/*` ブランチ 8 本も残存 | 登録済み 4 件は `git worktree remove` + `git branch -d`。孤児 2 件は**未回収作業の有無を確認してから**削除（CN-012「未マージ≠未回収」） |
| WARN | project-design | PR-5 | `.cache/inbox/` に `REVIEW-periodic-20260720-0831.md`（**28 日**滞留）と `REVIEW-periodic-20260810-0832.md`（7 日滞留）が follow-up 未処理のまま残存 | 0720 分の follow-up は本レポートに統合済みなので `.cache/inbox/archive/` へ移動してよい。0810 分は残る 4 件を消化してから移動 |
| WARN | creation-space | PR-6 | evidence>SVG staleness **30/30 領域**・inline `font-family` SVG **30 件**。0810 で「mtime 由来ではなく git 履歴でも実差分」と原因確定済み（2026-04-07〜08 の一括 evidence 更新が下流 SVG へ未伝播）。**0706 から 4 回連続の持ち越し** | **pjdhiro 判断**: 30 領域の SVG 一括再生成（`techo/rules/rebuild-publication.md`）か、意図的凍結として staleness チェックから除外するか。**判断材料は 0810 で揃っている**。判断が出るまで毎回 WARN が出続ける |
| WARN | creation-space | PR-1 | `.claude/worktrees/` に 11 ディレクトリが実在するのに `git worktree list` の登録は 2 件（main + `branch-organization-c111f0`）。孤児 10 件・**合計 8.7GB**（0810 検出から未解消・ディスク影響が最大） | `git worktree prune` 後、各孤児 dir の git log / 未コミット差分を確認してから削除。**確認前の一括削除はしない** |
| WARN | creation-space | PR-2 | `.cache/inbox/` に `_instructions-*` **8 件が 102〜120 日滞留**（最古 `_instructions-229-ui-asset-audit.md` 4/19、最新 `_instructions-233-z-index-tokens.md` 5/7）。archive へ流れていない（新規検出） | 対応済みなら `.cache/inbox/archive/` へ移動、未対応なら Issue 化して inbox から出す。cs の inbox 運用が 3 か月以上止まっている |
| WARN | kesson-space | PR-2 | `.cache/inbox/` に `_instructions-*` **7 件が 118〜140 日滞留**（3/30〜4/22）。本体 repo は clean・同期（新規検出・軽微） | cs と同じ扱い。ks は最終 commit が 5/12 で活動が止まっているため、まとめて archive でよい |
| WARN | techo | PR-2 | `.cache/inbox/` に `_instructions-*` **8 件が 132 日滞留**（3/30〜4/7）。untracked `transform/note/note-rules-05-three-and-seven.md`（新規検出・軽微） | 同上。techo は横断起点 repo なので、生きている指示があるか一度だけ確認する価値がある |
| WARN | kesson-driven-thinking | PR-3 | retired asset `.claude/commands/parallel-dispatch.md` / `.claude/commands/codex-dispatch.md` が残存（正本は pd の `codex-review` / `periodic-review` skill）。kdt は「移設中・アーカイブ予定」のため実害は小さい（継続） | kdt アーカイブ時に併せて削除。単独対応なら 2 ファイル削除で足りる |
| INFO | creation-space | PR-1 | untracked: `knowledge/.DS_Store` / `knowledge/raw/D05_feistel_2024_origin-of-life-symmetry-breaking.pdf`。後者は **pd の wiki-gen 依頼が raw-confirmed として参照している原典 PDF が未コミット**（0810 から不変） | .DS_Store は gitignore 追加候補。raw PDF は knowledge-raw-policy に従い commit 可否を判断 |
| INFO | all | PR-4 | **sandbox 内の `curl http://localhost:3004/` が 000 を返す**（listener は実在）。sandbox を外すと 200。memory の「sandbox で localhost テスト誤 SKIP」どおりの挙動を再現 | responsive-test を SKIP 判定する前に必ず sandbox を外して再確認する（本 run では実施済み） |

## Resolved since last run（0810 follow-up の消化状況）

- ⏸ **cs 孤児 worktree 10 件・8.7GB** → 未解消（優先度 1 のまま）
- ⏸ **cs evidence>SVG staleness 30 領域** → 未解消（4 回連続。pjdhiro 判断待ち）
- ⏸ **pd state.md 更新再開** → 未解消（31 日停止へ悪化）
- ⏸ **pd wiki-gen 7 件の消化** → 未解消（6 回連続で同一依頼を再生成）
- ⏸ **pd worktree 4 件 + claude/* ブランチ 8 本の prune** → 未解消（孤児 2 件が追加検出され対象が 6 件へ増加）
- ⏸ **pd inbox の 0720 REVIEW-periodic を archive へ** → 未解消（28 日滞留）
- ⏸ **kdt の retired command 2 ファイル削除** → 未解消
- ➕ 前回 follow-up 7 件は**すべて未消化**。前回レポート自体が push されていなかったことが一因の可能性

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | 10 repo 中 8 repo は期待ブランチ・upstream 同期。**pd は ahead 1（未 push）**、**myhome は diverged（behind 8 / ahead 1）**。worktree 残骸は pd 6 件 249MB・cs 11 件 8.7GB。pd に自己参照 symlink 3 件 |
| PR-2 | Session hygiene | WARN | pd state.md 31 日停止／auto-execute inbox 28 日未消化／cs・ks・techo の `_instructions-*` が 100〜140 日滞留（新規） |
| PR-3 | Canonical reference drift | WARN | kdt に retired command 2 件（継続）。pd は SKILL 自身の grep 定義文字列のみ（違反なし）。cs・techo・ks に retired 参照なし |
| PR-4 | Quality smoke | PASS | `static-checks.js` **11/11 PASS**／`responsive-test.js` **5/5 PASS**（WCAG 2.2 AA・sandbox 外で実行）。今回は SKIP なし |
| PR-5 | Review queue health | WARN | codex pending は全 repo 0 件（健全）。pd inbox に REVIEW-periodic 2 件が滞留（28 日・7 日） |
| PR-6 | Publication staleness | WARN | cs 30 領域 staleness＋旧世代 SVG 30 件（4 回連続持ち越し・原因は 0810 で確定済み） |

## Skipped

| repo | check | reason |
|---|---|---|
| all | 修正・prune・auto-execute・push 以外の書き込み | SKILL §7「自動で修正しない」に従い、検出と記録のみ。`serve.sh` の `ln -sfn` 修正も**未実行**（コード変更にあたるため） |
| project-design | `quartz/.npmrc` の読み取り | sandbox の deny ルール（`**/.npmrc`）により `git status` が 1 行エラーを返す。レビュー結果に影響なし |

## Follow-up

優先度順:

1. **myhome の main diverged を解消** — ローカル `d2b85b7` が origin/main に未到達（behind 8）。**放置期間が延びるほど衝突解決が重くなる**唯一の finding
2. **pd `serve.sh` の `ln -sf` → `ln -sfn`** — 自己参照 symlink の**再発源**。launchd で serve.sh が再実行されるたびに再生成される。既存 3 件の削除も併せて
3. **cs 孤児 worktree 10 件・8.7GB** — 未回収作業の有無を確認してから prune（ディスク影響が最大・2 回連続持ち越し）
4. **cs evidence>SVG staleness 30 領域** — **pjdhiro 判断**（再生成 or 凍結宣言）。4 回連続持ち越しで、判断が出るまで毎回 WARN
5. **pd wiki-gen 7 件の消化 or 依頼側での停止** — 6 回連続の同一再生成を止める
6. **pd state.md 更新再開**（実 HEAD 反映）＋ 07-30/08-02/08-05 のログ扱い決定
7. **pd worktree 6 件（登録 4 + 孤児 2）+ claude/* ブランチ 8 本の prune**
8. **pd inbox の REVIEW-periodic 2 件を archive へ**
9. **cs / ks / techo の `_instructions-*` 23 件を archive か Issue 化**（100〜140 日滞留）
10. **kdt の retired command 2 ファイル削除**（アーカイブ時でも可）

## メタ

- FAIL: 0 件 / WARN: 13 件（**新規 6 件**・持ち越し 7 件）/ PASS: 4 repo
- 前回からの間隔は **7 日**（想定どおり）。0810 で懸念した scheduler の欠測は今回は発生していない
- **前回 follow-up 7 件がすべて未消化**。定期レビューは検出できているが、消化のための対話セッションが 8/10 以降 pd で行われていない（pd の最終 commit は 08-10 の前回レポート自身）
- 前回レポート commit が未 push だった件は、**定期レビュー自身の運用欠陥**として記録する。本 run では push まで実行する
- 定期レビューは検出と記録のみ。修正・prune・auto-execute は本 run でも実行していない（read-only 制約）
