import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, Star } from "lucide-react";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Property } from "@shared/schema";

export default function AdminProperties() {
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      await apiRequest("PATCH", `/api/properties/${id}`, { featured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Meus Imóveis</h2>
            <p className="text-gray-500">Gerencie seu catálogo de propriedades.</p>
          </div>
          <Link href="/admin/properties/new">
            <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Novo Imóvel
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar imóveis..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imóvel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Carregando imóveis...
                  </TableCell>
                </TableRow>
              ) : properties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhum imóvel cadastrado. Clique em "Novo Imóvel" para começar.
                  </TableCell>
                </TableRow>
              ) : (
                properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden">
                          <img
                            src={property.coverImage || property.images?.[0] || "/attached_assets/generated_images/modern_house_with_pool_exterior.png"}
                            className="w-full h-full object-cover"
                            alt={property.title}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{property.title}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-8 px-2 ${property.featured ? 'bg-yellow-100 hover:bg-yellow-200' : 'hover:bg-gray-100'}`}
                              onClick={() => toggleFeaturedMutation.mutate({ id: property.id, featured: !property.featured })}
                              title={property.featured ? "Remover Destaque" : "Destacar na Home"}
                            >
                              <Star className={`h-4 w-4 ${property.featured ? "fill-yellow-400 text-yellow-500" : "text-gray-400"}`} />
                              <span className="ml-1 text-xs font-medium">
                                {property.featured ? "Destacado" : "Destacar"}
                              </span>
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">{property.municipality}, {property.province}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {property.status === 'available' ? 'Disponível' : 'Indisponível'}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(Number(property.price))}
                    </TableCell>
                    <TableCell>{property.purpose}</TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {property.createdAt ? new Date(property.createdAt).toLocaleDateString('pt-AO') : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <Link href={`/admin/properties/${property.id}/edit`}>
                            <DropdownMenuItem className="cursor-pointer">
                              <Pencil className="mr-2 h-4 w-4" /> Editar
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => toggleFeaturedMutation.mutate({ id: property.id, featured: !property.featured })}
                          >
                            <Star className={`mr-2 h-4 w-4 ${property.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            {property.featured ? "Remover Destaque" : "Destacar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => {
                              if (confirm("Tem certeza que deseja excluir este imóvel?")) {
                                deleteMutation.mutate(property.id);
                              }
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
