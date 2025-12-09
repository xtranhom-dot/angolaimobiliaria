import { Camera, BarChart3, Home, Key, ClipboardCheck, Hammer, FileText } from "lucide-react";
import salesImage from "@assets/generated_images/real_estate_sales_concept_with_luxury_home.png";
import rentalImage from "@assets/generated_images/real_estate_rental_concept_with_keys.png";
import appraisalImage from "@assets/generated_images/real_estate_appraisal_concept.png";
import maintenanceImage from "@assets/generated_images/property_maintenance_concept.png";
import plansImage from "@assets/generated_images/architectural_floor_plans.png";

const services = [
  {
    title: "Vendas de imóveis",
    description: "Encontre o imóvel dos seus sonhos ou venda o seu com a máxima eficiência e segurança, com o apoio da nossa equipa especializada.",
    image: salesImage,
    icon: Home
  },
  {
    title: "Arrendamentos de imóveis",
    description: "Opções variadas de arrendamento residencial e comercial para quem busca flexibilidade, conforto e as melhores localizações.",
    image: rentalImage,
    icon: Key
  },
  {
    title: "Avaliação de imóveis",
    description: "Avaliação precisa e técnica do seu imóvel para garantir o preço justo de mercado, fundamental para vendas e seguros.",
    image: appraisalImage,
    icon: ClipboardCheck
  },
  {
    title: "Manutenção de Imóveis",
    description: "Serviços completos de manutenção preventiva e corretiva para valorizar, conservar e garantir a longevidade do seu patrimônio.",
    image: maintenanceImage,
    icon: Hammer
  },
  {
    title: "Plantas de Imóveis",
    description: "Desenvolvimento e análise técnica de plantas arquitetônicas para legalização, reformas ou novas construções.",
    image: plansImage,
    icon: FileText
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
        {/* Diamond pattern background subtle */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif text-4xl text-black font-medium">Conheça os nossos serviços</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Oferecemos uma gama completa de serviços imobiliários, desde a mediação na compra e venda até a gestão e manutenção do seu imóvel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-start max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="relative group flex flex-col h-full">
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg mb-6 relative">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 z-10" />
                 <img 
                   src={service.image} 
                   alt={service.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
              </div>
              <div className="space-y-3 flex-grow">
                 <h3 className="font-serif text-2xl text-black font-bold border-b-2 border-[#FFD700] inline-block pb-1">{service.title}</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
