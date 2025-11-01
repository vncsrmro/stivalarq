import { Card, CardContent } from "@/components/ui/card";
import { Building2, FileCheck, Scale, ClipboardCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const services = [
  {
    icon: Building2,
    title: "Projetos de Arquitetura para a Saúde",
    description: "Desenvolvo projetos de arquitetura voltados especificamente para unidades e empresas de saúde, com foco em funcionalidade e conformidade com normas sanitárias."
  },
  {
    icon: FileCheck,
    title: "Consultoria em Arquitetura da Saúde",
    description: "Análise técnica e estratégica para que decisões de investimento em infraestrutura e expansão tenham um retorno positivo, tudo baseado em evidências e boas práticas reconhecidas."
  },
  {
    icon: Scale,
    title: "Modelação para Arquitetura na Nuvem da Saúde",
    description: "Usando o BIM, desenvolvemos modelos tridimensionais para que todos os envolvidos em obras e novos empreendimentos de saúde tenham visibilidade e possam tomar decisões informadas sobre o projeto."
  },
  {
    icon: ClipboardCheck,
    title: "Adequação às Normas Técnicas (ANVISA, RDC)",
    description: "Atualizo e adequo suas unidades para que possam receber e manter suas renovações de licenciamento, realizamos Adequações para obtención da ANVISA e RDC seguindo as normas técnicas vigentes."
  },
  {
    icon: Building2,
    title: "Gestão Estratégica de Projetos",
    description: "Integração completa entre consultoria arquitetônica, gestão de prazos e custos, garantindo que o projeto seja executado dentro do esperado e crie valor para o negócio."
  }
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-sm md:text-base text-muted-foreground mb-2">Minha área de atuação é</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Serviços Prestados</h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-medium)] animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <Card className="border-2 border-border">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                {(() => {
                  const IconComponent = services[currentIndex].icon;
                  return <IconComponent className="w-7 h-7 text-primary" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-foreground">{services[currentIndex].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{services[currentIndex].description}</p>
            </CardContent>
          </Card>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-border'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
