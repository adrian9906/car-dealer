"use client";

import {
  Car,
  Truck,
  MapPin,
  Star,
  Users,
  Shield,
  Search,
  Phone,
  Mail,
} from "lucide-react";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function MainContent() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-slate-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-foreground  font-mono tracking-tight">
                AUTOCUBA 01
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-foreground font-sans max-w-4xl mx-auto leading-relaxed">
                movilidad premium, tecnología avanzada y confianza garantizada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-indigo-950 hover:bg-indigo-900 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Conoce más
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 dark:border-white dark:text-foreground dark:hover:bg-indigo-950 dark:hover:text-white bg-transparent"
              >
                Ver Catálogo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categorias" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h3 className="text-4xl font-bold text-foreground dark:text-foreground mb-4 font-mono">
              Explora Nuestras Categorías
            </h3>
            <p className="text-xl text-slate-900 dark:text-white font-sans">
              Encuentra el vehículo perfecto para tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal">
            {/* Sedanes */}
            <Card className="group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-slate-100 dark:bg-transparent rounded-full w-fit">
                  <Car className="h-8 w-8 text-slate-900 dark:text-primary" />
                </div>
                <CardTitle className="font-mono text-slate-900 dark:text-foreground font-bold">
                  Sedanes
                </CardTitle>
                <CardDescription className="font-sans text-slate-600 dark:text-slate-400">
                  Elegancia y comodidad para el día a día
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center font-sans">
                  Desde $15,000
                </p>
              </CardContent>
            </Card>

            {/* SUVs */}
            <Card className="group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-slate-100 dark:bg-transparent rounded-full w-fit">
                  <Truck className="h-8 w-8 text-slate-900 dark:text-primary" />
                </div>
                <CardTitle className="font-mono text-slate-900 dark:text-foreground">
                  SUVs
                </CardTitle>
                <CardDescription className="font-sans text-slate-600 dark:text-slate-400">
                  Espacio y versatilidad para toda la familia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center font-sans">
                  Desde $22,000
                </p>
              </CardContent>
            </Card>

            {/* Camionetas */}
            <Card className="group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-slate-100 dark:bg-transparent rounded-full w-fit">
                  <Truck className="h-8 w-8 text-slate-900 dark:text-primary" />
                </div>
                <CardTitle className="font-mono text-slate-900 dark:text-foreground">
                  Camionetas
                </CardTitle>
                <CardDescription className="font-sans text-slate-600 dark:text-slate-400">
                  Potencia y resistencia para el trabajo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center font-sans">
                  Desde $28,000
                </p>
              </CardContent>
            </Card>

            {/* Compactos */}
            <Card className="group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-slate-100 dark:bg-transparent rounded-full w-fit">
                  <Car className="h-8 w-8 text-slate-900 dark:text-primary" />
                </div>
                <CardTitle className="font-mono text-slate-900 dark:text-foreground">
                  Compactos
                </CardTitle>
                <CardDescription className="font-sans text-slate-600 dark:text-slate-400">
                  Eficiencia y economía urbana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center font-sans">
                  Desde $12,000
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Purchase Options */}
      <section className="py-20 bg-background" id="opciones">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h3 className="text-4xl font-bold text-foreground mb-4 font-mono">
              Opciones de Compra
            </h3>
            <p className="text-xl text-muted-foreground font-sans">
              Elige la opción que mejor se adapte a ti
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto scroll-reveal">
            {/* Stock Local */}
            <Card className="relative overflow-hidden border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-mono">
                      Stock Local
                    </CardTitle>
                    <CardDescription className="font-sans">
                      Disponible inmediatamente en Cuba
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Entrega inmediata
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Inspección previa disponible
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Garantía local
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Financiamiento disponible
                  </li>
                </ul>
                <Link href="/inventario">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans">
                    Ver Inventario Local
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Importación USA */}
            <Card className="relative overflow-hidden border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-mono">
                      Importación USA
                    </CardTitle>
                    <CardDescription className="font-sans">
                      Vehículos directos desde Estados Unidos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Mayor variedad de modelos
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Precios competitivos
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Gestión completa de importación
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Tiempo de entrega: 4-6 semanas
                  </li>
                </ul>
                <Link href="/importacion">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans">
                    Solicitar Importación
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" id="testimonios">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h3 className="text-4xl font-bold text-foreground mb-4 font-mono">
              Lo Que Dicen Nuestros Clientes
            </h3>
            <p className="text-xl text-muted-foreground font-sans">
              Historias reales de clientes satisfechos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto scroll-reveal">
            <Card className="text-center border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src="/cuban-professional-smile.png"
                    alt="Carlos Rodríguez"
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                </div>
                <CardTitle className="font-mono">Carlos Rodríguez</CardTitle>
                <CardDescription className="font-sans">
                  Compró Honda CR-V 2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground font-sans italic text-sm">
                  "Excelente servicio desde el primer día. Mi Honda CR-V llegó
                  en perfectas condiciones y el proceso de importación fue muy
                  transparente."
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src="/placeholder-l6hfc.png"
                    alt="María González"
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                </div>
                <CardTitle className="font-mono">María González</CardTitle>
                <CardDescription className="font-sans">
                  Compró Toyota Corolla 2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground font-sans italic text-sm">
                  "El equipo de AutoCuba me ayudó a encontrar el auto perfecto
                  para mi familia. El financiamiento fue muy accesible."
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src="/professional-cuban-man-smiling.png"
                    alt="José Martínez"
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                </div>
                <CardTitle className="font-mono">José Martínez</CardTitle>
                <CardDescription className="font-sans">
                  Compró Ford F-150 2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground font-sans italic text-sm">
                  "Necesitaba una camioneta para mi negocio y AutoCuba me
                  consiguió exactamente lo que buscaba. Muy profesionales."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50" id="equipo">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h3 className="text-4xl font-bold text-foreground mb-4 font-mono">
              Nuestro Equipo Profesional
            </h3>
            <p className="text-xl text-muted-foreground font-sans">
              Expertos dedicados a encontrar tu vehículo ideal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto scroll-reveal">
            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src="/placeholder-zbtpu.png"
                    alt="Roberto Fernández"
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                </div>
                <CardTitle className="font-mono">Roberto Fernández</CardTitle>
                <CardDescription className="font-sans">
                  Gerente General
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-sans mb-3">
                  15+ años de experiencia en el sector automotriz cubano
                </p>
                <Badge variant="secondary" className="text-xs font-sans">
                  Liderazgo
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src="/cuban-sales-woman-professional.png"
                    alt="Ana María López"
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                </div>
                <CardTitle className="font-mono">Ana María López</CardTitle>
                <CardDescription className="font-sans">
                  Asesora de Ventas Senior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-sans mb-3">
                  Especialista en financiamiento y seguros vehiculares
                </p>
                <Badge variant="secondary" className="text-xs font-sans">
                  Ventas
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src="/cuban-mechanic-expert.png"
                    alt="Miguel Rodríguez"
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                </div>
                <CardTitle className="font-mono">Miguel Rodríguez</CardTitle>
                <CardDescription className="font-sans">
                  Jefe de Taller
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-sans mb-3">
                  Certificado en inspección y mantenimiento vehiculares
                </p>
                <Badge variant="secondary" className="text-xs font-sans">
                  Técnico
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="mx-auto mb-4">
                  <img
                    src="/cuban-import-specialist.png"
                    alt="Carmen Díaz"
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                </div>
                <CardTitle className="font-mono">Carmen Díaz</CardTitle>
                <CardDescription className="font-sans">
                  Especialista en Importación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-sans mb-3">
                  Experta en trámites aduanales y logística internacional
                </p>
                <Badge variant="secondary" className="text-xs font-sans">
                  Importación
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16 scroll-reveal">
            <div className="max-w-3xl mx-auto">
              <h4 className="text-2xl font-bold text-foreground mb-4 font-mono">
                ¿Por Qué Elegir AutoCuba?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h5 className="font-semibold mb-2 font-sans">
                    Equipo Experimentado
                  </h5>
                  <p className="text-sm text-muted-foreground font-sans">
                    Más de 50 años de experiencia combinada
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h5 className="font-semibold mb-2 font-sans">
                    Garantía Total
                  </h5>
                  <p className="text-sm text-muted-foreground font-sans">
                    Respaldamos cada vehículo que vendemos
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h5 className="font-semibold mb-2 font-sans">
                    Servicio Premium
                  </h5>
                  <p className="text-sm text-muted-foreground font-sans">
                    Atención personalizada de principio a fin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" id="servicios">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h3 className="text-4xl font-bold text-foreground mb-4 font-mono">
              Nuestros Servicios Completos
            </h3>
            <p className="text-xl text-muted-foreground font-sans">
              Todo lo que necesitas para tu próximo vehículo en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto scroll-reveal">
            {/* Venta Local */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-mono">Venta Local</CardTitle>
                    <CardDescription className="font-sans">
                      Stock disponible en Cuba
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Inspección completa antes de la venta
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Prueba de manejo disponible
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Entrega inmediata
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Documentación completa
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Importación USA */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-mono">Importación USA</CardTitle>
                    <CardDescription className="font-sans">
                      Vehículos desde Estados Unidos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Gestión completa de trámites
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Seguimiento en tiempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Seguro de transporte incluido
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Entrega en 4-6 semanas
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Financiamiento */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-mono">Financiamiento</CardTitle>
                    <CardDescription className="font-sans">
                      Opciones flexibles de pago
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Hasta 60 meses de financiamiento
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Tasas competitivas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Aprobación rápida
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Sin penalización por pago anticipado
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Garantía */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-mono">
                      Garantía Extendida
                    </CardTitle>
                    <CardDescription className="font-sans">
                      Protección completa
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Garantía de motor y transmisión
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Cobertura hasta 3 años
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Red de talleres autorizados
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Asistencia en carretera 24/7
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Servicio Técnico */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-mono">
                      Servicio Técnico
                    </CardTitle>
                    <CardDescription className="font-sans">
                      Mantenimiento especializado
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Inspección pre-entrega gratuita
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Mantenimiento preventivo
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Repuestos originales
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Técnicos certificados
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Asesoría Personalizada */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary border-primary/20 hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-mono">
                      Asesoría Personalizada
                    </CardTitle>
                    <CardDescription className="font-sans">
                      Atención especializada
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Consulta gratuita de necesidades
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Comparación de modelos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Análisis de financiamiento
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Seguimiento post-venta
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Service Process Timeline */}
          <div className="mt-20 scroll-reveal">
            <div className="text-center mb-12">
              <h4 className="text-3xl font-bold text-foreground mb-4 font-mono">
                Nuestro Proceso de Servicio
              </h4>
              <p className="text-lg text-muted-foreground font-sans">
                Un proceso simple y transparente de principio a fin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center relative">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-primary/20 hidden md:block md:w-full md:left-full"></div>
                <h5 className="font-bold mb-2 font-sans">1. Consulta</h5>
                <p className="text-sm text-muted-foreground font-sans">
                  Evaluamos tus necesidades y presupuesto
                </p>
              </div>

              <div className="text-center relative">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-primary/20 hidden md:block md:w-full md:left-full"></div>
                <h5 className="font-bold mb-2 font-sans">2. Búsqueda</h5>
                <p className="text-sm text-muted-foreground font-sans">
                  Encontramos el vehículo perfecto para ti
                </p>
              </div>

              <div className="text-center relative">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-primary/20 hidden md:block md:w-full md:left-full"></div>
                <h5 className="font-bold mb-2 font-sans">3. Financiamiento</h5>
                <p className="text-sm text-muted-foreground font-sans">
                  Estructuramos el mejor plan de pago
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h5 className="font-bold mb-2 font-sans">4. Entrega</h5>
                <p className="text-sm text-muted-foreground font-sans">
                  Recibe tu vehículo listo para rodar
                </p>
              </div>
            </div>
          </div>

          {/* Service Guarantee */}
          <div className="mt-16 text-center scroll-reveal">
            <div className="max-w-4xl mx-auto bg-primary/5 rounded-lg p-8 border border-primary/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="h-8 w-8 text-primary" />
                <h4 className="text-2xl font-bold text-foreground font-mono">
                  Garantía de Satisfacción
                </h4>
              </div>
              <p className="text-lg text-muted-foreground font-sans mb-6">
                Si no estás completamente satisfecho con nuestro servicio en los
                primeros 30 días, te devolvemos tu dinero.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cotizar">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
                  >
                    Solicitar Cotización Gratuita
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans bg-transparent"
                >
                  Contactar un Asesor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-foreground mb-4 font-mono">
              ¿Listo para tu Próximo Auto?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 font-sans">
              Nuestro equipo de expertos está aquí para ayudarte a encontrar el
              vehículo perfecto
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
              >
                <Phone className="h-5 w-5 mr-2" />
                Llamar: +53 5555-5555
              </Button>
              <Link href="/cotizar">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans bg-transparent"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Solicitar Cotización
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
