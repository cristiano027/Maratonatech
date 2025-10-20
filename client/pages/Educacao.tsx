import Layout from "@/components/Layout";
import {
  BookOpen,
  Leaf,
  Recycle,
  Zap as ElectronicIcon,
  Hammer,
  Play,
  Award,
  Video,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Educacao() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const tips = [
    {
      category: "organic",
      title: "Compostagem Caseira",
      description:
        "Aprenda como fazer compostagem dos seus resíduos orgânicos e criar adubo natural para plantas",
      icon: Leaf,
      color: "bg-[hsl(var(--organic))]",
    },
    {
      category: "recyclable",
      title: "Separação Correta de Recicláveis",
      description:
        "Guia completo sobre como separar papel, plástico, metal e vidro corretamente",
      icon: Recycle,
      color: "bg-[hsl(var(--recyclable))]",
    },
    {
      category: "electronic",
      title: "Descarte Seguro de Eletrônicos",
      description:
        "Saiba por que eletrônicos são perigosos e onde descartar corretamente",
      icon: ElectronicIcon,
      color: "bg-[hsl(var(--electronic))]",
    },
    {
      category: "construction",
      title: "Gestão de Entulho",
      description:
        "Como descartar corretamente restos de obra e materiais de construção",
      icon: Hammer,
      color: "bg-[hsl(var(--construction))]",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "5 Passos para Reciclar Corretamente",
      duration: "3:45",
      views: "2.1K",
    },
    {
      id: 2,
      title: "O Impacto do Plástico no Oceano",
      duration: "5:20",
      views: "1.8K",
    },
    {
      id: 3,
      title: "Sustentabilidade em Casa",
      duration: "4:15",
      views: "950",
    },
    {
      id: 4,
      title: "Iniciativas Verdes em Cariacica",
      duration: "6:10",
      views: "1.2K",
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: "Quiz de Recicláveis",
      description: "Teste seus conhecimentos sobre reciclagem",
      difficulty: "Fácil",
      points: 10,
    },
    {
      id: 2,
      title: "Desafio de Sustentabilidade",
      description: "Aprenda sobre sustentabilidade e ganhe pontos",
      difficulty: "Médio",
      points: 25,
    },
    {
      id: 3,
      title: "Especialista em Resíduos",
      description: "Para quem já domina o tema",
      difficulty: "Difícil",
      points: 50,
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Educação Ambiental
          </h1>
          <p className="text-muted-foreground">
            Aprenda sobre sustentabilidade e práticas corretas de descarte
          </p>
        </div>

        {/* Tips Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Dicas de Sustentabilidade
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip) => {
              const Icon = tip.icon;
              return (
                <button
                  key={tip.category}
                  onClick={() => setSelectedCategory(tip.category)}
                  className={`p-6 rounded-lg border-2 transition-all text-left group ${
                    selectedCategory === tip.category
                      ? `${tip.color} border-current text-white shadow-lg`
                      : "bg-card border-border hover:border-primary text-foreground hover:shadow-md"
                  }`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-1">{tip.title}</h3>
                  <p
                    className={`text-sm ${selectedCategory === tip.category ? "opacity-90" : "text-muted-foreground"}`}
                  >
                    {tip.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Videos Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Vídeos Educativos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                  <Play className="w-10 h-10 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{video.duration}</span>
                    <span>{video.views} visualizações</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quizzes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Quizzes Interativos
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">
                    {quiz.title}
                  </h3>
                  <span className="text-sm font-medium text-primary">
                    {quiz.points}pt
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {quiz.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      quiz.difficulty === "Fácil"
                        ? "bg-green-100 text-green-700"
                        : quiz.difficulty === "Médio"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                  <button className="text-primary hover:text-primary/80 transition-colors font-medium text-sm">
                    Começar →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Share Your Action Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Compartilhe Sua Ação
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-4">
                <Video className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Poste Sua Ação Sustentável
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Grave ou envie um vídeo de você descartando lixo corretamente e ganhe pontos. Cada ação sustentável documentada ajuda a fortalecer nossa comunidade!
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-foreground">Máximo 2 minutos de vídeo</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-foreground">Ganhe pontos imediatamente após aprovação</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-foreground">Escolha entre gravar ou fazer upload</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-foreground">Revisão rápida da moderação</span>
                    </div>
                  </div>
                  <Link
                    to="/postagens"
                    className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Começar Agora
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Dicas para Vídeos Melhores
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">
                    📹 Iluminação Clara
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Escolha um local com boa iluminação natural para melhor visualização
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">
                    🎬 Seja Didático
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mostre o processo completo: separação, acondicionamento e descarte
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">
                    💬 Explique
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Descreva o tipo de lixo e por que está descartando dessa forma
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">
                    ⏱️ Seja Objetivo
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Respeite o tempo máximo de 2 minutos para melhor engajamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
          <div className="flex items-center gap-4 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Missões Ambientais
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Participe de desafios sustentáveis e ganhe pontos para seu perfil
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Ver Missões Disponíveis
          </button>
        </section>
      </div>
    </Layout>
  );
}
