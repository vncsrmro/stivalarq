import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const menuItems = [
  { label: "Início", href: "#hero" },
  { label: "Especialidade", href: "#expertise" },
  { label: "Serviços", href: "#services" },
  { label: "Sobre", href: "#about" },
  { label: "Clientes", href: "#clients" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de conversar sobre projetos de arquitetura em saúde.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleClick(e, "#hero")} className="flex-shrink-0">
            <img
              src={logoImage}
              alt="gstival - Arquitetura e Consultoria em Saúde"
              className="h-10 md:h-12 w-auto transition-all duration-300"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="hero"
              size="sm"
              className="ml-4 rounded-full"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              Solicitar Orçamento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-background/95 backdrop-blur-md rounded-b-2xl border-t border-border">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <Button
                variant="hero"
                size="sm"
                className="w-full rounded-full"
                onClick={() => {
                  window.open(whatsappUrl, "_blank");
                  setIsOpen(false);
                }}
              >
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
