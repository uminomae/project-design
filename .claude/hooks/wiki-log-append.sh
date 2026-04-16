#!/usr/bin/env bash
set -euo pipefail

# PostToolUse hook (Bash matcher): git commit 実行後に
# wiki/log.md の auto-append を試みる。
# pd#71

payload_file="$(mktemp)"
cat >"${payload_file}"
trap 'rm -f "${payload_file}"' EXIT

python3 - "${payload_file}" <<'PY'
import json, sys, re, subprocess, pathlib, os

with open(sys.argv[1], encoding="utf-8") as fh:
    payload = json.load(fh)

if payload.get("hook_event_name") != "PostToolUse":
    raise SystemExit(0)

tool_input = payload.get("tool_input") or payload.get("input") or {}
command = tool_input.get("command", "") or ""

# `git commit` のみ対象。follow-up コミット自身 (auto-append) もパターンにマッチするが
# スクリプト側でガードする。
if not re.search(r"\bgit\s+commit\b", command):
    raise SystemExit(0)

# `git commit --amend` は除外（HEAD が置換されると follow-up が紛らわしくなる）
if "--amend" in command:
    raise SystemExit(0)

repo_root = pathlib.Path(os.environ.get("PWD", ".")).resolve()
script = repo_root / "scripts/wiki-log-append.mjs"
if not script.exists():
    raise SystemExit(0)

try:
    subprocess.run(
        ["node", str(script)],
        cwd=str(repo_root),
        timeout=15,
        check=False,
    )
except Exception as e:
    print(f"[wiki-log-append hook] skipped: {e}", file=sys.stderr)

raise SystemExit(0)
PY
