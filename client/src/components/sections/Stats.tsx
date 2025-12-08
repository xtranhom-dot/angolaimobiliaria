import { Users, TrendingUp } from "lucide-react";

export function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-[#ffdab9] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#d48c5e]">
            <div className="mb-4 text-[#d48c5e]">
               <Users className="w-12 h-12 stroke-1" />
            </div>
            <h3 className="font-serif text-4xl font-bold text-[hsl(350,85%,15%)] mb-1">+184</h3>
            <p className="text-[hsl(350,85%,15%)] font-bold uppercase text-xs tracking-widest">Clientes Satisfeitos</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#ffdab9] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#d48c5e]">
            <div className="mb-4 text-[#d48c5e]">
               <TrendingUp className="w-12 h-12 stroke-1" />
            </div>
            <h3 className="font-serif text-4xl font-bold text-[hsl(350,85%,15%)] mb-1">+86 Milhões</h3>
            <p className="text-[hsl(350,85%,15%)] font-bold uppercase text-xs tracking-widest">Em Vendas (Kz)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
