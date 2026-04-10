import {
  BadgeCheck,
  BookHeartIcon,
  CarFront,
  Check,
  Earth,
  Gem,
  MoveUpRight,
  SwatchBook,
} from "lucide-react";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background w-full flex-col group/design-root overflow-x-hidden">
      <main>
        <section className="relative h-[819px] max-w-7xl justify-between mx-auto flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-12 w-full">
            <p className="font-['Share_Tech_Mono'] text-primary  tracking-[0.4em] uppercase text-sm mb-4">
              EXCLUSIVIDAD SIN LÍMITES
            </p>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-on-surface leading-[0.8] max-w-4xl">
              Nuestra <br />
              <span className="text-primary italic">Pasión</span>
            </h1>
            <p className="mt-8 text-on-surface-variant text-lg max-w-xl leading-relaxed">
              Nacidos del rugido de los motores y la elegancia del diseño
              europeo y americano. Especialistas en traer el lujo automotriz
              directamente a tus manos.
            </p>
          </div>
          <div className="w-full max-w-md lg:max-w-xl">
            <img
              alt="Solar Kit Products"
              className="rounded-3xl shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500"
              src="/chevrolet-equinox-2023.png"
            />
          </div>
        </section>

        <section className="py-32 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group bg-surface-container-low p-12 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:bg-surface-container-high relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <CarFront className="w-30 h-30 text-blue-600 dark:text-white" />
                </div>
                <h3 className="font-['Share_Tech_Mono'] text-primary text-xs uppercase tracking-widest mb-6">
                  Propósito
                </h3>
                <h2 className="text-4xl font-bold mb-6 text-on-surface">
                  Nuestra Misión
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Facilitar el acceso a las joyas de la ingeniería automotriz
                  global, proporcionando un servicio de importación transparente
                  y un alquiler premium que redefine el concepto de conducir un
                  súper auto.
                </p>
              </div>

              <div className="group bg-surface-container-low p-12 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:bg-surface-container-high relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Earth className="w-30 h-30 text-blue-600 dark:text-white" />
                </div>
                <h3 className="font-['Share_Tech_Mono'] text-primary text-xs uppercase tracking-widest mb-6">
                  Dirección
                </h3>
                <h2 className="text-4xl font-bold mb-6 text-on-surface">
                  Nuestra Visión
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Ser el principal hub de movilidad de lujo en la región,
                  conectando a los entusiastas con las marcas más prestigiosas
                  de Europa y EE.UU. mediante una logística impecable y atención
                  personalizada.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface-container-lowest">
          <div className="max-w-screen-2xl mx-auto px-12">
            <div className="mb-20">
              <h2 className="text-5xl font-black tracking-tight mb-4">
                Nuestros Valores
              </h2>
              <div className="h-1 w-24 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="flex flex-col gap-4">
                <BadgeCheck className="text-primary text-4xl" />
                <h4 className="font-bold text-xl uppercase tracking-tighter">
                  Autenticidad
                </h4>
                <p className="text-on-surface-variant text-sm font-['Inter'] leading-relaxed">
                  Importación directa garantizando el origen y estado impecable
                  de cada vehículo de alta gama.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <SwatchBook className="text-primary text-4xl" />
                <h4 className="font-bold text-xl uppercase tracking-tighter">
                  Curaduría
                </h4>
                <p className="text-on-surface-variant text-sm font-['Inter'] leading-relaxed">
                  Selección meticulosa de modelos icónicos que representan lo
                  mejor del desempeño y el confort.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Gem className="text-primary text-4xl" />
                <h4 className="font-bold text-xl uppercase tracking-tighter">
                  Exclusividad
                </h4>
                <p className="text-on-surface-variant text-sm font-['Inter'] leading-relaxed">
                  Servicios diseñados para aquellos que buscan una experiencia
                  superior y única al volante.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <BookHeartIcon className="text-primary text-4xl" />
                <h4 className="font-bold text-xl uppercase tracking-tighter">
                  Confianza
                </h4>
                <p className="text-on-surface-variant text-sm font-['Inter'] leading-relaxed">
                  Transparencia absoluta en trámites aduaneros y contratos de
                  alquiler de corto y largo plazo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-black tracking-tight mb-6">
                  Expertos en Elite
                </h2>
                <p className="text-on-surface-variant text-lg">
                  Un equipo de especialistas dedicados a la logística
                  internacional y la gestión de flotas premium.
                </p>
              </div>
              <div className="font-['Share_Tech_Mono'] text-primary text-sm flex items-center gap-2">
                <span>CONOCER AL EQUIPO</span>
                <MoveUpRight className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                <div className="aspect-[4/5] bg-surface-container rounded-xl overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-700 border border-slate-800">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    data-alt="portrait of a sophisticated male executive in a bespoke grey suit, standing in front of a luxury car showroom glass wall"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXDIQ1qzolTVbkaMZH5EnKIfPV4qheaboq29AedEWLcdtQNo3H0YU9W9uQf2-49bRQQYHJSFqODcruduyppUpuQev5yLnl28tURVCPlJDbwdHhHfULWfvK52O9rSRe8ygnoSR40EBOUdyuBgHHzkzMFxd2MlhtY6AiiWpVpVtolwNpG81alzJxcVw0hiHls6SMvyBV7s6Vhy2IQ6IZTeYN_mcKsPJ2sHHk4OR_H-8s3Ut1SUCGT0OVNhooMok8pmebuv20SjIcDr8"
                  />
                </div>
                <h4 className="text-2xl font-bold tracking-tight">
                  Ricardo Valenzuela
                </h4>
                <p className="font-['Share_Tech_Mono'] text-primary text-xs uppercase mt-2">
                  Director de Importaciones (Europa &amp; USA)
                </p>
              </div>

              <div className="group">
                <div className="aspect-[4/5] bg-surface-container rounded-xl overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-700 border border-slate-800">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    data-alt="portrait of an elegant female professional with a tablet, minimalist modern office with car sketches in the background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA-vrnV06xj8C_6rzVt6skTC93mEViAJPFWHKPJJmmMnBFbgTO44hZQOtka-XZLpKVi00pJcR7SEujIrsMhcWTLqL782L5mESj2QHLVY9HXbP0EODr1GdgGoA4DkzSTJglcOyssSu4t123h6lG4HUD2OpnFsITNJ6kfPdeoiOU7n8rl9dVEKiX8V2jEX8Ax4VR0NF1kjI-8gSEpvIqdwZHHXYhRMtv_xw14mBRZGXXBkyYh5kzEDa_9sX2qoLNdTlyIuwUwo7vvuw"
                  />
                </div>
                <h4 className="text-2xl font-bold tracking-tight">
                  Sofía Conti
                </h4>
                <p className="font-['Share_Tech_Mono'] text-primary text-xs uppercase mt-2">
                  Gerente de Experiencia Premium y Alquiler
                </p>
              </div>

              <div className="group">
                <div className="aspect-[4/5] bg-surface-container rounded-xl overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-700 border border-slate-800">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    data-alt="portrait of a focused male logistics expert in a smart casual polo, background with shipping containers and luxury cars"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMA4xS8t1eMYTbHbDAYjroWabk7AnhFWijSv6dL6QzDgoNgUao0q34r1KaZ8dKwxf582XHk5OrM4Gi3FqJzuWVfc3JItv1j_1q3nFHYc8_eZAZgpOY3p2JAoV0GyhnuK_PB2j0i5Lo_nbc-VopOQ_KTQOsc4O3ic7HjwT0iY_gg6CDVAsAAgl0tlnBCILH26v3bWPc_joahhFt7l7z4N-CnjZpWdRLL1_yRJg9Nbo_iLM1pjS1XOOr9mbWOnb6iJgeER4EEa4VKLg"
                  />
                </div>
                <h4 className="text-2xl font-bold tracking-tight">
                  Marc Janssen
                </h4>
                <p className="font-['Share_Tech_Mono'] text-primary text-xs uppercase mt-2">
                  Jefe de Logística Automotriz Global
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
