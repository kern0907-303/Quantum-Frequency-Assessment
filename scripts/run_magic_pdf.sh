#!/usr/bin/env bash
set -euo pipefail

PDF_PATH="${1:-}"
if [[ -z "$PDF_PATH" ]]; then
  echo "Usage: $0 /path/to/file.pdf" >&2
  exit 1
fi

# Backward compatible entrypoint.
# New behavior: route text-PDF vs scanned-PDF to stable pipelines.

"$(dirname "$0")/pdf_router.sh" "$PDF_PATH"