import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const RiskMap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Mapa de Riscos"
          description="Identifique, avalie e gerencie riscos do projeto"
        />

        <Card className="p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-bold text-muted-foreground">
            Módulo em desenvolvimento
          </h3>
          <p className="text-muted-foreground">
            Este módulo estará disponível em breve com matriz de riscos e análises automatizadas.
          </p>
          <Button variant="outline">Voltar ao Dashboard</Button>
        </Card>
      </div>
    </div>
  );
};

export default RiskMap;
