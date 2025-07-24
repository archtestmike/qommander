const AWS = require('aws-sdk');
const { handler } = require('../handlers/archiveCommand');

// Mock AWS services
jest.mock('aws-sdk');

describe('archiveCommand handler', () => {
  let mockDynamoDb, mockLambda;

  beforeEach(() => {
    mockDynamoDb = {
      update: jest.fn()
    };
    
    mockLambda = {
      invoke: jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({})
      })
    };

    AWS.DynamoDB.DocumentClient.mockImplementation(() => mockDynamoDb);
    AWS.Lambda.mockImplementation(() => mockLambda);

    process.env.COMMANDS_TABLE = 'test-commands-table';
    process.env.AWS_LAMBDA_FUNCTION_NAME = 'qommander-dev-archiveCommand';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should archive a command successfully', async () => {
    const mockCommand = {
      id: 'test-id',
      name: 'Test Command',
      status: 'archived',
      updatedAt: expect.any(String)
    };

    mockDynamoDb.update.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Attributes: mockCommand })
    });

    const event = {
      pathParameters: { id: 'test-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(mockDynamoDb.update).toHaveBeenCalledWith({
      TableName: 'test-commands-table',
      Key: { id: 'test-id' },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: {
        ':status': 'archived',
        ':updatedAt': expect.any(String)
      },
      ReturnValues: 'ALL_NEW'
    });
    expect(mockLambda.invoke).toHaveBeenCalled();
  });

  it('should return 404 for non-existent command', async () => {
    mockDynamoDb.update.mockReturnValue({
      promise: jest.fn().mockResolvedValue({})
    });

    const event = {
      pathParameters: { id: 'non-existent-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(404);
  });

  it('should return 400 for missing ID', async () => {
    const event = {
      pathParameters: {}
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
  });

  it('should handle DynamoDB errors', async () => {
    mockDynamoDb.update.mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error('DynamoDB error'))
    });

    const event = {
      pathParameters: { id: 'test-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
  });
});