import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
        <Link
          href="/"
          className="text-white hover:text-blue-300 transition-colors font-sans font-medium text-sm uppercase tracking-wide"
        >
          INICIO
        </Link>
        <div className="relative group">
          <button className="text-white hover:text-blue-300 transition-colors font-sans font-medium flex items-center gap-1 text-sm uppercase tracking-wide">
            CATÁLOGO
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <Link
          href="/dealer/inventario"
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
