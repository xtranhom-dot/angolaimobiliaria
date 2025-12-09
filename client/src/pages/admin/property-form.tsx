import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function AdminPropertyForm() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex items-center gap-4">
          <Link href="/admin/properties">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Novo Imóvel</h2>
            <p className="text-gray-500">Preencha as informações para cadastrar um novo imóvel.</p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Informações Básicas */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
            <h3 className="text-lg font-bold border-b pb-4">Informações Básicas</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <Label>Título do Anúncio</Label>
                <Input placeholder="Ex: Apartamento T3 com Vista Mar" />
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Imóvel</Label>
                <Select>
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
              </div>

              <div className="space-y-2">
                <Label>Finalidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venda">Venda</SelectItem>
                    <SelectItem value="aluguel">Aluguel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preço (KZ)</Label>
                <Input type="number" placeholder="0,00" />
              </div>

              <div className="space-y-2">
                <Label>Área (m²)</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>

             <div className="space-y-2">
                <Label>Descrição Completa</Label>
                <Textarea className="min-h-[150px]" placeholder="Descreva os detalhes do imóvel..." />
              </div>
          </div>

          {/* Localização */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
             <h3 className="text-lg font-bold border-b pb-4">Localização</h3>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Província</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Luanda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luanda">Luanda</SelectItem>
                      <SelectItem value="benguela">Benguela</SelectItem>
                      <SelectItem value="huila">Huíla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Município</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luanda">Luanda</SelectItem>
                      <SelectItem value="talatona">Talatona</SelectItem>
                      <SelectItem value="belas">Belas</SelectItem>
                      <SelectItem value="cazenga">Cazenga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Endereço / Bairro</Label>
                  <Input placeholder="Ex: Rua Rainha Ginga, Miramar" />
                </div>
             </div>
          </div>

          {/* Características */}
           <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
             <h3 className="text-lg font-bold border-b pb-4">Características</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label>Quartos</Label>
                  <Input type="number" min="0" />
                </div>
                 <div className="space-y-2">
                  <Label>Banheiros</Label>
                  <Input type="number" min="0" />
                </div>
                 <div className="space-y-2">
                  <Label>Vagas Garagem</Label>
                  <Input type="number" min="0" />
                </div>
                 <div className="space-y-2">
                  <Label>Suítes</Label>
                  <Input type="number" min="0" />
                </div>
             </div>
           </div>

           {/* Mídia */}
           <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
             <h3 className="text-lg font-bold border-b pb-4">Fotos e Vídeos</h3>
             
             <div className="border-2 border-dashed border-gray-200 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-bold text-gray-900">Clique para fazer upload</h4>
                <p className="text-sm text-gray-500 mt-1">ou arraste e solte seus arquivos aqui</p>
                <p className="text-xs text-gray-400 mt-4">JPG, PNG ou MP4 (Máx. 10MB)</p>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Mock Image Previews */}
                {[1, 2].map(i => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden group">
                     <img src={`https://images.unsplash.com/photo-1600596542815-27b88e360290?auto=format&fit=crop&w=200&q=80`} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
                ))}
             </div>
           </div>

           <div className="flex justify-end gap-4">
              <Link href="/admin/properties">
                 <Button variant="outline">Cancelar</Button>
              </Link>
              <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold min-w-[150px]">
                 Salvar Imóvel
              </Button>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
