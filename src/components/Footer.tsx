import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import logoImage from "@/assets/logo.png";

const Footer = () => {
  const whatsappNumber = "5519992109655";
  const email = "contato@stivalarquitetura.com.br";

  return (
    <footer className="bg-neutral-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Column 1: Logo + Description */}
          <div className="space-y-4">
            <img src={logoImage} alt="Stival Arquitetura" className="h-12 md:h-16 brightness-0 invert" />
            <p className="text-neutral-400 text-sm leading-relaxed">
              Arquitetura especializada em saúde com mais de 15 anos de experiência. Transformando espaços e elevando
              cuidados.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Links Rápidos</h4>
            <nav className="space-y-2">
              <a href="#hero" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Início
              </a>
              <a href="#services" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Serviços
              </a>
              <a href="#about" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Sobre
              </a>
              <a href="#clients" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Clientes
              </a>
              <a href="#contact" className="block text-neutral-400 hover:text-white transition-colors text-sm">
                Contato
              </a>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contato</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                <span className="break-all">{email}</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                <span>(19) 99210-9655</span>
              </a>
              <a
                href="https://www.instagram.com/arquitetostival/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm group"
              >
                <Instagram className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                <span>@arquitetostival</span>
              </a>
              <div className="flex items-start gap-2 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Americana, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-800 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm">
          <p>© 2024 Stival Arquitetura. Todos os direitos reservados.</p>
          <p>
            Desenvolvido com 💗 pela{" "}
            <a
              href="https://inovasys.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:text-white transition-colors"
            >
              INOVASYS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
