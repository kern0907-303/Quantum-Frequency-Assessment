const https = require('https');
const fs = require('fs');

const NOTION_KEY = fs.readFileSync(require('os').homedir() + '/.config/notion/api_key', 'utf-8').trim();

const postData = JSON.stringify({
  query: '社群營運與審核台',
  filter: {
    value: 'database',
    property: 'object'
  }
});

const req = https.request({
  hostname: 'api.notion.com',
  port: 443,
  path: '/v1/search',
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
    const result = JSON.parse(data);
    if (result.results && result.results.length > 0) {
        console.log(`Found DB: ${result.results[0].id}`);
        console.log(`URL: ${result.results[0].url}`);
    } else {
        console.log('Not found. Trying generic search.');
    }
  });
});
req.write(postData);
req.end();
