export interface DemoResponse {
  message: string;
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  braceletCode: string;
  checkIn: string;
  checkOut: string;
  roomId: string;
  totalCharges: number;
  pendingCharges: number;
}

export interface Room {
  id: string;
  number: string;
  type: "simple" | "doble" | "suite" | "familiar";
  status: "available" | "occupied" | "checkout" | "maintenance";
  guest?: Guest;
  floor: number;
  pricePerNight: number;
}

export interface Charge {
  id: string;
  guestId: string;
  description: string;
  amount: number;
  timestamp: string;
  isPaid: boolean;
  source: "pos" | "manual";
}

export interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  checkoutsToday: number;
  dailyRevenue: number;
  pendingCharges: number;
  averageStay: number;
}

export interface RoomsResponse {
  rooms: Room[];
}

export interface StatsResponse {
  stats: DashboardStats;
}

export interface GuestsResponse {
  guests: Guest[];
}

export interface ChargesResponse {
  charges: Charge[];
}
