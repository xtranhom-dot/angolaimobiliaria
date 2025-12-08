import { useState, useEffect } from "react";
import { Phone, Facebook, Instagram, Linkedin, Youtube, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-[hsl(350,85%,15%)]/95 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-6"
      )}
    >
      <div className={cn("container mx-auto px-4 flex justify-between items-center relative transition-all duration-300", isScrolled ? "h-14" : "h-20")}>
        {/* Logo - Aligned Left */}
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

        {/* Navigation - Center */}
        <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-white font-sans text-sm font-medium tracking-widest uppercase">
          <Link href="/"><a className="hover:text-[#d48c5e] transition-colors">Home</a></Link>
          <Link href="/about"><a className="hover:text-[#d48c5e] transition-colors">Quem Somos</a></Link>
          <Link href="/services"><a className="hover:text-[#d48c5e] transition-colors">Serviços</a></Link>
          <Link href="/properties"><a className="hover:text-[#d48c5e] transition-colors">Imóveis</a></Link>
          <Link href="/contact"><a className="hover:text-[#d48c5e] transition-colors">Contato</a></Link>
        </nav>

        {/* Right Side - Top Right */}
        <div className="hidden lg:flex items-center gap-6 text-white text-xs font-sans tracking-wide">
           <div className="flex items-center gap-2">
            <div className="bg-[#d48c5e] rounded-full p-1">
              <Phone className="w-3 h-3 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="opacity-80 text-[10px]">WHATSAPP</span>
              <span className="font-bold">(47) 9.9241-5996</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-[#d48c5e] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#d48c5e] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#d48c5e] transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#d48c5e] transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[hsl(350,85%,15%)] border-t border-white/10 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-5">
          <Link href="/"><a className="text-white hover:text-[#d48c5e] py-2 uppercase tracking-widest text-sm">Home</a></Link>
          <Link href="/about"><a className="text-white hover:text-[#d48c5e] py-2 uppercase tracking-widest text-sm">Quem Somos</a></Link>
          <Link href="/services"><a className="text-white hover:text-[#d48c5e] py-2 uppercase tracking-widest text-sm">Serviços</a></Link>
          <Link href="/properties"><a className="text-white hover:text-[#d48c5e] py-2 uppercase tracking-widest text-sm">Imóveis</a></Link>
          <Link href="/contact"><a className="text-white hover:text-[#d48c5e] py-2 uppercase tracking-widest text-sm">Contato</a></Link>
        </div>
      )}
    </header>
  );
}
