import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { StatsCards } from "@/components/StatsCards";
import { RoomCalendar } from "@/components/RoomCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  QrCode,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Room, DashboardStats } from "@shared/api";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 24,
    occupiedRooms: 18,
    checkoutsToday: 5,
    dailyRevenue: 12500,
    pendingCharges: 2800,
    averageStay: 3.2,
  });

  const [rooms, setRooms] = useState<Room[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
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
    ];

    setRooms(mockRooms);
  }, []);

  const refreshData = () => {
    setLastUpdate(new Date());
    // In a real app, this would fetch fresh data from the API
  };

  const handleRoomUpdate = (roomId: string, updates: Partial<Room>) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, ...updates } : room,
      ),
    );

    // Update stats when room status changes
    if (updates.status === "occupied") {
      setStats((prevStats) => ({
        ...prevStats,
        occupiedRooms: prevStats.occupiedRooms + 1,
      }));
    }
  };

  const checkoutCount = rooms.filter(
    (room) => room.status === "checkout",
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Dashboard Principal
              </h1>
              <p className="text-muted-foreground">
                Gestión de huéspedes y habitaciones en tiempo real
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-xs">
                Última actualización: {lastUpdate.toLocaleTimeString("es-ES")}
              </Badge>
              <Button onClick={refreshData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                Escanear Pulsera
              </Button>
            </div>
          </div>

          {/* Alerts */}
          {checkoutCount > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Hay {checkoutCount} habitaciones pendientes de check-out que
                requieren atención.
              </AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <StatsCards data={stats} />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Room Calendar */}
            <div className="xl:col-span-3">
              <RoomCalendar rooms={rooms} onRoomUpdate={handleRoomUpdate} />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/scanner">
                    <Button className="w-full justify-start" variant="outline">
                      <QrCode className="h-4 w-4 mr-2" />
                      Escanear Pulsera
                    </Button>
                  </Link>
                  <Link to="/reportes">
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Reportes
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Análisis de Ingresos
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Check-in Hab. 205</span>
                      <Badge variant="secondary">10:30</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cargo POS $45</span>
                      <Badge variant="secondary">10:15</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Check-out Hab. 102</span>
                      <Badge variant="secondary">09:45</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pago procesado $280</span>
                      <Badge variant="secondary">09:30</Badge>
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
