import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Home, Key, Loader2 } from "lucide-react";
import { Link } from "wouter";
import type { Property, Message } from "@shared/schema";

interface AdminStats {
  totalProperties: number;
  totalMessages: number;
  unreadMessages: number;
  propertiesForSale: number;
  propertiesForRent: number;
}

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const recentProperties = properties.slice(0, 5);
  const recentMessages = messages.slice(0, 5);

  const statCards = [
    {
      title: "Total de Imóveis",
      value: stats?.totalProperties ?? 0,
      description: "Imóveis cadastrados",
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Para Venda",
      value: stats?.propertiesForSale ?? 0,
      description: "Imóveis à venda",
      icon: Home,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Para Aluguel",
      value: stats?.propertiesForRent ?? 0,
      description: "Imóveis para alugar",
      icon: Key,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Mensagens",
      value: stats?.unreadMessages ?? 0,
      description: `${stats?.totalMessages ?? 0} mensagens no total`,
      icon: Mail,
      color: "text-[#FFD700]",
      bgColor: "bg-yellow-50",
    },
  ];

  const isLoading = statsLoading || propertiesLoading || messagesLoading;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#FFD700]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <p className="text-gray-500">Visão geral do desempenho da sua imobiliária.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Imóveis Recentes</CardTitle>
              <Link href="/admin/properties">
                <span className="text-sm text-[#FFD700] hover:underline cursor-pointer">Ver todos</span>
              </Link>
            </CardHeader>
            <CardContent>
              {recentProperties.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhum imóvel cadastrado ainda.</p>
                  <Link href="/admin/properties/new">
                    <span className="text-[#FFD700] hover:underline cursor-pointer text-sm">Adicionar primeiro imóvel</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={property.coverImage || property.images?.[0] || "/attached_assets/generated_images/modern_house_with_pool_exterior.png"} 
                          className="w-full h-full object-cover" 
                          alt={property.title}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{property.title}</p>
                        <p className="text-xs text-gray-500">{property.municipality}, {property.province}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#FFD700]">
                          {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA', notation: 'compact' }).format(Number(property.price))}
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${property.purpose === 'Venda' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {property.purpose}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Últimas Mensagens</CardTitle>
              <Link href="/admin/messages">
                <span className="text-sm text-[#FFD700] hover:underline cursor-pointer">Ver todas</span>
              </Link>
            </CardHeader>
            <CardContent>
              {recentMessages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhuma mensagem recebida ainda.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex gap-3 items-start">
                      <span className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${message.read ? 'bg-gray-300' : 'bg-[#FFD700]'}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 truncate">{message.name}</p>
                          {!message.read && (
                            <span className="text-[10px] bg-[#FFD700]/10 text-[#FFD700] px-1.5 py-0.5 rounded-full font-medium">Novo</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{message.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {message.createdAt ? new Date(message.createdAt).toLocaleDateString('pt-AO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
