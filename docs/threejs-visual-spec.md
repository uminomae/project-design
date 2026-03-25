# Three.js 背景シェーダー仕様書

Project Design サイトの背景ビジュアル（`src/shaders/`）を Three.js で実装するための仕様。
HTML コンテンツは既存の `index.html` に実装済み。本仕様はシェーダー部分のみを対象とする。

---

## 1. 技術制約

| 項目 | 値 |
|------|----|
| Three.js | ES Module, `import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js'` ⚠️ 下記注記参照 |
| マウント先 | `document.getElementById('webgl-container')` |
| canvas 配置 | `position: fixed; z-index: 0`（CSS 側で設定済み） |
| renderer | `alpha: true`（コンテンツが上に重なるため） |
| ファイル形式 | 単一 HTML（CSS・JS インライン）。シェーダー試作は `src/shaders/` に保存 |
| 公開先 | GitHub Pages |
| 依存 | vanilla JS のみ。フレームワーク不使用 |
| エクスポート | `export function cleanup()` を公開（dispose 用） |
| window resize | 対応必須 |

> **⚠️ バージョン矛盾の注記**: 元プロンプトでは前半で「Three.js r128（cdnjs）」、後半の制約で「three@0.170.0（jsdelivr ES Module）」と指定が割れている。**0.170.0 を採用**とし、r128 固有の記述（CapsuleGeometry 非対応等）は無視する。pjdhiro の判断待ち。

---

## 2. パフォーマンス目標（負荷設計ファースト）

「軽くて速い」ではなく **「重くて美しい」** が正解。

| 環境 | FPS 目標 | GPU 使用率 |
|------|---------|-----------|
| デスクトップ | 55–60 fps | 70–85% |
| モバイル | 30 fps 以上 | 粒子数を半減するフォールバック |

### 前回の問題

v2/v3 は GPU 負荷が軽すぎ、4,200 個の単一パーティクルでは白背景に薄い点が散らばるだけだった。視覚的な密度と迫力が不足。

---

## 3. 視覚リファレンス

トーン: **静謐・抽象的**。色味ベース `#8b8fa3`（mute gray-blue）。

好みの Shadertoy 作品:

- https://www.shadertoy.com/view/4ttGDH
- https://www.shadertoy.com/view/MdKXzc
- https://www.shadertoy.com/view/3sXyRN
- https://www.shadertoy.com/view/WcKXDV
- https://www.shadertoy.com/view/Nf23z3
- https://www.shadertoy.com/view/7fj3W1

---

## 4. 描画システム

### 4-A. 背景フルスクリーンシェーダー（PlaneGeometry）

画面全体を覆う平面に独自 fragment shader を適用する。

- **fbm noise: 5 オクターブ**（3 ではなく 5。ループ回数 = 計算コスト）
- スクロールで色と流体パターンが変容
- マウス位置で波紋が広がる（距離減衰つき）
- 質感: 「和紙の上にインクが滲む」イメージ
- モノトーン（グレー〜ブルーグレー）の流体がうっすら浮かぶ
- `uScroll` で濃淡・パターンが変容

### 4-B. パーティクルシステム（Points）

最低 **8,000 個**（理想 10,000–12,000）。3 種類の粒子を明確に分ける:

| 種類 | 割合 | サイズ | 特徴 |
|------|------|--------|------|
| Plasma | 40% | 20–40 px | 大きく明るい主要粒子 |
| Filament | 30% | — | 線状に伸びる。fragment shader で楕円描画 |
| Seed | 30% | 2–8 px | 微小で大量。背景のテクスチャ感 |

### 4-C. 疑似ブルーム（グローレイヤー）

2 つ目の Points を同じ位置に配置し、サイズ 1.5 倍・alpha 0.15・`AdditiveBlending` で重ねる。描画コールが 2 倍になり、適切に負荷が上がる。

### 4-D. FogExp2

```js
scene.fog = new THREE.FogExp2('#fafaf9', 0.06);
// 前回 0.07–0.08 は強すぎた
```

遠方の粒子が白に溶け、近い粒子ははっきり見える。

---

## 5. シェーダー仕様

### 5-A. Fragment Shader — 粒子タイプ別分岐

```glsl
// Plasma: 多層グロー
float glow = exp(-r * 3.0) * 0.6 + exp(-r * 8.0) * 0.4;

// Filament: 異方性（楕円）
vec2 stretch = vec2(pt.x * 3.0, pt.y);
float filamentR = length(stretch);
float filamentGlow = exp(-filamentR * 4.0);

// Seed: シャープなドット
float seedGlow = smoothstep(0.5, 0.1, r);
```

前回は `exp(-r * 5.0)` 単一だった。粒子タイプ別に分岐させること。

### 5-B. Vertex Shader — fbm 5 オクターブ

```glsl
vec3 fbm(vec3 p) {
    vec3 f = vec3(0.0);
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {   // 3→5
        f += amp * (hash33(p) - 0.5);
        p *= 2.01;
        amp *= 0.5;
    }
    return f;
}
```

### 5-C. 各フェーズの数式

#### 真空ゆらぎ
fbm 5 オクターブ（上記）。

#### 波動方程式 — 3 波の重ね合わせ

```glsl
float wave = 0.0;
wave += cos(4.0 * r - 2.0 * uTime) * exp(-0.4 * r);             // 基本波
wave += 0.5 * cos(7.0 * r - 3.0 * uTime + 1.0) * exp(-0.6 * r); // 第2高調波
wave += 0.3 * sin(11.0 * r - 5.0 * uTime + 2.0) * exp(-0.8 * r); // 第3高調波
```

#### 量子もつれ — Bell 相関

```glsl
// 4方向の測定相関
float bell = cos(2.0 * (theta - uTime)) * aPolarity;
vec3 entangleAxis = vec3(cos(bell), sin(bell), cos(bell * 0.5));
```

#### トンネル効果 — 障壁内外の波動関数

```glsl
float barrier = smoothstep(1.0, 1.5, abs(pos.x));
float psiInside = sin(6.0 * pos.x - uTime * 3.0);   // 障壁内: 振動
float psiOutside = exp(-2.0 * abs(pos.x - 1.5));      // 障壁外: 指数減衰
float tunnel = mix(psiInside, psiOutside, barrier);
```

#### Hopf Fibration — S³→S² 射影

```glsl
float alpha = aRandom.x * 6.2832;
float beta  = aRandom.y * 3.1416;
float fiber = uTime * 0.3 + aRandom.z * 6.2832;

// Hopf map
float x = sin(beta) * cos(alpha + fiber);
float y = sin(beta) * sin(alpha + fiber);
float z = cos(beta);
float w = fiber;

// S² への射影（ステレオグラフィック）
vec3 hopfPos = vec3(
    2.0 * (x * z + y * w),
    2.0 * (y * z - x * w),
    x*x + y*y - z*z - w*w
) * 2.0;
```

---

## 6. スクロール連動（5 フェーズ）

各セクションに **`min-height: 100vh`** を設定し、十分なスクロール距離を確保すること。

| scroll % | フェーズ | 視覚 | 数式 |
|----------|---------|------|------|
| 0–15% | 真空ゆらぎ | 粒子が霧のように漂う。ほぼ静止 | fbm noise |
| 15–35% | 波動 | 中心から波紋。干渉縞 | cos(kr−ωt)·e^(−γr) 重ね合わせ |
| 35–55% | 量子もつれ＋トンネル | 暖色/冷色ペアが対称に躍動。一部が壁を抜ける | Bell 相関 + ψ=Ae^(−κx) |
| 55–80% | 渦（Spinor） | 螺旋が巻き上がる。回転が加速 | atan(y,x) 螺旋 + 3D 回転行列 |
| 80–100% | Hopf Fibration | トーラス状の束に収束。秩序と美 | S³→S² 射影 |

フェーズ間は **smoothstep** で滑らかに補間。

---

## 7. マウスインタラクション

- マウス位置で粒子場が擾乱される（「観測が系を変える」量子力学のメタファー）
- `aPolarity` で反位相に動く（暖色が右に逃げれば冷色は左に逃げる）
- 影響範囲: `exp(-distance * 0.5)` の減衰関数
- 背景シェーダーにもマウス位置を渡し、波紋を生成

---

## 8. カメラワーク

- **Quaternion slerp** でマウス追従を滑らかに（単純な position.x/y 代入ではなく）
- スクロールでカメラが **z=10 → z=1.5** まで潜る（前回 8→3.5 は浅い）
- near/far を調整して深度感を強調

---

## 9. 色彩設計

白背景（`#fafaf9`）に馴染むモノトーン基調。

| 名前 | HEX | 用途 |
|------|-----|------|
| mute gray-blue | `#8b8fa3` | ベースカラー |
| 背景 | `#fafaf9` | HTML 側で設定済み |

- 彩度を抑え、グレー〜ブルーグレーの濃淡で構成する
- 実装時に白背景との相性を見ながら微調整可
- **ブレンド**: `NormalBlending`。グローレイヤーのみ `AdditiveBlending`

---

## 10. 出力前チェックリスト

- [ ] パーティクル数が 8,000 以上ある
- [ ] 背景にフルスクリーン ShaderMaterial の平面がある
- [ ] fbm が 5 オクターブ（for ループ 5 回）
- [ ] fragment shader で粒子タイプ別の描画分岐がある
- [ ] 波動方程式が 2 つ以上の波の重ね合わせになっている
- [ ] Hopf Fibration が S³→S² の射影式を使っている
- [ ] グローレイヤー（2 つ目の Points）がある
- [ ] スクロール値を HTML 側から受け取るインターフェースがある
- [ ] `export function cleanup()` が公開されている
