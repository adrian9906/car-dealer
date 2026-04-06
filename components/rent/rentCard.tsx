"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Alquiler } from "@/app/dealer/inventario/page";

export function RentCard({ car }: { car: Alquiler }) {
  const [dropdown, setDropdown] =
    useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown",
    );
  const [isRented, setIsRented] = useState(false);
  const [precioTotal, setPrecio] = useState(0);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const handleSubmit = async () => {
    const response = await fetch("/api/rent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_auto: car.id_auto,
        id_cliente: car.id_cliente,
        fecha_inicio: dateRange?.from,
        fecha_fin: dateRange?.to,
        precio_diario: precioTotal,
        deposito_garantia: 0,
        kilometraje_inicio: 0,
        kilometraje_fin: 0,
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800">
          No hay autos disponibles
        </h2>
        <p className="text-gray-600">Por favor, vuelve más tarde.</p>
      </div>
    );
  }
  return (
    <>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-lg p-0">
        <CardHeader className="p-0 border-b">
          <div className="w-full h-64 relative overflow-hidden rounded-t-lg">
            <Image
              src={"/honda-accord-2023.png"}
              fill
              alt={"/honda-accord-2023.png"}
              className="w-full h-full object-cover"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex flex-col p-3 gap-2">
            <div>
              <p className="text-primary text-sm font-medium leading-normal">
                {car.auto?.tipo_combustible}
              </p>
              <p className="text-text-light dark:text-text-dark text-2xl font-bold leading-tight tracking-[-0.015em]">
                {car.auto?.marca} {car.auto?.modelo} {car.auto?.año}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* Calendario ajustado para pantallas pequeñas */}
            <div className="overflow-x-auto">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1} // Reducido a 1 para pantallas pequeñas
                captionLayout={dropdown}
                className="rounded-lg border w-full h-full text-accent"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row justify-between w-full">
            <div className="flex-col">
              <p>{car?.precio_diario}$/week</p>
              <p>{((car.precio_semanal ?? 0) * 30).toFixed(2)}$/month</p>
            </div>
            <Button>Reservar hoy</Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
