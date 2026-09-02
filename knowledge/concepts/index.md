# 概念ノート一覧（Concept Notes Index）

**目的**: 概念間の結合、精緻化の経緯、誤解防止の注記を格納する。

**設計意図**:
- schema/（構造）、research/（調査）を**横断する概念の関係性**を記録
- 「なぜこの定義に至ったか」の文脈を保持
- 探索的に発展する概念の成長履歴を追跡

---

## 概念ノート一覧

| ID | タイトル | 関連定義 | 状態 |
|----|---------|---------|------|
| CN-005 | [信頼の定義仮説インベントリ](CN-005_trust-hypothesis-inventory.md) | ISS-41, ISS-42 | 探索的 |
| CN-006 | [信頼とは何か — 軸による多元的記述](CN-006_trust-analysis-axes.md) | CN-005, ISS-41 | 探索的・暫定 |
| CN-007 | [ISS-42 測定設計原則](CN-007_iss42-measurement-design-principles.md) | ISS-42, CN-005 | 正典 |
| CN-008 | [PD 3テーマブリッジ — 保持論点](CN-008_pd-bridge-holding-issues.md) | 欠損駆動思考, 欠損, 抱持, 抱持の成立条件, 情動の構成 | active |
| CN-009 | [切り口と相補的射影 — Being/Doing は分割でなく観測の構え](CN-009_cut-complementary-projection.md) | PD総論, 創造5段階 | 探索的 |
| CN-010 | [可除代数‑意識/組織仮説 — 個の意識(ℂ)と組織(ℍ/𝕆)は同一の梯子](CN-010_division-algebra-consciousness-organization.md) | pd#115, CN-009, awareness-model | 探索的・草稿 |
| CN-011 | [理解こそがボトルネック — 解説＋理解度確認で創造的参加を保つ](CN-011_understanding-is-the-bottleneck.md) | pd#127, ルール16, CN-010 | 探索的 |
| CN-012 | [「未マージ」は「未回収」を意味しない — 並行エージェント環境でのブランチ照合](CN-012_unmerged-is-not-unrecovered.md) | myhome ブランチ整理（2026-07-30）, CLAUDE.md 対話終了時の main マージ | 探索的（1事例） |
| CN-013 | [検査は不変条件で書く — 差分ベースの検査は「壊れた期間だけ無音」になる](CN-013_invariant-checks-not-diff-checks.md) | CN-012, myhome garden-check [11][13], lessons.md 26 | 探索的（1事例） |
| CN-014 | [合計は谷を隠す — 集計粒度が目的関数を決める](CN-014_aggregation-granularity-hides-troughs.md) | CN-007, CN-013, myhome garden-check [14], myhome#64 | 探索的（1事例） |
| CN-015 | [消えない参照層を分ける — 「採用したら行を消す台帳」は判定と出典も一緒に消す](CN-015_non-erasable-reference-layer.md) | CN-013, CN-014, myhome overwintering.md, myhome nutrition-ref.tsv | 探索的（2事例） |
| CN-016 | [「無い」を記録する — 不在の確認にはコストがかかるのに、成果物に残らない](CN-016_record-the-absence.md) | CN-015, CN-013, myhome decisions.md, myhome gap-crops.md | 探索的（1事例＋既存事例の再解釈） |
| CN-018 | [移行は切り替えでなく重ねる — 新を先に見て、無ければ旧へ落とす](CN-018_migrate-by-overlap.md) | CN-013, CN-016, reference/cloudflare-pages-deploy-mode-is-one-way.md, gonin#3 | 探索的（1事例） |
| CN-019 | [認証は入口だけ守り、本体は自分で証明を検証して振り分ける](CN-019_guard-only-the-door-verify-inside.md) | CN-013, CN-018, gonin#15・#28 | 探索的（1事例） |

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-04-07 | 初版作成（techo#101） |
| 2026-06-01 | CN-009 追加（PD推敲 A-2/A-3 吟味より） |
| 2026-07-02 | CN-010 追加（可除代数‑意識/組織仮説、pd#115） |
| 2026-07-08 | CN-011 追加（理解=ボトルネック枠組みの接地＋スキル reader-comprehension、pd#127） |
| 2026-07-30 | CN-012 追加（並行エージェント環境のブランチ照合。myhome の畑ブランチ整理 57→1 本からの帰納） |
| 2026-08-02 | CN-013・CN-014 追加（myhome の畝面積ドリフトと栄養素ベース自給率の設計からの帰納） |
| 2026-08-05 | CN-015・CN-016 追加（myhome の栄養価一次データ調査からの帰納。参照層の分離と「不在の記録」） |
| 2026-08-29 | CN-017 追加（futari の二人の手帳のバックログ再構成からの帰納。担当・入れ子・F-S の最小記法） |
| 2026-08-29 | CN-017 を futari へ移設（futari 固有の知見は futari `data/task-relations.md` を正本とする。CN-017 の番号は欠番） |
| 2026-09-02 | CN-018 追加（gonin の画像置き場を git→R2 へ移した作業からの帰納。あわせて `knowledge/reference/` を新設し Cloudflare の制約2件を格納） |
| 2026-09-02 | CN-019 追加（gonin の投稿ページを Access でメンバー限定にし、権限のない人に案内を出した作業からの帰納。`reference/` に Bootstrap の色変数と HTML コメントの2件を追加） |
