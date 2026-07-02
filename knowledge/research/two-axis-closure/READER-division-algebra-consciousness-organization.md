---
title: 可除代数‑意識/組織仮説 — 読み物
issue: pd#115
concept: CN-010
status: draft
date: 2026-07-02
---

# 可除代数‑意識/組織仮説 — 読み物

> 二つの素朴体験から出発し、数の梯子（ℝ→ℂ→ℍ→𝕆）をたどって、「なぜ 3 と 7 だけが特別なのか」を、定理・現実のたとえ・人間関係の三層で通す読み物。前提（解釈の賭け）と定理（硬い部分）は分けて記す。検証が進むたびに §9「検証の現在地」を更新する——**うまくいかなかった部分も含めて**。図は単体表示できる自己完結 SVG。

---

## 0. 二つの素朴体験

- **体験A（信号）**：何かを作るとき、体の中に二種類の手ごたえが同時に流れる。**物質的**（量・広がり）と**精神的**（まとまり・意味）。
- **体験B（人数）**：チームは **3 がベスト、7 が上限**。8 で急に重くなる。理屈より先に、そう感じていた。

## 1. 問い

この二つはまるで別の話に見える。でも——**同じ「形」が下に隠れているのではないか**。片方（数学でわかるチーム人数）から、もう片方（意識の仕組み）が見えるのではないか。これが全体の問い。

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

## 2. 数の梯子と回転 — 四元数まで

数には「回れる」段階がある。

- **1次元（実数 ℝ）**：できるのは「＋か−」だけ。スイッチのように、ひっくり返るだけ。真の回転はない。
- **2次元（複素数 ℂ）**：時計の針のように**なめらかに回れる**。虚数 `i` の正体は「90度回転」。2回で180度＝真後ろ＝`−1`（だから `i² = −1`）。
- **3次元を回す（四元数 ℍ）**：立体をなめらかに回すには数を4つ束ねる。それが `i, j, k`。ゲームがキャラクターを回すのに今も使う本物の道具。

四元数の心臓部は、たった一つの掛け算の規則：

```
i·j = k,   j·k = i,   k·i = j
```

「**二つが出会うと、ちょうど"次の一人"に着地する**」。ぐるっと**輪になって閉じる**。そして `i·j = k` だが `j·i = −k`（逆回りはマイナス）＝**向きを持った輪**。順序が効く。

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

**2人**は矢印が押し合うだけで、決着が落ちる先がない＝**開いたまま**。3人目が入って初めて輪が閉じる。だから「閉じる最小の単位」が **3**。

---

## 3. 7 を点と線で — ファノ平面と八元数

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

数え上げで確かめられる事実（比喩ではない）：

- 各線は3点、各点は3本の線上、**どの2点もちょうど1本の線を共有**、どの2線も1点で交わる。
- **掛け算**：異なる2単位を通る唯一の線の第三点が積（符号は向き）。同じ単位は `eᵢ² = −1`。
- **非結合性も点と線で**：同一線上の3点は結合するが、**線に乗らない3点は結合しない**。四元数（3）は常に結合、八元数（7）は「線に乗らない三人組」で結合が破れる。これが 3 と 7 の質的な差。

**7 ＝ この三角形（三つ組）を7枚、すきまなく編み込んだ織物**。3はそれが1枚、7は7枚で織り上がる最大。

---

## 4. もう一つの説明 — コストの法則（対抗馬）

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

つまりここまでで説明は**二つ**ある。前章までの**可除代数**（3 と 7 だけが構造的に特別）と、この章の**コストの法則**（どの人数も特別ではなく、コストが滑らかに増えるだけ）。面白いことに、**3人ではこの二つは同じ答えを出す**（ペア数 3 ＝ 四元数の虚単位 3）。分かれるのは **7** だ——その話は §9 で。

---

## 5. 3 と 7 以外で何が壊れるか

「者」の数 p ＝虚方向の数、全体次元 d = p+1。**閉じて割れる関係構造**を持てるのは d ∈ {1,2,4,8}、すなわち p ∈ {0,1,3,7} のみ。

| 者 p / 次元 d | 数の世界 | 乗除のルール | 何が壊れるか（支配定理） |
|---|---|---|---|
| 0 / 1 | 実数 ℝ | 可換・結合・割れる・順序あり | 虚方向ゼロ＝関係が無い |
| 1 / 2 | 複素数 ℂ | 可換・結合・割れる | 可換で向きが消え第三者が作れない |
| **2 / 3** | **存在しない** | — | 3次元の可除代数は無い。**零因子必発**（Frobenius / Bott–Milnor–Kervaire） |
| **3 / 4** | 四元数 ℍ ✓ | 非可換・結合・割れる | 代償＝可換性を失う。3D外積で三つ組が閉じる |
| **4,5,6 / 5,6,7** | **存在しない** | — | 可除代数なし。**必ず零因子** |
| **7 / 8** | 八元数 𝕆 ✓ | 非可換・非結合（交代）・割れる・ノルム保存 | 代償＝結合性を失う。7D外積が閉じる最後 |
| 15 / 16 | 十六元数 𝕊 | 非可換・非結合・非交代・**割れない** | ノルム保存が崩れ**零因子出現**。掛けられるが割れない |

**壊れ方の核心＝零因子**（`a≠0, b≠0` なのに `a·b=0`）：二つの非ゼロが結合して**消える**＝割り算＝解決ができない。降りていく代償の梯子（Cayley–Dickson）：`ℝ(順序)→ℂ(順序を失う)→ℍ(可換性を失う)→𝕆(結合性を失う)→𝕊(交代性と割り算を失う)`。

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

## 6. 組織の役割 — リーダーは要るか

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

## 7. 意識＝複素平面（二軸が直交するなら）

ここで個の側へ。**物質軸と精神軸が直交する**なら、意識には**複素数の世界**が数学的に馴染む。

- 直交する2本の実軸＝**複素平面**。虚単位 `i` は「**物質を精神へ回す90度回転**」。
- 一つの意識の状態 ＝ `z = 物質 + i·精神`。**大きさ `|z|`＝意識の強度**、**位相（角度）＝物質と精神のバランス**。
- これは虚方向1本＝`p=1`＝**複素数 ℂ ＝「一つの意識」**。可換・結合・割れる＝**調和的**。ただし虚1本なので第三者が生まれず、**単独では創発がない**。

### 中心的緊張（要検証・最重要）

既存の **CN-009**（切り口と相補的射影）は、物質的/精神的な2つの切り口を「**直交軸ではなく相補的射影（非可換な観測量に近い）**」とし四象限を棄却している。本仮説の前提①「物質⊥精神→ℂ」と正面から緊張する。

- 2軸が**直交**なら → 個の意識は **ℂ**（可換）。
- 2軸が**非可換な相補**なら → 個の意識は既に **ℍ 寄り**（非可換）。

「直交(ℂ) か 非可換相補(ℍ的) か」の裁定が、個の意識モデルの形を決める。dual-aspect / Pauli–Jung 予想（心物中立的実在からの相補的分岐）とも接続する。**急いで解かない保持論点**。

---

## 8. 帰結と仮説

三つの壁を重ねると、「者」の数 p に許されるのは **p ∈ {0,1,3,7}** のみ。

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

この仮説がその後の検証でどうなったか——何が支持され、何が棄却されたか——は次の §9 に正直に記す。

### repo 分担

- **as（awareness-space）**：ℂ ＝ 物質⊥精神の平面。意識モデル側（強度と位相）。
- **pd（project-design）**：ℍ・𝕆 ＝ 3人細胞・7人上限の組織論側。本件主管。
- **cs（creation-space）**：30領域調査を参照素材として利用（義務は負わない）。

---

## 9. 検証の現在地 — 何が死に、何が残ったか（2026-07-02 更新）

この仮説は検証プログラムとして走っている。進むたびに、この節を**うまくいかなかった部分も含めて**更新する。

### 先に、誤解しないための段差

この節には「棄却」という言葉が出てくるが、**数学が死んだのではない**。この仮説は強さの違う三つの読み方の積み重ねで、死んだのは一番上の一枚だけだ。

| 読み方 | 主張 | 状態 |
|---|---|---|
| 数学（定理） | 掛けて割れる数の体系は次元 1,2,4,8 のみ。虚方向が閉じるのは 3 と 7 だけ | **無傷**（証明がある） |
| 強い読み（自然法則） | だから現実でも 4,5,6 人のチームは構造的に成立**しない** | **棄却**（下記） |
| 弱い読み（設計原理） | 3 と 7 を**選べば**、関係が閉じたまま拡張できる | **存続**（現在の形） |

そして出発点の素朴体験は、むしろ実証に支持されている。「3がベスト」は 3–4人 > 5–6人 のデータと合い、「7が上限」は上限帯 7–9 として残る。外れたのは「8で**急に**重くなる」の「急に」だけだ。

### どこまでが数学か

主張を三層に分けて検査した。**定理**（証明がある部分：数の梯子が 1,2,4,8 で止まること、ファノ平面の性質）は硬い。**対応の賭け**（人＝虚方向、価値＝割り算、という現実への写像）はまだ賭けのまま。そして数学の構造が現実側で仕事をしていない対応は**数秘**——「数が合う」だけの装飾——に転落する。この検査基準を先に立てた。

### 死んだ部分 — 「3と7しかない」という法則

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

### 残った部分 — むしろ鋭くなった予測

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

### 現在のスコアボード

| 主張 | 状態 |
|---|---|
| 数の梯子は 1,2,4,8 で止まる／3と7だけが閉じる | **定理**（確定） |
| 「3と7の人数しか成立しない」 | **棄却**（5,6人チームは存在し機能する） |
| 「8人目で急に重くなる」＝零因子 | 実証なし（崖は見つからず、逓減は滑らか） |
| 「3と7を**選べば**、閉じたまま拡張できる」 | **設計原理として存続**（本仮説の現在の形） |
| 7人組織＝重なり合う7つの三人組 | **未検証・検証可能**（上図。次の主戦場） |
| 個の意識＝複素平面（物質⊥精神） | 未裁定（CN-009 の「直交か相補か」の緊張が続く。§7） |

仮説は縮んだのではない。**「何でも説明する物語」から「外れうる予測を持つ仮説」に変わった**。ここからが本番だ。

---

## 参照

- epic Issue: pd#115（本仮説の検証プログラム）／ 検証の詳細: RR-002（同型性の厳密化・判定枠）, RR-003（チームサイズ実証地形・2問裁定）
- 概念ノート: CN-010（可除代数‑意識/組織仮説）
- 関連: CN-009（切り口と相補的射影）, `research/awareness-model/`, 創造5段階(cs), 波と渦/縁(pd#107)
- 数学: J. Baez "The Octonions"; Conway & Smith "On Quaternions and Octonions"
- チーム研究: Wheelan (2009); Hackman & Vidmar (1970); Klimek, Hanel & Thurner (2009); Krackhardt の Simmelian tie 分析（書誌は RR-003 参照）
