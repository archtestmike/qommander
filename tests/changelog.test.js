const https = require('https');
const { handler } = require('../handlers/changelog');

// Mock https module
jest.mock('https');

describe('changelog handler', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      on: jest.fn(),
      write: jest.fn(),
      end: jest.fn()
    };

    process.env.GITHUB_TOKEN = 'test-token';
    process.env.REPO_OWNER = 'test-owner';
    process.env.REPO_NAME = 'test-repo';
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.GITHUB_TOKEN;
    delete process.env.REPO_OWNER;
    delete process.env.REPO_NAME;
    delete process.env.SLACK_WEBHOOK_URL;
  });

  it('should generate and send changelog', async () => {
    const mockCommits = [
      {
        commit: {
          message: 'Add new feature',
          author: { name: 'John Doe', date: '2023-01-01T00:00:00Z' }
        }
      }
    ];

    https.request.mockImplementation((options, callback) => {
      if (options.hostname === 'api.github.com') {
        // Mock GitHub API response
        const res = {
          on: jest.fn((event, handler) => {
            if (event === 'data') handler(JSON.stringify(mockCommits));
            if (event === 'end') handler();
          })
        };
        callback(res);
      } else {
        // Mock Slack webhook response
        callback({ statusCode: 200 });
      }
      return mockRequest;
    });

    const result = await handler({});

    expect(result.statusCode).toBe(200);
    expect(https.request).toHaveBeenCalledTimes(2); // GitHub API + Slack webhook
  });

  it('should skip when GitHub config is missing', async () => {
    delete process.env.GITHUB_TOKEN;

    const result = await handler({});

    expect(result.statusCode).toBe(200);
    expect(https.request).not.toHaveBeenCalled();
  });

  it('should handle no commits scenario', async () => {
    https.request.mockImplementation((options, callback) => {
      const res = {
        on: jest.fn((event, handler) => {
          if (event === 'data') handler('[]');
          if (event === 'end') handler();
        })
      };
      callback(res);
      return mockRequest;
    });

    const result = await handler({});

    expect(result.statusCode).toBe(200);
    expect(https.request).toHaveBeenCalledTimes(1); // Only GitHub API, no Slack
  });

  it('should handle GitHub API errors', async () => {
    https.request.mockImplementation((options, callback) => {
      mockRequest.on.mockImplementation((event, handler) => {
        if (event === 'error') handler(new Error('Network error'));
      });
      return mockRequest;
    });

    const result = await handler({});

    expect(result.statusCode).toBe(500);
  });
});