#!/bin/bash
cd "$(dirname "$0")"

mkdir -p build/_serve

# Symlink existing site assets
ln -sf "$(pwd)/index.html" build/_serve/index.html
ln -sf "$(pwd)/src" build/_serve/src

if [ -d quartz ] && command -v npx &>/dev/null; then
  # Initial build
  echo "Building wiki..."
  (cd quartz && npx quartz build --directory ../wiki --output ../build/_serve/wiki 2>&1) || echo "Wiki build failed"

  # Watch for wiki changes and rebuild in background
  echo "Watching wiki/ for changes..."
  fswatch -o wiki/ 2>/dev/null | while read; do
    echo "Wiki changed, rebuilding..."
    (cd quartz && npx quartz build --directory ../wiki --output ../build/_serve/wiki 2>&1) || true
  done &
  WATCH_PID=$!
fi

echo "Project Design - http://localhost:3004/"
echo "Wiki          - http://localhost:3004/wiki/"
python3 -m http.server 3004 --directory build/_serve

# Cleanup
[ -n "$WATCH_PID" ] && kill $WATCH_PID 2>/dev/null
