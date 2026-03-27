# 「価値とは」統合調査レポート

Issue: #33
作成日: 2026-03-27
作成: Claude (agent-team-workflow, cs#188)
入力: value-chatgpt-20260326.md, value-chatgptpro-20260327.md, value-codex-20260327.md + Phase C 補完調査

## 要約

「価値」は価格/効用/規範/意味/象徴の少なくとも5つの問題系が束になった多義語である。日本語「価値」は英語の value/values/worth/utility/significance/merit/price に分岐し、翻訳時に問題系の混線が起きやすい。PD の複数概念（Doing, Being, 欠損駆動思考, trust, design-thinking）と接続点があるが、未整理の領域も多い。

## 「価値」の多義性

### 五つの問題系

| 問題系 | 定義 | 代表理論 | 英語対応語 |
|--------|------|----------|-----------|
| 価格 | 財・サービスの交換における貨幣的表現 | 古典派経済学（Smith, Ricardo）、マルクス労働価値説 | price, market value |
| 効用 | 目的達成や欲求充足の度合い | 限界効用理論（Jevons, Menger）、プロスペクト理論（Kahneman & Tversky） | utility, usefulness |
| 規範 | 善悪・正不正に関わる信念・基準 | 価値論 axiology（SEP）、Schwartz Basic Human Values | values, moral value |
| 意味 | 重要性・意義・生きられた経験としての重み | 現象学的アプローチ、meaning of life 論（SEP） | significance, importance, meaning |
| 象徴 | 地位・名誉・威信・記号としての価値 | Bourdieu 象徴資本、Baudrillard 記号価値 | prestige, symbolic value, sign value |

### 日英翻訳ズレ

| 英語 | 主な日本語対応 | ズレのポイント |
|------|--------------|---------------|
| value | 価値 | 日本語「価値」は下記6語の守備範囲をすべて覆う |
| values | 価値観・信条 | 単数 value（重要性）と混同されやすい |
| worth | 値打ち・自己価値 | 「割に合う」ニュアンスが強い（worth it） |
| utility | 有用性・効用 | 経済学では選好順序の表現であり心理的快楽とは別 |
| significance | 意義・重要性 | 「意味」と「重要性」を跨ぐ |
| merit | 長所・功績 | 日本語「メリット」は利得寄りだが英語は正当性・功績を含む |
| price | 価格・値段 | 価値の貨幣的表現。価値そのものではない |

### フレームワークの出自と限界

- ChatGPT「束をほどく」5次元 = 複数の既存分類（Spranger, Baudrillard, IPBES, VSD 等）の折衷的再構成。Boltanski & Thevenot の正当化レジームと構造的アナロジーがあるが、B&T は正当化の文法であり価値の分類ではない（[Princeton UP](https://press.princeton.edu/books/paperback/9780691123776/on-justification)）
- Pro 四層（交換/道具的/規範的/生きられた重要性）= O'Neill/IPBES の3分類（instrumental/intrinsic/relational）に現象学的「生きられた重要性」を加えた拡張（[IPBES Values Assessment](https://ipbes.net/the-values-assessment)）
- いずれも「独自構成」ではなく「既存理論の再構成」。単一の学術的出典に帰属しない

## 主要理論の概観

| 理論 | 提唱者 | 要点 | 限界 | 出典 |
|------|--------|------|------|------|
| Basic Human Values | Schwartz (1992) | 10基本価値の円環構造。4高次元（Openness-Conservation, Self-Enhancement-Self-Transcendence）で対立と両立を記述 | WEIRD 偏重の標本、自己報告尺度への依存、文化横断的妥当性への批判 | [概説](https://scholarworks.gvsu.edu/orpc/vol2/iss1/11/), [解説](https://i2insights.org/2021/11/02/schwartz-human-values/) |
| 4資本理論 | Bourdieu (1986) | 経済/文化/社会/象徴の4形態。資本間の転換メカニズム、場とハビトゥスによる再生産 | 資本概念の過度な拡張、転換率の測定困難、行為者の主体性の過小評価 | [原典PDF](https://home.iitk.ac.in/~amman/soc748/bourdieu_forms_of_capital.pdf) |
| 人類学的価値論 | Graeber (2001) | 社会学的/経済学的/言語学的の3つの「価値」伝統を統合。「価値 = 行動が社会的全体に組み込まれることで意味を持つようになる仕方」 | 理論的野心に対して経験的検証が不足、「価値」の定義が循環的との批判 | [著者サイト](https://davidgraeber.org/books/toward-an-anthropological-theory-of-value/) |
| 正当化レジーム | Boltanski & Thevenot (1991) | 6つの正当化の「秩序」（市場・産業・市民・家族・名声・霊感）。価値の衝突を正当化の文法として記述 | フランス社会に偏った経験的基盤、6秩序の網羅性への疑問 | [Princeton UP](https://press.princeton.edu/books/paperback/9780691123776/on-justification) |
| プロスペクト理論 | Kahneman & Tversky (1979) | 参照点依存、損失回避、確率加重。主観的価値は絶対量でなく変化として評価される | 記述理論であり規範的含意を持たない、複雑な多属性意思決定への適用限界 | [原著PDF](https://www.uzh.ch/cmsssl/slaw/dam/jcr:00000000-64a0-1db1-0000-00003b7ec704/10.18-kahneman-tversky-79.pdf) |
| Active Inference | Friston et al. | extrinsic value（期待効用）と epistemic value（情報利得）の二重構造。精度重み付けによるサリエンス制御 | 計算論的モデルと現象的経験の対応が不明確、反証可能性への批判 | [MIT Press OA](https://direct.mit.edu/books/oa-monograph/5299/Active-InferenceThe-Free-Energy-Principle-in-Mind) |
| Value Sensitive Design | Friedman et al. (2006) | 技術設計に human values を体系的に組み込む方法論。概念的・経験的・技術的の三相調査 | 価値の選定基準が不明確、ステークホルダー間の価値衝突の解決手順が弱い | [VSD Lab](https://vsdesign.org/) |
| ACT values | Hayes et al. | values = 「選ばれた生の方向」。症状除去より価値に沿った行動パターンの柔軟性を重視 | 価値の内容的妥当性を問わない（方向性のみ）、文化的文脈への感度が低い | [ACT概説](https://contextualscience.org/act) |

## PD への接続

| PD 概念 | 接続 | 確度 |
|---------|------|------|
| Doing | 「多様な価値観を受容れる」が行動原理の第一項（pjdhiro pd/project-design.md L65） | 確立 |
| Being | Being 側に「価値」の記述がない。Graeber「価値 = 行動の意味」が Doing と Being を架橋する理論的資源になりうる | 仮説 |
| 欠損駆動思考 | 「無価値感」が入力値（pjdhiro pd/thinking/thinking-kesson.md L51）。F-O 座標系は情動構成のメカニズムであり、価値判断の一要素に関与する可能性がある | 仮説 |
| Love 駆動開発 | 暗黙的に含まれるが明示的接続なし | 未整理 |
| trust | 「価値評価・社会予測・誤差学習」の結節点（trust-codex-20260326.md L81） | 仮説 |
| design-thinking | McKim (1964) "Human Values and Design" から IDEO/d.school の "empathy for user needs" への圧縮の系譜（[Stanford lineage 深掘り](design-thinking-stanford-lineage-deep-dive-codex-20260327.md) L143-145）。PD はこの圧縮を逆転させる方向 | 仮説 |
| 感情処理 | 「価値」は処理段階の一要素。value.md は作成中 | 進行中 |

## 洞察

調査から引き出された気づき。特にデザイン思考の定義に関わるもの:

1. Being 側に「価値」の記述がない -- Being（起きていること）の中で価値がどう立ち上がるかの記述が PD に欠けている。Graeber「価値 = 行動が社会的全体に組み込まれることで意味を持つようになる仕方」は Doing と Being を架橋する理論的資源になりうる
2. design-thinking の系譜で McKim の "human values" が IDEO/d.school で "user needs" に圧縮された歴史がある（[Stanford lineage 深掘り](design-thinking-stanford-lineage-deep-dive-codex-20260327.md) L143-145）。PD はこの圧縮を逆に展開し、values を復元する方向にある。デザイン思考を再定義するなら、この圧縮の解除が出発点になる
3. F-O 座標系（欠損駆動思考）は情動構成のメカニズムだが、「何を脅威と感じるか」「何が関係に影響するか」は価値判断の情動的な入り口として機能する可能性がある
4. 3つの LLM レポートとも Schwartz/Bourdieu/Graeber を欠いていた -- 心理学・社会学・人類学の最重要価値理論が盲点だった。設計対象の価値を分類するフレームワークがこれらの知見を欠けば、設計者の暗黙の価値前提が無自覚に反映されるリスクがある
5. ChatGPT「5次元」と Pro「四層」は類似した分類を異なる粒度で行っている。統合すれば PD 独自の価値分類フレームになる可能性があるが、デザイン思考の定義が先にないと分類の軸が定まらない

## 探索すべき問い

定義しきれなかった部分が、次の調査で検証すべき仮説として残る:

- Being 側での「価値」の位置づけ -- デザイン思考が Being をどう扱うかの問いと連動する
- Love 駆動開発と価値の明示的接続 -- 「関係・感情・意図が駆動する」とき、価値はどこに位置するか
- F-O 座標系と価値判断の関係の精緻化 -- 情動構成と価値判断は別のメカニズムか、同一過程の異なる記述か
- value.md（pjdhiro 正本）への反映内容 -- 本レポートのどの部分が PD の用語定義に入るべきか
- プロンプト同一性（3レポート比較の前提条件が未確認）

## 深掘り候補

ChatGPT の深掘り候補10件から PD 関連度で5件に絞り込み。

| 優先度 | テーマ | PD との関連 | 出典入口 |
|--------|--------|-----------|---------|
| 1 | Graeber「価値 = 行動の意味」と Doing/Being の関係 | Being 側の空白を埋める理論的資源 | [Graeber (2001)](https://davidgraeber.org/books/toward-an-anthropological-theory-of-value/) |
| 2 | ACT values と経済学 value の比較 | 「選ばれた生の方向」と「選好の主観価値」の分岐点 | [ACT](https://contextualscience.org/act) |
| 3 | 価値整合（alignment）は倫理学の価値論を必要とするか | AI alignment と VSD の接続点 | [CIRL](https://arxiv.org/abs/1606.03137), [VSD Lab](https://vsdesign.org/) |
| 4 | 価値の社会的生成と AI 評価指標 | 制度が価値尺度を作るメカニズム | [B&T](https://press.princeton.edu/books/paperback/9780691123776/on-justification) |
| 5 | 「意味」と「価値」の分岐 | significance が meaning と value を跨ぐ問題 | [SEP Meaning of Life](https://plato.stanford.edu/entries/life-meaning/) |

## 出典一覧

本調査の出典は二次文献中心である。一次資料への遡及は今後の課題。

### 哲学

| # | 出典 | URL |
|---|------|-----|
| 1 | SEP "Value Theory" | https://plato.stanford.edu/entries/value-theory/ |
| 2 | SEP "Intrinsic vs. Extrinsic Value" | https://plato.stanford.edu/entries/value-intrinsic-extrinsic/ |
| 3 | SEP "Value Pluralism" | https://plato.stanford.edu/entries/value-pluralism/ |
| 4 | SEP "The Meaning of Life" | https://plato.stanford.edu/entries/life-meaning/ |
| 5 | Britannica "Axiology" | https://www.britannica.com/topic/axiology |

### 経済学・行動経済学

| # | 出典 | URL |
|---|------|-----|
| 6 | Kahneman & Tversky (1979) Prospect Theory 原著PDF | https://www.uzh.ch/cmsssl/slaw/dam/jcr:00000000-64a0-1db1-0000-00003b7ec704/10.18-kahneman-tversky-79.pdf |

### 社会学

| # | 出典 | URL |
|---|------|-----|
| 7 | Schwartz Basic Human Values 概説 | https://scholarworks.gvsu.edu/orpc/vol2/iss1/11/ |
| 8 | Schwartz 価値理論 解説 | https://i2insights.org/2021/11/02/schwartz-human-values/ |
| 9 | Bourdieu "Forms of Capital" 原典PDF | https://home.iitk.ac.in/~amman/soc748/bourdieu_forms_of_capital.pdf |
| 10 | Boltanski & Thevenot "On Justification" | https://press.princeton.edu/books/paperback/9780691123776/on-justification |

### 人類学

| # | 出典 | URL |
|---|------|-----|
| 11 | Graeber "Toward an Anthropological Theory of Value" | https://davidgraeber.org/books/toward-an-anthropological-theory-of-value/ |
| 12 | Graeber テキスト | https://theanarchistlibrary.org/library/david-graeber-toward-an-anthropological-theory-of-value |
| 13 | Mauss "Essai sur le don" 原典PDF | https://archive.org/details/essaisurledonforme0000maus |

### 認知科学・神経科学

| # | 出典 | URL |
|---|------|-----|
| 14 | Active Inference (MIT Press OA) | https://direct.mit.edu/books/oa-monograph/5299/Active-InferenceThe-Free-Energy-Principle-in-Mind |
| 15 | 報酬予測誤差 概説 | https://www.scholarpedia.org/article/Reward_signals |

### AI・設計

| # | 出典 | URL |
|---|------|-----|
| 16 | VSD Lab 公式 | https://vsdesign.org/ |
| 17 | CIRL (Hadfield-Menell et al., 2016) | https://arxiv.org/abs/1606.03137 |
| 18 | ACT 概説 (contextualscience.org) | https://contextualscience.org/act |

### 環境

| # | 出典 | URL |
|---|------|-----|
| 19 | IPBES Values Assessment | https://ipbes.net/the-values-assessment |
| 20 | O'Neill et al. 環境の価値 | https://philpapers.org/rec/ONEEVI |
| 21 | TEEB (The Economics of Ecosystems and Biodiversity) | https://teebweb.org/ |

### 教育

| # | 出典 | URL |
|---|------|-----|
| 22 | OECD Learning Compass 2030 | https://www.oecd.org/education/2030-project/teaching-and-learning/learning/ |

### 日本語辞書

| # | 出典 | URL |
|---|------|-----|
| 23 | コトバンク「価値」 | https://kotobank.jp/word/%E4%BE%A1%E5%80%A4-460651 |
| 24 | コトバンク「価値観」 | https://kotobank.jp/word/%E4%BE%A1%E5%80%A4%E8%A6%B3-460652 |
| 25 | コトバンク「値打ち」 | https://kotobank.jp/word/%E5%80%A4%E6%89%93%E3%81%A1-590579 |

### 英語辞書・語源

| # | 出典 | URL |
|---|------|-----|
| 26 | Cambridge Dictionary "value" | https://dictionary.cambridge.org/dictionary/english/value |
| 27 | Online Etymology Dictionary "value" | https://www.etymonline.com/word/value |

## デザイン思考の定義に向けて

design-thinking は McKim (1964) の "human values" を IDEO/d.school の "empathy for user needs" に圧縮してきた（[Stanford lineage 深掘り](design-thinking-stanford-lineage-deep-dive-codex-20260327.md) L143-145）。PD はこの圧縮を逆転させ、価値の多義性（価格/効用/規範/意味/象徴）を設計の中に取り戻す方向にある。「価値とは何か」の整理は、デザイン思考を PD の文脈で再定義するための土台であり、次の段階として「デザイン思考とは何か」の定義調査が必要になる。Being 側の空白、Love 駆動開発との未接続は、デザイン思考の定義を通じて初めて位置づけられる可能性がある。

## 方法論ノート（付録）

3レポートの使い分け: ChatGPT=構造化+網羅性、Pro=横断論点の言語化、Codex=簡潔さ+検証可能な出典。調査プロセスの詳細は PROCESS-LOG.md を参照。品質保証は V1（出典実在確認: 25件 high / 2件 medium）、V2（主張と出典内容の照合）、V3-V6（反論構築・バイアス検出・論理チェック）を実施。3レポートのプロンプト同一性は未確認であり、モデル能力の厳密な比較ではなく出力品質の比較として扱っている。
