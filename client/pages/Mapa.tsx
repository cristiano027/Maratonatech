import Layout from "@/components/Layout";
import { MapPin, Truck } from "lucide-react";

export default function Mapa() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Mapa Interativo</h1>
          <p className="text-muted-foreground">Acompanhe as rotas dos caminhões de lixo em tempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map area */}
          <div className="lg:col-span-3">
            <div className="w-full h-96 sm:h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">Mapa interativo em desenvolvimento</p>
                <p className="text-sm text-muted-foreground mt-2">Aqui será exibido o mapa com as rotas dos caminhões de lixo</p>
              </div>
            </div>
          </div>

          {/* Sidebar with truck locations */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Caminhões Ativos
              </h2>
              <div className="space-y-3">
                {[1, 2, 3].map((truck) => (
                  <div key={truck} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm text-foreground">Caminhão #{truck}</p>
                    <p className="text-xs text-muted-foreground mt-1">Rua das Flores</p>
                    <div className="mt-2 w-full bg-primary/20 rounded-full h-2">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${60 + truck * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">Pontos de Coleta</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[hsl(var(--organic))] rounded-full"></div>
                  <span className="text-muted-foreground">Orgânico</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[hsl(var(--recyclable))] rounded-full"></div>
                  <span className="text-muted-foreground">Reciclável</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[hsl(var(--electronic))] rounded-full"></div>
                  <span className="text-muted-foreground">Eletrônico</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[hsl(var(--construction))] rounded-full"></div>
                  <span className="text-muted-foreground">Entulho</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
