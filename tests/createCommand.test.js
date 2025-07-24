const AWS = require('aws-sdk');
const { handler } = require('../handlers/createCommand');

// Mock AWS services
jest.mock('aws-sdk');

describe('createCommand handler', () => {
  let mockDynamoDb, mockLambda;

  beforeEach(() => {
    mockDynamoDb = {
      put: jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({})
      })
    };
    
    mockLambda = {
      invoke: jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({})
      })
    };

    AWS.DynamoDB.DocumentClient.mockImplementation(() => mockDynamoDb);
    AWS.Lambda.mockImplementation(() => mockLambda);

    process.env.COMMANDS_TABLE = 'test-commands-table';
    process.env.AWS_LAMBDA_FUNCTION_NAME = 'qommander-dev-createCommand';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a command successfully', async () => {
    const event = {
      body: JSON.stringify({
        name: 'Test Command',
        description: 'Test description',
        category: 'testing'
      })
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(201);
    expect(mockDynamoDb.put).toHaveBeenCalledWith({
      TableName: 'test-commands-table',
      Item: expect.objectContaining({
        name: 'Test Command',
        description: 'Test description',
        category: 'testing',
        status: 'active'
      })
    });
    expect(mockLambda.invoke).toHaveBeenCalled();
  });

  it('should return 400 for missing required fields', async () => {
    const event = {
      body: JSON.stringify({
        name: 'Test Command'
        // missing description
      })
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(mockDynamoDb.put).not.toHaveBeenCalled();
  });

  it('should handle DynamoDB errors', async () => {
    mockDynamoDb.put.mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error('DynamoDB error'))
    });

    const event = {
      body: JSON.stringify({
        name: 'Test Command',
        description: 'Test description'
      })
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
  });
});