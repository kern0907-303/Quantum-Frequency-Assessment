with open("/Volumes/2T/MinerU_Workspace/.venv/lib/python3.10/site-packages/magic_pdf/model/pdf_extract_kit.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "self.apply_ocr = ocr" in line:
        lines[i] = "        self.apply_ocr = False\n"
        break

with open("/Volumes/2T/MinerU_Workspace/.venv/lib/python3.10/site-packages/magic_pdf/model/pdf_extract_kit.py", "w") as f:
    f.writelines(lines)
