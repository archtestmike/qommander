const { PassThrough } = require('stream');
const https = require('https');

jest.mock('https', () => ({
  request: jest.fn()
}));

const { handler } = require('../handlers/notifySlack');

describe('notifySlack handler', () => {
  const event = {
    body: JSON.stringify({ command: 'CREATE', message: 'Test command created' })
  };

  beforeEach(() => {
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/test/webhook/url';
  });

  it('should send notification for created command', async () => {
    const mockRes = new PassThrough();
    mockRes.statusCode = 200;
    const req = new PassThrough();

    https.request.mockImplementation((options, callback) => {
      callback(mockRes);
      return req;
    });

    const responsePromise = handler(event);
    mockRes.emit('data', Buffer.from('ok'));
    mockRes.emit('end');
    req.end();

    const response = await responsePromise;
    expect(response.statusCode).toBe(200);
  });

  it('should skip notification when webhook URL is not configured', async () => {
    delete process.env.SLACK_WEBHOOK_URL;

    await expect(handler(event)).rejects.toThrow("SLACK_WEBHOOK_URL is not defined. Please check your .env file.");
  });

  it('should handle HTTP error response', async () => {
    const mockRes = new PassThrough();
    mockRes.statusCode = 500;
    const req = new PassThrough();

    https.request.mockImplementation((options, callback) => {
      callback(mockRes);
      return req;
    });

    const responsePromise = handler(event);
    mockRes.emit('data', Buffer.from('error'));
    mockRes.emit('end');
    req.end();

    const response = await responsePromise;
    expect(response.statusCode).toBe(200); // your current handler logs the error but still returns 200
  });
});
