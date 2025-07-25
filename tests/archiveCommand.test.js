jest.mock('aws-sdk', () => {
  const mockDynamoDb = {
    update: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({})
  };
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mockDynamoDb)
    }
  };
});

const { handler } = require('../handlers/archiveCommand');

describe('archiveCommand handler', () => {
  it('should archive a command successfully', async () => {
    const event = {
      pathParameters: { id: 'test-id' }
    };

    const result = await handler(event);
    expect(result.statusCode).toBe(200);
  });

  it('should return 400 if no ID is provided', async () => {
    const event = {
      pathParameters: {}
    };

    const result = await handler(event);
    expect(result.statusCode).toBe(400);
  });
});
