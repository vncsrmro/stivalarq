import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de conversar sobre projetos de arquitetura em saúde.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="hero" className="relative w-full overflow-hidden pt-20 min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero Background Image */}
        <img
          src={heroBg}
          alt="Healthcare Architecture"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/75 to-slate-900/85" />

        {/* Subtle Accent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/10" />

        {/* Floating Animated Circles for Depth */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-[15%] w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-8 md:pt-16 lg:pt-20">
        {/* Centered Content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-white/90 text-sm font-semibold">✨ Especialista em Arquitetura para Saúde</span>
          </div>

          {/* Main Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-white">Transformando Espaços,</span>
            <br className="hidden sm:block" />
            <span className="text-white"> Elevando Cuidados: </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Arquitetura Especializada
            </span>
            <br className="hidden sm:block" />
            <span className="text-white">em Saúde ao Seu Alcance!</span>
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mb-8 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Projetos especializados de excelência que transformam a experiência de pacientes, equipes e clínicas.
          </p>

          {/* CTA Button */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              variant="hero"
              size="lg"
              className="text-base md:text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Vamos conversar?
            </Button>
          </div>

          {/* Stats Preview */}
          <div
            className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 md:mt-16 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">11+</p>
              <p className="text-sm text-white/70">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">11.000+</p>
              <p className="text-sm text-white/70">m² Projetados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-white/70">Projetos Entregues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Banner */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-primary/95 backdrop-blur-sm text-primary-foreground py-4 overflow-hidden border-t border-white/10">
        <div className="flex whitespace-nowrap animate-scroll-x">
          <div className="flex items-center space-x-8 px-8">
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• ESPECIALISTA EM ARQUITETURA PARA SAUDE</span>
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• 11 ANOS DE EXPERIÊNCIA</span>
          </div>
          <div className="flex items-center space-x-8 px-8">
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• ESPECIALISTA EM ARQUITETURA PARA SAUDE</span>
            <span className="text-lg md:text-xl font-bold">• MAIS DE 11.000 M² PROJETADOS</span>
            <span className="text-lg md:text-xl font-bold">• 11 ANOS DE EXPERIÊNCIA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
