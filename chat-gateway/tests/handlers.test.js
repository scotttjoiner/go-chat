const { handleWebSocket } = require('../src/handlers');

test('handleWebSocket sends valid gRPC call and ACK', (done) => {
  const mockSend = jest.fn((data) => {
    const parsed = JSON.parse(data);
    expect(parsed).toEqual({ ack: true });
    done(); // complete async test
  });

  const mockWS = { send: mockSend };
  const message = JSON.stringify({ user: "test", text: "hi" });

  const mockGrpc = {
    SendMessage: (data, cb) => {
      expect(data.message.user).toBe("test");
      expect(data.message.text).toBe("hi");
      cb(null, { success: true });
    }
  };

  handleWebSocket(mockWS, message, mockGrpc);
});