import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import {
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  LogOut,
  LogIn,
  Plus,
} from "lucide-react";

interface Room {
  id: string;
  number: string;
  type: "simple" | "doble" | "suite" | "familiar";
  status: "available" | "occupied" | "checkout" | "maintenance";
  guest?: {
    name: string;
    braceletCode: string;
    checkIn: string;
    checkOut: string;
  };
  floor: number;
}

interface RoomCalendarProps {
  rooms: Room[];
  onRoomUpdate?: (roomId: string, updates: Partial<Room>) => void;
}

const roomTypeLabels = {
  simple: "Simple",
  doble: "Doble",
  suite: "Suite",
  familiar: "Familiar",
};

const statusColors = {
  available: "bg-available text-white",
  occupied: "bg-occupied text-white",
  checkout: "bg-checkout text-white",
  maintenance: "bg-gray-500 text-white",
};

const statusLabels = {
  available: "Disponible",
  occupied: "Ocupada",
  checkout: "Check-out",
  maintenance: "Mantenimiento",
};

export function RoomCalendar({ rooms, onRoomUpdate }: RoomCalendarProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();

  const floors = Array.from(new Set(rooms.map((room) => room.floor))).sort();
  const availableRooms = rooms.filter((room) => room.status === "available");

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleBookingCreate = (booking: any) => {
    // In a real app, this would send the booking to the server
    console.log("Nueva reservación creada:", booking);

    // Update room status locally
    if (onRoomUpdate && booking.room) {
      onRoomUpdate(booking.room.id, {
        status: "occupied",
        guest: {
          id: Date.now().toString(),
          name: booking.guest.name,
          email: booking.guest.email,
          phone: booking.guest.phone,
          braceletCode: booking.guest.braceletCode,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          roomId: booking.room.id,
          totalCharges: booking.total,
          pendingCharges: 0,
        },
      });
    }
  };

  const handleRoomClick = (room: Room) => {
    if (room.status === "available") {
      setSelectedRoom(room);
      setIsBookingModalOpen(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Estado de Habitaciones</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground capitalize">{today}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-available rounded-full"></div>
                <span className="text-xs">Disponible</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-occupied rounded-full"></div>
                <span className="text-xs">Ocupada</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-checkout rounded-full"></div>
                <span className="text-xs">Check-out</span>
              </div>
            </div>
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              size="sm"
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Reserva</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {floors.map((floor) => (
            <div key={floor}>
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">
                Piso {floor}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {rooms
                  .filter((room) => room.floor === floor)
                  .map((room) => (
                    <Card
                      key={room.id}
                      className={`hover:shadow-md transition-all cursor-pointer ${
                        room.status === "available"
                          ? "hover:border-primary"
                          : ""
                      }`}
                      onClick={() => handleRoomClick(room)}
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{room.number}</span>
                            <Badge
                              className={`text-xs ${statusColors[room.status]}`}
                            >
                              {statusLabels[room.status]}
                            </Badge>
                          </div>

                          <div className="text-xs text-muted-foreground">
                            {roomTypeLabels[room.type]}
                          </div>

                          {room.guest && (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span className="text-xs truncate">
                                  {room.guest.name}
                                </span>
                              </div>

                              <div className="text-xs text-muted-foreground">
                                Check-in: {room.guest.checkIn}
                              </div>

                              <div className="text-xs text-muted-foreground">
                                Check-out: {room.guest.checkOut}
                              </div>

                              {room.status === "checkout" && (
                                <div className="flex items-center space-x-1 pt-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 text-xs"
                                  >
                                    <LogOut className="h-3 w-3 mr-1" />
                                    Confirmar
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}

                          {room.status === "available" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRoomClick(room);
                              }}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Reservar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRoom(undefined);
        }}
        availableRooms={availableRooms}
        preselectedRoom={selectedRoom}
        onBookingCreate={handleBookingCreate}
      />
    </Card>
  );
}
