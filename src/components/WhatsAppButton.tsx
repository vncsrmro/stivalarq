import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "5519992109655";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de conversar sobre projetos de arquitetura.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-float"
    >
      <Button
        variant="whatsapp"
        size="lg"
        className="rounded-full h-14 w-14 md:h-16 md:w-16 shadow-lg hover:shadow-2xl"
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      </Button>
    </a>
  );
};

export default WhatsAppButton;
