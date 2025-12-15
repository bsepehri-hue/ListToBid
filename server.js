// server.js (run separately from Next.js dev server)
import { WebSocketServer } from "ws";
import { mockDashboardData } from "./data/mockDashboardData.js";

const wss = new WebSocketServer({ port: 4000 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send initial data
  ws.send(JSON.stringify(mockDashboardData));

  // Example: push updates every 15s
  setInterval(() => {
    const updatedData = {
      ...mockDashboardData,
      sales: mockDashboardData.sales.map((s) => ({
        ...s,
        gross: s.gross + Math.floor(Math.random() * 500),
        net: s.net + Math.floor(Math.random() * 300),
      })),
    };
    ws.send(JSON.stringify(updatedData));
  }, 15000);
});