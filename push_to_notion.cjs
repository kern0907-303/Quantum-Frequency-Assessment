const https = require('https');
const fs = require('fs');

const NOTION_KEY = fs.readFileSync(require('os').homedir() + '/.config/notion/api_key', 'utf-8').trim();
const DB_ID = '30a47cd4-bf8a-80c4-b3a9-fbe4c6144445';

const postData = JSON.stringify({
  parent: { database_id: DB_ID },
  properties: {
    "Name": { title: [{ text: { content: "[深度解析] Billy Carson - 顯化的秘密與量子流動" } }] }
  },
  children: [
    {
      object: "block",
      type: "heading_2",
      heading_2: { rich_text: [{ text: { content: "一、核心觀點 (Core Framework)" } }] }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ text: { content: "內在對齊優先於外在努力：若只追求外在物質 (I need more) 而忽略內在頻率，過程會充滿壓力且耗時。" } }] }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ text: { content: "能量流動法則：無法用蠻力征服河流 (You can't beat a river into submission)，必須順應其能量並與之共振 (Go with the flow)。" } }] }
    },
    {
      object: "block",
      type: "heading_2",
      heading_2: { rich_text: [{ text: { content: "二、可借鑒的金句 (Golden Quotes)" } }] }
    },
    {
      object: "block",
      type: "quote",
      quote: { rich_text: [{ text: { content: "You can't beat a river into submission. You have to take its energy and flow as your own." } }] }
    },
    {
      object: "block",
      type: "heading_2",
      heading_2: { rich_text: [{ text: { content: "三、TimeWaver 產品應用建議 (Actionable Steps)" } }] }
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: { rich_text: [{ text: { content: "在銷售「財富豐盛・顯化頻率」音頻時，可直接引用這個河流的比喻：" } }] }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ text: { content: "話術：「不要再用意志力與現實對抗。TimeWaver 頻率音頻的作用，就是幫你調整內在磁場，讓你順應宇宙的財富河流，毫不費力地接收。」" } }] }
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: { rich_text: [{ text: { content: "Source: https://www.youtube.com/watch?v=yw5brkTbUkg" } }] }
    }
  ]
});

const req = https.request({
  hostname: 'api.notion.com',
  port: 443,
  path: '/v1/pages',
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
    console.log(`Status: ${res.statusCode}`);
    if (res.statusCode !== 200) console.error(data);
  });
});

req.on('error', console.error);
req.write(postData);
req.end();
