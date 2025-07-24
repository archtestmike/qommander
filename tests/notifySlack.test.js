const https = require('https');
const { handler } = require('../handlers/notifySlack');

// Mock https module
jest.mock('https');

describe('notifySlack handler', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      on: jest.fn(),
      write: jest.fn(),
      end: jest.fn()
    };

    https.request.mockImplementation((options, callback) => {
      // Simulate successful response
      callback({ statusCode: 200 });
      return mockRequest;
    });

    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.SLACK_WEBHOOK_URL;
  });

  it('should send notification for created command', async () => {
    const event = {
      action: 'created',
      command: {
        name: 'Test Command',
        description: 'Test description',
        category: 'testing'
      }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(https.request).toHaveBeenCalled();
    expect(mockRequest.write).toHaveBeenCalledWith(
      expect.stringContaining('New command created')
    );
  });

  it('should send notification for archived command', async () => {
    const event = {
      action: 'archived',
      command: {
        name: 'Test Command',
        description: 'Test description'
      }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(https.request).toHaveBeenCalled();
    expect(mockRequest.write).toHaveBeenCalledWith(
      expect.stringContaining('Command archived')
    );
  });

  it('should skip notification when webhook URL is not configured', async () => {
    delete process.env.SLACK_WEBHOOK_URL;

    const event = {
      action: 'created',
      command: { name: 'Test' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(https.request).not.toHaveBeenCalled();
  });

  it('should handle HTTP errors', async () => {
    https.request.mockImplementation((options, callback) => {
      callback({ statusCode: 500 });
      return mockRequest;
    });

    const event = {
      action: 'created',
      command: { name: 'Test' }
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
  });
});