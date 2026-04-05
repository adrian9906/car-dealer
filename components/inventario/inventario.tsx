"use client";

import { use, useEffect, useState } from "react";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  Star,
} from "lucide-react";
import Link from "next/link";
import AutoCard from "./autoCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { Vehicle } from "@/app/dealer/inventario/page";

export default function Inventory({
  brands,
  models,
  vehicles,
  total,
}: {
  brands: string[];
  models: string[];
  vehicles: Vehicle[];
  total: number;
}) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "Todos los modelos";
  const selectedLocation = searchParams.get("stock") || "all";
  const [priceRange, setPriceRange] = useState([10000, 200000]);
  const selectedBrands = searchParams.get("brand")?.split(",") || [];
  const [sortBy, setSortBy] = useState("price-asc");
  const favorites = useFavorites();
  const router = useRouter();

  const handleBrandChange = (brand: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedBrands.includes(brand)) {
      const prev = selectedBrands.filter((brand) => brand !== brand);
      newParams.set("brand", prev.join(","));
      router.push(createUrl("/dealer/inventario", newParams));
    } else {
      newParams.set("brand", [...selectedBrands, brand].join(","));
      router.push(createUrl("/dealer/inventario", newParams));
    }
  };
  function handleFilter(name: string, value: string | null) {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === null) {
      newParams.delete(name);
    }
    if (typeof value === "string") {
      newParams.set(name, value);
    }
    router.push(createUrl("/dealer/inventario", newParams));
  }
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
                  Modelo
                </label>
                <div className="relative">
                  <Select
                    onValueChange={(value) => {
                      handleFilter("modelo", value);
                    }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue
                        placeholder="Selecciona un modelo"
                        className="text-sm font-medium mb-2 block font-serif"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Modelos</SelectLabel>
                        {models.map((value, index) => (
                          <SelectItem key={index} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                        <SelectItem value="all">Todos los modelos</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block font-serif">
                  Categoría
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    handleFilter("category", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="SEDAN">Sedanes</SelectItem>
                    <SelectItem value="SUV">SUVs</SelectItem>
                    <SelectItem value="PICKUP">Camionetas</SelectItem>
                    <SelectItem value="COMPACT">Compactos</SelectItem>
                    <SelectItem value="LUXURY">Lujo</SelectItem>
                    <SelectItem value="EXECUTIVE">Ejecutivo</SelectItem>
                    <SelectItem value="OFFROAD">Off Road</SelectItem>
                    <SelectItem value="SPORTS">Deportivo</SelectItem>
                    <SelectItem value="PERFORMANCE">Performance</SelectItem>
                    <SelectItem value="HEAVY_DUTY">De Carga</SelectItem>
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
                  onValueChange={(value) => {
                    handleFilter("stock", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las ubicaciones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ubicaciones</SelectItem>
                    <SelectItem value="LOCAL">Stock Local</SelectItem>
                    <SelectItem value="IMPORT">Importación USA</SelectItem>
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
                  onValueChange={(value) => {
                    setPriceRange(value);
                    handleFilter("price_min", priceRange[0].toString());
                    handleFilter("price_max", priceRange[1].toString());
                  }}
                  max={200000}
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
                        onCheckedChange={() => handleBrandChange(brand)}
                        className="border-primary"
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

        <div className="lg:col-span-3">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-muted-foreground font-serif">
              Mostrando {vehicles.length} de {total} vehículos
            </p>
            <div className="flex flex-1 justify-end mx-auto">
              <Button asChild>
                <Link href="/dealer/favoritos">
                  <div className="relative flex items-center gap-1">
                    {" "}
                    Favoritos
                    <Star className="h-4 w-4" />
                    {favorites > 0 && (
                      <span className="absolute -top-4 -right-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {favorites}
                      </span>
                    )}
                  </div>
                </Link>
              </Button>
            </div>
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
            {vehicles.map((vehicle) => (
              <AutoCard key={vehicle.id_auto} vehicle={vehicle} />
            ))}
          </div>

          {/* No Results */}
          {vehicles.length === 0 && (
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
