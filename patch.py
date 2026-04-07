with open("/Volumes/2T/MinerU_Workspace/.venv/lib/python3.10/site-packages/magic_pdf/model/pdf_extract_kit.py", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "self.ocr_model = atom_model_manager.get_atom_model(" in line:
        lines[i] = "        self.ocr_model = atom_model_manager.get_atom_model(atom_model_name=AtomicModel.OCR, ocr_show_log=show_log, det_db_box_thresh=0.3, lang=self.lang) if self.apply_ocr else None\n"
        for j in range(1, 6):
            if i + j < len(lines):
                lines[i + j] = ""
        break

with open("/Volumes/2T/MinerU_Workspace/.venv/lib/python3.10/site-packages/magic_pdf/model/pdf_extract_kit.py", "w") as f:
    f.writelines(lines)
