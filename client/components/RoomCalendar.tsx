import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  LogOut,
  LogIn,
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

export function RoomCalendar({ rooms }: RoomCalendarProps) {
  const floors = Array.from(new Set(rooms.map((room) => room.floor))).sort();

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <div className="flex items-center space-x-2">
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
                      className="hover:shadow-md transition-all cursor-pointer"
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
                            >
                              <LogIn className="h-3 w-3 mr-1" />
                              Check-in
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
    </Card>
  );
}
