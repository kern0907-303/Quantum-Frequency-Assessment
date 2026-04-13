const https = require("https");

function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "application/rss+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
          },
        },
        (res) => {
          let data = "";
          if (res.statusCode === 301 || res.statusCode === 302) {
            console.log(`Redirecting to: ${res.headers.location}`);
            return resolve(fetchRSS(res.headers.location));
          }
          if (res.statusCode !== 200) {
            return reject(new Error(`Status Code: ${res.statusCode}`));
          }
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(data);
          });
        },
      )
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Billy Carson: UCOvN8R4E_H50t9y-OexG2qA
// Lewis Howes: UChj1rA0NAnG_FwR7G0E9T4A
const urls = [
  {
    name: "Billy Carson",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCOvN8R4E_H50t9y-OexG2qA",
  },
  {
    name: "Lewis Howes",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UChj1rA0NAnG_FwR7G0E9T4A",
  },
];

async function run() {
  for (const item of urls) {
    try {
      console.log(`Fetching ${item.name}...`);
      const xml = await fetchRSS(item.url);
      const titleMatch = xml.match(/<title>(.*?)<\/title>/g);
      if (titleMatch && titleMatch.length > 1) {
        console.log(`Success! Latest title: ${titleMatch[1].replace(/<\/?title>/g, "")}`);
      } else {
        console.log(`Fetched, but couldn't parse title.`);
      }
    } catch (e) {
      console.error(`Failed ${item.name}: ${e.message}`);
    }
  }
}

run();
