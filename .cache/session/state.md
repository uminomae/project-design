# state.md — project-design

## Git
- branch: develop
- HEAD: 0f6de2c
- remote: synced (push済み)
- dirty: knowledge/evidence/awareness-model/, knowledge/research/awareness-model/ (untracked)

## 進行中
- 明示作業なし

## 完了したこと（直近セッション 2026-04-08 #02）
- techo#113 完了:
  - wiki-gen-check.sh hook 作成（SessionStart 時に manifest vs wiki 差分検出 → inbox 依頼）
  - wiki-compile SKILL.md に Step 3b（原典解説）統合、自動化パイプライン定義
  - wiki-lint SKILL.md WL-5 を cross-repo 対応に拡張
  - session-management.md に自動実行 inbox ルール追加
  - wiki-publish.yml に develop branch trigger 追加
  - raw-confirmed 31件の原典解説ページ初回生成（15ドメイン）
  - settings.json に SessionStart hook 登録
- cs wt/raw-rerun-continue を develop にマージ（manifest.md が develop に統合）
- pd#60 起票（OCR ワークフロー: スキャン画像PDF 4件）
- cs#213 起票（cs commit hook: raw/ 変更時に pd 通知）

## 次のステップ
- pd#60: スキャン画像 PDF の OCR パイプライン構築（Feynman, Suzuki, Alexander, Zeami）
- techo#112: SEO 残課題（canonical link, og:url エンコード, description）— priority:low
- cs#213: cs commit hook（raw/ 変更 → pd inbox 通知）— 将来
- develop → main マージ検討（pjdhiro 判断）

## Hot Topics
- **wiki 自動化パイプライン稼働**: cs raw-confirmed → pd SessionStart 検知 → 自動生成 → develop push → GitHub Actions deploy
- **CI 稼働中**: GitHub Actions で static-checks が push/PR で自動実行
- **hooks 正本運用**: pd `scripts/verify-hooks-sync.sh` で as / ks / cs の symlink 状態を一括検証
- PDF正本ワークフロー: MD/PDF → pjdhiro assets → GitHub Pages 配信
- 保持論点は ks repo Issue #173-#179 に登録済み
- cs wt/raw-rerun-continue は別作業が進行中（未追跡 PDF 2件あり）。触らないこと
