import { Card, CardContent } from "@/components/ui/card";
import { Building2, FileCheck, Scale, ClipboardCheck, ChevronLeft, ChevronRight, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const services = [
  {
    icon: Building2,
    title: "Projetos de Arquitetura para a Saúde",
    description:
      "Desenvolvo projetos de arquitetura voltados especificamente para unidades e empresas de saúde, com foco em funcionalidade e conformidade com normas sanitárias.",
  },
  {
    icon: FileCheck,
    title: "Consultoria em Arquitetura da Saúde",
    description:
      "Análise técnica e estratégica para que decisões de investimento em infraestrutura e expansão tenham um retorno positivo, tudo baseado em evidências e boas práticas reconhecidas.",
  },
  {
    icon: Scale,
    title: "Modelação para Arquitetura na Nuvem da Saúde",
    description:
      "Usando o BIM, desenvolvemos modelos tridimensionais para que todos os envolvidos em obras e novos empreendimentos de saúde tenham visibilidade e possam tomar decisões informadas sobre o projeto.",
  },
  {
    icon: ClipboardCheck,
    title: "Adequação às Normas Técnicas (ANVISA, RDC)",
    description:
      "Atualizo e adequo suas unidades para que possam receber e manter suas renovações de licenciamento, realizamos Adequações para obtención da ANVISA e RDC seguindo as normas técnicas vigentes.",
  },
  {
    icon: Building2,
    title: "Gestão Estratégica de Projetos",
    description:
      "Integração completa entre consultoria arquitetônica, gestão de prazos e custos, garantindo que o projeto seja executado dentro do esperado e crie valor para o negócio.",
  },
  {
    icon: Palette,
    title: "Projetos de Interiores para Saúde",
    description:
      "Design de ambientes internos que priorizam conforto, higiene e bem-estar dos pacientes, criando espaços humanizados e funcionais.",
  },
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
    <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Serviços Prestados
          </h2>
          <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Soluções completas para arquitetura em saúde
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-2 border-border bg-card hover:border-primary transition-all duration-500 hover:shadow-[var(--shadow-floating)] hover:-translate-y-3 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <service.icon className="relative z-10 w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <Card className="border-2 border-border shadow-lg min-h-[320px]">
            <CardContent className="p-6 space-y-4 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                {(() => {
                  const IconComponent = services[currentIndex].icon;
                  return <IconComponent className="w-8 h-8 text-primary" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-foreground">{services[currentIndex].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{services[currentIndex].description}</p>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="mt-6 h-1 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
            />
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide} 
              className="h-11 w-11 rounded-full border-2 hover:border-primary hover:bg-primary hover:text-white active:scale-95 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-border w-2"
                  }`}
                  aria-label={`Ir para serviço ${index + 1}`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide} 
              className="h-11 w-11 rounded-full border-2 hover:border-primary hover:bg-primary hover:text-white active:scale-95 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
