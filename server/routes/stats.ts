import { RequestHandler } from "express";
import { StatsResponse, DashboardStats } from "@shared/api";

export const handleGetStats: RequestHandler = (req, res) => {
  // Mock statistics data
  const stats: DashboardStats = {
    totalRooms: 24,
    occupiedRooms: 18,
    checkoutsToday: 5,
    dailyRevenue: 12500,
    pendingCharges: 2800,
    averageStay: 3.2,
  };

  const response: StatsResponse = {
    stats,
  };
  res.json(response);
};
