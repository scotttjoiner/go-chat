const clients = new Set();

function trackClient(ws) {
  clients.add(ws);
}

function removeClient(ws) {
  clients.delete(ws);
}

function broadcastMessage(message) {
  const payload = JSON.stringify(message);
  clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(payload);
    }
  });
}

function handleWebSocket(ws, msg, grpcClient) {
  try {
    const data = JSON.parse(msg);
    const user = data.user || 'web-user';
    const text = data.text || '';

    grpcClient.SendMessage({ message: { user, text, room: 'general' } }, (err, res) => {
      if (err) {
        console.error('gRPC error:', err);
        ws.send(JSON.stringify({ error: 'Failed to send message' }));
        return;
      }
      ws.send(JSON.stringify({ ack: true }));
    });
  } catch (err) {
    console.error('Message handling error:', err);
    ws.send(JSON.stringify({ error: 'Invalid message format' }));
  }
}

module.exports = {
  handleWebSocket,
  trackClient,
  removeClient,
  broadcastMessage,
};
