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

精読レベル凡例: ★一次精読 ／ ○抄録・部分確保 ／ △孫引き・二次どまり（経由文献を明記） ／ ？判別不能。
インベントリに書かれていない書誌情報（誌名・巻号・ページ・DOI 等）は補わず、欠けている項目は書式から省き注に「書誌の一部未取得」と記した。

<!--工程4 メモ（接続チェックで処理）: 本節は工程2 で RR-001〜024 の grounded 出典を網羅集約した master list。
本文（§1-§8）執筆後、実際に引用した文献のみへ剪定する。剪定候補＝意識区分のうち energy-flow/CN-011 系スレッド
（RR-020 感情エネルギー・RR-021 精神-粒子アナロジー・RR-022 光の起源）の物理・思想史項目。§5「実部=場・虚部=人」
（RR-015/016/019）と §6 Quantum Darwinism（RR-016）が引く分は残す。本文が引かない項目は工程4 で削除。-->


### 数学（定理・原典）

- Adams, J.F. (1960). Hopf 不変量 1 は n=2,4,8 のみ（"the hard part"）. *Ann. Math.* 72, 20–104. 〔精読: △ — Baez (2002) §3 経由。原論文未精読〕
- Atiyah–Hirzebruch (1961). 平行化可能性. 〔精読: △ — Baez (2002) refs のみ。書誌の一部未取得（誌名・巻号・ページ未記載）〕
- Baez, J. (2002). "The Octonions." *Bull. AMS* 39, 145–205. arXiv:math/0105155. 〔精読: ★ — 本仮説の数学的背骨。arXiv PDF 全文精読。自己同型の実軸固定・Re 定義式・G₂ 次元・Bott mod 8 の行番号記録あり〕
- Baez, J. & Huerta, J. (2009). arXiv:0909.0551. 〔精読: ★ — h₂(K)・k+2 対応（可除代数↔時空次元 3,4,6,10）を一次確認。書誌の一部未取得（タイトル・誌名未記載）〕
- Bott–Milnor (1958). 次元は 1,2,4,8. *Bull. AMS* 64, 87–89. 〔精読: △ — Baez (2002) Thm 3 経由。原論文未精読〕
- Brouwer, L.E.J. (1912). ハゲ球／毛玉の定理. *Math. Ann.* 71. 〔精読: △ — 教科書標準として扱う〕
- Cartwright, D. & Harary, F. (1956). 構造均衡定理（Structure Theorem）. *Psychological Review* 63(5), 286. 〔精読: ★ — p.286 を一次全文で逐語照合＋独立機械検証。符号付きグラフの均衡⇔二部分割〕
- Conway, J. & Smith, D. (2003). *On Quaternions and Octonions*. 〔精読: △ — 未精読で参考文献に留置。本仮説の主張は Baez 精読＋機械検証で自立〕
- Eckmann, B. (1943). 外積分類の歴史的先行. 〔精読: △ — 原論文未精読。書誌の一部未取得（誌名・巻号未記載）〕
- Ekström, & Yousef, (2024). *Cross Products in Euclidean Spaces*（学士論文, diva2:1865965）. 〔精読: ○ — PDF 実取得。§1.3/§3/結論で「only 1, 3, 7」を確認。Massey の照合ソース〕
- Frobenius, G. (1878). 結合的有限次元実可除代数は ℝ,ℂ,ℍ のみ. 〔精読: △ — Baez (2002) Thm 2 の系。歴史的原典未取得（誌名・巻号未記載）〕
- Gillies, D.B. (1959). 協力ゲーム core の形式化. 〔精読: △ — 二次確認どまり。書誌の一部未取得（誌名・巻号未記載）〕
- Hopf, H. (1940). 1,2,4,8 決着史の起点. 〔精読: ？ — RR-014 コラム候補に書誌名のみ。詳細記録なし・書誌未取得〕
- Hurwitz, A. (1898). normed division algebras 定理. *Nachr. Ges. Wiss. Göttingen* 309–316. 〔精読: △ — Baez (2002) Thm 1 として精読確認。原論文は書誌ポインタのみ〕
- Kervaire, M. (1958). "Non-parallelizability of the n-sphere for n>7." *PNAS* 44, 280–283. 〔精読: △ — Baez (2002) 経由。原論文未精読〕
- Massey, W.S. (1983). 外積は n=1,3,7 のみ. *Amer. Math. Monthly* 90(10), 697–701. 〔精読: ○ — 原論文未精読。定理文・証明構造は Ekström & Yousef (2024) の公開文献で照合〕
- Zorn, M. (1930). alternative division algebras. *Abh. Math. Sem. Univ. Hamburg* 8, 123–147. 〔精読: △ — Baez (2002) Thm 2 経由。原論文未精読〕

注: 本稿が用いた標準的数学事実（G₂ = Aut(𝕆)・dim G₂ = 14、PGL(3,2) ≅ PSL(2,7)〔位数 168〕、Bott 周期性 mod 8／Radon–Hurwitz 数、S⁷ = Moufang ループ）は独立の原典を立てず、standard result; see Baez (2002) として扱う（位数 168 と PGL(3,2) ≅ PSL(2,7) は機械検証で確認済）。

### チームサイズ・組織・集団構造の実証

- Alchian–Demsetz / Coase / Williamson. 企業サイズ＝測定・取引費用の連続最適化. 〔精読: △ — 二次。個別書誌なし・書誌未取得〕
- Altafini, C. (2012). opinion dynamics on signed networks. *PLOS ONE*. 〔精読: ○ — PMC OA・一次照合〕
- Amazon two-pizza rule. ≈5–8 人（folklore）. 〔精読: ？ — 業界二次資料・folklore。学術一次なし〕
- Antal, Krapivsky & Redner (2006). 社会均衡動力学. *Physica D* 224, 130–136. 〔精読: ★ — 全文一次照合。「有限系は必ず balanced に収束」＝価値づけ逆転の根拠〕
- Arrow. 不可能性定理（3択以上で理想的集約なし）. 〔精読: △ — 二次。書誌の一部未取得（年・誌名未記載）〕
- Balkundi & Harrison (2006). "Ties, leaders, and time in teams." *AMJ* 49(1), 49–68. 〔精読: △ — 二次。内部密度メタ分析・リーダー中心性〕
- Bezrukova et al. (2009). faultline 内 crisscrossing 概念. 〔精読: △ — 二次。計算モデルで実証〕
- Brooks, F. *The Mythical Man-Month*（パス数 n(n−1)/2）. 〔精読: △ — 二次。書誌の一部未取得（年未記載）〕
- Burt, R. structural holes / tertius. 〔精読: △ — 二次（F-1 表）。書誌の一部未取得（年・誌名未記載）〕
- Carton & Cummings (2012). "A theory of subgroups in work teams." *AMR* 37(3), 441–470. 〔精読: △ — abstract/二次〕
- Carton & Cummings (2013). "Subgroup type and configuration on team performance." *JAP* 98(5), 732–758（PMID 23915429）. 〔精読: △ — abstract/二次〕
- Chujyo et al. (2025). unbalanced sign→振動・非収束. *Sci Rep* 15:39882. 〔精読: △ — 本文 403・abstract のみ引用〕
- Condorcet 陪審定理. 正答率>0.5 で人数増→精度↑・奇数は同数割れ回避. 〔精読: ○ — Wikipedia 本文精読（一次寄り二次）。原典年なし・書誌の一部未取得〕
- Cowan, N. (2001). "The magical number 4 in short-term memory." *BBS* 24. 〔精読: △ — 二次。4±1 改訂〕
- Deutsch, M. (1949 / 2006). 協調-競争理論. *Human Relations* 2(2) 脚注3 ／ 2006 Handbook 章 pp.23–28. 〔精読: ★ — 一次照合。「協調なら偶奇無関係で収束」は Deutsch に無い外挿と注記〕
- Dougherty & Edward (2009). "Odd or Even: Assembly Size and Majority Rule." *J. of Politics* 71(2), 733–747. 〔精読: △ — abstract/二次（403）〕
- Eisert, Wilkens & Lewenstein (1999). 量子ゲーム理論（EWL）. arXiv:quant-ph/9806088. 〔精読: ○ — Wikipedia 本文精読で逐語確認。実在確認済〕
- Facchetti et al. (2011). signed networks. *PNAS* 108(52). 〔精読: ○ — PMC OA・一次照合。奇サイクル＝frustration の実データ確認〕
- Faust, K. (2007). "Very local structure in social networks." *Sociological Methodology* 37. 〔精読: △ — 二次（精読記録なし）〕
- Faust, K. (2010). "A puzzle concerning triads in social networks." *Social Networks* 32(3), 221–233. 〔精読: △ — abstract/二次。三つ組分布の9割が密度で説明される〕
- Ghemawat, P. commitment 理論（不可逆性＝戦略性）. 〔精読: △ — 一次未読了・二次（通説級）。書誌の一部未取得（年・誌名未記載）〕
- Goh, Krackhardt, Weingart & Koh (2014). "The role of Simmelian friendship ties on retaliation within triads." *Small Group Research* 45(5). 〔精読: △ — abstract/二次〕
- Graicunas, V.A. (1933). "Relationship in Organization"（span of control・R=N(2^(N-1)+N-1)）. 〔精読: △ — 二次。RR-023 で 44/100/222 が canonical・Wikipedia の 60/105/160 は転記異本と注記〕
- Granovetter, M. triadic closure. 〔精読: △ — 二次（社会ネットワーク）。書誌の一部未取得（年・誌名未記載）〕
- Hackman & Vidmar (1970). "Effects of size and task type on group performance." *Sociometry* 33, 37–54. 〔精読: △ — abstract/二次。主観的最適 4.6 人〕
- Harada (2021). "Examining learning coherence in group decision-making: triads vs. tetrads." *Scientific Reports* 11:20463. doi:10.1038/s41598-021-00089-w（PMC8516953）. 〔精読: △ — 著者名は一次確認で確定（発見③）。本文は abstract/二次〕
- He & Luo (2018). even number of directors. *J. of Banking & Finance* 93, 139–150. 〔精読: △ — 本文 403・abstract/二次〕
- Heider, F. バランス理論（三角形の符号の積で均衡判定）. 〔精読: △ — 二次。Cartwright–Harary と対で言及。書誌の一部未取得（年・誌名未記載）〕
- Katzenbach & Smith. チーム論. 〔精読: △ — 未精読・二次のみ。書誌未取得（年・タイトル未記載）〕
- Klimek, Hanel & Thurner (2009). "To how many politicians should government be left?" *Physica A*. arXiv:0804.2202. 〔精読: △ — 内閣サイズ・崖≈20。abstract/二次〕
- Krackhardt, D. (1999). "The Ties That Torture: Simmelian Tie Analysis in Organizations." 〔精読: △ — 二次（Wikipedia 経由で構造確認）。書誌の一部未取得（誌名・巻号・ページ未記載）〕
- Lau & Murnighan (1998). faultlines. *AMR* 23. 〔精読: △ — 二次資料レビュー〕
- Lichtenstein & Slovic. 選好逆転（preference reversal）. 〔精読: △ — 二次（F-1 表）。書誌の一部未取得（年・誌名未記載）〕
- Lipset / Coser. cross-cutting vs reinforcing cleavages. 〔精読: △ — 二次。書誌未取得（年・誌名未記載）〕
- Mac Carron, Kaski & Dunbar (2016). "Calling Dunbar's numbers." *Social Networks* 47, 151–155. arXiv:1604.02400. 〔精読: △ — 著者名は一次確認で確定（発見③）。層スケーリング比≈3。abstract/二次〕
- Mäs et al. (2013). crisscrossing の計算モデル. *Org Sci* 24(3). 〔精読: △ — 二次（403）〕
- May. 定理（2択＝多数決が一意・単純多数決の特徴づけ）. 〔精読: △ — 二次。書誌の一部未取得（年・誌名未記載）〕
- Miller, G.A. (1956). "The magical number seven, plus or minus two." *Psychological Review* 63, 81–97. 〔精読: ○ — 論文末尾の「数秘警戒」を引用。7±2 のチーム論転用を範疇誤用として棄却する側で使用〕
- Moscovici, S. 少数派影響（minority influence）. 〔精読: △ — 二次・探索的。書誌の一部未取得（年・誌名未記載）〕
- Mueller, J.S. (2012). "Why individuals in larger teams perform worse." *OBHDP*. 〔精読: △ — abstract/二次。巻号未記載・書誌の一部未取得〕
- Pentland, A. (2012). "The new science of building great teams." *HBR* 90(4), 60–69. 〔精読: ○ — ソシオメトリックバッジ実測。PDF 二次配布で本文確認〕
- Ringelmann / Latané. 社会的インパクト理論・べき乗則 R(N)=N^(t−1). 〔精読: △ — 二次。Ringelmann 綱引き実験（19c 末）。書誌の一部未取得（年・誌名未記載）〕
- Scrum Guide (2017 / 2020). 開発チーム推奨サイズの推移（3–9人→10 or fewer）. 〔精読: ○ — RR-023 で 2020 原文一次確認〕
- Simmel, G. (1908). *Soziologie*（dyad/triad の質的転換・第三者の3役割 mediator/tertius gaudens/divide et impera）. 〔精読: △ — 原典未精読・二次（Britannica 等）〕
- Steiner (1972). process loss（サイズ増→効率単調低下）. 〔精読: △ — 二次。原典未精読〕
- Sydow et al. (2009). 組織パス依存（path dependence, non-ergodic）. *AMR*. 〔精読: △ — 書誌・要旨（二次）。ロックイン・不可逆〕
- Tortoriello & Krackhardt (2010). "Activating cross-boundary knowledge: Simmelian ties." *AMJ* 53(1), 167–181. 〔精読: △ — 276 名 R&D 技術者。abstract/二次〕
- Trueblood & Busemeyer (2011). 判断の順序効果. 〔精読: △ — 二次（F-1 表）〕
- Tyler, T. 手続的公正（procedural justice・voice）. 〔精読: △ — 二次。β の単純二分を崩す反証。書誌の一部未取得（年・誌名未記載）〕
- von Neumann & Morgenstern (1944). 協力ゲーム・core（3人目から提携が非自明化）. 〔精読: △ — 二次（Britannica/AMS）。原典未精読〕
- Wheelan, S.A. (2009). "Group size, group development, and group productivity." *Small Group Research* 40(2), 247–262. 〔精読: △ — 329 実働グループ。abstract/二次〕
- Zhang & Chen (2023). faultline メタ分析. *Management and Organization Review* 19(5). 〔精読: △ — 二次。撤回された Thatcher & Patel (2011) の生きた差し替え引用〕
- ［著者不明］(2026). arXiv:2601.07283（Condorcet cycle ↔ Möbius/Klein 壷）. 〔精読: ○ — 本文フェッチ・preprint・未査読。著者名未記載・要確認〕

注1: Thatcher & Patel (2011) は 2016 撤回済みにつき不掲載。faultline メタ分析は Zhang & Chen (2023) を参照。
注2: 灰色文献（書誌未確定につき独立エントリを立てない）: Gallup「平均12.1人」チームサイズ調査（商用レポート・報告書名/年未特定）、Spotify squad 失敗事例分析（ブログ/記事系・出典未特定）、取締役会偶奇の Deng, Gao & Liu (2012)／Adil & Khan (2026)（誌名・巻号未取得・403）。本文で用いる場合は二次経由を明示（"as reported in RR-013" 等）し個別確認する。

### 意識・心理・感情・物理・思想史

- Aristotle. potentia / actuality（現実態・可能態）. 〔精読: △ — 二次（Heisenberg potentia の並走概念として）〕
- Atmanspacher, H. "Quantum Approaches to Consciousness." *Stanford Encyclopedia of Philosophy*（§4.1–4.2, §5.1–5.3）. 〔精読: ★ — 本文フェッチ・該当節確認。Pauli–Jung/dual-aspect monism。書誌の一部未取得（年未記載）〕
- Babcock (2024) / Kalra (2023). 微小管の in vitro 量子効果（superradiance 等）. 〔精読: △ — Frontiers 2026 レビュー経由（二次）。書誌の一部未取得（タイトル・誌名未記載）〕
- Bakeman & Adamson (1984). 共同注意＝「最も複雑な二者相互作用」（PMC8172475）. 〔精読: △ — 二次確認どまり・画像 PDF で blocked〕
- Barrett, L.F. (2017). "The theory of constructed emotion." *SCAN* 12(1), 1–23. 〔精読: ★ — pd 既存精読 evidence 経由。構成主義的情動理論〕
- Barrett, L.F. (2017a). allostasis / body budgeting（PMID 27798257）. 〔精読: ★ — pd 既存 evidence で精読済み。書誌の一部未取得（タイトル・誌名未記載）〕
- Benjamin, J. thirdness. 〔精読: △ — 二次。「物理的な三人目」ではない限定つき。書誌未取得（年・タイトル未記載）〕
- Bion, W.R. (1961). work group / basic assumption group. 〔精読: △ — 二次レベル。書誌の一部未取得（誌名未記載）〕
- Blumenberg, H. (1957). メタフォロロギー（絶対的隠喩）. 〔精読: △ — 二次多重・原著未直読〕
- Bowen (1978) / Kerr & Bowen (1988). 家族システム論・三角関係化（triangulation）. 〔精読: △ — 一次本体は blocked。Comella (2001) の逐語（二次）経由〕
- Boyer-Kassem, Duchêne & Guerci (2016). "Testing quantum-like models of judgment for question order effect." *Mathematical Social Sciences*. 〔精読: △ — 二次。退化測定モデルでは QQ 不成立〕
- Britton, R. (2004 / 1989). triangular space / 第三の位置. *Psychoanalytic Quarterly* 73, 47–61（PMID 14750465）. 〔精読: ★ — RR-024 は一次全文（1989）逐語。「witness, not a participant」〕
- Busemeyer & Bruza (2012). *Quantum Models of Cognition and Decision*. Cambridge University Press. 〔精読: △ — 枠組みの標準文献〕
- Busemeyer & Wang / Pothos & Busemeyer. Quantum Cognition. *Annual Review of Psychology* 系. 〔精読: ○ — 原著 PDF を一次逐語抽出（「no quantum brain hypothesis」）〕
- Coe & Davies (2020). detouring が子の適応を独自予測. *J. Fam. Psychol.* 34(7), 814–824（PMC8324313）. 〔精読: ★ — 一次全文照合〕
- Collins, R. (2004). *Interaction Ritual Chains*（emotional energy の充填/枯渇）. 〔精読: △ — 二次。社会学的構成概念（熱力学的保存量でない）〕
- Comella (2001). Bowen 三角形の解説（PDF 逐語）. 〔精読: ○ — PDF 逐語（一次に近い二次解説）。書誌の一部未取得（誌名未記載）〕
- De Jaegher & Di Paolo (2007). "Participatory sense-making." *Phenomenology and the Cognitive Sciences* 6, 485–507. doi:10.1007/s11097-007-9076-9. 〔精読: ★ — 一次精読（著者公開版 PDF 全文）。「at least two autonomous agents」「多人数拡張を予想」を逐語〕
- De Jaegher & Di Paolo (2008). relational domain with its own properties（書章）. IOS Press, pp.33–47. 〔精読: ○ — 著者公開版で文脈確認〕
- Deleuze, G. virtual / actual. 〔精読: △ — 二次・一次未精読。不採用推奨（real の語が重なるだけ）。書誌未取得（年・タイトル未記載）〕
- Derrida, J. "White Mythology"（光＝真理＝現前の形而上学批判）. 〔精読: △ — 二次・原著未直読。書誌の一部未取得（年・誌名未記載）〕
- Di Paolo, Cuffari & De Jaegher (2018). *Linguistic Bodies*. MIT Press. 〔精読: △ — 書籍非OA・書誌/要約どまり〕
- Ekman, P. 基本感情理論（Barrett 構成主義との係争相手）. 〔精読: △ — 二次（Sage 2025・PMC10261107）。書誌未取得（年・タイトル未記載）〕
- Favez, Frascarolo & Tissot (2017). "The Family Alliance Model: A Way to Study and Characterize Early Family Interactions." *Frontiers in Psychology* 8:1441. doi:10.3389/fpsyg.2017.01441. 〔精読: ★ — 一次全文照合。著者名は一次確認で確定（発見③）。「二者系は足し合わせられない」〕
- Fontaine et al. (2007). 感情の4次元構造（PubMed 18031411）. 〔精読: ○ — 著者・年・4次元を verbatim 確認。書誌の一部未取得（タイトル・誌名未記載）〕
- Foulkes, S.H. (1948 / 1964). *Introduction to Group-Analytic Psychotherapy* / *Therapeutic Group Analysis*（group matrix）. 〔精読: △ — 一次は非OAで未達。GASI 解説＋OA 論文（PMC9893044）の二次多重〕
- Freud / Jung. psychic energy（hydraulic 系譜）. 〔精読: △ — 二次・系譜的発見。書誌未取得（年・タイトル未記載）〕
- Furey, C. 八元数と標準模型（検証中の研究）. 〔精読: △ — 二次。「確立理論ではない」明記必須。書誌未取得（年・タイトル未記載）〕
- Gallotti & Frith (2013). we-mode（一人称複数）. 〔精読: △ — 書誌確認・二次。書誌の一部未取得（誌名未記載）〕
- Goffman / Clark. working consensus / common ground. 〔精読: △ — 二次。書誌未取得（年・誌名未記載）〕
- Hagan, Hameroff & Tuszynski (2002). デコヒーレンス時間の桁の反論. arXiv:quant-ph/0005025. 〔精読: ○ — abstract 取得〕
- Hawking, S. 虚時間（「どちらが実在かは無意味」）. 〔精読: △ — 二次逐語（原典頁未特定・要一次確認）。書誌未取得〕
- Heidegger, M. Lichtung（開け・受容の空間）. 〔精読: △ — 二次・原著未読。晩年の自己制動。書誌未取得（年・タイトル未記載）〕
- Heisenberg, W. (1958). potentia（該当章逐語・marxists.org 掲載版）. 〔精読: ★ — 一次逐語。「量子状態＝アリストテレス的 potentia の客観的言明」。書誌の一部未取得（書名未記載）〕
- Hoffreumon & Woods (2026). 実数量子論論争. arXiv:2603.19208. 〔精読: ★ — 一次精読・preprint・未査読/係争中。Renou (2021) への直接反論〕
- Husserl, E. 生活世界・間主観性・第五省察. 〔精読: △ — 二次（第五省察系）。書誌未取得〕
- IIT 公開書簡 (2023) / Koch / Seth. 統合情報理論の疑似科学論争（124名書簡）. 〔精読: △ — 二次（Nature 記事）。汎心論リスクの実例〕
- Jaynes–Cummings model. 結合項 ℏg(σ₊a+σ₋a†). arXiv:1111.1143. 〔精読: ○ — 一次寄り＋量子光学講義の2独立ソース一致〕
- Jozsa (2007). 弱値の実部/虚部の分離測定. arXiv:0706.4207（定理 eq.9-10）. 〔精読: ★ — 一次精読（定理全文）〕
- Jung / Loevinger / Kegan / Wilber. 個性化・自我発達（WUSCT）・成人発達. 〔精読: △ — 二次。Loevinger のみ WUSCT で相対的に測定可能。書誌未取得〕
- Klein, M. スプリッティング・母子未分離. 〔精読: △ — 二次（Melanie Klein Trust で用語確認）。書誌未取得（年・タイトル未記載）〕
- Kramers–Kronig 関係. 実部＝分散/虚部＝吸収（因果律）. 〔精読: △ — 二次（古典線形応答一般の標準事実）〕
- Kuppens, Oravecz & Tuerlinckx (2010). "Feelings change (DynAffect)." *JPSP* 99(6), 1042–1060（PMID 20853980）. 〔精読: △ — abstract/二次。core affect の OU 型確率力学＝加法系〕
- Kuppens, Tuerlinckx, Russell & Barrett (2013). "The relation between valence and arousal." *Psychological Bulletin* 139(4), 917–940. doi:10.1037/a0030811（PMID 23231533）. 〔精読: ○ — abstract verbatim 精読。V 字関係・person/culture 可変〕
- Kuppens et al. (2017). "Valence–arousal relation varies with personality and culture." *J. of Personality* 85(4). 〔精読: △ — 二次。V 字急峻さの外向性・文化差〕
- Lacan, J. 大文字の他者. 〔精読: △ — 二次（F-1 表・精神分析の三者）。書誌未取得〕
- Larmor 公式. P=q²a²/(6πε₀c³)（加速電荷の放射）. 〔精読: ○ — Wikipedia 逐語（一次寄り）〕
- Lavanchy (2002). 3ヶ月児 97% の rapid gaze transition（学位論文）. 〔精読: △ — 孫引き（as cited in McHale et al. 2008）。原学位論文は未取得〕
- Lebedev & Khrennikov (2018). "Quantum-like modeling of the order effect in decision making: POVM viewpoint on the Wang–Busemeyer QQ-equality." arXiv:1811.00045. 〔精読: ○ — 全文確認。著者名は一次確認で確定（発見③）。preprint〕
- Lewin, K. 場理論・life space（場＝個人ごとに一つ）. 〔精読: △ — 二次。「場」の心理学伝統との衝突＝最強の反証。書誌未取得〕
- Litt, G. (2026). "Understanding is the new bottleneck for AI-assisted coding"（geoffreylitt.com, 2026-07-02）. 〔精読: ○ — 本文フェッチ。方法論の外部参照〕
- Ma & Wang (2026). "Quantum theories of consciousness: a critical review of feasibility, philosophical sufficiency, and empirical testability." *Frontiers in Psychology* 17:1730965. doi:10.3389/fpsyg.2026.1730965. 〔精読: ○ — verbatim 確認。著者名は一次確認で確定（発見③）。「in vitro/ex vivo であり in vivo は不確実」〕
- McHale, Fivaz-Depeursinge, Dickstein, Robertson & Daley (2008). LTP/family alliance. *Family Process* 47(4), 445–463（PMC2761722）. 〔精読: ★ — PMC 全文をローカルに逐語照合。97%・"unexplained by dyadic" を照合済〕
- Merleau-Ponty, M. 間身体性・沈殿・肉（Leib/Körper・可逆的一元性）. 〔精読: △ — 二次。習慣的身体は PMC11890556 経由。原著未精読。書誌未取得〕
- Milonni (1975). 自発放出の相補的二描像. *Phys. Rev. A* 11, 814. 〔精読: ○ — 一次寄り。真空ゆらぎ／放射反作用の演算子順序依存〕
- Minkowski (1908) / Poincaré (1906) / MTW (1973). ict 表記（時間＝虚軸）の放棄史. 〔精読: △ — 二次。実/虚の安易な存在論化への歴史的教訓〕
- Minuchin, S. detouring / coalition（第三者を排除する連合）. 〔精読: △ — 二次。病理的機能不全の側。書誌未取得（年・タイトル未記載）〕
- Moreira & Wichert (2016). "Quantum Probabilistic Models Revisited: The Case of Disjunction Effects in Cognition." *Frontiers in Physics* 4:26. doi:10.3389/fphy.2016.00026. 〔精読: △ — 二次。干渉効果レビュー。著者名は一次確認で確定（発見③）〕
- Newton–Wigner (1949) / Adamo (arXiv:1712.02196). 光子の位置演算子問題／twistor の real slice. 〔精読: △ — 二次（nLab・Adamo レビュー要約）。twistor 一次精読は未達〕
- Noether. 定理（energy＝時間並進対称性の保存量）. 〔精読: △ — 二次（Baez/LibreTexts）。「最も厳しい同型条件」〕
- Ogden, T.H. (2004). analytic third. *Psychoanalytic Quarterly* 73, 167–. 〔精読: ★ — 一次全文・行番号特定（81-86, 719-724）〕
- Parke & O'Leary (1976). "second-order effect"（第三者の presence の効果）. 〔精読: △ — 二次。「順番（sequence）」ではない混同の罠として注記〕
- Pattisapu, Verbelen, Pitliya, Kiefer & Albarracin (2024). "Free Energy in a Circumplex Model of Emotion." arXiv:2407.02474. 〔精読: ○ — 精読。著者名は一次確認で確定（発見③）。arousal を「不確実性（事後エントロピー）」にマップ＝反証的接地点。preprint〕
- Pauli–Jung / unus mundus / dual-aspect monism. 心物中立実在の二相（Atmanspacher 系）. 〔精読: ○ — SEP 精読。実部/虚部の分解とは接続しない〕
- Plotinus / 新プラトン主義. 流出論（emanation・一者は放射しても減らない）. 〔精読: △ — 二次（SEP Neoplatonism）。原典『エネアデス』未精読〕
- Plutchik (1980). 感情の輪（円錐・8基本感情＋強度軸・dyads）. 〔精読: △ — 原典未精読。立体化の構造は二次で確認。書誌の一部未取得（誌名・ページ未記載）〕
- Posner, Russell & Peterson (2005). "The circumplex model of affect." *Development and Psychopathology* 17(3), 715–734. 〔精読: ○ — 「two independent neurophysiological systems」「linear combination」を本文抽出で確認（全文精読は未了）〕
- Prigogine, I. 散逸構造（非平衡でエントロピー生成が秩序を維持）. 〔精読: △ — 二次多重（AIP Chaos 27,104501／MDPI Fluids 7(4)141／PMC7712552）〕
- Pusey, Barrett & Rudolph (2011/2012). PBR 定理. arXiv:1111.3328. 〔精読: ★ — 一次精読。"real" は波動関数全体の実在性で実部/虚部と無関係と確認〕
- Rauch / Werner (1975). 中性子干渉計で 720° を実測. 〔精読: △ — 書誌 V1 確認。ベルトトリックが「お話」でない証拠〕
- Renou et al. (2021). 複素数量子論の必要性. *Nature*. arXiv:2101.10873. 〔精読: ○ — Nature abstract 直接取得。排除は特定ネットワークシナリオに限る（射程限定）〕
- Riedel, Zurek & Zwolak (2012). 冗長性の崩壊（多体・長時間）. 〔精読: △ — 二次確認（要約止まり）。書誌の一部未取得（誌名・巻号未記載）〕
- Riso & Hudson（Enneagram）/ Naranjo. エニアグラム9タイプ＋統合/分裂の連結線. 〔精読: △ — Wikipedia verbatim（Delphi poll "discredited" 4.14）。疑似科学評価が主流と明記。書誌未取得〕
- Russell, J.A. (1980). "A circumplex model of affect." *JPSP* 39(6), 1161–1178. 〔精読: △ — circumplex 原典。二次資料で構造確認・原典未精読〕
- Sawyer & DeZutter (2009). collaborative emergence（13人即興劇団）. *Psychology of Aesthetics, Creativity, and the Arts* 3(2), 81–92. doi:10.1037/a0013282. 〔精読: ★ — 一次全文（著者公開版・V1 達成）〕
- Schutz, A. 多元的現実（間主観的世界は一つ・意味領域は複数）. 〔精読: △ — 二次。書誌未取得〕
- Spinoza（conatus）/ Russellian monism. 自己保存の力・中立一元論（SEP）. 〔精読: △ — 二次（SEP）。「力と向きの候補」の素材〕
- Tegmark (2000). 脳のデコヒーレンス時間. *Phys. Rev. E* 61, 4194. 〔精読: △ — 本体未精読・値は SEP＋複数二次一致。係争中（Hagan らの反論あり）〕
- Tomasello, M. 共同注意・共有志向性（自己・他者・対象の三項）. 〔精読: △ — 二次。「最強の支持」だが二次確認どまり。書誌未取得（年・タイトル未記載）〕
- Trevarthen (2001). 一次/二次間主観性（person-person-object の三項, 9ヶ月〜）. 〔精読: △ — 原論文が書籍章で未取得・二次（PMC9116197 経由）〕
- Unruh 効果 / Hawking 放射. 真空から光が生まれる（加速/地平線）. 〔精読: △ — 二次（PIRSA/PhysicsWorld/Royal Society）〕
- von Glasersfeld, E. 急進的構成主義. 〔精読: △ — 二次。書誌未取得〕
- Wang, Solloway, Shiffrin & Busemeyer (2014). "Context effects produced by question orders reveal quantum nature of human judgments." *PNAS* 111(26), 9431–9436. doi:10.1073/pnas.1407756111. 〔精読: ★ — PMC4084470 OA 全文確認（発見②）。QQ equality（パラメータフリー）を本文確認。70 の全国代表調査＋2 実験で支持〕
- Watson & Tellegen (1985). "Toward a consensual structure of mood." *Psychological Bulletin* 98(2), 219–235. 〔精読: △ — 45度回転（PA/NA）論争。二次・原典未精読〕
- Whitehead, A.N. 潜在→現実化. 〔精読: △ — 二次・一次未精読。書誌未取得（年・タイトル未記載）〕
- Wigner / von Neumann–Wigner / Zeh (1970). 意識による波束収縮解釈とその後退（環境デコヒーレンス）. 〔精読: △ — 二次。撤回の程度・時期は係争と注記〕
- Wilke (1974) / Coe (1985). coalition の rotation／順序実証（可能性）. 〔精読: ？ — Wiley 有料壁（402）で blocked。読めれば「順序実証未発見」結論が覆る可能性（確度 medium）〕
- Wilson et al. (2011). 動的カシミール効果観測. arXiv:1105.4714・*Nature* 479, 376. 〔精読: ○ — 一次寄り（本文未精読）。超伝導回路 2011〕
- Winnicott, D.W. 可能性空間・抱える環境（第三の領域）. 〔精読: △ — 体系内確立・二次資料。原理的に二者の場（3人拡張は本文上の空白）。書誌未取得（年・タイトル未記載）〕
- Yang, Chen, Draper, Liang & Liu (2017). "Proton mass decomposition." arXiv:1710.09011（Lattice2017）. 〔精読: ○ — 著者名は一次確認で確定（発見③）。約99%＝グルーオン場エネルギー。preprint〕
- Yik, Russell & Steiger (2011). "A 12-point circumplex structure of core affect." *Emotion* 11(4), 705–731. 〔精読: △ — 円環構造の再現。二次（精読記録なし）〕
- Yīng, Ciudad Alañón, Centeno, Surace, Maciel Ansanelli, Liu, Schmid & Spekkens (2025). "On whether quantum theory needs complex numbers: the foil theories perspective." arXiv:2506.08091. 〔精読: ○ — abstract 直接引用。著者名は一次確認で確定（発見③・Yìlè Yīng 表記）。preprint・未査読〕
- Yoon, T.H. & Cho, M. (2021). "Quantitative Complementarity of Wave-Particle Duality." *Science Advances* 7(34):eabi9268. arXiv:2104.04230. 〔精読: ○ — 著者名は一次確認で確定（発見③）。which-path 情報と干渉可視度のトレードオフ。関係式は P²+V²=μₛ²〕
- Zurek (2009). Quantum Darwinism. 〔精読: ○ — 二次だが最有力。光子系・NV センター・超伝導回路で実験検証。書誌の一部未取得（誌名・巻号未記載）〕

（著者名を持たない標準事実・思想史・二次記述群）
- VAD/PAD・Lövheim cube・Thayer（感情の3次元/多次元モデル）. 〔精読: △ — 二次多重。Thayer は書誌のみ〕
- E=mc² / 束縛エネルギー放出（対消滅・核反応・崩壊で塊⇄放出）. 〔精読: △ — 二次多重（Britannica/LibreTexts/OpenStax）。仮説の最も近い物理対応〕
- 自発放出/誘導放出・ZPE（脱励起は塊保存・真空ゼロ点ゆらぎ駆動）. 〔精読: ○ — Wikipedia 逐語（QED 標準）。「ダム＝真空」の物理側翻訳〕
- 光子非局在（arXiv:0903.3712・quant-ph/0511270）. 〔精読: ○ — 一次寄り。「光子は放出/吸収の瞬間にのみ存在」は係争中の解釈〕
- FLRW / Gödel 宇宙 / CMB（宇宙時間の創発・閉じた時間的曲線・晴れ上がりの化石光）. 〔精読: △ — 二次（複数独立ソース一致）。「場は1本」は条件付き創発〕
- lumen naturale / divine illumination（Augustine=外/Aquinas=分有/Descartes=内）. 〔精読: △ — 二次（SEP）。心の光の源泉をめぐる思想史〕
- 仏教 prabhāsvara / Luminous mind（「暗室のランプのアナロジー」）. 〔精読: ○ — WebFetch 精読（"metaphorical rather than literal" verbatim）〕
- 光学史（Alhazen・Newton・Huygens・Young・Maxwell・Einstein）. 光の本性論の転換史. 〔精読: △ — 二次（Emission theory・Book of Optics 等）〕

注: DynAffect 実装系（Oravecz, Tuerlinckx & Vandekerckhove ／ De Longis et al. 2022, *Applied Psychology*）は巻号・DOI 未取得かつ同一群の複数論文が束ねられており、独立エントリを立てない。本文引用時に分離・個別確認する。

---

## 付録 A: 機械検証スクリプト一覧

<!--SOURCE: two-axis-closure/ の *.py 20本。各1行（何を検証し ALL CHECKS PASSED か）＋リポジトリパス。-->
（未整備）

## 付録 B: 用語と確度タグの対訳

<!--[P][M][S] → established/interpretive/speculative、採用/方向確定/読み候補/探索中/見送り の判定語彙の定義。-->
（未整備）
