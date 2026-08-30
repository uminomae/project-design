# Periodic Review: 2026-08-24 08:31

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL（`project-design` が兄弟に存在）
前回: 2026-08-17 08:32 → 今回まで **7 日**（scheduler 正常発火）
チェックセット: PR-1〜PR-6

## Summary

| repo | status | note |
|---|---|---|
| creation-space | WARN | **孤児 worktree が 10 件・11GB へ悪化**（前回 10 件 8.7GB）＝今回の最大 finding。本体は clean・同期。inbox は完全に空（`_instructions-*` 8 件 消化済み）。PR-6 は凍結宣言適用で PASS |
| project-design | WARN | 孤児 worktree dir 2 件（58MB）の物理削除が未実施（0817 で rm 権限が下りず）／state.md の進行中マーカーが 0817 のまま・0819 セッション未反映／二重生成 wiki ページ 2 組が pjdhiro 判断待ち。static 11/11・responsive 5/5・U+FFFD 0 |
| awareness-space | WARN | inbox に `proposal-pd115-f4prime-order-experiment.md` が **52 日**滞留（新規検出・軽微）。本体は clean・同期 |
| myhome | WARN | 前回の diverged は**解消**（clean・同期）。未マージ branch `claude/tamanegi-seed-inventory-check-3a2d5c` が 1 件（myhome 自身の checker が [E] で検出済み・myhome 側で処理される想定） |
| kesson-driven-thinking | SKIP | GitHub `isArchived: true` を確認。SKILL §3 に従い **PR-3 対象外**。ローカルは origin/main と一致＝PR-1 PASS |
| pjdhiro | PASS | clean・同期。untracked は `garage/img/` のみ（garage 正本は myhome へ移設済み＝残骸） |
| kesson-space | PASS | clean・同期。inbox `_instructions-*` 7 件は消化済み |
| techo | PASS | clean・同期。untracked note 1 件（3 か月不変）。inbox `_instructions-*` 8 件は消化済み |
| uminomae.github.io | PASS | clean・同期 |
| zenn-content | PASS | clean・同期 |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| WARN | creation-space | PR-1 | **孤児 worktree が悪化**。`.claude/worktrees/` に 13 ディレクトリ、`git worktree list` の登録は **3 件**（main 除く: `baby-leaf-planting-timing-901354` / `branch-organization-c111f0` / `issue-121-codex-review-f018f6`、いずれも detached HEAD `af299d6`）。**孤児 10 件・合計 11GB**（0810 時点 8.7GB → +2.3GB）。0810・0817 から**3 回連続持ち越しかつ増加中** | `git worktree prune` 後、孤児 10 dir の未コミット差分と git log を確認してから削除。**ディスク影響が全 finding 中最大**。確認前の一括削除はしない（CN-012「未マージ≠未回収」） |
| WARN | project-design | PR-1 | 孤児 worktree dir 2 件（`main-merge` / `wt-wiki-consciousness-core`・計 58MB）が**物理的に残存**。`git worktree list` は main のみ＝登録 4 件と `claude/*` 8 本の prune は 0817 で完了。0817 で「中身は履歴上の旧 blob のみ＝削除して問題ない」と確認済みだが rm 権限が下りず未実行 | 対話セッションで `rm -rf .claude/worktrees/{main-merge,wt-wiki-consciousness-core}`。調査は 0817 で完了しているので実行のみ |
| WARN | project-design | PR-2 | `.cache/session/state.md` の先頭項が **「🔄 CLI 作業中 2026-08-17 (174)」のまま**（進行中マーカー未クローズ）。記載 HEAD `1a148bb` に対し実 develop HEAD は `3a0423e`。**0819 の CLAUDE.md 圧縮セッション（`3a0423e`）はセッションログ `log-20260819-661.md` はあるが state.md へ未反映**。最終コミットは 0817 の `ef832a3` | 次の対話セッション冒頭で Read-Before-Write 更新。0817 項を「✅ セッション終了」へ倒し、0819 分を追記して実 HEAD を反映する |
| WARN | project-design | PR-5 | **二重生成された wiki/sources ページ 2 組が未処理**（0817 検出・pjdhiro 判断待ち）: `D08_miller_2001_cohen-j-d.md` / `D08_miller_2001_integrative-theory-prefrontal-cortex.md`、`D15_dewey_1934_1934.md` / `D15_dewey_1934_art-as-experience.md`。生成側の再発源（stem ドリフト）は 0817 の `wiki-gen-check.sh` 修正で止まっている | 各組の内容を比較し、残す方を決めて他方を削除（値判断を含むため pjdhiro 承認）。片方のファイル名は明らかに退化している（`_cohen-j-d` は共著者名、`_1934` は年の重複） |
| WARN | awareness-space | PR-2 | `.cache/inbox/` に `proposal-pd115-f4prime-order-experiment.md`（2026-07-03・**52 日**滞留）。as は最終コミット 2026-05-11 で活動停止中。内容は pd#115（F4' 順序実験）の提案＝**pd 側の生きている論点**に関わる（memory「pd#115 は二つの別レンズ」参照）ので、単純 archive でなく中身の確認が要る（新規検出） | 一度読んで、pd#115 / pd#124 の現状（RR-024 が本線）と突き合わせる。生きていれば pd 側へ移送、死んでいれば `.cache/inbox/archive/` へ |
| INFO | project-design | PR-4 | `wiki-cross-check.mjs --all`: **pairs=300 / cs-missing=3 / pd-missing=2**。ただし出力 `.cache/wiki-conflict-candidates-20260823.md` は front matter に件数を書くだけで**どの source が missing かを列挙していない**（本文は対応が取れた 300 ペアのみ）。矛盾検査の入口としては情報が欠けている | 次に wiki 作業をするとき、スクリプトに missing 5 件の列挙を足す。現状は「5 件ある」ことしか分からず追跡できない |
| INFO | project-design | PR-1 | dirty 1 件＝`.cache/session/state.md` の**空行 1 行削除のみ**の未コミット差分（本 run 開始時点で既存）。実害なし | 次の state.md 更新に同梱される |
| INFO | myhome | PR-1/PR-2 | 前回の main diverged は**解消済み**（`170f482`・clean・同期）。`session-log-check.py` は合計 158 件を報告するが大半は `[D-REMOTE-NO-ISSUE]`（REMOTE 発コミットに Issue trailer なし）。実害候補は `[E-UNMERGED]` 1 件＝`claude/tamanegi-seed-inventory-check-3a2d5c`（0.6 日・`garden/backlog.tsv` が main から見えない） | myhome 側のセッションで merge 判断。pd 定期レビューの管轄外として記録のみ |
| INFO | pjdhiro | PR-1 | untracked `garage/img/`。`8fa721f`（0821）で garage を pjdhiro から削除し正本を myhome / 公開を `uminomae/garage` へ移した際の**ローカル残骸** | 中身が myhome 側に揃っていることを確認して削除。誤って再 commit しないよう gitignore でもよい |
| INFO | creation-space | PR-3 | `docs/lessons/CL-002.md` に retired 名（`review-team` 等）の言及。同様に myhome `docs/claude-rules-history.md`。いずれも**教訓・履歴を書き残す文書**であり正本ポインタではない＝**違反ではない**。ただし cs の worktree 11 件に同じ文書のコピーがあり grep ノイズになっている | 対応不要。worktree 整理でノイズは消える |
| INFO | creation-space | PR-6 | 旧世代 SVG（インライン `font-family`）30/30 件。0817 の**凍結宣言**（evidence が全て `entry_count: 0` stub＝再生成の入力が無い）に従い INFO 据え置き | cs#224 umbrella の evidence rebuild で entry が入った領域から順に再生成・比較対象へ復帰 |

## Resolved since last run（0817 follow-up 10 件の消化状況）

- ✅ **myhome の main diverged** → 解消（別セッションが 0817 09:54〜 merge。現在 clean・同期）
- ✅ **pd `serve.sh` の `ln -sf` → `ln -sfn`** → 修正済み（7-10 行を確認）。自己参照 symlink 3 件も削除済み・再生成なし
- ✅ **pd wiki-gen 7 件の 6 回連続再生成** → 根治。`wiki-gen-check.sh` に prefix 一致フォールバックを追加し、真の未生成 1 件（D13-S14 Varela/Maturana/Uribe 1974）は wiki ページ生成済み。**本 run では wiki-gen 依頼が生成されていない**＝停止を確認
- ✅ **pd inbox の REVIEW-periodic 2 件** → archive 済み（0817 分も含め 3 件）。inbox は README.md と archive/ のみ
- ✅ **cs / ks / techo の `_instructions-*` 23 件** → 全 repo で 0 件。archive へ流れた
- ✅ **pd worktree 4 件 + `claude/*` ブランチ 8 本の prune** → 完了（`git worktree list` は main のみ・`claude/*` 0 本）
- ✅ **kdt の retired command** → SKILL 修正（`07376f3`）で PR-3 対象外に。GitHub `isArchived: true` を本 run で再確認＝**恒久的に SKIP**
- ✅ **cs evidence>SVG staleness 30/30** → SKILL 修正（`f29420b`）で stub skip。本 run の実測で **compared=0 / warn=0**＝5 回連続 WARN の根治を確認
- ✅ **前回レポートの未 push** → `b55581f` は push 済み。本 run 開始時 pd は ahead=0
- ⏸ **pd 孤児 worktree dir 2 件の物理削除** → 未実施（唯一の未消化。rm 権限待ち）

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | **10 repo 全てが期待ブランチ・upstream 同期（behind=0 / ahead=0）**＝前回の 2 大 drift（pd ahead 1・myhome diverged）は解消。残るは worktree 残骸のみ＝cs 10 件 11GB（悪化）・pd 2 件 58MB |
| PR-2 | Session hygiene | WARN | inbox は pd / cs / ks / techo すべてクリア（23+3 件消化）。残るは pd state.md の進行中マーカー未クローズと as の 52 日滞留 proposal 1 件 |
| PR-3 | Canonical reference drift | **PASS** | 初の PASS。kdt は archived 確認で恒久 SKIP、他 repo の hit は履歴・教訓文書のみで正本ポインタの drift なし |
| PR-4 | Quality smoke | PASS | `static-checks.js` **11/11**／`responsive-test.js` **5/5**（WCAG 2.2 AA・sandbox 外で実行・:3004 は 200）／wiki U+FFFD **0**／`wiki-access-lint` OK（332 ページ・404 原典・取得不能原典への page なし）／`wiki-cross-check --all` 300 ペア |
| PR-5 | Review queue health | WARN | codex pending は**ディレクトリ自体が不在＝0 件**（全 repo 健全）。inbox の REVIEW-* 滞留 0。残るは二重生成 wiki ページ 2 組の判断待ち |
| PR-6 | Publication staleness | **PASS** | 凍結宣言適用。evidence 30 件すべて `entry_count: 0` → skip、compared=0 / warn=0。旧世代 SVG 30 件は INFO 据え置き |

## Skipped

| repo | check | reason |
|---|---|---|
| kesson-driven-thinking | PR-3 | GitHub archived（read-only）。SKILL §3 の規定どおり対象外。`gh repo view --json isArchived` = true |
| all | 修正・prune・削除・push 以外の書き込み | SKILL §7「自動で修正しない」。検出と記録のみ |
| project-design | `quartz/.npmrc` の読み取り | sandbox deny ルール（`**/.npmrc`）で `git status` が 1 行エラーを返す。結果に影響なし |

## Follow-up

優先度順:

1. **cs 孤児 worktree 10 件・11GB の prune** — 3 回連続持ち越しかつ **+2.3GB 増加中**。唯一「放置するほど悪化する」finding。未コミット差分を確認してから削除
2. **pd 孤児 worktree dir 2 件の `rm -rf`** — 調査完了済み・実行のみ（58MB）
3. **pd state.md の進行中マーカーを閉じ、0819 分と実 HEAD `3a0423e` を反映**
4. **二重生成 wiki ページ 2 組の採否** — pjdhiro 判断（`D08_miller_2001_*` / `D15_dewey_1934_*`）
5. **as inbox の pd#115 F4' 順序実験 proposal（52 日）を読んで移送 or archive** — pd#115 / pd#124 の現状と突き合わせる
6. **`wiki-cross-check.mjs` に missing 5 件（cs 3 / pd 2）の列挙を追加** — 現状は件数しか出ず追跡できない
7. **pjdhiro `garage/img/` 残骸の整理**（myhome 側に揃っているか確認の上）
8. **myhome `claude/tamanegi-seed-inventory-check-3a2d5c` の merge 判断**（myhome 側の管轄）

## メタ

- FAIL: 0 件 / WARN: 5 件（新規 1・持ち越し 4）/ INFO: 5 件 / PASS: 6 repo
- **前回 WARN 13 件 → 今回 5 件**。0817 follow-up 10 件のうち 9 件が消化された（未消化は pd worktree dir の物理削除のみ）
- **PR-3 と PR-6 が初めて PASS**。0706 以来 5 回連続で出ていた「cs evidence>SVG staleness 30/30」と「kdt retired command」は、0817 の SKILL 修正（`07376f3` / `f29420b`）で**検出ロジック側を正した**結果、ノイズとして消えた。残る WARN は実体のあるものだけ
- 消化を担ったのは 0817 の pd 対話セッション（`log-20260817-174.md`）。**定期レビューの follow-up が対話セッションで実際に消化された初回**
- 間隔は 7 日（想定どおり）。scheduler の欠測なし
- 定期レビューは検出と記録のみ。修正・prune・削除は本 run でも実行していない（read-only 制約）
