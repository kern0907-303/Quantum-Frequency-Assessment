with open("/Volumes/2T/MinerU_Workspace/.venv/lib/python3.10/site-packages/magic_pdf/model/batch_analyze.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "ocr=True," in line:
        lines[i] = "            ocr=False,\n"
        break

with open("/Volumes/2T/MinerU_Workspace/.venv/lib/python3.10/site-packages/magic_pdf/model/batch_analyze.py", "w") as f:
    f.writelines(lines)
