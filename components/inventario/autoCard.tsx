"use client";

import {
  MapPin,
  Ship,
  Heart,
  Settings,
  Fuel,
  Calendar,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Vehicle } from "@/app/dealer/inventario/page";

export default function AutoCard({ vehicle }: { vehicle: Vehicle }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const features = vehicle.features.split(",");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(vehicle.id_auto));
  }, [vehicle.id_auto]); // Dependencia por auto.id_auto

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Actualizar localStorage individualmente
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (newFavoriteState) {
      if (!favorites.includes(vehicle.id_auto)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...favorites, vehicle.id_auto]),
        );
        window.dispatchEvent(new Event("favoritesUpdated"));
      }
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify(
          favorites.filter((id: string) => id !== vehicle.id_auto),
        ),
      );
      window.dispatchEvent(new Event("favoritesUpdated"));
    }
  };

  return (
    <>
      <Card
        key={vehicle.id_auto}
        className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="relative">
          <img
            src={vehicle.imagen || "/placeholder.svg"}
            alt={`${vehicle.marca} ${vehicle.modelo}`}
            className="object-cover w-[30vw] h-[30vh] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant={
                vehicle.stock.toLowerCase() === "local"
                  ? "default"
                  : "secondary"
              }
              className="bg-background/90 text-foreground font-bold"
            >
              {vehicle.stock.toLowerCase() === "local" ? (
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
              id={vehicle.modelo}
              size="sm"
              variant="ghost"
              className={`bg-background/90 hover:bg-foreground dark:hover:bg-primary ${
                isFavorite ? "text-primary" : ""
              }`}
              onClick={() => toggleFavorite()}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-primary" : ""}`}
              />
            </Button>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-sans text-lg text-primary">
                {vehicle.marca} {vehicle.modelo}
              </CardTitle>
              <CardDescription className="font-serif">
                {vehicle.año} • {vehicle.color}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-sans text-primary">
                ${vehicle.precio_venta?.toFixed(2)}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4 font-serif">
            <div className="flex items-center gap-1">
              <Settings className="h-3 w-3" />
              {vehicle.transmision}
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="h-3 w-3" />
              {vehicle.tipo_combustible}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {vehicle.kilometraje.toLocaleString()} km
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {vehicle.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{features.length - 3} más
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              href={`/dealer/inventario/details/${vehicle.id_auto}`}
              className="flex-1"
            >
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground dark:bg-primary dark:hover:bg-primary/90">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalles
              </Button>
            </Link>
            <Link
              href={
                vehicle.stock === "LOCAL"
                  ? `/dealer/inventario/cotizar/${vehicle.id_auto}`
                  : "/dealer/importacion"
              }
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full dark:hover:bg-primary"
              >
                {vehicle.stock === "LOCAL" ? "Comprar" : "Importar"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
