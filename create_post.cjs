const https = require('https');
const fs = require('fs');

const NOTION_KEY = fs.readFileSync(require('os').homedir() + '/.config/notion/api_key', 'utf-8').trim();
const DB_ID = '31f47cd4-bf8a-8134-bbcc-cf1ab8042a99'; // 社群營運與審核台 ID

const postContent = `
【為什麼你越努力賺錢，財富反而離你越遠？】

你是否也常有一種感覺：
每天像齒輪一樣瘋狂運轉，腦袋裡不斷喊著「我需要更多」、「我想賺更多」...
結果卻是壓力越來越大，目標越來越遠？

量子物理學家與古代智慧研究者 Billy Carson 一語道破了這個盲點：
「如果你只在『外部』努力，而忽略了『內部』的頻率對齊，過程注定會充滿壓力且耗時。」

這就像是試圖用蠻力去改變一條河流的方向。
Carson 引用了一個精確的比喻：
"You can't beat a river into submission. You have to take its energy and flow as your own."
（你無法用蠻力征服河流，你必須順應它的能量，並與之共振。）

💸 真正的「顯化」，不是用意志力對抗現實。
而是調整自己的內在磁場，讓自己成為那條河流的一部分。

當你的腦波頻率充滿焦慮與匱乏（高頻 Beta 波），你發送給宇宙的訊號就是「我沒有」。
當你將大腦調頻至深層的放鬆與豐盛狀態（Alpha/Theta 波），你才能順應宇宙的財富流動，毫不費力地接收。

🎧 不要再用意志力與現實對抗了。
透過 TimeWaver 頻率音頻，每天 15 分鐘，幫你清理內在的匱乏雜訊，重新校準豐盛磁場。
👉 點擊主頁連結，探索你的「財富顯化頻率」。

—
💡 靈感來源：Billy Carson - Manifestation Secrets They Don't Want You To Know!
🔗 影片出處：https://www.youtube.com/watch?v=yw5brkTbUkg
`;

const postData = JSON.stringify({
  parent: { database_id: DB_ID },
  properties: {
    "標題 (Title)": { title: [{ text: { content: "[IG長文] 為什麼越努力越賺不到錢？Billy Carson 的河流顯化法則" } }] },
    "狀態 (Status)": { select: { name: "👀 待審核 (Erick)" } },
    "發布平台 (Platform)": { multi_select: [{ name: "Instagram" }, { name: "Facebook" }] },
    "內容類型 (Type)": { select: { name: "科普長文" } }
  },
  children: [
    {
      object: "block",
      type: "paragraph",
      paragraph: { rich_text: [{ text: { content: "以下是為 FB/IG 設計的圖文配文草稿：" } }] }
    },
    {
      object: "block",
      type: "divider",
      divider: {}
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: { 
        rich_text: [{ text: { content: postContent } }] 
      }
    },
    {
      object: "block",
      type: "divider",
      divider: {}
    },
    {
      object: "block",
      type: "heading_3",
      heading_3: { rich_text: [{ text: { content: "🎨 建議配圖 (Carousel 輪播圖) 設計方向：" } }] }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ text: { content: "P1 (封面): 深藍色宇宙背景，大字標題「為什麼越努力賺錢，財富反而離你越遠？」" } }] }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ text: { content: "P2: 引用 Billy Carson 金句：「你無法用蠻力征服河流，你必須順應它的能量。」(配上平靜河流與星空的合成圖)" } }] }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ text: { content: "P3: 對比圖：【外部蠻力 (高壓/耗時)】 vs 【內部對齊 (順流/顯化)】" } }] }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ text: { content: "P4 (CTA): TimeWaver「財富豐盛頻率」產品圖，呼籲點擊主頁連結。" } }] }
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
    if (res.statusCode === 200) {
        console.log(`Success! Page created.`);
    } else {
        console.error(`Error: ${res.statusCode}`, data);
    }
  });
});
req.write(postData);
req.end();
