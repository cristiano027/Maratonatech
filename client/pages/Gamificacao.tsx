import Layout from "@/components/Layout";
import { Trophy, Award, Zap, Target, TrendingUp, Medal } from "lucide-react";

export default function Gamificacao() {
  const userStats = {
    points: 1250,
    level: 5,
    achievements: 12,
    nextLevel: 2000,
    rank: 8,
  };

  const achievements = [
    {
      id: 1,
      name: "Primeiro Passo",
      description: "Faça sua primeira denúncia",
      icon: "🌱",
      unlocked: true,
    },
    {
      id: 2,
      name: "Reciclador",
      description: "Complete 10 ações de reciclagem",
      icon: "♻️",
      unlocked: true,
    },
    {
      id: 3,
      name: "Protetor do Ambiente",
      description: "Ganhe 500 pontos",
      icon: "🛡️",
      unlocked: true,
    },
    {
      id: 4,
      name: "Missionário",
      description: "Complete 5 missões ambientais",
      icon: "🎯",
      unlocked: false,
    },
    {
      id: 5,
      name: "Especialista",
      description: "Complete todos os quizzes",
      icon: "🧠",
      unlocked: false,
    },
    {
      id: 6,
      name: "Campeão",
      description: "Fique no top 5 do ranking",
      icon: "🏆",
      unlocked: false,
    },
  ];

  const neighborhoodRanking = [
    { rank: 1, neighborhood: "Centro", points: 8500, trend: "up" },
    { rank: 2, neighborhood: "Flores", points: 7800, trend: "up" },
    { rank: 3, neighborhood: "Santa Maria", points: 7200, trend: "down" },
    { rank: 4, neighborhood: "Bairro Novo", points: 6900, trend: "up" },
    { rank: 5, neighborhood: "Vila Verde", points: 6200, trend: "stable" },
    { rank: 6, neighborhood: "Parque", points: 5800, trend: "down" },
    { rank: 7, neighborhood: "Lagoa", points: 5200, trend: "up" },
    { rank: 8, neighborhood: "Praia", points: 4800, trend: "stable" },
  ];

  const missions = [
    {
      id: 1,
      title: "Separador de Ouro",
      description: "Separe corretamente 20 sacos de reciclável",
      progress: 15,
      total: 20,
      reward: 50,
      completed: false,
    },
    {
      id: 2,
      title: "Guardião da Comunidade",
      description: "Faça 3 denúncias de lixo irregular",
      progress: 2,
      total: 3,
      reward: 30,
      completed: false,
    },
    {
      id: 3,
      title: "Erudito Ambiental",
      description: "Assista 5 vídeos educativos",
      progress: 5,
      total: 5,
      reward: 25,
      completed: true,
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Meus Pontos
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso e conquistas ambientais
          </p>
        </div>

        {/* User Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary to-primary/70 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Pontos Totais</h3>
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{userStats.points}</p>
          </div>

          <div className="bg-gradient-to-br from-secondary to-secondary/70 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Nível</h3>
              <Trophy className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{userStats.level}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Conquistas</h3>
              <Award className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{userStats.achievements}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium opacity-90">Posição</h3>
              <Medal className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">#{userStats.rank}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Current Missions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Missões em Progresso
            </h2>
            <div className="space-y-4">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {mission.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {mission.description}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {mission.reward}pt
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progresso</span>
                      <span>
                        {mission.progress}/{mission.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          mission.completed ? "bg-green-500" : "bg-primary"
                        }`}
                        style={{
                          width: `${(mission.progress / mission.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {mission.completed && (
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Completa
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Progresso do Nível
            </h3>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  Nível {userStats.level}
                </span>
                <span className="text-muted-foreground">
                  {userStats.points}/{userStats.nextLevel}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{
                    width: `${(userStats.points / userStats.nextLevel) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {userStats.nextLevel - userStats.points} pontos para o próximo
                nível
              </p>
            </div>

            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
              Ver Dicas para Ganhar Pontos
            </button>
          </div>
        </div>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Conquistas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? "bg-card border-primary shadow-md"
                    : "bg-muted border-dashed border-muted-foreground opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-foreground text-sm">
                  {achievement.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-3 text-xs text-primary font-medium">
                    ✓ Conquistada
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Neighborhood Ranking */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Ranking por Bairro
          </h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Posição
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Bairro
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Pontos
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Tendência
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {neighborhoodRanking.map((item) => (
                    <tr
                      key={item.rank}
                      className={`hover:bg-muted/50 transition-colors ${
                        item.rank <= 3 ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <span className="font-bold text-lg text-foreground">
                          {item.rank <= 3 ? "🏅" : item.rank}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-medium text-foreground">
                        {item.neighborhood}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-foreground font-semibold">
                        {item.points}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`text-sm font-medium ${
                            item.trend === "up"
                              ? "text-green-600"
                              : item.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {item.trend === "up"
                            ? "↑ Subindo"
                            : item.trend === "down"
                              ? "↓ Caindo"
                              : "→ Estável"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
