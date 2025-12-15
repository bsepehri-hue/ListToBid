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

// Helper to format timestamp nicely
function formatTimestamp(date) {
  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

// 🔹 Broadcast helper
function broadcast(data) {
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  });
}

// Handle new connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Mark client as alive
  ws.isAlive = true;

  // Send initial data with formatted timestamp
  ws.send(
    JSON.stringify({
      ...mockDashboardData,
      lastUpdated: formatTimestamp(new Date()),
    })
  );

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Reset heartbeat when pong received
  ws.on("pong", () => {
    ws.isAlive = true;
  });
});

// Broadcast updates every 15s
setInterval(() => {
  const updatedData = {
    ...mockDashboardData,
    sales: mockDashboardData.sales.map((s) => ({
      ...s,
      gross: s.gross + Math.floor(Math.random() * 500),
      net: s.net + Math.floor(Math.random() * 300),
    })),
    lastUpdated: formatTimestamp(new Date()),
  };

  broadcast(updatedData);
}, 15000);

// Heartbeat check every 30s
setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.isAlive === false) {
      console.log("Closing stale client");
      return client.terminate();
    }

    client.isAlive = false;
    client.ping();
  });
}, 30000);

// 🔹 Manual event triggers
function onNewMerchant(merchant) {
  broadcast({
    type: "merchant_signup",
    merchant,
    lastUpdated: formatTimestamp(new Date()),
  });
}

function onStorefrontUpdate(storefront) {
  broadcast({
    type: "storefront_update",
    storefront,
    lastUpdated: formatTimestamp(new Date()),
  });
}

function onAuctionClose(auction) {
  broadcast({
    type: "auction_close",
    auction,
    lastUpdated: formatTimestamp(new Date()),
  });
}