import { useState, useEffect } from "react";
import { Phone, Facebook, Instagram, Linkedin, Youtube, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

import logo from "@assets/Design_sem_nome-removebg-preview_1_1765217810301.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (location !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-black/95 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-6"
      )}
    >
      <div className={cn("container mx-auto px-4 flex items-end relative transition-all duration-300", isScrolled ? "h-14" : "h-20")}>
        {/* Logo - Aligned Left */}
        <a href="/" onClick={(e) => handleScrollToSection(e, "home")} className="flex items-end gap-3 group h-full cursor-pointer">
          <img src={logo} alt="Angola Imobiliária" className="h-12 md:h-14 w-auto object-contain" />
        </a>

        {/* Navigation - Center */}
        <nav className="hidden lg:flex items-center gap-6 ml-16 text-[#FFD700] font-sans text-sm font-medium tracking-widest uppercase mb-4">
          <a href="/#home" onClick={(e) => handleScrollToSection(e, "home")} className="hover:text-white transition-colors cursor-pointer">Home</a>
          <a href="/#about" onClick={(e) => handleScrollToSection(e, "about")} className="hover:text-white transition-colors cursor-pointer">Quem Somos</a>
          <Link href="/services"><a className="hover:text-white transition-colors">Serviços</a></Link>
          <Link href="/properties"><a className="hover:text-white transition-colors">Imóveis</a></Link>
          <Link href="/contact"><a className="hover:text-white transition-colors">Contato</a></Link>
        </nav>

        {/* Right Side - Top Right */}
        <div className="hidden lg:flex items-center gap-6 ml-auto text-white text-xs font-sans tracking-wide mb-4">
           <div className="flex items-center gap-2">
            <div className="bg-[#FFD700] rounded-full p-1">
              <Phone className="w-3 h-3 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="opacity-80 text-[10px]">WHATSAPP</span>
              <span className="font-bold">+244 927 963 478</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-[#FFD700] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#FFD700] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#FFD700] transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#FFD700] transition-colors"><Youtube className="w-4 h-4" /></a>
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
        <div className="absolute top-full left-0 w-full bg-black border-t border-white/10 p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-5">
          <a href="/#home" onClick={(e) => handleScrollToSection(e, "home")} className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm cursor-pointer">Home</a>
          <a href="/#about" onClick={(e) => handleScrollToSection(e, "about")} className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm cursor-pointer">Quem Somos</a>
          <Link href="/services"><a className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm">Serviços</a></Link>
          <Link href="/properties"><a className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm">Imóveis</a></Link>
          <Link href="/contact"><a className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm">Contato</a></Link>
        </div>
      )}
    </header>
  );
}
