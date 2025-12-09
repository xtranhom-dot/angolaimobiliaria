import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#fcfcfc] rounded-2xl p-8 md:p-12 lg:p-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-0 overflow-hidden shadow-2xl">
          
          <div className="flex-1 lg:p-20 space-y-6 text-center lg:text-left">
            <div className="w-20 h-20 mx-auto lg:mx-0 border-2 border-[#FFD700] p-2 rounded-full mb-6">
               <div className="w-full h-full border border-[#FFD700] rounded-full flex items-center justify-center">
                  <span className="font-serif text-3xl text-black">SR</span>
               </div>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-black leading-tight">
              Você precisa falar <br/>
              com um especialista?
            </h2>
            
            <p className="text-gray-500 max-w-md mx-auto lg:mx-0">
              Nossa equipe altamente qualificada está pronta para ajudar você.
            </p>

            <Button className="bg-[#d48c5e] hover:bg-[#c07b50] text-white px-8 py-6 uppercase tracking-widest font-bold text-sm shadow-lg hover:shadow-xl transition-all w-full md:w-auto">
              Fale com um Especialista
            </Button>
          </div>

          <div className="flex-1 h-full min-h-[400px] w-full relative">
            <img 
              src="/attached_assets/generated_images/luxury_living_room_interior.png" 
              alt="Interior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
             {/* Gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent via-transparent to-white/20 lg:to-white" />
          </div>

        </div>
      </div>
    </section>
  );
}
