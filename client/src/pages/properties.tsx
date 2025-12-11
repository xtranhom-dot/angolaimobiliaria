import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard, PropertyProps } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Home, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// Mock Data (Expanded)
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
  },
  {
    id: "7",
    image: "/attached_assets/generated_images/luxury_villa_exterior_at_dusk.png",
    location: "Luanda, Kilamba",
    title: "Apartamento T3+1 no Kilamba",
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    price: 45000000,
    status: "Venda"
  },
  {
    id: "8",
    image: "/attached_assets/generated_images/luxury_living_room_interior.png",
    location: "Luanda, Alvalade",
    title: "Escritório corporativo no centro da cidade",
    area: 150,
    bedrooms: 0,
    bathrooms: 2,
    price: 250000000,
    status: "Comercial"
  }
];

export default function PropertiesPage() {
  const [priceRange, setPriceRange] = useState([0, 2000000000]);
  
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-black text-white pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/luanda-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="container mx-auto relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Nossos Imóveis</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Explore nossa seleção exclusiva de propriedades de luxo em Luanda e arredores. 
            Encontre o lar perfeito ou o investimento ideal.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filters (Sheet) */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full bg-black text-[#FFD700] border border-[#FFD700] hover:bg-gray-900">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar Imóveis
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-xl mb-4">Filtrar Imóveis</SheetTitle>
              </SheetHeader>
              <FiltersContent priceRange={priceRange} setPriceRange={setPriceRange} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="bg-white p-6 shadow-sm sticky top-24 border border-gray-100">
            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#FFD700]" />
              Filtros
            </h2>
            <FiltersContent priceRange={priceRange} setPriceRange={setPriceRange} />
          </div>
        </aside>

        {/* Properties Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500 text-sm">Mostrando <span className="font-bold text-black">{PROPERTIES.length}</span> imóveis</p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais Recentes</SelectItem>
                <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROPERTIES.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-2">
            <Button variant="outline" className="w-10 h-10 p-0 font-bold border-black bg-black text-[#FFD700]">1</Button>
            <Button variant="outline" className="w-10 h-10 p-0 font-bold hover:bg-gray-100">2</Button>
            <Button variant="outline" className="w-10 h-10 p-0 font-bold hover:bg-gray-100">3</Button>
            <span className="flex items-end px-2">...</span>
            <Button variant="outline" className="w-10 h-10 p-0 font-bold hover:bg-gray-100">8</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FiltersContent({ priceRange, setPriceRange }: { priceRange: number[], setPriceRange: (val: number[]) => void }) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Buscar</label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Palavra-chave..." className="pl-9" />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Localização</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todas as Localizações" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Localizações</SelectItem>
            <SelectItem value="talatona">Talatona</SelectItem>
            <SelectItem value="miramar">Miramar</SelectItem>
            <SelectItem value="patriota">Patriota</SelectItem>
            <SelectItem value="ilha">Ilha de Luanda</SelectItem>
            <SelectItem value="benfica">Benfica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Tipo de Imóvel</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todos os Tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="house">Vivenda</SelectItem>
            <SelectItem value="apartment">Apartamento</SelectItem>
            <SelectItem value="office">Escritório</SelectItem>
            <SelectItem value="land">Terreno</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Finalidade</label>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-black text-[#FFD700] border-black hover:bg-gray-800 hover:text-[#FFD700]">Venda</Button>
          <Button variant="outline" className="flex-1 hover:bg-gray-100">Aluguel</Button>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Faixa de Preço</label>
          <span className="text-xs text-gray-500 font-medium">AOA</span>
        </div>
        <Slider 
          defaultValue={[0, 2000000000]} 
          max={2000000000} 
          step={1000000} 
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-4"
        />
        <div className="flex justify-between text-xs font-medium text-gray-700">
          <span>{new Intl.NumberFormat('pt-AO', { notation: "compact", compactDisplay: "short" }).format(priceRange[0])}</span>
          <span>{new Intl.NumberFormat('pt-AO', { notation: "compact", compactDisplay: "short" }).format(priceRange[1])}+</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Quartos</label>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="hover:bg-black hover:text-[#FFD700] hover:border-black transition-colors">1+</Button>
          <Button variant="outline" className="hover:bg-black hover:text-[#FFD700] hover:border-black transition-colors">2+</Button>
          <Button variant="outline" className="hover:bg-black hover:text-[#FFD700] hover:border-black transition-colors">3+</Button>
          <Button variant="outline" className="hover:bg-black hover:text-[#FFD700] hover:border-black transition-colors">4+</Button>
        </div>
      </div>

      <Button className="w-full bg-[#FFD700] text-black hover:bg-[#e6c200] font-bold mt-4">
        Aplicar Filtros
      </Button>
    </div>
  );
}
