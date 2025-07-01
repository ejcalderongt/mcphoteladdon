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
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  Plus,
  MapPin,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

interface Reservation {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: "simple" | "doble" | "suite" | "familiar";
  checkIn: Date;
  checkOut: Date;
  guestCount: number;
  status: "confirmed" | "pending" | "checkedIn" | "checkedOut";
  braceletCode: string;
  checkInTime?: string;
  checkOutTime?: string;
}

const roomTypeLabels = {
  simple: "Simple",
  doble: "Doble",
  suite: "Suite",
  familiar: "Familiar",
};

const statusColors = {
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  checkedIn: "bg-green-100 text-green-800 border-green-200",
  checkedOut: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusLabels = {
  confirmed: "Confirmada",
  pending: "Pendiente",
  checkedIn: "Check-in",
  checkedOut: "Check-out",
};

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");

  // Mock reservations data
  const [reservations] = useState<Reservation[]>([
    {
      id: "1",
      guestName: "Carlos Mendez",
      roomNumber: "101",
      roomType: "simple",
      checkIn: new Date(2024, 0, 15), // Jan 15
      checkOut: new Date(2024, 0, 18), // Jan 18
      guestCount: 1,
      status: "checkedIn",
      braceletCode: "BR001",
      checkInTime: "15:00",
      checkOutTime: "11:00",
    },
    {
      id: "2",
      guestName: "Ana Rodriguez",
      roomNumber: "102",
      roomType: "doble",
      checkIn: new Date(2024, 0, 14), // Jan 14
      checkOut: new Date(2024, 0, 17), // Jan 17
      guestCount: 2,
      status: "checkedOut",
      braceletCode: "BR002",
      checkInTime: "14:00",
      checkOutTime: "10:30",
    },
    {
      id: "3",
      guestName: "Maria Garcia",
      roomNumber: "201",
      roomType: "suite",
      checkIn: new Date(2024, 0, 20), // Jan 20
      checkOut: new Date(2024, 0, 25), // Jan 25
      guestCount: 2,
      status: "confirmed",
      braceletCode: "BR003",
      checkInTime: "16:00",
      checkOutTime: "12:00",
    },
    {
      id: "4",
      guestName: "Luis Martinez",
      roomNumber: "105",
      roomType: "familiar",
      checkIn: new Date(2024, 0, 22), // Jan 22
      checkOut: new Date(2024, 0, 26), // Jan 26
      guestCount: 4,
      status: "confirmed",
      braceletCode: "BR004",
      checkInTime: "15:30",
      checkOutTime: "11:30",
    },
    {
      id: "5",
      guestName: "Isabella Torres",
      roomNumber: "301",
      roomType: "suite",
      checkIn: new Date(2024, 0, 25), // Jan 25
      checkOut: new Date(2024, 0, 30), // Jan 30
      guestCount: 2,
      status: "pending",
      braceletCode: "BR005",
      checkInTime: "14:30",
      checkOutTime: "11:00",
    },
  ]);

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  // Get the first day of the week (Sunday = 0)
  const firstDayOfWeek = startDate.getDay();
  const daysToAdd = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - (firstDayOfWeek - i));
    return date;
  });

  // Get days after month to complete the week
  const lastDayOfWeek = endDate.getDay();
  const daysToComplete = Array.from({ length: 6 - lastDayOfWeek }, (_, i) => {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() + (i + 1));
    return date;
  });

  const calendarDays = [...daysToAdd, ...daysInMonth, ...daysToComplete];

  const getReservationsForDay = (date: Date) => {
    return reservations.filter((reservation) => {
      const checkIn = reservation.checkIn;
      const checkOut = reservation.checkOut;
      return date >= checkIn && date <= checkOut;
    });
  };

  const getCheckInsForDay = (date: Date) => {
    return reservations.filter((reservation) =>
      isSameDay(reservation.checkIn, date),
    );
  };

  const getCheckOutsForDay = (date: Date) => {
    return reservations.filter((reservation) =>
      isSameDay(reservation.checkOut, date),
    );
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Calendario de Reservaciones
              </h1>
              <p className="text-muted-foreground">
                Vista mensual de todas las reservaciones y ocupación
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mes</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="day">Día</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Reserva
              </Button>
            </div>
          </div>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {format(currentDate, "MMMM yyyy", { locale: es })}
                  </span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Hoy
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Legend */}
              <div className="flex items-center space-x-4 mb-6 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                  <span>Check-in</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded"></div>
                  <span>Check-out</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
                  <span>Confirmada</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
                  <span>Pendiente</span>
                </div>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((date, index) => {
                  const dayReservations = getReservationsForDay(date);
                  const checkIns = getCheckInsForDay(date);
                  const checkOuts = getCheckOutsForDay(date);

                  return (
                    <div
                      key={index}
                      className={`min-h-32 p-2 border rounded-lg ${
                        isToday(date)
                          ? "bg-primary/5 border-primary"
                          : "border-border"
                      } ${
                        !isCurrentMonth(date) ? "bg-muted/30" : "bg-background"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm ${
                            isToday(date)
                              ? "font-bold text-primary"
                              : isCurrentMonth(date)
                                ? "text-foreground"
                                : "text-muted-foreground"
                          }`}
                        >
                          {date.getDate()}
                        </span>
                        {(checkIns.length > 0 || checkOuts.length > 0) && (
                          <div className="flex space-x-1">
                            {checkIns.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-1 py-0 bg-green-100 text-green-800"
                              >
                                In {checkIns.length}
                              </Badge>
                            )}
                            {checkOuts.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-1 py-0 bg-red-100 text-red-800"
                              >
                                Out {checkOuts.length}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        {dayReservations.slice(0, 3).map((reservation) => (
                          <div
                            key={reservation.id}
                            className={`p-1 rounded text-xs border ${
                              statusColors[reservation.status]
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium truncate">
                                {reservation.roomNumber}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{reservation.guestCount}</span>
                              </div>
                            </div>
                            <div className="truncate">
                              {reservation.guestName}
                            </div>
                            {(isSameDay(reservation.checkIn, date) ||
                              isSameDay(reservation.checkOut, date)) && (
                              <div className="flex items-center space-x-1 mt-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {isSameDay(reservation.checkIn, date)
                                    ? reservation.checkInTime
                                    : reservation.checkOutTime}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}

                        {dayReservations.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{dayReservations.length - 3} más
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Check-ins Hoy</p>
                    <p className="text-2xl font-bold">
                      {getCheckInsForDay(new Date()).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium">Check-outs Hoy</p>
                    <p className="text-2xl font-bold">
                      {getCheckOutsForDay(new Date()).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Reservas Activas</p>
                    <p className="text-2xl font-bold">
                      {
                        reservations.filter((r) => r.status === "checkedIn")
                          .length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Pendientes</p>
                    <p className="text-2xl font-bold">
                      {
                        reservations.filter((r) => r.status === "pending")
                          .length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
