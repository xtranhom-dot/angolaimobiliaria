import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Mauricio e Catalina",
    text: "Nossa experiência com o agente imobiliário Michael Peter Salomon foi ótima. Ele é particularmente profissional, competente, respeitoso, ativo e sempre disposto a resolver todas nossas dúvidas. Michael acompanhou-nos durante todo o processo de compra do imóvel com celeridade e compromisso."
  },
  {
    name: "Ana e Fábio",
    text: "O Michael foi o nosso mediador imobiliário e nada mais teremos senão agradecer-lhe pela sua imensa competência e responsividade na execução das suas funções e gestão da comunicação compradores-vendedora. Um atendimento prestável, atencioso e eficientes, que recomendamos!"
  },
  {
    name: "Alda Alves",
    text: "Há pessoas que passam por nós e há pessoas que ficam em nós. O Michael Salomon é uma dessas pessoas, com o seu profissionalismo, sempre disponível e sempre atento. A venda e a compra de uma nova casa são momentos de felicidade, mas também momentos de muita ansiedade."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-white font-medium">Depoimentos</h2>
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {TESTIMONIALS.map((t, index) => (
              <CarouselItem key={index} className="md:basis-1/3 pl-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icon Box */}
                  <div className="w-20 h-20 border-2 border-white/20 p-4 rounded-sm flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-[#d48c5e]/20 blur-xl rounded-full"></div>
                     <div className="grid grid-cols-2 gap-1 w-full h-full relative z-10">
                        <div className="bg-transparent border border-white rounded-tl-md"></div>
                        <div className="bg-white rounded-tr-md"></div>
                        <div className="bg-white rounded-bl-md"></div>
                        <div className="bg-transparent border border-white rounded-br-md"></div>
                     </div>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed italic">
                    "{t.text}"
                  </p>

                  <h4 className="font-bold text-[#d48c5e] uppercase tracking-wider text-sm">{t.name}</h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-[#d48c5e] border-none text-white hover:bg-[#c07b50]" />
          <CarouselNext className="hidden md:flex bg-[#d48c5e] border-none text-white hover:bg-[#c07b50]" />
        </Carousel>
      </div>
    </section>
  );
}
