const https = require('https');
const fs = require('fs');

const NOTION_KEY = fs.readFileSync(require('os').homedir() + '/.config/notion/api_key', 'utf-8').trim();

const postData = JSON.stringify({
  parent: { type: "page_id", page_id: "30a47cd4-bf8a-8054-a248-dfa76c6ec3ec" },
  title: [
    { type: "text", text: { content: "📱 社群營運與審核台 (Quantum Flow)" } }
  ],
  icon: { type: "emoji", emoji: "✅" },
  properties: {
    "標題 (Title)": { title: {} },
    "狀態 (Status)": {
      select: {
        options: [
          { name: "📝 草稿撰寫中", color: "gray" },
          { name: "👀 待審核 (Erick)", color: "yellow" },
          { name: "🛠️ 需修改", color: "red" },
          { name: "✅ 已批准 (待發布)", color: "blue" },
          { name: "🚀 已發布", color: "green" }
        ]
      }
    },
    "發布平台 (Platform)": {
      multi_select: {
        options: [
          { name: "Facebook", color: "blue" },
          { name: "Instagram", color: "pink" }
        ]
      }
    },
    "預計發布日 (Date)": { date: {} },
    "內容類型 (Type)": {
      select: {
        options: [
          { name: "科普長文", color: "purple" },
          { name: "圖文語錄", color: "yellow" },
          { name: "短影音腳本", color: "red" },
          { name: "銷售轉化", color: "green" }
        ]
      }
    }
  }
});

const req = https.request({
  hostname: 'api.notion.com',
  port: 443,
  path: '/v1/databases',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${NOTION_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    if (res.statusCode === 200) {
        const result = JSON.parse(data);
        console.log(`Success! URL: ${result.url}`);
    } else {
        console.error(`Error: ${res.statusCode}`, data);
    }
  });
});
req.write(postData);
req.end();
