# Cloudflare Pages の配り方は作成時に固定される（切り替えられない）

**確認日**: 2026-09-02
**一次ソース**:
- <https://developers.cloudflare.com/pages/get-started/direct-upload/>
- <https://developers.cloudflare.com/pages/configuration/git-integration/>

---

## 事実

Cloudflare Pages のプロジェクトは、**作成時に選んだ配り方から移れない**。

| 作り方 | あとから |
|---|---|
| Direct Upload（`wrangler pages deploy`） | **Git 連携に切り替えられない** |
| Git 連携（push で Cloudflare 側がビルド） | **Direct Upload に切り替えられない** |

ドキュメントの言い方は「Direct Upload を選んだ場合、あとから Git 連携に切り替えることは
できません。自動デプロイを使うには新しいプロジェクトを作る必要があります」。逆方向についても
同じ注記がある。

## 何が起きるか

切り替えたくなったら**プロジェクトの作り直し**になる。`<name>.pages.dev` の URL を保つには、
既存プロジェクトを削除してから同名で作り直すことになり、次の代償が付く。

- 作業中サイトが落ちる
- **バインディング（R2・D1・KV・環境変数）を新プロジェクトで入れ直す**
- カスタムドメインを当てていれば、その付け替えも要る

## だから何をするか

**新しい Pages プロジェクトを作る前に、push で自動公開したいかを決める。** 決まらないうちは
「あとで変えられる」と思わないこと。判断材料:

- 手元から `deploy.sh` で配るだけなら Direct Upload で足りる
- リポジトリへの push を公開の合図にしたいなら、**最初から** Git 連携で作る
- private repo で GitHub Actions を使わない方針（dev/CLAUDE.md）なら、自動公開の道は
  Pages の Git 連携か launchd のどちらか。Actions は選べない

## 実例

gonin（2026-09-02・gonin#6）。`wrangler pages deploy` で立ち上げたあとに自動デプロイを
検討したが、作り直しが要ると分かった。加えて画像が git を通らず R2 へ直接入るようになり
（gonin#3）、入稿者も1人に決まった（gonin#7）ため、**自動化の動機そのものが消えて**
「やらない」で close した。作り直しの代償を払う理由が無かった。
