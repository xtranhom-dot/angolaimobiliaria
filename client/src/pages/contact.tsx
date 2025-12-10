import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import contactHero from "@assets/generated_images/luxury_real_estate_office_reception.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, subject, message } = formData;
    
    // Format message for WhatsApp
    const text = `*Nova Mensagem do Site*%0A%0A*Nome:* ${name}%0A*Telefone:* ${phone}%0A*Email:* ${email}%0A*Assunto:* ${subject}%0A*Mensagem:* ${message}`;
    
    // Open WhatsApp
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
                          Talatona, Via S8
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        placeholder="Seu nome" 
                        className="bg-white border-gray-200 focus:border-[#FFD700]" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        placeholder="+244 9XX XXX XXX" 
                        className="bg-white border-gray-200 focus:border-[#FFD700]" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      className="bg-white border-gray-200 focus:border-[#FFD700]" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input 
                      id="subject" 
                      placeholder="Interesse em imóvel, Parceria, etc." 
                      className="bg-white border-gray-200 focus:border-[#FFD700]" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Como podemos ajudar?" 
                      className="min-h-[150px] bg-white border-gray-200 focus:border-[#FFD700] resize-none" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white font-medium py-6">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem via WhatsApp
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
               <p className="text-gray-400 text-sm">Luanda, Talatona</p>
             </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
