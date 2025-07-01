import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export default function Guests() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Gestión de Huéspedes
              </h1>
              <p className="text-muted-foreground">
                Administra la información de huéspedes y sus reservaciones
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Huésped
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Lista de Huéspedes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esta página mostrará una tabla completa con todos los huéspedes,
                incluyendo información de contacto, códigos de pulsera, estado
                de reservación, cargos pendientes y historial de estancias.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
