import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListFilter } from "lucide-react";

import heroBg from "@/assets/luanda-hero.jpg";


export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxury Building" 
          className="w-full h-full object-cover"
        />
        {/* The deep red gradient overlay from the design */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 grid lg:grid-cols-2 gap-12 items-center">

        <div className="max-w-2xl space-y-5 animate-in slide-in-from-left duration-700">
          <div className="relative">
             <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.1]">
              Seja bem-vindo a <br />
              uma nova Experiência <br />
              <span className="font-bold">Imobiliária</span>
            </h1>
          </div>

          <p className="text-white/80 text-sm font-light leading-relaxed max-w-lg">
            Na Angola Imobiliária, oferecemos uma experiência de compra e venda de imóveis inovadora, disruptiva e personalizada, unindo segurança e transparência com o uso de tecnologia e IA.
          </p>

          {/* Search Box - Floating Card */}
          <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6 mt-6 w-[120%] -ml-[10%] lg:w-[140%] lg:ml-0 max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Tipo de Negócios</label>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venda">Venda</SelectItem>
                    <SelectItem value="aluguel">Aluguel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Tipo de Imóveis</label>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Cidade</label>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Selecione a Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luanda">Luanda</SelectItem>
                    <SelectItem value="talatona">Talatona</SelectItem>
                    <SelectItem value="belas">Belas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Bairro</label>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Selecione o Bairro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="miramar">Miramar</SelectItem>
                    <SelectItem value="patriota">Patriota</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-xs text-gray-400 hover:text-red-500 uppercase font-medium underline decoration-dotted underline-offset-4">
                  Remover
                </button>
                <Button className="flex-1 bg-[#FFD700] hover:bg-[#c07b50] text-white font-bold uppercase tracking-widest text-xs h-10 shadow-md hover:shadow-lg transition-all">
                  <ListFilter className="w-4 h-4 mr-2" />
                  Mais Filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
