import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Export = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Exportação de Documentos"
          description="Gere documentos finais formatados e prontos"
        />

        <Card className="p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <Download className="w-8 h-8 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-bold text-muted-foreground">
            Módulo em desenvolvimento
          </h3>
          <p className="text-muted-foreground">
            Este módulo estará disponível em breve com exportação em diversos formatos.
          </p>
          <Button variant="outline">Voltar ao Dashboard</Button>
        </Card>
      </div>
    </div>
  );
};

export default Export;
