const client = require('../src/grpcClient');

test('gRPC client exposes SendMessage method', () => {
  expect(client).toBeDefined();
  expect(typeof client.SendMessage).toBe('function');
});