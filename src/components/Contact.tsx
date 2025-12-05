import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Clock, Instagram, Send, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000, "Mensagem muito longa"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = contactSchema.parse(formData);

      const whatsappNumber = "5519992109655";
      const message = encodeURIComponent(
        `*Nova mensagem do site*\n\n` +
        `*Nome:* ${validatedData.name}\n` +
        `*Email:* ${validatedData.email}\n` +
        `*Mensagem:*\n${validatedData.message}`,
      );

      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const whatsappNumber = "5519992109655";
  const email = "contato@stivalarquitetura.com.br";

  return (
    <section id="contact" className="relative py-12 md:py-20 overflow-hidden bg-[image:var(--gradient-contact-dark)]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh-enhanced)] opacity-30" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white/90 text-sm font-semibold">Entre em Contato</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-white to-white bg-clip-text text-transparent">
            Vamos Transformar Seu Projeto
          </h2>
          <p className="text-teal-100/80 max-w-2xl mx-auto text-base md:text-lg">
            Se você busca um serviço técnico especializado, entre em contato. Será um prazer oferecer todo o suporte
            para criar algo único e vencedor.
          </p>
        </div>

        <div className="grid lg:grid-cols-[35%_65%] gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Side - Contact Info Cards */}
          <div className="space-y-4 md:space-y-6 animate-slide-in-left">
            <Card className="border-0 backdrop-blur-xl bg-white/10 shadow-2xl hover:bg-white/15 hover:shadow-[var(--shadow-glow-teal)] transition-all duration-500 group">
              <CardContent className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-400" />
                  Horário de Atendimento
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Clock className="w-5 h-5 text-teal-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Segunda - Sexta</p>
                      <p className="text-teal-100/70">08:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-teal-300 mt-1 flex-shrink-0" />
                    <div>
                      <a
                        href={`mailto:${email}`}
                        className="text-teal-100 hover:text-white transition-colors break-all"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-teal-300 mt-1 flex-shrink-0" />
                    <div>
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-100 hover:text-white transition-colors"
                      >
                        (19) 99210-9655
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Instagram className="w-5 h-5 text-teal-300 mt-1 flex-shrink-0" />
                    <div>
                      <a
                        href="https://www.instagram.com/arquitetostival/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-100 hover:text-white transition-colors"
                      >
                        @arquitetostival
                      </a>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Side - Premium Form */}
          <div className="animate-slide-in-right">
            <Card className="border-0 backdrop-blur-xl bg-white/10 shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Vamos conversar sobre o seu projeto?</h3>
                <p className="text-teal-100/70 mb-8">Preencha o formulário e entraremos em contato via WhatsApp.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Input
                      name="name"
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="h-14 border-2 border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-teal-300 focus:shadow-[0_0_20px_rgba(77,198,195,0.3)] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Input
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      className="h-14 border-2 border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-teal-300 focus:shadow-[0_0_20px_rgba(77,198,195,0.3)] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Textarea
                      name="message"
                      placeholder="Mensagem"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={5}
                      className="border-2 border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-teal-300 focus:shadow-[0_0_20px_rgba(77,198,195,0.3)] resize-none transition-all"
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-white/40">
                      {formData.message.length}/1000
                    </span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base md:text-lg rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    ENVIAR MENSAGEM
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-8 text-teal-100/70 text-sm animate-fade-in-up">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Resposta Rápida</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Atendimento Especializado</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Consultoria Gratuita</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
