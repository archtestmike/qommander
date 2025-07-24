# Qommander AWS Pricing Breakdown

## Overview
This document provides estimated monthly AWS costs for running the Qommander serverless backend.

## AWS Services Used

### 1. AWS Lambda
- **Functions**: 5 Lambda functions (createCommand, getCommand, archiveCommand, notifySlack, changelog)
- **Runtime**: Node.js 18.x
- **Memory**: 128 MB (default)

### 2. Amazon DynamoDB
- **Table**: Commands table with on-demand billing
- **Primary Key**: Single partition key (id)

### 3. Amazon API Gateway
- **Type**: REST API
- **Endpoints**: 3 HTTP endpoints

## Cost Estimates

### Solo Developer (Low Usage)
**Assumptions:**
- 1,000 API requests/month
- 500 commands stored
- 1 KB average command size
- Weekly changelog execution

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| Lambda Requests | 1,500 invocations | $0.00* |
| Lambda Duration | 1,500 × 100ms × 128MB | $0.00* |
| DynamoDB Storage | 500 KB | $0.00* |
| DynamoDB Read/Write | 1,000 reads, 500 writes | $0.00* |
| API Gateway | 1,000 requests | $0.00* |
| **Total** | | **~$0.00/month** |

*All services fall within AWS Free Tier limits

### Small Team (Medium Usage)
**Assumptions:**
- 50,000 API requests/month
- 5,000 commands stored
- 1 KB average command size
- Daily Slack notifications

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| Lambda Requests | 75,000 invocations | $0.02 |
| Lambda Duration | 75,000 × 100ms × 128MB | $0.16 |
| DynamoDB Storage | 5 MB | $0.00* |
| DynamoDB Read/Write | 50,000 reads, 25,000 writes | $0.31 |
| API Gateway | 50,000 requests | $0.18 |
| **Total** | | **~$0.67/month** |

### Growing Company (High Usage)
**Assumptions:**
- 1,000,000 API requests/month
- 50,000 commands stored
- 2 KB average command size
- Multiple integrations

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| Lambda Requests | 1,500,000 invocations | $0.30 |
| Lambda Duration | 1,500,000 × 150ms × 128MB | $3.75 |
| DynamoDB Storage | 100 MB | $0.03 |
| DynamoDB Read/Write | 1M reads, 500K writes | $6.25 |
| API Gateway | 1,000,000 requests | $3.50 |
| **Total** | | **~$13.83/month** |

## Cost Optimization Tips

### 1. Lambda Optimization
- Use ARM-based Graviton2 processors (up to 34% better price performance)
- Optimize memory allocation based on actual usage
- Implement connection pooling for DynamoDB

### 2. DynamoDB Optimization
- Use provisioned capacity for predictable workloads
- Implement DynamoDB Accelerator (DAX) for read-heavy workloads
- Archive old commands to S3 for long-term storage

### 3. API Gateway Optimization
- Consider HTTP API instead of REST API (up to 70% cost reduction)
- Implement caching for frequently accessed data
- Use request validation to reduce Lambda invocations

### 4. Monitoring and Alerts
- Set up CloudWatch billing alerts
- Monitor Lambda duration and memory usage
- Track DynamoDB consumed capacity

## Additional Considerations

### Data Transfer
- Minimal data transfer costs for typical API usage
- Consider CloudFront for global distribution if needed

### Backup and Disaster Recovery
- DynamoDB Point-in-Time Recovery: ~$0.20/GB/month
- Cross-region replication if required

### Development Environment
- Use separate AWS accounts or resource tagging
- Consider AWS Organizations for consolidated billing

## Pricing Calculator
For more detailed estimates based on your specific usage patterns, use the [AWS Pricing Calculator](https://calculator.aws).

## Notes
- Prices are based on US East (N. Virginia) region
- Estimates exclude taxes and may vary by region
- Free Tier benefits apply for the first 12 months after account creation
- Actual costs may vary based on usage patterns and optimizations