import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

// Import gallery images
import especialidade1 from "@/assets/especialidade1.jpg";
import especialidade2 from "@/assets/especialidade2.jpg";
import especialidade3 from "@/assets/especialidade3.jpg";
import especialidade4 from "@/assets/especialidade4.jpg";
import especialidade6 from "@/assets/especialidade6.jpg";

const galleryImages = [
  { src: especialidade1, alt: "Fachada UNICOO Laboratório" },
  { src: especialidade2, alt: "Recepção e atendimento interior" },
  { src: especialidade3, alt: "Fachada noturna com iluminação" },
  { src: especialidade4, alt: "Entrada do laboratório" },
  { src: especialidade6, alt: "Sala de espera infantil temática" },
];

// Detect if user prefers reduced motion or is on a low-end device
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Simple mobile detection for performance optimization
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

const Expertise = () => {
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre sua experiência em arquitetura para saúde.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Disable auto-play on mobile or if user prefers reduced motion (saves CPU)
  const shouldAutoPlay = !prefersReducedMotion() && !isMobileDevice();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto-play only on desktop and if not interacting
  useEffect(() => {
    if (!emblaApi || isInteracting || !shouldAutoPlay) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000); // Increased to 5s for less CPU usage

    return () => clearInterval(interval);
  }, [emblaApi, isInteracting, shouldAutoPlay]);

  // Update selected index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="expertise"
      className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 via-background to-teal-50/30 relative overflow-hidden"
    >
      {/* Decorative Elements - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Gallery - Optimized */}
          <div
            className="order-2 md:order-1"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setTimeout(() => setIsInteracting(false), 3000)}
            style={{ contain: "layout style" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-strong)] bg-neutral-900">
              {/* Carousel with CSS containment */}
              <div
                ref={emblaRef}
                className="overflow-hidden"
                style={{ contain: "layout style paint" }}
              >
                <div className="flex">
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] min-w-0"
                      style={{ contain: "layout style" }}
                    >
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        aspectRatio="aspect-[4/3]"
                        priority={index === 0} // Only first image is priority
                        containerClassName="relative"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Simplified for performance */}
              <button
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200 active:scale-95"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-800" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200 active:scale-95"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5 text-neutral-800" />
              </button>

              {/* Progress Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${index === selectedIndex
                        ? "w-8 bg-white"
                        : "w-1.5 bg-white/50"
                      }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Caption */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              {galleryImages[selectedIndex]?.alt}
            </p>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-primary text-sm font-semibold">+ de 11.000 m² projetados</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Especialista em Arquitetura para a Saúde
              </span>
              <span className="text-foreground"> com mais de 11 anos de experiência</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-base md:text-lg">
              <p>
                Sou <strong className="text-foreground">Arquiteto e Urbanista</strong> especialista em projetos para a área da saúde,
                com experiência de trabalho em grandes escritórios de arquitetura.
              </p>

              <p>
                Ofereço uma consultoria inteligente e arquitetônica totalmente voltada
                para unidades hospitalares, centros médicos e empresas de saúde.
              </p>

              <p>
                Além de meu atendimento, por projetos, também ministro aulas de biossegurança
                e sustentabilidade e dou mentoria para outros arquitetos que desejam atuar
                especificamente em ambientes voltados para saúde e bem estar.
              </p>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full sm:w-auto rounded-full"
              onClick={() => window.open(whatsappUrl, '_blank')}
            >
              <MessageCircle className="mr-2" />
              Vamos conversar?
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
