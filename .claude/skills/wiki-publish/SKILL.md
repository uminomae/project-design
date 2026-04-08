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

### 1. ローカルビルド確認（任意）

```bash
cd quartz
npx quartz build --directory ../wiki --output ../wiki-out
```

### 2. コミット & プッシュ

wiki/ の変更をコミットして main にマージ（または develop → main PR）すると、
GitHub Actions が自動でビルド & デプロイする。

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
- develop ブランチへの push でもデプロイされる（techo#119 で branches: [main, develop] に更新済み）
- 既存サイト（index.html, src/）と wiki は統合ビルドされる
