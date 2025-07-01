import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Hotel,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Waves,
  Sun,
  MapPin,
  Star,
  Loader2,
} from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Landing Page */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.9)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%2387CEEB"/><stop offset="100%" stop-color="%2398D8E8"/></linearGradient><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%234682B4"/><stop offset="100%" stop-color="%232E5984"/></linearGradient></defs><rect width="1000" height="350" fill="url(%23sky)"/><rect y="350" width="1000" height="250" fill="url(%23water)"/><rect x="100" y="150" width="300" height="200" fill="%23FFF8DC" stroke="%23DDD" stroke-width="2"/><rect x="120" y="170" width="40" height="60" fill="%234169E1"/><rect x="180" y="170" width="40" height="60" fill="%234169E1"/><rect x="240" y="170" width="40" height="60" fill="%234169E1"/><rect x="300" y="170" width="40" height="60" fill="%234169E1"/><rect x="150" y="250" width="150" height="100" fill="%23228B22"/><polygon points="100,150 250,80 400,150" fill="%23CD853F"/><circle cx="800" cy="100" r="50" fill="%23FFD700"/><path d="M 450 350 Q 500 330 550 350 T 650 350" stroke="%23FFF" stroke-width="3" fill="none"/><rect x="600" y="250" width="80" height="100" fill="%238B4513"/><polygon points="600,250 640,200 680,250" fill="%23654321"/></svg>')`,
          }}
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="max-w-lg text-center space-y-8">
            {/* Logo and Brand */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <Hotel className="h-16 w-16 text-white" />
                  <Waves className="h-6 w-6 text-blue-200 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                MCPHotelAddOn
              </h1>
              <p className="text-xl text-blue-100">
                Sistema de Gestión Hotelera Premium
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <MapPin className="h-6 w-6 text-blue-200" />
                  <div className="text-left">
                    <p className="font-semibold">Gestión de Huéspedes</p>
                    <p className="text-sm text-blue-100">
                      Control completo de reservaciones y huéspedes
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Star className="h-6 w-6 text-yellow-300" />
                  <div className="text-left">
                    <p className="font-semibold">Análisis Inteligente</p>
                    <p className="text-sm text-blue-100">
                      Reportes geográficos y estacionales avanzados
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Sun className="h-6 w-6 text-yellow-400" />
                  <div className="text-left">
                    <p className="font-semibold">Vista 3D del Hotel</p>
                    <p className="text-sm text-blue-100">
                      Visualización interactiva de habitaciones
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-white/50 pl-4 italic text-blue-100">
              "La excelencia en la gestión hotelera comienza con las
              herramientas correctas"
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 animate-pulse">
          <Waves className="h-8 w-8 text-white/30" />
        </div>
        <div className="absolute bottom-10 left-10 animate-pulse">
          <Hotel className="h-8 w-8 text-white/30" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Hotel className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">MCPHotelAddOn</h1>
            </div>
            <p className="text-muted-foreground">Sistema de Gestión Hotelera</p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold">
                Iniciar Sesión
              </CardTitle>
              <p className="text-muted-foreground">
                Accede a tu panel de administración
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">Usuario</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="border-t pt-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    Credenciales de demostración:
                  </p>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>
                      <span className="font-medium">Usuario:</span> admin
                    </p>
                    <p>
                      <span className="font-medium">Contraseña:</span> admin
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 MCPHotelAddOn. Todos los derechos reservados.</p>
            <p className="mt-1">
              Potenciado por{" "}
              <span className="font-semibold text-primary">
                Builder.io MCP Integration
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
