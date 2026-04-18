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

# manifest から raw-confirmed / url-verified 行を抽出し、
# 対応する pd/wiki/ ページの存在を確認する。
# 未生成があれば inbox に生成依頼を書き出す。
python3 - "$MANIFEST" "$WIKI_DIR" "$INBOX_DIR" "$CS_ROOT" <<'PY'
import os
import re
import sys
import unicodedata
from datetime import date

manifest_path, wiki_dir, inbox_dir, cs_root = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]

# --- wiki_stem 推定ヘルパー ---
_SLUG_RE = re.compile(r'[^a-z0-9]+')

def _ascii_slug(text, max_words=4):
    """テキストを lowercase ASCII slug に変換する。"""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = _SLUG_RE.sub(" ", text).strip()
    words = text.split()[:max_words]
    return "-".join(words) if words else "unknown"

def stem_from_title(domain_id, source_title):
    """source_title から wiki_stem を推定する。
    パターン: 'Author (year). Title.' または 'Author, A. (year) Title'
    """
    # author: 先頭から '(' の直前まで
    author_match = re.match(r'^([^(]+?)\s*\((\d{4})', source_title)
    if author_match:
        author_raw = author_match.group(1).strip()
        year = author_match.group(2)
        # 著者姓のみ（最後の単語）を取る
        author_parts = re.split(r'[,\s]+', author_raw.strip())
        author_last = author_parts[0].lower() if author_parts else "unknown"
        author_last = re.sub(r'[^a-z]', '', author_last)
        if not author_last:
            author_last = "unknown"
    else:
        # year だけ抽出を試みる
        year_match = re.search(r'\b(1[89]\d{2}|20\d{2})\b', source_title)
        year = year_match.group(1) if year_match else "0000"
        author_last = "unknown"

    # タイトル部分: '.' 区切りで 2 番目のセグメント、なければ全体
    title_part = source_title
    dot_parts = re.split(r'\.\s+', source_title, maxsplit=2)
    if len(dot_parts) >= 2:
        title_part = dot_parts[1]
    # イタリクス記号 (*...*) を除去
    title_part = re.sub(r'\*[^*]+\*', '', title_part).strip()

    slug = _ascii_slug(title_part, max_words=4)
    # slug が取れなかった場合は source_title 全体からフォールバック
    if not slug or slug == "unknown":
        slug = _ascii_slug(source_title, max_words=4)
    return f"{domain_id}_{author_last}_{year}_{slug}"


# --- manifest 読み込み ---
with open(manifest_path, encoding="utf-8") as fh:
    lines = fh.readlines()

VALID_STATUSES = {"raw-confirmed", "url-verified"}

missing = []
for line in lines:
    # テーブル行のみ処理（| で始まり source_id らしきものがある）
    if not line.strip().startswith("|"):
        continue
    cols = [c.strip() for c in line.split("|")]
    if len(cols) < 7:
        continue

    source_id = cols[1]
    domain_id = cols[2]
    # access_status はバッククォート囲みの場合がある
    access_status = cols[3].strip("`").strip()
    source_title = cols[4]
    local_file = cols[5].strip("`").strip()
    notes = cols[7].strip() if len(cols) > 7 else ""

    # source_id が空やヘッダ行を除外
    if not source_id or source_id.startswith("---") or source_id == "source_id":
        continue

    # raw-confirmed / url-verified のみ処理
    if access_status not in VALID_STATUSES:
        continue

    # domain_id が DNN 形式でないエントリは wiki 生成対象外
    # （例: citation-only が domain_id 列に入っているケース）
    if not re.match(r'^D\d+$', domain_id):
        continue

    # --- raw-confirmed の処理 ---
    if access_status == "raw-confirmed":
        if not local_file or local_file == "\u2014":
            continue
        # local_file 列が ".pdf" で終わらないものは説明文として対象外
        if not local_file.lower().endswith(".pdf"):
            continue
        # cs リポ内に実ファイルが存在することを確認
        abs_local = os.path.normpath(os.path.join(cs_root, local_file))
        if not os.path.isfile(abs_local):
            continue

        basename = os.path.basename(local_file)
        stem = os.path.splitext(basename)[0]

        # ドメイン不一致時のファイル名補正
        file_domain = stem.split("_")[0] if "_" in stem else ""
        if file_domain != domain_id:
            stem = domain_id + stem[len(file_domain):]

        # part 分割の統合 (例: _part1 → 除去)
        for suffix in ("_part1", "_part2"):
            if stem.endswith(suffix):
                stem = stem[: -len(suffix)]
                break

    # --- url-verified の処理 ---
    else:  # url-verified
        local_file_display = local_file if (local_file and local_file != "\u2014") else ""

        # oa_url が無い場合は警告して skip
        oa_match = re.search(r'OA:\s*(https?://[^\s,;。()]+)', notes)
        if not oa_match:
            print(f"wiki-gen-check WARN: url-verified but no OA URL found: {source_id}", file=sys.stderr)
            continue

        # wiki_stem 推定: local_file があれば basename から、なければ title から
        if local_file_display and local_file_display.lower().endswith(".pdf"):
            abs_local = os.path.normpath(os.path.join(cs_root, local_file_display))
            basename = os.path.basename(local_file_display)
            stem = os.path.splitext(basename)[0]
            file_domain = stem.split("_")[0] if "_" in stem else ""
            if file_domain != domain_id:
                stem = domain_id + stem[len(file_domain):]
            for suffix in ("_part1", "_part2"):
                if stem.endswith(suffix):
                    stem = stem[: -len(suffix)]
                    break
        else:
            # title から推定
            estimated = stem_from_title(domain_id, source_title)
            # author / slug の両方が "unknown" の場合のみ TBD にする
            # （author だけ unknown でも slug が取れていれば十分）
            parts = estimated.split("_", 3)
            author_part = parts[1] if len(parts) > 1 else ""
            slug_part = parts[3] if len(parts) > 3 else ""
            if author_part == "unknown" and (not slug_part or slug_part == "unknown"):
                stem = f"TBD_{source_id}"
                notes = notes + " # wiki_stem 推定失敗"
            else:
                stem = estimated

        local_file = local_file_display  # 表示用に上書き

    # DOI/URL を notes から抽出（共通）
    doi = ""
    oa_url = ""
    doi_match = re.search(r'DOI:\s*(10\.[0-9]{4,}[^\s,;。]+)', notes)
    if doi_match:
        doi = doi_match.group(1).rstrip(".)")
    oa_match = re.search(r'OA:\s*(https?://[^\s,;。()]+)', notes)
    if oa_match:
        oa_url = oa_match.group(1).rstrip(".)")

    # sources/ カテゴリ内を探索（2026-04-08 techo#114 で移動済み）
    wiki_path = os.path.join(wiki_dir, "sources", stem + ".md")
    # フォールバック: 旧パス（wiki/ 直下）も確認
    wiki_path_legacy = os.path.join(wiki_dir, stem + ".md")
    if not os.path.exists(wiki_path) and not os.path.exists(wiki_path_legacy):
        missing.append({
            "source_id": source_id,
            "domain_id": domain_id,
            "access_status": access_status,
            "title": source_title,
            "local_file": local_file,
            "wiki_stem": stem,
            "doi": doi,
            "oa_url": oa_url,
        })

os.makedirs(inbox_dir, exist_ok=True)
today = date.today().isoformat()

# 前日以前の wiki-gen-*.md を archive/ に退避（auto-execute が回らなかった日のゴミ掃除）
import glob, shutil
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

raw_count = sum(1 for m in missing if m["access_status"] == "raw-confirmed")
url_count = sum(1 for m in missing if m["access_status"] == "url-verified")
tbd_count = sum(1 for m in missing if m["wiki_stem"].startswith("TBD_"))

req_path = os.path.join(inbox_dir, f"wiki-gen-{today}.md")

# 既に同日の依頼があれば上書き（冪等）
with open(req_path, "w", encoding="utf-8") as fh:
    fh.write(f"# wiki 原典解説ページ生成依頼\n\n")
    fh.write(f"generated: {today}\n")
    fh.write(f"action: auto-execute\n")
    fh.write(f"skill: wiki-compile (Step 3b)\n\n")
    fh.write(f"## 未生成 {len(missing)} 件\n\n")
    fh.write("| source_id | domain_id | access_status | title | local_file | wiki_stem | doi | oa_url |\n")
    fh.write("|---|---|---|---|---|---|---|---|\n")
    for m in missing:
        fh.write(
            f"| {m['source_id']} | {m['domain_id']} | {m['access_status']}"
            f" | {m['title']} | {m['local_file']} | {m['wiki_stem']}"
            f" | {m['doi']} | {m['oa_url']} |\n"
        )
    fh.write(f"\n## 処理手順\n\n")
    fh.write("1. access_status=raw-confirmed の行: PDF を pdftotext で読む\n")
    fh.write("2. access_status=url-verified の行: oa_url を WebFetch で読む（PDF の場合は一旦 DL → pdftotext、HTML の場合はそのまま）\n")
    fh.write("3. wiki-compile Step 3b テンプレートで wiki ページ生成\n")
    fh.write("4. UTF-8 文字化けチェック\n")
    fh.write("5. commit & push to develop\n")
    fh.write("6. この依頼ファイルを archive/ に移動\n")

# stderr に報告（CLI が拾う）
print(
    f"wiki-gen-check: {len(missing)} 件の原典解説ページが未生成"
    f" (raw-confirmed: {raw_count}, url-verified: {url_count}, TBD stem: {tbd_count})"
    f" → .cache/inbox/wiki-gen-{today}.md",
    file=sys.stderr
)
PY
