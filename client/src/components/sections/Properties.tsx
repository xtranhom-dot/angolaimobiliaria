import { PropertyCard, PropertyProps } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";

// Mock Data with Kwanza Prices (approximate conversions)
const PROPERTIES: PropertyProps[] = [];
/*
const PROPERTIES_MOCK: PropertyProps[] = [
  {
    id: "1",
// ...
  }
];
*/

export function Properties() {
  return (
    <section id="properties" className="py-12 md:py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 gap-4">
          <p className="text-gray-600 font-medium text-sm text-center md:text-left">
            Mostrando {PROPERTIES.length} de 67 resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8 md:mt-12">
            <Button variant="outline" className="border-[#FFD700] text-black hover:bg-[#FFD700] hover:text-black uppercase tracking-widest text-xs font-bold px-8 py-6">
                Carregar Mais Imóveis
            </Button>
        </div>
      </div>
    </section>
  );
}
