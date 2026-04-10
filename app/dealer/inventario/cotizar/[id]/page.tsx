import { getVehicle } from "@/lib/actions/actions";
import { Vehicle } from "../../page";
import { CotizarComponent } from "@/components/inventario/cotizar";

type PageProps = {
  params: { vehicle: string };
};

export default async function CotizarPage({ params }: PageProps) {
  const { vehicle } = await params;
  const vehicle2: Vehicle | null = await getVehicle(vehicle);

  return (
    <div className="min-h-screen bg-background mt-20">
      <CotizarComponent vehicle={vehicle2} />
    </div>
  );
}
