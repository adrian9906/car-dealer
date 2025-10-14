import { Car } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-muted text-muted-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-6 w-6 text-primary" />
                <h4 className="text-xl font-bold font-mono">AutoCuba</h4>
              </div>
              <p className="text-sm text-muted-foreground font-sans">
                El dealer de confianza en Cuba para tu próximo vehículo.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-sans">Categorías</h5>
              <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                <li>Sedanes</li>
                <li>SUVs</li>
                <li>Camionetas</li>
                <li>Compactos</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-sans">Servicios</h5>
              <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                <li>Stock Local</li>
                <li>Importación USA</li>
                <li>Financiamiento</li>
                <li>Garantía</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-sans">Contacto</h5>
              <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                <li>+53 5555-5555</li>
                <li>info@autocuba.com</li>
                <li>La Habana, Cuba</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground/60 font-sans text-sm">
            <p>&copy; 2024 AutoCuba. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
