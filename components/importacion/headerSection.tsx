import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Globe, Shield, Users } from "lucide-react";

export function HeaderImport() {
  return (
    <>
      <section className="py-1 bg-gradient-to-br from-background to-muted">
        <div className="layout-container flex h-full grow flex-col mt-2">
          <div className="px-4 sm:px-10 md:px-15 lg:px-30 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-7xl flex-1">
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div className="relative flex min-h-[calc(100vh-80px)] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded-xl overflow-hidden">
                    <Image
                      alt="imagen del auto"
                      src="/autos/importCard.jpg"
                      width={1600}
                      height={1000}
                      className="absolute inset-0 w-full h-full object-cover bg-center bg-no-repeat z-0 dark:opacity-60 opacity-85"
                    />

                    <div className="absolute inset-0 bg-transparent z-10 " />

                    {/* Contenido superpuesto */}
                    <div className="relative z-20 flex flex-1 flex-col justify-center items-center text-center p-8 gap-6">
                      <div className="flex flex-col gap-4 max-w-3xl mt-17">
                        <h1 className="text-black dark:text-white text-4xl md:text-6xl font-display font-bold tracking-tight drop-shadow-lg">
                          Importación de Vehículos Exclusivos
                        </h1>
                        <h2 className="text-black dark:text-white text-3xl font-extrabold md:text-xl font-body leading-7 mt-9">
                          Te guiamos en cada paso del proceso para que tengas el
                          auto de tus sueños, directamente desde el fabricante
                          hasta tu puerta.
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl text-primary font-bold  mb-2 font-sans">
                2000+
              </div>
              <div className="text-primary/60 font-serif">
                Vehículos Importados
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2 font-sans">
                4-6
              </div>
              <div className="text-primary/60 font-serif">
                Semanas de Entrega
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2 font-sans">
                100%
              </div>
              <div className="text-primary/60 font-serif">Gestión Completa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">
              ¿Por qué Importar con AutoCuba?
            </h2>
            <p className="text-xl text-muted-foreground font-serif">
              Somos expertos en importación de vehículos con más de 15 años de
              experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Globe className="h-6 w-6 text-accent dark:text-primary" />
                </div>
                <CardTitle className="font-sans">Acceso Global</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Acceso a miles de vehículos en subastas y dealers de Estados
                  Unidos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Shield className="h-6 w-6 text-accent dark:text-primary" />
                </div>
                <CardTitle className="font-sans">Garantía Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Garantía completa en el proceso y inspección detallada antes
                  del envío
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Users className="h-6 w-6 text-accent dark:text-primary" />
                </div>
                <CardTitle className="font-sans">Equipo Experto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Especialistas en importación que manejan todos los trámites
                  legales
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group border-primary/20 hover:border-primary group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Award className="h-6 w-6 text-accent dark:text-primary" />
                </div>
                <CardTitle className="font-sans">Mejor Precio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-serif">
                  Precios competitivos y transparentes sin costos ocultos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">
              Proceso de Importación
            </h2>
            <p className="text-xl text-muted-foreground font-serif">
              Un proceso simple y transparente de principio a fin
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">
                    1
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">
                  Solicitud
                </h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Completas el formulario con tus preferencias de vehículo
                </p>
                <div className="text-xs text-accent mt-2 font-serif">
                  1-2 días
                </div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">
                    2
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">
                  Búsqueda
                </h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Localizamos el vehículo perfecto en nuestras fuentes en USA
                </p>
                <div className="text-xs text-accent mt-2 font-serif">
                  3-7 días
                </div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">
                    3
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">
                  Compra y Envío
                </h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Compramos el vehículo y gestionamos el envío marítimo
                </p>
                <div className="text-xs text-accent mt-2 font-serif">
                  2-3 semanas
                </div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-fit">
                  <span className="text-2xl font-bold text-accent-foreground font-sans">
                    4
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 font-sans">
                  Entrega
                </h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Gestionamos la aduana y te entregamos tu vehículo listo
                </p>
                <div className="text-xs text-accent mt-2 font-serif">
                  1-2 semanas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
