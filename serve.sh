#!/bin/bash
cd "$(dirname "$0")"
echo "📐 Project Design - http://localhost:3004/"
python3 -m http.server 3004
