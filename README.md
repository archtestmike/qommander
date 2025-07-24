# 🚀 Qommander

**AI-powered DevOps automation — build, test, deploy, and notify your backend with a single Amazon Q prompt.**

Qommander is a fully serverless backend stack generated using [Amazon Q Developer](https://aws.amazon.com/q/developer/). From REST API routes to Slack notifications and CI/CD workflows, everything is scaffolded, tested, and deployable — instantly.

---

## ✨ Features

- 🧠 Built entirely by prompting Amazon Q
- 🛠️ Modular Lambda handlers (`handlers/`)
- 📬 Slack webhook integration (via `.env`)
- 🧪 Unit tests (Jest)
- 🔁 GitHub Actions workflow for CI/CD
- 📝 Weekly Git changelog poster (Slack)
- 💸 `pricing-breakdown.md` for cost awareness
- 📱 Mobile CLI-compatible via Codespaces

---

## 📦 Project Structure

```
qommander/
├── handlers/             # Lambda functions
├── tests/                # Jest test coverage
├── scripts/              # Git changelog → Slack
├── .github/workflows/    # CI/CD pipeline
├── pricing-breakdown.md  # Cost estimation
├── serverless.yml        # Serverless Framework config
├── .env.example          # Environment variable template
├── README.md             # You're here
```

---

## ⚙️ How to Use

### 🧪 1. Install Dependencies
```bash
npm install
```

### ✅ 2. Run Tests
```bash
npm test
```

### 🚀 3. Deploy Serverlessly
```bash
sls deploy
```

---

## 💬 Amazon Q Prompt Used

```plaintext
Create a complete, serverless backend project called `qommander` using Node.js and the Serverless Framework. Include:
- REST API for managing “commands” (POST, GET, PATCH/archive)
- One Lambda function per route
- Slack webhook notifier for events
- Weekly changelog Lambda that posts Git logs to Slack
- Jest tests for all handlers
- GitHub Actions workflow
- pricing-breakdown.md file
```

---

## 💡 Slack Webhook Setup

> Create a new [Slack Incoming Webhook](https://api.slack.com/messaging/webhooks), then add your URL to `.env`:

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

---

## 💵 Cost Breakdown

See `pricing-breakdown.md` for AWS usage estimates.

| Usage Level | Estimated Monthly Cost |
|-------------|------------------------|
| Solo Dev    | ~$25–35                |
| Small Team  | ~$125–160              |

---

## 📱 Mobile-Ready

Deploy, test, and trigger endpoints from your phone using:
- GitHub Codespaces
- iSH Shell or Termux + curl
- Slack notification demos in real time

---

## 🧠 Why Qommander?

Unlike static templates, Qommander demonstrates the power of Amazon Q Developer to:
- Understand backend intent
- Generate real-world code
- Automate delivery pipelines
- Keep teams in sync — instantly

---

## 🙌 Built With

- Amazon Q Developer (VS Code + CLI)
- AWS Lambda, API Gateway
- Serverless Framework
- Slack Webhooks
- Jest + GitHub Actions

---

## 🏁 Ready to Use

```bash
git clone https://github.com/archtestmike/qommander
cd qommander
cp .env.example .env     # Then add your Slack webhook
npm install
npm test
sls deploy
```

---

## 📣 Submit or Showcase

This project is part of the [AWS Q Developer Challenge](https://builder.aws.com).  
Feel free to fork, remix, or deploy for your own automation needs.
