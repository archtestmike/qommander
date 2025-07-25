# Demo with Slack Working

## To get Slack notifications working:

1. **Set your real Slack webhook locally:**
```bash
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/REAL/WEBHOOK"
npx serverless deploy
```

2. **Or push to GitHub** (your secrets will auto-deploy via GitHub Actions)

3. **Test the API:**
```bash
curl -X POST https://mypdecdzf7.execute-api.us-east-1.amazonaws.com/dev/commands \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo Command","description":"Testing Slack integration"}'
```

4. **Check your Slack channel** - you should see the notification!

The code is fixed and ready - just need your real webhook URL deployed.