import { RentCar } from "@/components/rent/rentComponent";
import { Alquiler } from "../inventario/page";
import { ApproveImportCar } from "@/lib/actions/actions";

export default async function RentPage() {
  const autos = await ApproveImportCar();
  return (
    <div className="min-h-screen bg-background w-full flex-col group/design-root overflow-x-hidden mt-20">
      <RentCar autos={autos} />
    </div>
  );
}
