#!/usr/bin/env bash
set -euo pipefail

# Text-PDF path: no OCR dependencies.
# Uses MinerU_Workspace/pure_text_extract.py (fast + stable).
# Usage: pdf_txt.sh /path/to/file.pdf

PDF_PATH="${1:-}"
if [[ -z "$PDF_PATH" ]]; then
  echo "Usage: $0 /path/to/file.pdf" >&2
  exit 1
fi

ROOT="/Volumes/2T/MinerU_Workspace"
OUT_DIR="$ROOT/output"
mkdir -p "$OUT_DIR"

PY="$ROOT/.venv/bin/python"

BASENAME="$(basename "$PDF_PATH")"
STEM="${BASENAME%.*}"
OUT_MD="$OUT_DIR/${STEM}.txt.md"

# Generate markdown
$PY "$ROOT/pure_text_extract.py" "$PDF_PATH" "$OUT_MD"

echo "[txt] OK -> $OUT_MD"