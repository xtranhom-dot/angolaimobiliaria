import { Button } from "@/components/ui/button";
import sellImage from "@assets/generated_images/modern_luxury_apartment_building_exterior_at_sunset.png";

export function SellCTA() {
  return (
    <section className="py-24 relative overflow-hidden flex items-center bg-[hsl(350,85%,10%)]">
       {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full z-0">
         <img src={sellImage} alt="Sell Property" className="w-full h-full object-cover opacity-40" />
         <div className="absolute inset-0 bg-gradient-to-r from-[hsl(350,85%,10%)] via-[hsl(350,85%,10%)]/90 to-[hsl(350,85%,10%)]/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl bg-[hsl(350,85%,15%)]/90 backdrop-blur-md p-10 md:p-16 rounded-lg border border-white/10 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="aspect-square rounded-lg overflow-hidden relative shadow-lg hidden lg:block">
                <img src="/attached_assets/generated_images/modern_house_with_pool_exterior.png" className="w-full h-full object-cover" />
             </div>

             <div className="space-y-8">
                <h2 className="font-serif text-4xl text-white font-medium">Quer vender um imóvel?</h2>
                <div className="space-y-4 text-white/80 text-sm font-light leading-relaxed">
                   <p>
                      A Angola Imobiliária está totalmente comprometida em garantir que o seu imóvel seja vendido da forma mais eficiente possível.
                   </p>
                   <p>
                      Investimos constantemente nas mais recentes tecnologias inovadoras para destacar e valorizar o seu imóvel, garantindo ampla visibilidade no mercado.
                   </p>
                   <p>
                      Acompanhamos todo o processo de venda, desde o estudo de mercado até o fechamento do negócio, assegurando que cada etapa seja conduzida com expertise.
                   </p>
                </div>
                
                <Button className="bg-[#d48c5e] hover:bg-[#c07b50] text-white px-8 py-6 uppercase tracking-widest font-bold text-sm shadow-lg hover:shadow-xl transition-all w-full">
                  Quero Vender o Meu Imóvel
                </Button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
