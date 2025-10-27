"use client";

import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Vehicle } from "@/app/dealer/inventario/page";
import Link from "next/link";
import { Button } from "../ui/button";
import { PriceExport } from "./importForm";

interface CardResultProps {
  selectedVehicle: Vehicle;
  estimatedCosts: PriceExport;
}

export function CardResultsCar({
  selectedVehicle,
  estimatedCosts,
}: CardResultProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">
            ¡Solicitud de Importación Enviada!
          </h1>
          <p className="text-xl text-muted-foreground font-serif">
            Hemos recibido tu solicitud de importación. Nuestro equipo
            especializado se pondrá en contacto contigo dentro de las próximas
            24 horas para comenzar el proceso.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-sans">Resumen de tu Solicitud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedVehicle && (
              <div className="flex justify-center mb-4">
                <img
                  src={selectedVehicle.imagen || "/placeholder.svg"}
                  alt={`${selectedVehicle.marca} ${selectedVehicle.modelo}`}
                  className="w-48 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground font-serif">
                  Vehículo:
                </span>
                <p className="font-medium font-serif">
                  {selectedVehicle?.marca} {selectedVehicle?.modelo}{" "}
                  {selectedVehicle?.año}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground font-serif">
                  Presupuesto:
                </span>
                <p className="font-medium font-serif">
                  ${selectedVehicle?.precio_venta?.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground font-serif">
                  Costo total estimado:
                </span>
                <p className="font-medium text-primary font-serif">
                  ${estimatedCosts.total.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground font-serif">
                  Tiempo estimado:
                </span>
                <p className="font-medium font-serif">4-6 semanas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inventario">
            <Button className="bg-primary hover:bg-primary/80 text-accent-foreground">
              Ver Inventario Local
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="bg-primary">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
