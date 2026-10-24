# Periodic Review: 2026-08-31 08:34

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL（`project-design` が兄弟に存在）
前回: 2026-08-24 08:31 → 今回まで **7 日**（scheduler 正常発火）
チェックセット: PR-1〜PR-6
対象: `~/dev/*` の git repo **12 件**（前回 10 件 → **futari / investing を新規に検出**）

## Summary

| repo | status | note |
|---|---|---|
| creation-space | WARN | 孤児 worktree 10 件・**11GB で横ばい**（前回 +2.3GB の増加は止まった）。今回**中身を実測**し、11GB のほぼ全ては main と重複する PDF で、**救出が要るのは 2 ファイルだけ**と特定。ブロッカーは cs#242（`rm -rf` の allow 未設定）。本体は clean・同期 |
| project-design | WARN | 孤児 worktree dir 2 件（58MB）が **3 回連続で未削除**／state.md の進行中マーカーが 0817 のまま（**未反映が 0819・0829×2 の 3 コミットに拡大**）／二重生成 wiki 2 組が判断待ち。static 11/11・responsive 5/5・U+FFFD 0 |
| investing | WARN | **今回新規に検出した repo**。main が **ahead=2（2 日間 未 push）**。dirty 71 は launchd 日次更新の CSV＝想定内 |
| futari | WARN | **今回新規に検出した repo**（今週いちばん活動が濃い）。ローカル main が origin より **behind=11**・`ui/` に未コミット 2 件。稼働中セッションの副作用で、drift というより「ローカル main が置き去り」 |
| awareness-space | WARN | inbox の `proposal-pd115-f4prime-order-experiment.md` が **59 日**滞留（前回 52 日から未消化）。本体は clean・同期 |
| myhome | WARN | main が **behind=5**（origin に別セッションの commit あり・ローカル未取得）。dirty 2（`.claude/settings.json` 変更・`car-site/` untracked） |
| kesson-driven-thinking | SKIP | GitHub `isArchived: true` を再確認。SKILL §3 に従い PR-3 対象外。ローカルは origin/main と一致＝PR-1 PASS |
| pjdhiro | PASS | clean・同期。untracked は `garage/` 残骸のみ（前回から変化なし） |
| kesson-space | PASS | clean・同期 |
| techo | PASS | clean・同期。untracked note 1 件（3 か月不変） |
| uminomae.github.io | PASS | clean・同期 |
| zenn-content | PASS | clean・同期 |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| WARN | creation-space | PR-1 | **孤児 worktree 10 件・11GB（4 回連続持ち越し）。今回、中身を実測して削除判断の材料が揃った**。①各 worktree の 880MB のうち **853MB は `knowledge/raw`**（原典 PDF）②`.git` の gitdir は prune 済みで `git status` 不能（`fatal: not a git repository`）③main の `knowledge/raw`（134 件）と各 worktree の raw を突き合わせた結果、**main に無いファイルは全 10 件を通じて 2 種類だけ** — `D03_winter-chambon_1986_gel-point.pdf`（643K・cs219-narrow-scope）と `D25_vangennep_1909_rites-of-passage.pdf`（31M・cs219-narrow-scope / stupefied-boyd-2309d4）。どちらも **source note は main に存在し `access_status: raw-confirmed`**（D03-S08・D25-S01）＝読解済みだが PDF 本体だけ main へ届いていない。**両ファイルとも `.gitignore` の対象外**（cs の .gitignore は個別 PDF を名指しで除外する方式） | ①先に **2 ファイルを main の `knowledge/raw/` へ救出**（原典取得は高コスト＝memory「cs原典取得の鉄則」）②その後、10 dir の `knowledge/raw` は main の完全な部分集合＝**重複 8.5GB として削除可**。③ブロッカーは **cs#242「settings.json: dev/ 配下の rm -rf を allow に追加」が OPEN のまま**（cs#238 の整理を止めている当の Issue）。cs#242 を先に処理するのが最短 |
| WARN | project-design | PR-1 | 孤児 worktree dir 2 件（`main-merge` / `wt-wiki-consciousness-core`・計 58MB）が**物理的に残存**。0817 に「中身は履歴上の旧 blob のみ＝削除して問題ない」と調査済みだが、**0817・0824 に続き 3 回連続で未実行**。原因は cs#242 と同じ `rm -rf` 権限 | 対話セッションで `rm -rf .claude/worktrees/{main-merge,wt-wiki-consciousness-core}`。調査は完了済みなので実行のみ |
| WARN | project-design | PR-2 | `.cache/session/state.md` の先頭項が **「🔄 CLI 作業中 2026-08-17 (174)」のまま**。記載 HEAD `1a148bb` に対し実 develop HEAD は **`8f6092d`**。**未反映が 3 コミットへ拡大**（0819 `3a0423e` CLAUDE.md 圧縮／0829 `c4cc81a` CN-017 追加／0829 `8f6092d` CN-017 の futari 移設）。0829 の 2 コミットは **futari セッション（`Session: 20260829-956` / `-991`）から pd を横断編集**したもので、横断サマリ `SESSION-20260829-956/991.md` は存在＝辿る道は切れていないが、pd の state.md には何も入っていない | 次の対話セッション冒頭で Read-Before-Write 更新。0817 項を「✅ セッション終了」へ倒し、0819・0829×2 を追記して実 HEAD `8f6092d` を反映 |
| WARN | project-design | PR-5 | **前回のレポート `REVIEW-periodic-20260824-0831.md` が inbox に残置**（8/24 07:37 以降 未 archive）＝**0824 の follow-up 8 件が今週まったく消化されていない**ことの機械的な証拠。0817→0824 では 9/10 が消化されており、今週は pd の対話セッションが 0 回だった（pd の commit 2 件はいずれも futari セッションからの横断編集） | inbox の archive は消化とセットで。次に pd セッションを開いたら本レポートと合わせて処理する |
| WARN | project-design | PR-5 | **0824 のレポート本体が git に入っていなかった**（`git ls-files .cache/reviews/periodic/` に 0824 が不在＝`.cache` は gitignore 対象で毎回 `git add -f` が要る）。0817 レポートが「前回レポート未 push」を検出したのと**同じ事象が 0824 で再発**していた。本 run の commit で 0824 分も一緒に追跡下へ入れた | 定期レビューの commit 手順に `git add -f` を明記する（`.cache` は ignore 対象なので通常の `git add` は静かに失敗する）。SKILL §4 Step 5 の後ろに 1 行足すのが最小 |
| WARN | project-design | PR-5 | 二重生成 wiki ページ 2 組が未処理（0817 検出・**3 回連続で pjdhiro 判断待ち**）: `D08_miller_2001_cohen-j-d.md` / `D08_miller_2001_integrative-theory-prefrontal-cortex.md`、`D15_dewey_1934_1934.md` / `D15_dewey_1934_art-as-experience.md`（4 ファイルとも 7/2 生成のまま不変）。再発源は 0817 の `wiki-gen-check.sh` 修正で停止済み | 各組を比較して残す方を決め、他方を削除（値判断を含むため pjdhiro 承認）。ファイル名の退化が明らかな `_cohen-j-d`（共著者名）と `_1934`（年の重複）が削除候補 |
| WARN | investing | PR-1 | **新規検出 repo**。`main` が origin より **ahead=2**（`55f5e6c` 運用ルール移植 ＋ `5de073d` merge・**2026-08-29 以降 2 日間 未 push**）。dirty 71 件はすべて `data/breadth/**.csv` と `dashboard/index.html`＝「M8: 平日6:00 の自動更新 (launchd)」が書き換える生成物で、想定内の churn | 2 コミットを push。生成物 71 件が毎回 dirty に出るのは定期レビューのノイズ源なので、投資 repo 側で「生成物は commit する / gitignore する」のどちらかに倒すと以後クリーンになる |
| WARN | futari | PR-1 | **新規検出 repo・今週最多の活動**（origin/main は 8/31 08:32 まで更新中）。ローカル `main` が **behind=11**、`ui/_archive-data.json` / `ui/archive.html` が未コミット。稼働中の `claude/*` セッションが merge → push を回しており、ローカル main だけが置き去りになっている。futari 自身が `.cache/session/log-*.md` を毎セッション書いており（8/31 だけで 3 件）、セッション規律は機能している | ローカルで `git pull` して main を追随させる。`ui/` の 2 件は稼働中セッションの作業中ファイルの可能性が高く、**futari#65「worktree の掃除で作業中のファイルを消さない」の再発を避けるため、消さずに中身を確認**してから扱う |
| WARN | myhome | PR-1 | `main` が **behind=5**（origin に garden 系の commit あり・ローカル未取得）。dirty 2＝`.claude/settings.json` の変更（未コミット）と `car-site/` untracked | myhome 側のセッションで pull と settings.json の扱いを決める。pd 定期レビューの管轄外として記録のみ |
| WARN | awareness-space | PR-2 | `.cache/inbox/proposal-pd115-f4prime-order-experiment.md`（2026-07-03・**59 日**滞留・前回 52 日から未消化）。as は最終コミット 2026-05-11 で活動停止中。内容は pd#115（F4' 順序実験）＝**pd 側で生きている論点**（pd#115 / pd#126 は OPEN・memory「pd#115 は二つの別レンズ」「pd#124 行列が第一の方法論」参照）なので単純 archive にしない | 一度読んで RR-024 本線の現状と突き合わせ、生きていれば pd へ移送、死んでいれば `archive/` へ。**放置しても悪化しないが、2 回連続で持ち越している**ので判断だけ付ける |
| INFO | project-design | PR-4 | `wiki-cross-check.mjs --all`: **pairs=300 / cs-missing=3 / pd-missing=2**（前回と同数）。出力 `.cache/wiki-conflict-candidates-20260830.md` は件数を front matter に書くだけで**どの source が missing かを列挙しない**ため追跡不能 | 次に wiki 作業をするとき、スクリプトに missing 5 件の列挙を足す |
| INFO | project-design | PR-1 | dirty 2 件＝`.cache/session/state.md`（空行 1 行削除）と `periodic-review-state.json`（本 run で更新）。実害なし | 本 run の commit に同梱 |
| INFO | pjdhiro | PR-1 | untracked `garage/` は `8fa721f`（0821）で正本を myhome / 公開を `uminomae/garage` へ移した際のローカル残骸（前回から変化なし） | myhome 側に揃っていることを確認して削除、または gitignore |
| INFO | creation-space | PR-3 | `docs/lessons/CL-002.md` の retired 名言及（および myhome `docs/claude-rules-history.md`）は**教訓・履歴を書き残す文書**＝正本ポインタの drift ではない。pd 側の hit は `periodic-review/SKILL.md` §0「置き換えるもの」の記述のみ | 対応不要 |
| INFO | creation-space | PR-6 | 旧世代 SVG（インライン `font-family`）**30/30 件**。0817 の凍結宣言（evidence が全て `entry_count: 0` stub＝再生成の入力が無い）に従い INFO 据え置き | cs#224 umbrella の evidence rebuild で entry が入った領域から順に再生成 |

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | 12 repo すべて期待ブランチ。**同期ずれ 3 件**＝investing ahead=2（未 push）／futari behind=11／myhome behind=5。**すべて「ローカルが遅れている」型で、diverged は 0**。worktree 残骸は cs 10 件 11GB（横ばい・**内訳を実測して削除条件を確定**）・pd 2 件 58MB |
| PR-2 | Session hygiene | WARN | pd state.md の未反映が 3 コミットへ拡大。as の 59 日滞留 proposal。inbox は pd（前回レポート 1 件残置）・as（1 件）以外は 0。outbox の `DONE-*` / `REVIEW-*`（ks 11・techo 17 等）は**すべて 4 月以前の完了記録＝アーカイブ相当**で、未処理ではない |
| PR-3 | Canonical reference drift | **PASS** | 2 回連続 PASS。retired 名の hit は SKILL 自身の説明・教訓文書・履歴文書のみ。kdt は `isArchived: true` を再確認して恒久 SKIP |
| PR-4 | Quality smoke | **PASS** | `static-checks.js` **11/11**／`responsive-test.js` **5/5**（WCAG 2.2 AA・:3004 は 200・sandbox 外で実行）／wiki U+FFFD **0**／`wiki-access-lint` OK（332 ページ・404 原典・取得不能原典への page なし）／`wiki-cross-check --all` 300 ペア |
| PR-5 | Review queue health | WARN | codex pending は**ディレクトリ自体が不在＝0 件**（全 repo 健全）。ただし**前回レポートが inbox に残置＝follow-up 8 件が丸々未消化**。二重生成 wiki 2 組も判断待ちのまま |
| PR-6 | Publication staleness | **PASS** | 2 回連続 PASS。凍結宣言適用で evidence 30 件すべて `entry_count: 0` → skip、**compared=0 / warn=0**。旧世代 SVG 30 件は INFO 据え置き |

## Resolved since last run（0824 follow-up 8 件の消化状況）

- ⏸ **cs 孤児 worktree 10 件 11GB の prune** — 未実施。ただし**増加は止まった**（11GB で横ばい）。本 run で削除条件を実測確定（下記 Follow-up 1）
- ⏸ **pd 孤児 worktree dir 2 件の `rm -rf`** — 未実施（3 回連続）
- ⏸ **pd state.md の進行中マーカー** — 未実施。**未反映コミットが 1 → 3 件に拡大**
- ⏸ **二重生成 wiki 2 組の採否** — 未実施（pjdhiro 判断待ち）
- ⏸ **as inbox の pd#115 proposal** — 未実施（52 → 59 日）
- ⏸ **`wiki-cross-check.mjs` の missing 列挙追加** — 未実施
- ⏸ **pjdhiro `garage/img/` 残骸の整理** — 未実施
- ⏸ **myhome `claude/tamanegi-...` の merge 判断** — myhome 側で解消されたか未確認（`[E-UNMERGED]` の再チェックは myhome 管轄）

**消化 0 件**。今週 pd の対話セッションが開かれなかったため（pd の commit 2 件は futari セッションからの横断編集）。0817→0824 の 9/10 消化とは対照的で、**follow-up の消化は「pd で対話セッションが開かれるか」に完全に依存している**。

## Skipped

| repo | check | reason |
|---|---|---|
| kesson-driven-thinking | PR-3 | GitHub archived（read-only）。SKILL §3 の規定どおり対象外。`gh repo view --json isArchived` = true を再確認 |
| investing / futari | PR-2・PR-3・PR-6 | 今回が初回検出。`.cache/` 規約・正本参照・公開物の対応関係が pd 系の枠組みに乗っているかは未評価。PR-1 のみ実施した |
| all | 修正・prune・削除・push（本レポートと state 以外） | SKILL §7「自動で修正しない」。検出と記録のみ |
| project-design | `quartz/.npmrc` の読み取り | sandbox deny ルール（`**/.npmrc`）で `git status` が 1 行エラーを返す。結果に影響なし |

## Follow-up

優先度順:

1. **cs#242（`rm -rf` allow）を処理して worktree 掃除のブロッカーを外す** — cs 11GB と pd 58MB の**両方**を止めているのはこの 1 件。4 週連続の持ち越しの実体は「調査不足」ではなく「実行権限」
2. **cs 孤児 worktree の削除（手順が確定した）** — ①`D03_winter-chambon_1986_gel-point.pdf`（cs219-narrow-scope）と `D25_vangennep_1909_rites-of-passage.pdf`（cs219-narrow-scope または stupefied-boyd-2309d4）を main の `knowledge/raw/` へ救出 → ②残る 10 dir の raw は main の部分集合なので削除可（約 8.5GB 回収）。順序を逆にすると再取得不能な PDF を失う
3. **pd 孤児 worktree dir 2 件の `rm -rf`**（58MB・調査完了済み・実行のみ）
4. **pd state.md を Read-Before-Write で更新** — 0817 項を閉じ、0819 `3a0423e` / 0829 `c4cc81a` `8f6092d` を追記して実 HEAD `8f6092d` を反映
5. **investing の未 push 2 コミットを push**、生成物 71 件の扱い（commit / gitignore）を決める
6. **futari のローカル main を pull で追随**（`ui/` の未コミット 2 件は消さずに中身確認 — futari#65 の再発防止）
7. **二重生成 wiki ページ 2 組の採否**（pjdhiro 判断・`D08_miller_2001_*` / `D15_dewey_1934_*`）
8. **as inbox の pd#115 F4' 順序実験 proposal（59 日）** を読んで pd へ移送 or archive
9. **`wiki-cross-check.mjs` に missing 5 件（cs 3 / pd 2）の列挙を追加**
10. **pjdhiro `garage/` 残骸の整理**、**myhome の pull と settings.json**（各 repo 管轄）

## メタ

- FAIL: 0 件 / WARN: 10 件（新規 4・持ち越し 6）/ INFO: 4 件 / PASS: 5 repo / SKIP: 1 repo
- **前回 WARN 5 件 → 今回 9 件**。増分の内訳は **新規 repo 2 件（futari / investing）＋ myhome の behind ＋ pd の follow-up 未消化**。0824 の finding が悪化したのではなく、**対象が広がったことと、消化が止まったこと**の 2 つ
- **今回の主な収穫は cs 11GB の内訳を実測したこと**。「11GB あって怖いから触れない」状態から、「救うべきは 2 ファイル・残りは重複」まで具体化した。`git status` が効かない（gitdir prune 済み）ため、判断材料はファイル名の突き合わせで作った
- **PR-3・PR-4・PR-6 が 2 回連続 PASS**。検出ロジックを正した 0817 の SKILL 修正（`07376f3` / `f29420b`）の効果は定着している
- **持ち越し 6 件はすべて「実行が要る」もので、調査が足りないものは 1 件もない**。うち 2 件は権限（cs#242）、2 件は pjdhiro 判断、2 件は pd セッションを開けば片付く
- 間隔は 7 日（想定どおり）。scheduler の欠測なし
- 定期レビューは検出と記録のみ。本 run でも修正・prune・削除は実行していない（read-only 制約）
