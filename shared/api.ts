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
  area:
    | "restaurant"
    | "bar"
    | "spa"
    | "roomservice"
    | "laundry"
    | "minibar"
    | "other";
  items?: {
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface GuestCredit {
  guestId: string;
  initialCredit: number;
  usedCredit: number;
  availableCredit: number;
  lastUpdated: string;
}

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "cash";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface Transaction {
  id: string;
  guestId: string;
  charges: string[]; // Array of charge IDs
  total: number;
  status: "pending" | "processing" | "completed" | "failed";
  paymentMethod: PaymentMethod;
  timestamp: string;
  gatewayTransactionId?: string;
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
