#!/usr/bin/env bash
set -euo pipefail

# OCR/scanned-PDF path.
# Runs preflight sanity checks, then uses magic-pdf.
# Usage: pdf_ocr.sh /path/to/file.pdf

PDF_PATH="${1:-}"
if [[ -z "$PDF_PATH" ]]; then
  echo "Usage: $0 /path/to/file.pdf" >&2
  exit 1
fi

ROOT="/Volumes/2T/MinerU_Workspace"
OUT_DIR="$ROOT/output"
mkdir -p "$OUT_DIR"

PY="$ROOT/.venv/bin/python"
BIN="$ROOT/.venv/bin/magic-pdf"

# 1) Preflight: verify env + clean bogus tiny weight files
$PY "$ROOT/vlm_enrichment.py" --noop >/dev/null 2>&1 || true
$PY "$ROOT/scripts_model_sanity.py" --models-dir "$ROOT/models" --min-bytes 1048576 --delete

# 2) Run OCR parse
"$BIN" -p "$PDF_PATH" -o "$OUT_DIR" -m ocr

echo "[ocr] Done. Output in: $OUT_DIR"