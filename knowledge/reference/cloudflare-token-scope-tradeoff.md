# Cloudflare のトークン: R2 のバケット絞りと Pages の権限は同居できない

**確認日**: 2026-09-02
**一次ソース**: Cloudflare ダッシュボードの2つのトークン作成画面
（`/profile/api-tokens` の Custom Token ／ R2 の Manage R2 API Tokens）

---

## 事実

最小権限をかけたいとき、**絞れる軸が画面ごとに違い、両方を1本のトークンに載せられない**。

| 作る場所 | R2 をバケット単位に絞れるか | Pages の権限を付けられるか |
|---|---|---|
| `/profile/api-tokens` → Custom Token | **できない**（Workers R2 Storage はアカウント単位） | できる（Cloudflare Pages: Edit） |
| R2 → Manage R2 API Tokens | **できる**（対象バケットを指定） | **できない** |

つまり「デプロイもできて、R2 は1つのバケットにだけ書ける鍵」は作れない。どちらかを諦める。

## 選び方

| 取るもの | 構成 | 捨てるもの |
|---|---|---|
| 鍵を1本にする | Custom Token に Pages: Edit ＋ Workers R2 Storage: Edit | R2 の書き込みがアカウント全体に及ぶ |
| 影響範囲を絞る | デプロイ＝既存の鍵／アップロード＝バケット絞りの R2 トークン | 鍵が2本になり、スクリプトが変数を2つ読む |

## 付随して要る権限

wrangler は自分の所属を確認するので、Custom Token には次も要る（無いと落ちる）。

- User → **User Details: Read**
- User → **Memberships: Read**

## 落とし穴

- **R2 の Read だけでは `wrangler r2 bucket create` も `r2 object put` も通らない**。
  `Authentication error [code: 10000]` が返る。権限不足はこの1つのエラーに丸められるので、
  「トークンが違う」のか「権限が足りない」のかがメッセージからは分からない
- **バケット作成はダッシュボードなら通る**（ログインの権限で動くため）。鍵の権限を広げずに
  1回だけ作りたいときは画面から作るのが早い
- 鍵の値は `~/.zshrc` の export 行に置く。**端末で `export` を打っただけでは非対話シェルから
  見えない**（Claude Code のデスクトップアプリは ~/.zshrc を読まない）

## 実例

gonin（2026-09-02・gonin#3）。当初は「R2 を `gonin-images` だけに絞り、Pages も付けた鍵」を
作る計画だったが、上の理由で作れないと分かり、**鍵を1本にする**方（`gonin-deploy-r2-2026-09`）を
選んだ。共通鍵から独立させることを優先し、R2 の書き込みがアカウント全体に及ぶことは了解の上。
