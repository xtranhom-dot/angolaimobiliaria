import { Camera, BarChart3 } from "lucide-react";

export function Services() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
        {/* Diamond pattern background subtle */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif text-4xl text-black font-medium">Conheça os nossos serviços</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Sempre em busca do que há de melhor e mais moderno no mercado imobiliário, a Angola Imobiliária possui ferramentas e tecnologias que contribuem no processo de compra e venda, além de valorizar o seu imóvel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Service 1 */}
          <div className="relative group">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg mb-6">
               <img src="/attached_assets/generated_images/luxury_living_room_interior.png" alt="Estudo de Mercado" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="space-y-3">
               <h3 className="font-serif text-2xl text-black font-bold border-b-2 border-[#d48c5e] inline-block pb-1">Estudo de Mercado</h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                  Realização de um Estudo de Mercado do imóvel para criar as melhores estratégias de venda de acordo com o seu objetivo.
               </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="relative group md:mt-24">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg mb-6">
               <img src="/attached_assets/generated_images/luxury_villa_exterior_at_dusk.png" alt="Fotos e Vídeos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="space-y-3">
               <h3 className="font-serif text-2xl text-black font-bold border-b-2 border-[#d48c5e] inline-block pb-1">Produção de Fotos e Vídeos</h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                  Ferramentas tecnológicas de Produção de Fotos e Vídeos em alta qualidade que geram impacto e despertam interesse do comprador.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
