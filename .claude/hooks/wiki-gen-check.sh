#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_common"
hook_init

# SessionStart 以外では何もしない
if [ "$(hook_event_name)" != "SessionStart" ]; then
  exit 0
fi

CS_ROOT="${REPO_ROOT}/../creation-space"
MANIFEST="${CS_ROOT}/knowledge/raw/manifest.md"
WIKI_DIR="${REPO_ROOT}/wiki"
INBOX_DIR="${REPO_ROOT}/.cache/inbox"

if [ ! -f "$MANIFEST" ]; then
  hook_warn "wiki-gen-check: cs/knowledge/raw/manifest.md not found"
  exit 0
fi

# manifest から raw-confirmed + local_file 行を抽出し、
# 対応する pd/wiki/ ページの存在を確認する。
# 未生成があれば inbox に生成依頼を書き出す。
python3 - "$MANIFEST" "$WIKI_DIR" "$INBOX_DIR" "$CS_ROOT" <<'PY'
import os
import sys
from datetime import date

manifest_path, wiki_dir, inbox_dir, cs_root = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]

with open(manifest_path, encoding="utf-8") as fh:
    lines = fh.readlines()

missing = []
for line in lines:
    if "raw-confirmed" not in line:
        continue
    cols = [c.strip() for c in line.split("|")]
    if len(cols) < 6:
        continue
    source_id = cols[1]
    domain_id = cols[2]
    source_title = cols[4]
    local_file = cols[5].strip("`").strip()
    notes = cols[7].strip() if len(cols) > 7 else ""
    if not local_file or local_file == "\u2014":
        continue

    # local_file 列が ".pdf" で終わらないものは説明文（例: "ローカル保持 (73MB, .gitignore)"）
    # として扱い、対象外とする
    if not local_file.lower().endswith(".pdf"):
        continue

    # cs リポ内に実ファイルが存在することを確認（.gitignore 済み PDF は生成不能）
    abs_local = os.path.normpath(os.path.join(cs_root, local_file))
    if not os.path.isfile(abs_local):
        continue

    basename = os.path.basename(local_file)
    stem = os.path.splitext(basename)[0]

    # ドメイン不一致時のファイル名補正 (例: D08-S08 → D14_varela... → D08_varela...)
    file_domain = stem.split("_")[0] if "_" in stem else ""
    if file_domain != domain_id:
        stem = domain_id + stem[len(file_domain):]

    # part 分割の統合 (例: _part1 → 除去)
    for suffix in ("_part1", "_part2"):
        if stem.endswith(suffix):
            stem = stem[: -len(suffix)]
            break

    # sources/ カテゴリ内を探索（2026-04-08 techo#114 で移動済み）
    wiki_path = os.path.join(wiki_dir, "sources", stem + ".md")
    # フォールバック: 旧パス（wiki/ 直下）も確認
    wiki_path_legacy = os.path.join(wiki_dir, stem + ".md")
    if not os.path.exists(wiki_path) and not os.path.exists(wiki_path_legacy):
        # DOI/URL を notes から抽出
        doi = ""
        oa_url = ""
        import re
        doi_match = re.search(r'DOI:\s*(10\.[0-9]{4,}[^\s,;。]+)', notes)
        if doi_match:
            doi = doi_match.group(1).rstrip(".)")
        oa_match = re.search(r'OA:\s*(https?://[^\s,;。()]+)', notes)
        if oa_match:
            oa_url = oa_match.group(1).rstrip(".)")
        missing.append({
            "source_id": source_id,
            "domain_id": domain_id,
            "title": source_title,
            "local_file": local_file,
            "wiki_stem": stem,
            "doi": doi,
            "oa_url": oa_url,
        })

os.makedirs(inbox_dir, exist_ok=True)
today = date.today().isoformat()

# 前日以前の wiki-gen-*.md を archive/ に退避（auto-execute が回らなかった日のゴミ掃除）
import glob, shutil, re
archive_dir = os.path.join(inbox_dir, "archive")
os.makedirs(archive_dir, exist_ok=True)
date_pat = re.compile(r"wiki-gen-(\d{4}-\d{2}-\d{2})\.md$")
for old in glob.glob(os.path.join(inbox_dir, "wiki-gen-*.md")):
    m = date_pat.search(os.path.basename(old))
    if not m:
        continue
    if m.group(1) >= today:
        continue
    dst = os.path.join(archive_dir, os.path.basename(old))
    # 同名が既にあれば上書きせず suffix
    if os.path.exists(dst):
        base, ext = os.path.splitext(os.path.basename(old))
        dst = os.path.join(archive_dir, f"{base}-stale{ext}")
    shutil.move(old, dst)

if not missing:
    sys.exit(0)

req_path = os.path.join(inbox_dir, f"wiki-gen-{today}.md")

# 既に同日の依頼があれば上書き（冪等）
with open(req_path, "w", encoding="utf-8") as fh:
    fh.write(f"# wiki 原典解説ページ生成依頼\n\n")
    fh.write(f"generated: {today}\n")
    fh.write(f"action: auto-execute\n")
    fh.write(f"skill: wiki-compile (Step 3b)\n\n")
    fh.write(f"## 未生成 {len(missing)} 件\n\n")
    fh.write("| source_id | domain_id | title | local_file | wiki_stem | doi | oa_url |\n")
    fh.write("|---|---|---|---|---|---|---|\n")
    for m in missing:
        fh.write(f"| {m['source_id']} | {m['domain_id']} | {m['title']} | {m['local_file']} | {m['wiki_stem']} | {m['doi']} | {m['oa_url']} |\n")
    fh.write(f"\n## 処理手順\n\n")
    fh.write("1. 各 PDF を pdftotext で読む\n")
    fh.write("2. wiki-compile Step 3b テンプレートで wiki ページ生成\n")
    fh.write("3. UTF-8 文字化けチェック\n")
    fh.write("4. commit & push to develop\n")
    fh.write("5. この依頼ファイルを archive/ に移動\n")

# stderr に報告（CLI が拾う）
print(f"wiki-gen-check: {len(missing)} 件の原典解説ページが未生成 → .cache/inbox/wiki-gen-{today}.md", file=sys.stderr)
PY
