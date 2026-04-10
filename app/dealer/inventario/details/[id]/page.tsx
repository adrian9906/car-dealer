import { DetailsComponent } from "@/components/inventario/detailsPage";
import { getVehicle } from "@/lib/actions/actions";
import { Vehicle } from "../../page";

type PageProps = {
  params: { vehicle: string };
};

export default async function DetailsPage({ params }: PageProps) {
  const vehicleDetails: Vehicle | null = await getVehicle(params.vehicle);
  return (
    <div className="min-h-screen bg-background mt-20">
      <DetailsComponent vehicle={vehicleDetails} />
    </div>
  );
}
