#!/usr/bin/env bash
set -euo pipefail

# Router: detect whether PDF is text-based or image/scanned, then route.
# Usage: pdf_router.sh /path/to/file.pdf

PDF_PATH="${1:-}"
if [[ -z "$PDF_PATH" ]]; then
  echo "Usage: $0 /path/to/file.pdf" >&2
  exit 1
fi

if [[ ! -f "$PDF_PATH" ]]; then
  echo "[router] PDF not found: $PDF_PATH" >&2
  exit 1
fi

ROOT="/Volumes/2T/MinerU_Workspace"
OUT_DIR="$ROOT/output"
mkdir -p "$OUT_DIR"

PY="$ROOT/.venv/bin/python"

# 1) Quick classification (text_len + page count)
# Heuristic: extract selectable text from first up to 3 pages.
CLASS_JSON="$($PY - "$PDF_PATH" << 'PY'
import json, sys
import fitz
p = sys.argv[1]
d = fitz.open(p)
text = "".join([d.load_page(i).get_text("text") for i in range(min(3, d.page_count))])
print(json.dumps({"pages": d.page_count, "text_len": len(text)}))
PY
)"

PAGES=$(echo "$CLASS_JSON" | $PY -c 'import json,sys; print(json.loads(sys.stdin.read()).get("pages",0))')
TEXT_LEN=$(echo "$CLASS_JSON" | $PY -c 'import json,sys; print(json.loads(sys.stdin.read()).get("text_len",0))')

# 2) Route decision
# If first 1-3 pages already have enough selectable text, treat as text-PDF.
# Threshold is intentionally conservative.
THRESHOLD=800

if [[ "$TEXT_LEN" -ge "$THRESHOLD" ]]; then
  echo "[router] mode=TXT pages=$PAGES text_len=$TEXT_LEN" >&2
  exec "$(dirname "$0")/pdf_txt.sh" "$PDF_PATH"
else
  echo "[router] mode=OCR pages=$PAGES text_len=$TEXT_LEN" >&2
  exec "$(dirname "$0")/pdf_ocr.sh" "$PDF_PATH"
fi
