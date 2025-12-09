import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-10 border-t border-white/10">
      {/* Social Banner */}
      <div className="container mx-auto px-4 -mt-24 mb-16 relative z-10">
        <div className="bg-white text-black rounded-lg p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 uppercase tracking-widest">Siga-nos nas</span>
            <span className="font-serif text-3xl font-bold">Redes Sociais</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="bg-[#1877F2] text-white p-3 rounded-full hover:scale-110 transition-transform"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="bg-[#E4405F] text-white p-3 rounded-full hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="bg-[#0A66C2] text-white p-3 rounded-full hover:scale-110 transition-transform"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="bg-[#FF0000] text-white p-3 rounded-full hover:scale-110 transition-transform"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/">
              <a className="flex items-center gap-3 group">
                <div className="border-2 border-white p-1 rounded-sm">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-2 h-2 bg-white rounded-tl-sm"></div>
                    <div className="w-2 h-2 border border-white rounded-tr-sm"></div>
                    <div className="w-2 h-2 border border-white rounded-bl-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-br-sm"></div>
                  </div>
                </div>
                <div className="flex flex-col text-white">
                  <span className="font-serif text-2xl leading-none tracking-wide">Angola Imobiliária</span>
                </div>
              </a>
            </Link>
            
            <div className="flex gap-2">
              <img src="https://flagcdn.com/w40/br.png" alt="Brazil" className="w-8 rounded-sm" />
              <img src="https://flagcdn.com/w40/pt.png" alt="Portugal" className="w-8 rounded-sm" />
            </div>
            
            <p className="text-white/60 text-sm">CRECI 8540J</p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-white/80">Atendimento:</h3>
            
            <div className="flex gap-4 items-start">
              <div className="border border-white/20 p-2 rounded-full">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60 uppercase">Whatsapp</span>
                <span className="text-lg font-serif">(47) 9.9241-5996</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="border border-white/20 p-2 rounded-full">
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
              <Link href="/"><a className="hover:text-[#d48c5e] transition-colors">Home</a></Link>
              <Link href="/about"><a className="hover:text-[#d48c5e] transition-colors">Quem Somos</a></Link>
              <Link href="/services"><a className="hover:text-[#d48c5e] transition-colors">Serviços</a></Link>
              <Link href="/properties"><a className="hover:text-[#d48c5e] transition-colors">Imóveis</a></Link>
              <Link href="/contact"><a className="hover:text-[#d48c5e] transition-colors">Contato</a></Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-white/80">Receba nossas novidades</h3>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 border border-white/20 p-1 rounded-sm">
                <Input 
                  placeholder="Digite seu Melhor E-mail" 
                  className="border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0"
                />
                <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black uppercase text-xs font-bold tracking-widest rounded-sm">
                  Assinar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/60">Redes Sociais:</h4>
              <div className="flex gap-4">
                 <a href="#" className="hover:text-[#d48c5e]"><Facebook className="w-4 h-4" /></a>
                 <a href="#" className="hover:text-[#d48c5e]"><Instagram className="w-4 h-4" /></a>
                 <a href="#" className="hover:text-[#d48c5e]"><Linkedin className="w-4 h-4" /></a>
                 <a href="#" className="hover:text-[#d48c5e]"><Youtube className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-sans gap-4">
          <p>© 2024 - Angola Imobiliária - Todos os direitos reservados.</p>
          <a href="#" className="hover:text-white">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
