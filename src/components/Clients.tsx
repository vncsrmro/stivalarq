import cliente1 from "@/assets/cliente1.png";
import cliente2 from "@/assets/cliente2.png";

const clients = [
  { name: "Unimed Santa Bárbara", logo: cliente1 },
  { name: "Unicoo Laboratório", logo: cliente2 },
  { name: "Cliente 3", logo: cliente1 }, // Placeholder
  { name: "Cliente 4", logo: cliente2 }, // Placeholder
  { name: "Cliente 5", logo: cliente1 }, // Placeholder
];

const Clients = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 animate-fade-in">
          Nossos Clientes
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="bg-primary-foreground p-6 rounded-2xl shadow-[var(--shadow-medium)] hover:scale-110 transition-transform duration-300 animate-scale-in w-full max-w-[200px] aspect-video flex items-center justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={client.logo} 
                alt={client.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-hidden">
          <div className="flex animate-scroll-x">
            {[...clients, ...clients].map((client, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-4"
              >
                <div className="bg-primary-foreground p-6 rounded-2xl shadow-[var(--shadow-medium)] w-[180px] h-[120px] flex items-center justify-center">
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
