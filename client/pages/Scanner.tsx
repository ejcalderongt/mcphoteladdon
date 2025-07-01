import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  QrCode,
  Camera,
  User,
  CreditCard,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Utensils,
  Wine,
  Sparkles,
  ShoppingBag,
  Shirt,
  Coffee,
  MoreHorizontal,
  Scan,
  Loader2,
} from "lucide-react";
import type {
  Guest,
  Charge,
  GuestCredit,
  PaymentMethod,
  Transaction,
} from "@shared/api";

const areaIcons = {
  restaurant: Utensils,
  bar: Wine,
  spa: Sparkles,
  roomservice: ShoppingBag,
  laundry: Shirt,
  minibar: Coffee,
  other: MoreHorizontal,
};

const areaLabels = {
  restaurant: "Restaurante",
  bar: "Bar",
  spa: "Spa",
  roomservice: "Room Service",
  laundry: "Lavandería",
  minibar: "Minibar",
  other: "Otros",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

export default function Scanner() {
  const [braceletCode, setBraceletCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scannedGuest, setScannedGuest] = useState<Guest | null>(null);
  const [guestCharges, setGuestCharges] = useState<Charge[]>([]);
  const [guestCredit, setGuestCredit] = useState<GuestCredit | null>(null);
  const [selectedCharges, setSelectedCharges] = useState<string[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Mock data for demonstration
  const mockScanResult = (code: string) => {
    const guest: Guest = {
      id: "g1",
      name: "Carlos Mendez",
      email: "carlos@email.com",
      phone: "+52 555 1234",
      braceletCode: code,
      checkIn: "15/01/2024",
      checkOut: "18/01/2024",
      roomId: "101",
      totalCharges: 850,
      pendingCharges: 320,
      paymentMethods: [
        {
          id: "pm1",
          type: "credit_card",
          brand: "Visa",
          last4: "4242",
          expiryMonth: 12,
          expiryYear: 2025,
        },
      ],
    };

    const charges: Charge[] = [
      {
        id: "c1",
        guestId: "g1",
        description: "Cena en restaurante principal",
        amount: 120,
        timestamp: "2024-01-16T19:30:00Z",
        isPaid: false,
        source: "pos",
        area: "restaurant",
        items: [
          { name: "Filete de res", quantity: 1, unitPrice: 80 },
          { name: "Vino tinto", quantity: 1, unitPrice: 40 },
        ],
      },
      {
        id: "c2",
        guestId: "g1",
        description: "Bebidas en bar",
        amount: 85,
        timestamp: "2024-01-16T22:15:00Z",
        isPaid: false,
        source: "pos",
        area: "bar",
        items: [
          { name: "Mojito", quantity: 2, unitPrice: 25 },
          { name: "Whisky", quantity: 1, unitPrice: 35 },
        ],
      },
      {
        id: "c3",
        guestId: "g1",
        description: "Masaje relajante",
        amount: 150,
        timestamp: "2024-01-17T14:00:00Z",
        isPaid: true,
        source: "pos",
        area: "spa",
      },
      {
        id: "c4",
        guestId: "g1",
        description: "Room Service - Desayuno",
        amount: 45,
        timestamp: "2024-01-17T08:30:00Z",
        isPaid: false,
        source: "pos",
        area: "roomservice",
        items: [
          { name: "Desayuno continental", quantity: 1, unitPrice: 35 },
          { name: "Jugo natural", quantity: 1, unitPrice: 10 },
        ],
      },
      {
        id: "c5",
        guestId: "g1",
        description: "Minibar",
        amount: 70,
        timestamp: "2024-01-16T23:45:00Z",
        isPaid: false,
        source: "pos",
        area: "minibar",
        items: [
          { name: "Agua mineral", quantity: 2, unitPrice: 15 },
          { name: "Snacks", quantity: 3, unitPrice: 13.33 },
        ],
      },
    ];

    const credit: GuestCredit = {
      guestId: "g1",
      initialCredit: 1000,
      usedCredit: 530,
      availableCredit: 470,
      lastUpdated: "2024-01-17T10:00:00Z",
    };

    return { guest, charges, credit };
  };

  const handleScan = async () => {
    if (!braceletCode.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const result = mockScanResult(braceletCode);
      setScannedGuest(result.guest);
      setGuestCharges(result.charges);
      setGuestCredit(result.credit);
    } catch (error) {
      console.error("Error scanning bracelet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    // In a real app, this would start the camera scanner
    setTimeout(() => {
      setBraceletCode("BR001");
      setIsScanning(false);
      handleScan();
    }, 2000);
  };

  const openCharges = guestCharges.filter((charge) => !charge.isPaid);
  const totalPendingAmount = openCharges.reduce(
    (sum, charge) => sum + charge.amount,
    0,
  );

  const canAffordCharges = guestCredit
    ? totalPendingAmount <= guestCredit.availableCredit
    : false;

  const handleChargeSelection = (chargeId: string, selected: boolean) => {
    if (selected) {
      setSelectedCharges([...selectedCharges, chargeId]);
    } else {
      setSelectedCharges(selectedCharges.filter((id) => id !== chargeId));
    }
  };

  const selectedAmount = selectedCharges.reduce((sum, chargeId) => {
    const charge = guestCharges.find((c) => c.id === chargeId);
    return sum + (charge?.amount || 0);
  }, 0);

  const handlePayment = async () => {
    if (selectedCharges.length === 0) return;

    setPaymentProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Update charges as paid
      setGuestCharges((prevCharges) =>
        prevCharges.map((charge) =>
          selectedCharges.includes(charge.id)
            ? { ...charge, isPaid: true }
            : charge,
        ),
      );

      // Update credit
      if (guestCredit) {
        setGuestCredit({
          ...guestCredit,
          usedCredit: guestCredit.usedCredit + selectedAmount,
          availableCredit: guestCredit.availableCredit - selectedAmount,
        });
      }

      setSelectedCharges([]);
      setIsPaymentModalOpen(false);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const groupedCharges = guestCharges.reduce(
    (acc, charge) => {
      if (!acc[charge.area]) {
        acc[charge.area] = [];
      }
      acc[charge.area].push(charge);
      return acc;
    },
    {} as Record<string, Charge[]>,
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Escáner de Pulseras
            </h1>
            <p className="text-muted-foreground">
              Escanea el código de pulsera para ver consumos y procesar pagos
            </p>
          </div>

          {/* Scanner Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>Escáner de Código de Barras</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="braceletCode">Código de Pulsera</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="braceletCode"
                      value={braceletCode}
                      onChange={(e) => setBraceletCode(e.target.value)}
                      placeholder="BR001234"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleScan}
                      disabled={isLoading || !braceletCode.trim()}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Scan className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {isScanning ? (
                    <div className="space-y-4">
                      <Camera className="h-12 w-12 mx-auto text-primary animate-pulse" />
                      <p className="text-muted-foreground">Escaneando...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Área del escáner de cámara
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleStartScanning}
                  disabled={isScanning}
                  className="w-full"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Escaneando...
                    </>
                  ) : (
                    <>
                      <QrCode className="h-4 w-4 mr-2" />
                      Iniciar Escáner
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Guest Info */}
            {scannedGuest && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Información del Huésped</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Nombre:</span>
                      <span>{scannedGuest.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Habitación:</span>
                      <span>{scannedGuest.roomId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Check-in:</span>
                      <span>{scannedGuest.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Check-out:</span>
                      <span>{scannedGuest.checkOut}</span>
                    </div>
                  </div>

                  <Separator />

                  {guestCredit && (
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Estado de Crédito
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Crédito inicial:</span>
                          <span>${guestCredit.initialCredit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Usado:</span>
                          <span>${guestCredit.usedCredit}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Disponible:</span>
                          <span
                            className={
                              guestCredit.availableCredit > 100
                                ? "text-green-600"
                                : "text-yellow-600"
                            }
                          >
                            ${guestCredit.availableCredit}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${
                              (guestCredit.usedCredit /
                                guestCredit.initialCredit) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {!canAffordCharges && totalPendingAmount > 0 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Crédito insuficiente para cubrir todos los cargos
                        pendientes.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Charges Section */}
          {scannedGuest && guestCharges.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Consumos del Huésped</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      Total pendiente: ${totalPendingAmount}
                    </Badge>
                    {selectedCharges.length > 0 && (
                      <Button
                        onClick={() => setIsPaymentModalOpen(true)}
                        disabled={
                          selectedAmount > (guestCredit?.availableCredit || 0)
                        }
                      >
                        Procesar Pago (${selectedAmount})
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedCharges).map(([area, charges]) => {
                    const Icon = areaIcons[area as keyof typeof areaIcons];
                    return (
                      <div key={area}>
                        <h3 className="font-semibold flex items-center mb-3">
                          <Icon className="h-4 w-4 mr-2" />
                          {areaLabels[area as keyof typeof areaLabels]}
                        </h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                Seleccionar
                              </TableHead>
                              <TableHead>Descripción</TableHead>
                              <TableHead>Fecha/Hora</TableHead>
                              <TableHead>Monto</TableHead>
                              <TableHead>Estado</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {charges.map((charge) => (
                              <TableRow key={charge.id}>
                                <TableCell>
                                  {!charge.isPaid && (
                                    <input
                                      type="checkbox"
                                      checked={selectedCharges.includes(
                                        charge.id,
                                      )}
                                      onChange={(e) =>
                                        handleChargeSelection(
                                          charge.id,
                                          e.target.checked,
                                        )
                                      }
                                      className="rounded border-gray-300"
                                    />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">
                                      {charge.description}
                                    </p>
                                    {charge.items && (
                                      <ul className="text-xs text-muted-foreground mt-1">
                                        {charge.items.map((item, idx) => (
                                          <li key={idx}>
                                            {item.quantity}x {item.name} - $
                                            {item.unitPrice}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span className="text-sm">
                                      {new Date(
                                        charge.timestamp,
                                      ).toLocaleString("es-ES")}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="font-semibold">
                                  ${charge.amount}
                                </TableCell>
                                <TableCell>
                                  {charge.isPaid ? (
                                    <Badge
                                      variant="secondary"
                                      className="bg-green-100 text-green-800"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Pagado
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">Pendiente</Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Procesar Pago</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total a pagar:</span>
                <span className="text-xl font-bold">${selectedAmount}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {selectedCharges.length} cargo(s) seleccionado(s)
              </div>
            </div>

            <div>
              <Label>Método de pago</Label>
              <Select
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Crédito del huésped</SelectItem>
                  {scannedGuest?.paymentMethods?.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.brand} **** {method.last4}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {guestCredit && selectedPaymentMethod === "credit" && (
              <Alert>
                <AlertDescription>
                  Se descontará ${selectedAmount} del crédito disponible ($
                  {guestCredit.availableCredit}).
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
              disabled={paymentProcessing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handlePayment}
              disabled={
                !selectedPaymentMethod ||
                paymentProcessing ||
                (selectedPaymentMethod === "credit" &&
                  selectedAmount > (guestCredit?.availableCredit || 0))
              }
            >
              {paymentProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Confirmar Pago
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
