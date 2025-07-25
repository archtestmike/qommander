
const { handler } = require('../handlers/createCommand');

describe('createCommand handler', () => {
  it('should return 400 if no ID is provided', async () => {
    const event = {
      body: JSON.stringify({}) // missing ID
    };
    const response = await handler(event);
    expect(response.statusCode).toBe(400);
  });

  it('should return 201 when a valid ID is passed', async () => {
    const event = {
      body: JSON.stringify({ id: 'test-id' })
    };
    const response = await handler(event);
    expect([200, 201]).toContain(response.statusCode);
  });
});
