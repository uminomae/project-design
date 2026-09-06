# Follow-up: Periodic Review 2026-09-07 08:31

正本レポート: `.cache/reviews/periodic/REVIEW-periodic-20260907-0831.md`
判定: FAIL 0 / WARN 9 / INFO 8 / PASS 8 repo / SKIP 1 repo

> **注意**: この inbox には 0824・0831 のレポートも残置している。**3 通まとめて処理すること**。
> 残置していること自体が「pd の follow-up が 2 週間消化されていない」ことの証拠になっている。

## いま効く 3 件

1. **定期レビューが黙って止まっても誰も気づかない** — 09-06 に investing 発セッションが検出・修正（`d26328a`）。
   サンドボックスという症状は直ったが、`notifyOnCompletion: false` と pd 側 watchdog 不在は残っている。
   investing の `scripts/task-watchdog.py`（launchd・10 分ごと・トークン消費ゼロ）を横展開するのが最短。
2. **cs#242 が 130 日 OPEN**（`settings.json` に dev/ 配下の `rm -rf` を allow）。
   cs 8.0GB と pd 58MB の worktree 掃除を**両方**止めている。5 回連続で同じことを書いている。
3. **cs の 2 PDF 救出が未着手** — `D03_winter-chambon_1986_gel-point.pdf` / `D25_vangennep_1909_rites-of-passage.pdf`
   （どちらも `cs219-narrow-scope/knowledge/raw/` にのみ存在・main に無い）。
   **救出 → 削除の順序を逆にすると再取得不能**（原典取得は高コスト）。

## pd セッションを開いたときにやる

- [ ] state.md を Read-Before-Write で更新（0817 項を閉じ、18 コミットを「他 repo 発の横断編集」として 1 項に畳む）
- [ ] `rm -rf .claude/worktrees/{main-merge,wt-wiki-consciousness-core}`（58MB・調査完了済み・実行のみ）
- [ ] leak した headless Chrome（PID 624・2026-08-13 から 24 日稼働）を落とす
      ＋ `.claude/scripts/responsive-test.js:28` の `puppeteer.launch()` に run ごとの `userDataDir` を渡す
- [ ] `wiki-cross-check.mjs` に missing 5 件（cs 3 / pd 2）の列挙を追加
- [ ] inbox の 0824 / 0831 / 本レポートを消化して archive へ

## 他 repo へ渡す

- [ ] **as**: `docs/templates/codex-worker-instruction.md:87` の参照先を
      `creation-space/skills/commit-review-with-log/`（RETIRED）→ `project-design/.claude/skills/codex-review/` へ差し替え
- [ ] **as**: inbox の `proposal-pd115-f4prime-order-experiment.md`（66 日）を読んで pd へ移送 or archive
- [ ] **pjdhiro**: untracked `garage/` 残骸の整理
- [ ] **gonin / myhome / futari**: 0B の孤児 worktree dir 計 7 件を `git worktree prune` ＋ 空 dir 削除

## pjdhiro 判断

- [ ] 二重生成 wiki 2 組の採否（4 回連続）— `D08_miller_2001_cohen-j-d`(5,767B) vs `_integrative-theory-prefrontal-cortex`(7,056B)、
      `D15_dewey_1934_1934`(5,425B) vs `_art-as-experience`(6,166B)。削除候補は名前が退化した前者 2 つ（バイト数でも小さい方に一致）
- [ ] `futari-gate-throwaway` の去就（使い捨て済みなら削除・残すなら CLAUDE.md を置いて対象規約に乗せる）
- [ ] **pd の重心が移動している件** — pd への commit 18 件はすべて gonin / investing / futari 発の横断編集で、
      pd 固有のセッションは 2026-08-19 が最後。knowledge/ には CN-018〜021 と `reference/` 新設が積まれる一方、
      state.md と inbox は 3 週間止まっている。運用の劣化と読むか、重心の移動と読むかで次の手が変わる
