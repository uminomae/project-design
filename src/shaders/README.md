# Background Shaders

## ファイル構成

| ファイル | 役割 |
|---------|------|
| `main-webgpu.js` | WebGPU 背景 1 |
| `main2-webgpu.js` | WebGPU 背景 2 |
| `main3-webgpu.js` | WebGPU 背景 3 |
| `main4-webgpu.js` | WebGPU 背景 4 |
| `webgpu-runtime.js` | WebGPU 背景の共通 runtime |
| `webgpu-background-core.js` | 背景1 の WGSL |
| `main.js` | 旧 WebGL 参照（比較用） |
| `src/app.js` | 背景エントリを読み込むアプリ起点 |

## 採用シェーダー

| ファイル | 元バージョン | アプローチ |
|---------|-------------|-----------|
| main-webgpu.js | WebGPU math port | `main.js` の数式を WGSL に移植した背景 |
| main2-webgpu.js | volumetric port | `main2.js` の volumetric density 系を WebGPU 化した背景 |
| main3-webgpu.js | divergence port | `main3.js` の divergence / fold / blur 系を WebGPU 化した背景 |
| main4-webgpu.js | lyapunov port | `main4.js` の chaos / order boundary 系を WebGPU 化した背景 |

## 方針

- WebGPU 版 4 本を `SHADER_PATHS` でランダム選択する
- `main.js` など旧 WebGL 背景は比較・参照用として保持する
- 比較が不要になった時点で legacy 背景を整理する

## Gemini 向け生成プロンプト

新しいシェーダーを Gemini に依頼する際は、以下のプロンプトを使用する。

```
あなたは世界トップレベルのWebGL / GLSL / Three.jsエンジニアです。
以下の【技術要件】と【不変のフレームワーク仕様】を厳格に守り、
【テーマとビジュアル仕様】に基づいた、最高品質の単一HTMLファイル（JSインライン）を作成してください。

【テーマとビジュアル仕様】
・メインテーマ: 【量子、神話、意識などのキーワードを入力】
・ビジュアルの参考/数式のアプローチ: 【ShadertoyのURLや、「〇〇フラクタル」などの数式名を入力】
・カラーパレット: 白背景に映える、【深い墨色、シアン、金】などのエレガントな色彩。

【技術要件】
・Three.js (ES Module, cdn.jsdelivr.netからimport)
・Vanilla JSのみ（ReactやVueなどのフレームワーク不使用）
・<div id="webgl-container"> にマウント
・Rendererは `alpha: true`, `antialias: true`
・画面全体を覆う `PlaneGeometry(2, 2)` と `OrthographicCamera` を使用した2Dシェーダー構成
・メモリ解放用の `export function cleanup()` を実装すること

【不変のフレームワーク仕様（必ず実装すること）】
1. 白背景への調和 (Alpha Blending):
背景は黒ではなく「白（あるいはWebサイトの背景色）」です。GLSL内でアルファ値（透過度）を計算し、構造や光が存在しない空間は `alpha = 0.0` にして背景を透かしてください。加算合成のような白飛びではなく、上品なアルファブレンドを目指してください。

2. スクロール連動とLerp補間:
windowのスクロール率（0.0 ~ 1.0）を取得し、JSの `requestAnimationFrame` 内で `currentScroll += (targetScroll - currentScroll) * 0.05` のように慣性（Lerp）をつけて `uniform float u_scroll` に渡してください。

3. 5フェーズの空間変容 (Phase Transitions):
GLSL内で `u_scroll` を元に、以下の5つのフェーズの重み（w1〜w5）を `smoothstep` で作成し、メインの座標系 `p` を連続的に変容させてください。
- w1 (0-15%): ほぼ静止・真空
- w2 (15-35%): 波紋・波動・干渉縞
- w3 (35-55%): 空間の折り畳み・対称性・分裂
- w4 (55-80%): 強力な回転・渦・スピノール
- w5 (80-100%): Hopf Fibration / 特異点への収束 / トーラス状の射影

メインの【ビジュアル仕様】の計算は、この変容した座標系 `p` に対して適用し、ダイナミックな動きのメリハリを生み出してください。
```

## ES Module 変換手順

Gemini は HTML インラインで出力するため、以下の手順で変換する:

1. `<script type="module">` 内のコードを抽出
2. 一時ファイルとして `src/shaders/` 配下に保存して確認
3. 採用なら `main.js` に統合
4. 不採用なら比較終了後に削除
