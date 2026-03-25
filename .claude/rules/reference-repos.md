# 参照リポジトリルール

## 独立運営の原則

project-design は独立して運営する。構造・ルール・運用の設計にあたり、以下の順序で見本リポジトリを参照する。

## 参照順序

| 優先度 | リポジトリ | パス | 参照対象 |
|--------|-----------|------|---------|
| 1 | creation-space | `~/dev/creation-space/` | .claude/rules/, docs/, .cache/ 構造, hooks, agents, skills |
| 2 | kesson-driven-thinking | `~/dev/kesson-driven-thinking/` | creation-space にない場合の補完 |

## 参照の仕方

- **構造の模倣**: ディレクトリ構造、ルールファイル構成、セッション管理パターンを参考にする
- **内容は独自**: PD 固有の文脈に合わせて書き換える。コピペ禁止
- **CLAUDE.md が最上位**: 参照リポから取り込んだルールが CLAUDE.md と矛盾したら CLAUDE.md に従う

## PM 委任

プロジェクト管理は CLI（Claude）に委任する。

| 委任範囲 | 内容 |
|---------|------|
| 自律実行 | state.md 更新、セッションログ、inbox 管理、Issue 整理、knowledge/ データ追加 |
| 確認後実行 | ルール追加・変更、docs/ 構造変更、新規 Issue 作成 |
| pjdhiro 専権 | 理論の最終採否、公開判定、保持論点の解消、develop→main マージ |

## 段階的構築

一度に全てを揃えない。以下の優先度で段階的に整備する:

1. **Phase 1**: ルール整備（rules/）、.cache/ 初期化、docs/ 拡充
2. **Phase 2**: hooks 導入（基本ガード）
3. **Phase 3**: agents/skills 定義、並列作業体制
