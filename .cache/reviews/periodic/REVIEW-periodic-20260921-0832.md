# Periodic Review: 2026-09-21 08:32

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL（`project-design` が兄弟に存在）
前回: 2026-09-14 08:31 → 今回まで **7 日**（scheduler 正常発火。0914 回は commit `ad3ee9d` が origin 到達＝**前回は完走**）
チェックセット: PR-1〜PR-6
対象: `~/dev/*` の git repo **15 件**（前回と同数・新規検出なし）

> **今回の主眼は「積まれた掃除debtの棚卸し」**。過去 6 回 WARN を出し続けた cs 8.0GB と、前回 新規指摘した pjdhiro 6.4GB について、**「救出が必要な中身が本当にあるのか」を MD5 と git 履歴で機械照合した**。結論は下記のとおり、**ほぼ全部が救出不要**だった。

## Summary

| repo | status | note |
|---|---|---|
| creation-space | **WARN→解消可** | 孤児 worktree 10 件 8.0GB。**6 回連続の「2 PDF 未救出」は誤検知だった**（main に別名で MD5 一致・tracked）。他の差分 9 件も全て git 履歴から復元可能＝**救出対象ゼロ・削除は純粋な削除**。加えて**登録済み worktree 3 件 2.9GB を新規に計上**（dirty 0・全て `af299d6`＝origin/develop 祖先） |
| pjdhiro | **WARN→ほぼ解消** | 登録 worktree 11 件 6.4GB。**前回「未照合」とした garage 下書きは、2026-08-21 に既に選別済みだった**（`gonin/garage/_rescue-pjdhiro/README.md`＋`ZX-DIFF.md`）。MD5 照合で救出済みを確認。**未照合の残りは 2 ファイル 12.6KB のみ** |
| project-design | WARN | state.md 未反映 **26 コミット**（記載 HEAD `1a148bb`・2026-08-17＝**35 日**）。inbox に periodic レポート **4 通**。孤児 worktree 2 件 58MB（**6 回連続**）。テストは全緑 |
| awareness-space | WARN | pd#115 F4' proposal **80 日**（5 回連続）／`docs/templates/codex-worker-instruction.md:87` の retired 参照（**3 回連続**） |
| investing | **INFO→SKIP へ** | **repo 自身が決着を宣言していた**。最終 commit `e077ae5`「gonin の shisan/ へ移設＝この repo はアーカイブ（gonin#228）」。`dev/investing.bundle`（2.6MB・09-09）も存在＝保全済み。**次回から kdt と同じ SKIP 扱いにするのが正しい** |
| shaman-meta-site | INFO | 不変（`018d291` 1 commit・**remote なし**・629M）。バックアップは依然 手元 1 箇所のみ |
| gonin | INFO | clean・behind 1（launchd `garden:` 自動 commit）。session-log-check **合計 93 件・増分 0**（前回から不変） |
| techo | PASS | 同期。登録 worktree 4 件（計 7.7MB・dirty 4 は軽微） |
| futari | PASS | clean・同期（09-20 まで活発）。登録 worktree 3 件 48MB・空 dir 1 件 |
| myhome | PASS | clean・同期。登録 worktree 1 件 68MB・空 dir 4 件（不変） |
| kesson-space / uminomae.github.io / zenn-content / futari-gate-throwaway | PASS/INFO | 変化なし |
| kesson-driven-thinking | SKIP | GitHub archived。ローカルは origin/main と一致＝PR-1 PASS |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| **解消** | creation-space | PR-1 | **「2 PDF 未救出」は 6 回連続の誤検知**。`cs219-narrow-scope/knowledge/raw/D03_winter-chambon_1986_gel-point.pdf`（MD5 `156538e6…`）は main の `knowledge/raw/D03_chambon-winter_1987_gel-point.pdf` と**バイト一致**、`D25_vangennep_1909_rites-of-passage.pdf`（MD5 `a89887d0…`）は main の `D25_van-gennep_1960_rites-of-passage.pdf` と**バイト一致**。両方とも `git ls-files` 済み＝tracked。**過去の点検がファイル名で突き合わせていたため、書誌訂正リネーム後の同一ファイルを「無い」と判定していた** | 「救出」タスクは**削除**してよい。残るのは純粋な削除だけ |
| **解消** | creation-space | PR-1 | **孤児 10 件に救出対象はゼロ**。main に無いファイルを全件洗い出した結果は ①`D11-S01_paul-2010.md`（9 件の worktree に同一 MD5 `bd7bfe4a…`）＝`8382990`（cs#252 abstract-only 違反の執行）で**意図的に削除**、削除前 blob と MD5 一致 ②`D08-S09_markram-1997.md` ほか 4 本＝`6dde02e`（cs#249「abstract-only source-note 6本を破棄」）で**意図的に削除**、blob と MD5 一致 ③`cs219-narrow-scope/docs/design-system.md`＝`589c1d1`（2026-03-25・`--kesson-*` → `--cs-*` rename 前）の**旧版そのもの**（MD5 `93b1b00…` が履歴の版と一致） | **8.0GB は無条件に削除可**。削除前の救出手順はもう要らない |
| **新規** | creation-space | PR-1 | **登録済み worktree 3 件・2.9GB を新規に計上**（`baby-leaf-planting-timing-901354` / `branch-organization-c111f0` / `issue-121-codex-review-f018f6`・各 987M）。3 件とも detached `af299d6`・**dirty 0**・`af299d6` は origin/develop の祖先。前回 pjdhiro で見つけた「登録済みだから数えていなかった」と**同じ盲点**が cs にもあった。`.claude/worktrees` 全体では **11GB** | dirty 0 なので `git worktree remove` で即可。cs の合計 debt は 8.0 → **11GB** |
| **ほぼ解消** | pjdhiro | PR-1 | **前回「移転先に届いているか未確認」とした garage 下書きは、2026-08-21 に選別済みだった**。`gonin/garage/_rescue-pjdhiro/README.md`（退避の記録）と `ZX-DIFF.md`（6 論点の判断表）がある。MD5 照合の結果：`data-adv-scrambler.md` `draft-hand-numbness.md` `draft-lowrev-racer.md` `credits-additional.json` は **gonin 側と完全一致**＝救出済み。`garage/data.md` の +2 行（姉妹ファイル案内）は gonin の `data.md:7` に**同文で存在**。`gen_menace/practice/practice_small.py` は一致、`gen_ratio.py` `gen_faster3.py` は gonin 側が新しい。`gen_lowspeed.py` `gen_torque.py` と svg 6 枚は **ZX-DIFF §3 で「削除した」と明示的に判断済み**（「myhome が削除した版とバイト一致、もしくはそれより古い手置き曲線の模式図」・理由は `data-drivetrain.md` に記録） | 6.4GB のうち **11 件中 10 件は無条件に削除可**（HEAD は全件 origin/main の祖先） |
| WARN | pjdhiro | PR-1 | **未照合の残りは 2 ファイル・12.6KB のみ**。`bike-selection-height-eed99b/garage/assets/route-ladder.svg`（6,045B）と `weapon-radar.svg`（6,558B）（ともに 2026-07-25 作成・未追跡）。**gonin/garage にも myhome/garage にも無く**、0821 の退避 README が対象にした 3 系統（develop の tracked chart / `garage/img/` / sr400 worktree の credits json）**どれにも入っていない**。同ディレクトリの `lowrev-torque.svg` は ZX-DIFF §3 で削除判断済みだが、この 2 枚は判断表に名前が出てこない | この 2 枚だけ中身を見て「gonin へ退避 or 捨てる」を決める（pjdhiro 判断）。決まれば pjdhiro の worktree 11 件は全部片付く |
| WARN | creation-space / project-design | PR-5 | **cs#242（dev/ 配下の `rm -rf` を allow）が 144 日 OPEN**（createdAt = updatedAt = 2026-04-30＝**一度も触られていない**）。**7 回連続の指摘**。ただし今回で**ブロッカーの性質が変わった**：これまでは「救出が先・削除が後」で止まっていたが、救出は不要と分かったので、**残る障害は掃除コマンドの実行権限だけ** | 「対話セッションで手で打つ」と決めて cs#242 を閉じれば、**cs 11GB ＋ pjdhiro 6.4GB ＋ pd 0.16GB ≒ 17.6GB** が 1 セッションで片付く。7 回同じことを書いているので、**定期レビューから押すのはこれで打ち止めにするのが妥当** |
| WARN | project-design | PR-2 | **state.md の未反映が 26 コミット・35 日**（記載 HEAD `1a148bb` は 2026-08-17）。今週の新規 commit は `ad3ee9d`（定期レビュー自身）**1 件のみ**＝**人のセッション発はゼロ**。未コミットの空行 1 行削除も残ったまま（mtime **2026-08-24 08:31:42**＝0824 の定期レビュー実行中のまま不変） | 次の pd セッションで Read-Before-Write により 0817 項を閉じ、26 件を「他 repo 発の横断編集」1 項に畳む |
| WARN | project-design | PR-5 | **inbox に periodic レポート 4 通**（0824 / 0831 / 0907 / 0914）＝follow-up が pd 側で未消化のまま積み上がり | 次の pd セッションで 4 通＋本レポートをまとめて処理し archive |
| WARN | project-design | PR-1 | 孤児 worktree dir 2 件（`main-merge` / `wt-wiki-consciousness-core`・各 29MB）**6 回連続**。登録 `value-creation-diagrams-a2a9e7`（100M・detached `fa24187`＝**origin/develop の祖先**・dirty 0）も削除可 | cs#242 の決着と同時に処理（計 158MB） |
| WARN | project-design | PR-5 | 二重生成 wiki 2 組（`D08_miller_2001_{cohen-j-d, integrative-theory-prefrontal-cortex}` / `D15_dewey_1934_{1934, art-as-experience}`）**6 回連続**判断待ち。4 ファイルとも 7/2 23:08 のまま。※`D13_dewey_1934_art-as-experience.md` は別領域のページで重複ではない | 削除候補は `_cohen-j-d` と `_1934`（pjdhiro 承認） |
| WARN | awareness-space | PR-2 | `.cache/inbox/proposal-pd115-f4prime-order-experiment.md`（7/3）**80 日**・5 回連続 | 読んで pd へ移送 or archive（判断だけ付ける） |
| WARN | awareness-space | PR-3 | `docs/templates/codex-worker-instruction.md:87` が retired `creation-space/skills/commit-review-with-log/SKILL.md` を参照（**3 回連続**）。他の grep hit 8 件は全て正当（pd SKILL の自己説明・cs の RETIRED 本体と CL-002 の経緯・myhome dev-CLAUDE・gonin history） | 87 行目を `project-design/.claude/skills/codex-review/` へ差し替え。**1 行の修正が 3 週間動いていない** |
| **解消** | investing | PR-1 | **repo 自身が決着を宣言していた**。最終 commit `e077ae5`（09-09）のメッセージが「gonin の shisan/ へ移設＝この repo はアーカイブ（gonin#228）」。`/Users/uminomae/dev/investing.bundle`（2,618,007B・09-09 18:37）で保全済み。前回 INFO で書いた「remote 消滅」は**撤去の結果であって異常ではない** | **次回から kdt と同じ SKIP 扱い**（PR-1 の upstream 比較もしない）。state に `archived: true` を立てた |
| INFO | project-design | PR-4 | **定期レビュー自身が毎回 77KB のファイルを残している**。`wiki-cross-check.mjs --all` が `.cache/wiki-conflict-candidates-{日付}.md` を書き、0817 以降 **6 本**（0823/0830/0906/0913/0920 は各 76,792B・MD5 は全て相異）。SKILL §7「自動で修正しない」の read-only 方針と、実行のたびに `.cache/` へ書く挙動が噛み合っていない。ファイル名の日付が実行日の**前日**になる点も紛らわしい | 古い 5 本を archive するか、cross-check に `--no-write` を足す（軽微・pd 管轄） |
| INFO | project-design | PR-2 | 定期レビュー commit に `Session:` trailer が無い構造（scheduled task は `session-log.sh begin` を通らない）。gonin の [B] に出続ける。**前回の follow-up で「方針を決める」としたが未決** | 固定 trailer（例 `Session: periodic-{YYYYMMDD}`）を付けるか例外登録するか決める |
| INFO | gonin | PR-2 | `session-log-check.py`: 合計 **93 件・増分 0**（前回から完全に不変）。[A] 8 / [B] trailer 無し 47・split 32 / [D] 10 ＋ (remote) Issue 参照なし 4 / [C][E][F] **0**。凍結済み債務 [B]186・[D]144 は別掲 | gonin 管轄（gonin#234 / #265）。増分 0＝新規の劣化は起きていない |
| INFO | pjdhiro | PR-1 | `git branch -r --no-merged main` が **14 本**（`TV-dev`・`codex/*`・`claude/*` の古い枝）。他は cs 2 / as 2 / ks 2 / kdt 2 / gonin 2 / pd 1（`origin/develop`＝想定内）/ techo 1 | worktree 片付けと同時に棚卸し |
| INFO | 複数 | PR-1 | 0B 空 worktree dir: myhome **4 件**（不変）・gonin 1 件（`content-fix-issues-517e8c`・不変）・futari 1 件（`elastic-newton-97a137`・不変） | 各 repo 管轄。`git worktree prune` ＋空 dir 削除 |
| INFO | creation-space | PR-6 | 旧世代 SVG（インライン `font-family`）**30/30**。凍結宣言どおり INFO | cs#224 rebuild 待ち |
| INFO | shaman-meta-site | PR-1 | 不変（1 commit・remote なし・629M）。**バックアップが手元 1 箇所のみ**という状態が 2 週間継続 | push か bundle（pjdhiro 判断）。investing は bundle で保全した前例がある |
| INFO | project-design | PR-4 | `wiki-cross-check --all`: pairs=300 / cs-missing=3 / pd-missing=2（**5 回連続同数**・列挙なし） | スクリプトに missing の列挙を追加 |

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | 全 repo 期待ブランチ・diverged 0・dirty は pd 1（state.md）/ techo 1 のみ。gonin behind 1 は launchd 自動 commit。**worktree debt は cs 11GB（+2.9GB 新規計上）＋ pjdhiro 6.4GB ＋ pd 0.16GB ≒ 17.6GB**。ただし**そのうち 17.6GB ほぼ全てが「救出不要・削除可」と今回確定**。残る判断対象は pjdhiro の 2 SVG（12.6KB）のみ |
| PR-2 | Session hygiene | WARN | pd state.md 未反映 26 コミット（35 日・人のセッション発は今週ゼロ）・as proposal 80 日。gonin session-log-check 93 件・**増分 0** |
| PR-3 | Canonical reference drift | WARN | as `codex-worker-instruction.md:87` の 1 件のみ（**3 回連続・1 行**）。他 8 hit は全て正当な言及。kdt は archived で SKIP |
| PR-4 | Quality smoke | **PASS** | `static-checks.js` **11/11**／`responsive-test.js` **5/5**（サンドボックス外・localhost:3004=200）／wiki U+FFFD **0**／`wiki-access-lint` OK（332 ページ・404 原典）／`wiki-cross-check --all` 300 ペア。**leak した headless Chrome 0 件**（2 週連続で再発なし） |
| PR-5 | Review queue health | WARN | codex pending **0**。pd inbox periodic 4 通・二重生成 wiki 6 回連続・cs#242 144 日。**前回 run は完走**（`ad3ee9d` が origin 到達） |
| PR-6 | Publication staleness | **PASS** | **5 回連続**。evidence 30/30 が `entry_count: 0` stub → compared=0 / warn=0 / skipped=30。旧世代 SVG 30 件は凍結 INFO |

## Resolved since last run（0914 follow-up 11 件の消化状況）

- ✅✅ **cs 孤児 worktree の「救出」（follow-up #3）** — **救出対象が存在しないことを機械照合で確定**。2 PDF は main に別名で MD5 一致・tracked、他 9 差分は意図的削除（cs#249 / cs#252）か旧版（`589c1d1`）で git 履歴から復元可能。**6 回積み上げた宿題が消えた**
- ✅✅ **pjdhiro worktree の突き合わせ（follow-up #1）** — **2026-08-21 に既に実施済みだった**（`gonin/garage/_rescue-pjdhiro/` の README ＋ ZX-DIFF）。MD5 照合で救出済みを裏取り。前回「未確認」としたのは退避先の記録に気づかなかったため。**残るのは 2 SVG の判断のみ**
- ✅ **investing の扱い（follow-up #6）** — repo 自身の最終 commit が「gonin/shisan へ移設＝アーカイブ」と宣言、bundle も存在。**SKIP へ再分類して決着**
- ✅ **leak した headless Chrome** — 2 週連続で 0 件（`userDataDir` の再発防止は未実施だが実害が出ていない）
- ⏸ **cs#242** — 144 日・**7 回連続**（ただし性質が「救出待ち」から「権限だけ」に変わった）
- ⏸ **pd state.md 更新** — 25 → 26 コミット（35 日）
- ⏸ **pd inbox periodic** — 3 → **4 通**
- ⏸ **pd 孤児 worktree dir 2 件** — 6 回連続
- ⏸ **as template 87 行目** — 3 回連続（1 行の修正）
- ⏸ **as proposal** — 73 → **80 日**
- ⏸ **二重生成 wiki 2 組** — 6 回連続
- ⏸ **shaman-meta-site のバックアップ** — 2 週連続で手元 1 箇所のみ
- ⏸ **定期レビュー commit の `Session:` trailer 方針** — 未決
- ⏸ **wiki-cross-check の missing 列挙 / responsive-test の userDataDir / 空 dir prune / futari-gate-throwaway の去就** — 不変

**消化 4 / 11**（うち 2 件は「積み上がった大物が実は片付いていた／片付けられる」型）。先週まで 2〜3 件だったのは、**指摘を繰り返すだけで中身を検証していなかったため**。今回 MD5 と git 履歴まで降りたら 2 件が即座に解けた。

## Skipped

| repo | check | reason |
|---|---|---|
| kesson-driven-thinking | PR-3 | GitHub archived（SKILL §3）。inbox の 3〜4 月ファイル 6 件も凍結扱い |
| investing | 全 | **今回から archived 扱い**（repo 自身が `e077ae5` で宣言・bundle 保全済み） |
| shaman-meta-site / futari-gate-throwaway | PR-2・PR-3・PR-6 | CLAUDE.md / `.cache` 規約なし。PR-1 のみ |
| all | 修正・prune・削除（本レポート・state・inbox follow-up 以外） | SKILL §7「自動で修正しない」 |
| project-design | `quartz/.npmrc` | sandbox deny（`**/.npmrc`）で `git status` が 1 行エラー。結果に影響なし |

## Follow-up

優先度順:

1. **cs#242 を決着させる**（144 日・7 回連続）— **今回で前提が変わった**。「救出が先」という理由は消え、残る障害は `rm -rf` の実行権限だけ。allow に足すか「対話セッションで手で打つ」と決めて閉じれば、**約 17.6GB が 1 セッションで片付く**。定期レビューからこれ以上押しても動かないので、**本レポートを最後の催促とする**
2. **pjdhiro の 2 SVG を判断する**（`route-ladder.svg` 6,045B / `weapon-radar.svg` 6,558B・2026-07-25・`bike-selection-height-eed99b/garage/assets/`）— **pjdhiro 6.4GB 全体でこれだけが未照合**。gonin へ退避するか捨てるかを決めれば worktree 11 件が全部片付く
3. **掃除の実行**（cs#242 決着後・順序は自由になった）— cs 孤児 10 件 8.0GB ＋ cs 登録 3 件 2.9GB ＋ pjdhiro 11 件 6.4GB ＋ pd 孤児 2 件・登録 1 件 158MB
4. **pd state.md を Read-Before-Write で更新**（26 件を 1 項に畳む・未コミットの空行削除も処理）＋ **pd inbox の periodic 4 通＋本レポートを消化して archive**
5. **as template 87 行目の差し替え**（1 行・3 回連続）／**as proposal（80 日）の移送 or archive**
6. **shaman-meta-site のバックアップ** — push か bundle。investing が bundle で保全した前例に倣うのが早い
7. **二重生成 wiki 2 組の採否**（pjdhiro 承認・6 回連続）
8. **定期レビュー自身の副作用を整理** — `wiki-conflict-candidates-*.md` 6 本の archive ＋ 今後の抑止／定期レビュー commit の `Session:` trailer 方針
9. `wiki-cross-check.mjs` の missing 列挙／`responsive-test.js` の `userDataDir`／myhome 4・gonin 1・futari 1 の空 dir prune／pjdhiro の未マージ remote 枝 14 本／futari-gate-throwaway の去就

## SKILL 改訂提案（pjdhiro 承認事項・本 run では提案のみ）

前回の提案（PR-1 に「登録済み worktree の最終更新日・dirty・容量」と「remote の有無」を追加）は**本 run で実際に回してみて有効だった**＝cs の登録 worktree 2.9GB を新たに検出できた。加えて 2 点を足したい:

- **PR-1 に「救出候補の機械照合」を入れる**: worktree を残す理由が「中身が未回収かもしれない」である以上、ファイル名ではなく **MD5 ＋ `git log --all --find-object` / `git show <deleted-commit>^:<path>` で照合する**。今回これをやったら 6 回続いた WARN が 2 件とも消えた。**「未照合」を WARN として繰り越す前に照合する**を手順に書く
- **archived repo の判定を state で持つ**: kdt（GitHub archived）と investing（repo 自身が宣言）で判定方法が違う。state の repo ごとに `archived: true` と根拠を持たせ、PR-1 の upstream 比較を飛ばす

## メタ

- FAIL: 0 件 / WARN: 9 件 / 解消: 4 件 / INFO: 8 件 / PASS: 7 repo / SKIP: 2 repo
- **今週いちばんの収穫は「積んでいた宿題の多くが、実はもう済んでいた」こと**。cs の 2 PDF は 6 回「未救出」と書き続けたが、書誌訂正でリネームされた同一ファイルが main にずっとあった。pjdhiro の garage 下書きは、前回「未照合」と書いた 3 週間前（0821）に既に選別され、判断表（ZX-DIFF.md）まで残されていた。**どちらも「名前で突き合わせた」「退避先の記録を探さなかった」という点検側の粗さが原因**で、repo 側は正しく動いていた
- **この 2 件が解けたことで、17.6GB の掃除から「救出」という重い前提が外れた**。残る判断対象は 12.6KB の SVG 2 枚だけ。cs#242 は 144 日 OPEN だが、**いま閉じれば debt が一掃できる状態にある**
- 一方で **pd 自身は今週も人のセッションがゼロ**（新規 commit は定期レビュー自身の 1 件のみ）。state.md は 35 日・inbox の periodic は 4 通に増えた。0907・0914 と同じく「pd は書き込み先であって宿題を片付ける場所ではない」状態が 3 週続いている。**follow-up を pd の inbox に積むこと自体が機能していない**ので、優先度 1・2 は pjdhiro へ直接返すのが早い
- **1 行の修正（as template:87）が 3 週間、12.6KB の判断が 1 週間、144 日の Issue が 7 回** — 滞留の長さは作業量と相関していない。動くかどうかは「誰が決めるか」が決まっているかで決まっている
- 定期レビューは検出と記録のみ。修正・prune・削除は未実行（commit / push はレポート・state・inbox follow-up のみ）
- サンドボックス: ループ内 `git fetch` と `pgrep` / `curl :3004` はサンドボックス内で失敗（既知・`94b915f`）→ サンドボックス外で再実行した
