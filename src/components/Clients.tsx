import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section id="clients" className="py-20 md:py-32 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Nossos Clientes
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Empresas que confiam no nosso trabalho
          </p>
        </div>

        {/* Desktop Bento Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {clients.map((client, index) => (
            <div 
              key={index}
              className={`group relative bg-card rounded-2xl border-2 border-border shadow-md hover:shadow-[var(--shadow-floating)] transition-all duration-500 hover:-translate-y-3 animate-scale-in ${
                client.isReal ? "" : "border-dashed"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video p-8 flex items-center justify-center">
                {client.isReal ? (
                  <img 
                    src={client.logo!} 
                    alt={client.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                    <Building2 className="w-12 h-12 opacity-40 group-hover:opacity-60 transition-opacity" />
                    <span className="text-sm font-medium">{client.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel with Snap Scroll */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 touch-pan-y">
              {clients.map((client, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_80%] min-w-0"
                >
                  <div className={`bg-card rounded-2xl border-2 shadow-lg h-full ${
                    client.isReal ? "border-border" : "border-dashed border-border"
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
              className="h-11 w-11 rounded-full bg-card border-2 border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary active:scale-95 transition-all"
              aria-label="Cliente anterior"
            >
              <ChevronLeft className="w-5 h-5" />
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
              className="h-11 w-11 rounded-full bg-card border-2 border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary active:scale-95 transition-all"
              aria-label="Próximo cliente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
