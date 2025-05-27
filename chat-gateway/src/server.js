const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const grpcClient = require('./grpcClient');
const { handleWebSocket, trackClient, removeClient, broadcastMessage } = require('./handlers');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  trackClient(ws);

  ws.on('message', (msg) => handleWebSocket(ws, msg, grpcClient));
  ws.on('close', () => removeClient(ws));
});

app.get('/healthz', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Gateway listening on http://localhost:${PORT}`);

  // Start listening to gRPC stream
  const call = grpcClient.StreamMessages({ room: "general" });
  call.on('data', (msg) => {
    console.log('[chat-service stream]', msg);
    broadcastMessage(msg);
  });
  call.on('error', (err) => {
    console.error("gRPC stream error:", err);
  });
});
