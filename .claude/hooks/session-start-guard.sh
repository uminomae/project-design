#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_common"
hook_init

if [ "$(hook_event_name)" != "SessionStart" ]; then
  exit 0
fi

session_state_path="${HOOK_CACHE_DIR}/session-start-state.json"
branch_name="$(git -C "$REPO_ROOT" branch --show-current)"

python3 - "$session_state_path" "$HOOK_SESSION_ID" "$branch_name" <<'PY'
import json
import os
import sys
from datetime import datetime, timezone

state_path, session_id, branch_name = sys.argv[1:4]
state = {"sessions": {}}
if os.path.exists(state_path):
    with open(state_path, encoding="utf-8") as fh:
        state = json.load(fh)

state["sessions"][session_id] = {
    "branch": branch_name,
    "started_at": datetime.now(timezone.utc).isoformat(),
}

with open(state_path, "w", encoding="utf-8") as fh:
    json.dump(state, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
PY

if [ "$branch_name" != "develop" ]; then
  hook_block "session-start-guard: develop branch required, current: ${branch_name}"
fi

if {
  find "${REPO_ROOT}/.cache/outbox" -maxdepth 1 -type f \( -name 'DONE-*.md' -o -name 'REQ-*.md' -o -name 'REVIEW-*.md' \) 2>/dev/null
  find "${REPO_ROOT}/.cache/inbox" -maxdepth 1 -type f -name 'REVIEW-*.md' 2>/dev/null
  find "${REPO_ROOT}/.cache/reviews/codex/pending" -maxdepth 1 -type f 2>/dev/null
} | grep -q .
then
  hook_warn "session-start-guard: unprocessed review artifacts detected"
fi

# periodic-review staleness check（正本は pd。週次 Routines が主経路、これは保険）
periodic_state="/Users/uminomae/dev/project-design/.cache/reviews/periodic/periodic-review-state.json"
if [ ! -f "$periodic_state" ]; then
  hook_warn "session-start-guard: periodic-review has never run (state file missing) — run /periodic-review in pd"
elif [ -n "$(find "$periodic_state" -mtime +14 -print 2>/dev/null)" ]; then
  hook_warn "session-start-guard: periodic-review state older than 14 days — run /periodic-review in pd"
fi
