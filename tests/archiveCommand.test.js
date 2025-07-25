// Mock AWS SDK
jest.mock('aws-sdk', () => {
  const mockUpdate = jest.fn();
  const mockInvoke = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
  
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({ update: mockUpdate }))
    },
    Lambda: jest.fn(() => ({ invoke: mockInvoke }))
  };
});

const { handler } = require('../handlers/archiveCommand');
const AWS = require('aws-sdk');

describe('archiveCommand handler', () => {
  let mockUpdate;

  beforeEach(() => {
    process.env.COMMANDS_TABLE = 'test-commands-table';
    process.env.AWS_LAMBDA_FUNCTION_NAME = 'qommander-dev-archiveCommand';
    const mockDocumentClient = new AWS.DynamoDB.DocumentClient();
    mockUpdate = mockDocumentClient.update;
    jest.clearAllMocks();
  });

  it('should archive a command successfully', async () => {
    const mockCommand = {
      id: 'test-id',
      name: 'Test Command',
      status: 'archived',
      updatedAt: '2023-01-01T00:00:00.000Z'
    };

    mockUpdate.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Attributes: mockCommand })
    });

    const event = {
      pathParameters: { id: 'test-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.status).toBe('archived');
  });

  it('should return 400 for missing ID', async () => {
    const event = {
      pathParameters: {}
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
  });

  it('should return 404 for non-existent command', async () => {
    mockUpdate.mockReturnValue({
      promise: jest.fn().mockResolvedValue({})
    });

    const event = {
      pathParameters: { id: 'non-existent-id' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(404);
  });
});
