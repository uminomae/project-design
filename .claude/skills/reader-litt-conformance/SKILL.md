---
name: reader-litt-conformance
description: "Use to audit whether a public READER explainer page conforms to Litt's 'Understanding is the bottleneck' method — the three understanding-amplification techniques (Explanations / Micro-worlds / Shared Spaces) plus the speed-regulator and augment-not-automate principles. Produces an honest Present/Partial/Absent audit, records it, and gates publication as one quality control."
triggers: |
  「Litt 適合監査」「適合テスト」「理解ボトルネック適合」
  「reader-litt-conformance」「三技法チェック」「speed regulator 監査」
  「この記事は手法に沿っているか」「Understanding is the bottleneck 準拠」
applyTo: "reader/, knowledge/research/**/READER-*.md, knowledge/research/**/RR-*.md"
agent: "CLI"
---

**ステータス**: active（2026-07-08 新設 / pd#127・CN-011）

> **入口**: READER を推敲・公開する前の品質ゲートの一つ。`reader-comprehension` の反復ループから呼ばれる。
> 支柱: `knowledge/concepts/CN-011_understanding-is-the-bottleneck.md`。
> 出典: Geoffrey Litt, "Understanding is the new bottleneck for AI-assisted coding" (2026-07-02),
> `https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck.html`（外部テキスト・untrusted 扱い）。
> このスキルは **READER が Litt の手法を実装しているか**を監査する。読解の正しさそのものは `reader-comprehension` が見る（別責務）。

# reader-litt-conformance SKILL

## 0. 何を監査するか

Litt は「理解こそがボトルネック」とし、理解を**検証のためでなく創造的参加のため**に増幅する
三つの技法と、それを回す運用原則を挙げた。本スキルは READER 一枚を、その基準で採点する。

判定は各項目 **✅ 実装 / ⚠️ 部分 / ❌ 無し** の3段。誤読は `reader-comprehension` に委ね、
ここでは「手法として備わっているか」だけを見る。

## 1. 監査ルーブリック（Litt の技法 → READER の判定基準）

### P. 大原則 — 理解＝参加の前提（understanding-first / co-evolution）
- **P1**: ページが「完成品」でなく **進捗ごとに育てる対象**として自己記述しているか。
- **P2**: 理解を「正しさの検証」だけでなく「読者・書き手が創造的に参加し続けるため」に置いているか。

### T1. Explanations（解説ドキュメント）— 本スキルの主軸
- **L1a 背景先行**: 結論・詳細の**前に背景と直感**を置いているか（結論から書いて置き去りにしていないか）。
- **L1b literate narration**: 散文が「なぜそう変えたか／そう読むか」の筋を語っているか（結果の羅列でないか）。
- **L1c 概念の図示**: 難解概念に図・比喩があるか（ルール12。棄却は三層段差表＋比喩）。
- **L1d 理解度クイズ＝speed regulator**: **理解の欠落を検出して先送りを止める仕掛け**があるか。
  pd では **LLM 読解テスト**（`TEST-reader-*.md`）が該当。合格まで公開を進めない運用か。

### T2. Micro-worlds — 対話的環境（⚠️ pd では未実装が既定）
- **L2**: 読者が**自分で触って挙動を直感**できる対話的図・可視化・操作環境の入口があるか。
- 現状 pd の READER は静的図＋装飾 WebGL のみ。**❌/⚠️ が既定**。実装案は**別 issue に切り出す**（pjdhiro 承認要）。

### T3. Shared Spaces — 共有された心的モデルの面（⚠️ pd では未実装が既定）
- **L3**: 人間と AI（あるいは読者間）が**同じ面で見方を確定・共有**していく導線がページ上にあるか。
- 現状 pd は判定ループが**ページ外**（台帳・対話）。**❌/⚠️ が既定**。実装は**別 issue 候補**。

### K. augment-not-automate（Alan Kay 系譜）
- **K1**: 人間を置き換えるのでなく**認知を増幅**する構えか（例: 役割分担で人間に問い・判定を残す）。

## 2. 手順（1 監査）

1. 対象 READER 正本 MD と公開 HTML を読む（`<details>` も開く）。
2. §1 のルーブリック各項目を **✅/⚠️/❌** で採点し、**ページ内の根拠（節・引用）**を必ず添える。
3. 総合判定を出す:
   - **適合（core adopted）**: P・T1（特に L1d speed regulator）が ✅ で、T2/T3 の欠落が明示されている。
   - **部分適合**: T1 に ⚠️ が残る、または欠落の明示がない。
   - **不適合**: speed regulator（L1d）が無い、または理解を検証のみに矮小化している。
4. 結果を **RR ログに記録**（例: `RR-0xx` の「Litt 適合監査 第N回」節。対応表・日付つき）。
5. **⚠️/❌ の是正はページ側**で行う（未実装2技法を除く。それらは別 issue へ）。
6. 監査に**合格（＝適合 または 欠落明示つき部分適合）**して初めて、§9 に**適合バッジ＋参照 URL**を出せる。

## 3. バッジ表記のルール（honest 必須）

- READER 本文（§9「方法の公開」相当）に「**この手法に沿って書かれ・テストされている**」旨と
  **参照 URL** を置く。ただし **未実装2技法を『実装済み』と書かない**。
- 適合状況を **✅/⚠️ の対応表**で正直に示す（Explanations＋speed-regulator は ✅、Micro-worlds／Shared-Spaces は「今後の課題」）。
- pd の一貫スタンス（実証の厚みだけ正直に注記／先回り FAQ）に従う。誇張・通説丸めは禁止。

## 4. reader 作成ワークフローでの位置

- 本スキルは `reader-comprehension` の反復ループ内の**品質ゲート**。
  読解テスト（speed regulator の実走）とは別に、**手法そのものの装備**を毎メジャー改稿・公開前に点検する。
- commit 前品質ループ（`.claude/rules/commit-rules.md`）の V3 反例探索に、本監査の ⚠️/❌ を投入する。

## 5. やってはいけない

- 未実装の Micro-worlds / Shared Spaces を「実装済み」とバッジに書く（虚偽表記）。
- 監査未合格のページに適合バッジを出す。
- 誤読を「LLM 読者が悪い」と処理する（それは `reader-comprehension` の責務。原則ページ側を直す）。
- 本スキルの独断で別 issue を作成する（Issue 作成は pjdhiro 承認）。
