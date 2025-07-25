# Fix Slack Notifications

## Current Issue
Slack notifications failed because we used a dummy webhook URL during deployment.

## Quick Fix

1. **Get real Slack webhook:**
   ```
   https://api.slack.com/messaging/webhooks
   ```

2. **Update environment and redeploy:**
   ```bash
   export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/REAL/WEBHOOK"
   npx serverless deploy
   ```

3. **Test again:**
   ```bash
   curl -X POST https://mypdecdzf7.execute-api.us-east-1.amazonaws.com/dev/commands \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Slack","description":"Testing Slack integration"}'
   ```

## Why It Failed
- Used dummy URL: `https://demo.slack.com`
- Lambda invoke succeeded but Slack notification failed silently
- Need real webhook URL for actual Slack posting

Replace the webhook URL and redeploy to get Slack notifications working!