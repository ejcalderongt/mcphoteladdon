import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  BarChart3,
  QrCode,
  Settings,
  Hotel,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: BarChart3,
      description: "Vista general y estadísticas",
    },
    {
      path: "/calendario",
      label: "Calendario",
      icon: Calendar,
      description: "Estado de habitaciones",
    },
    {
      path: "/huespedes",
      label: "Huéspedes",
      icon: Users,
      description: "Gestión de huéspedes",
    },
    {
      path: "/scanner",
      label: "Scanner",
      icon: QrCode,
      description: "Identificación de pulseras",
    },
  ];

  return (
    <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Hotel className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  HotelManager
                </h1>
                <p className="text-xs text-muted-foreground">
                  Sistema de Gestión
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="hidden sm:inline-flex">
              En línea
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
