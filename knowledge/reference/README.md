# reference/

**外部プラットフォームの仕様・制約のうち、複数 repo にまたがって効くもの**を置く。

## 何を置くか

- 調べないと分からず、**間違えると設計をやり直すことになる**外部の事実
- 複数の repo（futari・gonin など）で同じ判断が要るもの

## 何を置かないか

- 1つの repo でしか使わない知見 → **その repo を正本にする**（先例: CN-017 を futari へ移設・2026-08-29）
- 手順そのもの → 各 repo の CLAUDE.md / README
- 概念・一般則 → `concepts/`（CN-*）

## 書き方

1ファイル1事実。**いつ確かめたか**と**一次ソースの URL** を必ず書く。仕様は変わるので、
古くなったら消すか、確認日を更新する。

## 一覧

| ファイル | 内容 | 確認日 |
|---|---|---|
| [cloudflare-pages-deploy-mode-is-one-way.md](cloudflare-pages-deploy-mode-is-one-way.md) | Pages の Direct Upload と Git 連携は作成時に固定され、切り替えられない | 2026-09-02 |
| [cloudflare-token-scope-tradeoff.md](cloudflare-token-scope-tradeoff.md) | R2 のバケット単位の絞り込みと Pages の権限は、1本のトークンに同居できない | 2026-09-02 |
