---
type: REVIEW-periodic
source: .cache/reviews/periodic/REVIEW-periodic-20260914-0831.md
date: 2026-09-14
fail: 0
warn: 9
---

# 定期レビュー 0914 follow-up

本文: `.cache/reviews/periodic/REVIEW-periodic-20260914-0831.md`
（0824 / 0831 / 0907 の follow-up も未消化。まとめて処理して archive へ）

## 要対応（優先度順）

1. **pjdhiro 登録 worktree 11 件・6.4GB（新規指摘）** — HEAD は全件 origin/main 済みだが 7 件に未コミット変更（`garage/` 下書き・`_chart-src/gen_*.py` 6 本・`credits-additional.json`）。myhome / `uminomae/garage` と突き合わせて救出 → `git worktree remove`
2. **cs#242（137 日 OPEN）** を処理するか閉じる
3. **cs 孤児 worktree 10 件 8.0GB** — 2 PDF（`cs219-narrow-scope/knowledge/raw/D03_winter-chambon_1986_gel-point.pdf` / `D25_vangennep_1909_rites-of-passage.pdf`）を main へ救出 → 削除
4. **pd state.md 更新**（未反映 25 コミット・未コミットの空行削除あり）＋ inbox periodic 4 通の消化
5. **shaman-meta-site（新規・remote なし）** のバックアップ判断
6. **investing（GitHub repo 消滅・gonin#228）** を定期レビュー上どう扱うか
7. pd 孤児 worktree dir 2 件 58MB の `rm -rf`
8. as `docs/templates/codex-worker-instruction.md:87` の retired 参照差し替え／as pd#115 proposal（73 日）
9. 二重生成 wiki 2 組の採否（pjdhiro 判断）
10. 定期レビュー commit の `Session:` trailer 方針／session-log-check の横断範囲確認（gonin）
11. 小物: wiki-cross-check missing 列挙・responsive-test `userDataDir`・空 dir prune・futari-gate-throwaway の去就

## SKILL 改訂提案（pjdhiro 承認事項）

- PR-1 に「登録済み worktree の最終更新日・dirty・容量」と「remote の有無」を追加（今回 pjdhiro 6.4GB を 9 回見落とした原因）
