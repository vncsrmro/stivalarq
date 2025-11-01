import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import consultorioImage from "@/assets/consultorio.jpg";

const Expertise = () => {
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre sua experiência em arquitetura para saúde.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1 animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-strong)]">
              <img 
                src={consultorioImage} 
                alt="Consultório odontológico projetado por Gustavo Stival" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Especialista em Arquitetura para a Saúde com mais de 11 anos de experiência:
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
