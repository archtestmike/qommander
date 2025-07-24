const AWS = require('aws-sdk');
const { handler } = require('../handlers/getCommand');

// Mock AWS services
jest.mock('aws-sdk');

describe('getCommand handler', () => {
  let mockDynamoDb;

  beforeEach(() => {
    mockDynamoDb = {
      get: jest.fn()
    };

    AWS.DynamoDB.DocumentClient.mockImplementation(() => mockDynamoDb);
    process.env.COMMANDS_TABLE = 'test-commands-table';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve a command successfully', async () => {
    const mockCommand = {
      id: 'test-id',
      name: 'Test Command',
      description: 'Test description',
      status: 'active'
    };

    mockDynamoDb.get.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Item: mockCommand })
    });

    const event = {
      pathParameters: { id: 'test-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockCommand);
    expect(mockDynamoDb.get).toHaveBeenCalledWith({
      TableName: 'test-commands-table',
      Key: { id: 'test-id' }
    });
  });

  it('should return 404 for non-existent command', async () => {
    mockDynamoDb.get.mockReturnValue({
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
    mockDynamoDb.get.mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error('DynamoDB error'))
    });

    const event = {
      pathParameters: { id: 'test-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
  });
});