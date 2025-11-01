import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import headerImage from "@/assets/header.png";
import logoImage from "@/assets/logo.png";

const Hero = () => {
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de conversar sobre projetos de arquitetura em saúde.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Container principal ajustado: padding lateral é aplicado aqui */}
      <div className="container relative z-10 mx-auto px-4 pt-8 md:pt-12">
        {/* Logo */}
        <div className="mb-12 md:mb-16 animate-fade-in">
          <img src={logoImage} alt="gstival - Arquitetura e Consultoria em Saúde" className="h-12 md:h-16 w-auto" />
        </div>

        {/* Main Content - Usamos grid lg:grid-cols-2 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-0">
          {/* Left Content (Texto e Botão) */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-foreground">Transformando Espaços, Elevando Cuidados: </span>
                <span className="text-primary">Arquitetura Especializada em Saúde </span>
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

          {/* Right Content - Hero Image: Aqui fazemos a mágica! */}
          <div className="relative animate-slide-in-right">
            <div className="relative">
              <img
                src={headerImage}
                alt="Gustavo Stival - Arquiteto especialista em saúde"
                className="w-full h-auto object-cover lg:max-w-none 
                
                /* DESKTOP (lg): 
                   Remove a margem direita padrão do container (px-4).
                   Ajusta a largura para estender a imagem.
                */
                lg:-mr-4 
                
                /* MOBILE:
                   Em telas menores, a imagem ocupará 100% da largura da coluna, o que já a estende ao máximo
                   (removendo o padding lateral do grid container).
                */
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Banner */}
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
