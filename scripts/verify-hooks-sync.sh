#!/usr/bin/env bash
set -euo pipefail

# 共通 hooks の symlink 状態を全 repo で検証する
# 用法: bash scripts/verify-hooks-sync.sh

PD_HOOKS="$(cd "$(dirname "$0")/.." && pwd)/.claude/hooks"
DEV_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

COMMON_HOOKS=(
  _common
  backslash-bang-guard.sh
  credential-guard.sh
  destructive-command-guard.sh
  exfil-guard.sh
  instruction-lint.sh
  instruction-prereq-guard.sh
  session-start-guard.sh
)

REPOS=(awareness-space kesson-space creation-space)

errors=0

for repo in "${REPOS[@]}"; do
  repo_hooks="$DEV_DIR/$repo/.claude/hooks"
  if [[ ! -d "$repo_hooks" ]]; then
    echo "SKIP: $repo — .claude/hooks/ not found"
    continue
  fi
  for hook in "${COMMON_HOOKS[@]}"; do
    target="$repo_hooks/$hook"
    if [[ ! -e "$target" && ! -L "$target" ]]; then
      echo "MISS: $repo/$hook — file not found"
      errors=$((errors + 1))
    elif [[ ! -L "$target" ]]; then
      echo "COPY: $repo/$hook — regular file (not symlink)"
      errors=$((errors + 1))
    else
      link_target="$(readlink "$target")"
      expected="../../../project-design/.claude/hooks/$hook"
      if [[ "$link_target" != "$expected" ]]; then
        echo "LINK: $repo/$hook — points to '$link_target' (expected '$expected')"
        errors=$((errors + 1))
      else
        echo "  OK: $repo/$hook"
      fi
    fi
  done
done

if [[ $errors -gt 0 ]]; then
  echo ""
  echo "FAIL: $errors issue(s) found"
  exit 1
else
  echo ""
  echo "PASS: all common hooks are correctly symlinked"
fi
