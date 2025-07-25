# 🚀 Qommander

**AI-powered DevOps automation — build, test, deploy, and notify your backend with a single Amazon Q prompt.**

Qommander is a fully serverless backend stack generated using [Amazon Q Developer](https://aws.amazon.com/q/developer/). From REST API routes to Slack notifications and CI/CD workflows, everything is scaffolded, tested, and deployable — instantly.

---

## 🎥 Inline Demo Video (Plays on Page)

> This video plays directly inside the GitHub README.

<video width="100%" controls>
  <source src="demo/QommanderDemo_2x.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>



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
├── demo/QommanderDemo.mp4 # Embedded demo video
├── README.md             # You're here
```

---

## ⚙️ How to Use

```bash
npm install       # Install dependencies
npm test          # Run Jest tests
sls deploy        # Deploy via Serverless Framework
```

---

## 💡 Slack Webhook Setup

1. Create a [Slack Webhook](https://api.slack.com/messaging/webhooks)
2. Paste it into `.env`:

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
```

---

## 📱 Mobile-Ready

Test and deploy from your phone using:
- GitHub Codespaces
- iSH Shell + curl
- Termux or SSH

---

## 🧠 Why Qommander?

This project showcases Amazon Q's ability to:
- Generate full backend logic
- Automate CI/CD pipelines
- Improve productivity and visibility for dev teams

---

## 🏁 Ready to Try It?

```bash
git clone https://github.com/archtestmike/qommander
cd qommander
cp .env.example .env
npm install
sls deploy
```

---

## 📣 AWS Builder Challenge Submission

Built for the [Amazon Q Developer Challenge](https://builder.aws.com).  
Showcases real-world backend generation, Slack integration, and dev automation.
