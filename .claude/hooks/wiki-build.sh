#!/usr/bin/env bash
set -euo pipefail

# PostToolUse hook: wiki/ 変更時にローカル Quartz ビルドを自動実行
# pd#62

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

# wiki/ 配下の .md ファイルのみ対象
p = pathlib.Path(file_path)
repo_root = pathlib.Path(__file__).resolve().parents[2] if "__file__" in dir() else None

# file_path が wiki/ を含むか判定（絶対パス・相対パスどちらも対応）
path_str = str(p)
if "/wiki/" not in path_str and not path_str.startswith("wiki/"):
    raise SystemExit(0)

if p.suffix != ".md":
    raise SystemExit(0)

# Quartz ビルド実行
quartz_dir = pathlib.Path(os.environ.get("PWD", ".")) / "quartz"
if not quartz_dir.is_dir():
    # フォールバック: pd repo root から探す
    for candidate in [
        pathlib.Path("/Users/uminomae/dev/project-design/quartz"),
    ]:
        if candidate.is_dir():
            quartz_dir = candidate
            break
    else:
        raise SystemExit(0)

wiki_dir = quartz_dir.parent / "wiki"
output_dir = quartz_dir.parent / "build" / "_serve" / "wiki"

try:
    result = subprocess.run(
        ["npx", "quartz", "build", "--directory", str(wiki_dir), "--output", str(output_dir)],
        cwd=str(quartz_dir),
        capture_output=True,
        text=True,
        timeout=30,
    )
    if result.returncode == 0:
        print("Wiki rebuilt successfully", file=sys.stderr)
    else:
        print(f"Wiki build failed: {result.stderr[:200]}", file=sys.stderr)
except subprocess.TimeoutExpired:
    print("Wiki build timed out (30s)", file=sys.stderr)
except FileNotFoundError:
    print("npx not found, skipping wiki build", file=sys.stderr)

raise SystemExit(0)
PY
