---
name: reader-comprehension
description: "Use when authoring or refining a public READER explainer page and running the context-zero LLM comprehension test loop. Structures the work around Litt's three understanding-amplification techniques (Explanations / Micro-worlds / Shared Spaces) and treats the comprehension test as a speed regulator."
triggers: |
  「READER を書く／推敲する」「LLM 読解テスト」「読解テスト反復」
  「reader-comprehension」「一意可読性チェック」「公開解説ページを育てる」
  「理解がボトルネック」「speed regulator」「解説＋クイズ」
applyTo: "reader/, knowledge/research/**/READER-*.md, knowledge/research/**/TEST-reader-*.md, scripts/reader-*"
agent: "CLI"
---

**ステータス**: active（2026-07-08 新設 / pd#127・ルール16 の運用を再利用可能化）

> **入口**: READER 公開ページの新設・推敲、または LLM 読解テストの 1 ラウンドを回すとき。
> 理論的支柱は `knowledge/concepts/CN-011_understanding-is-the-bottleneck.md`（Litt「理解がボトルネック」枠組みの pd 接地）。
> テスト正本は `knowledge/research/two-axis-closure/TEST-reader-llm-comprehension.md`、ハーネスは `scripts/reader-llm-comprehension-test.mjs`。
> 執筆ルールの正本は各 READER の README（例: `knowledge/research/two-axis-closure/README.md`）と pd README §3（ルール12〜16, 22）。本スキルはそれらを**回す手順**であって、内容ルールを上書きしない。

# reader-comprehension SKILL

## 0. 前提となる考え方（CN-011）

律速は生成量ではなく **読者の理解**。理解が要るのは検証のためだけでなく
**READER を創造的に育て続けるため**。READER＝Litt の "Explanation"、
LLM 読解テスト＝埋め込みクイズ＝**speed regulator**（合格まで公開を先へ進めない）。
誤読は原則 **ページ側の欠陥**として直す（LLM を賢くするのではない＝ルール16 の趣旨）。

## 1. いつ使うか

- 新しい READER 公開ページを起こす／既存 READER を推敲する。
- LLM 読解テストを 1 ラウンド以上回して、誤読・曖昧点を潰す。
- 「このページを読めば Claude が全てを一意に説明できる」状態（ルール16）へ近づける。

## 2. 着工前に読む（散らばった記憶に頼らない）

1. 対象 READER の **README 正本**（ゴール・骨格・執筆ルール・残タスク）。
2. `CN-011`（本スキルの支柱）。
3. `TEST-reader-llm-comprehension.md`（質問群・ルーブリック・合格基準）。
4. pd README §3 のルール12〜16・22（比喩必須／追体験／声の帰属／一意可読性／3レベル分離）。
5. `docs/DESIGN-RULES.md` §0a（VI 継承。独自テーマ新造は禁止）。
6. **リポジトリに READER 生成レシピがあれば、それも読む**（page_type・固定パイプライン・オプションメニュー・frontmatter スケルトン）。cs では `transform/reader/reader-recipe.md`。埋め込みクイズ（speed regulator）等のデバイスはレシピの options から選ぶ。

## 3. 反復ループ（1 ラウンド）

CN-011 §3 の speed regulator を機械で回す。

1. **抽出**: `node scripts/reader-llm-comprehension-test.mjs`
   → 公開 HTML から「文脈ゼロで読むプレーンテキスト」を抽出（`<details>` も展開）し、
   質問群を束ねたプロンプトを生成（出力は `.cache/active/`・ローカル）。
2. **読ませる**: **文脈ゼロの LLM 読者**（サブエージェント等。事前知識・本リポジトリの文脈を一切与えない）に、
   生成テキストだけを読ませ、規定の質問群に回答させる。
3. **採点**: Main が読解テストのルーブリックで採点し、**誤読・曖昧点・二義的な読み**を収集する。
4. **修正**: **コンテンツ（READER 本文）を直す**。質問が曖昧で誤答を誘ったなら**テスト側**も直す。
   （原則はページ側を直す。ルール16）
5. **再ビルド**: 正本 MD → `python3 scripts/build-reader-lp.py` → static-checks・UTF-8・アンカー確認。
6. **回帰**: 同じ質問群を再度回し、合格基準を満たすまで反復。ラウンドごとの検出・対応を README/RR に記録。

## 4. レビュー観点 — Litt の三技法を評価軸に

READER を推敲するとき、以下を毎ラウンド点検する（commit 前品質ループの V3 反例探索に組み込む）。
**手法として備わっているかの正式監査**は別スキル `reader-litt-conformance` が担う（§6b）。ここは日常点検。

### ① Explanations（実装済み・主軸）
- 変更・結論の**前に背景と直感**を置いたか（結論から書いて読者を置き去りにしていないか）。
- 難解概念に**日常比喩**が付いているか（ルール12・棄却は三層段差表＋比喩）。
- 3レベル分離（本文＝本筋／詳しく＝深掘り／コラム＝寄り道）が守られているか（ルール22）。
- 判定語彙・声の帰属が**テキストだけで一意**か（ルール14・16）。

### ② Micro-worlds（⚠️ 未実装 — 言及のみ）
- 読者が挙動を**自分で触って直感**できる対話的図・可視化の入口はあるか。
- **現状 pd の READER には未実装**。本スキルでは「無い」ことを毎ラウンド明示し、
  実装案が出たら**別 issue に切り出す**（pjdhiro 承認が要る。本スキルからは作らない）。

### ③ Shared Spaces（⚠️ 未実装 — 言及のみ）
- pjdhiro と Claude が**同じ面上で見方を確定**していく共有導線はあるか。
- 判定ループ（性質→読み候補→判定→反映）は原型だが READER 上の導線は未整備。
- **未実装**。同上、実装は**別 issue 候補**として記録するに留める。

## 5. 合格基準（TEST 正本に従う）

- 主旨・概要・アウトライン・流れを**取り違えず**再構成できる。
- 難解概念を**平易に**言い直せる（中学生向け）。
- ルール16 ①〜④ 違反 0（用語の自己完結・判定語彙・三層・帰属がテキストのみから一意）。
- ⚠️/❌ は原則**ページ側**の課題として処理する。

## 6. commit 前品質ループとの接続

- 本スキルの 1 ラウンドは、それ自体が「調査→仮案→レビュー→テスト→修正」に対応する
  （`.claude/rules/commit-rules.md` §commit 前品質ループ）。
- 成果物テストは READER 種別に合ったもの: static-checks / UTF-8 チェック / アンカー確認。
- READER（reader/*.html）は**生成物**。編集は正本 MD 側。直接編集禁止（reader/README.md）。

## 6b. 公開前ゲート — Litt 適合監査（`reader-litt-conformance`）

READER をメジャー改稿・公開する前に、**品質管理の一つ**として `reader-litt-conformance` を回す。

- 内容: ページが Litt の三技法（Explanations / Micro-worlds / Shared Spaces）＋ speed regulator を
  **手法として実装しているか**を ✅/⚠️/❌ で監査し、RR ログに記録する。
- 位置づけ: §3 の読解テストは speed regulator の**実走**、本監査は**装備そのものの点検**。責務が違う。
- 合格（適合／欠落明示つき部分適合）して初めて、READER §9 に**適合バッジ＋参照 URL**を出せる。
- 未実装2技法（Micro-worlds / Shared Spaces）を「実装済み」とバッジに書かない（honest 必須）。

## 7. やってはいけない

- reader/*.html を直接編集する（正本 MD を直す）。
- 独自テーマ・standalone CSS の新造（DESIGN-RULES §0a・§8b）。
- Micro-worlds / Shared Spaces を本スキルの独断で実装・issue 化する（pjdhiro 承認が要る）。
- 誤読を「LLM 読者が悪い」と処理して先へ進む（原則ページ側を直す＝ルール16）。
