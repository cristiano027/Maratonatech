import Layout from "@/components/Layout";
import { AlertCircle, Upload, MapPin, Camera, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState } from "react";

export default function Denuncias() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    photo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 1) {
      setFormStep(2);
    } else {
      setFormStep(3);
    }
  };

  const recentReports = [
    {
      id: 1,
      title: "Lixo acumulado na Rua A",
      location: "Rua das Flores, 123",
      status: "resolved",
      date: "15 de Jan",
    },
    {
      id: 2,
      title: "Descarte irregular de entulho",
      location: "Avenida Principal, 456",
      status: "analyzing",
      date: "12 de Jan",
    },
    {
      id: 3,
      title: "Coleta não realizada",
      location: "Bairro Centro",
      status: "open",
      date: "10 de Jan",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "analyzing":
        return <Clock className="w-5 h-5 text-amber-600" />;
      case "resolved":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Aberto";
      case "analyzing":
        return "Em Análise";
      case "resolved":
        return "Resolvido";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-50 border-red-200 text-red-700";
      case "analyzing":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "resolved":
        return "bg-green-50 border-green-200 text-green-700";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Fazer Denúncia</h1>
          <p className="text-muted-foreground">Reporte lixo irregular ou problemas de coleta em Cariacica</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              {formStep === 1 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Descrição do Problema
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Descreva o problema encontrado (ex: lixo acumulado, coleta não realizada, etc)"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Localização
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Rua, número e bairro"
                        className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="hidden sm:inline">Usar GPS</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.description || !formData.location}
                    className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Continuar
                  </button>
                </form>
              )}

              {formStep === 2 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-4">
                      Adicione uma Foto
                    </label>
                    <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                      <Camera className="w-12 h-12 text-primary mx-auto mb-3" />
                      <p className="font-medium text-foreground mb-1">
                        Clique para adicionar foto
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG até 5MB
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            photo: e.target.files?.[0] || null,
                          })
                        }
                        className="hidden"
                      />
                    </div>
                    {formData.photo && (
                      <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {formData.photo.name}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="flex-1 px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      Enviar Denúncia
                    </button>
                  </div>
                </form>
              )}

              {formStep === 3 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Denúncia Enviada!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Sua denúncia foi recebida com sucesso. O número de protocolo é #D2024001
                  </p>
                  <button
                    onClick={() => {
                      setFormStep(1);
                      setFormData({ description: "", location: "", photo: null });
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Fazer Outra Denúncia
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Denúncias Recentes</h2>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 rounded-lg border ${getStatusColor(report.status)}`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {getStatusIcon(report.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{report.title}</p>
                    </div>
                  </div>
                  <p className="text-xs opacity-75 mb-2">{report.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">{report.date}</span>
                    <span className="text-xs font-medium">
                      {getStatusLabel(report.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
