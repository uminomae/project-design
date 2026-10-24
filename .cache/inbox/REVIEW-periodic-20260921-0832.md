# follow-up: periodic review 2026-09-21 08:32

正本: `.cache/reviews/periodic/REVIEW-periodic-20260921-0832.md`
FAIL 0 / WARN 9 / **解消 4** / INFO 8

> **今回は「積んでいた宿題の多くが、実はもう済んでいた」回**。MD5 と git 履歴まで降りて照合したら、6 回繰り返した WARN 2 件が消えた。**17.5GB の掃除から「救出」という前提が外れ、残る判断対象は 12.6KB の SVG 2 枚だけ**になっている。

## pjdhiro に返すもの（判断が要る・優先）

1. **cs#242 を決着させる**（144 日 OPEN・7 回連続の指摘）
   - **今回で前提が変わった**。これまで「救出が先・削除が後」で止まっていたが、**救出対象が存在しないことを確定**した。残る障害は `rm -rf` の実行権限だけ
   - allow に足すか「対話セッションで手で打つ」と決めて閉じれば、**約 17.5GB が 1 セッションで片付く**
   - 定期レビューからこれ以上押しても動かないので、**本レポートを最後の催促とする**

2. **pjdhiro の 2 SVG の去就**（`route-ladder.svg` 6,045B / `weapon-radar.svg` 6,558B・2026-07-25 作成）
   - 場所: `pjdhiro/.claude/worktrees/bike-selection-height-eed99b/garage/assets/`
   - **pjdhiro 6.4GB 全体でこれだけが未照合**。gonin/garage にも myhome/garage にも無く、2026-08-21 の退避 README が対象にした 3 系統のどれにも入っていない（同ディレクトリの `lowrev-torque.svg` は ZX-DIFF §3 で削除判断済みだが、この 2 枚は判断表に名前が出ない）
   - 中身を見て「gonin へ退避 or 捨てる」を決めれば worktree 11 件が全部片付く

3. **二重生成 wiki 2 組の採否**（6 回連続・削除候補は `D08_miller_2001_cohen-j-d.md` と `D15_dewey_1934_1934.md`）

4. **shaman-meta-site のバックアップ**（2 週連続で手元 1 箇所のみ・629M）— push か bundle。investing が bundle で保全した前例あり

5. **SKILL 改訂 2 点**（本文 §SKILL 改訂提案）— ①PR-1 に「救出候補の MD5 / git 履歴照合」を追加 ②archived repo を state で持つ

## pd セッションで消化するもの（自律実行可）

6. **state.md を Read-Before-Write で更新** — 未反映 26 コミット・35 日（記載 HEAD `1a148bb` は 2026-08-17）。未コミットの空行 1 行削除（mtime 2026-08-24 08:31:42）も同時に処理
7. **inbox の periodic 4 通（0824/0831/0907/0914）＋本ファイルを消化して archive**
8. **定期レビュー自身の副作用を整理** — `.cache/wiki-conflict-candidates-*.md` 6 本の archive ＋ cross-check に `--no-write` を足すか検討。定期レビュー commit の `Session:` trailer 方針も未決

## 他 repo へ（1 行〜軽微）

9. **as `docs/templates/codex-worker-instruction.md:87`** — retired `creation-space/skills/commit-review-with-log/SKILL.md` を `project-design/.claude/skills/codex-review/` へ差し替え（**3 回連続・1 行**）
10. **as `.cache/inbox/proposal-pd115-f4prime-order-experiment.md`**（80 日）— pd へ移送 or archive
11. 空 dir prune（myhome 4 / gonin 1 / futari 1）／pjdhiro の未マージ remote 枝 14 本／`wiki-cross-check.mjs` の missing 列挙／`responsive-test.js` の `userDataDir`／futari-gate-throwaway の去就

## 品質テストは全緑

`static-checks.js` 11/11・`responsive-test.js` 5/5・wiki U+FFFD 0・`wiki-access-lint` OK（332 ページ / 404 原典）・`wiki-cross-check` 300 ペア・PR-6 PASS（5 回連続）・codex pending 0・gonin session-log-check 増分 0
