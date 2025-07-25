
# 🧠 Qommander

Qommander is an AI-powered CLI productivity tool that lets you create, archive, and track command executions using Slack notifications, built and orchestrated using **Amazon Q Developer**.

<p align="center">
  <img src="./demo/qommander_demo.gif" alt="Qommander Demo" width="800"/>
</p>

---

## 🚀 Built with Amazon Q Developer

This project was bootstrapped **entirely** using Amazon Q Developer's CLI and agentic chat mode:

### 🤖 Prompt used to scaffold the project:
```
Build a serverless backend using Node.js that includes:
- createCommand and archiveCommand Lambda functions
- notifySlack handler
- unit tests with Jest
- a Serverless Framework configuration file
```

### 🧩 Amazon Q Developer generated:
- `handlers/createCommand.js`, `archiveCommand.js`, and `notifySlack.js`
- Test suite under `tests/`
- `serverless.yml` for deployment
- CI/CD GitHub workflow
- Boilerplate `.env`, `package.json`, and Slack integration logic

⚡️ **Time saved**: Entire setup was generated and runnable in under **2 minutes**.

---

## ✨ Features

- ✅ Create and store command records in DynamoDB
- 📦 Archive commands
- 📣 Slack notifications on key events
- 🧪 Jest test coverage
- �� Serverless deploy ready
- 🧠 Auto-generated using Amazon Q Developer

---

## 📊 Productivity Snapshot

| Task                      | Manual Time | With Q Developer |
|---------------------------|-------------|------------------|
| Project scaffolding       | ~30 mins    | ⏱ 2 mins         |
| Slack webhook integration | ~15 mins    | ⏱ 1 min          |
| Writing Jest tests        | ~25 mins    | ⏱ 1.5 mins       |
| CI/CD GitHub Workflow     | ~10 mins    | ⏱ Instant        |

---

## 🧪 Usage Demo

Watch Qommander in action—commands firing, notifications sent, and how it behaves live!

<p align="center">
  <img src="./demo/qommander_live.gif" alt="Qommander Live Usage Demo" width="800"/>
</p>

---

## 🔧 Setup

```bash
# Clone the repo
git clone https://github.com/archtestmike/qommander.git
cd qommander

# Install dependencies
npm install

# Setup .env with your Slack webhook
cp .env.example .env
# Add: SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# Run tests
npm test
```

---

## ✅ Lessons Learned Using Amazon Q Developer

- Q Developer excels at **scaffolding serverless projects** with proper file structure
- Best used with **clear and scoped prompts** like "create X handler with Slack webhook"
- You can iterate on handlers, tests, and CI with Q directly in your IDE
- Generated tests are a great **starting point** — review for edge case coverage
- Set environment variables properly for smooth test + runtime

---

## 🤝 Contributions

Pull requests welcome! Built for the [Amazon Q Developer Challenge](https://builder.aws.com/content/2zZHZXurlEsbElK93n76qgqBRRJ/unlock-your-productivity-potential-join-q-developer-challenge-1).

---

## 🧠 Why Qommander?

> Built fast with AI. Runs fast with Slack. Stays lean with Serverless.


