#!/usr/bin/env bash
set -euo pipefail

# SessionStart hook: Obsidian で直接編集された wiki/ の差分を検出し、
# .cache/session/state.md の Hot Topics セクションに単一ブロックとして記録する。
# #78

source "$(dirname "$0")/_common"
hook_init

if [ "$(hook_event_name)" != "SessionStart" ]; then
  exit 0
fi

state_path="${REPO_ROOT}/.cache/session/state.md"
if [ ! -f "$state_path" ]; then
  exit 0
fi

python3 - "$REPO_ROOT" "$state_path" <<'PY'
import os
import re
import subprocess
import sys
from datetime import datetime, timezone

repo_root, state_path = sys.argv[1], sys.argv[2]

def git_out(args):
    try:
        res = subprocess.run(
            ["git", "-C", repo_root, *args],
            capture_output=True,
            text=True,
            timeout=8,
        )
        if res.returncode != 0:
            return ""
        return res.stdout
    except Exception as exc:
        print(f"obsidian-diff-check: git failed: {exc}", file=sys.stderr)
        return ""

# 未 commit 差分 (wiki/ 配下、.obsidian/ 除外)
status_raw = git_out(["status", "--porcelain", "--", "wiki/", ":(exclude)wiki/.obsidian/*"])
uncommitted = []
for line in status_raw.splitlines():
    if not line.strip():
        continue
    # porcelain v1: "XY path" (space-separated)
    mark = line[:2].strip() or "?"
    path = line[3:].strip()
    if path.startswith("wiki/.obsidian/"):
        continue
    if not path.startswith("wiki/"):
        continue
    uncommitted.append((mark, path))

# 未 push コミット (origin/develop..HEAD, wiki/ に触れるもののみ、.obsidian/ 除外)
log_raw = git_out([
    "log", "--oneline",
    "origin/develop..HEAD",
    "--",
    "wiki/",
    ":(exclude)wiki/.obsidian/*",
])
unpushed = [line for line in log_raw.splitlines() if line.strip()]

# ブロック構築
lines_out = []
if uncommitted:
    lines_out.append("未 commit:")
    for mark, path in uncommitted:
        lines_out.append(f"- {mark} {path}")
if unpushed:
    lines_out.append("未 push コミット (develop ahead of origin/develop, wiki/ のみ):")
    for entry in unpushed:
        lines_out.append(f"- {entry}")

with open(state_path, encoding="utf-8") as fh:
    text = fh.read()

header_re = re.compile(r"^### Obsidian 差分検出[^\n]*\n", re.MULTILINE)
# 既存ブロックを特定（次の空行または見出しで終端）
def strip_existing(t):
    m = header_re.search(t)
    if not m:
        return t
    start = m.start()
    lines = t[m.end():].splitlines(keepends=True)
    consumed = 0
    for line in lines:
        if line.strip() == "":
            consumed += len(line)  # 区切り空行ごと削除
            break
        if re.match(r"^(##|###) ", line):
            break  # 次見出しの手前で停止
        consumed += len(line)
    end = m.end() + consumed
    return t[:start] + t[end:]

new_text = strip_existing(text)

if lines_out:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    block = [f"### Obsidian 差分検出 ({now})", *lines_out,
             "→ `git diff wiki/` で内容確認してから commit/push するか pjdhiro に判断依頼", ""]
    # Hot Topics セクションに追記。Hot Topics が無ければ末尾に追加
    hot = re.search(r"^## Hot Topics\s*\n", new_text, re.MULTILINE)
    insertion = "\n".join(block) + "\n"
    if hot:
        # Hot Topics ヘッダ直後に挿入
        pos = hot.end()
        new_text = new_text[:pos] + insertion + new_text[pos:]
    else:
        if not new_text.endswith("\n"):
            new_text += "\n"
        new_text += "\n## Hot Topics\n" + insertion

# 差分が無く、strip のみ行った場合でも、余分な空行が増えていないかを軽く正規化
new_text = re.sub(r"\n{3,}", "\n\n", new_text)

if new_text != text:
    with open(state_path, "w", encoding="utf-8") as fh:
        fh.write(new_text)
    if lines_out:
        print(f"obsidian-diff-check: wiki/ 差分 {len(uncommitted)} 件 (未 commit) + {len(unpushed)} 件 (未 push) を state.md に記録", file=sys.stderr)
    else:
        print("obsidian-diff-check: 既存 Obsidian 差分ブロックを削除（差分なし）", file=sys.stderr)
PY
