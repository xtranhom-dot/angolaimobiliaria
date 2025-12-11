import { useState, useEffect } from "react";
import { Phone, Facebook, Instagram, Linkedin, Youtube, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

import logo from "@assets/Design_sem_nome-removebg-preview_1_1765217810301.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    height="1em" 
    width="1em" 
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.02v10.95c0 4.61-5.15 7.42-9.07 4.41-4.09-3.08-3.02-9.92 2.15-10.56V17c-2.45.15-4.14 2.54-3.23 4.97.72 1.94 3.22 2.79 5.06 1.68 1.34-.8 1.87-2.39 1.83-3.92V6.07c-1.01.44-2.12.52-3.2.32V2.32c.57.01 1.14.01 1.71.01.21-.01.42-.01.63-.01V.02z" />
  </svg>
);

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
          <a href="/#services" onClick={(e) => handleScrollToSection(e, "services")} className="hover:text-white transition-colors cursor-pointer">Serviços</a>
          <Link href="/properties"><a className="hover:text-white transition-colors cursor-pointer">Imóveis</a></Link>
          <Link href="/contact"><a className="hover:text-white transition-colors">Contato</a></Link>
        </nav>

        {/* Right Side - Top Right */}
        <div className="hidden lg:flex items-center gap-6 ml-auto text-white text-xs font-sans tracking-wide mb-4">
           <div className="flex items-center gap-2">
            <div className="bg-[#FFD700] rounded-full p-1">
              <Phone className="w-3 h-3 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold">+244 927 963 478</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/angolaimobiliaria1" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/angola.imobiliario?igsh=ODl0NWd5OW15ZHRi" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://www.tiktok.com/@vendaearrendamento?_r=1&_d=f0djikl58ji5c5&sec_uid=MS4wLjABAAAAyVfcXqPhyYhnTl6u1-UtiQ19NA0b44Gt110ZvX3Bwb5hFOHiiSV4K4t8tdL6rSkY&share_author_id=7158411886077281282&sharer_language=pt&source=h5_m&u_code=e4elja6gd2g17d&timestamp=1765366670&user_id=7158411886077281282&sec_user_id=MS4wLjABAAAAyVfcXqPhyYhnTl6u1-UtiQ19NA0b44Gt110ZvX3Bwb5hFOHiiSV4K4t8tdL6rSkY&item_author_type=1&utm_source=whatsapp&utm_campaign=client_share&utm_medium=android&share_iid=7580383302760515384&share_link_id=ff960e5c-1908-4602-8272-d652a6591e2d&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors"><TikTokIcon className="w-4 h-4" /></a>
            <a href="https://youtube.com/@angolaimobiliario?si=6QnshaAZZRlMGz7G" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white ml-auto mb-4"
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
          <a href="/#services" onClick={(e) => handleScrollToSection(e, "services")} className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm cursor-pointer">Serviços</a>
          <Link href="/properties"><a className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm cursor-pointer">Imóveis</a></Link>
          <Link href="/contact"><a className="text-[#FFD700] hover:text-white py-2 uppercase tracking-widest text-sm">Contato</a></Link>
        </div>
      )}
    </header>
  );
}
