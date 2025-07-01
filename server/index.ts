import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGetRooms, handleUpdateRoomStatus } from "./routes/rooms";
import { handleGetGuests, handleGetGuestByBracelet } from "./routes/guests";
import { handleGetStats } from "./routes/stats";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Hotel management API routes
  app.get("/api/rooms", handleGetRooms);
  app.put("/api/rooms/:roomId/status", handleUpdateRoomStatus);
  app.get("/api/guests", handleGetGuests);
  app.get("/api/guests/bracelet/:braceletCode", handleGetGuestByBracelet);
  app.get("/api/stats", handleGetStats);

  return app;
}
