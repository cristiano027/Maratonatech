import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Leaf,
  MapPin,
  AlertCircle,
  Lightbulb,
  Trophy,
  Menu,
  X,
  Video,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Coleta", icon: Leaf },
    { path: "/mapa", label: "Mapa", icon: MapPin },
    { path: "/denuncias", label: "Denúncias", icon: AlertCircle },
    { path: "/postagens", label: "Postagens", icon: Video },
    { path: "/educacao", label: "Educação", icon: Lightbulb },
    { path: "/gamificacao", label: "Pontos", icon: Trophy },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:inline">
                Cariacica +
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                      isActive(item.path)
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Cariacica +
              </h3>
              <p className="text-sm text-muted-foreground">
                Gerenciamento inteligente de coleta de lixo e resíduos em
                Cariacica, ES.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Calendário de Coleta
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mapa"
                    className="hover:text-primary transition-colors"
                  >
                    Mapa Interativo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/denuncias"
                    className="hover:text-primary transition-colors"
                  >
                    Fazer Denúncia
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Contato</h4>
              <p className="text-sm text-muted-foreground">
                Prefeitura de Cariacica, ES
                <br />
                Central de Atendimento: (27) 3261-1000
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Cariacica +. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
