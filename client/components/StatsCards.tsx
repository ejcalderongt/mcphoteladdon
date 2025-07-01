import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Users,
  Bed,
  TrendingUp,
  Clock,
  CreditCard,
} from "lucide-react";

interface StatsData {
  totalRooms: number;
  occupiedRooms: number;
  checkoutsToday: number;
  dailyRevenue: number;
  pendingCharges: number;
  averageStay: number;
}

interface StatsCardsProps {
  data: StatsData;
}

export function StatsCards({ data }: StatsCardsProps) {
  const occupancyRate = Math.round(
    (data.occupiedRooms / data.totalRooms) * 100,
  );

  const stats = [
    {
      title: "Ingresos Diarios",
      value: `$${data.dailyRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      trend: "up",
      color: "text-green-600",
    },
    {
      title: "Habitaciones Ocupadas",
      value: `${data.occupiedRooms}/${data.totalRooms}`,
      icon: Bed,
      subtitle: `${occupancyRate}% ocupación`,
      color: "text-blue-600",
    },
    {
      title: "Check-outs Hoy",
      value: data.checkoutsToday.toString(),
      icon: Clock,
      subtitle: "Por confirmar",
      color: "text-orange-600",
    },
    {
      title: "Cargos Pendientes",
      value: `$${data.pendingCharges.toLocaleString()}`,
      icon: CreditCard,
      subtitle: "Por cobrar",
      color: "text-purple-600",
    },
    {
      title: "Huéspedes Activos",
      value: data.occupiedRooms.toString(),
      icon: Users,
      subtitle: "En el hotel",
      color: "text-cyan-600",
    },
    {
      title: "Estancia Promedio",
      value: `${data.averageStay} días`,
      icon: TrendingUp,
      change: "+0.3 días",
      trend: "up",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
              )}
              {stat.change && (
                <div className="flex items-center mt-1">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
