# Periodic Review: 2026-09-14 08:31

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL（`project-design` が兄弟に存在）
前回: 2026-09-07 08:31 → 今回まで **7 日**（scheduler 正常発火。0907 回は commit `99a0323` / `9bed217` まで origin に到達＝**前回は完走**）
チェックセット: PR-1〜PR-6
対象: `~/dev/*` の git repo **15 件**（前回 14 件 → **`shaman-meta-site` を新規に検出**）

## Summary

| repo | status | note |
|---|---|---|
| pjdhiro | **WARN** | **新規指摘（過去の run の取りこぼし）**。登録済み worktree **11 件・6.4GB**（7/12〜8/21 作成）。HEAD は 11 件すべて origin/main にマージ済みだが、**7 件に未コミット変更**＝`garage/` の下書き・`_chart-src/gen_*.py` 6 本の修正など。前回まで「clean」としていたのは本体 checkout だけを見ていたため。本体の `garage/` 残骸は**解消** |
| creation-space | WARN | 孤児 worktree **10 件・約 8.0GB**（**6 回連続**）。救出対象の 2 PDF は**依然 main の `knowledge/raw/` に無い**。ブロッカー cs#242 は **137 日 OPEN**（updatedAt 2026-04-30 のまま） |
| project-design | WARN | state.md の未反映が **19 → 25 コミット**（最終 commit 2026-08-17・**28 日**）。inbox に periodic レポート **3 通**残置（0824/0831/0907）。孤児 worktree 2 件 58MB（**5 回連続**）。テストは全緑 |
| awareness-space | WARN | pd#115 F4' proposal が **73 日**滞留（4 回連続）／`docs/templates/codex-worker-instruction.md:87` の retired 参照が未修正（2 回連続） |
| investing | INFO | **GitHub 側の repo が消えている**（`git fetch` → `Repository not found`）。pd `0871205`（gonin#228）で URL を「手元の clone と bundle」に差し替え済み＝**意図された撤去と読める**。ローカル clone は clean。最終 commit 09-09＝launchd 日次更新も止まっている |
| shaman-meta-site | INFO | **新規検出**。09-13 に 1 commit のみ・**remote なし**・CLAUDE.md / `.cache` なし。Next 系（vinext）＋ `.wrangler/`・`.openai/hosting.json`＝外部ホスティングへの配信用サイト。630MB の大半は node_modules |
| gonin | INFO | clean。local main が origin に **behind 4**（すべて launchd `garden:` 自動 commit・09-13〜14）＝無害。**今回から PR-2/3/6 対象**＝PR-3 clean／inbox 0／session-log-check は下記 |
| futari | PASS | clean・同期（09-07 以降 43 commit）。空 dir 1 件＋prunable 1 件は前回から不変 |
| myhome | PASS | clean・同期。空 dir 4 件は前回から不変 |
| techo | PASS | 同期。untracked `transform/note/note-rules-05-three-and-seven.md`（7/3 から不変） |
| futari-gate-throwaway | INFO | 不変（去就は pjdhiro 判断待ち・2 回目） |
| kesson-space / uminomae.github.io / zenn-content | PASS | clean・同期・変化なし |
| kesson-driven-thinking | SKIP | GitHub archived。ローカルは origin/main と一致＝PR-1 PASS |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| WARN | pjdhiro | PR-1 | **登録済み worktree 11 件・6.4GB（新規指摘）**。`bike-continuation-dca711`(364M) / `bike-selection-gallery-48f188`(363M・dirty 3) / `bike-selection-height-eed99b`(363M・dirty 2) / `bold-faraday-3be80f`(724M・dirty 1) / `develop`(726M) / `long-stroke-scrambler-extra-f5d7a5`(736M・**dirty 15**) / `low-speed-practice-bike-32e18f`(736M) / `main-cleanup-ea5cba`(739M・dirty 1) / `mt03-cafe-racer-gallery-2352e6`(363M・dirty 1) / `romantic-almeida-7475d5`(736M) / `sr400-american-classic-edit-c48adf`(733M・dirty 2)。**HEAD は全件 origin/main の祖先**＝commit 済みの成果は失われない。ただし未コミット分に**実体のある作業**が混じる：`garage/data-adv-scrambler.md`・`garage/draft-hand-numbness.md`・`garage/draft-lowrev-racer.md`・`garage/assets/`・`garage/_chart-src/gen_{lowspeed,menace,practice,practice_small,ratio,torque}.py` の修正・`assets/garage/credits-additional.json`。`garage/` は 0821（`8fa721f`）に正本を myhome / 公開を `uminomae/garage` へ移したので、**これらの下書きが移転先に届いているかは未確認**。残り 4 件の dirty は `.claude/launch.json` のみ。前回までは本体 checkout と孤児 dir しか見ておらず、**登録済み worktree の容量と dirty を見落としていた** | ①dirty 7 件の `garage/` 系ファイルを myhome / `uminomae/garage` 側と突き合わせ、未到達があれば救出 ②その後 `git worktree remove` で 11 件を片付ける（約 6.4GB）。**cs と同じく救出が先・削除が後** |
| WARN | creation-space | PR-1 | 孤児 worktree **10 件・約 8.0GB**（`.claude/worktrees` 全体 11GB）。**6 回連続・件数も容量も不変**。`D03_winter-chambon_1986_gel-point.pdf`（657,930B）と `D25_vangennep_1909_rites-of-passage.pdf`（32,063,865B）は今も `cs219-narrow-scope/knowledge/raw/` にだけあり、main には無いことを再確認 | 順序は不変 — ①2 PDF を main へ救出 ②10 dir を削除。逆順は再取得不能 |
| WARN | creation-space / project-design | PR-1 | **cs#242（dev/ 配下の `rm -rf` を allow）が 137 日 OPEN**（updatedAt 2026-04-30）。cs 8.0GB・pd 58MB の掃除を止めている。pjdhiro 6.4GB も `worktree remove` で済むが同じ種類の滞留 | cs#242 を処理するか、「掃除は対話セッションで手で打つ」と決めて Issue を閉じる。**6 回同じ指摘を書いており、定期レビューで押しても動かない種類の案件**になっている |
| WARN | project-design | PR-2 | **state.md の未反映が 25 コミット**（記載 HEAD `1a148bb`・最終 commit `ef832a3` 2026-08-17）。今週の追加 6 件のうち人のセッション発は 4 件（`94b915f` 20260907-751／`4efe8d2` 20260907-998／`0871205` 20260909-666／`1842744` 20260912-937）で、**いずれも他 repo 発の knowledge 追記**。pd 固有セッションは **2026-08-19 以来 26 日**開かれていない。加えて state.md に**未コミットの空行 1 行削除**があり、mtime は **2026-08-24 08:31:42＝0824 の定期レビュー実行中**＝read-only のはずの定期レビューが state.md に触れた痕跡（実害なし） | 次の pd セッションで Read-Before-Write により 0817 項を閉じ、25 件を「他 repo 発の横断編集」1 項に畳む。空行削除は同時に commit するか戻す |
| WARN | project-design | PR-5 | **inbox に periodic レポート 3 通**（0824 / 0831 / 0907）＝follow-up 計 29 件が pd 側で未消化。原因は PR-2 と同一 | 次の pd セッションで 3 通＋本レポートをまとめて処理し archive |
| WARN | project-design | PR-1 | 孤児 worktree dir 2 件（`main-merge` / `wt-wiki-consciousness-core`・各 29MB）**5 回連続**。登録 worktree `value-creation-diagrams-a2a9e7`（detached `fa24187`）も残る | 対話セッションで `rm -rf`（調査済み・実行のみ） |
| WARN | project-design | PR-5 | 二重生成 wiki 2 組（`D08_miller_2001_{cohen-j-d,integrative-theory-prefrontal-cortex}` / `D15_dewey_1934_{1934,art-as-experience}`）**5 回連続**判断待ち。4 ファイルとも 7/2 23:08 のまま | 削除候補は `_cohen-j-d` と `_1934`（pjdhiro 承認） |
| WARN | awareness-space | PR-2 | `.cache/inbox/proposal-pd115-f4prime-order-experiment.md`（7/3）**73 日**・4 回連続 | 読んで pd へ移送 or archive（判断だけ付ける） |
| WARN | awareness-space | PR-3 | `docs/templates/codex-worker-instruction.md:87` が retired `creation-space/skills/commit-review-with-log/SKILL.md` を参照（2 回連続）。他の grep hit（pd periodic/codex SKILL の自己説明・cs の RETIRED 本体と CL-002・myhome dev-CLAUDE・gonin history）は正当な言及 | 87 行目を `project-design/.claude/skills/codex-review/` へ差し替え |
| INFO | investing | PR-1 | **origin（`uminomae/investing`）が GitHub に存在しない**。pd `0871205`「消えた investing repo への URL を手元の clone と bundle の案内に替えた（gonin#228）」と整合＝撤去は既知。ただしローカル clone は `origin` を指したままで、upstream 比較（0/0）は**古い remote-tracking との比較で意味を持たない**。最終 commit `e077ae5`（09-09）＝前回「dirty 12 は launchd 日次更新」とした更新も止まっている | 定期レビューの対象から外すか、remote を外して「ローカル専用 repo」として扱う（gonin#228 の決定に揃える）。次回からの PR-1 は upstream を見ない |
| INFO | shaman-meta-site | PR-1 | **新規検出**。`018d291`「Publish shaman metacognition article」（09-13 22:34）の 1 commit のみ・**remote なし**（GitHub に同名 repo なし）・CLAUDE.md / AGENTS.md / `.cache` なし。`.openai/hosting.json`・`.wrangler/{deploy,registry,state}`・`dist/`＝外部ホスティング（Cloudflare 系）へ配信済みのサイトと読める。**バックアップが手元 1 箇所のみ** | 残すなら GitHub へ push するか bundle を取る。定期レビュー対象規約に乗せるなら CLAUDE.md を置く（pjdhiro 判断）。techo worktree の枝名 `claude/shaman-tobacco-math-a44286` と関連の可能性 |
| INFO | gonin | PR-2 | `session-log-check.py`（gonin から実行）: [A] ログ無し transcript **8 件** / [B] trailer 無し **47 件**・split-trailer **32 件** / [D] 解決しない trailer 10 件（うち 9 件は launchd `garden:` の `-000` ID）・(remote) の Issue 参照なし 4 件 / [C][E][F] **0**。合計 93 件（凍結済み債務 [B]186・[D]144 は別掲）。**出力ヘッダが「対象: gonin」**で、dev/CLAUDE.md の「横断を見る」という記述と食い違って見える（pd の [F] も今回は出ていない） | gonin 側の管轄（gonin#234・#265）。定期レビューとしては、スクリプトが本当に横断しているか（pd の 28 日未コミット state.md が [F] に出ない理由＝3 時間閾値の対象外か、対象 repo 外か）を gonin 側で一度確認 |
| INFO | project-design | PR-2 | 前回の定期レビュー commit `99a0323` / `9bed217` には `Session:` trailer が無い（scheduled task は `session-log.sh begin` を通らない）。[B] に出続ける構造 | 定期レビュー commit に固定 trailer（例 `Session: periodic-{YYYYMMDD}`）を付けるか、例外登録するかを決める |
| INFO | project-design | PR-4 | 前回 WARN の **leak した headless Chrome（PID 624）は消滅**（`Chrome for Testing` プロセス 0）＝**解消**。`responsive-test.js` に run ごとの `userDataDir` を渡す再発防止は未実施 | 次に responsive-test を触るとき `userDataDir` を追加 |
| INFO | project-design | PR-4 | `wiki-cross-check --all`: pairs=300 / cs-missing=3 / pd-missing=2（**4 回連続同数**・列挙なし） | スクリプトに missing の列挙を追加 |
| INFO | gonin / myhome / futari | PR-1 | 0B 空 worktree dir: gonin **1 件**（前回の 2 件は消え、`content-fix-issues-517e8c` が新規）・myhome 4 件（不変）・futari 1 件＋prunable `/private/tmp/futari-mainchk`（不変） | 各 repo 管轄。`git worktree prune` ＋空 dir 削除 |
| INFO | creation-space | PR-6 | 旧世代 SVG（インライン `font-family`）30/30。凍結宣言どおり INFO | cs#224 rebuild 待ち |
| INFO | 複数 | PR-1 | `git branch -r --no-merged main`: pjdhiro **14**（`TV-dev`・`codex/*`・`claude/*` 等の古い枝）/ as 2 / cs 2 / ks 2 / kdt 2 / gonin 1 / pd 1（`origin/develop`＝main より 32 commit 先行・想定内） | pjdhiro の古い remote 枝は worktree 整理と同時に棚卸し |

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | 全 repo 期待ブランチ・diverged 0。gonin behind 4 は launchd 自動 commit のみ。**worktree 容量の総量が見えた**＝cs 孤児 8.0GB ＋ **pjdhiro 登録 6.4GB（新規指摘）** ＋ pd 58MB ≒ **14.5GB**。investing の remote 消滅・shaman-meta-site の remote なしを INFO で記録 |
| PR-2 | Session hygiene | WARN | pd state.md 未反映 25 コミット（28 日）・as proposal 73 日。gonin は今回から対象＝session-log-check 93 件（gonin 管轄） |
| PR-3 | Canonical reference drift | WARN | as template 87 行目の 1 件のみ（不変）。gonin を今回から対象に含めたが clean（history 文書の言及は正当）。kdt は archived で SKIP |
| PR-4 | Quality smoke | **PASS** | `static-checks.js` **11/11**／`responsive-test.js` **5/5**（サンドボックス外・localhost:3004=200）／wiki U+FFFD **0**／`wiki-access-lint` OK（332 ページ・404 原典）／`wiki-cross-check --all` 300 ペア |
| PR-5 | Review queue health | WARN | codex pending **0**。pd inbox periodic 3 通残置・二重生成 wiki 5 回連続。**前回 run は完走**（commit 2 件が origin に到達） |
| PR-6 | Publication staleness | **PASS** | 4 回連続。evidence 30/30 が `entry_count: 0` stub → compared=0 / warn=0 |

## Resolved since last run（0907 follow-up 11 件の消化状況）

- ✅ **leak した headless Chrome（PID 624）** — 消滅（再発防止の `userDataDir` は未実施）
- ✅ **pjdhiro `garage/` 残骸** — 本体 checkout から消えた（dirty 0）。ただし worktree 側に `garage/` 下書きが残っている（上記 WARN）
- ✅（部分）**gonin の 0B 空 dir** — 前回の 2 件は消滅（別の 1 件が新規）
- ⏸ **回ごとの完走確認の仕組み** — 未確認（ただし 0907 回は実際に完走）
- ⏸ **cs#242** — 137 日 OPEN（6 回連続）
- ⏸ **cs 孤児 worktree の救出→削除** — 救出未着手（6 回連続）
- ⏸ **pd state.md 更新** — 未反映 19 → 25
- ⏸ **pd 孤児 worktree dir 2 件** — 5 回連続
- ⏸ **as template の retired 参照** — 2 回連続
- ⏸ **二重生成 wiki 2 組** — 5 回連続
- ⏸ **as proposal** — 66 → 73 日
- ⏸ **wiki-cross-check の missing 列挙** — 未実施
- ⏸ **myhome / futari の空 dir・futari-gate-throwaway の去就** — 不変

**消化 2〜3 / 11**。消えたものは「プロセスが自然に終わった」「本体 checkout が片付いた」型で、**pd 管轄の持ち越しは今週も 0 件**。

## Skipped

| repo | check | reason |
|---|---|---|
| kesson-driven-thinking | PR-3 | GitHub archived（SKILL §3）。inbox の 3〜4 月ファイル 6 件も凍結扱い |
| shaman-meta-site / futari-gate-throwaway | PR-2・PR-3・PR-6 | CLAUDE.md / `.cache` 規約なし。PR-1 のみ |
| investing | PR-1 upstream 比較 | origin が GitHub に存在しない（gonin#228）。remote-tracking が古く比較不能 |
| all | 修正・prune・削除（本レポートと state 以外） | SKILL §7「自動で修正しない」 |
| project-design | `quartz/.npmrc` | sandbox deny（`**/.npmrc`）で `git status` が 1 行エラー。結果に影響なし |

## Follow-up

優先度順:

1. **pjdhiro worktree 11 件（6.4GB）の救出→片付け** — dirty 7 件の `garage/` 下書き・`_chart-src` 修正・`credits-additional.json` を myhome / `uminomae/garage` 側と突き合わせ、未到達を救出してから `git worktree remove`。**新規指摘で、中身に未コミットの作業がある点が cs / pd の残骸と違う**
2. **cs#242 を処理するか閉じる** — 137 日・6 回連続。「掃除は対話セッションで手で打つ」と決めて閉じる選択肢も含めて
3. **cs 孤児 worktree の救出（2 PDF）→削除**（約 8.0GB）
4. **pd state.md を Read-Before-Write で更新**（25 件を 1 項に畳む・未コミットの空行削除も処理）＋ **pd inbox の periodic 3 通＋本レポートを消化して archive**
5. **shaman-meta-site のバックアップ** — remote なし・手元 1 箇所のみ。push か bundle（pjdhiro 判断）
6. **investing を定期レビュー上どう扱うか決める** — remote 消滅は既知（gonin#228）。対象から外す or remote を外してローカル専用に
7. **pd 孤児 worktree dir 2 件の `rm -rf`**（58MB）
8. **as template 87 行目の差し替え**／**as proposal（73 日）の移送 or archive**
9. **二重生成 wiki 2 組の採否**（pjdhiro 判断）
10. **定期レビュー commit の `Session:` trailer 方針**を決める（固定 ID or 例外登録）／**session-log-check の横断範囲**を gonin 側で確認
11. `wiki-cross-check.mjs` の missing 列挙／`responsive-test.js` の `userDataDir`／myhome・futari・gonin の空 dir prune／futari-gate-throwaway の去就

## メタ

- FAIL: 0 件 / WARN: 9 件（新規 1・持ち越し 8）/ INFO: 10 件 / PASS: 6 repo / SKIP: 1 repo
- **今週いちばん大きい発見は pjdhiro の 6.4GB**。7 月から存在していたのに 0706〜0907 の 9 回すべてで見落としていた。原因は点検手順で、`.claude/worktrees/*` を「未登録の孤児 dir」としてしか見ておらず、**登録済み worktree の容量と dirty を数えていなかった**。登録済みでも放置されていれば残骸で、しかも `git worktree prune` では消えない。次回からは PR-1 で「登録済み worktree の最終更新日・dirty・容量」も一覧化する（手順の追記は SKILL 改訂＝pjdhiro 承認事項なので本 run では提案に留める）
- **dev/ 配下の worktree 残骸は合計 ≒14.5GB**（cs 8.0 ＋ pjdhiro 6.4 ＋ pd 0.06）。3 件とも「救出が先・削除が後」の型で、救出の判断が付かないまま止まっている
- **「リモートの無い repo」が 2 つになった**（investing＝消した・shaman-meta-site＝最初から無い）。前者は bundle で意図的に保全、後者は保全が見当たらない。同期ずれを「ahead/behind」で見る PR-1 の前提（upstream がある）が崩れる repo が増えているので、**「remote の有無」を PR-1 の独立項目にする**のがよい
- **pd への人のセッション commit は今週 4 件、すべて他 repo 発の knowledge 追記**（0907 に続き 2 週連続）。0907 メタの「pd は書き込み先であって宿題を片付ける場所ではなくなった」は今週も成立。state.md の mtime が 0824 定期レビュー中だったことも含め、**pd の state.md を実際に触っているのは定期レビューだけ**という状態
- 前回 run の push は完走（`99a0323`・`9bed217` とも origin 到達）。サンドボックス修正 `d26328a` は 2 回連続で有効。ただし**本 run 内でもループ中の `git fetch` はサンドボックス内で認証に失敗した**（`94b915f` の「excludedCommands はスクリプト内のコマンドに効かない」の再現）。サンドボックス外で再実行して取得した
- 定期レビューは検出と記録のみ。修正・prune・削除は未実行（commit / push はレポート・state・inbox follow-up のみ）
