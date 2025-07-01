import { useState, useEffect } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MapPin,
  Calendar,
  Cloud,
  TrendingUp,
  BarChart3,
  Thermometer,
  Droplets,
  Users,
  Star,
  Download,
  Filter,
  Sun,
  CloudRain,
  Gift,
} from "lucide-react";
import type {
  CorrelationAnalysis,
  GuatemalaRegionData,
  SeasonalData,
  HolidayData,
} from "@shared/api";

const mockCorrelationData: CorrelationAnalysis = {
  guestOrigins: [
    {
      region: "Región Metropolitana",
      departments: ["Guatemala", "Sacatepéquez"],
      climate: "templado",
      touristAttractions: [
        "Antigua Guatemala",
        "Guatemala City",
        "Volcán de Pacaya",
      ],
      guestCount: 145,
      averageStay: 3.2,
      preferredSeason: "Todo el año",
    },
    {
      region: "Región Oeste",
      departments: ["Quetzaltenango", "Huehuetenango", "San Marcos"],
      climate: "frio",
      touristAttractions: [
        "Quetzaltenango",
        "Todos Santos",
        "Volcán Tajumulco",
      ],
      guestCount: 89,
      averageStay: 4.1,
      preferredSeason: "Época seca (Nov-Abr)",
    },
    {
      region: "Región Norte",
      departments: ["Petén", "Alta Verapaz", "Baja Verapaz"],
      climate: "tropical",
      touristAttractions: ["Tikal", "Semuc Champey", "Biotopo Quetzal"],
      guestCount: 67,
      averageStay: 5.2,
      preferredSeason: "Época seca (Dic-Abr)",
    },
    {
      region: "Región Sur",
      departments: ["Escuintla", "Suchitepéquez", "Retalhuleu"],
      climate: "tropical",
      touristAttractions: ["Monterrico", "Champerico", "Volcán de Fuego"],
      guestCount: 78,
      averageStay: 2.8,
      preferredSeason: "Época seca (Nov-Mar)",
    },
    {
      region: "Región Este",
      departments: ["Izabal", "Chiquimula", "Jalapa"],
      climate: "tropical",
      touristAttractions: ["Río Dulce", "Quiriguá", "Volcán Ipala"],
      guestCount: 56,
      averageStay: 3.5,
      preferredSeason: "Todo el año",
    },
  ],
  seasonalPatterns: [
    {
      season: "verano",
      months: ["Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
      weatherPattern: "seco",
      averageTemp: 24,
      rainfall: 25,
    },
    {
      season: "invierno",
      months: ["Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre"],
      weatherPattern: "lluvioso",
      averageTemp: 22,
      rainfall: 185,
    },
  ],
  holidays: [
    {
      name: "Semana Santa",
      date: "Marzo-Abril",
      type: "religioso",
      impact: "alto",
      guestIncrease: 85,
    },
    {
      name: "Independencia de Guatemala",
      date: "15 de Septiembre",
      type: "nacional",
      impact: "medio",
      guestIncrease: 35,
    },
    {
      name: "Navidad y Año Nuevo",
      date: "Diciembre-Enero",
      type: "religioso",
      impact: "alto",
      guestIncrease: 120,
    },
    {
      name: "Día de los Santos",
      date: "1 de Noviembre",
      type: "religioso",
      impact: "medio",
      guestIncrease: 45,
    },
    {
      name: "Festival de Barriletes Gigantes",
      date: "1 de Noviembre",
      type: "cultural",
      impact: "medio",
      guestIncrease: 25,
    },
    {
      name: "Corpus Christi",
      date: "Mayo-Junio",
      type: "religioso",
      impact: "bajo",
      guestIncrease: 15,
    },
  ],
  weatherCorrelations: [
    {
      region: "Región Metropolitana",
      season: "Época seca",
      guestVolume: 87,
      weatherScore: 9.2,
    },
    {
      region: "Región Oeste",
      season: "Época seca",
      guestVolume: 92,
      weatherScore: 8.8,
    },
    {
      region: "Región Norte",
      season: "Época seca",
      guestVolume: 78,
      weatherScore: 8.5,
    },
    {
      region: "Región Sur",
      season: "Época seca",
      guestVolume: 95,
      weatherScore: 9.1,
    },
    {
      region: "Región Este",
      season: "Todo el año",
      guestVolume: 65,
      weatherScore: 7.8,
    },
  ],
  insights: [
    {
      title: "Pico turístico en época seca",
      description:
        "El 78% de las visitas se concentran entre noviembre y abril, correlacionando con el clima seco y las festividades principales.",
      recommendation:
        "Incrementar precios en un 25-35% durante estos meses y asegurar suficiente personal.",
    },
    {
      title: "Preferencia regional por clima",
      description:
        "Huéspedes de regiones frías (oeste) prefieren visitar durante época seca, mientras que los de regiones tropicales (este) visitan todo el año.",
      recommendation:
        "Crear paquetes específicos por región de origen y ofertas diferenciadas según la temporada.",
    },
    {
      title: "Impacto de festividades religiosas",
      description:
        "Semana Santa y Navidad generan incrementos del 85% y 120% respectivamente en la ocupación.",
      recommendation:
        "Reservar con 6 meses de anticipación y crear paquetes familiares especiales.",
    },
    {
      title: "Correlación clima-satisfacción",
      description:
        "La puntuación de satisfacción es 1.8 puntos mayor durante la época seca (4.6 vs 2.8 en época lluviosa).",
      recommendation:
        "Ofrecer actividades cubiertas y descuentos atractivos durante la época lluviosa.",
    },
  ],
};

const departmentData = {
  Guatemala: { population: 3200000, averageIncome: "Alto", distance: 0 },
  Quetzaltenango: {
    population: 800000,
    averageIncome: "Medio-Alto",
    distance: 200,
  },
  Sacatepéquez: { population: 300000, averageIncome: "Alto", distance: 45 },
  Escuintla: { population: 700000, averageIncome: "Medio", distance: 65 },
  Petén: { population: 650000, averageIncome: "Medio-Bajo", distance: 550 },
  "Alta Verapaz": {
    population: 1200000,
    averageIncome: "Medio-Bajo",
    distance: 220,
  },
  Huehuetenango: {
    population: 1100000,
    averageIncome: "Medio-Bajo",
    distance: 270,
  },
  Izabal: { population: 400000, averageIncome: "Medio", distance: 308 },
};

export default function GeographicalAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState("annual");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [data] = useState<CorrelationAnalysis>(mockCorrelationData);

  const getRegionStats = () => {
    const totalGuests = data.guestOrigins.reduce(
      (sum, region) => sum + region.guestCount,
      0,
    );
    return data.guestOrigins.map((region) => ({
      ...region,
      percentage: Math.round((region.guestCount / totalGuests) * 100),
    }));
  };

  const getClimateIcon = (climate: string) => {
    switch (climate) {
      case "tropical":
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case "templado":
        return <Cloud className="h-4 w-4 text-blue-500" />;
      case "frio":
        return <CloudRain className="h-4 w-4 text-gray-500" />;
      default:
        return <Thermometer className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "alto":
        return "bg-red-100 text-red-800";
      case "medio":
        return "bg-yellow-100 text-yellow-800";
      case "bajo":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeasonIcon = (season: string) => {
    return season === "verano" ? (
      <Sun className="h-4 w-4 text-yellow-500" />
    ) : (
      <CloudRain className="h-4 w-4 text-blue-500" />
    );
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
                Análisis Geográfico y Estacional
              </h1>
              <p className="text-muted-foreground">
                Correlaciones entre origen de huéspedes, clima, temporadas y
                festividades de Guatemala
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Anual</SelectItem>
                  <SelectItem value="seasonal">Por Temporada</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Regiones</SelectItem>
                  <SelectItem value="metropolitana">Metropolitana</SelectItem>
                  <SelectItem value="oeste">Oeste</SelectItem>
                  <SelectItem value="norte">Norte</SelectItem>
                  <SelectItem value="sur">Sur</SelectItem>
                  <SelectItem value="este">Este</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Regiones Activas</p>
                    <p className="text-2xl font-bold">
                      {data.guestOrigins.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Total Huéspedes</p>
                    <p className="text-2xl font-bold">
                      {data.guestOrigins.reduce(
                        (sum, r) => sum + r.guestCount,
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Festividades</p>
                    <p className="text-2xl font-bold">{data.holidays.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Estancia Promedio</p>
                    <p className="text-2xl font-bold">3.8 días</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Análisis por Regiones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getRegionStats().map((region, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getClimateIcon(region.climate)}
                          <h3 className="font-semibold">{region.region}</h3>
                        </div>
                        <Badge variant="secondary">{region.percentage}%</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Huéspedes</p>
                          <p className="font-semibold">{region.guestCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Estancia Promedio
                          </p>
                          <p className="font-semibold">
                            {region.averageStay} días
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Clima</p>
                          <p className="font-semibold capitalize">
                            {region.climate}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Temporada Preferida
                          </p>
                          <p className="font-semibold">
                            {region.preferredSeason}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">
                          Departamentos:
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {region.departments.map((dept, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">
                          Atracciones principales:
                        </p>
                        <p className="text-xs mt-1">
                          {region.touristAttractions.join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Patrones Estacionales</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.seasonalPatterns.map((season, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        {getSeasonIcon(season.season)}
                        <h3 className="font-semibold capitalize">
                          {season.season}
                        </h3>
                        <Badge variant="outline">{season.weatherPattern}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="text-muted-foreground">
                              Temp. Promedio
                            </p>
                            <p className="font-semibold">
                              {season.averageTemp}°C
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-muted-foreground">
                              Precipitación
                            </p>
                            <p className="font-semibold">{season.rainfall}mm</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Meses:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {season.months.map((month, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {month}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Holidays Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>Impacto de Festividades</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Festividad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Impacto</TableHead>
                    <TableHead>Incremento de Huéspedes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.holidays.map((holiday, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {holiday.name}
                      </TableCell>
                      <TableCell>{holiday.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {holiday.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getImpactColor(holiday.impact)}
                          variant="secondary"
                        >
                          {holiday.impact}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-green-600">
                            +{holiday.guestIncrease}%
                          </span>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Weather Correlations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-5 w-5" />
                <span>Correlaciones Clima-Ocupación</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.weatherCorrelations.map((correlation, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">
                        {correlation.region}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Temporada:
                          </span>
                          <span className="text-sm font-medium">
                            {correlation.season}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Volumen:
                          </span>
                          <span className="text-sm font-medium">
                            {correlation.guestVolume}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Satisfacción:
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {correlation.weatherScore}/10
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights and Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Insights y Recomendaciones</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.insights.map((insight, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {insight.description}
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">
                        Recomendación:
                      </p>
                      <p className="text-sm text-blue-800">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
