import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Phone, Calendar, Star, Trash2 } from "lucide-react";

export default function AdminMessages() {
  const messages: any[] = []; // Mock data removed
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Mensagens</h2>
            <p className="text-gray-500">Gerencie as mensagens e contactos recebidos.</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm max-w-md">
          <Search className="h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Buscar mensagens..." 
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`transition-all duration-200 hover:shadow-md ${!message.read ? 'border-l-4 border-l-[#FFD700]' : ''}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-gray-900">{message.name}</h3>
                          {!message.read && (
                            <span className="bg-[#FFD700]/10 text-[#FFD700] text-xs font-bold px-2 py-0.5 rounded-full">
                              Novo
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-500">{message.subject}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{message.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {message.message}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <Mail className="h-4 w-4" />
                        {message.email}
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <Phone className="h-4 w-4" />
                        {message.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 justify-end md:justify-start border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[120px]">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700]">
                      <Mail className="h-4 w-4" />
                      Responder
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                      <Trash2 className="h-4 w-4" />
                      Apagar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
