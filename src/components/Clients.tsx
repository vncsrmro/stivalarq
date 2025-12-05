import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onPointerDown = () => clearInterval(autoplay);

    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    onSelect();

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi]);

  return (
    <section id="clients" className="py-16 md:py-24 bg-gradient-to-b from-neutral-100 to-neutral-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(77,198,195,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(77,198,195,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary text-sm font-semibold">Clientes Satisfeitos</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Empresas que </span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              confiam no nosso trabalho
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Projetos de arquitetura especializada em saúde que transformam espaços e elevam a experiência.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 lg:gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl border-2 border-border shadow-md hover:shadow-[var(--shadow-floating)] transition-all duration-500 hover:-translate-y-3 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video p-6 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground pb-4 px-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {client.name}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 touch-pan-y">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="flex-[0_0_80%] min-w-0"
                >
                  <div className="bg-card rounded-2xl border-2 border-border shadow-lg h-full">
                    <div className="aspect-video p-6 flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground pb-4 font-medium">
                      {client.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={scrollPrev}
              className="h-11 w-11 rounded-full bg-card border-2 border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 transition-all"
              aria-label="Cliente anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  aria-label={`Ir para cliente ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="h-11 w-11 rounded-full bg-card border-2 border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 transition-all"
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
