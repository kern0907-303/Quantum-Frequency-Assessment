import json

config_path = '/Users/erickair/magic-pdf.json'
with open(config_path, 'r') as f:
    config = json.load(f)

# LayoutLMv3 requires Detectron2 which we successfully installed.
config['layout-config'] = {
    'model_name': 'layoutlmv3'
}

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("Config updated to layoutlmv3.")
