// 這個腳本只是用來確認是不是在某個不公開的 workspace 裡面
const https = require("https");
const fs = require("fs");

const NOTION_KEY = fs
  .readFileSync(require("os").homedir() + "/.config/notion/api_key", "utf-8")
  .trim();

// 試著抓一下這個 DB 的屬性，確認可以被讀取
const req = https.request(
  {
    hostname: "api.notion.com",
    port: 443,
    path: "/v1/databases/31f47cd4-bf8a-8134-bbcc-cf1ab8042a99",
    method: "GET",
    headers: {
      Authorization: `Bearer ${NOTION_KEY}`,
      "Notion-Version": "2022-06-28",
    },
  },
  (res) => {
    let data = "";
    res.on("data", (d) => (data += d));
    res.on("end", () => {
      const result = JSON.parse(data);
      console.log(`Parent ID:`, result.parent);
    });
  },
);
req.end();
