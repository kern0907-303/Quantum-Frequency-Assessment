import os
import json
import urllib.request
import datetime

notion_key_path = os.path.expanduser("~/.config/notion/api_key")
with open(notion_key_path, "r") as f:
    NOTION_KEY = f.read().strip()

url = "https://api.notion.com/v1/pages"

insight_text = """【高價值內容提取】
1. Billy Carson: Manifestation Secrets They Don't Want You To Know! / Train your mind to be abundant
2. Lewis Howes: Tony Robbins: The #1 Mindset To Get Ahead of 99% of People / How to Build a Life That Matters
3. Amazon: The Cosmic Wealth Frequency Book / The Wealth Frequency

【丞相洞察 Insight】
目前市場上 Billy Carson 等大V 持續將『古代智慧』與『量子物理 (頻率顯化)』結合。這印證了我們用 TimeWaver (量子科技) 包裝『財富豐盛』與『深度心流』的策略是完全對齊歐美頂尖流量密碼的。
（本報告由 #monitor_trend 自動化 RSS 收集整理）"""

data = {
    "parent": {"database_id": "30a47cd4-bf8a-80c4-b3a9-fbe4c6144445"},
    "properties": {
        "Name": {"title": [{"text": {"content": "[全方位監控報告] 財富頻率與顯化趨勢 (2026/3/16)"}}]},
    },
    "children": [
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": insight_text
                        }
                    }
                ]
            }
        }
    ]
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
