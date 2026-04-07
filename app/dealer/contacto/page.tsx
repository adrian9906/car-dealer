import { MapPin, PhoneCall, Mail, ChevronDown, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const faqs = [
    {
      q: "¿Cuáles son los requisitos para la renta de vehículos de alta gama?",
      a: "Solicitamos identificación oficial vigente, licencia de conducir internacional (si aplica) y una tarjeta de crédito de alta denominación para la garantía. El conductor debe ser mayor de 25 años.",
    },
    {
      q: "¿Cuál es el tiempo estimado para una importación personalizada?",
      a: "Desde la selección del vehículo en origen hasta la entrega en nuestro showroom con placas y trámites legales concluidos, el proceso suele tomar entre 4 y 8 semanas dependiendo de la logística marítima y aduanal.",
    },
    {
      q: "¿Qué cobertura incluyen los seguros de alquiler?",
      a: "Nuestros alquileres incluyen cobertura total (CDW/LDW) sin deducible para daños materiales, responsabilidad civil extendida y asistencia vial 24/7 de grado premium.",
    },
  ];
  return (
    <div className="min-h-screen bg-background w-full flex-col group/design-root overflow-x-hidden text-foreground">
      <div>
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d37] to-[#10131a] z-0" />
          <div className="absolute inset-0 opacity-10 pointer-events-none w-full h-full">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkv0wgImauJ3OpbNeFQjkzzrW5yQGbOLPUkA0lM7FRx5B5qGS5-c0yuAYRLK33ktsz7VDL5HkduKOxuwSvAoCsIlRbdYu6yKUAbnushT3qa6QuKwlYfE9VLa2KGSryRU8kT-S4cjQWHEc0D3tz_WvIoHvuJdyjiVEBA8d3NY2PI11EB5WH5p9I0krJG9_gsXMQ9NX5jcVMKnhDYk1TAekb3UQJPjJn9LUOy9rB_W7mnlMiI6DgTlUAlXxN723dCQxNQceGEjkNYCs"
              alt="Contacto"
              className="object-cover w-full h-full grayscale opacity-40 hover:opacity-60 transition-opacity duration-700 cursor-crosshair"
            />
          </div>
          <div className="relative z-10 text-center px-6">
            <p className="font-mono text-foreground text-sm tracking-[0.3em] uppercase mb-4">
              Servicio Concierge Automotriz
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6">
              Contáctanos
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
        </section>

        {/* Form + Info Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form Card */}
            <div className="lg:col-span-7 bg-border border border-primary p-8 md:p-12 rounded-xl shadow-xl">
              <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
                  Solicitud de Servicio
                </h2>
                <p className="text-primary/70 font-light">
                  Especifique su interés y nuestro equipo premium le contactará
                  en breve.
                </p>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-sm uppercase tracking-widest text-foreground/70">
                      Nombre Completo
                    </Label>
                    <Input
                      className="border-none focus-visible:ring-1  text-primary placeholder:text-primary/80"
                      placeholder="Ej. Carlos Slim"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className=" text-sm uppercase tracking-widest text-foreground/70">
                      Correo Electrónico
                    </Label>
                    <Input
                      className="border-none focus-visible:ring-1  text-primary placeholder:text-primary/80"
                      placeholder="info@autocuba.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-sm uppercase tracking-widest text-foreground/70">
                      Interés Principal
                    </Label>
                    <Select>
                      <SelectTrigger className="border-none focus:ring-1 focus:ring-secondary/50 text-primary">
                        <SelectValue
                          className="text-primary"
                          placeholder="Seleccione una opción"
                        />
                      </SelectTrigger>
                      <SelectContent className="text-primary">
                        <SelectItem value="renta">Renta de Lujo</SelectItem>
                        <SelectItem value="importacion">
                          Importación Directa
                        </SelectItem>
                        <SelectItem value="alquiler">
                          Alquiler Corporativo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm uppercase tracking-widest text-foreground/70">
                      Modelo de Interés
                    </Label>
                    <Input
                      className="border-none text-primary placeholder:text-primary/80"
                      placeholder="Ej. Porsche 911 GT3"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm uppercase tracking-widest text-foreground/70">
                    Detalles Adicionales
                  </Label>
                  <Textarea
                    className="bg-surface-container-lowest border-none focus-visible:ring-1 focus-visible:ring-secondary/50 text-primary placeholder:text-primary/80 resize-none"
                    placeholder="Cuéntenos sobre sus requerimientos específicos..."
                    rows={4}
                  />
                </div>

                <Button
                  className="group relative flex items-center gap-2 w-full md:w-auto px-12 py-4 bg-primary text-white  font-bold uppercase tracking-widest text-sm rounded-lg hover:shadow-[0_0_20px_rgba(78,214,251,0.3)] transition-all overflow-hidden"
                  type="submit"
                >
                  <Send className="w-4 h-4 text-primary shrink-0" />
                  <span className="relative z-10">Enviar Solicitud VIP</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </Button>
              </form>
            </div>

            {/* Info + Image */}
            <div className="lg:col-span-5 flex flex-col space-y-8 ">
              <div className=" bg-border  border-primary p-8 rounded-xl border-l-4 ">
                <h3 className="text-primary/80 text-xs tracking-widest uppercase mb-6">
                  Showroom Principal
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-container p-3 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-primary/80 uppercase mb-1">
                        Dirección Elite
                      </p>
                      <p className="text-foreground font-medium">
                        Torre LUXE, Paseo de la Reforma 2500, Lomas de
                        Chapultepec, CDMX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-container p-3 rounded-lg">
                      <PhoneCall className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-primary/80 uppercase mb-1">
                        Concierge 24/7
                      </p>
                      <p className="text-foreground font-medium">
                        +52 (55) 9000-LUXE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-container p-3 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-primary/80 uppercase mb-1">
                        Consultas Ejecutivas
                      </p>
                      <p className="text-foreground font-medium">
                        info@autocuba.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-grow min-h-[300px] bg-surface-container-high rounded-xl overflow-hidden relative shadow-2xl">
                <img
                  alt="Showroom exterior"
                  className="w-full h-full object-cover grayscale opacity-40 hover:opacity-60 transition-opacity duration-700 cursor-crosshair"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-hnE8_P_fPG8TWMWHovVxtoIF3A6Wn7vY3uqy48Ndtkzr7QXihScbzInZ7oKggI3gOgmsCgRlOw9iWGQagAOD2TXl8AfDVSlvqsx16xjHhsQePmtbCuHffQF4ti6_3JuiUildwE2uFcikRdQ6pOAqHW5FxEveRweDW8r-OOy4Gtzpx3IT_U4LNw5lzwWQrdQkKVUgh-asekbOjlpuyz5SYmkXvUNwDKyR24EJCw3M1-thfoJiu_cQThUQKScsK17tcDUlLx219vE"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-secondary/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-border py-24 border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-primary mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-foreground/70 max-w-xl mx-auto">
                Todo lo que necesita saber sobre nuestra gestión de flota
                exclusiva.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-surface-container rounded-xl overflow-hidden border-none px-6"
                >
                  <AccordionTrigger className="font-medium text-primary hover:text-primary hover:no-underline py-6 [&>svg]:text-primary [&>svg]:w-5 [&>svg]:h-5">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 font-bold text-sm leading-relaxed border-t border-outline-variant/10 pt-4 pb-6">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
}
