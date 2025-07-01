import { RequestHandler } from "express";
import { GuestsResponse, Guest } from "@shared/api";

export const handleGetGuests: RequestHandler = (req, res) => {
  // Mock guest data
  const mockGuests: Guest[] = [
    {
      id: "g1",
      name: "Carlos Mendez",
      email: "carlos@email.com",
      phone: "+52 555 1234",
      braceletCode: "BR001",
      checkIn: "15/01/2024",
      checkOut: "18/01/2024",
      roomId: "1",
      totalCharges: 240,
      pendingCharges: 50,
    },
    {
      id: "g2",
      name: "Ana Rodriguez",
      email: "ana@email.com",
      phone: "+52 555 5678",
      braceletCode: "BR002",
      checkIn: "14/01/2024",
      checkOut: "17/01/2024",
      roomId: "2",
      totalCharges: 360,
      pendingCharges: 120,
    },
  ];

  const response: GuestsResponse = {
    guests: mockGuests,
  };
  res.json(response);
};

export const handleGetGuestByBracelet: RequestHandler = (req, res) => {
  const { braceletCode } = req.params;

  // Mock lookup by bracelet code
  const guest = {
    id: "g1",
    name: "Carlos Mendez",
    email: "carlos@email.com",
    phone: "+52 555 1234",
    braceletCode,
    checkIn: "15/01/2024",
    checkOut: "18/01/2024",
    roomId: "1",
    totalCharges: 240,
    pendingCharges: 50,
  };

  if (guest) {
    res.json(guest);
  } else {
    res.status(404).json({ error: "Guest not found" });
  }
};
