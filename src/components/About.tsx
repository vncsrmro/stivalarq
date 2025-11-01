import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import gustavoImage from "@/assets/quem-e-gustavo.png";

const About = () => {
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de conhecer mais sobre você e seus projetos.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <p className="text-[12rem] font-bold text-primary transform rotate-90 origin-center whitespace-nowrap">
          ARQUITETURA EM SAÚDE
        </p>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                Gustavo Stival
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-wide">
                Arquiteto em Projetos
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Me chamo <strong className="text-foreground">Gustavo Stival</strong>, sou arquiteto e urbanista, 
                com especialização completa em arquitetura de saúde. Durante anos venho atuando em certificações 
                ISO para hospitais e centros hospitalares, bem como RDC's específicas da ANVISA.
              </p>

              <p>
                Comecei minha carreira em um dos maiores escritórios de arquitetura de São Paulo, a SPBR, 
                onde participei de projetos de grande porte e de grande complexidade. Minha experiência engloba 
                desde projetos residenciais até hospitais de alta complexidade. A certificação que realizei 
                em 2016 me tornou totalmente especializado em projetos de arquitetura, adequações e consultorias 
                para clínicas, hospitais, maternidades e laboratórios.
              </p>

              <p>
                "Muito além de um desenho, arquitetura da saúde pode ser o diferencial em seu negócio: 
                melhor fluxo de atendimento, maior satisfação das equipes, colaboradores que aproveitam o 
                arquitetônico, melhoram os processos, otimizam os atendimentos — tudo isso está ligado 
                à arquitetura. Um bom projeto se mostra através de bons resultados no dia a dia das unidades."
              </p>

              <p>
                Hoje, através do meu escritório, tenho projetos completos em São Paulo, Minas Gerais, Rio de Janeiro, 
                região sul e também no exterior. Meu trabalho é tornar o seu projeto de arquitetura realmente 
                especial, um projeto que gere qualidade e retorno para o seu negócio.
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

          {/* Image */}
          <div className="order-first md:order-last animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-strong)]">
              <img 
                src={gustavoImage} 
                alt="Gustavo Stival - Arquiteto especialista em projetos para saúde" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
