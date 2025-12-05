import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import cliente1 from "@/assets/cliente1.png";
import cliente2 from "@/assets/cliente2.png";
import clienteGoLaser from "@/assets/cliente-golaser.jpg";
import clienteUnicooHemo from "@/assets/cliente-unicoo-hemo.jpg";

const clients = [
  { name: "Unimed Santa Bárbara", logo: cliente1 },
  { name: "Unicoo Laboratório", logo: cliente2 },
  { name: "Go Laser Depilação", logo: clienteGoLaser },
  { name: "Unicoo Hemodinâmica", logo: clienteUnicooHemo },
];

const Clients = () => {
  // Configurado para ultra-performance no mobile
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: true,
      containScroll: "trimSnaps"
    },
    [AutoScroll({ speed: 0.8, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <section id="clients" className="py-16 md:py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Atendemos as Principais Empresas
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Especialização e experiência nas principais marcas do mercado
          </p>
        </div>

        {/* Desktop Grid - Cards Style (RV Tec Reference) */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-8 flex items-center justify-center h-32 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-12 w-auto max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                loading="lazy"
                width={120}
                height={48}
              />
            </div>
          ))}
        </div>

        {/* Mobile View - High Performance AutoScroll with Cards */}
        <div className="md:hidden overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex touch-pan-y gap-4">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex-[0_0_70%] min-w-0" // Exibe um card por vez com peek
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center h-28 mx-2">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-10 w-auto max-w-full object-contain grayscale opacity-80"
                    loading="lazy"
                    width={100}
                    height={40}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
