import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, User, Phone, Mail, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Room {
  id: string;
  number: string;
  type: "simple" | "doble" | "suite" | "familiar";
  pricePerNight: number;
  floor: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableRooms: Room[];
  preselectedRoom?: Room;
  onBookingCreate: (booking: any) => void;
}

const roomTypeLabels = {
  simple: "Simple",
  doble: "Doble",
  suite: "Suite",
  familiar: "Familiar",
};

export function BookingModal({
  isOpen,
  onClose,
  availableRooms,
  preselectedRoom,
  onBookingCreate,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    roomId: preselectedRoom?.id || "",
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    braceletCode: "",
    notes: "",
  });

  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const selectedRoom = availableRooms.find(
    (room) => room.id === formData.roomId,
  );

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !selectedRoom) return 0;
    const nights = Math.ceil(
      (formData.checkOut.getTime() - formData.checkIn.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return nights * selectedRoom.pricePerNight;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.checkIn || !formData.checkOut || !selectedRoom) return;

    const booking = {
      id: Date.now().toString(),
      guest: {
        name: formData.guestName,
        email: formData.guestEmail,
        phone: formData.guestPhone,
        braceletCode: formData.braceletCode,
      },
      room: selectedRoom,
      checkIn: format(formData.checkIn, "dd/MM/yyyy"),
      checkOut: format(formData.checkOut, "dd/MM/yyyy"),
      total: calculateTotal(),
      notes: formData.notes,
    };

    onBookingCreate(booking);
    onClose();

    // Reset form
    setFormData({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      roomId: "",
      checkIn: undefined,
      checkOut: undefined,
      braceletCode: "",
      notes: "",
    });
  };

  const generateBraceletCode = () => {
    const code =
      "BR" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData({ ...formData, braceletCode: code });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Nueva Reservación</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="h-5 w-5 mr-2" />
              Información del Huésped
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guestName">Nombre Completo *</Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData({ ...formData, guestName: e.target.value })
                  }
                  required
                  placeholder="Nombre del huésped"
                />
              </div>

              <div>
                <Label htmlFor="guestEmail">Email</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={formData.guestEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, guestEmail: e.target.value })
                  }
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="guestPhone">Teléfono</Label>
                <Input
                  id="guestPhone"
                  value={formData.guestPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, guestPhone: e.target.value })
                  }
                  placeholder="+52 555 1234567"
                />
              </div>

              <div>
                <Label htmlFor="braceletCode">Código de Pulsera</Label>
                <div className="flex space-x-2">
                  <Input
                    id="braceletCode"
                    value={formData.braceletCode}
                    onChange={(e) =>
                      setFormData({ ...formData, braceletCode: e.target.value })
                    }
                    placeholder="BR001234"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateBraceletCode}
                  >
                    Generar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Habitación</h3>

            <div>
              <Label htmlFor="room">Seleccionar Habitación *</Label>
              <Select
                value={formData.roomId}
                onValueChange={(value) =>
                  setFormData({ ...formData, roomId: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una habitación" />
                </SelectTrigger>
                <SelectContent>
                  {availableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>
                          Hab. {room.number} - {roomTypeLabels[room.type]}
                        </span>
                        <Badge variant="secondary">
                          ${room.pricePerNight}/noche
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Fechas de Estancia
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Fecha de Entrada *</Label>
                <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.checkIn
                        ? format(formData.checkIn, "PPP", { locale: es })
                        : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.checkIn}
                      onSelect={(date) => {
                        setFormData({ ...formData, checkIn: date });
                        setCheckInOpen(false);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Fecha de Salida *</Label>
                <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.checkOut
                        ? format(formData.checkOut, "PPP", { locale: es })
                        : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.checkOut}
                      onSelect={(date) => {
                        setFormData({ ...formData, checkOut: date });
                        setCheckOutOpen(false);
                      }}
                      disabled={(date) =>
                        date <= (formData.checkIn || new Date())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Summary */}
          {selectedRoom && formData.checkIn && formData.checkOut && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold flex items-center mb-2">
                <CreditCard className="h-4 w-4 mr-2" />
                Resumen de Reservación
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Habitación:</span>
                  <span>
                    {selectedRoom.number} - {roomTypeLabels[selectedRoom.type]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tarifa por noche:</span>
                  <span>${selectedRoom.pricePerNight}</span>
                </div>
                <div className="flex justify-between">
                  <span>Noches:</span>
                  <span>
                    {Math.ceil(
                      (formData.checkOut.getTime() -
                        formData.checkIn.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                !formData.guestName ||
                !formData.roomId ||
                !formData.checkIn ||
                !formData.checkOut
              }
            >
              Crear Reservación
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
