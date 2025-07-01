import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  Eye,
  Users,
  Bed,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Wind,
  Star,
  MapPin,
} from "lucide-react";
import type { Room } from "@shared/api";

const roomTypeLabels = {
  simple: "Simple",
  doble: "Doble",
  suite: "Suite",
  familiar: "Familiar",
};

const statusLabels = {
  available: "Disponible",
  occupied: "Ocupada",
  checkout: "Check-out",
  maintenance: "Mantenimiento",
};

const amenitiesData = {
  simple: ["Wifi", "TV", "Baño privado"],
  doble: ["Wifi", "TV", "Baño privado", "Minibar"],
  suite: [
    "Wifi",
    "TV",
    "Baño privado",
    "Minibar",
    "Jacuzzi",
    "Balcón",
    "Aire acondicionado",
  ],
  familiar: [
    "Wifi",
    "TV",
    "Baño privado",
    "Minibar",
    "Sofá cama",
    "Aire acondicionado",
  ],
};

const amenityIcons = {
  Wifi: Wifi,
  TV: Tv,
  "Baño privado": Bath,
  Minibar: Coffee,
  Jacuzzi: Bath,
  Balcón: Eye,
  "Aire acondicionado": Wind,
  "Sofá cama": Bed,
};

const statusColors = {
  available: "bg-green-500",
  occupied: "bg-red-500",
  checkout: "bg-orange-500",
  maintenance: "bg-gray-500",
};

export default function HotelView() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [viewFilter, setViewFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Mock room data with amenities
    const mockRooms: Room[] = [
      // Floor 1
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
          braceletCode: "BR002",
          checkIn: "14/01/2024",
          checkOut: "17/01/2024",
          roomId: "2",
          totalCharges: 360,
          pendingCharges: 120,
        },
      },
      {
        id: "3",
        number: "103",
        type: "simple",
        status: "available",
        floor: 1,
        pricePerNight: 80,
      },
      {
        id: "4",
        number: "104",
        type: "suite",
        status: "occupied",
        floor: 1,
        pricePerNight: 200,
        guest: {
          id: "g3",
          name: "Maria Garcia",
          braceletCode: "BR003",
          checkIn: "16/01/2024",
          checkOut: "20/01/2024",
          roomId: "4",
          totalCharges: 800,
          pendingCharges: 0,
        },
      },
      {
        id: "5",
        number: "105",
        type: "doble",
        status: "available",
        floor: 1,
        pricePerNight: 120,
      },
      {
        id: "6",
        number: "106",
        type: "familiar",
        status: "occupied",
        floor: 1,
        pricePerNight: 150,
        guest: {
          id: "g4",
          name: "Luis Martinez",
          braceletCode: "BR004",
          checkIn: "15/01/2024",
          checkOut: "19/01/2024",
          roomId: "6",
          totalCharges: 600,
          pendingCharges: 200,
        },
      },

      // Floor 2
      {
        id: "7",
        number: "201",
        type: "simple",
        status: "occupied",
        floor: 2,
        pricePerNight: 80,
        guest: {
          id: "g5",
          name: "Pedro Silva",
          braceletCode: "BR005",
          checkIn: "16/01/2024",
          checkOut: "18/01/2024",
          roomId: "7",
          totalCharges: 160,
          pendingCharges: 40,
        },
      },
      {
        id: "8",
        number: "202",
        type: "doble",
        status: "available",
        floor: 2,
        pricePerNight: 120,
      },
      {
        id: "9",
        number: "203",
        type: "suite",
        status: "occupied",
        floor: 2,
        pricePerNight: 200,
        guest: {
          id: "g6",
          name: "Isabella Torres",
          braceletCode: "BR006",
          checkIn: "14/01/2024",
          checkOut: "21/01/2024",
          roomId: "9",
          totalCharges: 1400,
          pendingCharges: 350,
        },
      },
      {
        id: "10",
        number: "204",
        type: "familiar",
        status: "checkout",
        floor: 2,
        pricePerNight: 150,
        guest: {
          id: "g7",
          name: "Roberto Diaz",
          braceletCode: "BR007",
          checkIn: "13/01/2024",
          checkOut: "17/01/2024",
          roomId: "10",
          totalCharges: 600,
          pendingCharges: 80,
        },
      },
      {
        id: "11",
        number: "205",
        type: "simple",
        status: "maintenance",
        floor: 2,
        pricePerNight: 80,
      },
      {
        id: "12",
        number: "206",
        type: "doble",
        status: "available",
        floor: 2,
        pricePerNight: 120,
      },

      // Floor 3
      {
        id: "13",
        number: "301",
        type: "suite",
        status: "available",
        floor: 3,
        pricePerNight: 220,
      },
      {
        id: "14",
        number: "302",
        type: "suite",
        status: "occupied",
        floor: 3,
        pricePerNight: 220,
        guest: {
          id: "g8",
          name: "Carmen Ruiz",
          braceletCode: "BR008",
          checkIn: "15/01/2024",
          checkOut: "22/01/2024",
          roomId: "14",
          totalCharges: 1540,
          pendingCharges: 250,
        },
      },
      {
        id: "15",
        number: "303",
        type: "familiar",
        status: "available",
        floor: 3,
        pricePerNight: 160,
      },
      {
        id: "16",
        number: "304",
        type: "suite",
        status: "checkout",
        floor: 3,
        pricePerNight: 220,
        guest: {
          id: "g9",
          name: "Fernando Lopez",
          braceletCode: "BR009",
          checkIn: "12/01/2024",
          checkOut: "17/01/2024",
          roomId: "16",
          totalCharges: 1100,
          pendingCharges: 150,
        },
      },
    ];

    setRooms(mockRooms);
  }, []);

  const filteredRooms = rooms.filter((room) => {
    if (viewFilter !== "all" && room.status !== viewFilter) return false;
    if (floorFilter !== "all" && room.floor.toString() !== floorFilter)
      return false;
    return true;
  });

  const floors = Array.from(new Set(rooms.map((room) => room.floor))).sort();
  const roomStats = {
    total: rooms.length,
    occupied: rooms.filter((r) => r.status === "occupied").length,
    available: rooms.filter((r) => r.status === "available").length,
    checkout: rooms.filter((r) => r.status === "checkout").length,
    maintenance: rooms.filter((r) => r.status === "maintenance").length,
  };

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case "suite":
        return "🏛️";
      case "familiar":
        return "🏨";
      case "doble":
        return "🏡";
      default:
        return "🏠";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Vista del Hotel
              </h1>
              <p className="text-muted-foreground">
                Visualización de habitaciones y ocupación por piso
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={viewFilter} onValueChange={setViewFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="available">Disponibles</SelectItem>
                  <SelectItem value="occupied">Ocupadas</SelectItem>
                  <SelectItem value="checkout">Check-out</SelectItem>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                </SelectContent>
              </Select>
              <Select value={floorFilter} onValueChange={setFloorFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filtrar piso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {floors.map((floor) => (
                    <SelectItem key={floor} value={floor.toString()}>
                      Piso {floor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{roomStats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {roomStats.occupied}
                </div>
                <div className="text-sm text-muted-foreground">Ocupadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {roomStats.available}
                </div>
                <div className="text-sm text-muted-foreground">Disponibles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {roomStats.checkout}
                </div>
                <div className="text-sm text-muted-foreground">Check-out</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {roomStats.maintenance}
                </div>
                <div className="text-sm text-muted-foreground">
                  Mantenimiento
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotel Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Hotel Visualization */}
            <div className="xl:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Distribución del Hotel</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {floors
                      .slice()
                      .reverse()
                      .map((floor) => {
                        const floorRooms = filteredRooms.filter(
                          (room) => room.floor === floor,
                        );
                        return (
                          <div key={floor} className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold">
                                Piso {floor}
                              </h3>
                              <Badge variant="outline">
                                {floorRooms.length} habitaciones
                              </Badge>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                              {floorRooms.map((room) => (
                                <div
                                  key={room.id}
                                  className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-md ${
                                    selectedRoom?.id === room.id
                                      ? "border-primary bg-primary/10"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  onClick={() => setSelectedRoom(room)}
                                >
                                  <div className="text-center space-y-1">
                                    <div className="text-2xl">
                                      {getRoomTypeIcon(room.type)}
                                    </div>
                                    <div className="font-semibold text-sm">
                                      {room.number}
                                    </div>
                                    <div
                                      className={`w-full h-2 rounded-full ${
                                        statusColors[room.status]
                                      }`}
                                    />
                                    {room.guest && (
                                      <div className="text-xs text-muted-foreground truncate">
                                        {room.guest.name.split(" ")[0]}
                                      </div>
                                    )}
                                    {room.type === "suite" && (
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Legend */}
                  <div className="mt-8 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-3">Leyenda</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Disponible</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-sm">Ocupada</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-sm">Check-out</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-500 rounded"></div>
                        <span className="text-sm">Mantenimiento</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>🏠 Simple</div>
                        <div>🏡 Doble</div>
                        <div>🏨 Familiar</div>
                        <div>🏛️ Suite</div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        🟡 = Suite Premium con comodidades exclusivas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Room Details */}
            <div className="space-y-6">
              {selectedRoom ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Habitación {selectedRoom.number}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Tipo:</span>
                        <Badge variant="outline">
                          {roomTypeLabels[selectedRoom.type]}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Estado:</span>
                        <Badge
                          variant={
                            selectedRoom.status === "available"
                              ? "default"
                              : selectedRoom.status === "occupied"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {statusLabels[selectedRoom.status]}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Piso:</span>
                        <span>{selectedRoom.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Tarifa:</span>
                        <span>${selectedRoom.pricePerNight}/noche</span>
                      </div>
                    </div>

                    <Separator />

                    {selectedRoom.guest && (
                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Huésped Actual
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div>{selectedRoom.guest.name}</div>
                          <div>Check-in: {selectedRoom.guest.checkIn}</div>
                          <div>Check-out: {selectedRoom.guest.checkOut}</div>
                          <div>Código: {selectedRoom.guest.braceletCode}</div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-semibold">Comodidades</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {amenitiesData[selectedRoom.type].map((amenity) => {
                          const IconComponent =
                            amenityIcons[amenity as keyof typeof amenityIcons];
                          return (
                            <div
                              key={amenity}
                              className="flex items-center space-x-2 text-sm"
                            >
                              {IconComponent && (
                                <IconComponent className="h-4 w-4" />
                              )}
                              <span>{amenity}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {selectedRoom.type === "suite" && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Suite Premium
                          </span>
                        </div>
                        <div className="text-xs text-yellow-700 mt-1">
                          Incluye servicios VIP y comodidades exclusivas
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Selecciona una Habitación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Haz clic en cualquier habitación para ver información
                      detallada, estado de ocupación y comodidades disponibles.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* View Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Vista del Hotel</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      📱 <strong>Interactiva:</strong> Clic para detalles
                    </div>
                    <div>
                      🏢 <strong>Por pisos:</strong> Organización vertical
                    </div>
                    <div>
                      🎨 <strong>Colores:</strong> Estado visual inmediato
                    </div>
                    <div>
                      🔍 <strong>Filtros:</strong> Por estado y piso
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
