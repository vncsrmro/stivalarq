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
    <section id="services" className="relative py-20 md:py-32 overflow-hidden bg-[image:var(--gradient-contact-dark)]">
      {/* Decorative Elements - Same as Contact */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh-enhanced)] opacity-30" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-white to-white bg-clip-text text-transparent">
            Serviços Prestados
          </h2>
          <p className="text-teal-100/80 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Soluções completas para arquitetura em saúde
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 backdrop-blur-xl bg-white/10 shadow-2xl hover:bg-white/15 hover:shadow-[var(--shadow-glow-teal)] transition-all duration-500 group hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="relative w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <service.icon className="relative z-10 w-8 h-8 text-amber-400 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-teal-100/80 text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <Card className="border-0 backdrop-blur-xl bg-white/10 shadow-2xl min-h-[320px]">
            <CardContent className="p-6 space-y-4 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                {(() => {
                  const IconComponent = services[currentIndex].icon;
                  return <IconComponent className="w-8 h-8 text-amber-400" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-white">{services[currentIndex].title}</h3>
              <p className="text-teal-100/80 text-sm leading-relaxed flex-1">{services[currentIndex].description}</p>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-teal-300 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
            />
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="h-11 w-11 rounded-full border-2 border-white/20 bg-white/5 hover:border-amber-400 hover:bg-white/10 text-white hover:text-amber-400 active:scale-95 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex ? "bg-amber-400 w-8" : "bg-white/20 w-2"
                    }`}
                  aria-label={`Ir para serviço ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="h-11 w-11 rounded-full border-2 border-white/20 bg-white/5 hover:border-amber-400 hover:bg-white/10 text-white hover:text-amber-400 active:scale-95 transition-all"
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
