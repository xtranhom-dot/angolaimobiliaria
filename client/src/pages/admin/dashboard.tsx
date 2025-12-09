import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total de Imóveis",
      value: "124",
      change: "+4 esse mês",
      icon: Building2,
      color: "text-blue-500",
    },
    {
      title: "Visualizações",
      value: "45.2k",
      change: "+12% vs mês anterior",
      icon: Eye,
      color: "text-green-500",
    },
    {
      title: "Clientes Interessados",
      value: "1,203",
      change: "+28 novos leads",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "+0.4% vs mês anterior",
      icon: TrendingUp,
      color: "text-[#FFD700]",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <p className="text-gray-500">Visão geral do desempenho da sua imobiliária.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Imóveis Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                    <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-1600596542815-27b88e360290?auto=format&fit=crop&w=100&q=80`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">Apartamento T3 Miramar</p>
                      <p className="text-xs text-gray-500">Luanda, Angola</p>
                    </div>
                    <div className="text-sm font-bold text-[#d48c5e]">
                      KZ 125.000.000
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
             <CardHeader>
              <CardTitle>Últimas Mensagens</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-start">
                     <span className="w-2 h-2 mt-2 rounded-full bg-[#FFD700]" />
                     <div>
                        <p className="text-sm font-medium text-gray-900">João Manuel</p>
                        <p className="text-xs text-gray-500 line-clamp-2">Olá, gostaria de saber mais informações sobre o imóvel no Talatona...</p>
                        <p className="text-[10px] text-gray-400 mt-1">Há 2 horas</p>
                     </div>
                  </div>
                ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
