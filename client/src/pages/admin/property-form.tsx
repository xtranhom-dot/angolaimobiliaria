import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";
import { Link, useRoute, useLocation } from "wouter";
import { insertPropertySchema, type InsertProperty } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function AdminPropertyForm() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [match, params] = useRoute("/admin/properties/:id/edit");
  const isEditing = match;
  const propertyId = params?.id;

  const { data: existingProperty, isLoading: isLoadingProperty } = useQuery({
    queryKey: ["/api/properties", propertyId],
    queryFn: async () => {
      if (!propertyId) return null;
      const res = await fetch(`/api/properties/${propertyId}`);
      if (!res.ok) throw new Error("Failed to fetch property");
      return res.json();
    },
    enabled: !!propertyId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertProperty>({
    resolver: zodResolver(insertPropertySchema),
    defaultValues: {
      images: [],
      featured: false,
      status: "available",
    },
  });

  useEffect(() => {
    if (existingProperty) {
      Object.keys(existingProperty).forEach((key) => {
        setValue(key as keyof InsertProperty, existingProperty[key]);
      });
    }
  }, [existingProperty, setValue]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create property");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Imóvel criado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      navigate("/admin/properties");
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao criar imóvel. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update property");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Imóvel atualizado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      navigate("/admin/properties");
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao atualizar imóvel. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertProperty) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditing && isLoadingProperty) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Carregando dados do imóvel...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex items-center gap-4">
          <Link href="/admin/properties">
            <Button variant="ghost" size="icon" type="button">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {isEditing ? "Editar Imóvel" : "Novo Imóvel"}
            </h2>
            <p className="text-gray-500">
              {isEditing ? "Atualize as informações do imóvel." : "Preencha as informações para cadastrar um novo imóvel."}
            </p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Informações Básicas */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b pb-4">Informações Básicas</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="title">Título do Anúncio *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Ex: Apartamento T3 com Vista Mar"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyType">Tipo de Imóvel *</Label>
                <Select onValueChange={(value) => setValue("propertyType", value)} defaultValue={watch("propertyType")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa / Vivenda</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="escritorio">Escritório</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Finalidade *</Label>
                <Select onValueChange={(value) => setValue("purpose", value)} defaultValue={watch("purpose")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Venda">Venda</SelectItem>
                    <SelectItem value="Aluguel">Aluguel</SelectItem>
                  </SelectContent>
                </Select>
                {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço (AOA) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="0,00"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Área (m²) *</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.01"
                  {...register("area", { valueAsNumber: true })}
                  placeholder="0"
                />
                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição Completa</Label>
              <Textarea
                id="description"
                {...register("description")}
                className="min-h-[150px]"
                placeholder="Descreva os detalhes do imóvel..."
              />
            </div>
          </div>

          {/* Localização */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b pb-4">Localização</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="province">Província *</Label>
                <Select onValueChange={(value) => setValue("province", value)} defaultValue={watch("province")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luanda">Luanda</SelectItem>
                    <SelectItem value="Benguela">Benguela</SelectItem>
                    <SelectItem value="Huíla">Huíla</SelectItem>
                  </SelectContent>
                </Select>
                {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="municipality">Município *</Label>
                <Input
                  id="municipality"
                  {...register("municipality")}
                  placeholder="Ex: Talatona"
                />
                {errors.municipality && <p className="text-red-500 text-sm">{errors.municipality.message}</p>}
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="location">Localização (Resumida) *</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="Ex: Luanda, Talatona"
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Endereço / Bairro</Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Ex: Rua Rainha Ginga, Miramar"
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b pb-4">Características</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Quartos</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register("bedrooms", { valueAsNumber: true })}
                  min="0"
                  defaultValue={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Banheiros</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  {...register("bathrooms", { valueAsNumber: true })}
                  min="0"
                  defaultValue={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parking">Vagas Garagem</Label>
                <Input
                  id="parking"
                  type="number"
                  {...register("parking", { valueAsNumber: true })}
                  min="0"
                  defaultValue={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suites">Suítes</Label>
                <Input
                  id="suites"
                  type="number"
                  {...register("suites", { valueAsNumber: true })}
                  min="0"
                  defaultValue={0}
                />
              </div>
            </div>
          </div>

          {/* Imagem de Capa */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b pb-4">Imagem de Capa (URL)</h3>
            <div className="space-y-2">
              <Label htmlFor="coverImage">URL da Imagem de Capa</Label>
              <Input
                id="coverImage"
                {...register("coverImage")}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p className="text-xs text-gray-500">Cole o link direto da imagem hospedada</p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/properties">
              <Button variant="outline" type="button">Cancelar</Button>
            </Link>
            <Button
              type="submit"
              className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold min-w-[150px]"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? "Salvando..." : "Salvar Imóvel"}
            </Button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
