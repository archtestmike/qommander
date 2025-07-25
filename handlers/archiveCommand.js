const AWS = require('aws-sdk');

/**
 * Archives a command by updating its status and triggers Slack notification
 */
exports.handler = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const lambda = new AWS.Lambda();
    const { id } = event.pathParameters;

    if (!id) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Command ID is required' })
      };
    }

    // Update command status to archived
    const result = await dynamodb.update({
      TableName: process.env.COMMANDS_TABLE,
      Key: { id },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': 'archived',
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    }).promise();

    if (!result.Attributes) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Command not found' })
      };
    }

    // Trigger Slack notification asynchronously
    await lambda.invoke({
      FunctionName: `${process.env.AWS_LAMBDA_FUNCTION_NAME.split('-').slice(0, -1).join('-')}-notifySlack`,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        action: 'archived',
        command: result.Attributes
      })
    }).promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    console.error('Error archiving command:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};