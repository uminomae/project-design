---
name: wiki-publish
description: |
  wiki/ の変更を Quartz でビルドし、GitHub Pages に公開する。
  wiki-compile の後続スキルとして連携する。
triggers: |
  「wiki publish」「wiki 公開」「wiki をビルド」
applyTo: "wiki/, quartz/"
agent: "CLI"
---

# wiki-publish スキル

## 概要

wiki/ の変更を Quartz v4 でビルドし、GitHub Pages にデプロイする。

## 前提

- `quartz/` に Quartz v4 がセットアップ済み
- `quartz.config.ts` が pd 用に設定済み
- GitHub Actions workflow `.github/workflows/wiki-publish.yml` が配置済み

## 手順

### 1. ローカルビルド確認（任意 / 現在は利用不可）

```bash
cd quartz
npx quartz build --directory ../wiki --output ../wiki-out
```

**重要: 現環境ではローカルビルドは不可**。`quartz/.node-version` は Node v22.16.0 を要求するが、手元の Homebrew node は v25.8.1 のみで Quartz v4.5.2 が初期段階で OOM する（16GB ヒープでも失敗）。ローカル `build/_serve/wiki` は古いまま更新されない前提で作業する。本番の確認は GitHub Pages に main マージ後のデプロイ結果で行う。

### 2. コミット & プッシュ

wiki/ の変更は develop にコミット & push する（ここまでは CLI 自律）。
pjdhiro が develop → main マージした時点で GitHub Actions が自動ビルド & デプロイする。
main マージは公開判定であり pjdhiro 専権（CLAUDE.md §委任レベル 参照）。

### 3. 公開 URL

```
https://uminomae.github.io/project-design/wiki/
```

## wiki-compile との連携

```
wiki-compile（知識の compile）
  → wiki/ に MD ファイルを生成・更新
  → commit & push
  → wiki-publish（GitHub Actions が自動実行）
  → GitHub Pages にデプロイ
```

## 注意事項

- Dataview クエリは Quartz では非動作。wiki-compile 時に静的テーブルに変換すること
- デプロイは main push のみ（`branches: [main]`）。develop push では公開されない
- 既存サイト（index.html, src/）と wiki は統合ビルドされる
- **ローカル Quartz ビルドは現在 OOM で不可**（Node 25 / Quartz 4.5.2 の非互換）。`wiki-build.sh` hook も同様に失敗する。ローカル反映は localhost:3004 で確認できないので、公開確認は GitHub Pages に統一する。将来 Node 22 を導入したら復活可能
