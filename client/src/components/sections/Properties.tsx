import { useQuery } from "@tanstack/react-query";
import { PropertyCard, PropertyProps } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Property } from "@shared/schema";

export function Properties() {
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const formattedProperties: PropertyProps[] = properties.map((p) => ({
    id: p.id,
    image: p.coverImage || p.images?.[0] || "/attached_assets/generated_images/modern_house_with_pool_exterior.png",
    location: `${p.municipality}, ${p.province}`,
    title: p.title,
    area: Number(p.area),
    bedrooms: p.bedrooms || 0,
    bathrooms: p.bathrooms || 0,
    price: Number(p.price),
    status: p.purpose
  }));

  return (
    <section id="properties" className="py-12 md:py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 gap-4">
          <p className="text-gray-600 font-medium text-sm text-center md:text-left">
            {isLoading ? "Carregando..." : `Mostrando ${formattedProperties.length} imóveis em destaque.`}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando imóveis...</p>
          </div>
        ) : formattedProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum imóvel em destaque no momento.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {formattedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
            
            <div className="flex justify-center mt-8 md:mt-12">
              <Link href="/properties">
                <Button variant="outline" className="border-[#FFD700] text-black hover:bg-[#FFD700] hover:text-black uppercase tracking-widest text-xs font-bold px-8 py-6">
                  Ver Todos os Imóveis
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
