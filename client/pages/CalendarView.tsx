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

  // Mock reservations data - comprehensive calendar data
  const [reservations] = useState<Reservation[]>([
    // Week 1 (Jan 1-7)
    {
      id: "1",
      guestName: "Carlos Mendez",
      roomNumber: "101",
      roomType: "simple",
      checkIn: new Date(2024, 0, 2),
      checkOut: new Date(2024, 0, 5),
      guestCount: 1,
      status: "checkedOut",
      braceletCode: "BR001",
      checkInTime: "15:00",
      checkOutTime: "11:00",
    },
    {
      id: "2",
      guestName: "Ana Rodriguez",
      roomNumber: "102",
      roomType: "doble",
      checkIn: new Date(2024, 0, 1),
      checkOut: new Date(2024, 0, 4),
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
      checkIn: new Date(2024, 0, 3),
      checkOut: new Date(2024, 0, 8),
      guestCount: 2,
      status: "checkedOut",
      braceletCode: "BR003",
      checkInTime: "16:00",
      checkOutTime: "12:00",
    },
    {
      id: "4",
      guestName: "Luis Martinez",
      roomNumber: "105",
      roomType: "familiar",
      checkIn: new Date(2024, 0, 5),
      checkOut: new Date(2024, 0, 9),
      guestCount: 4,
      status: "checkedOut",
      braceletCode: "BR004",
      checkInTime: "15:30",
      checkOutTime: "11:30",
    },

    // Week 2 (Jan 8-14)
    {
      id: "5",
      guestName: "Isabella Torres",
      roomNumber: "301",
      roomType: "suite",
      checkIn: new Date(2024, 0, 8),
      checkOut: new Date(2024, 0, 12),
      guestCount: 2,
      status: "checkedOut",
      braceletCode: "BR005",
      checkInTime: "14:30",
      checkOutTime: "11:00",
    },
    {
      id: "6",
      guestName: "Pedro Silva",
      roomNumber: "103",
      roomType: "simple",
      checkIn: new Date(2024, 0, 10),
      checkOut: new Date(2024, 0, 13),
      guestCount: 1,
      status: "checkedOut",
      braceletCode: "BR006",
      checkInTime: "16:30",
      checkOutTime: "10:00",
    },
    {
      id: "7",
      guestName: "Carmen Ruiz",
      roomNumber: "202",
      roomType: "doble",
      checkIn: new Date(2024, 0, 12),
      checkOut: new Date(2024, 0, 16),
      guestCount: 2,
      status: "checkedOut",
      braceletCode: "BR007",
      checkInTime: "15:00",
      checkOutTime: "11:30",
    },

    // Week 3 (Jan 15-21) - Current reservations
    {
      id: "8",
      guestName: "Roberto Diaz",
      roomNumber: "104",
      roomType: "doble",
      checkIn: new Date(2024, 0, 15),
      checkOut: new Date(2024, 0, 18),
      guestCount: 2,
      status: "checkedIn",
      braceletCode: "BR008",
      checkInTime: "14:00",
      checkOutTime: "11:00",
    },
    {
      id: "9",
      guestName: "Sofia Morales",
      roomNumber: "203",
      roomType: "suite",
      checkIn: new Date(2024, 0, 16),
      checkOut: new Date(2024, 0, 21),
      guestCount: 3,
      status: "checkedIn",
      braceletCode: "BR009",
      checkInTime: "15:30",
      checkOutTime: "12:00",
    },
    {
      id: "10",
      guestName: "Alejandro Vega",
      roomNumber: "106",
      roomType: "familiar",
      checkIn: new Date(2024, 0, 17),
      checkOut: new Date(2024, 0, 20),
      guestCount: 4,
      status: "checkedIn",
      braceletCode: "BR010",
      checkInTime: "16:00",
      checkOutTime: "11:30",
    },
    {
      id: "11",
      guestName: "Patricia Luna",
      roomNumber: "302",
      roomType: "suite",
      checkIn: new Date(2024, 0, 18),
      checkOut: new Date(2024, 0, 22),
      guestCount: 2,
      status: "checkedIn",
      braceletCode: "BR011",
      checkInTime: "14:30",
      checkOutTime: "11:00",
    },

    // Week 4 (Jan 22-28) - Mix of current and future
    {
      id: "12",
      guestName: "Fernando Castro",
      roomNumber: "107",
      roomType: "simple",
      checkIn: new Date(2024, 0, 22),
      checkOut: new Date(2024, 0, 25),
      guestCount: 1,
      status: "confirmed",
      braceletCode: "BR012",
      checkInTime: "15:00",
      checkOutTime: "10:30",
    },
    {
      id: "13",
      guestName: "Valentina Herrera",
      roomNumber: "204",
      roomType: "doble",
      checkIn: new Date(2024, 0, 23),
      checkOut: new Date(2024, 0, 27),
      guestCount: 2,
      status: "confirmed",
      braceletCode: "BR013",
      checkInTime: "16:30",
      checkOutTime: "11:00",
    },
    {
      id: "14",
      guestName: "Familia Gonzalez",
      roomNumber: "108",
      roomType: "familiar",
      checkIn: new Date(2024, 0, 24),
      checkOut: new Date(2024, 0, 29),
      guestCount: 5,
      status: "confirmed",
      braceletCode: "BR014",
      checkInTime: "15:30",
      checkOutTime: "12:00",
    },
    {
      id: "15",
      guestName: "Miguel Torres",
      roomNumber: "303",
      roomType: "suite",
      checkIn: new Date(2024, 0, 26),
      checkOut: new Date(2024, 0, 31),
      guestCount: 2,
      status: "confirmed",
      braceletCode: "BR015",
      checkInTime: "14:00",
      checkOutTime: "11:30",
    },

    // Week 5 (Jan 29-31) - Future reservations
    {
      id: "16",
      guestName: "Andrea Castillo",
      roomNumber: "109",
      roomType: "simple",
      checkIn: new Date(2024, 0, 29),
      checkOut: new Date(2024, 1, 2), // Feb 2
      guestCount: 1,
      status: "confirmed",
      braceletCode: "BR016",
      checkInTime: "15:00",
      checkOutTime: "10:00",
    },
    {
      id: "17",
      guestName: "Diego Ramirez",
      roomNumber: "205",
      roomType: "doble",
      checkIn: new Date(2024, 0, 30),
      checkOut: new Date(2024, 1, 3), // Feb 3
      guestCount: 2,
      status: "pending",
      braceletCode: "BR017",
      checkInTime: "16:00",
      checkOutTime: "11:00",
    },

    // Some overlapping reservations for realistic density
    {
      id: "18",
      guestName: "Elena Rodriguez",
      roomNumber: "110",
      roomType: "simple",
      checkIn: new Date(2024, 0, 19),
      checkOut: new Date(2024, 0, 23),
      guestCount: 1,
      status: "checkedIn",
      braceletCode: "BR018",
      checkInTime: "15:00",
      checkOutTime: "10:30",
    },
    {
      id: "19",
      guestName: "Gabriel Martinez",
      roomNumber: "206",
      roomType: "doble",
      checkIn: new Date(2024, 0, 20),
      checkOut: new Date(2024, 0, 24),
      guestCount: 2,
      status: "checkedIn",
      braceletCode: "BR019",
      checkInTime: "14:30",
      checkOutTime: "11:30",
    },
    {
      id: "20",
      guestName: "Lucia Fernandez",
      roomNumber: "304",
      roomType: "suite",
      checkIn: new Date(2024, 0, 21),
      checkOut: new Date(2024, 0, 26),
      guestCount: 3,
      status: "checkedIn",
      braceletCode: "BR020",
      checkInTime: "16:30",
      checkOutTime: "12:00",
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
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-6 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-100 border-l-2 border-green-500 rounded"></div>
                  <span>Check-in</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-100 border-l-2 border-red-500 rounded"></div>
                  <span>Check-out</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-100 border-l-2 border-blue-500 rounded"></div>
                  <span>Ocupada</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-200 border border-green-300 rounded"></div>
                  <span>En hotel</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
                  <span>Confirmada</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded"></div>
                  <span>Pendiente</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-600 font-bold">→</span>
                  <span>Llegada</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-red-600 font-bold">←</span>
                  <span>Salida</span>
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
                      className={`min-h-40 p-1 border rounded-lg relative overflow-hidden ${
                        isToday(date)
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "border-border"
                      } ${
                        !isCurrentMonth(date) ? "bg-muted/30" : "bg-background"
                      }`}
                    >
                      {/* Date Header */}
                      <div className="flex items-center justify-between mb-1 sticky top-0 bg-inherit z-10">
                        <span
                          className={`text-sm font-medium ${
                            isToday(date)
                              ? "font-bold text-primary bg-primary/10 px-2 py-1 rounded-full"
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
                                className="text-xs px-1 py-0 bg-green-100 text-green-800 border-green-200"
                              >
                                ↓{checkIns.length}
                              </Badge>
                            )}
                            {checkOuts.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-1 py-0 bg-red-100 text-red-800 border-red-200"
                              >
                                ↑{checkOuts.length}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Reservations - Outlook Style */}
                      <div className="space-y-0.5 overflow-y-auto max-h-32">
                        {dayReservations
                          .slice(0, 5)
                          .map((reservation, resIndex) => {
                            const isCheckInDay = isSameDay(
                              reservation.checkIn,
                              date,
                            );
                            const isCheckOutDay = isSameDay(
                              reservation.checkOut,
                              date,
                            );
                            const isOngoing = !isCheckInDay && !isCheckOutDay;

                            return (
                              <div
                                key={reservation.id}
                                className={`
                                  relative p-1 rounded text-xs border-l-2
                                  ${statusColors[reservation.status]}
                                  ${isCheckInDay ? "border-l-green-500 bg-green-50" : ""}
                                  ${isCheckOutDay ? "border-l-red-500 bg-red-50" : ""}
                                  ${isOngoing ? "border-l-blue-500 bg-blue-50" : ""}
                                  hover:shadow-sm transition-shadow cursor-pointer
                                `}
                                title={`${reservation.guestName} - ${reservation.roomNumber} (${reservation.guestCount} huéspedes)`}
                              >
                                {/* Time indicator */}
                                {(isCheckInDay || isCheckOutDay) && (
                                  <div className="absolute top-0 right-0 text-xs font-mono bg-white/80 px-1 rounded-bl">
                                    {isCheckInDay
                                      ? reservation.checkInTime
                                      : reservation.checkOutTime}
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1 min-w-0 flex-1">
                                    <span className="font-medium text-xs truncate">
                                      {reservation.roomNumber}
                                    </span>
                                    {isCheckInDay && (
                                      <span className="text-green-600 font-bold">
                                        →
                                      </span>
                                    )}
                                    {isCheckOutDay && (
                                      <span className="text-red-600 font-bold">
                                        ←
                                      </span>
                                    )}
                                    {isOngoing && (
                                      <span className="text-blue-600">●</span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-1 flex-shrink-0">
                                    <Users className="h-3 w-3" />
                                    <span className="text-xs">
                                      {reservation.guestCount}
                                    </span>
                                  </div>
                                </div>

                                <div className="truncate text-xs mt-0.5">
                                  {reservation.guestName}
                                </div>

                                {/* Status indicator */}
                                <div className="flex items-center justify-between mt-0.5">
                                  <span
                                    className={`text-xs px-1 rounded ${
                                      reservation.status === "checkedIn"
                                        ? "bg-green-200 text-green-800"
                                        : reservation.status === "confirmed"
                                          ? "bg-blue-200 text-blue-800"
                                          : reservation.status === "pending"
                                            ? "bg-yellow-200 text-yellow-800"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                                  >
                                    {reservation.status === "checkedIn"
                                      ? "En hotel"
                                      : reservation.status === "confirmed"
                                        ? "Confirmada"
                                        : reservation.status === "pending"
                                          ? "Pendiente"
                                          : "Completada"}
                                  </span>

                                  {(isCheckInDay || isCheckOutDay) && (
                                    <div className="flex items-center space-x-1">
                                      <Clock className="h-3 w-3" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                        {dayReservations.length > 5 && (
                          <div className="text-xs text-muted-foreground text-center bg-muted/50 rounded p-1">
                            +{dayReservations.length - 5} más reservas
                          </div>
                        )}

                        {dayReservations.length === 0 &&
                          isCurrentMonth(date) && (
                            <div className="text-xs text-muted-foreground text-center opacity-50 py-2">
                              Sin reservas
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
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
                    <p className="text-sm font-medium">En Hotel</p>
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

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Total Reservas</p>
                    <p className="text-2xl font-bold">{reservations.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="text-sm font-medium">Huéspedes Total</p>
                    <p className="text-2xl font-bold">
                      {reservations.reduce((sum, r) => sum + r.guestCount, 0)}
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
