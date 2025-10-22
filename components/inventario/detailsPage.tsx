"use client";

import { Vehicle } from "@/app/dealer/inventario/page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

export function DetailsComponent({ vehicle }: { vehicle: Vehicle | null }) {
  const features = vehicle?.features.split(",");
  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap gap-2 p-4 text-">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dealer/inventario">Inventario</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary">
                    {vehicle?.marca}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 p-4">
            <div className="lg:w-2/3">
              <div className="@container">
                <div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-80">
                  {vehicle?.imagen}
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Descripción del {vehicle?.marca} - {vehicle?.año}
                </h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-primary">
                  {vehicle?.descripcion
                    ? vehicle.descripcion
                    : "No hay descripción"}
                </p>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Accesorios &amp; Opciones
                </h2>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-primary">
                  {features?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="flex flex-wrap justify-between gap-3">
                <p className="text-primary  text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                  {vehicle?.marca} {vehicle?.modelo} {vehicle?.año}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4">
                <Card className="flex flex-1 gap-3 rounded-lg border border-border-light dark:border-border-dark dark:bg-slate-800 p-4 flex-col">
                  <CardHeader className="flex flex-col gap-1 px-1">
                    <h2 className=" material-symbols-outlined text-text-light dark:text-text-dark text-base font-bold leading-tight">
                      Transmisión
                    </h2>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1 px-1">
                    <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">
                      {vehicle?.transmision.toUpperCase()}
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex flex-1 gap-3 rounded-lg border border-border-light dark:border-border-dark dark:bg-slate-800 p-4 flex-col">
                  <CardHeader className="flex flex-col gap-1 px-1">
                    <h2 className=" material-symbols-outlined text-text-light dark:text-text-dark text-base font-bold leading-tight">
                      Kilometraje
                    </h2>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1 px-1">
                    <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">
                      {vehicle?.kilometraje.toLocaleString()} km
                    </p>
                  </CardContent>
                </Card>

                <Card className="flex flex-1 gap-3 rounded-lg border border-border-light  dark:border-border-dark dark:bg-slate-800 p-4 flex-col">
                  <CardHeader className="flex flex-col gap-1 px-1">
                    <h2 className=" material-symbols-outlined text-text-light dark:text-text-dark text-base font-bold leading-tight">
                      Motor
                    </h2>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1 px-1">
                    <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">
                      {vehicle?.tipo_combustible.toUpperCase()}
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex flex-1 gap-3 rounded-lg border border-border-light dark:border-border-dark dark:bg-slate-800  p-4 flex-col">
                  <CardHeader className="flex flex-col gap-1 px-1">
                    <h2 className=" material-symbols-outlined text-text-light dark:text-text-dark text-base font-bold leading-tight">
                      Categoría
                    </h2>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1 px-1">
                    <p className="text-text-light/70 dark:text-text-dark/70 text-sm font-normal leading-normal">
                      {vehicle?.category.toUpperCase()}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="p-4">
                <h1 className="text-primary tracking-light text-[32px] font-bold leading-tight text-left pb-3 pt-6">
                  {vehicle?.precio_venta?.toLocaleString()} $
                </h1>
                <Button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Comprar
                </Button>
                <Button className="w-full mt-2 bg-secondary text-white dark:text-primary font-bold py-3 px-4 rounded-lg hover:bg-secondary/90 transition-colors">
                  Añadir a favoritos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
