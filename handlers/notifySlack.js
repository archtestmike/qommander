const https = require('https');

/**
 * Sends Slack notifications when commands are created or archived
 */
exports.handler = async (event) => {
  try {
    const { action, command } = event;

    if (!process.env.SLACK_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL.includes('demo')) {
      console.log('SLACK_WEBHOOK_URL not configured or demo URL, skipping notification');
      return { statusCode: 200 };
    }

    // Create message based on action
    const message = action === 'created' 
      ? `🆕 New command created: *${command.name}*\n📝 ${command.description}\n🏷️ Category: ${command.category}`
      : `📦 Command archived: *${command.name}*\n📝 ${command.description}`;

    const payload = {
      text: message,
      username: 'Qommander Bot',
      icon_emoji: ':robot_face:'
    };

    // Send to Slack webhook
    await sendSlackMessage(process.env.SLACK_WEBHOOK_URL, payload);

    return { statusCode: 200 };
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    return { statusCode: 500 };
  }
};

/**
 * Helper function to send HTTP POST request to Slack webhook
 */
function sendSlackMessage(webhookUrl, payload) {
  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const postData = JSON.stringify(payload);

    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve();
      } else {
        reject(new Error(`Slack API returned status ${res.statusCode}`));
      }
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

