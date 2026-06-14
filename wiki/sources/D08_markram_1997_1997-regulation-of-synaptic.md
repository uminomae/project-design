---
title: "後シナプス活動電位とEPSPの一致によるシナプス効力の調節（Markram et al. 1997）"
description: "Markram, Lübke, Frotscher & Sakmann (1997, Science)。新皮質錐体細胞のペア記録で、後シナプス活動電位（AP）と興奮性後シナプス電位（EPSP）の一致のタイミングに応じてシナプス効力が増強または減弱することを示し、スパイクタイミング依存可塑性（STDP）を確立した記念碑的論文。"
aliases: ["Regulation of synaptic efficacy by coincidence of postsynaptic APs and EPSPs", "STDP", "スパイクタイミング依存可塑性"]
tags: [source, "D08", "原典解説"]
source:
  repo: "creation-space"
  path: "knowledge/raw/manifest.md"
  manifest_id: "D08-S09"
compiled: "2026-06-14"
status: 暫定
review_state: 未レビュー
---

# 後シナプス活動電位とEPSPの一致によるシナプス効力の調節（Markram et al. 1997）

> **高校生向けのやさしい解説**
>
> 脳は「よく使うつながりを強める」ことで学習します。でも「強める／弱める」の境目はどこにあるのでしょう。マルクラムたちは、2つの神経細胞の信号のやりとりを精密に測り、驚きの発見をしました。決め手は**ほんの数ミリ秒のタイミング**。受け手の細胞が「先に入力を受けてから自分が発火」するとつながりが強まり、「先に発火してから入力が来る」と弱まる。つまり「どちらが先か」という時間の順序が、学習の方向を決めていたのです。これが「スパイクタイミング依存可塑性（STDP）」の発見です。

## 概要

Markram, Lübke, Frotscher & Sakmann (1997) は、新皮質 (neocortex) の錐体細胞間のシナプス結合における活動依存的な可塑性の規則を明らかにした記念碑的論文である。神経細胞間の結合は発達や学習の過程で活動に駆動されて変化するが、その正確な規則は不明だった。著者らは2つの錐体細胞からの**デュアル・ホールセル電圧記録**を用い、後シナプス活動電位 (action potentials, APs) と単一の興奮性後シナプス電位 (excitatory postsynaptic potentials, EPSPs) の**一致 (coincidence)** が EPSP の変化を誘導することを見出した。その平均振幅は、後シナプス AP の EPSP に対する**正確なタイミング**に応じて、増強（上方調節）または減弱（下方調節）に差別的に分かれた。これらの観察は、樹状突起へ逆伝播する AP が、前・後シナプス細胞の電気活動のパターンに応じて、単一の活動的なシナプス結合を選択的に修飾することを示唆する。本論文は後に**スパイクタイミング依存可塑性 (spike-timing-dependent plasticity, STDP)** として定式化される現象の実験的基礎を与え、ヘブ則の精密な時間的定式化として神経科学・計算論に広く影響した。

## 主要概念

**一致のタイミングが可塑性の方向を決める**

> 後シナプス AP と EPSP の一致が EPSP を変化させ、その方向（増強／減弱）は AP の EPSP に対する正確なタイミングに依存する。

「どちらが先か」という数ミリ秒の時間順序が、シナプスを強めるか弱めるかを決める。

**逆伝播活動電位 (back-propagating AP)**

樹状突起へ逆伝播する AP が、後シナプス側の「発火した」という信号として、個々の活動的シナプスを選択的に修飾する。

**ヘブ則の時間的精密化**

「同時に発火する細胞は結合する」というヘブ則を、時間順序（pre→post で増強、post→pre で減弱）として精密化した。STDP の基礎。

## 創造（creation-space）との関連

「結合の強化／弱化が、出来事の時間的順序（どちらが先か）によって決まる」という STDP の発見は、創造の場における要素間の関係が、単なる共起ではなく**時間順序・因果の方向**によって形づくられることに対応づけて読める。Mahoney の経路依存（[[歴史社会学における経路依存]]）や Gersick の時間的転換（[[ワークチームにおける時間と転換：集団発達の新モデル]]）と同じく、「時間の順序が構造を決める」という主題を、神経のミクロスケールで示している。

## 書誌情報

- 著者: Henry Markram, Joachim Lübke, Michael Frotscher, Bert Sakmann（Max-Planck-Institut für Medizinische Forschung）
- 年: 1997
- 出典: *Science* 275(5297), 213–215
- access_status: url-verified
- **DOI**: [10.1126/science.275.5297.213](https://doi.org/10.1126/science.275.5297.213)

## 出典メモ

- 本ページは PubMed（PMID 8985014）の efetch 公式 abstract を一次入力として生成した。manifest 記載の OA URL（EPFL Infoscience）は直接の PDF 取得ができなかったため、PubMed の検証済み abstract を用いた。
- 生成: 2026-06-14, Claude Opus 4.8（pd#111 Step 3b バッチ2）。cs 側 source-note 生成後に `wiki-cross-check.mjs` で矛盾検査を再実行する。
