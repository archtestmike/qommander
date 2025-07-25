const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

/**
 * Creates a new command in DynamoDB and triggers Slack notification
 */
exports.handler = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const lambda = new AWS.Lambda();
    
    const body = JSON.parse(event.body);
    const { name, description, category } = body;

    // Validate required fields
    if (!name || !description) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Name and description are required' })
      };
    }

    // Create command object
    const command = {
      id: uuidv4(),
      name,
      description,
      category: category || 'general',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to DynamoDB
    await dynamodb.put({
      TableName: process.env.COMMANDS_TABLE,
      Item: command
    }).promise();

    // Trigger Slack notification asynchronously
    try {
      await lambda.invoke({
        FunctionName: `${process.env.AWS_LAMBDA_FUNCTION_NAME.split('-').slice(0, -1).join('-')}-notifySlack`,
        InvocationType: 'Event',
        Payload: JSON.stringify({
          action: 'created',
          command
        })
      }).promise();
    } catch (lambdaError) {
      console.log('Slack notification failed:', lambdaError.message);
    }

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(command)
    };
  } catch (error) {
    console.error('Error creating command:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};