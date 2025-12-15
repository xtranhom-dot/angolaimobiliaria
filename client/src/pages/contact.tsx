import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, Home, Key, HelpCircle } from "lucide-react";
import contactHero from "@assets/generated_images/luxury_real_estate_office_reception.png";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { InsertMessage } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const subjects = [
    { id: "Interesse em Aluguel", label: "Aluguel", icon: Key },
    { id: "Interesse em Venda", label: "Venda", icon: Home },
    { id: "Outro Assunto", label: "Outro", icon: HelpCircle },
  ];

  const createMessageMutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Recebemos sua mensagem e entraremos em contato em breve.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubjectSelect = (subjectId: string) => {
    setFormData(prev => ({
      ...prev,
      subject: subjectId
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    if (!subject) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione um assunto.",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Atenção",
        description: "Por favor, preencha seu email.",
        variant: "destructive",
      });
      return;
    }

    // Save to database
    createMessageMutation.mutate({
      name,
      email,
      phone: phone || undefined,
      subject,
      message: message || `${subject} - Mensagem enviada via formulário de contato.`,
    });

    // Also send via WhatsApp
    const text = `*Nova Mensagem do Site*%0A%0A*Nome:* ${name}%0A*Email:* ${email}%0A*Telefone:* ${phone}%0A*Assunto:* ${subject}%0A*Mensagem:* ${message}`;
    window.open(`https://wa.me/244953430432?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={contactHero}
              alt="Fale Conosco"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-medium">
              Entre em Contato
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Estamos prontos para atender você e realizar o seu sonho imobiliário.
            </p>
          </div>
        </div>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <h2 className="font-serif text-3xl text-black mb-6">Informações de Contato</h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Tem alguma dúvida sobre nossos imóveis ou serviços? Nossa equipe está à disposição para oferecer o melhor atendimento.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#FFD700]/10 p-3 rounded-full">
                        <Phone className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-black text-lg">Telefone</h3>
                        <p className="text-gray-600 mb-2">Segunda a Sexta, das 8h às 18h</p>
                        <a href="tel:+244927963478" className="text-lg font-bold text-black hover:text-[#FFD700] transition-colors">
                          +244 927 963 478
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#FFD700]/10 p-3 rounded-full">
                        <Mail className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-black text-lg">Email</h3>
                        <p className="text-gray-600 mb-2">Envie-nos uma mensagem a qualquer momento</p>
                        <a href="mailto:contato@angolaimobiliaria.com" className="text-lg font-bold text-black hover:text-[#FFD700] transition-colors">
                          contato@angolaimobiliaria.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-[#FFD700]/10 p-3 rounded-full">
                        <MapPin className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-black text-lg">Localização</h3>
                        <p className="text-gray-600">
                          Luanda, Angola<br />
                          Centralidade do Sequele<br />
                          Bloco 8, Prédio 34<br />
                          Entrada A, Apart 002
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call Action Box */}
                <div className="bg-black text-white p-8 rounded-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#FFD700]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative z-10">
                    <h3 className="font-serif text-2xl mb-4">Atendimento Imediato</h3>
                    <p className="text-gray-300 mb-6">
                      Prefere falar com um especialista agora mesmo? Clique no botão abaixo para ligar automaticamente.
                    </p>
                    <a href="tel:+244927963478" className="w-full block">
                      <Button className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold py-6 text-lg">
                        <Phone className="mr-2 h-5 w-5" />
                        Ligar Agora
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="font-serif text-3xl text-black mb-2">Envie uma Mensagem</h2>
                <p className="text-gray-500 mb-8">Preencha o formulário abaixo e entraremos em contato em breve.</p>

                <form className="space-y-6" onSubmit={handleSendMessage}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        className="bg-white border-gray-200 focus:border-[#FFD700] h-12"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="bg-white border-gray-200 focus:border-[#FFD700] h-12"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="+244 9XX XXX XXX"
                        className="bg-white border-gray-200 focus:border-[#FFD700] h-12"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Assunto *</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {subjects.map((subject) => (
                        <div
                          key={subject.id}
                          onClick={() => handleSubjectSelect(subject.id)}
                          className={cn(
                            "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5",
                            formData.subject === subject.id
                              ? "border-[#FFD700] bg-[#FFD700]/10 text-black"
                              : "border-gray-100 bg-white text-gray-500"
                          )}
                        >
                          <subject.icon className={cn(
                            "w-6 h-6",
                            formData.subject === subject.id ? "text-[#FFD700]" : "text-gray-400"
                          )} />
                          <span className="font-medium text-sm">{subject.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Conte-nos o que você procura..."
                      className="bg-white border-gray-200 focus:border-[#FFD700] min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-black/90 text-white font-medium py-6 text-lg rounded-xl shadow-lg shadow-black/10"
                    disabled={createMessageMutation.isPending}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {createMessageMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* Map Placeholder or Additional Info */}
        <section className="h-[400px] w-full bg-gray-200 relative">
          {/* In a real app, this would be a Google Maps embed */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Mapa de Localização</p>
              <p className="text-gray-400 text-sm">Centralidade do Sequele, Bloco 8</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
