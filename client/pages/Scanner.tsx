import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Camera } from "lucide-react";

export default function Scanner() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Escáner de Pulseras
            </h1>
            <p className="text-muted-foreground">
              Identifica huéspedes escaneando el código de barras de sus
              pulseras
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>Escáner de Código de Barras</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Área del escáner de cámara
                  </p>
                </div>
                <Button className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Iniciar Escáner
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información del Huésped</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aquí se mostrará la información del huésped una vez escaneada
                  la pulsera, incluyendo:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Nombre del huésped</li>
                  <li>• Número de habitación</li>
                  <li>• Fechas de estancia</li>
                  <li>• Cargos pendientes</li>
                  <li>• Estado de la cuenta</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
