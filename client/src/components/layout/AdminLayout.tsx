import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  LogOut, 
  Plus,
  Users,
  MessageSquare
} from "lucide-react";
import logo from "@assets/Design_sem_nome-removebg-preview_1_1765217810301.png";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Building2, label: "Imóveis", href: "/admin/properties" },
    { icon: Users, label: "Clientes", href: "/admin/clients" },
    { icon: MessageSquare, label: "Mensagens", href: "/admin/messages" },
    { icon: Settings, label: "Configurações", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <img src={logo} alt="Admin" className="h-10 w-auto object-contain" />
          <span className="font-bold text-[#FFD700] uppercase tracking-wider text-sm">Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-[#FFD700] text-black font-bold shadow-md" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive ? "text-black" : "text-gray-400 group-hover:text-white")} />
                  <span>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 w-full hover:bg-white/5 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-serif font-bold text-gray-800">
             Painel Administrativo
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-[#FFD700] overflow-hidden">
               <img src="https://github.com/shadcn.png" alt="Admin" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-900">Administrador</p>
              <p className="text-xs text-gray-500">admin@angolaimobiliaria.ao</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
