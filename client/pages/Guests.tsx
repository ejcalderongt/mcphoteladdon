import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Plus,
  Star,
  StarIcon,
  Search,
  Filter,
  Eye,
  Edit,
  Camera,
  Upload,
  Calendar,
  Gift,
  Phone,
  Mail,
  MapPin,
  Heart,
  AlertTriangle,
} from "lucide-react";
import type { Guest } from "@shared/api";

const mockGuests: Guest[] = [
  {
    id: "g1",
    name: "Carlos Mendez García",
    firstName: "Carlos",
    lastName: "Mendez García",
    email: "carlos.mendez@email.com",
    phone: "+502 5512 3456",
    braceletCode: "BR001",
    checkIn: "15/01/2024",
    checkOut: "18/01/2024",
    roomId: "101",
    totalCharges: 2400,
    pendingCharges: 50,
    rating: 5,
    totalVisits: 8,
    lastVisit: "15/01/2024",
    firstVisit: "15/03/2022",
    isVip: true,
    dateOfBirth: "1985-06-15",
    anniversary: "2010-09-20",
    nationality: "Guatemalteca",
    documentType: "id_card",
    documentNumber: "2345678901234",
    preferredRoomType: "suite",
    allergies: ["Mariscos"],
    specialRequests: ["Almohadas extra"],
    notes: "Cliente VIP de Guatemala, prefiere habitaciones con vista al mar",
    location: {
      department: "Guatemala",
      municipality: "Guatemala",
      region: "metropolitana",
      coordinates: { lat: 14.6349, lng: -90.5069 },
    },
    emergencyContact: {
      name: "María Mendez",
      phone: "+502 5576 5432",
      relationship: "Esposa",
    },
  },
  {
    id: "g2",
    name: "Ana Rodriguez López",
    firstName: "Ana",
    lastName: "Rodriguez López",
    email: "ana.rodriguez@email.com",
    phone: "+502 4512 3456",
    braceletCode: "BR002",
    checkIn: "14/01/2024",
    checkOut: "17/01/2024",
    roomId: "102",
    totalCharges: 1800,
    pendingCharges: 120,
    rating: 4,
    totalVisits: 3,
    lastVisit: "14/01/2024",
    firstVisit: "20/08/2023",
    isVip: false,
    dateOfBirth: "1990-11-08",
    nationality: "Guatemalteca",
    documentType: "id_card",
    documentNumber: "3456789012345",
    preferredRoomType: "doble",
    allergies: [],
    specialRequests: ["Check-in tardío"],
    notes: "Viaja frecuentemente por trabajo desde Quetzaltenango",
    location: {
      department: "Quetzaltenango",
      municipality: "Quetzaltenango",
      region: "oeste",
      coordinates: { lat: 14.8347, lng: -91.5184 },
    },
    emergencyContact: {
      name: "Luis Rodriguez",
      phone: "+502 7612 3456",
      relationship: "Hermano",
    },
  },
  {
    id: "g3",
    name: "Maria Garcia Santos",
    firstName: "Maria",
    lastName: "Garcia Santos",
    email: "maria.garcia@email.com",
    phone: "+502 3345 6789",
    braceletCode: "BR003",
    checkIn: "16/01/2024",
    checkOut: "20/01/2024",
    roomId: "201",
    totalCharges: 3200,
    pendingCharges: 0,
    rating: 5,
    totalVisits: 12,
    lastVisit: "16/01/2024",
    firstVisit: "10/01/2021",
    isVip: true,
    dateOfBirth: "1978-03-22",
    anniversary: "2005-12-15",
    nationality: "Guatemalteca",
    documentType: "id_card",
    documentNumber: "4567890123456",
    preferredRoomType: "suite",
    allergies: ["Lactosa"],
    specialRequests: ["Cena romántica", "Decoración especial"],
    notes:
      "Cliente frecuente de Antigua Guatemala, celebra aniversario cada año",
    location: {
      department: "Sacatepéquez",
      municipality: "Antigua Guatemala",
      region: "sur",
      coordinates: { lat: 14.5586, lng: -90.7339 },
    },
    emergencyContact: {
      name: "Roberto Garcia",
      phone: "+502 5987 6543",
      relationship: "Esposo",
    },
  },
  {
    id: "g4",
    name: "Luis Martinez Hernández",
    firstName: "Luis",
    lastName: "Martinez Hernández",
    email: "luis.martinez@email.com",
    phone: "+502 4456 7890",
    braceletCode: "BR004",
    checkIn: "15/01/2024",
    checkOut: "19/01/2024",
    roomId: "106",
    totalCharges: 2000,
    pendingCharges: 200,
    rating: 4,
    totalVisits: 5,
    lastVisit: "15/01/2024",
    firstVisit: "05/07/2022",
    isVip: false,
    dateOfBirth: "1982-09-10",
    nationality: "Guatemalteca",
    documentType: "driver_license",
    documentNumber: "5678901234567",
    preferredRoomType: "familiar",
    allergies: [],
    specialRequests: ["Cunas para niños"],
    notes: "Familia de Escuintla, viaja con 2 niños pequeños",
    location: {
      department: "Escuintla",
      municipality: "Escuintla",
      region: "sur",
      coordinates: { lat: 14.3054, lng: -90.7849 },
    },
    emergencyContact: {
      name: "Patricia Martinez",
      phone: "+502 5543 2109",
      relationship: "Esposa",
    },
  },
  {
    id: "g5",
    name: "Isabella Torres Ruiz",
    firstName: "Isabella",
    lastName: "Torres Ruiz",
    email: "isabella.torres@email.com",
    phone: "+502 5567 8901",
    braceletCode: "BR005",
    checkIn: "14/01/2024",
    checkOut: "21/01/2024",
    roomId: "203",
    totalCharges: 4200,
    pendingCharges: 350,
    rating: 5,
    totalVisits: 1,
    lastVisit: "14/01/2024",
    firstVisit: "14/01/2024",
    isVip: false,
    dateOfBirth: "1992-07-18",
    nationality: "Guatemalteca",
    documentType: "passport",
    documentNumber: "6789012345678",
    preferredRoomType: "suite",
    allergies: ["Gluten"],
    specialRequests: ["Menú sin gluten"],
    notes: "Cliente nuevo de Flores, Petén, primera visita",
    location: {
      department: "Petén",
      municipality: "Flores",
      region: "norte",
      coordinates: { lat: 16.9274, lng: -89.8906 },
    },
    emergencyContact: {
      name: "Roberto Torres",
      phone: "+502 5987 6543",
      relationship: "Padre",
    },
  },
  {
    id: "g6",
    name: "Pedro Silva González",
    firstName: "Pedro",
    lastName: "Silva González",
    email: "pedro.silva@email.com",
    phone: "+502 4678 9012",
    braceletCode: "BR006",
    checkIn: "16/01/2024",
    checkOut: "18/01/2024",
    roomId: "105",
    totalCharges: 800,
    pendingCharges: 40,
    rating: 3,
    totalVisits: 2,
    lastVisit: "16/01/2024",
    firstVisit: "20/12/2023",
    isVip: false,
    dateOfBirth: "1995-12-05",
    nationality: "Guatemalteca",
    documentType: "id_card",
    documentNumber: "7890123456789",
    preferredRoomType: "simple",
    allergies: [],
    specialRequests: [],
    notes: "Cliente joven de Cobán, viajes cortos de fin de semana",
    location: {
      department: "Alta Verapaz",
      municipality: "Cobán",
      region: "norte",
      coordinates: { lat: 15.4781, lng: -90.3783 },
    },
    emergencyContact: {
      name: "Carmen Silva",
      phone: "+502 4210 9876",
      relationship: "Madre",
    },
  },
  {
    id: "g7",
    name: "Carmen Ruiz Vega",
    firstName: "Carmen",
    lastName: "Ruiz Vega",
    email: "carmen.ruiz@email.com",
    phone: "+502 5789 0123",
    braceletCode: "BR007",
    checkIn: "15/01/2024",
    checkOut: "22/01/2024",
    roomId: "302",
    totalCharges: 5600,
    pendingCharges: 250,
    rating: 5,
    totalVisits: 15,
    lastVisit: "15/01/2024",
    firstVisit: "08/02/2020",
    isVip: true,
    dateOfBirth: "1975-04-30",
    anniversary: "1998-06-12",
    nationality: "Guatemalteca",
    documentType: "passport",
    documentNumber: "8901234567890",
    preferredRoomType: "suite",
    allergies: ["Frutos secos"],
    specialRequests: ["Spa incluido", "Vista premium"],
    notes: "Cliente VIP de Huehuetenango, prefiere estancias largas",
    location: {
      department: "Huehuetenango",
      municipality: "Huehuetenango",
      region: "noroeste",
      coordinates: { lat: 15.3198, lng: -91.4695 },
    },
    emergencyContact: {
      name: "Fernando Ruiz",
      phone: "+502 5345 6789",
      relationship: "Esposo",
    },
  },
  {
    id: "g8",
    name: "Roberto Diaz Morales",
    firstName: "Roberto",
    lastName: "Diaz Morales",
    email: "roberto.diaz@email.com",
    phone: "+502 4890 1234",
    braceletCode: "BR008",
    checkIn: "13/01/2024",
    checkOut: "17/01/2024",
    roomId: "204",
    totalCharges: 2400,
    pendingCharges: 80,
    rating: 4,
    totalVisits: 6,
    lastVisit: "13/01/2024",
    firstVisit: "15/11/2022",
    isVip: false,
    dateOfBirth: "1987-08-14",
    nationality: "Guatemalteca",
    documentType: "id_card",
    documentNumber: "9012345678901",
    preferredRoomType: "doble",
    allergies: [],
    specialRequests: ["Servicio de lavandería"],
    notes: "Viajero de negocios de Puerto Barrios, frecuente",
    location: {
      department: "Izabal",
      municipality: "Puerto Barrios",
      region: "este",
      coordinates: { lat: 15.7307, lng: -88.5978 },
    },
    emergencyContact: {
      name: "Sandra Diaz",
      phone: "+502 4456 7890",
      relationship: "Hermana",
    },
  },
];

export default function Guests() {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewGuestModalOpen, setIsNewGuestModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterVip, setFilterVip] = useState("all");

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.braceletCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === "all" || guest.rating.toString() === filterRating;

    const matchesVip =
      filterVip === "all" ||
      (filterVip === "vip" && guest.isVip) ||
      (filterVip === "regular" && !guest.isVip);

    return matchesSearch && matchesRating && matchesVip;
  });

  const handleViewGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsViewModalOpen(true);
  };

  const handleEditGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsEditModalOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  const getGuestTypeLabel = (guest: Guest) => {
    if (guest.totalVisits === 1) return "Nuevo";
    if (guest.isVip) return "VIP";
    if (guest.totalVisits >= 10) return "Frecuente";
    return "Regular";
  };

  const getGuestTypeColor = (guest: Guest) => {
    if (guest.totalVisits === 1) return "bg-blue-100 text-blue-800";
    if (guest.isVip) return "bg-purple-100 text-purple-800";
    if (guest.totalVisits >= 10) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const getUpcomingEvents = (guest: Guest) => {
    const events = [];
    const today = new Date();
    const thisYear = today.getFullYear();

    if (guest.dateOfBirth) {
      const birthday = new Date(`${thisYear}-${guest.dateOfBirth.slice(5)}`);
      if (birthday >= today) {
        events.push({ type: "birthday", date: birthday, label: "Cumpleaños" });
      }
    }

    if (guest.anniversary) {
      const anniversary = new Date(`${thisYear}-${guest.anniversary.slice(5)}`);
      if (anniversary >= today) {
        events.push({
          type: "anniversary",
          date: anniversary,
          label: "Aniversario",
        });
      }
    }

    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
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
                Gestión de Huéspedes
              </h1>
              <p className="text-muted-foreground">
                Administra la información de huéspedes y su historial de
                estancias
              </p>
            </div>
            <Button onClick={() => setIsNewGuestModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Huésped
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre, email o código de pulsera..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Calificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="5">5 estrellas</SelectItem>
                    <SelectItem value="4">4 estrellas</SelectItem>
                    <SelectItem value="3">3 estrellas</SelectItem>
                    <SelectItem value="2">2 estrellas</SelectItem>
                    <SelectItem value="1">1 estrella</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterVip} onValueChange={setFilterVip}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Guests Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Lista de Huéspedes ({filteredGuests.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Huésped</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Calificación</TableHead>
                    <TableHead>Visitas</TableHead>
                    <TableHead>Última Visita</TableHead>
                    <TableHead>Eventos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.map((guest) => {
                    const upcomingEvents = getUpcomingEvents(guest);
                    return (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                              {guest.profileImageUrl ? (
                                <img
                                  src={guest.profileImageUrl}
                                  alt={guest.name}
                                  className="aspect-square h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                  {guest.firstName[0]}
                                  {guest.lastName.split(" ")[0][0]}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{guest.name}</div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={getGuestTypeColor(guest)}
                                  variant="secondary"
                                >
                                  {getGuestTypeLabel(guest)}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {guest.braceletCode}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{guest.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{guest.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{guest.nationality}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {renderStars(guest.rating)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-semibold">
                              {guest.totalVisits}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              visitas
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{guest.lastVisit}</div>
                            {guest.totalVisits === 1 && (
                              <Badge variant="outline" className="text-xs mt-1">
                                Primera visita
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {upcomingEvents.slice(0, 2).map((event, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-1 text-xs"
                              >
                                {event.type === "birthday" ? (
                                  <Gift className="h-3 w-3 text-pink-500" />
                                ) : (
                                  <Heart className="h-3 w-3 text-red-500" />
                                )}
                                <span>
                                  {event.label}{" "}
                                  {event.date.toLocaleDateString("es-ES", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewGuest(guest)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditGuest(guest)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Guest Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Perfil del Huésped</DialogTitle>
          </DialogHeader>

          {selectedGuest && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start space-x-4">
                <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full bg-muted">
                  {selectedGuest.profileImageUrl ? (
                    <img
                      src={selectedGuest.profileImageUrl}
                      alt={selectedGuest.name}
                      className="aspect-square h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-medium">
                      {selectedGuest.firstName[0]}
                      {selectedGuest.lastName.split(" ")[0][0]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-bold">{selectedGuest.name}</h2>
                    <Badge
                      className={getGuestTypeColor(selectedGuest)}
                      variant="secondary"
                    >
                      {getGuestTypeLabel(selectedGuest)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    {renderStars(selectedGuest.rating)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({selectedGuest.rating}/5)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Total de visitas
                      </Label>
                      <div className="font-semibold">
                        {selectedGuest.totalVisits}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Cliente desde
                      </Label>
                      <div className="font-semibold">
                        {selectedGuest.firstVisit}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Email
                      </Label>
                      <div>{selectedGuest.email}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Teléfono
                      </Label>
                      <div>{selectedGuest.phone}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Nacionalidad
                      </Label>
                      <div>{selectedGuest.nationality}</div>
                    </div>
                    {selectedGuest.location && (
                      <>
                        <div>
                          <Label className="text-sm text-muted-foreground">
                            Departamento
                          </Label>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedGuest.location.department}</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">
                            Municipio
                          </Label>
                          <div>{selectedGuest.location.municipality}</div>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">
                            Región
                          </Label>
                          <Badge variant="outline" className="capitalize">
                            {selectedGuest.location.region}
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Información Personal
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Fecha de Nacimiento
                      </Label>
                      <div>{selectedGuest.dateOfBirth}</div>
                    </div>
                    {selectedGuest.anniversary && (
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Aniversario
                        </Label>
                        <div>{selectedGuest.anniversary}</div>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Tipo de Habitación Preferida
                      </Label>
                      <div className="capitalize">
                        {selectedGuest.preferredRoomType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Document Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Documentación e Identificación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Tipo de Documento
                      </Label>
                      <div className="capitalize">
                        {selectedGuest.documentType?.replace("_", " ")}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Número de Documento
                      </Label>
                      <div>{selectedGuest.documentNumber}</div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Imagen del Documento
                    </Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      {selectedGuest.documentImageUrl ? (
                        <img
                          src={selectedGuest.documentImageUrl}
                          alt="Documento"
                          className="max-h-32 mx-auto"
                        />
                      ) : (
                        <div className="text-muted-foreground">
                          <Camera className="h-8 w-8 mx-auto mb-2" />
                          <p>No hay imagen del documento</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Preferences and Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Alergias y Restricciones
                  </h3>
                  {selectedGuest.allergies &&
                  selectedGuest.allergies.length > 0 ? (
                    <div className="space-y-2">
                      {selectedGuest.allergies.map((allergy, idx) => (
                        <Badge key={idx} variant="destructive" className="mr-2">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Sin alergias reportadas
                    </p>
                  )}

                  <h4 className="font-semibold mt-4">Solicitudes Especiales</h4>
                  {selectedGuest.specialRequests &&
                  selectedGuest.specialRequests.length > 0 ? (
                    <ul className="space-y-1">
                      {selectedGuest.specialRequests.map((request, idx) => (
                        <li key={idx} className="text-sm">
                          • {request}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Sin solicitudes especiales
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Contacto de Emergencia
                  </h3>
                  {selectedGuest.emergencyContact && (
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Nombre
                        </Label>
                        <div>{selectedGuest.emergencyContact.name}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Teléfono
                        </Label>
                        <div>{selectedGuest.emergencyContact.phone}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Relación
                        </Label>
                        <div>{selectedGuest.emergencyContact.relationship}</div>
                      </div>
                    </div>
                  )}

                  <h4 className="font-semibold mt-4">Notas</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      {selectedGuest.notes || "Sin notas adicionales"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              {getUpcomingEvents(selectedGuest).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Próximos Eventos de Fidelización
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getUpcomingEvents(selectedGuest).map((event, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              {event.type === "birthday" ? (
                                <Gift className="h-6 w-6 text-pink-500" />
                              ) : (
                                <Heart className="h-6 w-6 text-red-500" />
                              )}
                              <div>
                                <div className="font-semibold">
                                  {event.label}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {event.date.toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Cerrar
            </Button>
            <Button onClick={() => handleEditGuest(selectedGuest!)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit/New Guest Modal Placeholder */}
      <Dialog
        open={isEditModalOpen || isNewGuestModalOpen}
        onOpenChange={() => {
          setIsEditModalOpen(false);
          setIsNewGuestModalOpen(false);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isNewGuestModalOpen ? "Nuevo Huésped" : "Editar Huésped"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Formulario de edición/creación de huésped con captura de imagen de
              documento y datos personales (próximamente implementado).
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                setIsNewGuestModalOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
