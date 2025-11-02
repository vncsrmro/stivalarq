import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Building2 } from "lucide-react";
import cliente1 from "@/assets/cliente1.png";
import cliente2 from "@/assets/cliente2.png";

const clients = [
  { name: "Unimed Santa Bárbara", logo: cliente1, isReal: true },
  { name: "Unicoo Laboratório", logo: cliente2, isReal: true },
  { name: "Em Breve", logo: null, isReal: false },
  { name: "Em Breve", logo: null, isReal: false },
  { name: "Em Breve", logo: null, isReal: false },
];

const Clients = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    const onPointerDown = () => clearInterval(autoplay);
    
    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      clearInterval(autoplay);
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 md:mb-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Nossos Clientes
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Empresas que confiam no nosso trabalho
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mt-12">
          {clients.map((client, index) => (
            <div 
              key={index}
              className={`group relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in ${
                client.isReal ? "" : "opacity-60"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video p-8 flex items-center justify-center">
                {client.isReal ? (
                  <img 
                    src={client.logo!} 
                    alt={client.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                    <Building2 className="w-12 h-12 opacity-40" />
                    <span className="text-sm font-medium">{client.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mt-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {clients.map((client, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_80%] min-w-0"
                >
                  <div className={`bg-card rounded-2xl border border-border shadow-md ${
                    client.isReal ? "" : "opacity-60"
                  }`}>
                    <div className="aspect-video p-8 flex items-center justify-center">
                      {client.isReal ? (
                        <img 
                          src={client.logo!} 
                          alt={client.name}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                          <Building2 className="w-12 h-12 opacity-40" />
                          <span className="text-sm font-medium">{client.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Cliente anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {clients.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-border transition-all"
                  aria-label={`Indicador cliente ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Próximo cliente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;