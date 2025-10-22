"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const heroImages = [
  "autos/carrusel1.png",
  "autos/carrusel2.png",
  "autos/carrusel3.png",
];

export default function ImageCarrusel() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-slate-800 ">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {heroImages.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt="car-dealer-cuba"
                    className="object-cover w-[100vw] h-[100vh] transition-all duration-500 ease-in-out"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
