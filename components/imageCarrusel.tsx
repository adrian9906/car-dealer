"use client";

import { useEffect, useState } from "react";

const heroImages = [
  "/toyota-corolla-blanco.png",
  "/honda-crv-negro-suv.png",
  "/ford-f150-azul.png",
  "/chevrolet-tahoe-gris.png",
  "/nissan-sentra-rojo-sedan.png",
  "/hyundai-elantra-plata-compacto.png",
];

export default function ImageCarrusel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative h-96 md:h-[500px] lg:h-[600px] bg-white dark:bg-slate-800 shadow-inner">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt="Vehículo destacado"
                className="w-full h-full object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
