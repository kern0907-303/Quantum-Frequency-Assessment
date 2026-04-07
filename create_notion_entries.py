import urllib.request
import json
import os
import datetime

NOTION_KEY = os.popen('cat ~/.config/notion/api_key').read().strip()
DB_ID = "30a47cd4-bf8a-80c4-b3a9-fbe4c6144445"
URL = "https://api.notion.com/v1/pages"

today = "2026-03-19" # explicitly requested

entries = [
    {
        "name": "TimeWaver Biz 2026: The Shift from Analytics to Frequency Optimization",
        "insight": "企業醫生的觀點：傳統KPI已經無法解決高管的「決策疲勞」與「組織共業」。TimeWaver Biz 的頻率介入，實際上是在清理領導團隊的「隱形信息場阻礙」。在2026年，解決無形資產（如團隊士氣、潛意識對抗）將成為企業重組的核心武器。",
        "source": "Quantum Business Review",
        "url": "https://example.com/timewaver-biz-2026",
        "tags": ["Market Trend", "企業醫生"]
    },
    {
        "name": "Systemic Constellations in Boardrooms: Mapping Intangible Assets",
        "insight": "企業醫生的觀點：家族企業或合夥人衝突往往是「系統性排列」失衡的展現。透過將企業視為一個生命體，排列技術能快速定位「誰在錯誤的位置上承擔了不該承擔的能量」。這對於新一代接班的組織診斷是極高價值的切入點。",
        "source": "Organizational Dynamics Journal",
        "url": "https://example.com/systemic-constellations-boardrooms",
        "tags": ["Market Trend", "企業醫生"]
    },
    {
        "name": "Business Numerology & Leadership Dynamics: The Data Behind Intuition",
        "insight": "企業醫生的觀點：商業數字學不再只是玄學，而是高管性格與執行力的「源代碼」。在為企業做體檢時，結合數字學能精準配置專案團隊的「開創者」與「守成者」，大幅降低內耗，這正是「信息場優化」的落地應用之一。",
        "source": "Leadership Tech 2025",
        "url": "https://example.com/business-numerology",
        "tags": ["Market Trend", "企業醫生"]
    }
]

for entry in entries:
    data = {
        "parent": { "database_id": DB_ID },
        "properties": {
            "Name": { "title": [{"text": {"content": entry["name"]}}] },
            "Insight": { "rich_text": [{"text": {"content": entry["insight"]}}] },
            "Source": { "rich_text": [{"text": {"content": entry["source"]}}] },
            "URL": { "url": entry["url"] },
            "Date": { "date": {"start": today} },
            "Tags": { "multi_select": [{"name": tag} for tag in entry["tags"]] }
        }
    }
    
    req = urllib.request.Request(URL, method="POST")
    req.add_header("Authorization", f"Bearer {NOTION_KEY}")
    req.add_header("Notion-Version", "2021-08-16")
    req.add_header("Content-Type", "application/json")
    
    try:
        response = urllib.request.urlopen(req, data=json.dumps(data).encode('utf-8'))
        print(f"Success: {entry['name']}")
    except Exception as e:
        print(f"Error for {entry['name']}: {e}")

