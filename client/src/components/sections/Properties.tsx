import { PropertyCard, PropertyProps } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";

// Mock Data with Kwanza Prices (approximate conversions)
const PROPERTIES: PropertyProps[] = [
  {
    id: "1",
    image: "/attached_assets/generated_images/modern_house_with_pool_exterior.png",
    location: "Luanda, Talatona",
    title: "Casa clássica com piscina localizada no Condomínio Belas",
    area: 320.63,
    bedrooms: 3,
    bathrooms: 3,
    price: 850000000,
    status: "Venda"
  },
  {
    id: "2",
    image: "/attached_assets/generated_images/high_rise_apartment_building_exterior.png",
    location: "Luanda, Miramar",
    title: "Em construção - Apartamento à venda no Edifício Sky",
    area: 68,
    bedrooms: 2,
    bathrooms: 3,
    price: 680000000,
    status: "Lançamento"
  },
  {
    id: "3",
    image: "/attached_assets/generated_images/luxury_villa_exterior_at_dusk.png",
    location: "Luanda, Patriota",
    title: "Casa semi mobiliada com piscina no Patriota",
    area: 600,
    bedrooms: 4,
    bathrooms: 2,
    price: 765000000,
    status: "Oportunidade"
  },
  // Duplicating for grid
  {
    id: "4",
    image: "/attached_assets/generated_images/luxury_living_room_interior.png",
    location: "Luanda, Talatona",
    title: "Mansão contemporânea com acabamentos de luxo",
    area: 450,
    bedrooms: 5,
    bathrooms: 6,
    price: 1200000000,
    status: "Venda"
  },
  {
    id: "5",
    image: "/attached_assets/generated_images/modern_luxury_apartment_building_exterior_at_sunset.png",
    location: "Luanda, Ilha de Luanda",
    title: "Penthouse com vista mar panorâmica",
    area: 280,
    bedrooms: 3,
    bathrooms: 4,
    price: 950000000,
    status: "Exclusivo"
  },
  {
    id: "6",
    image: "/attached_assets/generated_images/modern_house_with_pool_exterior.png",
    location: "Luanda, Benfica",
    title: "Vivenda T4 em condomínio fechado com segurança",
    area: 300,
    bedrooms: 4,
    bathrooms: 4,
    price: 450000000,
    status: "Venda"
  }
];

export function Properties() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <p className="text-gray-600 font-medium text-sm">
            Mostrando {PROPERTIES.length} de 67 resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
            <Button variant="outline" className="border-[#FFD700] text-black hover:bg-[#FFD700] hover:text-black uppercase tracking-widest text-xs font-bold px-8 py-6">
                Carregar Mais Imóveis
            </Button>
        </div>
      </div>
    </section>
  );
}
