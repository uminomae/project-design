# クラウド環境の設定は「いつ効くか」が種類ごとに違う（環境変数は走っているセッションに効かない）

**確認日**: 2026-09-03
**一次ソース**: Claude Code 公式ドキュメント「Configure cloud environments」
https://code.claude.com/docs/en/cloud-environments
（"Each session copies the environment's values once, at startup … editing or adding variables affects
sessions you start afterward; sessions already running keep the values they started with."）
と、gonin#53・gonin#50 での実測（Network access を Custom に変えたら、走っているセッションにその場で効いた）

---

## 事実

クラウド環境（claude.ai/code の Environment）の設定は、**どれも同じ画面で保存するのに、効き始める時点が違う**。

| 設定 | 走っているセッションに効くか | 仕組み |
|---|---|---|
| **Environment variables** | **効かない** | セッション開始時に1回だけコピーされ、ふつうの環境変数になる。走行中は読み直さない |
| **Network access**（Allowed domains） | **効く** | セッションの外側にいるプロキシが持っている。VM の中の状態ではない |
| **Setup script** | 効かない | Claude が動き出す前に1回走るもの |
| **API credentials** | 効く | Network access と同じくプロキシ側。リクエストが VM を出たあとで鍵を足す |

**境目は「VM の中に配られる値か、VM の外にある関所か」**。中に配られるものは配り直されない。

## これが起こす間違い

「設定したのに効かない」の形で出る。gonin#53 では、環境変数を保存したあと**同じセッションで**確認して
`CLOUDFLARE_API_TOKEN` が空のままで、鍵の作り方を疑いはじめた。実際は保存は正しく、**セッションを立て直せば
入っていた**。直前に Network access を足したときは即座に効いていたので、「この画面の設定は即時に効く」と
思い込んでいたのが元。

## 対処

- **環境変数を足す・変えるときは、確認の前にセッションを立て直す。** 走っているセッションで確かめない
- 通信が届かないだけなら、Network access を直して**そのまま続けてよい**（立て直すと文脈を失うだけ損）
- 「保存したのに空」を見たら、まず**セッションの立て直しを試してから**設定を疑う
