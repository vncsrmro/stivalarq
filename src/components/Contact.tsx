import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Clock, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000, "Mensagem muito longa")
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);
      
      // Format message for WhatsApp
      const whatsappNumber = "5519992109655";
      const message = encodeURIComponent(
        `*Nova mensagem do site*\n\n` +
        `*Nome:* ${validatedData.name}\n` +
        `*Email:* ${validatedData.email}\n` +
        `*Mensagem:*\n${validatedData.message}`
      );
      
      // Open WhatsApp
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      
      toast({
        title: "Mensagem enviada!",
        description: "Você será redirecionado para o WhatsApp.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Erro no formulário",
          description: error.errors[0].message,
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const whatsappNumber = "5519992109655";
  const email = "contato@stivalarq.com.br";

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Contato</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Se você busca um serviço técnico para seu projeto, consultoria, licenciamento, 
            regularização ou algo relacionado, entre em contato. Será um prazer ajudá-lo 
            a tomar a melhor decisão e oferecer todo o suporte necessário para criar algo 
            único e vencedor, feito com total competência técnica e prioridades.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}
          <div className="space-y-6 animate-slide-in-left">
            <Card className="border-2 border-border hover:border-primary transition-colors">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-6">Work Time</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Segunda - Sexta</p>
                      <p className="text-muted-foreground">08:00 - 18:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <a 
                        href={`mailto:${email}`}
                        className="text-primary hover:underline break-all"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <a 
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        (19) 99210-9655
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <a 
                        href="https://www.instagram.com/arquitetostival/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @arquitetostival
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-slide-in-right">
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Vamos conversar sobre o seu projeto de saúde?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Preencha o formulário e entraremos em contato via WhatsApp.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="border-2 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      className="border-2 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Mensagem"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={5}
                      className="border-2 focus:border-primary resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full rounded-full"
                  >
                    <Send className="mr-2" />
                    ENVIAR MENSAGEM
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
