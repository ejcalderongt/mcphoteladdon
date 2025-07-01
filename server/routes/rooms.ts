import { RequestHandler } from "express";
import { RoomsResponse, Room } from "@shared/api";

// Mock data for demonstration
const mockRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "simple",
    status: "occupied",
    floor: 1,
    pricePerNight: 80,
    guest: {
      id: "g1",
      name: "Carlos Mendez",
      email: "carlos@email.com",
      braceletCode: "BR001",
      checkIn: "15/01/2024",
      checkOut: "18/01/2024",
      roomId: "1",
      totalCharges: 240,
      pendingCharges: 50,
    },
  },
  {
    id: "2",
    number: "102",
    type: "doble",
    status: "checkout",
    floor: 1,
    pricePerNight: 120,
    guest: {
      id: "g2",
      name: "Ana Rodriguez",
      email: "ana@email.com",
      braceletCode: "BR002",
      checkIn: "14/01/2024",
      checkOut: "17/01/2024",
      roomId: "2",
      totalCharges: 360,
      pendingCharges: 120,
    },
  },
  // Add more mock rooms as needed
];

export const handleGetRooms: RequestHandler = (req, res) => {
  const response: RoomsResponse = {
    rooms: mockRooms,
  };
  res.json(response);
};

export const handleUpdateRoomStatus: RequestHandler = (req, res) => {
  const { roomId } = req.params;
  const { status } = req.body;

  // In a real application, update the room status in database
  const room = mockRooms.find((r) => r.id === roomId);
  if (room) {
    room.status = status;
    res.json({ success: true, room });
  } else {
    res.status(404).json({ error: "Room not found" });
  }
};
