jest.mock('aws-sdk', () => {
  const mockDynamoDb = {
    put: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({})
  };
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mockDynamoDb)
    }
  };
});

const { handler } = require('../handlers/createCommand');

describe('createCommand handler', () => {
  it('should create a command successfully', async () => {
    const event = {
      body: JSON.stringify({ id: 'test-id', message: 'Create me' })
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(201);
  });

  it('should return 400 if no ID is provided', async () => {
    const event = {
      body: JSON.stringify({ message: 'Missing ID' })
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(400);
  });
});
