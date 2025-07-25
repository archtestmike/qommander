// Mock AWS SDK
jest.mock('aws-sdk', () => {
  const mockGet = jest.fn();
  
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({ get: mockGet }))
    }
  };
});

const { handler } = require('../handlers/getCommand');
const AWS = require('aws-sdk');

describe('getCommand handler', () => {
  let mockGet;

  beforeEach(() => {
    process.env.COMMANDS_TABLE = 'test-commands-table';
    const mockDocumentClient = new AWS.DynamoDB.DocumentClient();
    mockGet = mockDocumentClient.get;
    jest.clearAllMocks();
  });

  it('should retrieve a command successfully', async () => {
    const mockCommand = {
      id: 'test-id',
      name: 'Test Command',
      description: 'Test description',
      status: 'active'
    };

    mockGet.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Item: mockCommand })
    });

    const event = {
      pathParameters: { id: 'test-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockCommand);
  });

  it('should return 400 for missing ID', async () => {
    const event = {
      pathParameters: {}
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
  });

  it('should return 404 for non-existent command', async () => {
    mockGet.mockReturnValue({
      promise: jest.fn().mockResolvedValue({})
    });

    const event = {
      pathParameters: { id: 'non-existent-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(404);
  });
});
