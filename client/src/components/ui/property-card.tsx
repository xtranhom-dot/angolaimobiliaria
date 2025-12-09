import { MapPin, BedDouble, Bath, Square } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export interface PropertyProps {
  id: string;
  image: string;
  location: string;
  title: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status?: string;
}

export function PropertyCard({ property }: { property: PropertyProps }) {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg rounded-none bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {property.status && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
            {property.status}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-[#FFD700] p-2 text-black rounded-sm shadow-sm">
          <div className="w-4 h-4 border border-black/50" />
        </div>
      </div>

      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-2 text-[#d48c5e] mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wide">{property.location}</span>
        </div>
        <h3 className="font-serif text-lg font-bold leading-tight text-black line-clamp-2 min-h-[3rem]">
          {property.title}
        </h3>
      </CardHeader>

      <CardContent className="p-6 pt-2 pb-4">
        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <span className="text-[#d48c5e] font-bold">{property.area}</span> m²
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="flex items-center gap-1">
            <span className="text-[#d48c5e] font-bold">{property.bedrooms}</span> Quartos
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="flex items-center gap-1">
            <span className="text-[#d48c5e] font-bold">{property.bathrooms}</span> Banheiros
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="block text-xs text-gray-400 font-medium uppercase">Valor</span>
          <span className="font-serif text-xl font-bold text-black">
            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(property.price)}
          </span>
        </div>
        <Link href={`/property/${property.id}`}>
          <a className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#d48c5e] border-b-2 border-[#FFD700] hover:border-[#d48c5e] transition-colors pb-0.5">
            Ver Detalhes
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
}
