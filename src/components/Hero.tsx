import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import headerImage from "@/assets/header.png";
import logoImage from "@/assets/logo.png";

const Hero = () => {
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de conversar sobre projetos de arquitetura em saúde.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="hero" className="relative w-full overflow-hidden pt-20 bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-50" />
      
      {/* Decorative floating circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-10 mx-auto px-4 pt-8 md:pt-12 pb-12 md:pb-16">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4 animate-glow">
                <span className="text-primary text-sm font-semibold">✨ Especialista em Arquitetura para Saúde</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-foreground">Transformando Espaços, Elevando Cuidados: </span>
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Arquitetura Especializada em Saúde </span>
                <span className="text-foreground">ao Seu Alcance!</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl">
                Projetos especializados de excelência que transformam a experiência de pacientes, equipes e clínicas.
              </p>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full sm:w-auto text-base md:text-lg h-12 md:h-14 px-6 md:px-8 rounded-full"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Vamos conversar?
            </Button>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-in-right order-first lg:order-last">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
              <img
                src={headerImage}
                alt="Gustavo Stival - Arquiteto especialista em saúde"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Banner - Usamos mt-0 para garantir que ele esteja logo abaixo do conteúdo */}
      {/* Em mobile (coluna única), a faixa ficará abaixo da imagem. Em desktop (duas colunas), ela ficará na base da seção */}
      <div className="relative bg-primary text-primary-foreground py-4 overflow-hidden mt-0">
        <div className="flex whitespace-nowrap animate-scroll-x">
          <div className="flex items-center space-x-8 px-8">
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• ESPECIALISTA EM ARQUITETURA PARA SAUDE</span>
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• 15 ANOS DE KNOWHOW</span>
          </div>
          <div className="flex items-center space-x-8 px-8">
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• ESPECIALISTA EM ARQUITETURA PARA SAUDE</span>
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• 15 ANOS DE KNOWHOW</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
