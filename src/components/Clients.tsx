import { OptimizedImage } from "@/components/ui/OptimizedImage";
import cliente1 from "@/assets/cliente1.png";
import cliente2 from "@/assets/cliente2.png";
import clienteGoLaser from "@/assets/cliente-golaser.jpg";
import clienteUnicooHemo from "@/assets/cliente-unicoo-hemo.jpg";

const clients = [
  { name: "Unimed Santa Bárbara", logo: cliente1 },
  { name: "Unicoo Laboratório", logo: cliente2 },
  { name: "Go Laser Depilação", logo: clienteGoLaser },
  { name: "Unicoo Hemodinâmica", logo: clienteUnicooHemo },
];

const Clients = () => {
  return (
    <section id="clients" className="py-16 md:py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Empresas que Confiam no Nosso Trabalho
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Especialização e experiência em arquitetura para saúde
          </p>
        </div>

        {/* Ultra-Fast Client Grid - CSS Containment + Optimized Images */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          style={{ contain: "layout style" }}
        >
          {clients.map((client, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-4 md:p-6 flex items-center justify-center h-24 md:h-32 transition-shadow duration-300"
              style={{
                contain: "layout style paint",
                willChange: "auto" // Only use will-change during hover via CSS
              }}
            >
              <OptimizedImage
                src={client.logo}
                alt={`Logo ${client.name}`}
                aspectRatio="aspect-auto"
                containerClassName="h-10 md:h-12 w-auto max-w-full"
                className="h-10 md:h-12 w-auto max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-[filter,opacity] duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
