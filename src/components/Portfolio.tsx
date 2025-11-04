import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Building2, Hospital, Stethoscope, FlaskConical, Home, Sparkles } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
  area?: string;
  year?: string;
  tags: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Clínica de Oncologia Premium",
    category: "Clínicas",
    description: "Projeto completo com consultórios integrados e área de tratamento humanizada",
    gradient: "from-teal-500/80 to-blue-600/80",
    icon: <Hospital className="w-16 h-16 text-white" />,
    area: "850m²",
    year: "2024",
    tags: ["Oncologia", "Consultórios", "Humanização"]
  },
  {
    id: "2",
    title: "Centro Médico Integrado",
    category: "Hospitais",
    description: "Complexo hospitalar com centro cirúrgico e UTI de última geração",
    gradient: "from-purple-500/80 to-pink-600/80",
    icon: <Building2 className="w-16 h-16 text-white" />,
    area: "2.400m²",
    year: "2023",
    tags: ["Hospital", "Centro Cirúrgico", "UTI"]
  },
  {
    id: "3",
    title: "Consultórios Médicos Modulares",
    category: "Consultórios",
    description: "Design moderno e funcional para clínica com múltiplas especialidades",
    gradient: "from-orange-500/80 to-red-600/80",
    icon: <Stethoscope className="w-16 h-16 text-white" />,
    area: "450m²",
    year: "2024",
    tags: ["Consultórios", "Multi-especialidade", "Modular"]
  },
  {
    id: "4",
    title: "Laboratório de Análises Clínicas",
    category: "Laboratórios",
    description: "Infraestrutura completa seguindo todas as normas de biossegurança",
    gradient: "from-green-500/80 to-teal-600/80",
    icon: <FlaskConical className="w-16 h-16 text-white" />,
    area: "650m²",
    year: "2023",
    tags: ["Laboratório", "Biossegurança", "RDC 302"]
  },
  {
    id: "5",
    title: "Clínica Pediátrica Lúdica",
    category: "Clínicas",
    description: "Ambiente acolhedor e lúdico projetado especialmente para crianças",
    gradient: "from-blue-500/80 to-indigo-600/80",
    icon: <Home className="w-16 h-16 text-white" />,
    area: "380m²",
    year: "2024",
    tags: ["Pediatria", "Design Lúdico", "Acolhimento"]
  },
  {
    id: "6",
    title: "Centro de Diagnóstico por Imagem",
    category: "Clínicas",
    description: "Projeto com salas blindadas e infraestrutura para equipamentos de alta precisão",
    gradient: "from-pink-500/80 to-purple-600/80",
    icon: <Sparkles className="w-16 h-16 text-white" />,
    area: "720m²",
    year: "2023",
    tags: ["Diagnóstico", "Radiologia", "Blindagem"]
  }
];

const categories = ["Todos", "Hospitais", "Clínicas", "Consultórios", "Laboratórios"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de conhecer mais sobre seus projetos de arquitetura em saúde.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const filteredItems = activeFilter === "Todos" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Decorative Elements */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4 animate-glow">
            <span className="text-primary text-sm font-semibold">✨ Nossos Projetos</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Portfólio de Excelência
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projetos especializados que transformam espaços de saúde em ambientes de cuidado e bem-estar
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className={`rounded-full transition-all duration-300 ${
                activeFilter === category 
                  ? "shadow-lg shadow-primary/20" 
                  : "hover:border-primary/50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-white/5 group-hover:bg-white/10 transition-all duration-500" />
                
                {/* Icon - Always Visible */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-20 transition-opacity duration-500">
                  {item.icon}
                </div>

                {/* Category Badge - Always Visible */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 animate-pulse-glow">
                    {item.category}
                  </Badge>
                </div>

                {/* Content - Shows on Hover */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/90">
                      {item.description}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex gap-4 text-xs text-white/80">
                      {item.area && <span>📏 {item.area}</span>}
                      {item.year && <span>📅 {item.year}</span>}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Quer ver seu projeto aqui?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Entre em contato e vamos transformar sua visão em realidade com excelência em arquitetura para saúde
            </p>
            <Button
              variant="hero"
              size="lg"
              className="text-base md:text-lg h-12 md:h-14 px-6 md:px-8 rounded-full"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Vamos conversar sobre seu projeto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
