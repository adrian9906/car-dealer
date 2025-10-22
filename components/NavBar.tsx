import { createUrl } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const searchParams = new URLSearchParams();
  searchParams.append("marca", "all");
  searchParams.append("page", "1");
  searchParams.append("rows", "50");
  searchParams.append("modelo", "all");
  searchParams.append("sort", "fecha_llegada_cuba");
  searchParams.append("año", "all");
  searchParams.append("color", "all");
  searchParams.append("tipo_combustible", "all");
  searchParams.append("stock", "all");
  searchParams.append("category", "all");
  searchParams.append("price_min", "0");
  searchParams.append("price_max", "50000");
  searchParams.append("brand", "all");
  searchParams.append("location", "all");

  const hreff = createUrl("/dealer/inventario", searchParams).toString();
  return (
    <>
      <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
        <Link
          href="/"
          className="text-white hover:text-blue-300 transition-colors font-sans font-medium text-sm uppercase tracking-wide"
        >
          INICIO
        </Link>

        <Link
          href={hreff}
          className="text-white hover:text-blue-300 transition-colors font-sans font-medium text-sm uppercase tracking-wide"
        >
          INVENTARIO
        </Link>
        <Link
          href="/dealer/importacion"
          className="text-white hover:text-blue-300 transition-colors font-sans font-medium text-sm uppercase tracking-wide"
        >
          IMPORTACIÓN
        </Link>
        <Link
          href="#equipo"
          className="text-white hover:text-blue-300 transition-colors font-sans font-medium text-sm uppercase tracking-wide"
        >
          QUIÉNES SOMOS
        </Link>
        <Link
          href="#contacto"
          className="text-white hover:text-blue-300 transition-colors font-sans font-medium text-sm uppercase tracking-wide"
        >
          CONTÁCTENOS
        </Link>
      </div>
    </>
  );
}
