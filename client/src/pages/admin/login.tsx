import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Mail, Loader2 } from "lucide-react";
import logo from "@assets/Design_sem_nome-removebg-preview_1_1765217810301.png";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
      
      <Card className="w-full max-w-md relative z-10 border-white/10 bg-white/95 backdrop-blur shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-24 h-24 bg-black rounded-full flex items-center justify-center border-4 border-[#FFD700] shadow-lg mb-2">
            <img src={logo} alt="Logo" className="w-16 h-auto" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-serif font-bold text-gray-900">
              Área Administrativa
            </CardTitle>
            <CardDescription className="text-gray-500">
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@angolaimobiliaria.ao" 
                  className="pl-9 bg-gray-50"
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Palavra-passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-9 bg-gray-50"
                  required 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold h-11 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  A entrar...
                </>
              ) : (
                "Entrar no Sistema"
              )}
            </Button>

            <div className="text-center text-sm">
              <a href="#" className="text-gray-500 hover:text-[#FFD700] transition-colors">
                Esqueceu a palavra-passe?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
