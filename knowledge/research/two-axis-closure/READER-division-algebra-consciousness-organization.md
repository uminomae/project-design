---
title: 可除代数‑意識/組織仮説 — 読み物
issue: pd#115
concept: CN-010
status: draft
date: 2026-07-02
---

# 可除代数‑意識/組織仮説 — 読み物

> 二つの素朴体験から出発し、数の梯子（ℝ→ℂ→ℍ→𝕆）をたどって、「なぜ 3 と 7 だけが特別なのか」を、定理・現実のたとえ・人間関係の三層で通す読み物。前提（解釈の賭け）と定理（硬い部分）は分けて記す。検証が進むたびに §10「検証の現在地」を更新する——**うまくいかなかった部分も含めて**。図は単体表示できる自己完結 SVG。

---

## 0. 私の体験（ここから全部が始まった）

**体験A：体を流れる二つの信号。**
何かを作っているとき、体の中に二種類の手ごたえが流れているのを感じる。ひとつは「量」——どれだけ広がるか、どれだけあるか（**物質**の感じ）。もうひとつは「まとまり」——それがちゃんと一つの意味を保っているか、バラバラにならないか（**精神**の感じ）。この二つは、いつも同時に、逆向きに引っぱり合っている。

> 📎 **参照**: この二軸の感じは、姉妹探索 [意識とは — awareness-space](https://uminomae.github.io/awareness-space/) のサマリーで、**物質的な生存**と**精神的な信頼**の二方向を意識が評価しているという仮説（生存-信頼軸）として提示している。本読み物はその二軸を出発点の体験として受け取る。

**体験B：チームの人数。**
何度もチームを組むうちに、体でわかったことがある。**3人がいちばん速くて良い。そして7人が限界**。8人になると、とたんに重くなる。理屈より先に、そう感じていた。

## 1. 私の問い

この二つは、ぜんぜん別の話に見える。でも——**同じ「形」が、その下に隠れているんじゃないか？** 体の中の二軸の感じと、チームの3と7。もし同じ構造なら、片方（数学でわかっているチームの数）から、もう片方（意識の仕組み）が見えるかもしれない。これが私の問い。

<svg width="100%" viewBox="0 0 680 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="二つの素朴体験から問いが生まれ、数学が3と7を答える地図">
<defs><marker id="arA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<line x1="195" y1="116" x2="300" y2="168" stroke="#888780" stroke-width="1.5" marker-end="url(#arA)"/>
<line x1="485" y1="116" x2="380" y2="168" stroke="#888780" stroke-width="1.5" marker-end="url(#arA)"/>
<line x1="340" y1="236" x2="340" y2="288" stroke="#888780" stroke-width="1.5" marker-end="url(#arA)"/>
<line x1="305" y1="356" x2="250" y2="408" stroke="#888780" stroke-width="1.5" marker-end="url(#arA)"/>
<line x1="375" y1="356" x2="430" y2="408" stroke="#888780" stroke-width="1.5" marker-end="url(#arA)"/>
<rect x="90" y="52" width="210" height="64" rx="12" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="195" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">体を流れる二軸</text>
<text x="195" y="100" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">物質と精神の信号</text>
<rect x="380" y="52" width="210" height="64" rx="12" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="485" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">チームの人数感覚</text>
<text x="485" y="100" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">3がベスト・7が上限</text>
<rect x="140" y="172" width="400" height="64" rx="12" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="340" y="200" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">問い：同じ形が隠れている?</text>
<text x="340" y="220" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">二つの体験は一つの構造か</text>
<rect x="140" y="292" width="400" height="64" rx="12" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="340" y="320" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">数の梯子は途中で止まる</text>
<text x="340" y="340" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">1, 2, 4, 8 で打ち止め</text>
<rect x="175" y="410" width="150" height="72" rx="12" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="250" y="440" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#085041">3</text>
<text x="250" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#0F6E56">閉じる最小の輪</text>
<rect x="355" y="410" width="150" height="72" rx="12" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
<text x="430" y="440" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#633806">7</text>
<text x="430" y="462" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#854F0B">束ねられる最大</text>
</svg>

---

## 2. 回る数 — 虚数、そして四元数

数には「回れる」段階がある。

- **1次元（実数 ℝ）**：できるのは「＋か−」だけ。スイッチのように、ひっくり返るだけ。真の回転はない。
- **2次元（複素数 ℂ）**：時計の針のように**なめらかに回れる**。虚数 `i` の正体は「90度回転」。2回で180度＝真後ろ＝`−1`（だから `i² = −1`）。
- **3次元を回す（四元数 ℍ）**：立体をなめらかに回すには数を4つ束ねる。それが `i, j, k`。ゲームがキャラクターを回すのに今も使う本物の道具。

この梯子を、ひとつずつ、たとえで確かめながら登っていく。

## 3. なぜ 3 は特別か — 閉じる最小の輪

四元数の心臓部は、たった一つの掛け算の規則：

```
i·j = k,   j·k = i,   k·i = j
```

「**二つが出会うと、ちょうど"次の一人"に着地する**」。ぐるっと**輪になって閉じる**。

> 📖 **「閉じる」とは** — 数学の言葉なので、先にほどいておく。
>
> 仲間どうしで何かをした結果が、**必ずまた仲間の中に戻ってくる**（外にはみ出さない）こと。
> - 整数＋整数は、いつも整数。だから整数の世界は足し算で「**閉じている**」。
> - でも 1 ÷ 2 ＝ 0.5 は整数の外。整数の世界は割り算では「閉じていない」（はみ出す）。
>
> ここでは `i·j = k` のように、**誰と誰を掛け合わせても、結果が3人の外にこぼれず、必ず3人の中の誰かに着地する**ことを「閉じる」と呼ぶ。じゃんけんなら「勝負の結果がいつもグー・チョキ・パーの中で決まる」こと。
>
> **順番のことではない**。順番の話はすぐ次に出てくる「**向き**」という**別の性質**だ。「閉じる＝はみ出さない」「向き＝回る方向で符号が変わる」と分けて持っておくと迷子にならない。
>
> なお、この読み物ではあとで「閉じて**割れる**」という言い方も出てくる。「割れる」＝**割り算までできる**こと。割り算の仕事は「**元に戻す・割り戻す**」だ——3人で1200円なら一人400円（割り勘）、「3 × □ ＝ 12」なら □ ＝ 4（見えない相手の特定）。掛け算の結果から、元を復元できる。
>
> 割り算ができないと何が困るか。一発でわかるのが「**×0**」だ。6×0＝0、4×0＝0——**結果のゼロを見ても、元が6だったか4だったか、もう誰にも分からない**。ゼロを掛けると情報が消えて、二度と割り戻せない。ふつうの数の世界でこれが起きるのは「0を掛けたとき」だけ。だから普段は安心して掛け算し、必要なら割り算で戻れる。「割れる世界」とは、**この復元がいつでも保証されている世界**のこと（詳しくは §5 で。そこでは「誰も0を掛けていないのに×0の事故が起きる、壊れた数の世界」が出てくる）。

そして `i·j = k` だが `j·i = −k`（逆回りはマイナス）＝**向きを持った輪**。順序が効く。

下の図。左が「2人＝閉じない」、右が「3人＝閉じる（四元数の三つ組）」。同じ三角形を**人／じゃんけん／四元数**の三通りで読める。

<svg width="100%" viewBox="0 0 680 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2人は閉じず、3人で輪が閉じる（四元数の三つ組）">
<defs><marker id="arC" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<line x1="272" y1="70" x2="272" y2="360" stroke="#B4B2A9" stroke-width="0.5" stroke-dasharray="4 4"/>
<text x="155" y="60" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">2人：閉じない</text>
<text x="430" y="60" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">3人：閉じる（輪）</text>
<line x1="124" y1="196" x2="186" y2="196" stroke="#888780" stroke-width="2" marker-end="url(#arC)"/>
<line x1="186" y1="224" x2="124" y2="224" stroke="#888780" stroke-width="2" marker-end="url(#arC)"/>
<circle cx="100" cy="210" r="22" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="100" y="215" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">A</text>
<circle cx="210" cy="210" r="22" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="210" y="215" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">B</text>
<text x="155" y="300" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">決着する第三の場所がない</text>
<line x1="448" y1="152" x2="512" y2="268" stroke="#1D9E75" stroke-width="2" marker-end="url(#arC)"/>
<line x1="504" y1="300" x2="356" y2="300" stroke="#1D9E75" stroke-width="2" marker-end="url(#arC)"/>
<line x1="348" y1="268" x2="412" y2="152" stroke="#1D9E75" stroke-width="2" marker-end="url(#arC)"/>
<circle cx="430" cy="120" r="24" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="430" y="125" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#085041">i</text>
<circle cx="530" cy="300" r="24" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="530" y="305" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#085041">j</text>
<circle cx="330" cy="300" r="24" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="330" y="305" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#085041">k</text>
<text x="430" y="90" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">A ・ グー</text>
<text x="530" y="342" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">B ・ チョキ</text>
<text x="330" y="342" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">C ・ パー</text>
<text x="400" y="410" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">矢印は「勝つ／積が次に着地する」向き　逆回りは符号が反転（順序が効く）</text>
</svg>

**点と線でいえば**——2人はただの1本の線。矢印が押し合うだけで、決着が落ちる先がない＝**開いたまま**。3人目の点が入って初めて、矢印は輪になって閉じる。

**現実のたとえでいえば**——じゃんけん。グーはチョキに、チョキはパーに、パーはグーに勝つ。三すくみになって初めて、「勝ち負けの仕組み」がそれ自体で完結する。

**もしも人間関係でいうなら**——二人の言い合いは、押し合いのまま終わらない。三人目がいて初めて、「じゃあ、こうしよう」が着地する場所ができる。だから「閉じる最小の単位」が **3**。

> 📖 **人間関係の「掛け算」とは何か** — ここがこの読み物のいちばん深い賭けで、まだ言葉が完成していない（保持論点）。問いの形はこうだ: **四元数の本質と、3人の関係の本質は、同じ形をしているのではないか。だとすれば、それはどんな関係のことか**。いまの見当を、出発点の二軸に忠実なかたちで書いておく。
>
> §2 を思い出してほしい。虚数 `i` の正体は「**90度回す**」だった。四元数の i, j, k も、すべて「回し方」だ。だから掛け算の本義は、何かを誰かに引き渡す事務の話ではない——**回すことの合成**だ。
>
> - 体験A に戻る。意識は「**物質（生存）× 精神（信頼）の二軸平面**」で、`i` ＝ 物質を精神へ回す90度——つまり**状況を「量・資源・生存の言葉」から「意味・関係・信頼の言葉」へ変換する動き**。
> - メンバー一人ひとりは、それぞれ**自分の回し方（自分の軸）**を持っている。同じ出来事を、それぞれ違う向きに生存↔信頼変換して見ている。
> - **A × B ＝ A の回し方と B の回し方の合成**。二人の視点を続けて通すと、状況は二段階回る。
> - **四元数の急所——「あいだ」も回る**: `i` を掛けると、自分の平面だけでなく **(j, k) の平面も一緒に回る**（i·j ＝ k、i·k ＝ −j）。人間関係でいえば——**A が動くと、B と C の「あいだ」も回る**。三人組には、残る一人と無関係でいられる「二人だけの私的な領域」が存在しない。三人であること自体が、全員を巻き込む構造になっている。
> - **3人が閉じているとは**: どの二人の回し方を合成しても、**ちょうど三人目の回し方に一致する**こと。二人の議論から生まれる第三の見方が、チームの外ではなく、**すでにそこにいる C のもの**だということ。
> - **C に何が起きるか**: 仕事が回ってくる、ではない。**A と B の関わりの帰結が、C のものの見方として着地する**——C の視点が要請され、強化され、生きる。
> - **足し算ではなく、掛け算**: 足し算は順序を替えても同じ（3＋5 ＝ 5＋3）——頭数を寄せ集める世界。回転の合成は**順序で向きが変わる**: `i·j = k` だが `j·i = −k`。A の軸を先に通すか、B の軸を先に通すかで、生まれる見方の**向きが逆**になる。チームは頭数の足し算ではなく、**順序と向きが意味を持つ掛け算**でできている——というのが、この読み物の賭けの核心だ。
>
> **正直な注意を二つ**。第一に、この「回し方の合成」という読みは**解釈の賭け**であり、まだ検証の途中（§10「どこまでが数学か」）。第二に、これを観測するときは「どのペアの件も、着地する第三の視点（ホーム）が一意に決まっているか」という**粗い代理指標**に落とす（§7）——代理は意味そのものではない。

---

## 4. なぜ 7 は特別か — 三角形7枚の織物

7つの虚単位 e₁…e₇ を**点**、7つの三つ組を**線**とする。掛け算の規則そのものが「点と線」になる（最小の射影平面 PG(2,2)）。

<svg width="100%" viewBox="0 0 680 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ファノ平面による八元数の掛け算規則">
<defs><marker id="arD" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<line x1="340" y1="70" x2="530" y2="400" stroke="#888780" stroke-width="1.2"/>
<line x1="150" y1="400" x2="530" y2="400" stroke="#888780" stroke-width="1.2"/>
<line x1="340" y1="70" x2="340" y2="400" stroke="#888780" stroke-width="1.2"/>
<line x1="150" y1="400" x2="435" y2="235" stroke="#888780" stroke-width="1.2"/>
<line x1="530" y1="400" x2="245" y2="235" stroke="#888780" stroke-width="1.2"/>
<circle cx="340" cy="290" r="110" fill="none" stroke="#888780" stroke-width="1.2"/>
<line x1="326" y1="95" x2="259" y2="210" stroke="#1D9E75" stroke-width="2.5" marker-end="url(#arD)"/>
<line x1="231" y1="260" x2="164" y2="375" stroke="#1D9E75" stroke-width="2.5" marker-end="url(#arD)"/>
<circle cx="435" cy="235" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="435" y="240" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₄</text>
<circle cx="530" cy="400" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="530" y="405" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₅</text>
<circle cx="340" cy="400" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="340" y="405" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₆</text>
<circle cx="340" cy="290" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="340" y="295" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₇</text>
<circle cx="340" cy="70" r="17" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/><text x="340" y="75" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#085041">e₁</text>
<circle cx="245" cy="235" r="17" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/><text x="245" y="240" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#085041">e₂</text>
<circle cx="150" cy="400" r="18" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/><text x="150" y="405" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#633806">e₃</text>
<text x="340" y="460" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">e₁・e₂ を通る線は1本、その第三点 e₃ が積（e₁·e₂ = e₃、矢印＝向き）</text>
<text x="340" y="482" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">各点はちょうど3本の線上／どの2点も1本を共有 ＝ 7つの三つ組</text>
</svg>

> 📖 **この図での掛け算のやり方** — §3 のじゃんけんの輪が、7人に増えただけ。
>
> 1. たとえば e₁ × e₂ を知りたい → 図の中で **e₁ と e₂ の両方を通る線**を探す。どの2点にも、そういう線が**必ずちょうど1本**ある。
> 2. その線の**残りの1点**が答え: e₁·e₂ ＝ e₃。
> 3. 矢印の**向きに沿えば＋、逆らえば−**: e₂·e₁ ＝ −e₃。自分自身との掛け算は eᵢ² ＝ −1（§2 の「90度を2回で真後ろ」と同じ）。
>
> つまり**線1本 ＝ §3 の閉じた輪（じゃんけんの三すくみ）1個**。ファノ平面とは、その輪を7本、「どの2人も必ずどれか1本を共有する」ように重ね編みした**掛け算の配線図**だ。

数え上げで確かめられる事実（比喩ではない）：各線は3点、各点は3本の線上、**どの2点もちょうど1本の線を共有**、どの2線も1点で交わる。

> 📖 **「結合しない」とは** — これも数学の言葉なので、ほどいておく。
>
> ふつうの数では (2×3)×4 ＝ 2×(3×4)。**カッコをどこに置いても答えが同じ**——この性質を「結合法則」という。私たちはふだん、カッコの位置なんて気にせずに計算している。
>
> 八元数では、これが**選ぶ3人によって**成り立ったり破れたりする:
> - **同じ線の上の3人**（例: e₁, e₂, e₃）→ 結合する。1枚の三角形の中は、§3 の四元数と同じ安全な世界。
> - **線に乗らない3人**（例: e₁, e₂, e₄）→ 破れる。実際に計算すると **(e₁·e₂)·e₄ ＝ +e₇** なのに **e₁·(e₂·e₄) ＝ −e₇**。同じ e₇ に着地するのに、**カッコの位置で向きが逆**になる（本プログラムの検証スクリプトで機械確認済み）。
>
> **もしも人間関係でいうなら**——三角形の中では段取りは自由。誰から先に話をまとめても、同じ結論に着地する。でも三角形を**またぐ**3人では、「AとBで先に固めてからCへ」と「BとCで先にまとめてからAへ」で**結論の向きが変わる**。根回しの順番が結果を変える、あの感覚。これがすぐ後の「リーダーは要るか」につながる。

これが 3 と 7 の質的な差だ: **四元数（3人）はどの3人を選んでも結合する。八元数（7人）は「線に乗らない三人組」で結合が破れる。**

**点と線でいえば**——7つの点は、どの2点をとっても、ちょうど1本の線（三つ組）を共有する。そして各点は3本の線の上に立つ。

**現実のたとえでいえば**——**7 ＝ 三角形の布を7枚、すきまなく編み込んだ織物**。3はそれが1枚。7は、それが破綻なく織り上がる最大。

**もしも人間関係でいうなら**——7人のチームでは、どの二人にも「その二人の関係が帰属する三人組」がちょうど一つある。そして誰もが3つの三人組をかけ持ちして、重なり合う網になる。

> 📖 **7人への拡張 — 一人が動くと、3つの「あいだ」が同時に回る**
>
> §3 の急所（A が動くと、B と C の「あいだ」も回る）を、そのまま7人に広げたものが八元数だ。計算で確かめられる:
>
> **e₁ を掛けると、残り6人が (e₂, e₃)・(e₄, e₅)・(e₆, e₇) という3つのペア平面に組まれて、同時に回る**（e₁·e₂ ＝ e₃、e₁·e₄ ＝ e₅、e₁·e₆ ＝ −e₇。本プログラムの検証スクリプトで確認済み）。
>
> そしてこの3つのペアは偶然ではない——**e₁ を通る3本の線、つまり e₁ のホーム三角形3つの「相方ペア」そのもの**だ。「各人がちょうど3つの三角形をかけ持ちする」というファノの構造は、飾りではなく、**一人の回しが、誰と誰の「あいだ」を回すかの配線図**だった。
>
> - **3人**: 一人が動くと、**1つ**のあいだ（残り二人のペア平面）が回る。
> - **7人**: 一人が動くと、**3つ**のあいだが同時に回る。どの3つかは、その人のホーム三角形が決めている。
> - 3人との違いは、§4 で見た**非結合**だけ: 三角形の中では向きが揃うが、三角形をまたぐ段取りでは向きが逆転しうる。
>
> 四元数の本質（回転の合成・あいだも回る・順序で向きが変わる）は、**そのまま7人に拡張されている**。増えたのは「あいだ」の数と、三角形をまたぐときの段取り依存だけだ。

### 三角形が2枚や3枚では、だめなのか

当然の疑問がここで立つ。1枚（3人）が閉じるなら、2枚や3枚を貼り合わせた「中くらいの織物」はなぜないのか。

貼り合わせの条件——**どの2人も、ちょうど1つの三角形を共有する**——が、見た目よりずっと厳しいからだ。

> 📖 **「ホームの三角形」とは** — あるペア（2人）にとって、**その2人が両方入っている三角形**のこと。さっきの掛け算のやり方で「e₁ と e₂ の両方を通る線」と呼んだものと同じだ。
>
> なぜ「ちょうど1つ」でなければいけないのか。**ペアの掛け算の答えは、ホームの残りの1点**で決まるからだ。
> - ホームが**ない**ペア → 掛け算の答えが**ない**（穴）
> - ホームが**2つある**ペア → 答えが**2つに割れる**（どちらか決まらない）
>
> どちらでも「掛け算の配線図」としては壊れる。だから条件は「ちょうど1つ」。
>
> **もしも人間関係でいうなら**——ホームとは、**その二人の関わりの帰結が着地する、第三の視点の在りか**（§3 の掛け算の読み）。ホームがない＝二人の間に生まれたものを受けて回す視点が、チームの中にない。ホームが2つ＝着地先が割れて、どちらの見方で回すのか決まらない。観測するときの粗い代理は「その二人の件の持ち込み先が一意か」（§7）。

まず絵で見る。

<svg width="100%" viewBox="0 0 680 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="三角形1枚・2枚・7枚の比較 — 2枚では家のないペアが残り、7枚で全ペアに家がちょうど一つ">
<text x="110" y="42" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">1枚 ＝ 3人</text>
<text x="340" y="42" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">2枚 ＝ 5人</text>
<text x="570" y="42" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">7枚 ＝ 7人</text>
<line x1="225" y1="55" x2="225" y2="300" stroke="#B4B2A9" stroke-width="0.5" stroke-dasharray="4 4"/>
<line x1="455" y1="55" x2="455" y2="300" stroke="#B4B2A9" stroke-width="0.5" stroke-dasharray="4 4"/>

<g stroke="#1D9E75" stroke-width="2" fill="none">
<line x1="110" y1="90" x2="62" y2="190"/><line x1="62" y1="190" x2="158" y2="190"/><line x1="158" y1="190" x2="110" y2="90"/>
</g>
<circle cx="110" cy="90" r="14" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/><text x="110" y="95" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">A</text>
<circle cx="62" cy="190" r="14" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/><text x="62" y="195" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">B</text>
<circle cx="158" cy="190" r="14" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/><text x="158" y="195" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#085041">C</text>
<text x="110" y="238" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#0F6E56">✓ 完結（§3 の閉じた輪）</text>

<g stroke="#1D9E75" stroke-width="2" fill="none">
<line x1="340" y1="88" x2="264" y2="168"/><line x1="264" y1="168" x2="312" y2="212"/><line x1="312" y1="212" x2="340" y2="88"/>
<line x1="340" y1="88" x2="416" y2="168"/><line x1="416" y1="168" x2="368" y2="212"/><line x1="368" y1="212" x2="340" y2="88"/>
</g>
<line x1="264" y1="168" x2="416" y2="168" stroke="#E24B4A" stroke-width="1.8" stroke-dasharray="5 4"/>
<text x="340" y="160" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="500" fill="#A32D2D">✕</text>
<circle cx="340" cy="88" r="14" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="340" y="93" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#2C2C2A">A</text>
<circle cx="264" cy="168" r="14" fill="#FCEBEB" stroke="#A32D2D" stroke-width="0.5"/><text x="264" y="173" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#791F1F">B</text>
<circle cx="312" cy="212" r="14" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="312" y="217" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#2C2C2A">C</text>
<circle cx="416" cy="168" r="14" fill="#FCEBEB" stroke="#A32D2D" stroke-width="0.5"/><text x="416" y="173" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#791F1F">D</text>
<circle cx="368" cy="212" r="14" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="368" y="217" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#2C2C2A">E</text>
<text x="340" y="238" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#A32D2D">✕ B と D に「ホームの三角形」がない</text>
<text x="340" y="258" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">三角形を足すと、今度はホームが2つのペアが出る</text>

<g stroke="#888780" stroke-width="1.2" fill="none">
<line x1="570" y1="75" x2="505" y2="205"/><line x1="505" y1="205" x2="635" y2="205"/><line x1="635" y1="205" x2="570" y2="75"/>
<line x1="570" y1="75" x2="570" y2="205"/><line x1="505" y1="205" x2="602" y2="140"/><line x1="635" y1="205" x2="538" y2="140"/>
<circle cx="570" cy="164" r="41"/>
</g>
<circle cx="570" cy="75" r="10" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<circle cx="505" cy="205" r="10" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<circle cx="635" cy="205" r="10" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<circle cx="538" cy="140" r="10" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<circle cx="602" cy="140" r="10" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<circle cx="570" cy="205" r="10" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<circle cx="570" cy="164" r="10" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="570" y="238" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#0F6E56">✓ 全21ペアにホームがちょうど1つ</text>

<text x="340" y="300" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">継ぎ足しの織物には、穴（ホームなし）か重複（ホーム2つ）が必ず残る</text>
<text x="340" y="330" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">完全に編める人数は、3人（1枚）の次は、いきなり7人（7枚）</text>
</svg>

- **2枚**（図の中央）: 1点でつなぐと5人。またぐペア（B と D）に**ホームがない**。
- 「**なら {A,B,D} を足せばいいのでは?**」——いい着眼で、B–D の穴は確かに埋まる（B×D の答えは A に決まる）。だが今度は **A–B のホームが {A,B,C} と {A,B,D} の2つ**になる（A–D も同じ）。A×B の答えが C なのか D なのか、決まらなくなった。**穴を埋めると重複が生まれ、重複を消すと穴が生まれる**——このモグラ叩きが終わらない。
- 数えるだけでも壁が見える。n 人のペアの数は n(n−1)/2、三角形1枚が受け持てるペアは3つ。だから枚数 ＝ n(n−1)/6 が**整数**でないと始まらない。5人なら 10÷3 で**割り切れない**。4人・6人は割り切れるのに、**並べ方が存在しない**ことが知られている。
- 結局、「全ペアにホームをちょうど1つずつ」配れる人数は、**3人（1枚）の次は、いきなり7人（7枚）**（この完全な配り方は数学でシュタイナー系と呼ばれ、存在する人数は限られている）。
- では9人（12枚）は? **織物としては編める**。だが今度は、その上の**掛け算が「割れる」を保てない**（次の §5 の壁）。「完全な織物」と「割れる掛け算」の**両方**が立つ交点は——1枚と7枚しかない。

---

### 応用 — 7人チームに、リーダーは要るか

7人を三つ組で編んだ網（ファノ平面）の自己同型は位数168の PSL(2,7) で、**どの人も構造的に同格**、区別された中心が無い。**接続のためにはリーダーは要らない**——構造が自分自身のリーダー。

要るのは「**向き付け**」。ファノ平面は静止画にすぎず、**動く積（八元数）にするには各三つ組の線に一貫した向き（符号規約）を与える**必要がある。**リーダーの数学的正体は「ハブ」ではなく「符号規約」**。そして非結合性ゆえ、方向は決められても実行を一列に線形化できない＝**7人チームは構造上、分散でしか動けない**。

1人を区別すると（外的な非対称：希少スキル等）、時空の 3+3 分割と同じことが起きる。

<svg width="100%" viewBox="0 0 680 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="リーダーを1人立てた7者：3つのリーダー三つ組と4つのピア三つ組">
<line x1="340" y1="70" x2="150" y2="400" stroke="#1D9E75" stroke-width="1.5"/>
<line x1="340" y1="70" x2="530" y2="400" stroke="#1D9E75" stroke-width="1.5"/>
<line x1="150" y1="400" x2="530" y2="400" stroke="#1D9E75" stroke-width="1.5"/>
<circle cx="340" cy="290" r="110" fill="none" stroke="#1D9E75" stroke-width="1.5"/>
<line x1="340" y1="70" x2="340" y2="400" stroke="#D85A30" stroke-width="2.5"/>
<line x1="150" y1="400" x2="435" y2="235" stroke="#D85A30" stroke-width="2.5"/>
<line x1="530" y1="400" x2="245" y2="235" stroke="#D85A30" stroke-width="2.5"/>
<circle cx="340" cy="70" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="340" y="75" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₁</text>
<circle cx="245" cy="235" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="245" y="240" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₂</text>
<circle cx="150" cy="400" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="150" y="405" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₃</text>
<circle cx="435" cy="235" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="435" y="240" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₄</text>
<circle cx="530" cy="400" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="530" y="405" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₅</text>
<circle cx="340" cy="400" r="17" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="340" y="405" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#2C2C2A">e₆</text>
<circle cx="340" cy="290" r="19" fill="#FAECE7" stroke="#D85A30" stroke-width="0.5"/><text x="340" y="295" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#712B13">L</text>
<circle cx="150" cy="462" r="7" fill="#D85A30"/><text x="164" y="467" text-anchor="start" font-family="sans-serif" font-size="12" fill="#5F5E5A">リーダー三つ組 3本（全員に届く）</text>
<circle cx="420" cy="462" r="7" fill="#1D9E75"/><text x="434" y="467" text-anchor="start" font-family="sans-serif" font-size="12" fill="#5F5E5A">ピア三つ組 4本（自走）</text>
</svg>

区別された1人を通る三つ組は**ちょうど3本**で、残り6人を3つの二人組に完全に仕分けて**全員に直接届く**。残り**4本はその人を通らずピアだけで自走**。各フォロワーは「縦1本＋横2本」を持つ。**1人のリーダーが全体を統べることは構造上できない**（4/7 は分散のまま）。

---

## 5. なぜ他の数ではだめか — つむじと零因子

「者」の数 p ＝虚方向の数、全体次元 d = p+1。**閉じて割れる関係構造**を持てるのは d ∈ {1,2,4,8}、すなわち p ∈ {0,1,3,7} のみ。

<details>
<summary><strong>もっと詳しく — 数の世界ごとの壊れ方の一覧表</strong>（読み飛ばしても本筋は追える）</summary>

| 者 p / 次元 d | 数の世界 | 乗除のルール | 何が壊れるか（支配定理） |
|---|---|---|---|
| 0 / 1 | 実数 ℝ | 可換・結合・割れる・順序あり | 虚方向ゼロ＝関係が無い |
| 1 / 2 | 複素数 ℂ | 可換・結合・割れる | 可換で向きが消え第三者が作れない |
| **2 / 3** | **存在しない** | — | 3次元の可除代数は無い。**零因子必発**（Frobenius / Bott–Milnor–Kervaire） |
| **3 / 4** | 四元数 ℍ ✓ | 非可換・結合・割れる | 代償＝可換性を失う。3D外積で三つ組が閉じる |
| **4,5,6 / 5,6,7** | **存在しない** | — | 可除代数なし。**必ず零因子** |
| **7 / 8** | 八元数 𝕆 ✓ | 非可換・非結合（交代）・割れる・ノルム保存 | 代償＝結合性を失う。7D外積が閉じる最後 |
| 15 / 16 | 十六元数 𝕊 | 非可換・非結合・非交代・**割れない** | ノルム保存が崩れ**零因子出現**。掛けられるが割れない |

</details>

**壊れ方の核心＝零因子**（`a≠0, b≠0` なのに `a·b=0`）。§3 で見たとおり「×0 だけは取り消せない」——結果のゼロからは元を割り戻せない。ふつうの数ではこの事故は0を掛けたときにしか起きないが、壊れた数の世界では**ゼロでないもの同士を掛けたのにゼロになる**。つまり、誰も0を掛けていないのに「復元不能」が仕組みに埋め込まれてしまう。二つの非ゼロが結合して**消える**＝割り算＝解決ができない。降りていく代償の梯子（Cayley–Dickson）：`ℝ(順序)→ℂ(順序を失う)→ℍ(可換性を失う)→𝕆(結合性を失う)→𝕊(交代性と割り算を失う)`。

**もしも人間関係でいうなら**——どちらも一人では元気なのに、組み合わさると何も生まれず、しかもほどけなくなる関係、と読むのが本仮説の賭けだ（この対応にはまだ実証がない。検証の現在地は §10）。

### ハゲ球の定理 — つむじとは何か

壁の一番わかりやすい姿。**つむじ＝方向を敷きつめようとしたとき、どうしても向きが決まらない一点。**

<svg width="100%" viewBox="0 0 680 445" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="つむじ（cowlick）とハゲ球の定理">
<defs><marker id="arE" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<circle cx="140" cy="122" r="42" fill="none" stroke="#888780" stroke-width="1"/>
<line x1="162" y1="118" x2="162" y2="133" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="151" y1="137" x2="138" y2="145" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="129" y1="137" x2="116" y2="130" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="118" y1="118" x2="118" y2="103" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="129" y1="99" x2="142" y2="91" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="151" y1="99" x2="164" y2="106" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<circle cx="140" cy="118" r="4" fill="#E24B4A"/>
<text x="140" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">頭のつむじ</text>
<circle cx="340" cy="120" r="42" fill="none" stroke="#888780" stroke-width="1" stroke-dasharray="4 4"/>
<line x1="362" y1="120" x2="362" y2="135" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="351" y1="139" x2="338" y2="147" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="329" y1="139" x2="316" y2="132" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="318" y1="120" x2="318" y2="105" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="329" y1="101" x2="342" y2="93" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="351" y1="101" x2="364" y2="109" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<circle cx="340" cy="120" r="4" fill="#E24B4A"/>
<text x="340" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">台風の目</text>
<circle cx="540" cy="125" r="42" fill="none" stroke="#888780" stroke-width="1"/>
<ellipse cx="540" cy="125" rx="42" ry="13" fill="none" stroke="#888780" stroke-width="0.5"/>
<line x1="562" y1="108" x2="562" y2="123" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="551" y1="127" x2="538" y2="135" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="529" y1="127" x2="516" y2="120" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="518" y1="108" x2="518" y2="93" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="529" y1="89" x2="542" y2="81" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="551" y1="89" x2="564" y2="97" stroke="#D85A30" stroke-width="1.5" marker-end="url(#arE)"/>
<circle cx="540" cy="108" r="4" fill="#E24B4A"/>
<text x="540" y="182" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">球はつむじが残る</text>
<text x="340" y="210" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">向きが決まらない一点（つむじ・赤）が必ず残る ＝ 梳けない</text>
<circle cx="230" cy="300" r="38" fill="none" stroke="#1D9E75" stroke-width="1"/>
<line x1="268" y1="300" x2="268" y2="286" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="249" y1="333" x2="261" y2="326" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="211" y1="333" x2="223" y2="340" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="192" y1="300" x2="192" y2="314" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="211" y1="267" x2="199" y2="274" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="249" y1="267" x2="237" y2="260" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<text x="230" y="360" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">円（1次元）は梳ける</text>
<ellipse cx="450" cy="300" rx="55" ry="34" fill="none" stroke="#888780" stroke-width="1"/>
<ellipse cx="450" cy="300" rx="24" ry="14" fill="none" stroke="#888780" stroke-width="1"/>
<line x1="438" y1="266" x2="462" y2="266" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="505" y1="288" x2="505" y2="312" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="462" y1="334" x2="438" y2="334" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<line x1="395" y1="312" x2="395" y2="288" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arE)"/>
<text x="450" y="360" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">トーラスは梳ける</text>
<text x="340" y="392" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">つむじゼロで梳ける ＝ 矛盾ない向きを全体に敷ける</text>
<text x="340" y="424" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">球で完全に梳けるのは 次元 0・1・3・7 だけ ＝ 掛けて割れる世界（3と7）</text>
</svg>

頭の毛を全部なでつけても必ず一箇所は渦になる。地球の風は球面に沿う向きの場なので、地上には**必ず無風点**がある。「完全に梳ける＝空間全体に矛盾のない向きを一斉に敷ける＝掛け算・割り算が成立する」。これができる球は **S⁰, S¹, S³, S⁷** の四つだけ（＝次元 1,2,4,8 の数の世界＝3と7）。

> **但し書き**：日常版のハゲ球は「向きを1本、消えないように敷けるか」で偶数次元球が失敗する話。数の世界（割り算）に効くのはより強い「独立な向きのフルセット（枠）を敷けるか＝平行化可能」で、これを満たす球が S⁰,S¹,S³,S⁷。つむじの絵は入口のイメージ。

---

## 6. そうとは言い切れない理由 — 対抗馬と、外れた部分

ここからは反対側に立つ。§3〜§5 の論拠と同じ強度で、「特別と言い切れない」側の理由と論拠を並べる。両方を見て初めて、この仮説の現在地が正しく見える。

### 三つの読み方 — 死んだのは一枚だけ

この節には「棄却」という言葉が出てくるが、**数学が死んだのではない**。この仮説は強さの違う三つの読み方の積み重ねで、死んだのは一番上の一枚だけだ。

| 読み方 | 主張 | 状態 |
|---|---|---|
| 数学（定理） | 掛けて割れる数の体系は次元 1,2,4,8 のみ。虚方向が閉じるのは 3 と 7 だけ | **無傷**（証明がある） |
| 強い読み（自然法則） | だから現実でも 4,5,6 人のチームは構造的に成立**しない** | **棄却**（下記） |
| 弱い読み（設計原理） | 3 と 7 を**選べば**、関係が閉じたまま拡張できる | **存続**（現在の形） |

そして出発点の素朴体験は、むしろ実証に支持されている。「3がベスト」は 3–4人 > 5–6人 のデータと合い、「7が上限」は上限帯 7–9 として残る。外れたのは「8で**急に**重くなる」の「急に」だけだ。

### 対抗馬 — コストの法則

実は「3がベスト・7が上限」には、可除代数を使わない**もっと地味な説明**が昔からある。これを正直に併記する——本仮説はこの対抗馬に勝たなければならないからだ。

**コストの法則**：チーム内の関係（経路）数は `n(n−1)/2` で n の2乗で増える。一方、仕事量は人数 n に比例（1乗）でしか増えない。

<svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="チーム人数と調整経路数の増加">
<line x1="70" y1="360" x2="630" y2="360" stroke="#888780" stroke-width="1"/>
<rect x="94" y="349" width="50" height="11" rx="2" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="119" y="341" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">1</text><text x="119" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">n=2</text>
<rect x="172" y="328" width="50" height="32" rx="2" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="197" y="320" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#085041">3</text><text x="197" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">n=3</text>
<rect x="250" y="296" width="50" height="64" rx="2" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="275" y="288" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">6</text><text x="275" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">n=4</text>
<rect x="328" y="253" width="50" height="107" rx="2" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="353" y="245" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">10</text><text x="353" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">n=5</text>
<rect x="406" y="200" width="50" height="160" rx="2" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
<text x="431" y="192" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">15</text><text x="431" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">n=6</text>
<rect x="484" y="135" width="50" height="225" rx="2" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
<text x="509" y="127" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#633806">21</text><text x="509" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">n=7</text>
<rect x="562" y="60" width="50" height="300" rx="2" fill="#FCEBEB" stroke="#A32D2D" stroke-width="0.5"/>
<text x="587" y="52" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#791F1F">28</text><text x="587" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">n=8</text>
<circle cx="150" cy="402" r="6" fill="#1D9E75"/><text x="162" y="407" text-anchor="start" font-family="sans-serif" font-size="12" fill="#5F5E5A">最適</text>
<circle cx="240" cy="402" r="6" fill="#BA7517"/><text x="252" y="407" text-anchor="start" font-family="sans-serif" font-size="12" fill="#5F5E5A">上限</text>
<circle cx="330" cy="402" r="6" fill="#E24B4A"/><text x="342" y="407" text-anchor="start" font-family="sans-serif" font-size="12" fill="#5F5E5A">崩壊（頭で追えない）</text>
</svg>

正味の効果 `Net(n) = a·n − c·n(n−1)/2` を最大化すると **最適人数 `n* = a/c + 1/2`**。**「スピード感」を重視する＝調整コスト c を重く見る**ということ。c が大きいほど `n*` は小さくなり **3 に張り付く**。

ただし注意が二つ。**この説明では 8 に崖は出ない**——コストは 21→28 と滑らかに増えるだけで、上限がどこに来るかは「頭がいくつまで追えるか」という外部パラメタ次第だ。また、よく引かれる「Miller の 7±2」は短期記憶の項目数の話であって、チーム人数の話ではない（Miller 自身が、7 の頻出は偶然かもしれないと数秘への警戒を書いている）。

つまりここまでで説明は**二つ**ある。前章までの**可除代数**（3 と 7 だけが構造的に特別）と、この章の**コストの法則**（どの人数も特別ではなく、コストが滑らかに増えるだけ）。面白いことに、**3人ではこの二つは同じ答えを出す**（ペア数 3 ＝ 四元数の虚単位 3）。分かれるのは **7** だ——その話は §7 で。

### 実際に外れた部分 — 「3と7しかない」という法則

強い読みがもっとも大胆な予言をしているのは、3と7の**あいだ**の数だ——「4,5,6人のチームは零因子で崩れ、解決ができないはず」。だからそこが検証地点になる（5 や 6 が「新しい特別な数」として浮上したのではない。**反例の証人**として呼ばれただけだ）。実際のチーム研究を調べた結果、**記述法則としての強い読みは棄却された**。

- 5人や6人のチームは普通に存在し、普通に機能する（329の実働グループを調べた研究では 3–4人 > 5–6人 > 7–10人 の順で、逓減は5–6人で既に始まっていた）。「4,5,6人は構造的に成立しない」という予言は現実に合わない。
- **8人での崖も見つからなかった**。人数による性能低下は滑らかで（べき乗則）、急落が実証されているのはむしろ20人前後（内閣サイズの研究）。
- 実証が支持する正直な帯は「**最適 3–5 人・上限 7–9 人**」。ちょうど3・ちょうど7という一点は主張できない。

### たとえ — アーチとモルタル

死んだものと残ったものの違いは、アーチ橋で考えるとわかりやすい。

アーチには、自重だけで完全に釣り合う理想の曲線（カテナリー）がある。数学は「この形だけが釣り合う」と証明する——それは真だ。だが理想形でないアーチも、**モルタルを多めに使えば立つ**。

- 「理想形以外は**崩落する**」と読めば誤り。これが棄却された強い読み。
- 「理想形だけが**モルタルなしで立つ**」と読めば真。これが存続する設計原理。

5〜6人チームは「モルタル（余分な調整コスト）で立っているアーチ」であり、3 と 7 は「構造だけで閉じる形」。だから 5 人チームが普通に働いている光景は数学への反証ではなく、**現実のチームがモルタルを使えることの証拠**にすぎない。問いは「立つか崩れるか」から「**どれだけのモルタルで立っているか**」に変わる。

## 7. それでも残っている牙 — 7人は「三つ組の網」という予測

ところが、棄却作業の副産物として、仮説の**検証可能な核**がはっきりした。

可除代数の読みとコスト法則の読みは、**7人のところで初めて違う絵を描く**。コスト法則にとって7人チームの実体は「21本のペア」。八元数にとっては「**7つの重なり合う三人組**」——ファノ平面の掛け算則そのものだ。

<svg width="100%" viewBox="0 0 680 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="同じ7人21本の関係が、ペアの網と7つの三つ組という二つの読みに分かれる">
<text x="170" y="50" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">コスト法則の読み：21本のペア</text>
<text x="510" y="50" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">八元数の読み：7つの三つ組</text>
<line x1="340" y1="60" x2="340" y2="400" stroke="#B4B2A9" stroke-width="0.5" stroke-dasharray="4 4"/>
<g stroke="#B4B2A9" stroke-width="1">
<line x1="170" y1="110" x2="264" y2="155"/><line x1="170" y1="110" x2="287" y2="257"/><line x1="170" y1="110" x2="222" y2="338"/><line x1="170" y1="110" x2="118" y2="338"/><line x1="170" y1="110" x2="53" y2="257"/><line x1="170" y1="110" x2="76" y2="155"/>
<line x1="264" y1="155" x2="287" y2="257"/><line x1="264" y1="155" x2="222" y2="338"/><line x1="264" y1="155" x2="118" y2="338"/><line x1="264" y1="155" x2="53" y2="257"/><line x1="264" y1="155" x2="76" y2="155"/>
<line x1="287" y1="257" x2="222" y2="338"/><line x1="287" y1="257" x2="118" y2="338"/><line x1="287" y1="257" x2="53" y2="257"/><line x1="287" y1="257" x2="76" y2="155"/>
<line x1="222" y1="338" x2="118" y2="338"/><line x1="222" y1="338" x2="53" y2="257"/><line x1="222" y1="338" x2="76" y2="155"/>
<line x1="118" y1="338" x2="53" y2="257"/><line x1="118" y1="338" x2="76" y2="155"/>
<line x1="53" y1="257" x2="76" y2="155"/>
</g>
<g stroke-width="2" fill="none">
<g stroke="#0F6E56"><line x1="510" y1="110" x2="604" y2="155"/><line x1="604" y1="155" x2="562" y2="338"/><line x1="562" y1="338" x2="510" y2="110"/></g>
<g stroke="#BA7517"><line x1="604" y1="155" x2="627" y2="257"/><line x1="627" y1="257" x2="458" y2="338"/><line x1="458" y1="338" x2="604" y2="155"/></g>
<g stroke="#A32D2D"><line x1="627" y1="257" x2="562" y2="338"/><line x1="562" y1="338" x2="393" y2="257"/><line x1="393" y1="257" x2="627" y2="257"/></g>
<g stroke="#2B5797"><line x1="562" y1="338" x2="458" y2="338"/><line x1="458" y1="338" x2="416" y2="155"/><line x1="416" y1="155" x2="562" y2="338"/></g>
<g stroke="#6B4A9E"><line x1="458" y1="338" x2="393" y2="257"/><line x1="393" y1="257" x2="510" y2="110"/><line x1="510" y1="110" x2="458" y2="338"/></g>
<g stroke="#1D9E75"><line x1="393" y1="257" x2="416" y2="155"/><line x1="416" y1="155" x2="604" y2="155"/><line x1="604" y1="155" x2="393" y2="257"/></g>
<g stroke="#D85A30"><line x1="416" y1="155" x2="510" y2="110"/><line x1="510" y1="110" x2="627" y2="257"/><line x1="627" y1="257" x2="416" y2="155"/></g>
</g>
<g font-family="sans-serif" font-size="12">
<circle cx="170" cy="110" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="170" y="114" text-anchor="middle" fill="#2C2C2A">1</text>
<circle cx="264" cy="155" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="264" y="159" text-anchor="middle" fill="#2C2C2A">2</text>
<circle cx="287" cy="257" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="287" y="261" text-anchor="middle" fill="#2C2C2A">3</text>
<circle cx="222" cy="338" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="222" y="342" text-anchor="middle" fill="#2C2C2A">4</text>
<circle cx="118" cy="338" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="118" y="342" text-anchor="middle" fill="#2C2C2A">5</text>
<circle cx="53" cy="257" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="53" y="261" text-anchor="middle" fill="#2C2C2A">6</text>
<circle cx="76" cy="155" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="76" y="159" text-anchor="middle" fill="#2C2C2A">7</text>
<circle cx="510" cy="110" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="510" y="114" text-anchor="middle" fill="#2C2C2A">1</text>
<circle cx="604" cy="155" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="604" y="159" text-anchor="middle" fill="#2C2C2A">2</text>
<circle cx="627" cy="257" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="627" y="261" text-anchor="middle" fill="#2C2C2A">3</text>
<circle cx="562" cy="338" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="562" y="342" text-anchor="middle" fill="#2C2C2A">4</text>
<circle cx="458" cy="338" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="458" y="342" text-anchor="middle" fill="#2C2C2A">5</text>
<circle cx="393" cy="257" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="393" y="261" text-anchor="middle" fill="#2C2C2A">6</text>
<circle cx="416" cy="155" r="13" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/><text x="416" y="159" text-anchor="middle" fill="#2C2C2A">7</text>
</g>
<text x="340" y="400" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">左右は同じ7人・同じ21本。右では21本が7色の三角形に過不足なく編み直される</text>
<text x="340" y="424" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">どのペアもちょうど1つの三角形に属し、どの人もちょうど3つの三角形に属す（ファノの掛け算則）</text>
<text x="340" y="456" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#2C2C2A">どちらの読みが現実のよく回るチームに近いかは、観測で決められる</text>
</svg>

八元数の読みが正しければ、よく機能する7人前後のチームはこう見えるはずだ：

- 調整は**三人組単位**で回る（21本のペアを全員が管理するのではなく）。
- どのペアにも「その二人の関係が帰属するホームの三人組」が**一つだけ**ある。
- 各メンバーは**ちょうど3つ**の三人組に属し、三人組同士は人を共有して重なり合う。
- 三人組の**中では**段取りの順序を気にしなくてよいが、三人組を**またぐ**調整は「誰経由で先に通すか」で結果が変わる。

この予測を直接調べた研究は**まだ存在しない**。ただし周辺の証拠は面白い方向を向いている。社会学では、三人組に埋め込まれたペアが裸のペアより強く安定なことが実証されている（Simmel の三人組論、Krackhardt の Simmelian ties）。軍事組織では、中国の三三制・レジスタンスの3人細胞など、独立な伝統が繰り返し**3人を設計単位**に選んできた。そしてチームが壊れるときの典型は「**重ならない2つの塊**への分裂」（faultline 研究）——重なり合う三人組の網とは正反対の構造だ。既存のネットワーク分析手法で検証できるところまで、問いは具体化された。

<details>
<summary><strong>周辺証拠と「合格ライン」の詳細</strong>（2026-07-03 更新 — 検証の裏付けに興味がある人向け）</summary>

さらに調べを進めると（2026-07-03 追記）、周辺の証拠が三方向から揃ってきた。**第一に**、研究者276人の組織で「部門をまたぐつながり」が成果を生むのは、そのつながりが**三人組に埋め込まれているときだけ**だった——ペアそのものではなく、三人組が仕事の単位だという直接の手がかり。**第二に**、チームを本当に壊すのは「仲間意識で**ちょうど2つ**に割れる」ことで、小さい単位がたくさんあること自体は悪くない——害は分裂の形にあり、重なり合う小細胞はむしろ味方。**第三に**、センサーバッジでチームの会話を実測した研究では、よく回るチームほど**特定のハブを経由せず、全員がほぼ均等に**直接つながっていた——「どの人も同格」というファノの絵と同じ方向だ。

ただし、**合格ラインも上がった**。ネットワーク科学には手厳しい事実がある：**三角形の数は、つながりの密度からほぼ自動的に決まってしまう**（実測ネットワークの三つ組の分布は、密度だけで9割方説明できる）。つまり「よいチームには三角形が多い」を見つけただけでは、「よいチームは仲が良い（密度が高い）」と区別がつかない。夜空にたとえるなら——**星の多い空では三角形はいくらでも見つかる。星座を主張したいなら、偶然できる分より多く、しかも決まった形で並んでいることを示さなければならない**。八元数の読みが生き残る観測はただ一つ：密度から予想される以上に三人組へ編まれ、かつ**どのペアにも「ホームの三人組」がただ一つ**定まっていること。ここまで検証の的は絞られた。

</details>

## 8. 意識の側の橋 — 二軸が直交するなら複素平面

ここで、体験A——私の体を流れる二つの信号——の側に戻る。**物質軸と精神軸が直交する**なら、意識には**複素数の世界**が数学的に馴染む。

- 直交する2本の実軸＝**複素平面**。虚単位 `i` は「**物質を精神へ回す90度回転**」。
- 一つの意識の状態 ＝ `z = 物質 + i·精神`。**大きさ `|z|`＝意識の強度**、**位相（角度）＝物質と精神のバランス**。
- これは虚方向1本＝`p=1`＝**複素数 ℂ ＝「一つの意識」**。可換・結合・割れる＝**調和的**。ただし虚1本なので第三者が生まれず、**単独では創発がない**。

### 中心的緊張（要検証・最重要）

既存の **CN-009**（切り口と相補的射影）は、物質的/精神的な2つの切り口を「**直交軸ではなく相補的射影（非可換な観測量に近い）**」とし四象限を棄却している。本仮説の前提①「物質⊥精神→ℂ」と正面から緊張する。

- 2軸が**直交**なら → 個の意識は **ℂ**（可換）。
- 2軸が**非可換な相補**なら → 個の意識は既に **ℍ 寄り**（非可換）。

「直交(ℂ) か 非可換相補(ℍ的) か」の裁定が、個の意識モデルの形を決める。dual-aspect / Pauli–Jung 予想（心物中立的実在からの相補的分岐）とも接続する。**急いで解かない保持論点**。

→ この節の主張を感情心理学の実証に照らして検査した結果（何が支持され何が空振りだったか）は §10 に畳んで置いた。

---

## 9. 帰結 — 二つの体験が一本につながる

私は無意識に、**「大きくしたい（物質）」と「一つのまとまりでいたい（精神）」を、両方いっぺんに最大にしようとしていた**。数学の答えはこうだ——**この二つを、どちらも譲らずに欲張ると、きれいに成り立つ形は 3 と 7 しか残らない**。体の二軸信号と、チームの数字は、同じ一つの構造の、二つの現れ方だった。

整理すると、三つの壁を重ねたとき「者」の数 p に許されるのは **p ∈ {0,1,3,7}** のみ。

- **p=0（実数）**：関係が存在しない。
- **p=1（複素数）**：可換で第三者が生まれず、三つ組が作れない＝**一つの意識**。
- **p=2,4,5,6**：可除代数が存在せず、零因子で崩れる。
- **p=3（四元数）**：成立。可換性を代償に、二人が第三に着地して閉じる**最小の集団**。
- **p=7（八元数）**：成立。結合性を代償に、意味が保存される**最大の集団**。
- **p≥8**：割り算が死ぬ（零因子）。

**個の意識は複素数 ℂ の形、組織はその上の四元数（3）と八元数（7）の形**。物質⊥精神という一つの平面が、他者と関わって虚方向を増やしていくと、**閉じたまま到達できるのは 3 と 7 だけ**。個と組織は**同一の可除代数の梯子の、solo の段（ℂ）と collective の段（ℍ・𝕆）**。

### 仮説（前提と定理を分離）

> **可除代数‑意識/組織仮説**：意識のゲートに上る信号が **物質⊥精神の二軸**であるなら、個の意識は **複素数 ℂ** の形をとる。その意識が他者と関わり創発するとき、系は虚方向を増やすが、「関係が閉じて割れる（解決する）」ことを保つ限り、非自明に成立する集団は **3（四元数）と 7（八元数）のみ**。ゆえに個（ℂ）と組織（ℍ/𝕆）は同一の可除代数の梯子の別の段であり、**組織設計とは、個の複素的意識を、閉じたまま多体へ拡張する操作**である。

- **前提（解釈の賭け）**：物質⊥精神 ／ 意識＝複素数 ／ 価値＝関係の閉じ。
- **定理（硬い部分）**：Frobenius・Hurwitz・Bott–Milnor–Kervaire・Adams（Hopf不変量1）・外積の定理・ハゲ球（平行化）・Fano=Steiner S(2,3,7)。

この仮説がその後の検証でどうなったか——何が支持され、何が棄却されたか——は §6 と §10 に正直に記した。検証一巡を受けた**改訂版（仮説 v2・仮）**は §10 の末尾にある。

### repo 分担

- **as（awareness-space）**：ℂ ＝ 物質⊥精神の平面。意識モデル側（強度と位相）。
- **pd（project-design）**：ℍ・𝕆 ＝ 3人細胞・7人上限の組織論側。本件主管。
- **cs（creation-space）**：30領域調査を参照素材として利用（義務は負わない）。

---

## 10. 検証の現在地 — 何が死に、何が残ったか（2026-07-03 更新）

この仮説は検証プログラムとして走っている。進むたびに、この節を**うまくいかなかった部分も含めて**更新する。

### どこまでが数学か

主張を三層に分けて検査した。**定理**（証明がある部分：数の梯子が 1,2,4,8 で止まること、ファノ平面の性質）は硬い。**対応の賭け**（人＝虚方向、価値＝割り算、という現実への写像）はまだ賭けのまま。そして数学の構造が現実側で仕事をしていない対応は**数秘**——「数が合う」だけの装飾——に転落する。この検査基準を先に立てた。

<details>
<summary><strong>詳細 — 意識＝複素平面の検証: 平面は当たり、掛け算は空振り</strong>（§8 の橋を検証した記録。仮説検証の中身に興味がある人向け）</summary>


§7 の「個の意識＝複素平面」を、感情心理学の実証に照らして検査した（詳細は RR-004）。ここでも読み方に段差をつける。死んだ・残ったが一枚岩ではないからだ。

| 読み方 | 主張 | 状態 |
|---|---|---|
| 平面の読み（極座標） | 意識の状態は2軸平面上の**点**。中心からの距離＝強度、角度＝状態の種類 | **強く支持**（感情心理学の定番モデルと同じ絵） |
| 体の読み（複素数 ℂ） | その平面では**掛け算・割り算**まで働く（`i²=−1`、回転伸縮、除法） | **空振り**（掛け算に対応する現象が見つからない） |
| 軸の読み（物質⊥精神） | 平面を張る2軸は「物質」と「精神」で、**直交**する | **未接地**＋直交そのものが揺らぐ（下記） |

**当たった部分——平面と極座標。** 感情心理学には circumplex（円環）モデルという40年物の定番がある（Russell 1980）。無数の感情語を統計的に並べると、2次元平面上の**円環**に整列する。標準的な読み方は極座標で、**角度が感情の種類**（喜び・恐れ・安らぎ…が円周上に並ぶ）、**中心からの距離が強度**（中心＝中立、周縁ほど強い）。これは §7 の「`|z|`=意識の強度、位相=バランス」と**同じ絵**だ。素朴体験Aの「二軸の平面」という直観は、心理学の主流モデルに合流する。

**空振りだった部分——ℂ の掛け算。** ただし、複素数が複素数である理由は平面ではなく**掛け算**にある（§2 で見たとおり、`i` の正体は回転で、数の梯子を駆動するのは「掛けて割れる」性質だ）。ところが感情科学は、感情の混合や変化を**足し算**（線形結合・平均）で書いている。掛け算——位相の加算・強度の乗算という回転伸縮、`i` 倍＝「物質を精神へ回す90度」、割り算＝関係の解消——が仕事をしている場面は、調べた範囲で**一つも見つからなかった**。

たとえるなら、**関数電卓を買って、足し算しか押していない**。盤面（平面）は確かに合っている。だが ℂ 特有の機能ボタンはまだ一度も押されていない。押される場面が実証されたときだけ「意識＝ℂ」は装飾でなくなる——これを反証条件 **F5** として先に明文化した（感情の合成が足し算で尽きるなら、ℂ という看板は外して「平面＋極座標」に格下げする）。

**続報（2026-07-03）——F5 は発動が確定した。** 感情の混ざり方（足し算）だけでなく、**時間の中での動き方**を扱う標準モデルも調べた。そこにあったのは「基準点にばねで引き戻される点＋ゆらぎ」という、やはり**足し算の世界**だった。回転伸縮も、90度回す `i` も、割り算も、感情科学の語彙には登場しない。だから約束どおり正直に格下げする：**感情の平面は「複素数の平面」ではなく「平面＋極座標」だ**。——ところが、話はそこで終わらなかった。**電卓の掛け算ボタンが押されている部屋が、別に見つかった**のだ。感情の平面ではなく、**判断のゆらぎを扱う部屋**——さっきの「質問の順番」と同じ場所。人の判断の確率は、古典的な確率の足し算ルールを系統的に破り、そのズレは複素数の**位相**（角度の差）が作る「干渉」でぴったり記述される。複素数が心理学で本当に給料をもらっている職場は、感情の平面ではなく、この確率の層だった。仮説をそちらへ引っ越しさせるかどうかは、理論の設計者の判断として保留にしてある。

**軸の読みで起きた、予想外の展開。** 心理学の平面を張る2軸は「快-不快 × 覚醒-沈静」であって「物質 × 精神」**ではない**。物質/精神の軸をこの平面に写せるかは、実証の裏づけがない追加の賭けとして残った。さらに面白いのは直交性そのものだ。大規模データ（Kuppens らの8データセット）では、2軸のあいだに**弱いV字の依存**があり、その形が**人と文化で変わる**——つまり「固定された直交」は厳密には成り立たない。これは §8 の保持論点「直交(ℂ)か、非可換相補(ℍ的)か」への裁定材料だが、答えは**どちらでもなかった**：軸の関係は固定されておらず、文脈で動く。二者択一だった問いが「**そもそも一つの固定した代数に意識を同定してよいのか**」というより深い問いに開き直された。

**続報（2026-07-03）——二者択一は、見かけの対立だった。** その「より深い問い」に、決着の形が見つかった。鍵は、**「地図そのもの」と「地図の測り方」を分ける**こと。心理学には頑丈な実験事実がある：アンケートで二つの質問を尋ねる**順番**を入れ替えると、答えの分布が変わる——そして全国調査70件で、その変わり方が「順序の効く測定」の理論（量子論の測定規則）が予測する等式に従っていた。靴下と靴は履く順番で結果が変わる。それと同じで、**「測り方」どうしには順序が効く（交換できない）ものがある**。でもそれは、測られている**状態の平面そのものが壊れることを意味しない**——地図は同じままで、上にかざす二枚の色眼鏡の重ね順が効いているだけだ。つまり「切り口は順序の効く相補だ」という読みと「意識の状態は平面上の点だ」という circumplex は、**別のレイヤーの話であって、両立する**。§8 の対立は、状態と測り方の取り違えから生まれた見かけの対立だった。梯子を掛け替える必要はなかった。残る宿題はひとつ：「物質」と「精神」という**この特定の二つ**の測り方で本当に順序が効くかを、質問の順番を入れ替えて確かめる実験だ。効けば「順序の効く相補」が実証され、効かなければ「固定直交」が復活する——**どちらに転んでも仮説は前に進む**。

</details>

### 現在のスコアボード

| 主張 | 状態 |
|---|---|
| 数の梯子は 1,2,4,8 で止まる／3と7だけが閉じる | **定理**（確定） |
| 「3と7の人数しか成立しない」 | **棄却**（5,6人チームは存在し機能する） |
| 「8人目で急に重くなる」＝零因子 | 実証なし（崖は見つからず、逓減は滑らか） |
| 「3と7を**選べば**、閉じたまま拡張できる」 | **設計原理として存続**（本仮説の現在の形） |
| 7人組織＝重なり合う7つの三人組 | **未検証・検証可能**（上図。周辺証拠は生存側に厚く、合格ラインは「密度を超える編み込み＋ホーム三人組の一意性」に確定） |
| 意識の状態＝平面上の点（距離=強度・角度=種類） | **強く支持**（circumplex と同じ絵） |
| 個の意識＝複素数 ℂ（掛け算まで働く） | **棄却（平面読み・F5 発動確定）**（合成も時間変化も足し算の世界。複素数の位相が働く場所は「判断の確率」の層に実在し、そこへの引っ越しは保留論点） |
| その平面の2軸＝物質⊥精神 | **読み直しへ**（心理学の軸は快-不快×覚醒で未接地。「固定した直交軸」でなく「順序が効きうる二つの測り方」として両立の形が確定。特定の対での順序実験が宿題） |
| 「直交(ℂ)か非可換相補(ℍ)か」の対立 | **解消**（状態と測り方の取り違えによる見かけの対立。地図と色眼鏡は別レイヤー） |
| 「解決できない組み合わせ」＝零因子 | **測れる形の定義候補が立った**（どちらも単独では健全なのに、組むと「こじれの吸い込み状態」に入って戻れない対。夫婦研究・紛争研究の道具で、結果を見ずに判定できる形にした） |

### 仮説 v2 — 検証一巡を受けた書き直し（**仮**・レビュー待ち 2026-07-03）

外れた部分を切り、生き残った部分を締め直して、仮説を書き直した。まだ「仮」——設計者が読んで、直すための版だ。

> **仮説 v2**
> 1. **意識の状態は平面上の点**。中心からの距離が強さ、角度が状態の種類（ここは心理学の定番と合流し、強く支持されている）。
> 2. その平面を「物質」「精神」と測る**測り方は、順序が効きうる相補的な切り口**（靴下と靴）。固定した直交軸はもう仮定しない。順序が本当に効くかは、質問の順番を入れ替える実験で決められる。
> 3. **複素数の掛け算が働く場所は、感情の平面ではなく「判断のゆらぎ（確率）」の層**。「意識＝ℂ」はこの層の主張として引っ越す——人の判断が古典的な確率の足し算則を破り、位相の干渉でぴったり記述される、あの場所だ。
> 4. **価値＝閉じ**は後づけを禁じる。「どちらも単独では健全なのに、組むと吸い込み状態に入り、解体以外に出口がない」対（解決不能アトラクタ対）を**先に**定義しておき、それを零因子の対応物として使う。
> 5. **組織側は変わらない**: 3と7は「選べば構造だけで閉じる」設計原理。7人＝重なり合う7つの三人組という予測が主戦場（合格ライン付き）。

v1 から変わったのは2点——「平面が複素数」から「観測・判断の層が複素的」への引っ越しと、「閉じ」の測り方の事前固定。変わらないのは、数学の定理（無傷）と、出発点の二つの体験（無傷）だ。

仮説は縮んだのではない。**「何でも説明する物語」から「外れうる予測を持つ仮説」に変わった**。ここからが本番だ。

---

## 11. よくある誤解

<details>
<summary><strong>「3人か7人でないと、チームは失敗するってこと？」</strong></summary>

**誤解**: この読み物は「チームは3人か7人でなければ成立しない」という法則を主張している。

**なぜ違うか**: その読み方（強い読み）は、実際のチーム研究に照らして**すでに棄却済み**（§6）。5人や6人のチームは普通に存在し、普通に機能する。

**正しい捉え方**: 残っている主張は**設計原理**——「3と7を**選べば**、余分な調整コスト（モルタル）なしに、構造だけで閉じたまま拡張できる」。5人チームはモルタルで立っているアーチであって、崩れてはいない（§6 アーチとモルタル）。
</details>

<details>
<summary><strong>「それって Miller の 7±2 の話でしょ？」</strong></summary>

**誤解**: 「7が上限」の根拠は、有名な「マジカルナンバー 7±2」だ。

**なぜ違うか**: Miller の 7±2 は**短期記憶に保持できる項目数**の話で、チーム人数の主張ではない。転用は範疇の飛び越しであり、Miller 自身が論文の末尾で「7 の頻出は偶然かもしれない」と数秘への警戒を書いている（その後の研究では作業記憶の実容量は 4±1 に改訂されてもいる）。

**正しい捉え方**: この読み物の「7」は記憶容量からではなく、**掛けて割れる数の世界が 8 次元（虚方向 7 本）で終わる**という数学の分類定理から来ている。だからこそ「記憶の限界なら道具で動くはず、構造の限界なら動かないはず」という**区別可能な予測**が立つ（§6）。
</details>

<details>
<summary><strong>「数字が合うだけの数秘術では？」</strong></summary>

**誤解**: 「体感の3と7」と「数学の3と7」が一致した、というだけの後づけのこじつけだ。

**なぜ違うか**: その危険は、この仮説自身が**検査基準として先に立てている**。数学の構造（掛け算・割り算・編み方）が現実の側で仕事をしていない対応は「装飾＝数秘」と判定するルールを最初に決め、反証条件を5つ明文化した。そして実際に、そのうち2つは**発動して仮説の一部を殺した**（「3と7しかない」の棄却、「感情の平面＝複素数」の棄却。§6・§10）。

**正しい捉え方**: 数秘術との違いは「外れうる形にしてあるか」。この仮説は外れうる形にしてあり、実際に外れた部分を公開している。生き残っている部分（7人＝重なり合う三人組）も、外れうる観測（合格ライン付き）にまで絞り込んである。
</details>

<details>
<summary><strong>「虚数は実在しない数なんだから、全部ただの比喩でしょ？」</strong></summary>

**誤解**: 虚数 i は「実在しない数」と教わった。それを人間に当てはめる話は、はじめから比喩にすぎない。

**なぜ違うか**: i の正体は「90度回す」という**回転の道具**で、ゲームがキャラクターを回す四元数として今日も実用されている（§2）。「実在するか」ではなく「**構造が仕事をするか**」が問題で、回転の道具としての虚数は文句なしに仕事をしている。

**正しい捉え方**: この読み物が検証しているのは「掛けて割れるという構造が、人間の関係の側でも仕事をするか」。仕事をする場所（3人の輪・三人組の網）と、しない場所（感情の平面の掛け算）を、実証で選り分けている——比喩で終わらせないための検証プログラムが §6 と §10 だ。
</details>

---

## 参照

- epic Issue: pd#115（本仮説の検証プログラム）／ 検証の詳細: RR-002（同型性の厳密化・判定枠）, RR-003（チームサイズ実証地形・2問裁定）, RR-004（意識＝複素平面・circumplex 検証）, RR-005（三つ組予測の隣接文献と検証プロトコル v2）, RR-006（直交 vs 非可換相補の解消・順序効果）, RR-007（感情の掛け算・F5 裁定）, RR-008（零因子の事前定義）
- 概念ノート: CN-010（可除代数‑意識/組織仮説）
- 関連: CN-009（切り口と相補的射影）, `research/awareness-model/`, 創造5段階(cs), 波と渦/縁(pd#107)
- 数学: J. Baez "The Octonions"; Conway & Smith "On Quaternions and Octonions"
- チーム研究: Wheelan (2009); Hackman & Vidmar (1970); Klimek, Hanel & Thurner (2009); Krackhardt の Simmelian tie 分析（書誌は RR-003 参照）
- 感情研究: Russell (1980) circumplex; Posner, Russell & Peterson (2005); Kuppens, Tuerlinckx, Russell & Barrett (2013); Barrett (2017) 構成主義的情動理論（書誌とアクセスレベルは RR-004 参照）
