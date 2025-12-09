import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Trash2, Pencil, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminLocations() {
  const [activeTab, setActiveTab] = useState("provincias");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Gerir Localizações</h2>
          <p className="text-gray-500">Adicione e edite províncias e municípios disponíveis no sistema.</p>
        </div>

        <Tabs defaultValue="provincias" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-white border p-1">
            <TabsTrigger value="provincias" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">Províncias</TabsTrigger>
            <TabsTrigger value="municipios" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">Municípios / Cidades</TabsTrigger>
          </TabsList>

          {/* PROVINCIAS TAB */}
          <TabsContent value="provincias" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar província..." className="pl-10 bg-white" />
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Província
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Província</DialogTitle>
                    <DialogDescription>
                      Insira o nome da nova província para adicionar ao sistema.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Nome da Província</Label>
                      <Input placeholder="Ex: Luanda" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Municípios Cadastrados</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Luanda", count: 9 },
                    { name: "Benguela", count: 10 },
                    { name: "Huíla", count: 14 },
                    { name: "Huambo", count: 11 },
                    { name: "Cabinda", count: 4 },
                  ].map((prov, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{prov.name}</TableCell>
                      <TableCell>{prov.count} municípios</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* MUNICIPIOS TAB */}
          <TabsContent value="municipios" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar município..." className="pl-10 bg-white" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Filtrar por Província" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Províncias</SelectItem>
                    <SelectItem value="luanda">Luanda</SelectItem>
                    <SelectItem value="benguela">Benguela</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Município
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Município</DialogTitle>
                    <DialogDescription>
                      Insira o nome do município e selecione a província pertencente.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Província</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a província..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="luanda">Luanda</SelectItem>
                          <SelectItem value="benguela">Benguela</SelectItem>
                          <SelectItem value="huila">Huíla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Nome do Município</Label>
                      <Input placeholder="Ex: Talatona" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Província</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Talatona", prov: "Luanda" },
                    { name: "Belas", prov: "Luanda" },
                    { name: "Lobito", prov: "Benguela" },
                    { name: "Lubango", prov: "Huíla" },
                    { name: "Cazenga", prov: "Luanda" },
                    { name: "Viana", prov: "Luanda" },
                  ].map((mun, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{mun.name}</TableCell>
                      <TableCell>
                         <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                          {mun.prov}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
