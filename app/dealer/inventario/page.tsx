import Inventory from "@/components/inventario/inventario";
import {
  getBrands,
  getModelos,
  getVehicles,
  getVehiclesTotal,
} from "@/lib/actions/actions";

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

export default async function InventoryPage({ searchParams }: PageParams) {
  const vehicles: Vehicle[] = await getVehicles(searchParams);
  const brands = await getBrands();
  const modelos = await getModelos();
  const total = await getVehiclesTotal();
  return (
    <div className="min-h-screen bg-background">
      <Inventory
        brands={brands}
        models={modelos}
        vehicles={vehicles}
        total={total}
      />
    </div>
  );
}
