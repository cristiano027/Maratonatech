import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Bell,
  MapPin,
  AlertCircle,
  BookOpen,
  Zap,
  ChevronRight,
  Leaf,
  Recycle,
  Zap as ElectronicIcon,
  Hammer,
  Video,
} from "lucide-react";

export default function Index() {
  const [selectedWasteType, setSelectedWasteType] = useState<string | null>(
    null,
  );

  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: "holiday",
      title: "Feriado Prolongado",
      message:
        "Não há coleta no próximo segunda (Carnaval). Próxima coleta: terça-feira.",
      icon: Bell,
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700",
    },
    {
      id: 2,
      type: "schedule_change",
      title: "Mudança de Horário",
      message:
        "Coleta de reciclável será antecipada para 6h30 na próxima quinta.",
      icon: Bell,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
  ];

  // Sample collection schedule for the month
  const collectionSchedule = [
    { date: "Segunda", types: ["Orgânico"], color: "bg-[hsl(var(--organic))]" },
    {
      date: "Terça",
      types: ["Reciclável"],
      color: "bg-[hsl(var(--recyclable))]",
    },
    {
      date: "Quarta",
      types: ["Eletrônico"],
      color: "bg-[hsl(var(--electronic))]",
    },
    {
      date: "Quinta",
      types: ["Entulho"],
      color: "bg-[hsl(var(--construction))]",
    },
    { date: "Sexta", types: ["Orgânico", "Reciclável"], color: "bg-primary" },
  ];

  const wasteTypes = [
    {
      id: "organic",
      name: "Orgânico",
      icon: Leaf,
      color: "bg-[hsl(var(--organic))]",
    },
    {
      id: "recyclable",
      name: "Reciclável",
      icon: Recycle,
      color: "bg-[hsl(var(--recyclable))]",
    },
    {
      id: "electronic",
      name: "Eletrônico",
      icon: ElectronicIcon,
      color: "bg-[hsl(var(--electronic))]",
    },
    {
      id: "construction",
      name: "Entulho",
      icon: Hammer,
      color: "bg-[hsl(var(--construction))]",
    },
  ];

  const quickActions = [
    {
      icon: MapPin,
      label: "Ver Mapa",
      path: "/mapa",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: AlertCircle,
      label: "Fazer Denúncia",
      path: "/denuncias",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Video,
      label: "Postar Ação",
      path: "/postagens",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: BookOpen,
      label: "Educação",
      path: "/educacao",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Zap,
      label: "Meus Pontos",
      path: "/gamificacao",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <Layout>
      <div className="flex-1">
        {/* Hero Section with Neighborhood Info */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Bem-vindo a CariaLixo
                </h1>
                <p className="text-primary-foreground/90 text-lg">
                  Seu bairro: Centro, Cariacica
                </p>
              </div>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium">
                Trocar Bairro
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Notifications Section */}
          {notifications.length > 0 && (
            <section className="mb-8 sm:mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Notificações Importantes
              </h2>
              <div className="space-y-3">
                {notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-lg border ${notif.color} animate-fade-in`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${notif.textColor}`}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold ${notif.textColor}`}>
                            {notif.title}
                          </h3>
                          <p className={`text-sm mt-1 ${notif.textColor}/80`}>
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Quick Actions */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Acesso Rápido
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.path}
                    className="group relative overflow-hidden rounded-lg p-4 sm:p-6 text-white transition-all hover:shadow-lg active:scale-95"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${action.color} group-hover:scale-105 transition-transform`}
                    ></div>
                    <div className="relative flex flex-col items-center text-center gap-2">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                      <span className="font-semibold text-sm sm:text-base">
                        {action.label}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Collection Schedule */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Calendário de Coleta da Semana
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {collectionSchedule.map((day, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                >
                  <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                    {day.date}
                  </h3>
                  <div className="space-y-1.5">
                    {day.types.map((type, typeIdx) => (
                      <div
                        key={typeIdx}
                        className={`${day.color} text-white text-xs font-medium px-2 py-1 rounded inline-block`}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Waste Types Selector */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Tipos de Resíduos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {wasteTypes.map((waste) => {
                const Icon = waste.icon;
                const isSelected = selectedWasteType === waste.id;
                return (
                  <button
                    key={waste.id}
                    onClick={() =>
                      setSelectedWasteType(isSelected ? null : waste.id)
                    }
                    className={`group p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? `${waste.color} border-current text-white shadow-lg`
                        : "bg-card border-border hover:border-primary text-foreground"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mb-2 ${isSelected ? "text-current" : "text-primary group-hover:text-primary"}`}
                    />
                    <p className="font-medium text-sm">{waste.name}</p>
                  </button>
                );
              })}
            </div>
            {selectedWasteType && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Dica:</strong> {getWasteTip(selectedWasteType)}
                </p>
              </div>
            )}
          </section>

          {/* Features Overview */}
          <section className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 sm:p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Por que usar CariaLixo?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Calendário Inteligente
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Saiba exatamente quando é o dia de coleta do seu bairro
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Notificações em Tempo Real
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas sobre mudanças de horário e feriados
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Denuncie Irregularidades
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Reporte lixo irregular com foto e localização
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Ganhe Pontos
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Acumule pontos e medalhas por a��ões sustentáveis
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function getWasteTip(wasteType: string): string {
  const tips: Record<string, string> = {
    organic:
      "Resíduos orgânicos incluem frutas, verduras, folhas e outros materiais biodegradáveis. Separe-os em sacos transparentes.",
    recyclable:
      "Papel, plástico, metal e vidro devem estar limpos e secos. Esmague latas e caixas para economizar espaço.",
    electronic:
      "Eletrônicos antigos nunca devem ser descartados no lixo comum. Leve-os aos pontos de coleta especial.",
    construction:
      "Entulho como concreto, tijolos e cerâmica devem ser acondicionados adequadamente e descartados em locais específicos.",
  };
  return tips[wasteType] || "Separe corretamente seus resíduos!";
}
