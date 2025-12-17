import { LogoCarousel } from "@/components/ui/logo-carousel";
import cliente1 from "@/assets/cliente1.png";
import cliente2 from "@/assets/cliente2.png";
import clienteGoLaser from "@/assets/cliente-golaser.jpg";
import clienteUnicooHemo from "@/assets/cliente-unicoo-hemo.jpg";

const clientLogos = [
  { id: 1, name: "Unimed Santa Bárbara", src: cliente1 },
  { id: 2, name: "Unicoo Laboratório", src: cliente2 },
  { id: 3, name: "Go Laser Depilação", src: clienteGoLaser },
  { id: 4, name: "Unicoo Hemodinâmica", src: clienteUnicooHemo },
];

const Clients = () => {
  return (
    <section id="clients" className="py-16 md:py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Clientes que confiam no nosso trabalho
          </p>
          <h2 className="text-3xl md:text-[3.5rem] font-bold tracking-tight leading-none text-gray-900">
            Os melhores já estão aqui
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Especialização e experiência em arquitetura para saúde
          </p>
        </div>

        {/* Logo Carousel */}
        <LogoCarousel logos={clientLogos} columns={4} />
      </div>
    </section>
  );
};

export default Clients;
