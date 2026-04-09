#!/usr/bin/env bash
set -euo pipefail

# PostToolUse hook: content/*.md または wiki/**/*.md 変更時に
# content/compiled/ へ wiki リンク入りの compiled 版を自動生成する。
# pd#64

payload_file="$(mktemp)"
cat >"${payload_file}"
trap 'rm -f "${payload_file}"' EXIT

python3 - "${payload_file}" <<'PY'
import json, sys, pathlib, subprocess, os

payload_path = sys.argv[1]
with open(payload_path, encoding="utf-8") as fh:
    payload = json.load(fh)

if payload.get("hook_event_name") != "PostToolUse":
    raise SystemExit(0)

tool_input = payload.get("tool_input") or payload.get("input") or {}
file_path = tool_input.get("file_path", "") or tool_input.get("path", "")
if not file_path:
    raise SystemExit(0)

path_str = str(pathlib.Path(file_path))

# content/*.md (compiled/ 配下は除外) または wiki/**/*.md が対象
is_content = False
is_wiki = False

if ("/content/" in path_str or path_str.startswith("content/")) and "/compiled/" not in path_str:
    if path_str.endswith(".md"):
        is_content = True

if "/wiki/" in path_str or path_str.startswith("wiki/"):
    if path_str.endswith(".md"):
        is_wiki = True

if not is_content and not is_wiki:
    raise SystemExit(0)

# compile-content-links.mjs を実行
repo_root = pathlib.Path(os.environ.get("PWD", "."))
script = repo_root / "scripts" / "compile-content-links.mjs"
if not script.is_file():
    raise SystemExit(0)

cmd = ["node", str(script)]

# content の特定ファイル変更なら --file で限定実行
if is_content:
    cmd += ["--file", file_path]
# wiki 変更時は全 content を再コンパイル（用語マップ変更の可能性）

try:
    result = subprocess.run(
        cmd,
        cwd=str(repo_root),
        capture_output=True,
        text=True,
        timeout=15,
    )
    if result.returncode == 0:
        print(f"Content compiled: {result.stderr.strip()}", file=sys.stderr)
    else:
        print(f"Content compile failed: {result.stderr[:200]}", file=sys.stderr)
except subprocess.TimeoutExpired:
    print("Content compile timed out (15s)", file=sys.stderr)
except FileNotFoundError:
    print("node not found, skipping content compile", file=sys.stderr)

raise SystemExit(0)
PY
