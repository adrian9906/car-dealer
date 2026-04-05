import { RentCar } from "@/components/rent/rentComponent";
import { db } from "@/lib/db";
import type React from "react";
import { Alquiler, Vehicle } from "../inventario/page";

export default async function RentPage() {
  const autos: Alquiler[] = await db.alquiler.findMany({
    include: {
      auto: true,
      facturas: true,
      transacciones: true,
    },
  });
  return (
    <div className="min-h-screen bg-background w-full flex-col group/design-root overflow-x-hidden">
      <RentCar autos={autos} />
    </div>
  );
}
