const fs = require('fs');
const https = require('https');

const API_KEY = fs.readFileSync(require('os').homedir() + '/.config/notion/api_key', 'utf8').trim();
const DB_ID = '30a47cd4-bf8a-80c4-b3a9-fbe4c6144445';

const items = [
  {
    Name: "Lewis Howes 頻道趨勢：修正錯誤顯化與極速見效",
    Insight: "Lewis 目前高流量的內容著重於「修正錯誤的顯化法」以及「極速見效（1天內）」。這顯示受眾對於傳統顯化法的疲勞，渴望更精確、立刻有感的路徑。",
    Source: "YouTube: Lewis Howes (The School of Greatness)",
    Tags: ["顯化", "YouTube", "Market Trend"]
  },
  {
    Name: "Amazon 新書：財富頻率 (Wealth Frequency)",
    Insight: "市場上的新書趨勢已從「純粹的心靈法則」轉向「神經科學與頻率震動」的結合。這完美契合我們 TimeWaver 專案的「科學靈性」定位。",
    Source: "Amazon: The Wealth Frequency",
    Tags: ["財富", "頻率", "Market Trend", "Neuroscience"]
  },
  {
    Name: "高流量顯化影片掃描：睡眠冥想與赫茲頻率",
    Insight: "結合特定赫茲（888Hz、432Hz）的「睡眠冥想」依然是絕對的流量密碼。在我們的「信息場音頻」戰略中，將 TimeWaver 特有的低頻調製（LF Modulation）隱藏於這些大眾熟悉的環境音軌中，能大幅降低受眾的接受門檻。",
    Source: "YouTube 搜尋: 888 Hz 豐盛頻率, 432 Hz",
    Tags: ["頻率", "YouTube", "豐盛"]
  }
];

function createPage(item) {
  const data = JSON.stringify({
    parent: { database_id: DB_ID },
    properties: {
      Name: { title: [{ text: { content: item.Name } }] },
      Insight: { rich_text: [{ text: { content: item.Insight } }] },
      Source: { rich_text: [{ text: { content: item.Source } }] },
      Date: { date: { start: "2026-03-12" } },
      Tags: { multi_select: item.Tags.map(t => ({ name: t })) }
    }
  });

  const options = {
    hostname: 'api.notion.com',
    port: 443,
    path: '/v1/pages',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(options, res => {
    let responseBody = '';
    res.on('data', chunk => responseBody += chunk);
    res.on('end', () => {
      if(res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`Success: ${item.Name}`);
      } else {
        console.error(`Error: ${item.Name} -> ${responseBody}`);
      }
    });
  });

  req.on('error', e => console.error(e));
  req.write(data);
  req.end();
}

items.forEach(createPage);
