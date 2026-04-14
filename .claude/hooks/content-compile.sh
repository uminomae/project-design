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

repo_root = pathlib.Path(os.environ.get("PWD", "."))

# wiki 変更時（index.md 自体の変更を除く）: index.md を再生成 + wiki-lint
is_index = path_str.endswith("wiki/index.md") or path_str.endswith("wiki\\index.md")
is_health = "/wiki/health/" in path_str or path_str.startswith("wiki/health/")
if is_wiki and not is_index:
    index_script = repo_root / "scripts" / "generate-wiki-index.mjs"
    if index_script.is_file():
        try:
            idx_result = subprocess.run(
                ["node", str(index_script)],
                cwd=str(repo_root),
                capture_output=True,
                text=True,
                timeout=10,
            )
            if idx_result.returncode == 0:
                print(f"Wiki index regenerated: {idx_result.stderr.strip()}", file=sys.stderr)
            else:
                print(f"Wiki index generation failed: {idx_result.stderr[:200]}", file=sys.stderr)
        except subprocess.TimeoutExpired:
            print("Wiki index generation timed out (10s)", file=sys.stderr)
        except FileNotFoundError:
            pass

    # wiki-lint: health/ 自体への編集ではスキップ (無限ループ防止)
    # 60s debounce: /tmp/pd-wiki-lint-last に前回実行時刻を記録
    if not is_health:
        import time
        debounce_file = pathlib.Path("/tmp/pd-wiki-lint-last")
        now = time.time()
        last = 0.0
        try:
            last = float(debounce_file.read_text().strip())
        except Exception:
            pass
        if now - last >= 60:
            lint_script = repo_root / "scripts" / "wiki-lint.mjs"
            if lint_script.is_file():
                try:
                    lint_result = subprocess.run(
                        ["node", str(lint_script), "--quiet"],
                        cwd=str(repo_root),
                        capture_output=True,
                        text=True,
                        timeout=15,
                    )
                    if lint_result.returncode == 0:
                        try:
                            debounce_file.write_text(str(now))
                        except Exception:
                            pass
                        print("wiki-lint: orphan/freshness reports refreshed", file=sys.stderr)
                    else:
                        print(f"wiki-lint failed: {lint_result.stderr[:200]}", file=sys.stderr)
                except subprocess.TimeoutExpired:
                    print("wiki-lint timed out (15s)", file=sys.stderr)
                except FileNotFoundError:
                    pass
        else:
            print(f"wiki-lint debounced ({int(now - last)}s < 60s)", file=sys.stderr)

# compile-content-links.mjs を実行
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
