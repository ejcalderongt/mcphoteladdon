import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Bed,
  Clock,
  Download,
  Calendar,
  Star,
  ShoppingCart,
  PieChart,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data for reports
  const revenueByMonth = [
    { month: "Enero", revenue: 45000, occupancy: 75 },
    { month: "Febrero", revenue: 52000, occupancy: 82 },
    { month: "Marzo", revenue: 48000, occupancy: 78 },
    { month: "Abril", revenue: 58000, occupancy: 85 },
    { month: "Mayo", revenue: 62000, occupancy: 88 },
    { month: "Junio", revenue: 55000, occupancy: 80 },
  ];

  const roomTypeStats = [
    { type: "Simple", bookings: 145, revenue: 23200, avgStay: 2.1 },
    { type: "Doble", bookings: 98, revenue: 35280, avgStay: 3.2 },
    { type: "Suite", bookings: 32, revenue: 25600, avgStay: 4.5 },
    { type: "Familiar", bookings: 67, revenue: 30150, avgStay: 3.8 },
  ];

  const topGuests = [
    {
      name: "Carlos Mendez",
      visits: 8,
      totalSpent: 4500,
      avgStay: 3.2,
      lastVisit: "15/01/2024",
    },
    {
      name: "Ana Rodriguez",
      visits: 6,
      totalSpent: 3800,
      avgStay: 2.8,
      lastVisit: "20/01/2024",
    },
    {
      name: "Maria Garcia",
      visits: 5,
      totalSpent: 6200,
      avgStay: 4.1,
      lastVisit: "18/01/2024",
    },
    {
      name: "Luis Martinez",
      visits: 4,
      totalSpent: 2900,
      avgStay: 2.5,
      lastVisit: "22/01/2024",
    },
  ];

  const consumptionData = [
    { category: "Restaurante", amount: 15600, percentage: 35 },
    { category: "Bar", amount: 8900, percentage: 20 },
    { category: "Spa", amount: 6700, percentage: 15 },
    { category: "Room Service", amount: 5800, percentage: 13 },
    { category: "Lavandería", amount: 4200, percentage: 10 },
    { category: "Otros", amount: 3100, percentage: 7 },
  ];

  const peakHours = [
    { hour: "07:00 - 09:00", activity: "Check-out", count: 12 },
    { hour: "14:00 - 16:00", activity: "Check-in", count: 18 },
    { hour: "19:00 - 21:00", activity: "Restaurante", count: 45 },
    { hour: "21:00 - 23:00", activity: "Bar", count: 32 },
  ];

  const roomPerformance = [
    { room: "Suite 301", revenue: 8900, bookings: 15, rating: 4.8 },
    { room: "Habitación 205", revenue: 6700, bookings: 22, rating: 4.6 },
    { room: "Suite 401", revenue: 8200, bookings: 14, rating: 4.9 },
    { room: "Habitación 102", revenue: 5800, bookings: 28, rating: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Reportes y Análisis
              </h1>
              <p className="text-muted-foreground">
                Análisis completo del rendimiento del hotel
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mes</SelectItem>
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="year">Este Año</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ingresos Totales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$275,000</div>
                <p className="text-xs text-muted-foreground">
                  +18.2% vs mes anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ocupación Promedio
                </CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">81.5%</div>
                <p className="text-xs text-muted-foreground">
                  +5.3% vs mes anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Huéspedes Únicos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">
                  +12.1% vs mes anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Estancia Promedio
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 días</div>
                <p className="text-xs text-muted-foreground">
                  +0.4 días vs mes anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Tendencia de Ingresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByMonth.map((data, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium w-20">
                          {data.month}
                        </span>
                        <div className="flex-1 bg-muted rounded-full h-2 w-32">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${data.occupancy}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {data.occupancy}%
                        </span>
                      </div>
                      <Badge variant="secondary">
                        ${data.revenue.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Room Type Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Rendimiento por Tipo de Habitación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Reservas</TableHead>
                      <TableHead>Ingresos</TableHead>
                      <TableHead>Estancia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomTypeStats.map((room, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {room.type}
                        </TableCell>
                        <TableCell>{room.bookings}</TableCell>
                        <TableCell>${room.revenue.toLocaleString()}</TableCell>
                        <TableCell>{room.avgStay} días</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Guest Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Top Guests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Huéspedes VIP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topGuests.map((guest, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{guest.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {guest.visits} visitas • Última: {guest.lastVisit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${guest.totalSpent.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {guest.avgStay} días promedio
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Consumption Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Análisis de Consumos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consumptionData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium w-24">
                          {item.category}
                        </span>
                        <div className="flex-1 bg-muted rounded-full h-2 w-32">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">
                          {item.percentage}%
                        </span>
                      </div>
                      <Badge variant="outline">
                        ${item.amount.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operational Reports */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Peak Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Horas Pico de Actividad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Horario</TableHead>
                      <TableHead>Actividad</TableHead>
                      <TableHead>Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {peakHours.map((hour, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {hour.hour}
                        </TableCell>
                        <TableCell>{hour.activity}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{hour.count}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Performing Rooms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Habitaciones Más Rentables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Habitación</TableHead>
                      <TableHead>Ingresos</TableHead>
                      <TableHead>Reservas</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomPerformance.map((room, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {room.room}
                        </TableCell>
                        <TableCell>${room.revenue.toLocaleString()}</TableCell>
                        <TableCell>{room.bookings}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {room.rating}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Reportes Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Reporte Mensual</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Análisis de Huéspedes</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span>Estado Financiero</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>Comparativo Anual</span>
                </Button>
                <Link to="/analisis-geografico">
                  <Button variant="outline" className="h-20 flex-col w-full">
                    <MapPin className="h-6 w-6 mb-2" />
                    <span>Análisis Geográfico</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
