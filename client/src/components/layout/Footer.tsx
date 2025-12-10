import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@assets/Design_sem_nome-removebg-preview_1_1765217810301.png";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-10 border-t border-white/10">
      {/* Social Banner */}
      <div className="container mx-auto px-4 -mt-16 md:-mt-24 mb-10 md:mb-16 relative z-10">
        <div className="bg-white text-black rounded-lg p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center md:text-left">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 uppercase tracking-widest">Siga-nos nas</span>
            <span className="font-serif text-2xl md:text-3xl font-bold">Redes Sociais</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/angolaimobiliaria1" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white p-3 rounded-full hover:scale-110 transition-transform"><Facebook className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/angola.imobiliario?igsh=ODl0NWd5OW15ZHRi" target="_blank" rel="noopener noreferrer" className="bg-[#E4405F] text-white p-3 rounded-full hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></a>
            <a href="https://youtube.com/@angolaimobiliario?si=6QnshaAZZRlMGz7G" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] text-white p-3 rounded-full hover:scale-110 transition-transform"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <Link href="/">
              <a className="flex items-end gap-3 group">
                <img src={logo} alt="Angola Imobiliária" className="h-16 w-auto object-contain brightness-0 invert" />
              </a>
            </Link>
          </div>

          {/* Contact */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-white/80">Atendimento:</h3>
            
            <div className="flex gap-4 items-start text-left">
              <div className="border border-white/20 p-2 rounded-full shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60 uppercase">Whatsapp</span>
                <span className="text-lg font-serif">+244 953 430 432</span>
              </div>
            </div>

            <div className="flex gap-4 items-start text-left">
              <div className="border border-white/20 p-2 rounded-full shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60 uppercase">E-mail</span>
                <span className="text-sm font-serif break-all">geral@teste.feliperochadesign.com.br</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-3 font-sans text-sm font-medium uppercase tracking-widest">
              <Link href="/"><a className="hover:text-[#FFD700] transition-colors">Home</a></Link>
              <Link href="/about"><a className="hover:text-[#FFD700] transition-colors">Quem Somos</a></Link>
              <Link href="/services"><a className="hover:text-[#FFD700] transition-colors">Serviços</a></Link>
              <Link href="/properties"><a className="hover:text-[#FFD700] transition-colors">Imóveis</a></Link>
              <Link href="/contact"><a className="hover:text-[#FFD700] transition-colors">Contato</a></Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-white/80">Receba nossas novidades</h3>
            
            <div className="space-y-3 w-full max-w-xs md:max-w-none">
              <div className="flex flex-col sm:flex-row gap-2 border border-white/20 p-1 rounded-sm">
                <Input 
                  placeholder="Digite seu Melhor E-mail" 
                  className="border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 text-center sm:text-left"
                />
                <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black uppercase text-xs font-bold tracking-widest rounded-sm w-full sm:w-auto">
                  Assinar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/60">Redes Sociais:</h4>
              <div className="flex gap-4">
                 <a href="https://www.facebook.com/angolaimobiliaria1" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]"><Facebook className="w-4 h-4" /></a>
                 <a href="https://www.instagram.com/angola.imobiliario?igsh=ODl0NWd5OW15ZHRi" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]"><Instagram className="w-4 h-4" /></a>
                 <a href="https://youtube.com/@angolaimobiliario?si=6QnshaAZZRlMGz7G" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]"><Youtube className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 md:mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-sans gap-4 text-center md:text-left">
          <p>© 2026 - Angola Imobiliária - Todos os direitos reservados. Desenvolvido por kysdigital.corp</p>
          <Link href="/privacy-policy">
            <a className="hover:text-white">Política de Privacidade</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
