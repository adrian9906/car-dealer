import Inventory from "@/components/inventario/inventario";
import {
  getBrands,
  getModelos,
  getVehicles,
  getVehiclesTotal,
} from "@/lib/actions/actions";
import { Cliente, Factura, Transaccion } from "../../generated/prisma/client";

export interface PageParams {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

export interface Vehicle {
  id_auto: string;
  marca: string;
  modelo: string;
  año: number;
  color: string;
  tipo_combustible: string;
  transmision: string;
  precio_venta: number | null;
  estado_auto: string;
  vin: string;
  kilometraje: number;
  stock: string;
  category: string;
  imagen: string | null;
  tipo_propiedad: string;
  features: string;
  descripcion?: string;
}
export interface Alquiler {
  id_alquiler: string;
  id_auto: string;
  id_cliente?: string | null;
  auto: Vehicle; // Puedes reemplazar 'any' por la interfaz de Auto si la tienes
  cliente?: Cliente; // Puedes reemplazar 'any' por la interfaz de Cliente si la tienes
  fecha_inicio: Date; // O Date si manejas objetos Date en frontend
  fecha_fin: Date; // O Date
  precio_diario: number;
  precio_semanal: number;
  deposito_garantia: number;
  estado_alquiler: string; // O enum si tienes el tipo EstadoAlquiler
  kilometraje_inicio: number;
  kilometraje_fin?: number | null;
  observaciones?: string | null;
  facturas: Factura[]; // Puedes reemplazar 'any' por la interfaz de Factura si la tienes
  isRented: boolean;
  transacciones: Transaccion[];
}

export default async function InventoryPage({ searchParams }: PageParams) {
  const params = await searchParams;
  const vehicles: Vehicle[] = await getVehicles(params);
  const brands = await getBrands();
  const modelos = await getModelos();
  const total = await getVehiclesTotal();
  return (
    <div className="min-h-screen bg-background mt-15">
      <Inventory
        brands={brands}
        models={modelos}
        vehicles={vehicles}
        total={total}
      />
    </div>
  );
}
