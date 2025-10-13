import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Shield, 
  BarChart3, 
  Download, 
  FileCheck,
  Sparkles
} from "lucide-react";
import { ModuleCard } from "@/components/ModuleCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "DFD - Formalização de Demanda",
      description: "Crie e gerencie Documentos de Formalização de Demanda de forma estruturada e padronizada.",
      icon: FileCheck,
      badge: "Novo",
      path: "/dfd",
      iconColor: "text-primary",
    },
    {
      title: "ETP - Estudo Técnico Preliminar",
      description: "Elabore estudos técnicos completos com análise EVTEA e justificativas detalhadas.",
      icon: FileText,
      path: "/etp",
      iconColor: "text-primary",
    },
    {
      title: "Mapa de Riscos",
      description: "Identifique, avalie e gerencie riscos do projeto com matriz de probabilidade e impacto.",
      icon: Shield,
      path: "/risk-map",
      iconColor: "text-destructive",
    },
    {
      title: "Decisão AHP",
      description: "Utilize o método AHP para decisões multicritério complexas e objetivas.",
      icon: BarChart3,
      path: "/ahp",
      iconColor: "text-success",
    },
    {
      title: "Exportação de Documentos",
      description: "Gere documentos finais formatados e prontos para assinatura e protocolo.",
      icon: Download,
      path: "/export",
      iconColor: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-foreground">
                  Sistema de Gestão de Contratações
                </h1>
                <p className="text-sm text-muted-foreground">
                  Plataforma Inteligente para Planejamento e Controle
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent-foreground mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">Powered by AI</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-3 text-foreground">
            Bem-vindo ao seu painel de controle
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Automatize e padronize seus processos de contratação com inteligência artificial. 
            Selecione um módulo abaixo para começar.
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {modules.map((module, index) => (
            <div
              key={module.path}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              className="animate-fade-in"
            >
              <ModuleCard
                title={module.title}
                description={module.description}
                icon={module.icon}
                badge={module.badge}
                onClick={() => navigate(module.path)}
                iconColor={module.iconColor}
              />
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
            <div className="text-3xl font-extrabold text-primary mb-2">100%</div>
            <div className="text-sm font-semibold text-foreground mb-1">Conformidade</div>
            <div className="text-xs text-muted-foreground">
              Documentos padronizados segundo normativas vigentes
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-success/5 to-success/10 rounded-xl p-6 border border-success/20">
            <div className="text-3xl font-extrabold text-success mb-2">70%</div>
            <div className="text-sm font-semibold text-foreground mb-1">Redução de Tempo</div>
            <div className="text-xs text-muted-foreground">
              Economia no processo de elaboração de documentos
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-6 border border-accent/20">
            <div className="text-3xl font-extrabold text-accent-foreground mb-2">IA</div>
            <div className="text-sm font-semibold text-foreground mb-1">Assistente Inteligente</div>
            <div className="text-xs text-muted-foreground">
              Sugestões e análises automatizadas em tempo real
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Sistema de Gestão de Contratações © 2025</p>
            <p className="mt-2">
              Desenvolvido para otimizar processos administrativos com Inteligência Artificial
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
