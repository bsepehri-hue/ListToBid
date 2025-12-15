import { mockDashboardData } from "./data/mockDashboardData.js";
import http from "http";
import { WebSocketServer } from "ws";

const port = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer();

// Start listening
server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`);
});

// Attach WebSocket server to the same port
const wss = new WebSocketServer({ server });

// Handle new connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send initial data to this client
  ws.send(JSON.stringify(mockDashboardData));

  // Handle incoming messages
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  // Handle disconnects
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Broadcast updates every 15s to all clients
setInterval(() => {
  const updatedData = {
    ...mockDashboardData,
    sales: mockDashboardData.sales.map((s) => ({
      ...s,
      gross: s.gross + Math.floor(Math.random() * 500),
      net: s.net + Math.floor(Math.random() * 300),
    })),
  };

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(updatedData));
    }
  });
}, 15000);