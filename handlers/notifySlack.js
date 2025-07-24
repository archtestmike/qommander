// handlers/notifySlack.js

require('dotenv').config(); // This loads .env values
const https = require('https');
const { URL } = require('url');

module.exports.handler = async (event) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL is not defined. Please check your .env file.");
  }

  const payload = JSON.stringify({
    text: `📣 New Command Event: \n${event.body || 'No payload provided.'}`
  });

  const url = new URL(webhookUrl);

  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log("Slack webhook sent successfully.");
        resolve({ statusCode: 200, body: 'Slack notification sent.' });
      });
    });

    req.on('error', (err) => {
      console.error("Slack webhook error:", err);
      reject({ statusCode: 500, body: err.message });
    });

    req.write(payload);
    req.end();
  });
};

