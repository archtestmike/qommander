// scripts/testSlack.js

require('dotenv').config();
const https = require('https');
const { URL } = require('url');

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error("Missing SLACK_WEBHOOK_URL in .env");
}

const payload = JSON.stringify({
  text: `✅ *Slack webhook test successful!*\n_Triggered manually from test script._`
});

const url = new URL(webhookUrl);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`✅ Webhook responded with status: ${res.statusCode}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', (error) => {
  console.error('❌ Error sending webhook:', error);
});

req.write(payload);
req.end();

