---
title: 可除代数の分類定理とチーム構造の対応仮説 — 3人と7人はなぜ特別か（探索論考）
status: skeleton  # skeleton → draft → review → final
issue: pd#121
license: CC BY 4.0
authorship: A1（ルール14 準拠・self-publish 用）
created: 2026-07-16
---

<!--
本ファイルは pd#121 Phase A（和文・論文様式 PDF の self-publish）の正本 MD。
工程: 骨格（本コミット）→ References 正規化 → 節ごとの本文執筆 → 接続チェック →
     品質ループ（team-critic レビュー＋機械検証再実行＋読解テスト）→ build-pdf.sh → 公開判定（pjdhiro）。
各節の SOURCE コメントは執筆時の素材マップ。READER の転載ではなく学術構成への再編である
（READER=追体験の読み物／本稿=主張と根拠の提示、と役割を分ける）。
-->

# 可除代数の分類定理とチーム構造の対応仮説 — 3人と7人はなぜ特別か（探索論考）

**執筆**: Claude (Anthropic, Fable 5) ／ **問いの提示・読みの採否判定**: pjdhiro
**種別**: 非査読・AI 執筆の探索論考（speculative theoretical essay / position paper）
**ライセンス**: CC BY 4.0
**正本・検証コード**: https://github.com/uminomae/project-design （`knowledge/research/two-axis-closure/`）
**読み物版（一般向け）**: https://uminomae.github.io/project-design/reader/three-and-seven.html

> **冒頭の宣言（本稿の性格）**
> 本稿は査読を経ていない。本文は AI（Claude, Fable 5）が執筆し、問いの提示と各「読み」の採否判定は人間（pjdhiro）が行った。
> 本稿の主張は「構造の類似」までであり、「字義の同一」は主張しない（§6 で読みごとの水準を明示する）。
> 検証に用いた機械検証スクリプト（20本）はすべて公開リポジトリで再実行可能である。

## 要旨

<!--SOURCE: READER サマリー（L34-78 相当）を学術要旨へ圧縮。背景1文・問い1文・方法2文・結果2文・主張水準1文。-->
（未執筆）

## 1. はじめに — 二つの体験と一つの問い

<!--SOURCE: READER §0-1。体験A（意識の二軸の感じ・awareness-space 生存-信頼軸）・体験B（チームは3がベスト7が上限）・
問い（掛け算の経営＝回転の掛け算だとしたら）。声の帰属: pjdhiro の体験は引用形式（ルール14）。-->
（未執筆）

## 2. 先行する言説と実証 — 「そう言われてきた」ことの整理

<!--SOURCE: RR-023（前提知レビュー・C32/R21「そう言われてきた」スタンス→ "as commonly held" 型の帰属表現へ）、
RR-003（チームサイズ実証: 最適3〜5・上限7〜9 の帯。Wheelan 2009・McHale 97%〔Lavanchy 2002 孫引き明示〕・
Klimek et al. 2009 内閣崖・Cartwright & Harary 1956 構造バランス）。Miller 7±2 との区別も本節。-->
（未執筆）

## 3. 方法 — マルチエージェント探究と機械検証

<!--SOURCE: READER §9（方法の公開）・README ルール群。agent-team-workflow（SURVEY→REVIEW→PLAN→EXECUTE の7フェーズ）・
検証プリミティブ V1-V6・機械検証スクリプト20本（RR-001a〜RR-024c）・文脈ゼロ LLM 読解テスト・
確度タグの対訳表（[P]→established / [M]→interpretive / [S]→speculative）をここで定義。-->
（未執筆）

## 4. 数学的基礎（結果 I）— 可除代数の分類と 3・7

<!--SOURCE: RR-001（定理群: Hurwitz/Frobenius/Bott-Milnor-Kervaire・ℝℂℍ𝕆＝1,2,4,8次元・虚方向 1,3,7）・
RR-001a Jacobi・RR-010a 交代性・RR-013b 十六元数零因子 (e₁+e₁₀)(e₅+e₁₄)=0・RR-005 ファノ平面 PG(2,2)・168=PGL(3,2)。
すべて機械検証済みの計算のみ。ここは established の層。-->
（未執筆）

## 5. 対応仮説（結果 II）— 場と人・回転の掛け算

<!--SOURCE: READER 第I部 §3-6（3=掛け算が閉じる最小の虚方向数・7=割り算まで閉じる最大・実部=場は人数に数えない）・
RR-010（本質対応）・READER 第II部（行列 SO(2n) の見方・偶奇の膠着＝二部性・pd#124: 行列が第一の方法論）。
第I部と第II部は別レンズであることを明示（READER L1180 の分離を踏襲）。-->
（未執筆）

## 6. 考察 — 読みの採否と主張の水準

<!--SOURCE: READER §7（実証との突き合わせ: 何が外れ何が残ったか）・§8（よくある誤解）。
読みごとに established/interpretive/speculative を明示。採用＝設計原理としての3・7（構造だけで掛け算と割り算を保つ）、
見送り＝「3と7しかない」「8人では成立しない」等の強い読み。反証条件の明文化。-->
（未執筆）

## 7. 限界

<!--SOURCE: RR-003（実証の帯と仮説のずれ）・RR-002（同型性の厳密化: 定理/類推/数秘の切り分け・pd#118）・
未接地事項（意識側の橋は awareness-space の仮説段階）・McHale 孫引き等の精読レベル注記。-->
（未執筆）

## 8. 結論と今後の課題

<!--SOURCE: READER 末尾「まだ終わっていません」・pd#126（偶奇膠着の実証接地）・pd#115 の保持論点。-->
（未執筆）

## References

<!--工程2で正規化: RR-001〜024 と READER §参照に散在する出典を著者-年形式で集約。
各文献に精読レベルを付す（一次精読／抄録確保／孫引き〔経由文献を明記〕）。
最低限含むべき核: Hurwitz 1898・Frobenius 1878・Bott-Milnor 1958・Kervaire 1958・Baez 2002 (The Octonions)・
Wheelan 2009・Lavanchy 2002 (McHale 97% の原典・未精読孫引き)・Klimek, Hanel & Thurner 2009・
Cartwright & Harary 1956・Hamming 1950・Graves/Cayley (八元数史)。-->
（未整備）

---

## 付録 A: 機械検証スクリプト一覧

<!--SOURCE: two-axis-closure/ の *.py 20本。各1行（何を検証し ALL CHECKS PASSED か）＋リポジトリパス。-->
（未整備）

## 付録 B: 用語と確度タグの対訳

<!--[P][M][S] → established/interpretive/speculative、採用/方向確定/読み候補/探索中/見送り の判定語彙の定義。-->
（未整備）
