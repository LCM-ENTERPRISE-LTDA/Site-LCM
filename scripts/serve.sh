#!/usr/bin/env bash
# Minimal local HTTP server for SiteTLCM / Site-LCM
# Usage: ./scripts/serve.sh [port]

PORT="${1:-8080}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo ""
echo "Site-LCM local server"
echo "Root: $ROOT"
echo "URL:  http://127.0.0.1:$PORT/"
echo "Home: http://127.0.0.1:$PORT/nva.nirmanavisual.com/pemogan/template-kit/home/"
echo "Stop: Ctrl+C"
echo ""

python3 -m http.server "$PORT"
