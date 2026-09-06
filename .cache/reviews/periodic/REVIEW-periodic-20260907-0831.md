# Periodic Review: 2026-09-07 08:31

実行主体: Claude Code scheduled task `weekly-periodic-review`（自動 / read-only）
環境: LOCAL（`project-design` が兄弟に存在）
前回: 2026-08-31 08:34 → 今回まで **7 日**（scheduler 正常発火）
チェックセット: PR-1〜PR-6
対象: `~/dev/*` の git repo **14 件**（前回 12 件 → **gonin / futari-gate-throwaway を新規に検出**）

> **本 run の位置づけ**: 08-31 の run 以降、この定期タスク自身が **承認プロンプト待ちで停止していた**ことが 09-06 に判明・修正された（commit `d26328a`）。**本 run は修正後の初回実行**であり、末尾の commit & push がその実地テストを兼ねる。詳細は PR-5。

## Summary

| repo | status | note |
|---|---|---|
| creation-space | WARN | 孤児 worktree **10 件・約 8.0GB**（5 回連続）。**救出対象の 2 PDF は依然 main に未到達**＝削除の前提条件が 2 週間動いていない。ブロッカー cs#242 は **2026-04-30 以降 130 日 未更新の OPEN**。本体は clean・同期 |
| project-design | WARN | state.md の未反映が **3 → 18 コミットへ拡大**（14 日間未コミット）。**18 件すべてが他 repo 発のセッションからの横断編集**＝pd に固有セッションが 3 週間開かれていない。孤児 worktree 2 件（58MB）は **4 回連続**未削除。static 11/11・responsive 5/5 |
| awareness-space | WARN | inbox の pd#115 F4' proposal が **66 日**滞留（3 回連続）。加えて `docs/templates/codex-worker-instruction.md` が **retired skill を参照**（PR-3 新規検出）。本体は clean・同期 |
| gonin | INFO | **今回新規に検出**。09-01 以降いちばん活動が濃い repo の 1 つ（CLAUDE.md 50KB・`.cache/session`・`.cache/reviews` を自前で整備済み）。clean・同期。PR-1 のみ実施 |
| futari-gate-throwaway | INFO | **今回新規に検出**。09-05 の実験 repo（名前どおり使い捨て想定・CLAUDE.md / `.cache` なし）。clean・同期。PR-1 のみ実施 |
| futari | PASS | clean・同期（前回 behind=11 → **解消**）。孤児 dir 1 件と prunable 登録 1 件はいずれも 0B |
| investing | PASS | clean・同期（前回 ahead=2 → **解消**）。dirty 12 は launchd 日次更新の生成物＝想定内 |
| myhome | PASS | clean・同期（前回 behind=5 → **解消**）。孤児 dir 4 件はすべて 0B |
| pjdhiro | PASS | clean・同期。untracked は `garage/` 残骸のみ（前回から変化なし） |
| techo | PASS | clean・同期。worktree 4 件はすべて登録済み |
| kesson-space | PASS | clean・同期 |
| uminomae.github.io | PASS | clean・同期 |
| zenn-content | PASS | clean・同期 |
| kesson-driven-thinking | SKIP | GitHub archived（read-only）。SKILL §3 に従い PR-3 対象外。ローカルは origin/main と一致＝PR-1 PASS |

## Findings

| severity | repo | check | detail | next step |
|---|---|---|---|---|
| WARN | project-design | PR-2 | **state.md の未反映が 3 → 18 コミットへ拡大**。記載 HEAD `1a148bb`（2026-08-17）に対し実 develop HEAD は **`b7f7dfa`**。`session-log-check.py` の [F] も **336 時間（14 日）未コミット**として同じものを検出。注目すべきは中身で、**18 件すべてに `Session:` trailer があり、かつすべて他 repo 発**＝`20260902-529`（gonin 帰納）/ `20260903-317` / `20260903-400`（gonin）/ `20260906-411` / `20260906-452` / `20260906-846`（investing 発）。**辿る道は切れていない**が、pd に固有のセッションは 2026-08-19 を最後に 3 週間開かれていない | 次に pd セッションを開いたとき Read-Before-Write で 0817 項を閉じ、18 件を「他 repo 発の横断編集」としてまとめて 1 項に畳む。18 件を個別に書き起こす必要はない（各 `Session:` から辿れる） |
| WARN | creation-space | PR-1 | 孤児 worktree **10 件・約 8.0GB**（`charming-euclid` 880M / `cs219-narrow-scope` 877M / `keen-bardeen` 880M / `lucid-jepsen` 880M / `raw-rerun-continue` 13M / `sad-bhabha` 880M / `stupefied-boyd` 911M / `vigorous-jemison` 880M / `vigorous-pasteur` 880M / `zealous-satoshi` 880M。登録済み 3 件を含む `.claude/worktrees` 全体では 11GB）。**5 回連続の持ち越し・増加は止まったまま**。0831 で削除条件は実測確定済みだが、**その前提である救出が実行されていない**＝`D03_winter-chambon_1986_gel-point.pdf`（657,930B）と `D25_vangennep_1909_rites-of-passage.pdf`（32,063,865B）は今も `cs219-narrow-scope/knowledge/raw/` にしか存在せず、main の `knowledge/raw/` に**無い**ことを再確認した | 順序は 0831 のまま変わらない — ①2 PDF を main へコピー（原典再取得は高コスト。memory「cs原典取得の鉄則」）②その後 10 dir を削除（約 8.0GB 回収）。**逆順にすると再取得不能** |
| WARN | creation-space / project-design | PR-1 | **ブロッカー cs#242 が 2026-04-30 から 130 日 OPEN のまま**（`settings.json` に dev/ 配下の `rm -rf` を allow 追加）。cs 8.0GB と pd 58MB の worktree 掃除を**両方**止めている当の Issue。5 回連続で同じ指摘を書いている | cs#242 を処理する。掃除 2 件はどちらも調査完了済みで、残っているのは実行権限だけ |
| WARN | project-design | PR-1 | 孤児 worktree dir 2 件（`main-merge` / `wt-wiki-consciousness-core`・各 29MB＝計 58MB）が **4 回連続で未削除**。0817 に「中身は git 履歴上の旧 blob のみ＝削除して問題ない」と確認済み | 対話セッションで `rm -rf .claude/worktrees/{main-merge,wt-wiki-consciousness-core}`。実行のみ |
| WARN | awareness-space | PR-3 | **新規検出（前回 PASS は取りこぼし）**。`docs/templates/codex-worker-instruction.md:87` が「`creation-space/skills/commit-review-with-log/SKILL.md` を参照して `.cache/outbox/REVIEW-*.md` を残す」と指示している。参照先は front matter に **`[RETIRED / 廃止]`** と明記され「新規に本スキルを起動しないこと」と書かれた旧正本。**cs 側の retired 明示は正しく、drift は as 側の指示テンプレートにある**（他の grep hit ＝ pd の SKILL 自己説明・cs `CL-002` 教訓文書は正当な言及で drift ではない） | as の template 87 行目の参照先を `project-design/.claude/skills/codex-review/` へ差し替える。as は 2026-05-11 で活動停止中のため緊急性は低いが、**as を再開した瞬間に retired skill を起動する導線**なので放置しない |
| WARN | project-design | PR-4 | **`responsive-test.js` が古い headless Chrome プロセスに阻まれて起動できなかった**（`Fatal: The browser is already running for /tmp/claude-501/puppeteer_dev_chrome_profile-46Xps7`）。原因は **PID 624 の "Google Chrome for Testing" が 2026-08-13 20:09 から 24 日間 動き続けている**こと＝過去の run が leak したプロセスがプロファイルのロックを握ったまま。今回は `TMPDIR` を本 run の scratchpad に振り替えて回避し **5/5 PASS** を取得した | leak した PID 624 を落とす（対話セッションで判断）。併せて `responsive-test.js` の `puppeteer.launch()` に run ごとにユニークな `userDataDir` を渡せば再発しない（現状 28 行目は `{ headless: true }` のみ） |
| WARN | project-design | PR-5 | **pd inbox に periodic レポートが 2 件残置**（`REVIEW-periodic-20260824-0831.md` / `-20260831-0834.md`）＝**0824 の follow-up 8 件・0831 の 10 件が 2 週間まったく消化されていない**ことの機械的な証拠。原因は PR-2 と同一＝pd の対話セッションが 3 週間開かれていない（pd への commit 18 件はすべて他 repo 発の横断編集） | inbox の archive は消化とセット。次に pd セッションを開いたら 0824・0831・本レポートの 3 通をまとめて処理する |
| WARN | project-design | PR-5 | 二重生成 wiki ページ 2 組が未処理（**4 回連続で pjdhiro 判断待ち**）: `D08_miller_2001_cohen-j-d.md`(5,767B) / `D08_miller_2001_integrative-theory-prefrontal-cortex.md`(7,056B)、`D15_dewey_1934_1934.md`(5,425B) / `D15_dewey_1934_art-as-experience.md`(6,166B)。**4 ファイルとも 7/2 23:08 のまま不変**。再発源は 0817 の `wiki-gen-check.sh` 修正で停止済み | 各組を比較して残す方を決め、他方を削除（値判断を含むため pjdhiro 承認）。ファイル名が退化している `_cohen-j-d`（共著者名）と `_1934`（年の重複）が削除候補で、バイト数でも両方とも小さい方に一致する |
| WARN | awareness-space | PR-2 | `.cache/inbox/proposal-pd115-f4prime-order-experiment.md`（2026-07-03・**66 日**滞留・59 → 66 日）。内容は pd#115（F4' 順序実験）で、pd#115 / pd#126 はいずれも OPEN＝**pd 側で生きている論点**（memory「pd#115 は二つの別レンズ」「pd#124 行列が第一の方法論」） | 一度読んで RR-024 本線と突き合わせ、生きていれば pd へ移送・死んでいれば `archive/`。**3 回連続の持ち越しなので判断だけ付ける** |
| INFO | project-design | PR-5 | **この定期タスク自身が停止していた**（09-06 に investing 発セッションが検出・修正、commit `d26328a`）。症状＝`git push origin develop` を `dangerouslyDisableSandbox` でリトライしたところで承認プロンプト待ちのまま停止。**ローカルの承認プロンプトにタイムアウトが無く、`notifyOnCompletion: false` のため誰も気づけなかった**。根因は TLS ではなく認証情報で、サンドボックス内から macOS キーチェーンの credential helper に届かない（`could not read Username for 'https://github.com': Device not configured`）。対処＝`.claude/settings.json` の `sandbox.excludedCommands` に `git push` / `git fetch` / `git pull` / `git ls-remote` / `gh` を追加（適用済みを確認）。検出したのは `investing/scripts/task-watchdog.py`（launchd・10 分ごと・トークン消費ゼロ）。**なお commit message は「2026-08-27 から停止」と書いているが、0831 のレポートは 08-31 08:38 に commit されている**（停止区間の起点は本 run からは確定できない） | ①**本 run の末尾 push が修正の実地テスト**（結果は「メタ」節に追記）②`notifyOnCompletion` を true にするか、pd 側にも watchdog を効かせるかを検討する。**週次レビューが黙って止まっても誰も気づかない構造**が今回いちばん高くついた |
| INFO | gonin | PR-1 | **新規検出 repo**。09-01 以降の横断セッションログ 147 件の主要な発生源の 1 つで、CLAUDE.md 50,617B・`.cache/{session,reviews,hooks}` を自前で整備済み＝pd 系の運用枠組みには**既に乗っている**。09-03 に自前の Claude レビュー 1 件（`REVIEW-claude-gonin-8825e1e-20260903.md`）。clean・同期 | 次回から PR-2・PR-3・PR-6 も対象に含める。今回は初回検出のため PR-1 のみ |
| INFO | futari-gate-throwaway | PR-1 | **新規検出 repo**。09-05 の 1 日で作られた実験 repo（`gate/` `approval/` `allowed_signers`・署名付き承認フローの検証）。CLAUDE.md も `.cache` も無く、名前が示すとおり使い捨て想定 | 用が済んでいれば削除、残すなら CLAUDE.md を置いて定期レビューの対象規約に乗せる（pjdhiro 判断） |
| INFO | gonin / myhome / futari | PR-1 | 孤児 worktree dir を新たに検出したが、**すべて 0B の空ディレクトリ**＝gonin 2 件（`bike-continuation-0d8fc1` / `current-situation-review-098c73`）・myhome 4 件（`asparagus-planting-position-769e52` / `github-actions-policy-fb13d7` / `parallel-session-todo-bug-28e391` / `spinach-germination-log-f17544`）・futari 1 件（`elastic-newton-97a137`）。加えて futari に prunable 登録 1 件（`/private/tmp/futari-mainchk`）。cs / pd のような容量問題ではない | `git worktree prune` と空 dir の削除で片付く。各 repo 管轄。**実害が無いので優先度は cs / pd より下** |
| INFO | project-design | PR-4 | `wiki-cross-check.mjs --all`: **pairs=300 / cs-missing=3 / pd-missing=2**（3 回連続で同数）。出力 `.cache/wiki-conflict-candidates-20260906.md` は件数を front matter に書くだけで**どの source が missing かを列挙しない**ため追跡不能 | 次に wiki 作業をするとき、スクリプトに missing 5 件の列挙を足す |
| INFO | project-design | PR-4 | **サンドボックス内から `localhost:3004` に到達できない**（curl が `000`／サンドボックス外では `200`）。launchd の `com.uminomae.project-design`（PID 2227）は正常稼働中。これを SKIP と読むと**サーバーが動いているのにテストを飛ばす**ことになる（memory「sandbox で localhost テスト誤SKIP」の再現） | 対応不要（既知）。responsive/static テストはサンドボックス外で実行する |
| INFO | pjdhiro | PR-1 | untracked `garage/` は `8fa721f`（0821）で正本を myhome / 公開を `uminomae/garage` へ移した際のローカル残骸（**2 回連続で変化なし**） | myhome 側に揃っていることを確認して削除、または gitignore |
| INFO | creation-space | PR-6 | 旧世代 SVG（インライン `font-family`）**30/30 件**。0817 の凍結宣言（evidence が全て `entry_count: 0` stub＝再生成の入力が無い）に従い INFO 据え置き | cs#224 umbrella の evidence rebuild で entry が入った領域から順に再生成 |
| INFO | project-design | PR-2 | `session-log-check.py` [A]: セッションログの無い transcript **2 件**＝09-02 13:23（447KB・main）と 09-07 08:35（591KB＝**本 run 自身**）。09-02 分は `82ed53c`（CN-018＋`knowledge/reference/` 新設）に対応する可能性が高いが、同コミットの `Session: 20260902-529` は横断サマリ側にログを持つ | 09-02 分は横断サマリ `SESSION-20260902-529.md` で辿れるかを確認する。本 run 分は末尾の commit で解消される |

## PR 別判定

| ID | check | 判定 | メモ |
|---|---|---|---|
| PR-1 | Git drift | WARN | **14 repo すべて期待ブランチ・同期ずれ 0 件**（前回 3 件＝investing ahead=2 / futari behind=11 / myhome behind=5 は**全部解消**）。diverged も 0。**同期という意味では今期いちばん良い状態**。WARN の理由は worktree 残骸のみ＝cs 10 件 8.0GB（5 回連続・横ばい）／pd 2 件 58MB（4 回連続）／新規に gonin・myhome・futari の 0B 空 dir 計 7 件 |
| PR-2 | Session hygiene | WARN | pd state.md の未反映が **3 → 18 コミット**（14 日）。as の 66 日滞留 proposal。**ただし 18 件すべてに `Session:` trailer があり、`session-log-check.py` [B] も 0 件＝trailer 規律そのものは守られている**。壊れているのは pd の state.md だけで、追跡可能性は他 repo 発のセッションログが担保している。inbox は pd（レポート 2 件残置）・as（1 件）以外は 0。他 repo outbox の `DONE-*` / `REVIEW-*` はすべて 4〜5 月の完了記録＝アーカイブ相当 |
| PR-3 | Canonical reference drift | **WARN** | 2 回連続 PASS から降格。**as `docs/templates/codex-worker-instruction.md:87` が retired skill を参照している**のを新規検出（前回の PASS は取りこぼし）。cs `skills/commit-review-with-log/SKILL.md` 自体は `[RETIRED]` 明示＋後継ポインタ付きで正しい。kdt は archived で恒久 SKIP |
| PR-4 | Quality smoke | **PASS** | `static-checks.js` **11/11**／`responsive-test.js` **5/5**（WCAG 2.2 AA・ただし leak した Chrome の回避が必要だった＝上記 WARN）／wiki U+FFFD **0**／`wiki-access-lint` OK（332 ページ・404 原典・取得不能原典への page なし）／`wiki-cross-check --all` 300 ペア。**テスト結果自体はすべて緑** |
| PR-5 | Review queue health | WARN | codex pending **0 件**（`cs` / `myhome` に review dir はあるが `pending/` は不在）。**0824・0831 のレポートが 2 通とも inbox 残置＝follow-up 18 件が消化 0**。二重生成 wiki 2 組も 4 回連続で判断待ち。加えて**定期タスク自身の停止と修正**を記録（上記 INFO） |
| PR-6 | Publication staleness | **PASS** | 3 回連続 PASS。凍結宣言適用で evidence 30 件すべて `entry_count: 0` → skip、**compared=0 / warn=0**。旧世代 SVG 30 件は INFO 据え置き |

## Resolved since last run（0831 follow-up 10 件の消化状況）

- ✅ **investing の未 push 2 コミット** — 解消（ahead=0・dirty 12 は生成物のみ）
- ✅ **futari のローカル main を pull で追随** — 解消（behind=0・`ui/` の未コミット 2 件も消滅）
- ✅ **myhome の pull** — 解消（behind=0・dirty 0。`.claude/settings.json` の未コミットも解消）
- ⏸ **cs#242（`rm -rf` allow）** — 未処理（130 日 OPEN・**5 回連続**）
- ⏸ **cs 孤児 worktree の救出→削除** — 未実施。**救出（2 PDF）すら未着手**で、削除の前提が動いていない
- ⏸ **pd 孤児 worktree dir 2 件の `rm -rf`** — 未実施（**4 回連続**）
- ⏸ **pd state.md の更新** — 未実施。**未反映が 3 → 18 コミットに拡大**
- ⏸ **二重生成 wiki 2 組の採否** — 未実施（pjdhiro 判断待ち・4 回連続）
- ⏸ **as inbox の pd#115 proposal** — 未実施（59 → 66 日）
- ⏸ **`wiki-cross-check.mjs` の missing 列挙追加** — 未実施
- ⏸ **pjdhiro `garage/` 残骸の整理** — 未実施

**消化 3 / 10**。消化された 3 件はすべて **PR-1 の同期ずれ**で、いずれも当該 repo（investing / futari / myhome）で活発にセッションが回っているために自然に解消したもの。**pd 管轄の 7 件は 1 件も動いていない**。0831 の「follow-up の消化は pd で対話セッションが開かれるかに完全に依存している」という観測は今週も成立した。

## Skipped

| repo | check | reason |
|---|---|---|
| kesson-driven-thinking | PR-3 | GitHub archived（read-only）。SKILL §3 の規定どおり対象外。ローカルは origin/main と一致＝PR-1 PASS |
| gonin / futari-gate-throwaway | PR-2・PR-3・PR-6 | 今回が初回検出。`.cache/` 規約・正本参照・公開物の対応関係の評価は次回から。PR-1 のみ実施した |
| all | 修正・prune・削除・push（本レポートと state 以外） | SKILL §7「自動で修正しない」。検出と記録のみ |
| project-design | `quartz/.npmrc` の読み取り | sandbox deny ルール（`**/.npmrc`）で `git status` が 1 行エラーを返す。結果に影響なし |

## Follow-up

優先度順:

1. **`notifyOnCompletion` / watchdog を pd 側にも効かせる** — 今回いちばん高くついたのは「週次レビューが黙って 10 日近く止まり、誰も気づかなかった」こと。`d26328a` はサンドボックスという**症状**を直したが、**気づけない構造**はまだ残っている。investing の `task-watchdog.py` を横展開するのが最短
2. **cs#242（`rm -rf` allow）を処理して worktree 掃除のブロッカーを外す** — cs 8.0GB と pd 58MB の**両方**を止めている 1 件。130 日 OPEN
3. **cs 孤児 worktree の救出→削除** — ①`D03_winter-chambon_1986_gel-point.pdf` と `D25_vangennep_1909_rites-of-passage.pdf`（どちらも `cs219-narrow-scope/knowledge/raw/`）を main の `knowledge/raw/` へ**先に**救出 → ②10 dir を削除（約 8.0GB 回収）。**順序を逆にすると再取得不能**
4. **pd state.md を Read-Before-Write で更新** — 0817 項を閉じ、18 コミットを「他 repo 発の横断編集」として 1 項に畳む（個別の書き起こしは不要＝各 `Session:` trailer から辿れる）
5. **pd 孤児 worktree dir 2 件の `rm -rf`**（58MB・調査完了済み・実行のみ）
6. **leak した headless Chrome（PID 624・24 日稼働）を落とす** ＋ `responsive-test.js` に run ごとの `userDataDir` を渡す（再発防止）
7. **as `docs/templates/codex-worker-instruction.md:87` の retired 参照を `codex-review` へ差し替える**（as 再開時に retired skill を起動する導線）
8. **二重生成 wiki ページ 2 組の採否**（pjdhiro 判断・`D08_miller_2001_*` / `D15_dewey_1934_*`・削除候補は `_cohen-j-d` と `_1934`）
9. **as inbox の pd#115 F4' 順序実験 proposal（66 日）** を読んで pd へ移送 or archive
10. **`wiki-cross-check.mjs` に missing 5 件（cs 3 / pd 2）の列挙を追加**、**pjdhiro `garage/` 残骸の整理**、**gonin / myhome / futari の 0B 空 worktree dir を prune**
11. **futari-gate-throwaway の去就**（使い捨て済みなら削除・残すなら CLAUDE.md を置く。pjdhiro 判断）

## メタ

- FAIL: 0 件 / WARN: 9 件（新規 3・持ち越し 6）/ INFO: 8 件 / PASS: 8 repo / SKIP: 1 repo
- **PR-1 の同期ずれが 3 件 → 0 件になった**のが今週いちばんの改善。14 repo すべてが期待ブランチで ahead=0 / behind=0 / diverged=0。ただしこれは「よく動いている repo が自力で追いついた」結果で、pd 管轄の持ち越しには効いていない
- **今週の主題は「気づけない構造」**。定期タスクが承認プロンプト待ちで停止しても、①プロンプトにタイムアウトが無い ②`notifyOnCompletion: false` ③pd に watchdog が無い、の 3 つが重なると誰にも見えない。実際に検出したのは pd でも定期レビューでもなく **investing の launchd watchdog** だった。**このレビュー自身の可用性が、このレビューの外側から支えられている**という非対称は記録しておく価値がある
- **pd の持ち越し 7 件は 3 週間まったく動いていない**。原因は明確で、pd に固有のセッションが 2026-08-19 以来開かれていないこと。pd への commit 18 件はすべて gonin / investing / futari 発のセッションからの横断編集で、**pd は「他の repo で得た知見を書き込む先」になっており、「自分の宿題を片付ける場所」ではなくなっている**。knowledge/ には CN-018〜021 と `reference/` 新設が積まれた一方、state.md と inbox は 3 週間止まったまま — この非対称は運用の劣化ではなく**重心の移動**として読むほうが正確かもしれない（判断は pjdhiro）
- **PR-3 が PASS → WARN**。降格の理由は状況の悪化ではなく、**前回の grep 結果の読みが甘かった**こと。hit 一覧のうち as の template だけが「生きた指示文書が retired 資産を指している」型で、他（SKILL 自己説明・教訓文書）とは質が違う
- **PR-4 は 5/5・11/11 で全緑だが、そこに至るまでに 2 つの罠を踏んだ** — サンドボックスの localhost 遮断（memory 既知）と、24 日間 leak していた headless Chrome。**どちらも「テストが赤い」ではなく「テストが走らない」形で現れる**ので、SKIP と書いて流すと品質ゲートが静かに空洞化する
- PR-6 は 3 回連続 PASS。凍結宣言は定着している
- 間隔は 7 日（想定どおり）。scheduler の欠測なし
- 定期レビューは検出と記録のみ。本 run でも修正・prune・削除は実行していない（read-only 制約）
