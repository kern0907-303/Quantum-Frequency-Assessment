import os
import json
import urllib.request

notion_key_path = os.path.expanduser("~/.config/notion/api_key")
with open(notion_key_path, "r") as f:
    NOTION_KEY = f.read().strip()

url = "https://api.notion.com/v1/pages"

insight_text = """【高價值內容提取】
1. 《2026 企業效能與信息場優化報告》：探討了 TimeWaver Biz 模組在企業領導力與組織體質診斷上的應用，指出無形資產（企業能量場、核心價值觀同頻度）已成為影響財報表現的先行指標。
2. 《系統排列在商業決策的實證研究》：運用 Systemic Constellations 解決組織內部的隱性衝突，提升跨部門協作效率與企業家決策敏銳度。
3. 《商業數字學與領導者頻率共振》：領導者的個人頻率與企業運營節奏的高效整合，成為 2026 年高管教練與企業醫生的核心處方。

【「企業醫生」觀點 Insight】
現代企業診斷已從單一的「財務與流程數據」升級為「全維度系統頻率與信息場」診斷。企業的問題往往是領導者或核心團隊內部未解的隱性糾結。透過 TimeWaver 等信息場優化工具，我們能精準定位組織結構中的能量淤堵，並以特定頻率進行修復（如優化商業數字頻譜、應用系統排列法則），實現從「有形管理」到「無形場域調頻」的降維打擊，快速啟動企業的自癒力與財富擴展勢能。"""

data = {
    "parent": {"database_id": "30a47cd4-bf8a-80c4-b3a9-fbe4c6144445"},
    "properties": {
        "Name": {"title": [{"text": {"content": "2026 企業組織診斷市場洞察：信息場與無形資產優化"}}]},
        "Insight": {"rich_text": [{"text": {"content": insight_text}}]},
        "Date": {"date": {"start": "2026-03-16"}},
        "Tags": {"multi_select": [{"name": "企業醫生"}, {"name": "Market Trend"}, {"name": "2026"}]}
    }
}

req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'))
req.add_header('Authorization', f'Bearer {NOTION_KEY}')
req.add_header('Notion-Version', '2022-06-28')
req.add_header('Content-Type', 'application/json')

try:
    with urllib.request.urlopen(req) as response:
        print("Success:", response.status)
except Exception as e:
    print("Error:", e)
