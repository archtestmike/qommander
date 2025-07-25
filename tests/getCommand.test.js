jest.mock('aws-sdk', () => {
  const mockDynamoDb = {
    get: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({ Item: { id: '123', command: 'test' } })
  };
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mockDynamoDb)
    }
  };
});

const { handler } = require('../handlers/getCommand');

describe('getCommand handler', () => {
  it('should retrieve a command successfully', async () => {
    const event = { pathParameters: { id: '123' } };
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toHaveProperty('id', '123');
  });

  it('should return 400 for missing ID', async () => {
    const event = { pathParameters: {} };
    const result = await handler(event);

    expect(result.statusCode).toBe(400);
  });
});
