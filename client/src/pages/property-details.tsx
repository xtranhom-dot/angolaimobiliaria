import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, BedDouble, Bath, Square, Calendar, CheckCircle2, Share2, Heart, Phone, Mail } from "lucide-react";
import { PropertyCard } from "@/components/ui/property-card";

// Reusing the mock data from Properties.tsx for consistency in the "Similar Properties" section
// In a real app, this would come from a shared store or API
const SIMILAR_PROPERTIES = [
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

export default function PropertyDetails() {
  const params = useParams();

  // Mock data for the current property
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${params.id}`],
  });

  console.log(`[DEBUG Client] ID from params:`, params.id);
  console.log(`[DEBUG Client] Property data:`, property);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-xl text-gray-500">Carregando detalhes do imóvel...</div>
      </div>
    );
  }

  // Debug info for user/admin
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] gap-4">
        <div className="text-xl text-red-500 font-bold">Imóvel não encontrado</div>
        <div className="text-sm text-gray-500 max-w-md text-center">
          ID solicitado: <span className="font-mono bg-gray-100 px-1">{params.id}</span>
        </div>
        <div className="text-xs text-gray-400">
          Por favor, verifique se o URL está correto ou tente voltar à lista de imóveis.
        </div>
        <Button onClick={() => window.location.href = '/properties'}>
          Ver Lista de Imóveis
        </Button>
      </div>
    );
  }

  const propertyFeatures = property.features || [];
  const propertyImages = (property.images && property.images.length > 0)
    ? property.images
    : ["/attached_assets/generated_images/modern_house_with_pool_exterior.png"];

  // Normalize stats from property data
  const stats = {
    area: Number(property.area) || 0,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    parking: property.parking || 0,
    builtYear: new Date(property.createdAt!).getFullYear() // Fallback to created year
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fafafa]">
      <Header />

      <main className="pt-20 lg:pt-28 pb-20">
        {/* Gallery Section */}
        <div className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[50vh] md:h-[60vh]">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
              <img src={propertyImages[0]} alt="Main View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            {propertyImages[1] && (
              <div className="relative group overflow-hidden rounded-xl cursor-pointer">
                <img src={propertyImages[1]} alt="Interior View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            )}
            {propertyImages[2] && (
              <div className="relative group overflow-hidden rounded-xl cursor-pointer">
                <img src={propertyImages[2]} alt="Exterior View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            )}
            {propertyImages[3] && (
              <div className="relative group overflow-hidden rounded-xl cursor-pointer">
                <img src={propertyImages[3]} alt="Detail View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold uppercase tracking-widest text-sm border border-white px-4 py-2">Ver Todas</span>
                </div>
              </div>
            )}
            <div className="relative group overflow-hidden rounded-xl cursor-pointer bg-[hsl(350,85%,15%)] flex items-center justify-center text-white flex-col gap-2">
              <span className="text-3xl font-serif font-bold">+12</span>
              <span className="text-xs uppercase tracking-widest">Fotos</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Header Info */}
              <div className="space-y-4 border-b border-gray-200 pb-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#FFD700] hover:bg-[#c07b50] text-white rounded-sm px-3 py-1 text-xs uppercase tracking-widest">Venda</Badge>
                      <span className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="w-4 h-4" /> {property.location}</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl text-[hsl(350,85%,15%)] font-medium leading-tight">
                      {property.title}
                    </h1>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="text-3xl font-serif font-bold text-[hsl(350,85%,15%)]">
                      {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(Number(property.price))}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-200 text-gray-500 hover:text-[#FFD700] hover:border-[#FFD700]">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                  <div className="flex flex-col items-center justify-center text-center gap-1 border-r border-gray-100 last:border-0">
                    <Square className="w-6 h-6 text-[#FFD700]" />
                    <span className="font-bold text-[hsl(350,85%,15%)] text-lg">{stats.area}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Área (m²)</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-1 border-r border-gray-100 last:border-0">
                    <BedDouble className="w-6 h-6 text-[#FFD700]" />
                    <span className="font-bold text-[hsl(350,85%,15%)] text-lg">{stats.bedrooms}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Quartos</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-1 border-r border-gray-100 last:border-0">
                    <Bath className="w-6 h-6 text-[#FFD700]" />
                    <span className="font-bold text-[hsl(350,85%,15%)] text-lg">{stats.bathrooms}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Banheiros</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-1">
                    <Calendar className="w-6 h-6 text-[#FFD700]" />
                    <span className="font-bold text-[hsl(350,85%,15%)] text-lg">{stats.builtYear}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Ano</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-[hsl(350,85%,15%)] font-medium">Sobre o Imóvel</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[hsl(350,85%,15%)] font-medium">Características</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100 hover:border-[#FFD700]/30 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                      <span className="text-gray-600 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Agent Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <h3 className="font-serif text-xl text-[hsl(350,85%,15%)] font-bold mb-6 border-b border-gray-100 pb-4">
                  Fale com o Especialista
                </h3>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FFD700]">
                    <img src="/attached_assets/generated_images/professional_real_estate_team_of_three_people.png" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-[hsl(350,85%,15%)]">Michael Salomon</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Corretor Senior</p>
                  </div>
                </div>

                <form className="space-y-4">
                  <Input placeholder="Seu Nome" className="bg-gray-50 border-gray-200" />
                  <Input placeholder="Seu Telefone" className="bg-gray-50 border-gray-200" />
                  <Input placeholder="Seu Email" className="bg-gray-50 border-gray-200" />
                  <Textarea placeholder="Olá, gostaria de mais informações sobre este imóvel..." className="bg-gray-50 border-gray-200 min-h-[100px]" />

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold uppercase tracking-widest text-xs">
                      <Phone className="w-4 h-4 mr-2" /> Whatsapp
                    </Button>
                    <Button className="flex-1 bg-[hsl(350,85%,15%)] hover:bg-[hsl(350,85%,25%)] text-white font-bold uppercase tracking-widest text-xs">
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </Button>
                  </div>
                </form>
              </div>
            </div>

          </div>

          {/* Similar Properties */}
          <div className="mt-20 border-t border-gray-200 pt-16">
            <h3 className="font-serif text-3xl text-[hsl(350,85%,15%)] font-medium mb-10">Imóveis Semelhantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SIMILAR_PROPERTIES.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
