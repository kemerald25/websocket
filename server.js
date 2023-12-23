const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3001 });

server.on('connection', (socket) => {yarn
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
