import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Alquiler, Vehicle } from "@/app/dealer/inventario/page";
import { usePrevNextButtons } from "@/hooks/use-nextCarrusel";
import useEmblaCarousel from "embla-carousel-react";
import { RentCard } from "./rentCard";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Car } from "lucide-react";

export async function RentCar({ autos }: { autos: Alquiler[] }) {
  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-6xl flex-1">
        <div className="flex-grow">
          <div className="@container">
            <div className="@[480px]:p-4 py-10">
              <div className="relative flex min-h-[calc(100vh-80px)] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 overflow-hidden">
                <Image
                  src="/ford-mustang-2023.png"
                  alt="A sleek, modern luxury car driving on a coastal road at sunset."
                  width={1200}
                  height={800}
                  className="absolute inset-0 w-full h-full object-cover bg-center bg-no-repeat z-0 dark:opacity-60 opacity-85"
                />
                <div className="absolute inset-0 bg-transparent z-10" />
                <div className="relative z-20 flex flex-1 flex-col mb-14 justify-center items-center text-center p-8 gap-6">
                  <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Experiencia de calidad en la carretera.
                    </h1>
                    <h2 className="text-white text-xl font-extrabold leading-normal @[480px]:text-2xl @[480px]:font-normal @[480px]:leading-normal">
                      Renta el auto de tus sueños hoy.
                    </h2>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 @[480px]:h-14 @[480px]:px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] @[480px]:text-lg @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] transition-transform hover:scale-105">
                    <Link href="#rent" className="truncate">
                      Reservar ahora
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 pt-5">
            <h2 className="text-primary dark:text-primary text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Nuestros autos
            </h2>
          </div>
          {autos && autos.length > 0 ? (
            <Carousel id="rent" className="w-full" opts={{ slidesToScroll: 1 }}>
              <CarouselContent className="-ml-1">
                {autos?.map((car, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-full md:basis-1/2"
                  >
                    <div className="p-1">
                      <RentCard car={car} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {autos && autos.length > 1 && (
                <>
                  <CarouselPrevious
                    size={"lg"}
                    className="border border-primary w-10 hover:text-primary/50"
                  />
                  <CarouselNext
                    size={"lg"}
                    className="border border-primary w-10 hover:text-primary/50"
                  />
                </>
              )}
            </Carousel>
          ) : (
            <>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia
                    variant="icon"
                    className="h-24 w-24 bg-transparent"
                  >
                    <Car size={30} className="size-24" />
                  </EmptyMedia>
                  <EmptyTitle>No hay autos disponibles</EmptyTitle>
                  <EmptyDescription>
                    Por favor, vuelve más tarde.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button>
                    <a href="/">Inicio</a>
                  </Button>
                </EmptyContent>
              </Empty>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
