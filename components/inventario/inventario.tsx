"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Car,
  Filter,
  MapPin,
  Ship,
  Heart,
  Eye,
  Fuel,
  Calendar,
  Settings,
} from "lucide-react";
import Link from "next/link";

// Mock data for vehicles
const vehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 18500,
    category: "sedan",
    location: "local",
    mileage: 45000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Blanco",
    image: "/toyota-corolla-blanco.png",
    features: ["A/C", "Radio", "Airbags", "ABS"],
  },
  {
    id: 2,
    brand: "Honda",
    model: "CR-V",
    year: 2019,
    price: 24000,
    category: "suv",
    location: "import",
    mileage: 38000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Negro",
    image: "/honda-crv-negro-suv.png",
    features: ["A/C", "GPS", "Cámara trasera", "Bluetooth"],
  },
  {
    id: 3,
    brand: "Ford",
    model: "F-150",
    year: 2021,
    price: 32000,
    category: "pickup",
    location: "local",
    mileage: 25000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Azul",
    image: "/ford-f150-azul.png",
    features: ["4x4", "A/C", "Caja de carga", "Remolque"],
  },
  {
    id: 4,
    brand: "Nissan",
    model: "Sentra",
    year: 2018,
    price: 15500,
    category: "sedan",
    location: "local",
    mileage: 52000,
    fuel: "Gasolina",
    transmission: "Manual",
    color: "Rojo",
    image: "/nissan-sentra-rojo-sedan.png",
    features: ["A/C", "Radio", "Airbags"],
  },
  {
    id: 5,
    brand: "Chevrolet",
    model: "Tahoe",
    year: 2020,
    price: 35000,
    category: "suv",
    location: "import",
    mileage: 30000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Gris",
    image: "/chevrolet-tahoe-gris.png",
    features: ["7 asientos", "A/C", "GPS", "Cámara 360°"],
  },
  {
    id: 6,
    brand: "Hyundai",
    model: "Elantra",
    year: 2019,
    price: 16800,
    category: "compact",
    location: "local",
    mileage: 41000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Plata",
    image: "/hyundai-elantra-plata-compacto.png",
    features: ["A/C", "Bluetooth", "USB", "Airbags"],
  },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([10000, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-asc");

  // Filter vehicles based on current filters
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || vehicle.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "all" || vehicle.location === selectedLocation;
    const matchesPrice =
      vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(vehicle.brand);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesPrice &&
      matchesBrand
    );
  });

  // Sort vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "year-desc":
        return b.year - a.year;
      case "mileage-asc":
        return a.mileage - b.mileage;
      default:
        return 0;
    }
  });

  const brands = Array.from(new Set(vehicles.map((v) => v.brand)));

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">
          Nuestro Inventario
        </h1>
        <p className="text-xl text-muted-foreground font-serif">
          Explora nuestra selección de vehículos disponibles en stock local e
          importación
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-sans">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block font-serif">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Marca o modelo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block font-serif">
                  Categoría
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="sedan">Sedanes</SelectItem>
                    <SelectItem value="suv">SUVs</SelectItem>
                    <SelectItem value="pickup">Camionetas</SelectItem>
                    <SelectItem value="compact">Compactos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block font-serif">
                  Disponibilidad
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las ubicaciones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ubicaciones</SelectItem>
                    <SelectItem value="local">Stock Local</SelectItem>
                    <SelectItem value="import">Importación USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block font-serif">
                  Rango de Precio: ${priceRange[0].toLocaleString()} - $
                  {priceRange[1].toLocaleString()}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50000}
                  min={10000}
                  step={1000}
                  className="mt-2"
                />
              </div>

              {/* Brands */}
              <div>
                <label className="text-sm font-medium mb-2 block font-serif">
                  Marcas
                </label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) =>
                          handleBrandChange(brand, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm font-serif cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-muted-foreground font-serif">
              Mostrando {sortedVehicles.length} de {vehicles.length} vehículos
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full max-w-[220px] text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent className="text-white dark:text-black bg-slate-900 dark:bg-slate-100">
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">
                  Precio: Mayor a Menor
                </SelectItem>
                <SelectItem value="year-desc">Año: Más Reciente</SelectItem>
                <SelectItem value="mileage-asc">Menor Kilometraje</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant={
                        vehicle.location === "local" ? "default" : "secondary"
                      }
                      className="bg-background/90"
                    >
                      {vehicle.location === "local" ? (
                        <>
                          <MapPin className="h-3 w-3 mr-1" />
                          Stock Local
                        </>
                      ) : (
                        <>
                          <Ship className="h-3 w-3 mr-1" />
                          Importación
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-background/90 hover:bg-background"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-sans text-lg">
                        {vehicle.brand} {vehicle.model}
                      </CardTitle>
                      <CardDescription className="font-serif">
                        {vehicle.year} • {vehicle.color}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent font-sans">
                        ${vehicle.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4 font-serif">
                    <div className="flex items-center gap-1">
                      <Settings className="h-3 w-3" />
                      {vehicle.transmission}
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-3 w-3" />
                      {vehicle.fuel}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {vehicle.mileage.toLocaleString()} km
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {vehicle.features.slice(0, 3).map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                    {vehicle.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{vehicle.features.length - 3} más
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/vehiculo/${vehicle.id}`} className="flex-1">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </Link>
                    <Link href="/cotizar" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Cotizar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {sortedVehicles.length === 0 && (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2 font-sans">
                No se encontraron vehículos
              </h3>
              <p className="text-muted-foreground font-serif">
                Intenta ajustar los filtros para ver más resultados
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
