import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DFD = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    objeto: "",
    justificativa: "",
    beneficios: "",
    valorEstimado: "",
    prazoExecucao: "",
  });

  const handleSave = () => {
    toast({
      title: "DFD salvo com sucesso!",
      description: "Seus dados foram salvos localmente.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Documento de Formalização de Demanda"
          description="Estruture sua demanda de contratação de forma clara e objetiva"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="objeto">Objeto da Contratação *</Label>
                <Input
                  id="objeto"
                  placeholder="Ex: Contratação de serviços de manutenção..."
                  value={formData.objeto}
                  onChange={(e) => setFormData({ ...formData, objeto: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="justificativa">Justificativa da Necessidade *</Label>
                <Textarea
                  id="justificativa"
                  placeholder="Descreva a necessidade que motiva esta contratação..."
                  rows={6}
                  value={formData.justificativa}
                  onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficios">Benefícios Esperados</Label>
                <Textarea
                  id="beneficios"
                  placeholder="Liste os benefícios esperados com esta contratação..."
                  rows={4}
                  value={formData.beneficios}
                  onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valorEstimado">Valor Estimado (R$)</Label>
                  <Input
                    id="valorEstimado"
                    type="number"
                    placeholder="0,00"
                    value={formData.valorEstimado}
                    onChange={(e) => setFormData({ ...formData, valorEstimado: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prazoExecucao">Prazo de Execução (meses)</Label>
                  <Input
                    id="prazoExecucao"
                    type="number"
                    placeholder="12"
                    value={formData.prazoExecucao}
                    onChange={(e) => setFormData({ ...formData, prazoExecucao: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Rascunho
                </Button>
                <Button variant="outline" className="flex-1">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sugerir com IA
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-fade-in">
              <h3 className="font-bold text-lg mb-3 text-primary">Dicas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Seja específico no objeto da contratação
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Justifique com base em necessidades reais
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Quantifique benefícios quando possível
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Consulte contratações similares anteriores
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h3 className="font-bold text-lg mb-3 text-accent-foreground">Assistente IA</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use o assistente de IA para gerar sugestões automáticas baseadas nas melhores práticas.
              </p>
              <Button variant="outline" className="w-full" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Ativar Assistente
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DFD;
