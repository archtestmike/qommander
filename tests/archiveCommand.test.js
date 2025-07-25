
const { handler } = require('../handlers/archiveCommand');

describe('archiveCommand handler', () => {
  it('should return 400 if no ID is provided', async () => {
    const event = {
      pathParameters: {}
    };
    const result = await handler(event);
    expect(result.statusCode).toBe(400);
  });

  it('should return 404 or 200 if ID is provided', async () => {
    const event = {
      pathParameters: { id: 'test-id' }
    };
    const result = await handler(event);
    expect([200, 404]).toContain(result.statusCode);
  });
});
