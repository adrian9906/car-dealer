"use client";

import {
  Factory,
  ShieldCheck,
  Ship,
  Bell,
  Wrench,
  Car,
  BadgeCheck,
  Smartphone,
  Cpu,
  Crown,
  Phone,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function GarantiaPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Engine detail"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbNjHF357PtIbKACfLHhb4hu5YlrM7WJEawWHheMO_JzI2goYIb1ulg8j4ffH1mEFpIKYVExlogbQHMY9RPdT8LdSV7-OR9fZvPAJfkdStizCVC88it7Y-vgF1DuVuxkQi0Rp3Rnl4vVM5M5m_b1EmbJbgYeJgdPdEedsVpCfZKoM3soMlZsHRcKnp6aLXAR_3LPNL3pAorqJVQBY8tp9sTKXy3zUyVjKKAfz0w-ZPf9twnz3c8bw-yN8fDYsOn9quiZA_Ra3p814"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-secondary/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <Badge
            variant="outline"
            className="mb-4 text-xs tracking-[0.3em] uppercase font-mono text-primary border-primary/40"
          >
            Protección Absoluta
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 max-w-4xl font-mono">
            Garantía de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              Excelencia
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed font-sans">
            Nuestra curaduría trasciende la venta. Cada vehículo importado
            cuenta con el respaldo de un ecosistema de protección técnica de
            primer nivel.
          </p>
          <Button
            size="lg"
            className="font-mono font-bold px-8 py-6 text-base rounded-lg"
          >
            Explorar Coberturas
          </Button>
        </div>
      </section>

      {/* Niveles de Cobertura */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4 font-mono">
                Niveles de Cobertura
              </h2>
              <Separator className="w-24 bg-primary h-1" />
            </div>
            <p className="text-muted-foreground text-sm max-w-md font-mono uppercase tracking-widest">
              Estándares de calidad ISO-9001 / Auditoría técnica independiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "Garantía de Fábrica",
                description:
                  "Transferencia completa de la garantía original del fabricante, gestionada directamente por nuestro equipo legal en el país de origen.",
                items: ["Tren motriz 100%", "Sistemas híbridos"],
              },
              {
                icon: ShieldCheck,
                title: "Garantía Extendida",
                description:
                  "Planes adicionales de hasta 48 meses diseñados para vehículos de alto rendimiento, cubriendo componentes electrónicos críticos.",
                items: ["Electrónica avanzada", "Asistencia VIP"],
              },
              {
                icon: Ship,
                title: "Cobertura de Importación",
                description:
                  "Seguro Todo Riesgo durante el tránsito transatlántico y garantía de homologación local inmediata al arribo.",
                items: ["Protección de carga", "Homologación total"],
              },
            ].map(({ icon: Icon, title, description, items }) => (
              <Card
                key={title}
                className="border-l-4 border-l-primary/20 hover:border-l-primary hover:shadow-lg transition-all duration-500 group"
              >
                <CardHeader>
                  <div className="mb-2">
                    <Icon className="h-9 w-9 text-primary" />
                  </div>
                  <CardTitle className="font-mono text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                    {description}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs font-mono text-primary uppercase"
                      >
                        <BadgeCheck className="h-4 w-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* El Proceso */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-4 text-xs uppercase tracking-widest font-mono text-primary border-primary/40"
            >
              Protocolo de Operación
            </Badge>
            <h2 className="text-5xl font-extrabold font-mono mt-4">
              Eficiencia Sin Burocracia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
            {[
              {
                icon: Smartphone,
                step: "01",
                title: "Notificación Digital",
                description:
                  "Reporte el incidente a través de nuestra App o línea Concierge 24/7 de forma instantánea.",
              },
              {
                icon: Cpu,
                step: "02",
                title: "Diagnóstico Remoto",
                description:
                  "Nuestros ingenieros analizan la telemetría del vehículo para coordinar la logística necesaria.",
              },
              {
                icon: Crown,
                step: "03",
                title: "Resolución Premium",
                description:
                  "Traslado a taller certificado y entrega de vehículo de sustitución en su domicilio.",
              },
            ].map(({ icon: Icon, step, title, description }) => (
              <div
                key={step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center font-mono text-2xl text-primary mb-8 shadow-lg">
                  {step}
                </div>
                <Icon className="h-6 w-6 text-muted-foreground mb-4" />
                <h4 className="font-mono text-xl font-bold mb-3">{title}</h4>
                <p className="text-muted-foreground text-sm font-sans">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid - Ventajas */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[600px]">
            {/* Card grande */}
            <Card className="md:col-span-2 md:row-span-2 relative overflow-hidden group p-0 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-500">
              <img
                alt="Luxury car interior"
                src="/honda-crv-dashboard.png"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="relative z-10 flex flex-col justify-end h-full p-10">
                <Car className="h-12 w-12 text-primary mb-6" />
                <h3 className="font-mono text-3xl font-bold mb-4">
                  Vehículo de Sustitución Premium
                </h3>
                <p className="text-muted-foreground max-w-sm font-sans text-sm leading-relaxed">
                  Si su vehículo requiere más de 24h de intervención,
                  garantizamos un modelo de gama equivalente para que su
                  movilidad nunca se detenga.
                </p>
              </div>
            </Card>

            {/* Card pequeña 1 */}
            <Card className="md:col-span-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300">
              <CardContent className="flex items-center gap-6 h-full p-8">
                <div className="bg-primary/10 p-4 rounded-full shrink-0">
                  <Bell className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-mono text-xl font-bold mb-1">
                    Asistencia Concierge 24/7
                  </h3>
                  <p className="text-muted-foreground text-sm font-sans">
                    Soporte técnico y logístico en carretera en cualquier punto
                    del territorio.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card pequeña 2 */}
            <Card className="md:col-span-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300">
              <CardContent className="flex items-center gap-6 h-full p-8">
                <div className="bg-primary/10 p-4 rounded-full shrink-0">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-mono text-xl font-bold mb-1">
                    Talleres Certificados
                  </h3>
                  <p className="text-muted-foreground text-sm font-sans">
                    Acceso exclusivo a la red oficial de especialistas con
                    recambios originales garantizados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sello de Confianza */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="font-mono text-4xl font-bold mb-6">
              El Sello de Calidad
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 font-sans">
              Cada unidad que importamos se somete a una inspección de 150
              puntos clave realizada por ingenieros certificados. No solo
              vendemos autos, entregamos certezas mecánicas y estéticas.
            </p>
            <div className="flex flex-wrap gap-8 opacity-60">
              {[
                { icon: BadgeCheck, label: "ISO 9001" },
                { icon: ShieldCheck, label: "TÜV SÜD" },
                { icon: Crown, label: "Certified Luxe" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="h-8 w-8" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <img
              alt="Technical inspection"
              src="/cuban-manager-professional.png"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2 className="font-mono text-5xl font-black mb-8 leading-tight">
            ¿Listo para conducir con total tranquilidad?
          </h2>
          <p className="text-muted-foreground text-lg mb-12 font-sans">
            Solicite una consulta personalizada con uno de nuestros asesores de
            garantía y descubra el plan que mejor se adapta a su nueva
            adquisición.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              size="lg"
              variant="outline"
              className="font-mono font-bold px-10 py-6 text-base rounded-lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contactar Asesor
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
