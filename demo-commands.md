# 🎬 Qommander Demo Commands

Copy and paste these commands for your video demo:

## 1. Show Project Structure
```bash
ls -la
```

## 2. Run Tests
```bash
npm test
```

## 3. Create Command (with Slack notification)
```bash
curl -X POST https://mypdecdzf7.execute-api.us-east-1.amazonaws.com/dev/commands \
  -H "Content-Type: application/json" \
  -d '{"name":"Deploy to Production","description":"Deploy app to production environment","category":"deployment"}'
```

## 4. Get Command (replace ID from step 3)
```bash
curl https://mypdecdzf7.execute-api.us-east-1.amazonaws.com/dev/commands/REPLACE_WITH_ID
```

## 5. Archive Command (same ID)
```bash
curl -X PATCH https://mypdecdzf7.execute-api.us-east-1.amazonaws.com/dev/commands/REPLACE_WITH_ID/archive
```

## 6. Show Pricing
```bash
head -30 pricing-breakdown.md
```

## 7. Show CI/CD
```bash
cat .github/workflows/deploy.yml
```

**🔔 Check Slack after steps 3 and 5 for notifications!**