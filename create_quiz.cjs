const https = require("https");
const fs = require("fs");

const NOTION_KEY = fs
  .readFileSync(require("os").homedir() + "/.config/notion/api_key", "utf-8")
  .trim();
const DB_ID = "31f47cd4-bf8a-8134-bbcc-cf1ab8042a99"; // 社群營運與審核台 ID

const postData = JSON.stringify({
  parent: { database_id: DB_ID },
  properties: {
    "標題 (Title)": {
      title: [{ text: { content: "[測驗企劃] 大腦當機指數評測：8題問卷與權重分析" } }],
    },
    "狀態 (Status)": { select: { name: "👀 待審核 (Erick)" } },
    "發布平台 (Platform)": { multi_select: [{ name: "Facebook" }, { name: "Instagram" }] },
    "內容類型 (Type)": { select: { name: "銷售轉化" } },
  },
  children: [
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "這份測驗的底層邏輯是透過 8 個日常情境，精準測出用戶的「腦波失衡狀態」，並將其導向我們對應的 4 款音頻產品。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "heading_3",
      heading_3: { rich_text: [{ text: { content: "📊 權重與產品對應矩陣：" } }] },
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [{ text: { content: "[A] 腦壓過高 (Theta波缺乏) ➡ 導向：腦壓釋放・歸零頻率" } }],
      },
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          { text: { content: "[B] 淺眠難入睡 (Delta波缺乏) ➡ 導向：深度睡眠・修復頻率" } },
        ],
      },
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          { text: { content: "[C] 頻寬受限/易分心 (Beta波紊亂) ➡ 導向：深度心流・工作頻率" } },
        ],
      },
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            text: { content: "[D] 匱乏防衛機制 (Solfeggio/頻率不對齊) ➡ 導向：財富豐盛・顯化頻率" },
          },
        ],
      },
    },
    {
      object: "block",
      type: "heading_2",
      heading_2: { rich_text: [{ text: { content: "📝 測驗題目 (8題)" } }] },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q1：當你終於結束一天的工作，躺在沙發上時，你的大腦通常在做什麼？**\n[A] 瘋狂回顧今天哪裡沒做好，或是擔心明天的事。\n[B] 覺得身體很累，但腦袋還是很清醒，有種「停不下來」的感覺。\n[C] 腦袋一片空白，想做點事但完全無法集中注意力。\n[D] 滑手機看別人的動態，心裡默默覺得煩躁或焦慮。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q2：如果你的大腦是一個瀏覽器，你現在的狀態最像哪一種？**\n[A] 開了 50 個分頁，電腦風扇狂轉，感覺隨時會當機。\n[B] 點擊「關機」，但系統一直顯示「背景程式執行中，無法關閉」。\n[C] 開啟網頁的速度極慢，一直轉圈圈 loading。\n[D] 經常跳出「存取被拒」或「系統錯誤」的紅色警告視窗。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q3：面對突如其來的「額外任務」，你最直覺的生理/心理反應是？**\n[A] 肩頸瞬間緊繃，呼吸變淺，覺得「又來了」。\n[B] 覺得這會影響到我晚上的休息時間，開始感到焦慮。\n[C] 愣住幾秒鐘，覺得原本的節奏全被打亂，很難重新開始。\n[D] 覺得自己總是在收拾爛攤子，為什麼好運都不會降臨。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q4：你最近一次擁有「高品質的深度睡眠」，大約是什麼時候？**\n[B] 已經想不起來了，幾乎每天都覺得沒睡飽。\n[A] 幾個月前吧，最近壓力太大，經常作夢或磨牙。\n[C] 週末補眠的時候，但一到工作日又開始疲倦。\n[D] 睡得還可以，但醒來面對現實生活還是覺得心很累。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q5：在進行需要高度專注的工作時，你的狀態是？**\n[C] 每 10 分鐘就想拿手機看一下，很難進入「心流」。\n[A] 可以專注，但做完後會覺得腦力完全透支，太陽穴隱隱作痛。\n[D] 經常懷疑自己「做這些真的有用嗎？」，動力難以維持。\n[B] 下午特別容易恍神，靠咖啡續命，但晚上反而精神好。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q6：當你看到身邊的朋友，突然獲得巨大的成功或財富時，你的感受更偏向？**\n[D] 表面恭喜，但內心會有一絲焦慮、比較，覺得世界不公平。\n[A] 覺得自己是不是不夠努力，因而給自己施加更大的壓力。\n[C] 覺得羨慕，但轉頭看自己的待辦清單，又覺得無能為力。\n[B] 沒什麼特別感覺，我只希望能好好睡一覺。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q7：如果可以立刻獲得一個「大腦外掛」，你最渴望哪一種功能？**\n[B] 一鍵深度休眠：按下去就能秒睡，醒來自動修復 100%。\n[C] 絕對專注結界：開啟後屏蔽所有雜訊，運算速度提升 3 倍。\n[A] 緩存一鍵清理：瞬間清空所有壓力與焦慮數據，大腦變輕盈。\n[D] 幸運磁場接收器：自動對齊宇宙的豐盛資源，毫不費力。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "**Q8：靜下心來感受一下，你現在的呼吸狀態是？**\n[A] 短促且急促，多半在胸腔上半部。\n[B] 覺得胸口有點悶，無法深深地吸氣到底。\n[C] 時而忘記呼吸，或者常常需要嘆氣來換氣。\n[D] 雖然正常，但感覺不到身體有放鬆或擴張的感覺。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "heading_2",
      heading_2: { rich_text: [{ text: { content: "📈 診斷結果分析設定" } }] },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "【多數 A】過載運轉的超級電腦 (對應：腦壓釋放音頻)\n分析：大腦快取記憶體已滿，Beta波持續高頻震盪。你需要Theta波的深層清洗，像降溫系統一樣釋放腦壓。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "【多數 B】無法休眠的伺服器 (對應：深度睡眠音頻)\n分析：即使身體躺平，神經系統依然處於備戰狀態。你需要一個強制的「頻率關機鍵」，強迫大腦進入Delta頻率。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "【多數 C】頻寬受限的處理器 (對應：極致專注音頻)\n分析：注意力被各種碎片化資訊切割。你需要Alpha/Low Beta波來建立「防干擾結界」，穩固思緒。",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            text: {
              content:
                "【多數 D】防火牆過高的封閉網路 (對應：財富顯化音頻)\n分析：潛意識對外在世界充滿防衛與匱乏感。你需要特定的Solfeggio頻率，清理匱乏代碼，重新校準吸引力磁場。",
            },
          },
        ],
      },
    },
  ],
});

const req = https.request(
  {
    hostname: "api.notion.com",
    port: 443,
    path: "/v1/pages",
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Length": Buffer.byteLength(postData),
    },
  },
  (res) => {
    let data = "";
    res.on("data", (d) => (data += d));
    res.on("end", () => {
      if (res.statusCode === 200) {
        console.log(`Success! Quiz created.`);
      } else {
        console.error(`Error: ${res.statusCode}`, data);
      }
    });
  },
);
req.write(postData);
req.end();
