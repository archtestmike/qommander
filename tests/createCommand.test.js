
// Mock AWS SDK
jest.mock('aws-sdk', () => {
  const mockPut = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
  const mockInvoke = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });
  
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({ put: mockPut }))
    },
    Lambda: jest.fn(() => ({ invoke: mockInvoke }))
  };
});

const { handler } = require('../handlers/createCommand');
const AWS = require('aws-sdk');

describe('createCommand handler', () => {
  beforeEach(() => {
    process.env.COMMANDS_TABLE = 'test-commands-table';
    process.env.AWS_LAMBDA_FUNCTION_NAME = 'qommander-dev-createCommand';
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
    const body = JSON.parse(result.body);
    expect(body.name).toBe('Test Command');
    expect(body.description).toBe('Test description');
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
  });
});
