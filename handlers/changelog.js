const https = require('https');

/**
 * Fetches Git commit logs and sends weekly changelog to Slack
 */
exports.handler = async (event) => {
  try {
    if (!process.env.GITHUB_TOKEN || !process.env.REPO_OWNER || !process.env.REPO_NAME) {
      console.log('GitHub configuration missing, skipping changelog');
      return { statusCode: 200 };
    }

    // Get commits from the last 7 days
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const commits = await getRecentCommits(oneWeekAgo);

    if (commits.length === 0) {
      console.log('No commits found in the last week');
      return { statusCode: 200 };
    }

    // Format changelog message
    const changelog = formatChangelog(commits);
    
    if (process.env.SLACK_WEBHOOK_URL) {
      await sendSlackMessage(process.env.SLACK_WEBHOOK_URL, {
        text: changelog,
        username: 'Qommander Changelog',
        icon_emoji: ':memo:'
      });
    }

    return { statusCode: 200 };
  } catch (error) {
    console.error('Error generating changelog:', error);
    return { statusCode: 500 };
  }
};

/**
 * Fetches recent commits from GitHub API
 */
function getRecentCommits(since) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/commits?since=${since}`,
      method: 'GET',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'Qommander-Bot'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const commits = JSON.parse(data);
          resolve(Array.isArray(commits) ? commits : []);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Formats commits into a readable changelog
 */
function formatChangelog(commits) {
  const header = `📋 *Weekly Changelog* (${commits.length} commits)\n\n`;
  
  const commitList = commits
    .slice(0, 10) // Limit to 10 most recent commits
    .map(commit => {
      const message = commit.commit.message.split('\n')[0]; // First line only
      const author = commit.commit.author.name;
      const date = new Date(commit.commit.author.date).toLocaleDateString();
      return `• ${message} - _${author}_ (${date})`;
    })
    .join('\n');

  return header + commitList;
}

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