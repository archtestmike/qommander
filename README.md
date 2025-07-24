# Qommander

A serverless backend for managing commands with Slack integration and automated changelog generation.

## Features

- **REST API** for command management (create, retrieve, archive)
- **Slack Integration** for real-time notifications
- **Weekly Changelog** generation from Git commits
- **Serverless Architecture** using AWS Lambda and DynamoDB
- **CI/CD Pipeline** with GitHub Actions
- **Comprehensive Testing** with Jest

## API Endpoints

- `POST /commands` - Create a new command
- `GET /commands/{id}` - Retrieve a command by ID
- `PATCH /commands/{id}/archive` - Archive a command

## Project Structure

```
qommander/
├── handlers/                 # Lambda function handlers
│   ├── createCommand.js     # Create new commands
│   ├── getCommand.js        # Retrieve commands
│   ├── archiveCommand.js    # Archive commands
│   ├── notifySlack.js       # Slack notifications
│   └── changelog.js         # Weekly changelog generation
├── tests/                   # Unit tests
├── .github/workflows/       # CI/CD pipeline
├── serverless.yml          # Serverless Framework configuration
├── package.json            # Dependencies and scripts
├── pricing-breakdown.md    # AWS cost estimates
└── README.md              # This file
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   export SLACK_WEBHOOK_URL="your-slack-webhook-url"
   export GITHUB_TOKEN="your-github-token"
   export REPO_OWNER="your-github-username"
   export REPO_NAME="your-repo-name"
   ```

3. **Deploy to AWS:**
   ```bash
   npm run deploy
   ```

## Testing

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## GitHub Actions Setup

Add these secrets to your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `SLACK_WEBHOOK_URL`

## Command Schema

```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "category": "string",
  "status": "active|archived",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

## Cost Estimates

See [pricing-breakdown.md](pricing-breakdown.md) for detailed AWS cost analysis.

## Built with Amazon Q

This project was created entirely using Amazon Q Developer, demonstrating AI-powered full-stack development capabilities.